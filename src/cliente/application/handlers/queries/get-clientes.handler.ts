
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';

import { GetClientesDto } from '../../dtos/queries/get-clientes.dto';
import { GetClientesQuery } from '../../queries/get-clientes.query';

@QueryHandler(GetClientesQuery)
export class GetClientesHandler implements IQueryHandler<GetClientesQuery> {
  constructor() {}

  async execute(query: GetClientesQuery) {
    const manager = getManager();
    //sql server
    var sql = "SELECT [id],[first_name],[last_name],[dni],[created_at],[created_by],[updated_at],[updated_by],[state] FROM [clientes] where state in (1)";
    //mysql
    sql = "SELECT id,first_name,last_name,dni,created_at,created_by,updated_at,updated_by,state FROM clientes where state in (1)";
    
    const ormCliente = await manager.query(sql);
    if (ormCliente.length <= 0) {
      return [];
    }

    const convocatorias: GetClientesDto[] = ormCliente.map(function (ormCustomer) {
      let clienteDto = new GetClientesDto();
      clienteDto.id = Number(ormCustomer.id);
      clienteDto.first_name = ormCustomer.first_name;
      clienteDto.last_name = ormCustomer.last_name;
      clienteDto.dni = ormCustomer.dni;
      clienteDto.createdAt = ormCustomer.created_at;
      clienteDto.createdBy = ormCustomer.created_by;
      clienteDto.updatedAt = ormCustomer.updated_at;
      clienteDto.updatedBy = ormCustomer.updated_by;
      clienteDto.state = ormCustomer.state;
      return clienteDto;
    });
    return convocatorias;
  }
}