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
import { Comprobante, Config, ItenmComprobanteSiigo, TerceroSiigo } from 'src/app/models/config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Operacion } from 'src/app/models/operacion';

interface Articulo{
  
}
@Component({
  selector: 'app-siigComprobante',
  templateUrl: './siigo-comprobante.component.html',
  styleUrls: ['./siigo-comprobante.component.css']
})
export class SiigoComprobantesComponent implements OnInit {
  newDataUp:any;
  config:any;
  date:any;
  obs:any;
  displayedColumns: string[] = ['folio', 'unds', 'cop', 'detail'];
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  pOperacion:Operacion
  comprobante:Comprobante
  constructor( 
              public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
              public _infoServce:InfoService,
              public _socketService:SocketIOService,
              // public _mongoService: MongoDbService
              public _siigoService:SiigoService,
              private _snackBar: MatSnackBar,
              _userService:UserService
    ) { 
      this.config = new Config();
      this.comprobante = new Comprobante()
      // this.trmApi =  new TrmApi("aEOKmLbbPROhCr6iDiieAGCqt");
      // this.trmApi
      //   .latest()
      //   .then((data:any) =>  //console.log(this.trm =  data.valor))
      //   .catch((error:any) =>  //console.log(error));

        this.pOperacion=_userService.getPredetermidaOperacion();
    }

  ngOnInit(): void {
    this.getConfig()
    this. getComprobantes()
   
    // this._mongoService.main();
  }

  listadoComprobantes:any[]=[]
  getComprobantes(){
    this._siigoService.getDataComprobantes().subscribe(
      res=>{
        // console.log(res)
        this.listadoComprobantes= res;
      });
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
		

  getListadoSiigo(list:string){
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey
    }
    this._siigoService.ListadosSiigo(credenciales,list).subscribe(
      res=>{console.log(res)}
    )
  }

