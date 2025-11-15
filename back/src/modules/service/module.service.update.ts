import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleEntity } from '../entity/module.entity';
import { ModuleRequestDto } from '../dto/request/module.request.dto';
import { ModuleConverterDto } from '../dto/converter/module.converter.dto';

@Injectable()
export class ModuleServiceUpdate {
  constructor(
    @InjectRepository(ModuleEntity)
    private moduleRepository: Repository<ModuleEntity>,
  ) {}

  async update(moduleId: number, updateDto: ModuleRequestDto): Promise<ModuleEntity> {
    const entityFromDto = ModuleConverterDto.toModuleEntity(updateDto);
    
    entityFromDto.moduleId = moduleId;
    
    // Usando o preload, o TypeORM busca o módulo e mescla os dados
    const existingModule = await this.moduleRepository.preload(entityFromDto);

    if (!existingModule) {
      throw new NotFoundException(`Módulo com ID ${moduleId} não encontrado.`);
    }

    return this.moduleRepository.save(existingModule);
  }
}