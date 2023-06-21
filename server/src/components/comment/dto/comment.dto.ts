import { IsString, MaxLength, MinLength } from 'class-validator';

export class CommentDto {
  @MaxLength(1024, {
    message: 'The length of the comment should not exceed 1024 characters',
  })
  @MinLength(1, {
    message: 'This field is required',
  })
  @IsString({
    message: 'String expected',
  })
  public text: string;
}
