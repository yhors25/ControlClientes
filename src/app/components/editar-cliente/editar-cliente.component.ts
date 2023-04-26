import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent {
  id: number;
  cliente: Cliente;
  form: FormGroup;

  constructor(
    private _clienteService: ClienteService,
    private fb: FormBuilder,
    private _toastService: ToastrService,
    private router: Router,
    private activRoute: ActivatedRoute
  ) {
    this.id = activRoute.snapshot.params['id'];
    this.cliente = _clienteService.getCliente(this.id);
    console.warn(this.cliente);

    this.form = this.fb.group({
      nombre: [
        this.cliente.nombre,
        [Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
      apellido: [
        this.cliente.apellido,
        [Validators.required, Validators.minLength(3), Validators.maxLength(5)],
      ],
      email: [
        this.cliente.email,
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(google|facebook|yahoo).com$'
          ),
        ],
      ],
      saldo: [
        this.cliente.saldo,
        [Validators.required, Validators.pattern('^[0-9]+.?[0-9]*$')],
      ],
    });
  }

  guardarCliente() {
    let nuevoClinete: Cliente = this.form.value;
    this._clienteService.updateCliente(this.id, nuevoClinete);
    this.router.navigate(['/']);
    this._toastService.warning(
      'Se edito el cliente exitosamente',
      'Cliente Actualizado'
    );
  }

  eliminarCliente() {
    this._clienteService.deleteCliente(this.id);
    this.router.navigate(['/']);
    this._toastService.error(
      'Se elimino el cliente exitosamente',
      'Cliente eliminado'
    );
  }
}
