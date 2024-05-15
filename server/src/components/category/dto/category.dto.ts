import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    example: 'Digital Music',
    description: 'The category name',
  })
  @IsString({ message: 'String expected' })
  @MaxLength(64, {
    message: 'The category name should not exceed 64 characters',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly name: string;
}
