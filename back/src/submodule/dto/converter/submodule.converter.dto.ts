import { plainToInstance } from 'class-transformer';
import { SubmoduleRequestDto } from '../request/submodule.request.dto';
import { SubmoduleEntity } from 'src/submodule/entity/submodule.entity';
import { SubmoduleResponseDto } from '../response/submodule.response.dto';
import { ModuleEntity } from 'src/modules/entity/module.entity';

// Classe "Mapper" ou "Converter"
// Isso é bom pra separar a lógica de transformar DTO em Entidade.
export class SubmoduleConverterDto {
  
  // Converte o que vem do front (RequestDto) para a Entidade do TypeORM
  static toSubmoduleEntity(submoduleRequest: SubmoduleRequestDto): SubmoduleEntity {
    const newEntity = new SubmoduleEntity();

    if (submoduleRequest.submoduleId) {
      newEntity.submoduleId = submoduleRequest.submoduleId;
    }
    newEntity.title = submoduleRequest.title;
    newEntity.explanation = submoduleRequest.explanation;

    // Aqui a gente anexa o ID do módulo pra salvar a relação
    const parentModule = new ModuleEntity();
    parentModule.moduleId = submoduleRequest.moduleId;
    newEntity.module = parentModule;

    return newEntity;
  }

  // Converte a Entidade do banco (Entity) para o que vai pro front (ResponseDto)
  static toSubmoduleResponse(submodule: SubmoduleEntity): SubmoduleResponseDto {
        //O plainToInstance é do class-transformer.
    // Ele que lê os @Expose() do DTO e filtra os campos.
    // O excludeExtraneousValues: true é o que faz a "mágica" de filtrar.
    return plainToInstance(SubmoduleResponseDto, submodule, {
      excludeExtraneousValues: true,
    });
  }

  static toListSubmoduleResponse(submodules: SubmoduleEntity[] = []): SubmoduleResponseDto[] {
    return plainToInstance(SubmoduleResponseDto, submodules, {
      excludeExtraneousValues: true,
    });
  }
}