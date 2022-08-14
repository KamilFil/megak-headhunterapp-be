import { Role } from '../auth/role.enum';

export interface HrEntity {
  id?: string;
  email: string;
  pwdHash: string;
  currentTokenId: string | null;
  roles: Role.Hr;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}
