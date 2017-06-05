/// <reference path="../_references.ts" />
namespace TS
{
  export namespace TypeCode
  {
    let charSetArray: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    /**
    * @description Enumeration of the GUID versions
    *
    * @see {@link https://www.ietf.org/rfc/rfc4122.txt | rfc4122, paragraph 4.1.3. Version}
    */
    export enum GUIDVersionEnum
    {
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
      NAME_BASED_SHA1 = 5
    }

    /**
    * @description Enumeration of the GUID variants
    *
    * @see {@link https://www.ietf.org/rfc/rfc4122.txt | rfc4122, paragraph 4.1.1. Variant}
    */
    export enum GUIDVariantEnum
    {
      /** Flag which tells that an unknown variant number was detected or a zero GUID*/
      UNKNOWN = 0,
      /** Reserved, NCS backward compatibility */
      RESERVED_NCS = 1,
      /** The variant used by the GUIDs in this namespace (except for the zero GUID)*/
      RFC4122 = 2,
      /** Reserved, Microsoft Corporation backward compatibility */
      RESERVED_MS = 3,
      /** Reserved for future definition */
      RESERVED_FUTURE_DEF = 4
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
    export class TimeFields 
    {
      /**
      * @description The offset from the rfc4122 defined clock which started at '1582-10-25T00:00:00.000Z' to the
      *  JavaScript clock which started at '1970-01-01T00:00:00.000Z', in milliseconds.
      *
      * @const {number} rfc4122ClockOffset
      */
      //public readonly rfc4122ClockOffset: number = Math.abs(new Date("1582-10-25T00:00:00.000Z").valueOf());
      public static rfc4122ClockOffset = 12218428800000;

      //
      // 2 Byte
      //
      private internalHighField: Uint8Array;
      //
      // 2 Byte
      //
      private internalMidField: Uint8Array;
      //
      // 4 Byte
      //
      private internalLowField: Uint8Array;

      private internalGUIDCount: number | null = null;
      private inernalMilliSeconds: number | null = null;

      /**
      * @description Returns the current time fields as string which is formated in the way described in the rfc4122.
      *  The returned string will look like this "xxxxxxxx-xxxx-xxxx". The first segment will be the lowField, the
      *  second the midField and the third the highFiled with the encoded version number.
      *
      * @get {string}
      */
      public get asString(): string
      {
        let returnString: string;

        returnString = "";
        returnString += TS.Utils.padLeft(TS.Utils.byteArrayToUInt(this.lowField).toString(16), "0", 8);
        returnString += "-";
        returnString += TS.Utils.padLeft(TS.Utils.byteArrayToUInt(this.midField).toString(16), "0", 4);
        returnString += "-";
        returnString += TS.Utils.padLeft(TS.Utils.byteArrayToUInt(this.highField).toString(16), "0", 4);
        return returnString;
      }

      /**
      * @description Returns the highField as Uint8 byte array.
      *
      * @get {Uint8Array}
      */
      public get highField(): Uint8Array
      {
        return this.internalHighField;
      }

      /**
      * @description Returns the midField as Uint8 byte array.
      *
      * @get {Uint8Array}
      */
      public get midField(): Uint8Array
      {
        return this.internalMidField;
      }

      /**
      * @description Returns the lowField as Uint8 byte array.
      *
      * @get {Uint8Array}
      */
      public get lowField(): Uint8Array
      {
        return this.internalLowField;
      }

      /**
      * @description Returns the GUIDCounter.
      *
      * @get {number}
      */
      public get GUIDCounter(): number
      {
        if (this.internalGUIDCount == null)
        {
          this.UTCMilliSeconds;
        }
        return this.internalGUIDCount as number;
      }

