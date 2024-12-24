import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import * as compression from "compression";

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableVersioning({ type: VersioningType.URI });
    app.use(compression());
  await app.listen(3000);
}
bootstrap();
