import { Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Body, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ZodValidationPipe, createCatSchema, CreateCatDto } from "./ZodValidationPipe"

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  getHello(): string {
    return this.appService.getHello();
  }
    @Post("/create")
    @UsePipes(new ZodValidationPipe(createCatSchema))
    create(@Body() createCatDto: CreateCatDto) {
        return {
            ...createCatDto,
        };
   }
    @Get("/list")
    async list() {
        return "hello list";
    }
    @Get("/detail/:id")
    async getDetail(@Param("id", new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) { 
        return {id}
    }
}
