declare namespace TS {
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
        readonly innerException: TS.Exception | null;
        /**
        * @implements {Error}
        *
        * @description The error message.
        *
        * @get {string} message
        */
        readonly message: string;
        /**
        * @implements {Error}
        *
        * @description The error name. It's the same as the type.
        *
        * @get {string} name
        */
        readonly name: string;
        /**
        * @description Returns the fully qualified type name of the exception.
        *
        * @public
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message, An optional message string.
        * @param {Exception} innerException, An optional inner exception.
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
        *  Call this function without any arguments on the top exception of the exception chain.
        *
        * @param {TS.Exception} exception
        * @param {boolean} isInner, Defaults to false
        * @param {string} offset, A string which is used to indent inner exception messages. Default to 2 spaces.
        *
        * @returns {string}
        */
        stackTrace(exception?: TS.Exception, isInner?: boolean, offset?: string): string;
    }
    /**
    * @class TS.AmbiguousResultException
    *
    * @extends {TS.Exception}
    *
    * @description This exception signals a an error where an operation which is specified to deliver a single result
    *  fails because there are multiple possible results available.
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
        readonly type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        readonly argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        readonly argumentValue: any;
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
    * @class TS.ArgumentException
    *
    * @extends {TS.Exception}
    *
    * @description This exceptions signals a general error caused by an invalid argument.
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
        readonly type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        readonly argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        readonly argumentValue: any;
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
    * @class TS.ArgumentNullException
    *
    * @extends {TS.ArgumentException}
    *
    * @description This exception signals an error caused by an unexpected null value in an argument.
    */
    class ArgumentNullException extends TS.ArgumentException {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
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
    * @class TS.ArgumentNullOrUndefinedException
    *
    * @extends {TS.ArgumentException}
    *
    * @description This exceptions signals an error caused by an unexpected undefined or null value in an argument. The
    *  argument value of that exception will always be null and doesn't reflect the exact argument value which caused
    *  this exception.
    */
    class ArgumentNullOrUndefinedException extends TS.ArgumentException {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
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
    * @class TS.ArgumentNullUndefOrEmptyException
    *
    * @extends {TS.ArgumentException}
    *
    * @description This exception signals an error caused by an unexpected undefined or null value in an argument or
    *  an unexpected emptiness for an argument like an empty string or array. The argument value of that exception
    *  will always be null and doesn't reflect the exact argument value which caused this exception.
    */
    class ArgumentNullUndefOrEmptyException extends TS.ArgumentException {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
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
    * @class TS.ArgumentNullUndefOrWhiteSpaceException
    *
    * @extends {TS.ArgumentException}
    *
    * @description This exceptions signals an unexpected emptiness of a string. The argument value of that exception
    *  will always be null and doesn't reflect the exact argument value which caused this exception.
    */
    class ArgumentNullUndefOrWhiteSpaceException extends TS.ArgumentException {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
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
    * @class TS.ArgumentOutOfRangeException
    *
    * @extends {TS.ArgumentException}
    *
    * @description This exceptions signals that an argument exceeded the range of allowed values.
    */
    class ArgumentOutOfRangeException extends TS.ArgumentException {
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        readonly type: string;
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
    * @class TS.ArgumentUndefinedException
    *
    * @extends {TS.ArgumentException}
    *
    * @description This exceptions signals an error caused by an unexpected undefined value in an argument.
    */
    class ArgumentUndefinedException extends TS.ArgumentException {
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        readonly type: string;
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
    * @class TS.IndexOutOfRangeException
    *
    * @extends {TS.Exception}
    *
    * @description This exceptions signals that an index value exceeded the range of indexable elements.
    */
    class IndexOutOfRangeException extends TS.Exception {
        /**
        * @public
        *
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.InvalidInvokationException
    *
    * @extends {TS.Exception}
    *
    * @description This exceptions signals that a function was invoked in an unexpected or invalid way.
    */
    class InvalidInvokationException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.InvalidOperationException
    *
    * @extends {TS.Exception}
    *
    * @description This exceptions signals an attempt to start an operation which was not allowed to start in the current
    *  situation.
    */
    class InvalidOperationException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.InvalidCastException
    *
    * @extends {TS.Exception}
    *
    * @description This exceptions signals that a casting operation failed.
    */
    class InvalidCastException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.InvalidFormatException
    *
    * @extends {TS.Exception}
    *
    * @description This exceptions signals that an operation failed because of an invalid format of some data.
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
        readonly type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        readonly argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        readonly argumentValue: any;
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
    * @class TS.InvalidTypeException
    *
    * @extends {TS.Exception}
    *
    * @description This exceptions signals that an argument has an invalid type.
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
        readonly type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        readonly argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        readonly argumentValue: any;
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
    * @class TS.ArithmeticException
    *
    * @extends {TS.Exception}
    *
    * @description This exception signals an errors in an arithmetic, casting, or conversion operation.
    *  ArithmeticException is the base class for DivideByZeroException, NotFiniteNumberException, and OverflowException.
    *  Use one of the derived classes of ArithmeticException if appropriate to the exact nature of the error.
    *  Throw an ArithmeticException if there is no appropriate subclass to describe the nature of the error.
    */
    class ArithmeticException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.OverflowException
    *
    * @extends {TS.ArithmeticException}
    *
    * @description This exception signals that an arithmetic, casting, or conversion operation results in an overflow.
    */
    class OverflowException extends ArithmeticException {
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.DividedByZeroException
    *
    * @extends {TS.ArithmeticException}
    *
    * @description This exception signals an attempt to divide a number value by zero.
    */
    class DividedByZeroException extends ArithmeticException {
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.NotFiniteNumberException
    *
    * @extends {TS.ArithmeticException}
    *
    * @description This exception signals an attempt to execute an arithmetic operation with a number value which is
    *  either infinite or Not-a-Number (NaN).
    */
    class NotFiniteNumberException extends ArithmeticException {
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.NotImplementedException
    *
    * @extends {TS.Exception}
    *
    * @description This exception signals that a function or class is not or not fully implemented and can't be used.
    */
    class NotImplementedException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.DeprecatedException
    *
    * @extends {TS.Exception}
    *
    * @description This exception signals that a function or class should not longer be used.
    */
    class DeprecatedException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.DirectoryNotFoundException
    *
    * @extends {TS.Exception}
    *
    * @description This exception signals if the file system is not able to locate the requested directory.
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
        readonly type: string;
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        readonly argumentName: string;
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        readonly argumentValue: any;
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
    * @class TS.BufferOverrunException
    *
    * @extends {TS.Exception}
    *
    * @description This exception signals if the file system is not able to locate the requested directory.
    */
    class BufferOverrunException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.EnvironmentNotSupportedException
    *
    * @extends {TS.Exception}
    *
    * @description This exception that some operation failed because the current environment is not supported. That may
    *  be the reason if a JavaScript VM lacks some functions, a Node.js script is running in a browser or vice versa or
    *  the operation system is not supported.
    */
    class EnvironmentNotSupportedException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message?: string, innerException?: Exception);
    }
    /**
    * @class TS.TimeoutException
    *
    * @extends {TS.Exception}
    *
    * @description This exception if thrown if a function or operation doesn't response in a timely manner.
    */
    class TimeoutException extends TS.Exception {
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        readonly type: string;
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
     * @description The module 'Utils' combines some functions which offer solutions for common problems or
     *  reoccurring tasks which are not class specific. Since they are not class specific, they are also not part of a
     *  class. They are simply collected in this file and are part of the namespace. You can consider all of this
     *  functions as static if you like, because you can call them without a prior instantiation of an object.
     */
    namespace Utils {
        /**
        * @interface ICurrency
        */
        interface ICurrency {
            /** The name of the currency */
            Name: string;
            /** The international three character currency code */
            Code: string;
            /** The currency symbol if available */
            Symbol: string;
        }
        /**
        * @enum NodeTypeEnum,
        *
        * @description This enum is nothing more than a shorthand reference to the node types as defined in
        *  Node.prototype. See also the description at MDN.
        *
        * @see {@link https://developer.mozilla.org/en/docs/Web/API/Node/nodeType | MDN}
        */
        enum NodeTypeEnum {
            /**
            * @description An Element node such as &lt;p&gt; or &lt;div&gt;
            */
            ELEMENT_NODE,
            /**
            * @description The actual Text of Element or Attr
            */
            TEXT_NODE,
            /**
            * @description A ProcessingInstruction of an XML document such as <?xml-stylesheet ... ?> declaration
            */
            PROCESSING_INSTRUCTION_NODE,
            /**
            * @description A Comment node
            */
            COMMENT_NODE,
            /**
            * @description A Document node
            */
            DOCUMENT_NODE,
            /**
            * @description A DocumentType node e.g. <!DOCTYPE html> for HTML5 documents
            */
            DOCUMENT_TYPE_NODE,
            /**
            * @description A DocumentFragment node
            */
            DOCUMENT_FRAGMENT_NODE,
            /**
            * @description An Attribute of an Element.
            *
            * @deprecated The element attributes are no longer implementing the Node interface in DOM4 specification
            */
            ATTRIBUTE_NODE,
            /**
            * @description A CDATASection.
            *
            * @deprecated Removed in DOM4 specification
            */
            CDATA_SECTION_NODE,
            /**
            * @description An XML Entity Reference node.
            *
            * @deprecated Removed in DOM4 specification
            */
            ENTITY_REFERENCE_NODE,
            /**
            * @description An XML <!ENTITY ...> node.
            *
            * @deprecated Removed in DOM4 specification
            */
            ENTITY_NODE,
            /**
            * @description An XML <!NOTATION ...> node.
            *
            * @deprecated Removed in DOM4 specification
            */
            NOTATION_NODE,
        }
        /**
         * @description An array of TS.Utils.ICurrency objects, as defined in ISO 4217
         *
         * @see {@link http://www.iso.org/iso/home/standards/currency_codes.htm | ISO}
         * @see {TS.Utils.ICurrency}
         */
        const currencyArray: Array<ICurrency>;
        /**
        * @description Searches for all occurrences of 'searchString' in 'sourceString' and returns an array of the
        *  indexes where the search string occurred in the sourceString.
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
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function bitStringToByteArray(bitString: string): Array<number>;
        /**
        * @description Converts the values of the elements in argument 'byteArray' into a bit string representation.
        *
        * @param {Array<number>} unsignedByteArray, The array of byte values to convert.
        *
        * @returns {string}, The resulting bit string.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException }
        */
        function byteArrayToBitString(unsignedByteArray: Array<number> | Uint8Array): string;
        /**
        * @description Converts an array of unsigned byte values into a hexadecimal string representation.The function
        *  throws an exception if the value in argument 'unsignedByteArray' is not a valid byte array or empty.
        *
        * @param {Array<number> | Uint8Array} byteArray, An array of unsigned byte values.
        *
        * @returns {number}, The result value as unsigned integer.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException }
        */
        function byteArrayToHexString(unsignedByteArray: Array<number> | Uint8Array): string;
        /**
        * @description Converts an array of unsigned byte values into an unsigned integer value. The function throws an
        *  exception if the value in argument 'unsignedByteArray' is not a valid byte array or empty. The function throws
        *  a 'TS.ArgumentOutOfRangeException' if the conversion exceeds the maximum number range. (Number.MAX_SAFE_INTEGER)
        *
        * @param {Array<number> | Uint8Array} byteArray, An array of unsigned byte values.
        *
        * @returns {number}, The result value as unsigned integer.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException }
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function byteArrayToUInt(unsignedByteArray: Array<number> | Uint8Array): number;
        /**
        * @description Converts the value given in argument 'unsignedByteValue' into an 8 character bit string. The result
        *  string will be padded with leading '0' characters if necessary until the length of 8 characters is reached.
        *
        * @param {number} unsignedByteValue, Has to be an unsigned byte value.
        *
        * @returns {string}, The 8 character bit string representation of the value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        */
        function byteToBitString(unsignedByteValue: number): string;
        /**
        * @description Checks the number of arguments available in the provided parameter 'args' and throws a
        *  'TS.InvalidInvokationException' if the number of arguments is not in the range of [minNumber..maxNumber].
        *
        * @param {IArguments} args
        * @param {number} minNumber
        * @param {number} maxNumber
        *
        * @throws {TS.InvalidInvokationException}
        */
        function checkArgumentsLength(args: IArguments, minNumber: number, maxNumber: number, functionName: string): void;
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
        *  Checks whether the value of argument 'parameter' is a Date. Throws as 'TS.InvalidTypeException' if not.
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
        function checkDateParameter(parameterName: string, parameter: any, functionName: string): void;
        /**
        * @description Checks the value of argument 'parameter' against null and undefined and throws a
        *  'TS.ArgumentNullOrUndefinedException' if the argument is either null or undefined.
        *  Checks whether the value of argument 'parameter' is a valid date string. Throws as 'TS.InvalidTypeException' if
        *  not.
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
        function checkDateStringParameter(parameterName: string, parameter: any, functionName: string): void;
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
        *  Checks whether the value of argument 'type' is a valid type. Throws a 'TS.InvalidInvokationException' if not.
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
        * @throws {TS.InvalidInvokationException}
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
        *  Checks whether the argument 'parameter' is an empty string or whitespace only.Throws a
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
        *  'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx' is an example for that string. All x are hexadecimal values in
        *  the range of [0..f]. M is the version number of the GUID as hexadecimal value. N is the variant number
        *  encoded in the first two bit of the hexadecimal value at the given position.
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
        *
        * @returns {ICurrency} | null, the identified currency, or null.
        *
        * @throws {TS.AmbiguousResultException}
        */
        function findSingleCurrency(currency: string): ICurrency | null;
        /**
         * @desciption Returns the corresponding value to a given key from the specified enumeration. If the key of enumObj
         *  is invalid, the returned value will be undefined. If the key is a string and the enumeration has a name value
         *  with a matching name, that value will be returned. If the key is a number and the enumeration has a named value
         *  with a matching value, the name of that value will be returned. This function does not implicitly convert
         *  number strings to numbers. That differs from the normal enum behavior and is by design. See example
         *
         * @example
         *```typescript
         *
         *  enum testEnum { ZERO, ONE, TWO };
         *
         *  testEnum[2];     // "TWO"
         *
         *  testEnum["ONE"]; // 1
         *
         *  testEnum["2"];   // "TWO"
         *
         *  getValueFromEnum[2];     // "TWO"
         *
         *  getValueFromEnum["ONE"]; // 1
         *
         *  getValueFromEnum["2"];   // undefined
         *```
         *
         * @param {string | number} key
         * @param {any} enumObj
         *
         * @returns {string | number | undefined}
         */
        function getValueFromEnum(key: string | number, enumObj: any): any;
        function hasProperty(source: Object, key: string): boolean;
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
        * @description Searches for the next occurrence of 'searchString' in 'sourceString' beginning at position
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
        * @description Returns the text representation of the given HTML DOM node type value. Returns the string 'undefined'
        *  if the value of argument 'nodeType' is invalid or unknown.
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
        *
        * 2)  Replace all "/./ by "/"
        *
        * 3)  Replace all "//" by "/";
        *
        * 4)  Navigate up one hierarchy level for all '/../' except for those at the root level.
        *
        * 5)  Remove trailing "/";
        *
        * @param {string} path
        *
        * @returns {string}
        */
        function normalizePath(path: string): string;
        /**
        * @description Returns a string which is padded with leading characters as specified in argument 'fillChar' until
        *  the length provided in argument 'length' is reached. The function returns a copy of the source string if the
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
        * @description Replaces all occurrences of 'searchPattern' by 'replacePattern' in the source string and returns
        *  the resulting string.
        *
        * @param {string} source
        * @param {string} searchPattern
        * @param {string} replaceString
        *
        * @returns {string}
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.InvalidInvokationException}
        */
        function replaceAll(source: string, searchPattern: string, replaceString: string): string;
        /**
        * @description Returns a string representation in hexadecimal notation of the unsigned 8 bit value provided in
        *  argument 'value'. The returned string has a fixed length of 2 characters. Number values below 16 are padded with
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
        * @description Converts the unsigned 16 bit integer number in argument 'value' into an array of 2 byte values and
        *  returns that array. The array will be padded with leading 0 byte values for lower numbers until the length of 2
        *  byte values is reached.
        *
        * @param {number} value
        *
        * @returns {Array<number>}, An array of 2 byte values.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UInt16To2ByteArray(value: number): Array<number>;
        /**
        * @description Returns a string representation in hexadecimal notation of the unsigned 16 bit integer value
        *  provided in argument 'value'. The returned string has a fixed length of 4 characters. The returned string will
        *  be padded with as much leading '0' as necessary to reach the length of 4 characters.
        *
        * @param {number}, value
        *
        * @returns {string}, A string of 4 characters representing the UInt16 value.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function UInt16ToHexString(value: number): string;
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
        * @description Returns a string representation in hexadecimal notation of the unsigned 32 bit integer value
        *  provided in argument 'value'. The returned string has a fixed length of 8 characters. The returned string will
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
        * @description A collection of assertion functions. Those are functions which take on argument and return a
        *  boolean value. The boolean value describes whether the argument satisfies a specific condition.
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
            * @description Returns true if the type of the argument 'source' is in the  range of signed byte values
            *  [-127 .. 127], otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isByteValue(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a string which qualifies as canonical GUID
            *  string, otherwise false;
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isCanonicalGUIDString(source: any): boolean;
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
            * @description Returns true if the type of the argument 'source' is a valid date string otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDateString(source: any): boolean;
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
            * @description Returns true if the type of the argument 'source' is a TS.TypeCode.GUID object type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isGUID(source: any): boolean;
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
            *  operator. The function is only created for your convenience. This way all assertion functions are in one
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
            * @see TS.Utils.Assert.isUnsignedIntegerNumber
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isIntegerNumber(source: any): boolean;
            /**
            * @description Returns true if the value of the argument 'source' is a string which matches one of the following
            *  formats:
            *  - '01:23:45:67:89:AB'
            *  - '01-23-45-67-89-AB'
            *  The test is not case sensitive. You might use upper case or lower case hex characters.
            *
            * @see {@link https://standards.ieee.org/develop/regauth/tut/eui48.pdf | IEEE}
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isMACAddressString(source: any): boolean;
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
            * @description Returns true if the argument value is either null or undefined or is a string which is either empty
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
            * @see TS.Utils.Assert.isUnsignedIntegerNumber
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
            *
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
            * @description Returns true if the type of argument 'source' is a plain object otherwise false. A plain object is
            *  an object without a prototype. It is either a literal object or an object created with the 'Object.create'
            *  function called with a null argument.
            *
            * @example
            * ```typescript
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
            *```
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
            * ```typescript
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
            *```
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isPrimitiveType(source: any): boolean;
            /**
            * @description Returns true if the type of the argument 'source' is a TS.TypeCode.RandomGUID object type,
            *  otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isRandomGUID(source: any): boolean;
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
            * @description Returns true if the type of the argument 'source' is a TS.TypeCode.TimeBasedGUID object type,
            *  otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isTimeBasedGUID(source: any): boolean;
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
            * @description Returns true if the type of the argument 'source' is an array of unsigned byte values, otherwise
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
            * @description Returns true if the type of the argument 'source' is in the range of unsigned byte values
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
            *  normal enum behavior and is by design. See example.
            *
            * @example
            * ```typescript
            *
            *  enum testEnum { ZERO, ONE, TWO };
            *
            *  testEnum[2];     // "TWO"  -> 2 accepted as valid enum member
            *
            *  testEnum["ONE"]; // 1      -> "ONE" accepted as valid enum member
            *
            *  testEnum["2"];   // "TWO"  -> "2" accepted as valid enum member
            *
            *  isValueOfEnum[2];     // true   -> 2 accepted as valid enum member
            *
            *  isValueOfEnum["ONE"]; // true   -> "ONE" accepted as valid enum member
            *
            *  isValueOfEnum["2"];   // false  -> "2" NOT accepted as valid enum member
            *```
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
    namespace Utils {
        /**
        * @description A collection of type guard functions.
        * @see {@link https://www.typescriptlang.org/docs/handbook/advanced-types.html | typescriptlang.org}
        * @see {@link https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html | basarat.gitbooks.io/typescript}
        */
        namespace TypeGuards {
            /**
            * @description Array type guard. Returns true if the value of argument 'source' is an array.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArray(source: any): source is Array<any>;
            /**
            * @description Boolean type guard. Returns true if the value of argument 'source' is a boolean.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBoolean(source: any): source is boolean;
            /**
            * @description Date type guard. Returns true if the value of argument 'source' is a date object.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDate(source: any): source is Date;
            /**
            * @description GUID type guard. Returns true if the value of argument 'source' is a 'TS.TypeCode.GUID' object.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isGUID(source: any): source is TS.TypeCode.GUID;
            /**
            * @description RandomGUID type guard. Returns true if the value of argument 'source' is a 'TS.TypeCode.RandomGUID' object.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isRandomGUID(source: any): source is TS.TypeCode.RandomGUID;
            /**
            * @description TimeBasedGUID type guard. Returns true if the value of argument 'source' is a 'TS.TypeCode.TimeBasedGUID' object.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isTimeBasedGUID(source: any): source is TS.TypeCode.TimeBasedGUID;
            /**
            * @description Null type guard. Returns true if the value of argument 'source' is null.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNull(source: any): source is null;
            /**
            * @description Number type guard. Returns true if the value of argument 'source' is a number.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNumber(source: any): source is number;
            /**
            * @description Object type guard. Returns true if the value of argument 'source' is an object.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isObject(source: any): source is Object;
            /**
            * @description RegEx type guard. Returns true if the value of argument 'source' is a regular expression object.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isRegEx(source: any): source is RegExp;
            /**
            * @description String type guard. Returns true if the value of argument 'source' is a string.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isString(source: any): source is string;
            /**
            * @description Symbol type guard. Returns true if the value of argument 'source' is a symbol object.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isSymbol(source: any): source is Symbol;
            /**
            * @description Undefined type guard. Returns true if the value of argument 'source' is undefined.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUndefined(source: any): source is undefined;
        }
    }
}
declare namespace TS {
    namespace Utils {
        /**
        * @description An enumeration of HTTP status codes as defined in RFC 7231 in paragraph 6: 'Response Status Codes'
        *  and some additional status codes usually used in WEB DAV communication.
        *
        * @see {@link https://tools.ietf.org/html/rfc7231 | RFC 7231}
        */
        enum HTTPStatusCodes {
            CONTINUE = 100,
            SWITCHING_PROTOCOLS = 101,
            PROCESSING = 102,
            OK = 200,
            CREATED = 201,
            ACCEPTED = 202,
            NON_AUTHORATIVE_INFORMATION = 203,
            NO_CONTENT = 204,
            RESET_CONTENT = 205,
            PARTIAL_CONTENT = 206,
            MULTI_STATUS = 207,
            ALREADY_REPORTED = 208,
            IM_USED = 226,
            MULTIPLE_CHOICES = 300,
            MOVED_PERMANENTLY = 301,
            FOUND = 302,
            SEE_OTHER = 303,
            NOT_MODIFIED = 304,
            USE_PROXY = 305,
            SWITCH_PROXY = 306,
            TEMPORARY_REDIRECT = 307,
            PERMANENT_REDIRECT = 308,
            BAD_REQUEST = 400,
            UNAUTHORIZED = 401,
            PAYMENT_REQUIRED = 402,
            FORBIDDEN = 403,
            NOT_FOUND = 404,
            METHOD_NOT_ALLOWED = 405,
            NOT_ACCEPTABLE = 406,
            PROXY_AUTHENTICATION_REQUIRED = 407,
            REQUEST_TIME_OUT = 408,
            CONFLICT = 409,
            GONE = 410,
            LENGTH_REQUIRED = 411,
            PRECONDITION_FAILED = 412,
            PAYLOAD_TOO_LARGE = 413,
            URI_TOO_LONG = 414,
            UNSUPPORTED_MEDIA_TYPE = 415,
            RANGE_NOT_SATISFIABLE = 416,
            EXPECTATION_FAILED = 417,
            IM_A_TEAPOT = 418,
            MISDIRECTED_REQUEST = 421,
            UNPROCESSABLE_ENTITY = 422,
            LOCKED = 423,
            FAILED_DEPENDENCY = 424,
            UPGRADE_REQUIRED = 426,
            PRECONDITION_REQUIRED = 428,
            TOO_MANY_REQUEST = 429,
            REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
            UNAVAILABLE_FOR_LEGAL_REASONS = 451,
            INTERNAL_SERVER_ERROR = 500,
            NOT_IMPLEMENTED = 501,
            BAD_GATEWAY = 502,
            SERVICE_UNAVAILABLE = 503,
            GATEWAY_TIME_OUT = 504,
            HTTP_VERSION_NOT_SUPPORTED = 505,
            VARIANT_ALSO_NEGOTIATES = 506,
            INSUFFICIENT_STORAGE = 507,
            LOOP_DETECTED = 508,
            NOT_EXTENDED = 510,
            NETWORK_AUTHENTICATION_REQUIRED = 511,
        }
    }
}
declare namespace TS {
    namespace TypeCode {
        /**
        * @class TS.TypeCode.UInt64
        *
        * @descripion This class implements a 64 bit unsigned integer number type and some basic operations on this type.
        *  The UInt64 is used in some cipher algorithms.
        */
        class UInt64 {
            private internalMostSignificantInteger;
            private internalLeastSignificantInteger;
            /**
            * @description Returns the greatest number which can be stored in a UInt64.
            *
            * @get {TS.TypeCode.UInt64}  MAX_VALUE
            */
            static readonly MAX_VALUE: UInt64;
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
    namespace TypeCode {
        /**
        * @description Enumeration of the GUID versions
        *
        * @see {@link https://www.ietf.org/rfc/rfc4122.txt | rfc4122, paragraph 4.1.3. Version}
        */
        enum GUIDVersionEnum {
            /** Flag which tells that an unknown version number was detected or a zero GUID*/
            UNKNOWN = 0,
            /** Time-based version */
            TIME_BASED = 1,
            /** DCE Security version, with embedded POSIX UIDs */
            DCE = 2,
            /** Name-based version using MD5 hashing */
            NAME_BASED_MD5 = 3,
            /** Randomly or pseudo-randomly generated version */
            RANDOM = 4,
            /** Name-based version using SHA-1 hashing */
            NAME_BASED_SHA1 = 5,
        }
        /**
        * @description Enumeration of the GUID variants
        *
        * @see {@link https://www.ietf.org/rfc/rfc4122.txt | rfc4122, paragraph 4.1.1. Variant}
        */
        enum GUIDVariantEnum {
            /** Flag which tells that an unknown variant number was detected or a zero GUID*/
            UNKNOWN = 0,
            /** Reserved, NCS backward compatibility */
            RESERVED_NCS = 1,
            /** The variant used by the GUIDs in this namespace (except for the zero GUID)*/
            RFC4122 = 2,
            /** Reserved, Microsoft Corporation backward compatibility */
            RESERVED_MS = 3,
            /** Reserved for future definition */
            RESERVED_FUTURE_DEF = 4,
        }
        /**
        * @class TS.TypeCode.TimeFields
        *
        * @description This class represents the time fields of a version 1 / time-based GUID as described in the rfc4122.
        *  The time fields are named 'time_low', 'time_mid' and 'time_hi_and_version' in that    and are a segments of
        *  a 60 bit clock counter. The clock counter started counting on '1582-10-25T00:00:00.000' and has a
        *  100 nanosecond resolution.
        *  The JavaScript clock has only a millisecond resolution. In order to compensate the lower clock resolution, a
        *  GUIDCounter is used. That GUIDCounter should be reset to zero on every passed millisecond and should be increased
        *  by one for every new created time-based GUID in the current millisecond.
        *  That means, that there is a maximum of 9999 distinguished time-based GUIDs possible per millisecond.
        *
        * @see {@link https://www.ietf.org/rfc/rfc4122.txt | rfc4122}
        */
        class TimeFields {
            /**
            * @description The offset from the rfc4122 defined clock which started at '1582-10-25T00:00:00.000Z' to the
            *  JavaScript clock which started at '1970-01-01T00:00:00.000Z', in milliseconds.
            *
            * @const {number} rfc4122ClockOffset
            */
            static rfc4122ClockOffset: number;
            private internalHighField;
            private internalMidField;
            private internalLowField;
            private internalGUIDCount;
            private inernalMilliSeconds;
            /**
            * @description Returns the current time fields as string which is formated in the way described in the rfc4122.
            *  The returned string will look like this "xxxxxxxx-xxxx-xxxx". The first segment will be the lowField, the
            *  second the midField and the third the highFiled with the encoded version number.
            *
            * @get {string}
            */
            readonly asString: string;
            /**
            * @description Returns the highField as Uint8 byte array.
            *
            * @get {Uint8Array}
            */
            readonly highField: Uint8Array;
            /**
            * @description Returns the midField as Uint8 byte array.
            *
            * @get {Uint8Array}
            */
            readonly midField: Uint8Array;
            /**
            * @description Returns the lowField as Uint8 byte array.
            *
            * @get {Uint8Array}
            */
            readonly lowField: Uint8Array;
            /**
            * @description Returns the GUIDCounter.
            *
            * @get {number}
            */
            readonly GUIDCounter: number;
            /**
            * @description Returns the value of this TimeFields object as milliseconds passed since '1582-10-25T00:00:00.000Z'.
            *
            * @see TS.TypeCode.TimeFields.rfc4122ClockOffset
            *
            * @get {number}
            */
            readonly UTCMilliSeconds: number;
            /**
            * @constructor
            *
            * @description Creates a new TimeFields object based on the current time and value of the 'lastTimeFields'
            *  argument. If the new created TimeFiels object represents the same millisecond as the 'lastTimeFields'
            *  object, the new created TimeFields object will have a GUIDCounter which is the GUIDCounter value of
            *  the 'lastTimeFields' object increased by one.
            *
            *  newTimeFields.GUIDCounter = lastTimeFields.GUIDCounter + 1
            *
            *  If the new crated TimeFiels object does not represents the same millisecond as the 'lastTimeFields'
            *  object, the GUIDCounter will be zero.
            *
            * @param {number} GUIDCounter, An integer number in the range of [0..9999].
            *
            * @throws {TS.ArgumentOutOfRangeException}
            * @throws {TS.InvalidInvokationException}
            * @throws {TS.InvalidTypeException}
            */
            constructor(lastTimeFields: TS.TypeCode.TimeFields);
            /**
            * @constructor
            *
            * @description Creates a new TimeFields object from the first three blocks of a canonical GUID representation
            *  of a time-based GUID. The primary purpose of this constructor is to simplify the task to decode the
            *  time stamp of a time-based GUID.
            *
            * @param {string} canonicalGUIDString, A canonical GUID string which is used to create the TimeFields object.
            *
            * @throws {TS.ArgumentOutOfRangeException}
            * @throws {TS.InvalidInvokationException}
            * @throws {TS.InvalidTypeException}
            */
            constructor(canonicalGUIDString: string);
            /**
            * @constructor
            *
            * @description Creates a new TimeFields object based on the current time. The GUIDCounter will be set to zero.
            *
            * @throws {TS.InvalidInvokationException}
            */
            constructor();
        }
        /**
        * @interface TS.TypeCode.IGUID
        *
        * @description The interface which all GUID classes in this namespace have to implement..
        */
        interface IGUID {
            /** Returns the canonical string representation of the current GUID. */
            readonly canonicalString: string;
            /** Returns the version of the current GUID */
            readonly version: GUIDVersionEnum;
            /** Returns the variant of the current GUID */
            readonly variant: GUIDVariantEnum;
        }
        /**
        * @class TS.TypeCode.GUID
        *
        * @implements {TS.TypeCode.IGUID}
        *
        * @description This class implements the TS.TypeCode.IGUID interface. Its the base class of all GUID classes defined
        *  in this namespace.
        */
        class GUID implements IGUID {
            protected readonly internalCanonicalString: string;
            /**
            * @implements {TS.TypeCode.IGUID}
            *
            * @description Returns the canonical string representation of the GUID.
            *
            * @get {string}
            */
            readonly canonicalString: string;
            /**
            * @implements {TS.TypeCode.IGUID}
            *
            * @description Returns the version of the GUID.
            *
            * @get {TS.TypeCode.GUIDVersionEnum}
            */
            readonly version: TS.TypeCode.GUIDVersionEnum;
            /**
            * @implements {TS.TypeCode.IGUID}
            *
            * @description Returns the variant number of the GUID.
            *
            * @get {TS.TypeCode.GUIDVariantEnum}
            */
            readonly variant: TS.TypeCode.GUIDVariantEnum;
            /**
            * @constructor
            *
            * @description Creates a new GUID from the canonical string representation of a GUID provided in argument
            *  'canonicalString'. Creates a zero GUID if called without an argument. The constructor throws an exception
            *  if the provided argument is invalid.
            *
            * @param {string} canonicalString
            *
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidFormatException}
            */
            constructor(canonicalGUIDString?: string);
            protected static getVersion(canonicalGUIDString: string): TS.TypeCode.GUIDVersionEnum;
            protected static getVariant(canonicalGUIDString: string): TS.TypeCode.GUIDVariantEnum;
        }
        /**
        * @class TS.TypeCode.RandomGUID
        *
        * @extends {TS.TypeCode.GUID}
        *
        * @description This class represents a random version 4 GUID as described by the IETF in document rfc4122.txt.
        *
        * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
        */
        class RandomGUID extends GUID {
            constructor();
        }
        /**
        * @class TS.TypeCode.TimeBasedGUID
        *
        * @extends {TS.TypeCode.GUID}
        *
        * @description This class represents a Time-Based version 1 GUID as described by the IETF in document
        *  rfc4122.txt.
        *
        * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
        */
        class TimeBasedGUID extends GUID {
            /**
            * @description Returns the MAC address of the current time-based GUID as a string in colon format. The string
            *  would look similar to this: 'af:5f:98:01:d2:c0'.
            *
            * @get {string}
            */
            readonly MACAddress: string;
            /**
            * @description Returns the GUID counter of the current time-based GUID. The GUID counter at which position in the
            *  millisecond represented by this GUID the GUID was created. There is a maximum of 9999 possible time-based GUID
            *  creations per millisecond.
            *
            * @get {number}, An unsigned integer in the range of [0..9999]
            */
            readonly GUIDCounter: number;
            /**
            * @description Returns the raw clock sequence of the current time-based GUID as a number. That means the variant
            *  number is not part of the returned clock sequence number.
            *
            * @get {number}
            */
            readonly clockSequence: number;
            /**
            * @description Returns the value of the time stamp of this time-based GUID as milliseconds passed since
            *  '1582-10-25T00:00:00.000Z'. Subtract the clock offset from the result to get a JavaScript conform milliseconds
            *  count to use with a Date object.
            *
            * @see TS.TypeCode.TimeFields.rfc4122ClockOffset
            *
            * @get {number}
            */
            readonly timeInMillisecond: number;
            /**
            * @description Returns true if the MAC address part of the current GUID is a random MAC address, otherwise false.
            *  See the specification in rfc4122 paragraph 4.5.
            *
            * @see {@link https://www.ietf.org/rfc/rfc4122.txt | IETF}
            *
            * @get {boolean}
            */
            readonly isRandomMACAddress: boolean;
            /**
            * @constructor
            *
            * @description Creates a new time-based GUID using the information in the provided GUID to set the following
            *  GUID parts:
            *    - The MAC address (and also whether the MAC address is a random address or not.)
            *    - The GUID counter (which will be increased by one if the current time in ms equals the provided GUID ms.)
            *    - The timer reset counter (which will be increased by on if the time in the provided GUID failed validation.)
            *  The constructor is NOT a copy constructor, even if it looks like one. The new constructed GUID will always
            *  differ from the one provided in the constructor parameter GUID.
            *
            * @description The main purpose of this constructor is to continue an already established time-based GUID set.
            *  You might need this constructor if you restart producing time-based GUIDs after a reboot of your OS or restart
            *  of your application.
            *
            * @param {TS.TypeCode.TimeBasedGUID} GUID
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidInvokationException}
            */
            constructor(timeBasedGUID: TS.TypeCode.TimeBasedGUID);
            /**
            * @constructor
            *
            * @description Creates a new time-based GUID using MAC address provided in the constructor argument to set
            *  the 'MACAddress' part of the GUID. The GUID counter and timer reset counter will be set to zero and
            *  the milliseconds will be set by the current clock.
            *
            * @description The main usage of that constructor is to start an new set of time-based GUIDs which all
            *  shall be identified by the provided MAC address. You might need this constructor if you start producing
            *  time-based GUIDS for a new created database for example.
            *
            * @param {string} MACAddress
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidInvokationException}
            */
            constructor(MACAddress: string);
            /**
            * @constructor
            *
            * @description Creates a new time-based GUID using a random MAC address. The GUID counter and timer reset
            *  counter will be set to zero and the milliseconds will be set by the current clock.
            *
            * @description The main usage of that constructor is to start an new set of time-based GUIDs which all
            *  shall be identified by the new created random MAC address. You might need this constructor if you start
            *  producing time-based GUIDs for a new created database for example. Use this constructor if your system doesn't
            *  support a valid MAC address or you don't want to use an existing MAC address for security reasons.
            */
            constructor();
            /**
            * @description
            *
            * @param {string} canonicalGUIDString
            *
            * @returns {TS.TypeCode.TimeBasedGUID}
            *
            * @throws {TS.InvalidTypeException}
             */
            static parse(canonicalGUIDString: string): TS.TypeCode.TimeBasedGUID;
            /**
            * @description
            *
            * @protected
            *
            * @param {string} canonicalGUIDString
            *
            * @returns {string}, The MAC address as string
            *
            * @throws {TS.InvalidTypeException}
             */
            protected static getMACAddress(canonicalGUIDString: string): string;
            protected static getGUIDCounter(canonicalGUIDString: string): number;
            protected static getClockSequence(canonicalGUIDString: string): number;
            protected static getTimeInMillisecond(canonicalGUIDString: string): number;
            protected static getIsRandomMACAddress(canonicalGUIDString: string): boolean;
        }
        /**
        * @class TS.TypeCode.TimeBasedGUIDGenerator
        *
        * @implements {Iterator<TS.TypeCode.TimeBasedGUID>}
        *
        * @description A generator for time based GUIDs. Once initialized with a valid time based GUID, all
        *  subsequent GUIDs returned from this generator will be continuations of the one used during
        *  initialization. That means the MAC or random MAC address will be the same. The clockSequence will
        *  be the same if the GUID used during initialization had a time stamp in the past. Otherwise the
        *  clockSequence will be one higher.
        */
        class TimeBasedGUIDGenerator implements Iterator<TS.TypeCode.TimeBasedGUID> {
            private internalTimeBasedGUID;
            /**
            * @implements {Iterator<TS.TypeCode.TimeBasedGUID>}
            *
            * @returns {IteratorResult<TS.TypeCode.TimeBasedGUID>}
            */
            next: () => IteratorResult<TS.TypeCode.TimeBasedGUID>;
            /**
            * @implements {Iterator<TS.TypeCode.TimeBasedGUID>}
            *
            * @returns {Iterator<TS.TypeCode.TimeBasedGUID>}
            */
            [Symbol.iterator](): Iterator<TS.TypeCode.TimeBasedGUID>;
            /**
            * @constructor
            *
            * @description Creates a new time based GUID generator based on the time based GUID provided in argument
            *  'lastTimeBaseGUID'. The returned GUIDs will build a continuous sequence of time based GUIDs belonging
            *  to the same set as the GUID provided in argument 'lastTimeBasedGUID'.
            *
            * @param {TS.TypeCode.TimeBasedGUID}, The last valid time based GUID to initialize the generator.
            *
            * @throws {TS.InvalidInvokationException}
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {TS.InvalidTypeException}
            */
            constructor(lastTimeBasedGUID: TS.TypeCode.TimeBasedGUID);
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
            * ```typescript
            *
            *  var byteArray = System.Convert.FromBase64String(data));
            *
            *  var resultString = System.Text.Encoding.UTF8.GetString(byteArray);
            *```
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
            *```typescript
            *
            *  var byteArray = System.Convert.FromBase64String(data));
            *```
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
            *  returns that encoded string. The encode function is functional equivalent to the following C# code:
            *
            * @example
            *```typescript
            *
            *  var byteArray = System.Text.Encoding.UTF8.GetBytes(data);
            *
            *  var resultString = System.Convert.ToBase64String(byteArray);
            *```
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
            * @param {string} input, The string which gets encoded to UTF8.
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
declare namespace TS {
    namespace IO {
        enum StreamStateEnum {
            /** Signals that the stream is ready for further write operations. */
            READY = 0,
            /** Signals that the stream is going to close. No further write operations allowed. */
            REQUEST_FOR_CLOSE = 1,
            /** Signals that the stream is closed. No further write or read operations allowed. */
            CLOSED = 2,
            /** Signals that the stream is in an error state. No further write or read operations allowed. */
            ERROR = 3,
        }
    }
}
declare namespace TS {
    namespace IO {
        /**
        * @interface TS.IO.IStream
        *
        * @description Common interface which must be implemented by all 'Stream' types.
        */
        interface IStream<T> {
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
            readonly freeBufferSize: number;
            /**
            * @description A property which reveals the stream state.
            */
            readonly state: TS.IO.StreamStateEnum;
            /**
            * @description A property which reveals the error which locked the stream.
            */
            readonly error: TS.Exception | null;
        }
    }
}
declare namespace TS {
    namespace IO {
        /**
        * @class TS.IO.Stream
        *
        * @implements {TS.IO.IStream<T>}
        *
        * @description This is a simple buffered stream implementation. The stream is a one time stream and unidirectional.
        *  One time stream means, you can't use that stream any longer after the stream has closed or ran into an error
        *  state. Unidirectional means you can transport elements form the sender to the receiver but not vice versa. The
        *  stream has two operation modes. The receiver can either poll for new data on the stream or opt for an event
        *  driven operation mode. If you opt for the event driven operation mode, you have to use the appropriate
        *  constructor which requires three callback handlers to control the data transmission. If you opt for polling use
        *  one of the other constructors. The stream is not a byte stream. That means simple types are transfered by value
        *  but reference types will be transfered as reference. The object on the receiver side is the same as the one on
        *  the sender side and not a deserialized clone of that object. Keep that in mind to avoid unexpected behavior.
        */
        class Stream<T> implements TS.IO.IStream<T> {
            private internalDataAnnounceTimeout;
            private internalWriteLoopTimeout;
            private internalDataAnnounceHandler;
            private internalState;
            private internalBuffer;
            private internalMaxBufferSize;
            private internalError;
            private internalOnClosed;
            private internalOnError;
            private internalOnData;
            private internalOutstandingPromiseCounter;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns true if the stream is ready for read operations.
            *
            * @get {boolean}
            */
            readonly canRead: boolean;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns true if the stream is ready for write operations.
            *
            * @get {boolean}
            */
            readonly canWrite: boolean;
            /**
            * @description Returns the default buffer size which is use if there is no user defined buffer size available.
            *
            * @get {number}
            */
            readonly DEFAULT_BUFFER_SIZE: number;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns the exception which locked the stream.
            *
            * @get { TS.Exception}
            */
            readonly error: TS.Exception | null;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns size of the buffer which is currently available.
            *
            * @get {number}
            */
            readonly freeBufferSize: number;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns true if the stream buffer has data to read.
            *
            * @get {boolean}
            */
            readonly hasData: boolean;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns true if the stream is in an error state.
            *
            * @get {boolean}
            */
            readonly hasError: boolean;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns true if the stream is close.
            *
            * @get {boolean}
            */
            readonly isClosed: boolean;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns the 'onClosed' callback function which was set during construction or null.
            *
            * @get {((stream: TS.IO.IStream<T>) => void) | null}
            */
            readonly onClosed: ((stream: TS.IO.IStream<T>) => void) | null;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns the 'onData' callback function which was set during construction or null.
            *
            * @get {((stream: TS.IO.IStream<T>) => void) | null}
            */
            readonly onData: ((stream: TS.IO.IStream<T>) => void) | null;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns the 'onError' callback function which was set during construction or null.
            *
            * @get {((stream: TS.IO.IStream<T>) => void) | null}
            */
            readonly onError: ((stream: TS.IO.IStream<T>) => void) | null;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Returns the current stream state.
            *
            * @get {TS.IO.StreamStateEnum}
            */
            readonly state: TS.IO.StreamStateEnum;
            /**
            * @constructor
            *
            * @description Creates a new stream with a a buffer size of 'DEFAULT_BUFFER_SIZE'.
            */
            constructor();
            /**
            * @constructor
            *
            * @description Creates a new stream with the maximum buffer size set to the value given in argument 'maxBufferSize'.
            *  The buffer size is not measured in bits, bytes or anything and is simply the number of elements of type <T>
            *  which can be stored in the buffer.
            *
            * @param {number} maxBufferSize, Must be a valid integer > 0.
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.ArgumentOutOfRangeException}
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {InvalidInvokationException}
            */
            constructor(maxBufferSize: number);
            /**
            * @constructor
            *
            * @description Creates a new stream with the maximum buffer size set to value given in argument 'maxBufferSize'.
            *  The buffer size is not measured in bits, bytes or anything and is simply the number of elements of type <T>
            *  which can be stored in the buffer.
            *  Binds the callback functions to the corresponding events for transmission control on the receiver side.
            *
            * @param {number} maxBufferSize, Must be a valid integer > 0.
            * @param {(stream: TS.IO.IStream<T>) => void} onClosed, Callback which gets called when the stream closed.
            * @param {(stream: TS.IO.IStream<T>) => void} onData, Callback which gets called when new data arrived.
            * @param {(stream: TS.IO.IStream<T>) => void} onError, Callback which gets called when an error occurred.
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.ArgumentOutOfRangeException}
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {InvalidInvokationException}
            */
            constructor(maxBufferSize: number, onClosed: (stream: TS.IO.IStream<T>) => void, onData: (stream: TS.IO.IStream<T>) => void, onError: (stream: TS.IO.IStream<T>) => void);
            /**
            * @description Tries to call the 'onData' callback handler.
            */
            private tryOnData();
            /**
            * @description Sets the stream state to 'TS.IO.StreamStateEnum.ERROR' and stores the error in the 'internalError'
            *  variable for later use.
            *
            * @private
            *
            * @param {TS.Exception} value
            */
            private setError(value);
            /**
            * @description Clears a previous created timeout timer.
            *
            * @private
            *
            * @param {number} timer
            */
            private clearTimeout(timer);
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
            private setTimeout(handler, timeout);
            /**
            * @description Clears a previous created interval timer.
            *
            * @private
            *
            * @param {number} timer
            */
            private clearInterval(timer);
            /**
            * @description Sets a new interval timer.
            *
            * @private
            *
            * @param {() => void} handler, The handler which gets called when the timeout is reached.
            * @param {number} interval, The timespan in ms between to calls of the handler.
            *
            * @returns {number}, The interval timer handle.
            *
            * @throws {TS.EnvironmentNotSupportedException}
            */
            private setInterval(handler, interval);
            /**
            * @description Clears the internal buffer, removes all callback functions except for 'onClosed' and sets the
            *  'internalState' to 'TS.IO.StreamStateEnum.CLOSED' if the stream isn't already in an error state.
            *
            * @private
            */
            private internalClose();
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Writes the data given in argument 'data' to the stream in a synchronous way. This function may call
            *  the stream 'onError' callback for a 'TS.BufferOverrunException' exceptions which may rise during the write
            *  operation.
            *
            * @param {T | Array<T>} data, A single value of type T or an arbitrary array of type T which is the payload to write.
            *
            * @throws {TS.ArgumentUndefinedException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidOperationException}
            * @throws {TS.BufferOverrunException}
            */
            write(data: T | Array<T>): void;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description The function returns a promise which will have written the data to the buffer, once it is resolved.
            *  The data may hold an array of type T or a single value of type T. The single value must not be undefined as
            *  well as the array of type T must be a dense array. (Must not contain undefined values)
            *  The asynchronous write operation does not guarantee that the data gets streamed in the same order it was
            *  supplied to the 'writeAsync' function. You need to synchronize your calls to the 'writeAsync' function
            *  yourself if the order of the data is important in any way. You may also use the synchronous 'write' function.
            *  This function may call the stream 'onError' callback for 'TS.InvalidOperationException' and
            *  'TS.TimeoutException' exceptions which may rise during the promise execution.
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
            writeAsync(data: T | Array<T>, timeout?: number): Promise<any>;
            /**
            * @description Returns the next element from the stream or 'undefined' if no element is available. To prevent an
            *  'undefined' result check the 'hasData' property before reading.
            *
            * @returns {T | undefined}, The next element from the stream or undefined if there is no element available.
            *
            * @throws {TS.InvalidOperationException}
            */
            read(): T | undefined;
            /**
            * @description Returns all elements which are currently buffered in the stream as an array. That array may be
            *  empty if there isn't buffered data available. To prevent empty results check the 'hasData' property before
            *  reading.
            *
            * @returns {Array<T>}, The currently buffered data from the stream.
            *
            * @throws {TS.InvalidOperationException}
            */
            readBuffer(): Array<T>;
            /**
            * @implements {TS.IO.IStream}
            *
            * @description Places a request to close the stream. After a call to this function no further write operation is
            *  allowed. A violation of that rule will leave the stream in an erroneous state.
            */
            close(): void;
        }
    }
}
declare namespace TS {
    namespace IO {
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
        class ByteStream extends TS.IO.Stream<number> {
            /**
            * @constructor
            *
            * @description Creates a new stream with a a buffer size of 'DEFAULT_BUFFER_SIZE'.
            */
            constructor();
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
            constructor(maxBufferSize: number);
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
            constructor(maxBufferSize: number, onClosed: (stream: TS.IO.IStream<number>) => void, onData: (stream: TS.IO.IStream<number>) => void, onError: (stream: TS.IO.IStream<number>) => void);
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
            write(data: number | Array<number>): void;
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
            writeAsync(data: number | Array<number>, timeout?: number): Promise<any>;
        }
    }
}
declare namespace TS {
    namespace IO {
        /**
        * @class TS.IO.BitStringStream
        *
        * @extends {TS.IO.Stream}
        *
        * @description An implementation of a bit string stream. The stream inherits from 'TS.IO.Stream' and has a fixed type
        *  which is string. But in fact it is a bit string. That is a string which consists of an arbitrary number of the two
        *  characters [0, 1]. The stream doesn't allow other strings. Each attempt to write an invalid string or to write a
        *  value which isn't a string at all will result in an 'TS.InvalidTypeException' exception.
        */
        class BitStringStream extends TS.IO.Stream<string> {
            /**
            * @constructor
            *
            * @description Creates a new stream with a a buffer size of 'DEFAULT_BUFFER_SIZE'.
            */
            constructor();
            /**
            * @constructor
            *
            * @description Creates a new stream with the maximum buffer size set to the value given in argument 'maxBufferSize'.
            *
            * @param {number} maxBufferSize, Must be a valid integer > 0.
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.ArgumentOutOfRangeException}
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {InvalidInvokationException}
            */
            constructor(maxBufferSize: number);
            /**
            * @constructor
            *
            * @description Creates a new stream with the maximum buffer size set to value given in argument 'maxBufferSize'.
            *  Binds the callback functions to the corresponding events for transmission control on the receiver side.
            *
            * @param {number} maxBufferSize, Must be a valid integer > 0.
            * @param {(stream: TS.IO.IStream<string>) => void} onClosed, Callback which gets called when the stream closed.
            * @param {(stream: TS.IO.IStream<string>) => void} onData, Callback which gets called when new data arrived.
            * @param {(stream: TS.IO.IStream<string>) => void} onError, Callback which gets called when an error occurred.
            *
            * @throws {TS.InvalidTypeException}
            * @throws {TS.ArgumentOutOfRangeException}
            * @throws {TS.ArgumentNullOrUndefinedException}
            * @throws {InvalidInvokationException}
            */
            constructor(maxBufferSize: number, onClosed: (stream: TS.IO.IStream<string>) => void, onData: (stream: TS.IO.IStream<string>) => void, onError: (stream: TS.IO.IStream<string>) => void);
            /**
            * @description Writes the data given in argument 'data' to the stream in a synchronous way. This function may call
            *  the stream 'onError' callback for a 'TS.BufferOverrunException' exceptions which may rise during the write
            *  operation.
            *
            * @override {TS.IO.Stream<T>}
            *
            * @param {string| Array<string>} data, A single value of type bit string or an arbitrary array of type bit string
            *  which is the payload to write operation.
            *
            * @throws {TS.ArgumentUndefinedException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidOperationException}
            * @throws {TS.BufferOverrunException}
            */
            write(data: string | Array<string>): void;
            /**
            * @description The function returns a promise which will have written the data to the buffer, once it is resolved.
            *  The data may hold an array of type bit string or a single value of type bit string. The single value must not
            *  be undefined as well as the array of type bit string must be a dense array. (Must not contain undefined values)
            *  The asynchronous write operation does not guarantee that the data gets streamed in the same order it was
            *  supplied to the 'writeAsync' function. You need to synchronize your calls to the 'writeAsync' function
            *  yourself if the order of the data is important in any way. You may also use the synchronous 'write' function.
            *  This function may call the stream 'onError' callback for 'TS.InvalidOperationException' and
            *  'TS.TimeoutException' exceptions which may rise during the promise execution.
            *
            * @override {TS.IO.Stream<T>}
            *
            * @param {string | Array<string>} data, A single value of type byte or an arbitrary array of type byte which is the payload to write.
            * @param {number} timeout, Write operation timeout in seconds. Must be an unsigned integer > 0.
            *
            * @returns {Promise<any>}, Resolves with a void value and signals 'TS.InvalidOperationException' and
            *  'TS.TimeoutException' on the reject callback.
            *
            * @throws {TS.ArgumentUndefinedException}
            * @throws {TS.InvalidTypeException}
            * @throws {TS.InvalidOperationException}
            */
            writeAsync(data: string | Array<string>, timeout?: number): Promise<any>;
        }
    }
}
