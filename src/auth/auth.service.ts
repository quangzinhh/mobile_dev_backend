import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { mEmail, mPassword } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { mEmail } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(mPassword, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      mPassword: hashedPassword,
      mCreated: new Date().toISOString(),
      mModified: new Date().toISOString(),
    });

    await this.userRepository.save(user);
    return { message: 'User registered successfully' };
  }

  async login(mEmail: string, mPassword: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { mEmail } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(mPassword, user.mPassword);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { mId: user.mId, mEmail: user.mEmail };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async logout(): Promise<any> {
    return { message: 'User logged out successfully' };
  }

  async getProfile(userId: number): Promise<User> {
    return this.userRepository.findOne({
        where: {
            mId: userId
        }
    });
  }
}
