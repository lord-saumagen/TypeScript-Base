﻿/// <reference path="../_references.ts" />
namespace TS
{
  export namespace IO
  {
    declare var global: any;

    /**
    * @class TS.IO.ByteStream
    *
    * @extends {TS.IO.Stream}
    *
    * @description An implementation of a byte stream. The stream inherits from 'TS.IO.Stream' and has a fixed type
    *  which is number. I used the number type because there is no byte type in JavaScript. But in fact, the stream
    *  doesn't allow elements outside the range of [0..255]. Which is the number range of an unsigned byte value.
    *  Each attempt to write a value outside that range or to write a value which isn't a number at all will result
    *  in an 'TS.InvalidTypeException' exception.
    */
    export class ByteStream extends TS.IO.Stream<number>
    {
      /**
      * @constructor
      *
      * @description Creates a new stream with a a buffer size of 'DEFAULT_BUFFER_SIZE'.
      */
      constructor()
      /**
      * @constructor
      *
      * @description Creates a new byte stream with the maximum buffer size set to the value given in argument
      *  'maxBufferSize'.
      *
      * @param {number} maxBufferSize, Must be a valid integer > 0.
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {InvalidInvokationException}
      */
      constructor(maxBufferSize: number)
      /**
      * @constructor
      *
      * @description Creates a new byte stream with the maximum buffer size set to the value given in argument
      *  'maxBufferSize'. 
      *  Binds the callback functions to the corresponding events for transmission control on the receiver side.
      *
      * @param {number} maxBufferSize, Must be a valid integer > 0.
      * @param {(stream: TS.IO.IStream<number>) => void} onClosed, Callback which gets called when the stream closed.
      * @param {(stream: TS.IO.IStream<number>) => void} onData, Callback which gets called when new data arrived.
      * @param {(stream: TS.IO.IStream<number>) => void} onError, Callback which gets called when an error occurred.
      *
      * @throws {TS.InvalidTypeException}
      * @throws {TS.ArgumentOutOfRangeException}
      * @throws {TS.ArgumentNullOrUndefinedException}
      * @throws {InvalidInvokationException}
      */
      constructor(maxBufferSize: number, onClosed: (stream: TS.IO.IStream<number>) => void, onData: (stream: TS.IO.IStream<number>) => void, onError: (stream: TS.IO.IStream<number>) => void)
      constructor(maxBufferSize?: number, onClosed?: (stream: TS.IO.IStream<number>) => void, onData?: (stream: TS.IO.IStream<number>) => void, onError?: (stream: TS.IO.IStream<number>) => void)
      {
        if (arguments.length == 0)
        {
          super();
        }

        if (arguments.length == 1)
        {
          super(arguments[0]);
        }

        if (arguments.length == 4)
        {
          super(arguments[0], arguments[1], arguments[2], arguments[3]);
        }

        if ((arguments.length != 0) && (arguments.length != 1) && (arguments.length != 4))
        {
          throw new TS.InvalidInvokationException("One or all of the provided parameters in function 'constructor' are invalid. The error occurred in function 'TS.IO.ByteStream.constructor'.");
        }
      }


      /**
      * @description Writes the data given in argument 'data' to the stream in a synchronous way. This function may call
      *  the stream 'onError' callback for a 'TS.BufferOverrunException' exceptions which may rise during the write
      *  operation.
      *
      * @override {TS.IO.Stream<T>}
      *
      * @param {number| Array<number>} data, A single value of type byte or an arbitrary array of type byte which is the payload to write.
      *
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      * @throws {TS.BufferOverrunException}
      */
      public write(data: number | Array<number>): void
      {
        let writeData: Array<number>;

        if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed)
        {
          throw new TS.InvalidOperationException("There are no more write operations allowed after the close function has been called. The error occurred in function 'TS.IO.ByteStream.write'.");
        }

        if (this.hasError)
        {
          throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed.  The error occurred in function 'TS.IO.ByteStream.write'.");
        }


