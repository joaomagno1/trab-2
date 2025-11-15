import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put, // Usando PUT em vez de PATCH
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { DisciplineRequestDto } from "../dto/request/discipline.request.dto";
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";
import { DisciplineServiceUpdate } from '../service/discipline.service.update';

@Controller(ROUTE.DISCIPLINE.BASE)
export class DisciplineControllerUpdate {
  constructor(private readonly disciplineServiceUpdate: DisciplineServiceUpdate){}

  @HttpCode(HttpStatus.OK)
  @Put(ROUTE.DISCIPLINE.UPDATE) // O professor usa PUT para "substituição total"
  async update(
    @Req() request: Request,
    @Param('disciplineId', ParseIntPipe) disciplineId: number,
    @Body() updateDto: DisciplineRequestDto
  ): Promise<Result<DisciplineResponseDto>> {
    const updatedDiscipline = await this.disciplineServiceUpdate.update(disciplineId, updateDto);

    return MessageSystem.buildResponse(
      HttpStatus.OK,
      'Disciplina atualizada com sucesso!',
      updatedDiscipline,
      request.path,
      null
    )
  }
}