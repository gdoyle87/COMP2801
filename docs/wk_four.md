# Week 4

This week continued Chapter 10 and covered **unions** and **bit manipulations**. 


<hr> 

## Unions

Like a `struct`, a `union` is a derived data type. The difference is that **all
members of a union occupy the same memory space**.

This is helpful when different variables are only relevant at different times
during program execution. By combining them in a `union`, you can **save
memory** rather than allocating space for all members simultaneously.

In most cases, a `union` contains two or more items of *different* types. You
can access only **one member (and therefore one type)** at a time. It is the
programmer’s responsibility to reference the data with the proper type — using
the wrong one results in a logic error.

The `sizeof` a `union` is always equal to the size of its **largest member
type**.

<hr>

### Declaring a `union`

The declaration of a `union` is very similar to that of a `struct`:

```c
union number { 
    int x; 
    double y; 
};
```

As with a `struct`, defining a `union` only creates a new type; it does not
reserve memory until you declare variables of that type.

!!! tip 
    Union definitions are often placed in header files so they can be
    reused across multiple source files that require access to the same type
    definition.

<hr>

### Initializing `union` During Declaration

You can initialize a variable of a union type during its declaration by
assigning a value to the **first member type** listed in the definition.

```c
// 'number' contains the following members in order: int x, double y
union number value = {10}; // assigns 10 to x
```

!!! warning
    If you provide a value intended for a different member during initialization,
    it will be converted to the first member type instead.
    
    ```c
    // 'number' contains the following members in order: int x, double y
    union number value = {1.43}; // assigns 1 to x instead of assigning 1.43 to y
    ```
<hr>

### Beyond the Textbook: Tagged Unions

!!! note
    The following material was **not covered in class (nor in this section of 
    the text as far as I can tell)** and is provided here for informational
    purposes only.

While traditional unions allow multiple types to share the same memory space,
they provide **no way to track which member is currently active**. This makes
them error-prone for most applications.

A safer and more common modern pattern is the **tagged union** (also called a
*discriminated union*). A tagged union adds an explicit field, or *tag*, to
record which member of the union is currently valid.

This trades a bit of extra overhead for greater safety.

```c
enum ValueType { TYPE_INT, TYPE_DOUBLE };

struct Value {
    enum ValueType type;   // the tag
    union {
        int i;
        double d;
    } data;
};
```

This design lets programs safely determine which member to use:

```c
struct Value v;
v.type = TYPE_DOUBLE;
v.data.d = 3.14;

if (v.type == TYPE_DOUBLE) {
    printf("%f\n", v.data.d);
}
```

!!! info
    Tagged unions are common in modern C for representing values that may take
    multiple forms, such as tokens in a compiler or event types in an input system.
    They are safer and clearer than plain unions while still using shared memory
    efficiently.

<hr>

## Bitwise Operators

Computers represent all data internally as sequences of bits (0s and 1s). Each
bit can store one of two values, and groups of bits are used to represent
larger quantities. On most systems, eight bits form one byte — the typical
storage unit for a `char`.

Bitwise operators allow direct manipulation of individual bits within integer
values. These operations work on the binary representations of the operands and
are frequently used for low-level programming, such as hardware control,
encoding, and flag management.


!!! note
    Bitwise operations are typically applied to **unsigned** integers to avoid
    ambiguity when dealing with sign bits and system-dependent right-shift
    behavior.


<hr>

### Bitwise AND (`&`)

Sets each bit in the result to 1 only if the corresponding bits in both
operands are 1.

```c
// 4-bit examples
//    1101  (13)
//  & 1011  (11)
//  --------
//    1001  (9)
```

### Bitwise OR (`|`)

Sets each bit in the result to 1 if at least one of the corresponding bits in
either operand is 1.

```c
//    1101  (13)
//  | 1011  (11)
//  --------
//    1111  (15)
```

### Bitwise XOR (`^`)

Sets each bit in the result to 1 only if the corresponding bits in the operands
differ.

```c
//    1101  (13)
//  ^ 1011  (11)
//  --------
//    0110  (6)
```

### Left Shift (`<<`)

Moves bits to the left, filling with zeros from the right. Each left shift by 1
multiplies the number by 2.

