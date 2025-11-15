import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class DisciplineRequestDto {
  @Type(() => Number)
  @IsOptional()
  disciplineId: number;

  @IsString({message: 'O nome deve ser uma string'})
  @IsNotEmpty({message: 'O campo nome é obrigatório'})
  @MaxLength(120, {message: 'O nome deve ter no máximo 120 caracteres'})
  name: string;

  @IsString({message: 'A descrição deve ser uma string'})
  @IsNotEmpty({message: 'A descrição é obrigatória'})
  @MaxLength(255, {message: 'A descrição deve ter no máximo 120 caracteres'})
  description: string;
}