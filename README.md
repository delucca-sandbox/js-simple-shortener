# Simple Shortener

Simple URL shortener that can shorten URLs and record every URL activity on a MongoDB database. This shortener was used at Yurah. There, we used a self-hosted MongoDB and used our users IDs to record every activity.

## 🧐 What's inside

`POST`

Parameters:

* **url**: The raw URL that you want to shorten `REQUIRED`

`GET`

Query parameters:

* **u**: The ID that will be recorded on the database

## 🤖 Installation Instructions

This service is based on Node. To run it you just need to install any version above Node 11.2. We use Docker to build and deploy our services, so you just need to keep the Docker's and CI files, this will trigger the CI automatically.

To install the package, just run:

```
npm i
```

And then, to start the server:

```
npm start
```

Or, you can start the server as development mode:

```
npm run dev
```

After that the server will be up and running, waiting for any API calls.

## 💀 Testing

We use Jest to test our file. Every test file should follow this pattern:

```
<nome>.test.js
```

To test it, just run:
```
npm test
```

## 💅 Versioning

We use [SemVer](https://semver.org/) for versioning.