```c
//    0101  (5)
//  << 1
//  --------
//    1010  (10)
```

### Right Shift (`>>`)

Moves bits to the right, discarding bits on the right. For unsigned values,
zeros are filled in from the left. Each right shift by 1 divides the number by
2 (integer division).

```c
//    1010  (10)
//  >> 1
//  --------
//    0101  (5)
```

### Bitwise NOT (`~`)

Inverts each bit of the operand, turning 0s into 1s and 1s into 0s.

```c
//    0101  (5)
//  ~
//  --------
//    1010  (10 if only 4 bits are shown)
```

!!! warning
    In C, `~` inverts **all** bits in the operand, not just the visible ones. For
    fixed-width integers like `uint8_t`, this means all 8 bits are inverted. When
    printed as signed types, this can appear as a negative number.

### Beyond the Textbook: Common Bit Manipulation Techniques

!!! note
    The following material was **not covered in class (nor in this section of 
    the text)** and is provided here for informational purposes only.

Bit manipulation techniques are frequently used in competitive programming and
technical interviews (such as on LeetCode). These operations allow efficient
arithmetic and logical computations without relying on higher-level constructs.

Below are several common patterns, each explained with examples using 4-bit
binary values for clarity.

---

#### 1. Checking if a Number is Even or Odd

You can check the least significant bit (LSB) of a number using the bitwise AND
operator.

```c
if (x & 1)
    printf("Odd");
else
    printf("Even");
```

Example:

```c
//   0101 (5)
// & 0001
// ------
//   0001 -> Odd

//   0110 (6)
// & 0001
// ------
//   0000 -> Even
```

---

#### 2. Swapping Two Numbers Without a Temporary Variable

This uses XOR to swap values in place.

```c
a ^= b;
b ^= a;
a ^= b;
```

Example:

```c
// a = 0101 (5)
// b = 0011 (3)
// Step 1: a = a ^ b -> 0110
// Step 2: b = b ^ a -> 0101
// Step 3: a = a ^ b -> 0011
// Result: a = 3, b = 5
```

---

#### 3. Checking if a Number is a Power of Two

A number is a power of two if it has exactly one bit set.

```c
if (x > 0 && (x & (x - 1)) == 0)
    printf("Power of 2");
```

Example:

```c
//   x = 0100 (4)
// x-1 = 0011
// & operation:
//   0100
// & 0011 
//   ---- 
//   0000 -> true
```

---

#### 4. Counting Set Bits (Brian Kernighan’s Algorithm)

This algorithm repeatedly removes the lowest set bit until the number becomes
zero.

```c
int count = 0;
while (x) {
    x &= (x - 1);
    count++;
}
```

Example:

```c
// x = 1101 (13)
// 1101 -> 1100 -> 1000 -> 0000
// count = 3
```

---

#### 5. Clearing or Setting a Specific Bit

To **set** a bit, use OR; to **clear** a bit, use AND with the complement of a
mask.

```c
// Set nth bit
x |= (1 << n);

// Clear nth bit
x &= ~(1 << n);
```

Example:

```c
// x = 0101, n = 1
// (1 << 1) = 0010
// Set:   0101 | 0010 = 0111
// Clear: 0101 & 1101 = 0101 (no change since that bit is already 0)
```

---

#### 6. Toggling a Bit

Flips the specified bit using XOR.

```c
x ^= (1 << n);
```

Example:

```c
// x = 0101, n = 2
// (1 << 2) = 0100
//   0101 
// ^ 0100 
//   ----
//   0001
```

---

#### 7. Extracting the Lowest Set Bit

Returns a number with only the lowest set bit of `x` preserved.

```c
int lowest = x & -x;
```

Example:

```c
// x = 1010
// -x (two’s complement) = 0110
//   1010 
// & 0110 
//   ----
//   0010
```

---

#### 8. Checking if Two Integers Have Opposite Signs

Uses XOR to test the sign bit. The result will be negative if the signs differ.

```c
if ((x ^ y) < 0)
    printf("Opposite signs");
```

Example:

```c
// x = +5 (0101), y = -3 (in 4-bit two’s complement: 1101)
// x ^ y = 1000 (negative)
// -> Opposite signs
```

---


