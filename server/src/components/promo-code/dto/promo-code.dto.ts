import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class PromoCodeDto {
  @IsString()
  @MaxLength(32, {
    message: 'The name of the promo code should not exceed 32 characters',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly name: string;

  @IsDate({
    message: 'The expiration date of the promo code must be the date',
  })
  public readonly expiresAt: Date;

  @IsInt({ message: 'The activation limit must be an positive integer value' })
  @IsPositive({
    message: 'The activation limit must be an positive integer value',
  })
  @IsOptional()
  public readonly activationLimit?: number;

  @IsInt({
    message: 'The discount percentage must be an positive integer value',
  })
  @IsPositive({
    message: 'The discount percentage must be an positive integer value',
  })
  @Max(100, {
    message: 'The discount percentage should not exceed 100%',
  })
  @IsOptional()
  public readonly discountPercent?: number;
}
