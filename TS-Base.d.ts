declare namespace TS {
    /**
    * @class Exception
    *
    * @description The base class of all exceptions defined in this framework. The Exception class has a public read only
    *  property called 'type' which returns the fully qualified type name of the exception class. This way you are able
    *  to create a finer granular error handling based on the exception type. Your are not longer forced to parse the
    *  error message string to infer the nature of the excpetion. Each subclass of the Exception class has to override
    *  the 'type' property to reflect the own type. The exception class has also a read only 'innerException' property
    *  which allows to create an exception stack which links back to the root exception.
    *
    * @implements {Error}
    */
    class Exception implements Error {
        /**
        * @private
        */
        private internalMessage;
        /**
        * @private
        */
        private internalInnerException;
        /**
        * @description Returns the inner exception if available or null.
        *
        * @public
        *
        * @get {TS.Exception | null} innerException
        */
        innerException: TS.Exception;
        /**
        * @description The error message.
        *
        * @implements {Error}
        *
        * @get {string} message
        */
        message: string;
        /**
        * @description The error name. It's the same as the type.
        *
        * @implements {Error}
        *
        * @get {string} name
        */
        name: string;
        /**
        * @description Returns the fully qualified type name of the exception.
        *
        * @public
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: TS.Exception);
        /**
        * @description Returns a combination of the 'type' and 'message' of the exception as string.
        *
        * @override {Object}
        *
        * @returns {string}
        */
        toString(): string;
        /**
        * @description Returns a string which is the concatenation of the 'toString' call results of the current exception and the inner exceptions.
        *
        * @param {TS.Exception} exception
        * @param {bookean} isInner, Defaults to false
        * @param {string} offset, Default to 2 spaces. A string which is used to indent inner exception messages.
        *
        * @returns {string}
        */
        stackTrace(exception?: TS.Exception, isInner?: boolean, offset?: string): string;
    }
    /**
    * @class AmbiguousResultException
    *
    * @description This exception signals a an error where an operation which is specified to deliver a single result
    *  fails because there are multiple possible results available.
    *
    * @extends {TS.Exception}
    */
    class AmbiguousResultException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @private
        */
        private internalArgumentValue;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        argumentValue: any;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception);
    }
    /**
    * @class ArgumentException
    *
    * @description This exceptions signals a general error caused by an invalid argument.
    *
    * @extends {TS.Exception}
    */
    class ArgumentException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @private
        */
        private internalArgumentValue;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        argumentValue: any;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception);
    }
    /**
    * @class ArgumentNullException
    *
    * @description This execptions signals an error caused by an unexpecte null value in an argument.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, message?: string, innerException?: Exception);
    }
    /**
    * @class ArgumentNullOrUndefinedException
    *
    * @description This exceptions signals an error caused by an unexpecte undefined or null value in an argument.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullOrUndefinedException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, message?: string, innerException?: Exception);
    }
    /**
    * @class ArgumentNullUndefOrEmptyException
    *
    * @description This excptions signals an error caused by an unexpecte undefined or null value in an argument or
    *  an unexpected emptyness for an argument like an empty string or array.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullUndefOrEmptyException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, message?: string, innerException?: Exception);
    }
    /**
    * @class ArgumentNullUndefOrWhiteSpaceException
    *
    * @description This exceptions signals an unexpected emptynes of a string.
    *
    * @extends {TS.Exception}
    */
    class ArgumentNullUndefOrWhiteSpaceException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, message?: string, innerException?: Exception);
    }
    /**
    * @class ArgumentOutOfRangeException
    *
    * @description This exceptions signals that an argument exceeded the range of allowed values.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentOutOfRangeException extends TS.ArgumentException {
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, argumentValue: any, message?: string, innerException?: Exception);
    }
    /**
    * @class ArgumentUndefinedException
    *
    * @description This exceptions signals an error caused by an unexpecte undefined value in an argument.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentUndefinedException extends TS.ArgumentException {
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName: string, message?: string, innerException?: Exception);
    }
    /**
    * @class IndexOutOfRangeException
    *
    * @description This exceptions signals that an index value exceeded the range of indexable elements.
    *
    * @extends {TS.Exception}
    */
    class IndexOutOfRangeException extends TS.Exception {
        /**
        * @get {string} type
        * @public
        * @override {TS.Exception}
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class InvalidInvocationException
    *
    * @description This exceptions signals that a function was invoked in an unexpected or invalid way.
    *
    * @extends {TS.Exception}
    */
    class InvalidInvocationException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class InvalidOperationException
    *
    * @description This exceptions signals an attempt to start an operation which was not allowd to start in the current
    *  situation.
    *
    * @extends {TS.Exception}
    */
    class InvalidOperationException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class InvalidCastException
    *
    * @description This exceptions signals that a casting operation failed.
  
    * @extends {TS.Exception}
    */
    class InvalidCastException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class InvalidFormatException
    *
    * @description This exceptions signals that an operation failed because of an invalid format of some data.
    *
    * @extends {TS.Exception}
    */
    class InvalidFormatException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @private
        */
        private internalArgumentValue;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        argumentValue: any;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName?: string, argumentValue?: any, message?: string, innerException?: Exception);
    }
    /**
    * @class InvalidTypeException
    *
    * @description This exceptions signals that an argument has an invalid type.
    *
    * @extends {TS.Exception}
    */
    class InvalidTypeException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @private
        */
        private internalArgumentValue;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        argumentValue: any;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName?: string, argumentValue?: any, message?: string, innerException?: Exception);
    }
    /**
    * @class ArithmeticException
    *
    * @description This exception signals an errors in an arithmetic, casting, or conversion operation.
    *  ArithmeticException is the base class for DivideByZeroException, NotFiniteNumberException, and OverflowException.
    *  Use one of the derived classes of ArithmeticException if appropriate to the exact nature of the error.
    *  Throw an ArithmeticException if there is no appropriate subclass to descripte the nature of the error.
    *
    * @extends {TS.Exception}
    */
    class ArithmeticException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class OverflowException
    *
    * @description This exception signals that an arithmetic, casting, or conversion operation results in an overflow.
    *
    * @extends {TS.ArithmeticException}
    */
    class OverflowException extends ArithmeticException {
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class DividedByZeroException
    *
    * @description This exception signals an attempt to divide a number value by zero.
    *
    * @extends {TS.ArithmeticException}
    */
    class DividedByZeroException extends ArithmeticException {
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class NotFiniteNumberException
    *
    * @description This exception signals an attempt to execute an arithmetic operation with a number value which is
    *  either infinite or Not-a-Number (NaN).
    *
    * @extends {TS.ArithmeticException}
    */
    class NotFiniteNumberException extends ArithmeticException {
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class NotImplementedException
    *
    * @description This exception signals that a function or class is not or not fully implemented and can't be used.
    *
    * @extends {TS.Exception}
    */
    class NotImplementedException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class DeprecatedException
    *
    * @description This exception signals that a function or class should not longer be used.
    *
    * @extends {TS.Exception}
    */
    class DeprecatedException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class DirectoryNotFoundException
    *
    * @description This exception signals if the filesystem is not able to locate the requested directory.
    *
    * @extends {TS.Exception}
    */
    class DirectoryNotFoundException extends TS.Exception {
        /**
        * @private
        */
        private internalArgumentName;
        /**
        * @private
        */
        private internalArgumentValue;
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        argumentValue: any;
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception. Typically the name of a directory variable.
        * @param {any} argumentValue, The value of the argument which caused the exception. Typically the value of a directory variable.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName?: string, argumentValue?: string, message?: string, innerException?: Exception);
    }
    /**
    * @class EnvironmentNotSupportedException
    *
    * @description This exception that some operation failed because the current environment is not supported. That may
    *  be the reason if a JavaScript VM lacks some functions, a Node.js script is running in a browser or vice versa or
    *  the operation system is not supported.
    *
    * @extends {TS.Exception}
    */
    class EnvironmentNotSupportedException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TimeoutException
    *
    * @description This exception if thrown if a function or operation doesn't response in a timely manner.
    *
    * @extends {TS.Exception}
    */
    class TimeoutException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
}
declare namespace TS {
    /**
     * @description The module 'Utils' hosts a collection of functions which offer solutions for common problems or
     *  reoccuring tasks which are not class specific. Since they are not class specific, they are also not part of a
     *  class. They are simply collected in this file and are part of the namespac. You can consider all of this
     *  functions as static if you like, because you can call them without a prior instantiation of an object.
     */
    namespace Utils {
        /**
        * @interface ICurrency
        */
        interface ICurrency {
            Name: string;
            Code: string;
            Symbol: string;
        }
        /**
         * @description An array of currencies as defined in ISO 4217
         *
         * @see {@link http://www.iso.org/iso/home/standards/currency_codes.htm | ISO}
         */
        const currencyArray: Array<ICurrency>;
        /**
        * @description Searches for all occurrences of 'searchString' in 'sourceString' and returns an array of the
        *  indexes where the searchstring occurred in the sourceString.
        *
        * @param {string} sourceString
        * @param {string} searchString
        *
        * @returns {Array<number>}, An array of indexes where the searchString occurred in the sourceString.
        */
        function allIndexOf(sourceString: string, searchString: string): Array<number>;
        /**
        * @description Converts a bit string into an array of byte values. The function throws an exceptions if the
        *  value of argument 'bitString' is not a valid bit string.
        *
        * @param {string} bitString, The bit string to convert.
        *
        * @returns {Array<number>}, The resulting byte value array which may be empty.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function bitStringToByteArray(bitString: string): Array<number>;
        /**
        * @description Converts the values of the elements in argument 'byteArray' into a bit string representation.
        *
        * @param {Array<number>} byteArray, The array of byte values to convert.
        *
        * @returns {string}, The resulting bit string.
        *
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        * @throws {TS.InvalidTypeException }
        */
        function byteArrayToBitString(byteArray: Array<number>): string;
        /**
        * @description Converts an array of unsigned byte values into an unsinged integer value. The function throws an
        *  exception if the value in argument 'unsignedByteArray' is not a valid byte array or empty. The function throws
        *  a 'TS.ArgumentOutOfRangeException' if the conversion exceeds the maximum number range. (Number.MAX_SAFE_INTEGER)
        *
        * @params {Array<number>} byteArray, An array of unsigned byte values.
        *
        * @returns {number}, The result value as unsingned integer.
        *
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        * @throws {TS.InvalidTypeException }
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function byteArrayToUInt(unsignedByteArray: Array<number>): number;
        /**
        * @description Converts the value given in argument 'value' into an 8 character bit string. The result string will be
        *  padded with leading '0' characters if necessary until the length of 8 characters is reached.
        *
        * @param {number} value, Has to be a byte value.
        *
        * @returns {string}, The 8 character bit string representation of the value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function byteToBitString(value: number): string;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is an ArrayLike type. Trows a
        *  'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkArrayLikeParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is an array. Throws a 'TS.InvalidTypeException' if no.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkArrayParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the argument 'parameter' is a valid string. Throws a 'TS.InvalidTypeException' if not. Checks
        *  whether the argument 'parameter' is an empty string or whitespace only. Throws a
        *  'TS.ArgumentNullUndefOrWhiteSpaceException' if so. Check whether the argument 'parameter' is a valid binary
        *  string. (A string which comprises the characters '[0,1]' only, with no white space.) Throws a
        *  'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {string} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function checkBitStringParameter(parameterName: string, parameter: string, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is a boolean. Throws a 'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkBooleanParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the 'thisContext' is a valid type for a constructor call or not. Throws a
        *  'TS.InvalidOperationException' if the value of argument 'thisContext' is either null or undefined or not of the
        *  required type. Throws a 'TS.ArgumentNullOrUndefinedException' if argument 'requiredType' is not specified.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @deprecated Since JavaScript ECMAScript 2015
        *
        * @param {any} thisContext
        * @param {any} requiredType
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidOperationException}
        */
        function checkConstructorCall(thisContext: any, requiredType: any): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the type of the argument 'parameter' evaluates to 'function' and checks whether the function
        *  returns an object if it is called with the 'new' operator and an empty argument list.
        *
        *  The function throws a 'TS.InvalidTypeException' if the call with the 'new' operator fails for any reason or the
        *  returned value is not an object, an empty object, null or undefined.
        *
        *  Attention, even if the check succeeded, the function specified in the argument 'parameter' may not be supposed
        *  to be called as a constructor function. (To be called with the new operator.) Since JavaScript allows to call
        *  every function with the new operator there is no way to tell whether a function was supposed to be used as a
        *  constructor function or not. But at least that check can tell that a call to that function as constructor
        *  function won't fail and will return an object of any type when the function passed the check.
        *
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkConstructorParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is a function. Throws as 'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkFunctionParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is an integer number in the range of
        *  [Number.MIN_SAFE_INTEGER...Number.MAX_SAFE_INTEGER]. Throws a 'TS.InvalidTypeException' if the value is
        *  either not an integer, out of range or not a number at all.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {number} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkIntNumberParameter(parameterName: string, parameter: number, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'type' is a valid type. Throws a 'TS.InvalidInvocationException' if not.
        *  Checks whether the value of argument 'parameter' is an instance of the type provide in argument 'type'.
        *  Throws a 'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {any} type
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidInvocationException}
        * @throws {TS.InvalidTypeException}
        */
        function checkInstanceOfParameter(parameterName: string, parameter: any, type: Object, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is iterable. Throws a 'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkIterableParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is an array of unsigned byte values. Throws a
        *  'TS.InvalidTypeException' if not. Checks whether the value of argument 'parameter' is an array with 16, 24 or
        *  32 elements. Throws a 'TS.ArgumentOutOfRangeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function checkKeyByteArray(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description This function checks the argument 'parameter' against null, undefined, an empty string and an empty
        *  array and throws a 'TS.ArgumentNullUndefOrEmptyException' if the argument is either of this.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        */
        function checkNotEmptyParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against undefined and throws a
        *  'TS.ArgumentUndefinedException' if the argument is undefined.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentUndefinedException}
        */
        function checkNotUndefinedParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is a number. Throws a 'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkNumberParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is an object. Throws a 'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkObjectParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        */
        function checkParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the argument 'parameter' is a valid string. Throws a 'TS.InvalidTypeException' if not.
        *  Checks whether the argument'parameter' is an empty string or whitespace only.Throws a
        *  'TS.ArgumentNullUndefOrWhiteSpaceException' if so.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function checkStringParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is a valid array of unsigned bytes and throws a
        *  'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkUByteArrayParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is a valid unsigned byte value and throws a
        *  'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkUByteParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is an integer number in the range [0..Number.MAX_SAFE_INTEGER].
        *  Throws a 'TS.InvalidTypeException' if the value is either not an integer, out of range or not  a number at all.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkUIntNumberParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is a TS.TypeCode.UInt64 number. Throws a
        *  'TS.InvalidTypeException' if not.
        *  The exception messages use the 'parameterName' and 'functionName' in its message to signal which parameter
        *  failed the check and which function received the invalid parameter.
        *
        * @param {string} parameterName
        * @param {any} parameter
        * @param {string} functionName
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function checkUInt64NumberParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Takes a sparse array and returns a new created dense array. That is an array where all elements with
        *  an 'undefined' value are removed. If 'allowNull' is set to false, the elements with a 'null' value gets also
        *  removed. That is also the default behavior. Returns an empty array if it is called with an invalid argument.
        *
        * @param {Array<any>}, sparseArray
        * @param {boolean} allowNull,  Default = false
        *
        * @returns {Array<any>}
        */
        function compactArray(sparseArray: Array<any>, allowNull?: boolean): Array<any>;
        /**
        * @description Creates a version 4 random GUID which is returned as string in a canonical representation.
        *
        * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
        * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
        *
        * @returns {string}, The new created GUID as string.
        */
        function createGUID(): string;
        /**
        * @description Finds all currency elements which matches with the search pattern given in argument 'currency' and
        *  returns them in an array. The function returns an empty result array if there is no match for the provided
        *  search pattern.
        *
        * @param {string} currency, the search pattern used to identify a currency.
        *
        * @returns {Array<ICurrency>}, all matching currencies.
        */
        function findAllCurrencies(currency: string): Array<ICurrency>;
        /**
        * @description Finds the currency element which matches with the search pattern given in argument 'currency' and
        *  returns that currency element. If the search pattern leads to multiple results, a 'TS.AmbiguousResultException'
        *  exceptions gets thrown. The function returns null if there is no match for the provided search pattern.
        *
        * @param {string} currency, the search pattern used to identify a currency.
        * @returns {ICurrency} | null, the identified currency, or null.
        * @throws {TS.AmbiguousResultException}
        */
        function findSingleCurrency(currency: string): ICurrency;
        /**
         * @desciption Returns the corresponding value to a given key from the specified enumeration. If the key of enumObj
         *  is invalid, the returned value will be undefined. If the key is a string and the enumeration has a name value
         *  with a machting name, that value will be returned. If the key is a number and the enumeration has a named value
         *  with a matching value, the name of that value will be returned. This function does not implicitly convert
         *  number strings to numbers. That differs from the normal enum bahavior and is by design. See example
         *
         * @example
         *
         *  enum testEnum = { ZERO, ONE, TWO };
         *
         *  testEnum[2];     // "TWO"
         *  testEnum["ONE"]; // 1
         *  testEnum["2"];   // "TWO"
         *
         *  getValueFromEnum[2];     // "TWO"
         *  getValueFromEnum["ONE"]; // 1
         *  getValueFromEnum["2"];   // undefined
         *
         * @param {string | number} key
         * @param {any} enumObj
         *
         * @returns {string | number | undefined}
         */
        function getValueFromEnum(key: string | number, enumObj: any): any;
        /**
        * @description Returns an array of unsigned 8 bit values which represent the hexadecimal string provided in
        *  argument 'hexString'. The function operates on character pairs to calculate the result values. That means
        *  the 'hexString' must only contain the hexadecimal representation of values which are expanded to character
        *  pairs if necessary. In other words, values below decimal 16 or hexadecimal 10 must be expanded with a
        *  leading zero. Without that rule you wouldn't be able to tell whether a string like: 'a105f' represents 5 values
        *  below 16, where each character represents one value, or lets say two values greater 16 and one below like in
        *  this example 'a1', '0', '5f'.
        *
        * @param {string} hexString
        *
        * @returns {Array<number>}
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.InvalidFormatException}
         */
        function HexStringToUByteArray(hexString: string): Array<number>;
        /**
        * @description Searches for the next occurrence of 'searchString' in 'sourceString' beginning at positon
        *  'startIndex' and returns the position in the string as number. If argument 'startIndex' isn't provided, search
        *  begins at the last position in 'sourceString'. The search direction is in reverse order. That means the search
        *  starts at the provided startIndes and goes down two lower indexes during search. Returns -1 if the
        *  'searchString' doesn't exist in the 'sourceString'.
        *
        * @param {string} sourceString
        * @param {number} startIndex,
        * @param {string} searchString
        *
        * @returns {number}, The position where the searchString was found or -1.
        */
        function nextIndexOfReverse(sourceString: string, searchString: string, startIndex?: number): number;
        /**
        * @description Returns the text representation of the given node type value. Returns the string 'undefined' if the
        *  value of argument 'nodeType' is invalid or unknown.
        *
        * @see {@link https://developer.mozilla.org/en/docs/Web/API/Node/nodeType | MSDN }
        *
        * @param {number} nodeType
        *
        * @returns {string}
        */
        function nodeTypeToString(nodeType: number): string;
        /**
        * @description Takes the string from argument 'path' and returns a new string which is normalized by the following
        *  rules:
        *
        * 1)  Replace all "\" by "/"
        * 2)  Replace all "/./ by "/"
        * 3)  Replace all "//" by "/";
        * 4)  Navigate up one hierarchy level for all '/../' except for those at the root level.
        * 5)  Remove trailing "/";
        *
        * @param {string} path
        *
        * @returns {string}
        */
        function normalizePath(path: string): string;
        /**
        * @description Returns a string which is padded with leading characters as specified in argument 'fillChar' until
        *  the length provided in argument 'length'is reached. The function returns a copy of the source string if the
        *  values of the arguments 'fillChar' or 'length' are invalid. A copy of the 'source' string is also returned if
        *  the length of the source is greater or equal the value of the 'length' parameter. The function doesn't truncate
        *  the string. The function returns a string consisting of a concatenation of 'fillChar' up to the length given in
        *  argument 'length' if the argument value of argument 'source' is invalid, null or empty.
        *
        * @param {string} source
        * @param {string} fillChar
        * @param {number} length
        *
        * @returns {string}
        */
        function padLeft(source: string, fillChar: string, length: number): string;
        /**
        * @description Removes the BOM from an UTF-8 encoded file.
        *
        * @param {string} text
        *
        * @returns {string}
        */
        function removeUTF8BOM(text: string): string;
        /**
        * @description Retuns a string representation in hexadecimal notation of the unsigned 8 bit value provided in
        *  argument 'value'. The returned string has a fixed lenght of 2 characters. Number values below 16 are padded with
        *  a leading '0' character.
        *
        * @param {number}, value
        *
        * @returns {string}, A 2 characters string representing the UByte value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function UByteToHexString(value: number): string;
        /**
        * @description Changes the byte order in an unsigned 32 bit integer from [MostSignificant -> LeastSignificant] to
        *  [LeastSignifican -> MostSignificant] or vice versa. Returns the modified value afterwards.
        *
        * @param {number} value
        *
        * @returns {Array<number>}, The modified value
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UInt32SwapSignificantByteOrder(value: number): number;
        /**
        * @description Converts the unsigned 32 bit integer number in argument 'value' into an array of 4 byte values and
        *  returns that array. The array will be padded with leading 0 byte values for lower numbers until the length of 4
        *  byte values is reached.
        *
        * @param {number} value
        *
        * @returns {Array<number>}, An array of 4 byte values.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UInt32To4ByteArray(value: number): Array<number>;
        /**
        * @description Retuns a string representation in hexadecimal notation of the unsingned 32 bit integer value
        *  provided in arguemnt 'value'. The returned string has a fixed lenght of 8 characters. The returned string will
        *  be padded with as much leading '0' as necessary to reach the length of 8 characters.
        *
        * @param {number}, value
        *
        * @returns {string}, A string of 8 characters representing the UInt32 value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UInt32ToHexString(value: number): string;
        /**
        * @description Converts the unsigned integer number in argument 'value' into an array of byte values and returns
        *  that array. The array has as much elements as necessary to represent the value given in argument 'value'.
        *
        * @param {number} value, Has to be an unsigned integer.
        *
        * @returns {Array<number>}, An array of byte values.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function UIntToByteArray(value: number): Array<number>;
    }
}
declare namespace TS {
    namespace Utils {
        /**
        * @description A collection of assertion functions. Those are functions which take on argument and return a boolean value.
        *  The boolean value describes whether the argument satisfies a specific condition or not.
        */
        namespace Assert {
            /**
            * @description Returns true if the type of the argument 'source' is an arguments type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArguments(source: any): boolean;
            /**
            * @description  Returns true if the type of the argument 'source' is an array type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArray(source: any): boolean;
            /**
            * @description  Returns true if the type of the argument 'source' is an array like type, otherwise false. Array
            *  like types are collections like the arguments collection or DOM collections. They have a length property but
            *  they are actually not arrays because they have no indexer.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArrayLike(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty binary string. If the string
            *  contains other characters than '0' and '1', even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBinaryString(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a boolean type, otherwise false.
            *
            * @see TS.Utils.Assert.isBooleanValue
            * @see TS.Utils.Assert.isBooleanObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBoolean(source: any): boolean;
            /**
            * @description  Returns true if the type of the argument 'source' is a boolean object type created with
            *  'new Boolean()', otherwise false.
            *
            * @see TS.Utils.Assert.isBooleanValue
            * @see TS.Utils.Assert.isBoolean
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBooleanObject(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a boolean value type (true or false),
            *  otherwise false.
            *
            * @see TS.Utils.Assert.isBoolean
            * @see TS.Utils.Assert.isBooleanObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBooleanValue(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is an array of byte values, otherwise false.
            *  Byte values are values in the range of [-127..127].
            *
            * @see TS.Utils.Assert.isByteValue
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isByteArray(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is in the  ranche of signed byte values
            *  [-127 .. 127], otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isByteValue(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is considered a valid constructor function which
            *  creates a none empty object, otherwise false.
            *  An empty object is one which can be created using an object literal like '{}' or calling the Object
            *  constructor with a null argument 'new Object(null)'. If the constructor function returns such an object the
            *  constructor will fail the test.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isConstructor(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a date object type created with 'new Date()',
            *  otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDate(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty decimal string. If the string
            *  contains other characters than [0-9], even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDecimalString(source: any): boolean;
            /**
            * @description  Returns true if the type of the argument 'source' is a dense array type. That means the array
            *  contains no element which is undefined. Returns false otherwise.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDenseArray(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is an empty array, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isEmptyArray(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is an enum type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isEnum(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a function type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isFunction(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a generator object type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isGenerator(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty hexadecimal string. If the
            *  string contains other characters than [0-9, A-F, a-f], even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isHexString(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is an infinite number value type, otherwise
            *  false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isInfiniteNumber(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is an instance of the type given in argument
            *  'type', otherwise false. That function doesn't do much more than calling the JavaScript 'instanceof'
            *  operator. That function is only created for your convenience. This way all assertion funcionts are in one
            *  place.
            *
            * @param {any} source
            * @param {any} type
            *
            * @returns {boolean}
            */
            function isInstanceOf(source: any, type: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is an integer number in the range of
            *  [Number.MIN_SAFE_INTEGER..Number.MAX_SAFE_INTEGER], otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isPositiveIntegerNumber
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isIntegerNumber(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is an iterable value, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isIterable(source: any): boolean;
            /**
            * @description This function is just a wrapper around the 'Number.isNaN' function. It's only purpose is to make
            *  the assertion functions available in on place.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNaN(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a negative infinite number value type,
            *  otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNegativInfiniteNumber(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is null, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNull(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is null or undefined, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNullOrUndefined(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is either null or undefined or an empty string
            *  or array. The function returns false for all argument values which are neither null or undefined nor an empty
            *  array or empty string.
            *
            * @param {Array<any> | string} source
            *
            * @returns {boolean}
            */
            function isNullUndefOrEmpty(source: Array<any>): boolean;
            function isNullUndefOrEmpty(source: string): boolean;
            /**
            * @description Returns true if the argument value is either null or undefined or is a string wich is either empty
            *  or contains only white space characters.
            *
            * @param {string} source
            *
            * @returns {boolean}
            */
            function isNullUndefOrWhiteSpace(source: string): boolean;
            /**
            * @description  Returns true if the type of the argument 'source' is a number type, otherwise false.
            *
            * @see TS.Utils.Assert.isIntegerNumber
            * @see TS.Utils.Assert.isNumberObject
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isPositiveIntegerNumber
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNumber(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a number object type created with
            *  'new Number()', otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            *
            * @param {any} source
            * @returns {boolean}
            */
            function isNumberObject(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a number value type, otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNumberValue(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is an object type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isObject(source: any): boolean;
            /**
            * @description Returns true if the type of argument 'source' is a plain object otherwise false.
            *
            * @example
            *
            * function Foo() {
            *   this.a = 1;
            * }
            *
            * isPlainObject(new Foo()) => false
            *
            * isPlainObject([1, 2, 3]) => false
            *
            * isPlainObject({ 'x': 0, 'y': 0 }) => true
            *
            * isPlainObject(Object.create(null)) => true
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isPlainObject(source: any): boolean;
            /**
            * @description Returns true if the type of argument 'source' is a primitive type. A primitive type is a type
            *  which is boolean | null | undefined | number | string | symbol. Every other type is considered a complex
            *  type.
            *
            * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures | JavaScript data types and data structures}
            *
            * @example
            *
            * isPrimitiveType(true) => true
            *
            * isPrimitiveType(null) => true
            *
            * isPrimitiveType(undefined) => true
            *
            * isPrimitiveType(12) => true
            *
            * isPrimitiveType(1.2) => true
            *
            * isPrimitiveType("One") => true
            *
            * isPrimitiveType([1, 2, 3]) => false
            *
            * isPrimitiveType({}) => false
            *
            * isPrimitiveType(new Boolean(false)) => false
            *
            * isPrimitiveType(new Number(13)) => false
            *
            * isPrimitiveType(new String("two")) => false
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isPrimitiveType(source: any): boolean;
            /**
            * @description  Returns true if the type of the argument 'source' is a regular expression type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isRegEx(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a string type, otherwise false.
            *
            * @see TS.Utils.Assert.isStringLiteral
            * @see TS.Utils.Assert.isStringObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isString(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is an array of string values, otherwise false.
            *
            * @see TS.Utils.Assert.isStringValue
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isStringArray(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a string object type created with
            *  'new String()', otherwise false.
            *
            * @see TS.Utils.Assert.isString
            * @see TS.Utils.Assert.isStringLiteral
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isStringObject(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a string value type, otherwise false.
            *
            * @see TS.Utils.Assert.isString
            * @see TS.Utils.Assert.isStringObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isStringValue(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a symbol type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isSymbol(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is an UInt64Number, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUInt64Number(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is undefined, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUndefined(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is an array of unsinged byte values, otherwise
            *  false. Unsigned byte values are values in the range of [0..255]
            *
            * @see TS.Utils.Assert.isUnsignedByteValue
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedByteArray(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is in the ranche of unsigned byte values
            *  [0 .. 255], otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedByteValue(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a positive infinite number value type,
            *  otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isNumberValue
            * @see TS.Utils.Assert.isNumberObject
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedInfiniteNumber(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is a valid integer number in the range of
            *  [0..Number.MAX_SAFE_INTEGER], otherwise false.
            *
            * @see TS.Utils.Assert.isNumber
            * @see TS.Utils.Assert.isIntegerNumber
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedIntegerNumber(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is a valid element of the enumeration in
            *  argument 'enumObj'. This function does not implicitly convert number strings to numbers. That differs from the
            *  normal enum bahavior and is by design. See example.
            *
            * @example
            *
            *  enum testEnum = { ZERO, ONE, TWO };
            *
            *  testEnum[2];     // "TWO"  -> 2 accepted as valid enum member
            *  testEnum["ONE"]; // 1      -> "ONE" accepted as valid enum member
            *  testEnum["2"];   // "TWO"  -> "2" accepted as valid enum member
            *
            *  isValueOfEnum[2];     // true   -> 2 accepted as valid enum member
            *  isValueOfEnum["ONE"]; // true   -> "ONE" accepted as valid enum member
            *  isValueOfEnum["2"];   // false  -> "2" NOT accepted as valid enum member
            *
            * @param {number | string} source
            * @param {Object} enumObj
            *
            * @returns {boolean}
            */
            function isValueOfEnum(source: number | string, enumObj: any): boolean;
        }
    }
}
declare namespace TS {
    module TypeCode {
        /**
        * @class TS.TypeCode.UInt64
        *
        * @descripion This class implements a 64 bit unsigned integer number type and some basic operations on this type.
        *  The UInt64 is used in some cypher algorithms.
        */
        class UInt64 {
            private internalMostSignificantInteger;
            private internalLeastSignificantInteger;
            /**
            * @description Returns the greatest number which can be stored in a UInt64.
            *
            * @get {TS.TypeCode.UInt64}  MAX_VALUE
            */
            static MAX_VALUE: UInt64;
            /**
            * @description Returns the value of the most significant integer of this UInt64 number.
            *
            * @get {number} mostSignificantInteger
            */
            /**
            * @description Sets the value of the most significant integer of this UInt64 number.
            *
            * @set {number} mostSignificantInteger
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.ArgumentOutOfRangeException
            */
            mostSignificantInteger: number;
            /**
            * @description Returns the value of the least significant integer of this UInt64 number.
            *
            * @get {number} leastSignificantInteger
            */
            /**
            * @description Sets the value of the least significant integer of this UInt64 number.
            *
            * @set {number} leastSignificantInteger
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.ArgumentOutOfRangeException
            */
            leastSignificantInteger: number;
            /**
            * @constructor
            *
            * @description Creates a new UInt64 number
            *
            * @param {number} mostSignificantIntege
            * @param {number} leastSignificantInteger
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.ArgumentOutOfRangeException
            */
            constructor(mostSignificantInteger?: number, leastSignificantInteger?: number);
            /**
            * @descriptions Adds a UInt64 value to the current value.
            *
            * @param {TS.TypeCode.UInt64} value
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.OverflowException
            */
            add(value: TS.TypeCode.UInt64): void;
            /**
            * @descriptions Adds two UInt64 numbers and returns the result.
            *
            * @param {TS.TypeCode.UInt64} first
            * @param {TS.TypeCode.UInt64} second
            *
            * @returns {TS.TypeCode.UInt64}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.OverflowException
            */
            static add(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): TS.TypeCode.UInt64;
            /**
            * @description Adds a UInt64 value to the current value in modulo operation mode.
            *
            * @param {TS.TypeCode.UInt64} value
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            addModulo(value: TS.TypeCode.UInt64): void;
            /**
            * @description Adds two UInt64 values in modulo operation mode and returns the result.
            *
            * @param {TS.TypeCode.UInt64} first
            * @param {TS.TypeCode.UInt64} second
            *
            * @returns {TS.TypeCode.UInt64}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            static addModulo(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): TS.TypeCode.UInt64;
            /**
            * @description Compares the current value with the value given in argument 'other' and returns true if the
            *  'other' value is equal to the current value, otherwise false.
            *
            * @param {TS.TypeCode.UInt64} value
            *
            * @returns {boolean}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            equal(other: TS.TypeCode.UInt64): boolean;
            /**
            * @description Compares two UInt64 values and returns true if both values are equal, otherwise false.
            *
            * @param {TS.TypeCode.UInt64} first
            * @param {TS.TypeCode.UInt64} second
            *
            * @returns {boolean}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            static equal(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): boolean;
            /**
            * @description Compares the current value with the value given in argument 'other' and returns true if the
            *  current value is grater than the 'other' value, otherwise false.
            *
            * @param {TS.TypeCode.UInt64} value
            *
            * @returns {boolean}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            greater(other: TS.TypeCode.UInt64): boolean;
            /**
            * @description Compares two UInt64 values and returns true if the first value is grater than the second value,
            *  otherwise false.
            *
            * @param {TS.TypeCode.UInt64} first
            * @param {TS.TypeCode.UInt64} second
            *
            * @returns {boolean}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            static greater(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): boolean;
            /**
            * @description Compares the current value with the value given in argument 'other' and returns true if the
            *  current value is less than the 'other' value, otherwise false.
            *
            * @param {TS.TypeCode.UInt64} value
            *
            * @returns {boolean}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            less(other: TS.TypeCode.UInt64): boolean;
            /**
            * @description Compares two UInt64 values and returns true if the first value is less than the second value,
            *  otherwise false.
            *
            * @param {TS.TypeCode.UInt64} first
            * @param {TS.TypeCode.UInt64} second
            *
            * @returns {boolean}
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            static less(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): boolean;
            /**
            * @description Casts an unsigned integer number into an UInt64.
            *
            * @param {number} intNumber
            *
            * @returns {TS.TypeCode.UInt64}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            static UIntToUInt64(intNumber: number): TS.TypeCode.UInt64;
            /**
            * @description Casts an UInt64 number into an integer. Throws an overflow exceptions if the UInt64 number exceeds
            *  the range of 'Number.MAX_SAVE_INTEGER'.
            *
            * @param {TS.TypeCode.UInt64} UInt64Number
            *
            * @returns {number}
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.OverflowException}
            */
            static UInt64ToUInt(UInt64Number: TS.TypeCode.UInt64): number;
        }
    }
}
declare namespace TS {
    namespace Encoding {
        /**
        * @class TS.Encoding.Base64
        *
        * @description This class implements a base64 encoding and decoding function.
        *
        * @see {@link https://www.ietf.org/rfc/rfc3548.txt | IETF}
        */
        class Base64 {
            private static BASE64_CHARACTER_SET;
            /**
            * @description  Decodes a base64 encoded UTF-8 string and returns the decoded UTF-16 string. The decode function
            *  is functional equivalent to the following C# code:
            *
            * @example
            *  var byteArray = System.Convert.FromBase64String(data));
            *  var resultString = System.Text.Encoding.UTF8.GetString(byteArray);
            *
            * @static
            *
            * @param {string} data, The base64 encoded data as string.
            *
            * @returns {string}, The decoded plain text as string.
            *
            * @throws {TS.ArgumentNullUndefOrEmptyException}
            * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidFormatException}
            */
            static decode(data: string): string;
            /**
            * @description  Decodes a base64 encoded string and returns the decoded string as byte array. The
            *  decodeToByteArray function is functional equivalent to the following C# code:
            *
            * @example
            *  var byteArray = System.Convert.FromBase64String(data));
            *
            * @static
            *
            * @param {string} data, The base64 encoded data as string.
            *
            * @returns {Array<number>}, The decoded data as byte array.
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidFormatException}
            */
            static decodeToByteArray(data: string): Array<number>;
            /**
            * @description Encodes the given UTF-16 string to UTF-8 in a first step and then to base64 in a second step and
            *  retuns that encoded string. The encode function is functional equivalent to the following C# code:
            *
            * @example
            *  var byteArray = System.Text.Encoding.UTF8.GetBytes(data);
            *  var resultString = System.Convert.ToBase64String(byteArray);
            *
            * @static
            *
            * @param {string} data, The plain text to encode as string.
            *
            * @returns {string}, The base64 encoded data as string.
            *
            * @throws {TS.ArgumentNullUndefOrEmptyException}
            * @throws {TS.InvalidTypeException}
            */
            static encode(data: string): string;
            /**
            * @description Encodes the given UTF-16 string to UTF-8 in a first step then to base64 in a second step and makes
            *  the resulting string URL compliant in a last step and returns the resulting string. The result string can be
            *  used as query string data.
            *
            * @static
            *
            * @param {string} data, The plain text to encode as string.
            *
            * @returns {string}, The URL compliant base64 encoded data as string.
            *
            * @throws {TS.InvalidTypeException}
            */
            static encodeURLCompliant(data: string): string;
        }
    }
}
declare namespace TS {
    namespace Encoding {
        /**
        * @class TS.Encoding.UTF
        *
        * @description This class implements UTF-16LE / UCS-2LE string conversion into a UTF-8 byte array and vice versa.
        */
        class UTF {
            /**
            * @description Takes an arbitrary UCS-2LE or UTF-16LE string and returns an array of UTF-8 encoded bytes which
            *  represent the input string in UTF-8 encoding. Since javascript strings are always UCS-2 or UTF-16 and DOM
            *  strings always UTF-16, this function is able to convert all strings which may occur in a javascript program,
            *  into an UTF-8 byte array.
            *
            * @static
            *
            * @param {string} input, The string wich gets encoded to UTF8.
            *
            * @returns {Array<number>}, The resulting byte array.
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidOperationException}
            */
            static UTF16StringToUTF8Array(input: string): Array<number>;
            /**
            * @description Takes a byte array of UTF-8 encoded bytes and converts them into a javascript string which is at
            *  least an UCS-2 string, but more probably an UTF-16 string. It depends on your javascript engine.
            *
            * @static
            *
            * @param {Array<number>} byteArray, An UTF8 array which gets converted to an UTF16 string.
            *
            * @returns {string}, The resulting UTF16 string.
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidOperationException}
            */
            static UTF8ArrayToUTF16String(byteArray: Array<number>): string;
        }
    }
}
