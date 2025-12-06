# Week 10

This week covers **function pointers** and continues on file processing with
**index files**.

---

## Function Pointers

A function pointer stores the address of a function. When used correctly, it
allows functions to be passed as arguments, stored in arrays, or reassigned.

---

### Basic Form

```c
int add(int a, int b) {
    return a + b;
}

int (*fp)(int, int) = add;
int result = fp(3, 4); // 7
```

!!! abstract "Why Parentheses Matter"
    
    If you dont wrap the return type in parentheses, you declare a regular 
    function rather than a function pointer. 

    ```c
    int (*fp)(int, int);   // pointer to function
    int *fp2(int, int);    // function returning int*
    ```

--- 

### `qsort`

`qsort` is a standard library function (in `<stdlib.h>`) used to sort an array
of arbitrary elements by using a user-supplied comparison function.

```c
qsort(arr, count, sizeof(int), <comparator function>);
```

It requires a function pointer to a *comparator function* matching this
signature:

```c
int (*compare)(const void *left, const void *right);
```

Any comparator function for `qsort` must:

 - accept two `const void *` pointers (pointing to elements being compared)
 - return:

    - a negative value if left < right
    - zero if left == right
    - a positive value if left > right

???+ Example "int Comparator Example"
    ```c
    int compareInts(const void *a, const void *b) {
        int x = *(const int *)a;
        int y = *(const int *)b;
        return (x > y) - (x < y);
    }
    ```

---

## Indexing a Data File

Typically, the only way to find a specific record in a data file is to scan
from the beginning until it is found. For large files, this becomes slow.

To solve this, we can create a secondary *index* file which stores some meta
information about the data and each record’s key and its byte offset, an index
value, which allows a program reading the data to jump directly to the required
record.

Think of it like the index in a textbook.

### Creating Index Files

Index files typically have two parts to them.

1. **Index Header**

    The header contains general information needed to read and interpret the index.
    This usually includes:
    
    - the number of records  
    - the size or format of each key  
    - any identifying information linking this index to the corresponding data file  

    The header does not contain any actual record data.

2. **Index Records**

    Each index record stores two pieces of information:

    - the key for the record  
    - the byte offset of that record in the data file


!!! info "Creating an Index File"

    This is the typical process for creating an index file for a given data file.
    ```text
    1. Read the data file sequentially.
    2. For each record, record its key and the file position where it starts.
    3. Store all (key, offset) pairs in an array.
    4. Sort this array by key (using qsort).
    5. Write the index header.
    6. Write all index records in sorted order.

    ```

    This produces a compact structure the program can search quickly.


!!! abstract "Structure" 

    After indexing, the structure will look something like this with two files.


    **Data File (full records)**
    ```
    [ Record 1 data ... ]
    [ Record 2 data ... ]
    [ Record 3 data ... ]
    [ ... ]
    ```

    **Index File (keys + offsets only)**
    ```
    [ Index Header ]
    [ Key 1 | Offset of Record 1 ]
    [ Key 2 | Offset of Record 2 ]
    [ Key 3 | Offset of Record 3 ]
    [ ... ]
    ```


---

### Using an Index File

Once the index file is created, the program can use it to quickly locate and
load specific records from the data file without scanning.

!!! info "Reading data using an Index File"

    This is the typical process for reading a data file using an index file.
    ```
    1. Open the data file and the index file.
    2. Read the index header.
    3. Load all index records into memory.
    4. Search the index records for the desired key.
    5. Retrieve the byte offset associated with that key.
    6. Use fseek() to jump to that position in the data file.
    7. Read the record from the data file.
    ```

???+ Example  "Example using `fseek` With an Index Offset"

    **Step 1: Use the index file to find the offset for the desired key**
    
    ```c
    FILE *indexFp = fopen("data.idx", "rb");
    
    IndexHeader hdr;
    fread(&hdr, sizeof(IndexHeader), 1, indexFp);
    
    IndexRecord *records = malloc(hdr.recordCount * sizeof(IndexRecord));
    fread(records, sizeof(IndexRecord), hdr.recordCount, indexFp);
    
    long offset = -1;
    
    for (int i = 0; i < hdr.recordCount; i++)
    {
        if (strcmp(records[i].key, targetKey) == 0)
        {
            offset = records[i].offset;
            break;
        }
    }
    
    fclose(indexFp);
    ```
    
    **Step 2: Jump directly to the correct record in the data file**
    
    ```c
    FILE *fp = fopen("data.dat", "rb");
    
    if (fp != NULL && offset >= 0)
    {
        fseek(fp, offset, SEEK_SET);
    
        DataRecord rec;
        fread(&rec, sizeof(DataRecord), 1, fp);
    
        fclose(fp);
    }
    ```
    
    The data file is not searched directly. The program reads the index file,
    finds the offset, and then jumps straight to that position.
