import { SetMetadata } from '@nestjs/common';
import type { Role } from '@prisma/client';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
