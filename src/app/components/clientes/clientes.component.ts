import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  form: FormGroup;
  id: number | undefined;
  accion = 'agregar';

  @ViewChild('btnClienteClose') btnClienteClose: ElementRef;

  constructor(
    private _clienteService: ClienteService,
    private fb: FormBuilder,
    private _toastService: ToastrService
  ) {
    this.id = undefined;
    this.clientes = _clienteService.getClientes();
    console.warn(this.clientes);

    this.form = this.fb.group({
      nombre: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      apellido: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(google|facebook|yahoo).com$'
          ),
        ],
      ],
      saldo: [
        '',
        [Validators.required, Validators.pattern('^[+-]?([0-9]*[.])?[0-9]*$')],
      ],
    });
  }

  getSaldoTotal() {
    let saldoTotal = 0;
    if (this.clientes.length > 0) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  guardarCliente() {
    // console.warn(this.form.value);
    let nuevoClinete: Cliente = this.form.value;

    if (this.id) {
      this.clientes[this.id] = nuevoClinete;
      this._toastService.warning(
        'Se edito el cliente exitosamente',
        'Cliente Actualizado'
      );
      this.id = undefined;
      this.accion = 'agregar';
    } else {
      this.clientes.push(nuevoClinete);
      this._toastService.success(
        'Se ingreso el cliente exitosamente',
        'Felicidades!!'
      );
    }
    this.form.reset();
    this.cerrarModal();
    this.setListaCliente();
  }

  editarCliente(e: Cliente, idCliente: number) {
    console.log(e);
    this.id = idCliente;
    this.accion = 'editar';

    this.form.patchValue({
      nombre: e.nombre,
      apellido: e.apellido,
      email: e.email,
      saldo: e.saldo,
    });
  }

  eliminarCliente(e: number) {
    this.clientes.splice(e, 1);
    this._toastService.success(
      'Se elimino el cliente exitosamente',
      'Cliente eliminado'
    );

    this.setListaCliente();
  }

  private setListaCliente() {
    this._clienteService.setCliente(this.clientes);
  }

  private cerrarModal() {
    this.form.reset();
    this.btnClienteClose.nativeElement.click();
  }

  btnCerrarModal() {
    this.accion = 'agregar';
    this.form.reset();
    this.btnClienteClose.nativeElement.click();
  }

}
