import { Injectable } from '@nestjs/common';
import {StudentUser} from "./student-user.entity";


@Injectable()
export class StudentService {
    async getStudentUser(id: string) {
        return await StudentUser.findOneOrFail({where: {id}})
    }

    async updateStudentUser(id: string, updatedStudent: StudentUser) {
        await StudentUser.update(id, updatedStudent);

        return await StudentUser.findOneOrFail({where: {id}})
    }
}
