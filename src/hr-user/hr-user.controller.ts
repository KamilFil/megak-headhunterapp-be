import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch, Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HrUserService } from './hr-user.service';
import { StudentUser } from '../student/student-user.entity';
import {
  GetStudentUserResponse,
  StudentEntity, StudentEntityFilters,
  UpdateHireStatusResponse,
} from '../../types';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../types/auth/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Roles(Role.Hr)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('hr-user')
export class HrUserController {
  constructor(@Inject(HrUserService) private hrUserService: HrUserService) {}

  @Roles(Role.Hr)
  @Get('/')
  getAllStudents(): Promise<StudentUser[]> {
    return this.hrUserService.getAllStudents();
  }
  @Roles(Role.Hr)
  @Get('/call-list/:hrId')
  getAllStudentsToCall(@Param('hrId') hrId: string): Promise<StudentUser[]> {
    return this.hrUserService.getStudentsToCall(hrId);
  }

  @Roles(Role.Hr)
  @Post('/users/filter')
  filterAllStudents(@Body() body: StudentEntityFilters) {
    return this.hrUserService.filterAllStudents(body);
  }

  @Roles(Role.Hr)
  @Patch('/call/:hrId/:studentId')
  setUserStatusToInterviewed(
    @Param('hrId') hrId: string,
    @Param('studentId') studentId: string,
  ): Promise<UpdateHireStatusResponse> {
    return this.hrUserService.setUserStatusToInterviewed(hrId, studentId);
  }

  @Roles(Role.Hr)
  @Get('/student-cv/:hrId/:studentId')
  getStudentCv(
    @Param('studentId') studentId: string,
    @Param('hrId') hrId: string,
  ): Promise<GetStudentUserResponse> {
    return this.hrUserService.getStudentCv(hrId, studentId);
  }

  @Patch('/hired/:hrId/:studentId')
  @Roles(Role.Hr)
  setUserStatusToHired(
    @Param('hrId') hrId: string,
    @Param('studentId') studentId: string,
  ): Promise<UpdateHireStatusResponse> {
    return this.hrUserService.setUserStatusToHired(hrId, studentId);
  }

  @Patch('/not-interested/:hrId/:studentId')
  @Roles(Role.Hr)
  setUserStatusToAvailable(
    @Param('hrId') hrId: string,
    @Param('studentId') studentId: string,
  ): Promise<UpdateHireStatusResponse> {
    return this.hrUserService.setUserStatusToAvailable(hrId, studentId);
  }
}
