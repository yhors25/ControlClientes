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
      nombre: 'Yhors Brayan',
      apellido: 'X',
      email: 'yhors@google.com',
      saldo: 500,
    },
    {
      nombre: 'Monica',
      apellido: 'P',
      email: 'moni@google.com',
      saldo: 365,
    },
    {
      nombre: 'juan',
      apellido: 'peres',
      email: 'jp@facebook.com',
      saldo: 450,
    },
    {
      nombre: 'Julian',
      apellido: 'peres',
      email: 'jjp@facebook.com',
      saldo: 702,
    },
  ];
}
