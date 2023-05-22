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
        .then((data:any) =>  console.log(this.trm =  data.valor))
        .catch((error:any) => console.log(error));

        this.pOperacion=_userService.getPredetermidaOperacion();
        console.log(this.pOperacion)
    }

  ngOnInit(): void {

    this.date = new Date();
    this.getConfig();
    this.getNotasVentaUser();
    // this._mongoService.main();
  }

  nuevaNota(){
    this.fadeDiv='detalle';
    this.notaVenta = new NotaVenta()
  }

  listado(){
    this.fadeDiv='listado';
    this.notaVenta = new NotaVenta()
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


  getNotasVentaUser(){
    this._infoService.getNotasVentaUser(this.identity._id).subscribe(
      res=>{
        this.notasVentas = res;
        this.fadeDiv='listado';
        this.notaVenta = new NotaVenta()
      }
    )
  }

  pasNota(item:any){
    console.log(item)
    this.notaVenta=item
    this.fadeDiv='detalle';
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialogClientes(){
    let dialogRef = this.dialog.open(DialogClienteDetail,{
      data: {info:' hola'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.notaVenta.cliente = result
        console.log( this.notaVenta)
      }
    })

  }

  openDialogMediosPagos(){
    let dialogRef = this.dialog.open(DialogMediosPagoDetail,{
      data: {info:' hola'}
    });
    dialogRef.afterClosed().subscribe(result => {
    
    })

  }

  search=""
  getProducto(item:string){
    this._infoService.getProducto(item).subscribe(
      res=>{
        console.log(res)
        if(res.length != 0){
          res[0].cantidad = 1
          this.notaVenta.productos.unshift(res[0])
          this.totalizar();
          this.search=""
        }
      }
    )
  }

  totalizar(){
    this.notaVenta.total = 0
    for (let i = 0; i < this.notaVenta.productos.length; i++) {
      const element = this.notaVenta.productos[i];
      this.notaVenta.total = this.notaVenta.total + (element.RETAIL * element.cantidad)
      
    }
  }


  saveNotaVenta(){
    this.notaVenta.operacion = this.pOperacion._id;
    this.notaVenta.usuario= this.identity;
    this.notaVenta.trm = this.trm;

    console.log(this.notaVenta)
    this._infoService.agregarNotaVenta(this.notaVenta).subscribe(
      res=>{
        console.log(res)
        this.notaVenta = new NotaVenta();
        this.printNotaVenta()
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

  
}
