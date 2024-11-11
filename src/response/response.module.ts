import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseRepository } from './response.repository';
import { FormRepository } from 'src/form/form.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [ResponseController],
  providers: [ResponseService, ResponseRepository, FormRepository, UserRepository],
})
export class ResponseModule {}
