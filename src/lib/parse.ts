import { APIGatewayProxyEvent } from "aws-lambda";
import Busboy from "busboy";
import { Readable } from 'stream'; 

interface FileUploaded {
    filename: string;
    content: Buffer;
    contentType: string;
    encoding: string;
    fieldname: string;
}

interface ParsedResult {
    files: FileUploaded[];
    [fieldName: string]: any;
}

export const parse = (event: APIGatewayProxyEvent): Promise<ParsedResult> => new Promise((resolve, reject) => {
    const busboy = Busboy({
        headers: {
            'content-type': event.headers['content-type'] || event.headers['Content-Type']
        }
    });
    const result: ParsedResult = {
        files: []
    };

    busboy.on('file', (fieldname: string, file: Readable, fileInfo: { filename: string, encoding: string, mimeType: string }): void => {
        const uploadFile: FileUploaded = {
            filename: '',
            content: Buffer.from(''),
            contentType: '',
            encoding: '',
            fieldname: fieldname
        };

        file.on('data', (data: any) => {
            uploadFile.content = data;
        });

        file.on('end', () => {
            if (uploadFile.content) {
                uploadFile.filename = fileInfo.filename;
                uploadFile.contentType = fileInfo.mimeType;
                uploadFile.encoding = fileInfo.encoding;
                result.files.push(uploadFile);
            }
        });
    });

    busboy.on('field', (fieldname, value) => {
        if (!result[fieldname]) {
            result[fieldname] = value;
        } else if (Array.isArray(result[fieldname])) {
            result[fieldname].push(value);
        } else {
            result[fieldname] = [result[fieldname], value];
        }
    });

    busboy.on('error', error => {
        reject(error);
    });

    busboy.on('finish', () => {
        resolve(result);
    });

    const encoding = event.isBase64Encoded ? 'base64' : 'binary';

    busboy.write(event.body, encoding);
    busboy.end();
});