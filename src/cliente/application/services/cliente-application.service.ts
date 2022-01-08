import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterClienteValidator } from '../validators/register-cliente.validator';

import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterCliente } from '../commands/register-cliente.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { RegisterClienteRequest } from '../dtos/request/register-cliente-request.dto';


import { RegisterClienteResponse } from '../dtos/response/register-cliente-response.dto';

import { ClienteType } from '../../domain/enums/cliente-type.enum';
import { UpdateResult }  from 'typeorm'

@Injectable()
export class ClienteApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerClienteValidator: RegisterClienteValidator,

  ) {}



  async register(
    registerClienteRequest: RegisterClienteRequest,
  ): Promise<Result<AppNotification, RegisterClienteResponse>> {
    const notification: AppNotification = await this.registerClienteValidator.validate(registerClienteRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = registerClienteRequest.createdBy;
    const updatedAt = null;
    const updatedBy = null;
    const registerPerson: RegisterCliente = new RegisterCliente(
      registerClienteRequest.firstName,
      registerClienteRequest.lastName,
      registerClienteRequest.dni,
      ClienteType.CREADO,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const customerId: number = await this.commandBus.execute(registerPerson);
    const registerResponse: RegisterClienteResponse = new RegisterClienteResponse(
      customerId,
      registerClienteRequest.firstName,
      registerClienteRequest.lastName,
      registerClienteRequest.dni,
    );
    return Result.ok(registerResponse);
  }
}