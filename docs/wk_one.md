# Week 1

Week 1 focused on the basics of C: what it is, how a C program is built and run, and how we interact with it using functions like `main()`, `printf()`, and `scanf()`.

## What is C

C is a language evolved from BCPL and B language.
<br>It became popular on Unix systems which were among the first hardware agnostic OS.
<br>C is used for highly performant programs because it is quite efficient.

C is widely used in operating systems (e.g., Linux kernel), embedded systems, and as a foundation for languages like C++ and Java.

C does not have any objects. 
<br>That means we only have functions to use to structure our programs.


## C Development
There are typically six phases of a program in C:

- **editing/programming**
- **preprocess**
	 - These are commands that will change the code that you write 
	 - examples are  `#include` and `#define`
	 - back in the day, there were no mice to copy and paste things and the terminals were dumb (brains were in the mainframe) so it was difficult to copy and paste things.
		 - preprocessor allows you to do things similar to a copy and paste.
         - for `#include`, think of it like copying and pasting the contents of the included file into this one.
         - for `#define`, think of it like a text replacement in our code.
- **compile**
	 - catches syntax errors
	 - creates machine code from your code into `.o` files
- **link**
	 - combines the `.o` files and the C Library Object Code into an executable
- **load**
	- The operating system loads the executable into memory, preparing it for execution.
- **execute**
	- The CPU runs the program, starting from the `main` function.

## `main` Function

In `C` programs begin execution in the `main()` function. 

The basic syntax is:
```C
int main(void)
{
	// ... do stuff
}
```

In modern C (C99 and later), main() implicitly returns 0 if no return statement is given. This only applies to main() — all other functions require an explicit return if they are non-void.
 
- *0* indicates success
- *1* or any positive int up to *255* signifies an error.

We can see the returned value in the terminal by typing:
```zsh
echo $?
```
![hello demo](hello.gif)

We can also take command line arguments in `main` with the following syntax:
```C
int main(int argc, char *argv[])
// OR int main(int argc char **argv)
```


<details><summary>Example with CLI arguments</summary>
In this example, we take in a command line argument along with the function call.
The program ends by listing the argument index and the argument value to highlight that the first
argument is always the name of the program:

```C
#include <stdio.h> // we need to include stdio to get access to puts() and printf() funtions.
#include <stdlib.h> // for EXIT_FAILURE and EXIT_SUCCESS macros

int main(int argc, char *argv[]) {
  if (argc != 2) {
    puts("Usage: ./hello_2 <input_name>");
    return EXIT_FAILURE; // EXIT_FAILURE evaluates to 1 and is more portable than hardcoding the value
  }

  printf("Hello, %s\n", argv[1]);
  puts("Welcome to COMP2701\n");

  puts("Here are the arguments that were supplied:");
  for (int i = 0; i < argc; i++) {
    printf("%3d %10s\n", i, argv[i]);
  }
  puts("");
  return EXIT_SUCCESS;// EXIT_SUCCESS evaluates to 0
}
```

<img alt="hello argument demo" src="../hello2.gif">

</details>
<br>




## Printing Output
In C, functions like `printf()` and `puts()` are used to print output to the screen.
Unlike Python or Java, these functions aren’t available by default — you must 
include the appropriate header file first.
For both `printf()` and `puts()`, that file is `<stdio.h>` (standard I/O).
To use them, simply add `#include <stdio.h>` at the top of your program.


### `puts()`
`puts()` prints out strictly a string of text. We can only pass string literals into `puts()`. 
<br>`puts()` automatically appends a newline character to the end of the string.

### `printf()`
`printf()` (or print *f*ormatted) prints out a formatted string where, like 
python and Java, we can pass in variables. 
<br>Unlike `puts()`, `printf()` does *not* append a newline character. We must
end the string with `\n` if we want a new line.

In order to use variables in a `printf()` statement, we must pass in a string
with placeholder **format specifiers** followed by a list of the variables to
place in the specifiers.
```C
int i = 10;
printf("The value of i is %d.\n", i);
// The value of i is 10.
```

#### `printf()` Format Specifiers
The following is a list of some common format specifiers:

| Specifier | Description                                 | Example Output      | Data Type        |
|-----------|---------------------------------------------|---------------------|------------------|
| `%d`      | Signed decimal integer                      | `42`                | `int`            |
| `%i`      | Signed decimal integer (same as `%d`)       | `42`                | `int`            |
| `%u`      | Unsigned decimal integer                    | `42`                | `unsigned int`   |
| `%zu`     | Unsigned size of objects in bytes           | `42`                | `size_t`         |
| `%f`      | Decimal floating point                      | `3.141593`          | `float`, `double`|
| `%F`      | Decimal floating point (uppercase `INF/NAN`)| `3.141593`          | `float`, `double`|
| `%c`      | Single character                            | `A`                 | `char`           |
| `%s`      | String of characters                        | `Hello`             | `char *`         |
| `%p`      | Pointer address                             | `0x7ffeefbff5c0`    | `void *`         |
| `%%`      | Literal `%` character                       | `%`                 | —                |


## Getting User Input
In `C` there are a few ways to get user input. For our purposes, we will be 
using `scanf()` in this course. As with the printing functions, `scanf()` is 
found in the `<stdio.h>` library so make sure to include that in programs that 
will use `scanf()`.

```C
int number = 0;
printf("Please enter a number: ");
if (scanf("%d", &number) != 1) {
    printf("Invalid input!\n");
    return 1;
}
printf("You entered %d.\n", number);
// Please enter a number: 10
// You entered 10.
```

