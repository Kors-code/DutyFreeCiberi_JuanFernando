import { Component, Inject, OnInit } from '@angular/core';
import { Categoria, Cumplimiento } from '../../models/presupuesto';
import { Config, Empleado, Tienda } from '../../models/config';
import { InfoService } from 'src/app/services/info.service';
import { ThisReceiver } from '@angular/compiler';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Operacion } from 'src/app/models/operacion';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
value:any
config:Config ;
checked:boolean = true;
categoria:Categoria;
cumplimiento:Cumplimiento;
empleado:Empleado
tag = '';
tagInv='';
nuevo= false;
email= '';
public pOperacion:Operacion;

Roles = ['Ventas', 'Skin', 'Lider', 'Gerente Ventas', 'Gerente']
  constructor(public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
  public _infoService:InfoService,
  private _snackBar: MatSnackBar, public _userService:UserService) {
    this.config = new Config();
    this.categoria = new Categoria();
    this.cumplimiento = new Cumplimiento();
    this.empleado = new Empleado();
    this.pOperacion = this._userService.getPredetermidaOperacion();
    //console.log(this.config)
   }

  ngOnInit(): void {
    this.getConfig()
  }


  dataBase:string =''
  collOrigin:string =''
  collNew:string =''

  renameCollecction(){

    let obj =  {
        dataBase:this.dataBase,
        collOrigin:this.collOrigin,
        collNew:this.collNew
      }

      console.log(obj)

    this._infoService.renameCollectionsDB(obj).subscribe(
      res=>{
        console.log(res)
      })
  }


  guardarConfigurcion(){
  this.config.operacion = this.pOperacion._id;
  console.log(this.config)
    this._infoService.agregarConfiguracion(this.config).subscribe(
      res=>{
        if(res){
                  console.log(res)
          let data = {titulo: 'Confirmaciòn', info:'Configuracion generada Correctamente', type: 'Confirm', icon:'done_all'}
  
          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // this.getfacturacionSiigo()
          })
          this.getConfig()    
        }
        
      }
    )
    //console.log(this.config)
  }

  getConfig(){
    console.log('cobfig')
    this._infoService.getConfig(this.pOperacion._id).subscribe(
      res=>{
        console.log(res)
        if(res.length != 0){
          this.config = res[0];
        }
       
      },err=>{
        console.log(err)
      }
    )
  }

  updateConfiguracion(){
    this.config.operacion = this.pOperacion._id
    console.log(this.config)
    this._infoService.updateConfiguracion(this.config).subscribe(
      res=>{
        //console.log(res)
        if(res){
          let data = {titulo: 'Confirmaciòn', info:'Configuracion Guardada Correctamente', type: 'Confirm', icon:'done_all'}
  
          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // this.getfacturacionSiigo()
          })
          this.getConfig()    
        }
        
      }
    )
  }


  addTag(){
    this.config.tags.unshift({tag:this.tag, Activo: this.checked});
    this.tag = ''
  }

  deleteTag(i:number){
    this.config.tags.splice(i,1);
  }

  addTagInv(){
    if(!this.config.inventarios){
      this.config.inventarios=[]
    }
    this.config.inventarios.unshift({tag:this.tagInv, Activo: this.checked});
    this.tagInv = ''
  }

  deleteTagInv(i:number){
    this.config.inventarios.splice(i,1);
  }

  pasCategoria(item:Categoria){
    this.categoria=item
  }

  subscat=0;
  addSubscat(){
    this.categoria.subscat.unshift(this.subscat)
    this.subscat=0;
  }

  deleteSubscat(i:number){
    this.categoria.subscat.splice(i,1);
  }

  pasCumplimiento(item:Cumplimiento){
    this.cumplimiento = item
  }

  addCumpli(){
    this.categoria.cumplimientos.push(this.cumplimiento)
    this.cumplimiento=new Cumplimiento();
  }

  deleteCumplimiento(i:number){
    this.categoria.cumplimientos.splice(i,1);
  }

  editCumplimiento(){
    this.cumplimiento=new Cumplimiento();
  }

  addCategoria(){
    this.categoria._id= new Date().getTime();
    this.config.categorias.unshift(this.categoria)
    this.cumplimiento=new Cumplimiento();
    this.categoria = new Categoria();
    this.nuevo=false;
  }

  catParticipacion =0
  cambioParticipacion(item: any){
    // console.log(item)
    let valor =0
    for (let s = 0; s < this.config.categorias.length; s++) {
      const element = this.config.categorias[s];
      valor = valor + element.participacion
      this.catParticipacion =  valor
    }
    if(valor >= 100.001){
      // console.log('mayor a 100')
      let data = {titulo: 'Error', info:'La cifra genera participacion erronea mayor a 100% Valor ' + valor, type: 'Confirm', icon:'cancel'}
  
      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // this.getfacturacionSiigo()
      })
    }else{


    }
  }

  editCategoria(){
    this.cumplimiento=new Cumplimiento();
    this.categoria = new Categoria(); 
  }


  deleteCategoria(i:number){
    this.config.categorias.splice(i,1);
    this.categoria = new Categoria(); 
  }

  addCumpliTienda(){
    this.tienda.cumplimientos.unshift(this.cumplimiento)
    this.cumplimiento=new Cumplimiento();
  }

  tienda:Tienda = new Tienda()
  tiendaParticipacion = 0
  addTienda(){
    this.tienda.presupuesto_cop =0
    this.tienda.ventas_cop =0
    this.tienda._id = new Date().getTime();
    this.config.tiendas.push(this.tienda)
    this.tienda  = new Tienda()
    this.tiendaParticipacion = 0
  }

  cumplimientosTienda: Cumplimiento[] =[]
  pastienda(item:any){
    this.tienda = item
  }

  deleteTienda(i:number){
    this.config.tiendas.splice(i,1)
  }

  editTienda(){
    this.tienda._id = new Date().getTime();
    this.tienda  = new Tienda()
    this.tiendaParticipacion =0
    
  }

  addEmpleado(){
    this.config.empleados.unshift(this.empleado)
    this.empleado = new Empleado;
  }

  editEmpleado(){
    this.empleado = new Empleado();
  }

  resetPassEmpleado(){
    this.empleado.clave = 'AAAA';
    this.openSnackBar('Cambio de Clave AAAA')
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  

  resetPassEmpleados(){
    this.config.empleados.forEach(element => {
      element.clave = 'AAAA';
      this.openSnackBar('Cambio de Clave AAAA '+ element.name)
    });
  }

  pasEmpleado(item: any){
    this.empleado = item;
    window.scroll(300, 300)
  }

  deleteEmpleado(i:number){
    this.config.empleados.splice(i,1);
  }

  search=''
  buscarRegistro(item:string){
   let ex = item.indexOf(this.search) >= 0
  //  console.log(ex)
   if(ex){
    return true
   }else{
    return false
   }
   
   
  }

  buscarRegistro2(search:string) {
    // this.getNegocios();
    search = search.toLowerCase();
      // //(search);
    if(search != ''){
    let productosArr: any[] = [];
    for( let producto of this.config.empleados){
      let titulo = producto.name.toLowerCase();
      if(titulo.indexOf(search) >= 0){
        productosArr.push(producto);
      }
    }
    // return this.productos = productosArr;
    }else{

      // return this.productos = this.arrProductos;
      }
  }


  addEmail(){
    if(!this.config.notificar){
      this.config.notificar = [];
    }
    if(this.email != undefined){
    this.config.notificar.push(this.email);
    this.email= '';
    }
  }

  deleteEmail(i: number){
    this.config.notificar.splice(i, 1);      
  }

}
