import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

class UserIdDto {
  @Expose()
  @IsInt()
  @ApiProperty({
    description: 'User ID',
    required: true,
    nullable: true,
    type: Number,
  })
  public id: number;
}

export class UserRdo extends IntersectionType(
  PickType(CreateUserDto, ['name', 'email'] as const),
  UserIdDto
) {}
