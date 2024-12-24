import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserRepository } from 'src/user/user.repository';
import { TaskRepository } from 'src/task/task.repository';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    @InjectRepository(CommentRepository) private commentRepository: CommentRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findOne({
      where: {
        mId: createCommentDto.mUserId
      }
    })

    if(!user) {
      throw new BadRequestException(`User ${createCommentDto.mUserId} is not exist`)
    }

    const task = await this.taskRepository.findOne({
      where: {
        mId: createCommentDto.mTaskId
      }
    })

    if(!task) {
      throw new BadRequestException(`Task ${createCommentDto.mTaskId} is not exist`)
    }

    let newComment = this.commentRepository.create({
      mTaskId: createCommentDto.mTaskId,
      mUserId: createCommentDto.mUserId,
      mContent: createCommentDto.mContent,
      mCreated: new Date().toISOString()
    })

    let comment = await this.commentRepository.save(newComment)
    return {
      "comment": comment,
      "user": user
    }
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async findByTaskId(taskId: number) {
    return await this.commentRepository.find({
      where: {
        mTaskId: taskId
      }
    })
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
