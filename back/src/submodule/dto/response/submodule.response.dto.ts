import { Expose, Type } from 'class-transformer';
import { ModuleResponseDto } from 'src/modules/dto/response/module.response.dto';

// DTO de saída. É o que a API devolve pro front.
// O @Expose() diz quais campos da entidade podem ser mostrados.
export class SubmoduleResponseDto {
  @Expose()
  submoduleId: number;

  @Expose()
  title: string;

  @Expose()
  explanation: string;

  // O @Type() é pra aninhar o DTO do módulo aqui dentro.
  // Assim o front recebe o submódulo com o módulo "pai" junto.
  @Expose()
  @Type(() => ModuleResponseDto)
  module: ModuleResponseDto;
}