import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';

@Injectable()
export class ModuleServiceDelete {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async remove(moduleId: number): Promise<void> {
    const deleteResult = await this.moduleRepository.delete(moduleId);
    
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Módulo com ID ${moduleId} não encontrado.`);
    }
  }
}