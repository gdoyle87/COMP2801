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
