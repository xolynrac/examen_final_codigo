import { AggregateRoot } from '@nestjs/cqrs';
import { ConvocatoriaId } from '../value-objects/convocatoria-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';
import { ClienteRegistered } from '../events/cliente-registered.event';


export class Cliente extends AggregateRoot {
  protected id: ConvocatoriaId;
  private name: PersonName;
  private dni: Dni;
  protected readonly auditTrail: AuditTrail;

  public constructor(name: PersonName, dni: Dni, auditTrail: AuditTrail) {
    super();
    this.name = name;
    this.auditTrail = auditTrail;
    this.dni = dni;
  }

  public getName(): PersonName {
    return this.name;
  }

  public changeName(name: PersonName): void {
    this.name = name;
  }
  public getDni(): Dni {
    return this.dni;
  }
  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
  public getId(): ConvocatoriaId {
    return this.id;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: ConvocatoriaId) {
    this.id = id;
  }


  public register() {
    const event = new ClienteRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
    this.apply(event);
  }

}