import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprestamosService {
  url = 'http://localhost/';

  constructor(private http: HttpClient) { }
  
  recuperarTodos() {
    return this.http.get(`http:/localhost/recuperarprestamos.php`);
  }
  prestamo(prestamo) {
    alert(prestamo);
    alert(JSON.stringify(prestamo));
    alert('entrando');
    return this.http.post(`${this.url}prestarlibro.php`, JSON.stringify(prestamo));
  }
}
