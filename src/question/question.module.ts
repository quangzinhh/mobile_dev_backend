import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepository } from './question.repository';
import { FormRepository } from 'src/form/form.repository';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, FormRepository],
})
export class QuestionModule {}
