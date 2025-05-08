# Apex Overview

Apex is Salesforce's proprietary, strongly-typed, object-oriented programming language. It allows developers to execute flow and transaction control statements on the Salesforce Platform server, enabling the addition of custom business logic to most system events, including button clicks, related record updates, and Visualforce pages.

## How Does Apex Work?

1.  **Development:** Developers write Apex code (classes, triggers) and save it to the Lightning Platform.
2.  **Compilation:** The platform application server compiles the code into an abstract set of instructions (bytecode) and saves it as metadata.
3.  **Execution:** When an end-user or system process invokes Apex (e.g., via UI interaction, API call, trigger firing), the server retrieves the compiled bytecode from metadata.
4.  **Interpretation:** The Apex runtime interpreter executes the bytecode.
5.  **Results:** The results are returned to the user or initiating process.

Apex runs entirely on-demand within Salesforce's multitenant cloud environment.

## Why Use Apex?

While Salesforce provides many declarative tools (like Flow Builder, Process Builder, Validation Rules) for customization, Apex is used when more complex logic is required:

- Creating Web services (SOAP, REST).
- Creating email services.
- Performing complex validation over multiple objects.
- Implementing complex business processes not supported by declarative tools.
- Creating custom transactional logic (operations that must succeed or fail together).
- Attaching custom logic to other operations (like saving a record) that needs to execute regardless of the origin (UI, API, etc.).

## Key Characteristics

- **Integrated:** Provides built-in support for Data Manipulation Language (DML with exception handling), Salesforce Object Query Language (SOQL), and Salesforce Object Search Language (SOSL).
- **Data Focused:** Designed to efficiently query and manipulate large numbers of records, often performing operations in bulk. It acts similarly to database stored procedures.
- **Rigorous:** Strongly typed, using direct references to schema objects (like Account or MyCustomObject\_\_c). Performs compile-time checks for invalid references.
- **Hosted:** Interpreted, executed, and managed entirely by the Lightning Platform.
- **Multitenant Aware:** The runtime engine enforces strict governor limits to prevent runaway code from monopolizing shared resources.
- **Easy to Use:** Syntax is based on familiar Java idioms.
- **Easy to Test:** Includes built-in support for unit test creation, execution, and code coverage measurement.
- **Versioned:** Apex code is saved against specific versions of the Salesforce API, allowing for maintained behavior across platform upgrades.

## Core Concepts

Apex includes concepts familiar from other object-oriented programming languages:

- **Variables and Data Types:** Declaration of variables with specific data types (Primitives like Integer, Boolean, String; sObjects; Collections; Enums; Custom Classes).
- **Statements:** Instructions like assignments, conditional `if-else` blocks, loops (`for`, `while`, `do-while`), DML, transaction control, and exception handling (`try-catch-finally`).
- **Collections:** Lists (ordered, non-unique elements), Sets (unordered, unique elements), and Maps (key-value pairs).
- **Classes, Objects, and Interfaces:** Defining blueprints (classes) for objects, creating instances (objects), and defining contracts (interfaces). Supports inheritance and polymorphism.
- **Triggers:** Code invoked automatically before or after specific DML events (insert, update, delete, undelete) occur on sObjects.
- **SOQL & SOSL:** Query languages integrated directly into Apex for retrieving data.
- **DML:** Language integrated directly into Apex for inserting, updating, upserting, deleting, and undeleting records.

## Development Environment

Developers typically write and debug Apex using:

- **Salesforce Extensions for Visual Studio Code:** The recommended modern environment with rich features.
- **Code Builder:** A browser-based version of VS Code.
- **Developer Console:** A built-in browser-based IDE within Salesforce.
- **Setup Code Editors:** Basic editors available within Salesforce Setup for classes and triggers.

## Testing

Testing is critical for Apex development.

- Unit tests must cover at least **75%** of Apex code before deployment to production or packaging.
- All tests must pass successfully.
- Tests verify code logic, handle positive/negative cases, and test for bulk record processing.
- Test methods use the `@isTest` annotation and don't commit data to the database.

## Governor Limits

Because Apex runs in a shared, multitenant environment, Salesforce enforces limits (governors) to ensure fair resource usage. These limits restrict operations per transaction, such as the number of SOQL queries, DML statements, CPU time, and heap size. Writing efficient, bulkified code is essential to avoid hitting these limits.

```
*For detailed syntax, methods, and advanced features, refer to the official [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dev_guide.htm).*
```
