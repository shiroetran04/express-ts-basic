import { EntityBase } from "./model.base";
import {Entity,Column} from "typeorm"
@Entity()
export class UserEntity extends EntityBase {
    @Column({
        name:'username',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    public username:string| undefined
    @Column({
        name:'password',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    public password:string| undefined
    @Column({
        name:'firstName',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    public firstName:string| undefined
    @Column({
        name:'lastName',
        type: 'varchar',
        length: 255,
        nullable: false
    })
    public lastName:string| undefined
    @Column({
        name:'phoneNumber',
        type: 'varchar',
        length: 255,
        nullable: true
    })
    public phoneNumber:string| undefined
    @Column({
        name:'address',
        type: 'text',
        nullable: true
    })
    public address:string| undefined
    @Column({
        name:'email',
        type: 'varchar',
        length:255,
        nullable: false
    })
    public email:string| undefined
    @Column({
        name:"refreshToken",
        type:'text',
        default:'',
        nullable: true
    })
    public refreshToken: string | undefined
}