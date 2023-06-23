import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CommentDto {
  @MaxLength(1024, {
    message: 'The length of the comment should not exceed 1024 characters',
  })
  @IsString({
    message: 'String expected',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly text: string;
}
