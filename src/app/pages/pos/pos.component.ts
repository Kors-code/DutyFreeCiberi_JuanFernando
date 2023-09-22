import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoService } from '../../services/info.service';
import * as XLSX from 'xlsx';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import TrmApi from "trm-api";
import { SocketIOService } from '../../services/socketIo.service';
import { MongoDbService } from 'src/app/services/mongodbservice';
import { SiigoService } from '../../services/siigo.service'
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Config } from 'src/app/models/config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Operacion } from 'src/app/models/operacion';
import { DialogClienteDetail } from './clientes.component';
import { DialogMediosPagoDetail } from './mediosPago.component';
import { NotaVenta } from 'src/app/models/notaVenta';

interface Articulo{
  
}
@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class posComponent implements OnInit {
  newDataUp:any;
  config:any;
  date:any;
  obs:any;
  log:any;
  fadeDiv='listado';
  trmApi
  public identity:any;
  displayedColumns: string[] = ['folio', 'unds', 'cop', 'detail'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  pOperacion:Operacion
  notaVenta:NotaVenta
  notasVentas:NotaVenta[]=[];
  trm=0;
  trm_euro=0;
  fechaInicialInfo: any;
  fechaFinalInfo: any;
  getfechaSRcalendar:boolean = false;
  constructor( public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
              public _infoService:InfoService,
              public _socketService:SocketIOService,
              // public _mongoService: MongoDbService
              public _siigoService:SiigoService,
              private _snackBar: MatSnackBar,
              public _userService:UserService
    ) { 
      this.config = new Config();
      this.notaVenta = new NotaVenta();

      this.identity = this._userService.getIdentity();

      this.trmApi =  new TrmApi("aEOKmLbbPROhCr6iDiieAGCqt");
      this.trmApi
        .latest()
        .then((data:any) => {
          // console.log(data)

        } )
        .catch((error:any) => error);

        this.pOperacion=_userService.getPredetermidaOperacion();
        // console.log(this.identity)
    }

  ngOnInit(): void {

    this.date = new Date();
    this.getConfig();
    this.getNotasVentaUser();

    // this.getTRM();
    // this._mongoService.main();
  }

  nuevaNota(){
    this.fadeDiv='detalle';
    this.notaVenta = new NotaVenta();
    // console.log(this.notaVenta)
    this.trm_euro = this.config.dataOperacion.trm_euro;
  }

  listado(){
    this.fadeDiv='listado';
    this.notaVenta = new NotaVenta();
    this.trm_euro = this.config.dataOperacion.trm_euro;
    this.trm = this.config.dataOperacion.trm_usd;
  }

getTRM(){
  this._infoService.geTRM().subscribe(
    res=>{
      // console.log(res)
    }
  )
}

getMonitoreoPersonalizado(){

  var month = this.fechaFinalInfo.getMonth() + 1;
  var day = this.fechaFinalInfo.getDate();
  var year = this.fechaFinalInfo.getFullYear();
  var fecha_final = new Date(year + "." + month + "." + day + "." + "23" + ":" + "59");
  this.getVentasPeriodo(this.fechaInicialInfo, fecha_final);
}


getVentasPeriodo(feha_inicial:any, fecha_final:any) {
  let pet = { fecha_inicial:feha_inicial, fecha_final:fecha_final }
  
  this._infoService.getNotasVentasPeriodo(pet).subscribe(
    res=>{
      // console.log(res)
      this.notasVentas = res;
        this.fadeDiv='listado';
        this.notaVenta = new NotaVenta();
        this.dowloadVentas();
    }
  )

}

  getConfig(){
    // console.log('cobfig')
    this._infoService.getConfig(this.pOperacion._id).subscribe(
      res=>{
        // console.log(res)
        if(res.length != 0){
          this.config = res[0];
          this.trm_euro = this.config.dataOperacion.trm_euro;
          this.trm = this.config.dataOperacion.trm_usd;
        }
       
      },err=>{
        // console.log(err)
      }
    )
  }


  getNotasVentaUser(){
    this._infoService.getNotasVentaUser(this.identity._id).subscribe(
      res=>{
        this.notasVentas = res;
        this.fadeDiv='listado';
        this.notaVenta = new NotaVenta()
        this.dowloadVentas();
      }
    )
  }

  getNotasActivasVentaUser(){
    this._infoService.getNotasVentaActivaUser(this.identity._id).subscribe(
      res=>{
        this.notasVentas = res;
        this.fadeDiv='listado';
        this.notaVenta = new NotaVenta()
        this.dowloadVentas();
      }
    )
  }

  updateTRM(){

    this.config.dataOperacion.trm_euro = this.trm_euro;
    this.config.dataOperacion.trm_usd = this.trm;

    // console.log(this.config.dataOperacion)

    this._infoService.updateTrmOperacion(this.config).subscribe(
      res=>{
        console.log(res);
        let data = {titulo: 'Registro Exitoso ', info:'Se Actualizaron las Divisas ', type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
      }
    )
  }


  lineasNotaVentas:any[]=[];

  dowloadVentas(){
    this.lineasNotaVentas=[];
    for (let i = 0; i < this.notasVentas.length; i++) {
      const element = this.notasVentas[i];
      let cajero = '';
      if( element.cajero){
        cajero = element.cajero.codigo + element.cajero.codigo;
      }
      
      for (let x = 0; x < element.productos.length; x++) {
        const prod = element.productos[x];
        let linea = {
          fecha: new Date(element.created_at).toLocaleDateString(), 
          documento: element.prefix + element.consecutivo,
          estado: element.estado,  
          folio_macro: element.folio,
          tienda: element.tienda,
          usuario: element.usuario.name,
          cajero: cajero,
          vendedor: element.vendedor.name + ' ' + element.vendedor.codigo,
          producto_codigo: prod.CODIGO,
          producto_PLU: prod.PLU1,
          producto: prod.DESCRIPCION,
          valor_und: prod.RETAIL,
          cantidad: prod.cantidad,
          total:  prod.cantidad *prod.RETAIL,
          '%_descuento': prod.descuento,
          val_descuento: prod.val_descuento,
          total_neto: (prod.RETAIL * prod.cantidad) - prod.val_descuento,
          cliente_name: element.cliente.Pasajero,
          cliente_pax: element.cliente.pax,
          cliente_STEB_BAG: element.cliente.STEB_BAG,
          cliente_TipoIdentificacion: element.cliente.TipoIdentificacion,
          cliente_NIdentificacion: element.cliente.NIdentificacion,
          cliente_Pasajero: element.cliente.Pasajero,
          cliente_Direccion: element.cliente.Direccion,
          cliente_Origen: element.cliente.Origen,
          cliente_Aerolinea: element.cliente.Aerolinea,
          cliente_Asiento: element.cliente.Asiento,
          cliente_Fecha: element.cliente.Fecha,
          cliente_Correo: element.cliente.Correo,
          cliente_Destino: element.cliente.Destino,
          cliente_Vuelo: element.cliente.Vuelo,
          cliente_Nacionalidad: element.cliente.Nacionalidad,
          cliente_Sexo: element.cliente.Sexo,
          cliente_scan: element.cliente.scan,
        }
        this.lineasNotaVentas.push(linea)
        

      }
    }
  }

  getNotasVentaOperacion(){
    this._infoService.getNotasVentaOperacion(this.pOperacion._id).subscribe(
      res=>{
        this.notasVentas = res;
        this.fadeDiv='listado';
        this.notaVenta = new NotaVenta();
        this.dowloadVentas();
      }
    )
  }

  getNotasVentaActivasOperacion(){
    this._infoService.getNotasVentaActivaOperacion(this.pOperacion._id).subscribe(
      res=>{
        this.notasVentas = res;
        this.fadeDiv='listado';
        this.notaVenta = new NotaVenta();
        this.dowloadVentas();
      }
    )
  }
  

  pasNota(item:any){
    // console.log(item)
    this.notaVenta=item
    this.fadeDiv='detalle';
    this.trm = item.trm
    this.trm_euro = item.trm_euro
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialogClientes(){
    let dialogRef = this.dialog.open(DialogClienteDetail,{
      data: {cliente:this.notaVenta.cliente, _id:this.notaVenta._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.notaVenta.cliente = result
        // console.log( this.notaVenta)
      }
    })

  }

  openDialogMediosPagos(){
    let dialogRef = this.dialog.open(DialogMediosPagoDetail,{
      data: {total:this.notaVenta.total, trm:this.trm, trm_euro:this.trm_euro,medioPago:this.notaVenta.mediosPago}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.notaVenta.mediosPago = result
        // console.log(this.notaVenta)
      }
    })

  }

  search=""
  productSearch:any=[]
  getProducto(item:string){
    this._infoService.getProducto(item).subscribe(
      res=>{
        // console.log(res)
        if(res.length != 0){
          
          if(res.length == 1){
            res[0].cantidad = 1;
            res[0].descuento = 0;
            res[0].val_descuento = 0;
            this.notaVenta.productos.unshift(res[0])
            console.log(this.notaVenta.productos)
          }else{
            this.productSearch = res
          }
          this.totalizar();
          this.search=""
        }
      }
    )
  }


  searchCajeroS:string = '';

  searchCajero(item:any){
    let pos = this.config.empleados.map(function(e: { codigo: any; }) { return e.codigo; }).indexOf(item);
    if(pos != -1){
      this.notaVenta.cajero = this.config.empleados[pos]
      this.searchCajeroS = ''
    }else{
      this.openSnackBar('NO SE HA ENCONTRADO EL CAJERO')
    }

    // console.log(pos)

  }

  pasProducto(item:any){
    item.cantidad = 1;
    item.descuento = 0;
    item.val_descuento = 0;
    this.notaVenta.productos.unshift(item);
    this. productSearch=[];
    this.totalizar();
  }

  totalizar(){
    this.notaVenta.total = 0;
    this.notaVenta.descuento = 0;

    for (let i = 0; i < this.notaVenta.productos.length; i++) {
      const element = this.notaVenta.productos[i];

      if(element.descuento != 0){
        console.log(element)
        element.val_descuento = element.RETAIL * (element.descuento / 100) * element.cantidad
        this.notaVenta.descuento = this.notaVenta.descuento +  element.val_descuento;
      }else{
        element.val_descuento = 0;
      }

      this.notaVenta.total = this.notaVenta.total + ((element.RETAIL * element.cantidad) - element.val_descuento);
      
    }
  }


  saveNotaVenta(){
    this.notaVenta.operacion = this.pOperacion._id;
    this.notaVenta.usuario= this.identity;
    this.notaVenta.trm = this.trm;
    this.notaVenta.trm_euro =  this.trm_euro;
    this.log = true;
    // console.log(this.notaVenta)
    this._infoService.agregarNotaVenta(this.notaVenta).subscribe(
      res=>{
        
        this.notaVenta = res;
        
        setTimeout(() => {
          this.log = false;
           this.printNotaVenta();
        }, 1000);
       
        // this.getNotasActivasVentaUser();
      }
    )
  }

  updateNotaVenta(){
    this.notaVenta.estado="Cerrada";
    this.notaVenta.update_at = new Date();
    this._infoService.updateNotaVenta(this.notaVenta).subscribe(
      res=>{
        // console.log(res)
      }
    )
  }

  printNotaVenta(): void {
    let printContents
    let  popupWin:any;
    printContents = document.getElementById('notaVenta')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
       <html>
           <head>
               <title>Nota Venta</title>
               <style>
                  
               </style>
           </head>
           <body onload="window.print();window.close()">${printContents}
           
           </body>
       </html>`
    );
    popupWin.document.close();
  }


  d:Date= new Date();
  getfechaSR(c:string){
    // console.log(c)
    this.d = new Date();
    var month = this.d.getMonth() + 1;
    var day = this.d.getDate();
    var year = this.d.getFullYear();
    var hour = this.d.getHours();
    var min = this.d.getMinutes();
    // //(month)
    // //(day)
    // //(year)
    
    if (c == "h") {
      var feha_inicial = new Date(year + "." + month + "." + day);
      var fecha_final = new Date(
        year + "." + month + "." + day + "." + "23" + ":" + "59"
      );
      this.getVentasPeriodo(feha_inicial, fecha_final);
    }
    if (c == "s") {
      var feha_inicial = new Date(year + "." + month + "." + day);
      var fecha_final = new Date(year + "." + month + "." + day + "." + "23" + ":" + "59");
      this.getVentasPeriodo(feha_inicial, fecha_final);
    }
    if (c == "a") {
      var feha_inicial = new Date(year + "." + month + "." + (day - 1));
      var fecha_final = new Date(year + "." + month + "." + (day - 1) + "." + "23" + ":" + "59");
      this.getVentasPeriodo(feha_inicial, fecha_final);
    }
    if (c == "m") {
      var feha_inicial = new Date(year + "." + month + "." + "01");
      var fecha_final = new Date(year + "." + month + "." + day + "." + "23" + ":" + "59");
      this.getVentasPeriodo(feha_inicial, fecha_final);
    }
    if (c == "y") {
      var feha_inicial = new Date(year + "." + "01" + "." + "01");
      var fecha_final = new Date(year + "." + month + "." + day + "." + "23" + ":" + "59");
      this.getVentasPeriodo(feha_inicial, fecha_final);
    }

    // this.fechaInicialInfo = feha_inicial;
    // this.fechaFinalInfo = fecha_final;
    // this.setDatosGraficoVentas();
  }

  downloadFile(data: any, title:string) {
    const replacer = (key:any, value:any) => value === null ? '' : value; // specify how you want to handle null values here
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

  data:any[] = []; 

  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      ////// console.log('Data',this.data);
      // ////// ////// console.log('Costumer',this.dataCostumer);
      this.convertirJson()

    };

    reader.readAsBinaryString(target.files[0]);

  }

  registros:any = [];
  convertirJson(){
    this.log= true;
    let keys = Object.values(this.data[0])
    for(var i = 1;i < this.data.length; i++){
      let arr = this.data[i];
      let par = Object.values(arr);
      let reg = []
      for (let i = 0; i < keys.length; i++) {
        let obje = [keys[i], par[i] || '' ]
        reg.push(obje)
      }
      this.registros.push(Object.fromEntries(reg))
    }

    this.log= false;
   
    // console.log(this.registros)
    let lotes = 200;
   
  }

  AgregarProductos(){
    this.log = true
    this._infoService.remplazarInfo(this.registros, 'Productos').subscribe(
      res=>{
        this.registros = [];
        this.data=[];

        this.log = false
        let data = {titulo: 'Registro Exitoso ', info:'Se Registraron ' + res.insertedCount + ' de ' + this.registros.length, type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });

       

        // console.log(res)
    })
  }

  productos(){
    this.fadeDiv= 'productos'
  }

  cancelar(){
    this.fadeDiv= 'listado',
    this.registros = [];
    this.data=[];
  }

  deleteProducto(i:number){
    this.notaVenta.productos.splice(i,1);
    this.totalizar();
  }
  
}
