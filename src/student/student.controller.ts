import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import {
  GetStudentUserResponse,
  UpdateHireStatusResponse,
  UpdateStudentUserResponse,
} from '../../types';
import { StudentUser } from './student-user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles.decorator';
import { Role } from 'types/auth/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('student')
export class StudentController {
  constructor(@Inject(StudentService) private studentService: StudentService) {}

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
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
