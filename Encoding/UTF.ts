/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Encoding
  {

    /**
    * @class TS.Encoding.UTF
    *
    * @description This class implements UTF-16LE / UCS-2LE string conversion into a UTF-8 byte array and vice versa.
    */
    export class UTF
    {

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
      public static UTF16StringToUTF8Array(input: string): Array<number>
      {
        let resultByteArray: Array<number>
        let index: number;
        let codePoint: number;
        let splitArray: Array<number>;

        TS.Utils.checkParameter("input", input, "TS.Encoding.UTF.UTF16StringToUTF8Array");
        TS.Utils.checkStringParameter("input", input, "TS.Encoding.UTF.UTF16StringToUTF8Array");

        resultByteArray = new Array<number>();

        for (index = 0; index < input.length; index++)
        {
          //
          //Throws: TS.ArgumentNullUndefOrEmptyException, TS.InvalidTypeException
          //
          codePoint = codePointAt(input, index);
          if (codePoint === null)
          {
            continue;
          }//END if

          //Code point U+0000 - U+007F, 7 bits, 1 byte
          if (codePoint <= 127)
          {
            resultByteArray.push(codePoint);
          }//END if
          //Code point U+0080 - U+07FF, 11 bits, 2 bytes
          else if ((codePoint > 128) && (codePoint <= 2047))
          {
            splitArray = split6BitArray(codePoint);
            resultByteArray.push((splitArray[0] & 31) + 192); /* 5 significant bits */
            resultByteArray.push(splitArray[1] + 128);
          }//END else if
          //Code point U+0800 - U+FFFF, 16 bits, 3 bytes
          else if ((codePoint >= 2048) && (codePoint <= 65535))
          {
            splitArray = split6BitArray(codePoint);
            resultByteArray.push((splitArray[0] & 15) + 224); /* 4 significant bits */
            resultByteArray.push(splitArray[1] + 128);
            resultByteArray.push(splitArray[2] + 128);
          }//END else if
          //Code point U+10000 - U+1FFFFF, 21 bits, 4 bytes
          else if ((codePoint >= 65536) && (codePoint <= 2097151))
          {
            splitArray = split6BitArray(codePoint);
            resultByteArray.push((splitArray[0] & 7) + 240); /* 3 significant bits */
            resultByteArray.push(splitArray[1] + 128);
            resultByteArray.push(splitArray[2] + 128);
            resultByteArray.push(splitArray[3] + 128);
          }//END else if

          if (codePoint > 2097151)
          {
            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF16StringToUTF8Array'. The input string may not be a valid UTF-16 encoded string.");
          }//END if
        }//END for
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
      public static UTF8ArrayToUTF16String(byteArray: Array<number>): string
      {
        let index: number;
        let resultString: string;
        let charCode: number;
        let highSurrogate: number;
        let lowSurrogate: number;

        TS.Utils.checkParameter("byteArray", byteArray, "TS.Encoding.UTF.UTF8ArrayToUTF16String");
        TS.Utils.checkUByteArrayParameter("byteArray", byteArray, "TS.Encoding.UTF.UTF8ArrayToUTF16String");

        resultString = "";

        for (index = 0; index < byteArray.length; index++)
        {
          if (byteArray[index] < 128)
          {
            resultString += String.fromCharCode(byteArray[index]);
            continue;
          }//END if
          else if ((byteArray[index] & 252) == 252) /* Six high bits */
          {
            /* invalid */
            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
          }//END else if
          else if ((byteArray[index] & 248) == 248) /* Five high bits */
          {
            /* invalid */
            throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
          }//END else if
          else if ((byteArray[index] & 240) == 240) /* Four high bits */
          {
            if ((byteArray.length - 1) < (index + 3))
            {
               /* invalid */
              throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
            }//END if

            charCode = ((byteArray[index] & 7) * 262144);
            charCode += ((byteArray[index + 1] & 63) * 4096);
            charCode += ((byteArray[index + 2] & 63) * 64);
            charCode += (byteArray[index + 3] & 63);


            highSurrogate = ((charCode - 0x10000) >>> 10) + 0xD800;
            lowSurrogate = ((charCode - 0x10000) & 0x3FF) + 0xDC00;

            index += 3;
            resultString += String.fromCharCode(highSurrogate, lowSurrogate);
            continue;
          }//END else if
          else if ((byteArray[index] & 224) == 224) /* Three high bits */
          {
            if ((byteArray.length - 1) < (index + 2))
            {
               /* invalid */
              throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
            }//END if

            charCode = (byteArray[index] & 15) * 4096;
            charCode += ((byteArray[index + 1] & 63) * 64);
            charCode += (byteArray[index + 2] & 63);
            index += 2;
            resultString += String.fromCharCode(charCode);
            continue;
          }//END else if
          else ((byteArray[index] & 192) == 192) /* Two high bits */
          {
            if ((byteArray.length - 1) < (index + 1))
            {
               /* invalid */
              throw new TS.InvalidOperationException("Invalid code point detected in function 'TS.Encoding.UTF.UTF8ArrayToUTF16String'. The input array may not be a valid UTF-8 encoded byte array.");
            }//END if

            charCode = (byteArray[index] & 31) * 64;
            charCode += (byteArray[index + 1] & 63);
            index += 1;
            resultString += String.fromCharCode(charCode);
            continue;
          }//END else 
        }//END for

        return resultString;
      }

    }//END class


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
    function split6BitArray(x: number): Array<number>
    {
      let resultArray: Array<number>;
      let internalX: number;

      TS.Utils.checkUIntNumberParameter("x", x, "TS.Encoding.split6BitArray");

      if ((x < 128) || (x > 2097151))
      {
        throw new TS.ArgumentOutOfRangeException("x", x, "Argument 'x' must have a value in the range [128..2097151] in function 'TS.Encoding.split6BitArray'.");
      }//END if

      internalX = x;
      resultArray = new Array<number>();

      while(internalX > 0)
      {
        resultArray.unshift(internalX & 63);
        internalX = internalX >>> 6;
      }//END while

      if (x <= 2047)
      {
        if (resultArray.length < 2)
        {
          resultArray.unshift(0);
        }//END if
        return resultArray;
      }//END if

      if (x <= 65535)
      {
        if(resultArray.length < 3)
        {
          resultArray.unshift(0);
        }//END if
        return resultArray;
      }//END if

      if (x <= 2097151)
      {
        if (resultArray.length < 4)
        {
          resultArray.unshift(0);
        }//END if
        return resultArray;
      }//END if

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
    function codePointAt(sourceString: string, position: number) : any
    {
      let first: number; 
      let second: number;

      TS.Utils.checkParameter("sourceString", sourceString, "TS.Encoding.codePointAt");
      TS.Utils.checkParameter("position", position, "TS.Encoding.codePointAt");
      TS.Utils.checkStringParameter("sourceString", sourceString, "TS.Encoding.codePointAt");

      first = sourceString.charCodeAt(position);

      //
      // check if it’s the start of a surrogate pair
      //
      if (isHighSurrogate(first)  && sourceString.length > position + 1)
      {
        second = sourceString.charCodeAt(position + 1) 
        if (isLowSurrogate(second))
        {
          //
          // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          //
          return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }//END if
      }//END if

      if (isLowSurrogate(first))
      {
        return null;
      }//END if

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
    function isHighSurrogate(codeUnit: number) : boolean
    {
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
    function isLowSurrogate(codeUnit: number) : boolean
    {
      return (codeUnit >= 0xDC00 && codeUnit <= 0xDFFF);
    }


  }//END namespace
}//END namespace
