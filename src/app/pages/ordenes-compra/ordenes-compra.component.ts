import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Ordencompra } from 'src/app/models/compra';
import { Config } from 'src/app/models/config';
import { Operacion } from 'src/app/models/operacion';
import { Proveedor } from 'src/app/models/proveedor';
import { Acceso, Funcionalidad, User } from 'src/app/models/user';
import { InfoService } from 'src/app/services/info.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UserService } from 'src/app/services/user.service';
import { DialogProveedor } from './proveedor.component';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/global';
import { ComprasService } from 'src/app/services/compras.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'ordenes-compra',
  templateUrl: './ordenes-compra.component.html',
  styleUrls: ['./ordenes-compra.component.css']
})
export class OrdenesCompra implements OnInit {
  motivos:any;
  public permisos:Acceso;
  orden:Ordencompra;
  ordenes:Ordencompra[]=[]
  config:any;
  public identity:any;
  pOperacion:Operacion
  public url: string;
  public url_dw:string;
  verListado=false;
  constructor(  public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
    public _infoService:InfoService,  public _userService:UserService,private _http: HttpClient,private _ordenesService :ComprasService) { 
    this.config = new Config();
    this.identity = this._userService.getIdentity();
    this.orden=new Ordencompra()
  
    this.pOperacion= this._userService.getPredetermidaOperacion();
    this.url = GLOBAL.url_app;
    this.url_dw = GLOBAL.url_dw
    this.permisos = new Acceso();
  }

  onNoClick(): void {
    
  }

  
  getPermisosUser(){
    this.permisos = new Acceso()
    let funcionalidades:Funcionalidad[] = this.identity.modulos
    //  //(this.funcionalidades)
    if(funcionalidades == undefined){
    
    }else{
      for(var i = 0;i < funcionalidades.length; i++){
        if(funcionalidades[i].titulo == 'Ordenes de Compra'){  
          this.permisos.editar = funcionalidades[i].editar;
          this.permisos.eliminar = funcionalidades[i].eliminar;
          this.permisos.escribir = funcionalidades[i].escribir;
          this.permisos.autorizar = funcionalidades[i].autoriza;

          break
        }
      }
    }
    
  }

  ngOnInit(): void {
    this.getConfig();
    this.getOrdenes();
    this.getPermisosUser();
  }

  getConfig(){

    this._infoService.getConfig(this.pOperacion._id).subscribe(
      res=>{
        console.log(res)
        if(res.length != 0){
          this.config = res[0];
        }
       
      },err=>{
      }
    )
  }


  agregar(){
    console.log('agregar')
    this.orden.productos.unshift(
      {
        codigo:'',
        producto:'',
        aplicacion:'',
        cantidad:1,
        cantidad_pedida:1,
        precio:0,
        observaciones:''
      }
    )
  }


