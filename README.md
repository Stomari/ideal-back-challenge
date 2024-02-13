# Ideal Backend Challenge

## Description

API for consulting stocks and managing users assets. Built using:

- [Nest](https://github.com/nestjs/nest)
- [MongoDB](https://www.mongodb.com/)
- [FinanceAPI](https://financeapi.net/)

## Getting Started

<p>Be sure to have MongoDB and Node.js installed.</p>
<p>Create a <code>.env</code> file on the projects root and add your API key from <a href="https://financeapi.net/">https://financeapi.net/</a> and your MongoDB uri following this structure:</p>

```bash
API_KEY=[your API key]
MONGODB_URI=[your MongoDB uri path]
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```

## Documentation - Swagger

With the app running, navigate to http://localhost:3000/api on your browser.

## How to use

First create one or several users using the `/user` endpoint.<br>
After that you can start adding assets to the users you created using the `/user/asset` endpoint. <br><br>
Use the `/user` GET endpoint to fetch the user assets and sort them as you like.<br><br>
Fetch any asset data using the `/quote` endpoint.

## Test

```bash
# unit tests
$ npm run test
```
