import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  public empleados:Empleado[];
  public empleado:Empleado;
  constructor(private service:EmpleadoService, private router:Router) { 
    this.empleado = new Empleado();
  }

  ngOnInit(): void {
    this.listarEmpleados();
  }

  listarEmpleados(){
    this.service.getEmpleados().subscribe(data=>{
      this.empleados=data;
      console.log(data);
    })
  }

  /*addempleados(){
    console.log(this.empleado);
    Swal.fire({
      title: 'Estas seguro?',
      text: "Confirma la operacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.crearempleado(this.empleado)
    .subscribe(data =>{
    });
        this.router.navigate([''])
        Swal.fire(
          'Correcto!',
          'El empleado ha sido registrado.',
          'success'
          
        )
      }
    }) 
  
  }*/
  
}
