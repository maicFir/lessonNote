import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { jwt_const} from "./jwt_contants"
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './decorator/roles.guard';

@Module({
    imports: [UsersModule, JwtModule.register({
        global: true,
        secret: jwt_const.JWT_SECRET,
        //signOptions: { expiresIn: '60s' }, // 过期时间
  })],
  controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AuthModule {}