  getConfig(){
    this._infoServce.getConfig(this.pOperacion._id).subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          localStorage.setItem('categ',JSON.stringify(this.config.categorias))
          // this.getListadoSiigo('cost-centers')
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
    this._infoServce.agregarInfo(registros, 'RC_' + this.tag).subscribe(
      res =>{
        let dato = res
        this.procesado++
  
        if(this.procesado <= this.lotesCmprobantes.length){
          if(this.procesado << this.lotesCmprobantes.length){
            this.generarRegistros()
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
    // this.chunckArrayInGroups(this.registros, lotes)
   
  }

   chunckArrayInGroups(arr:any[], size:number) {
    var chunk = [], i; // declara array vacio e indice de for
    for (i = 0; i <= arr.length; i+= size) // loop que recorre el array 
      chunk.push(arr.slice(i, i + size)); // push al array el tramo desde el indice del loop hasta el valor size + el indicador 
      // ////console.log(chunk)
      return this.lotesCmprobantes = chunk;
  }

  generarRegistros(){
    console.log( this.registros)
    this.log = true
    this.itemsContable =[]
    this.itemsFacturaVentas=[]
    this.procesado=0
    for(var i = 0;i < this.registros.length; i++){
    

          let Comisiones ={
            account: {
              code: '53051501',
              movement: "Debit"
            },
            customer: {
              identification: this.registros[i]['tercero'],
              branch_office: 0
            },
            
            description: "RC VTAS CTG PAGO TARJETA DAVIVIENDA  " + this.date,
            cost_center: this.registros[i]['centro_costo'],
            value: parseInt(this.registros[i]['Valor Comisión']) 
          }

          this.itemsContable.push(Comisiones)

          let Retefuente ={
            account: {
              code: '13551508',
              movement: "Debit"
            },
            customer: {
              identification: this.registros[i]['tercero'],
              branch_office: 0
            },
      
            tax:{
              id:'18171'
            },
            description: "RC VTAS CTG PAGO TARJETA DAVIVIENDA RETEFUENTE " + this.date,
            cost_center: this.registros[i]['centro_costo'],
            value: parseInt(this.registros[i]['Ret. Fuente']) 
          }
    
          this.itemsContable.push(Retefuente)

        let dtaComprobanteCaja = {
              account: {
                code: this.registros[i]['cuenta'],
                movement: "Debit"
              },
              customer: {
                identification: this.registros[i]['tercero'],
                branch_office: 0
              },
 
              description: "RC VTAS PAGO TARJETA DAVIVIENDA " + this.date,
              cost_center: this.registros[i]['centro_costo'],
              value: parseInt(this.registros[i]['Valor Neto']) 
        }

        this.itemsContable.push(dtaComprobanteCaja) 

        let VentaMostrador = {
          account: {
            code: '13050501',
            movement: "Credit"
          },
          customer: {
            identification: '222222222',
            branch_office: 0
          },     
          due:{
            date:this.date,
            prefix:'RC',
            consecutive:i+1,
            quote:1
          },
          description: "RC VTAS PAGO TARJETA DAVIVIENDA " + this.date,
          cost_center: this.registros[i]['centro_costo'],
          value: parseInt(this.registros[i]['Valor Consumo']) 
    }

    this.itemsContable.push(VentaMostrador) 
    
    }

    console.log(this.itemsContable.length)
  if(this.itemsContable.length <= 400 ){

    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey,
      data: this.itemsContable,
      date:this.date,
      iddoc:34002,
      _id:this.pOperacion._id,
      obs: this.obs
    }
    console.log(credenciales);
    this._siigoService.saveComprobantesSiigo(credenciales).subscribe(
      res=>{
        console.log(res);
        this._siigoService.agregarInfoComprobante(res).subscribe(
          res=>{
            console.log(res);
            let data = {titulo: 'Exito ', info:'Comprobante Davivienda Generado Correctamente' ,type: 'Confirm', icon:'done_all'}
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
            dialogRef.afterClosed().subscribe(result => {
              window.location.reload();
            })
          }
        )

      },err=>{

        let data = {titulo: 'Error ', info:err.error.message ,type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        })
        console.log(err)
    })

  }else{
    this.lotesCmprobantes = [];
    console.log(this.itemsContable.length);
    this.chunckArrayInGroups(this.itemsContable,400);
    console.log(this.lotesCmprobantes);
      let credenciales={
        user:this.config.siigoUser,
        key:this.config.siigoKey,
        data: this.lotesCmprobantes[0],
        date:this.date,
        iddoc:34002,
        _id:this.pOperacion._id,
        obs: this.obs
      }

      this.saveComprobanteLotes(credenciales)
  }
   
  }

  procesado = 0
  procesarInformacion(){
    this.procesado = 0
    if(this.itau){
      this.openSnackBar('ITAU')
      this.generarRegistrosItaU()
    }else{
      this.openSnackBar('Davivienda')
      this.generarRegistros()
    }
    
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

  fileName = '';
  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {
      console.log(file)
        this.fileName = file.name;

        this.log= true;
    const target : DataTransfer =  <DataTransfer>(event.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      this.convertirJsonComprobante()
      this.log= false;
    };

    reader.readAsBinaryString(target.files[0]);
      
    }
}

convertirJsonComprobante(){
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

      let fecha = this.registros[i]['Fecha Vale'];  
      this.registros[i].Importe = Number(this.registros[i]['Valor Neto'])
   
      let detalle = 'RC VTAS PAGO TARJETA DAVIVIENDA ' + this.registros[i]['Fecha Vale'].toString() ;
     
      if(detalle.length >= 101){
        detalle = detalle.slice(0, 100);
      }
      this.registros[i].Detalle = detalle;
      // console.log(this.config.cuentas)
      let pos2 = this.config.cuentas.map(function(e: { titulo: string; }) { return e.titulo; }).indexOf('DAVIVIENDA');
      // console.log(pos2)
      
      if(pos2 != -1){
        let cuenta:TerceroSiigo = this.config.cuentas[pos2]
        this.registros[i].titulo= cuenta.titulo;
        this.registros[i].cuenta= cuenta.cuenta;
        this.registros[i].tercero= cuenta.id_tercero;
        this.registros[i].centro_costo= cuenta.centro_costos;
    }

    this.log= false;
    // console.log(this.registros)
  }
}

itau=false;
onFileSelectedItau(event:any) {
  const file:File = event.target.files[0];
  this.itau=true;
  if (file) {
    // console.log(file)
      this.fileName = file.name;

      this.log= true;
  const target : DataTransfer =  <DataTransfer>(event.target);
  
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const bstr: string = e.target.result;

    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname : string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    this.convertirJsonComprobanteItau()
    this.log= false;
  };

  reader.readAsBinaryString(target.files[0]);
    
  }
}

convertirJsonComprobanteItau(){
  this.registros=[];
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

      let fecha = this.registros[i]['DIA']+'-'+this.registros[i]['MES']+'-'+new Date().getFullYear();
      // console.log(fecha);
      this.registros[i].fecha = fecha
      
      let detalle = 'RC VTAS PAGO TARJETA ITAU ' + new Date(fecha);
     
      if(detalle.length >= 101){
        detalle = detalle.slice(0, 100);
      }

      this.registros[i].Detalle = detalle;
      // console.log(this.config.cuentas)
      let pos2 = this.config.cuentas.map(function(e: { titulo: string; }) { return e.titulo; }).indexOf('ITAU');
      // console.log(pos2)
      
      if(pos2 != -1){
        let cuenta:TerceroSiigo = this.config.cuentas[pos2]
        this.registros[i].titulo= cuenta.titulo;
        this.registros[i].cuenta= cuenta.cuenta;
        this.registros[i].tercero= cuenta.id_tercero;
        this.registros[i].centro_costo= cuenta.centro_costos;
    }
    this.log= false;
    let lotes = 200;
  }
      console.log(this.registros)
}

