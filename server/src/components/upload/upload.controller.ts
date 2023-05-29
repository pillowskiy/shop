import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'node:path';

@Controller('uploads')
export class StatisticController {
  @Get('/:fileName')
  public async publicUploads(
    @Res() res: Response,
    @Param('fileName') fileName: string,
  ) {
    return res.sendFile(join(process.cwd(), 'uploads/', fileName));
  }
}
