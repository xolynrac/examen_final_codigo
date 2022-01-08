import { Module } from '@nestjs/common';
import { ClienteController } from './api/cliente.controller';

import { CqrsModule } from '@nestjs/cqrs';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteTypeORM } from './infrastructure/persistence/typeorm/entities/cliente.typeorm';
import { ClienteRegisteredHandler } from './application/handlers/events/cliente-registered.handler';

import { GetClientesHandler } from './application/handlers/queries/get-clientes.handler';
import { GetClienteByIdHandler } from './application/handlers/queries/get-cliente-id.handler';

import { RegisterClienteHandler } from './application/handlers/commands/register-cliente.handler';

import { ClienteApplicationService } from './application/services/cliente-application.service';

import { RegisterClienteValidator } from './application/validators/register-cliente.validator';

export const CommandHandlers = [ RegisterClienteHandler ];
export const EventHandlers = [ ClienteRegisteredHandler ];
export const QueryHandlers = [ GetClientesHandler, GetClienteByIdHandler ];
/* export const CommandHandlers = [ RegisterClienteHandler, DeleteConvocatoriaHandler, PublicarConvocatoriaHandler ];
export const EventHandlers = [ ClienteRegisteredHandler ];
export const QueryHandlers = [ GetConvocatoriaHandler, GetConvocatoriaByIdHandler]; */

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ClienteTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [ClienteController],
  providers: [
    ClienteApplicationService,
    RegisterClienteValidator,

    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClienteModule {}