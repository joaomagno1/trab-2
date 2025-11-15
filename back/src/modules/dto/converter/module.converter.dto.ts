import { plainToInstance } from 'class-transformer';
import { ModuleRequestDto } from '../request/module.request.dto';
import { ModuleEntity } from 'src/modules/entity/module.entity';
import { ModuleResponseDto } from '../response/module.response.dto';
import { DisciplineEntity } from 'src/discipline/entity/discipline.entity';

export class ModuleConverterDto {
  static toModuleEntity(moduleRequest: ModuleRequestDto): ModuleEntity {
    const newEntity = new ModuleEntity();

    if (moduleRequest.moduleId) {
      newEntity.moduleId = moduleRequest.moduleId;
    }
    newEntity.title = moduleRequest.title;
    newEntity.description = moduleRequest.description;

    // Anexa a disciplina "pai"
    const parentDiscipline = new DisciplineEntity();
    parentDiscipline.disciplineId = moduleRequest.disciplineId;
    newEntity.discipline = parentDiscipline;

    return newEntity;
  }

  static toModuleResponse(module: ModuleEntity): ModuleResponseDto {
    return plainToInstance(ModuleResponseDto, module, {
      excludeExtraneousValues: true,
    });
  }

  static toListModuleResponse(modules: ModuleEntity[] = []): ModuleResponseDto[] {
    return plainToInstance(ModuleResponseDto, modules, {
      excludeExtraneousValues: true,
    });
  }
}