      /**
      * @description Returns the value of this TimeFields object as milliseconds passed since '1582-10-25T00:00:00.000Z'.
      *
      * @see TS.TypeCode.TimeFields.rfc4122ClockOffset
      *
      * @get {number}
      */
      public get UTCMilliSeconds(): number
      {
        let UTCMilliSeonds: number;
        let highFieldArray: Array<number>;
        let highFieldNumber: number;
        let midFieldNumber: number;
        let lowFieldNumber: number;

        if (this.inernalMilliSeconds != null)
        {
          return this.inernalMilliSeconds as number;
        }

        highFieldArray = new Array(...this.internalHighField);

        //
        // Erase the version from the high field array.
        // 
        highFieldArray[0] = highFieldArray[0] & 0xF;

        highFieldNumber = TS.Utils.byteArrayToUInt(highFieldArray);
        midFieldNumber = TS.Utils.byteArrayToUInt(this.midField);
        lowFieldNumber = TS.Utils.byteArrayToUInt(this.lowField);

        midFieldNumber += (highFieldNumber % 10000) * 0x10000;
        highFieldNumber = highFieldNumber - (highFieldNumber % 10000);

        lowFieldNumber += (midFieldNumber % 10000) * 0x100000000;
        midFieldNumber = midFieldNumber - (midFieldNumber % 10000);

        highFieldNumber = highFieldNumber / 10000;
        midFieldNumber = midFieldNumber / 10000;

        //
        // Store the GUID counter in a local variable even if the counter wasn't requested. This way 
        // subsequent calls to the GUID counter will speeed up.
        //
        this.internalGUIDCount = lowFieldNumber % 10000;
        lowFieldNumber = Math.floor(lowFieldNumber / 10000);

        UTCMilliSeonds = highFieldNumber * 0x1000000000000 + midFieldNumber * 0x100000000 + lowFieldNumber;
        this.inernalMilliSeconds = UTCMilliSeonds;

        return this.inernalMilliSeconds;
      }


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
      constructor(lastTimeFields: TS.TypeCode.TimeFields)
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
      constructor(canonicalGUIDString: string)
      /**
      * @constructor
      *
      * @description Creates a new TimeFields object based on the current time. The GUIDCounter will be set to zero.
      *
      * @throws {TS.InvalidInvokationException}
      */
      constructor()
      constructor()
      {
        let canonicalStrArray: Array<string>;
        let highFieldString: string;
        let midFieldString: string;
        let lowFieldString: string;
        let highFieldNumber: number;
        let midFieldNumber: number;
        let lowFieldNumber: number;
        let milliSeconds: number;
        let versionChar: string;
        //let UTCNanoSeconds: number;
        let UTCNanoSecondsString: string;

        TS.Utils.checkArgumentsLength(arguments, 0, 1, "TS.TypeCode.TimeFields.constructor");

        if (arguments.length > 0)
        {
          //
          // Check canonicalGUIDString
          // 
          if (TS.Utils.Assert.isString(arguments[0]))
          {
            if (TS.Utils.Assert.isNullUndefOrWhiteSpace(arguments[0] as string))
            {
              throw new TS.InvalidTypeException("canonicalGUIDString", arguments[0], "The argument 'canonicalGUIDString' must not be null or empty in function 'TS.TypeCode.TimeFields.constructor'.");
            }

            if (!TS.Utils.Assert.isCanonicalGUIDString(arguments[0]))
            {
              throw new TS.InvalidTypeException("canonicalGUIDString", arguments[0], "The argument 'canonicalGUIDString' must be a valid canonical GUID string in function 'TS.TypeCode.TimeFields.constructor'.");
            }

            canonicalStrArray = (arguments[0] as string).split("-");

            //
            // Convert the hex strings of the first three blocks of a canonical GUID string into byte arrays
            //
            this.internalLowField = new Uint8Array(TS.Utils.UInt32To4ByteArray(Number.parseInt(canonicalStrArray[0], 16)));
            this.internalMidField = new Uint8Array(TS.Utils.UInt16To2ByteArray(Number.parseInt(canonicalStrArray[1], 16)));
            this.internalHighField = new Uint8Array(TS.Utils.UInt16To2ByteArray(Number.parseInt(canonicalStrArray[2], 16)));

            //
            // Check the version. Must be 1 for a time-based canonical GUID string.
            //
            versionChar = canonicalStrArray[2].split("")[0];
            if (Number.parseInt(versionChar) != 1)
            {
              throw new TS.InvalidTypeException("canonicalGUIDString", arguments[0], "The argument 'canonicalGUIDString' must be a valid version 1 / time-base GUID canonical GUID string in function 'TS.TypeCode.TimeFields.constructor'.");
            }
            return;
          }
          //
          // Check lastTimeFields
          //
          else if (!(arguments[0] instanceof TS.TypeCode.TimeFields))
          {
            throw new TS.InvalidTypeException("lastTimeFields", arguments[0], "Argument lastTimeFields must be a valid TS.TypeCode.TimeFields object in function 'TS.TypeCode.TimeFields.constructor'.");
          }
        }

        //
        // Add the difference between 1582-10-15 and 1970-01-01 := 12,218,428,800 seconds to the current date in order
        // to get a rfc4122 compliant date.
        //
        milliSeconds = Date.now() + TS.TypeCode.TimeFields.rfc4122ClockOffset;

        if (arguments.length > 0)
        {
          //
          // Represents the same millisecond?
          //
          if (milliSeconds == (arguments[0] as TS.TypeCode.TimeFields).UTCMilliSeconds)
          {
            //
            // No more counter left?
            //
            if ((arguments[0] as TS.TypeCode.TimeFields).GUIDCounter == 9999)
            {
              //
              // Wait for the next millisecond.
              //
              while (milliSeconds == Date.now() + TS.TypeCode.TimeFields.rfc4122ClockOffset)
              {
                // Do nothing, wait for the next clock tick.
              }
              //
              // Take the next clock tick.
              //
              milliSeconds = Date.now() + TS.TypeCode.TimeFields.rfc4122ClockOffset;
            }
          }
        }

        //
        // The clock specified in rfc4122 has a hundred nanosecond resolution. Multiply the microseconds by 10000 to
        // simulate that resolution.
        // ATTENTION:
        // Unfortunately the code below is not a proper solution. We would leave the realm of safe integers with that 
        // operation. That's the reason for the more complicated code implementation.
        //
        //    UTCNanoSeconds = UTCMilliSeconds * 10000;

        //
        // Get the numbers for the three block segments
        //
        lowFieldNumber = milliSeconds % 0x100000000;
        midFieldNumber = Math.floor(milliSeconds / 0x100000000) % 0x10000;
        highFieldNumber = Math.floor(milliSeconds / 0x1000000000000);

        //
        // Multiply all numbers by 10000 to simulate a rfc4122 clock resolution.
        //
        lowFieldNumber = lowFieldNumber * 10000;
        midFieldNumber = midFieldNumber * 10000;
        highFieldNumber = highFieldNumber * 10000;

        //
        // Add the overflow to the next higher block number.
        //
        midFieldNumber += Math.floor(lowFieldNumber / 0x100000000);
        lowFieldNumber = lowFieldNumber % 0x100000000;

        highFieldNumber += Math.floor(midFieldNumber / 0x10000);
        midFieldNumber = midFieldNumber % 0x10000;

        //
        // The 4 decimal digits define the GUIDCounter range which is [0..9999].
        //
        if (arguments.length > 0)
        {
          if (milliSeconds == (arguments[0] as TS.TypeCode.TimeFields).UTCMilliSeconds)
          {
            lowFieldNumber += (arguments[0] as TS.TypeCode.TimeFields).GUIDCounter + 1;
          }
        }


        //
        // Normalizing to 60 bit as specified in rfc4122.
        //
        //UTCNanoSecondsString = UTCNanoSeconds.toString(2);
        UTCNanoSecondsString = highFieldNumber.toString(2) + TS.Utils.padLeft(midFieldNumber.toString(2), "0", 16) + TS.Utils.padLeft(lowFieldNumber.toString(2), "0", 32)
        if (UTCNanoSecondsString.length < 60)
        {
          UTCNanoSecondsString = TS.Utils.padLeft(UTCNanoSecondsString, "0", 60);
        }

        if (UTCNanoSecondsString.length > 60)
        {
          UTCNanoSecondsString = UTCNanoSecondsString.slice(UTCNanoSecondsString.length - 60);
        }

        //
        // Adding the version number to the high field which is always 1 for time based GUIDs.
        // Afterwards the string represents a 64 bit value which is 8 byte or exact the first
        // three blocks in a canonical GUID presentation: 'xxxxxxxx-xxxx-Mxxx'. 
        // The version number is placed in the 'M' position.
        //
        UTCNanoSecondsString = "0001" + UTCNanoSecondsString;

        //
        // Cutting the current time bit string into pieces as specified in rfc4122.
        //
        highFieldString = UTCNanoSecondsString.substr(0, 16);
        midFieldString = UTCNanoSecondsString.substr(16, 16);
        lowFieldString = UTCNanoSecondsString.substr(32);

        //
        // Convert the binary strings of that pieces into byte arrays
        //
        this.internalLowField = new Uint8Array(TS.Utils.UInt32To4ByteArray(Number.parseInt(lowFieldString, 2)));
        this.internalMidField = new Uint8Array(TS.Utils.UInt16To2ByteArray(Number.parseInt(midFieldString, 2)));
        this.internalHighField = new Uint8Array(TS.Utils.UInt16To2ByteArray(Number.parseInt(highFieldString, 2)));

      }
    }


