import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class ModuleRequestDto {
  @IsOptional()
  @IsNumber({}, { message: 'O campo moduleId deve ser um número.' })
  moduleId?: number;

  @IsNotEmpty({ message: 'O ID da disciplina não pode estar vazio.' })
  @IsNumber({}, { message: 'O campo disciplineId deve ser um número.' })
  disciplineId: number;

  @IsNotEmpty({ message: 'O título não pode estar vazio.' })
  @IsString({ message: 'O título deve ser uma string.' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres.' })
  title: string;

  @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @MaxLength(255, { message: 'A descrição deve ter no máximo 255 caracteres.' })
  description: string;
}