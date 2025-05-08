# future: not used right now.

TITLE: Variable Declaration Example in Apex
DESCRIPTION: Demonstrates declaring Integer, Decimal, and Account (sObject) variables in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 10)
LANGUAGE: apex
CODE:

````apex
// The following variable has the data type of Integer with the name Count,
// and has the value of 0.
Integer Count = 0;
// The following variable has the data type of Decimal with the name Total. Note
// that no value has been assigned to it.
Decimal Total;
// The following variable is an account, which is also referred to as an sObject.
Account MyAcct = new Account();
``
---

TITLE: Conditional Statement Block Example
DESCRIPTION: Illustrates an if-else block structure in Apex using System.debug statements.
SOURCE: Apex Developer Guide v64.0 (Page 11)
LANGUAGE: apex
CODE:

```apex
if (true) {
 System.debug(1);
 System.debug(2);
} else {
 System.debug(3);
 System.debug(4);
}
````

---

TITLE: Conditional Statement Single Line Example
DESCRIPTION: Shows an if-else structure where curly braces are omitted for single statement blocks.
SOURCE: Apex Developer Guide v64.0 (Page 11)
LANGUAGE: apex
CODE:

```apex
if (true)
 System.debug(1);
else
 System.debug(2);
```

---

TITLE: List Initialization Syntax
DESCRIPTION: Provides the general syntax for creating List collections in Apex, including initialization options.
SOURCE: Apex Developer Guide v64.0 (Page 11)
LANGUAGE: apex
CODE:

```apex
List <datatype> list_name
 [= new List<datatype>();] |
 [=new List<datatype>{value [, value2. . .]};] |
 ;
```

---

TITLE: Integer List Initialization Example
DESCRIPTION: Demonstrates creating an empty List of Integers in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 11)
LANGUAGE: apex
CODE:

```apex
List<Integer> My_List = new List<Integer>();
```

---

TITLE: Set Initialization Syntax
DESCRIPTION: Provides the general syntax for creating Set collections in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 12)
LANGUAGE: apex
CODE:

```apex
Set<datatype> set_name
 [= new Set<datatype>();] |
 [= new Set<datatype>{value [, value2. . .] };] |
 ;
```

---

TITLE: String Set Initialization Example
DESCRIPTION: Creates a Set of Strings, initializing it with values using curly braces.
SOURCE: Apex Developer Guide v64.0 (Page 12)
LANGUAGE: apex
CODE:

```apex
Set<String> My_String = new Set<String>{'a', 'b', 'c'};
```

---

TITLE: Map Initialization Syntax
DESCRIPTION: Provides the general syntax for creating Map collections in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 12)
LANGUAGE: apex
CODE:

```apex
Map<key_datatype, value_datatype> map_name
 [=new Map<key_datatype, value_datatype>();] |
 [=new Map<key_datatype, value_datatype>
 {key1_value => value1_value
 [, key2_value => value2_value. . .]};] |
 ;
