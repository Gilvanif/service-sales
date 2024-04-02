import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(AuthDto: AuthDto) {
    const authUser = await this.userRepository.findOne({
      where: { name: AuthDto.name, password: AuthDto.password, active: true },
    });
    if (!authUser)
      throw new UnauthorizedException('Usuário ou Senha incorretos!');

    const payload = {
      id: authUser.id,
      name: authUser.name,
    };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
