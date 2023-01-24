import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Operacion } from 'src/app/models/operacion';
import { Permisos, User } from 'src/app/models/user';
import { OperacionesService } from 'src/app/services/operacion.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public user:User;
  public identity:User;
  public companyUsers: User[] = [];
  public originUsers: User[] = [];
  public companyUsersArr: User[] = [];
  public token:any;
  public errorMessage:any;
  // public companyId:Company;
  // public company: Company;
  public log: boolean = false;
  public loading:any;
  public operaciones: Operacion[] = [];
  // public operacion: Operacion= undefined;
  // public identityOperacines:Operacion[];
  // public saveUserForm:FormGroup;
  public pCompany:any;
  public operacionuser:Operacion= new Operacion();

  public rol:any;
  invalidError:any
  public categorias:any;
  event_seat:any;

  Modulos:any;

  constructor(private _userService:UserService,
              private _router: Router,
              public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
              private _operacionesService: OperacionesService,
              ) {
                // this.company = GLOBAL.company;
                this.user = new User();
                this.identity = this._userService.getIdentity();
                // this.pCompany = this._userService.getPredetermidaCompany();
                // this.operacion = this._userService.getPredetermidaOperacion();
                this.Modulos = new Permisos().permisos;

                //console.log(this.Modulos)

  }


  ngOnInit() {
    
     this.token = this._userService.getToken();
     this.getUsers();
     this.getOperaciones();
    //  this.getCategorias();
  }

  addTodoModulo(){
    this.user.modulos = this.Modulos;
  }

  getCategorias(){
    //  //console.log('categorias');
          // this._productosService.getCategorias(this.pCompany._id).subscribe(
          //     result => {
          //       // this.filterCatMarca = result.categorias;
          //       // //console.log(result)
          //       if(!result.categorias){
                 
          //       }else{
          //         // this.categSelected = result.categorias[1]
          //         this.categorias = result.categorias;
                  
          //       }
          //       //  this._loadingService.resolve();
          //     },
          //     error => {
          //       var errorMessage = <any>error;
          //     if(errorMessage != null){
          //         var body = JSON.parse(error._body);
          //         this.errorMessage = body.message;
          //         //  //console.log(error);
           
                
          //     }
          //     //  this._loadingService.resolve();
          //     }
          // );
        
  }

  // categoria:ParametroProducto = new ParametroProducto();
  addCategoria(item:any, categ:any){
    // //console.log(item);
    // //console.log(categ);
    item.categorias.push(categ);
    // this.categoria = new ParametroProducto();
  }

  // deleteCategoria(item, i){
  //   item.categorias.splice(i,1);
  // }

  // addCategorias(item){
  //   item.categorias = this.categorias;
  // }

  modulos:any;
  changeModulo(){
    this.user.modulos.push(this.modulos);
    this.modulos = undefined;
    // //console.log(this.user)
  }

  changePass(item:any){
    this._userService.restablecerPassword(item).subscribe(res=>{
      //console.log(res)
      if(res){
        this.user = new User();
     
        this.loading = false;
        let data: Object
        data = {titulo: 'Clave Generica AAAA!', info:'El usuario ahora tiene una contraseña generica ', icon:'done_all' }

        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        
        });
  
        dialogRef.afterClosed().subscribe(result => {

          this.loading  = false;
        })

        }
      
    })
  }

  deleteModulo(i: number){
    this.user.modulos.splice(i,1);
    this.modulos = undefined;
    // //console.log(this.user)
  }


  search(search:string) {
   
    search = search.toLowerCase();
    if(search != ''){
    let usuariosArr: User[] = [];
    for( let user of this.companyUsers){
      let name = user.name.toLowerCase();
      if(name.indexOf(search) >= 0){
        usuariosArr.push(user);
        // //console.log(negociosArr)
      }
    }
    return this.companyUsers = usuariosArr;
    }else{

      return this.companyUsers = this.companyUsersArr;
      }
  }

  seachEstados(search:any){
    this.companyUsers= [];
  
    if(search == 'todos'){
      // //console.log('entro')
      return this.companyUsers = this.originUsers;
    }
    search = search.toLowerCase();
    if(search == 'activo'){
      // //console.log(search)
    let usuariosArr: User[] = [];
    for( let user of this.originUsers){
      let estado = user.estado.toLowerCase();
      if(estado.indexOf(search) >= 0){
        usuariosArr.push(user);
      }
    }
    return this.companyUsers = usuariosArr;
    }
    if(search == 'stoped'){
      // //console.log(search)
    let usuariosArr: User[] = [];
    for( let user of this.originUsers){
      let estado = user.estado.toLowerCase();
      if(estado.indexOf(search) >= 0){
        usuariosArr.push(user);
      }
    }
    return this.companyUsers = usuariosArr;
    }
    else{

      return this.companyUsers = this.companyUsersArr;
      }
  }