    /**
    * @interface TS.TypeCode.IGUID
    *
    * @description The interface which all GUID classes in this namespace have to implement.. 
    */
    export interface IGUID
    {
      /** Returns the canonical string representation of the current GUID. */
      readonly canonicalString: string;
      /** Returns the version of the current GUID */
      readonly version: GUIDVersionEnum;
      /** Returns the variant of the current GUID */
      readonly variant: GUIDVariantEnum;
    }//END class


    /**
    * @class TS.TypeCode.GUID
    *
    * @implements {TS.TypeCode.IGUID}
    *
    * @description This class implements the TS.TypeCode.IGUID interface. Its the base class of all GUID classes defined
    *  in this namespace.
    */
    export class GUID implements IGUID
    {
      protected readonly internalCanonicalString: string;

      /**
      * @implements {TS.TypeCode.IGUID}
      *
      * @description Returns the canonical string representation of the GUID.
      *
      * @get {string}
      */
      public get canonicalString(): string
      {
        return this.internalCanonicalString;
      }


      /**
      * @implements {TS.TypeCode.IGUID}
      *
      * @description Returns the version of the GUID.
      *
      * @get {TS.TypeCode.GUIDVersionEnum}
      */
      public get version(): TS.TypeCode.GUIDVersionEnum
      {
        return TS.TypeCode.GUID.getVersion(this.canonicalString);
      }


