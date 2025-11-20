# Week 7

This week was the midterm. Bob required us to do a lecture before the midterm 
on Big O notation, selection sort, and insertion sort because he cannot manage
the time in his courses appropriately.

## Big O Notation

**Big O** notation is a mathematical notation that describes the *limiting
behaviour* of a function. It is one of the asymptotic notations and describes 
what a function does as its arguments tend to large values (infinity). 

The *O* stands for "order of" approximation. It represents the *upper bound* or 
*worst case* performance of the growth rate of a function. It is used to show
how the function grows in relation to the number of inputs: will it remain 
constant (`O(1)`) time to perform, will it grow quadratically (`O(n²)`), etc.

In this course we only look at this from the most simplistic, basic lens. That
is, we should be aware of a few of the common complexities using `n` to 
represent the number of inputs:

!!! example "Common Complexities"

    - `O(1)` Constant Time
        - Execution time stays the same even as `n` increases
        - Example: direct array access

    - `O(log n)` Logarithmic Time
        - Doubling `n` only adds another constant amount of time.
        - Example: binary search

    - `O(n)` Linear Time
        - Directly proportional to `n`. 
        - Example: simple loop through elements of an array.

    - `O(n log n)` Log Linear Time
        - Combination of linear and logarithmic behaviour
        - Example: Merge sort, heapsort, quicksort (average case).

    - `O(n²)` Quadratic Time
        - Grows exponentially as `n` increases in a quadratic way (square of `n`).
        - Example: Nested loops, naive matrix multiplication, bubble sort.

    - `O(n³)` Cubic Time
        - Grows exponentially as `n` increases in a cubic way (cube of `n`).
        - Example: Floyd–Warshall shortest path algorithm.

    - `O(2ⁿ)` Exponential Time
        - Algorithms that consider every subset or combination.
        - Examples: Brute-force traveling salesman, subset generation.

    - `O(n!)` Factorial Time
        - Grows faster than any exponential function; work explodes as `n` increases because it considers all possible permutations of `n` items
        - Example: Brute-force traveling salesperson problem by checking all permutations.
 
### Determining Big-O Complexity

!!! tip "Rules of Thumb"
    <div class="grid cards print-3" markdown>

    -   **Drop Constants**  
        Big-O ignores fixed factors.  
        - `O(2n)` → `O(n)`  
        - `O(n + 100)` → `O(n)`

    -   **Add Sequential Operations**  
        If code runs *one after another*, add their costs, then simplify.  
        - `O(n) + O(n)` → `O(2n)` → `O(n)`

    -   **Multiply Nested Loops**  
        Inner loop work multiplies outer loop work.  
        - `O(n) * O(n)` → `O(n²)`  
        If the inner loop runs `1..i`, the total is  
        - `1 + 2 + ... + n = O(n²)`  
        Always consider the worst case.

    -   **Different Input Sizes**  
        Don’t merge unrelated inputs.  
        - Sequential → `O(n + m)`  
        - Nested → `O(n * m)`  
        Only combine when they represent the **same dataset**.

    -   **Keep the Dominant Term**  
        Keep only the highest-growth part.  
        - `O(n² + n)` → `O(n²)`  
        - `O(n³ + n log n)` → `O(n³)`

    -   **Recognize Logarithmic Behavior**  
        Happens when work **shrinks by a constant factor**, usually halving.  
        Examples: binary search, heaps, balanced trees, divide-and-conquer depth.

    </div>

---

## Selection Sort

The *selection sort* algorithm sorts an array by repeatedly finding the smallest 
element in the **unsorted** portion of the array and swapping it into its correct 
position at the front.

1. Find the smallest element in the entire array and swap it with the first element.
2. Then find the smallest element in the remaining **unsorted** part of the array 
   and swap it with the first element of that unsorted portion.
3. Continue this process until the entire array is sorted.

???+ note "Selection Sort Visual"

    <div style="text-align: center;">
    <video controls autoplay loop muted style="max-width: 500px;">
    <source src="../images/selection_sort.webm" type="video/webm">
    Your browser does not support the video tag.
    </video>
    </div>

    Alternatively, see the animation from **Y. Daniel Liang / Pearson Education**
    which was used in class:<br>
    <https://liveexample.pearsoncmg.com/dsanimation/SelectionSortWithCpp.html>

## Insertion Sort

The *insertion sort* algorithm builds a sorted portion of the array one element
at a time. At each step, it takes the next element from the **unsorted** portion
and inserts it into the correct position within the **sorted** portion.

- Start with the first element (a one-element array is already sorted).
- Take the next element and compare it with the elements in the sorted portion.
- Shift larger elements one position to the right.
- Insert the current element into its correct position.
- Repeat for each element until the array is fully sorted.

???+ note "Insertion Sort Visual"

    <div style="text-align: center;">
    <video controls autoplay loop muted style="max-width: 500px;">
    <source src="../images/insertion_sort.webm" type="video/webm">
    Your browser does not support the video tag.
    </video>
    </div>

    Alternatively, see the animation from **Y. Daniel Liang / Pearson Education**
    which was used in class:<br>
    <https://liveexample.pearsoncmg.com/dsanimation/InsertionSortWithCpp.html>



## Other Animations from Y. Daniel Liang

The author of the animations that Bob uses in class has similar ones for other
algorithms which can be found at the link below with corresponding code in C++,
Java, or Python:
<br> <a href="https://liveexample.pearsoncmg.com/dsanimation/" target="_blank">
    https://liveexample.pearsoncmg.com/dsanimation/
</a>

