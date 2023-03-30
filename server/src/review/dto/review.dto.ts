import { IsNumber, IsString, Max, Min, MaxLength } from 'class-validator';

export class ReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;

  @IsString()
  @MaxLength(4096)
  public text: string;
}
