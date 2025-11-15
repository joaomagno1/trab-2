import { InjectRepository } from '@nestjs/typeorm';
import { DisciplineEntity } from '../entity/discipline.entity';
import { Not, Repository } from 'typeorm';
import { DisciplineRequestDto } from '../dto/request/discipline.request.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DisciplineConverterDto } from '../dto/converter/discipline.converter.dto';

export class DisciplineServiceUpdate {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository: Repository<DisciplineEntity>,
  ) {}

  async update(disciplineId: number, dto: DisciplineRequestDto) {
    const disciplineToUpdate = await this.disciplineRepository.findOne({
      where: {
        disciplineId: disciplineId
      }
    });

    if (!disciplineToUpdate) {
      throw new HttpException(`Disciplina com ID ${disciplineId} não encontrada`, HttpStatus.NOT_FOUND);
    }

    //    Regra de negócio complexa aqui.
    // Precisa checar se o novo nome já existe, mas em OUTRA disciplina.
    // O "Not(disciplineId)" é pra excluir a disciplina atual da busca.
    const nameAlreadyExists = await this.disciplineRepository.findOne({
      where: {
        name: dto.name,
        disciplineId: Not(disciplineId) // Operador "Not" do TypeORM
      }
    });

    if (nameAlreadyExists) {
      // 409 Conflict é mais semântico que 400 Bad Request
      throw new HttpException(`O nome "${dto.name}" já está em uso por outra disciplina`, HttpStatus.CONFLICT); 
    }

    const entity = DisciplineConverterDto.toDisciplineEntity(dto);

    // Aqui o professor usou "update" direto, em vez de "preload/save"
    // Isso é mais rápido (1 query), mas não retorna a entidade atualizada.
    await this.disciplineRepository.update(disciplineId, entity);

    // Por isso, ele mescla manualmente os dados pra retornar
    Object.assign(disciplineToUpdate, entity);

    return DisciplineConverterDto.toDisciplineResponse(disciplineToUpdate);
  }
}