import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import nodemailer from 'nodemailer'
import * as aws from '@aws-sdk/client-ses'
import { Options } from "nodemailer/lib/mailer";
import { parse } from "./lib/parse";

const ses = new aws.SESClient({
    region: 'us-east-1'
});

const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});

export const lambdaHandler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {

    const body = await parse(event);

    let options: Options = {
        from: {
            name: body.fromName,
            address: body.fromEmail
        },
        to: body.to,
        subject: body.subject,
        text: body.message,
    };

    if(body.files.length > 0){
        options.attachments = body.files.map(file => {
            return {
                filename: file.filename,
                content: file.content,
                encoding: file.encoding,
                contentType: file.contentType,
            }
        })
    }

    let statusCode = null;
    let responseBody = null;

    try{
        const response = await transporter.sendMail(options);
        statusCode = 200;
        responseBody = JSON.stringify({
            message: 'Sucess ' + response.messageId
        })
    }catch(error){
        statusCode = 500;
        responseBody = JSON.stringify({
            message: 'Internal Server Error.',
            error: error
        })
    }

    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: responseBody
    }
};