      /**
      * @implements {TS.TypeCode.IGUID}
      *
      * @description Returns the variant number of the GUID.
      *
      * @get {TS.TypeCode.GUIDVariantEnum}
      */
      public get variant(): TS.TypeCode.GUIDVariantEnum
      {
        return TS.TypeCode.GUID.getVariant(this.canonicalString);
      }


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
      constructor(canonicalGUIDString: string = "00000000-0000-0000-0000-000000000000")
      {
        let index: number;

        TS.Utils.checkStringParameter("canonicalString", canonicalGUIDString, "TS.TypeCode.GUID.constructor");

        if (!TS.Utils.Assert.isCanonicalGUIDString(canonicalGUIDString))
        {
          throw new TS.InvalidFormatException("canonicalString", canonicalGUIDString, "The argument 'canonicalString' is not a valid canonical GUID string in function 'TS.TypeCode.GUID.constructor'.")
        }

        this.internalCanonicalString = canonicalGUIDString;
      }

      protected static getVersion(canonicalGUIDString: string): TS.TypeCode.GUIDVersionEnum
      {
        let versionChar: string;
        let version: number;

        try
        {
          versionChar =canonicalGUIDString.charAt(14);
          version = Number.parseInt(versionChar, 16);
          switch (version)
          {
            case 1:
              {
                return TS.TypeCode.GUIDVersionEnum.TIME_BASED;
              }
            case 2:
              {
                return TS.TypeCode.GUIDVersionEnum.DCE;
              }
            case 3:
              {
                return TS.TypeCode.GUIDVersionEnum.NAME_BASED_MD5;
              }
            case 4:
              {
                return TS.TypeCode.GUIDVersionEnum.RANDOM;
              }
            case 5:
              {
                return TS.TypeCode.GUIDVersionEnum.NAME_BASED_SHA1;
              }
            default:
              {
                return TS.TypeCode.GUIDVersionEnum.UNKNOWN;
              }

          }
        }
        catch (ex)
        {
          return TS.TypeCode.GUIDVersionEnum.UNKNOWN;
        }
      }

      protected static getVariant(canonicalGUIDString: string): TS.TypeCode.GUIDVariantEnum
      {
        let variantChar: string;
        let variantNumber: number;

        variantChar = canonicalGUIDString.charAt(19);
        variantNumber = Number.parseInt(variantChar, 16);
        variantNumber = variantNumber >>> 1;

        try
        {
          if (variantNumber < 4)
          {
            return TS.TypeCode.GUIDVariantEnum.RESERVED_NCS;
          }

          if ((variantNumber >= 4) && (variantNumber < 6))
          {
            return TS.TypeCode.GUIDVariantEnum.RFC4122;
          }

          if (variantNumber == 6)
          {
            return TS.TypeCode.GUIDVariantEnum.RESERVED_MS;
          }

          if (variantNumber == 6)
          {
            return TS.TypeCode.GUIDVariantEnum.RESERVED_FUTURE_DEF;
          }

          return TS.TypeCode.GUIDVariantEnum.UNKNOWN;
        }
        catch (ex)
        {
          return TS.TypeCode.GUIDVariantEnum.UNKNOWN;
        }
      }

    }//END class


