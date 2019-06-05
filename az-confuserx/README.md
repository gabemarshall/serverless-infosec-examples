<!--
title: 'Azure ConfuserEX ().NET Compiler/Obfuscator)'
description: 'In this example, we demonstrate how Azure v1 functions can be utilized for automating payload readiness.'
layout: Doc
framework: v1
platform: Azure
language: nodeJS
authorLink: 'https://github.com/gabemarshall'
authorName: 'Gabe Marshall'
-->
# .NET Compiler/Obfuscator Using csc.exe and ConfuserEX

In this example, we demonstrate how Azure v1 functions can be utilized for automating payload readiness.

I highly recommend going through [Azure Functions - Quick Start](https://serverless.com/framework/docs/providers/azure/guide/quick-start/) before proceeding.

_You will need to change the values of `service` and `BLOB_CONTAINER_NAME` in your `serverless.yml` file_

## Setup

1. Node.js v6.x is recommended (since Azure v1 functions use v6.x as their runtime)
2. Install the serverless framework - `npm install -g serverless`
3. Install the dependencies of this example - `npm install`

## Deploying

To deploy, use the `deploy` command and follow the instructions to log into your Azure
account.

```bash
$ serverless deploy
Serverless: Packaging service...
Serverless: Logging in to Azure
Serverless: Paste this code (copied to your clipboard) into the launched browser, and complete the authentication process: BLAZSRMVJ
```

Once authenticated, the session will continue and deploy the app.

## Usage

```bash
$ ./az-confuserx [path to .cs source file]
```
