import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class AdminUser extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", {
        length: 100,
        unique: true,
    })
    email: string;

    @Column("varchar",{
        length: 100,
    })
    password: string;
}