import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { ClienteTypeORM } from '../../infrastructure/persistence/typeorm/entities/cliente.typeorm';
import { RegisterClienteRequest } from '../dtos/request/register-cliente-request.dto';

@Injectable()
export class RegisterClienteValidator {
  private  MAX_LENGTH: number = 8;
  constructor(
    @InjectRepository(ClienteTypeORM)
    private clienteRepository: Repository<ClienteTypeORM>,
  ) {
  }

  public async validate(
    registerPersonRequest: RegisterClienteRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPersonRequest.firstName ? registerPersonRequest.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPersonRequest.lastName ? registerPersonRequest.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: String = String(registerPersonRequest.dni) ;
    if (dni.length  != this.MAX_LENGTH ) {
      notification.addError('dni length is not valid', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: ClienteTypeORM = await this.clienteRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (customer != null) {
      notification.addError('dni is taken', null);
    }
    return notification;
  }
}