import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { CvService } from './cv/cv.service';
import { SkillService } from './skill/skill.service';

async function bootstrap() {
  const standalone_app = await NestFactory.createApplicationContext(AppModule);
  const userservice = standalone_app.get(UserService);
  const skillservice = standalone_app.get(SkillService);
  const cvservice = standalone_app.get(CvService);
  for (let i = 0; i < 10; i++) {
    userservice.generateFaker();
  }
  for (let i = 0; i < 10; i++) {
    skillservice.generateFaker();
  }
  for (let i = 0; i < 10; i++) {
    cvservice.generateFaker();
  }
}
bootstrap();
