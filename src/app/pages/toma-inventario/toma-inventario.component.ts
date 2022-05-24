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
import { time } from 'console';
import { DialogDataJson } from '../data-base/data-base.component';
import {Sort} from '@angular/material/sort';

export interface _Conteo {

  Codigo_1: number;
  Codigo_3: number;
  CLASS_DISCRIP: string;
  Descripcion_1: string;
  Exist: number;
}

@Component({
  selector: 'app-toma-inv',
  templateUrl: './toma-inventario.component.html',
  styleUrls: ['./toma-inventario.component.css']
})

export class tomaInventarioComponent implements OnInit {
  newDataUp:any;
  config:any;
  date:any;
  obs:any;
  displayedColumns: string[] = ['SKU', 'EAN', 'CATEGORIA', 'PRODUCTO', 'EXISTENCIA','CONTEO', 'DIFERENCIA', 'DETALLE'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor( public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
              public _infoServce:InfoService,
              public _socketService:SocketIOService,
              // public _mongoService: MongoDbService
              public _siigoService:SiigoService,
              private _snackBar: MatSnackBar
    ) { 
      this.config = new Config();
      this.trmApi =  new TrmApi("aEOKmLbbPROhCr6iDiieAGCqt");
      // this.trmApi
      //   .latest()
      //   .then((data:any) =>  console.log(this.trm =  data.valor))
      //   .catch((error:any) =>  console.log(error));
    }

  ngOnInit(): void {
    this.getConfig()
    // this._mongoService.main();
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
  scan = 0

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
		

  getConfig(){
    this._infoServce.getConfig().subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          localStorage.setItem('categ',JSON.stringify(this.config.categorias))

          ////console.log(this.config)
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
      // ////console.log(this.data);
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

      console.log('Data',this.data);

      this.convertirJson()
      this.log= false;
    };

    reader.readAsBinaryString(target.files[0]);

  }

  progreso = 0


  saveScanSocket(){
    // ////console.log(JSON.stringify(this.registros))
    // this._socketService.emit('dataUpNow', JSON.stringify(this.registros))
  }

  subirConteo(){
    console.log(this.tag)
    console.log(this.registros)
    this.saveInfoCompleto(this.registros)
  }


  tag:string = '';
  saveInfoCompleto(registros: any){
    this.log= true;
    this._infoServce.agregarConteo(registros, this.tag).subscribe(
      res =>{
        let dato = res
        console.log(dato)
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
  itemsFacturaVentas:any = [];
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

   console.log(this.registros) 
    
    for(var i = 0;i < this.registros.length; i++){
      if(this.registros[i].Exist == ''){
        this.registros[i].Exist = 0
      }
      this.registros[i].Estado = 'Activo';
      this.registros[i].Conteo0 = [];
      this.registros[i].Conteo1 = [];
      this.registros[i].Conteo2 = [];
      this.registros[i].Conteo3 = [];
      this.registros[i].Conteo4 = [];
      this.registros[i].Definitivo = [];
      this.registros[i].Diferencia = 0;
      this.log= false;
    }
    // console.log(this.registros)
  }

   chunckArrayInGroups(arr:any[], size:number) {
    var chunk = [], i; // declara array vacio e indice de for
    for (i = 0; i <= arr.length; i+= size) // loop que recorre el array 
      chunk.push(arr.slice(i, i + size)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador 
      console.log(chunk)
      return this.lotesCmprobantes = chunk;
  }

  generarRegistros(registros: any[]){
    console.log( registros)
    if(registros){
    this.log = true
    this.itemsContable =[]
    this.itemsFacturaVentas=[]
    for(var i = 0;i < registros.length; i++){
      let pos2 = this.cuentas.map(function(e: { cod: any; }) { return e.cod; }).indexOf(registros[i].Clasi);
      // console.log(pos2)
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
        console.log('Registo no encontrado '+ registros[i].Clasi)
      }
    }

    // console.log(this.date)
    // console.log( this.itemsContable)
    // console.log( this.itemsFacturaVentas)
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey,
      data: this.itemsContable,
      date:this.date,
      obs:this.obs,
      iddoc:5086,
    }

    // console.log(credenciales)
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
        console.log(res)
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
        console.log(err)
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

  saveScan(){
    this.log= true;
    this.tag = 'MAYO'
    let scan = {
      scan:this.scan,
      time:new Date().getTime(),
      user:'prueba',
      pos:'UBI 1',
    }
    this._infoServce.agregarScaneo(scan, this.tag).subscribe(
      res =>{
        let dato = res
        console.log(dato)
        let data: Object
        this.log = false
        this.openSnackBar(this.scan + '')
        this.scan =0  
      })
  }


  listenConteo(){
    this.tag = 'MAYO',
    console.log('scan'+this.tag)
    this.newDataUp =  this._socketService.listen('scan'+this.tag).subscribe((data:any)=>{
      console.log(data);
        this._infoServce.getConteoTag(this.tag).subscribe(
          res=>{
            this.openSnackBar(data.scan)
            console.log(res)
            this.conteo = res
          }
        )
    })
  }


  getCnteoTag(){
    this.tag = 'MAYO',
    this._infoServce.getConteoTag(this.tag).subscribe(
      res=>{
        console.log(res)
        this.conteo = res
        this.openSnackBar('NUEVOS REGISTROS '+ this.conteo.length)
      }
    )
  }


  conteo: _Conteo[]=[]

  passRegistro(item:any){
    let registro = {reg:item, coll:this.tag} 
    let dialogRef = this.dialog.open(DialogDataJson,{
      data: registro
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result)
      if(result == item){
        //console.log('igual')
      }else{
        //console.log('cambio')
        // this.getDataCollections(this.key)
      }
      item = result
    })
    // ////console.log(event)
  }

  sortedData: _Conteo[] = [];

  sortData(sort: Sort) {
    const data = this.conteo;
    // console.log(data) 
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
          console.log('Codigo_1')
          return compare(a.Codigo_1, b.Codigo_1, isAsc);
        case 'Codigo_3':
          return compare(a.Codigo_3, b.Codigo_3, isAsc);
        case 'CLASS_DISCRIP':
          return compare(a.CLASS_DISCRIP, b.CLASS_DISCRIP, isAsc);
        case 'Descripcion_1':
          return compare(a.Descripcion_1, b.Descripcion_1, isAsc);
        case 'Exist':
          return compare(a.Exist, b.Exist, isAsc);
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}