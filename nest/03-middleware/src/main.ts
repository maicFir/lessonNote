import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middle/logger.middleware';
import { logger } from "./middle/log.moddleware";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(logger);
    await app.listen(3000);
}
bootstrap();
