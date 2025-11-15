import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';

@Injectable()
export class ModuleServiceFindOne {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async findOne(moduleId: number): Promise<ModuleEntity> {
    const foundModule = await this.moduleRepository.findOne({
      where: { moduleId: moduleId },
      relations: ['discipline'], // JOIN na disciplina
    });
    
    if (!foundModule) {
      throw new NotFoundException(`Módulo com ID ${moduleId} não encontrado.`);
    }
    return foundModule;
  }
}