import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
// import { time } from '//console';
import { DialogDataJson } from '../data-base/data-base.component';
import {Sort} from '@angular/material/sort';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FormControl } from '@angular/forms';
import { Operacion } from 'src/app/models/operacion';

export interface _Conteo {
  _id: string;
  Estado: string;
  Codigo1: any;
  Codigo_3: number;
  EAN: number;
  Final_Unit_Cost: number;
  COST_PROM: number;
  TOTAL_FINAL_INV_USD: number;
  TOTAL_FINAL_INV: number;
  Diferencia: number;
  Cla: string;
  Descripcion_1: string;
  Exist_Final: number;
  Sugerido: number;
  Conteo0:any[];
  Definitivo:any[];
  Conteo1:any[];
  Conteo2:any[];
  Conteo3:any[];
  Conteo4:any[];
  Conteo: number;
  check: boolean;
  justificacion: string;
}

@Component({
  selector: 'app-toma-inv',
  templateUrl: './toma-inventario.component.html',
  styleUrls: ['./toma-inventario.component.css']
})

export class tomaInventarioComponent implements OnInit {
  newDataUp:any;
  config:any;
  date:any = new Date();
  obs:any;
  scaner= true;
  public identity:User;
  searcEan:any = '';
  searcSKU:any = '';
  searProd:string = '';
  displayedColumns: string[] = ['SKU', 'EAN', 'CATEGORIA', 'PRODUCTO', 'EXISTENCIA','CONTEO', 'DIFERENCIA', 'DETALLE',  'DEFINITIVO'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild('scanEle')
  scanElement!: ElementRef;
  pOperacion:Operacion
  constructor( public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
              public _infoServce:InfoService,
              public _socketService:SocketIOService,
              // public _mongoService: MongoDbService
              public _siigoService:SiigoService,
              private _snackBar: MatSnackBar,
              private _userService:UserService,
              
    ){ 
      this.config = new Config();
      this.trmApi =  new TrmApi("aEOKmLbbPROhCr6iDiieAGCqt");
      this.identity = this._userService.getIdentity();
      this.pOperacion=_userService.getPredetermidaOperacion();
      // this.trmApi
      //   .latest()
      //   .then((data:any) =>  // ////console.log(this.trm =  data.valor))
      //   .catch((error:any) =>  // ////console.log(error));
      ////console.log(this.identity)
    }

  ngOnInit(): void {
    this.getConfig()
    this.identity = this._userService.getIdentity();
    this.getCollectionsInventarios();
    this. permisosUser();
    // this._mongoService.main();
  }

  historico=false;
  importar=false;
  panel=false;
  toma=false;
  permisosUser(){
    for(var i = 0;i < this.identity.modulos.length; i++){
      if(this.identity.modulos[i].titulo == 'Inventarios'){
        // //(this.funcionalidades[i])
        this.historico = this.identity.modulos[i].historico;
        this.importar = this.identity.modulos[i].importar;
        this.panel = this.identity.modulos[i].panel;
        this.toma = this.identity.modulos[i].toma;
        break
      }
    }
  }

  collections:any = [];
  getCollectionsInventarios(){
    this._infoServce.getCollectionsInventarios().subscribe(
      res=>{
        this.collections = res
        // this.collections = this.collections.reverse();
        //console.log(this.collections)
      }
    )
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }

  log= false;
  data:any[] = []; 
  dataCostumer:any[] = []; 
  dataFlat:any[] = []; 
  files2: File[] = [];
  register = 0;
  trm:any;
  trmApi:any;
  scan:any = undefined

  cuentas:any[] = [
    {
      cod:10,
      name:'Perfumes Unisex',
      Debit:'61359510',
      Credit:'14350110',
      Venta:'41359510'
    },
    {
      cod:11,
      name:'Perfumes Mujer',
      Debit:'61359511',
      Credit:'14350111',
      Venta:'41359511'
    },
    {
      cod:12,
      name:'Perfumes Hombre',
      Debit:'61359512',
      Credit:'14350112',
      Venta:'41359512'
    },
     {
      cod:13,
      name:'Cosmetica y Cuidado Piel',
      Debit:'61359513',
      Credit:'14350113',
      Venta:'41359513'
      
    },
    {
      cod:14,
      name:'Relojes',
      Debit:'61359514',
      Credit:'14350114',
      Venta:'41359514'
    },
    {
      cod:15,
      name:'Joyeria',
      Debit:'61359515',
      Credit:'14350115',
      Venta:'41359515'
    },
    {
      cod:16,
      name:'Gafas de Sol',
      Debit:'61359516',
      Credit:'14350116',
      Venta:'41359516'
    },
    {
      cod:17,
      name:'Tabaco',
      Debit:'61359517',
      Credit:'14350117',
      Venta:'41359517'
    },
    {
      cod:18,
      name:'Licor y Vino',
      Debit:'61359518',
      Credit:'14350118',
      Venta:'41359518'
    },
    {
      cod:19,
      name:'Regalos y Accesorios',
      Debit:'61359519',
      Credit:'14350119',
      Venta:'41359519'
    },
    {
      cod:21,
      name:'Electronica',
      Debit:'61359521',
      Credit:'14350121',
      Venta:'41359521'
    },
    {
      cod:22,
      name:'Chocolates',
      Debit:'61359522',
      Credit:'14350122',
      Venta:'41359522'
    },
       {
      cod:98,
      name:'Regalos a Clientes',
      Debit:'61359598',
      Credit:'14350198',
      Venta:'41359598'
    }
  ]; 
		

  DefinitivoCategorias:any[] = []
  getConfig(){
    this._infoServce.getConfig(this.pOperacion._id).subscribe(
      res=>{
        if(res.length != 0){
          this.DefinitivoCategorias = []
          this.config = res[0];
          localStorage.setItem('categ',JSON.stringify(this.config.categorias))
          // ////console.log(this.config)
          this.config.categorias.forEach((element: any) => {
            this.DefinitivoCategorias.push(
              {
                titulo:element.titulo,
                subscat:element.subscat,
                difUnidades:{
                  positivo:0,
                  negativo:0,
                },
                difCOP:{
                  positivo:0,
                  negativo:0,
                },
                difUSD:{
                  positivo:0,
                  negativo:0,
                }
              }
            )
          });

          localStorage.setItem('invCategorias',JSON.stringify(this.DefinitivoCategorias))

        }
       
      }
    )
  }

  geXlsDocument(e:any) {

    if (!this.files2[0]) {
      alert('Primero sube archivo xls, por favor');
    }
    let reader = new FileReader();
    this.log= true;
    reader.onload = (e:any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      // this.data.flat()  
      console.log(this.data);
      this.log= false;

    };
    reader.onerror = err => {
      this.log= false;
    };
   }

   documentos:any[] = [];
   dataSource:any;
   

   onFileChange(evt: any) {
    this.log= true;
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

     

      let pos2 = this.data[0].map(function(e:any) { return e; }).indexOf('EXISTENCIA FINAL');
      if(pos2 != -1){
        this.data[0][pos2] = 'Exist_Final'
      }

      let pos3 = this.data[0].map(function(e:any) { return e; }).indexOf('CODIGO');
      if(pos3 != -1){
        this.data[0][pos3] = 'Codigo1'
      }

      let pos4 = this.data[0].map(function(e:any) { return e; }).indexOf('UPC1');
      if(pos4 != -1){
        this.data[0][pos4] = 'EAN'
      }

      let pos5 = this.data[0].map(function(e:any) { return e; }).indexOf('CLASIFICACION COMPLETA');
      if(pos5 != -1){
        this.data[0][pos5] = 'Cla'
      }

      let pos6 = this.data[0].map(function(e:any) { return e; }).indexOf('DESCRIPCION');
      if(pos6 != -1){
        this.data[0][pos6] = 'Descripcion_1'
      }

      let pos7 = this.data[0].map(function(e:any) { return e; }).indexOf('FINAL UNIT COST');
      if(pos7 != -1){
        this.data[0][pos7] = 'Final_Unit_Cost'
      }

      let pos8 = this.data[0].map(function(e:any) { return e; }).indexOf('TOTAL INV. FINAL');
      if(pos8 != -1){
        this.data[0][pos8] = 'TOTAL_FINAL_INV'
      }

      let pos9 = this.data[0].map(function(e:any) { return e; }).indexOf('VALOR FINAL (USD)');
      if(pos9 != -1){
        this.data[0][pos9] = 'TOTAL_FINAL_INV_USD'
      }


//       TOTAL_FINAL_INV
// TOTAL_FINAL_INV_USD

      //console.log('Data', this.data);

      this.convertirJson()
      this.log= false;
    };

    reader.readAsBinaryString(target.files[0]);

  }

