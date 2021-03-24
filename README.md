# Pod-Cats

> This is a web application for users to browse and find highly rated podcasts. 

## Table of Contents
1. [Motivation](#Demo)
1. [Demo](#Demo)
1. [Tech](#Tech)
1. [Features](#Features)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installing Dependencies](#installing)

## Motivation
> I am an avid podcast listener and find that they enrich my life as a source of entertainment and news on subjects I'm interested in like politics or the NBA. While I frequent sites like Pitchfork to find good music, Rotten Tomatoes to find good movies, and Goodreads to find good books, I've been dissatisfied with the current offering of similar sites for podcasts that don't require you to create a spotify account. I decided to build a web application that allows users to find highly reviewed podcasts. 
## Demo
![Pod-Cats Demo](https://remy-sdc-images.s3-us-west-2.amazonaws.com/final_605b77f2da095f0069920491_890738.gif)

## Tech
* Front End
  * React
  * Material UI
  * Webpack
* Backend
  * MongoDB
  * Express

## Features
* Mobile first UI built using Material UI and React consists of podcast search and browsing, item detail page with full episode content
* Debounced live search to query database for podcast information
* User Review modal on item detail page allows users to see ratings and add their own 

## Usage

> To run webpack, change webpack config mode to development or production according to needs then run
  npm run react-dev
> To start local server, npm start

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

