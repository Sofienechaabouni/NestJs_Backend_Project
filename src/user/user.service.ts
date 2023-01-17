import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserSubscribeDto } from "./dto/user-subscribe.dto";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt'
import { LoginCredentialsDto } from "./dto/login-credentials.dto";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository:Repository<UserEntity>,
    private jwtService:JwtService
  ){}
  async  subscribe(userData:UserSubscribeDto): Promise<UserEntity>{
    const {username,password,email}=userData;
    const user=this.userRepository.create({username,password,email});
    user.salt= await  bcrypt.genSalt();
    user.password= await bcrypt.hash(user.password,user.salt);
    try{
       await this.userRepository.save(user);
    }
    catch(e){
      throw new ConflictException("le username et le password doivent etre uniques")
    }

    return user;
  }
async login(credentials:LoginCredentialsDto)
{
  //recuperer le login et le mdp
  const {username,password}=credentials;
  //verifier sil ya un user avec ce login ou ce mdp
  const user=await this.userRepository.createQueryBuilder('user')
    .where('user.username=:username')
    .setParameters({username})
    .getOne();
  if(!user){
    throw new NotFoundException("not found")
  }
  const hashedPassword= await bcrypt.hash(password,user.salt);
  if(hashedPassword===user.password){
    const payload= {
      username,
      email:user.email,
      role:user.role
    }
    const jwt=  await this.jwtService.sign(payload);
    return {
      "access_token":jwt
    }
  }else{
    throw new NotFoundException("not found")
  }
}

}
