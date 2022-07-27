import {Controller, Get, Inject, Param, Patch} from '@nestjs/common';
import {HrUserService} from "./hr-user.service";
import {StudentUser} from "../student/student-user.entity";
import {UpdateHireStatusResponse} from "../../types";

@Controller('hr-user')
export class HrUserController {
    constructor(
        @Inject(HrUserService) private hrUserService: HrUserService
    ) {
    }

    @Get('/:id')
    getAllStudentsToCall(
        @Param('id') id: string
    ): Promise<StudentUser[]> {
        return this.hrUserService.getStudentsToCall(id);
    }

    @Get('/:studentId')
    getStudentCv(
        @Param('studentId') studentId: string
    ): Promise<StudentUser> {
        return this.hrUserService.getStudentCv(studentId)
    }

    @Patch('/hired/:id')
    setUserStatusToHired(
        @Param('studentId') studentId: string
    ): Promise<UpdateHireStatusResponse> {
        return this.setUserStatusToHired(studentId);
    }
}
