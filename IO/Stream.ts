/// <reference path="../_references.ts" />
namespace TS
{
  export namespace IO
  {

    declare var global: any;

    /**
    * @class TS.IO.Stream
    *
    * @description This is a simple,e typed buffered stream implementation. The stream is a one time stream and
    *  unidirectional. One time stream means, you can't use that stream any longer after the stream has closed or ran
    *  into an error state. Unidirectional means you can transport elements form the sender to the receiver but not
    *  vice versa. The stream has two operation modes. The receiver can either poll for new data on the stream or opt
    *  for an event driven operation mode. If you opt for the event driven operation mode, you have to use the
    *  appropriate constructor which requires three callback handlers to control the data transmission.
    *  If you opt for polling use one of the other constructors.
    *  The stream is not a byte stream. That means simple types are transfered by value but reference types will
    *  only transfer a reference to an object. The object on the receiver side is the same as the on the sender side
    *  and not a deserialized clone of that object. Keep that in mind to avoid unexpected behavior.
    *
    * @implements {TS.IO.IStream<T>}
    */
    export class Stream<T> implements TS.IO.IStream<T>
    {
      private internalDataAnnounceTimeout: number;
      private internalWriteLoopTimeout: number = 33;
      private internalDataAnnounceHandler: number | null = null;
      private internalState: TS.IO.StreamStateEnum;
      private internalBuffer: Array<T>;
      private internalMaxBufferSize: number;
      private internalError: TS.Exception | null = null;
      private internalOnClosed: (() => void) | null = null;
      private internalOnError: (() => void) | null = null;
      private internalOnData: (() => void) | null = null;
      private internalOutstandingPromiseCounter: number = 0;


      /**
      * @description Returns the current stream state.
      *
      * @implements {TS.IO.IStream}
      *
      * @get {TS.IO.StreamStateEnum}
      */
      public get state(): TS.IO.StreamStateEnum
      {
        return this.internalState;
      }


      /**
      * @description Returns the exception which locked the stream.
      *
      * @implements {TS.IO.IStream}
      *
      * @get { TS.Exception}
      */
      public get error(): TS.Exception | null
      {
        return this.internalError;
      }


      /**
      * @description Returns true if the stream is in an error state.
      *
      * @implements {TS.IO.IStream}
      *
      * @get {boolean}
      */
      public get hasError(): boolean
      {
        return this.internalError != null;
      }


      /**
      * @description Returns true if the stream buffer has data to read.
      *
      * @implements {TS.IO.IStream}
      *
      * @get {boolean}
      */
      public get hasData(): boolean
      {
        return this.internalBuffer.length > 0;
      }


      /**
      * @description Returns true if the stream is close.
      *
      * @get {boolean}
      */
      public get isClosed(): boolean
      {
        return this.state == TS.IO.StreamStateEnum.CLOSED;
      }


      /**
      * @description Returns the 'onClosed' callback function which was set during construction or null.
      *
      * @implements {TS.IO.IStream}
      *
      * @get {() => void | null}
      */
      public get onClosed(): (() => void) | null
      {
        return this.internalOnClosed;
      }


      /**
      * @description Returns the 'onData' callback function which was set during construction or null.
      *
      * @implements {TS.IO.IStream}
      *
      * @get {() => void | null}
      */
      public get onData(): (() => void) | null
      {
        return this.internalOnData;
      }


      /**
      * @description Returns the 'onError' callback function which was set during construction or null.
      *
      * @implements {TS.IO.IStream}
      *
      * @get {() => void | null}
      */
      public get onError(): (() => void) | null
      {
        return this.internalOnError;
      }


      /**
      * @description Returns true if the stream is ready for write operations.
      *
      * @get {boolean}
      */
      public get canWrite(): boolean
      {
        return this.internalState == TS.IO.StreamStateEnum.READY;
      }


      /**
      * @description Returns size of the buffer which is currently available.
      *
      * @get {number}
      */
      public get freeBufferSize(): number
      {
        return this.internalMaxBufferSize - this.internalBuffer.length;
      }


      /**
      * @description Returns true if the stream is ready for read operations.
      *
      * @get {boolean}
      */
      public get canRead(): boolean
      {
        return !this.isClosed && !this.hasError && this.hasData;
      }


