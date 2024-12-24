import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserRepository } from 'src/user/user.repository';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(NotificationRepository) private notificationRepository: NotificationRepository
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const user = await this.userRepository.findOne({
      where: {
        mId: createNotificationDto.mUserId
      }
    })
    if(!user) {
      throw new BadRequestException(`User ${createNotificationDto.mUserId} is not exist`)
    }

    let newNotification = this.notificationRepository.create({
      mUserId: createNotificationDto.mUserId,
      mTitle: createNotificationDto.mTitle,
      mContent: createNotificationDto.mContent,
      mCreated: new Date().toISOString()
    })

    return await this.notificationRepository.save(newNotification)
  }

  async findAll() {
    return await this.notificationRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async findByUserId(userId: number) {
    return await this.notificationRepository.find({
      where: {
        mUserId: userId
      }
    })
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
