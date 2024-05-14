import { Component } from '@angular/core';
import { Fabricante, Producto, Almacen } from '../Models';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router'; //Sirve para redirigir a otra ruta
import { FormsModule } from '@angular/forms'; // Se importa FormsModule para poder usar ngModel
import { FabricanteService } from '../fabricante.service';
import { AlmacenService } from '../almacen.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Servicio para mostrar notificaciones
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './registrar-producto.component.html',
  styleUrl: './registrar-producto.component.css',
})
export class RegistrarProductoComponent {
  fabricantes: Fabricante[]; // Se crea un array de fabricantes
  almacenes: Almacen[];
  producto: Producto = {
    id: { idProducto: '', id_almacen: 0 },
    nombre: '',
    descripcion: '',
    precio: 0,
    existencia: 0,
    fabricante: { id_fabricante: 0, nombre: '', direccion: '', telefono: '' },
    almacen: { id_almacen: 0, nombre: '', direccion: '', telefono: '' },
  };

  constructor(
    private AlmacenService: AlmacenService,
    private productoService: ProductoService,
    private fabricanteService: FabricanteService,
    private httpCliente: HttpClient,
    private enrutador: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Se obtienen los fabricantes
    this.fabricanteService
      .obtenerFabricantes()
      .subscribe((fabricantes) => (this.fabricantes = fabricantes));

    // Se obtienen los almacenes
    this.AlmacenService.obtenerAlmacenes().subscribe(
      (almacenes) => (this.almacenes = almacenes)
    );
  }

  // Metodo para registrar un producto
  onSubmit() {
    this.productoService
      .agregarProducto(this.producto)
      .subscribe((producto) => {
        this.toastr.success(
          'Producto registrado con exito',
          'Registro exitoso'
        );
        this.enrutador.navigate(['/productos']);
      });
  }
}
