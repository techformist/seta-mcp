# Apex Data Manipulation Language (DML) Operations

DML refers to the Apex language statements used to insert, update, delete, or restore data in the Salesforce database. Apex provides built-in capabilities to directly manipulate records.

## Core DML Operations

Apex supports the following DML operations:

- `insert`: Adds one or more new records.
- `update`: Modifies one or more existing records.
- `upsert`: Creates new records or updates existing ones in a single statement based on a specified field (or the ID field).
- `delete`: Moves one or more records to the Recycle Bin.
- `undelete`: Restores one or more records from the Recycle Bin.
- `merge`: Merges up to three records of the same sObject type into one master record, deleting the others and reparenting related records.

## Key Concepts

### Bulk Operations (Bulkification)

- **Critical Best Practice:** Always perform DML operations on **lists of sObjects** rather than on single sObjects within a loop.
- **Reason:** Salesforce enforces governor limits (e.g., maximum 150 DML statements per transaction). Operating on a list counts as **one** DML statement, regardless of the number of records in the list (up to 10,000 rows per DML call).
- **Example (Bad - Avoid):**
  ```apex
  // Executes one DML statement per record - hits limits easily
  for(Account acc : accountsToUpdate) {
      update acc; // Inefficient!
  }
  ```
- **Example (Good - Recommended):**
  ```apex
  // Executes only one DML statement for the entire list
  List<Account> accountsToUpdate = new List<Account>();
  for(Account acc : listOfAllAccounts) {
      if(acc.Industry == 'Technology') {
          acc.Description = 'Updated';
          accountsToUpdate.add(acc);
      }
  }
  update accountsToUpdate; // Efficient!
  ```

### Atomic Transactions

- By default, DML statements execute within an atomic transaction.
- **All or Nothing:** If an error occurs during the processing of any record in a DML statement (e.g., `insert myList;`), the entire operation rolls back. No records are committed to the database.
- **Partial Success:** To allow for partial success (committing successful records even if others fail), use the methods from the `Database` class (see below).

### Execution Context and Security

- DML operations generally run in **system context**, meaning the current user's permissions and field-level security are bypassed by default.
- **Sharing Rules:** Record-level sharing rules _are_ respected based on the class's sharing keywords (`with sharing`, `without sharing`, `inherited sharing`). If no keyword is specified, sharing is generally not enforced unless called from a `with sharing` context.
- **Enforcing User Permissions:** Use `WITH USER_MODE` or `WITH SECURITY_ENFORCED` in SOQL, or methods like `Security.stripInaccessible()` to enforce user permissions and FLS _before_ performing DML if necessary.

### Exceptions

- Failed DML statements (e.g., `insert myRecord;`) typically throw a `DmlException`, which halts execution unless caught in a `try-catch` block.

## DML Statements vs. Database Class Methods

Apex provides two ways to perform DML:

1.  **DML Statements:** (e.g., `insert`, `update`, `delete`)

    - Straightforward syntax.
    - Throw `DmlException` upon the _first_ error encountered, rolling back the entire transaction (all-or-nothing).
    - Use `try-catch` blocks to handle exceptions.

2.  **`Database` Class Methods:** (e.g., `Database.insert()`, `Database.update()`)
    - Offer more flexibility, particularly for error handling.
    - Support **partial success** by setting the optional `allOrNone` parameter to `false` (default is `true`).
      ```apex
      // Example: Allow partial success on insert
      Database.SaveResult[] results = Database.insert(recordsToInsert, false);
      ```
    - Return arrays of result objects (`Database.SaveResult`, `Database.DeleteResult`, etc.) instead of throwing exceptions immediately.
    - You must iterate through the result objects to check the success/failure of each individual record and retrieve specific error messages.
    - Includes methods not available as DML statements (e.g., `Database.convertLead()`, `Database.emptyRecycleBin()`).

**When to Use Which:**

- Use **DML statements** when you want an all-or-nothing operation and prefer standard `try-catch` exception handling.
- Use **`Database` class methods** when you need to allow partial success for bulk operations and want to inspect results for individual records to potentially retry failures.

## Common DML Operations Examples

```apex
// --- Insert ---
List<Account> newAccounts = new List<Account>();
newAccounts.add(new Account(Name='Acme Corp'));
newAccounts.add(new Account(Name='Global Corp'));
insert newAccounts; // Inserts the list

// --- Update ---
List<Account> accountsToUpdate = [SELECT Id, Description FROM Account WHERE Name LIKE 'Acme%'];
for(Account acc : accountsToUpdate) {
    acc.Description = 'Updated Description';
}
update accountsToUpdate; // Updates the list

// --- Upsert (using External ID) ---
// Assumes My_External_ID__c is an External ID field on Account
List<Account> accountsToUpsert = new List<Account>();
accountsToUpsert.add(new Account(Name='Existing Acme', My_External_ID__c='A1')); // This will update
accountsToUpsert.add(new Account(Name='New Beta', My_External_ID__c='B2')); // This will insert
upsert accountsToUpsert Account.My_External_ID__c; // Upserts based on external ID

// --- Delete ---
List<Account> accountsToDelete = [SELECT Id FROM Account WHERE Name LIKE 'Test%'];
delete accountsToDelete; // Deletes the list

// --- Undelete ---
// This requires querying the recycle bin first (not shown here)
// undelete recordsToRestore;
```

## Important Considerations

- **Governor Limits:** Be mindful of limits on the number of DML statements (150 per sync transaction) and the total number of rows processed (10,000 per transaction). Bulkify your code.
- **Setup vs. Non-Setup Objects:** You cannot mix DML operations on setup objects (e.g., `User`, `Profile`, `PermissionSet`) and non-setup objects (e.g., `Account`, `Contact`, custom objects) in the same transaction. Use asynchronous operations (@future, Queueable) to separate these DML types if necessary.
- **Related Records:** Updating fields on related records requires separate DML statements targeting those related records. You can only set lookup/master-detail relationship fields directly on the child record during its DML operation.

```

```
