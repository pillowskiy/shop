import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@src/guards/roles.guard';

export const Auth = () => UseGuards(AuthGuard('jwt'), RolesGuard);
