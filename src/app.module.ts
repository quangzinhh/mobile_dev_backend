import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DepartmentModule } from './department/department.module';
import { UserManageDepartmentModule } from './user_manage_department/user_manage_department.module';
import { FormModule } from './form/form.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { ResponseModule } from './response/response.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    DepartmentModule,
    UserManageDepartmentModule,
    FormModule,
    QuestionModule,
    OptionModule,
    ResponseModule,
    AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}