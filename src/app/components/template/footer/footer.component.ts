import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  menus : object[]=null;
  user:any;
  constructor(public authService:AuthService, private router:Router) { 
    this.user= JSON.parse(sessionStorage.getItem('usuario')); 
  }
  ngOnInit(): void {
    this.menu();
  }

  logout():void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito`, 'success')
    this.router.navigate(['/']);
  }
  menu():void{
    if(this.authService.isAuthenticated()){
      this.menus=this.user.accesos;
    }
  }
}
