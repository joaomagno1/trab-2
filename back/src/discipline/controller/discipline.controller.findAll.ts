import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import { DisciplineServiceFindAll } from "../service/discipline.service.findAll";
import { ROUTE } from "src/commons/constants/url.sistema";
import type { Request } from 'express';
import { MessageSystem } from "src/commons/message/message.system";
import { DisciplineResponseDto } from "../dto/response/discipline.response.dto";
import { Result } from "src/commons/message/message";

@Controller(ROUTE.DISCIPLINE.BASE)
export class DisciplineControllerFindAll {
  constructor(private readonly disciplineServiceFindAll: DisciplineServiceFindAll){}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.DISCIPLINE.LIST)
  async findAll(@Req() request: Request): Promise<Result<DisciplineResponseDto[]>> {
    const disciplineList = await this.disciplineServiceFindAll.findAll();

    return MessageSystem.buildResponse(
      HttpStatus.OK,
      'Listagem de disciplinas!',
      disciplineList,
      request.path,
      null
    ) 
  }
}