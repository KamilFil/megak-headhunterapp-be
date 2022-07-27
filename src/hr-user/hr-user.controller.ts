import {Controller, Get, Inject, Param} from '@nestjs/common';
import {HrUserService} from "./hr-user.service";
import {StudentUser} from "../student/student-user.entity";

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
    getStudentId(
        @Param('studentId') studentId: string
    ): Promise<StudentUser> {
        return this.hrUserService.getStudentId(studentId)
    }
}
