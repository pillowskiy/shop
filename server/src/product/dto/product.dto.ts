import {
  ArrayMinSize,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  public name: string;

  @IsNumber()
  public price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  public images: string[];

  @IsNumber()
  public categoryId: number;
}
