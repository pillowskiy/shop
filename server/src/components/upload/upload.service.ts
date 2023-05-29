import { Injectable } from '@nestjs/common';

import { writeFile } from 'fs/promises';
import { randomBytes } from 'crypto';
import { join } from 'path';

// TEMP: to .env
const FILE_TYPE_REGEX = /\.(jpe?g|png)$/i;
const FILE_MAX_SIZE = 1024 * 1024 * 8;

@Injectable()
export class UploadService {
  public async uploadFiles(files: Express.Multer.File[]) {
    console.log('Files before filter', files);
    files = files.filter(this.isFileAllow);
    console.log('Files after filter', files);
    return Promise.all(files.map(this.uploadFile));
  }

  private isFileAllow(file: Express.Multer.File) {
    return (
      file.size <= FILE_MAX_SIZE && FILE_TYPE_REGEX.test(file.originalname)
    );
  }

  private async uploadFile(file: Express.Multer.File) {
    const fileExtension = file.originalname.match(FILE_TYPE_REGEX)[0];
    const fileName = randomBytes(16).toString('hex');
    const filePath = join(process.cwd(), '/uploads', fileName + fileExtension);
    await writeFile(filePath, file.buffer, 'utf8');
    return { fileName, filePath, fileExtension };
  }
}
