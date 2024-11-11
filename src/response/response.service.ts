import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { ResponseRepository } from './response.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { UserRepository } from 'src/user/user.repository';
import { FormRepository } from 'src/form/form.repository';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(ResponseRepository) private responseRepository: ResponseRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(FormRepository) private formRepository: FormRepository,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const { mFormId, mUserId, mTargetUserId } = createResponseDto;
    const formExists = await this.formRepository.findOne({
      where: { mId: mFormId },
    });
    if (!formExists) {
      throw new NotFoundException(`Form with ID ${mFormId} not found`);
    }

    const userExists = await this.userRepository.findOne({
      where: { mId: mUserId },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${mUserId} not found`);
    }

    const userTargetExists = await this.userRepository.findOne({
      where: { mId: mTargetUserId },
    });
    if (!userTargetExists) {
      throw new NotFoundException(`User with ID ${mTargetUserId} not found`);
    }

    const response = this.responseRepository.create(createResponseDto);
    response.mCreated = new Date().toISOString()
    response.mModified = new Date().toISOString()
    return await this.responseRepository.save(response);
  }

  async findAll(): Promise<Response[]> {
    return await this.responseRepository.find();
  }

  async findOne(id: number): Promise<Response> {
    return await this.responseRepository.findOne({
      where: {
        mId: id
      }
    });
  }

  async update(id: number, updateResponseDto: UpdateResponseDto): Promise<Response> {
    await this.responseRepository.update(id, updateResponseDto);
    return this.responseRepository.findOne({
      where: {
        mId: id
      }
    });
  }

  async remove(id: number): Promise<void> {
    await this.responseRepository.delete(id);
  }
}