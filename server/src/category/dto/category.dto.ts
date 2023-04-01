import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  public name: string;
}
