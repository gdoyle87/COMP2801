# Week 6

This week covers using variants of a linked list to implement stacks and queues.

## Stacks

A **stack** is a specialized form of a linked list where insertion and deletion
can only occur at one end, called the **top** of the stack.

Stacks follow the **Last-In, First-Out (LIFO)** principle: the most recently
inserted element is the first one removed.

---

### Basic Structure

A stack can be implemented as a **linked list**, where each node contains:

* The **data** being stored.
* A **pointer** to the next node.

The **top pointer** (`stackPtr`) always points to the node at the top of the
stack. The last node’s link is set to `NULL` to mark the end of the stack.

```c
struct stackNode {
    int data;             // value stored in the node
    struct stackNode *nextPtr; // pointer to next node
};
```

Using `typedef` can make this cleaner:

```c
typedef struct stackNode StackNode;
typedef StackNode *StackNodePtr;
```

---

### Primary Operations

The two main operations on a stack are **push** and **pop**:

* `push(StackNodePtr *topPtr, int value)` – Creates a new node and places it on top of the stack.
* `pop(StackNodePtr *topPtr)` – Removes the top node, returns its data, and frees its memory.

In addition, we often include:

* `isEmpty(StackNodePtr topPtr)` – Returns true if the stack is empty.
* `printStack(StackNodePtr currentPtr)` – Displays the contents of the stack.

--- 

#### Push Operation

The **push** operation adds a new element to the **top** of the stack.

1. Use `malloc` to create a new node.
2. Assign the new node’s data field.
3. Point the new node’s `nextPtr` to the current top node.
4. Update the stack pointer (`stackPtr`) to point to the new node.

This ensures the new node becomes the first element accessed when popping.

```c
void push(StackNodePtr *topPtr, int value)
{
    StackNodePtr newPtr = malloc(sizeof(StackNode));

    if (newPtr != NULL) {
        newPtr->data = value;
        newPtr->nextPtr = *topPtr; // link new node to previous top
        *topPtr = newPtr;          // move top pointer to new node
    }
    else {
        printf(\"No memory available. %d not inserted.\n", value);
    }
}
```

???+ example "Push Visualization"

    <div style="max-width: 500px; margin: 0 auto;">
      <div class="ll-stepper"
           data-base="../images/stack_push/"
           data-frames="frame_01.png,frame_02.png,frame_03.png,frame_04.png,frame_05.png,frame_06.png">
      </div>
    </div>

#### Pop Operation

The **pop** operation removes the element currently at the **top** of the stack.
It returns the popped value and frees the corresponding node from memory.


1. If the stack is **empty**, the operation cannot proceed.
2. Create a temporary pointer (`tempPtr`) to hold the current top node.
3. Move the stack pointer (`stackPtr`) to the next node in the stack.
4. Free the memory for the node stored in `tempPtr`.

```c
int pop(StackNodePtr *topPtr)
{
    int value = (*topPtr)->data;
    StackNodePtr tempPtr = *topPtr;   // store current top
    *topPtr = (*topPtr)->nextPtr;     // move top to next node
    free(tempPtr);                    // free old top
    return value;                     // return popped value
}
```

???+ example "Pop Visualization"

    <div style="max-width: 500px; margin: 0 auto;">
      <div class="ll-stepper"
           data-base="../images/stack_pop/"
           data-frames="frame_01.png,frame_02.png,frame_03.png,frame_04.png">
      </div>
    </div>


After popping, the **stack pointer** points to the new top node. If all nodes
are removed, it becomes `NULL`, indicating an empty stack.

---

## Queues

A **queue** is a data structure that operates on the **First-In, First-Out (FIFO)** principle, similar to a line at a grocery store.

* The first person in line receives service first.
* New customers (or elements) join the end of the line and must wait their turn.

In a queue:

* **Insertion (enqueue)** occurs at the **rear** (or **tail**).
* **Removal (dequeue)** occurs at the **front** (or **head**).

This means that the element inserted earliest is the first to be removed.

Queues are used in many areas of computing:

* **Process Scheduling:** When multiple programs or threads compete for CPU time, waiting processes are stored in a queue until the CPU becomes available.
* **Print Spooling:** Print jobs are queued until the printer can process them, much like thread spooling in sewing.
* **Network Routing:** Data packets are queued at routers before being sent along the network path.

Queues ensure orderly, predictable access to shared resources, where the first to arrive is the first to be processed.

---

### Queue Implementation

A queue can be implemented as a **linked list**, where each node contains:

* The **data** to store.
* A **pointer** to the next node.

Two pointers are maintained:

* `frontPtr` – Points to the first node (head) of the queue.
* `rearPtr` – Points to the last node (tail) of the queue.

```c
struct queueNode {
    int data;                  // value stored in the node
    struct queueNode *nextPtr; // pointer to next node
};

typedef struct queueNode QueueNode;
typedef QueueNode *QueueNodePtr;
```

---

### Queue Operations

The main operations of a queue are **enqueue** and **dequeue**:

#### Enqueue

Adds a new node to the **rear** of the queue.

```c
void enqueue(QueueNodePtr *frontPtr, QueueNodePtr *rearPtr, int value)
{
    QueueNodePtr newPtr = malloc(sizeof(QueueNode));

    if (newPtr != NULL) {
        newPtr->data = value;
        newPtr->nextPtr = NULL;

        // if queue is empty, new node is both front and rear
        if (*frontPtr == NULL)
            *frontPtr = newPtr;
        else
            (*rearPtr)->nextPtr = newPtr;

        *rearPtr = newPtr;
    }
    else {
        printf("No memory available. %d not inserted.\n", value);
    }
}
```


???+ example "Enqueue Visualization"
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="ll-stepper"
           data-base="../images/enqueue/"
           data-frames="frame_01.png,frame_02.png,frame_03.png,frame_04.png,frame_05.png,frame_06.png">
      </div>
    </div>

---

#### Dequeue

Removes a node from the **front** of the queue and returns its value.

```c
int dequeue(QueueNodePtr *frontPtr, QueueNodePtr *rearPtr)
{
    int value = (*frontPtr)->data;
    QueueNodePtr tempPtr = *frontPtr;  // store current front

    *frontPtr = (*frontPtr)->nextPtr;  // move front to next node

    // if queue is now empty, rear must also be NULL
    if (*frontPtr == NULL)
        *rearPtr = NULL;

    free(tempPtr);
    return value;
}
```

???+ example "Dequeue Visualization"
    <div style="max-width: 500px; margin: 0 auto;">
      <div class="ll-stepper"
           data-base="../images/dequeue/"
           data-frames="frame_01.png,frame_02.png,frame_03.png,frame_04.png,frame_05.png,frame_06.png">
      </div>
    </div>
---



