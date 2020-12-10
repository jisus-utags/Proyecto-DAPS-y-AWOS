import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlibrosService {
  url = 'http://localhost/';

  constructor(private http: HttpClient) { }
 
  recuperarTodos() {
    return this.http.get(`http:/localhost/recuperarlibros.php`);
  }

  alta(libro) {
    alert(libro);
    alert(JSON.stringify(libro));
    alert('libro registrado');
    return this.http.post(`${this.url}/libros/registrar`, JSON.stringify(libro));
  }
}
