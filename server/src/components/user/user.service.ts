import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { productSelect, userSelect } from './prisma.partials';
import { UserDto } from './dto/user.dto';
import { hash } from 'argon2';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}
  public async getProfileById(
    userId: number,
    selectObject: Prisma.UserSelect = {},
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        ...userSelect,
        ...selectObject,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async updateProfile(
    userId: number,
    dto: UserDto,
    file: Express.Multer.File,
    serverURL: string,
  ) {
    const { isInitialUser, user } = await this.prisma.user
      .findUnique({
        where: { email: dto.email },
        select: {
          ...userSelect,
        },
      })
      .then((user) => ({
        isInitialUser: user && user.id === userId,
        user: user,
      }));

    if (!isInitialUser) {
      throw new BadRequestException(
        'The final value does not match the initial value',
      );
    }

    let newAvatarURL = user.avatarURL;
    if (file) {
      const uploadData = await this.uploadService.uploadFiles([file]);
      if (!uploadData.length) {
        throw new BadRequestException({
          errors: {
            avatarURL: 'The received image is not supported',
          },
        });
      }

      const { fileName, fileExtension } = uploadData.at(0);
      newAvatarURL = `${serverURL}/uploads/${fileName + fileExtension}`;
    }

    return this.prisma.user
      .update({
        where: { id: userId },
        data: {
          ...dto,
          password: dto.password && (await hash(dto.password)),
          avatarURL: newAvatarURL,
        },
        select: userSelect,
      })
      .catch((err) => {
        if (user.avatarURL !== newAvatarURL) {
          this.uploadService.unlinkFromPaths([newAvatarURL]);
        }
        throw err;
      });
  }

  // TEMP: decomposition
  public async toggleFavoriteProduct(userId: number, productId: number) {
    const userData = await this.getProfileById(userId, { favorites: true });
    const isFavorite = userData.favorites.some(
      (product) => product.id === productId,
    );

    return this.prisma.user
      .update({
        where: { id: userId },
        data: {
          favorites: {
            [isFavorite ? 'disconnect' : 'connect']: { id: productId },
          },
        },
        select: {
          ...userSelect,
          favorites: { select: productSelect },
        },
      })
      .catch(() => {
        throw new NotFoundException('Product not found');
      });
  }

  // TEMP: decomposition
  public async toggleHelpful(userId: number, reviewId: number) {
    const userData = await this.getProfileById(userId, {
      helpfulReviews: true,
    });
    const isHelpful = userData.helpfulReviews.some(
      (review) => review.id === reviewId,
    );

    return this.prisma.user
      .update({
        where: { id: userId },
        data: {
          helpfulReviews: {
            [isHelpful ? 'disconnect' : 'connect']: { id: reviewId },
          },
        },
        select: userSelect,
      })
      .catch(() => {
        throw new NotFoundException('Product not found');
      });
  }
}
