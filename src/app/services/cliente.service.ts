import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor() {}

  updateCliente(id: number, cliente: Cliente) {
    this.clientes[id] = cliente;
  }

  deleteCliente(id: number) {
    this.clientes.splice(id, 1);
  }

  getClientes() {
    return this.clientes;
  }

  getCliente(id: number) {
    return this.clientes[id];
  }

  setCliente(listaCliente: Cliente[]) {
    this.clientes = listaCliente;
  }

  private clientes: Cliente[] = [
    {
      nombre: 'juan',
      apellido: 'peres',
      email: 'jp@gmail.com',
      saldo: 100,
    },
    {
      nombre: 'juan',
      apellido: 'peres',
      email: 'jp@gmail.com',
      saldo: 100,
    },
    {
      nombre: 'juan',
      apellido: 'peres',
      email: 'jp@gmail.com',
      saldo: 100,
    },
  ];
}
