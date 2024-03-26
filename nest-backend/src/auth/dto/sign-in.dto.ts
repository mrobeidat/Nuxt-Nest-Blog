import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Match } from '../../utils/match.decorator';

export class SignUpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    @Match('password')
    passwordConfirm: string;
}