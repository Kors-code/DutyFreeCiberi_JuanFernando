import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Permisos, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  count:any;
  public user;
  public identity:User;
  public token:any;
  public company:string = '';
  public pCompany: any;
  public pOperacion:any;
  public appsActivas=undefined;
  public video:string = 'IYN613eTUkY';
  public errorMessage:any;
  public loading: boolean = true;
  public Online:boolean = true;

  public operaciones=[]=[];
  public Modulos;
  public hide:any;
  status: boolean = false;

    ip: string = ''

  constructor(
    // private printService: PrintService,
    private platform: Platform,
    private _userService:UserService,
    
    private _router:Router,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
) {
  // this.pCompany = this._userService.getPredetermidaCompany();
  this.identity = this._userService.getIdentity();
  this.user = new User();
  this.Modulos = new Permisos().permisos;  
}


browser:any
ngOnInit(): void {
  if(this.platform.isBrowser){
    this.browser = true;    
   }
  
}



Register(){
  this.user.portada = ''
  this.user.perfil = 'La Mejor Energia Proviene de Ti!';
  this.user.confirm = true;
  this.user.origen = 'Master';
  this.user.rol = 'Admin';
  this.user.modulos = this.Modulos;
  this.loading  = true;
   this._userService.saveUser(this.user).subscribe(
     response => {
       let user = response.user;
  
        if(!user._id){
  
        this.loading  = false;
      }else {
        this.user = new User();
     
        this.loading = false;
        let data: Object
        data = {titulo: 'Registro Exitoso!', info:'Usuario Generado Correctamente ', icon:'done_all' }

        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        
        });
  
        dialogRef.afterClosed().subscribe(result => {

          this.loading  = false;
        })

        }
     },
     error => {
       var errorMessage = <any>error;
       if(errorMessage != null){
           var body = JSON.parse(error._body);
           this.errorMessage = body.message;
          this.loading  = false;
          //  this._loadingService.resolve();
         }
     });

}

getOPeracionesCompany(){
  // this._operacionesService.getOperacionesCompany(this.pCompany._id).subscribe(
  //   res=>{
  //     // //res);
  //     if(res.operaciones){
  //       this.operaciones = res.operaciones;
  //     }
  //   })
}


downloadFile(data: any, title:string) {
  const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
  const header = Object.keys(data[0]);
  let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');

  var a = document.createElement('a');
  var blob = new Blob([csvArray], {type: 'text/csv' }),
  url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = title+".csv";
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}


public login(){
  
  this.loading = true;   
  var password = this.user.password;

  this._userService.singup(this.user).subscribe(
    response =>{
     
      let identity = response.user;
      this.identity = identity;
      // //this.identity);

      // this.companyString = this.identity.company[0]
      // this.companyString = JSON.stringify(this.identity.company[0]);
      if(!this.identity){
   
      }else{
        //crear elemento localStorage
        localStorage.setItem('identity', JSON.stringify(identity));
        // conseguir token
        this._userService.singup(this.user, 'true').subscribe(
            response =>{
              // this.registerAdminUser(this.identity);
               console.log(response);
              let token = response.token;
              this.token = token;
              // //this.token);
              if(this.token.length <= 0){
                        
              }else{

                //crear elemento localStorage
                localStorage.setItem('token', token);
              
                
              }
            },
            error =>{
              console.log(error)
              // var errorMessage = <any>error;
              // if(errorMessage != null){
              //     var body = JSON.parse(error._body);
              //     this.errorMessage = body.message;
              //    //  //error);
              //   //  this._dialogService.openAlert({
              //   //    message: '' + this.errorMessage,
              //   //    title: 'Error',
              //   //    closeButton: 'Cerrar',
              //   //  });
              //     // this.log = false;
              //   }
            }
          );
      }
      
    },
    error =>{
       var errorMessage = <any>error;
       console.log(error)
    if(errorMessage != null){
        var body = JSON.parse(error);
        this.errorMessage = body.message;
        // //error);

      let data: Object
      data = {titulo: 'Error de Acceso', info:this.user.email +' Usuario Sin Credenciales de ingreso', icon:'lock' }

      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      
      });

      dialogRef.afterClosed().subscribe(result => {

      })
      //  this._dialogService.openAlert({
      //    message: '' + this.errorMessage,
      //    title: 'Error',
      //    closeButton: 'Cerrar',
      //  });
      //   this.log = false;
      }
    }

  );
}





ngDoCheck() {
  this.identity = this._userService.getIdentity();
  // //this.identity)
  // this.pCompany = this._userService.getPredetermidaCompany();
  // this.pOperacion = this._userService.getPredetermidaOperacion();
  this.token = this._userService.getToken();
}


goCompanys(){
  this._router.navigate(['Admin/Company']);
}

Logout(){

  localStorage.clear(); 

  this.identity = new User();
  this._router.navigate(['/']);
}


}

