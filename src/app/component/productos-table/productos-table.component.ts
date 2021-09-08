import { Component, OnInit, AfterViewInit,  ViewChild} from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { APIService } from 'src/app/services/api.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';

import { faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators, FormControl, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { HttpClient, HttpClientModule } from '@angular/common/http';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-productos-table',
  templateUrl: './productos-table.component.html',
  styleUrls: ['./productos-table.component.css'],
  providers: [DatePipe]
})
export class ProductosTableComponent implements AfterViewInit {
  
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  displayedColumns: string[] = ['id', 'descripcion', 'cantidad', 'lote', 'vencimiento', 'precio', "option"];
  public dataSource: MatTableDataSource<UserData>;

  faTrash = faTrash;
  faEdit = faEdit;
  id = ''
 

  Producto:any;

  dataTable(){
    this.APIservice.getProductos().subscribe(res=>{
      this.dataArray  = res;
      this.dataSource = new MatTableDataSource<UserData>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  trashPerson(id:any){
    console.log(id)
    Swal.fire({
      title: 'Seguro desea borrar persona?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.APIservice.trashPerson(id).subscribe(resp=>{
          console.log(resp);
          this.dataTable();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        })
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
  }

  editProducto(producto:any){
    console.log(producto)
    this.id=producto['id']
    this.formEdit.setValue({
      id:producto['id'],
      descripcion:producto['descripcion'],
      cantidad:producto['cantidad'],
      lote:producto['lote'],
      precio:producto['precio'],
      vencimiento:this.DatePipe.transform(producto['vencimiento'], 'yyyy-MM-dd', '+0500' )
    })
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private dataArray: any;
  ngAfterViewInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.dataTable()
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  iconsave = faSave
  iconclose = faWindowClose
  
  formProducto:FormGroup;
  formEdit:FormGroup;

  constructor(private http: HttpClient, private DatePipe: DatePipe, public form:FormBuilder, public formEditP:FormBuilder, private APIservice:APIService) {
    this.formEdit=this.form.group({
      id:[null, Validators.required],
      descripcion:[null, Validators.required],
      cantidad:[null, Validators.required],
      lote:[null, Validators.required],
      precio:[null, Validators.required],
      vencimiento:[null, Validators.required]
    });
    this.formProducto=this.form.group({
      descripcion:[null, Validators.required],
      cantidad:[null, Validators.required],
      lote:[null, Validators.required],
      precio:[null, Validators.required],
      vencimiento:[null, Validators.required]
    });
  }

  

  updateData():any{
    console.log(this.formEdit.value);
    this.APIservice.updatePerson(this.id,this.formEdit.value).subscribe(resp=>{
      console.log(resp);
      this.dataTable();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sendData(){
    console.log(this.formProducto.value);
    this.APIservice.sendProducto(this.formProducto.value).subscribe(resp=>{
      console.log(resp);
      this.dataTable();
      this.formProducto.reset;
      
    });
   
    $('#modelId').modal('hide');
  }

}


export interface UserData {
  id: string;
  fullname: string;
  bith: string;
}
