export class RegisterClienteResponse {
    constructor(
      public id: number,
      public readonly firstName: string,
      public readonly lastName: string,
      public readonly dni: string
    ) {}
  }