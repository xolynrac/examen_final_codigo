
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { ClienteApplicationService } from '../application/services/cliente-application.service';
import { GetClienteIdQuery } from '../application/queries/get-clienteid.query';
import { RegisterClienteRequest } from '../application/dtos/request/register-cliente-request.dto';
import { RegisterClienteResponse } from '../application/dtos/response/register-cliente-response.dto';
import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common';

import { GetClientesQuery } from '../application/queries/get-clientes.query';


@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteApplicationService: ClienteApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Get('/:id')
  async getClientePorId(@Param('id') clienteId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const cliente = await this.queryBus.execute(new GetClienteIdQuery(clienteId));
      return ApiController.ok(response, cliente);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/')
  async getClientes(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const clientes = await this.queryBus.execute(new GetClientesQuery());
      return ApiController.ok(response, clientes);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/')
  async registrarCliente(
    @Body() registerClienteRequest: RegisterClienteRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterClienteResponse> = await this.clienteApplicationService.register(registerClienteRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}