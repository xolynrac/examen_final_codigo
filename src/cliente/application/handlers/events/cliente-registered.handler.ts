import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClienteRegistered } from '../../../domain/events/cliente-registered.event';

@EventsHandler(ClienteRegistered)
export class ClienteRegisteredHandler implements IEventHandler<ClienteRegistered> {
  constructor() {}

  handle(event: ClienteRegistered) {
    console.log('handle logic for ClienteRegistered');
    console.log(event);
  }
}