namespace TS
{
  "use strict";

  /**
  * @class TS.Exception
  *
  * @implements {Error}
  *
  * @description The base class of all exceptions defined in this framework. The Exception class has a public read only
  *  property called 'type' which returns the fully qualified type name of the exception class. This way you are able
  *  to create a finer granular error handling based on the exception type. Your are not longer forced to parse the
  *  error message string to infer the nature of the exception. Each subclass of the Exception class has to override
  *  the 'type' property to reflect the own type. The exception class has also a read only 'innerException' property
  *  which allows to create an exception stack which links back to the root exception.
  */
  export class Exception implements Error
  {
    /**
    * @private
    */
    private internalMessage: string;

    /**
    * @private
    */
    private internalInnerException: TS.Exception | null;

    /**
    * @description Returns the inner exception if available or null.
    *
    * @public
    *
    * @get {TS.Exception | null} innerException
    */
    public get innerException(): TS.Exception | null
    {
      return this.internalInnerException;
    }

    /**
    * @implements {Error}
    *
    * @description The error message.
    *
    * @get {string} message
    */
    public get message(): string
    {
      return this.internalMessage;
    }

    /**
    * @implements {Error}
    *
    * @description The error name. It's the same as the type.
    *
    * @get {string} name
    */
    public get name(): string
    {
      return this.type;
    }

    /**
    * @description Returns the fully qualified type name of the exception.
    *
    * @public
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.Exception";
    }

    /**
    * @constructor
    *
    * @param {string} message, An optional message string.
    * @param {Exception} innerException, An optional inner exception.
    */
    constructor(message: string = "", innerException?: TS.Exception)
    {
      this.internalMessage = (message) ? message : "";
      this.internalInnerException = (innerException) ? innerException : null;
    }

    /**
    * @description Returns a combination of the 'type' and 'message' of the exception as string.
    *
    * @override {Object}
    *
    * @returns {string}
    */
    public toString(): string
    {
      return this.type + ((this.message.length > 0) ? " :: " + this.message : "");
    }

    /**
    * @description Returns a string which is the concatenation of the 'toString' call results of the current exception and the inner exceptions.
    *  Call this function without any arguments on the top exception of the exception chain.
    *
    * @param {TS.Exception} exception
    * @param {boolean} isInner, Defaults to false
    * @param {string} offset, A string which is used to indent inner exception messages. Default to 2 spaces.
    *
    * @returns {string}
    */
    public stackTrace(exception: TS.Exception = this, isInner: boolean = false, offset: string = "  "): string
    {
      let returnString: string;

      returnString = "";

      returnString += exception.toString();

      if (exception.innerException != null)
      {
        returnString += "\r\n" + offset + this.stackTrace(exception.innerException, true, offset + "  ");
      }//END if

      return returnString;
    }

  }//END class


  //********************************************************************************
  // AmbiguousResult exception
  //********************************************************************************


