# Final Exam Study Notes

---

## Complexity & Sorting

### Big O Notation

**Big O** describes the *limiting behaviour* or *worst-case* performance of a function as the number of inputs ($n$) tends toward large values.

!!! abstract "Common Complexities"
    <div class="grid cards print-3" markdown>

    -   **$O(1)$ Constant**
        Time stays the same regardless of $n$ (e.g., array access).

    -   **$O(\log n)$ Logarithmic**
        Doubling $n$ adds constant time (e.g., Binary Search).

    -   **$O(n)$ Linear**
        Proportional to $n$ (e.g., simple loop).

    -   **$O(n \log n)$ Log Linear**
        Linear and logarithmic combined (e.g., Merge sort).

    -   **$O(n^2)$ Quadratic**
        Grows as square of $n$ (e.g., nested loops).

    -   **$O(n!)$ Factorial**
        Work explodes; considers all permutations.

    </div>

**Rules of Thumb:**
1.  **Drop Constants:** $O(2n) \rightarrow O(n)$.
2.  **Add Sequential Operations:** $O(n) + O(n) \rightarrow O(n)$.
3.  **Multiply Nested Loops:** Inner loop work multiplies outer loop work.
4.  **Keep Dominant Term:** $O(n^3 + n \log n) \rightarrow O(n^3)$.

### Sorting Algorithms

| Algorithm | Process | Complexity |
| :--- | :--- | :--- |
| **Selection Sort** | 1. Find the smallest element in the **unsorted** region.<br>2. Swap it with the first element of that region.<br>3. Repeat until sorted. | $O(n^2)$ |
| **Insertion Sort** | 1. Take next element from **unsorted**.<br>2. Compare with **sorted** portion and shift larger elements right.<br>3. Insert into correct position. | $O(n^2)$ |

---

## Files & Streams

### File & Stream Model
Files are sequential streams of bytes with no inherent structure.
* **Standard Streams:** `stdin`, `stdout`, `stderr` are opened automatically.
* **Practical Note:** Always check if `fopen` returns `NULL` before proceeding.



!!! Example "Example: Reading a Text File"

    ```c
    #include <stdio.h>
    
    int main(void) {
        // 1. Declare the FILE pointer
        FILE *cfPtr; 
        
        int account;
        char name[30];
        double balance;
    
        // 2. Open the file and check for NULL (Error)
        // "r" mode opens an existing file for reading
        if ((cfPtr = fopen("clients.txt", "r")) == NULL) 
        {
            printf("File could not be opened\n");
        } 
        else 
        {
            // 3. "Priming Read": Read the first item before entering the loop
            fscanf(cfPtr, "%d%s%lf", &account, name, &balance);
    
            // 4. Loop while the End of File (feof) has NOT been reached
            while (!feof(cfPtr)) 
            {
                // Process the data (e.g., print it)
                printf("%-10d%-13s%7.2f\n", account, name, &balance);
    
                // 5. Read the NEXT record at the bottom of the loop
                fscanf(cfPtr, "%d%s%lf", &account, name, &balance);
            }
    
            // 6. Close the file to release resources
            fclose(cfPtr); 
        }
        return 0;
    }
    ```

### Sequential Access (Text Files)
Used for processing records in order. **Warning:** Text files cannot be safely modified in place because changing field lengths shifts all subsequent data.

**Functions:**
* `fscanf`: Parses formatted text. Returns the number of items successfully read.
* `rewind(fp)`: Resets file pointer to the start, allowing you to scan a file multiple times.

### Random Access (Binary Files)
Allows jumping to specific positions; ideal for fixed-size records like `structs`.

| Mode | Text | Binary | Meaning |
| :--- | :--- | :--- | :--- |
| **Read** | `"r"` | `"rb"` | Open existing. Fails if missing. |
| **Write** | `"w"` | `"wb"` | Create new. **Overwrites** existing. |
| **Update** | `"r+"` | `"rb+"` | Open existing for read/write. Essential for updating records in place. |

**Record Calculation Logic**
To find the byte offset of a specific record ID (e.g., account number):

!!! Example "Reading a Binary File"
    ```c
    #include <stdio.h>
    
    struct clientData {
        int acctNum;
        char lastName[15];
        char firstName[10];
        double balance;
    };
    
    int main(void) {
        FILE *cfPtr;
        struct clientData client;
    
        // 1. Open with "rb" (Read Binary)
        if ((cfPtr = fopen("credit.dat", "rb")) == NULL) {
            printf("File could not be opened.\n");
        } 
        else {
            // --- WHAT YOU USE INSTEAD OF SCANNING ---
    
            // A. Calculate the Offset
            // Since records are fixed-size, Account 3 is located 2 records in.
            // (Account 1 is at 0, Account 2 is at 1 * sizeof, etc.)
            long offset = (3 - 1) * sizeof(struct clientData);
    
            // B. Jump there (fseek)
            // SEEK_SET means "from the beginning of the file"
            fseek(cfPtr, offset, SEEK_SET);
    
            // C. Copy the bytes (fread)
            // Arguments: 1. Where to put it, 2. Size of one item, 3. How many items, 4. File pointer
            size_t result = fread(&client, sizeof(struct clientData), 1, cfPtr);
    
            // D. Validation
            // If result is 1, we found it. If 0, the file might only have 1 record!
            if (result == 1 && client.acctNum != 0) {
                printf("Found Account 3: %s %s\n", client.firstName, client.lastName);
            } else {
                printf("Account 3 does not exist or is empty.\n");
            }
    
            fclose(cfPtr);
        }
        return 0;
    }
    ```


