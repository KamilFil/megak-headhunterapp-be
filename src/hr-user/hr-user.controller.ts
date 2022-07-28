import {Controller, Get, Inject, Param, Patch} from '@nestjs/common';
import {HrUserService} from "./hr-user.service";
import {StudentUser} from "../student/student-user.entity";
import {GetStudentUserResponse, UpdateHireStatusResponse} from "../../types";

@Controller('hr-user')
export class HrUserController {
    constructor(
        @Inject(HrUserService) private hrUserService: HrUserService
    ) {
    }

    @Get('/call-list/:hrId')
    getAllStudentsToCall(
        @Param('hrId') hrId: string
    ): Promise<StudentUser[]> {
        return this.hrUserService.getStudentsToCall(hrId);
    }

    @Get('/student-cv/:studentId')
    getStudentCv(
        @Param('studentId') studentId: string
    ): Promise<GetStudentUserResponse> {
        return this.hrUserService.getStudentCv(studentId)
    }

    @Patch('/hired/:hrId/:studentId')
    setUserStatusToHired(
        @Param('hrId') hrId: string,
        @Param('studentId') studentId: string
    ): Promise<UpdateHireStatusResponse> {
        return this.hrUserService.setUserStatusToHired(hrId, studentId);
    }

    @Patch('/not-interested/:hrId/:studentId')
    setUserStatusToAvailable(
        @Param('hrId') hrId: string,
        @Param('studentId') studentId: string
    ): Promise<UpdateHireStatusResponse> {
        return this.hrUserService.setUserStatusToAvailable(hrId, studentId);
    }
}
