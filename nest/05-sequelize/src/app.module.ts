import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/model/user.model';

@Module({
    imports: [SequelizeModule.forRoot({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'test_sequelize',
        autoLoadModels: true,
        synchronize: true,
        models: [User],
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
