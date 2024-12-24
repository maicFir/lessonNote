import { Controller, Get, UseInterceptors, Version } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
    @Version('1')
    @Get('cache')
    async getCache() {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return [{ id: 1, name: 'Nest' }];
    }
    @Version('2')
    @Get('cache')
    async getCache2() {
        return "Hello World";
    }
}
