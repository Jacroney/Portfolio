---
title: Writing a File System in C
date: 2026-04-08
excerpt: Notes from building a Unix-like file system emulator with inodes and directories for CSC 357.
tags: [c, systems, unix]
---

For Systems Programming (CSC 357) I built a small Unix-like file system from
scratch in C. It taught me more about how computers actually work than almost any
other class.

## Inodes are the whole game

A file isn't its name. A file is an **inode** — a struct holding metadata and
pointers to the blocks that store its data. The directory just maps names to
inode numbers.

```c
typedef struct {
    uint16_t mode;        // type + permissions
    uint32_t size;        // bytes
    uint32_t blocks[12];  // direct block pointers
    uint32_t indirect;    // pointer to a block of pointers
} inode_t;
```

Once that clicked, a lot of Unix stopped being magic. Hard links? Two directory
entries pointing at the same inode. `rm`? Decrement a link count and free the
blocks when it hits zero.

## The bug that taught me the most

I spent an entire night on a bug where files would occasionally read back
garbage. The cause: I was treating the **indirect block** as if it held data
instead of *pointers to* data blocks. One missing layer of indirection, hours of
`gdb`.

The lesson stuck: in systems code, draw the memory layout on paper before you
write the loop.

## Why bother

You'll likely never implement a file system at work. But understanding inodes,
blocks, and indirection changes how you read every `man` page afterward — and
that compounds for the rest of your career.
