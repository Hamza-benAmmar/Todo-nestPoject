import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  create(@Body() createSkillDto: CreateSkillDto, @Req() req: Request) {
    return this.skillService.create(req.body);
  }
  /*@Get('faker')
  generatefakers() {
    return this.skillService.generatefakers();
  }*/

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get(':id')
  async findOne(@Param() payload) {
    const { id } = payload;
    return this.skillService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @Req() req: Request,
  ) {
    return this.skillService.update(id, req.body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.remove(id);
  }
}
