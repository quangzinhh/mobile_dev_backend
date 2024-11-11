import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserManageDepartment } from './entities/user_manage_department.entity';

@Injectable()
export class UserManageDepartmentRepository extends Repository<UserManageDepartment> {
    constructor(private dataSource: DataSource) {
        super(UserManageDepartment, dataSource.createEntityManager());
    }
}