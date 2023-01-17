import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntities } from "../../../Generics/timestamp.entities";
import { CvEntity } from "../../../cv/entities/cv.entity/cv.entity";
import { UserRoleEnum } from "../../../enums/user-role.enum";

@Entity('user')
export class UserEntity extends TimestampEntities{
  @PrimaryGeneratedColumn()
  id:number;
  @Column({length:50,unique:true})
  username:string;
  @Column({length:50,unique:true})
  email:string;
  @Column()
  password:string;
  @Column()
  salt:string;
  @Column({type:'enum',enum:UserRoleEnum,default:UserRoleEnum.USER})
  role:string;
  @ManyToOne(
    type=>CvEntity,
    (cv)=>cv.user,
    {
      nullable: true,
      cascade: true
    }
  )
    cvs:CvEntity[];
}
