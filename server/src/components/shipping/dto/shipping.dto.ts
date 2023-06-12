import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ShippingDto {
  @IsString()
  @MaxLength(24)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(24)
  @IsNotEmpty()
  surname: string;

  @IsString()
  @MaxLength(3)
  @IsNotEmpty()
  country: string;

  @IsString()
  @MaxLength(3)
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
