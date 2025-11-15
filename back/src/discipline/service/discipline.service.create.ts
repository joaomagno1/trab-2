import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DisciplineEntity } from "../entity/discipline.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { DisciplineRequestDto } from "../dto/request/discipline.request.dto";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";
import { DisciplineConverterDto } from "../dto/converter/discipline.converter.dto";

export class DisciplineServiceCreate {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository:  Repository<DisciplineEntity>
  ){}

  async create(dto: DisciplineRequestDto): Promise<DisciplineResponseDto> {
    let newEntity = DisciplineConverterDto.toDisciplineEntity(dto);

    //    Regra de negócio importante!
    // Verificar se já existe uma disciplina com esse nome.
    const existingDiscipline = await this.disciplineRepository.findOne({
      where: {
        name: newEntity.name
      }
    });

    if (existingDiscipline) {
      throw new HttpException('Disciplina com nome informado já está cadastrada', HttpStatus.BAD_REQUEST);
    }

    newEntity = await this.disciplineRepository.save(newEntity);

    return DisciplineConverterDto.toDisciplineResponse(newEntity);
  }
}