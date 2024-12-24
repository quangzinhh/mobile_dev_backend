import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { ProjectRepository } from 'src/project/project.repository';
import { UserRepository } from 'src/user/user.repository';
import { BadRequestException } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { NotificationService } from 'src/notification/notification.service';
import { In } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    private commentService: CommentService,
    private notificationService: NotificationService,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(ProjectRepository) private projectRepository: ProjectRepository,
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const assignee = await this.userRepository.findOne({
      where: {
        mId: createTaskDto.mAssigneeId
      }
    })

    if(!assignee) {
      throw new BadRequestException(`Assignee ${createTaskDto.mAssigneeId} doesn't exist`)
    }
    
    const reporter = await this.userRepository.findOne({
      where: {
        mId: createTaskDto.mReporterId
      }
    })

    if(!reporter) {
      throw new BadRequestException(`Reporter ${createTaskDto.mReporterId} doesn't exist`)
    }

    let projectName = ""
    if(createTaskDto.mProjectId != 0) {
      const project = await this.projectRepository.findOne({
        where: {
          mId: createTaskDto.mProjectId
        }
      })
  
      if(!project) {
        throw new BadRequestException(`Project ${createTaskDto.mProjectId} doesn't exist`)
      } else {
        projectName = project.mName
      }
    }

    let newTask = this.taskRepository.create({
      mName: createTaskDto.mName,
      mDescription: createTaskDto.mDescription,
      mStatus: createTaskDto.mStatus,
      mAssigneeId: createTaskDto.mAssigneeId,
      mReporterId: createTaskDto.mReporterId,
      mProjectId: createTaskDto.mProjectId,
      mStartDate: createTaskDto.mStartDate,
      mEndDate: createTaskDto.mEndDate,
      mCreated: new Date().toISOString(),
      mModified: new Date().toISOString()
    })

    let task = await this.taskRepository.save(newTask)

    if(projectName != "") { 
      await this.notificationService.create({
        mTitle: `Bạn vừa được giao một task mới`,
        mContent: `${reporter.mUserName} vừa giao cho bạn một task mới ${newTask.mName} trong project ${projectName}`,
        mUserId: assignee.mId
      })
    }
    return task;
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    return this.taskRepository.findOne({
      where: {
        mId: id
      }
    })
  }

  async findComments(taskId: number) {
    // Fetch all comments for the given taskId
    const comments = await this.commentService.findByTaskId(taskId);
  
    if (comments.length === 0) {
      return []; // Return an empty array if no comments exist
    }
  
    // Extract all user IDs from the comments
    const userIds = comments.map((comment) => comment.mUserId);
  
    // Fetch all user information for the extracted user IDs in a single query
    const commentUserInforList = await this.userRepository.findBy({
      mId: In(userIds), // Use `In` to match multiple user IDs
    });
  
    // Create a map of user information for quick lookup
    const userMap = new Map(
      commentUserInforList.map((user) => [user.mId, user])
    );
  
    // Combine comments and user information
    const result = comments.map((comment) => ({
      comment,
      user: userMap.get(comment.mUserId), // Fetch the corresponding user information
    }));
  
    return result;
  }
  

  async findByProjectId(projectId: number) {
    return await this.taskRepository.find({
      where: {
        mProjectId: projectId
      }
    });
  }

  async getPersonalTask(userId: number) {
    return await this.taskRepository.find({
      where: {
        mReporterId: userId,
        mAssigneeId: userId
      }
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    const updatedTask = Object.assign(task, updateTaskDto);
    updatedTask.mModified = new Date().toISOString();

    return await this.taskRepository.save(updatedTask);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
