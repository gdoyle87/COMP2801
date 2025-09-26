# Week 2

This week covers **formatted input** using `scanf` and recursion.

## Formatted Input with `scanf`

`scanf` statements contain a **format control string** that specifies how input
should be read, followed by pointers to variables where the input will be stored.

Key capabilities:

1. Inputting all types of data.
2. Inputting specific characters from an input stream.
3. Skipping specific characters in an input stream.

---

### `scanf` Syntax

```c
scanf(format-control-string, other-arguments);
```

**format-control-string** – describes input formats using conversion specifiers.
**other-arguments** – pointers to variables that will receive the input.

<br><br>
* Prompt the user for one (or a few) items at a time.
* Avoid asking for many inputs in one statement.
* Always handle the possibility of incorrect data (e.g., invalid integers or
  strings with missing punctuation).

---

### Conversion Specifiers

Like `printf`, `scanf` uses conversion specifiers to handle different data types.
Some specifiers differ between input (`scanf`) and output (`printf`).

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

### Using Scan Sets

A **scan set** allows input of only certain characters, defined inside square
brackets `[]` after a `%` in the format string. Input continues until a character
not in the scan set is encountered.

Example: using `%[aeiou]` reads only vowels.

```c
#include <stdio.h>

int main(void) {
    char z[9] = "";
    printf("%s", "Enter string: ");
    scanf("%8[aeiou]", z); // only vowels
    printf("The input was \"%s\"\n", z);
    return 0;
}
```

Input: `oeeeooahah` → stops at `h`, outputs `oeeeooa`.

---

#### Inverting the Scan Set

An **inverted scan set** matches characters *not* in the given set. Use a `^`
inside the brackets to invert.

Example: `%[^aeiou]` reads only consonants and other non-vowels.

```c
#include <stdio.h>

int main(void) {
    char z[9] = "";
    printf("%s", "Enter a string: ");
    scanf("%8[^aeiou]", z); // non-vowels
    printf("The input was \"%s\"\n", z);
    return 0;
}
```

Input: `String` → stops at vowel `i`, outputs `Str`.

### Using Field Widths

A **field width** can be applied in a `scanf` conversion specifier to control how many characters are read from the input stream.

* Input is read as groups of digits/characters of the specified width.
* Useful when parsing fixed-length data such as IDs, phone numbers, or formatted strings.

Example: `%2d` reads exactly 2 digits into one variable, then `%d` reads the rest.

```c
#include <stdio.h>

int main(void) {
    int x = 0;
    int y = 0;

    printf("%s", "Enter a six digit integer: ");
    scanf("%2d%d", &x, &y); // first 2 digits go to x, remaining go to y

    printf("The integers input were %d and %d\n", x, y);
    return 0;
}
```

Input: `123456` → output: `12` and `3456`.

### Skipping Characters in an Input Stream

`scanf` can skip unnecessary characters in the input stream:

* **Whitespace characters** (space, tab, newline) are skipped automatically at the beginning of most format specifiers.
* **Literal characters** in the format string (like `-` or `/`) must match in the input and are discarded.

Example:

```c
scanf("%d-%d-%d", &month, &day, &year);
```

Input: `11-10-1999` → assigns 11, 10, 1999 while skipping the dashes.

---

#### Assignment Suppression Character

The **`*` assignment suppression character** allows `scanf` to read and discard input without storing it in a variable.

Example: `%*c` reads and discards a single character.

```c
#include <stdio.h>

int main(void) {
    int month = 0;
    int day = 0;
    int year = 0;

    printf("%s", "Enter a date in the form mm-dd-yyyy: ");
    scanf("%d%*c%d%*c%d", &month, &day, &year); // ignores separators
    printf("month = %d day = %d year = %d\n", month, day, year);

    printf("%s", "Enter a date in the form mm/dd/yyyy: ");
    scanf("%d%*c%d%*c%d", &month, &day, &year); // works with /
    printf("month = %d day = %d year = %d\n", month, day, year);
    return 0;
}
```

Input: `07-04-2021` → output: `7 4 2021`
Input: `01/01/2021` → output: `1 1 2021`


## Recursion

A **recursive function** is one that calls itself, either directly or indirectly through another function. Recursion is a common but complex topic; here we look at its basic structure.

### Base Cases and Recursive Calls

A recursive function solves problems by dividing them into:

* A **base case** – the simplest case the function knows how to solve directly.
* A **recursive case** – a more complex problem broken down into smaller versions of itself.

The recursive case must resemble the original problem but be simpler or smaller, ensuring progress toward the base case. Each recursive call works on the reduced problem until the base case is reached.

### Recursive Step

When a recursive call is made:

* The function pauses its current execution and launches a fresh copy of itself to handle the smaller problem.
* This process can repeat many times, generating multiple recursive calls.
* Each call must eventually converge on the base case, where recursion stops.

### Returning Results

Each recursive call includes a `return` statement. When the base case is reached, the result is returned back to the previous call. This chain of returns continues until the result reaches the original caller.

In summary:

* Base case: directly solvable, no further recursion.
* Recursive step: reduces the problem and calls the function again.
* Convergence: repeated recursion eventually reaches the base case, then unwinds with results.

---

### Example: Factorial

```c
#include <stdio.h>

int factorial(int n) {
    if (n == 0) {           // base case
        return 1;
    } else {
        return n * factorial(n - 1); // recursive case
    }
}

int main(void) {
    int num = 5;
    printf("Factorial of %d is %d\n", num, factorial(num));
    return 0;
}
```

Input: `5` → Output: `120`


#### Stack Visualization

Recursive calls can be visualized as a stack. Each new call is **pushed** onto the stack showing the pending computation, and results are **popped** once the base case is reached.

**Factorial(5):**

```
Push (calls):
Factorial(5) -> 5 * Factorial(4)
  Factorial(4) -> 4 * Factorial(3)
    Factorial(3) -> 3 * Factorial(2)
      Factorial(2) -> 2 * Factorial(1)
        Factorial(1) -> 1 * Factorial(0)
          Factorial(0) -> 1  (base case)

Pop (returns):
        Factorial(1) = 1 * Factorial(0) = 1 * 1 = 1
      Factorial(2) = 2 * Factorial(1) = 2 * 1 = 2
    Factorial(3) = 3 * Factorial(2) = 3 * 2 = 6
  Factorial(4) = 4 * Factorial(3) = 4 * 6 = 24
Factorial(5) = 5 * Factorial(4) = 5 * 24 = 120
```


