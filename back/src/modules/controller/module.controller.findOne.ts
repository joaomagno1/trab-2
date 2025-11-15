import { Controller, Get, HttpCode, HttpStatus, Param, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { ModuleServiceFindOne } from "../service/module.service.findOne";
import { ModuleResponseDto } from "../dto/response/module.response.dto";
import { ModuleConverterDto } from "../dto/converter/module.converter.dto";

@Controller(ROUTE.MODULES.BASE)
export class ModuleControllerFindOne {
  constructor(private readonly moduleServiceFindOne: ModuleServiceFindOne) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.MODULES.FIND_ONE)
  async findOne(
    @Req() request: Request,
    @Param('moduleId') moduleId: number
  ): Promise<Result<ModuleResponseDto>> {
    const foundModule = await this.moduleServiceFindOne.findOne(moduleId);
    const data = ModuleConverterDto.toModuleResponse(foundModule);

    return MessageSystem.buildResponse(
      HttpStatus.OK,
      'Módulo encontrado.',
      data,
      request.path,
      null
    );
  }
}