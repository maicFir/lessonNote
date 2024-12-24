import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { createUserDtoCreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) { }

    create(createUserDto: createUserDtoCreateUserDto):Promise<User> {
        return this.userModel.create({
            ...createUserDto
        });
    }
    // 查找所有
    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }
    // 查找一个
    async findOne(id: number): Promise<User> {
        const res = await this.userModel.findOne({
            where: { id }
        });
        if (res) {
            console.log('User found:', res);
            return res;
        } else {
            console.log('User not found');
            return null;
        }
    }
    // 移除
    async remove(id: number): Promise<void> {
        await this.userModel.destroy({
            where: { id }
        })
    }
}
