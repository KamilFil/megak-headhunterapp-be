import { Role } from 'types/auth/role.enum';

export class AuthLoginDto {
  email: string;
  pwd: string;
}

export class AuthLoginRes {
  id: string;
  email: string;
  roles: Role;
  currentTokenId: string;
  save?: () => void;
}
