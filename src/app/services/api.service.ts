import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productos } from './productos';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  // API nodejs y postgresql
  API: string = "http://localhost"

  constructor(private clientHttp: HttpClient) { }

  sendProducto(dataPerson: productos): Observable<any> {
    return this.clientHttp.post(this.API+"/insert.php", dataPerson);
  }

  updatePerson(id:any, dataPerson: productos): Observable<any> {
    return this.clientHttp.put(this.API + "/update.php", dataPerson);
  }

  getProductos() {
    return this.clientHttp.get(this.API + "/read.php")
  }

  trashPerson(id: any): Observable<any> {
    return this.clientHttp.delete(this.API + "/" + id);
  }


}
