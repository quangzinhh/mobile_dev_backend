import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserBelongProjectDto } from './dto/create-user_belong_project.dto';
import { UpdateUserBelongProjectDto } from './dto/update-user_belong_project.dto';
import { UserBelongProjectRepository } from './user_belong_project.repository';
import { UserRepository } from 'src/user/user.repository';
import { ProjectRepository } from 'src/project/project.repository';

@Injectable()
export class UserBelongProjectService {
  constructor(
    @InjectRepository(ProjectRepository) private projectRepository: ProjectRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(UserBelongProjectRepository) private userBelongProjectRepository: UserBelongProjectRepository
  ) {}

  async create(createUserBelongProjectDto: CreateUserBelongProjectDto) {
    let existMapping = await this.userBelongProjectRepository.findOne({
      where: {
        mUserId: createUserBelongProjectDto.mUserId,
        mProjectId: createUserBelongProjectDto.mProjectId
      }
    })

    if(existMapping) {
      throw new BadRequestException(`User is belonged to this project`);
    }

    const user = await this.userRepository.findOne({
      where: {
        mId: createUserBelongProjectDto.mUserId
      }
    })
    const project = await this.projectRepository.findOne({
      where: {
        mId: createUserBelongProjectDto.mProjectId
      }
    })
    if(!user || !project) {
      throw new NotFoundException(`User or Project is invalid`);
    }

    let mapping = this.userBelongProjectRepository.create({
      mProjectId: createUserBelongProjectDto.mProjectId,
      mUserId: createUserBelongProjectDto.mUserId,
      mCreated: new Date().toISOString()
    })

    return await this.userBelongProjectRepository.save(mapping)
  }

  async findAll() {
    return await this.userBelongProjectRepository.find();
  }

  async findByProjectId(projectId: number) {
    return await this.userBelongProjectRepository.find({
      where: {
        mProjectId: projectId
      }
    });
  }

  async findByUserId(userId: number) {
    return await this.userBelongProjectRepository.find({
      where: {
        mUserId: userId
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userBelongProject`;
  }

  update(id: number, updateUserBelongProjectDto: UpdateUserBelongProjectDto) {
    return `This action updates a #${id} userBelongProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBelongProject`;
  }
}
