#TypeScript - Base

##Introduction

This library is primary designed to overcome the poor exception handling in JavaScript and to simplify the mundane task of type checking. For that reason I crated a set of exception classes in the namespace *'TS'*, a set of assertion functions in the namespace *'TS.Utils.Assert'* and a set of parameter check functions in the namespace *'TS.Utils'*.
But there are also some functions and classes which target other problems. Please read the following chapters to learn about the reasons which led to the creation of this library.

##Exceptions, namespace 'TS'.

JavaScript offers only a few exception classes out of the box. They are called *'error'* in JavaScript. Since there are only so few of them, it is impossible to tell about the exact nature of an error by only looking at the error type. For that reason, it became a common behavior among JavaScript programmers to store additional information about an error in the *'message'* property of the error objects. Unfortunately that's a bad choice. Lets say you are using a third party JavaScript framework and you created exception handlers for those exceptions which are documented as possible exceptions by the framework creator. You decided to parse the message property of those exceptions to create a fine granular exception handler system. In the next release of that framework, some of the exception messages may have changed because of some corrected typos. Now you have a problem, because your exceptions handlers will not longer be able to identify those exceptions since the message changed. The problem grows even bigger, if some smart person decides to create localized exceptions messages depending on the users localization settings. In that case none of your exceptions handlers would trigger any more if the users localization settings differs from yours.
That leads to the following situation. You need to parse the exception message to learn about the exact nature of an exception but you can't rely on it. That situation is not very satisfying.
That's the reason for the exception classes in this library.
The exception classes are classes which are all based on the *'TS.Exception'* class in some way. They build a hierarchy of classes and the type of the class tells you about the nature of the exception. They also have a read only *'type'* property which holds the fully qualified type name of the class. Since the *'TS.Exception'* class implements the *'error'* interface, they are also valid JavaScript error objects.
Writing fine granular exceptions handlers becomes a lot easier if you only have to deal with those classes.

Below is an example where I use the *'type'* property of an exception to handle all arithmetic exceptions which may arise. You still have to deal with strings in order to identify the exception type, but those strings won't change once an exception class is defined.

```
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

Of course you could also use the *'instanceof'* operator to identify an exception type. Here is an example.

```

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

The exception handler in the first example would only trigger if the exception is a *'TS.ArithmeticException'* since we are looking for an exact match with the *'type'* string of that exception.
The handler in the second example would handle the *'TS.ArithmeticException'* exception as well as the *'TS.OverflowException'* exception and the *'TS.DividedByZeroException'* exception. Because those are descendants of the *'TS.ArithmeticException'* exception. I hope you got the picture.
Each of those exceptions have still a *'message'* property which may transport human readable information about the exception. But you don't have to worry about changes in that messages any more, since they are not longer of interest for you to identify an exception. Now it also wouldn't matter if the messages would be localized.   
In order to benefit from those exception classes, you have to use them instead of the JavaScript *'error'* classes. You should also create your own exception classes based on one of the existing if you can't find a class which fits your needs. That way the exception classes are always specific for a well defined error or class of errors. Giving you the chance to create exception handlers as specific as the exceptions itself. Please read the API documentation to learn more about the exception classes.

See: [TS.Exception API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/classes/ts.exception.html)

## Assertions, namespace 'TS.Utils.Assert'.

Since JavaScript doesn't offer a reliable type system, you have to write a lot of code to make sure that the variables at hand have the type they are supposed to have. That may not be a problem as long as you only have to deal with variables which are defined in the current code segment. That means a function or control structure. But if your have to deal with function arguments or return values from other functions, the picture changes. There is no guarantee that your functions get always called with a valid set of arguments. There is also no guarantee that a function always returns the result you expect from it. In order to make sure that you got what you expect, you have to verify the types of those values yourself. Let's say we created a function which should be used to create a new person record in a database. That function might look like that:

```
function createPerson(firstName: string, lastName: string, dateOfBirth: Date, gender: GenderEnum)
{
  // Save the new record.
}
```

In TypeScript the types of the arguments are fixed. But to think one can use the argument values to create a new person record, just the way they are provided to the function, is a mistake. First of all, all of the arguments may be null or undefined. Even if not, the values of the arguments *'firstName'* and *'lastName'* may be an empty string or a string which only consist of white space. As you see, we are still far away from a proof that the set of arguments is a valid set of arguments to create a new person record. Let's start with the name values and create a proof that they are valid strings. We can use the *'TS.Utils.Assert.isNullUndefOrWhiteSpace'* for that. The function checks the argument value against *'undefined'*, *'null'*, an empty string and whether the string consist of whitespace characters only. That are the checks we have to do in order to get valid string values from the name arguments. The strings may still be one character strings or have some invalid characters. So we might have to improve the argument check, but at least we know that we deal with a none empty string after this first approach. The improved function would look like this:

