---
title: "Your Photos Know More Than You Do"
excerpt: "Every image you take carries a small dossier. Most of it is useful, some of it is surprising, and almost none of it is visible before you share."
category: "Security"
date: 2026-07-18
author:
  name: "Evan Brooks"
  role: "Security desk"
tags: ["Privacy", "Metadata", "Phones"]
cover:
  src: "./cover.jpg"
  alt: "A phone held up to photograph a street washed in teal and red neon"
  creditName: "Magnus Andersson"
  creditUrl: "https://unsplash.com/photos/0tODL-2pO1Y"
trending: false
---

A photograph is not just pixels. Attached to it, in a header most people never open, is a structured record of the circumstances in which it was made.

Some of that record is obviously useful. Some of it is more specific than people expect.

## What is in there

The standard metadata block includes the device make and model, the lens, exposure settings, and a timestamp accurate to the second. On most phones with location services enabled it also includes latitude and longitude, frequently with an altitude estimate.

Beyond the standard fields, manufacturers write their own. Depending on the device you may also be carrying a unique camera serial number, the orientation of the phone, whether the flash fired, the number of the shot in a burst, and in some cases an identifier that is stable across every photo that device has ever taken.

That last one is the interesting field. It links images taken years apart to the same physical object, which is a stronger claim than linking them to the same account.

## Where it survives and where it does not

Most large social platforms strip metadata on upload. This is genuinely good practice and it has been standard for years.

The gaps are elsewhere. Direct file transfers — email attachments, messaging apps that send originals, cloud folder links, file uploads to smaller sites — usually preserve everything. So does the copy sitting in your own backup, which matters if that backup is ever exposed.

The practical failure case is rarely a public post. It is sending an original file to someone you have no reason to distrust, in a context where the location of your home is not something you meant to include.

## The altitude detail

Location metadata is often assumed to be a rough neighbourhood indicator. On modern devices it is not. Combined altitude and horizontal accuracy can frequently identify a floor within a building.

For anyone whose safety depends on their address not being derivable — and that is a larger group than it first appears — this is the difference between a general area and a front door.

## What to actually do

Three habits cover most of the exposure.

Turn off location for the camera specifically, rather than globally. Modern phones support this, most people have never opened the setting, and it costs you almost nothing unless you rely on map-based photo browsing.

Strip metadata when sending originals outside your own systems. Every major operating system now offers this in the share sheet, usually behind a small options link that nobody notices.

Check what your backup does. Cloud photo services generally preserve everything, which is correct behaviour for a backup and worth knowing about.

None of this requires paranoia. It requires knowing that the file contains a paragraph you did not write.
