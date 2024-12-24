import { Controller, Post,Body,Get, Param, ParseIntPipe,Delete } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post("create")
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
    @Get("/findAll")
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    @Get("/findOne/:id")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
    }
    @Delete("/remove/:id")
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.usersService.remove(id);
    }

}
