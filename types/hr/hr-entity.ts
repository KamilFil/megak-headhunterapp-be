export interface HrEntity {
  email: string;
  pwdHash: string;
  currentTokenId: string | null;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}