async generarRegistrosItaU(){
  console.log('entro')
  console.log( this.registros)
  this.procesado=0
  this.log = true
  this.itemsContable =[]
  this.itemsFacturaVentas=[]
  for(var i = 0;i < this.registros.length; i++){

    if(this.registros[i]['VALOR NETO']){
      // console.log(registros[i]['VLR.COMISION'])
      let dtaComprobanteCaja = {
        account: {
          code: this.registros[i]['cuenta'],
          movement: "Debit"
        },
        customer: {
          identification: this.registros[i]['tercero'],
          branch_office: 0
        },
        description: "RC VTAS PAGO TARJETA ITAU " + this.date + this.registros[i]['NUMERO TARJETA'],
        cost_center: this.registros[i]['centro_costo'],
        value: parseInt(this.registros[i]['VALOR NETO']) 
      } 
  
      this.itemsContable.push(dtaComprobanteCaja)
  
      let Retefuente ={
        account: {
          code: '13551508',
          movement: "Debit"
        },
        customer: {
          identification: this.registros[i]['tercero'],
          branch_office: 0
        },
        tax:{
          id:'18171'
        },
        description: "RC VTAS CTG PAGO TARJETA ITAU RETEFUENTE " + this.date,
        cost_center: this.registros[i]['centro_costo'],
        value: parseInt(this.registros[i]['RETEFUENTE']) 
      }
      this.itemsContable.push(Retefuente)
    
          let Comisiones ={
            account: {
              code: '53051501',
              movement: "Debit"
            },
            customer: {
              identification: this.registros[i]['tercero'],
              branch_office: 0
            },
            
            description: "RC VTAS CTG PAGO TARJETA ITAU  " + this.date,
            cost_center: this.registros[i]['centro_costo'],
            value: parseInt(this.registros[i]['VLR.COMISION']) 
          }
  
        this.itemsContable.push(Comisiones)
  
        let VentaMostrador = {
          account: {
            code: '13050501',
            movement: "Credit"
          },
          customer: {
            identification: '222222222',
            branch_office: 0
          },     
          due:{
            date:this.date,
            prefix:'RC',
            consecutive:i+1,
            quote:1
          },
          description: "RC VTAS PAGO TARJETA ITAU " + this.date,
          cost_center: this.registros[i]['centro_costo'],
          value: parseInt(this.registros[i]['VALOR VENTA']) 
        }
  
      this.itemsContable.push(VentaMostrador) 
    }
  
  }
  console.log(this.itemsContable.length)
  if(this.itemsContable.length <= 400 ){
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey,
      data: this.itemsContable,
      date:this.date,
      iddoc:34002,
      _id:this.pOperacion._id,
      obs: this.obs
    }
    console.log(credenciales);

      this._siigoService.saveComprobantesSiigo(credenciales).subscribe(
      res=>{
        console.log(res);

        this._siigoService.agregarInfoComprobante(res).subscribe(
          res=>{
            console.log(res);
            let data = {titulo: 'Exito ', info:'Comprobante Generado Correctamente' ,type: 'Confirm', icon:'done_all'}
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
            dialogRef.afterClosed().subscribe(result => {
              window.location.reload();
            })
    
          }
        )
      },err=>{
        console.log(err)
        let data = {titulo: 'Error ', info:err.error.message ,type: 'Confirm', icon:'error'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        })

        console.log(err)
      })
  }else{
    this.lotesCmprobantes = [];
    console.log(this.itemsContable.length);
    this.chunckArrayInGroups(this.itemsContable,400);
    console.log(this.lotesCmprobantes);
   
      let credenciales={
        user:this.config.siigoUser,
        key:this.config.siigoKey,
        data: this.lotesCmprobantes[0],
        date:this.date,
        iddoc:34002,
        _id:this.pOperacion._id,
        obs: this.obs
      }

      this.saveComprobanteLotes(credenciales)
    
  }
}



