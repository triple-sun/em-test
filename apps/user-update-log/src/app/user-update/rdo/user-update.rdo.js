import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserUpdateRdo {
  @Expose()
  @ApiResponseProperty({ type: Number })
  id;

  @Expose()
  @ApiResponseProperty({ type: Number })
  userId;

  @Expose()
  @ApiResponseProperty({ type: String })
  update;

  @Expose()
  @ApiResponseProperty({ type: Date })
  createdAt;
}
