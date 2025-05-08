# Batch Apex

Batch Apex is a feature specifically designed for processing large numbers of Salesforce records asynchronously. It allows developers to build complex, long-running processes that operate on potentially millions of records in manageable chunks ("batches"), thereby avoiding governor limit exceptions that might occur in synchronous transactions.

## Table of Contents

- [When to Use Batch Apex](#when-to-use-batch-apex)
- [How Batch Apex Works](#how-batch-apex-works)
  - [The `Database.Batchable` Interface](#the-databasebatchable-interface)
  - [The `start` Method](#the-start-method)
  - [The `execute` Method](#the-execute-method)
  - [The `finish` Method](#the-finish-method)
  - [Transaction Boundaries](#transaction-boundaries)
- [Defining the Scope: `Database.QueryLocator` vs. `Iterable`](#defining-the-scope-databasequerylocator-vs-iterable)
- [Maintaining State with `Database.Stateful`](#maintaining-state-with-databasestateful)
- [Invoking Batch Apex](#invoking-batch-apex)
- [Monitoring Batch Apex](#monitoring-batch-apex)
- [Testing Batch Apex](#testing-batch-apex)
- [Governor Limits](#governor-limits)
- [Best Practices](#best-practices)
- [Examples](#examples)

## When to Use Batch Apex

Batch Apex is particularly useful for:

- **Processing Large Data Volumes:** Handling jobs involving thousands or millions of records (e.g., data cleansing, archiving, mass updates) that would exceed synchronous governor limits.
- **Operations Requiring Higher Limits:** Batch Apex runs asynchronously and benefits from higher governor limits (e.g., SOQL query limits, heap size, CPU time) compared to synchronous Apex.
- **Scheduled Maintenance Tasks:** Running daily or weekly tasks, often initiated by Scheduled Apex.

## How Batch Apex Works

To use Batch Apex, you create an Apex class that implements the `Database.Batchable<sObject>` interface provided by Salesforce.

### The `Database.Batchable` Interface

This interface requires your class to implement three specific methods:

1.  **`start()`**
2.  **`execute()`**
3.  **`finish()`**

### The `start` Method

```apex
global (Database.QueryLocator | Iterable<sObject>) start(Database.BatchableContext bc) {
    // Collect records/objects for processing
}
```

- Called **once** at the beginning of the Batch Apex job.
- Purpose: Collects the records or objects to be processed. This collection defines the scope of the job.
- Return Type: Must return either a `Database.QueryLocator` or an `Iterable<sObject>`.

### The `execute` Method

```apex
global void execute(Database.BatchableContext bc, List<sObject> scope) {
    // Process one batch of records
}
```

- Called for **each batch** of records passed from the `start` method.
- Purpose: Performs the actual processing logic on a subset (batch) of the records.
- Parameters:
  - `Database.BatchableContext bc`: Provides context information about the job.
  - `List<sObject> scope`: A list containing the batch of records to process (default batch size is 200, but can be adjusted when invoking the job).
- **Important:** The order in which batches are executed is not guaranteed.

### The `finish` Method

```apex
global void finish(Database.BatchableContext bc) {
    // Execute post-processing operations
}
```

- Called **once** after all batches have been processed successfully.
- Purpose: Used for final wrap-up tasks, such as sending confirmation emails, summarizing results, or chaining another job.

### Transaction Boundaries

- Each execution of the `execute` method runs as a **discrete transaction**.
- Governor limits are **reset** for each `execute` transaction. This is a key benefit for processing large volumes.
- If one batch fails (throws an exception), it **does not cause other successful batch transactions to roll back**.

## Defining the Scope: `Database.QueryLocator` vs. `Iterable`

The `start` method determines the scope of records for the batch job.

- **`Database.QueryLocator`:**
  - Use for simple SOQL queries (`SELECT ... FROM ...`).
  - **Advantage:** Bypasses the standard governor limit for the total number of records retrieved by SOQL queries (50,000 limit). You can query up to **50 million** records using a `QueryLocator`.
  - Use Case: When your scope is defined by a straightforward SOQL query on a single sObject.
- **`Iterable<sObject>`:**
  - Use when you need to create a more complex scope, such as pre-processing records, looping through API call results, or using complex logic not possible in a single SOQL query.
  - **Disadvantage:** The standard governor limit for total records retrieved by SOQL queries _is still enforced_ when building the list returned by the iterable.
  - Requires implementing the `Iterator` interface or returning a `List<sObject>`.

## Maintaining State with `Database.Stateful`

- By default, Batch Apex classes are **stateless**. Each `execute` transaction gets a fresh copy of the object, and any changes to instance member variables are lost between transactions. Static variables are also reset between transactions.
- To maintain state across _all_ transactions within a single Batch Apex job execution, implement the `Database.Stateful` marker interface in your class definition:

  ```apex
  global class MyStatefulBatch implements Database.Batchable<sObject>, Database.Stateful {
      global Integer recordsProcessed = 0; // Instance variable to hold state

      // ... start, execute, finish methods ...

      global void execute(Database.BatchableContext bc, List<Account> scope) {
          // ... process records ...
          recordsProcessed = recordsProcessed + scope.size(); // Counter persists across batches
      }
  }
  ```

- **Important:** Only **instance member variables** retain their values when using `Database.Stateful`. Static member variables are reset between transactions.
- Use Case: Useful for counting records processed, summarizing data across batches, or collecting error information.

## Invoking Batch Apex

1.  **Instantiate** your Batch Apex class:
    ```apex
    MyBatchableClass myBatchObject = new MyBatchableClass();
    ```
2.  Call the `Database.executeBatch` method, passing the instance:
    ```apex
    Id batchId = Database.executeBatch(myBatchObject);
    ```
3.  **Optional `scope` parameter:** Specify the batch size for the `execute` method (overrides the default of 200).
    ```apex
    // Process records in batches of 100
    Id batchId = Database.executeBatch(myBatchObject, 100);
    ```
    - If the `start` method returns a `QueryLocator`, the maximum `scope` size is 2,000. Higher values are chunked by Salesforce into batches of up to 2,000.
    - If the `start` method returns an `Iterable`, there is no upper limit for the `scope` parameter, but using very high numbers can lead to other limits being hit within the `execute` transaction.

## Monitoring Batch Apex

- `Database.executeBatch` returns the **Job ID** of the `AsyncApexJob` record created for the batch execution.
- Use this Job ID to monitor the job's status programmatically via SOQL:
  ```apex
  AsyncApexJob job = [SELECT Id, Status, JobItemsProcessed, TotalJobItems, NumberOfErrors
                      FROM AsyncApexJob WHERE Id = :batchId];
  ```
- Monitor jobs via the Salesforce UI: **Setup** > **Environments** > **Jobs** > **Apex Jobs**.

## Testing Batch Apex

- Batch Apex runs asynchronously, but tests need predictable execution.
- Enclose the call to `Database.executeBatch` within `Test.startTest()` and `Test.stopTest()` blocks. This forces the batch job to run synchronously after `Test.stopTest()` is called.

  ```apex
  @isTest
  static void testMyBatch() {
      // 1. Setup test data

      Test.startTest();
      MyBatchableClass myBatch = new MyBatchableClass();
      Id batchId = Database.executeBatch(myBatch, 10); // Use scope size for testing one execute
      Test.stopTest();

      // 2. Assert results (query records, check AsyncApexJob status, etc.)
  }
  ```

- **Important:** When testing, the `execute` method runs only **once**. Use the `scope` parameter in `Database.executeBatch` to control the number of records passed to this single `execute` call for testing purposes.
- The `finish` method also runs synchronously after `Test.stopTest()`.

## Governor Limits

Batch Apex operates under asynchronous governor limits, which are generally higher than synchronous limits:

- **Total Heap Size:** 12 MB (vs. 6 MB sync)
- **Maximum CPU Time:** 60,000 ms (vs. 10,000 ms sync)
- **SOQL Queries:** 200 (vs. 100 sync) - _per `execute` transaction_
- **DML Statements:** 150 - _per `execute` transaction_
- **DML Rows:** 10,000 - _per `execute` transaction_
- **Callouts:** 100 - _per `execute` transaction_

Other limits specific to batch jobs:

- **Concurrent Jobs:** Max 5 batch jobs queued or active at one time.
- **Apex Flex Queue:** Up to 100 batch jobs can be held in the `Holding` status.
- **QueryLocator Record Limit:** Can return up to 50 million records.
- **Test Limits:** Max 5 batch jobs submitted in a single test run.

## Best Practices

- Use Batch Apex only when necessary for large data volumes or operations requiring higher limits. For simpler async tasks or chaining, consider Queueable Apex.
- Make SOQL queries in the `start` method as selective and efficient as possible.
- Minimize callout times and optimize queries within the `execute` method for faster batch processing.
- Use `Database.Stateful` sparingly, only when state needs to be maintained across batches.
- Avoid invoking Batch Apex from triggers if possible, as this can easily exceed limits under bulk DML operations. If necessary, ensure the trigger logic prevents adding more than the allowed number of jobs.
- Test thoroughly, especially with large data volumes in a full sandbox, and use `Test.startTest()`/`Test.stopTest()` correctly.

## Examples

Refer to the following classes in the provided context for implementation examples:

- `MyBatchableClass.cls`: Demonstrates stateful batch processing with email notification in `finish`.
- `AccountContactDifferentOwnerBatch.cls`: Example updating contact owners based on account owners.
- `Using_DatabaseQueryLocator_to_define_scope.cls` (contains `SearchAndReplace` class): Basic example using QueryLocator.
- `UpdateContactAddresses.cls`: Example using `Database.Stateful` and updating related records.