  progreso = 0

  nuevo(){
    this.tag = 'C_'
  }


  saveScanSocket(){
    // ////// ////console.log(JSON.stringify(this.registros))
    // this._socketService.emit('dataUpNow', JSON.stringify(this.registros))
  }

  getInventario(doc:string){
    this.tag = doc;
    this.importar=false;
  }

  verTagInventario(doc:string){
    if(doc.indexOf('off_')){
      return false;
    }else{
      return true;
    }
  }

  verPrecio(doc:string){
    if(doc.indexOf('R_')){
      return true;
    }else{
      return false;
    }
  }

  cerrarInventario(){
    let data = {titulo: 'Confirmaciòn', info:'Se Cerrara el Conteo esta seguro de procesar el cierre', type: 'Cancel', icon:'pan_tool'}
  
    let dialogRef = this.dialog.open(DialogConfirm,{
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){  
    this._infoServce.offCollectionsInv(this.tag).subscribe(
      res=>{
        ////console.log(res)
        this.getCollectionsInventarios()
        window.location.reload();
      },err => {
        this.getCollectionsInventarios()
        window.location.reload();

      });
    }
    })
  }

  deleteInventario(){
    let data = {titulo: 'Confirmaciòn', info:'Se Eliminara el Conteo No se puede recupera mas adelante', type: 'Cancel', icon:'pan_tool'}
  
    let dialogRef = this.dialog.open(DialogConfirm,{
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){ 

    this._infoServce.deleteCollectionsInv(this.tag).subscribe(
        res=>{
          ////console.log(res)
          this.getCollectionsInventarios();
          window.location.reload();
        },err => {
          ////console.log(err)
          this.getCollectionsInventarios()
          window.location.reload();
        })
      }})

  }

  subirConteo(){
    // ////console.log(this.tag)
    // ////console.log(this.registros)
    this.saveInfoCompleto(this.registros)
  }


  changeTag(item:string){
    this.db=  this.tag + this.Fecha.replace("-", "_")+'_'+ this.Marca.replace(" ", "_") +'_'+ this.Clasificacion + '_'+ this.Responsable.replace(" ", "_")
  }

  db:string = '';
  tag:string = '';
  Fecha:string = '';
  Marca:string = '';
  Clasificacion:string = '';
  Responsable:string = '';
  saveInfoCompleto(registros: any){
    this.log= true;
    this._infoServce.agregarConteo(registros, this.tag).subscribe(
      res =>{
        let dato = res
        // ////console.log(dato)
        let data: Object
        this.log = false
        data = {titulo: 'Confirmaciòn', info:'Se Subieron los Registros', type: 'Cancel', icon:'done_all'}
      
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
         
        });

        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        })

      })
  }
 

  registros:any = [];
  registrosCostumer:any = [];
  lotesCmprobantes:any = [];
  lote:any = [];
  itemsContable:any = [];
  marcas:any = [];
  clasificacion:any = [];
  marca = new FormControl('');
  clasifi = new FormControl('');
  itemsFacturaVentas:any = [];
  convertirJson(){
    this.marcas = [];
    this.clasificacion = [];
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

   // ////console.log(this.registros) 
    
    for(var i = 0;i < this.registros.length; i++){
      if(this.registros[i].Exist_Final == ''){
        this.registros[i].Exist_Final = 0
      }
      this.registros[i].Estado = 'Activo';
      this.registros[i].Conteo0 = [];
      this.registros[i].Conteo1 = [];
      this.registros[i].Conteo2 = [];
      this.registros[i].Conteo3 = [];
      this.registros[i].Conteo4 = [];
      this.registros[i].Definitivo = [];
      this.registros[i].Diferencia = 0;
      this.registros[i].Conteo = 0;
      this.registros[i].check = false;
      this.log= false;
      this.registros[i].justificacion = '';
    }

    var duplicados: any[] = [];

    var task_names = this.registros.map(function (task: { BRAND: any; }) {
      return task.BRAND; 
    });
 
  const tempArray = [...task_names].sort();

  for(var i = 0; i < tempArray.length; i++) {
    const elemento = tempArray[i];
    if (!duplicados.includes(tempArray[i])) {
      duplicados.push(elemento);
    }
  }

  this.marcas = duplicados
    ////console.log( this.marcas)


    var duplicados2: any[] = [];

    var task_names2 = this.registros.map(function (task: { Cla: any; }) {
      return task.Cla; 
    });
 
  const tempArray2 = [...task_names2].sort();

  for(var i = 0; i < tempArray2.length; i++) {
    const elemento = tempArray2[i];
    if (!duplicados2.includes(tempArray2[i])) {
      duplicados2.push(elemento);
    }
  }

   this.clasificacion = duplicados2;

  }


  changeCategoria(){

    var duplicados: any[] = [];
    let Clasi = this.clasifi.value;
    var task_names = this.marcas.map(function (task: { BRAND: any; }) {
      return task.BRAND; 
    });
 
    const tempArray = [...task_names].sort();

    // for(var i = 0; i < tempArray.length; i++) {
    //   const elemento = tempArray[i];
    //   if (!duplicados.includes(tempArray[i])) {
    //     duplicados.push(elemento);
    //   }
    // }

    this.marcas = duplicados
  }

  procesarMarca(){
    //console.log(this.marca)
    let Valores = this.marca.value;
    let Clasi = this.clasifi.value;
    var duplicados = []; 
    for(var i = 0; i < this.registros.length; i++) {
      const elemento = this.registros[i];
      if(Clasi.length !=0){
        if(Clasi.includes(elemento.Cla)) {
          if(Valores.length !=0){
            if(Valores.includes(elemento.BRAND)) {
              duplicados.push(elemento);
            }
          }else{
            duplicados.push(elemento);
          }
        }
      }else{
        if(Valores.includes(elemento.BRAND)) {
          duplicados.push(elemento);
        }
      } 
    }
    this.registros = duplicados

    console.log(this.registros)





  }

   chunckArrayInGroups(arr:any[], size:number) {
    var chunk = [], i; // declara array vacio e indice de for
    for (i = 0; i <= arr.length; i+= size) // loop que recorre el array 
      chunk.push(arr.slice(i, i + size)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador 
      // ////console.log(chunk)
      return this.lotesCmprobantes = chunk;
  }

  generarRegistros(registros: any[]){
    // ////console.log( registros)
    if(registros){
    this.log = true
    this.itemsContable =[]
    this.itemsFacturaVentas=[]
    for(var i = 0;i < registros.length; i++){
      let pos2 = this.cuentas.map(function(e: { cod: any; }) { return e.cod; }).indexOf(registros[i].Clasi);
      // // ////console.log(pos2)
      if(pos2 != -1){
        let dtaComprobante = {
          account:{
            code:this.cuentas[pos2].Debit,
            movement:'Debit'
          },
          customer:{
            identification:'222222222',
          },
          product:{
            code:registros[i].Clasi +'',
            name: 'CMV FAC '+ registros[i].Folio +' SKU '+ registros[i].Codigo_1 +' ' + registros[i].Descripcion_1 +' CANT: '+ registros[i].Cantidad,
            quantity:0,
            description:'CMV FAC '+ registros[i].Folio +' SKU '+ registros[i].Codigo_1 +' ' + registros[i].Descripcion_1 +' CANT: '+ registros[i].Cantidad,
            value:registros[i].Costo_de_v,
          },
          value:registros[i].Costo_de_v,
          description:'CMV FAC '+ registros[i].Folio +' SKU '+ registros[i].Codigo_1 +' ' + registros[i].Descripcion_1 +' CANT: '+ registros[i].Cantidad,
        }
        this.itemsContable.push(dtaComprobante)
  
        let dtaComprobante2 = {
          account:{
            code:this.cuentas[pos2].Credit,
            movement:'Credit'
          },
          customer:{
            identification:'222222222',
          },
          product:{
            code:registros[i].Clasi +'',
            name:'CMV FAC '+ registros[i].Folio +' SKU '+ registros[i].Codigo_1 +' ' + registros[i].Descripcion_1 +' CANT: '+ registros[i].Cantidad,
            quantity:0,
            description:'CMV FAC '+ registros[i].Folio +' SKU '+ registros[i].Codigo_1 +' ' + registros[i].Descripcion_1 +' CANT: '+ registros[i].Cantidad,
            value:registros[i].Costo_de_v,
          },  
          value:registros[i].Costo_de_v,
          description:'CMV FAC '+ registros[i].Folio +' SKU '+ registros[i].Codigo_1 +' ' + registros[i].Descripcion_1 +' CANT: '+ registros[i].Cantidad,
        }

        this.itemsContable.push(dtaComprobante2)  
        let tienda :any
        if(registros[i].PDV == 'MDE A'){
          tienda = 673
        }else{
          tienda = 675
        }

        let dtaComprobanteVenta = {
          account:{
            code:this.cuentas[pos2].Venta,
            movement:'Credit'
          },
          customer:{
            identification:'222222222',
          },
          cost_center: tienda, 
          product:{
            code:registros[i].Clasi +'',
            name:registros[i].Detalle,
            quantity:0,
            description:registros[i].Detalle,
            value:registros[i].COP,
          },
          description:registros[i].Detalle,  
          value:registros[i].COP,
        }

        this.itemsFacturaVentas.push(dtaComprobanteVenta)

        let dtaComprobanteVentaDeb = {
          account:{
            code:'13050501',
            movement:'Debit'
          },
          customer:{
            identification:'222222222',
          },
          due:{
            prefix: 'C',
            consecutive: 1,
            quote: 1,
            date: this.date,
          },
          description:registros[i].Detalle,
          cost_center: 21013, 
          value:registros[i].COP,
        }
        this.itemsFacturaVentas.push(dtaComprobanteVentaDeb)
      }else{
        // ////console.log('Registo no encontrado '+ registros[i].Clasi)
      }
    }

    // // ////console.log(this.date)
    // // ////console.log( this.itemsContable)
    // // ////console.log( this.itemsFacturaVentas)
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey,
      data: this.itemsContable,
      date:this.date,
      obs:this.obs,
      iddoc:5086,
    }

    // // ////console.log(credenciales)
    let credencialesVentas={
      user:this.config.siigoUser,
      key:this.config.siigoKey,
      data: this.itemsFacturaVentas,
      date:this.date,
      obs:this.obs,
      iddoc:31800,
    }

    this._siigoService.saveComprobantesSiigo(credenciales).subscribe(
      res=>{
        // ////console.log(res)
        this.openSnackBar('CMV GENERADO CORRECTAMENTE','EXITO')
        this._siigoService.saveComprobantesSiigo(credencialesVentas).subscribe(
          resp=>{
            this.openSnackBar('COMPROVANTE DE VENTA GENERADO CORRECTAMENTE','EXITO')
            for(var i = 0;i < registros.length; i++){
              res.items = null
              resp.items = null
              registros[i].Siigo.push(res)
              registros[i].Siigo.push(resp)
              registros[i].Estado = 'Siigo'
            }
            this.saveInfoCompleto(registros)
          })
        
      },err =>{
        this.log = true
        let data = {titulo: 'Error', info:err.error.message, type: 'Confirm', icon:'error'}
  
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
      
        dialogRef.afterClosed().subscribe(result => {

        })
        // ////console.log(err)
      }
    )

    }else{
      this.log = false
      let data = {titulo: 'Registro Exitoso '+ this.procesado + 'de ' + this.lotesCmprobantes.length, info:'Se Registraron los comprobantes correctamente ', type: 'Confirm', icon:'done_all'}
      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      });


    }
  }

  procesado = 0
  procesarInformacion(){
    this.procesado = 0
    this.generarRegistros(this.lotesCmprobantes[0])
  }

  reload(){
    window.location.reload();
  }

  justificar(element: any){
    ////console.log(element)
    this._infoServce.updateConteoJustificacion(element, this.tag).subscribe(
      res=>{
        this.openSnackBar('Justificacion Actualizada')
        ////console.log(res)
      }
    )

  }

  focus(){
    this.scanElement.nativeElement.focus();
  }

  ubicacion = ''
  unds = 1
  ultimosConteos:any[] = []
  saveScan(){
    // ////console.log(this.ultimosConteos)
    this.log= true;
    let scan = {
      unds:this.unds,
      scan:this.scan,
      time:new Date().getTime(),
      user:this.identity.email,
      ubicacion:this.ubicacion,
    }

    //console.log(this.tag)
    if(this.scaner){
      this._infoServce.agregarScaneo(scan, this.tag).subscribe(
        res =>{
          let dato = res
          //console.log(dato)
          if(dato){
            if(this.ultimosConteos.length <= 50){ 
              this.ultimosConteos.unshift(dato)
            }else{
              this.ultimosConteos.unshift(dato)
              this.ultimosConteos.splice(this.ultimosConteos.length -1,1)
            }
           
            // ////console.log(dato)
            this.log = false
            this.openSnackBar(this.scan + '')
            this.scan = undefined  
            this.unds = 1
            this.scanElement.nativeElement.focus();
          }else{
            this.openSnackBar('NO ENCONTRADO')
            this.log = false
            this.openSnackBar(this.scan + '')
            this.scan = undefined  
            this.unds = 1
            this.scanElement.nativeElement.focus();
          }
         
        })
    }else{
      this._infoServce.agregarScaneoSKU(scan, this.tag).subscribe(
        res =>{
          let dato = res
          //console.log(dato)
          if(dato){
            if(this.ultimosConteos.length <= 50){ 
              this.ultimosConteos.unshift(dato)
            }else{
              this.ultimosConteos.unshift(dato)
              this.ultimosConteos.splice(this.ultimosConteos.length -1,1)
            }
            let data: Object
            this.log = false
            this.openSnackBar(this.scan + '')
            this.scan = undefined  
            this.scanElement.nativeElement.focus();

          }else{
            this.openSnackBar('NO ENCONTRADO')
            this.log = false
            this.openSnackBar(this.scan + '')
            this.scan = undefined  
            this.unds = 1
            this.scanElement.nativeElement.focus();
          }
          // ////console.log(dato)
         
        })
    }
  
  }

  undsAdd(){
    this.unds++  
  }
  estado = 'iguales'
  cuantas(item: any){
    // ////console.log(item)
    let conteo = 0
    if(item.length != 0){
      item.forEach((element: { unds: number; }) => {
        conteo = conteo + element.unds
      });
      return conteo
    }else{
      return 0
    }
    
  }


  listenConteo(){

    // ////console.log('scan'+this.tag)
    this.newDataUp =  this._socketService.listen('scan'+this.tag).subscribe((data:any)=>{
      // ////console.log(data);
        this._infoServce.getConteoTag(this.tag).subscribe(
          res=>{
            this.openSnackBar(data.scan)
            // ////console.log(res)
            this.conteo = res
          }
        )
    })
  }



  unidades_conteo =0
  unidades_fisicas =0
  copIguales = 0
  usdIguales = 0
  undSobrantes = 0

  copFaltantes = 0
  usdFaltantes = 0
  copSobrantes = 0
  usdSobrantes = 0

  usdDefinitivas = 0
  copDefinitivas = 0
  undDefinitivas = 0
  undDefinitivasConteo = 0
  usdDefinitivasConteo = 0
  copDefinitivasConteo = 0

  Iguales:_Conteo[] = []
  undIguales = 0
  undFaltantes = 0
  Sobrantes:_Conteo[] = []
  Faltantes:_Conteo[] = []
  Definitivas:_Conteo[] = []
  categorias:any[] = []

  totalUndspositivo = 0
  totalUndsnegativo = 0

  totalUSDpositivo = 0
  totalUSDnegativo = 0

  totalCOPpositivo = 0
  totalCOPnegativo = 0

  downloadFile(datain: any, title:string) {
    let datas = JSON.stringify(datain)
    var data = JSON.parse(datas)
    ////console.log(data)
    data.forEach((element: { Conteo0: number; Conteo1: number; Conteo2: number; Conteo3: number; Conteo4: number; Definitivo: number;Diferencia: number;Exist_Final: number; }) => {
      element.Conteo0 = this.cuantas(element.Conteo0)
      element.Conteo1 = this.cuantas(element.Conteo1)
      element.Conteo2 = this.cuantas(element.Conteo2)
      element.Conteo3 = this.cuantas(element.Conteo3)
      element.Conteo4 = this.cuantas(element.Conteo4)
      element.Diferencia  = element.Exist_Final -  this.cuantas(element.Definitivo)
      element.Definitivo = this.cuantas(element.Definitivo)
    });
   

    const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
  
    var a = document.createElement('a');
    var blob = new Blob([csvArray], {type: 'text/csv' }),
    url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = this.tag+title+".csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }



  getCnteoTag(){
    this.log= true
    this.unidades_conteo =0
    this.unidades_fisicas =0
    this.undIguales = 0
    this.undFaltantes = 0
    this.undSobrantes = 0
    this.copIguales = 0
    this.usdIguales = 0
    this.copFaltantes = 0
    this.usdFaltantes = 0
    this.usdDefinitivas = 0
    this.copDefinitivas = 0
    this.undDefinitivas = 0
    this.undDefinitivasConteo = 0
    this.usdDefinitivasConteo = 0
    this.copDefinitivasConteo = 0

    this.totalUndspositivo = 0
    this.totalUndsnegativo = 0
  
    this.totalUSDpositivo = 0
    this.totalUSDnegativo = 0
  
    this.totalCOPpositivo = 0
    this.totalCOPnegativo = 0

    this.Iguales = []
    this.Sobrantes = []
    this.Faltantes = []
    this.Definitivas = []

    let categorias:any = localStorage.getItem('invCategorias');
    this.DefinitivoCategorias = JSON.parse(categorias);
    // ////console.log(this.DefinitivoCategorias)
    this._infoServce.getConteoTag(this.tag).subscribe(
      res=>{
        //console.log(res)
        this.conteo = res
        // this.conteo.sort(function(a,b){
        //   return a.Descripcion_1.localeCompare(b.Descripcion_1);
        // });
        this.unidades_conteo =0
        this.unidades_fisicas = 0
        this.conteo.sort(function(a, b){
          return b.Exist_Final - a.Exist_Final;
        });
        // this.categorias = [...new Set(this.conteo)]
        // // ////console.log(this.categorias)
        for (let i = 0; i < this.conteo.length; i++) {
          const element = this.conteo[i];
          element.Diferencia = element.Conteo - element.Exist_Final;
          if(element.Estado == 'Activo'){
          if(this.cuantas(element.Conteo0) - element.Exist_Final == 0){
            this.Iguales.push(element)
            this.undIguales = this.undIguales + element.Exist_Final
            this.copIguales = this.copIguales + Number(element.TOTAL_FINAL_INV)
            this.usdIguales = this.usdIguales + Number(element.TOTAL_FINAL_INV_USD)
           }
           if(this.cuantas(element.Conteo0) - element.Exist_Final <= -1){
            this.Faltantes.push(element)
            this.undFaltantes = this.undFaltantes + element.Exist_Final
            this.copFaltantes = this.copFaltantes + Number(element.TOTAL_FINAL_INV)
            this.usdFaltantes = this.usdFaltantes + Number(element.TOTAL_FINAL_INV_USD)
           }
           if(this.cuantas(element.Conteo0) - element.Exist_Final >= 1){
            this.Sobrantes.push(element)
            this.undSobrantes = this.undSobrantes + element.Exist_Final
            this.copSobrantes = this.copSobrantes + Number(element.TOTAL_FINAL_INV)
            this.usdSobrantes = this.usdSobrantes + Number(element.TOTAL_FINAL_INV_USD)
           }
  
          if(element.Exist_Final >= 1){
            this.unidades_conteo = this.unidades_conteo + element.Exist_Final
            this.unidades_fisicas =  this.unidades_fisicas + element.Conteo0.length
          }

        }else{
          this.Definitivas.push(element)
          this.usdDefinitivas = this.usdDefinitivas + Number(element.TOTAL_FINAL_INV_USD) 
          this.copDefinitivas = this.copDefinitivas + Number(element.TOTAL_FINAL_INV)
          this.undDefinitivas = this.undDefinitivas + element.Exist_Final
          this.undDefinitivasConteo = this.undDefinitivasConteo + element.Conteo
          if(element.Exist_Final != 0){
            this.usdDefinitivasConteo = this.usdDefinitivasConteo + ((element.TOTAL_FINAL_INV_USD / element.Exist_Final) *  element.Conteo) 
            this.copDefinitivasConteo = this.copDefinitivasConteo + ((element.TOTAL_FINAL_INV / element.Exist_Final) *  element.Conteo) 
            
            this.DefinitivoCategorias.forEach(categ => {
              // ////console.log(element.Cla)
              let pos = categ.subscat.map(function(e:any) { return e; }).indexOf(element.Cla);
              // ////console.log(pos)
              if(pos != -1){
                // ////console.log('entro '+ categ.difUnidades.positivo)
                if((element.Conteo - element.Exist_Final)>= 1 ){
                  categ.difUnidades.positivo  = categ.difUnidades.positivo + (element.Conteo - element.Exist_Final)
                  categ.difCOP.positivo  = categ.difCOP.positivo + ((element.Conteo * (element.TOTAL_FINAL_INV / element.Exist_Final )) - element.TOTAL_FINAL_INV)
                  categ.difUSD.positivo  = categ.difUSD.positivo + ((element.Conteo * (element.TOTAL_FINAL_INV_USD / element.Exist_Final )) - element.TOTAL_FINAL_INV_USD)
                  this.totalUndspositivo =  this.totalUndspositivo + (element.Conteo - element.Exist_Final)
                  this.totalUSDpositivo = this.totalUSDpositivo +  ((element.Conteo * (element.TOTAL_FINAL_INV_USD / element.Exist_Final )) - element.TOTAL_FINAL_INV_USD)
                  this.totalCOPpositivo = this.totalCOPpositivo + ((element.Conteo * (element.TOTAL_FINAL_INV / element.Exist_Final )) - element.TOTAL_FINAL_INV)
    
                }else{
                  categ.difUnidades.negativo  = categ.difUnidades.negativo + (element.Conteo - element.Exist_Final)
                  categ.difCOP.negativo  = categ.difCOP.negativo + ((element.Conteo * (element.TOTAL_FINAL_INV / element.Exist_Final )) - element.TOTAL_FINAL_INV)
                  categ.difUSD.negativo  = categ.difUSD.negativo + ((element.Conteo * (element.TOTAL_FINAL_INV_USD / element.Exist_Final )) - element.TOTAL_FINAL_INV_USD)
                  this.totalUndsnegativo = this.totalUndsnegativo + (element.Conteo - element.Exist_Final)
                  this.totalUSDnegativo = this.totalUSDnegativo + ((element.Conteo * (element.TOTAL_FINAL_INV_USD / element.Exist_Final )) - element.TOTAL_FINAL_INV_USD)
                  this.totalCOPnegativo = this.totalCOPnegativo  + ((element.Conteo * (element.TOTAL_FINAL_INV / element.Exist_Final )) - element.TOTAL_FINAL_INV)
                }               
                
              }
            });
         
          }
          
        }
      }

       
        // ////console.log( this.Definitivas)
        this.openSnackBar('NUEVOS REGISTROS '+ this.conteo.length)
        this.log= false
      }
    )
  }

  conteo:_Conteo[]=[]

  passRegistro(item:any){
    let registro = {reg:item, coll:this.tag} 
    let dialogRef = this.dialog.open(DialogConteoDetail,{
      data: registro
    });
    dialogRef.afterClosed().subscribe(result => {
      //// ////console.log(result)
      if(result == item){
        //// ////console.log('igual')
      }else{
        //// ////console.log('cambio')
        // this.getDataCollections(this.key)
      }
      item = result
    })
    // ////// ////console.log(event)
  }

  sortedData: _Conteo[] = [];

  sortData(sort: Sort) {
    const data = this.conteo;
    // // ////console.log(data) 
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    // Codigo_1
    // Codigo_3
    // CLASS_DISCRIP
    // Descripcion_1
    // Exist

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Codigo_1':
          // ////console.log('Codigo_1')
          return compare(a.Codigo1, b.Codigo1, isAsc);
        case 'Codigo_3':
          return compare(a.Codigo_3, b.Codigo_3, isAsc);
        case 'CLASS_DISCRIP':
          return compare(a.Cla, b.Cla, isAsc);
        case 'Descripcion_1':
          return compare(a.Descripcion_1, b.Descripcion_1, isAsc);
        case 'Exist':
          return compare(a.Exist_Final, b.Exist_Final, isAsc);
        default:
          return 0;
      }
    });
  }


  searCate =''
  verProdFilterCategoria(filter:string ){
   
   var arrayFilter: _Conteo[] =[]
   if(this.searCate == ''){
    this.getCnteoTag()
   }else{
    if(filter=='Iguales'){
     this.Iguales.map(
      (element) =>{
        let index = element.Cla.indexOf(this.searCate.toUpperCase())
        if(index != -1){
          arrayFilter.push(element)
        }
      }
     )
     if(arrayFilter.length !=0){
      this.Iguales = arrayFilter;
     }
    
    }
    if(filter=='Faltantes'){
      this.Faltantes.map(
       (element) =>{
         let index = element.Cla.indexOf(this.searCate.toUpperCase())
         ////console.log(index)
         if(index != -1){
           arrayFilter.push(element)
         }
       }
      )
      if(arrayFilter.length !=0){
        this.Faltantes = arrayFilter;
       }

     }


     if(filter=='Sobrantes'){
      this.Sobrantes.map(
       (element) =>{
         let index = element.Cla.indexOf(this.searCate.toUpperCase())
         ////console.log(index)
         if(index != -1){
           arrayFilter.push(element)
         }
       }
      )
      if(arrayFilter.length !=0){
        this.Sobrantes = arrayFilter;
       }

     }

     if(filter=='Definitivas'){
      this.Definitivas.map(
       (element) =>{
         let index = element.Cla.indexOf(this.searCate.toUpperCase())
        //  ////console.log(index)
         if(index != -1){
           arrayFilter.push(element)
         }
       }
      )
      if(arrayFilter.length !=0){
      this.Definitivas = arrayFilter;
      }
     }
   }
  }



  verProdFilter(filter:string ){
   
    var arrayFilter: _Conteo[] =[]
    if(this.searProd == ''){
     this.getCnteoTag()
    }else{
     if(filter=='Iguales'){
      this.Iguales.map(
       (element) =>{
         let index = element.Descripcion_1.indexOf(this.searProd.toUpperCase())
         ////console.log(index)
         if(index != -1){
           arrayFilter.push(element)
         }
       }
      )
      this.Iguales = arrayFilter;
     }
     if(filter=='Faltantes'){
       this.Faltantes.map(
        (element) =>{
          let index = element.Descripcion_1.indexOf(this.searProd.toUpperCase())
          ////console.log(index)
          if(index != -1){
            arrayFilter.push(element)
          }
        }
       )
       this.Faltantes = arrayFilter;
      }
 
 
      if(filter=='Sobrantes'){
       this.Sobrantes.map(
        (element) =>{
          let index = element.Descripcion_1.indexOf(this.searProd.toUpperCase())
          ////console.log(index)
          if(index != -1){
            arrayFilter.push(element)
          }
        }
       )
       this.Sobrantes = arrayFilter;
      }
 
      if(filter=='Definitivas'){
       this.Definitivas.map(
        (element) =>{
          let index = element.Descripcion_1.indexOf(this.searProd.toUpperCase())
         //  ////console.log(index)
          if(index != -1){
            arrayFilter.push(element)
          }
        }
       )
       this.Definitivas = arrayFilter;
      }
    }
   }

  
  up = 0
  procesarFaltantes(){
    this.up = 0 
    this.Faltantes.forEach(element => {
        if(element.check){
          this.up =  this.up++
          if(element.Conteo1.length == 0){
              this.procesarFaltantesContar(element)
          }else{
            if(this.cuantas(element.Conteo1) == this.cuantas(element.Conteo0) ){
              element.Conteo2 = element.Conteo0
              this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
            }else{
              if(element.Conteo2.length == 0){
                this.procesarFaltantesContar(element)
              }else{
                if(this.cuantas(element.Conteo2) == this.cuantas(element.Conteo0) ){
                  element.Conteo3 = element.Conteo0
                  this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
                }else{
                  element.Conteo3 = element.Conteo0
                  this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
                }
              }

            }
          }
         
        }else{
          this.up =  this.up++
        }
    });
  }

  procesarFaltantesContar(element: _Conteo){
    // this.Faltantes.forEach(element => {
      if(element.check){
        if(element.Conteo1.length == 0){
          this.conteo1(element)
        }else{
          if(element.Conteo2.length == 0){
            this.conteo2(element)
          }else{
            if(element.Conteo3.length == 0){
              this.conteo3(element)
            }else{ if(element.Conteo4.length == 0){
              this.conteo4(element)
            }
          }
          }
        }
      }
     
    // });
  }

  checkIguales(event: any){ 
    this.Iguales.forEach(element => {
      element.check = event.checked
    })
  }

  checkFaltantes(event: any){
    // ////console.log(event)
    this.Faltantes.forEach(element => {
      element.check = event.checked
    })
  }

  checkSobrantes(event: any){
    // ////console.log(event)
    this.Sobrantes.forEach(element => {
      element.check = event.checked
    })
  }

  procesarSobrantes(){ 
    // this.Sobrantes.forEach(element => {
    //   // if(element.check){
    //     this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
    //   // }
    //   });

    this.up = 0 
    this.Sobrantes.forEach(element => {
        if(element.check){
          this.up =  this.up++
          if(element.Conteo1.length == 0){
              this.procesarSobrantesContar(element)
          }else{
            if(this.cuantas(element.Conteo1) == this.cuantas(element.Conteo0) ){
              element.Conteo2 = element.Conteo0
              this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
            }else{
              if(element.Conteo2.length == 0){
                this.procesarSobrantesContar(element)
              }else{
                if(this.cuantas(element.Conteo2) == this.cuantas(element.Conteo0) ){
                  element.Conteo3 = element.Conteo0
                  this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
                }else{
                  element.Conteo3 = element.Conteo0
                  this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
                }
              }

            }
          }
         
        }else{
          this.up =  this.up++
        }
    });



  }


  procesarIguales(){ 
    this.Iguales.forEach(element => {
        if(element.check){
          this.conteoDefinitivoDefinitivo(element.Conteo0, element._id, element)
        }
      });
  }

  procesarIgualesContar(){
      this.Iguales.forEach(element => {
      if(element.check){
        if(element.Conteo1.length == 0){
          this.conteo1(element)
        }else{
          if(element.Conteo2.length == 0){
            this.conteo2(element)
          }else{
            if(element.Conteo3.length == 0){
              this.conteo3(element)
            }else{ if(element.Conteo4.length == 0){
              this.conteo4(element)
            }
          }
          }
        }
      }
    })
  }

  

  procesarSobrantesContar(element: _Conteo){
    // this.Sobrantes.forEach(element => {
  
        if(element.Conteo1.length == 0){
          this.conteo1(element)
        }else{
          if(element.Conteo2.length == 0){
            this.conteo2(element)
          }else{
            if(element.Conteo3.length == 0){
              this.conteo3(element)
            }else{ if(element.Conteo4.length == 0){
              this.conteo4(element)
            }
          }
          }
        }
    
     
    // });
  }

  

  conteoDefinitivoDefinitivo(element : any, id:string, conteo : _Conteo){
    conteo.Definitivo = element
   let register = {
      Definitivo: element,
      _id: id,
      Estado:'Definitivo',
      Conteo : this.cuantas(element),
      Diferencia: this.cuantas(element) - element.Exist,
    }
    this._infoServce.updateConteoDefinitivo(register, this.tag).subscribe(
      res=>{
        this.openSnackBar('Actualizado')
        // // ////console.log(res)
      }
    )

  }

  conteoDefinitivo(element : _Conteo){
    element.Definitivo = element.Conteo0
    element.Conteo0 = []

   let register = {
      Definitivo: element.Definitivo,
      Conteo0: [],
      _id: element._id,
      Estado:'Definitivo',
      Conteo : this.cuantas(element.Definitivo),
      Diferencia: element.Exist_Final - this.cuantas(element.Conteo0),
    }
    this._infoServce.updateConteoDefinitivo(register, this.tag).subscribe(
      res=>{
        // ////console.log(res)
        this.openSnackBar('Actualizado')
      }
    )
  }

  conteo1(element : _Conteo){
    element.Conteo1 = element.Conteo0
    element.Conteo0 = []

    let register = {
      Conteo0: [],
      Conteo1: element.Conteo1,
      _id: element._id,
    }
    this._infoServce.updateConteo1(register, this.tag).subscribe(
      res=>{
        // ////console.log(res)
        this.openSnackBar('Actualizado')
      }
    )
  }

  conteo2(element : _Conteo){
    element.Conteo2 = element.Conteo0
    element.Conteo0 = []
    let register = {
      Conteo0: [],
      Conteo2: element.Conteo2,
      _id: element._id,
    }
    this._infoServce.updateConteo2(register, this.tag).subscribe(
      res=>{
        // ////console.log(res)
        this.openSnackBar('Actualizado')
      }
    )
  }

  conteo3(element : _Conteo){
    element.Conteo3 = element.Conteo0
    element.Conteo0 = []
    let register = {
      Conteo0: [],
      Conteo3: element.Conteo3,
      _id: element._id,
    }
    this._infoServce.updateConteo3(register, this.tag).subscribe(
      res=>{
        // ////console.log(res)
        this.openSnackBar('Actualizado')
      }
    )
  }

  conteo4(element : _Conteo){
    element.Conteo4 = element.Conteo0
    element.Conteo0 = []

    let register = {
      Conteo0: [],
      Conteo4: element.Conteo4,
      _id: element._id,
    }
    this._infoServce.updateConteo4(register, this.tag).subscribe(
      res=>{
        // ////console.log(res)
        this.openSnackBar('Actualizado')
      }
    )
  }


  searchEanIguales(){
    // this.Iguales.find(function(element:_Conteo => element.EAN == this.searcEan));
   
  }

  filterEanIguales(){
    if(this.Iguales[0].Exist_Final >> this.Iguales[this.Iguales.length-1].Exist_Final){
      this.Iguales.sort(function(a, b){
        return b.Exist_Final - a.Exist_Final;
      });
    }else{ 
      this.Iguales.sort(function(a, b){
        return  a.Exist_Final - b.Exist_Final ;
      });
    }
  }

  filterEanFaltantes(){
    if(this.Faltantes[0].Exist_Final >> this.Faltantes[this.Faltantes.length-1].Exist_Final){
      this.Faltantes.sort(function(a, b){
        return  a.Exist_Final - b.Exist_Final ;
      });
    }else{ 
      this.Faltantes.sort(function(a, b){
        return b.Exist_Final - a.Exist_Final;
      });
     
    }
  }

  filterEanSobrantes(){
    if(this.Sobrantes[0].Exist_Final >> this.Sobrantes[this.Sobrantes.length-1].Exist_Final){
      this.Sobrantes.sort(function(a, b){
        return  a.Exist_Final - b.Exist_Final ;
      });
    }else{ 
      this.Sobrantes.sort(function(a, b){
        return b.Exist_Final - a.Exist_Final;
      });
    }
  }

  

  filterSKUIguales(){

     this.Iguales.sort(function(a,b){
          return a.Codigo1.localeCompare(b.Codigo1);
      });

    // if(this.Iguales[0].Exist_Final >> this.Iguales[this.Iguales.length-1].Exist_Final){
    //   this.Iguales.sort(function(a, b){
    //     return  a.Codigo1 - b.Codigo1 ;
    //   });
    // }else{ 
    //   this.Iguales.sort(function(a, b){
    //     return b.Codigo1 - a.Codigo1;
    //   });
     
    // }
  }


  filterSKUFaltantes(){
    if(this.Faltantes[0].Exist_Final >> this.Faltantes[this.Faltantes.length-1].Exist_Final){
      this.Faltantes.sort(function(a, b){
        return  a.Codigo1 - b.Codigo1 ;
      });
    }else{ 
      this.Faltantes.sort(function(a, b){
        return b.Codigo1 - a.Codigo1;
      });
     
    }
  }

  filterSKUSobrantes(){
    if(this.Sobrantes[0].Exist_Final >> this.Sobrantes[this.Sobrantes.length-1].Exist_Final){
      this.Sobrantes.sort(function(a, b){
        return  a.Codigo1 - b.Codigo1 ;
      });
    }else{ 
      this.Sobrantes.sort(function(a, b){
        return b.Codigo1 - a.Codigo1;
      });
     
    }
  }

  filterExistIguales(){
    if(this.Iguales[0].Exist_Final >> this.Iguales[this.Iguales.length-1].Exist_Final){
      this.Iguales.sort(function(a, b){
        return  a.Exist_Final - b.Exist_Final ;
      });
    }else{ 
      this.Iguales.sort(function(a, b){
        return b.Exist_Final - a.Exist_Final;
      });
     
    }
  }

  filterExistSobrantes(){
    if(this.Sobrantes[0].Exist_Final >> this.Sobrantes[this.Sobrantes.length-1].Exist_Final){
      this.Sobrantes.sort(function(a, b){
        return  a.Exist_Final - b.Exist_Final ;
      });
    }else{ 
      this.Sobrantes.sort(function(a, b){
        return b.Exist_Final - a.Exist_Final;
      });
     
    }
  }

  filterExistDefinitivos(){
    if(this.Definitivas[0].Exist_Final >> this.Definitivas[this.Definitivas.length-1].Exist_Final){
      this.Definitivas.sort(function(a, b){
        return  a.Exist_Final - b.Exist_Final ;
      });
    }else{ 
      this.Definitivas.sort(function(a, b){
        return b.Exist_Final - a.Exist_Final;
      });
     
    }
  }

  filterCOPFaltantes(){
    if(this.Faltantes[0].COST_PROM >> this.Faltantes[this.Faltantes.length-1].COST_PROM){
      this.Faltantes.sort(function(a, b){
        return  a.COST_PROM - b.COST_PROM ;
      });
    }else{ 
      this.Faltantes.sort(function(a, b){
        return b.COST_PROM - a.COST_PROM;
      });
     
    }
  }

  filterCOPIguales(){
    if(this.Iguales[0].TOTAL_FINAL_INV >> this.Iguales[this.Iguales.length-1].TOTAL_FINAL_INV){
      this.Iguales.sort(function(a, b){
        return  a.TOTAL_FINAL_INV - b.TOTAL_FINAL_INV ;
      });
    }else{ 
      this.Iguales.sort(function(a, b){
        return b.TOTAL_FINAL_INV - a.TOTAL_FINAL_INV;
      });
     
    }
  }

  filterCOPSobrantes(){
    if(this.Sobrantes[0].COST_PROM >> this.Sobrantes[this.Sobrantes.length-1].COST_PROM){
      this.Sobrantes.sort(function(a, b){
        return  a.COST_PROM - b.COST_PROM ;
      });
    }else{ 
      this.Sobrantes.sort(function(a, b){
        return b.COST_PROM - a.COST_PROM;
      });
     
    }
  }

  printFaltantes(): void {
    // //('entro prit')
    let printContents
    let  popupWin:any;
    printContents = document.getElementById('faltantes')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
       <html>
           <head>
               <title>Conteo Fisico</title>
               <style>
               </style>
           </head>
           <body onload="window.print();window.close()">${printContents}
           
           </body>
       </html>`
    );
    popupWin.document.close();
  }

  printSobrantes(): void {
    // //('entro prit')
    let printContents
    let  popupWin:any;
    printContents = document.getElementById('sobrantes')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
       <html>
           <head>
               <title>Conteo Fisico</title>
               <style>
               </style>
           </head>
           <body onload="window.print();window.close()">${printContents}
           
           </body>
       </html>`
    );
    popupWin.document.close();
  }

  printDefinitivos(): void {
    // //('entro prit')
    let printContents
    let  popupWin:any;
    printContents = document.getElementById('definitivos')?.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
       <html>
           <head>
               <title>Conteo Fisico</title>
               <style>
               </style>
           </head>
           <body onload="window.print();window.close()">${printContents}
           
           </body>
       </html>`
    );
    popupWin.document.close();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



@Component({
  selector: 'app-conteo-dialog',
  templateUrl: './conteo.component.html',
  styleUrls: ['./toma-inventario.component.css']
})
export class DialogConteoDetail {
  motivos:any;

  constructor(
    public dialogRef: MatDialogRef<DialogConteoDetail>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      ////console.log(this.data)
     }

  onNoClick(): void {
    
  }

  cancelar(){
    this.dialogRef.close();
  }
  
  confirmar(){
    this.dialogRef.close('ok');
  }

  confirmarDelete(motivos:any){
    this.dialogRef.close(motivos);
  }

}