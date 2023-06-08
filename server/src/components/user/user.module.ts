import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma.service';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UploadService],
  exports: [UserService],
})
export class UserModule {}
