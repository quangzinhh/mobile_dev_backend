import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserBelongProjectService } from 'src/user_belong_project/user_belong_project.service';
import { NotificationService } from 'src/notification/notification.service';
import { ProjectRepository } from 'src/project/project.repository';

@Injectable()
export class UserService {
  constructor(
    private userBelongProjectService: UserBelongProjectService,
    private notificationService: NotificationService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ProjectRepository) private projectRepository: ProjectRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.mCreated = new Date().toISOString();
    newUser.mModified = new Date().toISOString();

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({
      mId: id
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      mEmail: email
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = Object.assign(user, updateUserDto);
    updatedUser.mModified = new Date().toISOString();

    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
  
  async userJoinProject(userId: number, projectId: number) {
    return await this.userBelongProjectService.create({
      mUserId: userId,
      mProjectId: projectId
    });
  }

  async getNotifications(userId: number) {
    return await this.notificationService.findByUserId(userId)
  }
}