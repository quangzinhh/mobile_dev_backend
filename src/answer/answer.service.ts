import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerRepository } from './answer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseRepository } from 'src/response/response.repository';
import { QuestionRepository } from 'src/question/question.repository';
import { OptionRepository } from 'src/option/option.repository';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerRepository) private readonly answerRepository: AnswerRepository,
    @InjectRepository(ResponseRepository) private readonly responseRepository: ResponseRepository,
    @InjectRepository(QuestionRepository) private readonly questionRepository: QuestionRepository,
    @InjectRepository(OptionRepository) private readonly optionRepository: OptionRepository,
  ) {}

  
  async create(createAnswerDto: CreateAnswerDto) {
    const { mResponseId, mQuestionId, mOptionId } = createAnswerDto;

    const responseExists = await this.responseRepository.findOne({
      where: { mId: mResponseId },
    });
    if (!responseExists) {
      throw new NotFoundException(`Response with ID ${mResponseId} not found`);
    }

    const questionExists = await this.questionRepository.findOne({
      where: { mId: mQuestionId },
    });
    if (!questionExists) {
      throw new NotFoundException(`User with ID ${mQuestionId} not found`);
    }

    const optionExists = await this.optionRepository.findOne({
      where: { mId: mOptionId },
    });
    if (!optionExists) {
      throw new NotFoundException(`User with ID ${mOptionId} not found`);
    }
    const answer = this.answerRepository.create(createAnswerDto);
    answer.mCreated = new Date().toISOString()
    answer.mModified = new Date().toDateString()

    return await this.answerRepository.save(answer);
  }

  async findAll() {
    return await this.answerRepository.find();
  }

  async findOne(id: number) {
    const answer = await this.answerRepository.findOne({
      where: {
        mId: id
      }
    });
    if (!answer) {
      throw new Error(`Answer with ID ${id} not found`);
    }
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.findOne(id);
    Object.assign(answer, updateAnswerDto);
    answer.mModified = new Date().toISOString()
    return await this.answerRepository.save(answer);
  }

  async remove(id: number) {
    const answer = await this.findOne(id);
    return await this.answerRepository.remove(answer);
  }
}