      /**
      * @constructor
      *
      * @description Creates a new stream with the maximum buffer size set to 'Number.MAX_SAFE_INTEGER'.
      */
      constructor()
      /**
      * @constructor
      *
      * @description Creates a new stream with the maximum buffer size set to value given in argument 'maxBufferSize'.
      *
      * @param {number} maxBufferSize, Must be a valid integer > 0.
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {InvalidInvocationException}
      */
      constructor(maxBufferSize: number)
      /**
      * @constructor
      *
      * @description Creates a new stream with the maximum buffer size set to value given in argument 'maxBufferSize'.
      *  Binds the callback functions to the corresponding events for transmission control on the receiver side.
      *
      * @param {number} maxBufferSize, Must be a valid integer > 0.
      * @param {() => void} onClosedCallback, Callback which gets called when the stream closed.
      * @param {() => void} onDataCallback, Callback which gets called when new data arrived.
      * @param {() => void} onErrorCallback, Callback which gets called when an error occurred.
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {InvalidInvocationException}
      */
      constructor(maxBufferSize: number, onClosedCallback: () => void, onDataCallback: () => void, onErrorCallback: () => void)
      constructor(maxBufferSize?: number, onClosedCallback?: () => void, onDataCallback?: () => void, onErrorCallback?: () => void)
      {
        this.internalBuffer = new Array<T>();

        if (arguments.length == 0)
        {
          this.internalMaxBufferSize = Number.MAX_SAFE_INTEGER;
        }

        if (arguments.length > 0)
        {

          TS.Utils.checkUIntNumberParameter("maxBufferSize", maxBufferSize, "TS.IO.Stream.constructor");
          if (maxBufferSize == 0)
          {
            throw new TS.ArgumentOutOfRangeException("maxBufferSize", maxBufferSize, "Argument 'maxBufferSize' must be an integer in the range of [1..Number.MAX_SAFE_INTEGER in function 'TS.IO.Stream.constructor'.")
          }
          this.internalMaxBufferSize = (maxBufferSize as number);

          if ((arguments.length > 1) && (arguments.length == 4))
          {
            TS.Utils.checkFunctionParameter("onClosedCallback", onClosedCallback, "TS.IO.Stream.constructor");
            TS.Utils.checkFunctionParameter("onDataCallback", onDataCallback, "TS.IO.Stream.constructor");
            TS.Utils.checkFunctionParameter("onErrorCallback", onErrorCallback, "TS.IO.Stream.constructor");
            this.internalOnClosed = (onClosedCallback as () => void);
            this.internalOnData = (onDataCallback as () => void);
            this.internalOnError = (onErrorCallback as () => void);
          }

          if ((arguments.length != 1) && (arguments.length != 4))
          {
            throw new TS.InvalidInvocationException("One or all of the provided parameters in function 'constructor' are invalid. The error occurred in function 'TS.IO.Stream.constructor'.");
          }

        }

        this.internalDataAnnounceTimeout = this.internalWriteLoopTimeout * 5;

        this.internalDataAnnounceHandler = this.setInterval(() => 
        {
          if (this.hasData)
          {
            if (this.onData != null)
            {
              this.onData();
            }
          }
          else
          {
            if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) && (this.internalOutstandingPromiseCounter == 0))
            {
              this.clearInterval(this.internalDataAnnounceHandler as number);
              this.internalDataAnnounceHandler = null;
              this.internalClose();
              if (this.onClosed != null)
              {
                this.onClosed();
                this.internalOnClosed = null;
              }
            }
          }
        }, this.internalDataAnnounceTimeout);

        this.internalState = TS.IO.StreamStateEnum.READY;
      }


      /**
      * @description Tries to call the 'onData' callback handler.
      */
      private tryOnData(): void
      {
        if (this.hasData)
        {
          if (this.onData != null)
          {
            this.onData();
          }
        }
      }


      /**
      * @description Sets the stream state to 'TS.IO.StreamStateEnum.ERROR' and stores the error in the 'internalError'
      *  variable for later use.
      *
      * @private
      *
      * @param {TS.Exception} value
      */
      private setError(value: TS.Exception)
      {
        if (TS.Utils.Assert.isNullOrUndefined(value))
        {
          return;
        }
        this.internalError = value;
        this.internalState = TS.IO.StreamStateEnum.ERROR;
      }


