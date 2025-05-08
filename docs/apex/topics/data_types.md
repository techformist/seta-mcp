# Apex Data Types and Variables

Apex is a strongly-typed language, meaning every variable and expression must have a declared data type, such as `sObject`, primitive, or enum. This allows for compile-time type checking and helps prevent errors.

## Overview of Data Types

Apex supports several categories of data types:

1.  **Primitives:** Basic data types like `Integer`, `Boolean`, `String`, `Date`, `Double`, etc.
2.  **sObjects:** Represent records stored in the Salesforce database. Can be generic (`sObject`) or specific (`Account`, `MyCustomObject__c`).
3.  **Collections:** Ways to group other data types:
    - **Lists:** Ordered collections of elements.
    - **Sets:** Unordered collections of unique elements.
    - **Maps:** Collections of key-value pairs.
4.  **Enums (Enumerations):** Abstract data types with a finite set of defined identifiers.
5.  **User-Defined Classes:** Custom types created by developers using Apex classes.
6.  **System-Supplied Classes:** Classes provided by Salesforce (e.g., within the `System` or `Schema` namespaces).
7.  **Null:** A special value indicating the absence of data.

## Primitive Data Types

Apex uses many of the same primitive data types as the SOAP API, with some nuances. Primitive data types are always passed by value into methods.

