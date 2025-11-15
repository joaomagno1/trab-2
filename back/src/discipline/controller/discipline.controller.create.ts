import { DisciplineServiceDelete } from '../service/discipline.service.delete';
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ROUTE } from '../../commons/constants/url.sistema';
import { MessageSystem } from '../../commons/message/message.system';
import type { Request } from 'express';
import { Result } from '../../commons/message/message';

@Controller(ROUTE.DISCIPLINE.BASE)
export class DisciplineControllerDelete {
  constructor(private readonly disciplineServiceDelete: DisciplineServiceDelete) {}

  @HttpCode(HttpStatus.OK)
  @Delete(ROUTE.DISCIPLINE.DELETE)
  async delete(
    @Req() request: Request,
    @Param('disciplineId', ParseIntPipe) disciplineId: number,
  ): Promise<Result<void>> {
    await this.disciplineServiceDelete.delete(disciplineId);

    return MessageSystem.buildResponse(
      HttpStatus.OK, // Status OK (200)
      'Disciplina removida com sucesso!',
      null,
      request.path,
      null,
    );
  }
}