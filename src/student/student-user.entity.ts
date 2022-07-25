import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { expectedContractType, expectedTypeWork, hireStatus } from "types";
import {HrUser} from "../hr-user/hr-user.entity";

@Entity()
export class StudentUser extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", {
        length: 100,
        unique: true,
    })
    email: string;

    @Column('varchar', {
        length: 16,
        nullable: true
    })
    tel: string | null;

    @Column("varchar", {
        length: 16
    })
    firstName: string;

    @Column("varchar", {
        length: 28
    })
    lastName: string

    @Column("varchar", {
        unique: true
    })
    githubUsername: string;

    @Column('simple-array', {
        nullable: true
    })
    portfolioUrls: string[] | null;

    @Column('simple-array')
    projectUrls: string[] = [];

    @Column('text')
    bio: string

    @Column('enum', {
        enum: expectedTypeWork,
        default: expectedTypeWork.Irrelevant,
    })
    expectedTypeWork: expectedTypeWork;

    @Column('varchar', {
        length: 58
    })
    targetWorkCity: string;

    @Column('enum', {
        enum: expectedContractType,
        default: expectedContractType.Irrelevant
    })
    expectedContractType: expectedContractType;

    @Column("float", {
        precision: 7,
        scale: 2,
        nullable: true
    })
    expectedSalary: number | null;

    @Column("boolean", {
        default: false
    })
    canTakeApprenticeship: boolean;

    @Column('int', {
        default: 0
    })
    monthsOfCommercialExp: number;

    @Column("text", {
        nullable: true
    })
    education: string | null;

    @Column("text", {
        nullable: true
    })
    workExperience: string | null;

    @Column("text", {
        nullable: true
    })
    courses: string | null;

    @Column({
        default: false
    })
    isActive: boolean;

    @Column("enum", {
        enum: hireStatus,
        default: hireStatus.Available
    })
    hireStatus: hireStatus;

    @ManyToOne(type => HrUser, entity => entity.studentsToCall)
    @JoinColumn()
    hr: HrUser
}