saveComprobanteLotes(credenciales:any){
  console.log(credenciales);
  this._siigoService.saveComprobantesSiigo(credenciales).subscribe(
  res=>{
   console.log(res);
   this._siigoService.agregarInfoComprobante(res).subscribe(
     res=>{
       console.log(res);
       this.procesado++
       if( this.procesado == this.lotesCmprobantes.length){
        let data = {titulo: 'Exito ', info:'Comprobante Generado Correctamente' ,type: 'Confirm', icon:'done_all'}
        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        })
       }else{
        if(this.lotesCmprobantes[this.procesado].length != 0){
          let credenciales={
            user:this.config.siigoUser,
            key:this.config.siigoKey,
            data: this.lotesCmprobantes[this.procesado],
            date:this.date,
            iddoc:34002,
            _id:this.pOperacion._id,
            obs: this.obs
          }
          this.saveComprobanteLotes(credenciales)
        }else{
          let data = {titulo: 'Exito ', info:'Comprobante Generado Correctamente' ,type: 'Confirm', icon:'done_all'}
          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          })
        }
      
       }
      
     }
   )
 },err=>{
   console.log(err)
   let data = {titulo: 'Error ', info:err.error.message ,type: 'Confirm', icon:'error'}
   let dialogRef = this.dialog.open(DialogConfirm,{
     data: data
   });
   dialogRef.afterClosed().subscribe(result => {
     window.location.reload();
   })

   console.log(err)
})
}



cuenta:any
addCuenta(cuenta:TerceroSiigo){
  console.log(cuenta)
  let item = new ItenmComprobanteSiigo();
  item.account = { code:cuenta.cuenta, movement:cuenta.descripcion}
  item.customer = {
    identification: cuenta.id_tercero,
    branch_office: 0
  }

  if(!cuenta.due){
      item.due = undefined;
  }else{
    let due = {
      consecutive:this.comprobante.data.length +1,
      date:this.comprobante.date,
      prefix:"RC",
      quote:1
    }
    item.due= due 
  }

  item.cost_center = cuenta.centro_costos;
  this.comprobante.data.unshift(item);

  console.log(this.comprobante)
}

addCuentaBorrador(){
  let item = new ItenmComprobanteSiigo();
  this.comprobante.data.unshift(item);
}


credit = 0;
debit = 0;
totalizarComprobante(){
  this.credit = 0;
  this.debit = 0;
    for (let i  = 0; i  < this.comprobante.data.length; i ++) {
      const element = this.comprobante.data[i ];
      if(element.account.movement == 'Credit'){
        this.credit =  this.credit + element.value;
      }if(element.account.movement == 'Debit'){
        this.debit = this.debit + element.value;
      }
    }
}


saveComprobante(){
  this.log= true;
  this.comprobante.user=this.config.siigoUser,
  this.comprobante.key =this.config.siigoKey,
  this.comprobante._id = this.pOperacion._id;
  this.comprobante._idOperacionstring = this.pOperacion._id;

  console.log(this.comprobante)
  this._siigoService.saveComprobantesSiigo(this.comprobante).subscribe(
    res=>{
      this.log= false;
      console.log(res);
      this._siigoService.agregarInfoComprobante(res).subscribe(
        res=>{
          console.log(res);
          let data = {titulo: 'Exito ', info:'Comprobante Generado Correctamente' ,type: 'Confirm', icon:'done_all'}
          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });
          dialogRef.afterClosed().subscribe(result => {
            window.location.reload();
          })
  
        })

    },err=>{
      console.log(err)
      this.log= false;
      let data = {titulo: 'Error ', info:err.error.message ,type: 'Confirm', icon:'done_all'}
      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      });
      console.log(err)
  })}

}

