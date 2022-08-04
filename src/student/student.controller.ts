import { Body, Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { StudentService } from './student.service';
import {
  GetStudentUserResponse,
  UpdateHireStatusResponse,
  UpdateStudentUserResponse,
} from '../../types';
import { StudentUser } from './student-user.entity';

@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/:id')
  getStudentUser(@Param('id') id: string): Promise<GetStudentUserResponse> {
    return this.studentService.getStudentUser(id);
  }

  @Patch('/:id')
  updateStudentUser(
    @Param('id') id: string,
    @Body() updatedStudent: StudentUser,
  ): Promise<UpdateStudentUserResponse> {
    return this.studentService.updateStudentUser(id, updatedStudent);
  }

  @Patch('/hired/:id')
  updateHireStatus(@Param('id') id: string): Promise<UpdateHireStatusResponse> {
    return this.studentService.setStudentStatusToHired(id);
  }
}
