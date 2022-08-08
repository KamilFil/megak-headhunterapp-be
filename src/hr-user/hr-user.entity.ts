import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentUser } from '../student/student-user.entity';
import { StudentEntity } from '../../types';

@Entity()
export class HrUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 150,
  })
  email: string;

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
