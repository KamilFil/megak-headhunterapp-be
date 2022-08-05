import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HrUser } from '../hr-user/hr-user.entity';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';

@Injectable()
export class AdminService {
  async createHrByAdmin(query: HrUser) {
    const existingHr = await HrUser.findOne({ where: { email: query.email } });
    if (existingHr) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      query.email === null ||
      query.email === '' ||
      query.email === undefined
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No email attached',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      query.fullName === null ||
      query.fullName === '' ||
      query.fullName === undefined
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No fullName attached',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      query.company === null ||
      query.company === '' ||
      query.company === undefined
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No company attached',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hr = new HrUser();
    hr.id = query.id;
    hr.email = query.email;
    hr.fullName = query.fullName;
    hr.company = query.company;
    hr.maxReservedStudents = query.maxReservedStudents;
    await hr.save();

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        error: 'User successfully added',
      },
      HttpStatus.ACCEPTED,
    );
  }

  async uploadNewUsersList(files: MulterDiskUploadedFiles) {
    const usersList = files?.list?.[0] ?? null;

    const filePath = path.join(storageDir(), 'users-list', usersList.filename);

    const fileExt = path.extname(filePath);

    try {
      if (!usersList) {
        throw new HttpException(
          {
            status: HttpStatus.NO_CONTENT,
            error: 'No file attached',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      if (fileExt !== '.json') {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('Cannot delete file after action', err);
          }
        });
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'Bad file extension',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.log(`Error: ${err}`);
          return;
        }

        const parsedUsersList = JSON.parse(data);
        for (const newUser of parsedUsersList) {
          console.log(newUser.role);
        }
      });

      fs.unlink(
        filePath,(err) => {
          if (err) {
            console.log('Cannot delete file after action',err);
          }else{
            console.log('Files uploaded');
          }
        },
      );
    } catch (e) {
      // fs.unlink(filePath, (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      // });
      // throw e;
    }

    return {
      name: '',
      surname: '',
      age: 0,
      email: 'test@wewo.com',
    };
  }
}
