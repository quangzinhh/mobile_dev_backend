import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { RequestWithUser } from 'src/auth/request-with-user.interface';
import { Request } from '@nestjs/common';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Request() req:RequestWithUser) {
    const userId = req.user.mId;
    return await this.projectService.getUserProjects(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }

  @Get(':id/members')
  async getMembers(@Param('id') id: string) {
    return await this.projectService.findMembers(+id);
  }

  @Get(':id/tasks')
  async getTasks(@Param('id') id: string) {
    return await this.projectService.findTask(+id);
  }

  @Post('/addPartner')
  addPartner(@Body() body: {
    partnerEmail: string,
    projectId: number
  }) {
    return this.projectService.addPartnerToProject(body.partnerEmail, body.projectId);
  }
}
