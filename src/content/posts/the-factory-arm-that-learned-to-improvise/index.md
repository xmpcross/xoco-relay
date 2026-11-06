---
title: "The Factory Arm That Learned to Improvise"
excerpt: "Industrial robots were built on the assumption that the world holds still. Removing that assumption changes what a production line can be."
category: "Robotics"
date: 2026-07-23
author:
  name: "Nico Reyes"
  role: "Robotics reporter"
tags: ["Robotics", "Manufacturing", "Automation"]
cover:
  src: "./cover.jpg"
  alt: "A row of bright orange industrial robot arms on a factory floor"
  creditName: "Simon Kadula"
  creditUrl: "https://unsplash.com/photos/8gr6bObQLOI"
trending: false
---

Classical industrial robotics is built on a bargain: the robot will repeat a motion with extraordinary precision, and in exchange the world will present the same thing in the same place every time.

That bargain built modern manufacturing. It also explains why factory automation stops abruptly at certain tasks — anything where the part arrives at an unpredictable angle, or varies in size, or is soft.

The current wave of work is about renegotiating it.

## Position, then perception

The traditional arm does not perceive. It moves through a taught path in joint space, and fixtures guarantee the part is where the path assumes.

Adding perception sounds simple and is not. A camera gives you a pose estimate with error bars, and a path planner that was written for certainty does not know what to do with error bars. The whole control stack has to be rewritten around the idea that the target is probable rather than known.

The systems that do this well tend to close the loop late: approach using the estimate, then switch to force and contact sensing for the final centimetres, where the estimate is least reliable and touch is most informative.

## Force control is the quiet breakthrough

The capability that changes the most tasks is not vision. It is the ability to command a force rather than a position.

An arm that can press with a specified force will insert a connector that is slightly misaligned, because it can feel the resistance and adjust. An arm commanded to a position will either miss or break something.

This is what makes assembly viable — inserting, seating, threading, mating. These are the operations that resisted automation for decades, and they resisted it because they are defined by contact rather than by location.

## Teaching by demonstration, with caveats

Programming these systems by physically guiding the arm through a task has become common, and the demonstrations are genuinely impressive.

The caveat is generalisation. A demonstration teaches the specific trajectory well; it generalises to nearby variations moderately; it does not generalise to the case the demonstrator never encountered. Deployments that succeed bound the variation deliberately rather than hoping the model covers it.

## What it means for the line

The economic consequence is that automation becomes viable at lower volumes.

The old threshold was set by fixturing: designing and building jigs for a specific part is expensive, so it only pays back over long runs. A cell that can handle variation needs less fixturing, which moves the break-even point down.

That is why the interesting deployments are appearing in contract manufacturing and short-run production rather than in the high-volume lines that were automated thirty years ago. Those lines were already solved. The improvisation is for everywhere else.
