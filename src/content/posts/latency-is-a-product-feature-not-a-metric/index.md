---
title: "Latency Is a Product Feature, Not a Metric"
excerpt: "Teams track p99 and celebrate when it drops. Users experience something else entirely, and the gap between them explains a lot of unhappy dashboards."
category: "Platforms"
date: 2026-07-21
author:
  name: "Iris Novak"
  role: "Platforms correspondent"
tags: ["Performance", "Infrastructure", "Product"]
cover:
  src: "./cover.jpg"
  alt: "A tight bundle of brightly coloured cables running side by side"
  creditName: "Roman"
  creditUrl: "https://unsplash.com/photos/T1phuFyv2EQ"
trending: true
---

Every infrastructure team has a latency dashboard. Most of them are green. A meaningful fraction of those teams also have users who describe the product as slow, and no obvious way to reconcile the two.

The reconciliation is usually the same: the dashboard measures a server, and the user measures a moment.

## Percentiles hide the person

A p99 of 180 milliseconds sounds excellent. It says that ninety-nine of a hundred requests completed quickly.

But requests are not distributed evenly across people. A user who loads a dense view might issue forty requests, and the chance that at least one of them lands in that slow one percent is roughly one in three. From their seat, a third of page loads have a visible stall. From the dashboard, everything is fine.

Measuring per-session worst case rather than per-request percentile changes the picture immediately, and usually unpleasantly.

## The clock starts before the request

Server timing begins when the request arrives. The user's timing began when they decided to act.

In between sits DNS, connection setup, TLS negotiation, any authentication round trip, and — increasingly the largest term — client-side work that has to finish before the request can even be issued. A framework that spends 400 milliseconds hydrating before it can fetch has already lost more time than the backend will spend on the query.

None of that appears in server metrics. All of it appears in the user's impression.

## Variance beats average

The finding that surprises teams most is that consistency matters more than speed.

An interaction that always takes 300 milliseconds is experienced as responsive. One that averages 150 but occasionally takes 900 is experienced as unreliable, and people begin to hesitate before clicking — which slows them down more than the latency itself did.

This argues for a deeply unfashionable optimisation: adding a small artificial floor to fast responses so the interface behaves predictably. Several teams have shipped it, few talk about it, and users consistently rate it better.

## What to measure instead

Three changes recover most of the gap.

Measure from interaction to visible result, on the client, including everything in between. Report the worst interaction per session rather than the percentile per request. And segment by the conditions that actually vary — network class, device age, geography — because a median that blends a new phone on fibre with a five-year-old device on mobile data describes nobody.

The dashboard will get worse. That is the point. It will finally be measuring the thing the user is complaining about.
