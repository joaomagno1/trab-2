import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';

@Injectable()
export class SubmoduleServiceFindOne {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async findOne(submoduleId: number): Promise<SubmoduleEntity> {
    const foundSubmodule = await this.submoduleRepository.findOne({
      where: { submoduleId: submoduleId },
      relations: ['module'],
    });
    
    // Sempre bom checar se o ID existe antes de retornar
    if (!foundSubmodule) {
      throw new NotFoundException(`Não foi possível encontrar o submódulo com o ID ${submoduleId}.`);
    }
    return foundSubmodule;
  }
}