  openDialogProveedores(){
    let dialogRef = this.dialog.open(DialogProveedor,{
      data: 'data'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result)
        this.orden.proveedor = result;
        this.verListado = false;

      }
    })
  }

  archivos:any[]=[]
  fileupdate:any;
  cotizacion=''
  onFileSelect(event:any){
    //.log(event.target.files[0])
    try {
      this.archivos.push(event.target.files[0])
      const formData = new FormData();
          formData.append('file', event.target.files[0])
          this._http.post<any>(this.url+'upload', formData).subscribe(
            res=>{
              this.fileupdate = res
              if(this.fileupdate.filename){

                this.cotizacion = this.fileupdate.filename
                this.orden.cotizaciones.unshift(this.cotizacion);
                console.log(this.cotizacion);
              }
            }
          );

    } catch (error) {

    }
  }

  verCotizacion(item:string){
    //.log(item);
    let url =  this.url_dw+'pdf/'+item;
    var win = window.open(url, '_blank');
  
  }

  guardar(){
    console.log(this.orden);
    this._ordenesService.saveCompra(this.orden).subscribe(
      res=>{
        this.orden = res;
        let data = {titulo: 'Exito ', info:'Orden Generada Correctamente' ,type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          // window.location.reload();
        })
        console.log(res)
      }
    )
  }

  update(){
    console.log(this.orden);
    this._ordenesService.updateOrden(this.orden).subscribe(
      res=>{
        let data = {titulo: 'Exito ', info:'Orden Actualizada Correctamente' ,type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
  
        })
        console.log(res)
      }
    )
  }
  
  getOrdenes(){
    this._ordenesService.getOrdenesOperacion().subscribe(
      res=>{
        console.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
        }
      }
    )
  }


  getOrdenesActivas(){
    this._ordenesService.getComprasActivas().subscribe(
      res=>{
        console.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
        }
      }
    )
  }

  getOrdenesAutorizadas(){
    this._ordenesService.getComprasAutorizadas().subscribe(
      res=>{
        console.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
        }
      }
    )
  }


  getOrdenesAnuladas(){
    this._ordenesService.getComprasAnuladas().subscribe(
      res=>{
        console.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
        }
      }
    )
  }

  getOrdenesCerradas(){
    this._ordenesService.getComprasCerradas().subscribe(
      res=>{
        console.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
        }
      }
    )
  }

  getOrdenesRechazadas(){
    this._ordenesService.getComprasRechazadas().subscribe(
      res=>{
        console.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
        }
      }
    )
  }


  pasOrden(item:Ordencompra){
    console.log(item)
    this.verListado=false;
    this.orden = item;
    this.orden.fecha_entrega = new Date(this.orden.fecha_entrega)
    this.impuesto = (item.impuestos/item.total)*100
  }


  cancelEntrega(){
    this.orden.fecha_entrega = undefined

  }

  cancelFPago(){
    this.orden.fecha_pago = undefined
  }


  listado(){
    this.orden = new Ordencompra();
    this.verListado=true;
    this.getOrdenesActivas();
  }

  nuevo(){
    this.orden = new Ordencompra();
    this.verListado = false;
  }

  deleteProd(i:number){
    this.orden.productos.splice(i,1)
    this.totalizar()
  }

  totalizar(){
    this.orden.total=0;
    this.orden.impuestos=0;
    for (let i  = 0; i  < this.orden.productos.length; i ++) {
      const element = this.orden.productos[i ];
      this.orden.total= this.orden.total + (element.precio * element.cantidad)
    }
    this.orden.impuestos = this.orden.total *  (this.orden.impuestoporcentaje/100);
    // console.log(this.orden)
  }

  autorizar(){
    this.orden.autorizaciones.push({
      _id:this.identity._id,
      name:this.identity.name + ' ' + this.identity.surname,
      cargo: this.identity.cargo,
      fecha: new Date().getTime()
    })
  }

  verBoton():boolean{
    let pos2 = this.orden.autorizaciones.map(function(e: { _id: string; }) { return e._id; }).indexOf(this.identity._id);
    // console.log(pos2)
    if(pos2 == -1){
      return true
    }else{
      return false
    }
  }

  printNotaVenta(): void {
    let printContents
    let  popupWin:any;
    printContents = document.getElementById('orden')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
       <html>
           <head>
               <title>Orden Compra</title>
               <style>
                  .blue{
                    background-color: rgb(1, 1, 77); 
                    color: white;
                  }
                  
               </style>
           </head>
           <body onload="window.print();window.close()">
           
           ${printContents}
           
           </body>
       </html>`
    );
    popupWin.document.close();
  }

  exportexcel() {
    /**passing table id**/
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb,'ORDENES COMPRA.xlsx');
  }

  impuesto=0;
  CambiarImpuesto(){
    console.log(this.impuesto)
    this.orden.impuestos = this.orden.total *  (this.orden.impuestoporcentaje/100);
  }

  cambiarPedido(item:any){
    item.cantidad = item.cantidad_pedida;
    this.totalizar();
  }


  duplicarOrden(){
    console.log(this.orden)
    this.orden._id ='';
    this.orden.created_at= new Date();
    this.orden.fecha_entrega= new Date();
    this.orden.fecha_pago= new Date();
    this.orden.update_at= new Date();
    this.orden.estado= 'Activa';
    this.orden.autorizaciones = [];
    this._ordenesService.saveCompra(this.orden).subscribe(
      res=>{
        this.orden = new Ordencompra();
        this.orden = res;
        let data = {titulo: 'Exito ', info:'Orden Generada Correctamente' ,type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          // window.location.reload();
        })
        console.log(res)
      }
    )  
  }
}




