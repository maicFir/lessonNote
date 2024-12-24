import { Module } from '@nestjs/common';
import { CacheModule} from "@nestjs/cache-manager"
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [CacheModule.register({
        ttl: 5,
        max: 10,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
