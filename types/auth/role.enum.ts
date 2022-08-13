import {StudentUser} from "../../src/student/student-user.entity";
import {HrUser} from "../../src/hr-user/hr-user.entity";
import {AdminUser} from "../../src/admin/admin.entity";
import {Response} from "express";

export enum Role {
  Student = 'student',
  Admin = 'admin',
  Hr = 'hr',
}

export type getUserByCurrentTokenIdResponse = StudentUser | HrUser | AdminUser | Response;