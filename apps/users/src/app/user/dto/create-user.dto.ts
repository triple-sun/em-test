import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { IUser } from '../user.interface';

export class CreateUserDto
  implements Pick<IUser, 'email' | 'name' | 'password'>
{
  @Expose()
  @IsEmail({}, { message: 'Invalid email.' })
  @ApiProperty({
    description: 'User email',
    required: true,
    nullable: false,
    type: String,
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'User name',
    required: true,
    nullable: false,
    type: String,
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'User password',
    required: true,
    nullable: false,
    type: String,
  })
  public password: string;
}
