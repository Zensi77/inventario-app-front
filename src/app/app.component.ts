import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router'; // Se importa RouterLink para poder usarlo en el template
import { ProductoComponent } from './listar-producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ProductoComponent,
    HttpClientModule,
    RouterLink,
  ],
  animations: [fadeAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'inventario-app';

  o: any;
}
