import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AnswerRepository } from './answer.repository';
import { ResponseRepository } from 'src/response/response.repository';
import { QuestionRepository } from 'src/question/question.repository';
import { OptionRepository } from 'src/option/option.repository';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, AnswerRepository, ResponseRepository, QuestionRepository, OptionRepository],
})
export class AnswerModule {}
