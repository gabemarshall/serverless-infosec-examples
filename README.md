# Serverless Infosec Examples

The following is based the 2019 Cackalacky talk entitled "Making Alexa Do Your Dirty Work - Improving Your Toolkit With Serverless Computing"

<img align="right" width="300" src="https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/email/sls-getting-started.gif" />

A small collection of [Serverless Framework](https://github.com/serverless/serverless) services designed for infosec practitioners.

(This repo is a fork of the official Serverless Framework examples, see https://github.com/serverless/examples for more information)

## Table of Contents

- [Serverless Infosec Examples](#serverless-infosec-examples)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Examples](#examples)

## Getting Started

If you are new to serverless as a whole, I'd recommend starting with a simple example from the official Serverless repo. For instance, the HTTP API Endpoint in [NodeJS](https://github.com/serverless/examples/tree/master/aws-node-simple-http-endpoint) is one that they recommend.

## Examples

Each example contains a `README.md` with an explanation about the service and it's use cases.

To install any of these you can run:

```bash
serverless install -u https://github.com/gabemarshall/serverless-infosec-examples/tree/master/folder-name -n my-project
```

| Example                                                                                                                                                                                                     | Runtime |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| [Azure ConfuserEx](https://github.com/gabemarshall/serverless-infosec-examples/tree/master/az-confuserx) <br/> Demonstrates using an Azure function to compile and obfuscate payloads from the command line | nodeJS  |