        if (TS.Utils.Assert.isArray(data))
        {
          if (!TS.Utils.Assert.isDenseArray(data))
          {
            throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be a dense array. (Must not contain 'undefined' values) The error occurred in function 'TS.IO.ByteStream.write'.");
          }

          if (!TS.Utils.Assert.isUnsignedByteArray(data))
          {
            throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be an array of unsigned byte values in function 'TS.IO.ByteStream.write'.");
          }
        }
        else if (TS.Utils.Assert.isUndefined(data))
        {
          throw new TS.ArgumentUndefinedException("data", "Argument 'data' must not be undefined in function 'TS.IO.ByteStream.write'.");
        }
        else if (!TS.Utils.Assert.isUnsignedByteValue(data))
        {
          throw new TS.InvalidTypeException("data", data, "Argument 'data' must be an unsigned byte value in function 'TS.IO.ByteStream.write'.");
        }

        super.write(data);
      }


      /**
      * @description The function returns a promise which will have written the data to the buffer, once it is resolved.
      *  The data may hold an array of type byte or a single value of type byte. The single value must not be undefined
      *  as well as the array of type byte must be a dense array. (Must not contain undefined values)
      *  The asynchronous write operation does not guarantee that the data gets streamed in the same order it was
      *  supplied to the 'writeAsync' function. You need to synchronize your calls to the 'writeAsync' function
      *  yourself if the order of the data is important in any way. You may also use the synchronous 'write' function.
      *  This function may call the stream 'onError' callback for 'TS.InvalidOperationException' and
      *  'TS.TimeoutException' exceptions which may rise during the promise execution.
      *
      * @override {TS.IO.Stream<T>}
      *
      * @param {number | Array<number>} data, A single value of type byte or an arbitrary array of type byte which is
      *  the payload to write operation.
      * @param {number} timeout, Write operation timeout in seconds. Must be an unsigned integer > 0.
      *
      * @returns {Promise<any>}, Resolves with a void value and signals 'TS.InvalidOperationException' and
      *  'TS.TimeoutException' on the reject callback.
      *
      * @throws {TS.ArgumentUndefinedException}
      * @throws {TS.InvalidTypeException}
      * @throws {TS.InvalidOperationException}
      */
      public writeAsync(data: number | Array<number>, timeout?: number): Promise<any>
      {
        if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed)
        {
          throw new TS.InvalidOperationException("There are no more write operations allowed after the close function has been called. The error occurred in function 'TS.IO.ByteStream.writeAsync'.");
        }

        if (this.hasError)
        {
          throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed.  The error occurred in function 'TS.IO.ByteStream.writeAsync'.");
        }


        if (TS.Utils.Assert.isArray(data))
        {
          if (!TS.Utils.Assert.isDenseArray(data))
          {
            throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be a dense array. (Must not contain 'undefined' values) The error occurred in function 'TS.IO.ByteStream.writeAsync'.");
          }

          if (!TS.Utils.Assert.isUnsignedByteArray(data))
          {
            throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be an array of unsigned byte values in function 'TS.IO.ByteStream.writeAsync'.");
          }
        }
        else if (TS.Utils.Assert.isUndefined(data))
        {
          throw new TS.ArgumentUndefinedException("data", "Argument 'data' must not be undefined in function 'TS.IO.ByteStream.writeAsync'.");
        }
        else if (!TS.Utils.Assert.isUnsignedByteValue(data))
        {
          throw new TS.InvalidTypeException("data", data, "Argument 'data' must be an unsigned byte value in function 'TS.IO.ByteStream.writeAsync'.");
        }

        if (!TS.Utils.Assert.isNullOrUndefined(timeout))
        {
          TS.Utils.checkUIntNumberParameter("timeout", timeout, "TS.IO.ByteStream.writeAsync");
        }

        return super.writeAsync(data, timeout);
      }

    }

  }//END namespace
}//END namespace