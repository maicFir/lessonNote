import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maic',
            password: '123456',
        },
    ]
    async findOne(username: string): Promise<any | undefined> {
        return this.users.find(user => user.username === username);
    }
}
