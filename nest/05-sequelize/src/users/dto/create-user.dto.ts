import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class createUserDtoCreateUserDto {
    
    @IsNotEmpty()
    firstName: string;
    lastName: string;
    @IsOptional()
    isActive?: boolean;
  }