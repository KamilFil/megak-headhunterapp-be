import { Role } from '../auth/role.enum';

export interface HrEntity {
  email: string;
  pwdHash: string;
  currentTokenId: string | null;
  roles: Role;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}
