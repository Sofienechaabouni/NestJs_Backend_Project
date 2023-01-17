import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TimestampEntities } from "../../../Generics/timestamp.entities";
import { UserEntity } from "../../../user/entities/user.entity/user.entity";

@Entity('cv')
export class CvEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id:number;
  @Column({
    name: 'name',
    length: 50
  })
  name: string;

  @Column({
    length: 50
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;
  @ManyToOne(
    type=>UserEntity,
    (user)=>user.cvs,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      eager: true
    }
  )
  user:UserEntity;
}