    /**
    * @class TS.TypeCode.RandomGUID
    *
    * @extends {TS.TypeCode.GUID}
    *
    * @description This class represents a random version 4 GUID as described by the IETF in document rfc4122.txt.
    *
    * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
    */
    export class RandomGUID extends GUID
    {
      constructor()
      {
        super(createRandomGUIDCanonicalString());
      }
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
    export class TimeBasedGUID extends GUID
    {

      /**
      * @description Returns the MAC address of the current time-based GUID as a string in colon format. The string
      *  would look similar to this: 'af:5f:98:01:d2:c0'.
      *
      * @get {string}
      */
      public get MACAddress(): string
      {
        return TS.TypeCode.TimeBasedGUID.getMACAddress(this.canonicalString);
      }

      /**
      * @description Returns the GUID counter of the current time-based GUID. The GUID counter at which position in the
      *  millisecond represented by this GUID the GUID was created. There is a maximum of 9999 possible time-based GUID
      *  creations per millisecond. 
      * 
      * @get {number}, An unsigned integer in the range of [0..9999]
      */
      public get GUIDCounter(): number
      {
        return TS.TypeCode.TimeBasedGUID.getGUIDCounter(this.canonicalString);
      }

      /**
      * @description Returns the raw clock sequence of the current time-based GUID as a number. That means the variant
      *  number is not part of the returned clock sequence number.
      *
      * @get {number}
      */
      public get clockSequence(): number
      {
        return TS.TypeCode.TimeBasedGUID.getClockSequence(this.canonicalString);
      }


      /**
      * @description Returns the value of the time stamp of this time-based GUID as milliseconds passed since
      *  '1582-10-25T00:00:00.000Z'. Subtract the clock offset from the result to get a JavaScript conform milliseconds
      *  count to use with a Date object.
      *
      * @see TS.TypeCode.TimeFields.rfc4122ClockOffset
      *
      * @get {number}
      */
      public get timeInMillisecond(): number
      {
        return TS.TypeCode.TimeBasedGUID.getTimeInMillisecond(this.canonicalString);
      }


      /**
      * @description Returns true if the MAC address part of the current GUID is a random MAC address, otherwise false.
      *  See the specification in rfc4122 paragraph 4.5.
      *
      * @see {@link https://www.ietf.org/rfc/rfc4122.txt | IETF}
      *
      * @get {boolean}
      */
      public get isRandomMACAddress(): boolean
      {
        return TS.TypeCode.TimeBasedGUID.getIsRandomMACAddress(this.canonicalString);
      }


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
      constructor(timeBasedGUID: TS.TypeCode.TimeBasedGUID)
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
      constructor(MACAddress: string)
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
      constructor()
      constructor()
      {
        let macAddressString: string | null;
        let sourceGUID: TS.TypeCode.TimeBasedGUID | null;
        let GUIDString: string;
        let GUIDStringArray: Array<string>;

        GUIDString = "";
        TS.Utils.checkArgumentsLength(arguments, 0, 1, "TS.TypeCode.TimeBasedGUID.constructor");

        if (arguments.length > 0)
        {

          //
          // Start a new time based GUID sequence with the provided MAC address.
          //
          if (TS.Utils.Assert.isMACAddressString(arguments[0]))
          {
            macAddressString = (arguments[0] as string).trim().replace(":", "").replace("-", "");
            GUIDString = createTimeBaseGUIDCanonicalString();
            GUIDStringArray = GUIDString.split("-");
            GUIDStringArray[4] = macAddressString;
            GUIDString = GUIDStringArray.join("-");
          }
          //
          // Continue a time based GUID sequence with the provided GUID.
          //
          else if (TS.Utils.Assert.isTimeBasedGUID(arguments[0]))
          {
            GUIDString = createTimeBaseGUIDCanonicalString(arguments[0]);
          }
          else
          {
            throw new TS.InvalidTypeException("MACAddress | timeBasedGUID", arguments[0], "The argument 'MACAddress' or 'timeBasedGUID' is invalid in the function 'TS.TypeCode.TimeBasedGUID.constructor'.");
          }
        }
        else
        {
          //
          // Start a new time based GUID sequence with a random MAC address.
          //
          GUIDString = createTimeBaseGUIDCanonicalString();
        }
        super(GUIDString);
      }


