/// <reference path="../_references.ts" />
namespace TS
{
  export namespace IO
  {

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
      readonly onClosed: (() => void) | null;

      /**
      * @description A reference to the callback function which gets called when the stream has data to read.
      */
      readonly onData: (() => void) | null;

      /**
      * @description A reference to the callback function which gets called when the stream ran into an error.
      */
      readonly onError: (() => void) | null;

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
      * @description A flag which tells whether the stream is ready for write operations.
      */
      readonly canWrite: boolean;

      /**
      * @description A flag which tells whether the stream is ready for read operations.
      */
      readonly canRead: boolean;

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