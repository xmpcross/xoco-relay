---
title: "The Terminal Is Having a Design Moment"
excerpt: "After forty years of being deliberately ugly, the command line has picked up typography, colour theory, and animation. Some of it helps."
category: "Apps & Tools"
date: 2026-07-28
author:
  name: "Leah Morgan"
  role: "Apps and tools critic"
tags: ["Tools", "CLI", "Design"]
cover:
  src: "./cover.jpg"
  alt: "A laptop keyboard and screen glowing under purple backlight"
  creditName: "Walling"
  creditUrl: "https://unsplash.com/photos/qRyQWEAWaNY"
trending: false
---

For most of its life, the terminal was the one interface nobody art-directed. It was monospace, it was whatever colours the theme happened to define, and its aesthetic was an accident of what was cheap to render in 1978.

That has changed fast, and unevenly.

## What actually improved

Three things in the current wave are genuine improvements rather than decoration.

**Ligature-aware typography with real hinting.** Reading code for eight hours is a legibility problem, and monospace fonts designed in the last five years are measurably easier on the eye than the bitmap descendants they replaced. Distinguishing zero from O and one from l is not a style choice.

**Semantic colour instead of decorative colour.** Older tools coloured output because colour was available. Newer ones colour output because a specific token means a specific thing — this path exists, this diff line was removed, this test is skipped rather than failed. When the palette carries meaning consistently, scanning gets faster.

**Progressive disclosure of long output.** Collapsing a hundred lines of dependency resolution into one line that can be expanded is the single biggest quality-of-life change in modern CLI tooling. It respects that the interesting part is usually four lines long.

## What is decoration

Then there is the other half.

Animated spinners that render at sixty frames per second and spend more CPU than the task they are describing. Gradient banner art that scrolls past before you can read it. Progress bars for operations that complete in under 200 milliseconds, which exist purely so the tool feels busy.

The tell is whether the output survives being piped. A well-designed CLI notices it is not writing to a terminal and produces plain, parseable text. A decorated one emits escape codes into your log file and you find out three weeks later.

## The unresolved tension

Terminals are used by humans interactively and by scripts non-interactively, and those two audiences want opposite things. Humans want summary, colour, and motion. Scripts want stable, boring, machine-readable lines that never change format between versions.

The tools that handle this well treat them as two output modes with two contracts, and version the machine-readable one. The tools that handle it badly add a `--json` flag as an afterthought and let the human format drift every release.

The difference shows up the moment you check what a tool does when nobody is watching:

```bash
# Interactive: colour, alignment, a summary line for a human
$ deploy status
  ✔ api      v4.2.1   healthy    2m ago
  ✔ web      v4.2.1   healthy    2m ago
  ! worker   v4.2.0   degraded   9m ago

# Piped: no escape codes, no spinner, one stable record per line
$ deploy status | cat
api	4.2.1	healthy	2026-07-28T09:14:02Z
web	4.2.1	healthy	2026-07-28T09:14:02Z
worker	4.2.0	degraded	2026-07-28T09:07:41Z
```

Both are designed. Only one of them is decorated.

## Where it lands

The command line was never actually minimal. It was just unstyled, and people mistook the absence of design for the presence of restraint.

Now that it is being designed on purpose, the question is the same one every interface faces: does this element help someone finish the task, or does it help the tool look serious? The terminal is not exempt from that question. It was only ever avoiding it.
