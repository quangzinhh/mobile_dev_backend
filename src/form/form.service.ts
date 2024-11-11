import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormRepository } from './form.repository';
import { UserRepository } from 'src/user/user.repository';
import { Form } from './entities/form.entity';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormRepository) private formRepository: FormRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const { mUserCreatedForm } = createFormDto;
    const userExists = await this.userRepository.findOne({
      where: { mId: mUserCreatedForm },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${mUserCreatedForm} not found`);
    }

    const form = this.formRepository.create(createFormDto);
    
    form.mCreated = new Date().toISOString();
    form.mModified = new Date().toISOString();
    
    return await this.formRepository.save(form);
  }

  async findAll(): Promise<Form[]> {
    return await this.formRepository.find();
  }

  async findOne(id: number): Promise<Form> {
    const form = await this.formRepository.findOne({
      where: {
        mId: id
      }
    });
    if (!form) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
    return form;
  }

  async update(id: number, updateFormDto: UpdateFormDto): Promise<Form> {
    const form = await this.findOne(id);
    form.mModified = new Date().toISOString();
    Object.assign(form, updateFormDto);
    return await this.formRepository.save(form);
  }

  async remove(id: number): Promise<void> {
    const result = await this.formRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
  }
}