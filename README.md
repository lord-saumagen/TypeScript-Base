# New in version 1.0.7

## The TS.Utils.TypeGuards namespace

The TypGuards namespace comprise some TypeGuard functions. Those functions are only implemented for my and hopefully your convenience. They don't achieve anything you couldn't already do using the  'TypeCheck' functions in namespace 'TS.Utils' or the 'Assertion' functions in namespace 'TS.Utils.Assert'. But the TypeGuard functions may help to clean up your code. Since TypeGuard functions convince the TS compiler that the observed object is an instance of a specified type. That way you don't have to cast/assert that object to the desired type anymore. 
As the name implies, TypeGuard functions will only work with types. But there are situations where you not only want to be sure to act on an object of a specific type, but also want to know that it's value is a member of a constrained value range. TypeGuard function can't help you with that. They will only tell whether an object is an instance of a specific type or not. You will gain the most benefit out of that functions in combination with the latter described type detection functions. They all have their own use-case scenario, but in combination they might be able to solve a lot of the type detecting problems you have to deal with in a typeless programming language.

Yes I know, that sounds crazy. Why do I call **Type**Script a typeless programming language. The language has the **Type** already in it's name. But remember, after transpiling it's only JavaScript what is left. All those type detection functions exist for one reason. To make sure you deal with the expected objects even at runtime, when every type information provided by TypeScript has gone.

