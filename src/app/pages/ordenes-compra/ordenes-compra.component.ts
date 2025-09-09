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
        //.log(res)
        if(res.length != 0){
          this.config = res[0];
        }
       
      },err=>{
      }
    )
  }


  agregar(){
    //.log('agregar')
    this.orden.productos.unshift(
      {
        codigo:'',
        producto:'',
        aplicacion:'',
        cantidad:1,
        cantidad_pedida:1,
        precio:0,
        observaciones:'', 
        tasaImpuesto:0,
        baseImpuestound:0,
        impuestound:0
      }
    )
  }


  openDialogProveedores(){
    let dialogRef = this.dialog.open(DialogProveedor,{
      data: 'data'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //.log(result)
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
                //.log(this.cotizacion);
              }
            }
          );

    } catch (error) {

    }
  }

  verCotizacion(item:string){
    // console.log(item);
    if(item.indexOf('pdf') != -1){
      let url =  this.url_dw+'pdf/'+item;
      var win = window.open(url, '_blank');
    }else{

      let url =  this.url_dw+'xls/'+item;
      this._infoService.getCotizacionxls(url).subscribe(
        res =>{
          // console.log(res)
          this.manageFileXls(res, item)
        }
      )

      // var win = window.open(url, '_blank');
      console.log('getArchivo');


    }


    


  
  }


  manageFileXls(response:any, fileName:string){
      const dataType = response.type
      const binaryData = []
      binaryData.push(response)

      const filePath= window.URL.createObjectURL(new Blob(binaryData, {type:dataType}) )
      const downloadLink = document.createElement('a');
      downloadLink.href= filePath
      downloadLink.setAttribute('download',fileName)
      document.body.appendChild(downloadLink);
      downloadLink.click()
  
  }
 

  deleteCotizacion(i:number){
    this.orden.cotizaciones.splice(i,1)
    if(this.orden._id){
      this.update();
    }
  }

  guardar(){
    //.log(this.orden);
    this.orden.operacion = this.pOperacion._id;
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
        //.log(res)
      }
    )
  }

  cerrarCorden(){
    this.orden.estado = 'Cerrada';
    this.update();
  }

  update(){
    //.log(this.orden);
    this.orden.operacion = this.pOperacion._id;
    this._ordenesService.updateOrden(this.orden).subscribe(
      res=>{
        let data = {titulo: 'Exito ', info:'Orden Actualizada Correctamente' ,type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
  
        })
        //.log(res)
      }
    )
  }
  
  getOrdenes(){
    this._ordenesService.getOrdenesOperacion().subscribe(
      res=>{
        //.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
        }
      }
    )
  }


  getOrdenesActivas(){
    this._ordenesService.getComprasActivas(this.pOperacion._id).subscribe(
      res=>{
        //.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
          this.ordenes = this.ordenes.reverse();
        }
      }
    )
  }

  getOrdenesAutorizadas(){
    this._ordenesService.getComprasAutorizadas(this.pOperacion._id).subscribe(
      res=>{
        //.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
          this.ordenes = this.ordenes.reverse();
        }
      }
    )
  }


  getOrdenesAnuladas(){
    this._ordenesService.getComprasAnuladas(this.pOperacion._id).subscribe(
      res=>{
        //.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
          this.ordenes = this.ordenes.reverse();
        }
      }
    )
  }

  getOrdenesCerradas(){
    this._ordenesService.getComprasCerradas(this.pOperacion._id).subscribe(
      res=>{
        //.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
          this.ordenes = this.ordenes.reverse();
        }
      }
    )
  }

  getOrdenesRechazadas(){
    this._ordenesService.getComprasRechazadas(this.pOperacion._id).subscribe(
      res=>{
        //.log(res)
        if(res){
          this.verListado=true;
          this.ordenes = res;
          this.ordenes = this.ordenes.reverse();
        }
      }
    )
  }


  pasOrden(item:Ordencompra){
    console.log(item);
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
      console.log(element)
      this.orden.total= this.orden.total + (element.precio * element.cantidad)
      this.orden.impuestos = this.orden.impuestos + (element.impuestound*element.cantidad);
    }
    // this.orden.impuestos = this.orden.total *  (this.orden.impuestoporcentaje/100);
    // //.log(this.orden)
  }

  autorizar(){
    this.orden.autorizaciones.push({
      _id:this.identity._id,
      name:this.identity.name + ' ' + this.identity.surname,
      cargo: this.identity.cargo,
      fecha: new Date().getTime(),
      firma: this.identity.firma
    })
    this.orden.estado = 'Autorizada';
    console.log(this.orden)
    this.update()
  }

  verBoton():boolean{
    let pos2 = this.orden.autorizaciones.map(function(e: { _id: string; }) { return e._id; }).indexOf(this.identity._id);
    // //.log(pos2)
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
  impuestoProducto= 0
  CambiarImpuesto(item:any){

    if(this.impuestoProducto){
      console.log(this.impuestoProducto/100) 
      item.tasaImpuesto = this.impuestoProducto,
      item.baseImpuestound= item.precio / (1+(this.impuestoProducto/100)),
  
      item.impuestound = item.baseImpuestound * (this.impuestoProducto/100),
  
      console.log(item)
    
    }
    this.totalizar()

 
    // this.orden.impuestos = this.orden.total *  (this.orden.impuestoporcentaje/100);
  }

  canceliMpu(item:any){

    item.tasaImpuesto = 0;
    item.baseImpuestound= 0;
    item.impuestound = 0,
    console.log(item)
    this.totalizar()
  }


  cambiarPedido(item:any){
    item.cantidad = item.cantidad_pedida;
    item.baseImpuestound= item.precio / (1+(item.tasaImpuesto/100)),
    item.impuestound = item.baseImpuestound * (item.tasaImpuesto/100),
    this.totalizar();
  }


  duplicarOrden(){
    //.log(this.orden)
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
        //.log(res)
      }
    )  
  }
}




