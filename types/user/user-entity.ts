import { Role } from '../auth/role.enum';

export interface UserEntity {
  id: string;
  email: string;
  roles: Role;
  firstName: string;
  lastName: string;
  githubUsername: string;
  fullName: string;
  company: string;
}
