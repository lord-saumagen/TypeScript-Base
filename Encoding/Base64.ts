/// <reference path="../_references.ts" />
namespace TS
{
  export namespace Encoding
  {

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
    function normalizeBase64EncodedData(data: string): string
    {
      let resultString = "";
      let formatTest: number;

      resultString = data.replace("/(\r)/gm", "").replace("/(\n)/gm", "").replace(/(\s)/gm, "");
      resultString = resultString.replace(/-/gm, "+").replace(/_/gm, "/");
      formatTest = resultString.search(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=]/gm);

      if (formatTest > -1)
      {
        throw new TS.InvalidFormatException("data", data, "The given data string is not a valid base64 encoded string. Found invalid character: '" + resultString.charAt(formatTest) + "'.");
      }//END if

      while (resultString.length % 4 !== 0)
      {
        resultString += "=";
      }//END while

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
    function makeURLCompliant(data: string): string
    {
      return data.replace(/\+/gm, "-").replace(/\//gm, "_").replace(/\=/gm, "");
    }


    /**
    * @class TS.Encoding.Base64
    *
    * @description This class implements a base64 encoding and decoding function.
    *
    * @see {@link https://www.ietf.org/rfc/rfc3548.txt | IETF}
    */
    export class Base64
    {
      private static BASE64_CHARACTER_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';


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
      public static decode(data: string): string
      {
        let byteArray: Array<number>;
        let result: string;

        TS.Utils.checkNotEmptyParameter("data", data, "TS.Encoding.Base64.decode");
        TS.Utils.checkStringParameter("data", data, "TS.Encoding.Base64.decode");

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' must be a valid string. Error occurred in function TS.Encoding.Base64.decode'.");
        }//END if


        //
        // Throws: TS.InvalidTypeException, 
        // TS.InvalidFormatException
        //
        try
        {
          byteArray = Base64.decodeToByteArray(data);
        }//END try
        catch (Exception)
        {
          throw new InvalidFormatException("data", data, "The argument 'data' must be a valid Base64 encoded string. Error occurred in function TS.Encoding.Base64.decodey'. See the inner exception for further details.", Exception);
        }//END catch

        //
        // Throws: TS.ArgumentNullUndefOrEmptyException, 
        // TS.InvalidTypeException, 
        // TS.InvalidOperationException
        //
        try
        {
          result = UTF.UTF8ArrayToUTF16String(byteArray);
        }//END try
        catch (Exception)
        {
          throw new InvalidFormatException("data", data, "The argument 'data' appears to be invalid. Error occurred in function TS.Encoding.Base64.decode'. See the inner exception for further details.", Exception);
        }//END catch

        return result;
      }


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
      public static decodeToByteArray(data: string): Array<number>
      {
        let bits: number;
        let charIndex0: number;
        let charIndex1: number;
        let charIndex2: number;
        let charIndex3: number;
        let dataString: string;
        let index: number;
        let octetData0: number;
        let octetData1: number;
        let octetData2: number;
        let result: Array<number>;

        TS.Utils.checkStringParameter("data", data, "TS.Encoding.Base64.decodeToByteArray");

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' must be a valid string. Error occurred in function TS.Encoding.Base64.decodeToByteArray'.");
        }//END if

        //May throw TS.InvalidFormatException
        try
        {
          dataString = normalizeBase64EncodedData(data);
        }//END try
        catch (Exception)
        {
          throw new TS.InvalidFormatException("data", data, "The argument 'data' must be a valid Base64 encoded string. Error occurred in function TS.Encoding.Base64.decodeToByteArray'. See the inner exception for further details.", Exception);
        }//END catch

        if (dataString.length == 0)
        {
          return new Array<number>();
        }//END if

        index = 0;
        result = new Array<number>();

        do 
        {
          charIndex0 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));
          charIndex1 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));
          charIndex2 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));
          charIndex3 = this.BASE64_CHARACTER_SET.indexOf(dataString.charAt(index++));

          bits = 0;

          if (charIndex2 == 64)
          {
            bits = charIndex0 << 18 | charIndex1 << 12;
          }
          else if (charIndex3 == 64)
          {
            bits = charIndex0 << 18 | charIndex1 << 12 | charIndex2 << 6;
          }
          else
          {
            bits = charIndex0 << 18 | charIndex1 << 12 | charIndex2 << 6 | charIndex3;
          }

          octetData0 = bits >>> 16;
          octetData1 = bits >> 8 & 0xff;
          octetData2 = bits & 0xff;

          //BASE64_CHARACTER_SET[64] = '=';
          if (charIndex2 == 64) 
          {
            result.push(octetData0);
          }//END if
          else if (charIndex3 == 64)
          {
            result.push(octetData0);
            result.push(octetData1);
          }//END if
          else
          {
            result.push(octetData0);
            result.push(octetData1);
            result.push(octetData2);
          }//END else
        } while (index < dataString.length - 1);

        return result;
      }


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
      public static encode(data: string): string
      {
        let bits: number;
        let charIndex0: number;
        let charIndex1: number;
        let charIndex2: number;
        let charIndex3: number;
        let byteArray: Array<number>;
        let bytesToEncode: number;
        let index: number;
        let octetData0: number;
        let octetData1: number;
        let octetData2: number;
        let padding: number;
        let result: string;


        TS.Utils.checkNotEmptyParameter("data", data, "TS.Encoding.Base64.encode");

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' in function TS.Encoding.Base64.encode' must be a valid string. Error occurred in function 'TS.Encoding.Base64.encode'.");
        }//END if

        index = 0;
        result = "";
        byteArray = UTF.UTF16StringToUTF8Array(data);

        do
        {
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

          switch (bytesToEncode)
          {
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
      public static encodeURLCompliant(data: string): string
      {
        if (TS.Utils.Assert.isNullUndefOrEmpty(data))
        {
          return "";
        }//END if

        if (!TS.Utils.Assert.isString(data))
        {
          throw new TS.InvalidTypeException("data", data, "The argument 'data' must be a valid string. Error occurred in function 'TS.Encoding.Base64.encodeURLCompliant'.");
        }//END if

        return makeURLCompliant(TS.Encoding.Base64.encode(data));
      }

    }//END class

  }//END namespace
}//END namespace