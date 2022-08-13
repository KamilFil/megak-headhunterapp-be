import { Role } from '../auth/role.enum';

export interface HrEntity {
  email: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}

export interface HrEntityExtended extends HrEntity {
  id?: string;
  pwdHash: string;
  currentTokenId: string | null;
  roles: Role;
}