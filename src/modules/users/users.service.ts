import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userValid = await this.userRepository.findOne({
      where: { name: createUserDto.name },
    });
    if (userValid) {
      throw new BadRequestException('Usuário ja cadastrado!');
    }
    const userNew = this.userRepository.create(createUserDto);
    await this.userRepository.save(userNew);
    return { id: userNew.id, name: userNew.name };
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userValid = await this.userRepository.findOne({
      where: { id },
    });
    if (!userValid) {
      throw new BadRequestException('Usuário não cadastrado!');
    }
    await this.userRepository.update(id, updateUserDto);
    return { id: userValid.id, name: userValid.name };
  }

  async remove(id: number) {
    const userValid = await this.userRepository.findOne({
      where: { id },
    });
    if (!userValid) {
      throw new BadRequestException('Usuário não cadastrado!');
    }
    await this.userRepository.update(id, { active: false });
    return { id: userValid.id, name: userValid.name };
  }
}
