import { Component, OnInit } from '@angular/core';
import { SprestamosService } from '../../servicios/sprestamos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  prestamos = null;
  pre = {
    id : null,
    idL : null,
    idU : null,
    usuario : null,
    libro : null,
    fechaPrestamo: null,
    fechaDevolucion: null,
    estado : null
  };

    resultado = '';

    operaciones = [
      {valor: 'prestarp', muestraValor: 'Prestamo'},
      {valor: 'devolverp', muestraValor: 'Devolucion'},
      {valor: 'renovarp', muestraValor: 'Renovar'},
      {valor: 'consultarp', muestraValor: 'Consultar Prestamos'}
    ];
    seleccionada: string = this.operaciones[0].valor;

    operar() {
      switch (this.seleccionada) {
        case 'pagregar' : this.prestarlibro(); this.resultado = 'prestamo agregado'; break;
        case 'pdevuelto' : this.resultado = 'prestamo devuelto';  break;
        case 'prenovar' : this.resultado = 'libro renovado';  break;
        case 'pconsultar' : this.resultado = 'consultar prestamos'; break;
      }
    }

  constructor(private prestamosServicio: SprestamosService) { }

  ngOnInit(): void {
  }
  irprestamos() {
    this.resultado = 'Prestamo';
  }
  prestarlibro() {
    this.prestamosServicio.prestamo(this.pre).subscribe(datos => {
    if (datos['resultado'] === 'OK') {
      alert('prestamo exitoso');
      alert(datos['mensaje']);
    }  else {
      alert('error al grabar');
    }
  });
}
  recuperarprestamos() {
    this.prestamosServicio.recuperarTodos().subscribe(result => this.prestamos = result);
}

}
