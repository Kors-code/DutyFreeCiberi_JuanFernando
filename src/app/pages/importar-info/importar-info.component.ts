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
      ////console.log(this.trm);

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
  saveInfoCompleto(){
    this.log= true;
    this._infoServce.agregarInfo(this.registros, this.tag).subscribe(
      res =>{
        let dato = res
         let data = {titulo: 'Confirmaciòn', info:'Se Registraron ' + res.insertedCount + ' de ' + this.registros.length, type: 'Confirm', icon:'done_all'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });
          
            dialogRef.afterClosed().subscribe(result => {
              this.getfacturacionSiigo();    
              this.registros = [];
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
    // ////console.log(this.registros)
  }

}
