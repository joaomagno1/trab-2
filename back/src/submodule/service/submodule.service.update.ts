import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';
import { SubmoduleRequestDto } from '../dto/request/submodule.request.dto';
import { SubmoduleConverterDto } from '../dto/converter/submodule.converter.dto';

@Injectable()
export class SubmoduleServiceUpdate {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async update(submoduleId: number, updateDto: SubmoduleRequestDto): Promise<SubmoduleEntity> {
    const entityFromDto = SubmoduleConverterDto.toSubmoduleEntity(updateDto);

    // O ID da URL é a fonte da verdade
    entityFromDto.submoduleId = submoduleId;

    //     O preload é o jeito certo de fazer update no TypeORM.
    // Ele primeiro busca a entidade pelo ID (submoduleId) e depois
    // mescla os dados do (entityFromDto) por cima.
    const existingSubmodule = await this.submoduleRepository.preload(entityFromDto);

    if (!existingSubmodule) {
      throw new NotFoundException(`Submódulo com ID ${submoduleId} não encontrado para atualização.`);
    }

    return this.submoduleRepository.save(existingSubmodule);
  }
}