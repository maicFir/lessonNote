import { User } from './model/user.model';
import { createUserDtoCreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: typeof User);
    create(createUserDto: createUserDtoCreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    remove(id: number): Promise<void>;
}
