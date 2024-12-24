import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserRepository } from 'src/user/user.repository';
import { NotificationRepository } from './notification.repository';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, UserRepository],
  exports: [NotificationService]
})
export class NotificationModule {}
