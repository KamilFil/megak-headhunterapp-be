import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { HrUser } from '../hr-user/hr-user.entity';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';
import { StudentUser } from '../student/student-user.entity';
import { v4 as uuid } from 'uuid';
import * as SendGrid from "@sendgrid/mail";
import {SEND_GRID_KEY} from "../config/mailer.config";



@Injectable()
export class AdminService {

  async createHrByAdmin(query: HrUser) {
    const existingHr = await HrUser.findOne({where: {email: query.email}});
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
        return {
          status: HttpStatus.NO_CONTENT,
          messgae: 'No file attached',
        };
      }

      if (fileExt !== '.json') {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('Cannot delete file after action', err);
          }
        });
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Bad file extension',
        };
      }

      fs.readFile(filePath, 'utf-8', async (err, data) => {
        if (err) {
          console.log(`Cannot read file`);
          return;
        }

        const parsedUsersList = JSON.parse(data);

        for (const newUser of parsedUsersList) {
          const existingUserByEmail = await StudentUser.findOne({
            where: {email: newUser.email},
          });

          if (newUser.email.indexOf('@') === -1) {
            console.log('Bad email format');
            continue;
          }
          if (newUser.courseCompletion < 0 || newUser.courseCompletion > 5) {
            console.log('Degree must be in 0-5');
            continue;
          }

          if (newUser.courseEngagment < 0 || newUser.courseEngagment > 5) {
            console.log('Degree must be in 0-5');
            continue;
          }

          if (newUser.projectDegree < 0 || newUser.projectDegree > 5) {
            console.log('Degree must be in 0-5');
            continue;
          }

          if (newUser.teamProjectDegree < 0 || newUser.teamProjectDegree > 5) {
            console.log('Degree must be in 0-5');
            continue;
          }


          if (existingUserByEmail) {
            const existingUserId = existingUserByEmail.id;
            console.log(existingUserId);
            await StudentUser.createQueryBuilder()
                .update()
                .set({
                  courseCompletion: newUser.courseCompletion,
                  courseEngagement: newUser.courseEngagement,
                  projectDegree: newUser.projectDegree,
                  teamProjectDegree: newUser.teamProjectDegree,
                  bonusProjectUrls: newUser.bonusProjectUrls,
                })
                .where("id = :id", {id: existingUserId})
                .execute()
            console.log(`User: ${existingUserId} was updated`);
            continue;
          }

          const user = new StudentUser();
          user.id = uuid();
          user.email = newUser.email;
          user.courseCompletion = newUser.courseCompletion ?? 0;
          user.courseEngagement = newUser.courseEngagement ?? 0;
          user.projectDegree = newUser.projectDegree ?? 0;
          user.teamProjectDegree = newUser.teamProjectDegree ?? 0;
          user.bonusProjectUrls = newUser.bonusProjectUrls ?? [];
          await user.save();

          //dodanie generowania hasła, zapis jego haszu do bazy
          const pwdHash = 'haslo12345';
          //Dodanie endpointu do aktywowania konta usera
          const activationLink  = `https:localhost:3001/activate/${user.id}`;
          const htmlContent = `Twój login to <strong>${newUser.email}</strong></br>Twoje hasło to: ${pwdHash}</br>Aby aktywować swoje konto, kliknij <strong><a href="${activationLink}">tutaj</a></strong>`;
          await this.send(newUser.email,htmlContent);
          //return {status: HttpStatus.ACCEPTED, message: 'User successfully added'}
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
      status: HttpStatus.ACCEPTED,
      message: `Dodano lub zaktualizowano wszystkich użytkowników z pliku`,
    };
  }

  async send(mailReceiver: string,htmlContent: string) {

    const sgMail = SendGrid;
    //const href = '<a href="https://platforma.megak.pl">Link aktywacyjny</a>';
    sgMail.setApiKey(SEND_GRID_KEY);
    const msg = {
      to: mailReceiver, // Change to your recipient
      from: 'g14bonus@int.pl', // Change to your verified sender
      subject: 'Zaproszenie do portalu',
      text: 'Witaj na platformie rekrutacyjnej!',
      html: htmlContent,
    };
    await sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.error(error);
        });
  }
}

