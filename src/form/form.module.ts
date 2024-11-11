import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormRepository } from './form.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [FormController],
  providers: [FormService, FormRepository, UserRepository],
})
export class FormModule {}
