# Product Quantity Restriction Function

Sample Commerce Serverless Function that validates product quantities against configured restrictions.

This is the companion source code for the **"Implement a Commerce Serverless Function"** step of the [Extensibility Quick Start](../docs/README.md) tutorial.

## Prerequisites

- Node.js 18+

## Quick Start

```bash
npm install
npm test
```

## Packaging for Deployment

To prepare this function for deployment, package it as a zip file with `index.mjs` at the root level.

### Create the package:

```bash
zip -j prdqtyfunction-prdqtyfunction.zip src/index.mjs
```

**Expected zip structure:**
```
prdqtyfunction-prdqtyfunction.zip
└── index.mjs    ← Must be at root level, NOT src/index.mjs
```
