import { AggregateRoot } from '@nestjs/cqrs';
import { ClienteId } from '../value-objects/cliente-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../../../common/domain/value-objects/dni.value';
import { PersonName } from '../../../common/domain/value-objects/person-name.value';
import { ClienteRegistered } from '../events/cliente-registered.event';


export class Cliente extends AggregateRoot {
  protected id: ClienteId;
  private name: PersonName;
  private dni: Dni;
  private state: number;
  protected readonly auditTrail: AuditTrail;

  public constructor(name: PersonName, dni: Dni, auditTrail: AuditTrail, state: number) {
    super();
    this.name = name;
    this.auditTrail = auditTrail;
    this.dni = dni;
    this.state = state;
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
  public getId(): ClienteId {
    return this.id;
  }

  public changeId(id: ClienteId) {
    this.id = id;
  }

  public getState() : number {
    return this.state;
  }
  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }




  public register() {
    const event = new ClienteRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
    this.apply(event);
  }

}