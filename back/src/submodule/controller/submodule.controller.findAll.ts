import { Controller, Get, HttpCode, HttpStatus, Req } from "@nestjs/common";
import type { Request } from 'express';
import { ROUTE } from "src/commons/constants/url.sistema";
import { MessageSystem } from "src/commons/message/message.system";
import { Result } from "src/commons/message/message";
import { SubmoduleServiceFindAll } from "../service/submodule.service.findAll";
import { SubmoduleResponseDto } from "../dto/response/submodule.response.dto";
import { SubmoduleConverterDto } from "../dto/converter/submodule.converter.dto";

@Controller(ROUTE.SUBMODULES.BASE)
export class SubmoduleControllerFindAll {
  constructor(private readonly submoduleServiceFindAll: SubmoduleServiceFindAll) {}

  @HttpCode(HttpStatus.OK)
  @Get(ROUTE.SUBMODULES.LIST)
  async findAll(@Req() request: Request): Promise<Result<SubmoduleResponseDto[]>> {
    const allSubmodules = await this.submoduleServiceFindAll.findAll();
    const data = SubmoduleConverterDto.toListSubmoduleResponse(allSubmodules);

    return MessageSystem.buildResponse(
      HttpStatus.OK,
      'Lista de submódulos carregada!',
      data,
      request.path,
      null
    );
  }
}