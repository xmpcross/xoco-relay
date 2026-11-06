---
title: "What Actually Happens When You Press Send"
excerpt: "A message crosses a dozen systems in under a second. Understanding which of them can lose it changes how you design everything downstream."
category: "Platforms"
date: 2026-07-29
author:
  name: "Iris Novak"
  role: "Platforms correspondent"
tags: ["Networking", "Infrastructure", "Reliability"]
cover:
  src: "./cover.jpg"
  alt: "A keyboard with rainbow backlighting streaked by motion blur"
  creditName: "Anna Evans"
  creditUrl: "https://unsplash.com/photos/yKQ5IYXJPdQ"
trending: false
---

Pressing send feels atomic. It is not. Between the tap and the confirmation, a message passes through a chain of systems, each of which has its own idea of what "delivered" means, and several of which are allowed to forget.

Knowing where those seams are is the difference between a product that degrades gracefully and one that lies to its users.

## The first lie: the checkmark

Most applications show a confirmation the moment the local client hands the payload to the transport layer. At that point the message has reached the network stack on the device and nothing else.

If the radio drops, if the connection was half-open, if the server accepted the bytes but crashed before persisting them — the checkmark is already on screen. This is not necessarily wrong; showing nothing for 400 milliseconds feels broken. But it means the interface is reporting local intent, not remote fact, and those need different visual treatments.

## The middle: where ordering dies

Between client and storage there is usually a queue, and queues are where assumptions go to be violated.

Most message queues guarantee at-least-once delivery, not exactly-once. Retries happen. Duplicates arrive. Two messages sent a hundred milliseconds apart can be processed out of order by different consumers.

The systems that handle this well do three things: every message carries a client-generated identifier so duplicates can be collapsed, ordering is derived from a logical clock rather than arrival time, and consumers are written to be idempotent so replaying a batch is safe.

The systems that handle it badly discover all three requirements in production, usually during a partial outage when retry volume spikes.

## The far end: fan-out

A single send frequently becomes many writes — one per recipient device, plus a search index, plus a notification dispatch, plus an audit record.

These do not complete together, and pretending they do is expensive. The pragmatic pattern is a single authoritative write followed by asynchronous derivation of everything else, with the interface reading from the authoritative store rather than the derived ones until they catch up.

That is why a message can appear in a conversation instantly but take a few seconds to become searchable. It is not a bug. It is the fan-out being honest.

## Designing for the seams

Once the chain is visible, some product decisions get easier.

Show three states, not two: accepted locally, confirmed remotely, and failed. Users tolerate a pending state; they do not tolerate a confirmed message that vanishes.

Make retries idempotent from the first version rather than the third. Retrofitting deduplication onto a system that assumed exactly-once is one of the more painful migrations available.

And put the confirmation on the durable write, not on the queue accept. The extra hundred milliseconds costs less than the trust you lose the first time a checkmark turns out to be a guess.
