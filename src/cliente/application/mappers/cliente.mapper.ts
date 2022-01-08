import { Cliente } from '../../domain/entities/cliente.entity';

import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { ClienteTypeORM } from '../../infrastructure/persistence/typeorm/entities/cliente.typeorm';

import { PersonNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/person-name.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';


export class ClienteMapper {
  public static toTypeORM(convocatoria: Cliente): ClienteTypeORM {
    const personTypeORM: ClienteTypeORM = new ClienteTypeORM();
    personTypeORM.name = PersonNameTypeORM.from(convocatoria.getName().getFirstName(), convocatoria.getName().getLastName());
    personTypeORM.dni = DniTypeORM.from(convocatoria.getDni().getValue());
    const createdAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedAt() != null ? convocatoria.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getCreatedBy() != null ? convocatoria.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedAt() != null ? convocatoria.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = convocatoria.getAuditTrail() != null && convocatoria.getAuditTrail().getUpdatedBy() != null ? convocatoria.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    personTypeORM.auditTrail = auditTrailTypeORM;
    return personTypeORM;
  }
}