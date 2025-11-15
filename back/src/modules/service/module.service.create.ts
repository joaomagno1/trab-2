import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';
import { ModuleRequestDto } from '../dto/request/module.request.dto';
import { ModuleConverterDto } from '../dto/converter/module.converter.dto';

@Injectable()
export class ModuleServiceCreate {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async create(createDto: ModuleRequestDto): Promise<ModuleEntity> {
    const newModule = ModuleConverterDto.toModuleEntity(createDto);
    return await this.moduleRepository.save(newModule);
  }
}