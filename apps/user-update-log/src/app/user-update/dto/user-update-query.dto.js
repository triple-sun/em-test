import { SortOrder, UPDATES_PER_PAGE } from '@em-test/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional } from 'class-validator';

export class UserUpdateQueryDto {
  @Expose()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: 'User ID',
    required: false,
    type: Number,
  })
  id;

  @Expose()
  @IsOptional()
  @Transform(({ value }) => value ?? SortOrder.Asc)
  @IsIn(Object.values(SortOrder))
  @ApiPropertyOptional({
    description: 'Update log sort order',
    required: false,
    default: SortOrder.Asc,
    enum: SortOrder,
  })
  sortOrder;

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? 1)
  @ApiPropertyOptional({
    description: 'Update log page number',
    required: false,
    default: 1,
    type: Number,
  })
  page;

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => value ?? UPDATES_PER_PAGE)
  @ApiPropertyOptional({
    description: 'Updates per page',
    required: false,
    default: UPDATES_PER_PAGE,
    type: Number,
  })
  limit;
}
