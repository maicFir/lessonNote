import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LoggerMiddleware } from './middle/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         // consumer.apply(LoggerMiddleware).forRoutes('api');
//         // consumer.apply(LoggerMiddleware).forRoutes({ path: 'api/list', method: RequestMethod.GET });
//         // consumer.apply(LoggerMiddleware).forRoutes(AppController);
//     }
// }
export class AppModule  {

}
