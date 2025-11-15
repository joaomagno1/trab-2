import { Expose } from "class-transformer";

// DTO de resposta simples, só expondo os campos.
export class DisciplineResponseDto {
  @Expose()
  disciplineId: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}