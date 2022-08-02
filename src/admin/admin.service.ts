import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HrUser } from '../hr-user/hr-user.entity';


@Injectable()
export class AdminService {
  async createHrByAdmin(query: HrUser) {
      const existingHr = await HrUser.findOne({where:{email: query.email}});
      if (existingHr){
          throw new HttpException(
              {
                  status: HttpStatus.BAD_REQUEST,
                  error: 'User already exists',
              },
              HttpStatus.BAD_REQUEST,
          );
      }

    if (query.email === null || query.email === '' || query.email === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No email attached',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (query.fullName === null || query.fullName === '' || query.fullName === undefined)  {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No fullName attached',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (query.company === null || query.company === '' || query.company === undefined) {
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

      throw new HttpException({
          status: HttpStatus.ACCEPTED,
          error: 'User succesfully added'
      },HttpStatus.ACCEPTED)
  }


}

