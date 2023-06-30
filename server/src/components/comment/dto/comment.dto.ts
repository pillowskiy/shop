import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { comment } from 'src/config/docs/swagger.entity';

export class CommentDto {
  @ApiProperty({
    example: comment.text,
    description: 'The comment text',
  })
  @MaxLength(1024, {
    message: 'The length of the comment should not exceed 1024 characters',
  })
  @IsString({
    message: 'String expected',
  })
  @IsNotEmpty({ message: 'This field is required' })
  public readonly text: string;
}
