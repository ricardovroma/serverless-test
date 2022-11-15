<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node API on AWS

This template demonstrates how to develop and deploy a simple Node API service, running on AWS Lambda using the traditional Serverless Framework.


## Anatomy of the template

This template configures a single function, `api`, which is responsible for handling all incoming requests thanks to the `httpApi` event. To learn more about `httpApi` event configuration options, please refer to [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/)..

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-express-dynamodb-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-express-dynamodb-api-project-dev (196s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-dynamodb-api-project-dev-api (766 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). Additionally, in current configuration, the DynamoDB table will be removed when running `serverless remove`. To retain the DynamoDB table even after removal of the stack, add `DeletionPolicy: Retain` to its resource definition.

### Invocation

After successful deployment, you can create a new user by calling the corresponding endpoint:

```bash
curl "https://xxxxxx.execute-api.us-east-1.amazonaws.com/" -H 'Content-Type: application/json' -d '{"customer":{"first_name":"John","last_name":"Smith","email":"accept@qa-force-allow.com"}}'
```

Which should result in the following response:

```json
{"recommendation":"approve"}
```

You can try to change the recommendation by providing any other email address rather than @qa-force-allow.com to get a declined answer:

```bash
curl "https://xxxxxx.execute-api.us-east-1.amazonaws.com/" -H 'Content-Type: application/json' -d '{"customer":{"first_name":"John","last_name":"Smith","email":"accept@qa-force-reject.com"}}'
```

Which should result in the following response:

```json
{"recommendation":"decline"}
```

If you try to send a payload without a customer or without the customer email address, you should receive the following responses:

```json
{"error":"Provide a customer"}
```
```json
{"error":"Provide a customer email"}
```

### Local development

It is also possible to emulate API Gateway and Lambda locally using the `serverless-offline` plugin. In order to do that, run:

```bash
serverless plugin install -n serverless-offline
```

It will add the plugin to `devDependencies` in `package.json` file as well as will add it to `plugins` in `serverless.yml`. Make sure that `serverless-offline` is listed as last plugin in `plugins` section:

```
plugins:
  - serverless-offline
```

After that, running the following command with start local API Gateway emulator:

```bash
serverless offline start
```

To learn more about the capabilities of `serverless-offline`, please refer to their corresponding GitHub repositories:
- https://github.com/dherault/serverless-offline
