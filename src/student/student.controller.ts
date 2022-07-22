import {Controller, Get, Inject, Param} from '@nestjs/common';
import {StudentService} from "./student.service";
import {GetStudentUserResponse} from "../../types";

@Controller('student')
export class StudentController {
    constructor(
        @Inject(StudentService) private studentService: StudentService
    ) {
    }

    @Get('/:id')
    async getStudentUser(
        @Param('id') id: string
    ): Promise<GetStudentUserResponse> {
        return this.studentService.getStudentUser(id);
    }
}
