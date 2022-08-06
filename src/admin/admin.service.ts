import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HrUser } from '../hr-user/hr-user.entity';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';
import { StudentUser } from '../student/student-user.entity';
import { v4 as uuid } from 'uuid';

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

    if (query.email.indexOf('@') === -1) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email incorrect',
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

    if (query.maxReservedStudents < 1 || query.maxReservedStudents > 999) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'You can only reserve 1-999 students',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hr = new HrUser();
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
        console.log('No file attached');
      }

      if (fileExt !== '.json') {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('Cannot delete file after action', err);
          }
        });
        console.log('Bad file extension.');
      }

        fs.readFile(filePath, 'utf-8', async (err, data) => {
        if (err) {
          console.log(`Error: ${err}`);
          return;
        }

        const parsedUsersList = JSON.parse(data);

        for (const newUser of parsedUsersList) {
          try {
            const existingUserByEmail = await StudentUser.findOne({
              where: { email: newUser.email },
            });

            if (existingUserByEmail) {
              throw new Error('User with this email already exists');
            }

            const user = new StudentUser();
            user.id = uuid();
            user.email = newUser.email;
            user.courseCompletion = newUser.courseCompletion ?? 0;
            user.courseEngagment = newUser.courseEngagment ?? 0;
            user.projectDegree = newUser.projectDegree ?? 0;
            user.teamProjectDegree = newUser.teamProjectDegree ?? 0;
            user.bonusProjectUrls = newUser.bonusProjectUrls ?? [];
            await user.save();

            console.log('User successfully added');
          } catch (e) {
            console.log('User cannot be added');
          }
        }
      });

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log('Cannot delete file after action', err);
        } else {
          console.log('Files uploaded');
        }
      });
    } catch (e) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
       });
      throw e;
    }

    return {
        status: 200,
        message: 'ok'
    };
  }
}
