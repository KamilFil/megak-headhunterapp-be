import * as path from 'path';
import { diskStorage } from 'multer';
import * as mime from 'mime';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';

export function storageDir() {
  fs.access(path.join(__dirname, '../../storage'), (err) => {
    if (err) {
      fs.mkdir(path.join(__dirname, '../../storage'), (err) => {
        if (err) {
          console.log('err');
        }
      })
    }
  });

  fs.access(path.join(__dirname, '../../storage/users-list'), (err) => {
    if (err) {
      fs.mkdir(path.join(__dirname, '../../storage/users-list'), (err) => {
        if (err) {
          console.log('err');
        }
      })
    }
  });

  return path.join(__dirname, '../../storage');
}
console.log(__dirname);
export function multerStorage(dest: string) {
  return diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) =>
      cb(null, `${uuid()}.${(mime as any).getExtension(file.mimetype)}`),
  });
}
