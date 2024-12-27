import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as multer from 'multer';

@Module({
    imports: [
        MulterModule.register({
            // dest: './uploads', // 文件上传目录
            storage: multer.memoryStorage()
          }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
