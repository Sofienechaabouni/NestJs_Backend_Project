import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CvEntity } from "./entities/cv.entity/cv.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddCvDto } from "./dto/add-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository:Repository<CvEntity>
  ){}
 async getCvs():Promise<CvEntity[]>{
    return  await this.cvRepository.find()
 }
  async addCv(cv:AddCvDto):Promise<CvEntity>{
    return await this.cvRepository.save(cv);
  }
  async updateCv(id:number ,cv:UpdateCvDto):Promise<CvEntity>{
    const newCv=await this.cvRepository.preload({
      id   ,
      ...cv
    })
    if(!newCv){
      throw new NotFoundException('le cv didi nexiste pas ');
    }

    return await this.cvRepository.save(newCv);
  }
  async removeCv(id:number){

    return await this.cvRepository.softDelete(id)//ou bien remove tout court ou bien delete(id)
  }
  async recover(id:number){

    return await this.cvRepository.restore(id)//ou bien remove tout court ou bien delete(id)
  }
  async statCvNumber(maxAge:number){
const qb =this.cvRepository.createQueryBuilder("cv");
 qb.select("cv.age,count(cv.id) as nombreDeCv ")
  .groupBy("cv.age")
   .where("cv.age<:maxAge")
   .setParameters({maxAge});
  console.log(qb.getSql());
    return await qb.getRawMany();
  }
  async getByid(id:number){
    const newCv=await this.cvRepository.findOneBy({id})
    if(newCv)
    {return newCv}
    else {
      throw new NotFoundException("le cv didi nexiste pas ");
    }
}}
