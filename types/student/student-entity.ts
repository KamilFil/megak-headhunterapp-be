export interface StudentEntity {
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls: string;
  projectUrls: string;
  bio: string;
  expectedTypeWork: string;
  targetWorkCity: string;
  expectedContractType: string;
  expectedSalary: number;
  canTakeApprenticeship: string;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
  active: boolean;
}

export enum expectedTypeWork {
  Stationary = 'Na miejscu',
  ReadyToMove = 'Gotowość do przeprowadzki',
  Remote = 'Wyłącznie zdalnie',
  Hybrid = 'Hybrydowo',
  DoesntMatter = 'Bez znaczenia'
}

export enum expectedContractType {
  UoP = 'Tylko UoP',
  B2B = 'Możliwe B2B',
  UZ = 'Możliwe UZ/UoD',
  NoPreferences = 'Brak Preferencji',
}

export enum isHired {
  Available = 'Dostępny',
  Interviewed = 'W trakcie rozmowy',
  Hired = 'Zatrudniony'

}