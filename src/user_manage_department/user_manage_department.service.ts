import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserManageDepartmentDto } from './dto/create-user_manage_department.dto';
import { UpdateUserManageDepartmentDto } from './dto/update-user_manage_department.dto';
import { UserManageDepartmentRepository } from './user_manage_department.repository';
import { UserManageDepartment } from './entities/user_manage_department.entity';
import { UserRepository } from 'src/user/user.repository';
import { DepartmentRepository } from 'src/department/department.repository';

@Injectable()
export class UserManageDepartmentService {
  constructor(
    @InjectRepository(UserManageDepartmentRepository)
    private userManageDepartmentRepository: UserManageDepartmentRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(DepartmentRepository)
    private departmentRepository: DepartmentRepository,
  ) {}

  async create(createUserManageDepartmentDto: CreateUserManageDepartmentDto): Promise<UserManageDepartment> {
    const { mUserId, mDepartmentId } = createUserManageDepartmentDto;

    const userExists = await this.userRepository.findOne({
      where: {
        mId: mUserId
      }
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${mUserId} not found`);
    }

    const departmentExists = await this.departmentRepository.findOne({
      where: {
        mId: mDepartmentId
      }
    });
    if (!departmentExists) {
      throw new NotFoundException(`Department with ID ${mDepartmentId} not found`);
    }

    const userManageDepartment = this.userManageDepartmentRepository.create(createUserManageDepartmentDto);
    return await this.userManageDepartmentRepository.save(userManageDepartment);
  }

  async findAll(): Promise<UserManageDepartment[]> {
    return await this.userManageDepartmentRepository.find();
  }

  async findOne(id: number): Promise<UserManageDepartment> {
    const userManageDepartment = await this.userManageDepartmentRepository.findOne({
      where: {
        mId: id
      }
    });
    if (!userManageDepartment) {
      throw new NotFoundException(`UserManageDepartment with ID ${id} not found`);
    }
    return userManageDepartment;
  }

  async update(id: number, updateUserManageDepartmentDto: UpdateUserManageDepartmentDto): Promise<UserManageDepartment> {
    const userManageDepartment = await this.findOne(id);
    Object.assign(userManageDepartment, updateUserManageDepartmentDto);
    return await this.userManageDepartmentRepository.save(userManageDepartment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userManageDepartmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`UserManageDepartment with ID ${id} not found`);
    }
  }
}