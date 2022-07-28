import {Inject, Injectable} from '@nestjs/common';
import {StudentService} from 'src/student/student.service';
import {StudentUser} from "../student/student-user.entity";
import {hireStatus} from "../../types";
import {ValidationError} from "../utils/errors";

@Injectable()
export class HrUserService {
    constructor(
        @Inject(StudentService) private studentService: StudentService
    ) {
    }

    async getStudentsToCall(id) {
        return await StudentUser.find({
            where: {hr: {id}},
        })
    }

    async getStudentCv(studentId: string) {
        return await this.studentService.getStudentUser(studentId);
    }

    async setUserStatusToHired(hrId: string, studentId: string) {
        const student = await StudentUser.findOne({where: {id: studentId}})

        if (hrId !== student.hr.id || student.hireStatus !== hireStatus.Interviewed) {
            throw new ValidationError('Cannot change hire status.')
        }

        return await this.studentService.setStudentStatusToHired(studentId);
    }

    async setUserStatusToAvailable(hrId: string, studentId: string) {
        const student = await StudentUser.findOne({where: {id: studentId}})

        if (hrId !== student.hr.id || student.hireStatus !== hireStatus.Interviewed) {
            throw new ValidationError('Cannot change hire status.')
        }

        return await this.studentService.setStudentStatusToAvailable(studentId);
    }

    setUserStatusToInterviewed(hrId: string, studentId: string) {
        return Promise.resolve(undefined);
    }
}