      /**
      * @description
      *
      * @param {string} canonicalGUIDString
      *
      * @returns {TS.TypeCode.TimeBasedGUID}
      *
      * @throws {TS.InvalidTypeException}
       */
      public static parse(canonicalGUIDString: string): TS.TypeCode.TimeBasedGUID
      {
        let timeBasedGUID: TimeBasedGUID;

        TS.Utils.checkArgumentsLength(arguments, 1, 1, "TS.TypeCode.TimeBasedGUID.parse");
        TS.Utils.checkStringParameter("canonicalGUIDString", canonicalGUIDString, "TS.TypeCode.TimeBasedGUID.parse");
        if (!TS.Utils.Assert.isCanonicalGUIDString(canonicalGUIDString))
        {
          throw new TS.InvalidTypeException("canonicalGUIDString", canonicalGUIDString, "Argument 'canonicalGUIDString' must be a valid canonical GUID string in function 'TS.TypeCode.TimeBasedGUID.parse'.")
        }

        if (this.getVersion(canonicalGUIDString) != TS.TypeCode.GUIDVersionEnum.TIME_BASED)
        {
          throw new TS.InvalidTypeException("canonicalGUIDString", canonicalGUIDString, "Argument 'canonicalGUIDString' must be a valid time based canonical GUID string in function 'TS.TypeCode.TimeBasedGUID.parse'.")
        }

        if (this.getVariant(canonicalGUIDString) != TS.TypeCode.GUIDVariantEnum.RFC4122)
        {
          throw new TS.InvalidTypeException("canonicalGUIDString", canonicalGUIDString, "Argument 'canonicalGUIDString' must be a canonical GUID string with a valid variant number in function 'TS.TypeCode.TimeBasedGUID.parse'.")
        }

        timeBasedGUID = (new ParsedTimeBasedGUID(canonicalGUIDString) as TS.TypeCode.TimeBasedGUID);
        return timeBasedGUID;
      }


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
      protected static getMACAddress(canonicalGUIDString: string): string
      {
        let resultString: string;
        let macAddrStringArray: Array<string>;

        macAddrStringArray = canonicalGUIDString.split("-")[4].split("");
        resultString = "";

        macAddrStringArray.forEach((value, index, array) => 
        {
          resultString += value;
          if ((index % 2 == 1) && index != 0 && index != 11)
          {
            resultString += ":";
          }
        })

        return resultString;
      }

      protected static getGUIDCounter(canonicalGUIDString: string): number
      {
        return new TimeFields(canonicalGUIDString).GUIDCounter;
      }

      protected static getClockSequence(canonicalGUIDString: string): number
      {
        let sequenceNumber: number;

        sequenceNumber = Number.parseInt(canonicalGUIDString.split("-")[3], 16);
        switch (TS.TypeCode.TimeBasedGUID.getVariant(canonicalGUIDString))
        {
          case TS.TypeCode.GUIDVariantEnum.RESERVED_FUTURE_DEF:
            {
              sequenceNumber = sequenceNumber & 0b0001111111111111;
              break;
            }
          case TS.TypeCode.GUIDVariantEnum.RESERVED_MS:
            {
              sequenceNumber = sequenceNumber & 0b0001111111111111;
              break;
            }
          case TS.TypeCode.GUIDVariantEnum.RESERVED_NCS:
            {
              sequenceNumber = sequenceNumber & 0b0111111111111111;
              break;
            }
          case TS.TypeCode.GUIDVariantEnum.RFC4122:
            {
              sequenceNumber = sequenceNumber & 0b0011111111111111;
              break;
            }
          case TS.TypeCode.GUIDVariantEnum.UNKNOWN:
          default:
            {
              sequenceNumber = sequenceNumber & 0b0001111111111111;
              break;
            }
        }

        return sequenceNumber;
      }

      protected static getTimeInMillisecond(canonicalGUIDString: string): number
      {
        return new TS.TypeCode.TimeFields(canonicalGUIDString).UTCMilliSeconds;
      }

      protected static getIsRandomMACAddress(canonicalGUIDString: string): boolean
      {
        let charArray: Array<string>;
        let QValue: number;

        //
        // Check the multicast bit from the MAC address part.
        //
        charArray = canonicalGUIDString.split("-")[4].split("");
        QValue = Number.parseInt(charArray[1], 16);
        QValue = QValue & 0b1;
        return QValue == 1;
      }
    }


