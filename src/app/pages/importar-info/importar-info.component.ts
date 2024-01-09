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

interface Articulo{
  
}
@Component({
  selector: 'app-importar-info',
  templateUrl: './importar-info.component.html',
  styleUrls: ['./importar-info.component.css']
})
export class ImportarInfoComponent implements OnInit {
  newDataUp:any;
  config:any;
  date:any;
  obs:any;
  displayedColumns: string[] = ['folio', 'unds', 'cop', 'detail'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  pOperacion:Operacion
  constructor( public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
              public _infoServce:InfoService,
              public _socketService:SocketIOService,
              // public _mongoService: MongoDbService
              public _siigoService:SiigoService,
              private _snackBar: MatSnackBar,
              _userService:UserService
    ) { 
      this.config = new Config();
      // this.trmApi =  new TrmApi("aEOKmLbbPROhCr6iDiieAGCqt");
      // this.trmApi
      //   .latest()
      //   .then((data:any) =>  //console.log(this.trm =  data.valor))
      //   .catch((error:any) =>  //console.log(error));

        this.pOperacion=_userService.getPredetermidaOperacion();
    }

  ngOnInit(): void {
    this.getConfig()
    // this._mongoService.main();
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 3000,
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
    this._infoServce.getConfig(this.pOperacion._id).subscribe(
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
      // ////// ////console.log(this.data);
      this.log= false;

    };
    reader.onerror = err => {
      this.log= false;
    };
   }

   documentos:Articulo[] = [];
   dataSource:any;
   getfacturacionSiigo(){
    this.log= true;
    this._infoServce.getfacturacionSiigo(this.tag).subscribe(
      res=>{
        this.documentos = res
        this.dataSource = new MatTableDataSource<Articulo>(this.documentos);
        this.dataSource.sort = this.sort
        this.log= false;
      }
    );
   }

   sortData(event:any){
     // ////// ////console.log(event)
   }

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

      this.convertirJson()
      this.log= false;
    };

