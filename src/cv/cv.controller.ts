import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CvService } from "./cv.service";
import { CvEntity } from "./entities/cv.entity/cv.entity";
import { AddCvDto } from "./dto/add-cv.dto";
import { UpdateCvDto } from "./dto/update-cv.dto";
import { JwtAuthGuard } from "../user/Guards/jwt-auth.guard";

@Controller('cv')
export class CvController {
  constructor(
    private  cvService:CvService
  )
  {}
  @Get()
  //@UseGuards(JwtAuthGuard)
  async getAllCvs():Promise<CvEntity[]>{
    return await this.cvService.getCvs()
  }

  @Get("stat")
  async statNombrebyage(){
    return this.cvService.statCvNumber(45)
  }
  @Get(':id')
  async getbyid(
    @Param('id') id
  ):Promise<CvEntity>{
    return await this.cvService.getByid(+id)
  }
  @Post()
  async addCv(
    @Body() addCvDto:AddCvDto
  ):Promise<CvEntity>{
    return await this.cvService.addCv(addCvDto)
  }
  @Patch('/:id')
  async updateCv(
    @Body() addCvDto:AddCvDto,
    @Param('id',ParseIntPipe) id:number
  ):Promise<CvEntity>{console.log('hereeeeeeeeeeeeeeeee')
    return await this.cvService.updateCv(id,addCvDto);
  }
  @Delete(':id')
  async remove(
    @Param('id',ParseIntPipe) id:number
  ){return this.cvService.removeCv(id)}

  @Get('recover/:id')
  async recover(@Param('id',ParseIntPipe)id:number){
    return await this.cvService.recover(id)
  }

}
