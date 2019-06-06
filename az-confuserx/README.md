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

[![asciicast](https://asciinema.org/a/250261.svg)](https://asciinema.org/a/250261)


For detailed instructions on how to setup and use this function, go [here](https://www.notion.so/jumpm4n/Azure-ConfuserEx-az-confuserx-0e714d6486264d39a66b54626c4e23c1)


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
