import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { UserBelongProjectModule } from './user_belong_project/user_belong_project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { ChatGroupModule } from './chat_group/chat_group.module';
import { ChatMemberModule } from './chat_member/chat_member.module';
import { ChatMessageModule } from './chat_message/chat_message.module';
import { NotificationModule } from './notification/notification.module';

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
    AuthModule,
    ProjectModule,
    UserBelongProjectModule,
    TaskModule,
    CommentModule,
    ChatGroupModule,
    ChatMemberModule,
    ChatMessageModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}