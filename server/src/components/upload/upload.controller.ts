import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { join } from 'node:path';

@ApiTags('payments')
@Controller('uploads')
export class UploadController {
  @Get('/:fileName')
  public async publicUploads(
    @Res() res: Response,
    @Param('fileName') fileName: string,
  ) {
    return res.sendFile(join(process.cwd(), 'uploads/', fileName));
  }
}