**The "Update Record" Pattern**
To modify a specific record in a binary file, you must strictly follow this sequence:
1.  `fseek` to the record location.
2.  `fread` the record into a struct.
3.  Modify the struct in memory.
4.  `fseek` **back** to the start of that same record (often using `SEEK_CUR` with a negative offset).
5.  `fwrite` the updated struct over the old data.

```c
// Move back one record size from current position
fseek(fPtr, -(long)sizeof(ClientData), SEEK_CUR);
fwrite(&client, sizeof(ClientData), 1, fPtr);
```
**

---

## CLI, Shell & Memory

### CLI & Shell Operators
**Arguments:** `int main(int argc, char *argv[])`
* `argc`: Argument count (includes program name).
* `argv`: Argument Vector (array of strings).

**Input Validation & Conversion**
* **Validation:** Always check `argc` first to ensure the user provided the correct number of arguments.
* **Safe Conversion:** Prefer `strtol` over `atoi` for converting strings to integers. `strtol` allows you to detect non-numeric characters via an `end` pointer.
    ```c
    long parsed = strtol(argv[i], &end, 10);
    if (*end != '\0') { /* Error: String contained non-digits */ }
    ```
* **Error Output:** Use `fprintf(stderr, ...)` for error messages so they separate from standard output.

!!! abstract "Shell Operators"
    <div class="grid cards print-3" markdown>

    -   **`>` Redirect (Overwrite)**
        Sends stdout to file, replacing it.

    -   **`>>` Redirect (Append)**
        Appends stdout to end of file.

    -   **`<` Input Redirection**
        Uses file as stdin.

    -   **`|` Pipe**
        Connects stdout of one program to stdin of another.

    </div>

### Memory Management
* **`calloc(count, size)`**: Allocates `n` elements and **initializes all bits to zero**.
* **`realloc(ptr, new_size)`**: Resizes memory.
    * **Doubling Strategy:** When a dynamic array fills up, a common strategy is to double its capacity (`2 * capacity`) to reduce the number of expensive allocation calls.
    * **Safety:** Never assign the return of `realloc` directly to your original pointer. If `realloc` fails (returns `NULL`), you lose the reference to your original data.
    ```c
    int *new_values = realloc(values, sizeof *values * new_capacity);
    if (new_values == NULL) { /* Handle error, free old values */ }
    values = new_values;
    ```
   

### Other Topics
* **Variable Arguments (`stdarg.h`)**:
    * `va_start`: Initialize traversal.
    * `va_arg`: Read next argument (must know type).
    * `va_end`: Finalize.
* **Literal Suffixes**: `U` (Unsigned), `L` (Long), `F` (Float) to control type/overflow.
* **`exit` / `atexit`**: `exit` terminates and flushes streams; `atexit` registers cleanup functions to run on termination.

---

## Function Pointers & Index Files

### Function Pointers
Stores the address of a function.
* **Syntax:** `int (*fp)(int, int)` (Parentheses required to distinguish from function returning pointer).

### `qsort` and Comparators
**`qsort`** uses a callback function to compare elements.

**Comparator Syntax:**
Must accept two `const void *` arguments. You must cast them to pointers of your specific data type (e.g., `Client *`) before accessing members.

**Advanced Comparison Patterns:**
1.  **Descending Order:** Swap the subtraction order or multiply the result by `-1`.
2.  **Multi-Level Sorting:** If the primary field is equal, sort by a secondary field.
    ```c
    int result = strcmp(left->province, right->province);
    if (result != 0) return result; // Primary sort
    return strcmp(left->lastName, right->lastName); // Secondary sort
    ```
   
3.  **Toggling Direction:** You can use a global `DIRECTION` variable or multiplier to toggle between ASC/DESC within the same comparator function.

### Index Files
Secondary file storing `(Key, Offset)` pairs to allow random access on data files without scanning.

**1. Creating an Index**
1.  Read data file sequentially.
2.  Store key and file position (offset) in array.
3.  Sort the array by key.
4.  Write header and sorted records to index file.

**2. Using an Index**
1.  Load index records into memory.
2.  Search index (e.g., binary search) for key.
3.  Retrieve `offset`.
4.  `fseek` to that offset in the data file and `fread` the record.

---

## Preprocessor & Multi-File Programs



### The Preprocessor
Processes source code before the compiler.
* **`#include`**: Inclusion of files (Headers).
* **`#define`**: Creates symbolic constants or Macros.
    * Macros perform **text substitution** (no type checking).
    * !!! warning
        Use parentheses around arguments in macros to avoid precedence issues.
* **`#undef`**: Undefines a macro.
* **System Specifics:** You can use `#ifdef` to handle OS-specific includes (e.g., `_WIN32` vs `_MSC_VER`).

**Conditional Compilation**
Used for debugging or header guards.
```c
#ifndef MY_HEADER_H // Header Guard
#define MY_HEADER_H
...
#endif
```

### Multi-File Programs
* **`extern`**: Declares a variable defined in another file (External Linkage).
* **`static` (File Scope)**: Limits visibility to the **current file** (Internal Linkage).
    * *Example:* In `lab9.c`, `static Direction DIRECTION = ASC;` limits the scope of the global variable to that specific file.
* **Make Utility**: Recompiles only changed files in a project.

### Storage Classes

| Class | Keyword | Duration | Scope | Linkage |
| :--- | :--- | :--- | :--- | :--- |
| **Automatic** | `auto` | Block | Block | None |
| **Register** | `register` | Block | Block | None |
| **Static** | `static` | **Static** | Block | None |
| **File Static** | `static` | **Static** | File | **Internal** |
| **External** | `extern` | **Static** | File | **External** |:w

