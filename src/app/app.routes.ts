import { Routes } from '@angular/router';
import { ProductoComponent } from './listar-producto/producto.component';
import { FabricanteComponent } from './listar-fabricante/fabricante.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { AlmacenesComponent } from './almacenes/almacenes.component';
import { EditarComponent } from './editar-producto/editar-producto.component';
import { EditarFabricanteComponent } from './editar-fabricante/editar-fabricante.component';
import { RegistrarFabricanteComponent } from './registrar-fabricante/registrar-fabricante.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoComponent }, // Ruta para el componente Producto
  { path: 'registrar-producto', component: RegistrarProductoComponent, },
  { path: 'editar-producto/:id', component: EditarComponent },
  { path: 'fabricantes', component: FabricanteComponent }, // Ruta para el componente Proovedores
  { path: 'editar-fabricante/:id', component: EditarFabricanteComponent },
  { path: 'registrar-fabricante', component: RegistrarFabricanteComponent},
  { path: 'almacenes', component: AlmacenesComponent}, // Ruta para el componente Almacenes
  { path: '', redirectTo: 'productos', pathMatch: 'full' }, // Ruta sin especificar
];
