import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import {
  GetStudentUserResponse,
  UpdateHireStatusResponse,
  UpdateStudentUserResponse,
} from 'types';
import { StudentUser } from './student-user.entity';
import { Roles } from '../decorators/roles.decorator';
import { Role } from 'types/auth/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}
  @Get('/:id')
  @Roles(Role.Hr, Role.Student)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getStudentUser(@Param('id') id: string): Promise<GetStudentUserResponse> {
    return this.studentService.getStudentUser(id);
  }

  @Patch('/:id')
  @Roles(Role.Student)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateStudentUser(
    @Param('id') id: string,
    @Body() updatedStudent: StudentUser,
  ): Promise<UpdateStudentUserResponse> {
    return this.studentService.updateStudentUser(id, updatedStudent);
  }

  @Patch('/hired/:id')
  @Roles(Role.Hr)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateHireStatus(@Param('id') id: string): Promise<UpdateHireStatusResponse> {
    return this.studentService.setStudentStatusToHired(id);
  }

  @Patch('activate/:id')
  @Redirect('http://localhost:3000/')
  updateIsActive(@Param('id') id: string) {
    return this.studentService.setStudentAccountToActive(id);
  }
}