```
function createPerson(firstName: string, lastName: string, dateOfBirth: Date, gender: GenderEnum)
{
  if(TS.Utils.Asser.isNullUndefOrWhiteSpace(firstName) || TS.Utils.Asser.isNullUndefOrWhiteSpace(lastName))
  {
    //Stop execution. There is no point in going on with invalid arguments.
  }
}
```
That's how the assertion functions are supposed to be use. They give you proof, that a variable value at hand has the expected type. The most common scenario if a variable value fails that check is to throw an exception. That leads to the parameter check functions in the next chapter.

##Parameter check functions, namespace 'TS.Utils'.

The parameter check functions in the *'TS.Utils'* namespace combine the verification of parameter values and meaningful exceptions. They all start with a *'check'* prefix and end with a *'Parameter'* postfix. The assertion between the prefix and the postfix tells you about the nature of the check. Let's stick with the example from the previous chapter. In case the *'createPerson'* function is part of a library which should be used by others, those may only know the compiled version of your function. Remember, TypeScript compiles to pure JavaScript. After compilation your function looks like this:

```

function createPerson(firstName, lastName, dateOfBirth, gender)
{

}

```

All type declarations are gone. A smart programmer might guess that the *'firstName'* and *'lastName'* arguments are supposed to be strings. The *'dateOfBirth'* argument might have two valid types. It could be a *'Date'* object or a string representation of a date. The type of the *'gender'* argument might be a string, a boolean, a number or whatever we chose to represent a gender value. (There is no hint at all that the gender value should be a value from the range of the *'GenderEnum'*) If we don't want to be blamed that our code creates stupid results, we have to make sure that we don't process on an invalid argument set. It's also our responsibility to create a meaningful exception in case something went wrong.
Let's start with the name fields again. They shouldn't be undefined, null, empty or whitespace in order to be a valid name. We should also throw an exception if they are invalid. There is a parameter check function for that purpose. The function is called *'checkStringParameter'*. The function get's called with the parameter name, the parameter value and the fully qualified function name of the function where the check occurred.

```
function createPerson(firstName, lastName, dateOfBirth, gender)
{
  TS.Utils.checkStringParameter("firstName", firstName, "****.***.createPerson");
}
```

Below is the definition of the *'checkStringParameter'* function in the *'TS.Utils'* namespace:

```
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

```
function createPerson(firstName, lastName, dateOfBirth, gender)
{
  TS.Utils.checkStringParameter("firstName", firstName, "......createPerson");
  TS.Utils.checkStringParameter("lastName", lastName, "......createPerson");
  TS.Utils.checkDateParameter("dateOfBirth", dateOfBirth, "......createPerson");
  TS.Utils.checkDateParameter("dateOfBirth", dateOfBirth, "......createPerson");
  TS.Utils.checkUIntNumberParameter("gender", gender, "......createPerson");
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

##Namespace TS.IO

The *'TS.IO'* namespace hosts a simple stream implementation. The stream is a unidirectional, one time stream. That means the stream has a sender and a receiver and the data flows only in the direction sender to receiver and not vice versa. One time means the stream can not longer be used after the stream has closed or ran into an error condition.
Please read the API documentation to learn more about this stream implementation.

See: [TS.IO.Stream API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/classes/ts.io.stream.html)

##Namespace TS.Encoding

The *'TS.Encoding'* namespace consists of two classes. The *'TS.Encoding.Base64'* class offers functions to encode and decode base64 string. The *'TS.Encoding.UTF'* class offers functions to cast a UTF-16 string into an UTF-8 string and vice versa.
Please read the API documentation to learn more about those classes.

See: [TS.Encoding API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/modules/ts.encoding.html)

##Namespace TS.TypeCode

You will find the *'UInt64'* class in this namespace. The class is an implementation of an unsigned 64 bit integer number. There are only as much arithmetic functions implemented as I needed in order to implement some cipher algorithms in another project. That class may be of little use in other scenarios.

See: [TS.TypeCode.UInt64 API documentation](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/classes/ts.typecode.uint64.html)

##Links

The code of this library was entirely written in **Visual Studio Community 2015 Update 3**   
The code was compiled with TypeScript in version 2.0.6.   
The whole solution is available at github as well as the corresponding test solution.   
The API documentation is available online but can also be downloaded as a zip file for offline use.   


See: [TypeScript-Base solution at github](https://github.com/lord-saumagen/TypeScript-Base)   
See: [TypeScript-Base-Test solution a github](https://github.com/lord-saumagen/TypeScript-Base-Test)   
See: [API documentation online](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation/)   
See: [API documentation as zip file for offline use](http://lord-saumagen.byethost14.com/home/TypeScript-Base-Documentation.zip)   
See: [npm package](https://www.npmjs.com/package/typescript-base)   

##License

This software is licensed under the "Microsoft Public License".

See: [MS-PL](https://opensource.org/licenses/MS-PL")

&copy; lord.saumagen@gmail.com, 2016
