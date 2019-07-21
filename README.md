Secrets management for Serverless Framework applications
---

This is an example application to illustrate 3 ways to manage secrets in the [Serverless Framework](https://serverless.com/framework/) applications:

* Environment variables + AWS KMS
* AWS SSM
* Serverless Framework’s secrets management capabilities

## Pre-requisites for this project

To deploy this project you’ll need the following:

* An AWS account.
* [AWS CLI](https://aws.amazon.com/cli/) installed locally.
* API credentials for your AWS account configured in your AWS CLI locally by running `aws configure`.
* Serverless Framework installed locally via `npm install serverless -g`, for other installation options see [this page](https://serverless.com/framework/).
* To test the Serverless Framework Secrets you’ll need a free or paid account with Serverless Framework, visit [this page](https://serverless.com/framework/) to sign up. After you’ve signed up run `sls login` to authenticate your local machine and to be able to deploy an application that uses Serverless Framework Secrets.

## Steps to deploy

Once all pre-requisite items are ready, follow these steps to deploy this example project:

1. Run `npm install` to install all the necessary dependencies.
2. Run `npm run` deploy to deploy the stack.

## Steps to Remove All Resources

After you’ve finished working with this example remember to remove all resources to make sure you’re not getting billed for unused AWS infrastructure.

Run `npm run remove` to remove all resources.