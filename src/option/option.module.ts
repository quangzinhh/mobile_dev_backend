import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { OptionRepository } from './option.repository';
import { QuestionRepository } from 'src/question/question.repository';

@Module({
  controllers: [OptionController],
  providers: [OptionService, OptionRepository, QuestionRepository],
})
export class OptionModule {}
