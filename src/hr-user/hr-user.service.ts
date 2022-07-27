import {Inject, Injectable} from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import {StudentUser} from "../student/student-user.entity";

@Injectable()
export class HrUserService {
    constructor(
        @Inject(StudentService) private studentService: StudentService
    ) {
    }

    async getStudentsToCall(id) {
        return await StudentUser.find({where: {hr: id}})
    }

    async getStudentCv(studentId: string) {
        return await this.studentService.getStudentUser(studentId);
    }

    setUserStatusToHired(studentId: string) {
        return this.studentService.setStudentStatusToHired(studentId);
    }

    setUserStatusToAvailable(studentId: string) {
        return this.studentService.setStudentStatusToAvailable(studentId);
    }
}
