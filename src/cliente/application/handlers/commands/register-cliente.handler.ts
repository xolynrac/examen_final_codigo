import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteFactory } from '../../../domain/factories/cliente.factory';
import { ConvocatoriaId } from '../../../domain/value-objects/convocatoria-id.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { PersonName } from '../../../../common/domain/value-objects/person-name.value';

import { Cliente } from '../../../domain/entities/cliente.entity';
import { ClienteMapper } from '../../mappers/cliente.mapper';
import { ClienteTypeORM } from '../../../infrastructure/persistence/typeorm/entities/cliente.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../common/domain/value-objects/userid.value';
import { Dni } from '../../../../common/domain/value-objects/dni.value';

import { RegisterCliente } from '../../commands/register-cliente.command';


@CommandHandler(RegisterCliente)
export class RegisterClienteHandler
  implements ICommandHandler<RegisterCliente> {
  constructor(
    @InjectRepository(ClienteTypeORM)
    private personRepository: Repository<ClienteTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterCliente) {
    let convocatoriaId: number = 0;
    const personNameResult: Result<AppNotification, PersonName> = PersonName.create(command.firstName, command.lastName);
    if (personNameResult.isFailure()) {
      return convocatoriaId;
    }
 
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return convocatoriaId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );


    let person: Cliente = ClienteFactory.createFrom(personNameResult.value, dniResult.value, auditTrail);
    let personTypeORM: ClienteTypeORM = ClienteMapper.toTypeORM(person);
    personTypeORM = await this.personRepository.save(personTypeORM);
    if (personTypeORM == null) {
      return convocatoriaId;
    }
    convocatoriaId = Number(personTypeORM.id);
    person.changeId(ConvocatoriaId.of(convocatoriaId));
    person = this.publisher.mergeObjectContext(person);
    person.register();
    person.commit();
    return convocatoriaId;
  }
}