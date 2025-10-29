## `printf`

---

### Conversion Specifiers

`printf` uses **conversion specifiers** to determine how data is formatted when printed. Each specifier begins with `%` followed by one or more characters describing type and formatting.

| Specifier  | Description                                   | Example Output                           |
| ---------- | --------------------------------------------- | ---------------------------------------- |
| **Integers** |                                             |                                          |
| `%d`, `%i` | Signed decimal integer                        | `printf("%d", 42)` → `42`                |
| `%u`       | Unsigned decimal integer                      | `printf("%u", 42)` → `42`                |
| `%o`       | Unsigned octal integer                        | `printf("%o", 10)` → `12`                |
| `%x`, `%X` | Unsigned hexadecimal integer (`a–f` or `A–F`) | `printf("%x", 255)` → `ff`               |
| **Floating-point**                 |                                                              |   |
| `%f`       | Floating-point decimal (fixed)                | `printf("%f", 3.1416)` → `3.141600`      |
| `%e`, `%E` | Floating-point in scientific notation         | `printf("%e", 1234.56)` → `1.234560e+03` |
| `%g`, `%G` | Floating-point (shortest of `%f` or `%e`)     | `printf("%g", 0.0000123)` → `1.23e-05`   |
| **Characters & Strings**           |                                                              |   |
| `%c`       | Single character                              | `printf("%c", 'A')` → `A`                |
| `%s`       | String of characters                          | `printf("%s", "Hello")` → `Hello`        |
| **Miscellaneous**                  |                                                              |   |
| `%p`       | Pointer (memory address)                      | `printf("%p", ptr)` → `0x7ffeefbff5ac`   |
| `%%`       | Prints a literal percent sign                 | `printf("%%")` → `%`                     |

---

#### When to Use `%g`

The `%g` (or `%G`) specifier automatically chooses between **fixed-point (`%f`)** and **scientific (`%e`)** notation depending on the value’s magnitude and precision:

* If the exponent is less than -4 or greater than or equal to the precision, `%e` format is used.
* Otherwise, `%f` format is used.
* Trailing zeros are **removed**, and no unnecessary decimal point is shown.

```c
printf("%g", 0.0000123); // → 1.23e-05
printf("%g", 123.456);   // → 123.456
printf("%g", 100.0);     // → 100
```

Use `%g` when you want **concise output** without manually deciding between scientific and decimal notation.

---

### Field Widths

A **field width** specifies the **minimum number of characters** to print. If the value is shorter, it is **right-padded with spaces** by default.

```c
printf("%5d", 12);   // "   12" (width = 5)
printf("%-5d", 12);  // "12   " (left-justified)
```

Field widths can also apply to floating-point values:

```c
printf("%8.2f", 3.14); // "    3.14"
```

* The number before the decimal controls total width.
* The number after the decimal controls precision.

---

### Flags

Flags modify alignment, padding, and sign display in formatted output.

| Flag  | Meaning                                                                 | Example                        |
| ----- | ----------------------------------------------------------------------- | ------------------------------ |
| `-`   | Left-justify within the field                                           | `printf("%-5d", 42)` → `42   ` |
| `+`   | Always print a sign (`+` or `-`)                                        | `printf("%+d", 42)` → `+42`    |
| space | Prefix positive numbers with a space                                    | `printf("% d", 42)` → ` 42`    |
| `0`   | Pad numeric output with leading zeros                                   | `printf("%05d", 42)` → `00042` |
| `#`   | Force alternate form (e.g., add `0x` for hex, decimal point for floats) | `printf("%#x", 255)` → `0xff`  |

---

## `scanf`
---

### Conversion Specifiers