    /**
    * @class TS.TypeCode.ParsedTimeBasedGUID
    *
    * @extends {TS.TypeCode.TimeBasedGUID}
    *
    * @description A subclass of 'TS.TypeCode.TimeBasedGUID' which creates a new GUID from a canonical string. The
    *  class hat the single purpose to make parsing in the class 'TS.TypeCode.TimeBasedGUID' possible. For that reason
    *  the class is defined internal, because the constructor gets never call direct but only through the parse
    *  function of the base class.
    *  
    * @internal
    */
    class ParsedTimeBasedGUID extends TS.TypeCode.TimeBasedGUID
    {
      private GUIDString: string;

      /**
      * @override
      *
      * @get {string}
      */ 
      public get canonicalString(): string
      {
        return this.GUIDString;
      }

      /**
      * @constructor
      *
      * @param {string} canonicalGUIDString
      */
      constructor(canonicalGUIDString: string)
      {
        super();
        this.GUIDString = canonicalGUIDString;
      }
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
    export class TimeBasedGUIDGenerator implements Iterator<TS.TypeCode.TimeBasedGUID>
    {
      private internalTimeBasedGUID: TimeBasedGUID;

      /**
      * @implements {Iterator<TS.TypeCode.TimeBasedGUID>}
      *
      * @returns {IteratorResult<TS.TypeCode.TimeBasedGUID>}
      */
      public next: () => IteratorResult<TS.TypeCode.TimeBasedGUID>;

      /**
      * @implements {Iterator<TS.TypeCode.TimeBasedGUID>}
      *
      * @returns {Iterator<TS.TypeCode.TimeBasedGUID>}
      */
      public [Symbol.iterator](): Iterator<TS.TypeCode.TimeBasedGUID>
      {
        return this;
      }

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
      constructor(lastTimeBasedGUID: TS.TypeCode.TimeBasedGUID)
      {
        TS.Utils.checkObjectParameter("lastTimeBasedGUID", lastTimeBasedGUID, "TS.TypeCode.TimeBasedGUIDGenerator.constructor");
        TS.Utils.checkArgumentsLength(arguments, 1, 1, "TS.TypeCode.TimeBasedGUIDGenerator.constructor");
        if (!TS.Utils.Assert.isTimeBasedGUID(lastTimeBasedGUID))
        {
          throw new TS.InvalidTypeException("lastTimeBasedGUID", lastTimeBasedGUID, "Argument 'lastTimeBasedGUID' must be a valid 'TS.TypeCode.TimeBasedGUID' object in function 'TS.TypeCode.TimeBasedGUIDGenerator.constructor'.");
        }

        this.internalTimeBasedGUID = lastTimeBasedGUID;

        this.next = () => 
        {
          let newTimeBasedGUID = new TS.TypeCode.TimeBasedGUID(this.internalTimeBasedGUID);
          this.internalTimeBasedGUID = newTimeBasedGUID;
          return { done: false, value: this.internalTimeBasedGUID };
        };
      }
    }


    /**
    * @description Creates a version 4 random GUID which is returned as string in a canonical representation.
    *  'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx' is an example for that string. All x are hexadecimal digits in
    *  the range of [0..f]. M is the version number of the GUID as hexadecimal digit. N is the variant number
    *  encoded in the first two bit of the hexadecimal digit at the given position. Two hexadecimal digits
    *  represent an unsigned byte value. 32 hexadecimal digits are 16 byte or 128 bit. 
    *
    * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
    * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
    * @see {@link http://www.rfc-base.org/rfc-4122.html | rfc-base.org }
    *
    * @returns {string}, The new created GUID as string.
    */
    function createRandomGUIDCanonicalString(): string
    {
      let index: number;
      let returnString: string;

      returnString = "";
      for (index = 0; index < 8; index++)
      {
        returnString += charSetArray[Math.ceil(Math.random() * 15)];
      }//END for

      returnString += "-";

      for (index = 0; index < 4; index++)
      {
        returnString += charSetArray[Math.ceil(Math.random() * 15)];
      }//END for

      returnString += "-"

      //
      // Setting the version number. 
      // The four most significant bits of the 7th byte are reserved for the version number.
      // It's the M position in the description.
      //
      returnString += "4";

      for (index = 0; index < 3; index++)
      {
        returnString += charSetArray[Math.ceil(Math.random() * 15)];
      }//END for

      returnString += "-";

      //
      // Setting the variant number.
      // The three most significant bits of the 9th byte are reserved for the variant number.
      // See RFC 4122, paragraph 4.1.1 Variant. It's the N position in the description.
      // All GUIDs in this library will have a '100' binary pattern in the first three bits except for the zero
      // GUID.
      //
      returnString += Number.parseInt("1000", 2).toString(16);

      for (index = 0; index < 3; index++)
      {
        returnString += charSetArray[Math.ceil(Math.random() * 15)];
      }//END for

      returnString += "-";

      for (index = 0; index < 12; index++)
      {
        returnString += charSetArray[Math.ceil(Math.random() * 15)];
      }//END for

      return returnString;
    }


