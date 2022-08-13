import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentUser } from '../student/student-user.entity';
import { StudentEntity } from 'types';
import { Role } from 'types';

@Entity()
export class HrUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 150,
  })
  email: string;

  @Column()
  pwdHash: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column()
  roles: Role.Hr;

  @Column({
    nullable: false,
    length: 100,
  })
  fullName: string;

  @Column({
    nullable: false,
    length: 100,
  })
  company: string;

  @Column()
  maxReservedStudents: number;

  @OneToMany((type) => StudentUser, (entity) => entity.hr)
  studentsToCall: StudentEntity[];
}
