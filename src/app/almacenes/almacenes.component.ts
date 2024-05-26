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
  almacenes: Almacen[] = [];
  listaArticulos: ProductoAlmacen[] = [];
  listaArticulosGeneral: Producto[] = [];
  listaArticulosGeneralFiltrada: Producto[] = [];
  almacenSeleccionado: Almacen | any = null;
  almacenEditar: Almacen | any = null;
  almacenesFiltrados: Almacen[] = [];
  listaArticulosFiltrados: ProductoAlmacen[] = [];
  insertarProductoAlmacen: ProductoAlmacen | any = null;
  almacenNuevo: Almacen | any = null;
  almacenBorrar: Almacen | any = null;
  productosNuevo: Producto[] = [];

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
    private router: Router,
    private route: ActivatedRoute,
    private almacenService: AlmacenService,
    private ProductoAlmacenService: ProductoAlmacenService,
    private ProductoService: ProductoService
  ) {}

  ngOnInit() {
    this.almacenSeleccionado = null;
    this.obtenerAlmacenes();
  }

  obtenerAlmacenes() {
    this.almacenService.obtenerAlmacenes().subscribe((almacenes) => {
      this.almacenes = almacenes;
      this.almacenesFiltrados = almacenes;
    });
  }

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

  agregarAlmacen() {
    this.almacenNuevo = {
      id_alamcen: null,
      nombre: '',
      direccion: '',
      telefono: '',
    };
  }

  agregarProductoAlmacen() {
    this.ProductoService.obtenerProductos().subscribe((productos) => {
      this.listaArticulosGeneral = productos;
      this.listaArticulosGeneralFiltrada = productos;
    });
    this.insertarProductoAlmacen = new ProductoAlmacen();

    console.log(this.listaArticulosGeneral.length);
  }

  filtrarArticulosNuevos(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.listaArticulosGeneralFiltrada = this.listaArticulosGeneral.filter(
      (producto) => {
        return producto.nombre.toLowerCase().includes(valor.toLowerCase());
      }
    );
  }

  editarAlmacen(almacen: Almacen, event: Event) {
    event.stopPropagation(); // Evita que el evento se propague a otros elementos
    this.almacenEditar = almacen;
  }

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

  confirmDelete() {
    this.almacenService
      .borrarAlmacen(this.almacenBorrar.id_almacen)
      .subscribe(() => {
        this.obtenerAlmacenes();
        this.almacenBorrar = null;
      });

    this.modal.hide();
  }

  cancelDelete() {
    this.almacenBorrar = null;
  }

  mostrarAlmacen(almacen: Almacen, event: Event) {
    event.stopPropagation(); // Evita que el evento se propague a otros elementos
  }

  filtrarAlmacenes(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.almacenesFiltrados = this.almacenes.filter((almacen) => {
      return almacen.nombre.toLowerCase().includes(valor.toLowerCase());
    });
  }

  filtrarProductosAlmacen(event: Event) {
    const filter = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filter.trim().toLowerCase();
  }

  onSubmitEditar() {
    return this.almacenService
      .actualizarAlmacen(this.almacenEditar)
      .subscribe(() => {
        this.obtenerAlmacenes();
        this.almacenEditar = null; // Regrasa a null para ocultar el formulario
      });
  }

  onSubmitAgregar() {
    this.almacenService.registrarAlmacen(this.almacenNuevo).subscribe(() => {
      this.obtenerAlmacenes();
      this.almacenNuevo = null;
    });
  }

  onSubmitAgregarProductoAlmacen() {}

  cancelarEdicion() {
    this.almacenEditar = null;
  }
}