Register(){
  this.user.portada = ''
  this.user.perfil = 'La Mejor Energia Proviene de Ti!';
  this.user.password = 'AAAA'
  this.user.confirm = false;

  // this.user.company.push(this.pCompany._id);
  //  //console.log(this.user);
  //  //console.log(form);
  this.loading  = true;
   this._userService.saveUser(this.user).subscribe(
     response => {
       let user = response.user;
        // this.user = user;
        // //console.log(response);
        if(!user._id){
        //   this._dialogService.openAlert({
        //   message: 'No se Realizo el Registro del Usuario' + this.user.name,
        //   title: 'Error En Registro',
        //   closeButton: 'Cerrar',
        // });
        this.loading  = false;
      }else {
        this.user = new User();
        // this.getCompany();
        // form.reset();
        this.fadeDiv = 'listado';
        this.loading = false;
        let data: Object
        data = {titulo: 'Registro Exitoso!', info:'Usuario Generado Correctamente ', icon:'done_all' }

        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        
        });
  
        dialogRef.afterClosed().subscribe(result => {

          this.getUsers();
          this.loading  = false;
        })

        }
     },
     error => {
       var errorMessage = <any>error;
       if(errorMessage != null){
           var body = JSON.parse(error._body);
           this.errorMessage = body.message;
           //console.log(error);
          // this._dialogService.openAlert({
          //   message: '' + this.errorMessage,
          //   title: 'Error',
          //   closeButton: 'Cerrar',
          // });
          this.loading  = false;
          //  this._loadingService.resolve();
         }
     }

   );

}


add(){
      //  this.operaciones.push(this.operacion);
      //  this.user.setOperacion(this.operacion._id);

      //  for(var i = 0;i < this.identityOperacines.length; i++){
      //   if(this.identityOperacines[i]._id == this.operacion._id){
      //     // //console.log(i);
      //     this.identityOperacines.splice(i, 1);
      //   }
      //  }

       this.nuevo();
}

passUser(item:any){
  this.user = item;
  this.rol = item.rol;
  this.fadeDiv = 'register';
}

delete(item:any){
    // for(var i = 0;i < this.operaciones.length; i++){
    //   if(this.operaciones[i]._id == item){
    //     // //console.log(i);
    //     this.operaciones.splice(i, 1);
    //     // //console.log(this.destinatarios);
    //      this.user.deleteOperacion(i);
    //      this.nuevo();
    //   }
        // //console.log(this.user);
        // //console.log(this.companies);
    // }
    
}

Roles =[
  {titulo:'Admin'},
  {titulo:'User'}
]

nuevo(){
  this.user = new User();
  this.fadeDiv = 'register';
  // this.fade = 'register'
}

verOperaciones(){
  this.fadeDiv = 'operaciones';
}

cancel(){
  // this.identityOperacines = this._userService.getIdentity().operaciones;
  // this.operacion= undefined;
  // this.operaciones = [];
  this.user.operaciones = [];
}

getUsers(){
  this.loading  = true;
  this._userService.getUsers().subscribe(
    res =>{
      this.loading  = false;
      //console.log(res)
      this.fadeDiv = 'listado'
      // this.listado('listado')
      this.companyUsers = res.usuarios
    }
  )
}


addOperacion(){
  this.user.operaciones.push(this.operacionuser);
  this.operacionuser = new Operacion;
}

deleteOperacion(i: number){
  this.user.operaciones.splice(i,1);
}

listado(item: string){
  this.fadeDiv = item;
  this.getUsers();
}
    

resetCompay(){
  // this.company= undefined;
  // this.companyId = undefined;
}

fadeDiv: string = 'listado';

fade(item: string): void {
  this.fadeDiv = item;
}

genero(item: any){
  // this.image.Location = item;
  // //console.log(this.user)
}

changeRol(){
  
  if(this.rol){
    if(this.rol == 'Admin'){
      this.user.rol = 'Admin'
      this.user.origen= 'MasterU'
    }else{
      this.user.rol = this.rol;
      this.user.origen= 'Vinculado'
    }
  }
  // //console.log(this.user);
}

update(){ 
  // this._loadingService.register();
 this.user.update_at = new Date();
 this._userService.updateUser(this.user).subscribe(
   Response => {
     // this.user = Response.user;
    //  //console.log(Response);
     if(!Response.user){
      //  this._dialogService.openAlert({
      //      message: 'Informacion No Actualizada, Intente Nuevamente!' ,
      //      title: 'Error de Actualizaciòn',
      //      closeButton: 'Aceptar',
      //    });
     }else {
      this.fadeDiv = 'listado';
      this.loading = false;
      let data: Object
      data = {titulo: 'Actualizacion Exitosa!', info:'Usuario Actualizado Correctamente, Debe Salir e Ingresar para actualizar el perfil', icon:'done_all' }

      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      
      });

      dialogRef.afterClosed().subscribe(result => {

        this.getUsers();
      })
  

       }
   }, 
   error => {
       var errorMessage = <any>error;
     if(errorMessage != null){
         var body = JSON.parse(error._body);
         this.errorMessage = body.message;
          // //console.log(error);
    
     }
     //  this._loadingService.resolve(); 
   }
)
};


deleteUser(){
  this.loading  = true;
  // //console.log(this.user)
  this._userService.deleteUser(this.user._id).subscribe(
    (    res: any) => {
      // //console.log(res)
      this.fadeDiv = 'listado';
      this.loading = false;
      let data: Object
      data = {titulo: 'Exito ', info:'Usuario Eliminado Correctamente ', icon:'done_all' }

      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
        
      });

      dialogRef.afterClosed().subscribe(result => {

        this.getUsers();
        this.loading  = false;
      })
    },(err: any) =>{
      
    })
}

// OPERACIONES

  // public userCompany:Company;
  public operacion:Operacion = new Operacion();
  // public pOperacion:Operacion;
  // public url: string;
  public paises:any;
  public lok: boolean = true;
  // selected = new FormControl(0);


  getOperaciones(){
      this._operacionesService.getOperaciones().subscribe(
        res =>{
          console.log(res)
          this.operaciones = res;
        }
    
      )

 }

}
