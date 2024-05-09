import { Routes } from '@angular/router';
import { ProductoComponent } from './listar-producto/producto.component';
import { FabricanteComponent } from './fabricante/fabricante.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoComponent }, // Ruta para el componente Producto
  { path: '', redirectTo: 'productos', pathMatch: 'full' }, // Ruta sin especificar
  { path: '**', component: NotFoundComponent }, // Ruta no encontrada
  { path: 'fabricantes', component: FabricanteComponent }, // Ruta para el componente Proovedores
];
