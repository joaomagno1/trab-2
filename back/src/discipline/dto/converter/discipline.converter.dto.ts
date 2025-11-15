import { plainToInstance } from 'class-transformer';
import { DisciplineRequestDto } from '../request/discipline.request.dto';
import { DisciplineEntity } from 'src/discipline/entity/discipline.entity';
import { DisciplineResponseDto } from '../response/discipline.response.dto';

export class DisciplineConverterDto {
  
  static toDisciplineEntity(dto: DisciplineRequestDto) {
    const newEntity = new DisciplineEntity();

    if (dto.disciplineId != null) {
      newEntity.disciplineId = dto.disciplineId;
    }
    newEntity.name = dto.name;
    newEntity.description = dto.description;

    return newEntity;
  }

  static toDisciplineResponse(entity: DisciplineEntity): DisciplineResponseDto {
    return plainToInstance(DisciplineResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  static toListDisciplineResponse(entities: DisciplineEntity[] = []): DisciplineResponseDto[] {
    return plainToInstance(DisciplineResponseDto, entities, {
      excludeExtraneousValues: true,
    });
  }
}