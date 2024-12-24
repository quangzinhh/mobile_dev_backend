import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './project.repository';
import { UserService } from 'src/user/user.service';
import { TaskService } from 'src/task/task.service';
import { NotificationService } from 'src/notification/notification.service';
import { UserBelongProjectService } from 'src/user_belong_project/user_belong_project.service';

@Injectable()
export class ProjectService {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private userBelongProjectService: UserBelongProjectService,
    private notificationService: NotificationService,
    @InjectRepository(ProjectRepository) private projectRepository: ProjectRepository,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const user = await this.userService.findOne(createProjectDto.mOwnerId)
    if(user) {
      let project = this.projectRepository.create({
        mName: createProjectDto.mName,
        mDescription: createProjectDto.mDescription,
        mOwnerId: createProjectDto.mOwnerId,
        mStartDate: createProjectDto.mStartDate,
        mEndDate: createProjectDto.mEndDate,
        mCreated: new Date().toISOString(),
        mModified: new Date().toISOString()
      })
      const result = await this.projectRepository.save(project);

      await this.userBelongProjectService.create({
        mUserId: createProjectDto.mOwnerId, 
        mProjectId: project.mId
      })

      return result
    }
  }

  async addPartnerToProject(userEmail: string, projectId: number) {
    let user = await this.userService.findByEmail(userEmail)
    let project = await this.projectRepository.findOne({
      where: {
        mId: projectId
      }
    })
    await this.userBelongProjectService.create({
      mUserId: user.mId, 
      mProjectId: projectId
    })
    await this.notificationService.create({
      mUserId: user.mId,
      mTitle: "Bạn đã được thêm vào project mới",
      mContent: `Chào mừng bạn đến với project ${project.mName}`
    })
    return user;
  }

  findAll() {
    return this.projectRepository.find()
  }

  findOne(id: number) {
    return this.projectRepository.findOne({
      where: {
        mId: id
      }
    })
  }

  async findMembers(projectId: number) {
    let result = []
    let mappings = await this.userBelongProjectService.findByProjectId(projectId);
    for(let mapping of mappings) {
      const user = await this.userService.findOne(mapping.mUserId)
      result.push(user)
    }
    return result
  }

  async getUserProjects(userId: number) {
    let projects = []
    let projectBelongTo = await this.userBelongProjectService.findByUserId(userId)
    for(let projectBelong of projectBelongTo) {
      const project = await this.projectRepository.findOne({
        where: {
          mId: projectBelong.mProjectId
        }
      })
      projects.push(project)
    }
    return projects
  }

  async findTask(projectId: number) {
    return await this.taskService.findByProjectId(projectId)
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