| Data Type    | Description                                                                                                                                                                                                                                                                                                                                                                       | Example                                                          |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| **Blob**     | A collection of binary data stored as a single object. Can be converted to/from `String` using `toString()` and `valueOf()`. Used for documents, attachments, and Crypto class operations.                                                                                                                                                                                        | `Blob myBlob = Blob.valueOf('My data');`                         |
| **Boolean**  | A value that can only be assigned `true`, `false`, or `null`. Variables are initialized to `null` if not explicitly assigned a value (don't assume `false`).                                                                                                                                                                                                                      | `Boolean isWinner = true;` `Boolean flag = null;`                |
| **Date**     | Represents a particular day without time information. Should be created using system static methods like `Date.today()`. Integer values can be added/subtracted (representing days). Arithmetic between two Date values is not directly supported (use Date methods). Implicit string conversion appends a timestamp; use `String.valueOf()` to avoid this.                       | `Date today = Date.today();` `Date nextWeek = today.addDays(7);` |
| **Datetime** | Represents a specific day and time (like a timestamp). Should be created using system static methods like `Datetime.now()`. Integer or Double values can be added/subtracted (representing days and fractions of days). Arithmetic between two Datetime values is not directly supported (use Datetime methods).                                                                  | `Datetime now = Datetime.now();`                                 |
| **Decimal**  | An arbitrary-precision number that includes a decimal point. Currency fields are automatically this type. Scale (number of decimal places) is determined by context (query result field scale, string format) unless explicitly set using `setScale()`. Be cautious using Decimals with different scales as Map keys or in Sets, as their hashcodes might differ.                 | `Decimal myDecimal = 123.456;`                                   |
| **Double**   | A 64-bit number that includes a decimal point. Used for larger ranges than `Integer`. Has min/max values of +/- 2^63. Scientific notation (e) is not supported. Fractions lost in Integer/Long division are preserved if operands are Double/Decimal.                                                                                                                             | `Double pi = 3.14159;` `Double d = 5.0 / 3.0; // 1.66...`        |
| **ID**       | Any valid 18-character Lightning Platform record identifier (case-sensitive). If set to a 15-character value, Apex converts it to 18 characters. Invalid ID values cause a runtime exception. Can be implicitly converted to Strings.                                                                                                                                             | `ID myId = '001D000000Jsm0WIAR';`                                |
| **Integer**  | A 32-bit number without a decimal point. Min value: -2,147,483,648, Max value: 2,147,483,647.                                                                                                                                                                                                                                                                                     | `Integer i = 10;`                                                |
| **Long**     | A 64-bit number without a decimal point. Use when a wider range than `Integer` is needed. Min value: -2^63, Max value: 2^63-1. Append 'L' to numeric literals to ensure they are treated as Long.                                                                                                                                                                                 | `Long l = 2147483648L;`                                          |
| **Object**   | Represents any data type supported in Apex. All other Apex data types inherit from Object. Can be used for generic handling and casting to more specific types.                                                                                                                                                                                                                   | `Object obj = 10; Integer i = (Integer)obj;`                     |
| **String**   | Any set of characters enclosed in single quotes. Limit on characters governed by heap size limit. Can be `null` or empty. Can include leading/trailing whitespace. Supports standard Java escape sequences (`\n`, `\t`, etc.) and comparison operators (`==`, `!=`, `>`, `<`, etc., case-insensitive based on user locale). Use `escapeSingleQuotes()` to prevent SOQL injection. | `String name = 'My Company';`                                    |
| **Time**     | Represents a particular time. Should be created using system static methods like `Time.newInstance()`.                                                                                                                                                                                                                                                                            | `Time t = Time.newInstance(18, 30, 2, 20);`                      |

**Note:** `AnyType` and `Currency` are non-standard primitive types mainly used in specific system methods (like `Schema.SObjectField` for field history or `Currency.newInstance` for SOQL/SOSL `WHERE` clauses) and cannot be used as general variable or method types.

## Collections

Collections group multiple items. Apex provides Lists, Sets, and Maps.

### List

- **Definition:** An ordered collection of elements distinguished by an index (starting at 0). Elements can be of any data type, and duplicates are allowed.
- **Use Case:** When the order of elements matters.
- **Syntax:** `List<elementType> listName = new List<elementType>();`
- **Example:** `List<String> colors = new List<String>{'red', 'green'}; colors.add('blue'); String firstColor = colors[0];`
- **Notes:** Lists can be nested up to 8 levels deep. Array notation (`String[]`) can also be used for one-dimensional lists of primitives or objects. Lists have methods like `add()`, `get()`, `set()`, `clear()`, `size()`, `isEmpty()`, `sort()`.

### Set

- **Definition:** An unordered collection of unique primitive elements.
- **Use Case:** Storing unique values where order doesn't matter.
- **Syntax:** `Set<primitiveType> setName = new Set<primitiveType>();`
- **Example:** `Set<Integer> uniqueNumbers = new Set<Integer>{1, 2, 3}; uniqueNumbers.add(1); // No change, 1 already exists. System.assert(uniqueNumbers.contains(2));`
- **Notes:** Uses a hash structure. Cannot access elements by index, only iterate over them. Iteration order is deterministic but not guaranteed.

### Map

- **Definition:** A collection of key-value pairs. Each key must be unique and maps to a single value. Keys must be primitives; values can be any data type.
- **Use Case:** Finding values based on a unique key.
- **Syntax:** `Map<keyType, valueType> mapName = new Map<keyType, valueType>();`
- **Example:** `Map<ID, Account> accountMap = new Map<ID, Account>(); Account acc = new Account(Name='Test'); insert acc; accountMap.put(acc.Id, acc); Account retrievedAcc = accountMap.get(acc.Id);`
- **Notes:** Uses a hash structure. String keys are **case-sensitive**. Adding an entry with an existing key overwrites the previous value. Iteration order is deterministic but not guaranteed. `keySet()` returns a Set of keys. `values()` returns a List of values. Only specific key types (primitives like Boolean, Date, Datetime, Decimal, Double, Enum, Id, Integer, Long, String, Time) allow the Map to be JSON serializable.

## sObjects

- **Definition:** Represents a record stored in Salesforce (standard or custom object).
- **Types:**
  - **Specific:** Declared using the object's API name (e.g., `Account`, `MyCustomObject__c`). Provides compile-time checking of fields.
  - **Generic:** Declared using the `sObject` keyword. Can represent any record type. Useful for writing code that handles different object types.
- **Instantiation:** `Account acc = new Account(Name='Test Inc.');` `sObject genericSObj = new Contact();`
- **Field Access:** Use dot notation for specific sObjects (`acc.Name`). For generic sObjects, dot notation only works for the `Id` field; use `get('FieldName')` and `put('FieldName', value)` methods for other fields.
- **Initialization:** Variables are `null` by default. Use `new` operator to assign an object reference. Initial field values can be set during instantiation: `Account a = new Account(Name='Acme', BillingCity='San Francisco');`

## Enums (Enumerations)

- **Definition:** An abstract data type with a fixed set of named constants (identifiers). Useful for defining a set of possible values that don't have a numeric order (e.g., seasons, status codes).
- **Syntax:** `public enum Season {WINTER, SPRING, SUMMER, FALL}`
- **Usage:** `Season currentSeason = Season.WINTER;`
- **System Enums:** Apex provides several system-defined enums (e.g., `System.StatusCode`, `System.LoggingLevel`).

## User-Defined Classes

Objects created from custom Apex classes you write are also a data type. They follow standard object-oriented principles.

## The `Object` Type

- **Definition:** The base type for all other Apex data types. Any data type inherits from `Object`.
- **Usage:** Primarily used for flexibility when the specific data type isn't known at compile time or when methods need to handle multiple types. Requires casting to access methods/properties of the specific underlying type.
- **Example:** `Object obj = 10; Integer i = (Integer)obj;`

## Null

- **Definition:** Represents the absence of a value.
- **Initialization:** All variables (primitive or otherwise) are initialized to `null` if not explicitly assigned a value upon declaration.
- **Assignment:** You can assign `null` to any variable.
- **Caution:** Accessing members or calling methods on a `null` variable results in a `NullPointerException`. Always check for `null` before dereferencing potentially `null` variables.

## Important Considerations

- **Variable Naming:** Case-insensitive; must start with a letter; can contain letters, numbers, underscores; cannot end with an underscore; cannot have consecutive underscores; cannot be a reserved keyword; max length 255 characters.
- **Case Sensitivity:** Apex code (variables, methods) and SOQL/SOSL keywords are generally case-insensitive. However, String keys in Maps _are_ case-sensitive.
- **Type Conversion:** Apex generally requires explicit type conversion (casting), except for implicit conversion up the numeric hierarchy (Integer -> Long -> Double -> Decimal) and from ID to String. String to ID requires runtime validation.
- **Numeric Overflow/Underflow:** Apex doesn't throw errors for numeric overflow/underflow; values wrap around (e.g., `Integer.MAX_VALUE + 1` becomes `Integer.MIN_VALUE`). Ensure data types are large enough for calculations (use `Long` or `Decimal` for intermediate results if necessary).
