import { Injectable } from '@nestjs/common';

import { writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';

import { randomBytes } from 'crypto';
import { join } from 'path';

const FILE_TYPE_REGEX = /\.(jpe?g|png)$/i;
const FILE_MAX_SIZE = 1024 * 1024 * 8;

@Injectable()
export class UploadService {
  public async uploadFiles(files: Express.Multer.File[]) {
    const allowFiles = files.filter(this.isFileAllow);
    return Promise.all(allowFiles.map(this.uploadFile));
  }

  public async unlinkFiles(filePaths: string[]) {
    const allowPaths = filePaths.filter(this.isPathExist);
    return Promise.all(allowPaths.map((path) => unlink(path)));
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

  private isPathExist(path: string) {
    return existsSync(path);
  }
}
