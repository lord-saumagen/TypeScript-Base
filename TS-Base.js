var TS;
(function (TS) {
    "use strict";
    /**
    * @class TS.Exception
    *
    * @description The base class of all exceptions defined in this framework. The Exception class has a public read only
    *  property called 'type' which returns the fully qualified type name of the exception class. This way you are able
    *  to create a finer granular error handling based on the exception type. Your are not longer forced to parse the
    *  error message string to infer the nature of the exception. Each subclass of the Exception class has to override
    *  the 'type' property to reflect the own type. The exception class has also a read only 'innerException' property
    *  which allows to create an exception stack which links back to the root exception.
    *
    * @implements {Error}
    */
    class Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message = "", innerException) {
            this.internalMessage = (message) ? message : "";
            this.internalInnerException = (innerException) ? innerException : null;
        }
        /**
        * @description Returns the inner exception if available or null.
        *
        * @public
        *
        * @get {TS.Exception | null} innerException
        */
        get innerException() {
            return this.internalInnerException;
        }
        /**
        * @description The error message.
        *
        * @implements {Error}
        *
        * @get {string} message
        */
        get message() {
            return this.internalMessage;
        }
        /**
        * @description The error name. It's the same as the type.
        *
        * @implements {Error}
        *
        * @get {string} name
        */
        get name() {
            return this.type;
        }
        /**
        * @description Returns the fully qualified type name of the exception.
        *
        * @public
        *
        * @get {string} type
        */
        get type() {
            return "TS.Exception";
        }
        /**
        * @description Returns a combination of the 'type' and 'message' of the exception as string.
        *
        * @override {Object}
        *
        * @returns {string}
        */
        toString() {
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
        stackTrace(exception = this, isInner = false, offset = "  ") {
            let returnString;
            returnString = "";
            returnString += exception.toString();
            if (exception.innerException != null) {
                returnString += "\r\n" + offset + this.stackTrace(exception.innerException, true, offset + "  ");
            } //END if
            return returnString;
        }
    }
    TS.Exception = Exception; //END class
    //********************************************************************************
    // AmbiguousResult exception
    //********************************************************************************
    /**
    * @class TS.AmbiguousResultException
    *
    * @description This exception signals a an error where an operation which is specified to deliver a single result
    *  fails because there are multiple possible results available.
    *
    * @extends {TS.Exception}
    */
    class AmbiguousResultException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, argumentValue, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
            this.internalArgumentValue = argumentValue;
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.AmbiguousResultException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.AmbiguousResultException = AmbiguousResultException; //END class
    //********************************************************************************
    // Argument exception
    //********************************************************************************
    /**
    * @class TS.ArgumentException
    *
    * @description This exceptions signals a general error caused by an invalid argument.
    *
    * @extends {TS.Exception}
    */
    class ArgumentException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, argumentValue, message, innerException) {
            super(message, innerException);
            this.internalArgumentName = (argumentName) ? argumentName : "";
            this.internalArgumentValue = argumentValue;
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {any} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.ArgumentException = ArgumentException; //END class
    /**
    * @class TS.ArgumentNullException
    *
    * @description This exception signals an error caused by an unexpected null value in an argument.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentNullException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message = "", innerException) {
            super(message, null, message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullException";
        }
    }
    TS.ArgumentNullException = ArgumentNullException; //END class
    /**
    * @class TS.ArgumentNullOrUndefinedException
    *
    * @description This exceptions signals an error caused by an unexpected undefined or null value in an argument. The
    *  argument value of that exception will always be null and doesn't reflect the exact argument value which caused
    *  this exception.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentNullOrUndefinedException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message = "", innerException) {
            super(message, null, message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullOrUndefinedException";
        }
    }
    TS.ArgumentNullOrUndefinedException = ArgumentNullOrUndefinedException; //END class
    /**
    * @class TS.ArgumentNullUndefOrEmptyException
    *
    * @description This exception signals an error caused by an unexpected undefined or null value in an argument or
    *  an unexpected emptiness for an argument like an empty string or array. The argument value of that exception
    *  will always be null and doesn't reflect the exact argument value which caused this exception.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentNullUndefOrEmptyException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(argumentName, null, message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullUndefOrEmptyException";
        }
    }
    TS.ArgumentNullUndefOrEmptyException = ArgumentNullUndefOrEmptyException; //END class
    /**
    * @class TS.ArgumentNullUndefOrWhiteSpaceException
    *
    * @description This exceptions signals an unexpected emptiness of a string. The argument value of that exception
    *  will always be null and doesn't reflect the exact argument value which caused this exception.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentNullUndefOrWhiteSpaceException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(argumentName, null, message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentNullUndefOrWhiteSpaceException";
        }
    }
    TS.ArgumentNullUndefOrWhiteSpaceException = ArgumentNullUndefOrWhiteSpaceException; //END class
    /**
    * @class TS.ArgumentOutOfRangeException
    *
    * @description This exceptions signals that an argument exceeded the range of allowed values.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentOutOfRangeException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, argumentValue, message, innerException) {
            super(argumentName, argumentValue, message, innerException);
        }
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentOutOfRangeException";
        }
    }
    TS.ArgumentOutOfRangeException = ArgumentOutOfRangeException; //END class
    /**
    * @class TS.ArgumentUndefinedException
    *
    * @description This exceptions signals an error caused by an unexpected undefined value in an argument.
    *
    * @extends {TS.ArgumentException}
    */
    class ArgumentUndefinedException extends TS.ArgumentException {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName, message, innerException) {
            super(argumentName, undefined, message, innerException);
        }
        /**
        * @override {TS.ArgumentException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArgumentUndefinedException";
        }
    }
    TS.ArgumentUndefinedException = ArgumentUndefinedException; //END class
    //********************************************************************************
    // Index exceptions
    //********************************************************************************
    /**
    * @class TS.IndexOutOfRangeException
    *
    * @description This exceptions signals that an index value exceeded the range of indexable elements.
    *
    * @extends {TS.Exception}
    */
    class IndexOutOfRangeException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @get {string} type
        * @public
        * @override {TS.Exception}
        */
        get type() {
            return "TS.IndexOutOfRangeException";
        }
    }
    TS.IndexOutOfRangeException = IndexOutOfRangeException; //END class
    //********************************************************************************
    // Invalid invocation exceptions
    //********************************************************************************
    /**
    * @class TS.InvalidInvocationException
    *
    * @description This exceptions signals that a function was invoked in an unexpected or invalid way.
    *
    * @extends {TS.Exception}
    */
    class InvalidInvocationException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidInvocationException";
        }
    }
    TS.InvalidInvocationException = InvalidInvocationException; //END class
    //********************************************************************************
    // Invalid operation exceptions
    //********************************************************************************
    /**
    * @class TS.InvalidOperationException
    *
    * @description This exceptions signals an attempt to start an operation which was not allowed to start in the current
    *  situation.
    *
    * @extends {TS.Exception}
    */
    class InvalidOperationException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidOperationException";
        }
    }
    TS.InvalidOperationException = InvalidOperationException; //END class
    //********************************************************************************
    // Invalid cast exception
    //********************************************************************************
    /**
    * @class TS.InvalidCastException
    *
    * @description This exceptions signals that a casting operation failed.
  
    * @extends {TS.Exception}
    */
    class InvalidCastException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidCastException";
        }
    }
    TS.InvalidCastException = InvalidCastException; //END class
    //********************************************************************************
    // Invalid format exception
    //********************************************************************************
    /**
    * @class TS.InvalidFormatException
    *
    * @description This exceptions signals that an operation failed because of an invalid format of some data.
    *
    * @extends {TS.Exception}
    */
    class InvalidFormatException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName = "", argumentValue = "", message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidFormatException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.InvalidFormatException = InvalidFormatException; //END class
    //********************************************************************************
    // Invalid type exception
    //********************************************************************************
    /**
    * @class TS.InvalidTypeException
    *
    * @description This exceptions signals that an argument has an invalid type.
    *
    * @extends {TS.Exception}
    */
    class InvalidTypeException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception.
        * @param {any} argumentValue, The value of the argument which caused the exception.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName = "", argumentValue = "", message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.InvalidTypeException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.InvalidTypeException = InvalidTypeException; //END class
    //********************************************************************************
    // ArithmeticException
    //********************************************************************************
    /**
    * @class TS.ArithmeticException
    *
    * @description This exception signals an errors in an arithmetic, casting, or conversion operation.
    *  ArithmeticException is the base class for DivideByZeroException, NotFiniteNumberException, and OverflowException.
    *  Use one of the derived classes of ArithmeticException if appropriate to the exact nature of the error.
    *  Throw an ArithmeticException if there is no appropriate subclass to describe the nature of the error.
    *
    * @extends {TS.Exception}
    */
    class ArithmeticException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.ArithmeticException";
        }
    }
    TS.ArithmeticException = ArithmeticException; //END class
    /**
    * @class TS.OverflowException
    *
    * @description This exception signals that an arithmetic, casting, or conversion operation results in an overflow.
    *
    * @extends {TS.ArithmeticException}
    */
    class OverflowException extends ArithmeticException {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.OverflowException";
        }
    }
    TS.OverflowException = OverflowException; //END class
    /**
    * @class TS.DividedByZeroException
    *
    * @description This exception signals an attempt to divide a number value by zero.
    *
    * @extends {TS.ArithmeticException}
    */
    class DividedByZeroException extends ArithmeticException {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.DividedByZeroException";
        }
    }
    TS.DividedByZeroException = DividedByZeroException; //END class
    /**
    * @class TS.NotFiniteNumberException
    *
    * @description This exception signals an attempt to execute an arithmetic operation with a number value which is
    *  either infinite or Not-a-Number (NaN).
    *
    * @extends {TS.ArithmeticException}
    */
    class NotFiniteNumberException extends ArithmeticException {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.ArithmeticException}
        *
        * @get {string} type
        */
        get type() {
            return "TS.NotFiniteNumberException";
        }
    }
    TS.NotFiniteNumberException = NotFiniteNumberException; //END class
    //********************************************************************************
    // Infrastructure Exceptions
    //********************************************************************************
    /**
    * @class TS.NotImplementedException
    *
    * @description This exception signals that a function or class is not or not fully implemented and can't be used.
    *
    * @extends {TS.Exception}
    */
    class NotImplementedException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.NotImplementedException";
        }
    }
    TS.NotImplementedException = NotImplementedException;
    /**
    * @class TS.DeprecatedException
    *
    * @description This exception signals that a function or class should not longer be used.
    *
    * @extends {TS.Exception}
    */
    class DeprecatedException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.DeprecatedException";
        }
    }
    TS.DeprecatedException = DeprecatedException;
    //********************************************************************************
    // File and directory exceptions
    //********************************************************************************
    /**
    * @class TS.DirectoryNotFoundException
    *
    * @description This exception signals if the file system is not able to locate the requested directory.
    *
    * @extends {TS.Exception}
    */
    class DirectoryNotFoundException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} argumentName, The name of the argument which caused the exception. Typically the name of a directory variable.
        * @param {any} argumentValue, The value of the argument which caused the exception. Typically the value of a directory variable.
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(argumentName = "", argumentValue = "", message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.DirectoryNotFoundException";
        }
        /**
        * @description The name of the argument which caused the exception.
        *
        * @get {string} argumentName
        */
        get argumentName() {
            return this.internalArgumentName;
        }
        /**
        * @description The value of the argument which caused the exception.
        *
        * @get {string} argumentValue
        */
        get argumentValue() {
            return this.internalArgumentValue;
        }
    }
    TS.DirectoryNotFoundException = DirectoryNotFoundException;
    //********************************************************************************
    // IO exceptions
    //********************************************************************************
    /**
    * @class TS.BufferOverrunException
    *
    * @description This exception signals if the file system is not able to locate the requested directory.
    *
    * @extends {TS.Exception}
    */
    class BufferOverrunException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.BufferOverrunException";
        }
    }
    TS.BufferOverrunException = BufferOverrunException;
    //********************************************************************************
    // Environment exceptions
    //********************************************************************************
    /**
    * @class TS.EnvironmentNotSupportedException
    *
    * @description This exception that some operation failed because the current environment is not supported. That may
    *  be the reason if a JavaScript VM lacks some functions, a Node.js script is running in a browser or vice versa or
    *  the operation system is not supported.
    *
    * @extends {TS.Exception}
    */
    class EnvironmentNotSupportedException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.EnvironmentNotSupportedException";
        }
    }
    TS.EnvironmentNotSupportedException = EnvironmentNotSupportedException;
    //********************************************************************************
    // Timing exceptions
    //********************************************************************************
    /**
    * @class TS.TimeoutException
    *
    * @description This exception if thrown if a function or operation doesn't response in a timely manner.
    *
    * @extends {TS.Exception}
    */
    class TimeoutException extends TS.Exception {
        /**
        * @constructor
        *
        * @param {string} message?, An optional message string.
        * @param {Exception} innerException?, An optional inner exception.
        */
        constructor(message, innerException) {
            super(message, innerException);
        }
        /**
        * @override {TS.Exception}
        *
        * @get {string} type
        */
        get type() {
            return "TS.TimeoutException";
        }
    }
    TS.TimeoutException = TimeoutException;
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    /**
     * @description The module 'Utils' hosts a collection of functions which offer solutions for common problems or
     *  reoccurring tasks which are not class specific. Since they are not class specific, they are also not part of a
     *  class. They are simply collected in this file and are part of the namespace. You can consider all of this
     *  functions as static if you like, because you can call them without a prior instantiation of an object.
     */
    var Utils;
    (function (Utils) {
        /**
         * @description An array of currencies as defined in ISO 4217
         *
         * @see {@link http://www.iso.org/iso/home/standards/currency_codes.htm | ISO}
         */
        Utils.currencyArray = new Array({ Name: "United Arab Emirates Dirham", Code: "AED", Symbol: "" }, { Name: "Afghanistan Afghani", Code: "AFN", Symbol: "؋" }, { Name: "Albania Lek", Code: "ALL", Symbol: "" }, { Name: "Armenia Dram", Code: "AMD", Symbol: "" }, { Name: "Netherlands Antilles Guilder", Code: "ANG", Symbol: "ƒ" }, { Name: "Angola Kwanza", Code: "AOA", Symbol: "" }, { Name: "Argentina Peso", Code: "ARS", Symbol: "$" }, { Name: "Australia Dollar", Code: "AUD", Symbol: "$" }, { Name: "Aruba Guilder", Code: "AWG", Symbol: "ƒ" }, { Name: "Azerbaijan New Manat", Code: "AZN", Symbol: "ман" }, { Name: "Bosnia and Herzegovina Convertible Marka", Code: "BAM", Symbol: "KM" }, { Name: "Barbados Dollar", Code: "BBD", Symbol: "$" }, { Name: "Bangladesh Taka", Code: "BDT", Symbol: "" }, { Name: "Bulgaria Lev", Code: "BGN", Symbol: "лв" }, { Name: "Bahrain Dinar", Code: "BHD", Symbol: "" }, { Name: "Burundi Franc", Code: "BIF", Symbol: "" }, { Name: "Bermuda Dollar", Code: "BMD", Symbol: "$" }, { Name: "Brunei Darussalam Dollar", Code: "BND", Symbol: "$" }, { Name: "Bolivia Bolíviano", Code: "BOB", Symbol: "$b" }, { Name: "Brazil Real", Code: "BRL", Symbol: "R$" }, { Name: "Bahamas Dollar", Code: "BSD", Symbol: "$" }, { Name: "Bhutan Ngultrum", Code: "BTN", Symbol: "" }, { Name: "Botswana Pula", Code: "BWP", Symbol: "P" }, { Name: "Belarus Ruble", Code: "BYR", Symbol: "p." }, { Name: "Belize Dollar", Code: "BZD", Symbol: "BZ$" }, { Name: "Canada Dollar", Code: "CAD", Symbol: "$" }, { Name: "Congo/Kinshasa Franc", Code: "CDF", Symbol: "" }, { Name: "Switzerland Franc", Code: "CHF", Symbol: "CHF" }, { Name: "Chile Peso", Code: "CLP", Symbol: "$" }, { Name: "China Yuan Renminbi", Code: "CNY", Symbol: "¥" }, { Name: "Colombia Peso", Code: "COP", Symbol: "" }, { Name: "Costa Rica Colon", Code: "CRC", Symbol: "₡" }, { Name: "Cuba Convertible Peso", Code: "CUC", Symbol: "" }, { Name: "Cuba Peso", Code: "CUP", Symbol: "₱" }, { Name: "Cape Verde Escudo", Code: "CVE", Symbol: "" }, { Name: "Czech Republic Koruna", Code: "CZK", Symbol: "Kč" }, { Name: "Djibouti Franc", Code: "DJF", Symbol: "" }, { Name: "Denmark Krone", Code: "DKK", Symbol: "kr" }, { Name: "Dominican Republic Peso", Code: "DOP", Symbol: "RD$" }, { Name: "Algeria Dinar", Code: "DZD", Symbol: "" }, { Name: "Egypt Pound", Code: "EGP", Symbol: "£" }, { Name: "Eritrea Nakfa", Code: "ERN", Symbol: "" }, { Name: "Ethiopia Birr", Code: "ETB", Symbol: "" }, { Name: "European Union Euro", Code: "EUR", Symbol: "€" }, { Name: "Fiji Dollar", Code: "FJD", Symbol: "$" }, { Name: "Falkland Islands (Malvinas) Pound", Code: "FKP", Symbol: "£" }, { Name: "United Kingdom Pound", Code: "GBP", Symbol: "£" }, { Name: "Georgia Lari", Code: "GEL", Symbol: "" }, { Name: "Guernsey Pound", Code: "GGP", Symbol: "£" }, { Name: "Ghana Cedi", Code: "GHS", Symbol: "¢" }, { Name: "Gibraltar Pound", Code: "GIP", Symbol: "£" }, { Name: "Gambia Dalasi", Code: "GMD", Symbol: "" }, { Name: "Guinea Franc", Code: "GNF", Symbol: "" }, { Name: "Guatemala Quetzal", Code: "GTQ", Symbol: "Q" }, { Name: "Guyana Dollar", Code: "GYD", Symbol: "$" }, { Name: "Hong Kong Dollar", Code: "HKD", Symbol: "$" }, { Name: "Honduras Lempira", Code: "HNL", Symbol: "L" }, { Name: "Croatia Kuna", Code: "HRK", Symbol: "kn" }, { Name: "Haiti Gourde", Code: "HTG", Symbol: "" }, { Name: "Hungary Forint", Code: "HUF", Symbol: "Ft" }, { Name: "Indonesia Rupiah", Code: "IDR", Symbol: "Rp" }, { Name: "Israel Shekel", Code: "ILS", Symbol: "₪" }, { Name: "Isle of Man Pound", Code: "IMP", Symbol: "£" }, { Name: "India Rupee", Code: "INR", Symbol: "" }, { Name: "Iraq Dinar", Code: "IQD", Symbol: "" }, { Name: "Iran Rial", Code: "IRR", Symbol: "﷼" }, { Name: "Iceland Krona", Code: "ISK", Symbol: "kr" }, { Name: "Jersey Pound", Code: "JEP", Symbol: "£" }, { Name: "Jamaica Dollar", Code: "JMD", Symbol: "J$" }, { Name: "Jordan Dinar", Code: "JOD", Symbol: "" }, { Name: "Japan Yen", Code: "JPY", Symbol: "¥" }, { Name: "Kenya Shilling", Code: "KES", Symbol: "" }, { Name: "Kyrgyzstan Som", Code: "KGS", Symbol: "лв" }, { Name: "Cambodia Riel", Code: "KHR", Symbol: "៛" }, { Name: "Comoros Franc", Code: "KMF", Symbol: "" }, { Name: "Korea (North) Won", Code: "KPW", Symbol: "₩" }, { Name: "Korea (South) Won", Code: "KRW", Symbol: "₩" }, { Name: "Kuwait Dinar", Code: "KWD", Symbol: "" }, { Name: "Cayman Islands Dollar", Code: "KYD", Symbol: "$" }, { Name: "Kazakhstan Tenge", Code: "KZT", Symbol: "лв" }, { Name: "Laos Kip", Code: "LAK", Symbol: "₭" }, { Name: "Lebanon Pound", Code: "LBP", Symbol: "£" }, { Name: "Sri Lanka Rupee", Code: "LKR", Symbol: "₨" }, { Name: "Liberia Dollar", Code: "LRD", Symbol: "$" }, { Name: "Lesotho Loti", Code: "LSL", Symbol: "" }, { Name: "Libya Dinar", Code: "LYD", Symbol: "" }, { Name: "Morocco Dirham", Code: "MAD", Symbol: "" }, { Name: "Moldova Leu", Code: "MDL", Symbol: "" }, { Name: "Madagascar Ariary", Code: "MGA", Symbol: "" }, { Name: "Macedonia Denar", Code: "MKD", Symbol: "ден" }, { Name: "Myanmar (Burma) Kyat", Code: "MMK", Symbol: "" }, { Name: "Mongolia Tughrik", Code: "MNT", Symbol: "₮" }, { Name: "Macau Pataca", Code: "MOP", Symbol: "" }, { Name: "Mauritania Ouguiya", Code: "MRO", Symbol: "" }, { Name: "Mauritius Rupee", Code: "MUR", Symbol: "₨" }, { Name: "Maldives (Maldive Islands) Rufiyaa", Code: "MVR", Symbol: "" }, { Name: "Malawi Kwacha", Code: "MWK", Symbol: "" }, { Name: "Mexico Peso", Code: "MXN", Symbol: "$" }, { Name: "Malaysia Ringgit", Code: "MYR", Symbol: "RM" }, { Name: "Mozambique Metical", Code: "MZN", Symbol: "MT" }, { Name: "Namibia Dollar", Code: "NAD", Symbol: "$" }, { Name: "Nigeria Naira", Code: "NGN", Symbol: "₦" }, { Name: "Nicaragua Cordoba", Code: "NIO", Symbol: "C$" }, { Name: "Norway Krone", Code: "NOK", Symbol: "kr" }, { Name: "Nepal Rupee", Code: "NPR", Symbol: "₨" }, { Name: "New Zealand Dollar", Code: "NZD", Symbol: "$" }, { Name: "Oman Rial", Code: "OMR", Symbol: "﷼" }, { Name: "Panama Balboa", Code: "PAB", Symbol: "B/." }, { Name: "Peru Sol", Code: "PEN", Symbol: "S/." }, { Name: "Papua New Guinea Kina", Code: "PGK", Symbol: "" }, { Name: "Philippines Peso", Code: "PHP", Symbol: "₱" }, { Name: "Pakistan Rupee", Code: "PKR", Symbol: "₨" }, { Name: "Poland Zloty", Code: "PLN", Symbol: "zł" }, { Name: "Paraguay Guarani", Code: "PYG", Symbol: "Gs" }, { Name: "Qatar Riyal", Code: "QAR", Symbol: "﷼" }, { Name: "Romania New Leu", Code: "RON", Symbol: "lei" }, { Name: "Serbia Dinar", Code: "RSD", Symbol: "Дин." }, { Name: "Russia Ruble", Code: "RUB", Symbol: "руб" }, { Name: "Rwanda Franc", Code: "RWF", Symbol: "" }, { Name: "Saudi Arabia Riyal", Code: "SAR", Symbol: "﷼" }, { Name: "Solomon Islands Dollar", Code: "SBD", Symbol: "$" }, { Name: "Seychelles Rupee", Code: "SCR", Symbol: "₨" }, { Name: "Sudan Pound", Code: "SDG", Symbol: "" }, { Name: "Sweden Krona", Code: "SEK", Symbol: "kr" }, { Name: "Singapore Dollar", Code: "SGD", Symbol: "$" }, { Name: "Saint Helena Pound", Code: "SHP", Symbol: "£" }, { Name: "Sierra Leone Leone", Code: "SLL", Symbol: "" }, { Name: "Somalia Shilling", Code: "SOS", Symbol: "S" }, { Name: "Suriname Dollar", Code: "SRD", Symbol: "$" }, { Name: "São Tomé and Príncipe Dobra", Code: "STD", Symbol: "" }, { Name: "El Salvador Colon", Code: "SVC", Symbol: "$" }, { Name: "Syria Pound", Code: "SYP", Symbol: "£" }, { Name: "Swaziland Lilangeni", Code: "SZL", Symbol: "" }, { Name: "Thailand Baht", Code: "THB", Symbol: "฿" }, { Name: "Tajikistan Somoni", Code: "TJS", Symbol: "" }, { Name: "Turkmenistan Manat", Code: "TMT", Symbol: "" }, { Name: "Tunisia Dinar", Code: "TND", Symbol: "" }, { Name: "Tonga Pa'anga", Code: "TOP", Symbol: "" }, { Name: "Turkey Lira", Code: "TRY", Symbol: "" }, { Name: "Trinidad and Tobago Dollar", Code: "TTD", Symbol: "TT$" }, { Name: "Tuvalu Dollar", Code: "TVD", Symbol: "$" }, { Name: "Taiwan New Dollar", Code: "TWD", Symbol: "NT$" }, { Name: "Tanzania Shilling", Code: "TZS", Symbol: "" }, { Name: "Ukraine Hryvnia", Code: "UAH", Symbol: "₴" }, { Name: "Uganda Shilling", Code: "UGX", Symbol: "" }, { Name: "United States Dollar", Code: "USD", Symbol: "$" }, { Name: "Uruguay Peso", Code: "UYU", Symbol: "$U" }, { Name: "Uzbekistan Som", Code: "UZS", Symbol: "лв" }, { Name: "Venezuela Bolivar", Code: "VEF", Symbol: "Bs" }, { Name: "Viet Nam Dong", Code: "VND", Symbol: "₫" }, { Name: "Vanuatu Vatu", Code: "VUV", Symbol: "" }, { Name: "Samoa Tala", Code: "WST", Symbol: "" }, { Name: "Communauté Financière Africaine (BEAC) CFA Franc BEAC", Code: "XAF", Symbol: "" }, { Name: "East Caribbean Dollar", Code: "XCD", Symbol: "$" }, { Name: "International Monetary Fund (IMF) Special Drawing Rights", Code: "XDR", Symbol: "" }, { Name: "Communauté Financière Africaine (BCEAO) Franc", Code: "XOF", Symbol: "" }, { Name: "Comptoirs Français du Pacifique (CFP) Franc", Code: "XPF", Symbol: "" }, { Name: "Yemen Rial", Code: "YER", Symbol: "﷼" }, { Name: "South Africa Rand", Code: "ZAR", Symbol: "R" }, { Name: "Zambia Kwacha", Code: "ZMW", Symbol: "" }, { Name: "Zimbabwe Dollar", Code: "ZWD", Symbol: "Z$" });
        /**
        * @description Searches for all occurrences of 'searchString' in 'sourceString' and returns an array of the
        *  indexes where the search string occurred in the sourceString.
        *
        * @param {string} sourceString
        * @param {string} searchString
        *
        * @returns {Array<number>}, An array of indexes where the searchString occurred in the sourceString.
        */
        function allIndexOf(sourceString, searchString) {
            let result;
            result = new Array();
            if (!TS.Utils.Assert.isString(sourceString) || !TS.Utils.Assert.isString(searchString)) {
                return result;
            } //END if
            if (sourceString.length < searchString.length) {
                return result;
            } //END if
            if (sourceString.indexOf(searchString) < 0) {
                return result;
            } //END if
            result.push(sourceString.indexOf(searchString));
            while (sourceString.indexOf(searchString, result[result.length - 1] + 1) > -1) {
                result.push(sourceString.indexOf(searchString, result[result.length - 1] + 1));
            } //END while
            return result;
        }
        Utils.allIndexOf = allIndexOf;
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
        function bitStringToByteArray(bitString) {
            let resultArray;
            let byteStringArray;
            let index;
            resultArray = new Array();
            TS.Utils.checkBitStringParameter("bitString", bitString, "TS.Utils.bitStringToByteArray");
            byteStringArray = new Array();
            while (bitString.length > 0) {
                byteStringArray.push(bitString.substr(0, 8));
                bitString = bitString.substr(8);
            } //END while
            for (index = 0; index < byteStringArray.length; index++) {
                //Handle the remaining in an appropriate way for the 
                //current block 
                resultArray.push(parseInt(byteStringArray[index], 2));
            } //END for
            return resultArray;
        }
        Utils.bitStringToByteArray = bitStringToByteArray;
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
        function byteArrayToBitString(unsignedByteArray) {
            let resultString;
            TS.Utils.checkUByteArrayParameter("byteArray", unsignedByteArray, "TS.Utils.byteArrayToUInt");
            resultString = "";
            unsignedByteArray.forEach((value, index, array) => resultString += byteToBitString(value));
            return resultString;
        }
        Utils.byteArrayToBitString = byteArrayToBitString;
        /**
        * @description Converts an array of unsigned byte values into an unsigned integer value. The function throws an
        *  exception if the value in argument 'unsignedByteArray' is not a valid byte array or empty. The function throws
        *  a 'TS.ArgumentOutOfRangeException' if the conversion exceeds the maximum number range. (Number.MAX_SAFE_INTEGER)
        *
        * @params {Array<number>} byteArray, An array of unsigned byte values.
        *
        * @returns {number}, The result value as unsigned integer.
        *
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.InvalidTypeException }
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function byteArrayToUInt(unsignedByteArray) {
            let resultNumber;
            let factor;
            TS.Utils.checkUByteArrayParameter("byteArray", unsignedByteArray, "TS.Utils.byteArrayToUInt");
            resultNumber = 0;
            factor = 0;
            while (unsignedByteArray.length > 0) {
                resultNumber += Math.pow(256, factor) * unsignedByteArray.pop();
                factor++;
                if (resultNumber > Number.MAX_SAFE_INTEGER) {
                    throw new TS.ArgumentOutOfRangeException("unsignedByteArray", unsignedByteArray, "Argument 'unsignedByteArray' exceeds the maximum number range during conversion to an unsigned number in function TS.Utils.byteArrayToUInt");
                } //END if
            }
            return resultNumber;
        }
        Utils.byteArrayToUInt = byteArrayToUInt;
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
        function byteToBitString(unsignedByteValue) {
            let resultString;
            TS.Utils.checkUByteParameter("value", unsignedByteValue, "TS.Utils.byteToBitString");
            resultString = "";
            resultString += unsignedByteValue.toString(2);
            resultString = padLeft(resultString, "0", 8);
            return resultString;
        }
        Utils.byteToBitString = byteToBitString;
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
        function checkArrayLikeParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isArrayLike(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be an 'ArrayLike' parameter in function '" + functionName + "'.");
            }
        }
        Utils.checkArrayLikeParameter = checkArrayLikeParameter;
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
        function checkArrayParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isArray(parameter)) {
                throw new TS.InvalidTypeException(parameter, "Argument '" + parameterName + "' if not a valid array in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkArrayParameter = checkArrayParameter;
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
        function checkBitStringParameter(parameterName, parameter, functionName) {
            TS.Utils.checkStringParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isBinaryString(parameter)) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' is not a valid binary string in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkBitStringParameter = checkBitStringParameter;
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
        function checkBooleanParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isBoolean(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be a boolean parameter in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkBooleanParameter = checkBooleanParameter;
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
        function checkConstructorCall(thisContext, requiredType) {
            let functionName;
            if (TS.Utils.Assert.isNullOrUndefined(thisContext)) {
                if (TS.Utils.Assert.isNullOrUndefined(requiredType)) {
                    throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
                } //END if
                else {
                    functionName = (requiredType.name != undefined) ? requiredType.name : "anonymous";
                    //functionName = TS.Utils.getFunctionName(requiredType);
                    throw new TS.InvalidOperationException("The constructor of '" + functionName + "' must be called with the 'new' operator.");
                } //END else
            } //END if
            if (TS.Utils.Assert.isNullOrUndefined(requiredType)) {
                throw new TS.ArgumentNullOrUndefinedException("requiredType", "The argument 'requiredType' must not be null or undefined in function 'TS.Utils.checkConstructorCall.");
            } //END if
            //Object.getPrototypeOf(thisContext) == requiredType.prototype
            if (!(thisContext instanceof requiredType)) {
                functionName = (requiredType.name != undefined) ? requiredType.name : "anonymous";
                //functionName = TS.Utils.getFunctionName(requiredType);
                throw new TS.InvalidOperationException("The constructor of '" + functionName + "' must be called with the 'new' operator.");
            } //END if
        }
        Utils.checkConstructorCall = checkConstructorCall;
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
        function checkConstructorParameter(parameterName, parameter, functionName) {
            let object;
            let ownPropertyArray;
            let prototype;
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (typeof (parameter) != "function") {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must not of type 'function' in function '" + functionName + "'.");
            } //END if
            try {
                object = new parameter();
            } //END try
            catch (Ex) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a valid constructor function in function '" + functionName + "'.");
            }
            ;
            if (TS.Utils.Assert.isNullOrUndefined(object)) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            if (!TS.Utils.Assert.isObject(object)) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            //
            // Assure that the object is at least one created by the constructor function in argument 'parameter' and not an 
            // arbitrary object returned by a factory function.
            //
            if (!(object instanceof parameter)) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            if (!(parameter.prototype.isPrototypeOf(object))) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
            //
            // Check whether the new created object is an empty object or not. If the object is an empty object (An object 
            // without any properties or methods which are not default values.) treat it as erroneous. A constructor function
            // shouldn't return an empty object because that's meaningless.
            //
            ownPropertyArray = new Array();
            for (let key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    ownPropertyArray.push(key);
                } //END if
            } //END for
            //
            // Check whether the base class is 'Object' or not. If the  base class isn't object, check the own properties on 
            // the prototype. It may be that only the prototype got sub classed.
            //
            if (Object.getPrototypeOf(Object.getPrototypeOf(object)) != null) {
                prototype = Object.getPrototypeOf(object);
                for (let key in prototype) {
                    if (Object.prototype.hasOwnProperty.call(prototype, key)) {
                        ownPropertyArray.push(key);
                    } //END if
                } //END for
            } //END if
            //
            // It's an empty object. 
            //
            if (ownPropertyArray.length == 0) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a valid constructor function in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkConstructorParameter = checkConstructorParameter;
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
        function checkDateParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isDate(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be a valid Date in function '" + functionName + "'.");
            }
        }
        Utils.checkDateParameter = checkDateParameter;
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
        function checkDateStringParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isDateString(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be a valid Date string in function '" + functionName + "'.");
            }
        }
        Utils.checkDateStringParameter = checkDateStringParameter;
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
        function checkFunctionParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isFunction(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be a function parameter in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkFunctionParameter = checkFunctionParameter;
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
        function checkIntNumberParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isIntegerNumber(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid integer number in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkIntNumberParameter = checkIntNumberParameter;
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
        function checkInstanceOfParameter(parameterName, parameter, type, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isFunction(type)) {
                throw new TS.InvalidInvocationException("Argument 'type' must be a valid type in function 'TS.Utils.checkInstanceOf'.");
            } //END if
            if (!TS.Utils.Assert.isInstanceOf(parameter, type)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be an instance of the required type in function '" + functionName + "'.");
            }
        }
        Utils.checkInstanceOfParameter = checkInstanceOfParameter;
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
        function checkIterableParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isIterable(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be an iterable parameter in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkIterableParameter = checkIterableParameter;
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
        function checkKeyByteArray(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isUnsignedByteArray(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' must be an unsigned byte value array in function '" + functionName + "'.");
            } //eND if
            if ([16, 24, 32].filter((value) => value == parameter.length).length == 0) {
                throw new TS.ArgumentOutOfRangeException(parameterName, parameter, "Argument '" + parameterName + "' must be an array of unsigned byte values with [16 | 24 | 32] elements in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkKeyByteArray = checkKeyByteArray;
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
        function checkNotEmptyParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullUndefOrEmpty(parameter)) {
                throw new TS.ArgumentNullUndefOrEmptyException(parameter, "Argument '" + parameterName + "' must not be null, undefined, an empty array or an empty string in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkNotEmptyParameter = checkNotEmptyParameter;
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
        function checkNotUndefinedParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isUndefined(parameter)) {
                throw new TS.ArgumentUndefinedException(parameterName, "Argument '" + parameterName + "' must not be undefined in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkNotUndefinedParameter = checkNotUndefinedParameter;
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
        function checkNumberParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isNumber(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid number in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkNumberParameter = checkNumberParameter;
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
        function checkObjectParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isObject(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid object in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkObjectParameter = checkObjectParameter;
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
        function checkParameter(parameterName, parameter, functionName) {
            if (TS.Utils.Assert.isNullOrUndefined(parameter)) {
                throw new TS.ArgumentNullOrUndefinedException(parameterName, "Argument '" + parameterName + "' must not be null or undefined in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkParameter = checkParameter;
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
        function checkStringParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isString(parameter)) {
                throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a string variable in function '" + functionName + "'.");
            } //END if
            if (TS.Utils.Assert.isNullUndefOrWhiteSpace(parameter)) {
                throw new TS.ArgumentNullUndefOrWhiteSpaceException(parameterName, "Argument '" + parameterName + "' must not be empty or whitespace in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkStringParameter = checkStringParameter;
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
        function checkUByteArrayParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isUnsignedByteArray(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte array in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkUByteArrayParameter = checkUByteArrayParameter;
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
        function checkUByteParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isUnsignedByteValue(parameter)) {
                throw new TS.InvalidTypeException(parameterName, parameter, "Argument '" + parameterName + "' is not a valid unsigned byte value in function '" + functionName + "'.");
            } //END if
        }
        Utils.checkUByteParameter = checkUByteParameter;
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
        function checkUIntNumberParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isUnsignedIntegerNumber(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid positive integer number in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkUIntNumberParameter = checkUIntNumberParameter;
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
        function checkUInt64NumberParameter(parameterName, parameter, functionName) {
            TS.Utils.checkParameter(parameterName, parameter, functionName);
            if (!TS.Utils.Assert.isUInt64Number(parameter)) {
                throw new TS.InvalidTypeException("parameterName", parameter, "Argument '" + parameterName + "' must be a valid UInt64 number in function'" + functionName + "'.");
            } //END if
        }
        Utils.checkUInt64NumberParameter = checkUInt64NumberParameter;
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
        function compactArray(sparseArray, allowNull = false) {
            let result;
            if (!TS.Utils.Assert.isArray(sparseArray)) {
                return [];
            } //END if
            if (sparseArray.length == 0) {
                return [];
            } //END if
            result = new Array();
            sparseArray.forEach((value, index, array) => {
                if (allowNull) {
                    if (value !== undefined) {
                        result.push(value);
                    } //END if
                } //END if
                else {
                    if (value !== undefined && value !== null) {
                        result.push(value);
                    } //ENd if
                } //END else
            });
            return result;
        }
        Utils.compactArray = compactArray;
        /**
        * @description Creates a version 4 random GUID which is returned as string in a canonical representation.
        *
        * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
        * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
        *
        * @returns {string}, The new created GUID as string.
        */
        function createGUID() {
            let index;
            let charSetArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
            let charSetVariantArray = ["8", "9", "A", "B"];
            let returnString;
            returnString = "";
            for (index = 0; index < 8; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            returnString += "-";
            for (index = 0; index < 4; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            returnString += "-4";
            for (index = 0; index < 3; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            returnString += "-";
            returnString += charSetVariantArray[Math.floor(Math.random() * 4)];
            for (index = 0; index < 4; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 15)];
            } //END for
            returnString += "-";
            for (index = 0; index < 12; index++) {
                returnString += charSetArray[Math.floor(Math.random() * 16)];
            } //END for
            return returnString;
        }
        Utils.createGUID = createGUID;
        /**
        * @description Finds all currency elements which matches with the search pattern given in argument 'currency' and
        *  returns them in an array. The function returns an empty result array if there is no match for the provided
        *  search pattern.
        *
        * @param {string} currency, the search pattern used to identify a currency.
        *
        * @returns {Array<ICurrency>}, all matching currencies.
        */
        function findAllCurrencies(currency) {
            let resultArray = new Array();
            if (Utils.Assert.isNullUndefOrWhiteSpace(currency)) {
                return resultArray;
            }
            currency = currency.trim();
            let upperCurrency = currency.toUpperCase();
            resultArray = Utils.currencyArray.filter((value, index, array) => {
                if (currency.length > 3) {
                    if (value.Name.toUpperCase().indexOf(upperCurrency) > -1) {
                        return true;
                    }
                }
                if ((currency.length == 3) && (value.Code == upperCurrency)) {
                    return true;
                }
                if (value.Symbol == currency) {
                    return true;
                }
                return false;
            });
            return resultArray;
        }
        Utils.findAllCurrencies = findAllCurrencies;
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
        function findSingleCurrency(currency) {
            if (Utils.Assert.isNullUndefOrWhiteSpace(currency)) {
                return null;
            }
            currency = currency.trim();
            let upperCurrency = currency.toUpperCase();
            let found = Utils.currencyArray.filter((value, index, array) => {
                return (value.Name.toUpperCase() == upperCurrency || value.Code == upperCurrency || value.Symbol == currency);
            });
            if (found.length > 1) {
                throw new TS.AmbiguousResultException("currency", currency, "Found multiple possible currency results for the given search string.");
            }
            if (found.length == 0) {
                return null;
            }
            return found[0];
        }
        Utils.findSingleCurrency = findSingleCurrency;
        /**
         * @desciption Returns the corresponding value to a given key from the specified enumeration. If the key of enumObj
         *  is invalid, the returned value will be undefined. If the key is a string and the enumeration has a name value
         *  with a matching name, that value will be returned. If the key is a number and the enumeration has a named value
         *  with a matching value, the name of that value will be returned. This function does not implicitly convert
         *  number strings to numbers. That differs from the normal enum behavior and is by design. See example
         *
         * @example
         *
         *  enum testEnum = { ZERO, ONE, TWO };
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
         *
         * @param {string | number} key
         * @param {any} enumObj
         *
         * @returns {string | number | undefined}
         */
        function getValueFromEnum(key, enumObj) {
            if (TS.Utils.Assert.isNullOrUndefined(key)) {
                return undefined;
            }
            if (TS.Utils.Assert.isNullOrUndefined(enumObj)) {
                return undefined;
            }
            if (!TS.Utils.Assert.isEnum(enumObj)) {
                return undefined;
            }
            if (TS.Utils.Assert.isString(key) || TS.Utils.Assert.isNumber(key)) {
                let result = enumObj[key];
                if (TS.Utils.Assert.isString(key) && TS.Utils.Assert.isNumber(result)) {
                    return result;
                }
                if (TS.Utils.Assert.isNumber(key) && TS.Utils.Assert.isString(result)) {
                    return result;
                }
            }
            return undefined;
        }
        Utils.getValueFromEnum = getValueFromEnum;
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
        function HexStringToUByteArray(hexString) {
            let resultByteArray;
            let hexValueString;
            TS.Utils.checkStringParameter("hexString", hexString, "TS.Utils.HexStringToUByteArray");
            hexString = hexString.trim();
            if (hexString.length % 2 > 0) {
                throw new TS.InvalidFormatException("hexString", hexString, "Argument 'hexString' must contain an even number of characters in function 'TS.Utils.HexStringToUByteArray'.");
            }
            hexValueString = "";
            resultByteArray = new Array();
            while (hexString.length > 0) {
                hexValueString += hexString[0];
                hexValueString += hexString[1];
                hexString = hexString.substr(2);
                try {
                    resultByteArray.push(parseInt(hexValueString, 16));
                } //END try
                catch (ex) {
                    throw new TS.InvalidFormatException("hexString", hexString, "Argument 'hexString' must be a valid hexadecimal string in function 'TS.Utils.HexStringToUByteArray'. See inner exception for further information.", ex);
                } //END catch
                hexValueString = "";
            } //END while
            return resultByteArray;
        }
        Utils.HexStringToUByteArray = HexStringToUByteArray;
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
        function nextIndexOfReverse(sourceString, searchString, startIndex) {
            let index;
            if (!TS.Utils.Assert.isString(sourceString) || !TS.Utils.Assert.isString(searchString)) {
                return -1;
            } //END if
            if (!TS.Utils.Assert.isNullOrUndefined(startIndex)) {
                if (!TS.Utils.Assert.isUnsignedIntegerNumber(startIndex)) {
                    return -1;
                } //END if
                else {
                    index = startIndex;
                } //END else
            } //END if
            else {
                index = sourceString.length;
            } //END else
            if (startIndex - searchString.length < 0) {
                return -1;
            } //END if
            if (sourceString.length < searchString.length) {
                return -1;
            } //END if
            if (searchString.length == 0) {
                return -1;
            } //END if
            while (index > 0) {
                if (sourceString.substr(index, searchString.length) == searchString) {
                    return index;
                } //END if
                index--;
            } //END while
            return -1;
        }
        Utils.nextIndexOfReverse = nextIndexOfReverse;
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
        function nodeTypeToString(nodeType) {
            let resultString = "";
            switch (nodeType) {
                case 1:
                    {
                        resultString = "ELEMENT_NODE";
                        break;
                    }
                    ;
                case 2:
                    {
                        /* DEPRECATED */
                        resultString = "ATTRIBUTE_NODE";
                        break;
                    }
                    ;
                case 3:
                    {
                        resultString = "TEXT_NODE";
                        break;
                    }
                    ;
                case 4:
                    {
                        /* DEPRECATED */
                        resultString = "CDATA_SECTION_NODE";
                        break;
                    }
                    ;
                case 5:
                    {
                        /* DEPRECATED */
                        resultString = "ENTITY_REFERENCE_NODE";
                        break;
                    }
                    ;
                case 6:
                    {
                        /* DEPRECATED */
                        resultString = "ENTITY_NODE";
                        break;
                    }
                    ;
                case 7:
                    {
                        resultString = "PROCESSING_INSTRUCTION_NODE";
                        break;
                    }
                    ;
                case 8:
                    {
                        resultString = "COMMENT_NODE";
                        break;
                    }
                    ;
                case 9:
                    {
                        resultString = "DOCUMENT_NODE";
                        break;
                    }
                    ;
                case 10:
                    {
                        resultString = "DOCUMENT_TYPE_NODE";
                        break;
                    }
                    ;
                case 11:
                    {
                        resultString = "DOCUMENT_FRAGMENT_NODE";
                        break;
                    }
                    ;
                case 12:
                    {
                        /* DEPRECATED */
                        resultString = "NOTATION_NODE";
                        break;
                    }
                    ;
                default:
                    {
                        resultString = "undefined";
                        break;
                    }
            }
            return resultString;
        }
        Utils.nodeTypeToString = nodeTypeToString;
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
        function normalizePath(path) {
            let returnPath;
            if (TS.Utils.Assert.isNullOrUndefined(path)) {
                return "";
            } //END if
            if (!TS.Utils.Assert.isString(path)) {
                return "";
            } //END if
            if (path.trim().length == 0) {
                return "";
            } //END if
            returnPath = new String(path);
            while (returnPath.indexOf("\\") > -1) {
                returnPath = returnPath.replace("\\", "/");
            } //END while
            while (returnPath.indexOf("/./") > -1) {
                returnPath = returnPath.replace("/./", "/");
            } //END while
            while (returnPath.indexOf("//") > -1) {
                returnPath = returnPath.replace("//", "/");
            } //END while
            while (returnPath.indexOf("/../") > -1) {
                if (returnPath.indexOf("/../") == 0) {
                    //
                    // Something like '/../more/path/elements'. Up navigation at the root or the path isn't possible. Simple 
                    // substitution with a single slash. 
                    //
                    returnPath = returnPath.substr(3);
                }
                else if ((returnPath.indexOf("/../") == 2) && (returnPath.indexOf(":") == 1)) {
                    //
                    // Something like 'A:/../'. Up navigation at the drive letter isn't possible. Simple substitution with a 
                    // single slash. 
                    //
                    returnPath = returnPath.substring(0, 2) + returnPath.substr(5);
                }
                else {
                    let leadSegment;
                    let tailSegment;
                    let pathSegmentsArray;
                    returnPath = returnPath.replace("/../", "##");
                    pathSegmentsArray = returnPath.split("##");
                    leadSegment = pathSegmentsArray[0];
                    if (pathSegmentsArray.length > 1) {
                        tailSegment = pathSegmentsArray[1];
                    }
                    else {
                        tailSegment = "";
                    }
                    pathSegmentsArray = leadSegment.split("/");
                    pathSegmentsArray.pop();
                    leadSegment = pathSegmentsArray.join("/");
                    returnPath = leadSegment + "/" + tailSegment;
                }
            }
            if ((returnPath.length > 2) && returnPath.endsWith("/")) {
                returnPath = returnPath.substr(0, returnPath.length - 1);
            } //END if
            return returnPath.toString();
        }
        Utils.normalizePath = normalizePath;
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
        function padLeft(source, fillChar, length) {
            let fillString;
            let resultString;
            if (TS.Utils.Assert.isNullUndefOrEmpty(fillChar)) {
                return new String(source).toString();
            } //END if
            if (!TS.Utils.Assert.isUnsignedIntegerNumber(length)) {
                return new String(source).toString();
            } //END if
            fillString = fillChar;
            while (fillString.length < length) {
                fillString += fillString;
            } //END while
            fillString = fillString.substr(0, length);
            if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                return fillString;
            } //END if
            else {
                fillString = fillString.substr(0, length - source.length);
                fillString += source;
                return fillString;
            } //END else
        }
        Utils.padLeft = padLeft;
        /**
        * @description Removes the BOM from an UTF-8 encoded file.
        *
        * @param {string} text
        *
        * @returns {string}
        */
        function removeUTF8BOM(text) {
            return text.replace("ï»¿", "");
        }
        Utils.removeUTF8BOM = removeUTF8BOM;
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
        function UByteToHexString(value) {
            TS.Utils.checkUByteParameter("value", value, "TS.Utils.UByteToHexString");
            return ((value < 16) ? "0" + value.toString(16) : value.toString(16));
        }
        Utils.UByteToHexString = UByteToHexString;
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
        function UInt32SwapSignificantByteOrder(value) {
            let byteArray;
            let reverseByteArray;
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UInt32SwapSignificantByteOrder");
            if (value > 0xFFFFFFFF) {
                throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' must not be grater than 0xFFFFFFFF in oder to be accepted as an unsigned 32 bit value. The error occured in function 'TS.Utils.UInt32SwapSignificantByteOrder'.");
            }
            byteArray = TS.Utils.UInt32To4ByteArray(value);
            reverseByteArray = new Array();
            while (byteArray.length > 0) {
                reverseByteArray.push(byteArray.pop());
            }
            return TS.Utils.byteArrayToUInt(reverseByteArray);
        }
        Utils.UInt32SwapSignificantByteOrder = UInt32SwapSignificantByteOrder;
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
        function UInt32To4ByteArray(value) {
            let resultArray;
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UInt32To4ByteArray");
            if (value > 0xFFFFFFFF) {
                throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsigned 16 bit integer in function 'TS.Utils.UInt32To4ByteArray'.");
            } //END if
            resultArray = UIntToByteArray(value);
            while (resultArray.length < 4) {
                resultArray.unshift(0);
            } //END while
            return resultArray;
        }
        Utils.UInt32To4ByteArray = UInt32To4ByteArray;
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
        function UInt32ToHexString(value) {
            let resultString;
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UInt32ToHexString");
            if (value > 0xFFFFFFFF) {
                throw new TS.ArgumentOutOfRangeException("value", value, "Argument 'value' exceeded the range of an unsigned 32 bit integer in function 'TS.Utils.UInt32ToHexString'.");
            } //END if
            resultString = value.toString(16);
            return TS.Utils.padLeft(resultString, "0", 8);
        }
        Utils.UInt32ToHexString = UInt32ToHexString;
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
        function UIntToByteArray(value) {
            let resultArray;
            let byte;
            TS.Utils.checkParameter("value", value, "TS.Utils.UIntToByteArray");
            TS.Utils.checkUIntNumberParameter("value", value, "TS.Utils.UIntToByteArray");
            resultArray = new Array();
            while (value > 0) {
                byte = value & 0xff;
                resultArray.unshift(byte);
                value = (value - byte) / 256;
            } //END while
            return resultArray;
        }
        Utils.UIntToByteArray = UIntToByteArray;
    })(Utils = TS.Utils || (TS.Utils = {})); //END namespace
})(TS || (TS = {})); //END namespace
var TS;
(function (TS) {
    var Utils;
    (function (Utils) {
        /**
        * @description A collection of assertion functions. Those are functions which take on argument and return a
        *  boolean value. The boolean value describes whether the argument satisfies a specific condition or not.
        */
        var Assert;
        (function (Assert) {
            /**
            * @description Returns true if the type of the argument 'source' is an arguments type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArguments(source) {
                if (TS.Utils.Assert.isObject(source)) {
                    return source.toString().toLowerCase().indexOf("arguments") > -1;
                } //END if
                return false;
            }
            Assert.isArguments = isArguments;
            /**
            * @description  Returns true if the type of the argument 'source' is an array type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArray(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return Array.isArray(source);
            }
            Assert.isArray = isArray;
            /**
            * @description  Returns true if the type of the argument 'source' is an array like type, otherwise false. Array
            *  like types are collections like the arguments collection or DOM collections. They have a length property but
            *  they are actually not arrays because they have no indexer.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isArrayLike(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                }
                if (TS.Utils.Assert.isNullOrUndefined(source.length)) {
                    return false;
                }
                if (!TS.Utils.Assert.isUnsignedIntegerNumber(source.length)) {
                    return false;
                }
                return true;
            }
            Assert.isArrayLike = isArrayLike;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty binary string. If the string
            *  contains other characters than '0' and '1', even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isBinaryString(source) {
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                return (/^[01]+$/gmi).test(source);
            }
            Assert.isBinaryString = isBinaryString;
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
            function isBoolean(source) {
                return TS.Utils.Assert.isBooleanObject(source) || TS.Utils.Assert.isBooleanValue(source);
            }
            Assert.isBoolean = isBoolean;
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
            function isBooleanObject(source) {
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source.valueOf()) == "boolean";
            }
            Assert.isBooleanObject = isBooleanObject;
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
            function isBooleanValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source) == "boolean";
            }
            Assert.isBooleanValue = isBooleanValue;
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
            function isByteArray(source) {
                if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                return source.every((value) => {
                    if (TS.Utils.Assert.isArray(value)) {
                        return TS.Utils.Assert.isByteArray(value);
                    } //END if
                    else {
                        return TS.Utils.Assert.isByteValue(value);
                    } //END else
                });
            }
            Assert.isByteArray = isByteArray;
            /**
            * @description Returns true if the type of the argument 'source' is in the  range of signed byte values
            *  [-127 .. 127], otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isByteValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isIntegerNumber(source)) {
                    return false;
                } //END if
                return ((source >= -127) && (source <= 127));
            }
            Assert.isByteValue = isByteValue;
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
            function isConstructor(source) {
                let object;
                let ownPropertyArray;
                let prototype;
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (typeof (source) != "function") {
                    return false;
                } //END if
                try {
                    object = new source();
                } //END try
                catch (Ex) {
                    return false;
                }
                ;
                if (TS.Utils.Assert.isNullOrUndefined(object)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isObject(object)) {
                    return false;
                } //END if
                //
                //Assure that the object is at least one created by the constructor function in argument 'source'
                //and not an arbitrary object returned by a factory function.
                //
                if (!(object instanceof source)) {
                    return false;
                } //END if
                if (!(source.prototype.isPrototypeOf(object))) {
                    return false;
                } //END if
                //
                // Check whether the new created object is an empty object or not. If the object is an empty object (an object 
                // without any properties or methods which are not default values.) treat it as erroneous. A constructor 
                // function shouldn't return an empty object because that's meaningless.
                //
                //
                // Collect the ownPoperties of the current instance.
                //
                ownPropertyArray = new Array();
                for (let key in object) {
                    if (Object.prototype.hasOwnProperty.call(object, key)) {
                        ownPropertyArray.push(key);
                    } //END if
                } //END for
                //
                // Check whether the base class is 'Object' or not. If the base class isn't object, check the own properties on 
                // the prototype. It may be that only the prototype got sub classed.
                //
                if (Object.getPrototypeOf(Object.getPrototypeOf(object)) != null) {
                    prototype = Object.getPrototypeOf(object);
                    for (let key in prototype) {
                        if (Object.prototype.hasOwnProperty.call(prototype, key)) {
                            ownPropertyArray.push(key);
                        } //END if
                    } //END for
                } //END if
                //
                // If the 'ownPropertyArray' is still empty consider the object an empty object.
                //
                if (ownPropertyArray.length == 0) {
                    return false;
                } //END if
                return true;
            }
            Assert.isConstructor = isConstructor;
            /**
            * @description Returns true if the type of the argument 'source' is a date object type created with 'new Date()',
            *  otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDate(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return Object.prototype.toString.call(source).indexOf("Date") > 0;
            }
            Assert.isDate = isDate;
            /**
            * @description Returns true if the type of the argument 'source' is a valid date string otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDateString(source) {
                if (TS.Utils.Assert.isNullUndefOrWhiteSpace(source)) {
                    return false;
                }
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                }
                if (TS.Utils.Assert.isNaN(Date.parse(source))) {
                    return false;
                }
                return true;
            }
            Assert.isDateString = isDateString;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty decimal string. If the string
            *  contains other characters than [0-9], even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDecimalString(source) {
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                return (/^[0-9]+$/gmi).test(source);
            }
            Assert.isDecimalString = isDecimalString;
            /**
            * @description  Returns true if the type of the argument 'source' is a dense array type. That means the array
            *  contains no element which is undefined. Returns false otherwise.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isDenseArray(source) {
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                for (let index = 0; index < source.length; index++) {
                    if (source[index] == undefined) {
                        return false;
                    }
                }
                return true;
            }
            Assert.isDenseArray = isDenseArray;
            /**
            * @description Returns true if the value of the argument 'source' is an empty array, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isEmptyArray(source) {
                if (TS.Utils.Assert.isArray(source)) {
                    return source.length == 0;
                }
                return false;
            }
            Assert.isEmptyArray = isEmptyArray;
            /**
            * @description Returns true if the type of the argument 'source' is an enum type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isEnum(source) {
                let indexArray;
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                if (TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                indexArray = new Array();
                for (let value in source) {
                    indexArray.push(value);
                } //END for
                if ((indexArray.length % 2) != 0) {
                    return false;
                } //END if
                indexArray = indexArray.slice(0, indexArray.length / 2);
                for (let index = 0; index < indexArray.length; index++) {
                    let value = source[indexArray[index]];
                    if (TS.Utils.Assert.isNullOrUndefined(value)) {
                        return false;
                    } //END if
                    if (source[value] != indexArray[index]) {
                        return false;
                    } //END if
                } //END for
                return true;
            }
            Assert.isEnum = isEnum;
            /**
            * @description Returns true if the type of the argument 'source' is a function type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isFunction(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return typeof (source) == "function";
            }
            Assert.isFunction = isFunction;
            /**
            * @description Returns true if the type of the argument 'source' is a generator object type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isGenerator(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isObject(source)) {
                    let genFunc = Object.getPrototypeOf(function* () { }).constructor;
                    if (source instanceof genFunc) {
                        return true;
                    }
                }
                return source.toString() == "[object Generator]";
            }
            Assert.isGenerator = isGenerator;
            /**
            * @description Returns true if the type of the argument 'source' is a none empty hexadecimal string. If the
            *  string contains other characters than [0-9, A-F, a-f], even white space, the return value will be false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isHexString(source) {
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                return (/^[0-9A-Fa-f]+$/gmi).test(source);
            }
            Assert.isHexString = isHexString;
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
            function isInfiniteNumber(source) {
                return TS.Utils.Assert.isNumberValue(source) && (source === Number.POSITIVE_INFINITY || source === Number.NEGATIVE_INFINITY);
            }
            Assert.isInfiniteNumber = isInfiniteNumber;
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
            function isInstanceOf(source, type) {
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                }
                if (!TS.Utils.Assert.isFunction(type)) {
                    return false;
                }
                return source instanceof type;
            }
            Assert.isInstanceOf = isInstanceOf;
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
            function isIntegerNumber(source) {
                return Number.isSafeInteger(source);
            }
            Assert.isIntegerNumber = isIntegerNumber;
            /**
            * @description Returns true if the value of the argument 'source' is an iterable value, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isIterable(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (TS.Utils.Assert.isNullOrUndefined(source[Symbol.iterator])) {
                    return false;
                } //END if
                return true;
            }
            Assert.isIterable = isIterable;
            /**
            * @description This function is just a wrapper around the 'Number.isNaN' function. It's only purpose is to make
            *  the assertion functions available in on place.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNaN(source) {
                return Number.isNaN(source);
            }
            Assert.isNaN = isNaN;
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
            function isNegativInfiniteNumber(source) {
                return TS.Utils.Assert.isNumberValue(source) && (source === Number.NEGATIVE_INFINITY);
            }
            Assert.isNegativInfiniteNumber = isNegativInfiniteNumber;
            /**
            * @description Returns true if the value of the argument 'source' is null, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNull(source) {
                return source === null;
            }
            Assert.isNull = isNull;
            /**
            * @description Returns true if the value of the argument 'source' is null or undefined, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isNullOrUndefined(source) {
                if (TS.Utils.Assert.isUndefined(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isNull(source)) {
                    return true;
                } //END if
                return false;
            }
            Assert.isNullOrUndefined = isNullOrUndefined;
            function isNullUndefOrEmpty(source) {
                if (TS.Utils.Assert.isUndefined(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isNull(source)) {
                    return true;
                } //END if
                if (Array.isArray(source)) {
                    return source.length == 0;
                } //END if
                if (TS.Utils.Assert.isString(source)) {
                    return String(source).length == 0;
                } //END if
                return false;
            }
            Assert.isNullUndefOrEmpty = isNullUndefOrEmpty;
            /**
            * @description Returns true if the argument value is either null or undefined or is a string which is either empty
            *  or contains only white space characters.
            *
            * @param {string} source
            *
            * @returns {boolean}
            */
            function isNullUndefOrWhiteSpace(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return true;
                } //END if
                if (!TS.Utils.Assert.isString(source)) {
                    return false;
                } //END if
                if (source.trim().length == 0) {
                    return true;
                } //END if
                return false;
            }
            Assert.isNullUndefOrWhiteSpace = isNullUndefOrWhiteSpace;
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
            function isNumber(source) {
                return TS.Utils.Assert.isNumberObject(source) || TS.Utils.Assert.isNumberValue(source);
            }
            Assert.isNumber = isNumber;
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
            function isNumberObject(source) {
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source.valueOf()) == "number";
            }
            Assert.isNumberObject = isNumberObject;
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
            function isNumberValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                if (typeof (source) == "number") {
                    if (Number.isNaN(source)) {
                        return false;
                    } //END if
                    return true;
                } //END if
                return false;
            }
            Assert.isNumberValue = isNumberValue;
            /**
            * @description Returns true if the type of the argument 'source' is an object type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isObject(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return typeof (source) == "object";
            }
            Assert.isObject = isObject;
            /**
            * @description Returns true if the type of argument 'source' is a plain object otherwise false. A plain object is
            *  an object without a prototype. It is either a literal object or an object created with 'Object.create'
            *  function called with a null argument.
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
            function isPlainObject(source) {
                if (!isObject(source)) {
                    return false;
                }
                let prototype = Object.getPrototypeOf(source);
                if (prototype === null) {
                    return true;
                }
                let ctor = Object.prototype.hasOwnProperty.call(prototype, 'constructor') && prototype.constructor;
                return (typeof ctor == 'function' && ctor instanceof ctor && Function.prototype.toString.call(ctor) == Function.prototype.toString.call(Object));
            }
            Assert.isPlainObject = isPlainObject;
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
            function isPrimitiveType(source) {
                if (TS.Utils.Assert.isBooleanValue(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isNumberValue(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isStringValue(source)) {
                    return true;
                } //END if
                if (TS.Utils.Assert.isSymbol(source)) {
                    return true;
                }
                return false;
            }
            Assert.isPrimitiveType = isPrimitiveType;
            /**
            * @description  Returns true if the type of the argument 'source' is a regular expression type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isRegEx(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return Object.prototype.toString.call(source).indexOf("RegExp") > 0;
            }
            Assert.isRegEx = isRegEx;
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
            function isString(source) {
                return TS.Utils.Assert.isStringObject(source) || TS.Utils.Assert.isStringValue(source);
            }
            Assert.isString = isString;
            /**
            * @description Returns true if the type of the argument 'source' is an array of string values, otherwise false.
            *
            * @see TS.Utils.Assert.isStringValue
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isStringArray(source) {
                if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                return source.every((value) => {
                    if (TS.Utils.Assert.isArray(value)) {
                        return TS.Utils.Assert.isStringArray(value);
                    } //END if
                    else {
                        return TS.Utils.Assert.isStringValue(value);
                    } //END else
                });
            }
            Assert.isStringArray = isStringArray;
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
            function isStringObject(source) {
                if (!TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source.valueOf()) == "string";
            }
            Assert.isStringObject = isStringObject;
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
            function isStringValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source) || TS.Utils.Assert.isObject(source)) {
                    return false;
                } //END if
                return typeof (source) == "string";
            }
            Assert.isStringValue = isStringValue;
            /**
            * @description Returns true if the type of the argument 'source' is a symbol type, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isSymbol(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                return typeof (source) == "symbol";
            }
            Assert.isSymbol = isSymbol;
            /**
            * @description Returns true if the value of the argument 'source' is an UInt64Number, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUInt64Number(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                }
                if (TS.Utils.Assert.isNullOrUndefined(source.mostSignificantInteger) || TS.Utils.Assert.isNullOrUndefined(source.leastSignificantInteger)) {
                    return false;
                } //END if
                if ((source.mostSignificantInteger < 0) || (source.leastSignificantInteger < 0)) {
                    return false;
                }
                return true;
            }
            Assert.isUInt64Number = isUInt64Number;
            /**
            * @description Returns true if the value of the argument 'source' is undefined, otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUndefined(source) {
                return source === undefined;
            }
            Assert.isUndefined = isUndefined;
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
            function isUnsignedByteArray(source) {
                if (TS.Utils.Assert.isNullUndefOrEmpty(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isArray(source)) {
                    return false;
                } //END if
                return source.every((value, index, array) => {
                    if (TS.Utils.Assert.isArray(value)) {
                        return TS.Utils.Assert.isUnsignedByteArray(value);
                    } //END if
                    else {
                        return TS.Utils.Assert.isUnsignedByteValue(value);
                    } //END else
                });
            }
            Assert.isUnsignedByteArray = isUnsignedByteArray;
            /**
            * @description Returns true if the type of the argument 'source' is in the range of unsigned byte values
            *  [0 .. 255], otherwise false.
            *
            * @param {any} source
            *
            * @returns {boolean}
            */
            function isUnsignedByteValue(source) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                } //END if
                if (!TS.Utils.Assert.isIntegerNumber(source)) {
                    return false;
                } //END if
                return ((0 <= source) && (source < 256));
            }
            Assert.isUnsignedByteValue = isUnsignedByteValue;
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
            function isUnsignedInfiniteNumber(source) {
                return TS.Utils.Assert.isNumberValue(source) && (source === Number.POSITIVE_INFINITY);
            }
            Assert.isUnsignedInfiniteNumber = isUnsignedInfiniteNumber;
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
            function isUnsignedIntegerNumber(source) {
                if (TS.Utils.Assert.isIntegerNumber(source)) {
                    return source > -1;
                } //END if
                return false;
            }
            Assert.isUnsignedIntegerNumber = isUnsignedIntegerNumber;
            /**
            * @description Returns true if the value of the argument 'source' is a valid element of the enumeration in
            *  argument 'enumObj'. This function does not implicitly convert number strings to numbers. That differs from the
            *  normal enum behavior and is by design. See example.
            *
            * @example
            *
            *  enum testEnum = { ZERO, ONE, TWO };
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
            *
            * @param {number | string} source
            * @param {Object} enumObj
            *
            * @returns {boolean}
            */
            function isValueOfEnum(source, enumObj) {
                if (TS.Utils.Assert.isNullOrUndefined(source)) {
                    return false;
                }
                if (TS.Utils.Assert.isNullOrUndefined(enumObj)) {
                    return false;
                }
                if (!TS.Utils.Assert.isEnum(enumObj)) {
                    return false;
                }
                if (TS.Utils.Assert.isString(source) || TS.Utils.Assert.isNumber(source)) {
                    let result = enumObj[source];
                    if (TS.Utils.Assert.isString(source) && TS.Utils.Assert.isNumber(result)) {
                        return true;
                    }
                    if (TS.Utils.Assert.isNumber(source) && TS.Utils.Assert.isString(result)) {
                        return true;
                    }
                }
                return false;
            }
            Assert.isValueOfEnum = isValueOfEnum;
        })(Assert = Utils.Assert || (Utils.Assert = {})); //END class
    })(Utils = TS.Utils || (TS.Utils = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var TypeCode;
    (function (TypeCode) {
        /**
        * @class TS.TypeCode.UInt64
        *
        * @descripion This class implements a 64 bit unsigned integer number type and some basic operations on this type.
        *  The UInt64 is used in some cipher algorithms.
        */
        class UInt64 {
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
            constructor(mostSignificantInteger = 0, leastSignificantInteger = 0) {
                this.mostSignificantInteger = mostSignificantInteger;
                this.leastSignificantInteger = leastSignificantInteger;
            }
            /**
            * @description Returns the greatest number which can be stored in a UInt64.
            *
            * @get {TS.TypeCode.UInt64}  MAX_VALUE
            */
            static get MAX_VALUE() {
                return new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
            }
            /**
            * @description Returns the value of the most significant integer of this UInt64 number.
            *
            * @get {number} mostSignificantInteger
            */
            get mostSignificantInteger() {
                return this.internalMostSignificantInteger;
            }
            /**
            * @description Sets the value of the most significant integer of this UInt64 number.
            *
            * @set {number} mostSignificantInteger
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.ArgumentOutOfRangeException
            */
            set mostSignificantInteger(value) {
                TS.Utils.checkUIntNumberParameter("value", value, "TS.TypeCode.UInt64.set mostSignificantInteger");
                if (value > 0xFFFFFFFF) {
                    throw new TS.ArgumentOutOfRangeException("mostSignificantInteger", value, "The argument exceeded the valid number range. Valid numbers must fall into the range of [0 ..." + 0xFFFFFFFF .toString() + "]");
                } //END if
                this.internalMostSignificantInteger = value;
            }
            /**
            * @description Returns the value of the least significant integer of this UInt64 number.
            *
            * @get {number} leastSignificantInteger
            */
            get leastSignificantInteger() {
                return this.internalLeastSignificantInteger;
            }
            /**
            * @description Sets the value of the least significant integer of this UInt64 number.
            *
            * @set {number} leastSignificantInteger
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.ArgumentOutOfRangeException
            */
            set leastSignificantInteger(value) {
                TS.Utils.checkUIntNumberParameter("value", value, "TS.TypeCode.UInt64.set leastSignificantInteger");
                if (value > 0xFFFFFFFF) {
                    throw new TS.ArgumentOutOfRangeException("leastSignificantInteger", value, "The argument exceeded the valid number range. Valid numbers must fall into the range of [0 ..." + 0xFFFFFFFF .toString() + "]");
                } //END if
                this.internalLeastSignificantInteger = value;
            }
            /**
            * @descriptions Adds a UInt64 value to the current value.
            *
            * @param {TS.TypeCode.UInt64} value
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            * @throws TS.OverflowException
            */
            add(value) {
                TS.Utils.checkUInt64NumberParameter("value", value, "TS.TypeCode.UInt64.add");
                let result = TS.TypeCode.UInt64.add(this, value);
                this.mostSignificantInteger = result.mostSignificantInteger;
                this.leastSignificantInteger = result.leastSignificantInteger;
            }
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
            static add(first, second) {
                TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.equal");
                TS.Utils.checkUInt64NumberParameter("second", second, "TS.TypeCode.UInt64.equal");
                let tempOverflow;
                let tempLSInteger;
                let tempMSInteger;
                tempLSInteger = first.leastSignificantInteger + second.leastSignificantInteger;
                if (tempLSInteger > 0xFFFFFFFF) {
                    tempOverflow = 1;
                    tempLSInteger = tempLSInteger % 0x100000000;
                } //END if
                else {
                    tempOverflow = 0;
                } //END else
                tempMSInteger = first.mostSignificantInteger + second.mostSignificantInteger + tempOverflow;
                if (tempMSInteger > 0xFFFFFFFF) {
                    throw new TS.OverflowException("An arithmetic operation resulted in an overflow. The error occurred in 'TS.TypeCode.UInt64.add'.");
                } //END if
                return new TS.TypeCode.UInt64(tempMSInteger, tempLSInteger);
            }
            /**
            * @description Adds a UInt64 value to the current value in modulo operation mode.
            *
            * @param {TS.TypeCode.UInt64} value
            *
            * @throws TS.ArgumentNullOrUndefinedException
            * @throws TS.InvalidTypeException
            */
            addModulo(value) {
                TS.Utils.checkUInt64NumberParameter("value", value, "TS.TypeCode.UInt64.add");
                let result = TS.TypeCode.UInt64.addModulo(this, value);
                this.mostSignificantInteger = result.mostSignificantInteger;
                this.leastSignificantInteger = result.leastSignificantInteger;
            }
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
            static addModulo(first, second) {
                TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.equal");
                TS.Utils.checkUInt64NumberParameter("second", second, "TS.TypeCode.UInt64.equal");
                let tempOverflow;
                let tempLSInteger;
                let tempMSInteger;
                tempLSInteger = first.leastSignificantInteger + second.leastSignificantInteger;
                if (tempLSInteger > 0xFFFFFFFF) {
                    tempOverflow = 1;
                    tempLSInteger = tempLSInteger % 0x100000000;
                } //END if
                else {
                    tempOverflow = 0;
                } //END else
                tempMSInteger = first.mostSignificantInteger + second.mostSignificantInteger + tempOverflow;
                if (tempMSInteger > 0xFFFFFFFF) {
                    tempMSInteger = tempMSInteger % 0x100000000;
                } //END if
                return new UInt64(tempMSInteger, tempLSInteger);
            }
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
            equal(other) {
                TS.Utils.checkUInt64NumberParameter("other", other, "TS.TypeCode.UInt64.equal");
                return TS.TypeCode.UInt64.equal(this, other);
            }
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
            static equal(first, second) {
                TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.equal");
                TS.Utils.checkUInt64NumberParameter("second", second, "TS.TypeCode.UInt64.equal");
                return ((first.mostSignificantInteger === second.mostSignificantInteger) && (first.leastSignificantInteger === second.leastSignificantInteger));
            }
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
            greater(other) {
                TS.Utils.checkUInt64NumberParameter("value", other, "TS.TypeCode.UInt64.greater");
                return UInt64.greater(this, other);
            }
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
            static greater(first, second) {
                TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.greater");
                TS.Utils.checkUInt64NumberParameter("second", second, "TS.TypeCode.UInt64.greater");
                if (first.mostSignificantInteger > second.mostSignificantInteger) {
                    return true;
                } //END if
                if (first.mostSignificantInteger < second.mostSignificantInteger) {
                    return false;
                } //END if
                if (first.leastSignificantInteger > second.leastSignificantInteger) {
                    return true;
                } //END if
                if (first.leastSignificantInteger < second.leastSignificantInteger) {
                    return false;
                } //END if
                //
                // Must be equal.
                //
                return false;
            }
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
            less(other) {
                TS.Utils.checkUInt64NumberParameter("other", other, "TS.TypeCode.UInt64.less");
                return TS.TypeCode.UInt64.less(this, other);
            }
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
            static less(first, second) {
                TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.less");
                TS.Utils.checkUInt64NumberParameter("second", second, "TS.TypeCode.UInt64.less");
                return TS.TypeCode.UInt64.greater(second, first);
            }
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
            static UIntToUInt64(intNumber) {
                TS.Utils.checkUIntNumberParameter("intNumber", intNumber, "TS.TypeCode.UInt64.UIntToUInt64");
                if (intNumber > 0xFFFFFFFF) {
                    let leastInt = intNumber % 0x100000000;
                    let mostInt = (intNumber - leastInt) / 0x100000000;
                    return new UInt64(mostInt, leastInt);
                } //END if
                return new UInt64(0, intNumber);
            }
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
            static UInt64ToUInt(UInt64Number) {
                TS.Utils.checkUInt64NumberParameter("UInt64Number", UInt64Number, "TS.TypeCode.UInt64.UInt64ToUInt");
                let result = UInt64Number.mostSignificantInteger * 0x100000000 + UInt64Number.leastSignificantInteger;
                if (result > Number.MAX_SAFE_INTEGER) {
                    throw new TS.OverflowException("The current number exceeds the range of 'Number.MAX_SAVE_INTEGER'. The exception occurred in function 'TS.TypeCode.UInt64.UInt64ToUInt'.");
                }
                return result;
            }
        }
        TypeCode.UInt64 = UInt64; //END class
    })(TypeCode = TS.TypeCode || (TS.TypeCode = {})); //END module
})(TS || (TS = {})); //END module
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Encoding;
    (function (Encoding) {
        /**
        * @description  Normalizes the string provided in argument 'data'. Normalization comprehends the removal of line
        *  breaks and white space. The transformation from URL compliant encoding to normal base64 encoding and the
        *  addition of missing pad characters if necessary. In a last step that function checks whether the given data
        *  string is a valid base64 encoded string or not. The function throws a 'TS.InvalidFormatException' if the input
        *  string is invalid. Returns the normalized input string as result.
        *
        * @private
        *
        * @param {string} data, The base64 encoded data as string.
        *
        * @returns {string}, The normalized data string.
        *
        * @throws {TS.InvalidFormatException}
        */
        function normalizeBase64EncodedData(data) {
            let resultString = "";
            let formatTest;
            resultString = data.replace("/(\r)/gm", "").replace("/(\n)/gm", "").replace(/(\s)/gm, "");
            resultString = resultString.replace(/-/gm, "+").replace(/_/gm, "/");
            formatTest = resultString.search(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=]/gm);
            if (formatTest > -1) {
                throw new TS.InvalidFormatException("data", data, "The given data string is not a valid base64 encoded string. Found invalid character: '" + resultString.charAt(formatTest) + "'.");
            } //END if
            while (resultString.length % 4 !== 0) {
                resultString += "=";
            } //END while
            return resultString;
        }
        /**
        * @description Makes the string provided in argument 'data' URL compliant. That means all characters which are
        *  allowed base 64 characters but have a special meaning in URLs get replaced by substitutes which are allowed
        *  URL characters.
        *
        * @private
        *
        * @param {string} data, A base 64 encoded data string.
        *
        * @retruns {string}, The URL compliant data string.
        */
        function makeURLCompliant(data) {
            return data.replace(/\+/gm, "-").replace(/\//gm, "_").replace(/\=/gm, "");
        }
        /**
        * @class TS.Encoding.Base64
        *
        * @description This class implements a base64 encoding and decoding function.
        *
        * @see {@link https://www.ietf.org/rfc/rfc3548.txt | IETF}
        */
        class Base64 {
            /**
            * @description  Decodes a base64 encoded UTF-8 string and returns the decoded UTF-16 string. The decode function
            *  is functional equivalent to the following C# code:
            *
            * @example
            *  var byteArray = System.Convert.FromBase64String(data));
            *
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
            static decode(data) {
                let byteArray;
                let result;
                TS.Utils.checkNotEmptyParameter("data", data, "TS.Encoding.Base64.decode");
                TS.Utils.checkStringParameter("data", data, "TS.Encoding.Base64.decode");
                if (!TS.Utils.Assert.isString(data)) {
                    throw new TS.InvalidTypeException("data", data, "The argument 'data' must be a valid string. Error occurred in function TS.Encoding.Base64.decode'.");
                } //END if
                //
                // Throws: TS.InvalidTypeException, 
                // TS.InvalidFormatException
                //
                try {
                    byteArray = Base64.decodeToByteArray(data);
                } //END try
                catch (Exception) {
                    throw new TS.InvalidFormatException("data", data, "The argument 'data' must be a valid Base64 encoded string. Error occurred in function TS.Encoding.Base64.decodey'. See the inner exception for further details.", Exception);
                } //END catch
                //
                // Throws: TS.ArgumentNullUndefOrEmptyException, 
                // TS.InvalidTypeException, 
                // TS.InvalidOperationException
                //
                try {
                    result = Encoding.UTF.UTF8ArrayToUTF16String(byteArray);
                } //END try
                catch (Exception) {
                    throw new TS.InvalidFormatException("data", data, "The argument 'data' appears to be invalid. Error occurred in function TS.Encoding.Base64.decode'. See the inner exception for further details.", Exception);
                } //END catch
                return result;
            }
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
            static decodeToByteArray(data) {
                let bits;
                let charIndex0;
                let charIndex1;
                let charIndex2;
                let charIndex3;
                let dataString;
                let index;
                let octetData0;
                let octetData1;
                let octetData2;
                let result;
                TS.Utils.checkStringParameter("data", data, "TS.Encoding.Base64.decodeToByteArray");
                if (!TS.Utils.Assert.isString(data)) {
                    throw new TS.InvalidTypeException("data", data, "The argument 'data' must be a valid string. Error occurred in function TS.Encoding.Base64.decodeToByteArray'.");
                } //END if
                //May throw TS.InvalidFormatException
                try {
                    dataString = normalizeBase64EncodedData(data);
                } //END try
                catch (Exception) {
                    throw new TS.InvalidFormatException("data", data, "The argument 'data' must be a valid Base64 encoded string. Error occurred in function TS.Encoding.Base64.decodeToByteArray'. See the inner exception for further details.", Exception);
                } //END catch
                if (dataString.length == 0) {
                    return new Array();
                } //END if
                index = 0;
                result = new Array();
                do {
                    charIndex0 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));
                    charIndex1 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));
                    charIndex2 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));
                    charIndex3 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));
                    bits = 0;
                    if (charIndex2 == 64) {
                        bits = charIndex0 << 18 | charIndex1 << 12;
                    }
                    else if (charIndex3 == 64) {
                        bits = charIndex0 << 18 | charIndex1 << 12 | charIndex2 << 6;
                    }
                    else {
                        bits = charIndex0 << 18 | charIndex1 << 12 | charIndex2 << 6 | charIndex3;
                    }
                    octetData0 = bits >>> 16;
                    octetData1 = bits >> 8 & 0xff;
                    octetData2 = bits & 0xff;
                    //BASE64_CHARACTER_SET[64] = '=';
                    if (charIndex2 == 64) {
                        result.push(octetData0);
                    } //END if
                    else if (charIndex3 == 64) {
                        result.push(octetData0);
                        result.push(octetData1);
                    } //END if
                    else {
                        result.push(octetData0);
                        result.push(octetData1);
                        result.push(octetData2);
                    } //END else
                } while (index < dataString.length - 1);
                return result;
            }
            /**
            * @description Encodes the given UTF-16 string to UTF-8 in a first step and then to base64 in a second step and
            *  returns that encoded string. The encode function is functional equivalent to the following C# code:
            *
            * @example
            *  var byteArray = System.Text.Encoding.UTF8.GetBytes(data);
            *
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
            static encode(data) {
                let bits;
                let charIndex0;
                let charIndex1;
                let charIndex2;
                let charIndex3;
                let byteArray;
                let bytesToEncode;
                let index;
                let octetData0;
                let octetData1;
                let octetData2;
                let padding;
                let result;
                TS.Utils.checkNotEmptyParameter("data", data, "TS.Encoding.Base64.encode");
                if (!TS.Utils.Assert.isString(data)) {
                    throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Encoding.Base64.encode' must be a valid string. Error occurred in function 'TS.Encoding.Base64.encode'.");
                } //END if
                index = 0;
                result = "";
                byteArray = Encoding.UTF.UTF16StringToUTF8Array(data);
                do {
                    charIndex0 = 0;
                    charIndex1 = 0;
                    charIndex2 = 0;
                    charIndex3 = 0;
                    bytesToEncode = ((data.length - index) >= 3) ? 3 : (data.length - index);
                    octetData0 = byteArray[index++];
                    (bytesToEncode > 1) ? octetData1 = byteArray[index++] : octetData1 = 0;
                    (bytesToEncode > 2) ? octetData2 = byteArray[index++] : octetData2 = 0;
                    bits = octetData0 << 16 | octetData1 << 8 | octetData2;
                    charIndex0 = bits >>> 18;
                    charIndex1 = bits >> 12 & 0x3f;
                    switch (bytesToEncode) {
                        case 3:
                            {
                                charIndex2 = bits >> 6 & 0x3f;
                                charIndex3 = bits & 0x3f;
                                break;
                            }
                        case 2:
                            {
                                charIndex2 = bits >> 6 & 0x3f;
                                charIndex3 = 64;
                                break;
                            }
                        case 1:
                            {
                                charIndex2 = 64;
                                charIndex3 = 64;
                                break;
                            }
                    }
                    result += this.BASE64_CHARACTER_SET.charAt(charIndex0) + this.BASE64_CHARACTER_SET.charAt(charIndex1) + this.BASE64_CHARACTER_SET.charAt(charIndex2) + this.BASE64_CHARACTER_SET.charAt(charIndex3);
                } while (index < data.length);
                return result;
            }
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
            static encodeURLCompliant(data) {
                if (TS.Utils.Assert.isNullUndefOrEmpty(data)) {
                    return "";
                } //END if
                if (!TS.Utils.Assert.isString(data)) {
                    throw new TS.InvalidTypeException("data", data, "The argument 'data' must be a valid string. Error occurred in function 'TS.Encoding.Base64.encodeURLCompliant'.");
                } //END if
                return makeURLCompliant(TS.Encoding.Base64.encode(data));
            }
        }
        Base64.BASE64_CHARACTER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        Encoding.Base64 = Base64; //END class
    })(Encoding = TS.Encoding || (TS.Encoding = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var Encoding;
    (function (Encoding) {
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
            static UTF16StringToUTF8Array(input) {
                let resultByteArray;
                let index;
                let codePoint;
                let splitArray;
                TS.Utils.checkParameter("input", input, "TS.Encoding.UTF.UTF16StringToUTF8Array");
                TS.Utils.checkStringParameter("input", input, "TS.Encoding.UTF.UTF16StringToUTF8Array");
                resultByteArray = new Array();
                for (index = 0; index < input.length; index++) {
                    //
                    //Throws: TS.ArgumentNullUndefOrEmptyException, TS.InvalidTypeException
                    //
                    codePoint = codePointAt(input, index);
                    if (codePoint === null) {
                        continue;
                    } //END if
                    //Code point U+0000 - U+007F, 7 bits, 1 byte
                    if (codePoint <= 127) {
                        resultByteArray.push(codePoint);
                    } //END if
                    else if ((codePoint > 128) && (codePoint <= 2047)) {
                        splitArray = split6BitArray(codePoint);
                        resultByteArray.push((splitArray[0] & 31) + 192); /* 5 significant bits */
                        resultByteArray.push(splitArray[1] + 128);
                    } //END else if
                    else if ((codePoint >= 2048) && (codePoint <= 65535)) {
                        splitArray = split6BitArray(codePoint);
                        resultByteArray.push((splitArray[0] & 15) + 224); /* 4 significant bits */
                        resultByteArray.push(splitArray[1] + 128);
                        resultByteArray.push(splitArray[2] + 128);
                    } //END else if
                    else if ((codePoint >= 65536) && (codePoint <= 2097151)) {
                        splitArray = split6BitArray(codePoint);
                        resultByteArray.push((splitArray[0] & 7) + 240); /* 3 significant bits */
                        resultByteArray.push(splitArray[1] + 128);
                        resultByteArray.push(splitArray[2] + 128);
                        resultByteArray.push(splitArray[3] + 128);
                    } //END else if
                    if (codePoint > 2097151) {
                        throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF16StringToUTF8Array'. The input string may not be a valid UTF-16 encoded string.");
                    } //END if
                } //END for
                return resultByteArray;
            }
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
            static UTF8ArrayToUTF16String(byteArray) {
                let index;
                let resultString;
                let charCode;
                let highSurrogate;
                let lowSurrogate;
                TS.Utils.checkParameter("byteArray", byteArray, "TS.Encoding.UTF.UTF8ArrayToUTF16String");
                TS.Utils.checkUByteArrayParameter("byteArray", byteArray, "TS.Encoding.UTF.UTF8ArrayToUTF16String");
                resultString = "";
                for (index = 0; index < byteArray.length; index++) {
                    if (byteArray[index] < 128) {
                        resultString += String.fromCharCode(byteArray[index]);
                        continue;
                    } //END if
                    else if ((byteArray[index] & 252) == 252) {
                        /* invalid */
                        throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
                    } //END else if
                    else if ((byteArray[index] & 248) == 248) {
                        /* invalid */
                        throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
                    } //END else if
                    else if ((byteArray[index] & 240) == 240) {
                        if ((byteArray.length - 1) < (index + 3)) {
                            /* invalid */
                            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
                        } //END if
                        charCode = ((byteArray[index] & 7) * 262144);
                        charCode += ((byteArray[index + 1] & 63) * 4096);
                        charCode += ((byteArray[index + 2] & 63) * 64);
                        charCode += (byteArray[index + 3] & 63);
                        highSurrogate = ((charCode - 0x10000) >>> 10) + 0xD800;
                        lowSurrogate = ((charCode - 0x10000) & 0x3FF) + 0xDC00;
                        index += 3;
                        resultString += String.fromCharCode(highSurrogate, lowSurrogate);
                        continue;
                    } //END else if
                    else if ((byteArray[index] & 224) == 224) {
                        if ((byteArray.length - 1) < (index + 2)) {
                            /* invalid */
                            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
                        } //END if
                        charCode = (byteArray[index] & 15) * 4096;
                        charCode += ((byteArray[index + 1] & 63) * 64);
                        charCode += (byteArray[index + 2] & 63);
                        index += 2;
                        resultString += String.fromCharCode(charCode);
                        continue;
                    } //END else if
                    else
                        ((byteArray[index] & 192) == 192); /* Two high bits */
                    {
                        if ((byteArray.length - 1) < (index + 1)) {
                            /* invalid */
                            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
                        } //END if
                        charCode = (byteArray[index] & 31) * 64;
                        charCode += (byteArray[index + 1] & 63);
                        index += 1;
                        resultString += String.fromCharCode(charCode);
                        continue;
                    } //END else 
                } //END for
                return resultString;
            }
        }
        Encoding.UTF = UTF; //END class
        /**
        * @description Splits a number into an array of 6-bit numbers. That means, every array element has a value in the
        *  range of [0..63].
        *
        * @private
        *
        * @param {number} x, The number to split.
        *
        * @returns {Array<number>}, The resulting array of 6-bit values.
        *
        * @throws {TS.InvalidTypeException}
        * @throws {TS.ArgumentNullOrUndefinedException}
        * @throws {TS.ArgumentOutOfRangeException}
        */
        function split6BitArray(x) {
            let resultArray;
            let internalX;
            TS.Utils.checkUIntNumberParameter("x", x, "TS.Encoding.split6BitArray");
            if ((x < 128) || (x > 2097151)) {
                throw new TS.ArgumentOutOfRangeException("x", x, "Argument 'x' must have a value in the range [128..2097151] in function 'TS.Encoding.split6BitArray'.");
            } //END if
            internalX = x;
            resultArray = new Array();
            while (internalX > 0) {
                resultArray.unshift(internalX & 63);
                internalX = internalX >>> 6;
            } //END while
            if (x <= 2047) {
                if (resultArray.length < 2) {
                    resultArray.unshift(0);
                } //END if
            } //END if
            if (x <= 65535) {
                if (resultArray.length < 3) {
                    resultArray.unshift(0);
                } //END if
            } //END if
            if (x <= 2097151) {
                if (resultArray.length < 4) {
                    resultArray.unshift(0);
                } //END if
            } //END if
            return resultArray;
        }
        /**
        * @description Returns the code point of the grapheme / text element in the source string at the given position,
        *  or null if there isn't a valid grapheme at the given position.
        *
        * @private
        *
        * @param {string} sourceString
        * @param {number} position
        *
        * @returns {any}
        *
        * @throws {TS.ArgumentNullUndefOrEmptyException}
        * @throws {TS.ArgumentNullUndefOrWhiteSpaceException}
        * @throws {TS.InvalidTypeException}
        */
        function codePointAt(sourceString, position) {
            let first;
            let second;
            TS.Utils.checkParameter("sourceString", sourceString, "TS.Encoding.codePointAt");
            TS.Utils.checkParameter("position", position, "TS.Encoding.codePointAt");
            TS.Utils.checkStringParameter("sourceString", sourceString, "TS.Encoding.codePointAt");
            first = sourceString.charCodeAt(position);
            //
            // check if it’s the start of a surrogate pair
            //
            if (isHighSurrogate(first) && sourceString.length > position + 1) {
                second = sourceString.charCodeAt(position + 1);
                if (isLowSurrogate(second)) {
                    //
                    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    //
                    return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                } //END if
            } //END if
            if (isLowSurrogate(first)) {
                return null;
            } //END if
            return first;
        }
        /**
        * @description The function returns true if the value of the code unit given in argument 'codeUnit' is in the range
        *  of high surrogate code units [0xD800..0xDBFF], otherwise false.
        *
        * @private
        *
        * @param {number} codeUnit.
        *
        * @returns {boolean}
        */
        function isHighSurrogate(codeUnit) {
            return (codeUnit >= 0xD800 && codeUnit <= 0xDBFF);
        }
        /**
        * @description The function returns true if the value of the code unit given in argument 'codeUnit' is in the range
        *  of low surrogate code units [0xDC00..0xDFFF], otherwise false.
        *
        * @private
        *
        * @param {number} codeUnit.
        *
        * @returns boolean.
        */
        function isLowSurrogate(codeUnit) {
            return (codeUnit >= 0xDC00 && codeUnit <= 0xDFFF);
        }
    })(Encoding = TS.Encoding || (TS.Encoding = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var IO;
    (function (IO) {
        (function (StreamStateEnum) {
            StreamStateEnum[StreamStateEnum["READY"] = 0] = "READY";
            StreamStateEnum[StreamStateEnum["REQUEST_FOR_CLOSE"] = 1] = "REQUEST_FOR_CLOSE";
            StreamStateEnum[StreamStateEnum["CLOSED"] = 2] = "CLOSED";
            StreamStateEnum[StreamStateEnum["ERROR"] = 3] = "ERROR";
        })(IO.StreamStateEnum || (IO.StreamStateEnum = {}));
        var StreamStateEnum = IO.StreamStateEnum;
    })(IO = TS.IO || (TS.IO = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="../_references.ts" />
/// <reference path="../_references.ts" />
var TS;
(function (TS) {
    var IO;
    (function (IO) {
        /**
        * @class TS.IO.Stream
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
        *
        * @implements {TS.IO.IStream<T>}
        */
        class Stream {
            constructor(maxBufferSize, onClosedCallback, onDataCallback, onErrorCallback) {
                this.internalWriteLoopTimeout = 33;
                this.internalDataAnnounceHandler = null;
                this.internalError = null;
                this.internalOnClosed = null;
                this.internalOnError = null;
                this.internalOnData = null;
                this.internalOutstandingPromiseCounter = 0;
                this.internalBuffer = new Array();
                if (arguments.length == 0) {
                    this.internalMaxBufferSize = Number.MAX_SAFE_INTEGER;
                }
                if (arguments.length > 0) {
                    TS.Utils.checkUIntNumberParameter("maxBufferSize", maxBufferSize, "TS.IO.Stream.constructor");
                    if (maxBufferSize == 0) {
                        throw new TS.ArgumentOutOfRangeException("maxBufferSize", maxBufferSize, "Argument 'maxBufferSize' must be an integer in the range of [1..Number.MAX_SAFE_INTEGER in function 'TS.IO.Stream.constructor'.");
                    }
                    this.internalMaxBufferSize = maxBufferSize;
                    if ((arguments.length > 1) && (arguments.length == 4)) {
                        TS.Utils.checkFunctionParameter("onClosedCallback", onClosedCallback, "TS.IO.Stream.constructor");
                        TS.Utils.checkFunctionParameter("onDataCallback", onDataCallback, "TS.IO.Stream.constructor");
                        TS.Utils.checkFunctionParameter("onErrorCallback", onErrorCallback, "TS.IO.Stream.constructor");
                        this.internalOnClosed = onClosedCallback;
                        this.internalOnData = onDataCallback;
                        this.internalOnError = onErrorCallback;
                    }
                    if ((arguments.length != 1) && (arguments.length != 4)) {
                        throw new TS.InvalidInvocationException("One or all of the provided parameters in function 'constructor' are invalid. The error occurred in function 'TS.IO.Stream.constructor'.");
                    }
                }
                this.internalDataAnnounceTimeout = this.internalWriteLoopTimeout * 5;
                this.internalDataAnnounceHandler = this.setInterval(() => {
                    if (this.hasData) {
                        if (this.onData != null) {
                            this.onData(this);
                        }
                    }
                    else {
                        if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) && (this.internalOutstandingPromiseCounter == 0)) {
                            this.clearInterval(this.internalDataAnnounceHandler);
                            this.internalDataAnnounceHandler = null;
                            this.internalClose();
                            if (this.onClosed != null) {
                                this.onClosed(this);
                                this.internalOnClosed = null;
                            }
                        }
                    }
                }, this.internalDataAnnounceTimeout);
                this.internalState = TS.IO.StreamStateEnum.READY;
            }
            /**
            * @description Returns the current stream state.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {TS.IO.StreamStateEnum}
            */
            get state() {
                return this.internalState;
            }
            /**
            * @description Returns the exception which locked the stream.
            *
            * @implements {TS.IO.IStream}
            *
            * @get { TS.Exception}
            */
            get error() {
                return this.internalError;
            }
            /**
            * @description Returns true if the stream is in an error state.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {boolean}
            */
            get hasError() {
                return this.internalError != null;
            }
            /**
            * @description Returns true if the stream buffer has data to read.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {boolean}
            */
            get hasData() {
                return this.internalBuffer.length > 0;
            }
            /**
            * @description Returns true if the stream is close.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {boolean}
            */
            get isClosed() {
                return this.state == TS.IO.StreamStateEnum.CLOSED;
            }
            /**
            * @description Returns the 'onClosed' callback function which was set during construction or null.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {((stream: TS.IO.IStream<T>) => void) | null}
            */
            get onClosed() {
                return this.internalOnClosed;
            }
            /**
            * @description Returns the 'onData' callback function which was set during construction or null.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {((stream: TS.IO.IStream<T>) => void) | null}
            */
            get onData() {
                return this.internalOnData;
            }
            /**
            * @description Returns the 'onError' callback function which was set during construction or null.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {((stream: TS.IO.IStream<T>) => void) | null}
            */
            get onError() {
                return this.internalOnError;
            }
            /**
            * @description Returns true if the stream is ready for write operations.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {boolean}
            */
            get canWrite() {
                return this.internalState == TS.IO.StreamStateEnum.READY;
            }
            /**
            * @description Returns size of the buffer which is currently available.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {number}
            */
            get freeBufferSize() {
                return this.internalMaxBufferSize - this.internalBuffer.length;
            }
            /**
            * @description Returns true if the stream is ready for read operations.
            *
            * @implements {TS.IO.IStream}
            *
            * @get {boolean}
            */
            get canRead() {
                return !this.isClosed && !this.hasError && this.hasData;
            }
            /**
            * @description Tries to call the 'onData' callback handler.
            */
            tryOnData() {
                if (this.hasData) {
                    if (this.onData != null) {
                        this.onData(this);
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
            setError(value) {
                if (TS.Utils.Assert.isNullOrUndefined(value)) {
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
            clearTimeout(timer) {
                if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.clearTimeout)) {
                    return global.clearTimeout(timer);
                }
                if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.clearTimeout)) {
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
            setTimeout(handler, timeout) {
                if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.setTimeout)) {
                    return global.setTimeout(handler, timeout);
                }
                else if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.setTimeout)) {
                    return window.setTimeout(handler, timeout);
                }
                else {
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
            clearInterval(timer) {
                if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.clearInterval)) {
                    return global.clearInterval(timer);
                }
                if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.clearInterval)) {
                    return window.clearInterval(timer);
                }
            }
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
            setInterval(handler, interval) {
                if ((typeof window === 'undefined') && !TS.Utils.Assert.isNullOrUndefined(global) && !TS.Utils.Assert.isNullOrUndefined(global.setInterval)) {
                    return global.setInterval(handler, interval);
                }
                else if (!TS.Utils.Assert.isNullOrUndefined(window) && !TS.Utils.Assert.isNullOrUndefined(window.setInterval)) {
                    return window.setInterval(handler, interval);
                }
                else {
                    throw new TS.EnvironmentNotSupportedException("The current environment is not supported. The exception occurred in function 'TS.IO.Stream.setInterval'.");
                }
            }
            /**
            * @description Clears the internal buffer, removes all callback functions except for 'onClosed' and sets the
            *  'internalState' to 'TS.IO.StreamStateEnum.CLOSED' if the stream isn't already in an error state.
            *
            * @private
            */
            internalClose() {
                if (!(this.internalState == TS.IO.StreamStateEnum.ERROR)) {
                    this.internalState = TS.IO.StreamStateEnum.CLOSED;
                } //END if
                this.internalBuffer = new Array();
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
            write(data) {
                let writeData;
                if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed) {
                    throw new TS.InvalidOperationException("There are no more write operations allowed after the close function has been called. The error occurred in function 'TS.IO.Stream.write'.");
                }
                if (this.hasError) {
                    throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed.  The error occurred in function 'TS.IO.Stream.write'.");
                }
                if (TS.Utils.Assert.isArray(data)) {
                    if (!TS.Utils.Assert.isDenseArray(data)) {
                        throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be a dense array. (Must not contain 'undefined' values) The error occurred in function 'TS.IO.Stream.write'.");
                    }
                }
                else if (TS.Utils.Assert.isUndefined(data)) {
                    throw new TS.ArgumentUndefinedException("data", "Argument 'data' must not be undefined in function 'TS.IO.Stream.Write'.");
                }
                writeData = new Array();
                if (TS.Utils.Assert.isArray(data)) {
                    writeData = data.slice();
                }
                else {
                    writeData.push(data);
                }
                while (writeData.length > 0) {
                    if (this.internalBuffer.length < this.internalMaxBufferSize) {
                        this.internalBuffer.push(writeData.shift());
                    } //END if
                    else {
                        this.setError(new TS.BufferOverrunException("The current write operation caused a buffer overrun. The error occurred in function 'TS.IO.Stream.Write'."));
                        //
                        // If there is an error handler assigned to the stream, signal the exception on the error handler.
                        //
                        if (this.onError != null) {
                            this.onError(this);
                            this.internalClose();
                        }
                        else {
                            this.internalClose();
                            throw this.error;
                        }
                    }
                } //END while
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
            writeAsync(data, timeout) {
                let loopHandler;
                let writeTime = 0;
                let writeTimeout = 0;
                let writeData;
                let prms;
                if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed) {
                    throw new TS.InvalidOperationException("There are no more write operations allowed once the close function has been called. The error occurred in function 'TS.IO.Stream.writeAsync'.");
                }
                if (this.hasError) {
                    throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed. The error occurred in function 'TS.IO.Stream.writeAsync'.");
                }
                if (TS.Utils.Assert.isArray(data)) {
                    if (!TS.Utils.Assert.isDenseArray(data)) {
                        throw new TS.InvalidTypeException("data", data, "The array in argument 'data' must be a dense array (Must not contain 'undefined' values). The error occurred in function 'TS.IO.Stream.writeAsync'.");
                    }
                }
                else if (TS.Utils.Assert.isUndefined(data)) {
                    throw new TS.ArgumentUndefinedException("data", "Argument 'data' must not be undefined in function 'TS.IO.Stream.writeAsync'.");
                }
                if (!TS.Utils.Assert.isNullOrUndefined(timeout)) {
                    TS.Utils.checkUIntNumberParameter("timeout", timeout, "TS.IO.Stream.writeAsync");
                    writeTimeout = timeout;
                }
                else {
                    writeTimeout = 0;
                }
                writeData = new Array();
                if (TS.Utils.Assert.isArray(data)) {
                    writeData = data.slice();
                }
                else {
                    writeData.push(data);
                }
                prms = new Promise((resolve, reject) => {
                    if (this.hasError) {
                        reject(this.error);
                    } //END if
                    else {
                        if (writeData.length == 0) {
                            resolve();
                        } //END if
                        else {
                            if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) || this.isClosed) {
                                this.setError(new TS.InvalidOperationException("There are no more write operations allowed once the close function has been called. The error occurred in function 'TS.IO.Stream.writeAsync'."));
                                reject(this.error);
                                if (this.onError != null) {
                                    //
                                    // Saving the 'onError' callback in a local variable, deleting the original callback functions
                                    // and than calling the local stored reference to the 'onError' callback looks like stupid
                                    // programming. But is solves the problem that every queued promise calls the 'onError'
                                    // callback once. Calling the 'internalClose' function after a call to the 'onError' callback
                                    // would lead to that problem.
                                    //
                                    let onErrorRef = this.onError;
                                    this.internalClose();
                                    onErrorRef(this);
                                }
                                this.internalClose();
                            } //END if
                            else {
                                writeTime = 0;
                                loopHandler = this.setInterval(() => {
                                    if (this.hasError) {
                                        this.clearInterval(loopHandler);
                                        reject(this.error);
                                    }
                                    else if (writeData.length > 0) {
                                        if (this.internalBuffer.length < this.internalMaxBufferSize) {
                                            if (this.internalBuffer.length + writeData.length > this.internalMaxBufferSize) {
                                                this.internalBuffer.push(...writeData.splice(0, (this.internalMaxBufferSize - this.internalBuffer.length)));
                                            }
                                            else {
                                                this.internalBuffer.push(...writeData);
                                                writeData.length = 0;
                                            }
                                            //
                                            // Reset accumulated write time after a successful write operation.
                                            //
                                            writeTime = 0;
                                        } //END if
                                        else {
                                            //
                                            // The buffer was already full. Try to get rid of the data.
                                            //
                                            this.tryOnData();
                                            //
                                            // Add loopTime to writeTime if the write operation wasn't successful.
                                            //
                                            writeTime += this.internalWriteLoopTimeout;
                                            if ((writeTimeout > 0) && (writeTime > writeTimeout * 1000)) {
                                                this.clearInterval(loopHandler);
                                                this.setError(new TS.TimeoutException("The current operation did not complete in a timely manner. The error occurred in function 'TS.IO.Stream.writeAsync'."));
                                                reject(this.error);
                                                if (this.onError != null) {
                                                    //
                                                    // Saving the 'onError' callback in a local variable, deleting the original callback functions
                                                    // and than calling the local stored reference to the 'onError' callback looks like stupid
                                                    // programming. But is solves the problem that every queued promise calls the 'onError'
                                                    // callback once. Calling the 'internalClose' function after a call to the 'onError' callback
                                                    // would lead to that problem.
                                                    //
                                                    let onErrorRef = this.onError;
                                                    this.internalClose();
                                                    onErrorRef(this);
                                                }
                                                this.internalClose();
                                            } //END if
                                        } //END else
                                    } //END else if
                                    else {
                                        writeTime = 0;
                                        this.clearInterval(loopHandler);
                                        resolve();
                                    } //END else
                                }, this.internalWriteLoopTimeout);
                            } //END else
                        } //END else
                    } //END else
                });
                this.internalOutstandingPromiseCounter++;
                return prms.then(() => {
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
            read() {
                let result;
                if (this.isClosed) {
                    throw new TS.InvalidOperationException("There are no more read operations allowed once stream has been closed. The error occurred in function 'TS.IO.Stream.read'.");
                }
                if (this.hasError) {
                    throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed. The error occurred in function 'TS.IO.Stream.read'.");
                }
                if (this.hasData) {
                    return this.internalBuffer.shift();
                }
                else {
                    //
                    // Check for a close request if it has been the last element in the stream.
                    //
                    if ((this.state == TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE) && (this.internalOutstandingPromiseCounter == 0)) {
                        this.internalClose();
                        if (this.onClosed != null) {
                            this.onClosed(this);
                            this.internalOnClosed = null;
                        } //END if
                    } //END if
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
            readBuffer() {
                let result = new Array();
                if (this.isClosed) {
                    throw new TS.InvalidOperationException("There are no more read operations allowed once stream has been closed. The error occurred in function 'TS.IO.Stream.read'.");
                }
                if (this.hasError) {
                    throw new TS.InvalidOperationException("The stream is in an error state. No further operations allowed. The error occurred in function 'TS.IO.Stream.read'.");
                }
                if (this.hasData) {
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
            close() {
                if ((this.internalState != TS.IO.StreamStateEnum.CLOSED) && (this.internalState != IO.StreamStateEnum.ERROR)) {
                    this.internalState = TS.IO.StreamStateEnum.REQUEST_FOR_CLOSE;
                }
            }
        }
        IO.Stream = Stream; //END class
    })(IO = TS.IO || (TS.IO = {})); //END namespace
})(TS || (TS = {})); //END namespace
/// <reference path="./Exception/Exception.ts" />
/// <reference path="./Utils/Utils.ts" />
/// <reference path="./Utils/Assert.ts" />
/// <reference path="./TypeCode/UInt64.ts" />
/// <reference path="./Encoding/Base64.ts" />
/// <reference path="./Encoding/UTF.ts" />
/// <reference path="./IO/StreamStateEnum.ts" />
/// <reference path="./IO/IStream.ts" />
/// <reference path="./IO/Stream.ts" />
