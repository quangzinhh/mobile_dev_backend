import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { OptionRepository } from './option.repository';
import { QuestionRepository } from 'src/question/question.repository';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionRepository) private optionRepository: OptionRepository,
    @InjectRepository(QuestionRepository) private questionRepository: QuestionRepository,
  ) {}

  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    const { mQuestionId } = createOptionDto
    const questionExists = await this.questionRepository.findOne({
      where: { mId: mQuestionId },
    });
    if (!questionExists) {
      throw new NotFoundException(`Question with ID ${mQuestionId} not found`);
    }
    const option = this.optionRepository.create(createOptionDto);
    option.mCreated = new Date().toISOString()
    option.mModified = new Date().toISOString()
    return await this.optionRepository.save(option);
  }

  async findAll(): Promise<Option[]> {
    return await this.optionRepository.find();
  }

  async findOne(id: number): Promise<Option> {
    const option = await this.optionRepository.findOne({
      where: {
        mId: id
      }
    });
    if (!option) {
      throw new NotFoundException(`Option with ID ${id} not found`);
    }
    return option;
  }

  async update(id: number, updateOptionDto: UpdateOptionDto): Promise<Option> {
    const option = await this.findOne(id); 
    Object.assign(option, updateOptionDto); 
    return await this.optionRepository.save(option);
  }

  async remove(id: number): Promise<void> {
    const option = await this.findOne(id);
    await this.optionRepository.remove(option);
  }
}