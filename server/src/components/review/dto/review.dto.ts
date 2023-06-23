import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Max,
  Min,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { review } from 'src/config/docs/swagger.entity';

export class ReviewDto {
  @ApiProperty({
    example: review.rating,
    description: 'The review rate (float number)',
  })
  @Max(5, {
    message: 'Rating must be least or equals 5',
  })
  @Min(1, {
    message: 'Rating must be greater or equals 1',
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'Invalid value' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly rating: number;

  @ApiProperty({
    example: review.text,
    description: 'The review text (description)',
  })
  @MaxLength(1024, {
    message: 'The length of the comment should not exceed 1024 characters',
  })
  @IsString({
    message: 'String expected',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly text: string;
}
