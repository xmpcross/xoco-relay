---
title: "Humanoids Are a Software Problem Now"
excerpt: "The legs work. The hands are getting there. What is holding humanoid robots back has moved decisively into the layer above the hardware."
category: "Robotics"
date: 2026-07-31
author:
  name: "Nico Reyes"
  role: "Robotics reporter"
tags: ["Robotics", "Automation", "AI"]
cover:
  src: "./cover.jpg"
  alt: "Two amber-coloured humanoid robots with glowing animated faces"
  creditName: "Enchanted Tools"
  creditUrl: "https://unsplash.com/photos/aL3HP-7ctLQ"
trending: true
---

Ten years ago the humanoid demonstration reel was about locomotion. A robot walked across gravel, got shoved by a researcher with a hockey stick, and stayed upright. That was the achievement, and it was a real one.

Balance is now close to solved for the machines being built commercially. Watch current footage and the robot walking is not the interesting part. The interesting part is what happens when it is asked to do something it was not shown.

## The hard part is the sixty seconds after the instruction

Give a humanoid a clear, decomposed task in a mapped environment and it will perform well. Give it a task described the way a person would describe it — "clear this table" — and the difficulty appears immediately.

Which objects are on the table. Which are rubbish and which are not. Which can be stacked. What to do about the one that is unexpectedly heavy. What "clear" means when there is nowhere obvious to put things.

None of these are actuation problems. They are problems of building and maintaining a model of a situation, and that is where the field currently lives.

## Manipulation is where hardware still bites

The one place hardware remains the constraint is the hand.

Human hands are absurd. Twenty-seven bones, tendons routed through the forearm, and skin with pressure and slip sensing distributed across the whole surface. Robotic hands with comparable degrees of freedom exist, are extremely expensive, and are fragile in ways that make deployment difficult.

![A pink robotic hand reaching out against a bright cyan background](./robot-hand.jpg)

_Every joint in a hand like this is a part that can wear out, and a number the control software has to keep track of._

The commercial answer has been to reduce ambition: two or three fingers, high force, good sensing at the fingertips, and a task set chosen to suit that. It works, and it is why current deployments look like logistics rather than housework.

## Why the humanoid shape at all

The recurring objection is that a wheeled base with an arm is cheaper and more stable. It is.

The counterargument is not about the robot. It is about the building. Warehouses, factories, and homes are full of stairs, door handles, shelves at human heights, and equipment designed for human proportions. A machine with roughly human dimensions can enter that environment without renovating it.

Whether that is worth the added complexity is still an open commercial question. The answer probably varies by facility, and the honest position is that nobody has enough deployment data yet.

## What the next two years actually look like

Not general-purpose assistants. Narrow deployments in structured environments — moving totes, tending machines, running inspection routes — where the environment is partly controlled and the task set is bounded.

The measure worth watching is not what a robot can do in a demonstration. It is how many hours it runs between interventions by a human. That number is improving steadily and is rarely published, which tells you roughly where it stands.
