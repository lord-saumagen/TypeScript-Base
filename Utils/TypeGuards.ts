namespace TS
{

  export namespace Utils
  {

    /**
    * @description A collection of type guard functions.
    * @see {@link https://www.typescriptlang.org/docs/handbook/advanced-types.html | typescriptlang.org}
    * @see {@link https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html | basarat.gitbooks.io/typescript}
    */
    export namespace TypeGuards
    {

      /**
      * @description Array type guard. Returns true if the value of argument 'source' is an array.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isArray(source: any): source is Array<any>
      {
        return TS.Utils.Assert.isArray(source);
      }


      /**
      * @description Boolean type guard. Returns true if the value of argument 'source' is a boolean.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isBoolean(source: any): source is boolean
      {
        return TS.Utils.Assert.isBoolean(source);
      }


      /**
      * @description Date type guard. Returns true if the value of argument 'source' is a date object.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isDate(source: any): source is Date
      {
        return TS.Utils.Assert.isDate(source);
      }


      /**
      * @description GUID type guard. Returns true if the value of argument 'source' is a 'TS.TypeCode.GUID' object.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isGUID(source: any): source is TS.TypeCode.GUID
      {
        return TS.Utils.Assert.isGUID(source);
      }


      /**
      * @description RandomGUID type guard. Returns true if the value of argument 'source' is a 'TS.TypeCode.RandomGUID' object.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isRandomGUID(source: any): source is TS.TypeCode.RandomGUID
      {
        return TS.Utils.Assert.isRandomGUID(source);
      }


      /**
      * @description TimeBasedGUID type guard. Returns true if the value of argument 'source' is a 'TS.TypeCode.TimeBasedGUID' object.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isTimeBasedGUID(source: any): source is TS.TypeCode.TimeBasedGUID
      {
        return TS.Utils.Assert.isTimeBasedGUID(source);
      }


      /**
      * @description Null type guard. Returns true if the value of argument 'source' is null.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNull(source: any): source is null
      {
        return TS.Utils.Assert.isNull(source);
      }


      /**
      * @description Number type guard. Returns true if the value of argument 'source' is a number.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isNumber(source: any): source is number
      {
        return TS.Utils.Assert.isNumber(source);
      }


      /**
      * @description Object type guard. Returns true if the value of argument 'source' is an object.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isObject(source: any): source is Object
      {
        return TS.Utils.Assert.isObject(source);
      }


      /**
      * @description RegEx type guard. Returns true if the value of argument 'source' is a regular expression object.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isRegEx(source: any): source is RegExp
      {
        return TS.Utils.Assert.isRegEx(source);
      }


      /**
      * @description String type guard. Returns true if the value of argument 'source' is a string.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isString(source: any): source is string
      {
        return TS.Utils.Assert.isString(source);
      }


      /**
      * @description Symbol type guard. Returns true if the value of argument 'source' is a symbol object.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isSymbol(source: any): source is Symbol
      {
        return TS.Utils.Assert.isSymbol(source);
      }


      /**
      * @description Undefined type guard. Returns true if the value of argument 'source' is undefined.
      *
      * @param {any} source
      *
      * @returns {boolean}
      */
      export function isUndefined(source: any): source is undefined
      {
        return TS.Utils.Assert.isUndefined(source);
      }

    }
  }
}
