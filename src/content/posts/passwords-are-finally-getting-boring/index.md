---
title: "Passwords Are Finally Getting Boring"
excerpt: "Passkeys removed the interesting failure modes from signing in. The remaining problems are administrative, which is a considerable upgrade."
category: "Security"
date: 2026-07-12
author:
  name: "Evan Brooks"
  role: "Security desk"
tags: ["Authentication", "Passkeys", "UX"]
cover:
  src: "./cover.jpg"
  alt: "A hand lit by a dense grid of bright green LEDs"
  creditName: "Josh Riemer"
  creditUrl: "https://unsplash.com/photos/flRN6KYpl1A"
trending: false
---

For thirty years, the login form was the most reliably exciting part of any product, in the sense that a hospital is exciting. Credential stuffing, phishing kits, reset flows that were weaker than the password they protected, and the endless negotiation over how many special characters constituted safety.

Passkeys did not solve authentication. They moved the excitement somewhere less dangerous.

## What actually changed

The mechanism is straightforward: the credential is a key pair, the private half never leaves the authenticator, and the challenge is bound to the site's origin.

That last detail is the one that matters. A phishing page cannot ask for a passkey belonging to a different domain, because the browser will not offer it. This removes an entire attack category rather than mitigating it — no training, no vigilance, no user judgement required.

The secondary effect is that there is no shared secret in the database. A breach of the credential store yields public keys, which are public.

## The problems that remain

They are real, and they are administrative rather than cryptographic.

**Recovery.** If the authenticator is lost and the credential was not synced, the account needs another path back in. That path is now the weakest link, and a lot of it is still email — which frequently means a password.

**Sync boundaries.** Passkeys sync within an ecosystem. Moving between ecosystems remains awkward, and the person moving is exactly the person least likely to have a second credential registered.

**Enterprise inventory.** Organisations that need to know which credentials exist on which devices are working with tooling that is noticeably younger than the problem.

**Shared accounts.** A credential bound to a device does not survive contact with a team that shares one login. This practice should not exist and it exists everywhere.

## The pattern that works

Deployments that go smoothly tend to look the same.

Offer passkeys as an addition rather than a replacement, and let adoption happen through preference rather than mandate. Require at least two registered credentials before removing the password. Make the recovery path deliberately slower and better logged than the primary path, because it is now the interesting target.

And treat the transitional period as multi-year. The organisations that struggled were the ones that treated passkey rollout as a migration with an end date rather than a long overlap.

## The measure of success

The best outcome available here is that signing in becomes forgettable — a biometric prompt, a confirmation, and back to whatever you were doing.

Boring is not a consolation prize. For an authentication system, boring is the entire objective, and this is the closest the industry has come.
