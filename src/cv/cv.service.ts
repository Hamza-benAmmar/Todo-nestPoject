import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { User } from '../user/entities/user.entity';
import {
  randFirstName,
  randFullAddress,
  randJobTitle,
  randLastName,
  randNumber,
} from '@ngneat/falso';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}

  async generateFaker() {
    const cv = {
      name: randLastName(),
      firstName: randFirstName(),
      age: randNumber({ min: 18, max: 60 }),
      cin: randNumber({ min: 10000000, max: 99999999 }),
      job: randJobTitle(),
      path: randFullAddress(),
      user: null,
      skills: [],
    };
    const users = await this.userRepository.find({
      select: ['id'],
    });
    const skills = await this.skillRepository.find({
      select: ['id'],
    });
    cv.skills.push(skills[Math.floor(Math.random() * skills.length)]);
    cv.user = users[Math.floor(Math.random() * users.length)];
    this.cvRepository.save(cv);
  }
  async create(createCvDto: CreateCvDto) {
    //est ce que lezemni naamil kol mara create Skill / user ken mehouch mawjoud aandi ?
    /*const { user, skills } = createCvDto;
    const { id } = user;
    if (user) {
      if (!id) {
        this.userRepository.save(user);
      } else {
        if (!(await this.userRepository.findOneBy({ id }))) {
          throw new BadRequestException(
            'the id for a new user is auto generated',
          );
        }
      }
    }
    if (skills) {
      for (let skill of skills) {
        if (skill.id) {
          let { id, designation } = skill;
          if (!(await this.skillRepository.findOneBy({ id }))) {
            console.log(designation, 'from inside of bad request');
            throw new BadRequestException('skillId is autogenerated');
          }
        }
        this.skillRepository.save(skill);
      }
    }*/
    return await this.cvRepository.save(createCvDto);
  }

  findAll() {
    return this.cvRepository.find();
  }

  findOne(id: string) {
    return this.cvRepository.findOneBy({ id });
  }

  async update(id: string, updateCvDto: UpdateCvDto) {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException('todo not found');
    } else {
      await this.cvRepository.update({ id }, updateCvDto);
      return {
        message: 'updated successfully',
        cv,
      };
    }
  }

  async remove(id: string) {
    const cv = await this.cvRepository.findOne({ where: { id } });
    if (!cv) {
      throw new NotFoundException('todo not found');
    }
    await this.cvRepository.delete(id);
    return {
      message: 'cv removed successfully',
    };
  }
}
