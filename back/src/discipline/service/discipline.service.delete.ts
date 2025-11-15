import { InjectRepository } from '@nestjs/typeorm';
import { DisciplineEntity } from '../entity/discipline.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

export class DisciplineServiceDelete {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository: Repository<DisciplineEntity>
  ){}

  async delete(disciplineId: number) {
    // Diferente do outro delete, esse busca o objeto antes.
    const disciplineToRemove = await this.disciplineRepository.findOne({
      where: { disciplineId: disciplineId },
    });

    if (!disciplineToRemove) {
      throw new HttpException(
        `Disciplina com ID ${disciplineId} não encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.disciplineRepository.delete(disciplineId);
  }
}