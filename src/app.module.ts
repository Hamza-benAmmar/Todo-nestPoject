import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/entities/todo.entity/todo.entity';
import { AuthMiddleware } from './middlewares/authentication.middleware';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';
import { Cv } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hamza',
      database: 'todolist',
      entities: [TodoEntity, Cv, User, Skill],
      synchronize: true,
    }),
    TodoModule,
    JwtModule.register({
      global: true,
      secret: 'hamza13072001',
      signOptions: { expiresIn: '3600s' },
    }),
    CommonModule,
    UserModule,
    CvModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'todo/add',
        method: RequestMethod.POST,
      },
      {
        path: 'todo/:id',
        method: RequestMethod.PATCH,
      },
      {
        path: 'todo/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: 'todo/soft/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
