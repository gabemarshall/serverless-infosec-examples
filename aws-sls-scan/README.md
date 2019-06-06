<!--
title: 'AWS Serverless Scan Gobuster/Nmap/??)'
description: 'In this example, we demonstrate how Serverless functions can be used to remotely run tools like nmap or Gobuster'
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/gabemarshall'
authorName: 'Gabe Marshall'
-->
# AWS Serverless Scan

In this example, we demonstrate how Serverless functions can be used to remotely run tools like nmap or Gobuster.

[![asciicast](https://asciinema.org/a/qksYBJsPyJIkplsjLOHNseQiW.svg)](https://asciinema.org/a/qksYBJsPyJIkplsjLOHNseQiW)


## Deploying

This service has two functions, and is pretty easy to get deployed. 

An in-depth tutorial including installation and usage instructions is in progress.
For now, see below.

## Installation

```bash
npm install # or yarn
serverless deploy --region us-east-1 # currently the config uses this, feel free to change regions
```

Edit your serverless.yml file and comment/uncomment the region(s) under `slskit-regions` that you've deployed


## Usage

### Gobuster

This function supports uploading a wordlist as well as downloading the results (saving output to a file)

Ex:
```bash
$ ./gobuster -u https://www.hackthissite.org/ -w wordlist.txt -o results.txt
```

### Nmap

Currently this function does not allow retrieval of saved output, and instead only returns the stdout from nmap (-oA and what not is on the todo list)

```bash
$ ./nmap
```
