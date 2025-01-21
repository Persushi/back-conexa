import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsEmail } from 'class-validator';

export class UserDto {
    @ApiProperty({
        description: 'Unique identifier of the user',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    id: string;

    @ApiProperty({
        description: 'Creation timestamp',
        example: '2024-01-01T00:00:00Z',
    })
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        description: 'Last update timestamp',
        example: '2024-01-01T00:00:00Z',
    })
    @IsDate()
    updatedAt: Date;

    @ApiProperty({
        description: 'Email of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;
}