    reader.readAsBinaryString(target.files[0]);

  }

  progreso = 0
  authSiigo(tag:string){
    this.progreso = 1;
    this.newDataUp =  this._socketService.listen('UpSiigo').subscribe((data:any)=>{
      // ////// ////console.log(data);
      this.progreso = (data.i / data.length)*100
      // ////// ////console.log(this.progreso)
    })


    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey
    }

    this._siigoService.sendInvoicesPeriodo(credenciales, tag).subscribe(
      res => {
        // ////// ////console.log(res)
      },err=>{
        // ////// ////console.log(err.status)
        if(err.status == 200){
          let data = {titulo: 'Confirmaciòn', info:err.error.text, type: 'Confirm', icon:'done_all'}
  
          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // this.getfacturacionSiigo()
          })
        }
      }
    )
  }

  saveInfoSocket(){
    // ////// ////console.log(JSON.stringify(this.registros))
    this._socketService.emit('dataUpNow', JSON.stringify(this.registros))
  }

  tag:string = '';
  saveInfoCompleto(registros: any){
    this.log= true;
    let dialogRef
    this._infoServce.agregarInfo(registros, this.tag).subscribe(
      res =>{
        let dato = res
        this.procesado++
        // ////console.log(this.procesado)
        if(this.procesado <= this.lotesCmprobantes.length){
          if(this.procesado << this.lotesCmprobantes.length){
            this.generarRegistros(this.lotesCmprobantes[this.procesado])
            this.dialog.closeAll()
            let data = {titulo: 'Progreso '+ this.procesado + ' de ' + this.lotesCmprobantes.length, info:'Se Registraron ' + res.insertedCount + ' de ' + registros.length, type: 'Confirm', icon:'done_all'}
            dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
          }else{
            this.log = false
            let data = {titulo: 'Registro Exitoso '+ this.procesado + 'de ' + this.lotesCmprobantes.length, info:'Se Registraron ' + res.insertedCount + ' de ' + registros.length, type: 'Confirm', icon:'done_all'}
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
          }
        }
        
      })
  }
 
  saveInfo(){
    this.log= true;
    let data: Object
    data = {titulo: 'Confirmaciòn', info:'Se Subiran los Registros', type: 'Cancel', icon:'pan_tool'}
  
    let dialogRef = this.dialog.open(DialogConfirm,{
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.register = 0
        for(var i = 0;i < this.registros.length; i++){
          this.registros[i].TRM = this.trm;
          this.registros[i].COP = this.trm * this.registros[i].Importe;
          this._infoServce.saveInfo(this.registros[i]).subscribe(
            res=>{
              this.register ++
              // ////// ////console.log(res)
              if(this.register ==  this.registros.length){
               
                let data: Object
                data = {titulo: 'Exito', info:'Se han procesado ' + this.register + ' Registros', type: 'Confirm', icon:'done_all'}
              
                let dialogRef = this.dialog.open(DialogConfirm,{
                  data: data
                });

                dialogRef.afterClosed().subscribe(result => {
                  this.data = [];
                  this.registros = [];
                  this.log= false;
                })

              }

            }
          )
        }
      }
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

    
    for(var i = 0;i < this.registros.length; i++){
      let fecha =  this.registros[i].FECHA;
      let split = fecha.split("/");
      // // ////// ////console.log(split)
      this.registros[i].Importe = Number(this.registros[i].TOTAL)
      this.registros[i].Estado = 'Activa';
      this.registros[i].Siigo = [];
      this.registros[i].Pdf = [];
      this.registros[i].TRM = this.registros[i]['TIPO DE CAMBIO'];
      this.registros[i].COP = this.registros[i]['VALOR EN PESOS'];
      this.registros[i].Costo_de_v =  this.registros[i]['COSTO DE VENTA'];

      if(!this.registros[i].Costo_de_v){
        this.registros[i].Costo_de_v = 0;
      }

      //console.log(this.registros[i]['COSTO DE VENTA'])
      //console.log(this.registros[i].Costo_de_v)

      for (let q = 0; q < this.config.categorias.length; q++) {
        const element = this.config.categorias[q];
        // ////console.log(element)
        let subc = element.subscat.map(function(e: { cod: number; }) { return e; }).indexOf( parseInt(this.registros[i]['CLASIFICACION']));
         if(subc != -1){
          this.registros[i].CATEGORIA = element.titulo;
          break
         } 
      }

      // ////console.log(this.registros[i]['COSTO DE VENTA'])

      if(parseInt(split[0]) <= 9){
        this.registros[i].Day = '0'+ split[0];
        // ////// ////console.log( this.registros[i].Day)
      }else{
        this.registros[i].Day = split[0];
        // ////// ////console.log( this.registros[i].Day)
      }

      this.registros[i].Month = split[1];
      this.registros[i].Year = '20'+split[2];

      let detalle = 'FAC '+this.registros[i].FOLIO + ' SKU: '+this.registros[i].CODIGO + ' CANT: ' +this.registros[i].CANTIDAD + ' TRM: '+this.registros[i].TRM + ' USD: '+this.registros[i].TOTAL + ' ' + this.registros[i].DESCRIPCION;
      if(detalle.length >= 101){
        detalle = detalle.slice(0, 100);
      }

      this.registros[i].Detalle = detalle;

    }
    this.log= false;
   
    console.log(this.registros)
    let lotes = 200;
    this.chunckArrayInGroups(this.registros, lotes)
   
  }

   chunckArrayInGroups(arr:any[], size:number) {
    var chunk = [], i; // declara array vacio e indice de for
    for (i = 0; i <= arr.length; i+= size) // loop que recorre el array 
      chunk.push(arr.slice(i, i + size)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador 
      // ////console.log(chunk)
      return this.lotesCmprobantes = chunk;
  }

  generarRegistros(registros: any[]){
    console.log( registros)
    if(registros){
    this.log = true
    this.itemsContable =[]
    this.itemsFacturaVentas=[]
    for(var i = 0;i < registros.length; i++){
      //console.log(registros[i].Costo_de_v)
      if(!registros[i].Costo_de_v){
        registros[i].Costo_de_v = 0;
      }

      let pos2 = this.cuentas.map(function(e: { cod: any; }) { return e.cod; }).indexOf( parseInt(registros[i]['CLASIFICACION']));

      if(pos2 != -1){

        let posTienda = this.config.tiendas.map(function(e: { tienda: any; }) { return e.tienda; }).indexOf(registros[i]['PDV']);
        let tienda :any

        console.log('tienda en configuracion',posTienda)

        if(posTienda != -1){
          tienda =this.config.tiendas[posTienda].centro_costos;
        }

        let dtaComprobante = {
          account:{
            code:this.cuentas[pos2].Debit,
            movement:'Debit'
          },
          customer:{
            identification:'222222222',
            // identification:registros[i]['No. PASAPORTE']
          },
          product:{
            code:registros[i]['CLASIFICACION'] +'',
            name: 'CMV FAC '+ registros[i].FOLIO +' SKU '+ registros[i].CODIGO +' CANT: '+ registros[i].CANTIDAD   + ' ' +  registros[i].DESCRIPCION,
            quantity: registros[i].CANTIDAD,
            // description: registros[i].Detalle,
            description:'CMV FAC '+ registros[i].FOLIO +' SKU '+ registros[i].CODIGO +' CANT: '+ registros[i].CANTIDAD + ' ' + registros[i].DESCRIPCION,
            value:registros[i].Costo_de_v,
          },
          value:registros[i].Costo_de_v,
          quantity: registros[i].CANTIDAD,
          // description: registros[i].Detalle,
          cost_center: tienda, 
          description:'CMV FAC '+ registros[i].FOLIO +' SKU '+ registros[i].CODIGO +' CANT: '+ registros[i].CANTIDAD +' ' + registros[i].DESCRIPCION,
        }

        dtaComprobante.description = dtaComprobante.description.slice(0,99)

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
            code:registros[i]['CLASIFICACION'] +'',
            name:'CMV FAC '+ registros[i].FOLIO +' SKU '+ registros[i].CODIGO +' CANT: '+ registros[i].CANTIDAD +' ' + registros[i].DESCRIPCION ,
            quantity: registros[i].CANTIDAD,
            // description: registros[i].Detalle,
            description:'CMV FAC '+ registros[i].FOLIO +' SKU '+ registros[i].CODIGO +' CANT: '+ registros[i].CANTIDAD +' ' + registros[i].DESCRIPCION ,
            value:registros[i].Costo_de_v,
          },  
          value:registros[i].Costo_de_v,
          quantity: registros[i].CANTIDAD,
          // description: registros[i].Detalle,
          cost_center: tienda, 
          description:'CMV FAC '+ registros[i].FOLIO +' SKU '+ registros[i].CODIGO +' CANT: '+ registros[i].CANTIDAD +' ' + registros[i].DESCRIPCION ,
        }

        dtaComprobante2.description = dtaComprobante.description.slice(0,99)
    
        this.itemsContable.push(dtaComprobante2)  
     

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
            code:registros[i].CLASIFICACION +'',
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
          cost_center: tienda, 
          // cost_center: 21013, 
          value:registros[i].COP,
        }

        this.itemsFacturaVentas.push(dtaComprobanteVentaDeb)
        
      }else{
        // ////console.log('Registo no encontrado '+ registros[i].Clasi)
      }
    }


    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey,
      data: this.itemsContable,
      number:2534,
      date:this.date,
      obs:this.obs,
      iddoc:5086,
      _id:this.pOperacion._id
    }

    let credencialesVentas={
      user:this.config.siigoUser,
      key:this.config.siigoKey,
      data: this.itemsFacturaVentas,
      date:this.date,
      obs:this.obs,
      iddoc:31800,
      _id:this.pOperacion._id
    }

    // console.log(credenciales)

    this._siigoService.saveComprobantesSiigo(credenciales).subscribe(
      res=>{
        console.log(res);
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

  costo(doc: any[]){
    let valor = 0
    doc.forEach(element => {
      if(element.Costo_de_v != 0){
      valor = valor + element.Costo_de_v
      }

    });
    return valor
  }

  venta(doc: any[]){
    let valor = 0
    doc.forEach(element => {
      if(element.COP != 0){
      valor = valor + element.COP
      }
    });
    return valor
  }

  totalVentas(){
    let valor = 0
    this.registros.forEach((element: { COP: number; }) => {
      valor = valor + element.COP
    });
    return valor
  }

  totalCostos(){
    let valor = 0
    this.registros.forEach((element: {
      FOLIO: any; Costo_de_v: number; 
      }) => {
      // ////console.log(element.FOLIO, element.Costo_de_v)
      if(element.Costo_de_v != 0){
        valor = valor + element.Costo_de_v
        // ////console.log(valor)
      }
     
    });
    ////console.log(valor)
    return valor
  }

  reload(){
    window.location.reload();
  }


}
