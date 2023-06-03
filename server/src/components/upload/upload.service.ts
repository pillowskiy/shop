import { Injectable } from '@nestjs/common';

import { writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';

import { randomBytes } from 'crypto';
import { join } from 'path';

const FILE_TYPE_REGEX = /\.(jpe?g|png|webp)$/i;
const FILE_MAX_SIZE = 1024 * 1024 * 8;

@Injectable()
export class UploadService {
  public async uploadFiles(files: Express.Multer.File[]) {
    const allowFiles = files.filter(this.isFileAllow);
    return Promise.all(allowFiles.map(this.uploadFile));
  }

  public async unlinkFiles(fileNames: string[]) {
    const allowFiles = fileNames.filter(this.isFileExist);
    return Promise.all(allowFiles.map(this.unlinkFile));
  }

  public async unlinkFromPaths(filePaths: string[]) {
    return this.unlinkFiles(this.getFileNames(filePaths));
  }

  private getFileNames(paths: string[]) {
    const newPaths = [];
    for (const path of paths) {
      const potentialName = path.split('/').at(-1);
      if (path.includes('/uploads') && potentialName) {
        newPaths.push(potentialName);
      }
    }
    return newPaths;
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

  private async unlinkFile(subPaths: string) {
    return unlink(join(process.cwd(), '/uploads', subPaths));
  }

  private isFileExist(fileName: string) {
    return existsSync(join(process.cwd(), '/uploads', fileName));
  }

  /*
   * Hopefully, I'll figure it out one day.
   * For some reason, private methods have no context.
   */
  private getPath(...subPath: string[]) {
    return join(process.cwd(), '/uploads', ...subPath);
  }
}
