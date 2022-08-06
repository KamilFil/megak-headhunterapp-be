import { Controller, Get, Inject, Param, Patch, Query } from '@nestjs/common';
import { HrUserService } from './hr-user.service';
import { StudentUser } from '../student/student-user.entity';
import {
  GetStudentUserResponse,
  StudentEntity,
  UpdateHireStatusResponse,
} from '../../types';

@Controller('hr-user')
export class HrUserController {
  constructor(@Inject(HrUserService) private hrUserService: HrUserService) {}

  @Get('/')
  getAllStudents(): Promise<StudentUser[]> {
    return this.hrUserService.getAllStudents();
  }

  @Get('/call-list/:hrId')
  getAllStudentsToCall(@Param('hrId') hrId: string): Promise<StudentUser[]> {
    return this.hrUserService.getStudentsToCall(hrId);
  }

  @Get('/call-list')
  filterAllStudents(@Query() query: StudentEntity) {
    return this.hrUserService.filterAllStudents(query);
  }

  @Patch('/call/:hrId/:studentId')
  setUserStatusToInterviewed(
    @Param('hrId') hrId: string,
    @Param('studentId') studentId: string,
  ): Promise<UpdateHireStatusResponse> {
    return this.hrUserService.setUserStatusToInterviewed(hrId, studentId);
  }

  @Get('/student-cv/:hrId/:studentId')
  getStudentCv(
    @Param('studentId') studentId: string,
    @Param('hrId') hrId: string,
  ): Promise<GetStudentUserResponse> {
    return this.hrUserService.getStudentCv(hrId, studentId);
  }

  @Patch('/hired/:hrId/:studentId')
  setUserStatusToHired(
    @Param('hrId') hrId: string,
    @Param('studentId') studentId: string,
  ): Promise<UpdateHireStatusResponse> {
    return this.hrUserService.setUserStatusToHired(hrId, studentId);
  }

  @Patch('/not-interested/:hrId/:studentId')
  setUserStatusToAvailable(
    @Param('hrId') hrId: string,
    @Param('studentId') studentId: string,
  ): Promise<UpdateHireStatusResponse> {
    return this.hrUserService.setUserStatusToAvailable(hrId, studentId);
  }
}
