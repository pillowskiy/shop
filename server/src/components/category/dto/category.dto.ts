import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    example: 'Digital Music',
    description: 'The category name',
  })
  @IsString()
  public name: string;
}