    /**
    * @description Creates a version 1 time based GUID which is returned as string in a canonical representation.
    *  'xxxxxxxx-xxxx-Mxxx-Nxxx-xQxxxxxxxxxx' is an example for that string. All x are hexadecimal values in
    *  the range of [0..f]. M is the version number of the GUID as hexadecimal value. N is the variant number
    *  encoded in the first two bit of the hexadecimal value at the given position. Q is the flag which 
    *  identifies the GUID as one which uses a MAC node number or a random node number encoded in the last bit
    *  of the hexadecimal value at the given position. The last bit set to 1 means the GUID uses a random
    *  node number. The last bit set to 0 means the GUID uses a MAC address as node number.
    *
    * @see {@link http://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29 | Wikipedia }
    * @see {@link http://www.ietf.org/rfc/rfc4122.txt | IETF }
    * @see {@link http://www.rfc-base.org/rfc-4122.html | rfc-base.org }
    *
    * @returns {string}, The new created GUID as string.
    *
    * @throws {TS.InvalidTypeException}
    */
    function createTimeBaseGUIDCanonicalString(lastGUID: TS.TypeCode.TimeBasedGUID | null = null): string
    {
      let index: number;
      let now: Date;
      let charArray: Array<string>;
      let UTCMilliSeconds: number;
      let lastTimeFields: TS.TypeCode.TimeFields;
      let newTimeFields: TS.TypeCode.TimeFields;
      let GUIDCounter: number;
      let clockSequence: number;
      let GUIDString: string;
      let MACAddressString: string;
      let TimeFieldsString: string;
      let clockSequenceString: string;
      let QValue: number;


      if (TS.Utils.Assert.isNullOrUndefined(lastGUID))
      {
        //
        // Create a random GUID for the MAC address part.
        //
        GUIDString = new TS.TypeCode.RandomGUID().canonicalString;
        charArray = GUIDString.split("-")[4].split("");
        QValue = Number.parseInt(charArray[1], 16);

        //
        // Set the random flag on the MAC address
        //
        QValue = QValue | 0b0001;
        charArray[1] = QValue.toString(16);
        MACAddressString = charArray.join("");

        //
        // Create the timeFields where the GUIDCounter is set to zero
        //
        TimeFieldsString = new TS.TypeCode.TimeFields().asString;

        //
        // Create a zero clock sequence string with the variant part set to '100'
        //
        clockSequenceString = Number.parseInt("1000", 2).toString(16) + "000";

        //
        // Create the canonical GUID string.
        // 
        GUIDString = TimeFieldsString + "-" + clockSequenceString + "-" + MACAddressString;
        return GUIDString;
      }

      if (!TS.Utils.Assert.isTimeBasedGUID(lastGUID))
      {
        throw new TS.InvalidTypeException("lastGUID", lastGUID, "Argument 'lastGUID' must be a valid time-based GUID in function 'TS.TypeCode.createTimeBaseGUIDCanonicalString'.")
      }

      lastTimeFields = new TimeFields((lastGUID as TS.TypeCode.TimeBasedGUID).canonicalString);
      newTimeFields = new TimeFields(lastTimeFields);

      if (newTimeFields.UTCMilliSeconds < lastTimeFields.UTCMilliSeconds)
      {
        clockSequence = (lastGUID as TS.TypeCode.TimeBasedGUID).clockSequence + 1;
        clockSequenceString = clockSequence.toString(16);
        if (clockSequenceString.length < 3)
        {
          clockSequenceString = TS.Utils.padLeft(clockSequenceString, "0", 3);
        }

        if (clockSequenceString.length > 3)
        {
          clockSequenceString = clockSequenceString.substr(clockSequenceString.length - 3);
        }

        clockSequenceString = Number.parseInt("1000", 2).toString(16) + clockSequenceString;
      }
      else
      {
        clockSequenceString = (lastGUID as TS.TypeCode.TimeBasedGUID).canonicalString.split("-")[3];
      }

      GUIDString = newTimeFields.asString + "-" + clockSequenceString + "-" + (lastGUID as TS.TypeCode.TimeBasedGUID).canonicalString.split("-")[4];

      return GUIDString;
    }

  }//END module
}//END module