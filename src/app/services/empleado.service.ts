import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from '../models/empleado';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  htpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  
  private empleadosUrl:String ='http://localhost:9393/empleados';
  constructor(private http:HttpClient, private router:Router, private authService:AuthService) { }

  private addAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.htpHeaders.append('Authorization','Bearer '+ token);
    }
    return this.htpHeaders;
  }

  private isNoAutorization(e): boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getEmpleados(){
    return this.http.get<Empleado[]>(this.empleadosUrl+'/listar');
  }

  crearempleado(empleado:Empleado){
    return this.http.post<Empleado>(this.empleadosUrl+'/empleado', {headers:this.addAuthorizationHeader()}) .pipe(
    catchError(e=>{
      this.isNoAutorization(e);
      return throwError(e);
    }))
  }

}
