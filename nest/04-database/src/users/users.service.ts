import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) 
    private usersRepository: Repository<User>,) { }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        return this.usersRepository.save(user);
    }
    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
    async findOne(id: number): Promise<User> {
        const res = await this.usersRepository.findOneBy({ id });
        console.log(res, 'res')
        if (res) {
            return res;
        }
        return Promise.resolve({
            id: id,
            firstName: "Not found",
            lastName: "Not found",
            isActive: false
        } as User);
    }
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