| Specifier                          | Description                                                  |   |
| ---------------------------------- | ------------------------------------------------------------ | - |
| **Integers**                       |                                                              |   |
| `%d`                               | Reads a signed decimal integer  `int*`                      |   |
| `%i`                               | Reads signed decimal, octal, or hexadecimal  `int*`         |   |
| `%o`                               | Reads an octal integer  `unsigned int*`                     |   |
| `%u`                               | Reads an unsigned decimal integer  `unsigned int*`          |   |
| `%x` / `%X`                        | Reads a hexadecimal integer  `unsigned int*`                |   |
| `h`, `l`, `ll`                     | Length modifiers (`short`, `long`, `long long`) for integers |   |
| **Floating-point**                 |                                                              |   |
| `%e`, `%E`, `%f`, `%F`, `%g`, `%G` | Reads a floating-point value  `float*` / `double*`          |   |
| `l` or `L`                         | Length modifiers for `double` or `long double`               |   |
| **Characters & Strings**           |                                                              |   |
| `%c`                               | Reads a single character  `char*` (no `\0` added)           |   |
| `%s`                               | Reads a string  `char[]` (terminates with `\0`)             |   |
| **Scan set**                       |                                                              |   |
| `%[...]`                           | Reads a set of characters into a string                      |   |
| **Miscellaneous**                  |                                                              |   |
| `%p`                               | Reads an address (pointer format)                            |   |
| `%n`                               | Stores number of characters read so far  `int*`             |   |
| `%%`                               | Skips a literal `%` in input                                 |   |

---

### Scan Sets and Inverted Scan Sets

**Scan sets** allow `scanf` to read a group of characters that match a specified set. They are defined using `%[ ... ]`.

* `%[characters]` → reads only the characters listed.
* `%[^characters]` → reads everything *except* the characters listed.
* Useful for reading structured data such as comma- or space-separated values.

**Examples:**

```c
char word[20];
scanf("%19[A-Za-z]", word);   // reads only letters

char untilComma[30];
scanf("%29[^,]", untilComma);  // reads everything up to the next comma
```

**Notes:**

* `scanf` automatically adds a null terminator (`'\0'`) at the end.
* To include `]` in the set, place it first inside the brackets: `%[]A-Z]`.
* To include `-`, place it at the start or end of the set: `%[-A-Z]`.

---

### Field Widths

Field widths define how many characters `scanf` will read for a given conversion. This prevents buffer overflows and controls input precision.

```c
char name[11];
scanf("%10s", name);   // reads at most 10 chars, leaves space for null terminator
```

**Numeric Example:**

```c
int year, month, day;
scanf("%4d%2d%2d", &year, &month, &day);
// Input: 20251028 → year=2025, month=10, day=28
```

---

### Skipping Characters and Assignment Suppression

The **assignment suppression character** (`*`) allows `scanf` to skip matched input without storing it.

* Any literal in the format string must appear in the input and will be consumed.
* Whitespace in the format matches any amount of whitespace in the input.

**Examples:**

```c
// Skip a single character (like '-') between numbers
int year, month, day;
scanf("%d%*c%d%*c%d", &year, &month, &day);

// Skip entire field before comma
char name[20];
scanf("%*[^,],%19s", name);
```

---

## Recursion

**Recursion** occurs when a function calls itself directly or indirectly. Each call creates a new stack frame until a **base case** is reached, after which calls resolve in reverse order.

### Key Concepts

* **Base Case:** The simplest form of the problem that can be solved directly.
* **Recursive Case:** Reduces the problem toward the base case.
* Recursion always requires *progress toward termination* to prevent infinite loops.

### Example – Factorial Function

```c
int factorial(int n)
{
    if (n == 0)  // base case
        return 1;
    else          // recursive case
        return n * factorial(n - 1);
}
```

**Explanation:**

* For `factorial(3)` → calls unfold as `3 * factorial(2)` → `2 * factorial(1)` → `1 * factorial(0)`.
* Base case returns 1, then each call multiplies by the previous `n` until the result is complete.

--- 

## Structures

A **structure** groups related variables under one name. The C standard calls them *aggregates*.
Defined using the `struct` keyword:

```c
struct card {
    const char *face;
    const char *suit;
};
```

Semicolon is required after the closing brace. Members can be of different types, but a structure cannot directly contain an instance of itself—only a pointer to its own type.

```c
struct card {
    const char *face;
    const char *suit;
    struct card *nextCard;  // Valid
};
```

---

### Defining Variables of Structure Types

Defining a structure creates a **type**, not a variable.
Variables are declared afterward:

```c
struct card myCard;
struct card deck[52];
struct card *cardPtr;
```

You can also define variables inline with the structure:

```c
struct card {
    const char *face;
    const char *suit;
} myCard, deck[52], *cardPtr;
```

---

### Structures Without Tag Names

Anonymous structs can be declared if variables are defined immediately:

```c
struct {
    int x;
    int y;
} point1, point2;
```

Without a tag, you can’t reuse the type elsewhere.

---

### Comparing Structure Objects

Structures cannot be compared with `==` or `!=` because compilers insert **padding bytes** for memory alignment, which may hold **unspecified garbage values**.
Even identical structures might differ in padding, making bytewise comparison **undefined behavior**.

---

### Using `sizeof` with Structures

`sizeof(struct_name)` gives the memory occupied by a structure, including padding.

```c
struct example {
    char c;
    int i;
};

printf("%zu\n", sizeof(struct example)); // Likely prints 8, not 5
```

!!! note "Structure Packing and Alignment"
    Compilers may insert padding between members for alignment, improving speed but wasting space.
    To minimize padding, order members from largest to smallest type.
    Use `#pragma pack` only when absolutely necessary for binary compatibility — it reduces portability.

---

## `typedef`

`typedef` creates an alias for a type, making code more concise and readable.

```c
typedef struct card Card;
Card newCard;
```

---

### Combining `typedef` with `struct`

You can combine both in one declaration:

```c
typedef struct {
    const char *face;
    const char *suit;
} Card;
```

This eliminates the need to repeat `struct` every time.

!!! warning
    Do not declare variables in the same line when using this form.
    If you need variables too, use a standard `struct` definition followed by a separate `typedef`.

---

## Unions

A **union** is a derived data type similar to a `struct`, but unlike structures, **all members share the same memory space**. Only one member can be used at a time, making unions memory-efficient when variables are only relevant at different times during execution.

```c
union number {
    int x;
    double y;
};
```

Defining a union creates a new type but does not allocate memory until a variable is declared.

!!! tip

    Union definitions are often placed in header files so multiple source files can reuse the same type definition.

### Characteristics

* The **size** of a union equals the size of its **largest member**.
* Accessing a member different from the one last assigned leads to undefined behavior.
* Unions save space but require careful type management.

### Initializing a Union

A union can be initialized only through its **first member**:

```c
union number value = {10}; // assigns 10 to x
```

!!! warning

    If initialized with a value meant for another member, it will be converted to the first member’s type:
    
    ```c
    union number value = {1.43}; // assigns 1 to x instead of 1.43 to y
    ```

---

## Bitwise Operators

Bitwise operations work directly on the binary representation of integers. Each bit in a value represents a power of two. These operations are commonly used for hardware programming, flag control, and performance optimization.

!!! note

    Use **unsigned** integers for bitwise operations to avoid sign bit ambiguities.

### Bitwise AND (`&`)

Sets a bit to 1 **only if both operands’ bits are 1**.

```c
//   1101 (13)
// & 1011 (11)
// ------
//   1001 (9)
```

### Bitwise OR (`|`)

Sets a bit to 1 **if either operand’s bit is 1**.

```c
//   1101 (13)
// | 1011 (11)
// ------
//   1111 (15)
```

### Bitwise XOR (`^`)

Sets a bit to 1 **only if the corresponding bits differ**.

```c
//   1101 (13)
// ^ 1011 (11)
// ------
//   0110 (6)
```

### Left Shift (`<<`)

Moves bits **left**, filling with zeros. Each shift by one multiplies by 2.

```c
// 0101 (5)
// << 1
// ------
// 1010 (10)
```

### Right Shift (`>>`)

Moves bits **right**, discarding bits on the right. Each shift by one divides by 2.

```c
// 1010 (10)
// >> 1
// ------
// 0101 (5)
```

### Bitwise NOT (`~`)

Inverts each bit: 0 → 1 and 1 → 0.

```c
// 0101 (5)
// ~
// ------
// 1010 (10 if only 4 bits shown)
```

!!! warning
    `~` flips **all bits**, including sign bits. When applied to signed integers, the result may appear negative.

---

### Common Bit Manipulation Techniques

These patterns are frequently used in embedded systems and competitive programming.

#### 1. Check if a Number is Even or Odd

```c
if (x & 1)
    printf("Odd");
else
    printf("Even");
```

#### 2. Swap Two Numbers Without a Temp Variable

```c
a ^= b;
b ^= a;
a ^= b;
```

#### 3. Check if a Number is a Power of Two

A number is a power of two if it has exactly one bit set.

