# Week 9

This week covers CLI arguments (as well as some basic shell operations), 
`calloc()` and `realloc()`, and a bunch of other random topics that seems to
just be here to say it was covered..

## Command Line Arguments in C

In C, we can grab arguments from the command line when running a program.
To do this, we can supply two arguments to our main function:
```c
int main(int argc, char *argv[])

// or equivanlently

int main(int argc, char **argv)
```

`int argc` stands for the **arg**ument **c**ount and always includes the name
of the program as the first counted element (a program *always* has at
least one argument as a result).

`char *argv[]` stands for the **arg**ument **v**ector. It is an array of strings
representing the different arguments passed (including the name of the program).

???+ example
    ```c
    #include <stdio.h>
    
    int main(int argc, char *argv[])
    {
      for (int i = 0; i < argc; ++i)
      {
        printf("Argument %d: %-10s\n", i + 1, argv[i]);
      }
    }
    ```

    <asciinema-player class="asciinema-player"
      src="../casts/cli.cast"
      cols="120"
      rows="12"
      preload="true"
      autoplay="false"
      speed="1.2">
    </asciinema-player> 

---


## Shell Operators

These operators belong to the command-line environment, not to C. They behave
the same idea-wise in Unix shells (bash, zsh, etc.) and in Windows
CMD/PowerShell, even if some details differ. These operators let you combine,
chain, and repurpose command-line programs by directing where their input comes
from and where their output goes, making them far more flexible to use at the
terminal.

### Output redirection operator `>`

Sends a program’s stdout to a file, replacing the file if it already exists.

???+ note "Output redirection operator `>` Example"
    <asciinema-player class="asciinema-player"
      src="../casts/redirect_1_overwrite.cast"
      cols="120"
      rows="12"
      preload="true"
      autoplay="false"
      speed="1.2">
    </asciinema-player> 

---

### Output append operator `>>`

Appends stdout to the end of a file instead of overwriting it.

???+ note "Output append redirection operator `>>` Example"
    <asciinema-player class="asciinema-player"
      src="../casts/redirect_2_append.cast"
      cols="120"
      rows="12"
      preload="true"
      autoplay="false"
      speed="1.2">
    </asciinema-player> 

---

### Input redirection operator `<`

Uses a file as stdin for the program.

???+ note "Input redirection operator `<` Example"
    <asciinema-player class="asciinema-player"
      src="../casts/redirect_3_stdin.cast"
      cols="120"
      rows="12"
      preload="true"
      autoplay="false"
      speed="1.2">
    </asciinema-player> 

--- 

### Pipe operator `|` 

Connects the `stdout` of one program to the `stdin` of another.

???+ note "Pipe operator `|` Example"
    <asciinema-player class="asciinema-player"
      src="../casts/redirect_4_pipe.cast"
      cols="120"
      rows="12"
      preload="true"
      autoplay="false"
      speed="1.2">
    </asciinema-player> 

---

## `calloc`

`calloc` is like `malloc`, but it initializes all allocated memory to zero. It
takes two arguments:

 - The number of elements
 - The size of each element in bytes

```c
int num_elements = 4;
void *myZeroedArray = calloc(num_elements, sizeof(int));
/* The memory layout of myZeroedArray would look like this (assuming returned
   block starts at address 0x1000):

   Address     | Value (in binary)
   --------------------------------------------------------------
   0x1000      | 00000000 00000000 00000000 00000000   (first int)
   0x1004      | 00000000 00000000 00000000 00000000   (second int)
   0x1008      | 00000000 00000000 00000000 00000000   (third int)
   0x100C      | 00000000 00000000 00000000 00000000   (fourth int)
*/
```
Unlike malloc, where memory is allocated but not initialized, calloc ensures
that all bytes are set to zero.

!!! note
    Bob mentioned that, in practice, you don't need to remember the order of the
    arguments as they are multiplied together and all bits set to 0 so passing them 
    in the wrong order will still produce a correct result. 

--- 

## `realloc`

