import {Injectable} from '@nestjs/common';
import {StudentUser} from "./student-user.entity";
import {hireStatus} from "../../types";
import axios from "axios";
import {ValidationError} from "../utils/errors";


@Injectable()
export class StudentService {
    async getStudentUser(id: string) {
        return await StudentUser.findOneOrFail({where: {id}})
    }

    async updateStudentUser(id: string, updatedStudent: StudentUser) {
        /* email Validation */

        const users = await StudentUser.find()

        const emails = users.filter(user => user.id !== updatedStudent.id)
            .map(user => user.email);

        if (!updatedStudent.email.includes('@')) {
            throw new ValidationError("Email should contain '@'.")
        }

        if (emails.filter(email => email === updatedStudent.email).length) {
            throw new ValidationError(`${updatedStudent.email}: email already exist.`)
        }

        /* firstName Validation */

        if(!updatedStudent.firstName.length) {
            throw new ValidationError('firstName cannot be empty.')
        }

        /* lastName Validation */

        if(!updatedStudent.lastName.length) {
            throw new ValidationError('lastName cannot be empty.')
        }

        /* portfolioUrls Validation */

        if(!updatedStudent.portfolioUrls.length) {
            throw new ValidationError('portfolioUrls cannot be empty.')
        }

        /* gitHubUsername Validation */

        const gitHubUsernames = users.filter(user => user.id !== updatedStudent.id)
            .map(user => user.githubUsername);

        const gitHubUser = await axios.get(`https://api.github.com/users/${updatedStudent.githubUsername}`)
            .then(res => res.data)
            .catch(err => err.data)

        if(!gitHubUser) {
            throw new ValidationError(`No such GitHub user as: ${updatedStudent.githubUsername}`)
        }

        if(gitHubUsernames.filter(username => username === updatedStudent.githubUsername).length) {
            throw new ValidationError(`${updatedStudent.githubUsername}: gitHubUsername already exist.`)
        }

        /* updateStudentUser */

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
