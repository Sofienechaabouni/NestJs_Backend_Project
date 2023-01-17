import { Body, Controller, Post } from "@nestjs/common";
import { UserSubscribeDto } from "./dto/user-subscribe.dto";
import { UserEntity } from "./entities/user.entity/user.entity";
import { UserService } from "./user.service";
import { LoginCredentialsDto } from "./dto/login-credentials.dto";

@Controller('user')
export class UserController {
 constructor(
   private userService:UserService
 ) {
 }
  @Post()
  register(
    @Body() userData:UserSubscribeDto
  ):Promise<UserEntity>{
    return this.userService.subscribe(userData)
  }
 @Post('/login')
 login(
   @Body() credentials:LoginCredentialsDto
 ){
  return this.userService.login(credentials)
 }
}
