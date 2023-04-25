import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseType {
  @ApiProperty({
    example: {
      id: 1,
      email: 'shop_user@gmail.com',
      name: 'User',
      avatarURL: 'https://somewhere.png/',
      phone: '0123456789' || null,
      roles: ['User'],
    },
    description: 'User entity',
  })
  public user: User;

  @ApiProperty({
    example: '72134512IkpXVCJ9.eI6MSwiaWF0IjoxNjgyMzUwNzU5LC...',
    description: 'JWT refresh token',
  })
  public refreshToken: string;

  @ApiProperty({
    example: '72134512IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgyMzUwNzU5LC...',
    description: 'JWT refresh token',
  })
  public accessToken: string;
}
