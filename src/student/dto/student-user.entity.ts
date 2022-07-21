import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {expectedContractType, expectedTypeWork, isHired} from "../../../types";

@Entity()
export class StudentUser extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
    })
    email: string;

    @Column({
        type: "varchar",
        length: 16
    })
    tel: string | null;

    @Column({
        type: 'varchar',
        length: 16
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 28
    })
    lastName: string

    @Column({
        type: 'varchar',
        unique: true
    })
    githubUsername: string;

    @Column({
        array: true,
        nullable: true
    })
    portfolioUrls: string[] | null;

    @Column({
        array: true
    })
    projectUrls: string[] = [];

    @Column()
    bio: string

    @Column({
        type: "enum",
        enum: expectedTypeWork,
        default: expectedTypeWork.DoesntMatter,
    })
    expectedTypeWork: expectedTypeWork;

    @Column({
        type: "varchar",
        length: 58
    })
    targetWorkCity: string;

    @Column({
        type: "enum",
        enum: expectedContractType,
        default: expectedContractType.NoPreferences
    })
    expectedContractType: expectedContractType;

    @Column({
        default: 'float',
        precision: 7,
        scale: 2,
        nullable: true
    })
    expectedSalary: number | null;

    @Column({
        type: "boolean",
        default: false
    })
    canTakeApprenticeship: boolean;

    @Column({
        type: "int",
        default: 0
    })
    monthsOfCommercialExp: number;

    @Column({
        type: 'text',
        nullable: true
    })
    education: string | null;

    @Column({
        type: 'text',
        nullable: true
    })
    workExperience: string | null;

    @Column({
        type: 'text',
        nullable: true
    })
    courses: string | null;

    @Column({
        default: false
    })
    isActive: boolean;

    @Column({
        type: "enum",
        enum: isHired,
        default: isHired.Available
    })
    isHired: isHired;
}