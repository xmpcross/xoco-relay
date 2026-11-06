---
title: "The Edge Quietly Moved Into the City"
excerpt: "Compute is being installed in cabinets on ordinary streets. The reasons are less about latency than most of the marketing suggests."
category: "Platforms"
date: 2026-07-15
author:
  name: "Iris Novak"
  role: "Platforms correspondent"
tags: ["Edge", "Infrastructure", "Networks"]
cover:
  src: "./cover.jpg"
  alt: "A city street at night under stacked pink and magenta neon signs"
  creditName: "Jeffrey van Rossum"
  creditUrl: "https://unsplash.com/photos/PwfZ3UWjpG0"
trending: false
---

Walk past enough street furniture in a dense city and you will start noticing the cabinets. Some are old telecom equipment. An increasing number are compute — a few servers, a cooling unit, and a fibre run, sitting a hundred metres from the people they serve.

The public explanation is latency. The actual reasons are more varied and more interesting.

## Latency is the smallest of the reasons

For most applications, the difference between a regional data centre and a street cabinet is single-digit milliseconds. That matters enormously for a narrow set of use cases — real-time control, competitive gaming, certain financial paths — and almost not at all for the rest.

If latency were the whole argument, the build-out would be much smaller than it is.

## Egress economics

The larger driver is the cost of moving data.

Video analytics, sensor fleets, and anything generating continuous high-resolution streams produce far more data than anyone wants to transport. Processing locally and shipping only the results changes the bandwidth bill by an order of magnitude. The compute is cheaper than the transit.

This is the same logic that pushed processing onto phones a decade ago, applied to fixed infrastructure that generates too much data to move.

## Jurisdiction

The second driver is legal rather than technical. A growing set of rules requires that certain categories of data be processed within a specific boundary — a country, sometimes a municipality.

Edge deployment is the cleanest way to satisfy that requirement without building a full regional presence. The data never leaves, because the computation went to it.

## The operational reality is unglamorous

Running compute in a street cabinet means accepting conditions no data centre would tolerate. Wide temperature swings. Power that is clean most of the time. Physical access by people who are not your staff. Maintenance windows that involve a van and traffic management.

The software response has been uniform: assume any node can vanish, keep no unique state at the edge, and make redeployment cheap enough that repair means replacement. Most edge platforms are less a distributed computing achievement than a very disciplined exercise in statelessness.

## What it means for building

If you are considering edge deployment, the useful questions are not about milliseconds.

How much data would you avoid moving? Does a rule require the processing to happen somewhere specific? Can the workload tolerate a node disappearing without warning, repeatedly, forever?

If the answers are "not much," "no," and "not really," a regional deployment will serve you better and cost less to operate. The cabinets on the street are solving real problems. They are mostly not the problem the marketing describes.
