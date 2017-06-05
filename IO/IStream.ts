/// <reference path="../_references.ts" />
namespace TS
{
  export namespace IO
  {

    /**
    * @interface TS.IO.IStream
    *
    * @description Common interface which must be implemented by all 'Stream' types.
    */
    export interface IStream<T>
    {
      /**
      * @description Synchronous write operation.
      */
      write: (data: T | Array<T>, timeout?: number) => void;

      /**
      * @description Asynchronous write operation.
      */
      writeAsync: (data: T | Array<T>, timeout?: number) => Promise<any>;

      /**
      * @description A function which closes the stream for further write operations.
      */
      close: () => void;

      /**
      * @description A reference to the callback function which gets called when the stream finally closed.
      */
      readonly onClosed: ((stream: TS.IO.IStream<T>) => void) | null;

      /**
      * @description A reference to the callback function which gets called when the stream has data to read.
      */
      readonly onData: ((stream: TS.IO.IStream<T>) => void) | null;

      /**
      * @description A reference to the callback function which gets called when the stream ran into an error.
      */
      readonly onError: ((stream: TS.IO.IStream<T>) => void) | null;

      /**
      * @description A flag which tells whether the stream is closed.
      */
      readonly isClosed: boolean;

      /**
      * @description A flag which tells whether the stream has data to read.
      */
      readonly hasData: boolean;

      /**
      * @description A flag which tells whether the stream is locked in an error state.
      */
      readonly hasError: boolean;

      /**
      * @description A flag which tells whether the stream is ready for write operations. If 'canWrite' is true, that
      *  doesn't necessarily mean that there is enough buffer space for your next write operation if you are in
      *  synchronous mode. You should check the free buffer size before.
      *
      * @see freeBufferSize
      */
      readonly canWrite: boolean;

      /**
      * @description A flag which tells whether the stream is ready for read operations.
      */
      readonly canRead: boolean;

      /**
      * @descriptions This property tells you how much buffer size is currently available.
      */
      readonly freeBufferSize: number

      /**
      * @description A property which reveals the stream state.
      */
      readonly state: TS.IO.StreamStateEnum;

      /**
      * @description A property which reveals the error which locked the stream.
      */
      readonly error: TS.Exception | null;

    }

  }//END namespace
}//END namespace