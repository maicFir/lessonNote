import { Body, Controller,Post,Get, Param, Delete } from '@nestjs/common';
import { UsersService } from "./users.service";
import { createUserDtoCreateUserDto } from './dto/create-user.dto';
import {User } from "./model/user.model";

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @Post("/create")
    async create(@Body() createUserDto: createUserDtoCreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    @Get("/findAll")
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    @Get("/findOne/:id")
    async findOne(@Param() params: {id: number}): Promise<User> {
        console.log(params, 'id')
        return this.usersService.findOne(params.id);
    }
    @Delete("/delete/:id")
    async delete(@Param() params: {id: number}): Promise<void> {
        return this.usersService.remove(params.id)
    }
}
