import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseType {
  @ApiProperty({
    example: 1,
    description: 'The category id',
  })
  id: number;

  @ApiProperty({
    example: 'Digital Music',
    description: 'The category name',
  })
  name: string;

  @ApiProperty({
    example: 'digital-music',
    description: 'The category slug',
  })
  slug: string;
}
