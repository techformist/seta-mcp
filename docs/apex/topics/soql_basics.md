# SOQL Basics in Apex

SOQL (Salesforce Object Query Language) is used within Apex to read and retrieve record data stored in the Salesforce database. While similar to SQL, SOQL is specifically designed for querying Salesforce objects and fields.

## Core Concepts

- **Purpose:** Retrieve records (sObjects) and specific fields from one or more related Salesforce objects.
- **Integration:** Embedded directly within Apex code using square brackets `[...]`.
- **Return Types:**
  - A `List<sObject>` (e.g., `List<Account>`) when multiple records can be returned.
  - A single `sObject` (e.g., `Account`) when the query is guaranteed to return exactly one record (e.g., querying by ID or using `LIMIT 1`). Assigning a query result with zero or more than one record to a single sObject variable causes a runtime exception.
  - An `Integer` when using the `COUNT()` aggregate function.

## Basic Syntax

The fundamental structure of a SOQL query is:

```sql
SELECT Field1, Field2, ...
FROM ObjectName
[WHERE Condition]
[ORDER BY FieldToSort]
[LIMIT NumberOfRecords]
```

- **`SELECT`:** Specifies the fields to retrieve. The `Id` field is implicitly included unless specifically excluded (which isn't typical in Apex SOQL).
- **`FROM`:** Specifies the primary sObject to query (e.g., `Account`, `Contact`, `MyCustomObject__c`).
- **`WHERE`:** (Optional) Filters the records based on specified conditions using comparison operators (`=`, `!=`, `>`, `<`, `>=`, `<=`, `LIKE`) and logical operators (`AND`, `OR`, `NOT`).
- **`ORDER BY`:** (Optional) Sorts the retrieved records based on a field, either ascending (`ASC`, default) or descending (`DESC`).
- **`LIMIT`:** (Optional) Restricts the maximum number of records returned.

## Using SOQL in Apex

Enclose the SOQL query within square brackets:

```apex
// Retrieve a list of Accounts
List<Account> accounts = [SELECT Name, Phone FROM Account WHERE Industry = 'Technology'];

// Retrieve a single Account by ID
Account singleAcct = [SELECT Name FROM Account WHERE Id = :someAccountId LIMIT 1];

// Get a count of Contacts
Integer contactCount = [SELECT COUNT() FROM Contact WHERE LastName = 'Smith'];
```

## Field Selection

- You must explicitly list the fields you want to retrieve after the `SELECT` keyword.
- Attempting to access a field that was not included in the `SELECT` clause (other than `Id`) will result in a runtime error, even if the field has a value in the database.

```apex
Account acc = [SELECT Name FROM Account LIMIT 1];
// System.debug(acc.Phone); // This would cause a runtime error if Phone wasn't queried
```

## Filtering with `WHERE`

Use the `WHERE` clause to specify conditions for record selection.

```apex
// Simple filter
List<Contact> smiths = [SELECT Name FROM Contact WHERE LastName = 'Smith'];

// Multiple conditions with AND
List<Opportunity> closedWonOpps = [SELECT Name FROM Opportunity WHERE StageName = 'Closed Won' AND Amount > 10000];

// Using OR
List<Lead> hotLeads = [SELECT Name FROM Lead WHERE Status = 'Working - Contacted' OR Rating = 'Hot'];
```

## Bind Variables

- Use Apex variables directly within SOQL queries by prefixing them with a colon (`:`). This is called a _bind variable_.
- This is the **recommended** way to include dynamic values in queries, as it prevents SOQL injection vulnerabilities.
- The Apex parser evaluates the local variable first before executing the SOQL statement.

```apex
String targetIndustry = 'Media';
List<Account> mediaAccounts = [SELECT Id, Name FROM Account WHERE Industry = :targetIndustry];

Set<Id> accountIds = new Map<Id, Account>(Trigger.newMap).keySet(); // Get IDs from a trigger context
List<Contact> relatedContacts = [SELECT Name FROM Contact WHERE AccountId IN :accountIds];
```

- Bind variables can be used in `WHERE` clauses, `LIMIT` clauses, `OFFSET` clauses, and `FIND` clauses (in SOSL).
- You **cannot** use bind variable _fields_ directly (e.g., `:myVariable.fieldName`). Resolve the field to a simple variable first.

## Relationship Queries

SOQL allows querying fields from related records (parent-to-child and child-to-parent).

- **Child-to-Parent:** Use dot notation to access fields on parent records (up to 5 levels up). For custom relationships, append `__r`.
  ```apex
  // Get Contact's Name and related Account's Name
  List<Contact> contacts = [SELECT Name, Account.Name FROM Contact WHERE Account.Industry = 'Technology'];
  ```
- **Parent-to-Child:** Use a nested `SELECT` subquery to retrieve fields from child records (one level down). Use the **plural** relationship name. For custom relationships, append `__r`.
  ```apex
  // Get Account Name and the LastName of related Contacts
  List<Account> accountsWithContacts = [SELECT Name, (SELECT LastName FROM Contacts) FROM Account WHERE Name = 'Acme Inc.'];
  // Accessing child records in Apex:
  for(Account acc : accountsWithContacts) {
      List<Contact> childContacts = acc.Contacts; // Use the relationship name
      // ... process childContacts ...
  }
  ```

## Aggregate Functions

SOQL supports aggregate functions like `COUNT()`, `COUNT(fieldName)`, `SUM(fieldName)`, `AVG()`, `MIN()`, `MAX()`.

- Queries with aggregate functions typically return a `List<AggregateResult>`.
- Access aggregated values using `get('alias')` on the `AggregateResult` object. If no alias is provided, use `expr0`, `expr1`, etc.
- `COUNT()` returns an `Integer`.

```apex
// Get total number of Accounts
Integer totalAccounts = [SELECT COUNT() FROM Account];

// Get average amount per StageName
List<AggregateResult> results = [SELECT StageName, AVG(Amount) avgAmount
                                 FROM Opportunity
                                 GROUP BY StageName];
for(AggregateResult ar : results) {
    System.debug('Stage: ' + ar.get('StageName') + ', Avg Amount: ' + ar.get('avgAmount'));
}
```

## Semi-Joins and Anti-Joins (`IN`, `NOT IN`)

Use `IN` or `NOT IN` with a subquery on another object to filter records based on the existence (or non-existence) of related records.

- **Semi-Join (`IN`):** Returns records that _have_ a related record matching the subquery criteria.
  ```apex
  // Get Accounts that HAVE Opportunities
  List<Account> accountsWithOpps = [SELECT Id, Name FROM Account
                                    WHERE Id IN (SELECT AccountId FROM Opportunity)];
  ```
- **Anti-Join (`NOT IN`):** Returns records that _do not have_ any related records matching the subquery criteria.
  ```apex
  // Get Accounts that DO NOT have any 'Closed Won' Opportunities
  List<Account> accountsWithoutWonOpps = [SELECT Id, Name FROM Account
                                          WHERE Id NOT IN (SELECT AccountId FROM Opportunity WHERE StageName = 'Closed Won')];
  ```

## SOQL For Loops

- **Purpose:** Process large query results that might exceed heap size limits if returned as a single list.
- **Mechanism:** Retrieves records in batches (typically 200 records) using internal calls to `query()` and `queryMore()`.
- **Syntax (Iterate over single sObjects):**
  ```apex
  Integer count = 0;
  for (Account acc : [SELECT Name FROM Account WHERE Industry = 'Energy']) {
      // This loop body executes once for EACH Account record
      count++;
  }
  ```
- **Syntax (Iterate over lists of sObjects - more efficient for DML inside loop):**
  ```apex
  List<Account> accountsToUpdate = new List<Account>();
  for (List<Account> accountBatch : [SELECT Name, Description FROM Account WHERE IsActive__c = true]) {
      // This loop body executes once for EACH BATCH of 200 Accounts
      for (Account acc : accountBatch) {
          acc.Description = 'Processing batch update';
          accountsToUpdate.add(acc);
      }
  }
  // Perform DML outside the inner loop if possible, or potentially after the outer loop
  // if processing logic allows accumulation across batches (requires careful handling).
  // update accountsToUpdate; // Often better placed outside the outer loop or using Batch Apex
  ```
- **Benefits:** Avoids heap size limits, useful for processing large datasets within synchronous or asynchronous Apex.

## Governor Limits & Bulkification

- **Limit:** Synchronous Apex has a limit of 100 SOQL queries per transaction. Asynchronous Apex has a limit of 200.
- **Bulkification:** **Never** place SOQL queries inside loops (`for`, `while`, `do-while`). This quickly exhausts the governor limit.
- **Best Practice:**
  1.  Collect necessary IDs or filter criteria into a `Set` or `List` before the loop.
  2.  Perform **one** SOQL query _outside_ the loop using the collected Set/List in the `WHERE` clause (e.g., `WHERE Id IN :myIdSet`).
  3.  If needed, store the query results in a `Map` for efficient lookup inside the loop.