      /**
      * @description Clears a previous created timeout timer.
      *
      * @private
      *
      * @param {number} timer
      */
      private clearTimeout(timer: number): void
      {
        if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.clearTimeout))
        {
          return (global as any).clearTimeout(timer);
        }

        if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.clearTimeout))
        {
          return window.clearTimeout(timer);
        }
      }


      /**
      * @description Sets a new timeout timer.
      *
      * @private
      *
      * @param {() => void} handler, The handler which gets called when the timeout is reached.
      * @param {number} timeout, The timespan in ms before the handler gets called.
      *
      * @returns {number}, The timeout timer handle.
      *
      * @throws {TS.EnvironmentNotSupportedException}
      */
      private setTimeout(handler: () => void, timeout: number): number
      {
        if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.setTimeout))
        {
          return (global as any).setTimeout(handler, timeout);
        }
        else if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.setTimeout))
        {
          return window.setTimeout(handler, timeout);
        }
        else
        {
          throw new TS.EnvironmentNotSupportedException("The current environment is not supported. The exception occurred in function 'TS.IO.Stream.setTimeout'.");
        }
      }


      /**
      * @description Clears a previous created interval timer.
      *
      * @private
      *
      * @param {number} timer
      */
      private clearInterval(timer: number): void
      {
        if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.clearInterval))
        {
          return (global as any).clearInterval(timer);
        }

        if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.clearInterval))
        {
          return window.clearInterval(timer);
        }
      }


      /**
      * @description Sets a new interval timer.
      *
      * @private
      *
      * @param {() => void} handler, The handler which gets called when the timeout is reached.
      * @param {number} timeout, The timespan in ms between to calls of the handler.
      *
      * @returns {number}, The interval timer handle.
      *
      * @throws {TS.EnvironmentNotSupportedException}
      */
      private setInterval(handler: () => void, timeout: number): number
      {
        if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.setInterval))
        {
          return (global as any).setInterval(handler, timeout);
        }
        else if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.setInterval))
        {
          return window.setInterval(handler, timeout);
        }
        else
        {
          throw new TS.EnvironmentNotSupportedException("The current environment is not supported. The exception occurred in function 'TS.IO.Stream.setInterval'.")
        }
      }


      /**
      * @description Clears the internal buffer, removes all callback functions except for 'onClosed' and sets the
      *  'internalState' to 'TS.IO.StreamStateEnum.CLOSED' if the stream isn't already in an error state.
      *
      * @private
      */
      private internalClose()
      {
        if (!(this.internalState == TS.IO.StreamStateEnum.ERROR))
        {
          this.internalState = TS.IO.StreamStateEnum.CLOSED;
        }//END if
        this.internalBuffer = new Array<T>();
        this.internalOnData = null;
        this.internalOnError = null;
      }


      /**
      * @description Writes the data given in argument 'data' to the stream in a synchronous way. This function may call
      *  the stream 'onError' callback for a 'TS.BufferOverrunException' exceptions which may rise during the write
      *  operation.
      *
      * @implements {TS.IO.IStream}
      *
      * @param {T | Array<T>} data, A single value of type T or an arbitrary array of type T which is the payload to write.
      *
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.BufferOverrunException}
      */
      public write(data: T | Array<T>): void
      {
        let writeData: Array<T>;

        if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed)
        {
          throw new TS.InvalidOperationException("There are no more write operations allowed after the close function has been called. The error occurred in function 'TS.IO.Stream.write'.");
        }

        if (this.hasError)
        {
          throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed.  The error occurred in function 'TS.IO.Stream.write'.");
        }


        if (TS.Utils.Assert.isArray(data))
        {
          if (!TS.Utils.Assert.isDenseArray(data))
          {
            throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be a dense array. (Must not contain 'undefined' values) The error occurred in function 'TS.IO.Stream.write'.")
          }
        }
        else if (TS.Utils.Assert.isUndefined(data))
        {
          throw new TS.ArgumentUndefinedException("data", "Argument 'data' must not be undefined in function 'TS.IO.Stream.Write'.")
        }


        writeData = new Array<T>();
        if (TS.Utils.Assert.isArray(data))
        {
          writeData = (data as Array<T>).slice();
        }
        else
        {
          writeData.push((data as T));
        }

        while (writeData.length > 0)
        {
          if (this.internalBuffer.length < this.internalMaxBufferSize)
          {
            this.internalBuffer.push(writeData.shift() as T);
          }//END if
          else
          {
            this.setError(new TS.BufferOverrunException("The current write operation caused a buffer overrun. The error occurred in function 'TS.IO.Stream.Write'."));
            //
            // If there is an error handler assigned to the stream, signal the exception on the error handler.
            //
            if (this.onError != null)
            {
              this.onError();
              this.internalClose();
            }
            //
            // No error handler assigned, raise the exception on this function.
            //
            else
            {
              this.internalClose();
              throw this.error;
            }
          }
        }//END while
      }


      /**
      * @description The function returns a promise which will have written the data to the buffer, once it is resolved.
      *  The data may hold an array of type T or a single value of type T. The single value must not be undefined as
      *  well as the array of type T must be a dense array. (Must not contain undefined values)
      *  The asynchronous write operation does not guarantee that the data gets streamed in the same order it was
      *  supplied to the 'writeAsync' function. You need to synchronize your calls to the 'writeAsync' function
      *  yourself if the order of the data is important in any way. You may also use the synchronous 'write' function.
      *  This function may call the stream 'onError' callback for 'TS.InvalidOperationException' and
      *  'TS.TimeoutException' exceptions which may rise during the promise execution.
      *
      * @implements {TS.IO.IStream}
      *
      * @param {T | Array<T>} data, A single value of type T or an arbitrary array of type T which is the payload to write.
      * @param {number} timeout, Write operation timeout in seconds. Must be an unsigned integer > 0.
      *
      * @returns {Promise<any>}, Resolves with a void value and signals 'TS.InvalidOperationException' and
      *  'TS.TimeoutException' on the reject callback.
      *
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      */
      public writeAsync(data: T | Array<T>, timeout?: number): Promise<any>
      {
        let loopHandler: number;
        let writeTime: number = 0;
        let writeTimeout: number = 0;
        let writeData: Array<T>;
        let prms: Promise<any>;

        if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed)
        {
          throw new TS.InvalidOperationException("There are no more write operations allowed once the close function has been called. The error occurred in function 'TS.IO.Stream.writeAsync'.");
        }

        if (this.hasError)
        {
          throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed. The error occurred in function 'TS.IO.Stream.writeAsync'.");
        }

        if (TS.Utils.Assert.isArray(data))
        {
          if (!TS.Utils.Assert.isDenseArray(data))
          {
            throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be a dense array (Must not contain 'undefined' values). The error occurred in function 'TS.IO.Stream.writeAsync'.")
          }
        }
        else if (TS.Utils.Assert.isUndefined(data))
        {
          throw new TS.ArgumentUndefinedException("data", "Argument 'data' must not be undefined in function 'TS.IO.Stream.writeAsync'.")
        }

        if (!TS.Utils.Assert.isNullOrUndefined(timeout))
        {
          TS.Utils.checkUIntNumberParameter("timeout", timeout, "TS.IO.Stream.writeAsync");
          writeTimeout = (timeout as number);
        }
        else
        {
          writeTimeout = 0;
        }

        writeData = new Array<T>();
        if (TS.Utils.Assert.isArray(data))
        {
          writeData = (data as Array<T>).slice()
        }
        else
        {
          writeData.push((data as T));
        }

        prms = new Promise((resolve, reject) => 
        {

          if (this.hasError)
          {
            reject(this.error)
          }//END if
          else
          {
            if (writeData.length == 0)
            {
              resolve();
            }//END if
            else
            {
              if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed)
              {
                this.setError(new TS.InvalidOperationException("There are no more write operations allowed once the close function has been called. The error occurred in function 'TS.IO.Stream.writeAsync'."));
                reject(this.error);
                if (this.onError != null)
                {
                  //
                  // Saving the 'onError' callback in a local variable, deleting the original callback functions
                  // and than calling the local stored reference to the 'onError' callback looks like stupid
                  // programming. But is solves the problem that every queued promise calls the 'onError'
                  // callback once. Calling the 'internalClose' function after a call to the 'onError' callback
                  // would lead to that problem.
                  //
                  let onErrorRef = this.onError;
                  this.internalClose();
                  onErrorRef();
                }
                this.internalClose();
              }//END if
              else
              {
                writeTime = 0;

                loopHandler = this.setInterval(() => 
                {
                  if (this.hasError)
                  {
                    this.clearInterval(loopHandler);
                    reject(this.error);
                  }
                  else if (writeData.length > 0)
                  {
                    if (this.internalBuffer.length < this.internalMaxBufferSize)
                    {
                      if (this.internalBuffer.length + writeData.length > this.internalMaxBufferSize)
                      {
                        this.internalBuffer.push(...writeData.splice(0, (this.internalMaxBufferSize - this.internalBuffer.length)));
                      }
                      else
                      {
                        this.internalBuffer.push(...writeData);
                        writeData.length = 0;
                      }
                      //
                      // Reset accumulated write time after a successful write operation.
                      //
                      writeTime = 0;
                    }//END if
                    else
                    {
                      //
                      // The buffer was already full. Try to get rid of the data.
                      //
                      this.tryOnData();

                      //
                      // Add loopTime to writeTime if the write operation wasn't successful.
                      //
                      writeTime += this.internalWriteLoopTimeout;
                      if ((writeTimeout > 0) && (writeTime > writeTimeout * 1000))
                      {
                        this.clearInterval(loopHandler);
                        this.setError(new TS.TimeoutException("The current operation did not complete in a timely manner. The error occurred in function 'TS.IO.Stream.writeAsync'."));
                        reject(this.error);
                        if (this.onError != null)
                        {
                          //
                          // Saving the 'onError' callback in a local variable, deleting the original callback functions
                          // and than calling the local stored reference to the 'onError' callback looks like stupid
                          // programming. But is solves the problem that every queued promise calls the 'onError'
                          // callback once. Calling the 'internalClose' function after a call to the 'onError' callback
                          // would lead to that problem.
                          //
                          let onErrorRef = this.onError;
                          this.internalClose();
                          onErrorRef();
                        }
                        this.internalClose();
                      }//END if
                    }//END else
                  }//END else if
                  else
                  {
                    writeTime = 0;
                    this.clearInterval(loopHandler);
                    resolve();
                  }//END else
                }, this.internalWriteLoopTimeout);
              }//END else
            }//END else
          }//END else
        });
        this.internalOutstandingPromiseCounter++;
        return prms.then(() =>
        {
          this.internalOutstandingPromiseCounter--;
        });
      }


      /**
      * @description Returns the next element from the stream or 'undefined' if no element is available. To prevent an
      *  'undefined' result check the 'hasData' property before reading.
      *
      * @returns {T | undefined}, The next element from the stream or undefined if there is no element available.
      *
      * @throws {TS.InvalidOperationException}
      */
      public read(): T | undefined
      {
        let result: T;

        if (this.isClosed)
        {
          throw new TS.InvalidOperationException("There are no more read operations allowed once stream has been closed. The error occurred in function 'TS.IO.Stream.read'.");
        }

        if (this.hasError)
        {
          throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed. The error occurred in function 'TS.IO.Stream.read'.");
        }

        if (this.hasData)
        {
          return this.internalBuffer.shift();
        }
        else
        {
          //
          // Check for a close request if it has been the last element in the stream.
          //
          if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) && (this.internalOutstandingPromiseCounter == 0))
          {
            this.internalClose();
            if (this.onClosed != null)
            {
              this.onClosed();
              this.internalOnClosed = null;
            }//END if
          }//END if
          return undefined;
        }
      }


      /**
      * @description Returns all elements which are currently buffered in the stream as an array. That array may be
      *  empty if there isn't buffered data available. To prevent empty results check the 'hasData' property before
      *  reading.
      *
      * @returns {Array<T>}, The currently buffered data from the stream.
      *
      * @throws {TS.InvalidOperationException}
      */
      public readBuffer(): Array<T>
      {
        let result: Array<T> = new Array<T>();

        if (this.isClosed)
        {
          throw new TS.InvalidOperationException("There are no more read operations allowed once stream has been closed. The error occurred in function 'TS.IO.Stream.read'.");
        }

        if (this.hasError)
        {
          throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed. The error occurred in function 'TS.IO.Stream.read'.");
        }

        if (this.hasData)
        {
          result = this.internalBuffer.slice(0, this.internalBuffer.length);
          this.internalBuffer.length = 0;
        }

        return result;
      }


      /**
      * @description Places a request to close the stream. After a call to this function further write operation are
      *  allowed. A violation of that rule will leave the stream in an erroneous state.
      *
      * @implements {TS.IO.IStream}
      */
      public close()
      {
        if ((this.internalState != TS.IO.StreamStateEnum.CLOSED) && (this.internalState != StreamStateEnum.ERROR))
        {
          this.internalState = TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE;
        }
      }


    }//END class


  }//END namespace
}//END namespace
