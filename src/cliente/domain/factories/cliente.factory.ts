import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { Cliente } from '../entities/cliente.entity';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';

export class ClienteFactory {
  public static createFrom(name: PersonName, dni: Dni, auditTrail: AuditTrail, status: number): Cliente {
    return new Cliente(name, dni, auditTrail, status);
  }
}