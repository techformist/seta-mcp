# Apex Future Methods (@future)

Future methods provide a way to run Apex code asynchronously, in a separate thread, typically when system resources become available. They are useful for specific scenarios where immediate execution isn't required or allowed.

## Overview

- **Asynchronous Execution:** Code marked with `@future` is queued and executed later when Salesforce resources permit.
- **Separate Thread:** Executes independently of the transaction that initiated it.
- **Use Cases:** Primarily for long-running operations, callouts from synchronous contexts (like triggers), or isolating DML operations to prevent errors.

## When to Use Future Methods

Use `@future` methods for:

1.  **Callouts to External Web Services:** Especially from triggers or after DML operations where synchronous callouts are prohibited. Requires the `(callout=true)` parameter.
2.  **Long-Running Operations:** Offloading resource-intensive calculations or processing that doesn't need to block the user or the current transaction.
3.  **Isolating DML Operations:** To separate DML on certain setup sObjects (like `User`) from DML on non-setup sObjects (like `Account`) within the same logical operation, preventing the "mixed DML" error.

## Syntax and Requirements

```apex
global class MyFutureExample {

    @future // Basic future method
    public static void myBasicFutureMethod(List<Id> recordIds) {
        // Process records using the passed IDs
        List<Account> accounts = [SELECT Id, Name FROM Account WHERE Id IN :recordIds];
        // ... further processing ...
    }

    @future(callout=true) // Future method allowing HTTP callouts
    public static void myCalloutFutureMethod(String someParameter) {
        HttpRequest req = new HttpRequest();
        // ... setup request ...
        Http http = new Http();
        HttpResponse res = http.send(req);
        // ... process response ...
    }
}
```

- **Annotation:** Methods must be annotated with `@future`.
- **Static:** Methods **must** be declared as `static`.
- **Return Type:** Methods **must** return `void`.
- **Parameters:**
  - Can only accept primitive data types (e.g., `Id`, `String`, `Integer`, `Boolean`), arrays of primitives, or collections of primitives (like `List<Id>` or `Set<String>`).
  - **Cannot** accept sObjects (like `Account` or `MyCustomObject__c`) or other complex objects as parameters. The object's data might change between method invocation and execution.
- **Common Pattern:** Pass a `List<Id>` of the records to be processed. The future method then queries for the most up-to-date record data using these IDs.

## Callouts

- To perform HTTP or Web Service callouts from a future method, you **must** specify `(callout=true)` in the annotation: `@future(callout=true)`.
- Synchronous callouts are not permitted directly from triggers; using `@future(callout=true)` is the standard workaround.

## Limitations and Considerations

- **No Job ID:** Future method invocations do not return a Job ID, making them harder to monitor than Queueable or Batch Apex.
- **Parameter Restrictions:** Limited to primitive types/collections.
- **No Chaining:** A future method cannot call another future method.
- **Execution Order:** Execution order is **not guaranteed**. They run when resources are available.
- **Concurrency/Locking:** Multiple future methods might run concurrently. If they operate on the same records, this can lead to record locking errors. Design carefully.
- **No Callouts from Certain Contexts:** Future methods cannot be called from other future methods or from batch Apex `execute` or `finish` methods.
- **Restricted Methods:** Certain Apex methods like `getContent()` and `getContentAsPDF()` cannot be used within future methods.
- **Governor Limits:**
  - Future methods have higher governor limits for some operations (e.g., SOQL query rows, heap size) compared to synchronous Apex.
  - Limited to **50** future calls per Apex transaction (invocation).
  - Subject to a rolling 24-hour limit on the total number of future method invocations across the org.

## Testing Future Methods

- To test code that calls a future method, enclose the call within `Test.startTest()` and `Test.stopTest()` statements.
- All asynchronous operations (`@future` calls) initiated after `Test.startTest()` are collected.
- When `Test.stopTest()` is executed, these collected asynchronous calls are run **synchronously**.
- This allows you to assert the results of the future method's execution within the test method.

```apex
@isTest
static void testMyFutureMethod() {
    // 1. Setup test data (e.g., create accounts)
    List<Id> accountIds = new List<Id>{testAccount.Id}; // Assuming testAccount exists

    Test.startTest();
    MyFutureExample.myBasicFutureMethod(accountIds); // Call the future method
    Test.stopTest(); // Executes the future method synchronously

    // 2. Verify results (e.g., query the account to see if it was processed)
}
```

## Alternatives

- **Queueable Apex:** Offers more features like accepting non-primitive types, returning a Job ID for monitoring, and job chaining. Generally preferred over future methods for new development unless simple fire-and-forget async execution is needed.
- **Batch Apex:** Best suited for processing very large numbers of records (thousands to millions) that exceed even asynchronous limits.

```

```
