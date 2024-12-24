import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserBelongProject } from './entities/user_belong_project.entity';

@Injectable()
export class UserBelongProjectRepository extends Repository<UserBelongProject> {
    constructor(private dataSource: DataSource) {
        super(UserBelongProject, dataSource.createEntityManager());
    }
}