# Week 1

This week covers the first half of Chapter 9 in the text. We look in depth at `printf` formatting including **specifiers**, **field widths**, **formatting flags**, and **escape sequences** which all help control how output is displayed.

---

## Streams

**Streams** are sequences of bytes used for input and output.

* **Input**: Data flows *from* a device (keyboard, disk, network, etc.) *into* main memory.
* **Output**: Data flows *from* main memory *to* a device (screen, printer, disk, network, etc.).

At program start, three standard streams are available:

1. Standard input (`stdin`) – usually from the keyboard.
2. Standard output (`stdout`) – usually to the screen.
3. Standard error (`stderr`) – also to the screen, for error messages.

**Redirection**: Operating systems allow these streams to be redirected to other devices or files.

---

## `printf` Formatting

As we learned in the previous course, `printf` can be used to format output to `stdout` using *conversion specifications*.

### Type Specifiers

#### Integers

| Specifier              | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `%d`                   | Signed decimal integer                                |
| `%i`                   | Signed decimal integer (same as `%d`)                 |
| `%o`                   | Unsigned octal integer                                |
| `%u`                   | Unsigned decimal integer                              |
| `%x`                   | Unsigned hexadecimal integer (lowercase a–f)          |
| `%X`                   | Unsigned hexadecimal integer (uppercase A–F)          |
| `%hd` / `%ld` / `%lld` | Short, long, or long long integers (length modifiers) |

Note: if you are using any of the **unsigned** specifiers, don't pass it any negative numbers.

If you are using any of the long *length modifiers* you should add a corresponding literal suffix (`L`, `LL`) to the value that you pass to `printf`.

```c
printf("%ld\n", 5000000000L); // long (suffix L required)
printf("%lld\n", 9000000000000LL); // long long (suffix LL required)
```

---

#### Floating-Point Numbers

| Specifier             | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| `%e` / `%E`           | Exponential (scientific) notation (e.g., `1.23e+02` or `1.23E+02`)                     |
| `%f` / `%F`           | Fixed-point notation                                                                   |
| `%g` / `%G`           | Uses either `%f` or `%e` (`%E`) depending on value’s magnitude, with no trailing zeros |
| `%Lf` / `%Le` / `%Lg` | Long double (length modifier `L`)                                                      |

The default precision is **6 digits** after the decimal (for `%f`) or **6 *significant* digits** (for `%g`/`%G`).

**Rounding**: `%e`, `%E`, and `%g` perform rounding; `%f` shows exact decimals.

`%g`/`%G` automatically chooses the *shortest* visual representation for a given number:

* Chooses `%e` if the exponent is < -4 or ≥ precision.
* Otherwise chooses `%f`.
* Removes trailing zeros.
* Omits the decimal point if the fractional part is zero.

```c
#include <stdio.h>

int main(void) {
    printf("%g\n", 87.0);        // 87
    // whole number, fractional part is zero so ".0" is suppressed

    printf("%g\n", 87.50);       // 87.5
    // fractional part kept, trailing zero removed

    printf("%g\n", 87.25);       // 87.25
    // fractional part kept, no trailing zeros to remove

    printf("%g\n", 0.0000875);   // 8.75e-05
    // exponent < -4, so %e format is chosen

    printf("%g\n", 8750000.0);   // 8.75e+06
    // exponent ≥ precision (6), so %e format is chosen

    printf("%#g\n", 87.0);       // 87.0000
    // '#' flag forces decimal point and trailing zeros up to precision

    return 0;
}
```

---

#### Strings and Characters

* `%c` prints a single `char`
* `%s` prints a null-terminated string (`char*`), stops at `\0`
* Missing null terminator or wrong format specifier (e.g., `%s` with a `char`) undefined behavior, often a crash
* Compilers usually don’t catch format string errors — they show up only at runtime.

#### Pointers

| Specifier | Description                                                                          |
| --------- | ------------------------------------------------------------------------------------ |
| `%p`      | Displays a pointer (address) in an implementation-defined way (commonly hexadecimal) |

`%p` expects a pointer argument (e.g., `&x`, or a `char*`, `int*`, etc.).
The exact format of the address depends on the system, but is typically hexadecimal.
Useful for debugging to confirm memory addresses.

---

### Field Width

You can control the minimum number of characters used when printing a value by specifying a **field width**.

If the value has fewer characters than the field width then it is padded (by default with spaces).

**Note**: If the value has *more* characters than the field width then the full value is printed (field width is ignored). That is to say, it does ***not*** truncate the output.

```c
#include <stdio.h>

int main(void) {
    printf("%4d\n", 1);       //    1
    printf("%4d\n", 12);      //   12
    printf("%4d\n", 123);     //  123
    printf("%4d\n", 1234);    // 1234
    printf("%4d\n", 12345);   // 12345 (too wide, prints fully)

    printf("%4d\n", -1);      //   -1
    printf("%4d\n", -12);     //  -12
    printf("%4d\n", -123);    // -123
    printf("%4d\n", -1234);   // -1234
    printf("%4d\n", -12345);  // -12345
}
```

