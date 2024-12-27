import { Controller, HttpStatus, Post, HttpCode, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from './auth.guard';
import { Public} from "./public"

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
        
    }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
    // @UseGuards(AuthGuard)
    @Get("profile")
    async profile(@Request() req) {
        return req.user;
    }
    @Public()
    @Get("public")
    async public() {
        return "public";
    }
}
