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
  constructor( public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
              public _infoServce:InfoService,
              public _socketService:SocketIOService,
              // public _mongoService: MongoDbService
              public _siigoService:SiigoService
    ) { 
      this.config = new Config();
      this.trmApi =  new TrmApi("aEOKmLbbPROhCr6iDiieAGCqt");
      this.trmApi
        .latest()
        .then((data:any) =>  console.log(this.trm =  data.valor))
        .catch((error:any) =>  console.log(error));
    }

  ngOnInit(): void {
    this.getConfig()
    // this._mongoService.main();
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
     // ////console.log(event)
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

      const wsnameC : string = wb.SheetNames[1];
      const wsC: XLSX.WorkSheet = wb.Sheets[wsnameC];
      this.dataCostumer = (XLSX.utils.sheet_to_json(wsC, { header: 1 }));

      // ////console.log('Data',this.data);
      // ////console.log('Costumer',this.dataCostumer);
      this.convertirJson()
      this.log= false;
    };

    reader.readAsBinaryString(target.files[0]);

  }

  progreso = 0
  authSiigo(tag:string){
    this.progreso = 1;
    this.newDataUp =  this._socketService.listen('UpSiigo').subscribe((data:any)=>{
      // ////console.log(data);
      this.progreso = (data.i / data.length)*100
      // ////console.log(this.progreso)
    })


    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey
    }

    this._siigoService.sendInvoicesPeriodo(credenciales, tag).subscribe(
      res => {
        // ////console.log(res)
      },err=>{
        // ////console.log(err.status)
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
    // ////console.log(JSON.stringify(this.registros))
    this._socketService.emit('dataUpNow', JSON.stringify(this.registros))
  }


  tag:string = '';
  saveInfoCompleto(registros: any){
    this.log= true;
    this._infoServce.agregarInfo(registros, this.tag).subscribe(
      res =>{
        let dato = res
         let data = {titulo: 'Confirmaciòn', info:'Se Registraron ' + res.insertedCount + ' de ' + registros.length, type: 'Confirm', icon:'done_all'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
          
            dialogRef.afterClosed().subscribe(result => {
              // this.getfacturacionSiigo();    
              // this.registros = [];
              this.data = [];
              this.files2 = [];
              this.log= false;
              // this.tag = '';
          })
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
              // ////console.log(res)
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

    let keysC = Object.values(this.dataCostumer[0])
    for(var i = 1;i < this.dataCostumer.length; i++){
      let arr = this.dataCostumer[i];
      let par = Object.values(arr);
      let reg = [];
      for (let i = 0; i < keysC.length; i++) {
        let obje = [keysC[i], par[i] || '' ]
        reg.push(obje)
      }
      this.registrosCostumer.push(Object.fromEntries(reg))
    }
    
    for(var i = 0;i < this.registros.length; i++){

      let pos = this.registrosCostumer.map(function(e: { DOC_N: any; }) { return e.DOC_N; }).indexOf(this.registros[i].Folio);

      if(pos != -1){
        this.registros[i].Costumer = this.registrosCostumer[pos]
      }


      let fecha =  this.registros[i].Fecha;
      let split = fecha.split("/");
      // // ////console.log(split)
      this.registros[i].Importe = Number(this.registros[i].Importe)
      this.registros[i].Estado = 'Activa';
      
  
      this.registros[i].Siigo = [];
      this.registros[i].TRM = this.trm;
      this.registros[i].COP = Math.round(this.trm * this.registros[i].Importe);
      ////console.log(this.registros[i].Costo_de_v)
      this.registros[i].Costo_de_v =  this.registros[i].Costo_de_v.replace(/,/g, '')
      this.registros[i].Costo_de_v = Number(this.registros[i].Costo_de_v)
      // ////console.log(this.registros[i])
      
      ////console.log(this.registros[i])

      if(parseInt(split[0]) <= 9){
        this.registros[i].Day = '0'+ split[0];
        // ////console.log( this.registros[i].Day)
      }else{
        this.registros[i].Day = split[0];
        // ////console.log( this.registros[i].Day)
      }
      this.registros[i].Month = split[1];
      this.registros[i].Year = '20'+split[2];
      this.registros[i].Detalle = 'FAC '+this.registros[i].Folio + ' ' + this.registros[i].Descripcion_1 + ' ' +this.registros[i].Month + ' CANT: ' +this.registros[i].Cantidad + ' TRM: '+this.registros[i].TRM + ' USD: '+this.registros[i].Importe ;
      
    }
    this.log= false;
   
    // console.log(this.itemsContable)
    let lotes = 200
    // console.log(lotes)
  
    this.chunckArrayInGroups(this.registros, lotes)
    // this.lote = []
    // this.lotesCmprobantes = []
    // for (let i = 0; i < this.registros.length; i++) {
    //   let pedazo = this.registros[i];
    //   if(this.lote.length << 201){
    //     this.lote.push(pedazo)
    //     console.log(this.lote)
    //   }else{
    //     this.lotesCmprobantes.push(this.lote)
    //     this.lote = []
    //     this.lote.push(pedazo)
    //   }
    //   // this.lotesCmprobantes.push(pedazo);
    // }
    
 

  }

   chunckArrayInGroups(arr:any[], size:number) {
    var chunk = [], i; // declara array vacio e indice de for
    for (i = 0; i <= arr.length; i+= size) // loop que recorre el array 
      chunk.push(arr.slice(i, i + size)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador 
      console.log(chunk)
      return this.lotesCmprobantes = chunk;
   
  }

  generarRegistros(registros: any[]){
    // console.log( registros)
    this.itemsContable =[]
    this.itemsFacturaVentas=[]
    for(var i = 0;i < registros.length; i++){
      let pos2 = this.cuentas.map(function(e: { cod: any; }) { return e.cod; }).indexOf(registros[i].Clasi);
      console.log(pos2)
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
            name:registros[i].Detalle,
            quantity:0,
            description:registros[i].Detalle,
            value:registros[i].COP,
          },
          value:registros[i].COP,
          description:registros[i].Detalle,
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
            name:registros[i].Detalle,
            quantity:0,
            description:registros[i].Detalle,
            value:registros[i].COP,
          },  
          value:registros[i].COP,
          description:registros[i].Detalle,
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

    console.log(credenciales)
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
        this._siigoService.saveComprobantesSiigo(credencialesVentas).subscribe(
          resp=>{
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
        let data = {titulo: 'Error', info:err.error.message, type: 'Confirm', icon:'error'}
  
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
      
        dialogRef.afterClosed().subscribe(result => {

        })
        console.log(err)
      }
    )
  }

  procesarInformacion(){
    this.lotesCmprobantes.forEach((element: any[]) => {
      this.generarRegistros(element)
    });
  }



}
