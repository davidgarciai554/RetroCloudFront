import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumenComponent } from "./resumen/resumen.component";

@Component({
  selector: 'app-root',
  imports: [ ResumenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'almacenamiento-juegos';
}
