import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionRepository } from './question.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { FormRepository } from 'src/form/form.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository) private questionRepository: QuestionRepository,
    @InjectRepository(FormRepository) private formRepository: FormRepository,
  ) {}
  
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { mFormId } = createQuestionDto;
    const formExists = await this.formRepository.findOne({
      where: { mId: mFormId },
    });
    if (!formExists) {
      throw new NotFoundException(`Form with ID ${mFormId} not found`);
    }

    const question = this.questionRepository.create(createQuestionDto);
    question.mCreated = new Date().toISOString();
    question.mModified = new Date().toISOString();
    
    return await this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: {
        mId: id
      }
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.findOne(id); 
    Object.assign(question, updateQuestionDto);
    question.mModified = new Date().toISOString();
    return await this.questionRepository.save(question);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }
}