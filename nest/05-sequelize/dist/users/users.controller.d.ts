import { UsersService } from "./users.service";
import { createUserDtoCreateUserDto } from './dto/create-user.dto';
import { User } from "./model/user.model";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: createUserDtoCreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(params: {
        id: number;
    }): Promise<User>;
    delete(params: {
        id: number;
    }): Promise<void>;
}
