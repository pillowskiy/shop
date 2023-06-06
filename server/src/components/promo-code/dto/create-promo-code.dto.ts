import {
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePromoCodeDto {
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  name: string;

  @IsDate()
  expiresAt: Date;

  @IsInt()
  @IsPositive()
  @IsOptional()
  activationLimit?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Max(100)
  discountPercent?: number;
}