`realloc` is used to resize a previously allocated block of memory. It takes two
arguments:

- A pointer to a block of memory previously allocated with `malloc`, `calloc`,
  or `realloc`
- The new desired size in bytes

```c
int num_elements = 4;
int *arr = malloc(num_elements * sizeof(int));

/* Later, we decide we need space for 8 ints instead of 4: */
num_elements = 8;
int *newArr = realloc(arr, num_elements * sizeof(int));

/* After this call:
   - If the block can be extended in place, `newArr` will have the same address
     as `arr`.
   - If it cannot be extended, a new block is allocated elsewhere, the old data
     is copied to it, and `arr` is freed automatically.
   - The newly allocated portion (the extra bytes) is *not initialized*.
*/
```

If `realloc` fails, it returns NULL and the original pointer remains valid.
To avoid losing access to the old memory, it's common to assign the result to a
temporary pointer first.

!!! warning
    `realloc` may move the memory block to a different address. After calling
    `realloc`, always use the returned pointer and never the original one.

---

## Other Topics

These topics were covered in class but received very minimal emphasis.

### Variable Argument Lists

Functions can accept an unspecified number of arguments using `<stdarg.h>`.
This is similar to Python's `*args`, but C provides no runtime type
information, so each argument's type must be known in advance.

To define such a function, end the parameter list with `...` and use
`<stdarg.h>` macros to iterate through the unnamed arguments.

```c
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);

    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }

    va_end(args);
    return total;
}
```

Key concepts:

- **`va_list`**: object used to traverse unnamed arguments
- **`va_start(list, last_named_param)`**: initialize traversal
- **`va_arg(list, type)`**: read the next argument as the given type
- **`va_end(list)`**: finalize traversal

!!! note "Notes"
    - Arguments must be read in the order they were passed.
    - Using the wrong type with `va_arg` is undefined behavior.
    - Commonly used in wrappers around `printf`-style functionality.

---

### Constant Literal Suffixes

Suffixes help control literal type, avoid implicit promotions, and prevent
overflow.

Integer and floating-point literals can be suffixed to control their type. This
matters when matching function prototypes, avoiding overflow, or controlling
storage size.

```c
long a = 5;    // '5' is an int literal; it is implicitly promoted to long
long b = 5L;   // '5L' is a long literal; no promotion occurs
```

Common suffixes:

| Literal          | Meaning                  |
| ---------------- | ------------------------ |
| **integers**     |                          |
| `U`              | Unsigned int             |
| `L`              | Long int                 |
| `UL` or `LU`     | Unsigned long            |
| `LL`             | Long long                |
| `ULL`            | Unsigned long long       |
| **floats**       |                          |
| `F`              | Float (otherwise double) |
| `L`              | Long double              |

!!! note "Typical Uses"
    - Prevent overflow in intermediate expressions.
    - Match functions that expect `float`.
    - Ensure constants match fixed-width integer types.

---

### `exit` and `atexit`

`exit` terminates the program and runs any cleanup functions previously
registered with `atexit`.

```c
exit(EXIT_SUCCESS);
exit(EXIT_FAILURE);
```

Before termination, `exit` will:

- flush open output streams
- close files
- call all functions registered with `atexit`

`atexit` registers a function to run automatically when `exit` is invoked:

```c
void cleanup(void) {
    printf("Cleaning up...\n");
}

int main(void) {
    atexit(cleanup);
    exit(EXIT_SUCCESS);
}
```

!!! note "Notes"
    - Functions run in reverse order of registration (LIFO).
    - Useful in library code or for guaranteed cleanup.

---

### `goto`

`goto` transfers control to a labeled statement within the same function.

```c
if (error_condition)
    goto cleanup;

cleanup:
    free(ptr);
```

!!! note "Key Points"
    - Labels must be inside the same function.
    - No automatic cleanup occurs; stack variables are not unwound.
    - Useful for unified cleanup blocks and breaking out of nested structures.

!!! warning 
     Avoid using `goto` for normal control flow; reserve it for cleanup/error paths.

