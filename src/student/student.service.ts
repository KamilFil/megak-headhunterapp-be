import {Injectable} from '@nestjs/common';
import {StudentUser} from "./student-user.entity";
import {hireStatus} from "../../types";


@Injectable()
export class StudentService {
    async getStudentUser(id: string) {
        return await StudentUser.findOneOrFail({where: {id}})
    }

    async updateStudentUser(id: string, updatedStudent: StudentUser) {
        await StudentUser.update(id, updatedStudent);

        return await StudentUser.findOneOrFail({where: {id}})
    }

    async updateHireStatus(id: string) {
        const user = await StudentUser.findOneOrFail({where: {id}})

        if(user.hireStatus !== hireStatus.Interviewed) {
            return {message: 'Cannot change hire status.'}
        }

        user.hireStatus = hireStatus.Hired

        await StudentUser.update(id, user);

        return user;
    }
}
