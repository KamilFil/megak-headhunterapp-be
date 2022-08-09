import { Role } from '../auth/role.enum';

export interface AdminEntity {
  email: string;
  pwdHash: string;
  role: Role.Admin;
}
