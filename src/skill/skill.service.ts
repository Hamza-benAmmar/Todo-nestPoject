import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randSkill } from '@ngneat/falso';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}
  //@Inject('UUID') uuid: () => string;
  generateFaker() {
    const skill = {
      designation: randSkill(),
    };
    console.log(skill);
    this.skillRepository.save(skill);
  }
  create(createSkillDto: any) {
    return this.skillRepository.save(createSkillDto);
  }

  findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: string) {
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      throw new NotFoundException('skill not found');
    }
    return skill;
  }

  async update(id: string, updateSkillDto: any) {
    const skill = await this.findOne(id);
    const { designation } = updateSkillDto;
    const newSkill = {
      ...skill,
      designation,
    };
    console.log(newSkill);
    return this.skillRepository.save(newSkill);
  }

  async remove(id: string) {
    const skill = await this.findOne(id);
    return this.skillRepository.delete(id);
  }
}