  /**
  * @class TS.AmbiguousResultException
  *
  * @extends {TS.Exception}
  *
  * @description This exception signals a an error where an operation which is specified to deliver a single result
  *  fails because there are multiple possible results available.
  */
  export class AmbiguousResultException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.AmbiguousResultException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {any} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
      this.internalArgumentValue = argumentValue;
    }

  }//END class


  //********************************************************************************
  // Argument exception
  //********************************************************************************


  /**
  * @class TS.ArgumentException
  *
  * @extends {TS.Exception}
  *
  * @description This exceptions signals a general error caused by an invalid argument.
  */
  export class ArgumentException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {any} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(message, innerException);
      this.internalArgumentName = (argumentName) ? argumentName : "";
      this.internalArgumentValue = argumentValue;
    }

  }//END class


  /**
  * @class TS.ArgumentNullException
  *
  * @extends {TS.ArgumentException}
  *
  * @description This exception signals an error caused by an unexpected null value in an argument.
  */
  export class ArgumentNullException extends TS.ArgumentException
  {

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message: string = "", innerException?: Exception)
    {
      super(message, null, message, innerException);
    }

  }//END class


  /**
  * @class TS.ArgumentNullOrUndefinedException
  *
  * @extends {TS.ArgumentException}
  *
  * @description This exceptions signals an error caused by an unexpected undefined or null value in an argument. The
  *  argument value of that exception will always be null and doesn't reflect the exact argument value which caused
  *  this exception.
  */
  export class ArgumentNullOrUndefinedException extends TS.ArgumentException
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullOrUndefinedException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message: string = "", innerException?: Exception)
    {
      super(message, null, message, innerException);
    }
  }//END class


  /**
  * @class TS.ArgumentNullUndefOrEmptyException
  *
  * @extends {TS.ArgumentException}
  *
  * @description This exception signals an error caused by an unexpected undefined or null value in an argument or
  *  an unexpected emptiness for an argument like an empty string or array. The argument value of that exception
  *  will always be null and doesn't reflect the exact argument value which caused this exception.
  */
  export class ArgumentNullUndefOrEmptyException extends TS.ArgumentException
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullUndefOrEmptyException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(argumentName, null, message, innerException);
    }
  }//END class


  /**
  * @class TS.ArgumentNullUndefOrWhiteSpaceException
  *
  * @extends {TS.ArgumentException}
  *
  * @description This exceptions signals an unexpected emptiness of a string. The argument value of that exception
  *  will always be null and doesn't reflect the exact argument value which caused this exception.
  */
  export class ArgumentNullUndefOrWhiteSpaceException extends TS.ArgumentException
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentNullUndefOrWhiteSpaceException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(argumentName, null, message, innerException);
    }
  }//END class


  /**
  * @class TS.ArgumentOutOfRangeException
  *
  * @extends {TS.ArgumentException}
  *
  * @description This exceptions signals that an argument exceeded the range of allowed values.
  */
  export class ArgumentOutOfRangeException extends TS.ArgumentException
  {
    /**
    * @override {TS.ArgumentException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentOutOfRangeException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception)
    {
      super(argumentName, argumentValue, message, innerException);
    }

  }//END class


  /**
  * @class TS.ArgumentUndefinedException
  *
  * @extends {TS.ArgumentException}
  *
  * @description This exceptions signals an error caused by an unexpected undefined value in an argument.
  */
  export class ArgumentUndefinedException extends TS.ArgumentException
  {
    /**
    * @override {TS.ArgumentException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArgumentUndefinedException";
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string, message?: string, innerException?: Exception)
    {
      super(argumentName, undefined, message, innerException);
    }

  }//END class


  //********************************************************************************
  // Index exceptions
  //********************************************************************************


  /**
  * @class TS.IndexOutOfRangeException
  *
  * @extends {TS.Exception}
  *
  * @description This exceptions signals that an index value exceeded the range of indexable elements.
  */
  export class IndexOutOfRangeException extends TS.Exception
  {
    /**
    * @public
    *
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.IndexOutOfRangeException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid invocation exceptions
  //********************************************************************************


  /**
  * @class TS.InvalidInvokationException
  *
  * @extends {TS.Exception}
  *
  * @description This exceptions signals that a function was invoked in an unexpected or invalid way.
  */
  export class InvalidInvokationException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidInvokationException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid operation exceptions
  //********************************************************************************


  /**
  * @class TS.InvalidOperationException
  *
  * @extends {TS.Exception}
  *
  * @description This exceptions signals an attempt to start an operation which was not allowed to start in the current
  *  situation.
  */
  export class InvalidOperationException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidOperationException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class




  //********************************************************************************
  // Invalid cast exception
  //********************************************************************************


  /**
  * @class TS.InvalidCastException
  *
  * @extends {TS.Exception}
  *
  * @description This exceptions signals that a casting operation failed.
  */
  export class InvalidCastException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidCastException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid format exception
  //********************************************************************************


  /**
  * @class TS.InvalidFormatException
  *
  * @extends {TS.Exception}
  *
  * @description This exceptions signals that an operation failed because of an invalid format of some data.
  */
  export class InvalidFormatException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidFormatException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {string} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string = "", argumentValue: any = "", message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // Invalid type exception
  //********************************************************************************


  /**
  * @class TS.InvalidTypeException
  *
  * @extends {TS.Exception}
  *
  * @description This exceptions signals that an argument has an invalid type.
  */
  export class InvalidTypeException extends TS.Exception
  {
    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: any;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.InvalidTypeException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {string} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception.
    * @param {any} argumentValue, The value of the argument which caused the exception.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string = "", argumentValue: any = "", message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }//END class


  //********************************************************************************
  // ArithmeticException
  //********************************************************************************


  /**
  * @class TS.ArithmeticException
  *
  * @extends {TS.Exception}
  *
  * @description This exception signals an errors in an arithmetic, casting, or conversion operation.
  *  ArithmeticException is the base class for DivideByZeroException, NotFiniteNumberException, and OverflowException.
  *  Use one of the derived classes of ArithmeticException if appropriate to the exact nature of the error.
  *  Throw an ArithmeticException if there is no appropriate subclass to describe the nature of the error.
  */
  export class ArithmeticException extends TS.Exception
  {

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.ArithmeticException";
    }


    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  * @class TS.OverflowException
  *
  * @extends {TS.ArithmeticException}
  *
  * @description This exception signals that an arithmetic, casting, or conversion operation results in an overflow.
  */
  export class OverflowException extends ArithmeticException
  {

    /**
    * @override {TS.ArithmeticException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.OverflowException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  * @class TS.DividedByZeroException
  *
  * @extends {TS.ArithmeticException}
  *
  * @description This exception signals an attempt to divide a number value by zero.
  */
  export class DividedByZeroException extends ArithmeticException
  {

    /**
    * @override {TS.ArithmeticException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.DividedByZeroException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  /**
  * @class TS.NotFiniteNumberException
  *
  * @extends {TS.ArithmeticException}
  *
  * @description This exception signals an attempt to execute an arithmetic operation with a number value which is
  *  either infinite or Not-a-Number (NaN).
  */
  export class NotFiniteNumberException extends ArithmeticException
  {

    /**
    * @override {TS.ArithmeticException}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.NotFiniteNumberException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }

  }//END class


  //********************************************************************************
  // Infrastructure Exceptions
  //********************************************************************************


  /**
  * @class TS.NotImplementedException
  *
  * @extends {TS.Exception}
  *
  * @description This exception signals that a function or class is not or not fully implemented and can't be used.
  */
  export class NotImplementedException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.NotImplementedException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


  /**
  * @class TS.DeprecatedException
  *
  * @extends {TS.Exception}
  *
  * @description This exception signals that a function or class should not longer be used.
  */
  export class DeprecatedException extends TS.Exception
  {
    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.DeprecatedException";
    }

    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


  //********************************************************************************
  // File and directory exceptions
  //********************************************************************************


  /**
  * @class TS.DirectoryNotFoundException
  *
  * @extends {TS.Exception}
  *
  * @description This exception signals if the file system is not able to locate the requested directory.
  */
  export class DirectoryNotFoundException extends TS.Exception
  {

    /**
    * @private
    */
    private internalArgumentName: string;

    /**
    * @private
    */
    private internalArgumentValue: string;

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.DirectoryNotFoundException";
    }

    /**
    * @description The name of the argument which caused the exception.
    *
    * @get {string} argumentName
    */
    public get argumentName(): string
    {
      return this.internalArgumentName;
    }

    /**
    * @description The value of the argument which caused the exception.
    *
    * @get {string} argumentValue
    */
    public get argumentValue(): any
    {
      return this.internalArgumentValue;
    }

    /**
    * @constructor
    *
    * @param {string} argumentName, The name of the argument which caused the exception. Typically the name of a directory variable.
    * @param {any} argumentValue, The value of the argument which caused the exception. Typically the value of a directory variable.
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(argumentName: string = "", argumentValue: string = "", message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


  //********************************************************************************
  // IO exceptions
  //********************************************************************************

  /**
  * @class TS.BufferOverrunException
  *
  * @extends {TS.Exception}
  *
  * @description This exception signals if the file system is not able to locate the requested directory.
  */
  export class BufferOverrunException extends TS.Exception
  {


    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.BufferOverrunException";
    }


    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


  //********************************************************************************
  // Environment exceptions
  //********************************************************************************


  /**
  * @class TS.EnvironmentNotSupportedException
  *
  * @extends {TS.Exception}
  *
  * @description This exception that some operation failed because the current environment is not supported. That may
  *  be the reason if a JavaScript VM lacks some functions, a Node.js script is running in a browser or vice versa or
  *  the operation system is not supported.
  */
  export class EnvironmentNotSupportedException extends TS.Exception
  {

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.EnvironmentNotSupportedException";
    }


    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor(message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }


  //********************************************************************************
  // Timing exceptions
  //********************************************************************************


  /**
  * @class TS.TimeoutException
  *
  * @extends {TS.Exception}
  *
  * @description This exception if thrown if a function or operation doesn't response in a timely manner.
  */
  export class TimeoutException extends TS.Exception
  {

    /**
    * @override {TS.Exception}
    *
    * @get {string} type
    */
    public get type(): string
    {
      return "TS.TimeoutException";
    }


    /**
    * @constructor
    *
    * @param {string} message?, An optional message string.
    * @param {Exception} innerException?, An optional inner exception.
    */
    constructor( message?: string, innerException?: Exception)
    {
      super(message, innerException);
    }
  }

}//END namespace