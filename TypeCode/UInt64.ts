/// <reference path="../_references.ts" />
namespace TS
{
  export module TypeCode
  {

    /**
    * @class TS.TypeCode.UInt64
    *
    * @descripion This class implements a 64 bit unsigned integer number type and some basic operations on this type.
    *  The UInt64 is used in some cypher algorithms. 
    */
    export class UInt64
    {

      private internalMostSignificantInteger: number;
      private internalLeastSignificantInteger: number;


      /**
      * @description Returns the greatest number which can be stored in a UInt64.
      *
      * @get {TS.TypeCode.UInt64}  MAX_VALUE
      */
      public static get MAX_VALUE(): UInt64
      {
        return new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);
      }


      /**
      * @description Returns the value of the most significant integer of this UInt64 number.
      *
      * @get {number} mostSignificantInteger
      */
      public get mostSignificantInteger(): number
      {
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
      public set mostSignificantInteger(value)
      {
        TS.Utils.checkUIntNumberParameter("value", value, "TS.TypeCode.UInt64.set mostSignificantInteger");
        if (value > 0xFFFFFFFF)
        {
          throw new TS.ArgumentOutOfRangeException("mostSignificantInteger", value, "The argument excceeded the valid number range. Valid numbers must fall into the range of [0 ..." + 0xFFFFFFFF.toString() + "]");
        }//END if

        this.internalMostSignificantInteger = value;
      }


      /**
      * @description Returns the value of the least significant integer of this UInt64 number.
      *
      * @get {number} leastSignificantInteger
      */
      public get leastSignificantInteger(): number
      {
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
      public set leastSignificantInteger(value : number)
      {
        TS.Utils.checkUIntNumberParameter("value", value, "TS.TypeCode.UInt64.set leastSignificantInteger");
        if (value > 0xFFFFFFFF)
        {
          throw new TS.ArgumentOutOfRangeException("leastSignificantInteger", value, "The argument excceeded the valid number range. Valid numbers must fall into the range of [0 ..." + 0xFFFFFFFF.toString() + "]");
        }//END if

        this.internalLeastSignificantInteger = value;
      }


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
      constructor(mostSignificantInteger: number = 0, leastSignificantInteger: number = 0)
      {
        this.mostSignificantInteger = mostSignificantInteger;
        this.leastSignificantInteger = leastSignificantInteger;
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
      public add(value: TS.TypeCode.UInt64) : void
      {
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
      public static add(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): TS.TypeCode.UInt64
      {
        TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.equal");
        TS.Utils.checkUInt64NumberParameter("second", second, "TS.TypeCode.UInt64.equal");

        let tempOverflow: number;
        let tempLSInteger: number;
        let tempMSInteger: number;

        tempLSInteger = first.leastSignificantInteger + second.leastSignificantInteger;

        if (tempLSInteger > 0xFFFFFFFF)
        {
          tempOverflow = 1;
          tempLSInteger = tempLSInteger % 0x100000000;
        }//END if
        else
        {
          tempOverflow = 0;
        }//END else

        tempMSInteger = first.mostSignificantInteger + second.mostSignificantInteger + tempOverflow;

        if (tempMSInteger > 0xFFFFFFFF)
        {
          throw new TS.OverflowException("An arithmetic operation resulted in an overflow. The error occured in 'TS.TypeCode.UInt64.add'.")
        }//END if

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
      public addModulo(value: TS.TypeCode.UInt64) : void
      {
        TS.Utils.checkUInt64NumberParameter("value", value,"TS.TypeCode.UInt64.add");

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
      public static addModulo(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): TS.TypeCode.UInt64
      {
        TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.equal");
        TS.Utils.checkUInt64NumberParameter("second", second,"TS.TypeCode.UInt64.equal");

        let tempOverflow: number;
        let tempLSInteger: number;
        let tempMSInteger: number;

        tempLSInteger = first.leastSignificantInteger + second.leastSignificantInteger;

        if (tempLSInteger > 0xFFFFFFFF)
        {
          tempOverflow = 1;
          tempLSInteger = tempLSInteger % 0x100000000;
        }//END if
        else
        {
          tempOverflow = 0;
        }//END else

        tempMSInteger = first.mostSignificantInteger + second.mostSignificantInteger + tempOverflow;

        if (tempMSInteger > 0xFFFFFFFF)
        {
          tempMSInteger = tempMSInteger % 0x100000000;
        }//END if

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
      public equal(other: TS.TypeCode.UInt64): boolean
      {
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
      public static equal(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): boolean
      {
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
      public greater(other: TS.TypeCode.UInt64): boolean
      {
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
      public static greater(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): boolean
      {
        TS.Utils.checkUInt64NumberParameter("first", first, "TS.TypeCode.UInt64.greater");
        TS.Utils.checkUInt64NumberParameter("second", second, "TS.TypeCode.UInt64.greater");

        if (first.mostSignificantInteger > second.mostSignificantInteger)
        {
          return true;
        }//END if

        if (first.mostSignificantInteger < second.mostSignificantInteger)
        {
          return false;
        }//END if

        if (first.leastSignificantInteger > second.leastSignificantInteger)
        {
          return true;
        }//END if

        if (first.leastSignificantInteger < second.leastSignificantInteger)
        {
          return false;
        }//END if
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
      public less(other: TS.TypeCode.UInt64): boolean
      {
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
      public static less(first: TS.TypeCode.UInt64, second: TS.TypeCode.UInt64): boolean
      {
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
      public static UIntToUInt64(intNumber: number): TS.TypeCode.UInt64
      {
        TS.Utils.checkUIntNumberParameter("intNumber", intNumber, "TS.TypeCode.UInt64.UIntToUInt64");

        if (intNumber > 0xFFFFFFFF)
        {
          let leastInt = intNumber % 0x100000000;
          let mostInt = (intNumber - leastInt) / 0x100000000;
          return new UInt64(mostInt, leastInt);
        }//END if

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
      public static UInt64ToUInt(UInt64Number: TS.TypeCode.UInt64): number
      {
        TS.Utils.checkUInt64NumberParameter("UInt64Number", UInt64Number, "TS.TypeCode.UInt64.UInt64ToUInt");
        let result = UInt64Number.mostSignificantInteger * 0x100000000 + UInt64Number.leastSignificantInteger;
        if (result > Number.MAX_SAFE_INTEGER)
        {
          throw new TS.OverflowException("The current number exceeds the range of 'Number.MAX_SAVE_INTEGER'. The exception occured in function 'TS.TypeCode.UInt64.UInt64ToUInt'.");
        }
        return result;
      }
    }//END class

  }//END module
}//END module