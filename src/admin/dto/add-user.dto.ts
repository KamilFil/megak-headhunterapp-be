import {IsNumber, IsString} from "class-validator";

export class AddUserDto{
    @IsString()
    name:string;

    @IsString()
    surname: string;

    @IsNumber()
    age: number;

    @IsString()
    email: string;
}