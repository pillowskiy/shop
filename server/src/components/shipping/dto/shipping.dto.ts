import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ShippingDto {
  @IsString()
  @MaxLength(32, {
    message: "The customer's name should not exceed 32 characters",
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly name: string;

  @IsString({ message: 'Invalid value' })
  @MaxLength(32, {
    message: "The customer's name should not exceed 32 characters",
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly surname: string;

  @IsString({ message: 'Invalid value' })
  @MaxLength(3, {
    message: 'The country should not exceed 3 characters',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly country: string;

  @IsString({ message: 'Invalid value' })
  @MaxLength(12, {
    message: 'The state should not exceed 12 characters',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly state: string;

  @IsString({ message: 'Invalid value' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly city?: string;

  @IsString({ message: 'Invalid value' })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly phone: string;

  @IsBoolean()
  @IsOptional()
  public readonly temp?: boolean;
}
