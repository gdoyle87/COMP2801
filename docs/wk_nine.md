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

`int argc` stands for the **arg**ument **c**ount and always includes the name of the 
program as the first argument

`char *argv[]` stands for the **arg**ument **v**ector. It is an array of strings
representing the different arguments passed (including the name of the program).


<div class="asciicast" data-src="../casts/cli.cast" id="cli-cast"></div>
other:
<asciinema-player
  src="../casts/cli.cast"
  cols="80"
  rows="24"
  preload="true"
  autoplay="false">
</asciinema-player>