#### Negative Values

If the value has a negative sign, it will use up one of the field width characters:

```c
#include <stdio.h>

int main(void) {
    printf("BEFORE%4dAFTER\n", 1);        //BEFORE   1AFTER
    printf("BEFORE%4dAFTER\n", -1);       //BEFORE  -1AFTER
    // In the second example, there are only 2 spaces.
}
```

#### Dynamic Widths

Instead of providing a number, you can pass `*` instead and then supply the width as one of the values passed instead.

This works for *precision* as well.

```c
printf("BEFORE%*.*fAFTER", 7, 2, 98.736); // BEFORE  98.74AFTER
// 7 → total field width (minimum size, includes digits, decimal point, and padding)
// 2 → precision (number of digits after the decimal point)
```

### Format Flags

#### Alignment

By default, values are **right-aligned** in the field. To make them **left-aligned**, add a `-` before the field width:

```c
#include <stdio.h>

int main(void) {
    printf("BEFORE%4dAFTER\n", 1);        //BEFORE   1AFTER
    printf("BEFORE%-4dAFTER\n", 1);       //BEFORE1   AFTER
}
```

#### Sign Control (for numbers)

By default, only negative numbers are printed with a sign (`-`).
You can control how positive numbers appear using flags:

* `+`: always print a sign (`+` for positive, `-` for negative).
* space (`' '`): print a space in front of positive numbers (negative numbers still get `-`).

This can be useful for aligning columns of positive and negative numbers.

```c
#include <stdio.h>

int main(void) {
    printf("%d\n", 42);     // 42
    printf("%+d\n", 42);    // +42
    printf("% d\n", 42);    //  42 (leading space)
    printf("%d\n", -42);    // -42
    printf("%+d\n", -42);   // -42
    printf("% d\n", -42);   // -42
}
```

#### Alternate Form (# Flag)

The `#` flag modifies how certain values are displayed:

* **Octal (`%o`)**: prefixes the value with `0`.
* **Hexadecimal (`%x` / `%X`)**: prefixes the value with `0x` or `0X`.
* **Floating-point (`%f`, `%e`, `%E`, `%g`, `%G`)**: forces a decimal point to appear, even if the fractional part is zero.

  * For `%g` / `%G`, it also prevents trailing zeros from being removed.

```c
#include <stdio.h>

int main(void) {
    int c = 1427;
    double p = 1427.0;

    printf("%o\n", c);    // 2623
    printf("%#o\n", c);   // 02623

    printf("%x\n", c);    // 593
    printf("%#x\n", c);   // 0x593

    printf("%X\n", c);    // 593
    printf("%#X\n", c);   // 0X593

    printf("%g\n", p);    // 1427
    printf("%#g\n", p);   // 1427.00 (decimal point forced, trailing zeros kept)
}
```

---

#### Zero Padding (0 Flag)

By default, extra space in a field width is filled with spaces.
The `0` flag changes this so that extra space is filled with **leading zeros**.

* Works with integers and floating-point numbers.
* Often combined with the `+` flag to show signs with padded numbers.
* Padding occurs **after** the sign, not before.

---

### Example

```c
#include <stdio.h>

int main(void) {
    printf("%9d\n", 452);     // "      452" (spaces)
    printf("%09d\n", 452);    // "000000452" (zeros)

    printf("%+09d\n", 452);   // "+00000452"
    printf("%09d\n", -452);   // "-00000452"
}
```

---

### Literals and Escape Sequences

Characters in a format string that are not part of a conversion specification are printed literally.

Escape sequences allow you to include special characters in strings that cannot be typed directly or would otherwise be ambiguous.

| Escape | Description          |
| ------ | -------------------- |
| `\'`   | Single quote (`'`)   |
| `\"`   | Double quote (`"`)   |
| `\?`   | Question mark (`?`)  |
| `\\`   | Backslash (`\\`)     |
| `\a`   | Alert (bell/flash)   |
| `\b`   | Backspace            |
| `\f`   | Form feed (new page) |
| `\n`   | Newline              |
| `\r`   | Carriage return      |
| `\t`   | Horizontal tab       |
| `\v`   | Vertical tab         |
| `%%`   | Percent symbol (`%`) |

---

```c
#include <stdio.h>

int main(void) {
    printf("Hello\tWorld\n");     // tab between words, newline at end
    printf("Path: C:\\temp\n");   // prints: Path: C:\temp
    printf("Beep!\a\n");          // may cause a sound or window flash
    printf("CPU usage: 95%%\n");  // CPU usage: 95%
}
```

??? note "Why `%%` isn’t like `\\n`"
    Backslash escapes (like `\\n`, `\\t`, `\\?`) are **language features** handled at compile time, because they solve parsing or representation issues in string literals.
    <br>
    Percent escapes (like `%d`, `%%`) are **library features**, defined only for functions such as `printf`/`scanf` and interpreted at runtime.
    <br>
    **In short:** `\\n` is replaced by the compiler, while `%%` is handled later by `printf`.