```

---

TITLE: Integer to String Map Initialization Example
DESCRIPTION: Creates a Map with Integer keys and String values, initializing it with key-value pairs using curly braces and the '=>' operator.
SOURCE: Apex Developer Guide v64.0 (Page 12)
LANGUAGE: apex
CODE:

```apex
Map<Integer, String> My_Map = new Map<Integer, String>{1 => 'a', 2 => 'b', 3 => 'c'};
```

---

TITLE: Basic If-Else Branching Syntax
DESCRIPTION: Shows the basic syntax structure for an if-else conditional statement in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 12)
LANGUAGE: apex
CODE:

```apex
if (Condition){
 // Do this if the condition is true
} else {
 // Do this if the condition is not true
}
```

---

TITLE: Apex Quick Start: MyHelloWorld Class Definition
DESCRIPTION: Defines a simple public Apex class named MyHelloWorld as part of the Apex Quick Start tutorial.
SOURCE: Apex Developer Guide v64.0 (Page 22)
LANGUAGE: apex
CODE:

```apex
public class MyHelloWorld {
}
```

---

TITLE: Apex Quick Start: applyDiscount Method Definition
DESCRIPTION: Defines a public static method within the MyHelloWorld class to apply a discount to Book\_\_c records.
SOURCE: Apex Developer Guide v64.0 (Page 22)
LANGUAGE: apex
CODE:

```apex
public static void applyDiscount(Book__c[] books) {
 for (Book__c b :books){
 b.Price__c *= 0.9;
 }
}
```

---

TITLE: Apex Quick Start: Book Discount Logic
DESCRIPTION: Shows the for loop and the statement within the applyDiscount method that calculates and applies a 10% discount to the Price\_\_c field.
SOURCE: Apex Developer Guide v64.0 (Page 22)
LANGUAGE: apex
CODE:

```apex
for (Book__c b :books){
 b.Price__c *= 0.9;
}
```

---

TITLE: Apex Quick Start: Complete MyHelloWorld Class
DESCRIPTION: Shows the full definition of the MyHelloWorld class including the applyDiscount method.
SOURCE: Apex Developer Guide v64.0 (Page 23)
LANGUAGE: apex
CODE:

```apex
public class MyHelloWorld {
 public static void applyDiscount(Book__c[] books) {
  for (Book__c b :books){
   b.Price__c *= 0.9;
  }
 }
}
```

---

TITLE: Apex Quick Start: HelloWorldTrigger Definition
DESCRIPTION: Defines an Apex trigger named HelloWorldTrigger that runs before insert on the Book\_\_c object and calls the MyHelloWorld.applyDiscount method.
SOURCE: Apex Developer Guide v64.0 (Page 23)
LANGUAGE: apex
CODE:

```apex
trigger HelloWorldTrigger on Book__c (before insert) {

 Book__c[] books = Trigger.new;

 MyHelloWorld.applyDiscount(books);
}
```

---

TITLE: Apex Quick Start: Trigger Definition Line
DESCRIPTION: Shows the first line defining the HelloWorldTrigger, specifying its name, the object it operates on (Book\_\_c), and the event (before insert).
SOURCE: Apex Developer Guide v64.0 (Page 23)
LANGUAGE: apex
CODE:

```apex
trigger HelloWorldTrigger on Book__c (before insert) {
```

---

TITLE: Apex Quick Start: Trigger Context Variable Assignment
DESCRIPTION: Assigns the Trigger.new context variable (a list of new Book\_\_c records) to a local variable named 'books'.
SOURCE: Apex Developer Guide v64.0 (Page 23)
LANGUAGE: apex
CODE:

```apex
Book__c[] books = Trigger.new;
```

---

TITLE: Apex Quick Start: Calling Static Method from Trigger
DESCRIPTION: Shows the line within the trigger that calls the static applyDiscount method from the MyHelloWorld class, passing the new books.
SOURCE: Apex Developer Guide v64.0 (Page 23)
LANGUAGE: apex
CODE:

```apex
MyHelloWorld.applyDiscount(books);
```

---

TITLE: Apex Quick Start: HelloWorldTestClass Definition
DESCRIPTION: Defines a test class with the @IsTest annotation containing a test method to validate the HelloWorld trigger and class functionality.
SOURCE: Apex Developer Guide v64.0 (Page 24)
LANGUAGE: apex
CODE:

```apex
@IsTest
private class HelloWorldTestClass {
 @IsTest
 static void validateHelloWorld() {
  Book__c b = new Book__c(Name='Behind the Cloud', Price__c=100);
  System.debug('Price before inserting new book: ' + b.Price__c);

  // Insert book
  insert b;

  // Retrieve the new book
  b = [SELECT Price__c FROM Book__c WHERE Id =:b.Id];
  System.debug('Price after trigger fired: ' + b.Price__c);

  // Test that the trigger correctly updated the price
  System.assertEquals(90, b.Price__c);
```

---

TITLE: Apex Quick Start: Test Method Book Creation and Debug
DESCRIPTION: Shows the initial part of the test method creating a Book\_\_c record and logging its price before insertion.
SOURCE: Apex Developer Guide v64.0 (Page 25)
LANGUAGE: apex
CODE:

```apex
Book__c b = new Book__c(Name='Behind the Cloud', Price__c=100);
System.debug('Price before inserting new book: ' + b.Price__c);

// Insert book
insert b;
```

---

TITLE: Apex Quick Start: Test Method Book Retrieval and Debug
DESCRIPTION: Shows the test method retrieving the newly inserted Book\_\_c record and logging its price after the trigger has fired.
SOURCE: Apex Developer Guide v64.0 (Page 25)
LANGUAGE: apex
CODE:

```apex
// Retrieve the new book
b = [SELECT Price__c FROM Book__c WHERE Id =:b.Id];
System.debug('Price after trigger fired: ' + b.Price__c);
```

---

TITLE: Apex Quick Start: Test Method Assertion
DESCRIPTION: Shows the System.assertEquals statement verifying that the trigger correctly discounted the book's price to 90.
SOURCE: Apex Developer Guide v64.0 (Page 25)
LANGUAGE: apex
CODE:

```apex
// Test that the trigger correctly updated the price
System.assertEquals(90, b.Price__c);
```

---

TITLE: Boolean Variable Initialization Example
DESCRIPTION: Demonstrates initializing a Boolean variable 'isWinner' to true.
SOURCE: Apex Developer Guide v64.0 (Page 28)
LANGUAGE: apex
CODE:

```apex
Boolean isWinner = true;
```

---

TITLE: Double Variable Initialization Examples
DESCRIPTION: Shows examples of initializing Double variables for pi and e.
SOURCE: Apex Developer Guide v64.0 (Page 29)
LANGUAGE: apex
CODE:

```apex
Double pi = 3.14159;
Double e = 2.7182818284D;
```

---

TITLE: ID Variable Initialization Example
DESCRIPTION: Demonstrates initializing an ID variable with a valid 18-character Salesforce record ID.
SOURCE: Apex Developer Guide v64.0 (Page 29)
LANGUAGE: apex
CODE:

```apex
ID id='00300000003T2PGAA0';
```

---

TITLE: Integer Variable Initialization Example
DESCRIPTION: Shows a simple Integer variable declaration and initialization.
SOURCE: Apex Developer Guide v64.0 (Page 30)
LANGUAGE: apex
CODE:

```apex
Integer i = 1;
```

---

TITLE: Long Variable Initialization Example
DESCRIPTION: Demonstrates initializing a Long variable using the 'L' suffix.
SOURCE: Apex Developer Guide v64.0 (Page 30)
LANGUAGE: apex
CODE:

```apex
Long l = 2147483648L;
```

---

TITLE: Object Casting Example (Integer)
DESCRIPTION: Illustrates casting a generic Object variable, holding an integer, back to the Integer type.
SOURCE: Apex Developer Guide v64.0 (Page 30)
LANGUAGE: apex
CODE:

```apex
Object obj = 10;
// Cast the object to an integer.
Integer i = (Integer)obj;
System.assertEquals(10, i);
```

---

TITLE: Object Casting Example (Custom Class)
DESCRIPTION: Shows casting a generic Object, instantiated as a custom class MyApexClass, back to its specific custom type.
SOURCE: Apex Developer Guide v64.0 (Page 30)
LANGUAGE: apex
CODE:

```apex
Object obj = new MyApexClass();
// Cast the object to the MyApexClass custom type.
MyApexClass mc = (MyApexClass)obj;
// Access a method on the user-defined class.
mc.someClassMethod();
```

---

TITLE: String Variable Initialization Example
DESCRIPTION: Demonstrates initializing a String variable with a literal value.
SOURCE: Apex Developer Guide v64.0 (Page 30)
LANGUAGE: apex
CODE:

```apex
String s = 'The quick brown fox jumped over the lazy dog.';
```

---

TITLE: Trigger Updating SolutionNote Field (HTML Example 1)
DESCRIPTION: Example trigger that sets the SolutionNote field to a simple HTML H1 tag before insert.
SOURCE: Apex Developer Guide v64.0 (Page 31)
LANGUAGE: apex
CODE:

```apex
trigger t on Solution (before insert) {
 Trigger.new[0].SolutionNote ='<h1>hello</h1>';
}
```

---

TITLE: Trigger Updating SolutionNote Field (HTML Example 2)
DESCRIPTION: Example trigger that sets the SolutionNote field containing JavaScript, demonstrating that script tags are stripped.
SOURCE: Apex Developer Guide v64.0 (Page 31)
LANGUAGE: apex
CODE:

```apex
trigger t2 on Solution (before insert) {
 Trigger.new[0].SolutionNote =
  '<javascript>Hello</javascript>Goodbye';
}
```

---

TITLE: List Initialization Examples (String and Nested)
DESCRIPTION: Shows how to create an empty list of Strings and a nested list containing sets of Integers.
SOURCE: Apex Developer Guide v64.0 (Page 32)
LANGUAGE: apex
CODE:

```apex
// Create an empty list of String
List<String> my_list = new List<String>();
// Create a nested list
List<List<Set<Integer>>> my_list_2 = new List<List<Set<Integer>>>();
```

---

TITLE: Accessing List Elements Example
DESCRIPTION: Demonstrates adding an element to an Integer list using the add method.
SOURCE: Apex Developer Guide v64.0 (Page 32)
LANGUAGE: apex
CODE:

```apex
List<Integer> myList = new List<Integer>(); // Define a new list
myList.add(47); // Adds a second element of value 47 to the end
```

---

TITLE: List Manipulation Examples (Get, Set, Clear)
DESCRIPTION: Shows using get, set, and clear methods to manipulate elements within a list.
SOURCE: Apex Developer Guide v64.0 (Page 33)
LANGUAGE: apex
CODE:

```apex
// of the list
Integer i = myList.get(0); // Retrieves the element at index 0
myList.set(0, 1); // Adds the integer 1 to the list at index 0
myList.clear(); // Removes all elements from the list
```

---

TITLE: Array Notation for List Declaration (String)
DESCRIPTION: Demonstrates declaring a list of Strings using array notation ([]).
SOURCE: Apex Developer Guide v64.0 (Page 33)
LANGUAGE: apex
CODE:

```apex
String[] colors = new List<String>();
```

---

TITLE: Equivalent List Declarations (String)
DESCRIPTION: Shows two equivalent ways to declare an empty list of Strings, one using List<> and one using array notation.
SOURCE: Apex Developer Guide v64.0 (Page 33)
LANGUAGE: apex
CODE:

```apex
List<String> colors = new String[1];

String[] colors = new String[1];
```

---

TITLE: Array Notation for List Element Access
DESCRIPTION: Shows how to assign a value to a list element using array notation with an index.
SOURCE: Apex Developer Guide v64.0 (Page 33)
LANGUAGE: apex
CODE:

```apex
colors[0] = 'Green';
```

---

TITLE: List Initialization with Size Examples
DESCRIPTION: Shows examples of defining Integer lists with specific initial sizes (zero and six elements).
SOURCE: Apex Developer Guide v64.0 (Page 33)
LANGUAGE: apex
CODE:

```apex
List<Integer> ints = new Integer[0];

List<Integer> ints = new Integer[6];
```

---

TITLE: Sorting a List of Strings Example
DESCRIPTION: Demonstrates sorting a list of strings in ascending order using the sort() method and asserting the result.
SOURCE: Apex Developer Guide v64.0 (Page 34)
LANGUAGE: apex
CODE:

```apex
List<String> colors = new List<String>{
 'Yellow',
 'Red',
 'Green'};
colors.sort();
System.assertEquals('Green', colors.get(0));
System.assertEquals('Red', colors.get(1));
System.assertEquals('Yellow', colors.get(2));
```

---

TITLE: Sorting SelectOption List Example
DESCRIPTION: Shows how to sort a list of SelectOption elements and demonstrates the default sort order based on value then label.
SOURCE: Apex Developer Guide v64.0 (Page 34)
LANGUAGE: apex
CODE:

```apex
List<SelectOption> options = new List<SelectOption>();
options.add(new SelectOption('A','United States'));
options.add(new SelectOption('C','Canada'));
options.add(new SelectOption('A','Mexico'));
System.debug('Before sorting: ' + options);
options.sort();
System.debug('After sorting: ' + options);
```

---

TITLE: Set Declaration Example (String)
DESCRIPTION: Demonstrates declaring an empty set of Strings using the Set keyword and generic type parameter.
SOURCE: Apex Developer Guide v64.0 (Page 35)
LANGUAGE: apex
CODE:

```apex
Set<String> myStringSet = new Set<String>();
```

---

TITLE: Set Initialization with Values Example
DESCRIPTION: Shows how to create a set of Strings initialized with two values using curly braces.
SOURCE: Apex Developer Guide v64.0 (Page 35)
LANGUAGE: apex
CODE:

```apex
// Defines a new set with two elements
Set<String> set1 = new Set<String>{'New York', 'Paris'};
```

---

TITLE: Set Manipulation Examples (Add, Contains, Remove)
DESCRIPTION: Demonstrates adding elements to a set, checking for containment, and removing an element.
SOURCE: Apex Developer Guide v64.0 (Page 35)
LANGUAGE: apex
CODE:

```apex
// Define a new set
Set<Integer> mySet = new Set<Integer>();
// Add two elements to the set
mySet.add(1);
mySet.add(3);
// Assert that the set contains the integer value we added
System.assert(mySet.contains(1));
// Remove the integer value from the set
mySet.remove(1);
```

---

TITLE: Creating a Set from Another Set Example
DESCRIPTION: Shows how to create a new set initialized with the elements from an existing set and asserting its size.
SOURCE: Apex Developer Guide v64.0 (Page 35)
LANGUAGE: apex
CODE:

```apex
// Define a new set that contains the
// elements of the set created in the previous example
Set<Integer> mySet2 = new Set<Integer>(mySet);
// Assert that the set size equals 1
// Note: The set from the previous example contains only one value
System.assert(mySet2.size() == 1);
```

---

TITLE: Map Declaration Examples (String-to-String, ID-to-Set)
DESCRIPTION: Shows declaring two different maps: one mapping String keys to String values, another mapping ID keys to Sets of Strings.
SOURCE: Apex Developer Guide v64.0 (Page 36)
LANGUAGE: apex
CODE:

```apex
Map<String, String> country_currencies = new Map<String, String>();
Map<ID, Set<String>> m = new Map<ID, Set<String>>();
```

---

TITLE: Map Initialization with Values Example (String-to-String)
DESCRIPTION: Demonstrates creating and initializing a String-to-String map using curly brace syntax and the '=>' operator.
SOURCE: Apex Developer Guide v64.0 (Page 36)
LANGUAGE: apex
CODE:

```apex
Map<String, String> MyStrings = new Map<String, String>{'a' => 'b', 'c' =>
 'd'.toUpperCase()};
```

---

TITLE: Map Manipulation Examples (Put, ContainsKey, Get, KeySet)
DESCRIPTION: Shows adding key-value pairs, checking for key existence, retrieving a value by key, and getting the set of all keys from a map.
SOURCE: Apex Developer Guide v64.0 (Page 36)
LANGUAGE: apex
CODE:

```apex
Map<Integer, String> m = new Map<Integer, String>(); // Define a new map
m.put(1, 'First entry'); // Insert a new key-value pair in the map
m.put(2, 'Second entry'); // Insert a new key-value pair in the map
System.assert(m.containsKey(1)); // Assert that the map contains a key
String value = m.get(2); // Retrieve a value, given a particular key
System.assertEquals('Second entry', value);
Set<Integer> s = m.keySet(); // Return a set that contains all of the keys in the
 map
```

---

TITLE: Legal Parameterized Type Declaration
DESCRIPTION: Shows a legal variable declaration in Apex, specifying the data type.
SOURCE: Apex Developer Guide v64.0 (Page 37)
LANGUAGE: apex
CODE:

```apex
Integer x = 1;
```

---

TITLE: Illegal Variable Assignment (Undefined)
DESCRIPTION: Illustrates an illegal assignment because the variable 'x' has not been previously defined.
SOURCE: Apex Developer Guide v64.0 (Page 37)
LANGUAGE: apex
CODE:

```apex
x = 1;
```

---

TITLE: Parameterized List Declaration Example
DESCRIPTION: Demonstrates declaring a List of Strings, specifying the data type within the angle brackets.
SOURCE: Apex Developer Guide v64.0 (Page 37)
LANGUAGE: apex
CODE:

```apex
List<String> myList = new List<String>();
```

---

TITLE: List Subtyping Example
DESCRIPTION: Shows that a List of a subtype (String) can be legally assigned to a List of its supertype (Object).
SOURCE: Apex Developer Guide v64.0 (Page 37)
LANGUAGE: apex
CODE:

```apex
List<String> slst = new List<String> {'alpha', 'beta'};
List<Object> olst = slst;
```

---

TITLE: Enum Definition Example (Season)
DESCRIPTION: Demonstrates defining a public enum named Season with four possible values.
SOURCE: Apex Developer Guide v64.0 (Page 37)
LANGUAGE: apex
CODE:

```apex
public enum Season {WINTER, SPRING, SUMMER, FALL}
```

---

TITLE: Enum Variable Declaration and Usage
DESCRIPTION: Shows how to declare a variable of an enum type (Season) and assign one of its values. Also shows an example method signature using the enum type.
SOURCE: Apex Developer Guide v64.0 (Page 38)
LANGUAGE: apex
CODE:

```apex
Season southernHemisphereSeason = Season.WINTER;

public Season getSouthernHemisphereSeason(Season northernHemisphereSeason) {
 if (northernHemisphereSeason == Season.SUMMER) return southernHemisphereSeason;
 //...
}
```

---

TITLE: Enum Class Definition Example
DESCRIPTION: Illustrates defining a class-like enum using the 'enum' keyword without the 'class' keyword.
SOURCE: Apex Developer Guide v64.0 (Page 38)
LANGUAGE: apex
CODE:

```apex
public enum MyEnumClass { X, Y }
```

---

TITLE: System Enum Usage Example (StatusCode)
DESCRIPTION: Provides examples of using system-defined enum values from System.StatusCode.
SOURCE: Apex Developer Guide v64.0 (Page 38)
LANGUAGE: apex
CODE:

```apex
StatusCode.CANNOT_INSERT_UPDATE_ACTIVATE_ENTITY
StatusCode.INSUFFICIENT_ACCESS_ON_CROSS_REFERENCE_ENTITY
```

---

TITLE: Basic Variable Declaration Examples
DESCRIPTION: Shows examples of declaring variables of types Integer, String, List<String>, Set<String>, and Map<ID, String>.
SOURCE: Apex Developer Guide v64.0 (Page 39)
LANGUAGE: apex
CODE:

```apex
Integer i = 0;
String str;
List<String> strList;
Set<String> s;
Map<ID, String> m;
```

---

TITLE: Multiple Variable Declaration Example
DESCRIPTION: Demonstrates declaring multiple Integer variables in a single statement.
SOURCE: Apex Developer Guide v64.0 (Page 39)
LANGUAGE: apex
CODE:

```apex
Integer i, j, k;
```

---

TITLE: Null Variable Initialization Examples
DESCRIPTION: Shows assigning null to a Boolean and declaring a Decimal variable, both resulting in null values.
SOURCE: Apex Developer Guide v64.0 (Page 39)
LANGUAGE: apex
CODE:

```apex
Boolean x = null;
Decimal d;
```

---

TITLE: NullPointerException Example
DESCRIPTION: Demonstrates code that will cause a NullPointerException because addDays() is called on a null Date variable.
SOURCE: Apex Developer Guide v64.0 (Page 40)
LANGUAGE: apex
CODE:

```apex
Date d;
d.addDays(2);
```

---

TITLE: Implicit Null Variable Initialization
DESCRIPTION: Shows variable declarations where only 'i' and 'k' are explicitly initialized, leaving 'j' and 'b' as null.
SOURCE: Apex Developer Guide v64.0 (Page 40)
LANGUAGE: apex
CODE:

```apex
Integer i = 0, j, k = 1;
Boolean b;
```

---

TITLE: Variable Scope Example (Parallel Blocks)
DESCRIPTION: Illustrates variable scope rules, showing that parallel blocks (like two separate for loops) can reuse the same variable name ('j').
SOURCE: Apex Developer Guide v64.0 (Page 40)
LANGUAGE: apex
CODE:

```apex
Integer i;
{
 // Integer i; This declaration is not allowed
}

for (Integer j = 0; j < 10; j++);
for (Integer j = 0; j < 10; j++);
```

---

TITLE: Case-Insensitive Variable Declaration
DESCRIPTION: Demonstrates that Apex variable names are case-insensitive ('I' refers to the same variable as 'i').
SOURCE: Apex Developer Guide v64.0 (Page 40)
LANGUAGE: apex
CODE:

```apex
Integer I;
//Integer i;
```

---

TITLE: Case-Insensitive Object Reference
DESCRIPTION: Shows that references to object types (like Account) are case-insensitive.
SOURCE: Apex Developer Guide v64.0 (Page 40)
LANGUAGE: apex
CODE:

```apex
Account a1;
ACCOUNT a2;
```

---

TITLE: Case-Insensitive SOQL Query
DESCRIPTION: Example of a SOQL query demonstrating case-insensitivity in keywords (SELECT, FROM, WHERE), object names (ACCOUNT), and field names (ID, Name).
SOURCE: Apex Developer Guide v64.0 (Page 40)
LANGUAGE: soql
CODE:

```soql
Account[] accts = [sELect ID From ACCouNT where nAme = 'fred'];
```

---

TITLE: String Comparison Examples
DESCRIPTION: Shows Apex string comparisons evaluating to true due to case-insensitivity and null handling.
SOURCE: Apex Developer Guide v64.0 (Page 41)
LANGUAGE: apex
CODE:

```apex
String s;
System.assert('a' == 'A');
System.assert(s < 'b');
System.assert(!(s > 'b'));
```

---

TITLE: Constant Declaration Example
DESCRIPTION: Demonstrates declaring final static constants in an Apex class, one initialized directly and the other in a static block.
SOURCE: Apex Developer Guide v64.0 (Page 41)
LANGUAGE: apex
CODE:

```apex
public class myCls {
 static final Integer PRIVATE_INT_CONST = 200;
 static final Integer PRIVATE_INT_CONST2;

 public static Integer calculate() {
  return 2 + 7;
 }

 static {
  PRIVATE_INT_CONST2 = calculate();
 }
}
```

---

TITLE: Literal Expression Example
DESCRIPTION: A simple example of a literal expression performing addition.
SOURCE: Apex Developer Guide v64.0 (Page 42)
LANGUAGE: apex
CODE:

```apex
1 + 1
```

---

TITLE: 'new' Expression Examples
DESCRIPTION: Shows various examples of using the 'new' keyword to create instances of sObjects, Apex objects, lists, sets, and maps.
SOURCE: Apex Developer Guide v64.0 (Page 42)
LANGUAGE: apex
CODE:

```apex
new Account(<field_initializers>)
new Integer[<n>]
new Account[]{<elements>}
new List<Account>()
new Set<String>{}
new Map<String, Integer>()
new myRenamingClass(string oldName, string newName)
```

---

TITLE: L-Value Expression Examples
DESCRIPTION: Illustrates expressions that can appear on the left-hand side of an assignment, including variables, list elements, and object fields.
SOURCE: Apex Developer Guide v64.0 (Page 42)
LANGUAGE: apex
CODE:

```apex
Integer i
myList[3]
myContact.name
myRenamingClass.oldName
```

---

TITLE: Inline SOQL and SOSL Query Examples
DESCRIPTION: Demonstrates embedding SOQL and SOSL queries directly within Apex code using square brackets.
SOURCE: Apex Developer Guide v64.0 (Page 42)
LANGUAGE: apex
CODE:

```apex
Account[] aa = [SELECT Id, Name FROM Account WHERE Name ='Acme'];
Integer i = [SELECT COUNT() FROM Contact WHERE LastName ='Weissman'];
List<List<SObject>> searchList = [FIND 'map*' IN ALL FIELDS RETURNING Account (Id, Name),
 Contact, Opportunity, Lead];
```

---

TITLE: Method Invocation Expression Examples
DESCRIPTION: Shows examples of invoking static and instance methods in Apex expressions.
SOURCE: Apex Developer Guide v64.0 (Page 43)
LANGUAGE: apex
CODE:

```apex
System.assert(true)
myRenamingClass.replaceNames()
changePoint(new Point(x, y));
```

---

TITLE: Safe Navigation Operator Example 1
DESCRIPTION: Illustrates the basic usage of the safe navigation operator (?.) to access property 'b' of object 'a', returning null if 'a' is null.
SOURCE: Apex Developer Guide v64.0 (Page 49)
LANGUAGE: apex
CODE:

```apex
a?.b // Evaluates to: a == null ? null : a.b
```

---

TITLE: Safe Navigation Operator Example 2 (Method Chaining)
DESCRIPTION: Shows safe navigation used in method chaining, returning null if a[x] is null, otherwise proceeding to call aMethod() and access aField.
SOURCE: Apex Developer Guide v64.0 (Page 49)
LANGUAGE: apex
CODE:

```apex
a[x]?.aMethod().aField // Evaluates to null if a[x] == null
```

---

TITLE: Safe Navigation Operator Example 3 (Method Result Check)
DESCRIPTION: Demonstrates using the safe navigation operator after a method call, returning null if the result of aMethod() is null.
SOURCE: Apex Developer Guide v64.0 (Page 49)
LANGUAGE: apex
CODE:

```apex
a[x].aMethod()?.aField
```

---

TITLE: Safe Navigation Operator Type Inference Example
DESCRIPTION: Shows that the type of an expression using the safe navigation operator remains the same as the final field or method return type.
SOURCE: Apex Developer Guide v64.0 (Page 49)
LANGUAGE: apex
CODE:

```apex
Integer x = anObject?.anIntegerField; // The expression is of type Integer because the
 // field is of type Integer
```

---

TITLE: Safe Navigation Operator Code Simplification
DESCRIPTION: Compares code checking for nulls explicitly using an if statement versus using the concise safe navigation operator.
SOURCE: Apex Developer Guide v64.0 (Page 49)
LANGUAGE: apex
CODE:

```apex
// Previous code checking for nulls
String profileUrl = null;
if (user.getProfileUrl() != null) {
 profileUrl = user.getProfileUrl().toExternalForm();
}

// New code using the safe navigation operator
String profileUrl = user.getProfileUrl()?.toExternalForm();
```

---

TITLE: Safe Navigation Operator with SOQL Query
DESCRIPTION: Shows using the safe navigation operator on a single-row SOQL query result to safely access the Name field, returning null if no record is found.
SOURCE: Apex Developer Guide v64.0 (Page 50)
LANGUAGE: apex
CODE:

```apex
// Previous code checking for nulls
results = [SELECT Name FROM Account WHERE Id = :accId];
if (results.size() == 0) { // Account was deleted
 return null;
}
return results[0].Name;

// New code using the safe navigation operator
return [SELECT Name FROM Account WHERE Id = :accId]?.Name;
```

---

TITLE: Safe Navigation Operator Use Cases (Table Excerpt)
DESCRIPTION: Illustrates various allowed use cases for the safe navigation operator including method chains, parentheses/casting, SObject chaining, and SOQL queries.
SOURCE: Apex Developer Guide v64.0 (Page 50)
LANGUAGE: apex
CODE:

```apex
// Method or variable or parameter chains
aObject?.aMethod();

// Using parentheses, for example in a cast.
((T)a1?.b1)?.c1()

// SObject chaining
String s = contact.Account?.BillingCity;

// SOQL Queries
String s = [SELECT LastName FROM Contact]?.LastName;
```

---

TITLE: Safe Navigation Operator Disallowed Use Case (addError)
DESCRIPTION: Illustrates that using the safe navigation operator with the addError() method on SObject scalar fields causes a compilation error.
SOURCE: Apex Developer Guide v64.0 (Page 51)
LANGUAGE: apex
CODE:

```apex
Contact c;
c.LastName?.addError('The field must have a value');
```

---

TITLE: Null Coalescing Operator Comparison
DESCRIPTION: Compares traditional ternary operator null check with the concise null coalescing operator (??).
SOURCE: Apex Developer Guide v64.0 (Page 52)
LANGUAGE: apex
CODE:

```apex
// Before Null Coalescing
Integer notNullReturnValue = (anInteger != null) ? anInteger : 100;

// With Null Coalescing
Integer notNullReturnValue = anInteger ?? 100;
```

---

TITLE: Null Coalescing Operator with SOQL Query
DESCRIPTION: Demonstrates using the null coalescing operator to provide a default Account object if a SOQL query returns no results.
SOURCE: Apex Developer Guide v64.0 (Page 52)
LANGUAGE: apex
CODE:

```apex
Account defaultAccount = new Account(name = 'Acme');
// Left operand SOQL is empty, return defaultAccount from right operand:
Account a = [SELECT Id FROM Account
 WHERE Id = '001000000FAKEID'] ?? defaultAccount;
Assert.areEqual(defaultAccount, a);
```

---

TITLE: Null Coalescing Operator with Safe Navigation
DESCRIPTION: Shows combining the safe navigation operator and null coalescing operator to handle potential nulls in object fields and provide a default value.
SOURCE: Apex Developer Guide v64.0 (Page 52)
LANGUAGE: apex
CODE:

```apex
// If there isn't a matching Account or the Billing City is null, replace the value
string city = [Select BillingCity
 From Account
 Where Id = '001xx000000001oAAA']?.BillingCity;
System.debug('Matches count: ' + city?.countMatches('San Francisco') ?? 0 );
```

---

TITLE: Single Line Comment Example
DESCRIPTION: Demonstrates a single line comment in Apex using '//'.
SOURCE: Apex Developer Guide v64.0 (Page 54)
LANGUAGE: apex
CODE:

```apex
Integer i = 1; // This comment is ignored by the parser
```

---

TITLE: Multi-line Comment Example
DESCRIPTION: Demonstrates a multi-line comment block in Apex using '/_' and '_/'.
SOURCE: Apex Developer Guide v64.0 (Page 54)
LANGUAGE: apex
CODE:

```apex
Integer i = 1; /* This comment can wrap over multiple
 lines without getting interpreted by the
 parser. */
```

---

TITLE: Assignment Statement Examples (Simple Variable)
DESCRIPTION: Shows assigning values to simple variables of type Integer, Account, and Account array (using an inline SOQL query).
SOURCE: Apex Developer Guide v64.0 (Page 54)
LANGUAGE: apex
CODE:

```apex
Integer i = 1;
Account a = new Account();
Account[] accts = [SELECT Id FROM Account];
```

---

TITLE: Assignment Statement Examples (List Element)
DESCRIPTION: Demonstrates assigning values to elements within a list using index notation.
SOURCE: Apex Developer Guide v64.0 (Page 54)
LANGUAGE: apex
CODE:

```apex
ints[0] = 1;
accts[0].Name = 'Acme';
```

---

TITLE: Assignment Statement Examples (sObject Field)
DESCRIPTION: Shows assigning values to fields of an sObject instance and relating a Contact to an Account.
SOURCE: Apex Developer Guide v64.0 (Page 54)
LANGUAGE: apex
CODE:

```apex
Account a = new Account(Name = 'Acme', BillingCity = 'San Francisco');

// IDs cannot be set prior to an insert call
// a.Id = '00300000003T2PGAA0';

// Instead, insert the record. The system automatically assigns it an ID.
insert a;

// Fields also must be writable for the context user
// a.CreatedDate = System.today(); This code is invalid because
// createdDate is read-only!

// Since the account a has been inserted, it is now possible to
// create a new contact that is related to it
Contact c = new Contact(LastName = 'Roth', Account = a);

// Notice that you can write to the account name directly through the contact
c.Account.Name = 'salesforce.com';
```

---

TITLE: Assignment by Reference Example (sObject)
DESCRIPTION: Illustrates that sObject assignment is by reference; modifying 'a' also modifies 'b' and the element in list 'c'.
SOURCE: Apex Developer Guide v64.0 (Page 55)
LANGUAGE: apex
CODE:

```apex
Account a = new Account();
Account b;
Account[] c = new Account[]{};
a.Name = 'Acme';
b = a;
c.add(a);

// These asserts should now be true. You can reference the data
// originally allocated to account a through account b and account list c.
System.assertEquals(b.Name, 'Acme');
System.assertEquals(c[0].Name, 'Acme');
```

---

TITLE: Assignment by Reference Example (List)
DESCRIPTION: Shows that list assignment is by reference; modifying list 'a' also affects list 'b'.
SOURCE: Apex Developer Guide v64.0 (Page 55)
LANGUAGE: apex
CODE:

```apex
Account[] a = new Account[]{new Account()};
Account[] b = a;
a[0].Name = 'Acme';
System.assert(b[0].Name == 'Acme');
```

---

TITLE: Long Numeric Literal Example
DESCRIPTION: Demonstrates the correct way to declare a Long literal by appending 'L' to avoid compilation errors for values exceeding Integer limits.
SOURCE: Apex Developer Guide v64.0 (Page 56)
LANGUAGE: apex
CODE:

```apex
Long d = 2147483648L;
```

---

TITLE: Correct Calculation with Long Literals
DESCRIPTION: Shows how to avoid integer overflow in calculations by using Long literals ('L' suffix) for intermediate products.
SOURCE: Apex Developer Guide v64.0 (Page 56)
LANGUAGE: apex
CODE:

```apex
Long MillsPerYear = 365L * 24L * 60L * 60L * 1000L;
Long ExpectedValue = 31536000000L;
System.assertEquals(MillsPerYear, ExpectedValue);
```

---

TITLE: Conditional If-Else Syntax
DESCRIPTION: Basic syntax for if-else conditional statements in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 57)
LANGUAGE: apex
CODE:

```apex
if ([Boolean_condition])
 // Statement 1
else
 // Statement 2
```

---

TITLE: Nested If-Else Example (Implicit Grouping)
DESCRIPTION: Shows how 'else' groups with the nearest preceding 'if' without explicit curly braces.
SOURCE: Apex Developer Guide v64.0 (Page 57)
LANGUAGE: apex
CODE:

```apex
Integer x, sign;
// Your code
if (x <= 0) if (x == 0) sign = 0; else sign = -1;
```

---

TITLE: Nested If-Else Example (Explicit Grouping)
DESCRIPTION: Shows the equivalent explicit grouping using curly braces for the preceding nested if-else example.
SOURCE: Apex Developer Guide v64.0 (Page 57)
LANGUAGE: apex
CODE:

```apex
Integer x, sign;
// Your code
if (x <= 0) {
 if (x == 0) {
  sign = 0;
 } else {
  sign = -1;
 }
}
```

---

TITLE: Chained If-Else If Example
DESCRIPTION: Demonstrates using multiple 'else if' statements to handle different conditions for assigning a medal color based on place.
SOURCE: Apex Developer Guide v64.0 (Page 57)
LANGUAGE: apex
CODE:

```apex
if (place == 1) {
 medal_color = 'gold';
} else if (place == 2) {
 medal_color = 'silver';
} else if (place == 3) {
 medal_color = 'bronze';
} else {
 medal_color = null;
}
```

---

TITLE: Switch Statement Syntax
DESCRIPTION: Basic syntax for a switch statement in Apex, including multiple 'when' blocks and an optional 'else' block.
SOURCE: Apex Developer Guide v64.0 (Page 57)
LANGUAGE: apex
CODE:

```apex
switch on expression {
 when value1 { // when block 1
  // code block 1
 }
 when value2 { // when block 2
  // code block 2
 }
 when value3 { // when block 3
  // code block 3
 }
 when else { // default block, optional
  // code block 4
 }
}
```

---

TITLE: Switch Statement Value Types Examples
DESCRIPTION: Shows examples of 'when' clauses in switch statements matching single values, multiple values, and sObject types.
SOURCE: Apex Developer Guide v64.0 (Page 58)
LANGUAGE: apex
CODE:

```apex
when value1 {
}

when value2, value3 {
}

when TypeName VariableName {
}
```

---

TITLE: Switch Statement with Integer Literals
DESCRIPTION: Example switch statement using integer literals in 'when' clauses, including a default 'else' block.
SOURCE: Apex Developer Guide v64.0 (Page 59)
LANGUAGE: apex
CODE:

```apex
switch on i {
 when 2 {
  System.debug('when block 2');
 }
 when -3 {
  System.debug('when block -3');
 }
 when else {
  System.debug('default');
 }
}
```

---

TITLE: Switch Statement with Null Value
DESCRIPTION: Demonstrates using 'null' as a possible value in a 'when' clause within a switch statement.
SOURCE: Apex Developer Guide v64.0 (Page 59)
LANGUAGE: apex
CODE:

```apex
switch on i {
 when 2 {
  System.debug('when block 2');
 }
 when null {
  System.debug('bad integer');
 }
 when else {
  System.debug('default ' + i);
 }
}
```

---

TITLE: Switch Statement with Multiple Values per Clause
DESCRIPTION: Example switch statement where 'when' clauses match multiple comma-separated integer literals.
SOURCE: Apex Developer Guide v64.0 (Page 59)
LANGUAGE: apex
CODE:

```apex
switch on i {
 when 2, 3, 4 {
  System.debug('when block 2 and 3 and 4');
 }
 when 5, 6 {
  System.debug('when block 5 and 6');
 }
 when 7 {
  System.debug('when block 7');
 }
 when else {
  System.debug('default');
 }
}
```

---

TITLE: Switch Statement on Method Result
DESCRIPTION: Shows a switch statement operating on the return value of a method call (someInteger(i)).
SOURCE: Apex Developer Guide v64.0 (Page 60)
LANGUAGE: apex
CODE:

```apex
switch on someInteger(i) {
 when 2 {
  System.debug('when block 2');
 }
 when 3 {
  System.debug('when block 3');
 }
 when else {
  System.debug('default');
 }
}
```

---

TITLE: Instanceof Check using If-Else
DESCRIPTION: Demonstrates checking the type of an sObject using instanceof within an if-else if structure and casting accordingly.
SOURCE: Apex Developer Guide v64.0 (Page 60)
LANGUAGE: apex
CODE:

```apex
if (sobject instanceof Account) {
 Account a = (Account) sobject;
 System.debug('account ' + a);
} else if (sobject instanceof Contact) {
 Contact c = (Contact) sobject;
 System.debug('contact ' + c);
} else {
 System.debug('default');
}
```

---

TITLE: Switch Statement on sObject Type
DESCRIPTION: Shows the equivalent logic to the previous instanceof example, but using a switch statement for type checking and implicit casting.
SOURCE: Apex Developer Guide v64.0 (Page 60)
LANGUAGE: apex
CODE:

```apex
switch on sobject {
 when Account a {
  System.debug('account ' + a);
 }
 when Contact c {
  System.debug('contact ' + c);
 }
 when null {
  System.debug('null');
 }
 when else {
  System.debug('default');
 }
}
```

---

TITLE: Switch Statement on Enum Type
DESCRIPTION: Example switch statement operating on an enum variable (season), demonstrating matching enum values in 'when' clauses.
SOURCE: Apex Developer Guide v64.0 (Page 61)
LANGUAGE: apex
CODE:

```apex
switch on season {
 when WINTER {
  System.debug('boots');
 }
 when SPRING, SUMMER {
  System.debug('sandals');
 }
 when else {
  System.debug('none of the above');
 }
}
```

---

TITLE: Do-While Loop Example
DESCRIPTION: A simple do-while loop that outputs numbers 1 through 10 to the debug log.
SOURCE: Apex Developer Guide v64.0 (Page 62)
LANGUAGE: apex
CODE:

```apex
Integer count = 1;
do {
 System.debug(count);
 count++;
} while (count < 11);
```

---

TITLE: While Loop Example
DESCRIPTION: A simple while loop that outputs numbers 1 through 10 to the debug log.
SOURCE: Apex Developer Guide v64.0 (Page 62)
LANGUAGE: apex
CODE:

```apex
Integer count = 1;
while (count < 11) {
 System.debug(count);
 count++;
}
```

---

TITLE: Traditional For Loop Syntax
DESCRIPTION: Shows the syntax for a traditional C-style for loop in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 62)
LANGUAGE: apex
CODE:

```apex
for (init_stmt; exit_condition; increment_stmt) {
 code_block
}
```

---

TITLE: List/Set Iteration For Loop Syntax
DESCRIPTION: Shows the syntax for an enhanced for loop iterating over a list or set in Apex.
SOURCE: Apex Developer Guide v64.0 (Page 62)
LANGUAGE: apex
CODE:

```apex
for (variable : list_or_set) {
 code_block
}
```

---

TITLE: SOQL For Loop Syntax
DESCRIPTION: Shows the syntax for a SOQL for loop, iterating directly over query results.
SOURCE: Apex Developer Guide v64.0 (Page 62)
LANGUAGE: apex
CODE:

```apex
for (variable : [soql_query]) {
 code_block
}

or

for (variable_list : [soql_query]) {
 code_block
}
```

---

TITLE: Traditional For Loop Example
DESCRIPTION: Example of a traditional for loop outputting numbers 1 through 10, demonstrating multiple initialization variables.
SOURCE: Apex Developer Guide v64.0 (Page 63)
LANGUAGE: apex
CODE:

```apex
for (Integer i = 0, j = 0; i < 10; i++) {
 System.debug(i+1);
}
```

---

TITLE: List Iteration For Loop Example
DESCRIPTION: Example enhanced for loop iterating over an array of Integers and outputting each value.
SOURCE: Apex Developer Guide v64.0 (Page 64)
LANGUAGE: apex
CODE:

```apex
Integer[] myInts = new Integer[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

for (Integer i : myInts) {
 System.debug(i);
}
```

---

TITLE: Basic Class Definition with Inner Class
DESCRIPTION: Shows the basic structure of defining a top-level (outer) Apex class containing an inner class.
SOURCE: Apex Developer Guide v64.0 (Page 66)
LANGUAGE: apex
CODE:

```apex
public class myOuterClass {
 // Additional myOuterClass code here
 class myInnerClass {
  // myInnerClass code here
 }
}
```

---

TITLE: Class Definition Syntax
DESCRIPTION: Provides the full syntax for defining an Apex class, including access modifiers, definition modifiers, name, implements, and extends clauses.
SOURCE: Apex Developer Guide v64.0 (Page 66)
LANGUAGE: apex
CODE:

```apex
private | public | global
[virtual | abstract | with sharing | without sharing]
class ClassName [implements InterfaceNameList] [extends ClassName]
{
 // The body of the class
}
```

---

TITLE: Class Variable Declaration Syntax
DESCRIPTION: Shows the syntax for declaring class variables (member variables), including access modifiers, final, static, data type, name, and optional initial value.
SOURCE: Apex Developer Guide v64.0 (Page 67)
LANGUAGE: apex
CODE:

```apex
[public | private | protected | global] [final] [static] data_type variable_name
 [= value]
```

---

TITLE: Class Variable Declaration Examples
DESCRIPTION: Examples of declaring private static final and private final Integer variables within a class.
SOURCE: Apex Developer Guide v64.0 (Page 68)
LANGUAGE: apex
CODE:

```apex
private static final Integer MY_INT;
private final Integer i = 1;
```

---

TITLE: Class Method Definition Syntax
DESCRIPTION: Shows the syntax for defining methods within an Apex class, including modifiers, return type, name, parameters, and body.
SOURCE: Apex Developer Guide v64.0 (Page 68)
LANGUAGE: apex
CODE:

```apex
[public | private | protected | global] [override] [static] data_type method_name
(input parameters)
{
 // The body of the method
}
```

---

TITLE: Static Method Definition Example
DESCRIPTION: Example of a simple public static method returning an Integer.
SOURCE: Apex Developer Guide v64.0 (Page 68)
LANGUAGE: apex
CODE:

```apex
public static Integer getInt() {
 return MY_INT;
}
```

---

TITLE: Debug Statement Example
DESCRIPTION: Example of using System.debug to write a message to the debug log.
SOURCE: Apex Developer Guide v64.0 (Page 69)
LANGUAGE: apex
CODE:

```apex
System.debug('Here is a note for the log.');
```

---

TITLE: Passing Primitive Data Type Argument Example
DESCRIPTION: Demonstrates that primitive types (like String) are passed by value to methods; modifications within the called method do not affect the original variable.
SOURCE: Apex Developer Guide v64.0 (Page 69)
LANGUAGE: apex
CODE:

```apex
public class PassPrimitiveTypeExample {
 public static void debugStatusMessage() {
  String msg = 'Original value';
  processString(msg);
  // The value of the msg variable didn't
  // change; it is still the old value.
  System.assertEquals(msg, 'Original value');
 }

 public static void processString(String s) {
  s = 'Modified value';
 }
}
```

---

TITLE: Passing Non-Primitive Data Type Argument Example
DESCRIPTION: Illustrates that non-primitive types (like List) are passed by reference; modifications to the object's state within the called method affect the original variable, but reassigning the reference within the method does not.
SOURCE: Apex Developer Guide v64.0 (Page 70)
LANGUAGE: apex
CODE:

```apex
public class PassNonPrimitiveTypeExample {

 public static void createTemperatureHistory() {
  List<Integer> fillMe = new List<Integer>();
  reference(fillMe);
  // The list is modified and contains five items
  // as expected.
  System.assertEquals(fillMe.size(),5);

  List<Integer> createMe = new List<Integer>();
  referenceNew(createMe);
  // The list is not modified because it still points
  // to the original list, not the new list
  // that the method created.
  System.assertEquals(createMe.size(),0);
 }

 public static void reference(List<Integer> m) {
  // Add rounded temperatures for the last five days.
  m.add(70);
  m.add(68);
  m.add(75);
  m.add(80);
  m.add(82);
 }

 public static void referenceNew(List<Integer> m) {
  // Assign argument to a new List of
  // five temperature values.
  m = new List<Integer>{55, 59, 62, 60, 63};
 }
}
```

---

TITLE: Simple Constructor Example
DESCRIPTION: Shows a class with a basic no-argument constructor.
SOURCE: Apex Developer Guide v64.0 (Page 71)
LANGUAGE: apex
CODE:

```apex
public class TestObject {

 // The no argument constructor
 public public TestObject() {
  // more code here
 }
}
```

---

TITLE: Object Instantiation Example
DESCRIPTION: Demonstrates instantiating an object using the 'new' keyword and its constructor.
SOURCE: Apex Developer Guide v64.0 (Page 71)
LANGUAGE: apex
CODE:

```apex
TestObject myTest = new TestObject();
```

---

TITLE: Overloaded Constructor and Chaining Example
DESCRIPTION: Illustrates a class with overloaded constructors (no-argument and one-argument) and constructor chaining using 'this()'.
SOURCE: Apex Developer Guide v64.0 (Page 71)
LANGUAGE: apex
CODE:

```apex
public class TestObject2 {

 private static final Integer DEFAULT_SIZE = 10;

 Integer size;

 //Constructor with no arguments
 public TestObject2() {
  this(DEFAULT_SIZE); // Using this(...) calls the one argument constructor
 }

 // Constructor with one argument
 public TestObject2(Integer ObjectSize) {
  size = ObjectSize;
 }
}
```

---

TITLE: Object Instantiation with Overloaded Constructors
DESCRIPTION: Shows instantiating objects using both the one-argument and the chained no-argument constructors from the TestObject2 class.
SOURCE: Apex Developer Guide v64.0 (Page 71)
LANGUAGE: apex
CODE:

```apex
TestObject2 myObject1 = new TestObject2(42);
TestObject2 myObject2 = new TestObject2();
```

---

TITLE: Multiple Overloaded Constructors Example
DESCRIPTION: Demonstrates a class 'Leads' with multiple valid overloaded constructors having different parameter lists (including different order).
SOURCE: Apex Developer Guide v64.0 (Page 71)
LANGUAGE: apex
CODE:

```apex
public class Leads {

 // First a no-argument constructor
 public Leads () {}

 // A constructor with one argument
 public Leads (Boolean call) {}

 // A constructor with two arguments
 public Leads (String email, Boolean call) {}

 // Though this constructor has the same arguments as the
 // one above, they are in a different order, so this is legal
 public Leads (Boolean call, String email) {}
}
```

---

TITLE: Private Variable Declaration Example
DESCRIPTION: Example of declaring a private string variable initialized with a value.
SOURCE: Apex Developer Guide v64.0 (Page 73)
LANGUAGE: apex
CODE:

```apex
// private variable s1
private string s1 = '1';
```

---

TITLE: Public Method Declaration Example
DESCRIPTION: Example of declaring a public method 'getsz' that returns a string.
SOURCE: Apex Developer Guide v64.0 (Page 73)
LANGUAGE: apex
CODE:

```apex
// public method getsz()
public string getsz() {
 ...
}
```

---

TITLE: Local Variable Scope Example
DESCRIPTION: Shows a local variable 'localVariable' declared within the scope of an 'if' block.
SOURCE: Apex Developer Guide v64.0 (Page 73)
LANGUAGE: apex
CODE:

```apex
Boolean myCondition = true;
if (myCondition) {
 integer localVariable = 10;
}
```

---

TITLE: Static Variable Persistence within Transaction Example Class
DESCRIPTION: Defines a class 'P' with a static boolean variable intended to persist across trigger invocations within a single transaction.
SOURCE: Apex Developer Guide v64.0 (Page 74)
LANGUAGE: apex
CODE:

```apex
public class P {
 public static boolean firstRun = true;
}
```

---

TITLE: Static Variable Persistence within Transaction Example Trigger
DESCRIPTION: Trigger 'T1' that uses the static variable from class 'P' to ensure a block of code runs only once per transaction across multiple trigger events.
SOURCE: Apex Developer Guide v64.0 (Page 74)
LANGUAGE: apex
CODE:

```apex
trigger T1 on Account (before delete, after delete, after undelete) {
 if(Trigger.isBefore){
  if(Trigger.isDelete){
   if(p.firstRun){
    Trigger.old[0].addError('Before Account Delete Error');
    p.firstRun=false;
   }
  }
 }
}
```

---

TITLE: Local Variable Hiding Class Member Example
DESCRIPTION: Demonstrates how a local variable named 'Database' hides the system 'Database' class, potentially causing compilation errors if methods like 'insert' are called on it.
SOURCE: Apex Developer Guide v64.0 (Page 74)
LANGUAGE: apex
CODE:

```apex
public static void method() {
 String Database = '';
 // Database.insert(new Account()); // This line would cause an error if uncommented
}
```

---

TITLE: Instance Method and Variable Example (Plotter Class)
DESCRIPTION: Skeleton class 'Plotter' showing instance variables (points list) and instance methods (plot, render) interacting with an inner 'Point' class.
SOURCE: Apex Developer Guide v64.0 (Page 75)
LANGUAGE: apex
CODE:

```apex
public class Plotter {
 // This inner class manages the points
 class Point {
  Double x;
  Double y;

  Point(Double x, Double y) {
   this.x = x;
   this.y = y;
  }
  Double getXCoordinate() {
   return x;
  }

  Double getYCoordinate() {
   return y;
  }
 }

 List<Point> points = new List<Point>();

 public void plot(Double x, Double y) {
  points.add(new Point(x, y));
 }

 // The following method takes the list of points and does something with them
 public void render() {
 }
}
```

---

TITLE: Instance Initialization Block Example
DESCRIPTION: Shows the basic syntax for an instance initialization block within a class.
SOURCE: Apex Developer Guide v64.0 (Page 75)
LANGUAGE: apex
CODE:

```apex
{
 //code body
}
```

---

TITLE: Static Initialization Block Example
DESCRIPTION: Shows the syntax for a static initialization block using the 'static' keyword.
SOURCE: Apex Developer Guide v64.0 (Page 76)
LANGUAGE: apex
CODE:

```apex
static {
 //code body
}
```

---

TITLE: Static Initialization for Map Example
DESCRIPTION: Demonstrates using a static initialization block to populate a static Map 'colorMap' with RGB values.
SOURCE: Apex Developer Guide v64.0 (Page 76)
LANGUAGE: apex
CODE:

```apex
public class MyClass {
 class RGB {
  Integer red;
  Integer green;
  Integer blue;

  RGB(Integer red, Integer green, Integer blue) {
   this.red = red;
   this.green = green;
   this.blue = blue;
  }
 }

 static Map<String, RGB> colorMap = new Map<String, RGB>();

 static {
  colorMap.put('red', new RGB(255, 0, 0));
  colorMap.put('cyan', new RGB(0, 255, 255));
  colorMap.put('magenta', new RGB(255, 0, 255));
 }
}
```

---

TITLE: Apex Property Declaration Syntax
DESCRIPTION: Shows the general syntax for declaring an Apex property, including access modifier, return type, name, and get/set accessors.
SOURCE: Apex Developer Guide v64.0 (Page 77)
LANGUAGE: apex
CODE:

```apex
Public class BasicClass {
 // Property declaration
 access_modifier return_type property_name {
  get {
   //Get accessor code block
  }
  set {
   //Set accessor code block
  }
 }
}
```

---

TITLE: Basic Property Example
DESCRIPTION: Defines a simple public integer property named 'prop' with basic get and set accessors.
SOURCE: Apex Developer Guide v64.0 (Page 77)
LANGUAGE: apex
CODE:

```apex
public class BasicProperty {
 public integer prop {
  get { return prop; }
  set { prop = value; }
 }
}
```

---

TITLE: Using a Property Example
DESCRIPTION: Demonstrates setting and getting the value of the 'prop' property on an instance of the BasicProperty class.
SOURCE: Apex Developer Guide v64.0 (Page 77)
LANGUAGE: apex
CODE:

```apex
BasicProperty bp = new BasicProperty();
bp.prop = 5; // Calls set accessor
System.assertEquals(5, bp.prop); // Calls get accessor
```

---

TITLE: Automatic Properties Example
DESCRIPTION: Demonstrates defining automatic properties with different access levels (read-only, read-write, write-only) by omitting the accessor bodies.
SOURCE: Apex Developer Guide v64.0 (Page 78)
LANGUAGE: apex
CODE:

```apex
public class AutomaticProperty {
 public integer MyReadOnlyProp { get; }
 public double MyReadWriteProp { get; set; }
 public string MyWriteOnlyProp { set; }
}
```

---

TITLE: Using Automatic Properties Example
DESCRIPTION: Shows attempts to read and write to the automatic properties defined in the previous example, highlighting compile errors for restricted access.
SOURCE: Apex Developer Guide v64.0 (Page 78)
LANGUAGE: apex
CODE:

```apex
AutomaticProperty ap = new AutomaticProperty();
ap.MyReadOnlyProp = 5; // This produces a compile error: not writable
ap.MyReadWriteProp = 5; // No error
System.assertEquals(5, ap.MyWriteOnlyProp); // This produces a compile error: not readable
```

---

TITLE: Static and Instance Properties Example
DESCRIPTION: Defines a class with both static and instance properties, including an example of an incorrectly defined static property trying to access an instance member.
SOURCE: Apex Developer Guide v64.0 (Page 78)
LANGUAGE: apex
CODE:

```apex
public class StaticProperty {
 private static integer StaticMember;
 private integer NonStaticMember;

 // The following produces a system error
 // public static integer MyBadStaticProp { return NonStaticMember; }

 public static integer MyGoodStaticProp {
  get {return StaticMember;}
  set { StaticMember = value; }
 }
 public integer MyGoodNonStaticProp {
  get {return NonStaticMember;}
  set { NonStaticMember = value; }
 }
}
```

---

TITLE: Accessing Static Property Example
DESCRIPTION: Demonstrates the correct way to access a static property using the class name, not an instance variable.
SOURCE: Apex Developer Guide v64.0 (Page 79)
LANGUAGE: apex
CODE:

```apex
// The following does not produce an error
StaticProperty.MyGoodStaticProp = 5;
```

---

TITLE: Property Visibility Modifier Examples
DESCRIPTION: Shows defining properties with different access modifiers on the property itself and on individual get/set accessors.
SOURCE: Apex Developer Guide v64.0 (Page 79)
LANGUAGE: apex
CODE:

```apex
global virtual class PropertyVisibility {
 // X is private for read and public for write
 public integer X { private get; set; }
 // Y can be globally read but only written within a class
 global integer Y { get; public set; }
 // Z can be read within the class but only subclasses can set it
 public integer Z { get; protected set; }
}
```

---

TITLE: Basic Virtual Class Definition (Marker)
DESCRIPTION: Defines a simple virtual class 'Marker' with virtual methods 'write' and 'discount'.
SOURCE: Apex Developer Guide v64.0 (Page 79)
LANGUAGE: apex
CODE:

```apex
public virtual class Marker {
 public virtual void write() {
  System.debug('Writing some text.');
 }

 public virtual Double discount() {
  return .05;
 }
}
```

---

TITLE: Extending a Class and Overriding a Method (YellowMarker)
DESCRIPTION: Defines a class 'YellowMarker' that extends 'Marker' and overrides the 'write' method.
SOURCE: Apex Developer Guide v64.0 (Page 79)
LANGUAGE: apex
CODE:

```apex
// Extension for the Marker class
public class YellowMarker extends Marker {
 public override void write() {
  System.debug('Writing some text using the yellow marker.');
 }
}
```

---

TITLE: Polymorphism Example (Marker/YellowMarker)
DESCRIPTION: Demonstrates polymorphism by calling methods on objects declared as 'Marker' but instantiated as 'Marker' and 'YellowMarker', showing inherited and overridden behavior.
SOURCE: Apex Developer Guide v64.0 (Page 80)
LANGUAGE: apex
CODE:

```apex
Marker obj1, obj2;
obj1 = new Marker();
// This outputs 'Writing some text.'
obj1.write();

obj2 = new YellowMarker();
// This outputs 'Writing some text using the yellow marker.'
obj2.write();
// We get the discount method for free
// and can call it from the YellowMarker instance.
Double d = obj2.discount();
```

---

TITLE: Extending a Class with Additional Methods (RedMarker)
DESCRIPTION: Defines 'RedMarker' extending 'Marker', overriding 'write' and adding a new method 'computePrice'.
SOURCE: Apex Developer Guide v64.0 (Page 80)
LANGUAGE: apex
CODE:

```apex
// Extension for the Marker class
public class RedMarker extends Marker {
 public override void write() {
  System.debug('Writing some text in red.');
 }

 // Method only in this class
 public Double computePrice() {
  return 1.5;
 }
}
```

---

TITLE: Calling Subclass-Specific Method (RedMarker)
DESCRIPTION: Shows how to call the 'computePrice' method, which exists only in the 'RedMarker' subclass, by using an object declared as 'RedMarker'.
SOURCE: Apex Developer Guide v64.0 (Page 80)
LANGUAGE: apex
CODE:

```apex
RedMarker obj = new RedMarker();
// Call method specific to RedMarker only
Double price = obj.computePrice();
```

---

TITLE: Extended Class Example (OuterClass Structure)
DESCRIPTION: Shows the beginning structure of a comprehensive Apex class example, including static constants, variables, methods, and initialization blocks.
SOURCE: Apex Developer Guide v64.0 (Page 81)
LANGUAGE: apex
CODE:

```apex
// Top-level (outer) class must be public or global (usually public unless they contain
// a Web Service, then they must be global)
public class OuterClass {

 // Static final variable (constant) – outer class level only
 private static final Integer MY_INT;

 // Non-final static variable - use this to communicate state across triggers
 // within a single request)
 public static String sharedState;

 // Static method - outer class level only
 public static Integer getInt() { return MY_INT; }

 // Static initialization (can be included where the variable is defined)
 static {
  MY_INT = 2;
 }

 // Member variable for outer class
 private final String m;

 // Instance initialization block - can be done where the variable is declared,
 // or in a constructor
 {
  m = 'a';
 }

 // Because no constructor is explicitly defined in this outer class, an implicit,
 // no-argument, public constructor exists

 // ... (interfaces and inner classes follow)
}
```

---

TITLE: Extended Class Example (Interface Definitions)
DESCRIPTION: Shows interface definitions within the OuterClass example, including an interface extending another interface.
SOURCE: Apex Developer Guide v64.0 (Page 81)
LANGUAGE: apex
CODE:

```apex
 // Inner interface
 public virtual interface MyInterface {
  // No access modifier is necessary for interface methods - these are always
  // public or global depending on the interface visibility
  void myMethod();
 }

 // Interface extension
 interface MySecondInterface extends MyInterface {
  Integer method2(Integer i);
 }
```

---

TITLE: Extended Class Example (Inner Class Definition)
DESCRIPTION: Shows the definition of InnerClass implementing MySecondInterface, including member variables, initialization blocks, and constructors.
SOURCE: Apex Developer Guide v64.0 (Page 81)
LANGUAGE: apex
CODE:

```apex
 // Inner class - because it is virtual it can be extended.
 // This class implements an interface that, in turn, extends another interface.
 // Consequently the class must implement all methods.
 public virtual class InnerClass implements MySecondInterface {

  // Inner member variables
  private final String s;
  private final String s2;

  // Inner instance initialization block (this code could be located above)
  {
   this.s = 'x';
  }

  // Inline initialization (happens after the block above executes)
  private final Integer i = s.length();

  // Explicit no argument constructor
  InnerClass() {
   // This invokes another constructor that is defined later
   this('none');
  }

  // Constructor that assigns a final variable value
  public InnerClass(String s2) {
   this.s2 = s2;
  }
  // ... (methods follow)
 }
```

---

TITLE: Extended Class Example (Inner Class Method Implementations)
DESCRIPTION: Shows implementations of interface methods (myMethod, method2) within the InnerClass example.
SOURCE: Apex Developer Guide v64.0 (Page 82)
LANGUAGE: apex
CODE:

```apex
  // Instance method that implements a method from MyInterface.
  // Because it is declared virtual it can be overridden by a subclass.
  public virtual void myMethod() { /* does nothing */ }

  // Implementation of the second interface method above.
  // This method references member variables (with and without the "this" prefix)
  public Integer method2(Integer i) { return this.i + s.length(); }
```

---

TITLE: Extended Class Example (Abstract Child Class)
DESCRIPTION: Defines AbstractChildClass extending InnerClass, overriding one method and declaring an abstract method.
SOURCE: Apex Developer Guide v64.0 (Page 82)
LANGUAGE: apex
CODE:

```apex
 // Abstract class (that subclasses the class above). No constructor is needed since
 // parent class has a no-argument constructor
 public abstract class AbstractChildClass extends InnerClass {

  // Override the parent class method with this signature.
  // Must use the override keyword
  public override void myMethod() { /* do something else */ }

  // Same name as parent class method, but different signature.
  // This is a different method (displaying polymorphism) so it does not need
  // to use the override keyword
  protected void method2() {}

  // Abstract method - subclasses of this class must implement this method
  abstract Integer abstractMethod();
 }
```

---

TITLE: Extended Class Example (Concrete Child Class)
DESCRIPTION: Defines ConcreteChildClass extending AbstractChildClass and implementing the abstract method.
SOURCE: Apex Developer Guide v64.0 (Page 82)
LANGUAGE: apex
CODE:

```apex
 // Complete the abstract class by implementing its abstract method
 public class ConcreteChildClass extends AbstractChildClass {
  // Here we expand the visibility of the parent method - note that visibility
  // cannot be restricted by a sub-class
  public override Integer abstractMethod() { return 5; }
 }
```

---

TITLE: Extended Class Example (Second Child Class)
DESCRIPTION: Defines AnotherChildClass extending InnerClass and explicitly invoking a superclass constructor.
SOURCE: Apex Developer Guide v64.0 (Page 83)
LANGUAGE: apex
CODE:

```apex
 // A second sub-class of the original InnerClass
 public class AnotherChildClass extends InnerClass {
  AnotherChildClass(String s) {
   // Explicitly invoke a different super constructor than one with no arguments
   super(s);
  }
 }
```

---

TITLE: Extended Class Example (Exception Class Definition)
DESCRIPTION: Shows defining custom exception classes (MyException, MySecondException) within the OuterClass example, including inheritance and interface implementation.
SOURCE: Apex Developer Guide v64.0 (Page 83)
LANGUAGE: apex
CODE:

```apex
 // Exception inner class
 public virtual class MyException extends Exception {
  // Exception class member variable
  public Double d;

  // Exception class constructor
  MyException(Double d) {
   this.d = d;
  }

  // Exception class method, marked as protected
  protected void doIt() {}
 }

 // Exception classes can be abstract and implement interfaces
 public abstract class MySecondException extends Exception implements MyInterface {
 }
```

---

TITLE: Extended Class Example (Usage and Casting)
DESCRIPTION: Demonstrates instantiating inner classes, casting between interface and class types, and accessing methods, highlighting illegal operations.
SOURCE: Apex Developer Guide v64.0 (Page 84)
LANGUAGE: apex
CODE:

```apex
 // Construct an instance of an inner concrete class, with a user-defined constructor
 OuterClass.InnerClass ic = new OuterClass.InnerClass('x');

 // Call user-defined methods in the class
 System.assertEquals(2, ic.method2(1));

 // Define a variable with an interface data type, and assign it a value that is of
 // a type that implements that interface
 OuterClass.MyInterface mi = ic;

 // Use instanceof and casting as usual
 OuterClass.InnerClass ic2 = mi instanceof OuterClass.InnerClass ?
                      (OuterClass.InnerClass)mi : null;
 System.assert(ic2 != null);

 // Construct the outer type
 OuterClass o = new OuterClass();
 System.assertEquals(2, OuterClass.getInt());

 // Construct instances of abstract class children
 System.assertEquals(5, new OuterClass.ConcreteChildClass().abstractMethod());

 // Illegal - cannot construct an abstract class
 // new OuterClass.AbstractChildClass();

 // Illegal – cannot access a static method through an instance
 // o.getInt();

 // Illegal - cannot call protected method externally
 // new OuterClass.ConcreteChildClass().method2();
```

---

TITLE: Basic Interface Definition Example
DESCRIPTION: Defines a simple interface 'PurchaseOrder' with one method signature 'discount'.
SOURCE: Apex Developer Guide v64.0 (Page 85)
LANGUAGE: apex
CODE:

```apex
 // An interface that defines what a purchase order looks like in general
 public interface PurchaseOrder {
  // All other functionality excluded
  Double discount();
 }
```

---

TITLE: Interface Implementation Example (CustomerPurchaseOrder)
DESCRIPTION: Shows a class 'CustomerPurchaseOrder' implementing the 'PurchaseOrder' interface and providing a concrete implementation for the 'discount' method.
SOURCE: Apex Developer Guide v64.0 (Page 85)
LANGUAGE: apex
CODE:

```apex
 // One implementation of the interface for customers
 public class CustomerPurchaseOrder implements PurchaseOrder {
  public Double discount() {
   return .05; // Flat 5% discount
  }
 }
```

---

TITLE: Interface Implementation Example (EmployeePurchaseOrder)
DESCRIPTION: Shows another class 'EmployeePurchaseOrder' implementing the 'PurchaseOrder' interface with a different logic for the 'discount' method.
SOURCE: Apex Developer Guide v64.0 (Page 85)
LANGUAGE: apex
CODE:

```apex
 // Another implementation of the interface for employees
 public class EmployeePurchaseOrder implements PurchaseOrder {
  public Double discount() {
   return .10; // It’s worth it being an employee! 10% discount
  }
 }
```

---

TITLE: Basic While Loop for Iteration
DESCRIPTION: Example of a standard while loop incrementing a counter, used as a basic iterator pattern.
SOURCE: Apex Developer Guide v64.0 (Page 86)
LANGUAGE: apex
CODE:

```apex
while (count < 11) {
 System.debug(count);
 count++;
}
```

---

TITLE: Custom Iterator Example using Iterable Interface
DESCRIPTION: Demonstrates using a custom class 'IterableString' (assumed to implement Iterable) with a while loop and hasNext/next methods to iterate through strings.
SOURCE: Apex Developer Guide v64.0 (Page 86)
LANGUAGE: apex
CODE:

```apex
IterableString x = new IterableString('This is a really cool test.');

while(x.hasNext()){
 system.debug(x.next());
}
```

---

TITLE: Custom Iterator Implementation (Account Iterator)
DESCRIPTION: Defines a custom iterator class 'CustomIterator' that implements Iterator<Account> to iterate over a list of Account records.
SOURCE: Apex Developer Guide v64.0 (Page 87)
LANGUAGE: apex
CODE:

```apex
public class CustomIterator
 implements Iterator<Account>{

 private List<Account> accounts;
 private Integer currentIndex;

 public CustomIterator(List<Account> accounts){
  this.accounts = accounts;
  this.currentIndex = 0;
 }

 public Boolean hasNext(){
  return currentIndex < accounts.size();
 }

 public Account next(){
  if(hasNext()) {
   return accounts[currentIndex++];
  } else {
   throw new NoSuchElementException('Iterator has no more elements.');
  }
 }
}
```

---

TITLE: Custom Iterable Implementation (Account Iterable)
DESCRIPTION: Defines a class 'CustomIterable' that implements Iterable<Account> and uses the CustomIterator class to provide iteration logic over a SOQL query result.
SOURCE: Apex Developer Guide v64.0 (Page 87)
LANGUAGE: apex
CODE:

```apex
public class CustomIterable implements Iterable<Account> {
 public Iterator<Account> iterator(){
  List<Account> accounts =
   [SELECT Id, Name,
    NumberOfEmployees
    FROM Account
    LIMIT 10];
  return new CustomIterator(accounts);
 }
}
```

---

TITLE: Batch Apex Class Using Custom Iterable
DESCRIPTION: Shows a Batch Apex class implementing Database.Batchable that uses the CustomIterable class in its start method and processes Account records in the execute method.
SOURCE: Apex Developer Guide v64.0 (Page 87)
LANGUAGE: apex
CODE:

```apex
public class BatchClass implements Database.Batchable<Account>{
 public Iterable<Account> start(Database.BatchableContext info){
  return new CustomIterable();
 }
 public void execute(Database.BatchableContext info, List<Account> scope){
  List<Account> accsToUpdate = new List<Account>();
  for(Account acc : scope){
   acc.Name = 'changed';
   acc.NumberOfEmployees = 69;
   accsToUpdate.add(acc);
  }
  update accsToUpdate;
 }
 public void finish(Database.BatchableContext info){
 }
}
```

---

TITLE: Instanceof Keyword Usage Example
DESCRIPTION: Demonstrates using the instanceof keyword within an if statement to safely cast an object to a specific type (CustomReport).
SOURCE: Apex Developer Guide v64.0 (Page 88)
LANGUAGE: apex
CODE:

```apex
if (Reports.get(0) instanceof CustomReport) {
 // Can safely cast it back to a custom report object
 CustomReport c = (CustomReport) Reports.get(0);
} else {
 // Do something with the non-custom-report.
}
```

---

TITLE: instanceof Check Failing Compilation Example
DESCRIPTION: Shows an invalid instanceof check that causes a compilation error because an Account instance is always an instance of Account.
SOURCE: Apex Developer Guide v64.0 (Page 89)
LANGUAGE: apex
CODE:

```apex
Account acc = new Account();
if(acc instanceOf Account) {
 //condition is always true since an instance of Account is always an instance of
 Account
}
```

---

TITLE: instanceof Failing Compilation Example (List implementing Iterable)
DESCRIPTION: Shows an invalid instanceof check in API v60.0+ where a List variable is checked against Iterable, causing a compilation error.
SOURCE: Apex Developer Guide v64.0 (Page 89)
LANGUAGE: apex
CODE:

```apex
public class BaseClass {}
public class SubClass extends BaseClass {}

List<SubClass> subClasses = new List<SubClass>();
if(subClasses instanceof Iterable<BaseClass>) {
 //condition is always true since an instance of SubClass is always an instance of
 //BaseClass
}
```

---

TITLE: instanceof with Null Object Example
DESCRIPTION: Demonstrates that instanceof returns false when the left operand is null (API version 32.0 and later).
SOURCE: Apex Developer Guide v64.0 (Page 89)
LANGUAGE: apex
CODE:

```apex
Object o = null;
Boolean result = o instanceof Account;
System.assertEquals(false, result);
```

---

TITLE: Virtual Class Definition for Superclass Example
DESCRIPTION: Defines a virtual class 'SuperClass' with instance variables and two constructors (no-arg and parameterized).
SOURCE: Apex Developer Guide v64.0 (Page 89)
LANGUAGE: apex
CODE:

```apex
public virtual class SuperClass {
 public String mySalutation;
 public String myFirstName;
 public String myLastName;

 public SuperClass() {
  mySalutation = 'Mr.';
  myFirstName = 'Carl';
  myLastName = 'Vonderburg';
 }
 public SuperClass(String salutation, String firstName, String lastName) {
  mySalutation = salutation;
  myFirstName = firstName;
  myLastName = lastName;
 }
 // ... methods follow
}
```

---

TITLE: Virtual Method Definitions in Superclass
DESCRIPTION: Defines virtual methods 'printName' and 'getFirstName' within the 'SuperClass'.
SOURCE: Apex Developer Guide v64.0 (Page 90)
LANGUAGE: apex
CODE:

```apex
 public virtual void printName() {
  System.debug('My name is ' + mySalutation + myLastName);
 }

 public virtual String getFirstName() {
  return myFirstName;
 }
```

---

TITLE: Subclass Overriding Method using Super
DESCRIPTION: Defines 'Subclass' extending 'Superclass', overriding 'printName' and calling the superclass's implementation using 'super'.
SOURCE: Apex Developer Guide v64.0 (Page 90)
LANGUAGE: apex
CODE:

```apex
public class Subclass extends Superclass {
 public override void printName() {
  super.printName();
  System.debug('But you can call me ' + super.getFirstName());
 }
}
```

---

TITLE: Subclass Calling Superclass Constructor
DESCRIPTION: Shows adding a constructor to 'Subclass' that explicitly calls a specific parameterized constructor of the 'Superclass' using 'super()'.
SOURCE: Apex Developer Guide v64.0 (Page 90)
LANGUAGE: apex
CODE:

```apex
public Subclass() {
 super('Madam', 'Brenda', 'Clapentrap');
}
```

---

TITLE: Using 'this' Keyword for Instance Variables
DESCRIPTION: Demonstrates using 'this.s' to refer to the instance variable 's' within an initialization block.
SOURCE: Apex Developer Guide v64.0 (Page 90)
LANGUAGE: apex
CODE:

```apex
public class myTestThis {
 string s;
 {
  this.s = 'TestString';
 }
}
```

---

TITLE: Using 'this' Keyword for Constructor Chaining
DESCRIPTION: Shows a class with two constructors, where the no-argument constructor calls the parameterized constructor using 'this()'.
SOURCE: Apex Developer Guide v64.0 (Page 91)
LANGUAGE: apex
CODE:

```apex
public class testThis {

 // First constructor for the class. It requires a string parameter.
 public testThis(string s2) {
 }

 // Second constructor for the class. It does not require a parameter.
 // This constructor calls the first constructor using the this keyword.
 public testThis() {
  this('None');
 }
}
```

---

TITLE: Transient Variable Declaration
DESCRIPTION: Example of declaring an instance variable 'currentTotal' as transient.
SOURCE: Apex Developer Guide v64.0 (Page 91)
LANGUAGE: apex
CODE:

```apex
Transient Integer currentTotal;
```

---

TITLE: Transient Variable Visualforce Example
DESCRIPTION: Shows a Visualforce page and controller demonstrating the behavior of transient vs. non-transient DateTime variables upon page refresh.
SOURCE: Apex Developer Guide v64.0 (Page 92)
LANGUAGE: apex
CODE:

```apex
// Visualforce Page
/*
<apex:page controller="ExampleController">
 T1: {!t1} <br/>
 T2: {!t2} <br/>
 <apex:form>
  <apex:commandLink value="refresh"/>
 </apex:form>
</apex:page>
*/

// Apex Controller
public class ExampleController {

 DateTime t1;
 transient DateTime t2;

 public String getT1() {
  if (t1 == null) t1 = System.now();
  return '' + t1;
 }

 public String getT2() {
  if (t2 == null) t2 = System.now();
  return '' + t2;
 }
}
```

---

TITLE: Class Declaration with 'with sharing'
DESCRIPTION: Example syntax for declaring an Apex class that enforces sharing rules using the 'with sharing' keyword.
SOURCE: Apex Developer Guide v64.0 (Page 92)
LANGUAGE: apex
CODE:

```apex
public with sharing class sharingClass {
 // Code here
}
```

---

TITLE: Class Declaration with 'without sharing'
DESCRIPTION: Example syntax for declaring an Apex class that does not enforce sharing rules using the 'without sharing' keyword.
SOURCE: Apex Developer Guide v64.0 (Page 93)
LANGUAGE: apex
CODE:

```apex
public without sharing class noSharing {
 // Code here
}
```

---

TITLE: Class Declaration with 'inherited sharing'
DESCRIPTION: Example of an Apex class declared with 'inherited sharing' to enforce the sharing rules of the calling class. Includes a Visualforce page example.
SOURCE: Apex Developer Guide v64.0 (Page 93)
LANGUAGE: apex
CODE:

```apex
// Apex Class
public inherited sharing class InheritedSharingClass {
 public List<Contact> getAllTheSecrets() {
  return [SELECT Name FROM Contact];
 }
}

// Visualforce Page
/*
<apex:page controller="InheritedSharingClass">
 <apex:repeat value="{!allTheSecrets}" var="record">
  {!record.Name}
 </apex:repeat>
</apex:page>
*/
```

---

TITLE: @Future Annotation Example
DESCRIPTION: Basic example of using the @Future annotation on a static void method for asynchronous execution.
SOURCE: Apex Developer Guide v64.0 (Page 97)
LANGUAGE: apex
CODE:

```apex
global class MyFutureClass {
 @Future
 static void myMethod(String a, Integer i) {
  System.debug('Method called with: ' + a + ' and ' + i);
  // Perform long-running code
 }
}
```

---

TITLE: @Future Annotation with Callout Enabled
DESCRIPTION: Shows how to enable callouts for a future method by specifying (callout=true) in the annotation.
SOURCE: Apex Developer Guide v64.0 (Page 97)
LANGUAGE: apex
CODE:

```apex
@Future (callout=true)
public static void doCalloutFromFuture() {
 //Add code to perform callout
}
```

---

TITLE: @InvocableMethod Basic Example (Primitive Types)
DESCRIPTION: Demonstrates a class with an @InvocableMethod that takes a list of IDs and returns a list of corresponding Account names.
SOURCE: Apex Developer Guide v64.0 (Page 98)
LANGUAGE: apex
CODE:

```apex
public class AccountQueryAction {
 @InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.' category='Account')
 public static List<String> getAccountNames(List<ID> ids) {
  List<Account> accounts = [SELECT Name FROM Account WHERE Id in :ids];
  Map<ID, String> idToName = new Map<ID, String>();
  for (Account account : accounts) {
   idToName.put(account.Id, account.Name);
  }
  // put each name in the output at the same position as the id in the input
  List<String> accountNames = new List<String>();
  for (String id : ids) {
   accountNames.add(idToName.get(id));
  }
  return accountNames;
 }
}
```

---

TITLE: @InvocableMethod Basic Example (sObject Types)
DESCRIPTION: Shows a class with an @InvocableMethod that takes a list of Account sObjects, inserts them, and returns a list of the resulting IDs or null for failures.
SOURCE: Apex Developer Guide v64.0 (Page 98)
LANGUAGE: apex
CODE:

```apex
public class AccountInsertAction {
 @InvocableMethod(label = 'Insert Accounts' description='Inserts the accounts specified and returns the IDs of the new accounts or null if account is failed to create.' category = 'Account')
 public static List<ID> insertAccounts(List<Account> accounts) {
  Database.SaveResult[] results = Database.insert(accounts, false);
  List<ID> accountIds = new List<ID>();

  for (Database.SaveResult result : results) {
   if (result.isSuccess()) {
    accountIds.add(result.getId());
   } else {
    accountIds.add(null);
   }
  }
  return accountIds;
 }
}
```

---

TITLE: @InvocableMethod Example (Generic sObject Types)
DESCRIPTION: Demonstrates an @InvocableMethod using generic List<SObject> for input and a custom inner class with @InvocableVariable for output.
SOURCE: Apex Developer Guide v64.0 (Page 99)
LANGUAGE: apex
CODE:

```apex
public with sharing class GetFirstFromCollection {
 @InvocableMethod
 public static List<Results> execute (List<Requests> requestList) {
  List<Results> results = new List<Results>();
  for (Requests request : requestList) {
   List<SObject> inputCollection = request.inputCollection;
   SObject outputMember = inputCollection[0];

   //Create a Results object to hold the return values
   Results result = new Results();

   //Add the return values to the Results object
   result.outputMember = outputMember;

   //Add Result to the results List at the same position as the request is in the requests List
   results.add(result);
  }
  return results;
 }

 public class Requests {
  @InvocableVariable(label='Records for Input' description='yourDescription' required=true)
  public List<SObject> inputCollection;
 }

 public class Results {
  @InvocableVariable(label='Records for Output' description='yourDescription' required=true)
  public SObject outputMember;
 }
}
```

---

TITLE: @InvocableMethod with Custom SVG Icon
DESCRIPTION: Shows using the iconName attribute within @InvocableMethod to specify a custom icon from an SVG static resource.
SOURCE: Apex Developer Guide v64.0 (Page 99)
LANGUAGE: apex
CODE:

```apex
global class CustomSvgIcon {
 @InvocableMethod(label='myIcon' iconName='resource:myPackageNamespace__google:top')
 global static List<Integer> myMethod(List<Integer> request) {
  List<Integer> results = new List<Integer>();
  for(Integer reqInt : request) {
   results.add(reqInt);
  }
  return results;
 }
}
```

---

TITLE: @InvocableMethod with SLDS Icon
DESCRIPTION: Demonstrates using the iconName attribute within @InvocableMethod to specify a standard Salesforce Lightning Design System (SLDS) icon.
SOURCE: Apex Developer Guide v64.0 (Page 99)
LANGUAGE: apex
CODE:

```apex
public class CustomSldsIcon {
 @InvocableMethod(iconName='slds:standard:choice')
 public static void run() {}
}
```

---

TITLE: @InvocableMethod with Exception Handling
DESCRIPTION: Example of an invocable method that handles potential exceptions during processing and reports success/failure via a custom result class.
SOURCE: Apex Developer Guide v64.0 (Page 100)
LANGUAGE: apex
CODE:

```apex
global class AdjustPositiveValuesAction {
 @InvocableMethod(label='Adjust Positive Values' description='Returns the list of adjusted values. If a number is negative, a failure is reported for that value.')
 public static List<AdjustmentResult> doAdjustment(List<Double> values) {
  List<AdjustmentResult> results = new List<AdjustmentResult>();

  for (Double value : values) {
   AdjustmentResult result = new AdjustmentResult();
   try {
    // Adjust the value, scale by pi.
    // Note: If the value is negative, this operation throws an exception.
    result.adjustedValue = Math.sqrt(value) * Math.PI;
    result.adjustmentSucceeded = true;
   }
   catch (Exception e) {
    // If a negative value caused an exception, mark the adjustment as failed, and keep processing other values.
    result.adjustmentSucceeded = false;
   }
   results.add(result);
  }
  return results;
 }

 global class AdjustmentResult {
  @InvocableVariable(label='True if adjustment succeeded')
  global boolean adjustmentSucceeded;

  @InvocableVariable(label='Adjusted value, only valid if adjustment succeeded')
  global Double adjustedValue;
 }
}
```

---

TITLE: Test Method for Invocable Action with Exception Handling
DESCRIPTION: Test method for the AdjustPositiveValuesAction class, verifying both successful adjustments and correct failure reporting for negative inputs.
SOURCE: Apex Developer Guide v64.0 (Page 100)
LANGUAGE: apex
CODE:

```apex
// Test class for AdjustPositiveValuesAction
@isTest
private class AdjustPositiveValuesActionTest {
 private static testMethod void doTest() {
  // Create a list of test values: 4, -1, 1
  List<Double> values = new List<Double>();
  values.add(4);
  values.add(-1);
  values.add(1);

  Test.startTest();

  // Call the doAdjustment method with the test values.
  List<AdjustPositiveValuesAction.AdjustmentResult> results =
   AdjustPositiveValuesAction.doAdjustment(values);

  Test.stopTest();

  // Assertions to check if adjustments were successful or not for each input value.
  system.assertEquals(true, results[0].adjustmentSucceeded);
  system.assertEquals(false, results[1].adjustmentSucceeded);
  system.assertEquals(true, results[2].adjustmentSucceeded);

  // Assertions to check the calculated adjusted values for positive inputs.
  system.assertEquals(2 * Math.PI, results[0].adjustedValue);
  system.assertEquals(Math.PI, results[2].adjustedValue);
 }
}
```

---

TITLE: @InvocableVariable Usage Examples (Boolean and Decimal)
DESCRIPTION: Demonstrates using the @InvocableVariable annotation with defaultValue for Boolean and Decimal types.
SOURCE: Apex Developer Guide v64.0 (Page 105)
LANGUAGE: apex
CODE:

```apex
 @InvocableVariable(defaultValue='true')
 public Boolean myBoolean;

 @InvocableVariable(defaultValue='123.4')
 public Decimal myDecimal;
```

---

TITLE: @InvocableVariable Usage Examples (Double, Integer, Long, String)
DESCRIPTION: Shows using @InvocableVariable with defaultValue for Double, Integer, Long, and String types, including required suffixes (D, L).
SOURCE: Apex Developer Guide v64.0 (Page 106)
LANGUAGE: apex
CODE:

```apex
 @InvocableVariable(defaultValue='867.3D')
 public Double myDouble;

 @InvocableVariable(defaultValue='-214')
 public Integer myInteger;

 @InvocableVariable(defaultValue='922337L')
 public Long myLong;

 @InvocableVariable(defaultValue='hello world!')
 public String myString;
```

---

TITLE: @InvocableVariable with All Modifiers Example
DESCRIPTION: Example showing the @InvocableVariable annotation with label, description, placeholderText, and required modifiers.
SOURCE: Apex Developer Guide v64.0 (Page 106)
LANGUAGE: apex
CODE:

```apex
 @InvocableVariable(label='yourLabel'
  description='yourDescription' placeholderText='yourPlaceholderText'
  required=(true | false))
 // Variable declaration follows
```

---

TITLE: @InvocableVariable with Default Value Modifier Example
DESCRIPTION: Example showing the @InvocableVariable annotation using only the defaultValue modifier.
SOURCE: Apex Developer Guide v64.0 (Page 106)
LANGUAGE: apex
CODE:

```apex
 @InvocableVariable(defaultValue='yourDefaultValue')
 global String createOpportunity;
```

---

TITLE: Basic @IsTest Class Structure
DESCRIPTION: Example of a private test class annotated with @IsTest, containing two static void test methods also annotated with @IsTest.
SOURCE: Apex Developer Guide v64.0 (Page 107)
LANGUAGE: apex
CODE:

```apex
@IsTest
private class MyTestClass {
 // Methods for testing
 @IsTest
 static void test1() {
  // Implement test code
 }

 @IsTest
 static void test2() {
  // Implement test code
 }
}
```

---

TITLE: Public Utility Test Class Example
DESCRIPTION: Example of a public test class containing static utility methods intended for creating test data.
SOURCE: Apex Developer Guide v64.0 (Page 108)
LANGUAGE: apex
CODE:

```apex
@IsTest
public class TestUtil {
 public static void createTestAccounts() {
  // Create some test accounts
 }
 public static void createTestContacts() {
  // Create some test contacts
 }
}
```

---

TITLE: Test Class with SeeAllData=true Annotation
DESCRIPTION: Example showing how to annotate a test class with @IsTest(SeeAllData=true) to grant all methods within it access to organization data.
SOURCE: Apex Developer Guide v64.0 (Page 108)
LANGUAGE: apex
CODE:

```apex
 // All test methods in this class can access all data.
 @IsTest(SeeAllData=true)
 public class TestDataAccessClass {
  // This test accesses an existing account.
  // It also creates and accesses a new test account.
  @IsTest
  static void myTestMethod1() {
   // Query an existing account in the organization.
   // ... (rest of method)
  }
  // ... (other methods)
 }
```

---

TITLE: Test Method with SeeAllData=true Accessing Org Data
DESCRIPTION: Snippet from a test method within a SeeAllData=true class, querying and creating Account records.
SOURCE: Apex Developer Guide v64.0 (Page 109)
LANGUAGE: apex
CODE:

```apex
  Account a = [SELECT Id, Name FROM Account WHERE Name='Acme' LIMIT 1];
  System.assert(a != null);

  // Create a test account based on the queried account.
  Account testAccount = a.clone();
  testAccount.Name = 'Acme Test';
  insert testAccount;

  // Query the test account that was inserted.
  Account testAccount2 = [SELECT Id, Name FROM Account
   WHERE Name='Acme Test' LIMIT 1];
  System.assert(testAccount2 != null);
```

---

TITLE: Test Class with Mixed Data Access Methods
DESCRIPTION: Example test class where one method uses @IsTest(SeeAllData=true) to access all org data, while another method accesses only test-created data and setup objects.
SOURCE: Apex Developer Guide v64.0 (Page 109)
LANGUAGE: apex
CODE:

```apex
 @IsTest
 private class ClassWithDifferentDataAccess {

  // Test method that has access to all data.
  @IsTest(SeeAllData=true)
  static void testWithAllDataAccess() {
   // Can query all data in the organization.
  }

  // Test method that has access to only the data it creates
  // and organization setup and metadata objects.
  @IsTest
  static void testWithOwnDataAccess() {
   // This method can still access the User object.
   // This query returns the first user object.
   User u = [SELECT UserName,Email FROM User LIMIT 1];
   System.debug('UserName: ' + u.UserName);
   System.debug('Email: ' + u.Email);

   // Can access the test account that is created here.
   Account a = new Account(Name='Test Account');
   insert a;
   // Access the account that was just created.
   Account insertedAcct = [SELECT Id,Name FROM Account
    WHERE Name='Test Account'];
   System.assert(insertedAcct != null);
  }
 }
```

---

TITLE: OnInstall Test Method Annotation Example
DESCRIPTION: Example showing a test class with methods annotated for execution during package installation (@IsTest(OnInstall=true)) and others that are excluded.
SOURCE: Apex Developer Guide v64.0 (Page 110)
LANGUAGE: apex
CODE:

```apex
 public class OnInstallClass {
  // Implement logic for the class.
  public void method1(){
   // Some code
  }
 }

 @IsTest
 private class OnInstallClassTest {
  // This test method will be executed
  // during the installation of the package.
  @IsTest(OnInstall=true)
  static void test1() {
   // Some test code
  }

  // Tests excluded from running during the
  // the installation of a package.
  @IsTest
  static void test2() {
   // Some test code
  }
  @IsTest
  static void test3() {
   // Some test code
  }
 }
```

---

TITLE: JSON Access Annotation Examples
DESCRIPTION: Shows using the @JsonAccess annotation to control serialization and deserialization permissions for Apex classes (samePackage, sameNamespace, always).
SOURCE: Apex Developer Guide v64.0 (Page 111)
LANGUAGE: apex
CODE:

```apex
 // SomeSerializableClass is serializable in the same package and deserializable in the
 // wider namespace
 @JsonAccess(serializable='samePackage' deserializable='sameNamespace')
 public class SomeSerializableClass { }


 // AlwaysDeserializable class is always deserializable and serializable only in the same
 // namespace (default value from version 49.0 and later)
 @JsonAccess(deserializable='always')
 public class AlwaysDeserializable { }
```

---

TITLE: NamespaceAccessible Annotation Example
DESCRIPTION: Demonstrates using @NamespaceAccessible on a class and its constructor/method to make them visible across packages within the same namespace.
SOURCE: Apex Developer Guide v64.0 (Page 112)
LANGUAGE: apex
CODE:

```apex
 // A namespace-visible Apex class
 @NamespaceAccessible
 public class MyClass {
  private Boolean bypassFLS;

  // A namespace-visible constructor that only allows secure use
  @NamespaceAccessible
  public MyClass() {
   bypassFLS = false;
  }

  // A package private constructor that allows use in trusted contexts,
  // but only internal to the package
  public MyClass (Boolean bypassFLS) {
   this.bypassFLS = bypassFLS;
  }
  @NamespaceAccessible
  protected Boolean getBypassFLS() {
   return bypassFLS;
  }
 }
```

---

TITLE: RemoteAction Method Declaration Example
DESCRIPTION: Shows the required syntax for declaring an Apex method intended for JavaScript remoting using the @RemoteAction annotation and global static modifiers.
SOURCE: Apex Developer Guide v64.0 (Page 114)
LANGUAGE: apex
CODE:

```apex
 @RemoteAction
 global static String getItemId(String objectName) { ... }
```

---

TITLE: TestVisible Annotation Example Class
DESCRIPTION: Defines a class with private members (variable, inner class, method) annotated with @TestVisible to allow access from test classes.
SOURCE: Apex Developer Guide v64.0 (Page 115)
LANGUAGE: apex
CODE:

```apex
 public class TestVisibleExample {
  // Private member variable
  @TestVisible private static Integer recordNumber = 1;

  // Private method
  @TestVisible private static void updateRecord(String name) {
   // Do something
  }

  // Private inner class with constructor
  @TestVisible class Employee {
      String fullName; String phone;
      @TestVisible Employee(String s, String ph) { /* ... */ }
  }
  // ... other members
 }
```

---

TITLE: Test Class Accessing TestVisible Members
DESCRIPTION: Shows a test method accessing the private variable and calling the private method of another class because they were annotated with @TestVisible.
SOURCE: Apex Developer Guide v64.0 (Page 115)
LANGUAGE: apex
CODE:

```apex
 @IsTest
 private class TestVisibleExampleTest {
  @IsTest static void test1() {
   // Access private variable annotated with TestVisible
   Integer i = TestVisibleExample.recordNumber;
   System.assertEquals(1, i);

   // Access private method annotated with TestVisible
   TestVisibleExample.updateRecord('RecordName');
   // Perform some verification
  }
 }
```

---

TITLE: Basic REST Resource Class Definition
DESCRIPTION: Minimal structure for an Apex class exposed as a REST resource using @RestResource.
SOURCE: Apex Developer Guide v64.0 (Page 117)
LANGUAGE: apex
CODE:

```apex
 @RestResource(urlMapping='/Account/*')
 global with sharing class MyRestResource {
  // Methods for HTTP verbs like @HttpGet, @HttpPost etc. go here
 }
```

---

TITLE: Basic Class Definition for Casting Example
DESCRIPTION: Defines a virtual base class 'Report' and a subclass 'CustomReport' used to demonstrate casting.
SOURCE: Apex Developer Guide v64.0 (Page 117)
LANGUAGE: apex
CODE:

```apex
 public virtual class Report {
 }

 public class CustomReport extends Report {
 }
```

---

TITLE: Casting Example (Subclass to Superclass and Back)
DESCRIPTION: Demonstrates adding a subclass instance to a superclass list and then casting it back to the subclass type.
SOURCE: Apex Developer Guide v64.0 (Page 118)
LANGUAGE: apex
CODE:

```apex
 // Create a list of report objects
 Report[] Reports = new Report[5];

 // Create a custom report object
 CustomReport a = new CustomReport();

 // Because the custom report is a sub class of the Report class,
 // you can add the custom report object a to the list of report objects
 Reports.add(a);

 // The following is not legal:
 // CustomReport c = Reports.get(0);
 // because the compiler does not know that what you are
 // returning is a custom report.

 // You must use cast to tell it that you know what
 // type you are returning. Instead, get the first item in the list
 // by casting it back to a custom report object
 CustomReport c = (CustomReport) Reports.get(0);
```

---

TITLE: Collection Casting Example
DESCRIPTION: Shows casting a list of a subclass (CustomerPurchaseOrder) to a list of its superclass (PurchaseOrder).
SOURCE: Apex Developer Guide v64.0 (Page 120)
LANGUAGE: apex
CODE:

```apex
 public virtual class PurchaseOrder { }
 public class CustomerPurchaseOrder extends PurchaseOrder { }

 { // Inside some method or block
  List<PurchaseOrder> POs = new PurchaseOrder[] {};
  List<CustomerPurchaseOrder> CPOs = new CustomerPurchaseOrder[]{};
  POs = CPOs; // Legal cast
 }
```

---

TITLE: Variable Shadowing Example
DESCRIPTION: Illustrates how a local variable 's' (method parameter) shadows the instance member variable 's', requiring 'this.s' to access the member.
SOURCE: Apex Developer Guide v64.0 (Page 122)
LANGUAGE: apex
CODE:

```apex
 Public Class Shadow {
  String s;
  Shadow(String s) { this.s = s; } // Same name ok
  setS(String s) { this.s = s; } // Same name ok
 }
```

---

TITLE: Static Variable Access Example
DESCRIPTION: Demonstrates the correct way to access a static variable (CLASS_INT) using the class name (p1) and the illegal way (via an instance 'c').
SOURCE: Apex Developer Guide v64.0 (Page 123)
LANGUAGE: apex
CODE:

```apex
 public class p1 {
  public static final Integer CLASS_INT = 1;
  public class c { };
 }

 p1.c c = new p1.c();
 // This is illegal
 // Integer i = c.CLASS_INT;
 // This is correct
 Integer i = p1.CLASS_INT;
```

---

TITLE: Namespace Prefix Format Example
DESCRIPTION: Shows the format for fully qualified custom object/field names including the namespace prefix.
SOURCE: Apex Developer Guide v64.0 (Page 123)
LANGUAGE: text
CODE:

```text
 namespace_prefix__obj_or_field_name__c
```

---

TITLE: Namespace Method Invocation Example
DESCRIPTION: Shows the syntax for invoking a method within a specific namespace.
SOURCE: Apex Developer Guide v64.0 (Page 123)
LANGUAGE: apex
CODE:

```apex
 namespace_prefix.class.method(args)
```

---

TITLE: System Namespace Usage (URL Class)
DESCRIPTION: Shows equivalent ways to instantiate the URL class, with and without explicitly specifying the 'System' namespace.
SOURCE: Apex Developer Guide v64.0 (Page 124)
LANGUAGE: apex
CODE:

```apex
 System.URL url1 = new System.URL('https://MyDomainName.my.salesforce.com/');

 URL url1 = new URL('https://MyDomainName.my.salesforce.com/');
```

---

TITLE: System Namespace Static Method Call
DESCRIPTION: Shows equivalent ways to call a static method on the URL class, with and without explicitly specifying the 'System' namespace.
SOURCE: Apex Developer Guide v64.0 (Page 124)
LANGUAGE: apex
CODE:

```apex
 System.URL.getCurrentRequestUrl();

 URL.getCurrentRequestUrl();
```

---

TITLE: Custom Class Overriding System Class
DESCRIPTION: Example of a custom 'Database' class whose 'query' method conflicts with the built-in System.Database.query method.
SOURCE: Apex Developer Guide v64.0 (Page 124)
LANGUAGE: apex
CODE:

```apex
 public class Database {
  public static String query() {
   return 'wherefore art thou namespace?';
  }
 }
```

---

TITLE: Ambiguous Method Call (Custom vs System)
DESCRIPTION: Shows a call to Database.query that resolves to the custom class, likely causing an error if parameters are expected.
SOURCE: Apex Developer Guide v64.0 (Page 125)
LANGUAGE: apex
CODE:

```apex
 // This calls the custom Database.query() which takes no arguments
 sObject[] acct = Database.query('SELECT Name FROM Account LIMIT 1');
 System.debug(acct[0].get('Name'));
```

---

TITLE: Disambiguating Method Call with System Namespace
DESCRIPTION: Shows explicitly calling the built-in System.Database.query method by prefixing it with 'System.' to resolve ambiguity.
SOURCE: Apex Developer Guide v64.0 (Page 125)
LANGUAGE: apex
CODE:

```apex
 sObject[] acct = System.Database.query('SELECT Name FROM Account LIMIT 1');
 System.debug(acct[0].get('Name'));
```

---

TITLE: Schema Namespace Usage Examples
DESCRIPTION: Shows equivalent code segments using Schema class methods and types, with and without explicitly specifying the 'Schema' namespace.
SOURCE: Apex Developer Guide v64.0 (Page 125)
LANGUAGE: apex
CODE:

```apex
 Schema.DescribeSObjectResult d = Account.sObjectType.getDescribe();
 Map<String, Schema.FieldSet> FSMap = d.fieldSets.getMap();

 // And:

 DescribeSObjectResult d = Account.sObjectType.getDescribe();
 Map<String, FieldSet> FSMap = d.fieldSets.getMap();
```

---

TITLE: Schema Namespace Disambiguation Example
DESCRIPTION: Demonstrates using 'Schema.Account' to refer to the standard Account sObject when a custom class named 'Account' also exists.
SOURCE: Apex Developer Guide v64.0 (Page 125)
LANGUAGE: apex
CODE:

```apex
 // Custom class also named Account
 public class Account {
  public Integer myInteger;
 }

 // ...

 // Create a standard Account object myAccountSObject
 Schema.Account myAccountSObject = new Schema.Account();
 // Create accountClassInstance, a custom class in your org
 Account accountClassInstance = new Account();

 myAccountSObject.Name = 'Snazzy Account';
 accountClassInstance.myInteger = 1;
```

---

TITLE: Dot Notation for Nested Object Access
DESCRIPTION: Examples showing legal dot notation traversing relationships from a custom class instance through sObjects and their fields/methods.
SOURCE: Apex Developer Guide v64.0 (Page 126)
LANGUAGE: apex
CODE:

```apex
 c.c1.c2.a.name
 c.c1.c2.a.owner.lastName.toLowerCase()
 c.c1.c2.a.tasks
 c.c1.c2.a.contacts.size()
```

---

TITLE: Version Settings Impact Example (C1 - Test Class)
DESCRIPTION: Test class C1 (API v16.0) calling a method in class C2 (API v13.0), demonstrating how version settings affect field visibility (Categories field is null).
SOURCE: Apex Developer Guide v64.0 (Page 128)
LANGUAGE: apex
CODE:

```apex
 @IsTest
 // This class is bound to API version 16.0 by Version Settings
 private class C1
 {
  static testMethod void testC2Method() {
   Idea i = new Idea();
   i.CommunityId = '09aD000000004YCIAY';
   i.Title = 'Testing Version Settings';
   i.Body = 'Categories field is included in API version 16.0';
   i.Categories = 'test';

   C2 c2 = new C2();
   Idea returnedIdea = c2.insertIdea(i);
   // retrieve the new idea
   Idea ideaMoreFields = [SELECT title, categories FROM Idea
    WHERE Id = :returnedIdea.Id];

   // assert that the categories field from the object created
   // in this class is not null
   System.assert(i.Categories != null);
   // assert that the categories field created in C2 is null
   System.assert(ideaMoreFields.Categories == null);
  }
 }
```

---

TITLE: equals and hashCode Method Signatures for Custom Types in Maps/Sets
DESCRIPTION: Shows the required method signatures for 'equals' and 'hashCode' when using custom Apex classes as map keys or set elements.
SOURCE: Apex Developer Guide v64.0 (Page 130)
LANGUAGE: apex
CODE:

```apex
 public Boolean equals(Object obj) {
  // Your implementation
 }

 public Integer hashCode() {
  // Your implementation
 }
```

---

TITLE: Custom Class with equals and hashCode Implementation
DESCRIPTION: Example class 'PairNumbers' implementing custom 'equals' and 'hashCode' methods based on its Integer members x and y.
SOURCE: Apex Developer Guide v64.0 (Page 130)
LANGUAGE: apex
CODE:

```apex
 public class PairNumbers {
  Integer x,y;
  public PairNumbers(Integer a, Integer b) {
   x=a;
   y=b;
  }

  public Boolean equals(Object obj) {
   if (obj instanceof PairNumbers) {
    PairNumbers p = (PairNumbers)obj;
    return ((x==p.x) && (y==p.y));
   }
   return false;
  }

  public Integer hashCode() {
   return (31 * x) ^ y;
  }
 }
```

---

TITLE: Using Custom Class as Map Key and Set Element
DESCRIPTION: Snippet demonstrating the use of the PairNumbers custom class as keys in a Map and elements in a Set, verifying uniqueness based on the implemented equals/hashCode.
SOURCE: Apex Developer Guide v64.0 (Page 130)
LANGUAGE: apex
CODE:

```apex
 Map<PairNumbers, String> m = new Map<PairNumbers, String>();
 PairNumbers p1 = new PairNumbers(1,2);
 PairNumbers p2 = new PairNumbers(3,4);
 // Duplicate key
 PairNumbers p3 = new PairNumbers(1,2);
 m.put(p1, 'first');
 m.put(p2, 'second');
 m.put(p3, 'third'); // Overwrites the entry for p1

 // Map size is 2 because the entry with
 // the duplicate key overwrote the first entry.
 System.assertEquals(2, m.size());

 // Use the == operator
 if (p1 == p3) {
  System.debug('p1 and p3 are equal.');
 }

 // Perform some other operations
 System.assertEquals(true, m.containsKey(p1));
 System.assertEquals(true, m.containsKey(p2));
 System.assertEquals(false, m.containsKey(new PairNumbers(5,6)));

 for(PairNumbers pn : m.keySet()) {
  System.debug('Key: ' + pn);
 }

 List<String> mValues = m.values();
 System.debug('m.values: ' + mValues);

 // Create a set
 Set<PairNumbers> s1 = new Set<PairNumbers>();
 s1.add(p1);
 s1.add(p2);
 s1.add(p3);

 // Verify that we have only two elements
 // since the p3 is equal to p1.
 System.assertEquals(2, s1.size());
```

---

TITLE: SObject Variable Initialization
DESCRIPTION: Demonstrates initializing standard (Account) and custom (MyCustomObject\_\_c) sObject variables using the 'new' keyword.
SOURCE: Apex Developer Guide v64.0 (Page 132)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account();
 MyCustomObject__c co = new MyCustomObject__c();
```

---

TITLE: Generic SObject Initialization and Casting
DESCRIPTION: Shows initializing a generic sObject variable with a concrete Account type and casting between generic sObject and specific Account types.
SOURCE: Apex Developer Guide v64.0 (Page 132)
LANGUAGE: apex
CODE:

```apex
 sObject s = new Account();

 // Cast the generic variable s from the example above
 // into a specific account and account variable a
 Account a = (Account)s;

 // The following generates a runtime error
 // Contact c = (Contact)s;

 // Casting via Object supertype
 Object obj = s;
 a = (Account)obj;
```

---

TITLE: SObject Field Initialization on Instantiation
DESCRIPTION: Shows initializing Account fields (Name, BillingCity) directly within the 'new' constructor call.
SOURCE: Apex Developer Guide v64.0 (Page 133)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(name = 'Acme', billingcity = 'San Francisco');
```

---

TITLE: Accessing Custom Label Value
DESCRIPTION: Demonstrates how to access the value of a custom label named 'generic_error' using System.Label syntax.
SOURCE: Apex Developer Guide v64.0 (Page 133)
LANGUAGE: apex
CODE:

```apex
 String errorMsg = System.Label.generic_error;
```

---

TITLE: Accessing SObject Fields via Dot Notation
DESCRIPTION: Example of accessing and assigning a value to the Name field of an Account sObject using dot notation.
SOURCE: Apex Developer Guide v64.0 (Page 133)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account();
 a.Name = 'Acme'; // Access the account name field and assign it 'Acme'
```

---

TITLE: Accessing Generic SObject ID Field
DESCRIPTION: Shows accessing the Id field of a generic sObject using dot notation after querying the record. Also shows invalid attempts to access other fields directly.
SOURCE: Apex Developer Guide v64.0 (Page 133)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(Name = 'Acme', BillingCity = 'San Francisco');
 insert a;
 sObject s = [SELECT Id, Name FROM Account WHERE Name = 'Acme' LIMIT 1];
 // This is allowed
 ID id = s.Id;
 // The following line results in an error when you try to save
 // String x = s.Name;
 // This line results in an error when you try to save using API version 26.0 or earlier
 // s.Id = [SELECT Id FROM Account WHERE Name = 'Acme' LIMIT 1].Id;
```

---

TITLE: Converting Generic SObject to Specific Type for Field Access
DESCRIPTION: Demonstrates casting a generic sObject to a specific type (Account) to allow updating its fields.
SOURCE: Apex Developer Guide v64.0 (Page 134)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(Name = 'Acme', BillingCity = 'San Francisco');
 insert a;
 sObject s = [SELECT Id, Name FROM Account WHERE Name = 'Acme' LIMIT 1];
 ID id = s.ID;
 Account convertedAccount = (Account)s;
 convertedAccount.name = 'Acme2';
 update convertedAccount;
 Contact sal = new Contact(FirstName = 'Sal', Account = convertedAccount);
```

---

TITLE: Processing SOSL Results with Mixed Types
DESCRIPTION: Example showing how to iterate through generic SOSL results (List<List<SObject>>) and cast records to specific types (Contact, Lead, Account) based on SObjectType.
SOURCE: Apex Developer Guide v64.0 (Page 134)
LANGUAGE: apex
CODE:

```apex
 public class convertToCLA {
  List<Contact> contacts = new List<Contact>();
  List<Lead> leads = new List<Lead>();
  List<Account> accounts = new List<Account>();

  public void convertType(String phoneNumber) {
   List<List<SObject>> results = [FIND :phoneNumber
    IN Phone FIELDS
    RETURNING Contact(Id, Phone, FirstName, LastName),
     Lead(Id, Phone, FirstName, LastName),
     Account(Id, Phone, Name)];
   List<SObject> records = new List<SObject>();
   records.addAll(results[0]); //add Contact results
   records.addAll(results[1]); //add Lead results
   records.addAll(results[2]); //add Account results

   if (!records.isEmpty()) {
    for (Integer i = 0; i < records.size(); i++) {
     SObject record = records[i];
     if (record.getSObjectType() == Contact.sObjectType) {
      contacts.add((Contact) record);
     } else if (record.getSObjectType() == Lead.sObjectType){
      leads.add((Lead) record);
     } else if (record.getSObjectType() == Account.sObjectType) {
      accounts.add((Account) record);
     }
    }
   }
  }
 }
```

---

TITLE: Checking if SObject Fields are Set
DESCRIPTION: Demonstrates using the isSet() method to check if an SObject field (FirstName) was explicitly assigned a value (including null).
SOURCE: Apex Developer Guide v64.0 (Page 135)
LANGUAGE: apex
CODE:

```apex
 Contact nullFirst = new Contact(LastName='Codey', FirstName=null);
 System.assertEquals(true, nullFirst.isSet('FirstName'), 'FirstName is set to a literal value, so it counts as set');
 Contact unsetFirst = new Contact(LastName='Astro');
 System.assertEquals(false, unsetFirst.isSet('FirstName'), 'FirstName is not set');
```

---

TITLE: Evaluating Null Boolean SObject Field
DESCRIPTION: Shows that checking a null Boolean SObject field (IsActive) directly in an 'if' statement evaluates to false.
SOURCE: Apex Developer Guide v64.0 (Page 135)
LANGUAGE: apex
CODE:

```apex
 Campaign cObj= new Campaign();
 ...
 if (cObj.IsActive == null) { // Or simply if(cObj.IsActive) when expecting true
  ... // IsActive is evaluated to false and this code block is not executed.
 }
```

---

TITLE: Inefficient DML Inside Loop
DESCRIPTION: Example showing bad practice of performing an update DML statement inside a for loop, potentially hitting governor limits.
SOURCE: Apex Developer Guide v64.0 (Page 136)
LANGUAGE: apex
CODE:

```apex
 List<Contact> conList = [Select Department , Description from Contact];
 for(Contact badCon : conList) {
  if (badCon.Department == 'Finance') {
   badCon.Description = 'New description';
  }
  // Not a good practice since governor limits might be hit.
  update badCon;
 }
```

---

TITLE: Efficient Bulk DML Outside Loop
DESCRIPTION: Recommended practice: Collect records to be updated in a list within the loop, then perform a single bulk update DML statement outside the loop.
SOURCE: Apex Developer Guide v64.0 (Page 136)
LANGUAGE: apex
CODE:

```apex
 // List to hold the new contacts to update.
 List<Contact> updatedList = new List<Contact>();
 List<Contact> conList = [Select Department , Description from Contact];
 for(Contact con : conList) {
  if (con.Department == 'Finance') {
   con.Description = 'New description';
   // Add updated contact sObject to the list.
   updatedList.add(con);
  }
 }
 // Call update on the list of contacts.
 // This results in one DML call for the entire list.
 update updatedList;
```

---

TITLE: Basic SObject Creation and Insertion
DESCRIPTION: Simple example creating a new Account sObject in memory and then persisting it to the database using an insert statement.
SOURCE: Apex Developer Guide v64.0 (Page 137)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(Name='Account Example');
 insert a;
```

---

TITLE: Querying, Updating, and Persisting SObject Changes
DESCRIPTION: Demonstrates querying an existing Account, modifying its Name and Industry fields in memory, and then using the update statement to save the changes.
SOURCE: Apex Developer Guide v64.0 (Page 137)
LANGUAGE: apex
CODE:

```apex
 // Query existing account.
 Account a = [SELECT Name,Industry
  FROM Account
  WHERE Name='Account Example' LIMIT 1];

 // Modify the two fields on the sObject.
 a.Name = 'Account of the Day';
 a.Industry = 'Technology';

 // Persist the changes.
 update a;

 // Verify that updated field values were persisted.
 Account updatedAccount = [SELECT Name,Industry
  FROM Account
  WHERE Name='Account of the Day' LIMIT 1];
 System.assertEquals('Account of the Day', updatedAccount.Name);
 System.assertEquals('Technology', updatedAccount.Industry);
```

---

TITLE: DML Statement Insert Example
DESCRIPTION: Shows creating a list of Accounts and inserting them using a single DML 'insert' statement.
SOURCE: Apex Developer Guide v64.0 (Page 138)
LANGUAGE: apex
CODE:

```apex
 // Create the list of sObjects to insert
 List<Account> acctList = new List<Account>();
 acctList.add(new Account(Name='Acme1'));
 acctList.add(new Account(Name='Acme2'));

 // DML statement
 insert acctList;
```

---

TITLE: Database Class Insert Example with Error Handling
DESCRIPTION: Equivalent to the previous example but uses Database.insert with partial success allowed (false) and iterates through SaveResult to check for errors.
SOURCE: Apex Developer Guide v64.0 (Page 138)
LANGUAGE: apex
CODE:

```apex
 // Create the list of sObjects to insert
 List<Account> acctList = new List<Account>();
 acctList.add(new Account(Name='Acme1'));
 acctList.add(new Account(Name='Acme2'));

 // DML statement allowing partial success
 Database.SaveResult[] srList = Database.insert(acctList, false);

 // Iterate through each returned result
 for (Database.SaveResult sr : srList) {
  if (sr.isSuccess()) {
   // Operation was successful, so get the ID of the record that was processed
   System.debug('Successfully inserted account. Account ID: ' + sr.getId());
  }
  else {
   // Operation failed, so get all errors
   for(Database.Error err : sr.getErrors()) {
    System.debug('The following error has occurred.');
    System.debug(err.getStatusCode() + ': ' + err.getMessage());
    System.debug('Account fields that affected this error: ' + err.getFields());
   }
  }
 }
```

---

TITLE: Inserting Multiple Account Records and Updating One
DESCRIPTION: Example inserting three accounts and then updating the BillingCity of the 'Acme2' account. Includes basic try-catch for DmlException.
SOURCE: Apex Developer Guide v64.0 (Page 140)
LANGUAGE: apex
CODE:

```apex
 Account[] accts = new List<Account>();
 for(Integer i=0;i<3;i++) {
  Account a = new Account(Name='Acme' + i,
   BillingCity='San Francisco');
  accts.add(a);
 }
 Account accountToUpdate;
 try {
  insert accts;

  // Update account Acme2.
  accountToUpdate =
   [SELECT BillingCity FROM Account
    WHERE Name='Acme2' AND BillingCity='San Francisco'
    LIMIT 1];
  // Update the billing city.
  accountToUpdate.BillingCity = 'New York';
  // Make the update call.
  update accountToUpdate;
 } catch(DmlException e) {
  System.debug('An unexpected error has occurred: ' + e.getMessage());
 }

 // Verify that the billing city was updated to New York.
 Account afterUpdate =
  [SELECT BillingCity FROM Account WHERE Id=:accountToUpdate.Id];
 System.assertEquals('New York', afterUpdate.BillingCity);
```

---

TITLE: Inserting a Related Contact Record
DESCRIPTION: Demonstrates inserting a Contact related to a previously inserted Account by setting the Contact's AccountId field.
SOURCE: Apex Developer Guide v64.0 (Page 140)
LANGUAGE: apex
CODE:

```apex
 try {
  Account acct = new Account(Name='SFDC Account');
  insert acct;

  // Once the account is inserted, the sObject will be
  // populated with an ID.
  // Get this ID.
  ID acctID = acct.ID;

  // Add a contact to this account.
  Contact con = new Contact(
   FirstName='Joe',
   LastName='Smith',
   Phone='415.555.1212',
   AccountId=acctID);
  insert con;
 } catch(DmlException e) {
  System.debug('An unexpected error has occurred: ' + e.getMessage());
 }
```

---

TITLE: Updating Related Contact and Account Records
DESCRIPTION: Shows querying a Contact, updating fields on both the Contact and its related Account, and then performing two separate update DML calls.
SOURCE: Apex Developer Guide v64.0 (Page 141)
LANGUAGE: apex
CODE:

```apex
 try {
  // Query for the contact, which has been associated with an account.
  Contact queriedContact = [SELECT Account.Name, Account.Industry
   FROM Contact
   WHERE FirstName = 'Joe' AND LastName='Smith'
   LIMIT 1];

  // Update the contact's phone number
  queriedContact.Phone = '415.555.1213';

  // Update the related account industry
  queriedContact.Account.Industry = 'Technology';

  // Make two separate calls
  // 1. This call is to update the contact's phone.
  update queriedContact;
  // 2. This call is to update the related account's Industry field.
  update queriedContact.Account;
 } catch(Exception e) {
  System.debug('An unexpected error has occurred: ' + e.getMessage());
 }
```

---

TITLE: Relating Records Using External ID on Insert
DESCRIPTION: Demonstrates relating a new Opportunity to an existing Account using the Account's external ID field (MyExtID\_\_c) during the Opportunity insert.
SOURCE: Apex Developer Guide v64.0 (Page 142)
LANGUAGE: apex
CODE:

```apex
 Opportunity newOpportunity = new Opportunity(
  Name='OpportunityWithAccountInsert',
  StageName='Prospecting',
  CloseDate=Date.today().addDays(7));

 // Create the parent record reference using External ID.
 Account accountReference = new Account(
  MyExtID__c='SAP111111');

 // Add the account sObject to the opportunity's Account lookup field.
 newOpportunity.Account = accountReference;

 // Create the opportunity.
 Database.SaveResult results = Database.insert(newOpportunity);
```

---

TITLE: Creating Parent and Child Records with External ID
DESCRIPTION: Example showing how to create a parent (Account) and child (Opportunity) record in a single DML call by referencing the parent's external ID in the child's lookup relationship field.
SOURCE: Apex Developer Guide v64.0 (Page 143)
LANGUAGE: apex
CODE:

```apex
 public class ParentChildSample {
  public static void InsertParentChild() {
   Date dt = Date.today();
   dt = dt.addDays(7);
   Opportunity newOpportunity = new Opportunity(
    Name='OpportunityWithAccountInsert',
    StageName='Prospecting',
    CloseDate=dt);

   // Create the parent reference based on External ID.
   Account accountReference = new Account(
    MyExtID__c='SAP111111');
   newOpportunity.Account = accountReference;

   // Create the Account object to insert (including Name field).
   Account parentAccount = new Account(
    Name='Hallie',
    MyExtID__c='SAP111111');

   // Create the account and the opportunity in one DML call.
   // Parent record (Account) must precede child (Opportunity) in the array.
   Database.SaveResult[] results = Database.insert(new SObject[] {
    parentAccount, newOpportunity });

   // Check results.
   for (Integer i = 0; i < results.size(); i++) {
    if (results[i].isSuccess()) {
     System.debug('Successfully created ID: ' + results[i].getId());
    } else {
     System.debug('Error: could not create sobject for array element ' + i + '.');
     System.debug(' The error reported was: ' + results[i].getErrors()[0].getMessage() + '\n');
    }
   }
  }
 }
```

---

TITLE: Upsert Example (Basic)
DESCRIPTION: Demonstrates using the upsert DML statement to update existing accounts based on city and insert a new account.
SOURCE: Apex Developer Guide v64.0 (Page 144)
LANGUAGE: apex
CODE:

```apex
 Account[] acctsList = [SELECT Id, Name, BillingCity
  FROM Account WHERE BillingCity = 'Bombay'];
 for (Account a : acctsList) {
  a.BillingCity = 'Mumbai';
 }
 Account newAcct = new Account(Name = 'Acme', BillingCity = 'San Francisco');
 acctsList.add(newAcct);
 try {
  upsert acctsList;
 } catch (DmlException e) {
  // Process exception here
 }
```

---

TITLE: Database.upsert Example with Partial Success
DESCRIPTION: Shows using Database.upsert with partial success allowed (false) and creating related Task records for newly created Leads.
SOURCE: Apex Developer Guide v64.0 (Page 144)
LANGUAGE: apex
CODE:

```apex
 /* This method accepts a collection of lead records and
 creates a task for the owner(s) of any leads that were
 created as new, that is, not updated as a result of the upsert
 operation */
 public static List<Database.upsertResult> upsertLeads(List<Lead> leads) {

  /* Perform the upsert allowing partial success. */
  List<Database.upsertResult> uResults = Database.upsert(leads,false);

  /* This is the list for new tasks that will be inserted when new
  leads are created. */
  List<Task> tasks = new List<Task>();
  for(Database.upsertResult result:uResults) {
   if (result.isSuccess() && result.isCreated())
    tasks.add(new Task(Subject = 'Follow-up', WhoId = result.getId()));
  }

  /* If there are tasks to be inserted, insert them */
  Database.insert(tasks);

  return uResults;
 }
```

---

TITLE: Test Method for Database.upsert Example
DESCRIPTION: Test method demonstrating how to test the upsertLeads method, verifying successful upserts and the creation of related Task records.
SOURCE: Apex Developer Guide v64.0 (Page 145)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class DmlSamplesTest {
  public static testMethod void testUpsertLeads() {
   List<Lead> leads = new List<Lead>();
   // Create test leads
   for(Integer i = 0;i < 100; i++) {
    leads.add(new Lead(LastName = 'testLead', Company = 'testCompany'));
   }

   Test.startTest();
   // Exercise the method
   List<Database.upsertResult> results = DmlSamples.upsertLeads(leads);
   Test.stopTest();

   // ID set for asserting the tasks were created as expected
   Set<Id> ids = new Set<Id>();
   // Iterate over the results, asserting success and adding the new ID
   for(Database.upsertResult result:results) {
    System.assert(result.isSuccess());
    ids.add(result.getId());
   }

   // Assert that exactly one task exists for each lead that was inserted.
   for(Lead l:[SELECT Id, (SELECT Subject FROM Tasks) FROM Lead WHERE Id IN :ids]) {
    System.assertEquals(1,l.tasks.size());
   }
  }
 }
```

---

TITLE: Upserting Records Using External ID
DESCRIPTION: Example using upsert with an external ID field (Line_Item_ID\_\_c) on the Asset object to match and update/insert records based on related OpportunityLineItems.
SOURCE: Apex Developer Guide v64.0 (Page 146)
LANGUAGE: apex
CODE:

```apex
 public void upsertExample() {
  Opportunity opp = [SELECT Id, Name, AccountId,
   (SELECT Id, PricebookEntry.Product2Id, PricebookEntry.Name
    FROM OpportunityLineItems)
   FROM Opportunity
   WHERE HasOpportunityLineItem = true
   LIMIT 1];

  Asset[] assets = new Asset[]{};
  // Create an asset for each line item on the opportunity
  for (OpportunityLineItem lineItem:opp.OpportunityLineItems) {
   Asset asset = new Asset(Name = lineItem.PricebookEntry.Name,
    Line_Item_ID__c = lineItem.Id, // External ID field
    AccountId = opp.AccountId,
    Product2Id = lineItem.PricebookEntry.Product2Id);
   assets.add(asset);
  }

  try {
   upsert assets Line_Item_ID__c; // Upsert using the external ID field
  } catch (DmlException e) {
   System.debug(e.getMessage());
  }
 }
```

---

TITLE: Merging Account Records Example (DML Statement)
DESCRIPTION: Demonstrates merging two Account records using the 'merge' DML statement and verifying that the related Contact is reparented and the merged record is deleted.
SOURCE: Apex Developer Guide v64.0 (Page 147)
LANGUAGE: apex
CODE:

```apex
 // Insert new accounts
 List<Account> ls = new List<Account>{
  new Account(name='Acme Inc.'),
  new Account(name='Acme')
 };
 insert ls;

 // Queries to get the inserted accounts
 Account masterAcct = [SELECT Id, Name FROM Account WHERE Name = 'Acme Inc.' LIMIT 1];
 Account mergeAcct = [SELECT Id, Name FROM Account WHERE Name = 'Acme' LIMIT 1];

 // Add a contact to the account to be merged
 Contact c = new Contact(FirstName='Joe',LastName='Merged');
 c.AccountId = mergeAcct.Id;
 insert c;

 try {
  merge masterAcct mergeAcct;
 } catch (DmlException e) {
  // Process exception
  System.debug('An unexpected error has occurred: ' + e.getMessage());
 }

 // Verify related contact is moved and merge record is deleted
 masterAcct = [SELECT Id, Name, (SELECT FirstName,LastName From Contacts)
  FROM Account WHERE Name = 'Acme Inc.' LIMIT 1];
 System.assert(masterAcct.getSObjects('Contacts').size() > 0);
 System.assertEquals('Joe', masterAcct.getSObjects('Contacts')[0].get('FirstName'));
 System.assertEquals('Merged', masterAcct.getSObjects('Contacts')[0].get('LastName'));

 Account[] result = [SELECT Id, Name FROM Account WHERE Id=:mergeAcct.Id];
 System.assertEquals(0, result.size());
```

---

TITLE: Merging Account Records Example (Database Method)
DESCRIPTION: Similar to the previous merge example, but uses Database.merge with partial success disabled (false) and checks the MergeResult object.
SOURCE: Apex Developer Guide v64.0 (Page 148)
LANGUAGE: apex
CODE:

```apex
 // Create master account
 Account master = new Account(Name='Account1');
 insert master;
 // Create duplicate accounts
 Account[] duplicates = new Account[]{
  new Account(Name='Account1, Inc.'),
  new Account(Name='Account 1')
 };
 insert duplicates;
 // Create child contact and associate it with first duplicate account
 Contact c = new Contact(firstname='Joe',lastname='Smith', accountId=duplicates[0].Id);
 insert c;
 // Get the account contact relation ID
 AccountContactRelation resultAcrel = [SELECT Id FROM AccountContactRelation WHERE ContactId=:c.Id LIMIT 1];

 // Merge accounts into master, allowing partial success = false
 Database.MergeResult[] results = Database.merge(master, duplicates, false);

 for(Database.MergeResult res : results) {
  if (res.isSuccess()) {
   System.debug('Master record ID: ' + res.getId());
   List<Id> mergedIds = res.getMergedRecordIds();
   System.debug('IDs of merged records: ' + mergedIds);
   // Verify reparented record ID (Contact and AccountContactRelation)
   System.assertEquals(2, res.getUpdatedRelatedIds().size() );
   // ... (Verification logic for specific IDs) ...
  } else {
   for(Database.Error err : res.getErrors()) {
    System.debug(err.getMessage());
   }
  }
 }
```

---

TITLE: Deleting Records Example
DESCRIPTION: Shows querying accounts named 'DotCom' and deleting them using the 'delete' DML statement within a try-catch block.
SOURCE: Apex Developer Guide v64.0 (Page 149)
LANGUAGE: apex
CODE:

```apex
 Account[] doomedAccts = [SELECT Id, Name FROM Account
  WHERE Name = 'DotCom'];
 try {
  delete doomedAccts;
 } catch (DmlException e) {
  // Process exception here
 }
```

---

TITLE: Undeleting Records Example
DESCRIPTION: Demonstrates undeleting an Account record previously deleted by querying ALL ROWS and using the 'undelete' DML statement.
SOURCE: Apex Developer Guide v64.0 (Page 150)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(Name='Universal Containers');
 insert(a);
 insert(new Contact(LastName='Carter',AccountId=a.Id));
 delete a;

 // Query including deleted records
 Account[] savedAccts = [SELECT Id, Name FROM Account WHERE Name = 'Universal Containers' ALL ROWS];
 try {
  undelete savedAccts;
 } catch (DmlException e) {
  // Process exception here
 }
```

---

TITLE: Lead Conversion Example
DESCRIPTION: Demonstrates converting a Lead using the Database.LeadConvert class and the Database.convertLead method.
SOURCE: Apex Developer Guide v64.0 (Page 151)
LANGUAGE: apex
CODE:

```apex
 Lead myLead = new Lead(LastName = 'Fry', Company='Fry And Sons');
 insert myLead;

 Database.LeadConvert lc = new database.LeadConvert();
 lc.setLeadId(myLead.id);

 LeadStatus convertStatus = [SELECT Id, ApiName FROM LeadStatus WHERE IsConverted=true LIMIT 1];
 lc.setConvertedStatus(convertStatus.ApiName);

 Database.LeadConvertResult lcr = Database.convertLead(lc);
 System.assert(lcr.isSuccess());
```

---

TITLE: Handling DML Exceptions with Try-Catch
DESCRIPTION: Basic example showing how to wrap an 'insert' DML statement in a try-catch block to handle potential DmlExceptions.
SOURCE: Apex Developer Guide v64.0 (Page 152)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(Name='Acme');
 try {
  insert a;
 } catch(DmlException e) {
  // Process exception here
 }
```

---

TITLE: Handling Database Method Errors (Partial Success)
DESCRIPTION: Example using Database.insert with partial success enabled (false) and iterating through the SaveResult list to identify and log errors for failed records.
SOURCE: Apex Developer Guide v64.0 (Page 153)
LANGUAGE: apex
CODE:

```apex
 // Create two accounts, one of which is missing a required field
 Account[] accts = new List<Account>{
  new Account(Name='Account1'),
  new Account()}; // Missing Name field

 Database.SaveResult[] srList = Database.insert(accts, false); // Allow partial success

 // Iterate through each returned result
 for (Database.SaveResult sr : srList) {
  if (!sr.isSuccess()) {
   // Operation failed, so get all errors
   for(Database.Error err : sr.getErrors()) {
    System.debug('The following error has occurred.');
    System.debug(err.getStatusCode() + ': ' + err.getMessage());
    System.debug('Fields that affected this error: ' + err.getFields());
   }
  }
 }
```

---

TITLE: Setting DML Option for Field Truncation
DESCRIPTION: Demonstrates creating a Database.DMLOptions object and setting the allowFieldTruncation property to true.
SOURCE: Apex Developer Guide v64.0 (Page 155)
LANGUAGE: apex
CODE:

```apex
 Database.DMLOptions dml = new Database.DMLOptions();
 dml.allowFieldTruncation = true;
```

---

TITLE: Setting DML Option for Assignment Rule (Default)
DESCRIPTION: Shows setting the useDefaultRule option on the assignmentRuleHeader property of DMLOptions before inserting a Lead.
SOURCE: Apex Developer Guide v64.0 (Page 155)
LANGUAGE: apex
CODE:

```apex
 Database.DMLOptions dmo = new Database.DMLOptions();
 dmo.assignmentRuleHeader.useDefaultRule= true;

 Lead l = new Lead(company='ABC', lastname='Smith');
 // Assuming l.setOptions(dmo) is called before insert
 // insert l;
```

---

TITLE: Setting DML Option for Assignment Rule (Specific ID)
DESCRIPTION: Shows setting a specific assignmentRuleId on the assignmentRuleHeader property of DMLOptions before inserting a Lead.
SOURCE: Apex Developer Guide v64.0 (Page 155)
LANGUAGE: apex
CODE:

```apex
 Database.DMLOptions dmo = new Database.DMLOptions();
 dmo.assignmentRuleHeader.assignmentRuleId= '01QD0000000EqAn';

 Lead l = new Lead(company='ABC', lastname='Smith');
 // Assuming l.setOptions(dmo) is called before insert
 // insert l;
```

---

TITLE: Setting DML Option for Duplicate Rule Handling
DESCRIPTION: Demonstrates setting the allowSave option on the duplicateRuleHeader property of DMLOptions to allow saving duplicate records, used with Database.insert.
SOURCE: Apex Developer Guide v64.0 (Page 156)
LANGUAGE: apex
CODE:

```apex
 Database.DMLOptions dml = new Database.DMLOptions();
 dml.DuplicateRuleHeader.AllowSave = true;
 Account duplicateAccount = new Account(Name='dupe');
 Database.SaveResult sr = Database.insert(duplicateAccount, dml);
 if (sr.isSuccess()) {
  System.debug('Duplicate account has been inserted in Salesforce!');
 }
```

---

TITLE: Setting DML Option for Email Handling
DESCRIPTION: Example setting the triggerAutoResponseEmail option on the EmailHeader property of DMLOptions before inserting a Case.
SOURCE: Apex Developer Guide v64.0 (Page 156)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(name='Acme Plumbing');
 insert a;
 Contact c = new Contact(email='jplumber@salesforce.com', firstname='Joe',lastname='Plumber', accountid=a.id);
 insert c;

 Database.DMLOptions dlo = new Database.DMLOptions();
 dlo.EmailHeader.triggerAutoResponseEmail = true;

 Case ca = new Case(subject='Plumbing Problems', contactid=c.id);
 // database.insert(ca, dlo); // Call insert with DML options
```

---

TITLE: Database Savepoint and Rollback Example
DESCRIPTION: Demonstrates setting a savepoint, making DML changes, and then rolling back to the savepoint state, verifying the changes were reverted.
SOURCE: Apex Developer Guide v64.0 (Page 158)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(Name = 'xyz');
 insert a;
 Assert.isNull([SELECT AccountNumber FROM Account WHERE Id = :a.Id]. AccountNumber);
 // Create a savepoint while AccountNumber is null
 Savepoint sp = Database.setSavepoint();
 // Change the account number
 a.AccountNumber = '123';
 update a;
 Assert.areEqual('123', [SELECT AccountNumber FROM Account WHERE Id = :a.Id]. AccountNumber);
 // Rollback to the previous null value
 Database.rollback(sp);
 Assert.isNull([SELECT AccountNumber FROM Account WHERE Id = :a.Id]. AccountNumber);
```

---

TITLE: Savepoint Rollback and Release for Callout
DESCRIPTION: Shows rolling back to a savepoint and explicitly releasing it before making a callout, avoiding an uncommitted work exception.
SOURCE: Apex Developer Guide v64.0 (Page 158)
LANGUAGE: apex
CODE:

```apex
 Savepoint sp = Database.setSavepoint();
 try {
  // Try a database operation
  insert new Account(name='Foo');
  integer bang = 1 / 0; // Cause an exception
 } catch (Exception ex) {
  Database.rollback(sp);
  Database.releaseSavepoint(sp); // Release savepoint before callout
  makeACallout(); // Assume this is a method performing a callout
 }
```

---

TITLE: Callout Exception Due to Unreleased Savepoint
DESCRIPTION: Example code that will throw a CalloutException because Database.releaseSavepoint was called _after_ DML but _before_ the callout, leaving uncommitted work.
SOURCE: Apex Developer Guide v64.0 (Page 159)
LANGUAGE: apex
CODE:

```apex
 Savepoint sp = Database.setSavepoint();
 insert new Account(name='Foo');
 Database.releaseSavepoint(sp); // Savepoint released, but DML is uncommitted
 try {
  makeACallout(); // Callout fails due to uncommitted work
 } catch (System.CalloutException ex) {
  Assert.isTrue(ex.getMessage().contains('You have uncommitted work pending. Please commit or rollback before calling out.'));
 }
```

---

TITLE: SOQL For Loop Basic Example
DESCRIPTION: Demonstrates iterating over Account query results using a SOQL for loop.
SOURCE: Apex Developer Guide v64.0 (Page 168)
LANGUAGE: apex
CODE:

```apex
 for (Account[] accts : [SELECT Id FROM Account
  FOR UPDATE]) {
  // Your code processing the batch of accounts
 }
```

---

TITLE: Basic SOQL Query Example
DESCRIPTION: Simple SOQL query retrieving Id and Name from Accounts named 'Acme'.
SOURCE: Apex Developer Guide v64.0 (Page 169)
LANGUAGE: soql
CODE:

```soql
 List<Account> aa = [SELECT Id, Name FROM Account WHERE Name = 'Acme'];
```

---

TITLE: SOQL Query for Object Creation
DESCRIPTION: Example using an inline SOQL query to fetch an Account record used in the constructor of a new Contact.
SOURCE: Apex Developer Guide v64.0 (Page 169)
LANGUAGE: apex
CODE:

```apex
 Contact c = new Contact(Account = [SELECT Name FROM Account
  WHERE NumberOfEmployees > 10 LIMIT 1]);
 c.FirstName = 'James';
 c.LastName = 'Yoyce';
```

---

TITLE: SOQL COUNT() Query Example
DESCRIPTION: Shows using the COUNT() aggregate function in a SOQL query to get the number of Contacts with a specific last name.
SOURCE: Apex Developer Guide v64.0 (Page 169)
LANGUAGE: apex
CODE:

```apex
 Integer i = [SELECT COUNT() FROM Contact WHERE LastName = 'Weissman'];
```

---

TITLE: SOQL COUNT() with Arithmetic Example
DESCRIPTION: Demonstrates using the result of a COUNT() query in an arithmetic expression.
SOURCE: Apex Developer Guide v64.0 (Page 169)
LANGUAGE: apex
CODE:

```apex
 Integer j = 5 * [SELECT COUNT() FROM Account];
```

---

TITLE: Basic SOSL Query Example
DESCRIPTION: Simple SOSL query searching for 'map\*' across all fields and returning specified fields for Account, Contact, Opportunity, and Lead.
SOURCE: Apex Developer Guide v64.0 (Page 169)
LANGUAGE: apex
CODE:

```apex
 List<List<SObject>> searchList = [FIND 'map*' IN ALL FIELDS RETURNING Account (Id, Name),
  Contact, Opportunity, Lead];
```

---

TITLE: Processing SOSL Results Example
DESCRIPTION: Shows how to access the results of a SOSL query by casting the lists within the result list to their specific sObject types.
SOURCE: Apex Developer Guide v64.0 (Page 170)
LANGUAGE: apex
CODE:

```apex
 // Assuming searchList is from the previous SOSL example
 Account [] accounts = ((List<Account>)searchList[0]);
 Contact [] contacts = ((List<Contact>)searchList[1]);
 Opportunity [] opportunities = ((List<Opportunity>)searchList[2]);
 Lead [] leads = ((List<Lead>)searchList[3]);
```

---

TITLE: Runtime Error Accessing Unqueried Field
DESCRIPTION: Example showing code that causes a runtime error by attempting to access the 'Name' field which was not included in the SOQL query.
SOURCE: Apex Developer Guide v64.0 (Page 170)
LANGUAGE: apex
CODE:

```apex
 insert new Account(Name = 'Singha');
 Account acc = [SELECT Id FROM Account WHERE Name = 'Singha' LIMIT 1];
 // Note that name is not selected
 String name = [SELECT Id FROM Account WHERE Name = 'Singha' LIMIT 1].Name; // Causes error
```

---

TITLE: Corrected Query Including Necessary Field
DESCRIPTION: The corrected version of the previous example, including the 'Name' field in the SELECT clause to avoid a runtime error.
SOURCE: Apex Developer Guide v64.0 (Page 170)
LANGUAGE: apex
CODE:

```apex
 insert new Account(Name = 'Singha');
 Account acc = [SELECT Id, Name FROM Account WHERE Name = 'Singha' LIMIT 1];
 String name = [SELECT Id, Name FROM Account WHERE Name = 'Singha' LIMIT 1].Name; // Works correctly
```

---

TITLE: Dereferencing Fields from SOQL Results
DESCRIPTION: Examples showing how to dereference a field (AnnualRevenue) from a SOQL query result list and from a single-record query result.
SOURCE: Apex Developer Guide v64.0 (Page 171)
LANGUAGE: apex
CODE:

```apex
 // Accessing from a list result (first record)
 Double rev = [SELECT AnnualRevenue FROM Account
  WHERE Name = 'Acme'][0].AnnualRevenue;

 // Accessing from a single record result (LIMIT 1)
 Double rev2 = [SELECT AnnualRevenue FROM Account
  WHERE Name = 'Acme' LIMIT 1].AnnualRevenue;
```

---

TITLE: Integer Result from SOQL COUNT()
DESCRIPTION: Shows that a SOQL query using COUNT() directly returns an Integer, requiring no dereferencing.
SOURCE: Apex Developer Guide v64.0 (Page 171)
LANGUAGE: apex
CODE:

```apex
 Integer i = [SELECT COUNT() FROM Account];
```

---

TITLE: Accessing Fields Through Relationships
DESCRIPTION: Demonstrates creating related Account and Contact records, querying the Contact including a related Account field, and updating fields on both records via the Contact variable.
SOURCE: Apex Developer Guide v64.0 (Page 171)
LANGUAGE: apex
CODE:

```apex
 Account a = new Account(Name = 'Acme');
 insert a; // Inserting the record automatically assigns a value to its ID field
 Contact c = new Contact(LastName = 'Weissman');
 c.AccountId = a.Id;
 // The new contact now points at the new account
 insert c;

 // A SOQL query accesses data for the inserted contact,
 // including a populated c.account field
 c = [SELECT Account.Name FROM Contact WHERE Id = :c.Id];

 // Now fields in both records can be changed through the contact
 c.Account.Name = 'salesforce.com';
 c.LastName = 'Roth';

 // To update the database, the two types of records must be
 // updated separately
 update c; // This only changes the contact's last name
 update c.Account; // This updates the account name
```

---

TITLE: Relating Records via External ID during DML
DESCRIPTION: Shows inserting a Contact related to an Account by referencing the Account's external ID field within the Contact's Account relationship field during insertion.
SOURCE: Apex Developer Guide v64.0 (Page 172)
LANGUAGE: apex
CODE:

```apex
 Account refAcct = new Account(externalId__c = '12345');
 Contact c = new Contact(Account = refAcct, LastName = 'Kay');
 insert c;
```

---

TITLE: Retrieving Related Records via Foreign Key Query
DESCRIPTION: Demonstrates retrieving the Name field from a related Account directly within a SOQL query for a Contact.
SOURCE: Apex Developer Guide v64.0 (Page 172)
LANGUAGE: apex
CODE:

```apex
 System.debug([SELECT Account.Name FROM Contact
  WHERE FirstName = 'Caroline'].Account.Name);
```

---

TITLE: Iterating Through Parent-Child Relationship Query Results
DESCRIPTION: Example using a SOQL query with a parent-to-child subquery (Contacts) and iterating through the child records accessed via the relationship name.
SOURCE: Apex Developer Guide v64.0 (Page 172)
LANGUAGE: apex
CODE:

```apex
 for (Account a : [SELECT Id, Name, (SELECT LastName FROM Contacts)
  FROM Account
  WHERE Name = 'Acme']) {
  Contact[] cons = a.Contacts;
  // Process child contacts (cons) here
 }
```

---

TITLE: Accessing Child Records from Single Parent Result
DESCRIPTION: Simplified example accessing child Contacts directly from a single Account record retrieved via a relationship query (assuming LIMIT 1).
SOURCE: Apex Developer Guide v64.0 (Page 173)
LANGUAGE: apex
CODE:

```apex
 for (Account a : [SELECT Id, Name, (SELECT LastName FROM Contacts LIMIT 1)
  FROM Account
  WHERE Name = 'testAgg']) {
  Contact c = a.Contacts; // Access single child contact
 }
```

---

TITLE: SOQL Aggregate Function Example (AVG without GROUP BY)
DESCRIPTION: Shows using the AVG() aggregate function to calculate the average Amount across all Opportunities.
SOURCE: Apex Developer Guide v64.0 (Page 173)
LANGUAGE: apex
CODE:

```apex
 AggregateResult[] groupedResults
  = [SELECT AVG(Amount)aver FROM Opportunity];
 Object avgAmount = groupedResults[0].get('aver');
```

---

TITLE: SOQL Aggregate Function Example (AVG with GROUP BY)
DESCRIPTION: Demonstrates using AVG() with GROUP BY CampaignId to get average Opportunity Amounts per Campaign and iterating through the AggregateResult array.
SOURCE: Apex Developer Guide v64.0 (Page 173)
LANGUAGE: apex
CODE:

```apex
 AggregateResult[] groupedResults
  = [SELECT CampaignId, AVG(Amount)
  FROM Opportunity
  GROUP BY CampaignId];
 for (AggregateResult ar : groupedResults) {
  System.debug('Campaign ID' + ar.get('CampaignId'));
  System.debug('Average amount' + ar.get('expr0')); // Implied alias for AVG(Amount)
 }
```

---

TITLE: SOQL For Loop for Large Query Results (Basic)
DESCRIPTION: Shows using a SOQL for loop to process potentially large query results efficiently, avoiding heap size limits compared to assigning directly to a List.
SOURCE: Apex Developer Guide v64.0 (Page 174)
LANGUAGE: apex
CODE:

```apex
 // Potentially problematic for large results:
 // Account[] accts = [SELECT Id FROM Account];

 // Better approach using SOQL for loop:
 // Use this format if you are not executing DML statements
 // within the for loop
 for (Account a : [SELECT Id, Name FROM Account
  WHERE Name LIKE 'Acme%']) {
  // Your code without DML statements here
 }
```

---

TITLE: SOQL For Loop for Large Query Results (with DML)
DESCRIPTION: Recommended SOQL for loop format when performing DML inside the loop, iterating over lists (batches) of records for efficiency.
SOURCE: Apex Developer Guide v64.0 (Page 174)
LANGUAGE: apex
CODE:

```apex
 // Use this format for efficiency if you are executing DML statements
 // within the for loop
 for (List<Account> accts : [SELECT Id, Name FROM Account
  WHERE Name LIKE 'Acme%']) {
  for (Account a : accts) {
   // Your code here
  }
  update accts; // Perform DML on the batch
 }
```

---

TITLE: SOQL For Loop for Mass Update
DESCRIPTION: Example using a SOQL for loop (list format) to efficiently mass update the LastName of specific Contact records.
SOURCE: Apex Developer Guide v64.0 (Page 174)
LANGUAGE: apex
CODE:

```apex
 public void massUpdate() {
  for (List<Contact> contacts:
   [SELECT FirstName, LastName FROM Contact]) {
   for(Contact c : contacts) {
    if (c.FirstName == 'Barbara' &&
     c.LastName == 'Gordon') {
     c.LastName = 'Wayne';
    }
   }
   update contacts;
  }
 }
```

---

TITLE: Selective SOQL Query Example 1 (IN clause on indexed ID)
DESCRIPTION: Example of a potentially selective SOQL query using an IN clause on the indexed Id field. Selectivity depends on the number of IDs.
SOURCE: Apex Developer Guide v64.0 (Page 175)
LANGUAGE: soql
CODE:

```soql
 SELECT Id FROM Account WHERE Id IN (<list of account IDs>)
```

---

TITLE: Non-Selective SOQL Query Example 2 (Not Empty Name)
DESCRIPTION: Example of a non-selective query on a large object, filtering for non-empty Name, which returns most records despite Name being indexed.
SOURCE: Apex Developer Guide v64.0 (Page 175)
LANGUAGE: soql
CODE:

```soql
 SELECT Id FROM Account WHERE Name != ''
```

---

TITLE: Potentially Selective SOQL Query Example 3 (Compound Filter)
DESCRIPTION: Example of a query with a compound WHERE clause. Its selectivity depends on whether the filter on the indexed CustomField\_\_c is selective enough.
SOURCE: Apex Developer Guide v64.0 (Page 175)
LANGUAGE: soql
CODE:

```soql
 SELECT Id FROM Account WHERE Name != '' AND CustomField__c = 'ValueA'
```

---

TITLE: Assigning Single SOQL Result to SObject
DESCRIPTION: Shows assigning the result of a SOQL query (expected to return exactly one record) directly to a single sObject variable. Throws exception if 0 or >1 records found.
SOURCE: Apex Developer Guide v64.0 (Page 176)
LANGUAGE: apex
CODE:

```apex
 Account acct = [SELECT Id FROM Account WHERE Name = 'UniqueAccountName']; // Assumes exactly one result
 String name = [SELECT Name FROM Account WHERE Id = :someId].Name; // Accessing field directly
```

---

TITLE: Filtering Null Values in SOQL Example
DESCRIPTION: Demonstrates improving query performance by explicitly filtering out null values in the WHERE clause (Thread\_\_c != null).
SOURCE: Apex Developer Guide v64.0 (Page 176)
LANGUAGE: apex
CODE:

```apex
 // Note WHERE clause optimizes search where Thread__c is not null
 for(CSO_CaseThread_Tag__c t :
  [SELECT Name FROM CSO_CaseThread_Tag__c
   WHERE Thread__c = :threadId AND
   Thread__c != null])
 {
  // processing logic
 }
```

---

TITLE: Polymorphic Query Using IN Filter
DESCRIPTION: SOQL query filtering on the Type of a polymorphic relationship field (What) using an IN clause for Account and Opportunity.
SOURCE: Apex Developer Guide v64.0 (Page 177)
LANGUAGE: soql
CODE:

```soql
 List<Event> events = [SELECT Description FROM Event WHERE What.Type IN ('Account', 'Opportunity')];
```

---

TITLE: Polymorphic Query Using TYPEOF Clause
DESCRIPTION: SOQL query using the TYPEOF clause to selectively retrieve different fields based on the runtime type of the polymorphic What relationship (Account or Opportunity).
SOURCE: Apex Developer Guide v64.0 (Page 177)
LANGUAGE: soql
CODE:

```soql
 List<Event> events = [SELECT TYPEOF What WHEN Account THEN Phone WHEN Opportunity THEN Amount END FROM Event];
```

---

TITLE: Checking Polymorphic Relationship Type with instanceof
DESCRIPTION: Demonstrates using the 'instanceof' operator to check the runtime type of a polymorphic relationship field (myEvent.What).
SOURCE: Apex Developer Guide v64.0 (Page 177)
LANGUAGE: apex
CODE:

```apex
 Event myEvent = eventFromQuery;
 if (myEvent.What instanceof Account) {
  // myEvent.What references an Account, so process accordingly
 } else if (myEvent.What instanceof Opportunity) {
  // myEvent.What references an Opportunity, so process accordingly
 }
```

---

TITLE: Processing Polymorphic Query Results with Type Checking
DESCRIPTION: Example processing Merchandise\_\_c records with polymorphic Owners, using instanceof to check if the Owner is a User or Group before calling specific processing methods.
SOURCE: Apex Developer Guide v64.0 (Page 178)
LANGUAGE: apex
CODE:

```apex
 public static void processOwnersOfMerchandise() {
  // Select records based on the Owner polymorphic relationship field
  List<Merchandise__c> merchandiseList = [SELECT TYPEOF Owner WHEN User THEN LastName
   WHEN Group THEN Email END FROM Merchandise__c];
  // We now have a list of Merchandise__c records owned by either a User or Group
  for (Merchandise__c merch: merchandiseList) {
   // We can use instanceof to check the polymorphic relationship type
   // Note that we have to assign the polymorphic reference to the appropriate
   // sObject type before passing to a method
   if (merch.Owner instanceof User) {
    User userOwner = merch.Owner;
    processUser(userOwner);
   } else if (merch.Owner instanceof Group) {
    Group groupOwner = merch.Owner;
    processGroup(groupOwner);
   }
  }
 }
 // Utility methods assumed to exist:
 // public static void processUser(User theUser) { ... }
 // public static void processGroup(Group theGroup) { ... }
```

---

TITLE: Simple SOQL Bind Variable Example
DESCRIPTION: Shows a simple bind variable ':A.Id' used in the WHERE clause of a SOQL query.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 Account A = new Account(Name='xxx');
 insert A;
 Account B;
 // A simple bind
 B = [SELECT Id FROM Account WHERE Id = :A.Id];
```

---

TITLE: SOQL Bind Variable with Arithmetic
DESCRIPTION: Demonstrates using an arithmetic expression ('x' + 'xx') as a bind variable in a SOQL query.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 // A bind with arithmetic
 B = [SELECT Id FROM Account
  WHERE Name = :('x' + 'xx')];
```

---

TITLE: SOQL Bind Variable with String Expression
DESCRIPTION: Shows using a String method (.substring) on a literal as a bind variable.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 // A bind with expressions
 B = [SELECT Id FROM Account
  WHERE Name = :'XXXX'.substring(0,3)];
```

---

TITLE: SOQL Bind Variable in INCLUDES Clause
DESCRIPTION: Example using a bind variable ':A.TYPE' within an INCLUDES clause (specific to Multiselect Picklists).
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 // A bind with INCLUDES clause (assuming A.TYPE is a valid variable)
 B = [SELECT Id FROM Account WHERE :A.TYPE INCLUDES ('Customer – Direct; Customer – Channel')];
```

---

TITLE: SOQL Bind Variable with Nested Query
DESCRIPTION: Demonstrates using the result of an inner SOQL query as a bind variable in the WHERE clause of an outer query.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 // A bind with an expression that is itself a query result
 B = [SELECT Id FROM Account
  WHERE Name = :[SELECT Name FROM Account
  WHERE Id = :A.Id].Name];
```

---

TITLE: SOQL Bind Variable in Subquery
DESCRIPTION: Shows using a bind variable ':C.Id' within the WHERE clause of a parent-child relationship subquery.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 // Binds in both the parent and aggregate queries
 B = [SELECT Id, (SELECT Id FROM Contacts
  WHERE Id = :C.Id)
  FROM Account
  WHERE Id = :A.Id];
```

---

TITLE: SOQL Bind Variable with LIMIT Clause
DESCRIPTION: Example using an Integer variable ':i' as a bind variable in the LIMIT clause.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 Integer i = 1;
 B = [SELECT Id FROM Account LIMIT :i];
```

---

TITLE: SOQL Bind Variable with OFFSET Clause
DESCRIPTION: Example using an Integer variable ':offsetVal' as a bind variable in the OFFSET clause.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 Integer offsetVal = 10;
 List<Account> offsetList = [SELECT Id FROM Account OFFSET :offsetVal];
```

---

TITLE: SOQL Bind Variable with IN Clause (List of sObjects)
DESCRIPTION: Demonstrates using a List of sObjects (Contacts) as a bind variable in an IN clause; Apex uses the IDs from the list.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 Contact[] cc = [SELECT Id FROM Contact LIMIT 2];
 Task[] tt = [SELECT Id FROM Task WHERE WhoId IN :cc];
```

---

TITLE: SOQL Bind Variable with IN Clause (List of Strings)
DESCRIPTION: Example using a List of Strings as a bind variable in an IN clause.
SOURCE: Apex Developer Guide v64.0 (Page 179)
LANGUAGE: apex
CODE:

```apex
 String[] ss = new String[]{'a', 'b'};
 Account[] aa = [SELECT Id FROM Account
  WHERE AccountNumber IN :ss];
```

---

TITLE: SOSL Bind Variable Example
DESCRIPTION: Shows a SOSL query using multiple bind variables (:myString1, :myString2, :myInt3, :myString4, :myInt5) in various clauses.
SOURCE: Apex Developer Guide v64.0 (Page 180)
LANGUAGE: apex
CODE:

```apex
 String myString1 = 'aaa';
 String myString2 = 'bbb';
 Integer myInt3 = 11;
 String myString4 = 'ccc';
 Integer myInt5 = 22;

 List<List<SObject>> searchList = [FIND :myString1 IN ALL FIELDS
  RETURNING
  Account (Id, Name WHERE Name LIKE :myString2
   LIMIT :myInt3),
  Contact,
  Opportunity,
  Lead
  WITH DIVISION =:myString4
  LIMIT :myInt5];
```

---

TITLE: SOQL Querying All Rows (Including Deleted)
DESCRIPTION: Demonstrates using the ALL ROWS keyword in a SOQL COUNT() query to include records in the recycle bin.
SOURCE: Apex Developer Guide v64.0 (Page 180)
LANGUAGE: apex
CODE:

```apex
 // Assuming 'a' is an Account variable with a valid Id
 System.assertEquals(2, [SELECT COUNT() FROM Contact WHERE AccountId = a.Id ALL ROWS]);
```

---

TITLE: SOQL For Loop Syntax Variations
DESCRIPTION: Shows the two syntax variations for SOQL for loops: iterating over single sObjects or lists (batches) of sObjects.
SOURCE: Apex Developer Guide v64.0 (Page 180)
LANGUAGE: apex
CODE:

```apex
 for (variable : [soql_query]) {
  code_block
 }

 // or

 for (variable_list : [soql_query]) {
  code_block
 }
```

---

TITLE: SOQL For Loop with Bind Variable
DESCRIPTION: Example SOQL for loop using a bind variable ':s' in the WHERE clause.
SOURCE: Apex Developer Guide v64.0 (Page 181)
LANGUAGE: apex
CODE:

```apex
 String s = 'Acme';
 for (Account a : [SELECT Id, Name from Account
  where Name LIKE :(s+'%')]) {
  // Your code
 }
```

---

TITLE: SOQL For Loop for Bulk Update
DESCRIPTION: Combines querying a list of accounts and updating them within a SOQL for loop (list iteration syntax).
SOURCE: Apex Developer Guide v64.0 (Page 181)
LANGUAGE: apex
CODE:

```apex
 // Create a list of account records from a SOQL query
 List<Account> accs = [SELECT Id, Name FROM Account WHERE Name = 'Siebel'];

 // Loop through the list and update the Name field
 for(Account a : accs){
  a.Name = 'Oracle';
 }
 // Update the database
 update accs;
```

---

TITLE: SOQL For Loop (Single sObject Format)
DESCRIPTION: Example demonstrating the single sObject iteration format of a SOQL for loop, counting the number of iterations.
SOURCE: Apex Developer Guide v64.0 (Page 182)
LANGUAGE: apex
CODE:

```apex
 // The single sObject format executes the for loop once per returned record
 Integer i = 0;
 for (Account tmp : [SELECT Id FROM Account WHERE Name = 'yyy']) { // Assuming 3 'yyy' accounts exist
  i++;
 }
 System.assert(i == 3); // Loop executed three times
```

---

TITLE: SOQL For Loop (List Format)
DESCRIPTION: Example demonstrating the sObject list (batch) iteration format of a SOQL for loop, checking batch size and iteration count.
SOURCE: Apex Developer Guide v64.0 (Page 182)
LANGUAGE: apex
CODE:

```apex
 // The sObject list format executes the for loop once per returned batch
 Integer i = 0;
 Integer j;
 for (Account[] tmp : [SELECT Id FROM Account WHERE Name = 'yyy']) { // Assuming 3 'yyy' accounts exist
  j = tmp.size();
  i++;
 }
 System.assert(j == 3); // The list should have contained the three accounts
 System.assert(i == 1); // Loop should have executed only once (for one batch)
```

---

TITLE: QueryException in SOQL For Loop (Too Many Rows)
DESCRIPTION: Code snippet showing a SOQL for loop accessing a child relationship (Contacts) that will throw a QueryException if the child list exceeds 200 records.
SOURCE: Apex Developer Guide v64.0 (Page 182)
LANGUAGE: apex
CODE:

```apex
 for (Account acct : [SELECT Id, Name, (SELECT Id, Name FROM Contacts)
  FROM Account WHERE Id IN ('<ID value>')]) {
  List<Contact> contactList = acct.Contacts; // Causes an error if > 200 contacts
  Integer count = acct.Contacts.size(); // Causes an error if > 200 contacts
 }
```

---

TITLE: Iterating Over Child Records Safely
DESCRIPTION: Recommended approach to avoid QueryException when accessing potentially large child relationship lists: iterate over the child list in a nested loop.
SOURCE: Apex Developer Guide v64.0 (Page 182)
LANGUAGE: apex
CODE:

```apex
 for (Account acct : [SELECT Id, Name, (SELECT Id, Name FROM Contacts)
  FROM Account WHERE Id IN ('<ID value>')]) {
  Integer count=0;
  for (Contact c : acct.Contacts) { // Iterate safely
   count++;
  }
 }
```

---

TITLE: Declaring an Empty List of SObjects
DESCRIPTION: Shows how to declare an empty list variable for Account sObjects.
SOURCE: Apex Developer Guide v64.0 (Page 183)
LANGUAGE: apex
CODE:

```apex
 // Create an empty list of Accounts
 List<Account> myList = new List<Account>();
```

---

TITLE: Populating a List from a SOQL Query
DESCRIPTION: Demonstrates assigning the results of a SOQL query directly to a List<Account> variable.
SOURCE: Apex Developer Guide v64.0 (Page 183)
LANGUAGE: apex
CODE:

```apex
 // Create a list of account records from a SOQL query
 List<Account> accts = [SELECT Id, Name FROM Account LIMIT 1000];
```

---

TITLE: Adding and Retrieving SObject List Elements
DESCRIPTION: Shows adding a newly created Account sObject to a list and retrieving an element by index.
SOURCE: Apex Developer Guide v64.0 (Page 183)
LANGUAGE: apex
CODE:

```apex
 List<Account> myList = new List<Account>(); // Define a new list
 Account a = new Account(Name='Acme'); // Create the account first
 myList.add(a); // Add the account sObject
 Account a2 = myList.get(0); // Retrieve the element at index 0
```

---

TITLE: Bulk Inserting a List of SObjects
DESCRIPTION: Example showing how to add multiple Account sObjects to a list and then perform a bulk insert DML operation on the list.
SOURCE: Apex Developer Guide v64.0 (Page 184)
LANGUAGE: apex
CODE:

```apex
 // Define the list
 List<Account> acctList = new List<Account>();
 // Create account sObjects
 Account a1 = new Account(Name='Account1');
 Account a2 = new Account(Name='Account2');
 // Add accounts to the list
 acctList.add(a1);
 acctList.add(a2);
 // Bulk insert the list
 insert acctList;
```

---

TITLE: ListException on Inserting Duplicate References
DESCRIPTION: Example demonstrating that attempting to insert a list containing multiple references to the _same_ sObject instance throws a ListException.
SOURCE: Apex Developer Guide v64.0 (Page 184)
LANGUAGE: apex
CODE:

```apex
 try {
  // Create a list with two references to the same sObject element
  Account a = new Account();
  List<Account> accs = new List<Account>{a, a};

  // Attempt to insert it...
  insert accs; // Throws ListException

  // Will not get here
  System.assert(false);
 } catch (ListException e) {
  // But will get here
 }
```

---

TITLE: Declaring SObject Array
DESCRIPTION: Shows declaring a list (array) of Accounts using array notation.
SOURCE: Apex Developer Guide v64.0 (Page 184)
LANGUAGE: apex
CODE:

```apex
 Account[] accts = new Account[1];
```

---

TITLE: Adding Element to SObject Array
DESCRIPTION: Shows adding an Account object to a list (declared as an array) using index notation.
SOURCE: Apex Developer Guide v64.0 (Page 184)
LANGUAGE: apex
CODE:

```apex
 accts[0] = new Account(Name='Acme2');
```

---

TITLE: SObject List Initialization Examples (Array Notation)
DESCRIPTION: Examples using array notation to initialize Account lists: empty, with allocated memory including nulls, and from another list.
SOURCE: Apex Developer Guide v64.0 (Page 185)
LANGUAGE: apex
CODE:

```apex
 // Defines an Account list with no elements.
 List<Account> accts = new Account[]{};

 // Defines an Account list with memory allocated for three Accounts:
 // a new Account object in the first position, null in the second,
 // and another new Account object in the third.
 List<Account> accts = new Account[]
  {new Account(), null, new Account()};

 // Defines the Contact list with a new list (assuming otherList is a List<Contact>).
 List<Contact> contacts = new List<Contact>(otherList);
```

---

TITLE: Adding Accounts with Same Name to a Set
DESCRIPTION: Demonstrates that adding two Account objects with identical fields (only Name set) to a Set results in only one element being stored due to field comparison for uniqueness.
SOURCE: Apex Developer Guide v64.0 (Page 190)
LANGUAGE: apex
CODE:

```apex
 // Create two accounts, a1 and a2
 Account a1 = new account(name='MyAccount');
 Account a2 = new account(name='MyAccount');

 // Add both accounts to the new set
 Set<Account> accountSet = new Set<Account>{a1, a2};

 // Verify that the set only contains one item
 System.assertEquals(accountSet.size(), 1);
```

---

TITLE: Adding Accounts with Different Fields to a Set
DESCRIPTION: Shows that adding two Account objects with the same Name but different Description fields to a Set results in both elements being stored.
SOURCE: Apex Developer Guide v64.0 (Page 190)
LANGUAGE: apex
CODE:

```apex
 // Create two accounts, a1 and a2, and add a description to a2
 Account a1 = new account(name='MyAccount');
 Account a2 = new account(name='MyAccount', description='My test account');

 // Add both accounts to the new set
 Set<Account> accountSet = new Set<Account>{a1, a2};

 // Verify that the set contains two items
 System.assertEquals(accountSet.size(), 2);
```

---

TITLE: Map Declaration (ID to Account)
DESCRIPTION: Example declaring a Map where keys are IDs and values are Account sObjects.
SOURCE: Apex Developer Guide v64.0 (Page 191)
LANGUAGE: apex
CODE:

```apex
 Map<ID, Account> m = new Map<ID, Account>();
```

---

TITLE: Map Initialization (Integer to List<Account>)
DESCRIPTION: Example initializing a Map where keys are Integers and values are Lists of Accounts, using curly brace syntax.
SOURCE: Apex Developer Guide v64.0 (Page 191)
LANGUAGE: apex
CODE:

```apex
 Account[] accs = new Account[5]; // Account[] is synonymous with List<Account>
 Map<Integer, List<Account>> m4 = new Map<Integer, List<Account>>{1 => accs};
```

---

TITLE: Auto-Populating Map from SOQL Query
DESCRIPTION: Demonstrates creating a Map<ID, Account> directly from the results of a SOQL query and iterating through it.
SOURCE: Apex Developer Guide v64.0 (Page 191)
LANGUAGE: apex
CODE:

```apex
 // Populate map from SOQL query
 Map<ID, Account> m = new Map<ID, Account>([SELECT Id, Name FROM Account LIMIT 10]);
 // After populating the map, iterate through the map entries
 for (ID idKey : m.keyset()) {
  Account a = m.get(idKey);
  System.debug(a);
 }
```

---

TITLE: Retrieving Value from SObject Map Key Before Insert
DESCRIPTION: Shows successfully retrieving a value from a map using an sObject key _before_ the sObject has been inserted (and its ID autofilled).
SOURCE: Apex Developer Guide v64.0 (Page 192)
LANGUAGE: apex
CODE:

```apex
 // Create an account and add it to the map
 Account a1 = new Account(Name='A1');
 Map<sObject, Integer> m = new Map<sObject, Integer>{ a1 => 1};

 // Get a1's value from the map. Returns the value of 1.
 System.assertEquals(1, m.get(a1));
 // Id field is null before insert.
 System.assertEquals(null, a1.Id);
```

---

TITLE: Failing to Retrieve Value from SObject Map Key After Insert
DESCRIPTION: Demonstrates that attempting to retrieve a value using an sObject key _after_ it has been inserted fails (returns null) because the sObject's ID field was autofilled, changing its state.
SOURCE: Apex Developer Guide v64.0 (Page 192)
LANGUAGE: apex
CODE:

```apex
 // Assuming a1 and m from previous example...
 // Insert a1. This causes the ID field on a1 to be auto-filled
 insert a1;
 // Id field is now populated.
 System.assertNotEquals(null, a1.Id);

 // Get a1's value from the map again. Returns null.
 System.assertEquals(null, m.get(a1));
```

---

TITLE: Describing SObjects Using Tokens vs Describe Results
DESCRIPTION: Contrasting code snippets showing how to get sObject describe information using lightweight tokens versus describe result objects.
SOURCE: Apex Developer Guide v64.0 (Page 194)
LANGUAGE: apex
CODE:

```apex
 // Using Tokens for Type Checking
 sObject s = new Account();
 System.assert(s.getsObjectType() == Account.sObjectType);

 // Getting Describe Result from Token
 Schema.DescribeSObjectResult dsr = Account.sObjectType.getDescribe();

 // Getting Token from Describe Result (Illustrative - Requires dsr from above)
 // Schema.SObjectType token = dsr.getSObjectType();

 // Getting Field Describe Result using Token
 Schema.DescribeFieldResult dfr = Schema.sObjectType.Account.fields.Name;

 // Getting Field Token from Field Describe Result
 // Schema.SObjectField fieldToken = dfr.getSObjectField();

 // Getting Field Describe Result from Field Token
 dfr = dfr.getSObjectField().getDescribe();
```

---

TITLE: Getting SObject Token Examples
DESCRIPTION: Shows various ways to obtain an sObject token (Schema.SObjectType), including from a class name, an instance variable, and a list.
SOURCE: Apex Developer Guide v64.0 (Page 195)
LANGUAGE: apex
CODE:

```apex
 // From class name
 Schema.sObjectType t = Account.sObjectType;

 // From instance variable
 Account a = new Account();
 Schema.sObjectType t = a.getSObjectType();

 // From list variable
 List<sObject> sobjList = new Account[]{};
 System.assertEquals(sobjList.getSObjectType(), Account.sObjectType);
```

---

TITLE: Getting SObject Describe Result Examples
DESCRIPTION: Shows getting an sObject describe result (Schema.DescribeSObjectResult) from an sObject token and directly from the Schema class.
SOURCE: Apex Developer Guide v64.0 (Page 195)
LANGUAGE: apex
CODE:

```apex
 // From token
 Schema.DescribeSObjectResult dsr = Account.sObjectType.getDescribe();

 // From Schema class static member
 Schema.DescribeSObjectResult dsr = Schema.SObjectType.Account;
```

---

TITLE: Getting Field Token Examples
DESCRIPTION: Shows getting a field token (Schema.SObjectField) from a static reference and from a field describe result.
SOURCE: Apex Developer Guide v64.0 (Page 196)
LANGUAGE: apex
CODE:

```apex
 // Static reference
 Schema.SObjectField fieldToken = Account.Description;

 // From describe result
 // Schema.DescribeFieldResult dfr = ... ;
 // Schema.SObjectField fieldToken = dfr.getSObjectField();
```

---

TITLE: Getting Field Describe Result Examples
DESCRIPTION: Shows getting a field describe result (Schema.DescribeFieldResult) from a field token and using the 'fields' member variable syntax.
SOURCE: Apex Developer Guide v64.0 (Page 196)
LANGUAGE: apex
CODE:

```apex
 // From token
 Schema.DescribeFieldResult dfr = Account.Description.getDescribe();

 // Using 'fields' member variable
 Schema.DescribeFieldResult dfr = Schema.SObjectType.Account.fields.Name;
```

---

TITLE: Getting Map of All Field Tokens for an SObject
DESCRIPTION: Demonstrates using the getMap() method on the 'fields' member variable to retrieve a map of all field names to field tokens for the Account object.
SOURCE: Apex Developer Guide v64.0 (Page 196)
LANGUAGE: apex
CODE:

```apex
 Map<String, Schema.SObjectField> fieldMap = Schema.SObjectType.Account.fields.getMap();
```

---

TITLE: Describing Multiple SObjects using Schema Method
DESCRIPTION: Example using Schema.describeSObjects to get describe results for Account and a custom object (Merchandise\_\_c) and accessing properties like label, field count, and child relationships.
SOURCE: Apex Developer Guide v64.0 (Page 198)
LANGUAGE: apex
CODE:

```apex
 // sObject types to describe
 String[] types = new String[]{'Account','Merchandise__c'};

 // Make the describe call
 Schema.DescribeSobjectResult[] results = Schema.describeSObjects(types);

 System.debug('Got describe information for ' + results.size() + ' sObjects.');

 // For each returned result, get some info
 for(Schema.DescribeSobjectResult res : results) {
  System.debug('sObject Label: ' + res.getLabel());
  System.debug('Number of fields: ' + res.fields.getMap().size());
  System.debug(res.isCustom() ? 'This is a custom object.' : 'This is a standard object.');

  // Get child relationships
  Schema.ChildRelationship[] rels = res.getChildRelationships();
  if (rels.size() > 0) {
   System.debug(res.getName() + ' has ' + rels.size() + ' child relationships.');
  }
 }
```

---

TITLE: Describing Tabs using Schema Methods
DESCRIPTION: Example retrieving tab set descriptions using Schema.describeTabs() and then iterating through tabs for a specific app ('Sales') to get individual tab details.
SOURCE: Apex Developer Guide v64.0 (Page 198)
LANGUAGE: apex
CODE:

```apex
 // Get tab set describes for each app
 List<Schema.DescribeTabSetResult> tabSetDesc = Schema.describeTabs();

 // Iterate through each tab set describe for each app and display the info
 for(DescribeTabSetResult tsr : tabSetDesc) {
  String appLabel = tsr.getLabel();
  System.debug('Label: ' + appLabel);
  System.debug('Logo URL: ' + tsr.getLogoUrl());
  System.debug('isSelected: ' + tsr.isSelected());
  String ns = tsr.getNamespace();
  if (ns == '') {
   System.debug('The ' + appLabel + ' app has no namespace defined.');
  }
  else {
   System.debug('Namespace: ' + ns);
  }
  // Display tab info for the Sales app
  if (appLabel == 'Sales') {
   List<Schema.DescribeTabResult> tabDesc = tsr.getTabs();
   System.debug('-- Tab information for the Sales app --');
   for(Schema.DescribeTabResult tr : tabDesc) {
    System.debug('getLabel: ' + tr.getLabel());
    System.debug('getColors: ' + tr.getColors());
    System.debug('getIconUrl: ' + tr.getIconUrl());
    System.debug('getIcons: ' + tr.getIcons());
    System.debug('getMiniIconUrl: ' + tr.getMiniIconUrl());
    System.debug('getSobjectName: ' + tr.getSobjectName());
    System.debug('getUrl: ' + tr.getUrl());
    System.debug('isCustom: ' + tr.isCustom());
   }
  }
 }
```

---

TITLE: Getting Global Describe Map
DESCRIPTION: Shows using Schema.getGlobalDescribe() to get a map of all sObject names (keys) to sObject tokens (values) accessible in the org.
SOURCE: Apex Developer Guide v64.0 (Page 200)
LANGUAGE: apex
CODE:

```apex
 Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe();
```

---

TITLE: Describing Data Category Groups Example
DESCRIPTION: Demonstrates retrieving data category groups associated with specific sObject types (KnowledgeArticleVersion, Question).
SOURCE: Apex Developer Guide v64.0 (Page 201)
LANGUAGE: apex
CODE:

```apex
 public class DescribeDataCategoryGroupSample {
  public static List<DescribeDataCategoryGroupResult> describeDataCategoryGroupSample(){
   List<DescribeDataCategoryGroupResult> describeCategoryResult;
   try {
    //Creating the list of sobjects to use for the describe call
    List<String> objType = new List<String>();
    objType.add('KnowledgeArticleVersion');
    objType.add('Question');
    //Describe Call
    describeCategoryResult = Schema.describeDataCategoryGroups(objType);
    //Using the results and retrieving the information
    for(DescribeDataCategoryGroupResult singleResult : describeCategoryResult){
     singleResult.getName(); //Getting the name of the category
     singleResult.getLabel(); //Getting the name of label
     singleResult.getDescription(); //Getting description
     singleResult.getSobject(); //Getting the sobject
    }
   } catch(Exception e){
   }
   return describeCategoryResult;
  }
 }
```

---

TITLE: Describing Data Category Group Structures Example
DESCRIPTION: Example retrieving the category structure (including top-level and child categories) for specific object-group pairs.
SOURCE: Apex Developer Guide v64.0 (Page 201)
LANGUAGE: apex
CODE:

```apex
 public class DescribeDataCategoryGroupStructures {
  public static List<DescribeDataCategoryGroupStructureResult> getDescribeDataCategoryGroupStructureResults(){
   List<DescribeDataCategoryGroupResult> describeCategoryResult;
   List<DescribeDataCategoryGroupStructureResult> describeCategoryStructureResult;
   try {
    // Get associated category groups first
    List<String> objType = new List<String>();
    objType.add('KnowledgeArticleVersion');
    objType.add('Question');
    describeCategoryResult = Schema.describeDataCategoryGroups(objType);

    // Create pairs for the structure describe call
    List<DataCategoryGroupSobjectTypePair> pairs = new List<DataCategoryGroupSobjectTypePair>();
    for(DescribeDataCategoryGroupResult singleResult : describeCategoryResult){
     DataCategoryGroupSobjectTypePair p = new DataCategoryGroupSobjectTypePair();
     p.setSobject(singleResult.getSobject());
     p.setDataCategoryGroupName(singleResult.getName());
     pairs.add(p);
    }

    // Describe Category Group Structures call
    describeCategoryStructureResult = Schema.describeDataCategoryGroupStructures(pairs, false);

    // Process the results
    for(DescribeDataCategoryGroupStructureResult singleResult : describeCategoryStructureResult){
     singleResult.getSobject(); // Get associated Sobject
     singleResult.getName(); // Get data category group name
     singleResult.getLabel(); // Get data category group label
     singleResult.getDescription(); // Get data category group description
     DataCategory [] toplevelCategories = singleResult.getTopCategories(); // Get top-level categories
     // Recursively get all categories if needed (using hypothetical getAllCategories method)
     // List<DataCategory> allCategories = getAllCategories(toplevelCategories);
     // for(DataCategory category : allCategories) { ... }
    }
   } catch (Exception e){
   }
   return describeCategoryStructureResult;
  }
  // Assumed helper method for recursion (not fully shown in source)
  private static DataCategory[] getAllCategories(DataCategory [] categories){
    // Recursive logic here...
    return new DataCategory[]{}; // Placeholder
  }
 }
```

---

TITLE: Testing Data Category Group Sample Method
DESCRIPTION: Test method validating the output of the describeDataCategoryGroupSample method, assuming specific category groups exist.
SOURCE: Apex Developer Guide v64.0 (Page 203)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class DescribeDataCategoryGroupSampleTest {
  public static testMethod void describeDataCategoryGroupSampleTest(){
   List<DescribeDataCategoryGroupResult>describeResult =
    DescribeDataCategoryGroupSample.describeDataCategoryGroupSample();

   //Assuming that you have KnowledgeArticleVersion and Questions
   //associated with only one category group 'Regions'.
   System.assert(describeResult.size() == 2,
    'The results should only contain two results: ' + describeResult.size());

   for(DescribeDataCategoryGroupResult result : describeResult) {
    // Assertions for name, label, description, sobject
    System.assert(result.getName() == 'Regions', 'Incorrect name was returned: ' + result.getName());
    // ... other assertions
   }
  }
 }
```

---

TITLE: Testing Data Category Group Structures Method
DESCRIPTION: Test method validating the output of the getDescribeDataCategoryGroupStructureResults method.
SOURCE: Apex Developer Guide v64.0 (Page 204)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class DescribeDataCategoryGroupStructuresTest {
  public static testMethod void getDescribeDataCategoryGroupStructureResultsTest(){
   List<Schema.DescribeDataCategoryGroupStructureResult> describeResult =
    DescribeDataCategoryGroupStructures.getDescribeDataCategoryGroupStructureResults();

   System.assert(describeResult.size() == 2, 'The results should only contain 2 results: ' + describeResult.size());

   // ... (Setup category info - not shown in source) ...

   for (Schema.DescribeDataCategoryGroupStructureResult result : describeResult) {
    // Assertions for name, label, description, sobject
    System.assert(result.getName() == 'Regions', 'Incorrect name was returned: ' + result.getName());
    // ... other assertions

    DataCategory [] topLevelCategories = result.getTopCategories();
    System.assert(topLevelCategories.size() == 1, 'Incorrect number of top level categories returned: ' + topLevelCategories.size());
    // ... assertions comparing topLevelCategories with expected CategoryInfo ...

    DataCategory [] children = topLevelCategories[0].getChildCategories();
    System.assert(children.size() == 4, 'Incorrect number of children returned: ' + children.size());
    // ... assertions comparing children with expected CategoryInfo ...
   }
  }
  // Helper class CategoryInfo assumed from context (not fully shown)
  // private class CategoryInfo { ... }
 }
```

---

TITLE: Dynamic SOQL Query Examples (Single Record and List)
DESCRIPTION: Shows using Database.query() to execute a dynamic SOQL string, returning either a single sObject or a List<sObject>.
SOURCE: Apex Developer Guide v64.0 (Page 205)
LANGUAGE: apex
CODE:

```apex
 // Return single sObject
 sObject s = Database.query(string);

 // Return list of sObjects
 List<sObject> sobjList = Database.query(string);
```

---

TITLE: Dynamic SOQL Query with Bind Variables Map
DESCRIPTION: Demonstrates using Database.queryWithBinds() to execute a dynamic SOQL string, passing bind variables via a Map.
SOURCE: Apex Developer Guide v64.0 (Page 205)
LANGUAGE: apex
CODE:

```apex
 List<sObject> sobjList = Database.queryWithBinds(string, bindVariablesMap, accessLevel);
```

---

TITLE: Dynamic SOQL with Simple Bind Variable
DESCRIPTION: Example using Database.query with a simple bind variable ':myTestString' resolved from an Apex variable.
SOURCE: Apex Developer Guide v64.0 (Page 206)
LANGUAGE: apex
CODE:

```apex
 String myTestString = 'TestName';
 List<sObject> sobjList = Database.query('SELECT Id FROM MyCustomObject__c WHERE Name = :myTestString');
```

---

TITLE: Dynamic SOQL Resolving Bind Variable Field to String
DESCRIPTION: Demonstrates resolving a variable's field into a String variable before using it as a simple bind variable in Database.query.
SOURCE: Apex Developer Guide v64.0 (Page 206)
LANGUAGE: apex
CODE:

```apex
 // MyCustomObject__c myVariable = new MyCustomObject__c(field1__c ='TestField'); // From context
 String resolvedField1 = myVariable.field1__c;
 List<sObject> sobjList = Database.query('SELECT Id FROM MyCustomObject__c WHERE field1__c = :resolvedField1');
```

---

TITLE: Dynamic SOQL using queryWithBinds Example
DESCRIPTION: Shows using Database.queryWithBinds to execute a query with a bind variable (:acctName) whose value is supplied by a Map.
SOURCE: Apex Developer Guide v64.0 (Page 206)
LANGUAGE: apex
CODE:

```apex
 Map<String, Object> acctBinds = new Map<String, Object>{'acctName' => 'Acme Corporation'};
 List<Account> accts =
  Database.queryWithBinds('SELECT Id FROM Account WHERE Name = :acctName',
   acctBinds,
   AccessLevel.USER_MODE);
```

---

TITLE: Dynamic SOSL Query Example
DESCRIPTION: Demonstrates executing a dynamic SOSL query string using search.query().
SOURCE: Apex Developer Guide v64.0 (Page 207)
LANGUAGE: apex
CODE:

```apex
 String searchquery='FIND\'Edge*\'IN ALL FIELDS RETURNING Account(id,name),Contact, Lead';
 List<List<SObject>>searchList=search.query(searchquery);
```

---

TITLE: Dynamic SOSL Query with WITH SNIPPET Clause
DESCRIPTION: Example using Search.find() to execute a dynamic SOSL query including WITH SNIPPET and processing the results.
SOURCE: Apex Developer Guide v64.0 (Page 208)
LANGUAGE: apex
CODE:

```apex
 Search.SearchResults searchResults = Search.find('FIND \'test\' IN ALL FIELDS RETURNING KnowledgeArticleVersion(id, title WHERE PublishStatus = \'Online\' AND Language = \'en_US\') WITH SNIPPET (target_length=120)');

 List<Search.SearchResult> articlelist = searchResults.get('KnowledgeArticleVersion');

 for (Search.SearchResult searchResult : articleList) {
  KnowledgeArticleVersion article = (KnowledgeArticleVersion) searchResult.getSObject();
  System.debug(article.Title);
  System.debug(searchResult.getSnippet());
 }
```

---

TITLE: Dynamic SObject Creation using Token
DESCRIPTION: Shows creating a new Account sObject dynamically using its SObjectType token obtained via Schema.getGlobalDescribe().
SOURCE: Apex Developer Guide v64.0 (Page 209)
LANGUAGE: apex
CODE:

```apex
 public class DynamicSObjectCreation {
  public static sObject createObject(String typeName) {
   Schema.SObjectType targetType = Schema.getGlobalDescribe().get(typeName);
   if (targetType == null) {
    // throw an exception or handle error
    return null;
   }
   // Instantiate an sObject with the type passed in as an argument
   return targetType.newSObject();
  }
 }
```

---

TITLE: Test Method for Dynamic SObject Creation
DESCRIPTION: Test method verifying the dynamic sObject creation by calling createObject and asserting the type and successful insertion.
SOURCE: Apex Developer Guide v64.0 (Page 209)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class DynamicSObjectCreationTest {
  static testmethod void testObjectCreation() {
   String typeName = 'Account';
   String acctName = 'Acme';

   // Create a new sObject by passing the sObject type as an argument.
   Account a = (Account)DynamicSObjectCreation.createObject(typeName);
   System.assertEquals(typeName, String.valueOf(a.getSobjectType()));
   // Set the account name and insert the account.
   a.Name = acctName;
   insert a;
   // Verify the new sObject got inserted.
   Account[] b = [SELECT Name from Account WHERE Name = :acctName];
   system.assert(b.size() > 0);
  }
 }
```

---

TITLE: Setting/Retrieving Field Values Dynamically (API Name)
DESCRIPTION: Shows using get() and put() with the field API name (String) to dynamically access sObject field values.
SOURCE: Apex Developer Guide v64.0 (Page 210)
LANGUAGE: apex
CODE:

```apex
 SObject s = [SELECT AccountNumber FROM Account LIMIT 1];
 Object o = s.get('AccountNumber');
 s.put('AccountNumber', 'abc');
```

---

TITLE: Setting Field Value Dynamically (Field Token)
DESCRIPTION: Demonstrates using put() with a field token (Schema.SObjectField) to set an sObject field value dynamically.
SOURCE: Apex Developer Guide v64.0 (Page 210)
LANGUAGE: apex
CODE:

```apex
 Schema.DescribeFieldResult dfr = Schema.sObjectType.Account.fields.AccountNumber;
 Sobject s = Database.query('SELECT AccountNumber FROM Account LIMIT 1');
 s.put(dfr.getsObjectField(), '12345');
```

---

TITLE: Accessing Related SObject Dynamically
DESCRIPTION: Example using getSObject() to retrieve the related Account record from a Contact queried dynamically.
SOURCE: Apex Developer Guide v64.0 (Page 210)
LANGUAGE: apex
CODE:

```apex
 SObject c = Database.query('SELECT Id, FirstName, AccountId, Account.Name FROM Contact LIMIT 1');
 SObject a = c.getSObject('Account');
```

---

TITLE: Creating Related Records Dynamically via External ID
DESCRIPTION: Shows inserting a custom object C1**c related to C2**c by setting the relationship field C2**r to a new C2**c instance containing only the external ID (Name field used as external ID here).
SOURCE: Apex Developer Guide v64.0 (Page 210)
LANGUAGE: apex
CODE:

```apex
 // Assumes C2__c.Name is an External ID field
 insert new C1__c(Name = 'x', C2__r = new C2__c(Name = 'AW Computing'));
```

---

TITLE: Accessing Parent-Child Query Results Dynamically
DESCRIPTION: Demonstrates querying accounts with related contacts and dynamically accessing parent fields and child records using get() and getSObjects().
SOURCE: Apex Developer Guide v64.0 (Page 210)
LANGUAGE: apex
CODE:

```apex
 String queryString = 'SELECT Id, Name, ' +
  '(SELECT FirstName, LastName FROM Contacts LIMIT 1) FROM Account';
 SObject[] queryParentObject = Database.query(queryString);

 for (SObject parentRecord : queryParentObject){
  Object ParentFieldValue = parentRecord.get('Name');
  // Prevent a null relationship from being accessed
  SObject[] childRecordsFromParent = parentRecord.getSObjects('Contacts');
  if (childRecordsFromParent != null) {
   for (SObject childRecord : childRecordsFromParent){
    Object ChildFieldValue1 = childRecord.get('FirstName');
    Object ChildFieldValue2 = childRecord.get('LastName');
    System.debug('Account Name: ' + ParentFieldValue +
     '. Contact Name: '+ ChildFieldValue1 + ' ' + ChildFieldValue2);
   }
  }
 }
```

---

TITLE: Checking Update Permissions Dynamically
DESCRIPTION: Example using Schema.sObjectType.Contact.fields.Email.isUpdateable() to check field-level security before attempting an update.
SOURCE: Apex Developer Guide v64.0 (Page 214)
LANGUAGE: apex
CODE:

```apex
 if (Schema.sObjectType.Contact.fields.Email.isUpdateable()) {
  // Update contact logic here...
 }
```

---

TITLE: Checking Create Permissions Dynamically
DESCRIPTION: Example using Schema.sObjectType.Contact.fields.Email.isCreateable() to check field-level security before creating a new contact with an email.
SOURCE: Apex Developer Guide v64.0 (Page 214)
LANGUAGE: apex
CODE:

```apex
 if (Schema.sObjectType.Contact.fields.Email.isCreateable()) {
  // Create new contact logic here...
 }
```

---

TITLE: Checking Read Permissions Dynamically
DESCRIPTION: Example using Schema.sObjectType.Contact.fields.Email.isAccessible() to check field-level security before querying the email field.
SOURCE: Apex Developer Guide v64.0 (Page 214)
LANGUAGE: apex
CODE:

```apex
 if (Schema.sObjectType.Contact.fields.Email.isAccessible()) {
  Contact c = [SELECT Email FROM Contact WHERE Id= :Id];
  // Process contact email...
 }
```

---

TITLE: Checking Delete Permissions Dynamically
DESCRIPTION: Example using Schema.sObjectType.Contact.isDeletable() to check object-level security before attempting to delete a contact.
SOURCE: Apex Developer Guide v64.0 (Page 214)
LANGUAGE: apex
CODE:

```apex
 if (Schema.sObjectType.Contact.isDeletable()) {
  // Delete contact logic here...
 }
```

---

TITLE: Database Operation in User Mode (Insert)
DESCRIPTION: Example inserting a new Account record explicitly in user mode using 'insert as user'.
SOURCE: Apex Developer Guide v64.0 (Page 215)
LANGUAGE: apex
CODE:

```apex
 Account acc = new Account(Name='test');
 insert as user acc;
```

---

TITLE: Database Operation with Permission Set Check
DESCRIPTION: Example inserting an Account using Database.insert with a specific permission set ID to augment user permissions (Developer Preview feature).
SOURCE: Apex Developer Guide v64.0 (Page 216)
LANGUAGE: apex
CODE:

```apex
 @isTest
 public with sharing class ElevateUserModeOperations_Test {
  @isTest
  static void objectCreatePermViaPermissionSet() {
   // ... (User and Profile setup) ...
   System.runAs(u) {
    try {
     // Fails without elevated permission
     Database.insert(new Account(name='foo'), AccessLevel.User_mode);
     Assert.fail('SecurityException expected');
    } catch (SecurityException ex) {
     Assert.isTrue(ex.getMessage().contains('Account'));
    }

    //Get ID of permission set
    Id permissionSetId = [Select Id from PermissionSet where Name = 'AllowCreateToAccount' limit 1].Id;

    // Succeeds with permission set augmentation
    Database.insert(new Account(name='foo'), AccessLevel.User_mode.withPermissionSetId(permissionSetId));

    // Verify elevation is not persisted
    try {
     Database.insert(new Account(name='foo2'), AccessLevel.User_mode);
     Assert.fail('SecurityException expected');
    } catch (SecurityException ex) {
     Assert.isTrue(ex.getMessage().contains('Account'));
    }
   }
  }
 }
```

---

TITLE: Using stripInaccessible to Check Field Access
DESCRIPTION: Demonstrates using Security.stripInaccessible and SObject.isSet() to check if a field was removed due to FLS before accessing it.
SOURCE: Apex Developer Guide v64.0 (Page 217)
LANGUAGE: apex
CODE:

```apex
 // Assume sourceRecords is a List<Contact> from a query
 SObjectAccessDecision securityDecision = Security.stripInaccessible(AccessType.READABLE, sourceRecords);
 Contact c = (Contact) securityDecision.getRecords()[0]; // Cast needed if using specific type
 System.debug(c.isSet('social_security_number__c')); // prints "false" if field was inaccessible
```

---

TITLE: Using stripInaccessible for Safe Query Result Display
DESCRIPTION: Example removing inaccessible fields (ActualCost) from Campaign query results before displaying potentially sensitive data.
SOURCE: Apex Developer Guide v64.0 (Page 217)
LANGUAGE: apex
CODE:

```apex
 SObjectAccessDecision securityDecision =
  Security.stripInaccessible(AccessType.READABLE,
   [SELECT Name, BudgetedCost, ActualCost FROM Campaign]
  );

 // Construct the output table
 if (securityDecision.getRemovedFields().get('Campaign').contains('ActualCost')) {
  for (Campaign c : (List<Campaign>) securityDecision.getRecords()) {
   //System.debug Output: Name, BudgetedCost
  }
 } else {
  for (Campaign c : (List<Campaign>) securityDecision.getRecords()) {
   //System.debug Output: Name, BudgetedCost, ActualCost
  }
 }
```

---

TITLE: Using stripInaccessible on Subquery Results
DESCRIPTION: Shows stripping inaccessible fields from both parent (Account) and child (Contact) records returned by a query with a subquery.
SOURCE: Apex Developer Guide v64.0 (Page 218)
LANGUAGE: apex
CODE:

```apex
 List<Account> accountsWithContacts =
  [SELECT Id, Name, Phone,
   (SELECT Id, LastName, Phone FROM Account.Contacts)
   FROM Account];

 // Strip fields that are not readable
 SObjectAccessDecision decision = Security.stripInaccessible(
  AccessType.READABLE,
  accountsWithContacts);

 // Print stripped records vs insecure records
 for (Integer i = 0; i < accountsWithContacts.size(); i++) {
  System.debug('Insecure record access: '+accountsWithContacts[i]);
  System.debug('Secure record access: '+decision.getRecords()[i]);
 }
 // Print modified indexes and removed fields
 System.debug('Records modified by stripInaccessible: '+decision.getModifiedIndexes());
 System.debug('Fields removed by stripInaccessible: '+decision.getRemovedFields());
```

---

TITLE: Using stripInaccessible Before DML (Create)
DESCRIPTION: Example stripping inaccessible fields (Rating) from new Account records before an insert DML operation to prevent exceptions.
SOURCE: Apex Developer Guide v64.0 (Page 218)
LANGUAGE: apex
CODE:

```apex
 List<Account> newAccounts = new List<Account>();
 Account a = new Account(Name='Acme Corporation');
 Account b = new Account(Name='Blaze Comics', Rating=’Warm’); // Assume user cannot create Rating
 newAccounts.add(a);
 newAccounts.add(b);

 SObjectAccessDecision securityDecision = Security.stripInaccessible(
  AccessType.CREATABLE, newAccounts);

 // No exceptions are thrown and no rating is set
 insert securityDecision.getRecords();

 System.debug(securityDecision.getRemovedFields().get('Account')); // Prints "Rating"
 System.debug(securityDecision.getModifiedIndexes()); // Prints "1"
```

---

TITLE: Using stripInaccessible Before DML (Update with Deserialized Data)
DESCRIPTION: Example sanitizing potentially untrusted deserialized JSON data by stripping inaccessible fields before an update operation.
SOURCE: Apex Developer Guide v64.0 (Page 219)
LANGUAGE: apex
CODE:

```apex
 String jsonInput =
  '[' +
  ' {' +
  '  "Name": "InGen",' +
  '  "AnnualRevenue": "100"' + // Assume user cannot update AnnualRevenue
  ' },' +
  ' {' +
  '  "Name": "Octan"' +
  ' }' +
  ']';

 List<Account> accounts = (List<Account>)JSON.deserializeStrict(jsonInput, List<Account>.class);
 SObjectAccessDecision securityDecision = Security.stripInaccessible(
  AccessType.UPDATABLE, accounts);

 // Secure update - doesn't update AnnualRevenue field
 update securityDecision.getRecords();

 System.debug(String.join(securityDecision.getRemovedFields().get('Account'), ', ')); // Prints "AnnualRevenue"
 System.debug(String.join(securityDecision.getModifiedIndexes(), ', ')); // Prints "0”
```

---

TITLE: Using stripInaccessible with Lookup Fields
DESCRIPTION: Test method example showing stripInaccessible removing a lookup field (Account\_\_c) if the user lacks read permission.
SOURCE: Apex Developer Guide v64.0 (Page 219)
LANGUAGE: apex
CODE:

```apex
 @IsTest
 public class TestCustomObjectLookupStripped {
  @IsTest static void caseCustomObjectStripped() {
   Account a = new Account(Name='foo');
   insert a;
   List<MyCustomObject__c> records = new List<MyCustomObject__c>{
    new MyCustomObject__c(Name='Custom0', Account__c=a.id) // Assume user cannot read Account__c
   };
   insert records;
   records = [SELECT Id, Account__c FROM MyCustomObject__c];
   SObjectAccessDecision securityDecision = Security.stripInaccessible
    (AccessType.READABLE, records);

   // Verify stripped records
   System.assertEquals(1, securityDecision.getRecords().size());
   for (SObject strippedRecord : securityDecision.getRecords()) {
    System.debug('Id should be set: ' + strippedRecord.isSet('Id')); // prints true
    System.debug('Lookup field should not be set: ' + strippedRecord.isSet('Account__c')); // prints false
   }
  }
 }
```

---

TITLE: Query with WITH SECURITY_ENFORCED
DESCRIPTION: Example SOQL query using WITH SECURITY_ENFORCED to enforce field-level security on returned fields (Id, LastName) and relationship fields (Contacts).
SOURCE: Apex Developer Guide v64.0 (Page 220)
LANGUAGE: apex
CODE:

```apex
 List<Account> act1 = [SELECT Id, (SELECT LastName FROM Contacts)
  FROM Account WHERE Name like 'Acme' WITH SECURITY_ENFORCED]
```

---

TITLE: Sharing Context Example (CWith and CWithout)
DESCRIPTION: Demonstrates how calling methods between classes declared with 'with sharing' and 'without sharing' affects the execution context and sharing rule enforcement.
SOURCE: Apex Developer Guide v64.0 (Page 212)
LANGUAGE: apex
CODE:

```apex
 public with sharing class CWith {
  public static void m() { /* ... */ }
  // ... other members
 }

 public without sharing class CWithout {
  public static void m() {
   // This call into CWith operates with enforced sharing rules
   // for the context user. When the call finishes, the code execution
   // returns to without sharing mode.
   CWith.m();
  }
  // ... other members/inner classes
 }
```

---

TITLE: Query in User Mode
DESCRIPTION: Example SOQL query explicitly run in user mode using WITH USER_MODE.
SOURCE: Apex Developer Guide v64.0 (Page 214)
LANGUAGE: apex
CODE:

```apex
 List<Account> acc = [SELECT Id FROM Account WITH USER_MODE];
```

---

TITLE: Database Insert in User Mode Example
DESCRIPTION: Example using 'insert as user' syntax to perform a DML insert operation in user mode.
SOURCE: Apex Developer Guide v64.0 (Page 215)
LANGUAGE: apex
CODE:

```apex
 Account acc = new Account(Name='test');
 insert as user acc;
```

---

TITLE: Database Insert with AccessLevel Parameter
DESCRIPTION: Example using Database.insert with the AccessLevel.USER_MODE parameter to perform the DML operation in user mode.
SOURCE: Apex Developer Guide v64.0 (Page 215)
LANGUAGE: apex
CODE:

```apex
 try {
  List<Account> accts = new Account[] {new Account(name ='foo', AnnualRevenue=2000)};
  // Assuming user cannot edit AnnualRevenue
  Database.insert(accts, AccessLevel.USER_MODE); // throws DmlException
  Assert.fail('DmlException expected');
 } catch (DmlException dex) {
  Assert.isTrue(dex.getMessage().contains('inaccessible'));
  Assert.isTrue(dex.getDmlFieldNames(0).contains('AnnualRevenue'));
 }
```

---

TITLE: Basic Webservice Method Definition
DESCRIPTION: Example defining a global static webservice method 'makeContact' that takes parameters and returns an Id.
SOURCE: Apex Developer Guide v64.0 (Page 304)
LANGUAGE: apex
CODE:

```apex
 global class MyWebService {
  webservice static Id makeContact(String contactLastName, Account a) {
   Contact c = new Contact(lastName = contactLastName, AccountId = a.Id);
   insert c;
   return c.id;
  }
 }
```

---

TITLE: Webservice Method with Member Variables
DESCRIPTION: Example showing a global class with an inner class 'AccountInfo' whose members are exposed via the 'webservice' keyword, along with webservice methods.
SOURCE: Apex Developer Guide v64.0 (Page 305)
LANGUAGE: apex
CODE:

```apex
 global class SpecialAccounts {
  global class AccountInfo {
   webservice String AcctName;
   webservice Integer AcctNumber;
  }

  webservice static Account createAccount(AccountInfo info) {
   Account acct = new Account();
   acct.Name = info.AcctName;
   acct.AccountNumber = String.valueOf(info.AcctNumber);
   insert acct;
   return acct;
  }

  webservice static Id [] createAccounts(Account parent, Account child, Account grandChild) {
   insert parent;
   child.parentId = parent.Id;
   insert child;
   grandChild.parentId = child.Id;
   insert grandChild;

   Id [] results = new Id[3];
   results[0] = parent.Id;
   results[1] = child.Id;
   results[2] = grandChild.Id;
   return results;
  }
 }
```

---

TITLE: Test Class for Webservice Methods
DESCRIPTION: Test method for the SpecialAccounts class, demonstrating how to call its webservice methods within a test context.
SOURCE: Apex Developer Guide v64.0 (Page 306)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class SpecialAccountsTest {
  testMethod static void testAccountCreate() {
   SpecialAccounts.AccountInfo info = new SpecialAccounts.AccountInfo();
   info.AcctName = 'Manoj Cheenath';
   info.AcctNumber = 12345;
   Account acct = SpecialAccounts.createAccount(info);
   System.assert(acct != null);
  }
  // Additional test methods for createAccounts could be added here
 }
```

---

TITLE: Basic Apex REST Class with HTTP Methods
DESCRIPTION: Example class MyRestResource exposed as a REST resource with methods handling @HttpDelete, @HttpGet, and @HttpPost.
SOURCE: Apex Developer Guide v64.0 (Page 314)
LANGUAGE: apex
CODE:

```apex
 @RestResource(urlMapping='/Account/*')
 global with sharing class MyRestResource {

  @HttpDelete
  global static void doDelete() {
   RestRequest req = RestContext.request;
   String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
   Account account = [SELECT Id FROM Account WHERE Id = :accountId];
   delete account;
  }

  @HttpGet
  global static Account doGet() {
   RestRequest req = RestContext.request;
   String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
   Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId];
   return result;
  }

  @HttpPost
  global static String doPost(String name, String phone, String website) {
   Account account = new Account();
   account.Name = name;
   account.phone = phone;
   account.website = website;
   insert account;
   return account.Id;
  }
 }
```

---

TITLE: Apex REST Method with User-Defined Type Parameter
DESCRIPTION: Example REST resource with an @HttpPost method that accepts a custom Apex class (MyUserDefinedClass) as a parameter.
SOURCE: Apex Developer Guide v64.0 (Page 309)
LANGUAGE: apex
CODE:

```apex
 @RestResource(urlMapping='/user_defined_type_example/*')
 global with sharing class MyOwnTypeRestResource {

  @HttpPost
  global static MyUserDefinedClass echoMyType(MyUserDefinedClass ic) {
   return ic;
  }

  global class MyUserDefinedClass {
   global String string1;
   global String string2 { get; set; }
   private String privateString;
   global transient String transientString;
  }
 }
```

---

TITLE: Apex REST Method with Request Body Access
DESCRIPTION: Example @HttpPost method accessing the raw request body as a Blob and creating an Attachment.
SOURCE: Apex Developer Guide v64.0 (Page 315)
LANGUAGE: apex
CODE:

```apex
 @RestResource(urlMapping='/CaseManagement/v1/*')
 global with sharing class CaseMgmtService {
  @HttpPost
  global static String attachPic(){
   RestRequest req = RestContext.request;
   RestResponse res = Restcontext.response; // Corrected from source
   Id caseId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
   Blob picture = req.requestBody;
   Attachment a = new Attachment (ParentId = caseId,
    Body = picture,
    ContentType = 'image/jpg', // Assuming JPG
    Name = 'VehiclePicture');
   insert a;
   return a.Id;
  }
 }
```

---

TITLE: Email Service Handler Example (Create Task)
DESCRIPTION: Implements Messaging.InboundEmailHandler to create a Task related to a Contact found via the sender's email address.
SOURCE: Apex Developer Guide v64.0 (Page 317)
LANGUAGE: apex
CODE:

```apex
 public with sharing class CreateTaskEmailExample implements Messaging.InboundEmailHandler {
  public Messaging.InboundEmailResult handleInboundEmail(Messaging.inboundEmail email,
   Messaging.InboundEnvelope env){

   Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
   String myPlainText= email.plainTextBody;
   Task[] newTask = new Task[0];

   try {
    Contact vCon = [SELECT Id, Name, Email
     FROM Contact
     WHERE Email = :email.fromAddress
     WITH USER_MODE
     LIMIT 1];

    newTask.add(new Task(Description = myPlainText,
     Priority = 'Normal',
     Status = 'Inbound Email',
     Subject = email.subject,
     IsReminderSet = true,
     ReminderDateTime = System.now()+1,
     WhoId = vCon.Id));

    insert as user newTask; // Use 'as user' for security context
    System.debug('New Task Object: ' + newTask );
   } catch (QueryException e) {
    System.debug('Query Issue: ' + e);
   } catch (DmlException e) { // Catch DML exceptions too
    System.debug('DML Issue: ' + e);
   }

   result.success = true;
   return result;
  }
 }
```

---

TITLE: Email Service Handler Example (Unsubscribe)
DESCRIPTION: Implements Messaging.InboundEmailHandler to process unsubscribe requests by finding Contacts/Leads matching the sender email and setting HasOptedOutOfEmail to true.
SOURCE: Apex Developer Guide v64.0 (Page 318)
LANGUAGE: apex
CODE:

```apex
 public with sharing class unsubscribe implements Messaging.inboundEmailHandler{
  public Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email,
   Messaging.InboundEnvelope env ) {

   Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
   List<Contact> lc = new List <contact>();
   List<Lead> ll = new List <lead>();
   String mySubject = email.subject.toLowerCase();
   String s = 'unsubscribe';
   Boolean unsubMe = mySubject.contains(s);

   if (unsubMe == true) {
    try {
     // Find matching contacts
     for (Contact c : [SELECT Id FROM Contact WHERE Email = :env.fromAddress AND hasOptedOutOfEmail = false WITH USER_MODE LIMIT 100]) {
      c.hasOptedOutOfEmail = true;
      lc.add(c);
     }
     update as user lc;
    } catch (System.QueryException e) {
     System.debug('Contact Query Issue: ' + e);
    } catch (DmlException e) { // Catch DML exceptions
     System.debug('Contact Update Issue: ' + e);
    }
    try {
     // Find matching leads
     for (Lead l : [SELECT Id FROM Lead WHERE Email = :env.fromAddress AND isConverted = false AND hasOptedOutOfEmail = false WITH USER_MODE LIMIT 100]) {
      l.hasOptedOutOfEmail = true;
      ll.add(l);
     }
     update as user ll;
    } catch (System.QueryException e) {
     System.debug('Lead Query Issue: ' + e);
    } catch (DmlException e) { // Catch DML exceptions
     System.debug('Lead Update Issue: ' + e);
    }
    System.debug('Found the unsubscribe word in the subject line.');
   } else {
    System.debug('No Unsubscribe word found in the subject line.' );
   }

   result.success = true; // Always return true for email services
   return result;
  }
 }
```

---

TITLE: Test Method for Unsubscribe Email Handler
DESCRIPTION: Test method for the unsubscribe email handler, creating test data and invoking the handler.
SOURCE: Apex Developer Guide v64.0 (Page 320)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class unsubscribeTest {
  static testMethod void testUnsubscribe() {
   Messaging.InboundEmail email = new Messaging.InboundEmail() ;
   Messaging.InboundEnvelope env = new Messaging.InboundEnvelope();

   Lead l = new lead(firstName='John', lastName='Smith', Company='Salesforce', Email='user@acme.com', HasOptedOutOfEmail=false);
   insert l;
   Contact c = new Contact(firstName='john', lastName='smith', Email='user@acme.com', HasOptedOutOfEmail=false);
   insert c;

   email.subject = 'test unsubscribe test';
   env.fromAddress = 'user@acme.com';

   unsubscribe unsubscribeObj = new unsubscribe();
   unsubscribeObj.handleInboundEmail(email, env );

   // Assertions would follow to check HasOptedOutOfEmail fields
  }
  // testUnsubscribe2 method from source is similar but tests the negative case (no 'unsubscribe' in subject)
 }
```

---

TITLE: Visualforce Page with Custom Controller Action
DESCRIPTION: Simple Visualforce page using a custom controller 'myClass' and invoking its 'init' method via the action attribute.
SOURCE: Apex Developer Guide v64.0 (Page 240)
LANGUAGE: html
CODE:

```html
<apex:page controller="myClass" action="{!init}"></apex:page>
```

---

TITLE: Custom Controller with Action Method (Potential CSRF)
DESCRIPTION: Apex controller with an 'init' method that reads an ID parameter and performs a delete operation, demonstrating a potential CSRF vulnerability if not protected.
SOURCE: Apex Developer Guide v64.0 (Page 240)
LANGUAGE: apex
CODE:

```apex
 public class myClass {
  public void init() {
   Id id = ApexPages.currentPage().getParameters().get('id');
   Account obj = [select id, Name FROM Account WHERE id = :id];
   delete obj;
   return ; // PageReference return type might be more appropriate
  }
 }
```

---

TITLE: Visualforce Page Vulnerable to SOQL Injection
DESCRIPTION: Example Visualforce page with an input field ('name') and a button that calls a controller method ('query'), potentially vulnerable to SOQL injection if the controller doesn't sanitize input.
SOURCE: Apex Developer Guide v64.0 (Page 240)
LANGUAGE: html
CODE:

```html
<apex:page controller="SOQLController">
  <apex:form>
    <apex:outputText value="Enter Name" />
    <apex:inputText value="{!name}" />
    <apex:commandButton value="Query" action="{!query}" />
  </apex:form>
</apex:page>
```

---

TITLE: Controller Vulnerable to SOQL Injection
DESCRIPTION: Apex controller method 'query' that dynamically builds a SOQL string using unsanitized user input ('name'), creating a SOQL injection vulnerability.
SOURCE: Apex Developer Guide v64.0 (Page 241)
LANGUAGE: apex
CODE:

```apex
 public class SOQLController {
  public String name {
   get { return name;}
   set { name = value;}
  }
  public PageReference query() {
   String qryString = 'SELECT Id FROM Contact WHERE ' +
    '(IsDeleted = false and Name like \'%' + name + '%\')';
   List<Contact> queryResult = Database.query(qryString); // Vulnerable query
   System.debug('query result is ' + queryResult);
   return null;
  }
 }
```

---

TITLE: Secure Controller Using Static SOQL
DESCRIPTION: Rewritten version of the vulnerable controller using static SOQL with a bind variable (:queryName) to prevent SOQL injection.
SOURCE: Apex Developer Guide v64.0 (Page 241)
LANGUAGE: apex
CODE:

```apex
 public class SOQLController {
  public String name {
   get { return name;}
   set { name = value;}
  }
  public PageReference query() {
   String queryName = '%' + name + '%';
   List<Contact> queryResult = [SELECT Id FROM Contact WHERE
    (IsDeleted = false and Name like :queryName)]; // Secure query
   System.debug('query result is ' + queryResult);
   return null;
  }
 }
```

---

TITLE: Controller Demonstrating Lack of Sharing Enforcement
DESCRIPTION: Example controller method 'read' that queries Contacts without 'with sharing', potentially exposing records the user shouldn't see.
SOURCE: Apex Developer Guide v64.0 (Page 242)
LANGUAGE: apex
CODE:

```apex
 public class customController {
  public void read() {
   // Assuming 'value' is a property set from the page
   Contact contact = [SELECT id FROM Contact WHERE Name = :value];
   // ... process contact
  }
 }
```

---

TITLE: Controller Enforcing Sharing Rules
DESCRIPTION: The same controller as the previous example, but declared with 'with sharing' to enforce the current user's sharing rules.
SOURCE: Apex Developer Guide v64.0 (Page 242)
LANGUAGE: apex
CODE:

```apex
 public with sharing class customController {
  // ... methods like read() from previous example ...
 }
```

---

TITLE: Accessing List Custom Setting Values (getAll)
DESCRIPTION: Shows retrieving all data sets and fields for a list custom setting using the getAll() method.
SOURCE: Apex Developer Guide v64.0 (Page 243)
LANGUAGE: apex
CODE:

```apex
 // Assumes CustomSettingName__c is a List custom setting
 Map<String, CustomSettingName__c> mcs = CustomSettingName__c.getAll();
```

---

TITLE: Accessing List Custom Setting Values (getValues)
DESCRIPTION: Shows retrieving field values for a specific data set within a list custom setting using the getValues() method.
SOURCE: Apex Developer Guide v64.0 (Page 243)
LANGUAGE: apex
CODE:

```apex
 // Assumes CustomSettingName__c is a List custom setting and data_set_name is a valid Data Set Name
 CustomSettingName__c mc = CustomSettingName__c.getValues(data_set_name);
```

---

TITLE: Accessing Hierarchy Custom Setting (Org Defaults)
DESCRIPTION: Shows retrieving the organization-level default values for a hierarchy custom setting using getOrgDefaults().
SOURCE: Apex Developer Guide v64.0 (Page 243)
LANGUAGE: apex
CODE:

```apex
 // Assumes CustomSettingName__c is a Hierarchy custom setting
 CustomSettingName__c mc = CustomSettingName__c.getOrgDefaults();
```

---

TITLE: Accessing Hierarchy Custom Setting (Instance by Profile ID)
DESCRIPTION: Shows retrieving the specific values for a hierarchy custom setting based on a Profile ID using getInstance().
SOURCE: Apex Developer Guide v64.0 (Page 244)
LANGUAGE: apex
CODE:

```apex
 // Assumes CustomSettingName__c is a Hierarchy custom setting and Profile_ID is a valid Profile ID
 CustomSettingName__c mc = CustomSettingName__c.getInstance(Profile_ID);
```

---

TITLE: Execute Anonymous API Call Example
DESCRIPTION: Shows the signature for the executeAnonymous SOAP API call.
SOURCE: Apex Developer Guide v64.0 (Page 245)
LANGUAGE: apex
CODE:

```apex
 ExecuteAnonymousResult executeAnonymous(String code)
```

---

TITLE: Anonymous Block Variable Scope Example
DESCRIPTION: Demonstrates variable scope within an anonymous block and its defined methods.
SOURCE: Apex Developer Guide v64.0 (Page 246)
LANGUAGE: apex
CODE:

```apex
 // Executed via executeAnonymous
 Integer int1 = 0;

 void myProcedure1() {
  myProcedure2();
 }

 void myProcedure2() {
  int1++; // Accesses variable declared outside the method
 }

 myProcedure1();
```

---

TITLE: Basic Trigger Syntax
DESCRIPTION: Shows the basic syntax for defining an Apex trigger, including name, object, events, and code block.
SOURCE: Apex Developer Guide v64.0 (Page 249)
LANGUAGE: apex
CODE:

```apex
 trigger TriggerName on ObjectName (trigger_events) {
  code_block
 }
```

---

TITLE: Example Trigger Definition (Account)
DESCRIPTION: Defines a trigger 'myAccountTrigger' on the Account object for before insert and before update events.
SOURCE: Apex Developer Guide v64.0 (Page 249)
LANGUAGE: apex
CODE:

```apex
 trigger myAccountTrigger on Account (before insert, before update) {
  // Your code here
 }
```

---

TITLE: Simple Trigger Accessing Trigger.new
DESCRIPTION: Simple trigger demonstrating iteration over Trigger.new and using it as a bind variable in a SOQL query.
SOURCE: Apex Developer Guide v64.0 (Page 250)
LANGUAGE: apex
CODE:

```apex
 Trigger simpleTrigger on Account (after insert) {
  for (Account a : Trigger.new) {
   // Iterate over each sObject
  }

  // Using Trigger.new as a bind variable
  Contact[] cons = [SELECT LastName FROM Contact
   WHERE AccountId IN :Trigger.new];
 }
```

---

TITLE: Trigger Using Context Variables (Boolean Flags)
DESCRIPTION: Example trigger demonstrating the use of Trigger.isBefore, Trigger.isDelete, Trigger.isInsert, and accessing Trigger.old and Trigger.new based on context.
SOURCE: Apex Developer Guide v64.0 (Page 251)
LANGUAGE: apex
CODE:

```apex
 trigger myAccountTrigger on Account(before delete, before insert, before update, after delete, after insert, after update) {
  if (Trigger.isBefore) {
   if (Trigger.isDelete) {
    // Before delete logic using Trigger.old
    for (Account a : Trigger.old) { /* ... */ }
   } else { // Before insert or update
    // Logic using Trigger.new
    for (Account a : Trigger.new) { /* ... */ }
    if (Trigger.isInsert) {
     // Before insert specific logic
    }
   }
  } else { // After trigger
   if (Trigger.isInsert) {
    // After insert logic using Trigger.new
    List<Contact> contacts = new List<Contact>();
    for (Account a : Trigger.new) { /* ... add contacts ... */ }
    // insert contacts;
   }
   // ... other after event logic
  }
 }
```

---

TITLE: Inefficient Trigger Querying Inside Loop
DESCRIPTION: Flawed trigger pattern querying User records inside a loop over Trigger.new, likely to hit SOQL query limits.
SOURCE: Apex Developer Guide v64.0 (Page 265)
LANGUAGE: apex
CODE:

```apex
 // Flawed - SOQL inside loop
 trigger MileageTrigger on Mileage__c (before insert, before update) {
  for(mileage__c m : Trigger.new){
   User c = [SELECT Id FROM user WHERE mileageid__c = :m.Id]; // SOQL inside loop
  }
 }
```

---

TITLE: Efficient Trigger Querying Outside Loop
DESCRIPTION: Recommended trigger pattern: collect IDs from Trigger.newMap into a Set and perform a single SOQL query outside the loop.
SOURCE: Apex Developer Guide v64.0 (Page 265)
LANGUAGE: apex
CODE:

```apex
 // Efficient - SOQL outside loop
 Trigger MileageTrigger on Mileage__c (before update) {
  Set<ID> ids = Trigger.newMap.keySet();
  List<User> c = [SELECT Id FROM user WHERE mileageid__c in :ids]; // Single SOQL query
 }
```

---

TITLE: Queueable Apex Basic Implementation
DESCRIPTION: Simple class implementing the Queueable interface, inserting an Account record in its execute method.
SOURCE: Apex Developer Guide v64.0 (Page 267)
LANGUAGE: apex
CODE:

```apex
 public class AsyncExecutionExample implements Queueable {
  public void execute(QueueableContext context) {
   Account a = new Account(Name='Acme',Phone='(415) 555-1212');
   insert a;
  }
 }
```

---

TITLE: Enqueuing a Queueable Job
DESCRIPTION: Shows how to enqueue the AsyncExecutionExample job using System.enqueueJob.
SOURCE: Apex Developer Guide v64.0 (Page 267)
LANGUAGE: apex
CODE:

```apex
 ID jobID = System.enqueueJob(new AsyncExecutionExample());
```

---

TITLE: Querying Asynchronous Job Status
DESCRIPTION: Example SOQL query to retrieve the status and error count of an asynchronous Apex job using its ID.
SOURCE: Apex Developer Guide v64.0 (Page 267)
LANGUAGE: apex
CODE:

```apex
 // Assuming jobID holds the ID from System.enqueueJob
 AsyncApexJob jobInfo = [SELECT Status,NumberOfErrors FROM AsyncApexJob WHERE Id=:jobID];
```

---

TITLE: Enqueuing a Queueable Job with Delay
DESCRIPTION: Demonstrates enqueuing a Queueable job with a 5-minute minimum delay using the overloaded System.enqueueJob method.
SOURCE: Apex Developer Guide v64.0 (Page 268)
LANGUAGE: apex
CODE:

```apex
 Integer delayInMinutes = 5;
 ID jobID = System.enqueueJob(new MyQueueableClass(), delayInMinutes); // Assumes MyQueueableClass exists
```

---

TITLE: Queueable Job Terminating Based on Stack Depth
DESCRIPTION: Example Fibonacci sequence generator implemented as a Queueable job that uses AsyncInfo methods to check and enforce a maximum stack depth to prevent limit errors.
SOURCE: Apex Developer Guide v64.0 (Page 269)
LANGUAGE: apex
CODE:

```apex
 // Fibonacci
 public class FibonacciDepthQueueable implements Queueable {
  private long nMinus1, nMinus2;

  public static void calculateFibonacciTo(integer depth) {
   AsyncOptions asyncOptions = new AsyncOptions();
   asyncOptions.MaximumQueueableStackDepth = depth;
   System.enqueueJob(new FibonacciDepthQueueable(null, null), asyncOptions);
  }

  private FibonacciDepthQueueable(long nMinus1param, long nMinus2param) {
   nMinus1 = nMinus1param;
   nMinus2 = nMinus2param;
  }

  public void execute(QueueableContext context) {
   integer depth = AsyncInfo.getCurrentQueueableStackDepth();
   long fibonacciSequenceStep;
   switch on (depth) {
    when 1, 2 { fibonacciSequenceStep = 1; }
    when else { fibonacciSequenceStep = nMinus1 + nMinus2; }
   }
   System.debug('depth: ' + depth + ' fibonacciSequenceStep: ' + fibonacciSequenceStep);

   if(System.AsyncInfo.hasMaxStackDepth() &&
    AsyncInfo.getCurrentQueueableStackDepth() >= AsyncInfo.getMaximumQueueableStackDepth()) {
    // Reached maximum stack depth - Persist result
    // Fibonacci__c result = new Fibonacci__c(Depth__c = depth, Result = fibonacciSequenceStep);
    // insert result;
   } else {
    // Enqueue next step
    System.enqueueJob(new FibonacciDepthQueueable(fibonacciSequenceStep, nMinus1));
   }
  }
 }
```

---

TITLE: Testing a Queueable Job
DESCRIPTION: Test method demonstrating how to test a Queueable job by enqueuing it within a Test.startTest()/Test.stopTest() block and asserting results afterward.
SOURCE: Apex Developer Guide v64.0 (Page 270)
LANGUAGE: apex
CODE:

```apex
 @isTest
 public class AsyncExecutionExampleTest {
  @isTest
  static void test1() {
   Test.startTest();
   System.enqueueJob(new AsyncExecutionExample()); // The Queueable class being tested
   Test.stopTest(); // Ensures async job runs before assertions

   // Validate that the job has run by verifying the record was created.
   Account acct = [SELECT Name,Phone FROM Account WHERE Name='Acme' LIMIT 1];
   System.assertNotEquals(null, acct);
   System.assertEquals('(415) 555-1212', acct.Phone);
  }
 }
```

---

TITLE: Chaining Queueable Jobs
DESCRIPTION: Shows how to chain Queueable jobs by enqueuing a second job (SecondJob) from within the execute method of the first job.
SOURCE: Apex Developer Guide v64.0 (Page 270)
LANGUAGE: apex
CODE:

```apex
 public class AsyncExecutionExample implements Queueable {
  public void execute(QueueableContext context) {
   // Your processing logic here

   // Chain this job to next job by submitting the next job
   System.enqueueJob(new SecondJob()); // Assumes SecondJob implements Queueable
  }
 }
```

---

TITLE: Queueable Job Duplicate Signature Builder Example
DESCRIPTION: Demonstrates building a unique job signature using QueueableDuplicateSignature.Builder with UserId and a String.
SOURCE: Apex Developer Guide v64.0 (Page 272)
LANGUAGE: apex
CODE:

```apex
 AsyncOptions options = new AsyncOptions();
 options.DuplicateSignature = QueueableDuplicateSignature.Builder()
  .addId(UserInfo.getUserId())
  .addString('MyQueueable')
  .build();
 try {
  System.enqueueJob(new MyQueueable(), options); // Assumes MyQueueable exists
 } catch (DuplicateMessageException ex) {
  // Handle duplicate job exception
 }
```

---

TITLE: Queueable Job Duplicate Signature Builder Example 2
DESCRIPTION: Shows building a unique job signature using an Apex Class ID and an sObject hash code.
SOURCE: Apex Developer Guide v64.0 (Page 272)
LANGUAGE: apex
CODE:

```apex
 AsyncOptions options = new AsyncOptions();
 options.DuplicateSignature = QueueableDuplicateSignature.Builder()
  .addInteger(System.hashCode(someAccount)) // Assumes someAccount is an sObject
  .addId([SELECT Id FROM ApexClass WHERE Name='MyQueueable'].Id)
  .build();
 System.enqueueJob(new MyQueueable(), options); // Assumes MyQueueable exists
```

---

TITLE: Basic Transaction Finalizer Implementation
DESCRIPTION: Shows the basic structure of implementing the System.Finalizer interface with its execute method.
SOURCE: Apex Developer Guide v64.0 (Page 273)
LANGUAGE: apex
CODE:

```apex
 global class MyFinalizer implements System.Finalizer {
  global void execute(System.FinalizerContext ctx) {
   // Finalizer logic here, using ctx methods like:
   // ctx.getAsyncApexJobId()
   // ctx.getRequestId()
   // ctx.getResult() -> System.ParentJobResult enum (SUCCESS or UNHANDLED_EXCEPTION)
   // ctx.getException() -> The exception if getResult() is UNHANDLED_EXCEPTION
  }
 }
```

---

TITLE: Attaching a Transaction Finalizer
DESCRIPTION: Shows how to attach an instance of a Finalizer implementation to the current Queueable job execution context using System.attachFinalizer.
SOURCE: Apex Developer Guide v64.0 (Page 273)
LANGUAGE: apex
CODE:

```apex
 // Inside a Queueable execute method:
 MyFinalizer finalizerInstance = new MyFinalizer();
 System.attachFinalizer(finalizerInstance);
```

---

TITLE: Logging Finalizer Example
DESCRIPTION: Class implementing both Queueable and Finalizer to buffer log messages during job execution and commit them in the finalizer's execute method, regardless of job success or failure.
SOURCE: Apex Developer Guide v64.0 (Page 274)
LANGUAGE: apex
CODE:

```apex
 public class LoggingFinalizer implements Finalizer, Queueable {
  // internal log buffer
  @TestVisible private List<LogMessage__c> logRecords = new List<LogMessage__c>(); // Assumes LogMessage__c custom object exists

  // Queueable execute method
  public void execute(QueueableContext ctx) {
   String jobId = '' + ctx.getJobId();
   System.debug('Begin: executing queueable job: ' + jobId);
   try {
    // Attach itself as the finalizer
    System.attachFinalizer(this);
    f.addLog('About to do some work...', jobId); // Use 'this' if implementing both
    // ... Job logic ...
   } catch (Exception e) {
    System.debug('Error executing the job [' + jobId + ']: ' + e.getMessage());
   } finally {
    System.debug('Completed: execution of queueable job: ' + jobId);
   }
  }

  // Finalizer execute method
  public void execute(FinalizerContext ctx) {
   String parentJobId = ctx.getAsyncApexJobId();
   System.debug('Begin: executing finalizer attached to queueable job: ' + parentJobId);
   // Update log records with parent job ID
   for (LogMessage__c log : logRecords) {
    log.Request__c = parentJobId;
   }
   // Commit the buffer
   System.Debug('committing log records to database');
   Database.insert(logRecords, false); // Allow partial success for logs
   // Log final status
   if (ctx.getResult() == ParentJobResult.SUCCESS) { /* log success */ }
   else { /* log failure */ }
   System.debug('Completed: execution of finalizer attached to queueable job: ' + parentJobId);
  }

  // Method to add logs (called from Queueable execute)
  public void addLog(String message, String source) {
   logRecords.add(new LogMessage__c( /*... populate fields ...*/));
  }
 }
```

---

TITLE: Retry Queueable Job with Finalizer Example
DESCRIPTION: Demonstrates a Finalizer re-enqueuing its parent Queueable job upon failure, up to a certain limit (implicitly 5 times).
SOURCE: Apex Developer Guide v64.0 (Page 275)
LANGUAGE: apex
CODE:

```apex
 public class RetryLimitDemo implements Finalizer, Queueable {
  // Queueable execute method (example causes limit error)
  public void execute(QueueableContext ctx) {
   String jobId = '' + ctx.getJobId();
   System.debug('Begin: executing queueable job: ' + jobId);
   try {
    System.attachFinalizer(this);
    // ... Logic that might fail (e.g., hitting limits) ...
    while(true) { Account a = new Account(); insert a; } // Example failure
   } catch (Exception e) {
    System.debug('Error executing the job [' + jobId + ']: ' + e.getMessage());
   } finally {
    System.debug('Completed: execution of queueable job: ' + jobId);
   }
  }

  // Finalizer execute method
  public void execute(FinalizerContext ctx) {
   String parentJobId = ctx.getAsyncApexJobId();
   if (ctx.getResult() == ParentJobResult.SUCCESS) {
    System.debug('Parent queueable job [' + parentJobId + '] completed successfully.');
   } else {
    System.debug('Parent queueable job [' + parentJobId + '] failed: ' + ctx.getException().getMessage());
    // Attempt to re-enqueue (will fail after 5 consecutive failures)
    try {
     String newJobId = '' + System.enqueueJob(new RetryLimitDemo());
     System.debug('Enqueued new job: ' + newJobId);
    } catch (Exception e) {
      System.debug('Failed to enqueue retry job: ' + e.getMessage());
    }
   }
   System.debug('Completed: execution of finalizer attached to queueable job: ' + parentJobId);
  }
 }
```

---

TITLE: Schedulable Apex Class Example
DESCRIPTION: Simple example implementing the Schedulable interface for a class intended to be run on a schedule.
SOURCE: Apex Developer Guide v64.0 (Page 278)
LANGUAGE: apex
CODE:

```apex
 global class ScheduledMerge implements Schedulable {
  global void execute(SchedulableContext SC) {
   MergeNumbers M = new MergeNumbers(); // Assumes MergeNumbers class exists
   // M.merge(); // Assumes a method exists to perform the work
  }
 }
```

---

TITLE: Scheduling an Apex Class Example
DESCRIPTION: Shows how to schedule the ScheduledMerge class to run using a CRON expression via System.schedule.
SOURCE: Apex Developer Guide v64.0 (Page 278)
LANGUAGE: apex
CODE:

```apex
 ScheduledMerge m = new ScheduledMerge();
 String sch = '20 30 8 10 2 ?'; // Example CRON: 8:30:20am on the 10th day of Feb
 String jobID = System.schedule('Merge Job', sch, m);
```

---

TITLE: Schedulable Interface for Batch Apex
DESCRIPTION: Example showing how to implement the Schedulable interface to schedule a Batch Apex class (Batchable).
SOURCE: Apex Developer Guide v64.0 (Page 278)
LANGUAGE: apex
CODE:

```apex
 global class ScheduledBatchable implements Schedulable {
  global void execute(SchedulableContext sc) {
   Batchable b = new Batchable(); // Assumes Batchable implements Database.Batchable
   Database.executeBatch(b);
  }
 }
```

---

TITLE: Querying CronTrigger for Scheduled Job Status
DESCRIPTION: SOQL query to retrieve the TimesTriggered and NextFireTime for a scheduled job using its CronTrigger ID.
SOURCE: Apex Developer Guide v64.0 (Page 279)
LANGUAGE: soql
CODE:

```soql
 // Assuming jobID holds the ID from System.schedule
 CronTrigger ct =
  [SELECT TimesTriggered, NextFireTime
   FROM CronTrigger WHERE Id = :jobID];
```

---

TITLE: Querying CronTrigger via SchedulableContext
DESCRIPTION: Shows how to get the CronTrigger ID within a Schedulable execute method using the SchedulableContext parameter.
SOURCE: Apex Developer Guide v64.0 (Page 279)
LANGUAGE: soql
CODE:

```soql
 // Inside Schedulable execute(SchedulableContext sc) method:
 CronTrigger ct =
  [SELECT TimesTriggered, NextFireTime
   FROM CronTrigger WHERE Id = :sc.getTriggerId()];
```

---

TITLE: Querying CronJobDetail via CronTrigger Relationship
DESCRIPTION: SOQL query retrieving CronJobDetail information (Name, JobType) by traversing the relationship from a CronTrigger record.
SOURCE: Apex Developer Guide v64.0 (Page 279)
LANGUAGE: soql
CODE:

```soql
 CronTrigger job =
  [SELECT Id, CronJobDetail.Id, CronJobDetail.Name, CronJobDetail.JobType
   FROM CronTrigger ORDER BY CreatedDate DESC LIMIT 1];
```

---

TITLE: Querying CronJobDetail Directly
DESCRIPTION: SOQL query retrieving CronJobDetail information directly using the ID obtained from a CronTrigger record.
SOURCE: Apex Developer Guide v64.0 (Page 279)
LANGUAGE: soql
CODE:

```soql
 // Assuming 'job' is the CronTrigger record from the previous query
 CronJobDetail ctd =
  [SELECT Id, Name, JobType
   FROM CronJobDetail WHERE Id = :job.CronJobDetail.Id];
```

---

TITLE: Counting Scheduled Apex Jobs
DESCRIPTION: SOQL query using COUNT() to find the total number of scheduled Apex jobs (JobType='7').
SOURCE: Apex Developer Guide v64.0 (Page 279)
LANGUAGE: soql
CODE:

```soql
 SELECT COUNT() FROM CronTrigger WHERE CronJobDetail.JobType = '7'
```

---

TITLE: Schedulable Class for Testing
DESCRIPTION: Example Schedulable class that updates an Account record, used for demonstrating testing techniques.
SOURCE: Apex Developer Guide v64.0 (Page 280)
LANGUAGE: apex
CODE:

```apex
 global class TestScheduledApexFromTestMethod implements Schedulable {
  // CRON expression for scheduling
  public static String CRON_EXP = '0 0 0 3 9 ? 2042'; // Example: Sept 3, 2042 midnight

  global void execute(SchedulableContext ctx) {
   // Query the CronTrigger job
   CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime
    FROM CronTrigger WHERE Id = :ctx.getTriggerId()];
   // Verify Cron expression and initial state
   System.assertEquals(CRON_EXP, ct.CronExpression);
   System.assertEquals(0, ct.TimesTriggered);

   // Find the specific Account inserted by the test
   Account a = [SELECT Id, Name FROM Account WHERE Name = 'testScheduledApexFromTestMethod'];
   a.name = 'testScheduledApexFromTestMethodUpdated';
   update a;
  }
 }
```

---

TITLE: Test Method for Schedulable Class
DESCRIPTION: Test method that schedules the TestScheduledApexFromTestMethod class within a Test.startTest/stopTest block and verifies its execution and effects.
SOURCE: Apex Developer Guide v64.0 (Page 280)
LANGUAGE: apex
CODE:

```apex
 @istest
 class TestClass {
  static testmethod void test() {
   Test.startTest();
   // Setup test data
   Account a = new Account();
   a.Name = 'testScheduledApexFromTestMethod';
   insert a;

   // Schedule the test job
   String jobId = System.schedule('testBasicScheduledApex',
    TestScheduledApexFromTestMethod.CRON_EXP,
    new TestScheduledApexFromTestMethod());

   // Get CronTrigger info
   CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime
    FROM CronTrigger WHERE id = :jobId];
   // Verify the job hasn't run yet
   System.assertEquals(TestScheduledApexFromTestMethod.CRON_EXP, ct.CronExpression);
   System.assertEquals(0, ct.TimesTriggered);

   // Stop the test context - this runs the scheduled job
   Test.stopTest();

   // Verify the account name was updated by the scheduled job
   System.assertEquals('testScheduledApexFromTestMethodUpdated',
    [SELECT Id, Name FROM Account WHERE Id = :a.Id].Name);
  }
 }
```

---

TITLE: Scheduling a Batch Job with System.scheduleBatch
DESCRIPTION: Example scheduling a batch Apex job (instance 'reassign') to run 60 minutes from now using System.scheduleBatch and querying its status.
SOURCE: Apex Developer Guide v64.0 (Page 290)
LANGUAGE: apex
CODE:

```apex
 // Assume 'reassign' is an instance of a class implementing Database.Batchable
 String cronID = System.scheduleBatch(reassign, 'job example', 60);

 CronTrigger ct = [SELECT Id, TimesTriggered, NextFireTime
  FROM CronTrigger WHERE Id = :cronID];

 // TimesTriggered should be 0 because the job hasn't started yet.
 System.assertEquals(0, ct.TimesTriggered);
 System.debug('Next fire time: ' + ct.NextFireTime);
```

---

TITLE: Batch Apex Example (Update Fields)
DESCRIPTION: Batch Apex class 'UpdateAccountFields' that updates a specified field on Account records based on a SOQL query provided during instantiation.
SOURCE: Apex Developer Guide v64.0 (Page 291)
LANGUAGE: apex
CODE:

```apex
 public class UpdateAccountFields implements Database.Batchable<sObject>{
  public final String Query;
  public final String Entity; // Not used in this simple example
  public final String Field;
  public final String Value;

  public UpdateAccountFields(String q, String e, String f, String v){
   Query=q; Entity=e; Field=f;Value=v;
  }

  public Database.QueryLocator start(Database.BatchableContext bc){
   return Database.getQueryLocator(query);
  }

  public void execute(Database.BatchableContext bc, List<sObject> scope){
   for(Sobject s : scope){
    s.put(Field,Value); // Update specified field with specified value
   }
   update scope;
  }

  public void finish(Database.BatchableContext bc){
  }
 }
```

---

TITLE: Invoking Batch Apex (Update Fields)
DESCRIPTION: Shows how to invoke the UpdateAccountFields batch class to update the Industry field for 10 Accounts.
SOURCE: Apex Developer Guide v64.0 (Page 291)
LANGUAGE: apex
CODE:

```apex
 // Query for 10 accounts
 String q = 'SELECT Industry FROM Account LIMIT 10';
 String e = 'Account';
 String f = 'Industry';
 String v = 'Consulting';
 Id batchInstanceId = Database.executeBatch(new UpdateAccountFields(q,e,f,v), 5); // Batch size 5
```

---

TITLE: Invoking Batch Apex Excluding Deleted Records
DESCRIPTION: Modifies the query used with UpdateAccountFields to exclude records from the Recycle Bin (isDeleted=false).
SOURCE: Apex Developer Guide v64.0 (Page 291)
LANGUAGE: apex
CODE:

```apex
 // Query for accounts that aren't in the Recycle Bin
 String q = 'SELECT Industry FROM Account WHERE isDeleted=false LIMIT 10';
 // ... rest of invocation like previous example ...
 Id batchInstanceId = Database.executeBatch(new UpdateAccountFields(q,e,f,v), 5);

 // Query for invoices that aren't in the Recycle Bin
 String q_inv = 'SELECT Description__c FROM Invoice_Statement__c WHERE isDeleted=false LIMIT 10';
 // ... rest of invocation for invoices ...
 // Id batchInstanceId_inv = Database.executeBatch(new UpdateInvoiceFields(q_inv,e_inv,f_inv,v_inv), 5); // Assumes UpdateInvoiceFields class exists
```

---

TITLE: Batch Apex Example (Reassign Owner)
DESCRIPTION: Batch Apex class 'OwnerReassignment' that reassigns Account ownership based on a query and sends a completion email.
SOURCE: Apex Developer Guide v64.0 (Page 292)
LANGUAGE: apex
CODE:

```apex
 public class OwnerReassignment implements Database.Batchable<sObject>{
  String query;
  String email;
  Id toUserId;
  Id fromUserId;

  public Database.querylocator start(Database.BatchableContext bc){
   return Database.getQueryLocator(query);
  }

  public void execute(Database.BatchableContext bc, List<sObject> scope){
   List<Account> accns = new List<Account>();
   for(sObject s : scope){
    Account a = (Account)s;
    if(a.OwnerId==fromUserId){
     a.OwnerId=toUserId;
     accns.add(a);
    }
   }
   update accns;
  }

  public void finish(Database.BatchableContext bc){
   Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
   // ... set email properties ...
   mail.setSubject('Batch Process Completed');
   mail.setPlainTextBody('Batch Process has completed');
   Messaging.sendEmail()
  }
 }
```

```text
   new Messaging.SingleEmailMessage[] { mail });
  }
 }
```

---

TITLE: Invoking Batch Apex (Reassign Owner)
DESCRIPTION: Shows how to instantiate and execute the OwnerReassignment batch class, providing the necessary query and user IDs.
SOURCE: Apex Developer Guide v64.0 (Page 292)
LANGUAGE: apex
CODE:

```apex
 // Assume u and u2 are User variables with valid Ids assigned
 OwnerReassignment reassign = new OwnerReassignment();
 reassign.query = 'SELECT Id, Name, Ownerid FROM Account ' +
  'WHERE ownerid=\'' + u.id + '\''; // Query for accounts owned by user u
 reassign.email='admin@acme.com'; // Email address for completion notification
 reassign.fromUserId = u.Id;
 reassign.toUserId = u2.Id; // Reassign to user u2
 ID batchprocessid = Database.executeBatch(reassign);
```

---

TITLE: Batch Apex Example (Delete Records)
DESCRIPTION: Batch Apex class 'BatchDelete' that deletes records returned by a query and empties them from the Recycle Bin.
SOURCE: Apex Developer Guide v64.0 (Page 293)
LANGUAGE: apex
CODE:

```apex
 public class BatchDelete implements Database.Batchable<sObject> {
  public String query;

  // Constructor could be added here to set the query

  public Database.QueryLocator start(Database.BatchableContext bc){
   return Database.getQueryLocator(query);
  }
  public void execute(Database.BatchableContext bc, List<sObject> scope){
   delete scope;
   DataBase.emptyRecycleBin(scope);
  }
  public void finish(Database.BatchableContext bc){
  }
 }
```

---

TITLE: Invoking Batch Apex (Delete Records)
DESCRIPTION: Shows how to invoke the BatchDelete class to delete old documents from a specific folder.
SOURCE: Apex Developer Guide v64.0 (Page 293)
LANGUAGE: apex
CODE:

```apex
 BatchDelete BDel = new BatchDelete();
 Datetime d = Datetime.now();
 d = d.addDays(-1); // Documents older than yesterday
 String folderId = '00lD000000116lD'; // Example folder ID
 // Query for selecting the documents to delete
 BDel.query = 'SELECT Id FROM Document WHERE FolderId=\'' + folderId +
  '\' AND CreatedDate < '+d.formatGmt('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
 // Invoke the batch job.
 ID batchprocessid = Database.executeBatch(BDel);
 System.debug('Returned batch process ID: ' + batchProcessId);
```

---

TITLE: Batch Apex Class Allowing Callouts
DESCRIPTION: Shows declaring a Batch Apex class with 'Database.AllowsCallouts' to enable HTTP callouts within the batch execution.
SOURCE: Apex Developer Guide v64.0 (Page 293)
LANGUAGE: apex
CODE:

```apex
 public class SearchAndReplace implements Database.Batchable<sObject>, Database.AllowsCallouts{
  // Class implementation...
 }
```

---

TITLE: Stateful Batch Apex Example
DESCRIPTION: Batch Apex class implementing Database.Stateful to maintain instance member variable state (Summary) across execute batches for aggregation.
SOURCE: Apex Developer Guide v64.0 (Page 293)
LANGUAGE: apex
CODE:

```apex
 public class SummarizeAccountTotal implements Database.Batchable<sObject>, Database.Stateful{
  public final String Query;
  public integer Summary; // State maintained across batches

  public SummarizeAccountTotal(String q){
   Query=q;
   Summary = 0;
  }

  public Database.QueryLocator start(Database.BatchableContext bc){
   return Database.getQueryLocator(query);
  }

  public void execute(Database.BatchableContext bc, List<sObject> scope){
   for(sObject s : scope){
    Summary = Integer.valueOf(s.get('total__c')) + Summary; // Aggregate value
   }
  }
  public void finish(Database.BatchableContext bc){
   // Use final Summary value (e.g., send email, update another record)
  }
 }
```

---

TITLE: Stateful Batch Apex with Initial State Variable
DESCRIPTION: Example showing a stateful batch class that captures an initial state in a final variable within the constructor, making it available (but immutable) across batches.
SOURCE: Apex Developer Guide v64.0 (Page 294)
LANGUAGE: apex
CODE:

```apex
 public class MyBatchable implements Database.Batchable<sObject>, Database.Stateful {
  private final String initialState; // Final variable to hold initial state
  String query;

  public MyBatchable(String initialState) {
   this.initialState = initialState; // Set initial state in constructor
  }

  public Database.QueryLocator start(Database.BatchableContext bc) {
   // Access initialState here
   return Database.getQueryLocator(query);
  }
  public void execute(Database.BatchableContext bc, List<sObject> batch) {
   // Access initialState here
  }
  public void finish(Database.BatchableContext bc) {
   // Access initialState here
  }
 }
```

---

TITLE: Testing Batch Apex Example
DESCRIPTION: Test method demonstrating how to test a batch Apex class (OwnerReassignment) by inserting test data and invoking Database.executeBatch within Test.startTest/stopTest.
SOURCE: Apex Developer Guide v64.0 (Page 295)
LANGUAGE: apex
CODE:

```apex
 public static testMethod void testBatch() {
  user u = [SELECT ID, UserName FROM User WHERE username='testuser1@acme.com'];
  user u2 = [SELECT ID, UserName FROM User WHERE username='testuser2@acme.com'];
  String u2id = u2.id;
  // Create 200 test accounts - this simulates one execute batch.
  List <Account> accns = new List<Account>();
  for(integer i = 0; i<200; i++){
   Account a = new Account(Name='testAccount'+ i, Ownerid = u.ID);
   accns.add(a);
  }
  insert accns;

  Test.StartTest();
  OwnerReassignment reassign = new OwnerReassignment(); // Class from previous example
  reassign.query='SELECT ID, Name, Ownerid ' +
   'FROM Account ' +
   'WHERE OwnerId=\'' + u.Id + '\'' +
   ' LIMIT 200';
  reassign.email='admin@acme.com';
  reassign.fromUserId = u.Id;
  reassign.toUserId = u2.Id;
  ID batchprocessid = Database.executeBatch(reassign);
  Test.StopTest(); // Ensures batch job finishes

  // Assertions to verify the results
  System.AssertEquals(200, database.countquery('SELECT COUNT() FROM Account WHERE OwnerId=\'' + u2.Id + '\''));
 }
```

---

TITLE: Webservice Method Invocation from Apex
DESCRIPTION: Example invoking a method (DNSLookup) on an Apex class generated from a WSDL (strikeironIplookup).
SOURCE: Apex Developer Guide v64.0 (Page 582)
LANGUAGE: apex
CODE:

```apex
 // Create the stub
 strikeironIplookup.DNSSoap dns = new strikeironIplookup.DNSSoap();

 // Set up the license header (specific to this example WSDL)
 dns.LicenseInfo = new strikeiron.LicenseInfo();
 dns.LicenseInfo.RegisteredUser = new strikeiron.RegisteredUser();
 dns.LicenseInfo.RegisteredUser.UserID = 'you@company.com';
 dns.LicenseInfo.RegisteredUser.Password = 'your-password';

 // Make the Web service call
 strikeironIplookup.DNSInfo info = dns.DNSLookup('www.myname.com');
```

---

TITLE: Setting HTTP Headers on Web Service Callout
DESCRIPTION: Demonstrates setting standard (Authorization) and custom HTTP headers on a WSDL-generated stub before making the callout.
SOURCE: Apex Developer Guide v64.0 (Page 582)
LANGUAGE: apex
CODE:

```apex
 docSample.DocSamplePort stub = new docSample.DocSamplePort(); // Assumes docSample class generated from WSDL
 stub.inputHttpHeaders_x = new Map<String, String>();

 //Setting a basic authentication header
 stub.inputHttpHeaders_x.put('Authorization', 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==');

 //Setting a cookie header
 stub.inputHttpHeaders_x.put('Cookie', 'name=value');

 //Setting a custom HTTP header
 stub.inputHttpHeaders_x.put('myHeader', 'myValue');

 String input = 'This is the input string';
 String output = stub.EchoString(input); // Call the webservice method
```

---

TITLE: Accessing HTTP Response Headers from Web Service Callout
DESCRIPTION: Shows how to access standard (Set-Cookie) and custom response headers from the outputHttpHeaders_x map on a WSDL-generated stub after a callout.
SOURCE: Apex Developer Guide v64.0 (Page 583)
LANGUAGE: apex
CODE:

```apex
 docSample.DocSamplePort stub = new docSample.DocSamplePort(); // Assumes docSample class generated from WSDL
 stub.outputHttpHeaders_x = new Map<String, String>(); // Initialize map to receive headers
 String input = 'This is the input string';
 String output = stub.EchoString(input);

 //Getting cookie header
 String cookie = stub.outputHttpHeaders_x.get('Set-Cookie');

 //Getting custom header
 String myHeader = stub.outputHttpHeaders_x.get('My-Header');
```

---

TITLE: Generated WSDL2Apex Code Structure (docSample)
DESCRIPTION: Shows the structure of an Apex class auto-generated from a sample WSDL, including inner classes for elements and the port type class.
SOURCE: Apex Developer Guide v64.0 (Page 587)
LANGUAGE: apex
CODE:

```apex
 //Generated by wsdl2apex
 public class docSample {
  public class EchoStringResponse_element {
   public String EchoStringResult;
   // ... type info arrays ...
  }
  public class EchoString_element {
   public String input;
   // ... type info arrays ...
  }
  public class DocSamplePort {
   public String endpoint_x = 'http://YourServer/YourService';
   public Map<String,String> inputHttpHeaders_x;
   public Map<String,String> outputHttpHeaders_x;
   // ... other standard members (clientCert, timeout, etc.) ...
   public String EchoString(String input) {
    docSample.EchoString_element request_x = new docSample.EchoString_element();
    request_x.input = input;
    docSample.EchoStringResponse_element response_x;
    Map<String, docSample.EchoStringResponse_element> response_map_x =
     new Map<String, docSample.EchoStringResponse_element>();
    response_map_x.put('response_x', response_x);
    WebServiceCallout.invoke( /* ... parameters ... */ ); // Simplified callout representation
    response_x = response_map_x.get('response_x');
    return response_x.EchoStringResult;
   }
  }
 }
```

---

TITLE: Implementing WebServiceMock Interface
DESCRIPTION: Basic structure for implementing the WebServiceMock interface to provide fake responses for test methods.
SOURCE: Apex Developer Guide v64.0 (Page 589)
LANGUAGE: apex
CODE:

```apex
 global class YourWebServiceMockImpl implements WebServiceMock {
  global void doInvoke(
   Object stub,
   Object request,
   Map<String, Object> response,
   String endpoint,
   String soapAction,
   String requestName,
   String responseNS,
   String responseName,
   String responseType) {

   // Create response element from the autogenerated class.
   // Populate response element.
   // Add response element to the response parameter, as follows:
   // response.put('response_x', responseElement);
  }
 }
```

---

TITLE: Mock Implementation for Web Service Callout Test
DESCRIPTION: Example implementation of WebServiceMock that creates and returns a hardcoded response for the EchoString operation.
SOURCE: Apex Developer Guide v64.0 (Page 590)
LANGUAGE: apex
CODE:

```apex
 @isTest
 global class WebServiceMockImpl implements WebServiceMock {
  global void doInvoke(
   /* ... parameters ... */ ) {
   // Create and populate the response element based on the generated class
   docSample.EchoStringResponse_element respElement =
    new docSample.EchoStringResponse_element();
   respElement.EchoStringResult = 'Mock response';
   // Add to the response map
   response.put('response_x', respElement);
  }
 }
```

---

TITLE: Class Making Web Service Callout
DESCRIPTION: Simple class containing a static method that invokes the EchoString web service method from the generated docSample class.
SOURCE: Apex Developer Guide v64.0 (Page 590)
LANGUAGE: apex
CODE:

```apex
 public class WebSvcCallout {
  public static String callEchoString(String input) {
   docSample.DocSamplePort sample = new docSample.DocSamplePort();
   sample.endpoint_x = 'https://example.com/example/test'; // Example endpoint
   // This invokes the EchoString method in the generated class
   String echo = sample.EchoString(input);
   return echo;
  }
 }
```

---

TITLE: Testing Web Service Callout with Mock Response
DESCRIPTION: Test method that uses Test.setMock to inject the WebServiceMockImpl, calls the web service method, and asserts the mock response is received.
SOURCE: Apex Developer Guide v64.0 (Page 591)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class WebSvcCalloutTest {
  @isTest static void testEchoString() {
   // Set the mock implementation
   Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

   // Call the method that invokes the callout
   String output = WebSvcCallout.callEchoString('Hello World!');

   // Verify that the mock response is returned
   System.assertEquals('Mock response', output);
  }
 }
```

---

TITLE: Testing DML Operations Before Mock Callouts
DESCRIPTION: Test method showing how to perform DML (insert Account) before setting a mock callout, by enclosing the mock setup and callout invocation within Test.startTest/stopTest.
SOURCE: Apex Developer Guide v64.0 (Page 591)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class WebSvcCalloutTest {
  @isTest static void testEchoStringWithDML() { // Renamed for clarity
   // Perform DML before mock setup
   Account testAcct = new Account(Name='Test Account');
   insert testAcct;

   // Call Test.startTest before mock setup
   Test.startTest();

   // Set mock callout class
   Test.setMock(WebServiceMock.class, new WebServiceMockImpl());

   // Call the method that invokes a callout
   String output = WebSvcCallout.callEchoString('Hello World!');

   // Verify that a fake result is returned
   System.assertEquals('Mock response', output);

   Test.stopTest(); // End test context
  }
 }
```

---

TITLE: Testing Asynchronous Callouts with Mock Responses
DESCRIPTION: Shows how to test asynchronous operations (like @future methods or batch Apex) that perform mock callouts, using Test.startTest/stopTest to ensure execution.
SOURCE: Apex Developer Guide v64.0 (Page 592)
LANGUAGE: apex
CODE:

```apex
 // Scenario 1: Async call within start/stopTest
 Test.startTest();
 MyClass.asyncCall(); // Assume this method performs a mock callout internally
 Test.stopTest(); // Async executes here
 Test.setMock(HttpCalloutMock.class, new MyMock()); // Set mock *after* async call initiated
 MyClass.mockCallout(); // Call the method performing the callout (if needed directly)

 // Scenario 2: Async call before start/stopTest
 MyClass.asyncCall(); // Call async method first
 Test.startTest();
 Test.setMock(HttpCalloutMock.class, new MyMock()); // Enclose mock setup and callout
 MyClass.mockCallout(); // Call method performing callout
 Test.stopTest();
```

---

TITLE: Invoking HTTP Callout (GET)
DESCRIPTION: Simple example making an HTTP GET request using the Http and HttpRequest classes.
SOURCE: Apex Developer Guide v64.0 (Page 594)
LANGUAGE: apex
CODE:

```apex
 public class HttpCalloutSample {
  public String getCalloutResponseContents(String url) {
   Http h = new Http();
   HttpRequest req = new HttpRequest();
   req.setEndpoint(url);
   req.setMethod('GET');
   HttpResponse res = h.send(req);
   return res.getBody();
  }
 }
```

---

TITLE: Invoking HTTP Callout (POST)
DESCRIPTION: Example making an HTTP POST request with a JSON body using the Http and HttpRequest classes.
SOURCE: Apex Developer Guide v64.0 (Page 595)
LANGUAGE: apex
CODE:

```apex
 public class HttpPostCalloutSample {
  public String getPostCalloutResponseContents(String url) {
   Http h = new Http();
   HttpRequest req = new HttpRequest();
   req.setEndpoint(url);
   req.setMethod('POST');
   req.setHeader('Content-Type', 'application/json');
   req.setBody('{Your_JSON_Content}'); // Replace with actual JSON
   HttpResponse res = h.send(req);
   return res.getBody();
  }
 }
```

---

TITLE: Referencing Named Credential in HTTP Callout
DESCRIPTION: Example setting the endpoint for an HttpRequest using the 'callout:' scheme to reference a Named Credential.
SOURCE: Apex Developer Guide v64.0 (Page 576)
LANGUAGE: apex
CODE:

```apex
 HttpRequest req = new HttpRequest();
 req.setEndpoint('callout:My_Named_Credential/some_path');
 req.setMethod('GET');
 Http http = new Http();
 HTTPResponse res = http.send(req);
 System.debug(res.getBody());
```

---

TITLE: HTTP Callout without Named Credential (Manual Auth)
DESCRIPTION: Contrasting example showing the complexity of handling basic authentication manually when not using a Named Credential.
SOURCE: Apex Developer Guide v64.0 (Page 578)
LANGUAGE: apex
CODE:

```apex
 HttpRequest req = new HttpRequest();
 req.setEndpoint('https://my_endpoint.example.com/some_path');
 req.setMethod('GET');

 // Manual Authentication
 String username = 'myname';
 String password = 'mypwd';
 Blob headerValue = Blob.valueOf(username + ':' + password);
 String authorizationHeader = 'BASIC ' + EncodingUtil.base64Encode(headerValue);
 req.setHeader('Authorization', authorizationHeader);

 Http http = new Http();
 HTTPResponse res = http.send(req);
 System.debug(res.getBody());
```

---

TITLE: Mock HTTP Callout Implementation (Basic)
DESCRIPTION: Basic structure for implementing the HttpCalloutMock interface to provide mock responses in tests.
SOURCE: Apex Developer Guide v64.0 (Page 596)
LANGUAGE: apex
CODE:

```apex
 global class YourHttpCalloutMockImpl implements HttpCalloutMock {
  global HTTPResponse respond(HTTPRequest req) {
   // Create a fake response.
   HttpResponse res = new HttpResponse();
   // Set response values, e.g., res.setStatusCode(200), res.setBody('...');
   // return response.
   return res;
  }
 }
```

---

TITLE: Mock HTTP Callout Implementation Example
DESCRIPTION: Concrete example implementing HttpCalloutMock to return a specific JSON response for a GET request to a particular endpoint.
SOURCE: Apex Developer Guide v64.0 (Page 596)
LANGUAGE: apex
CODE:

```apex
 @isTest
 global class MockHttpResponseGenerator implements HttpCalloutMock {
  global HTTPResponse respond(HTTPRequest req) {
   // Optionally, assert endpoint and method
   System.assertEquals('https://example.com/example/test', req.getEndpoint());
   System.assertEquals('GET', req.getMethod());

   // Create a fake response
   HttpResponse res = new HttpResponse();
   res.setHeader('Content-Type', 'application/json');
   res.setBody('{"example":"test"}');
   res.setStatusCode(200);
   return res;
  }
 }
```

---

TITLE: Class Making HTTP Callout (for Testing)
DESCRIPTION: Simple class with a method that performs an HTTP GET request, designed to be tested using a mock callout.
SOURCE: Apex Developer Guide v64.0 (Page 597)
LANGUAGE: apex
CODE:

```apex
 public class CalloutClass {
  public static HttpResponse getInfoFromExternalService() {
   HttpRequest req = new HttpRequest();
   req.setEndpoint('https://example.com/example/test');
   req.setMethod('GET');
   Http h = new Http();
   HttpResponse res = h.send(req);
   return res;
  }
 }
```

---

TITLE: Testing HTTP Callout with Mock Implementation
DESCRIPTION: Test method using Test.setMock with the MockHttpResponseGenerator implementation to test the CalloutClass method.
SOURCE: Apex Developer Guide v64.0 (Page 597)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class CalloutClassTest {
  @isTest static void testCallout() {
   // Set mock callout class
   Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());

   // Call method to test.
   HttpResponse res = CalloutClass.getInfoFromExternalService();

   // Verify response received contains fake values
   String contentType = res.getHeader('Content-Type');
   System.assert(contentType == 'application/json');
   String actualValue = res.getBody();
   String expectedValue = '{"example":"test"}';
   System.assertEquals(actualValue, expectedValue);
   System.assertEquals(200, res.getStatusCode());
  }
 }
```

---

TITLE: Setting Up Static Resource Mock Callout
DESCRIPTION: Code snippet showing how to create and configure a StaticResourceCalloutMock instance for testing.
SOURCE: Apex Developer Guide v64.0 (Page 598)
LANGUAGE: apex
CODE:

```apex
 StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
 mock.setStaticResource('myStaticResourceName'); // Name of the static resource with response body
 mock.setStatusCode(200);
 mock.setHeader('Content-Type', 'application/json');

 // Set the mock in the test method:
 // Test.setMock(HttpCalloutMock.class, mock);
```

---

TITLE: Testing HTTP Callout with Static Resource Mock
DESCRIPTION: Test class demonstrating the use of StaticResourceCalloutMock to provide a response body from a static resource during testing.
SOURCE: Apex Developer Guide v64.0 (Page 599)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class CalloutStaticClassTest {
  @isTest static void testCalloutWithStaticResources() {
   // Use StaticResourceCalloutMock built-in class
   StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
   mock.setStaticResource('mockResponse'); // Static resource name
   mock.setStatusCode(200);
   mock.setHeader('Content-Type', 'application/json');

   // Set the mock callout mode
   Test.setMock(HttpCalloutMock.class, mock);

   // Call the method that performs the callout
   HTTPResponse res = CalloutStaticClass.getInfoFromExternalService(
    'https://example.com/example/test'); // Class from source

   // Verify response received contains values from the static resource
   System.assertEquals('{"hah":"fooled you"}', res.getBody()); // Content of mockResponse static resource
   System.assertEquals(200,res.getStatusCode());
   System.assertEquals('application/json', res.getHeader('Content-Type'));
  }
 }
```

---

TITLE: Setting Up Multi-Static Resource Mock Callout
DESCRIPTION: Code snippet showing how to create and configure a MultiStaticResourceCalloutMock instance, mapping different endpoints to different static resources.
SOURCE: Apex Developer Guide v64.0 (Page 599)
LANGUAGE: apex
CODE:

```apex
 MultiStaticResourceCalloutMock multimock = new MultiStaticResourceCalloutMock();
 multimock.setStaticResource('https://example.com/example/test', 'mockResponse');
 multimock.setStaticResource('https://example.com/example/sfdc', 'mockResponse2');
 multimock.setStatusCode(200);
 multimock.setHeader('Content-Type', 'application/json');

 // Set the mock in the test method:
 // Test.setMock(HttpCalloutMock.class, multimock);
```

---

TITLE: Testing HTTP Callout with Multi-Static Resource Mock
DESCRIPTION: Test method using MultiStaticResourceCalloutMock to test callouts to different endpoints, receiving different responses from specified static resources.
SOURCE: Apex Developer Guide v64.0 (Page 600)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class CalloutMultiStaticClassTest {
  @isTest static void testCalloutWithMultipleStaticResources() {
   // Use MultiStaticResourceCalloutMock
   MultiStaticResourceCalloutMock multimock = new MultiStaticResourceCalloutMock();
   multimock.setStaticResource('https://example.com/example/test', 'mockResponse');
   multimock.setStaticResource('https://example.com/example/sfdc', 'mockResponse2');
   multimock.setStatusCode(200);
   multimock.setHeader('Content-Type', 'application/json');

   // Set the mock callout mode
   Test.setMock(HttpCalloutMock.class, multimock);

   // Call the method for the first endpoint
   HTTPResponse res = CalloutMultiStaticClass.getInfoFromExternalService(
    'https://example.com/example/test'); // Class from source
   // Verify response received
   System.assertEquals('{"hah":"fooled you"}', res.getBody());

   // Call the method for the second endpoint
   HTTPResponse res2 = CalloutMultiStaticClass.getInfoFromExternalService(
    'https://example.com/example/sfdc');
   // Verify response received
   System.assertEquals('{"hah":"fooled you twice"}', res2.getBody()); // Assumes content of mockResponse2
  }
 }
```

---

TITLE: Continuation Action Method Example
DESCRIPTION: Action method in an Apex controller that creates a Continuation object, sets a callback method, adds an HttpRequest, and returns the Continuation.
SOURCE: Apex Developer Guide v64.0 (Page 607)
LANGUAGE: apex
CODE:

```apex
 public with sharing class ContinuationController {
  public String requestLabel;
  // ... result property ...

  public Object startRequest() {
   Continuation con = new Continuation(40); // 40 second timeout
   con.continuationMethod='processResponse'; // Callback method name

   HttpRequest req = new HttpRequest();
   req.setMethod('GET');
   req.setEndpoint('<Insert your service URL>'); // Example endpoint

   this.requestLabel = con.addHttpRequest(req); // Add request and store label
   return con; // Return Continuation to suspend request
  }
  // ... callback method ...
 }
```

---

TITLE: Continuation Callback Method Example
DESCRIPTION: Callback method in an Apex controller that retrieves the HttpResponse using the stored request label and processes the response body.
SOURCE: Apex Developer Guide v64.0 (Page 607)
LANGUAGE: apex
CODE:

```apex
 public with sharing class ContinuationController {
  public String requestLabel;
  public String result {get;set;}
  // ... action method ...

  // Callback method
  public Object processResponse() {
   // Get the response by using the unique label
   HttpResponse response = Continuation.getResponse(this.requestLabel);
   // Set the result variable that is displayed on the Visualforce page
   this.result = response.getBody();
   // Return null to re-render the original Visualforce page
   return null;
  }
 }
```

---

TITLE: Multiple Parallel Callouts using Continuation
DESCRIPTION: Controller action method setting up a Continuation to handle two parallel HTTP requests, storing their unique labels.
SOURCE: Apex Developer Guide v64.0 (Page 613)
LANGUAGE: apex
CODE:

```apex
 public with sharing class MultipleCalloutController {
  public String requestLabel1;
  public String requestLabel2;
  // ... result properties ...

  public Object startRequestsInParallel() {
   Continuation con = new Continuation(60);
   con.continuationMethod='processAllResponses';

   // Create first callout request
   HttpRequest req1 = new HttpRequest();
   req1.setMethod('GET');
   req1.setEndpoint('<Insert your first service URL>');
   this.requestLabel1 = con.addHttpRequest(req1); // Add first request

   // Create second callout request
   HttpRequest req2 = new HttpRequest();
   req2.setMethod('GET');
   req2.setEndpoint('<Insert your second service URL>');
   this.requestLabel2 = con.addHttpRequest(req2); // Add second request

   return con;
  }
  // ... callback method ...
 }
```

---

TITLE: Callback Method for Multiple Parallel Callouts
DESCRIPTION: Callback method processing responses from two parallel callouts by retrieving each response using its unique label.
SOURCE: Apex Developer Guide v64.0 (Page 614)
LANGUAGE: apex
CODE:

```apex
 public with sharing class MultipleCalloutController {
  public String requestLabel1;
  public String requestLabel2;
  public String result1 {get;set;}
  public String result2 {get;set;}
  // ... action method ...

  // Callback method. Invoked only when responses of all callouts are returned.
  public Object processAllResponses() {
   // Get the response of the first request
   HttpResponse response1 = Continuation.getResponse(this.requestLabel1);
   this.result1 = response1.getBody();

   // Get the response of the second request
   HttpResponse response2 = Continuation.getResponse(this.requestLabel2);
   this.result2 = response2.getBody();

   return null; // Re-render page
  }
 }
```

---

TITLE: Chained Callouts using Continuation
DESCRIPTION: Demonstrates chaining asynchronous callouts; the first callback method potentially initiates a second Continuation if a condition is met.
SOURCE: Apex Developer Guide v64.0 (Page 615)
LANGUAGE: apex
CODE:

```apex
 public with sharing class ChainedContinuationController {
  public String requestLabel1;
  public String requestLabel2;
  public String result1 {get;set;}
  public String result2 {get;set;}
  // ... action method invokeInitialRequest() ...

  // Callback method for initial request
  public Object processInitialResponse() {
   HttpResponse response = Continuation.getResponse(this.requestLabel1);
   this.result1 = response.getBody();

   Continuation chainedContinuation = null;
   // Chain continuation if some condition is met
   if (response.getBody().toLowerCase().contains('expired')) {
    chainedContinuation = new Continuation(60);
    chainedContinuation.continuationMethod='processChainedResponse';

    HttpRequest req = new HttpRequest();
    req.setMethod('GET');
    req.setEndpoint('<Insert your second service URL>');
    this.requestLabel2 = chainedContinuation.addHttpRequest(req);
   }
   // Start another continuation or return null
   return chainedContinuation;
  }

  // Callback method for chained request
  public Object processChainedResponse() {
   HttpResponse response = Continuation.getResponse(this.requestLabel2);
   this.result2 = response.getBody();
   return null;
  }
 }
```

---

TITLE: Asynchronous Callout from WSDL-Generated Class
DESCRIPTION: Action method showing how to initiate an asynchronous callout using a method (beginStockQuote) on an auto-generated Async SOAP service class, passing a Continuation object.
SOURCE: Apex Developer Guide v64.0 (Page 617)
LANGUAGE: apex
CODE:

```apex
 public Continuation startRequest() { // Assumes AsyncSOAPStockQuoteService class exists
  Integer TIMEOUT_INT_SECS = 60;
  Continuation cont = new Continuation(TIMEOUT_INT_SECS);
  cont.continuationMethod = 'processResponse'; // Callback

  AsyncSOAPStockQuoteService.AsyncStockQuoteServiceSoap stockQuoteService =
   new AsyncSOAPStockQuoteService.AsyncStockQuoteServiceSoap();

  // Invoke the async method on the generated stub, passing the Continuation
  Object stockQuoteFuture = stockQuoteService.beginStockQuote(cont,'CRM'); // Example parameter 'CRM'

  // Store the future result object if needed by the callback
  // this.stockQuoteFuture = stockQuoteFuture;

  return cont;
 }
```

---

TITLE: Callback Method for WSDL-Generated Asynchronous Callout
DESCRIPTION: Callback method retrieving the result from an asynchronous WSDL callout using the getValue() method on the future result object.
SOURCE: Apex Developer Guide v64.0 (Page 617)
LANGUAGE: apex
CODE:

```apex
 public Object processResponse() { // Assumes stockQuoteFuture is a member variable holding the result of beginStockQuote
  // result = stockQuoteFuture.getValue(); // Get the actual response object
  // Process the result ...
  return null;
 }
```

---

TITLE: Mock Testing for WSDL-Based Asynchronous Callout
DESCRIPTION: Test method demonstrating how to mock a WSDL-based asynchronous callout using Test.setContinuationResponse and Test.invokeContinuationMethod.
SOURCE: Apex Developer Guide v64.0 (Page 619)
LANGUAGE: apex
CODE:

```apex
 @isTest
 public class ContinuationTestingForWSDL {
  public static testmethod void testWebService() {
   ContinuationSOAPController demoWSDLClass = new ContinuationSOAPController(); // Controller being tested

   // Invoke the action method to get the Continuation
   Continuation conti = (Continuation) demoWSDLClass.startRequest();

   // Verify the request was added to the continuation
   Map<String, HttpRequest> requests = conti.getRequests();
   System.assertEquals(requests.size(), 1);
   String requestLabel = requests.keyset().iterator().next(); // Get the request label

   // Create the fake response (matching the expected response element type)
   AsyncSOAPStockQuoteService.GetStockQuoteResponse_element responseElement =
       new AsyncSOAPStockQuoteService.GetStockQuoteResponse_element();
   // Populate responseElement with mock data, e.g., responseElement.result = 'Mock Result';

   // Set the fake response for the continuation
   Test.setContinuationResponse(requestLabel, responseElement);

   // Invoke callback method
   Object result = Test.invokeContinuationMethod(demoWSDLClass, conti);

   // Verify callback return value and controller state
   System.assertEquals(null, result);
   // System.assertEquals('Mock Result', demoWSDLClass.result); // Verify result property
  }
 }
```

---

TITLE: Parsing JSON Response with JSONParser
DESCRIPTION: Example making an HTTP callout and then using JSONParser to iterate through the JSON response tokens to extract 'label' and 'version' values into a map.
SOURCE: Apex Developer Guide v64.0 (Page 625)
LANGUAGE: apex
CODE:

```apex
 public static void parseJSONResponse() {
  HttpRequest request = new HttpRequest();
  String endpoint = URL.getOrgDomainUrl().toExternalForm() + '/services/data'; // Example endpoint
  request.setEndpoint(endpoint);
  request.setMethod('GET');
  request.setHeader('Accept', 'application/json');

  Http httpProtocol = new Http();
  HttpResponse response = httpProtocol.send(request);

  JSONParser parser = JSON.createParser(response.getBody());
  Map<double, string> apiVersionToReleaseNameMap = new Map<double, string>();
  string label = null;
  double version = null;

  while (parser.nextToken() != null) {
   if (parser.getCurrentToken() == JSONToken.FIELD_NAME) {
    String fieldName = parser.getText();
    parser.nextToken(); // Move to value
    if (fieldName == 'label') {
     label = parser.getText();
    } else if (fieldName == 'version') {
     version = parser.getDoubleValue(); // Use getDoubleValue for numeric parsing
    }
   }
   // Check if both parts of an entry have been found
   if(version != null && label != null) {
    apiVersionToReleaseNameMap.put(version, label);
    // Reset for next entry
    version = null;
    label = null;
   }
  }
  system.debug(apiVersionToReleaseNameMap);
 }
```

---

TITLE: Parse JSON String and Deserialize into Objects
DESCRIPTION: Parses a hardcoded JSON string representing a list of invoices (with nested line items) and deserializes each invoice into a custom Apex Invoice object using parser.readValueAs().
SOURCE: Apex Developer Guide v64.0 (Page 626)
LANGUAGE: apex
CODE:

```apex
 public static void parseJSONString() {
  String jsonStr = /* ... JSON string definition ... */ ; // As provided in source

  JSONParser parser = JSON.createParser(jsonStr);
  while (parser.nextToken() != null) {
   if (parser.getCurrentToken() == JSONToken.FIELD_NAME && parser.getText() == 'invoiceList') {
       parser.nextToken(); // Move to START_ARRAY
       while (parser.nextToken() != JSONToken.END_ARRAY) {
         if (parser.getCurrentToken() == JSONToken.START_OBJECT) {
          // Read entire invoice object
          Invoice inv = (Invoice)parser.readValueAs(Invoice.class);
          system.debug('Invoice number: ' + inv.invoiceNumber);
          system.debug('Size of list items: ' + inv.lineItems.size());
         }
       }
   }
  }
 }
 // Inner Invoice and LineItem classes assumed to be defined as in source
 public class Invoice { /* ... members ... */ }
 public class LineItem { /* ... members ... */ }
```

---

TITLE: Dynamic SOQL Query with Simple Bind Variable (Database.query)
DESCRIPTION: Example using Database.query to execute a dynamic SOQL string containing a simple bind variable.
SOURCE: Apex Developer Guide v64.0 (Page 206)
LANGUAGE: apex
CODE:

```apex
 String myTestString = 'TestName';
 List<sObject> sobjList = Database.query('SELECT Id FROM MyCustomObject__c WHERE Name = :myTestString');
```

---

TITLE: Dynamic SOQL Query with String Field Bind Variable (Database.query)
DESCRIPTION: Example where a field from an Apex object is resolved into a string variable before being used as a bind variable in Database.query.
SOURCE: Apex Developer Guide v64.0 (Page 206)
LANGUAGE: apex
CODE:

```apex
 MyCustomObject__c myVariable = new MyCustomObject__c(field1__c ='TestField');
 String resolvedField1 = myVariable.field1__c;
 List<sObject> sobjList = Database.query('SELECT Id FROM MyCustomObject__c WHERE field1__c = :resolvedField1');
```

---

TITLE: XML Stream Reader Basic Usage
DESCRIPTION: Instantiates an XmlStreamReader from an XML string.
SOURCE: Apex Developer Guide v64.0 (Page 627)
LANGUAGE: apex
CODE:

```apex
 String xmlString = '<books><book>My Book</book><book>Your Book</book></books>';
 XmlStreamReader xsr = new XmlStreamReader(xmlString);
```

---

TITLE: XML Stream Reader Parsing Example
DESCRIPTION: Class demonstrating parsing an XML string using XmlStreamReader to extract Book names and authors.
SOURCE: Apex Developer Guide v64.0 (Page 628)
LANGUAGE: apex
CODE:

```apex
 public class XmlStreamReaderDemo {
  public class Book { String name; String author;}

  public Book[] parseBooks(XmlStreamReader reader) {
   Book[] books = new Book[0];
   while(reader.hasNext()) { // Check if there's more to read
    if (reader.getEventType() == XmlTag.START_ELEMENT) {
     if ('Book' == reader.getLocalName()) {
      Book book = parseBook(reader); // Parse individual book element
      books.add(book);
     }
    }
    if (reader.hasNext()) // Check again before calling next
       reader.next();
    else
       break; // Exit loop if no more tokens
   }
   return books;
  }

  Book parseBook(XmlStreamReader reader) {
   Book book = new Book();
   book.author = reader.getAttributeValue(null, 'author'); // Get attribute

   while(reader.hasNext()) {
       reader.next(); // Move to next token
       if (reader.getEventType() == XmlTag.END_ELEMENT && 'Book' == reader.getLocalName()) {
           break; // Exit when book end tag is found
       } else if (reader.getEventType() == XmlTag.CHARACTERS) {
           book.name = reader.getText(); // Get element text content
       }
   }
   return book;
  }
 }
```

---

TITLE: XML Stream Reader Test Example
DESCRIPTION: Test method for the XmlStreamReaderDemo class, creating a reader and calling the parseBooks method.
SOURCE: Apex Developer Guide v64.0 (Page 629)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class XmlStreamReaderDemoTest {
  static testMethod void testBookParser() {
   XmlStreamReaderDemo demo = new XmlStreamReaderDemo();
   String str = '<books><book author="Chatty">Alpha beta</book>' +
    '<book author="Sassy">Baz</book></books>';
   XmlStreamReader reader = new XmlStreamReader(str);
   XmlStreamReaderDemo.Book[] books = demo.parseBooks(reader);
   System.assertEquals(2, books.size()); // Verify number of books parsed
   // Further assertions on book content can be added here
  }
 }
```

---

TITLE: XML Stream Writer Example
DESCRIPTION: Demonstrates using XmlStreamWriter to programmatically create an XML document string.
SOURCE: Apex Developer Guide v64.0 (Page 630)
LANGUAGE: apex
CODE:

```apex
 public class XmlWriterDemo {
  public String getXml() {
   XmlStreamWriter w = new XmlStreamWriter();
   w.writeStartDocument(null, '1.0');
   w.writeProcessingInstruction('target', 'data');
   w.writeStartElement('m', 'Library', 'http://www.book.com');
   w.writeNamespace('m', 'http://www.book.com');
   w.writeComment('Book starts here');
   w.setDefaultNamespace('http://www.defns.com');
   w.writeCData('<Cdata> I like CData </Cdata>');
   w.writeStartElement(null, 'book', null);
   w.writedefaultNamespace('http://www.defns.com');
   w.writeAttribute(null, null, 'author', 'Manoj');
   w.writeCharacters('This is my book');
   w.writeEndElement(); //end book
   w.writeEmptyElement(null, 'ISBN', null);
   w.writeEndElement(); //end library
   w.writeEndDocument();
   String xmlOutput = w.getXmlString();
   w.close();
   return xmlOutput;
  }
 }
```

---

TITLE: XML Stream Writer Test Example
DESCRIPTION: Test method for XmlWriterDemo, calling getXml() and asserting the generated XML string matches the expected output.
SOURCE: Apex Developer Guide v64.0 (Page 630)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class XmlWriterDemoTest {
  static TestMethod void basicTest() {
   XmlWriterDemo demo = new XmlWriterDemo();
   String result = demo.getXml();
   String expected = '<?xml version="1.0"?><?target data?>' +
    '<m:Library xmlns:m="http://www.book.com">' +
    '<!--Book starts here-->' +
    '<![CDATA[<Cdata> I like CData </Cdata>]]>' +
    '<book xmlns="http://www.defns.com" author="Manoj">This is my book</book><ISBN/></m:Library>';
   System.assertEquals(expected, result); // Use assertEquals for comparison
  }
 }
```

---

TITLE: XML DOM Parsing Example
DESCRIPTION: Parses an XML response from an HTTP callout using the DOM (Document Object Model) classes (Dom.Document, Dom.XMLNode) to access element values.
SOURCE: Apex Developer Guide v64.0 (Page 631)
LANGUAGE: apex
CODE:

```apex
 public class DomDocument {
  public void parseResponseDom(String url){
   Http h = new Http();
   HttpRequest req = new HttpRequest();
   req.setEndpoint(url); // URL returning the sample address XML
   req.setMethod('GET');
   HttpResponse res = h.send(req);
   Dom.Document doc = res.getBodyDocument();

   //Retrieve the root element
   Dom.XMLNode address = doc.getRootElement();

   // Get specific child element text values
   String name = address.getChildElement('name', null).getText();
   String state = address.getChildElement('state', null).getText();
   System.debug('Name: ' + name);
   System.debug('State: ' + state);

   // Loop through all child elements
   for(Dom.XMLNode child : address.getChildElements()) {
    System.debug(child.getText());
   }
  }
 }
```

---

TITLE: XML DOM Creation with Namespaces Example
DESCRIPTION: Demonstrates creating an XML document programmatically using DOM classes, including setting namespaces and attributes.
SOURCE: Apex Developer Guide v64.0 (Page 633)
LANGUAGE: apex
CODE:

```apex
 public class DomNamespaceSample {
  public void sendRequest(String endpoint) {
   // Create the request envelope document
   DOM.Document doc = new DOM.Document();

   String soapNS = 'http://schemas.xmlsoap.org/soap/envelope/';
   String xsi = 'http://www.w3.org/2001/XMLSchema-instance';
   String serviceNS = 'http://www.myservice.com/services/MyService/';

   // Create root element with namespaces
   dom.XmlNode envelope = doc.createRootElement('Envelope', soapNS, 'soapenv');
   envelope.setNamespace('xsi', xsi);
   envelope.setAttributeNS('schemaLocation', soapNS, xsi, null); // Note: attribute value set to null here

   // Create body and child elements
   dom.XmlNode body = envelope.addChildElement('Body', soapNS, null);
   body.addChildElement('echo', serviceNS, 'req')
    .addChildElement('category', serviceNS, null)
    .addTextNode('classifieds');

   System.debug(doc.toXmlString()); // Output the generated XML

   // Code to send the request (HttpRequest setup and send) would follow...
   // ...
  }
 }
```

---

TITLE: Zip File Entry Extraction Example
DESCRIPTION: Shows extracting a specific entry ('translations/fr.json') from a Zip Blob obtained from an HTTP response using ZipReader.
SOURCE: Apex Developer Guide v64.0 (Page 635)
LANGUAGE: apex
CODE:

```apex
 // Assume 'response' is an HttpResponse containing a zip file in its body
 Blob translationZip = response.getBodyAsBlob();

 ZipReader reader = new ZipReader(translationZip);
 ZipEntry frTranslation = reader.getEntry('translations/fr.json');
 Blob frTranslationData = reader.extractEntry(frTranslation);
```

---

TITLE: Crypto Class HMAC Generation Example
DESCRIPTION: Example generating an HMAC-SHA1 signature for integrating with Amazon Web Services, involving timestamp formatting and URL encoding.
SOURCE: Apex Developer Guide v64.0 (Page 635)
LANGUAGE: apex
CODE:

```apex
 public void testAlexaWSForAmazon() {
  DateTime d = System.now();
  // Format timestamp as required by AWS
  String timestamp = ''+ d.year() + '-' + d.month() + '-' + d.day() + '\'T\'' +
   d.hour() + ':' + d.minute() + ':' + d.second() + '.' + d.millisecond() + '\'Z\'';
  String timeFormat = d.formatGmt(timestamp); // Should likely be d.formatGmt('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'')

  String urlEncodedTimestamp = EncodingUtil.urlEncode(timeFormat, 'UTF-8'); // Use formatted time
  String action = 'UrlInfo';
  String inputStr = action + timeFormat; // String to sign
  String algorithmName = 'HMacSHA1';
  Blob mac = Crypto.generateMac(algorithmName, Blob.valueOf(inputStr),
   Blob.valueOf('your_signing_key')); // Replace with your actual key
  String macUrl = EncodingUtil.urlEncode(EncodingUtil.base64Encode(mac), 'UTF-8');

  // ... (Code to build the rest of the request URL using macUrl) ...
 }
```

---

TITLE: Crypto Class Encryption/Decryption Example
DESCRIPTION: Demonstrates basic AES256 encryption and decryption using Crypto.encryptWithManagedIV and Crypto.decryptWithManagedIV.
SOURCE: Apex Developer Guide v64.0 (Page 636)
LANGUAGE: apex
CODE:

```apex
 // Use generateAesKey to generate the private key
 Blob cryptoKey = Crypto.generateAesKey(256);

 // Generate the data to be encrypted.
 Blob data = Blob.valueOf('Test data to encrypted');

 // Encrypt the data
 Blob encryptedData = Crypto.encryptWithManagedIV('AES256', cryptoKey, data);

 // Decrypt the data
 Blob decryptedData = Crypto.decryptWithManagedIV('AES256', cryptoKey, encryptedData);

 // Verify original data matches decrypted data
 System.assertEquals(data.toString(), decryptedData.toString());
```

---

TITLE: Crypto Class Encryption/Decryption Test (Valid)
DESCRIPTION: Test method verifying successful encryption and decryption using AES128 when the same key is used for both operations.
SOURCE: Apex Developer Guide v64.0 (Page 636)
LANGUAGE: apex
CODE:

```apex
 static testMethod void testValidDecryption() {
  Blob key = Crypto.generateAesKey(128);
  Blob data = Blob.valueOf('Test data');
  String b64Data = EncodingUtil.base64Encode(data);

  Blob encryptedData = Crypto.encryptWithManagedIV('AES128', key, data);
  Blob decryptedData = Crypto.decryptWithManagedIV('AES128', key, encryptedData);
  String b64Decrypted = EncodingUtil.base64Encode(decryptedData);

  System.assertEquals(b64Data, b64Decrypted);
 }
```

---

TITLE: Crypto Class Encryption/Decryption Test (Invalid Key)
DESCRIPTION: Test method demonstrating that decryption fails with a SecurityException if different keys (or key sizes/algorithms) are used for encryption and decryption.
SOURCE: Apex Developer Guide v64.0 (Page 637)
LANGUAGE: apex
CODE:

```apex
 static testMethod void testInvalidDecryption() {
  Blob keyOne = Crypto.generateAesKey(128);
  Blob keyTwo = Crypto.generateAesKey(256); // Different key size
  Blob data = Blob.valueOf('Test data');

  Blob encryptedData = Crypto.encryptWithManagedIV('AES128', keyOne, data);
  try {
   // Try decrypting the data using the second key/different algorithm
   Crypto.decryptWithManagedIV('AES256', keyTwo, encryptedData);
   System.assert(false, 'Exception was expected'); // Should not reach here
  } catch(SecurityException e) {
   // Verify the expected exception message
   System.assertEquals('Given final block not properly padded', e.getMessage());
  }
 }
```

---

TITLE: URL Encoding Example
DESCRIPTION: Shows URL encoding a timestamp string using EncodingUtil.urlEncode.
SOURCE: Apex Developer Guide v64.0 (Page 637)
LANGUAGE: apex
CODE:

```apex
 DateTime d = System.now();
 String timestamp = ''+ d.year() + '-' + /* ... build timestamp string ... */ + d.millisecond() + '\'Z\'';
 System.debug(timestamp);
 String urlEncodedTimestamp = EncodingUtil.urlEncode(timestamp, 'UTF-8');
 System.debug(urlEncodedTimestamp);
```

---

TITLE: Hex Conversion Example for Digest Auth
DESCRIPTION: Test method generating a SHA1 digest and converting it to a hexadecimal string using EncodingUtil.convertToHex.
SOURCE: Apex Developer Guide v64.0 (Page 637)
LANGUAGE: apex
CODE:

```apex
 @isTest
 private class SampleTest {
  static testmethod void testConvertToHex() {
   String myData = 'A Test String';
   Blob hash = Crypto.generateDigest('SHA1',Blob.valueOf(myData));
   String hexDigest = EncodingUtil.convertToHex(hash);
   System.debug(hexDigest); // Output the hex representation
  }
 }
```

---

TITLE: Pattern Matching Example
DESCRIPTION: Demonstrates compiling a regular expression ('a\*b') into a Pattern object and using it to create a Matcher object for a specific input string ('aaaaab').
SOURCE: Apex Developer Guide v64.0 (Page 639)
LANGUAGE: apex
CODE:

```apex
 // First, instantiate a new Pattern object "MyPattern"
 Pattern MyPattern = Pattern.compile('a*b');
 // Then instantiate a new Matcher object "MyMatcher"
 Matcher MyMatcher = MyPattern.matcher('aaaaab');
 // You can use the system static method assert to verify the match
 System.assert(MyMatcher.matches());
```

---

TITLE: Pattern Matching Static Method Example
DESCRIPTION: Shows using the static Pattern.matches() method for a one-time regex match without explicitly creating Pattern/Matcher objects.
SOURCE: Apex Developer Guide v64.0 (Page 639)
LANGUAGE: apex
CODE:

```apex
 Boolean Test = Pattern.matches('a*b', 'aaaaab');
 System.assert(Test);
```

---

TITLE: Matcher Group Information Example
DESCRIPTION: After a successful match, this code shows how to access group information using Matcher methods like groupCount() and group().
SOURCE: Apex Developer Guide v64.0 (Page 641)
LANGUAGE: apex
CODE:

```apex
 pattern myPattern = pattern.compile('(a(b)?)+'); // Pattern with groups
 matcher myMatcher = myPattern.matcher('aba');
 System.assert(myMatcher.matches() && myMatcher.hitEnd());

 // Access group info
 System.assert(myMatcher.groupCount() == 2); // Number of capturing groups
 System.assert(myMatcher.group(0) == 'aba'); // Group 0 is the entire match
 System.assert(myMatcher.group(1) == 'a'); // Last captured value for group 1
```

---

TITLE: Matcher End Position Example
DESCRIPTION: Demonstrates using the Matcher.end() method to get the offset after the last matched character for the whole match and specific groups.
SOURCE: Apex Developer Guide v64.0 (Page 641)
LANGUAGE: apex
CODE:

```apex
 // Assuming myMatcher from the previous example ('aba' matched against '(a(b)?)+')
 System.assert(myMatcher.end() == 3);
 System.assert(myMatcher.end(0) == 3);
 System.assert(myMatcher.end(1) == 3); // Group 1 also ended at offset 3
```

---

TITLE: Email Normalization using Regex Example
DESCRIPTION: Uses Pattern and Matcher to normalize email addresses by removing subdomains or domain suffixes before checking for duplicates.
SOURCE: Apex Developer Guide v64.0 (Page 641)
LANGUAGE: apex
CODE:

```apex
 class normalizeEmailAddresses{
  public void hasDuplicatesByDomain(Lead[] leads) {
   // Regex to capture base domain (e.g., john@smithco from john@sub.smithco.com)
   Pattern emailPattern = Pattern.compile('(?<=@)((?![\\w]+\\.[\\w]+$)[\\w]+\\.)|(\\.[\\w]+$)');
   Map<String,Lead> leadMap = new Map<String,Lead>();

   for(Lead lead:leads) {
    if(lead.Email != null) {
     // Generate the normalized key
     String emailKey = emailPattern.matcher(lead.Email).replaceAll('');
     if(leadMap.containsKey(emailKey)) {
      lead.email.addError('Duplicate found in batch based on domain');
     } else {
      lead.Duplicate_Key__c = emailKey; // Store the normalized key
      leadMap.put(emailKey, lead);
     }
    }
   }
   // Optional: Query database for existing duplicates using the generated keys
   // ...
  }
 }
```

---

TITLE: Debug Log Header Example
DESCRIPTION: Example showing the format of a debug log header, including API version and logging levels for different categories.
SOURCE: Apex Developer Guide v64.0 (Page 644)
LANGUAGE: text
CODE:

```text
 64.0 APEX_CODE,DEBUG;APEX_PROFILING,INFO;CALLOUT,INFO;DB,INFO;SYSTEM,DEBUG;VALIDATION,INFO;VISUALFORCE,INFO;WORKFLOW,INFO
```

---

TITLE: Debug Log Code Unit Example
DESCRIPTION: Example showing CODE_UNIT_STARTED and CODE_UNIT_FINISHED lines for an anonymous Apex execution and an invoked trigger.
SOURCE: Apex Developer Guide v64.0 (Page 644)
LANGUAGE: text
CODE:

```text
 EXECUTION_STARTED
 CODE_UNIT_STARTED|[EXTERNAL]execute_anonymous_apex
 CODE_UNIT_STARTED|[EXTERNAL]MyTrigger on Account trigger event BeforeInsert for [new]|__sfdc_trigger/MyTrigger
 CODE_UNIT_FINISHED <-- The trigger ends
 CODE_UNIT_FINISHED <-- The executeAnonymous ends
 EXECUTION_FINISHED
```

---

TITLE: Debug Log Full Example
DESCRIPTION: A more complete example debug log showing various event types like USER_INFO, HEAP_ALLOCATE, USER_DEBUG, and CUMULATIVE_LIMIT_USAGE.
SOURCE: Apex Developer Guide v64.0 (Page 646)
LANGUAGE: text
CODE:

```text
 37.0 APEX_CODE,FINEST;APEX_PROFILING,INFO;CALLOUT,INFO;DB,INFO;SYSTEM,DEBUG; ...
 Execute Anonymous: System.debug('Hello World!');
 16:06:58.18 (18043585)|USER_INFO|[EXTERNAL]|005D0000001bYPN|devuser@example.org|...
 16:06:58.18 (18348659)|EXECUTION_STARTED
 16:06:58.18 (18383790)|CODE_UNIT_STARTED|[EXTERNAL]|execute_anonymous_apex
 16:06:58.18 (23822880)|HEAP_ALLOCATE|[72]|Bytes:3
 ... (more HEAP_ALLOCATE lines) ...
 16:06:58.18 (27384663)|STATEMENT_EXECUTE|[1]
 16:06:58.18 (49244886)|USER_DEBUG|[1]|DEBUG|Hello World!
 16:06:58.49 (49590539)|CUMULATIVE_LIMIT_USAGE
 16:06:58.49 (49590539)|LIMIT_USAGE_FOR_NS|(default)|
 Number of SOQL queries: 0 out of 100
 ... (other limits) ...
 16:06:58.49 (49590539)|CUMULATIVE_LIMIT_USAGE_END
 16:06:58.18 (52417923)|CODE_UNIT_FINISHED|execute_anonymous_apex
 16:06:58.18 (54114689)|EXECUTION_FINISHED
```

---

TITLE: Trigger Causing DML Exception (Missing Fields)
DESCRIPTION: Example DML insert within a try block that will cause a DmlException because required fields on Merchandise\_\_c are missing.
SOURCE: Apex Developer Guide v64.0 (Page 672)
LANGUAGE: apex
CODE:

```apex
 try {
  Merchandise__c m = new Merchandise__c();
  insert m; // Fails due to missing required fields
 } catch(DmlException e) {
  System.debug('The following exception has occurred: ' + e.getMessage());
 }
```

---

TITLE: Catching ListException (Index Out of Bounds)
DESCRIPTION: Example code that adds one item to a list but attempts to access the second item (index 1), causing a ListException caught in the catch block.
SOURCE: Apex Developer Guide v64.0 (Page 674)
LANGUAGE: apex
CODE:

```apex
 try {
  List<Integer> li = new List<Integer>();
  li.add(15);
  Integer i1 = li[0]; // OK
  Integer i2 = li[1]; // Causes a ListException
 } catch(ListException le) {
  System.debug('The following exception has occurred: ' + le.getMessage());
 }
```

---

TITLE: Catching NullPointerException
DESCRIPTION: Example code causing a NullPointerException by calling a method (contains) on a null String variable, caught by the catch block.
SOURCE: Apex Developer Guide v64.0 (Page 674)
LANGUAGE: apex
CODE:

```apex
 try {
  String s; // s is null
  Boolean b = s.contains('abc'); // Causes a NullPointerException
 } catch(NullPointerException npe) {
  System.debug('The following exception has occurred: ' + npe.getMessage());
 }
```

---

TITLE: Catching QueryException (No Rows for Assignment)
DESCRIPTION: Example showing a SOQL query intended to return a single record assigned to a single sObject variable. If the query returns no rows, a QueryException is caught.
SOURCE: Apex Developer Guide v64.0 (Page 675)
LANGUAGE: apex
CODE:

```apex
 try {
  // This statement doesn't cause an exception if no records found
  List<Merchandise__c> lm = [SELECT Name FROM Merchandise__c WHERE Name = 'XYZ'];
  System.debug(lm.size()); // Size will be 0

  // This statement causes a QueryException if no record is found
  Merchandise__c m = [SELECT Name FROM Merchandise__c WHERE Name = 'XYZ' LIMIT 1];
 } catch(QueryException qe) {
  System.debug('The following exception has occurred: ' + qe.getMessage());
 }
```

---

TITLE: Catching SObjectException (Field Not Queried)
DESCRIPTION: Example causing an SObjectException by attempting to access a field (Description\_\_c) that was not included in the SOQL query SELECT list.
SOURCE: Apex Developer Guide v64.0 (Page 675)
LANGUAGE: apex
CODE:

```apex
 try {
  Invoice_Statement__c inv = new Invoice_Statement__c(Description__c='New Invoice');
  insert inv;
  // Query only includes Name, not Description__c
  Invoice_Statement__c v = [SELECT Name FROM Invoice_Statement__c WHERE Id = :inv.Id];
  // Causes an SObjectException because Description__c wasn't queried
  String s = v.Description__c;
 } catch(SObjectException se) {
  System.debug('The following exception has occurred: ' + se.getMessage());
 }
```

---

TITLE: Catching Multiple Exception Types
DESCRIPTION: Demonstrates using multiple catch blocks to handle different specific exception types (DmlException, SObjectException) followed by a generic Exception catch block.
SOURCE: Apex Developer Guide v64.0 (Page 678)
LANGUAGE: apex
CODE:

```apex
 try {
  Merchandise__c m = [SELECT Name FROM Merchandise__c LIMIT 1];
  // Causes an SObjectException
  Double inventory = m.Total_Inventory__c;
 } catch(DmlException e) {
  System.debug('DmlException caught: ' + e.getMessage());
 } catch(SObjectException e) {
  System.debug('SObjectException caught: ' + e.getMessage());
 } catch(Exception e) {
  System.debug('Generic Exception caught: ' + e.getMessage());
 }
```

---

TITLE: Custom Exception Class Definition
DESCRIPTION: Simple example defining a custom exception class 'MyException' by extending the base 'Exception' class.
SOURCE: Apex Developer Guide v64.0 (Page 679)
LANGUAGE: apex
CODE:

```apex
 public class MyException extends Exception {}
```

---

TITLE: Custom Exception Hierarchy and Catching
DESCRIPTION: Shows defining nested custom exceptions (OtherException extends BaseException) and catching the base exception type in a try-catch block.
SOURCE: Apex Developer Guide v64.0 (Page 679)
LANGUAGE: apex
CODE:

```apex
 public class ExceptionExample {
  public virtual class BaseException extends Exception {}
  public class OtherException extends BaseException {}

  public static void testExtendedException() {
   try {
    Integer i=0;
    if (i < 5) throw new OtherException('This is bad');
   } catch (BaseException e) { // Catches OtherException
    System.debug(e.getMessage());
   }
  }
 }
```

---

TITLE: Throwing Custom Exceptions
DESCRIPTION: Examples showing different ways to construct and throw custom exception objects (with/without message, with/without cause).
SOURCE: Apex Developer Guide v64.0 (Page 679)
LANGUAGE: apex
CODE:

```apex
 // No arguments
 throw new MyException();

 // With error message string
 throw new MyException('This is bad');

 // With cause (another exception)
 try { /* ... */ } catch (Exception e) { throw new MyException(e); }

 // With message and cause
 try { /* ... */ } catch (Exception e) { throw new MyException('This is bad', e); }
```

---
