import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { ChangePass } from './change-pass';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:ChangePass;
  public identity;
  public token:any;
  public errorMessage:any;
  public log: boolean = false;
  public company: string = '';
  public confirmNewpass:string = '';
  public id:string = '';
  invalidError:any;
  // public global: GlobalOffline;

  constructor(private _userService:UserService,
              private _router: Router,
              public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
             ) {
      //         this.global = new GlobalOffline();
      //  this.company = this.global.company;
       this.identity = this._userService.getIdentity();
       this.user = new ChangePass();

   }

  ngOnInit() {
    
    this.token = this._userService.getToken();
    // console.log(this.identity);
    this.user._id = this.identity._id;
    this.user.email = this.identity.email;
  }

  onSubmit(){

 
     this._userService.changePass(this.user).subscribe(
     response => {
        // this.user = response.user;
        if(!response.user._id){
          let data: Object
          data = {titulo: 'Error!', info:'No se realizo cambio de contraseña ' }

          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          
          });
    
          dialogRef.afterClosed().subscribe(result => {

          })
  
      }else{
        let data: Object
          data = {titulo: 'Info!', info:'Contraseña Actualizada Correctamente Ingrese Nuevamente! ' }

          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          
          });
    
          dialogRef.afterClosed().subscribe(result => {

          })
         this.log = false;
         this.Logout();
      }
    },
    error =>{
         var errorMessage = <any>error;
       if(errorMessage != null){
           var body = JSON.parse(error._body);
           this.errorMessage = body.message;
           let data: Object
          data = {titulo: 'Error!', info:' ' + this.errorMessage }

          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          
          });
    
          dialogRef.afterClosed().subscribe(result => {

          })

           this.log = false;
         }
    }
     )
}

Logout(){
  localStorage.removeItem('identity');
  localStorage.removeItem('token');
  this.identity = null;
  this.token = null;
  this._router.navigate(['/']);
} 

isPasswordMach(){
  const val = this.user;
  return val && val.password != '' && val.newpass != '' && val.confirm != '' && val.newpass == val.confirm ;
}

}