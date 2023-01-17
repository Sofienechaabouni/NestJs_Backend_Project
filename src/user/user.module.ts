import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvEntity } from "../cv/entities/cv.entity/cv.entity";
import { UserEntity } from "./entities/user.entity/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from "@nestjs/jwt";
import * as dotenv from'dotenv';
@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
   PassportModule.register({
     defaultStrategy:'jwt'
   }),
    JwtModule.register({secret:"secret" ,
    signOptions:{expiresIn:3600}})
  ],
  controllers: [UserController],
  providers: [UserService,JwtService]
})
export class UserModule {}
