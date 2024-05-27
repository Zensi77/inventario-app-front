import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, RouterLink } from '@angular/router';
import { Almacen, Producto, ProductoAlmacen } from '../Models';
import { AlmacenService } from '../almacen.service';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

// Imports de Angular Material para la tabla
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ProductoAlmacenService } from '../producto-almacen.service';

@Component({
  selector: 'app-almacenes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './almacenes.component.html',
  styleUrl: './almacenes.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AlmacenesComponent implements OnInit {
  almacenes: Almacen[] = []; // Lista de almacenes
  listaArticulos: ProductoAlmacen[] = []; // Lista de productos de un almacén

  listaArticulosGeneral: Producto[] = []; // Lista de productos generales
  listaArticulosGeneralFiltrada: Producto[] = []; // Lista de productos generales filtrada

  almacenSeleccionado: Almacen | any = null; // Almacén seleccionado
  almacenEditar: Almacen | any = null; // Almacén a editar

  almacenesFiltrados: Almacen[] = []; // Lista de almacenes filtrados
  listaArticulosFiltrados: ProductoAlmacen[] = []; // Lista de productos de un almacén filtrados

  insertarProductoAlmacen: ProductoAlmacen | any = null; // Producto a insertar en un almacén
  almacenNuevo: Almacen | any = null;
  almacenBorrar: Almacen | any = null;
  productosNuevos: ProductoAlmacen[] = []; // Lista de productos a insertar en un almacén

  private modal: any;

  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'precio',
    'fabricante',
    'imagen',
    'cantidad',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ProductoAlmacen>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private almacenService: AlmacenService,
    private ProductoAlmacenService: ProductoAlmacenService,
    private ProductoService: ProductoService
  ) {}

  ngOnInit() {
    this.almacenSeleccionado = null;
    this.obtenerAlmacenes();
  }

  // Método para obtener los almacenes
  obtenerAlmacenes() {
    this.almacenService.obtenerAlmacenes().subscribe((almacenes) => {
      this.almacenes = almacenes;
      this.almacenesFiltrados = almacenes;
    });
  }

  // Método para seleccionar un almacén y mostrar los productos que contiene
  seleccionarAlmacen(almacen: Almacen) {
    this.almacenSeleccionado = almacen;
    this.ProductoAlmacenService.obtenerProductos(
      this.almacenSeleccionado
    ).subscribe((productos) => {
      this.listaArticulosFiltrados = productos;
      this.listaArticulos = productos;
      this.dataSource.data = productos;
    });

    setTimeout(() => {
      // Se espera un tiempo para que se cargue la tabla
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }

  // Método para modificar la cantidad de un producto en un almacén
  modifCantidad(productoAlmacen: ProductoAlmacen, cantidad: number) {
    this.ProductoAlmacenService.modificarProductoAlmacen(
      productoAlmacen,
      cantidad
    );

    setTimeout(() => {
      // Se espera un tiempo para que se cargue la tabla y mostrar los cambios
      this.seleccionarAlmacen(this.almacenSeleccionado);
    }, 100);
  }

  // Método para eliminar un producto de un almacén
  eliminarArticuloAlmacen(producto: ProductoAlmacen) {
    this.ProductoAlmacenService.eliminarArticuloAlmacen(
      producto.producto,
      producto.almacen
    );

    setTimeout(() => {
      // Se espera un tiempo para que se cargue la tabla
      this.seleccionarAlmacen(this.almacenSeleccionado);
    }, 100);
  }

  // Método para agregar un almacén
  agregarAlmacen() {
    this.almacenNuevo = {
      id_alamcen: null,
      nombre: '',
      direccion: '',
      telefono: '',
    };
  }

  // Método para agregar un producto a un almacén
  agregarProductoAlmacen() {
    this.ProductoService.obtenerProductos().subscribe((productos) => {
      this.listaArticulosGeneral = productos;
      this.listaArticulosGeneralFiltrada = productos;
    });
    this.insertarProductoAlmacen = new ProductoAlmacen();

    console.log(this.listaArticulosGeneral.length);
  }

  // Método para filtrar los productos generales, todos los productos que se pueden agregar a un almacén
  filtrarArticulosNuevos(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.listaArticulosGeneralFiltrada = this.listaArticulosGeneral.filter(
      (producto) => {
        return producto.nombre.toLowerCase().includes(valor.toLowerCase());
      }
    );
  }

  // Método para agregar un producto a la lista de productos que se van a agregar a un almacén
  agregarListaProductos(producto: ProductoAlmacen) {
    console.log(producto);
    this.productosNuevos.push(producto); // Se agrega el producto a la lista y se muestra en el form

    this.insertarProductoAlmacen = new ProductoAlmacen();
    console.log(this.productosNuevos.length);
  }

  // Método para editar un almacén y mostrar el formulario
  editarAlmacen(almacen: Almacen, event: Event) {
    event.stopPropagation(); // Evita que el evento se propague a otros elementos
    this.almacenEditar = almacen;
  }

  // Metodo para abrir una ventana modal de confirmación para borrar un almacén
  openModal(almacen: Almacen, event: Event) {
    event.stopPropagation();
    this.almacenBorrar = almacen;

    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      // Se crea una nueva instancia de la clase Modal de Bootstrap
      this.modal = new (window as any).bootstrap.Modal(modalElement);
      // Se muestra el modal
      this.modal.show();
    }
  }

  // Método para borrar un almacén, es llamada desde el modal de confirmación
  confirmDelete() {
    this.almacenService
      .borrarAlmacen(this.almacenBorrar.id_almacen)
      .subscribe(() => {
        this.obtenerAlmacenes();
        this.almacenBorrar = null;
      });

    this.modal.hide();
  }

  // Método para cancelar el borrado de un almacén
  cancelDelete() {
    this.almacenBorrar = null;
  }

  // Método para filtrar los almacenes segun la busqueda
  filtrarAlmacenes(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.almacenesFiltrados = this.almacenes.filter((almacen) => {
      return almacen.nombre.toLowerCase().includes(valor.toLowerCase());
    });
  }

  // Método para filtrar los productos de un almacén
  filtrarProductosAlmacen(event: Event) {
    const filter = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filter.trim().toLowerCase();
  }

  // Envio de formulario para editar un almacén
  onSubmitEditar() {
    return this.almacenService
      .actualizarAlmacen(this.almacenEditar)
      .subscribe(() => {
        this.obtenerAlmacenes();
        this.almacenEditar = null; // Regrasa a null para ocultar el formulario
      });
  }

  // Envio de formulario para agregar un almacén
  onSubmitAgregar() {
    this.almacenService.registrarAlmacen(this.almacenNuevo).subscribe(() => {
      this.obtenerAlmacenes();
      this.almacenNuevo = null;
    });
  }

  // Envio de formulario para agregar un producto a un almacén
  onSubmitAgregarProductoAlmacen() {
    for (let i = 0; i < this.productosNuevos.length; i++) {
      this.productosNuevos[i].almacen = this.almacenSeleccionado;
      this.ProductoAlmacenService.insertarProductoAlmacen(
        this.productosNuevos[i]
      );
    }

    this.productosNuevos = []; // Se limpia la lista de productos a introducir
    this.insertarProductoAlmacen = null; // Se oculta el formulario cambiando el template
    setTimeout(() => {
      this.seleccionarAlmacen(this.almacenSeleccionado);
    }, 100);
  }

  // Método para cancelar la edición de un almacén y cambiar el template
  cancelarEdicion() {
    this.almacenEditar = null;
  }
}