Unlike `printf()` and `puts()`, `scanf()` requires the *address* of variables 
(e.g., `&number` in the above example). This is because C passes variables by value, 
meaning a copy is passed unless the address is provided. Since `scanf()` is 
looking for a place to store the result, simply passing in the variable as usual
would be pointless - we would be writing to a copy and not changing the result.
Instead we give `scanf()` the address in memory where we would like to store the result.

In practice, we generally want to prefix any variable that we are storing a 
result to with the address symbol `&`. The only time we don't need to do this
is with arrays (which we will cover later in this course).

<details>
<summary>
Example of <code>scanf()</code> with an array:
</summary>
```c
char name[20];
printf("Enter your name: ");
scanf("%19s", name); // note: NO "&" here because a string is an array of chars. 
printf("Hello, %s!\n", name);

```
</details>

<br>

#### `scanf()` Format Specifiers
The next notable difference is that there are some slighlty different **format specifiers** in `scanf()`.
Here is a summary of some of the main differences:

| Type        | `printf`	| `scanf` | Why it matters                            |
| ----------- | -------- 	| ------- | ----------------------------------------- |
| `double`    | `%f`     	| `%lf`   | Must use `%lf` in `scanf`              |
| `float`     | `%f`     	| `%f`    | `scanf("%f")` stores to `float*` only |
| `short`     | `%d`     	| `%hd`   | `scanf` needs `h` to downcast             |
| `long`      | `%d` or `%ld`   | `%ld`   | Same specifier, but required in `scanf` - `printf` can accept a long in `%d` but could overflow so not advised.   |
| `long long` | `%lld`		| `%lld`  | Required for `long long` in both          |


#### Other Gotchas
In addition to needing addresses and the slightly different format specifiers, there are a few other behaviours worth noting.

##### Character Input
`scanf("%c", &ch)` reads any character, including whitespace, which can cause issues due to leftover newlines in the input buffer.

```C
int x;
char ch;
scanf("%d", &x);     // user enters: 5⏎
scanf("%c", &ch);    // reads ⏎ as the char!
```

##### String Inputs
`scanf("%s", str)` reads input up to the *first* whitespace (space, tab, or newline). Because of this, using it without a *width specifier* is **unsafe** and risks a buffer overflow. 

In contrast, `printf("%s", str)` will print the entire string until it sees the `\0` **NUL** character.
```C
char str[5];
scanf("%s", str);  // ❌ may overflow if input > 4 chars
scanf("%4s", str); // ✅ safer (leaves 1 byte for '\0')
```

## Note: What is a String in C?

In C, a string is **not** a separate type — it's just an **array of `char` values** that ends with a **NUL terminator** (`'\0'`).

So when you write:

```c
char name[] = "Alice";
```
It’s really just shorthand for:
```c
char name[] = { 'A', 'l', 'i', 'c', 'e', '\0' };
```

That special `'\0'` character tells functions like printf("%s", name) where the string ends.

Put another way, strings in C are really just arrays of characters with a rule: they must end in `'\0'`.

Unlike in Python, Java, or C++, there's no built-in "string" type — just arrays and pointers.

## Note: `NUL` vs `NULL`

These look similar but serve very different purposes in C:

| Term   | Type     | Meaning                                             | 
|--------|----------|-----------------------------------------------------|
| `NUL`  | `char`   | ASCII character `0` (value `0x00`)                  |
| `NULL` | pointer  | Null pointer constant (typically `0` or `(void*)0`) |

---

#### `NUL` (`'\0'`)
- A **character** with value `0`
- Used to **terminate C strings**
- Equivalent to:  
```c
  char c = '\0';  // or: char c = 0;
```

#### `NULL`

A macro that represents a null pointer constant
Typically defined as `((void *)0)` in `<stddef.h>`
<br>Used when a pointer doesn’t point to a valid memory location.

Example:
```c
int *ptr = NULL;
if (ptr == NULL) {
	// pointer is uninitialized or empty
}
```

<hr>

## Note: What is a char in C?

In C, a char is a fundamental data type that represents a single character, but at its core, it is simply an 8-bit integer (typically 1 byte) that can hold values from -128 to 127 (for signed char) or 0 to 255 (for unsigned char). These numeric values are often used to represent characters according to the ASCII table, where each number corresponds to a specific character.
For example:

- The character 'A' has an ASCII value of 65.
- The character 'a' has an ASCII value of 97.
- The character '0' (the digit zero) has an ASCII value of 48.

You can work with char values as either characters or numbers. For instance:
```c
char c = 'A';       // Stores the character 'A' (ASCII value 65)
printf("%c\n", c);  // Prints: A
printf("%d\n", c);  // Prints: 65
```

This dual nature of char allows you to perform arithmetic operations on characters. For example:

```c
char c = 'A';
c = c + 1;          // Moves to the next ASCII value ('B' = 66)
printf("%c\n", c);  // Prints: B
```

The ASCII table is critical for understanding how characters are represented in C. Common ASCII values include:

#### Common ASCII Values
| Character | ASCII Value | Description             |
|-----------|-------------|-------------------------|
| `'A'`     | 65          | Uppercase A             |
| `'Z'`     | 90          | Uppercase Z             |
| `'a'`     | 97          | Lowercase a             |
| `'z'`     | 122         | Lowercase z             |
| `'0'`     | 48          | Digit 0                 |
| `'9'`     | 57          | Digit 9                 |
| `' '`     | 32          | Space                   |
| `'\n'`    | 10          | Newline                 |
| `'\0'`    | 0           | NUL (string terminator) |

<small> Lowercase and Uppercase letters are exactly 32 values away from the same letter </small>

When using char in strings or with input/output functions like `printf()` and `scanf()`, the ASCII encoding ensures that numeric values are interpreted as readable characters.