See: [TypeGuard description at www.typescriptlang.org](https://www.typescriptlang.org/docs/handbook/advanced-types.html)   
See: [TS.Utils.TypeGuards](http://lord-saumagen.byethost14.com/home/V_1_0_7/TypeScript-Base-Documentation/modules/ts.utils.typeguards.html)   
See: [TS.Utils.Assert](http://lord-saumagen.byethost14.com/home/V_1_0_7/TypeScript-Base-Documentation/modules/ts.utils.assert.html)   
See: [TS.Utils 'check...' functions](http://lord-saumagen.byethost14.com/home/V_1_0_7/TypeScript-Base-Documentation/modules/ts.utils.html)   

## The TS.TypeCode.GUID objects

### TS.TypeCode.GUID

There is already a 'createGUID' function in the 'TS.Utils' namespace which creates a 'rfc4122' conform version 4 random GUID string. But I needed also a time-based GUID in a different project  so I created one. There is a GUID type, which is the base type of the 'RandomGUID' and 'TimeBasedGUID'  type. The default constructor of the 'GUID' will return a so called 'zero GUID' object. Otherwise  you have to provide a valid canonical string representation of a GUID to the constructor to create  a 'GUID' of any kind. Be aware that the constructor of the GUID type doesn't return a canonical  GUID string, but an object. The GUID object offers a property called 'canonicalString' which  represents the state of that GUID as a 'ref4122' conform canonical GUID string. Since every GUID  defined in 'rfc4122' has also a version and a variant number, the GUID object offers also the two properties 'version' and 'variant'. Those properties reflect the version number and variant number of the current GUID object. All of these properties are read only, since GUIDs are immutable per definition.    

### TS.TypeCode.RandomGUID

The RandomGUID type works much the same as the parent GUID type, but the default constructor doesn't return a 'zero GUID' but a version 4 random GUID. There is not much you can do with a random GUID but compare one random GUID to another. Use the 'canonicalString' property of the GUIDs for that purpose. The string compare function will always be able to tell  whether two canonical strings are the same or not.    

### TS.TypeCode.TimeBasedGUID

The TimeBasedGUID is more complex than the two other GUIDs. For that reason I want to give a little introduction to time-based GUIDs. The time-based GUID was invented to establish a well defined way to create a time stamp. That way, everybody who has to deal with a time-based GUID can read in the specification about how that GUID will match with an exact point in time. No matte who created that time-based GIUD. But there was also the requirement, that a time-based GUIDs created by one party shall never collide with a time-based GUID created by another party. For that reason, time-based GUIDs have to functional parts. The first is the time stamp and the second is an identifier which tells where the GUID belongs to. Consider this part as a set ID. Every time-based GUID with a matching set ID belongs to the same set. Two GUIDs from the same set will never collide, because the algorithm described in 'rfc4122' doesn't allow that. Time-based GUIDs with the same time stamp but different set IDs will never collide because they differ in the set ID part. For practical reasons that set ID is a MAC address. Preferably one of the MAC addresses available on your system. But you can opt for a random MAC address if your system doesn't provide a MAC address or you don't want to make your MAC address public available. The time stamp is the calculated number of 100 nanoseconds intervals passed since 1582-10-15T00:00:00:00000Z. You can read about that in the specification.    
Time-based GUIDs have a canonical string representation a version and a variant property like all GUIDs. In order to simplify the comparison of two time based GUIDs, there are some more properties and functions available. But lets start with the beginning. A 'TimeBasedGUID' has three different constructors.

```typescript
constructor()

constructor(MACAddress: string)

constructor(timeBasedGUID: TS.TypeCode.TimeBasedGUID)
````

The default constructor creates a new TimeBasedGUID object which has a random MAC address assigned. The time stamp is the one calculated at the time of creation. You will use that constructor to start a new set of TimeBasedGUIDs. After that you should make sure that all subsequent created TimeBasedGUIDs are created with the same random MAC address. Otherwise you will never be able to tell whether two TimeBasedGUIDs belong to the same set.
   
   
The constructor which requires a MAC address works much the same as the default constructor. But the set ID of the returned TimeBasedGUID will be the provided MAC address and not a randomly created MAC address. As for the default constructor, you will only use that constructor once to create a new set of TimeBasedGUIDs for the provided MAC address.
   
   
The third constructor requires a valid TimeBasedGUID as argument and creates the next valid TimeBasedGUID belonging to the set encoded in the provided time-based GUID. You will use that constructor to continue an already established set of time-based GUIDs. So you may start with the first or second constructor to create the first time based GUID of a new set. After that, you might always take the last created GUID and use the third constructor to get the next valid time based GUID. In order to simplify that task, there is a time-based GUID generator defined in the 'TS.TypeCode' namespace. That generator requires a TimeBasedGUID in the constructor and generates new GUIDs based on that start value as long as you need some. You can read about the generator in the next  chapter.
   
   
Since there is more to know about a time-based GUID as is about a random GUID, the time-based GUID offers some more properties and functions.    
The 'TimeBasedGUID' offers the following additional properties:
   
```
MACAddress             // The MAC addresss assigned to the current GUID as string.

GUIDCounter            // The GUID counter which is used to compensate the lower clock
                       // resolution in JavaScript

clockSequence          // The clock sequence counts the number of a new time ranges.
                       // A new time ranges is created every time an aberration between 
                       // the timestamp of the last GUID and the current GUID is detected.

timeInMillisecond      // The time-stamp of the current GUID in milliseconds since
                       // 1582-10-15T00:00:00:00000Z

isRandomMACAddress     // Tells whether the MAC address is a randomly created or a
                       // physical MAC address
```

The 'TimeBasedGUID' offers the following additional function:

```typescript
parse(canonicalGUIDString: string): TS.TypeCode.TimeBasedGUID
```

The parse function takes a valid time-based GUID canonical string and returns the corresponding TimeBaseGUID object. The purpose of that function is to create a start GUID for the TimeBasedGUIDGenerator from the last time-based GUID you have created during your last session. The parse function can also be used to validate a canonical string representation of a time-based GUID. The parse function throws an exceptions if the string representation isn't valid for any reason.

### TS.TypeCode.TimeBasedGUIDGenerator

As already mentioned in the previous chapter, there is a generator class defined in the  'TS.TypeCode' namespace to simplify the creation of time-based GUIDs. The class is called 'TimeBasedGUIDGenerator'. The constructor of that class gets called with a valid  time-based GUID which will be used to initialize the generator. Preferably that GUID should be the last GUID created in your last session. After that, each subsequent call to  next will return a **'IteratorResult<TS.TypeCode.TimeBasedGUID>'** result. You can also use the geneartor in a **'for...of..'** construct of course.


See: [rfc4122 at IETF](http://www.ietf.org/rfc/rfc4122.txt)   

### The TS.IO namespace

The stream implementation in the **'TS.IO'** namespace got a face lifting. There is now  a basic **'Stream'** implementation as well as a **'ByteStream'** and a **'BitStringStream'** implementation. Those streams offer synchronous or asynchronous send operations and event driven or polling mode receive operations. Read the API documentation to learn more about the stream classes.

See: [TS.IO API documentation](http://lord-saumagen.byethost14.com/home/V_1_0_7/TypeScript-Base-Documentation/modules/ts.io.html) 

---

The code of this library was entirely written in **Visual Studio Community 2017**   
The code was compiled with TypeScript in version 2.2.2.   
The whole solution is available at github as well as the corresponding test solution.   
The API documentation is available online but can also be downloaded as a zip file for off-line use.   

#### Links

See: [TypeScript-Base solution at github](https://github.com/lord-saumagen/TypeScript-Base)   
See: [TypeScript-Base-Test solution a github](https://github.com/lord-saumagen/TypeScript-Base-Test)   
See: [API documentation online (V1.0.7)](http://lord-saumagen.byethost14.com/home/V_1_0_7/TypeScript-Base-Documentation/)   
See: [API documentation as zip file for offline use (V1.0.7)](http://lord-saumagen.byethost14.com/home/V_1_0_7/TypeScript-Base-Documentation.zip)   
See: [npm package](https://www.npmjs.com/package/typescript-base)   

---

# Version 1.0.6

# TypeScript - Base

## Introduction

This library is primary designed to overcome the poor exception handling in JavaScript and to simplify the mundane task of type checking. For that reason I crated a set of exception classes in the namespace *'TS'*, a set of assertion functions in the namespace *'TS.Utils.Assert'* and a set of parameter check functions in the namespace *'TS.Utils'*. But there are also some functions and classes which target other problems. Please read the following chapters to learn about the reasons which led to the creation of this library.

## Exceptions, namespace 'TS'.

JavaScript offers only a few exception classes out of the box. They are called *'error'* in JavaScript. Since there are only so few of them, it is impossible to tell about the exact nature of an error by only looking at the error type. For that reason, it became a common behavior among JavaScript programmers to store additional information about an error in the *'message'* property of the error objects. Unfortunately that's a bad choice. Lets say you are using a third party JavaScript framework and you created exception handlers for those exceptions which are documented as possible exceptions by the framework creator. You decided to parse the message property of those exceptions to create a fine granular exception handler system. In the next release of that framework, some of the exception messages may have changed because of some corrected typos. Now you have a problem, because your exceptions handlers will not longer be able to identify those exceptions since the message changed. The problem grows even bigger, if some smart person decides to create localized exceptions messages depending on the users localization settings. In that case none of your exceptions handlers would trigger any more if the users localization settings differs from yours.   
That leads to the following situation. You need to parse the exception message to learn about the exact nature of an exception but you can't rely on it. That situation is not very satisfying.    That's the reason for the exception classes in this library. The exception classes are classes which are all based on the *'TS.Exception'* class in some way. They build a hierarchy of classes and the type of the class tells you about the nature of the exception. They also have a read only *'type'* property which holds the fully qualified type name of the class. Since the *'TS.Exception'* class implements the *'error'* interface, they are also valid JavaScript error objects.   
Writing fine granular exceptions handlers becomes a lot easier if you only have to deal with those classes.

Below is an example where I use the *'type'* property of an exception to handle all arithmetic exceptions which may arise. You still have to deal with strings in order to identify the exception type, but those strings won't change once an exception class is defined.

```typescript
catch(ex)
{
  if(ex.type == "TS.ArithmeticException")
  {
    // Do something
  }
  else
  {
    // Rethrow if you can't handle that exception.
    throw ex;
  }
}
```

Of course you could also use the *'instanceof'* operator to identify an exception type.
Here is an example.

```typescript

catch(ex)
{
  if(ex instanceof TS.ArithmeticException)
  {
    // Do something
  }
  else
  {
    // Rethrow if you can't handle that exception.
    throw ex;
  }
}
```

The exception handler in the first example would only trigger if the exception is a *'TS.ArithmeticException'* since we are looking for an exact match with the *'type'* string of that exception.    The handler in the second example would handle the *'TS.ArithmeticException'* exception as well as the *'TS.OverflowException'* exception and the *'TS.DividedByZeroException'* exception. Because those are descendants of the *'TS.ArithmeticException'* exception. I hope you got the picture. Each of those exceptions have still a *'message'* property which may transport human readable information about the exception. But you don't have to worry about changes in that messages any more, since they are not longer of interest for you to identify an exception. Now it also wouldn't matter if the messages would be localized.    In order to benefit from those exception classes, you have to use them instead of the JavaScript *'error'* objects. You should also create your own exception classes based on one of the existing if you can't find a class which fits your needs. That way the exception classes are always specific for a well defined error or class of errors. Giving you the chance to create exception handlers as specific as the exceptions itself. Please read the API documentation to learn more about the exception classes.

See: [TS.Exception API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/classes/ts.exception.html)

## Assertions, namespace 'TS.Utils.Assert'.

Since JavaScript doesn't offer a reliable type system, you have to write a lot of code to make sure that the variables at hand have the type they are supposed to have. That may not be a problem as long as you only have to deal with variables which are defined in the current code segment. That means a function or control structure. But if your have to deal with function arguments or return values from other functions, the picture changes. There is no guarantee that your functions get always called with a valid set of arguments. There is also no guarantee that a function always returns the result you expect from it. In order to make sure that you got what you expect, you have to verify the types of those values yourself. Let's say we created a function which should be used to create a new person record in a database. That function might look like that:

```typescript
function createPerson(firstName: string, lastName: string, dateOfBirth: Date, gender: GenderEnum)
{
  // Save the new record.
}
```

In TypeScript the types of the arguments are fixed. But to think one can use the argument values to create a new person record, just the way they are provided to the function, is a mistake. First of all, all of the arguments may be null or undefined. Even if not, the values of the arguments *'firstName'* and *'lastName'* may be an empty string or a string which only consist of white space. As you see, we are still far away from a proof that the set of arguments is a valid set of arguments to create a new person record. Let's start with the name values and create a proof that they are valid strings. We can use the *'TS.Utils.Assert.isNullUndefOrWhiteSpace'* for that. The function checks the argument value against *'undefined'*, *'null'*, an empty string and whether the string consist of whitespace characters only. That are the checks we have to do in order to get valid string values from the name arguments. The strings may still be one character strings or have some invalid characters. So we might have to improve the argument check, but at least we know that we deal with a none empty string after this first approach. The improved function would look like this:

```typescript
function createPerson(firstName: string, lastName: string, dateOfBirth: Date, gender: GenderEnum)
{
  if(TS.Utils.Asser.isNullUndefOrWhiteSpace(firstName) || TS.Utils.Asser.isNullUndefOrWhiteSpace(lastName))
  {
    //Stop execution. There is no point in going on with invalid arguments.
  }
}
```

That's how the assertion functions are supposed to be use. They give you proof, that a variable value at hand has the expected type. The most common scenario if a variable value fails that check is to throw an exception. That leads to the parameter check functions in the next chapter.

## Parameter check functions, namespace 'TS.Utils'.

The parameter check functions in the *'TS.Utils'* namespace combine the verification of parameter values and meaningful exceptions. They all start with a *'check'* prefix and end with a *'Parameter'* postfix. The assertion between the prefix and the postfix tells you about the nature of the check. Let's stick with the example from the previous chapter. In case the *'createPerson'* function is part of a library which should be used by others, those may only know the compiled version of your function. Remember, TypeScript compiles to pure JavaScript. After compilation your function looks like this:

```typescript
function createPerson(firstName, lastName, dateOfBirth, gender)
{

}
```

All type declarations are gone. A smart programmer might guess that the *'firstName'* and *'lastName'* arguments are supposed to be strings. The *'dateOfBirth'* argument might have two valid types. It could be a *'Date'* object or a string representation of a date. The type of the *'gender'* argument might be a string, a boolean, a number or whatever we chose to represent a gender value. (There is no hint at all that the gender value should be a value from the range of the *'GenderEnum'*) If we don't want to be blamed that our code creates stupid results, we have to make sure that we don't process on an invalid argument set. It's also our responsibility to create a meaningful exception in case something went wrong.
Let's start with the name fields again. They shouldn't be undefined, null, empty or whitespace in order to be a valid name. We should also throw an exception if they are invalid. There is a parameter check function for that purpose. The function is called *'checkStringParameter'*. The function get's called with the parameter name, the parameter value and the fully qualified function name of the function where the check occurred.

```typescript
function createPerson(firstName, lastName, dateOfBirth, gender)
{
  TS.Utils.checkStringParameter("firstName", firstName, "****.***.createPerson");
}
```

Below is the definition of the *'checkStringParameter'* function in the *'TS.Utils'* namespace:

```typescript
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
    export function checkStringParameter(parameterName: string, parameter: any, functionName: string)
    {
      TS.Utils.checkParameter(parameterName, parameter, functionName);

      if (!TS.Utils.Assert.isString(parameter))
      {
        throw new TS.InvalidTypeException(parameterName, "Argument '" + parameterName + "' must be a string variable in function '" + functionName + "'.");
      }//END if

      if (TS.Utils.Assert.isNullUndefOrWhiteSpace(parameter))
      {
        throw new TS.ArgumentNullUndefOrWhiteSpaceException(parameterName, "Argument '" + parameterName + "' must not be empty or whitespace in function '" + functionName + "'.");
      }//END if
    }
```

As you can see, the function does all the necessary checks to proof that a string is a none empty none whitespace string. The exceptions messages tells exactly which parameter failed a check and for what reason. If you provide the fully qualified function name when calling one of the check functions, the exception message will also reveal where exactly the check failed in your code. The message doesn't tell the exact line in your source code, but the fully qualified function name is information enough to easily pinpoint the place in your code where things went wrong.
The complete example with parameter checks for all parameters would look like this.

```typescript
function createPerson(firstName, lastName, dateOfBirth, gender)
{
  TS.Utils.checkStringParameter("firstName", firstName, "[your namespace].[your class name].createPerson");
  TS.Utils.checkStringParameter("lastName", lastName, "[your namespace].[your class name].createPerson");
  TS.Utils.checkDateParameter("dateOfBirth", dateOfBirth, "[your namespace].[your class name].createPerson");
  TS.Utils.checkUIntNumberParameter("gender", gender, "[your namespace].[your class name].createPerson");

  if(!TS.Utils.Assert.isValueOfEnum(gender, GenderEnum))
  {
    // Throw an exception. The gender value is not a value from the 'GenderEnum' enumeration.
  }
}
```

If you follow a defensive programming style like I do, you would check the parameters in either way, because you wouldn't trust data you didn't create yourself. The parameter check functions will make this mundane task a lot easier. The parameter check functions are part of your program. They don't disappear during compilation. This way your function wouldn't operate on invalid data even if the function is used in a pure JavaScript environment. That's the whole idea behind the parameter check functions.
The *'TS.Utils'* namespace hosts some functions which don't have to do with parameter checking. Those are functions which solve a specific problem, but don't belong to a specific problem domain. That's why they ended up in the *'TS.Utils'* namespace. Take a look at the API documentation to learn more about those functions.

See: [TS.Utils API documentation.](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/modules/ts.utils.html)

There remaining namespaces in this library are only sparsely equipped. They host functions and classes which were created to solve problems in other solutions. But logically they belong to a base class library. The number of classes and functions in that namespaces may grow over time, but today they are not much more than a skeleton implementation.

## Namespace TS.IO

The *'TS.IO'* namespace hosts a simple stream implementation. The stream is a unidirectional, one time stream. That means the stream has a sender and a receiver and the data flows only in the direction sender to receiver and not vice versa. One time means the stream can not longer be used after the stream has closed or ran into an error condition.
Please read the API documentation to learn more about this stream implementation.

See: [TS.IO.Stream API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/classes/ts.io.stream.html)

## Namespace TS.Encoding

The *'TS.Encoding'* namespace consists of two classes. The *'TS.Encoding.Base64'* class offers functions to encode and decode base64 string. The *'TS.Encoding.UTF'* class offers functions to cast a UTF-16 string into an UTF-8 string and vice versa.
Please read the API documentation to learn more about those classes.

See: [TS.Encoding API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/modules/ts.encoding.html)

## Namespace TS.TypeCode

You will find the *'UInt64'* class in this namespace. The class is an implementation of an unsigned 64 bit integer number. There are only as much arithmetic functions implemented as I needed in order to implement some cipher algorithms in another project. That class may be of little use in other scenarios.

See: [TS.TypeCode.UInt64 API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/classes/ts.typecode.uint64.html)

---

The code of this library was entirely written in **Visual Studio Community 2015 Update 3**   
The code was compiled with TypeScript in version 2.0.6.   
The whole solution is available at github as well as the corresponding test solution.   
The API documentation is available online but can also be downloaded as a zip file for off-line use.   

#### Links

See: [TypeScript-Base solution at github](https://github.com/lord-saumagen/TypeScript-Base)   
See: [TypeScript-Base-Test solution a github](https://github.com/lord-saumagen/TypeScript-Base-Test)   
See: [API documentation online (V1.0.6)](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/)   
See: [API documentation as zip file for offline use (V1.0.6)](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation.zip)   
See: [npm package](https://www.npmjs.com/package/typescript-base)   

---

## License

This software is licensed under the "Microsoft Public License".

See: [MS-PL](https://opensource.org/licenses/MS-PL")

&copy; lord.saumagen@gmail.com, 2017
