import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min, MaxLength } from 'class-validator';
import { review } from 'src/config/docs/swagger.entity';

export class ReviewDto {
  @ApiProperty({
    example: review.rating,
    description: 'The review rate (float number)',
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;

  @ApiProperty({
    example: review.text,
    description: 'The review text (description)',
  })
  @IsString()
  @MaxLength(4096)
  public text: string;
}
