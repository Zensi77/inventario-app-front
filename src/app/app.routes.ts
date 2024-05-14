import { Routes } from '@angular/router';
import { ProductoComponent } from './listar-producto/producto.component';
import { FabricanteComponent } from './fabricante/fabricante.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { AlmacenesComponent } from './almacenes/almacenes.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoComponent }, // Ruta para el componente Producto
  { path: '', redirectTo: 'productos', pathMatch: 'full' }, // Ruta sin especificar
  { path: 'fabricantes', component: FabricanteComponent }, // Ruta para el componente Proovedores
  { path: 'almacenes', component: AlmacenesComponent }, // Ruta para el componente Almacenes
  { path: 'registrar-producto', component: RegistrarProductoComponent },
  { path: '**', component: NotFoundComponent }, // Ruta no encontrada (404), siempre debe ir al final
];
