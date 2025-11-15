import { InjectRepository } from "@nestjs/typeorm";
import { DisciplineEntity } from "../entity/discipline.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { DisciplineConverterDto } from "../dto/converter/discipline.converter.dto";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";

@Injectable()
export class DisciplineServiceFindAll {
  constructor(
    @InjectRepository(DisciplineEntity)
    private readonly disciplineRepository: Repository<DisciplineEntity>
  ){}

  // Esse service já retorna o DTO, diferente dos outros
  async findAll(): Promise<DisciplineResponseDto[]> {
    const disciplines = await this.disciplineRepository.find({
      order: {
        disciplineId: 'ASC'
      }
    });
    // Converte a lista de entidades para lista de DTOs
    return DisciplineConverterDto.toListDisciplineResponse(disciplines);
  }
}