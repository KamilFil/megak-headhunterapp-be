export interface StudentEntity {
  email: string;
  role: role.User;
  tel: string | null;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls: string[];
  projectUrls: string[];
  bio: string;
  expectedTypeWork: string;
  targetWorkCity: string;
  expectedContractType: string;
  expectedSalary: number | null;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string | null;
  workExperience: string | null;
  courses: string | null;
  isActive: boolean;
  hireStatus: string;
}

export enum role {
  Admin = 0,
  Hr = 1,
  User = 2,
}

export enum expectedTypeWork {
  Stationary = 'Na miejscu',
  ReadyToMove = 'Gotowość do przeprowadzki',
  Remote = 'Wyłącznie zdalnie',
  Hybrid = 'Hybrydowo',
  Irrelevant = 'Bez znaczenia',
}

export enum expectedContractType {
  UoP = 'Tylko UoP',
  B2B = 'Możliwe B2B',
  UZ = 'Możliwe UZ/UoD',
  Irrelevant = 'Brak Preferencji',
}

export enum hireStatus {
  Available = 'Dostępny',
  Interviewed = 'W trakcie rozmowy',
  Hired = 'Zatrudniony',
}

export type GetStudentUserResponse = StudentEntity;

export type UpdateStudentUserResponse = StudentEntity;

export type UpdateHireStatusResponse = StudentEntity | { message: string };
