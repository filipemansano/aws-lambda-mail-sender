# Lambda Mail Sender

### Testing

```bash
POST /Prod/ HTTP/1.1
Host: <API GATEWAY ENDPOINT>
x-api-key: <API GATEWAY KEY>
Content-Length: 591
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="fromName"

Filipe Mansano
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="fromEmail"

filipemansano@fmansano.com
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="to"

filipemansano@fmansano.com
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="subject"

this is the subject
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="message"

this is body of email
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="photo.png"
Content-Type: image/png

(data)
------WebKitFormBoundary7MA4YWxkTrZu0gW--

```

## Prerequisites

Before running the project, make sure the following dependencies are installed in your development environment:

- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))

## Script List

Here are the scripts available in this project:

### Compile

This script is used to compile the project using TypeScript. It utilizes the configuration defined in the `tsconfig.json` file.

To compile the project, use the following command: `npm run compile`

### Generate:layers

This script is used to generate a Node.js layer with project dependencies and copy them to a specific directory (`./layers/nodejs`). This can be useful in serverless function deployment scenarios that require custom layers.

To generate and copy the layers, use the following command: `npm run generate:layers`

### Deploy

The deployment script uses the AWS Serverless Application Model (SAM) to deploy the project. Make sure you have configured your AWS credentials and set up the `template.yaml` file as needed.

To deploy the project, use the following command: `npm run deploy`
