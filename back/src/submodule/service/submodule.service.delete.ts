import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';

@Injectable()
export class SubmoduleServiceDelete {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async remove(submoduleId: number): Promise<void> {
    const deleteResult = await this.submoduleRepository.delete(submoduleId);
    
    // Checa se algo foi realmente deletado
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Submódulo com ID ${submoduleId} não existe ou já foi deletado.`);
    }
  }
}