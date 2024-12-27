import { Controller, Get, Res, Req, Post, UseInterceptors, UploadedFile, StreamableFile } from '@nestjs/common';
import { Request, Response, Express } from 'express';
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('set-cookie')
    setCookie(@Res({ passthrough: true }) response: Response): void {
        response.cookie('wmc-key', '123', { httpOnly: false });
        response.send('Cookie has been set');
    }
    @Get('get-cookie')
    getCookie(@Req() request: Request): string {
        const cookieValue = request.cookies['wmc-key'];
        return `Cookie value: ${cookieValue}`;
    }
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new Error('File is undefined');
        }
        console.log(file);
        return {
            file: file.buffer.toString(),
        };
    }
    @Get("json")
    getFile(): StreamableFile {
      const file = createReadStream(join(process.cwd(), 'package.json'));
      return new StreamableFile(file, {
        type: 'application/json',
        disposition: 'attachment; filename="package.json"',
        // If you want to define the Content-Length value to another value instead of file's length:
        // length: 123,
      });
    }
}
