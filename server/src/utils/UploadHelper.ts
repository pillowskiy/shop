import type { Request } from 'express';

// TEMP: types
// To promises

export class UploadHelper {
  static customFileName(_: Request, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    }
    const originalName = file.originalname.split('.')[0];
    cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
  }

  static destinationPath(_: Request, __: any, cb: any) {
    cb(null, './uploads/');
  }

  static fileFilter(_: Request, file: any, cb: any) {
    const regex = /\.(jpe?g|png)$/i;
    console.log(file.mimetype, regex.test(file.mimetype));
    cb(null, !regex.test(file.mimetype));
  }
}
