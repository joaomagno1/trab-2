import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

// DTO de entrada. É o que o front-end envia.
// O class-validator ajuda a garantir que os dados estão corretos.
export class SubmoduleRequestDto {
  @IsOptional()
  @IsNumber({}, { message: 'O campo submoduleId deve ser um número.' })
  submoduleId?: number;

  @IsNotEmpty({ message: 'O ID do módulo é obrigatório.' })
  @IsNumber({}, { message: 'O campo moduleId deve ser um número.' })
  moduleId: number;

  @IsNotEmpty({ message: 'O campo título não pode estar vazio.' })
  @IsString({ message: 'O título precisa ser um texto.' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres.' })
  title: string;

  @IsNotEmpty({ message: 'O campo explicação não pode estar vazio.' })
  @IsString({ message: 'A explicação precisa ser um texto.' })
  explanation: string;
}