```c
if (x > 0 && (x & (x - 1)) == 0)
    printf("Power of 2");
```

#### 4. Count Set Bits (Brian Kernighan’s Algorithm)

Counts the number of bits set to 1.

```c
int count = 0;
while (x) {
    x &= (x - 1);
    count++;
}
```

#### 5. Set or Clear a Specific Bit

```c
x |= (1 << n);   // set nth bit
x &= ~(1 << n);  // clear nth bit
```

#### 6. Toggle a Bit

```c
x ^= (1 << n);
```

#### 7. Extract the Lowest Set Bit

```c
int lowest = x & -x;
```

#### 8. Check if Two Integers Have Opposite Signs

```c
if ((x ^ y) < 0)
    printf("Opposite signs");
```


## Self-Referential Structures

* Structures can include **pointers to their own type**, enabling dynamic data structures.
* Example:

  ```c
  struct node { int data; struct node *nextPtr; };
  ```
* Used for **linked lists**, **stacks**, and **trees**.

---

## Linked Lists

* **Linear collection** of nodes connected by pointers.
* Each node contains **data** and a **pointer to the next node**.
* The **head pointer** references the first node; the last node’s pointer is `NULL`.

![Basic Linked List](../images/basic_linked_list.png)

### Key Points

| Arrays               | Linked Lists            |
| :------------------- | :---------------------- |
| Fixed size           | Dynamic size            |
| O(1) direct access   | Sequential traversal    |
| Costly insert/delete | Efficient insert/delete |

### Common Operations

| Operation    | Description                               |
| :----------- | :---------------------------------------- |
| **Insert**   | Allocate a new node and relink pointers.  |
| **Delete**   | Relink surrounding nodes and free memory. |
| **Traverse** | Follow `nextPtr` until `NULL`.            |

---

## Trees

* **Non-linear hierarchical** data structure consisting of **nodes** connected by edges.
* Each node may have **two or more** children.

### Binary Trees

* Each node has at most **two children** (`left`, `right`).
* The **root** is the topmost node; **leaves** have no children.

![Basic Tree Structure](../images/basic_tree.png)

### Binary Search Tree (BST)

* Special binary tree where:

    * Left subtree value **<** Root value **<** Right subtree value.
    * Enables fast searching, insertion, and deletion.
* **Average complexity:** O(log n)
* **Worst case (unbalanced):** O(n)

### Tree Traversals

| Type          | Visit Order         | Common Use             |
| :------------ | :------------------ | :--------------------- |
| **Preorder**  | Root → Left → Right | Copying the tree       |
| **Inorder**   | Left → Root → Right | Produces sorted output |
| **Postorder** | Left → Right → Root | Deletion or cleanup    |

---

**Summary:**

* Use self-referential structures to create dynamic collections.
* Linked lists are best for variable-size sequential data.
* Trees (especially BSTs) provide efficient searching and hierarchical relationships.


## Stacks

A **stack** is a linear data structure that follows the **Last-In, First-Out (LIFO)** principle. The most recently added element is removed first.

### Core Concepts

* Insertion and deletion occur only at the **top** of the stack.
* Implemented using **linked lists** or **arrays**.
* The **stack pointer** (`topPtr`) tracks the current top node.

### Key Operations

| Operation     | Description                                  |
| :------------ | :------------------------------------------- |
| **push()**    | Insert an element at the top.                |
| **pop()**     | Remove the top element and return its value. |
| **isEmpty()** | Check if the stack is empty.                 |

**Example Structure:**

```c
struct stackNode {
    int data;
    struct stackNode *nextPtr;
};
```

---

## Queues

A **queue** is a linear data structure that follows the **First-In, First-Out (FIFO)** principle. The first element added is the first one removed.

### Core Concepts

* Insertion occurs at the **rear**; deletion occurs at the **front**.
* Implemented using **linked lists**.
* Two pointers are used:

    * `frontPtr` → points to the first node
    * `rearPtr` → points to the last node

### Key Operations

| Operation     | Description                       |
| :------------ | :-------------------------------- |
| **enqueue()** | Add a new element to the rear.    |
| **dequeue()** | Remove an element from the front. |
| **isEmpty()** | Check if the queue is empty.      |

**Example Structure:**

```c
struct queueNode {
    int data;
    struct queueNode *nextPtr;
};
```


