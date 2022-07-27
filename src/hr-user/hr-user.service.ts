import {Inject, Injectable} from '@nestjs/common';
import {StudentService} from 'src/student/student.service';
import {StudentUser} from "../student/student-user.entity";
import {hireStatus} from "../../types";
import {ValidationError} from "../utils/errors";
import {HrUser} from "./hr-user.entity";

@Injectable()
export class HrUserService {
    constructor(
        @Inject(StudentService) private studentService: StudentService
    ) {
    }

    async getAllStudents() {
        return await StudentUser.find()
    }

    async getStudentsToCall(id) {
        return await StudentUser.find({
            where: {hr: {id}},
        })
    }

    async getStudentCv(hrId: string, studentId: string) {
        return await StudentUser.findOne({where: {
                id: studentId,
                hr: {id: hrId}
            }});
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
        student.hr = null
        student.hireStatus = hireStatus.Available;

        await StudentUser.update(studentId, student);

        return student;
    }

    async setUserStatusToInterviewed(hrId: string, studentId: string) {
        const student = await StudentUser.findOne({where: {id: studentId}})
        const hr = await HrUser.findOne({where: {id: hrId}})

        if (student.hireStatus !== hireStatus.Available) {
            throw new ValidationError('Cannot change hire status.')
        }

        student.hr = hr
        student.hireStatus = hireStatus.Interviewed

        await StudentUser.update(studentId, student)

        return student;
    }

    async filterAllStudents(query) {
        return await StudentUser.find({where: {
                expectedTypeWork: query.expectedTypeWork,
                expectedContractType: query.expectedContractType,
                expectedSalary: query.expectedSalary,
                canTakeApprenticeship: query.canTakeApprenticeship,
                monthsOfCommercialExp: query.monthsOfCommercialExp,
            }})
    }

    setUserStatusToHired(studentId: string) {
        return this.studentService.updateHireStatus(studentId);
    }
}
