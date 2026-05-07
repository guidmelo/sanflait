import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@sanflait.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @MinLength(3)
  password!: string;
}

export class RefreshDto {
  @ApiProperty()
  @IsString()
  refreshToken!: string;
}
