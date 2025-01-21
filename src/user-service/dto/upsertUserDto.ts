import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class UpsertUserDto {
    @ApiProperty({
        description: 'Email of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Role'
    })
    @IsBoolean()
    admin: boolean;
}
