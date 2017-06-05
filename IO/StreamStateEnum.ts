/// <reference path="../_references.ts" />
namespace TS
{
  export namespace IO
  {

    export enum StreamStateEnum
    {
      /** Signals that the stream is ready for further write operations. */
      READY,
      /** Signals that the stream is going to close. No further write operations allowed. */
      REQUEST_FOR_CLOSE,
      /** Signals that the stream is closed. No further write or read operations allowed. */
      CLOSED,
      /** Signals that the stream is in an error state. No further write or read operations allowed. */
      ERROR
    }

  }//END namespace
}//END namespace
