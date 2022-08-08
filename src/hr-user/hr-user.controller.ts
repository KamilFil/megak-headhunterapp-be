import {
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HrUserService } from './hr-user.service';
import { StudentUser } from '../student/student-user.entity';
import {
  GetStudentUserResponse,
  StudentEntity,
  UpdateHireStatusResponse,
} from '../../types';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../types/auth/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('hr-user')
export class HrUserController {
  constructor(@Inject(HrUserService) private hrUserService: HrUserService) {}

  @Get('/')
  @Roles(Role.Hr)
  getAllStudents(): Promise<StudentUser[]> {
    return this.hrUserService.getAllStudents();
  }

  @Get('/call-list/:hrId')
  @Roles(Role.Hr)
  getAllStudentsToCall(@Param('hrId') hrId: string): Promise<StudentUser[]> {
    return this.hrUserService.getStudentsToCall(hrId);
  }

  @Get('/call-list')
  @Roles(Role.Hr)
  filterAllStudents(@Query() query: StudentEntity) {
    return this.hrUserService.filterAllStudents(query);
  }

  @Patch('/call/:hrId/:studentId')
  @Roles(Role.Hr)
  setUserStatusToInterviewed(
    @Param('hrId') hrId: string,
    @Param('studentId') studentId: string,
  ): Promise<UpdateHireStatusResponse> {
    return this.hrUserService.setUserStatusToInterviewed(hrId, studentId);
  }

  @Get('/student-cv/:hrId/:studentId')
  @Roles(Role.Hr)
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
