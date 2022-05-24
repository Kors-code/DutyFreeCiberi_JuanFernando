import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoService } from '../../services/info.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { SocketIOService } from '../../services/socketIo.service';
import { SiigoService } from 'src/app/services/siigo.service';
import { Config } from 'src/app/models/config';

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.component.html',
  styleUrls: ['./data-base.component.css']
})

export class DataBaseComponent implements OnInit {

  documentos:any = [];
  collections:any = [];
  headers:any;
  key:any;
  search:any
  paginacion:any;
  log:boolean = false;
  config:any;
  displayedColumns: string[] = ['folio', 'fecha', 'vendedor','pdf' ,'siigo', 'facsiigo','importe', 'trm', 'cop', 'ver'];
  constructor(public _infoService:InfoService,  public _socketService:SocketIOService,
    public _siigoService:SiigoService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
      this.config = new Config();
     }

  ngOnInit(): void {
    this.getConfig();
    this.getCollections();
  }

  getConfig(){
    this._infoService.getConfig().subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          // localStorage.setItem('categ',JSON.stringify(this.config.categorias))

          ////console.log(this.config)
        }
       
      }
    )
  }



  getCollections(){
    this._infoService.getCollections().subscribe(
      res=>{
        this.collections = res
        ////console.log(res)
      }
    )
  }

 
  subir=-1
  totalCop=0
  totalUsd=0
  getDataCollections(tag:string){
    this.log = true;
    this.key = tag;
    this._infoService.getDataCollections(tag).subscribe(
      res=>{
        // console.log(res)
        
        this.documentos = res;
        this.headers= Object.keys(this.documentos[0])
        this.subir = this.documentos.map(function(e: { Estado: any; }) { return e.Estado; }).indexOf('Siigo');
        // console.log(this.subir)
        this.progreso = 0
        this.totalCop=0
        this.totalUsd=0
        this.documentos.forEach((element: { COP: number; Importe: number; }) => {
          this.totalCop= this.totalCop + element.COP
          this.totalUsd= this.totalUsd + element.Importe
        });

        if(this.subir != -1){
          // this.authSiigo(this.key)
        }
        this.log = false;
      }
    )
  }

  passDataCollections(tag:string){
    this.key = tag;
    this.getHeadersCollections(this.key);
  }

  getHeadersCollections(tag:string){
    this._infoService.getHeadersCollections(tag).subscribe(
      res =>{
        this.headers = res
        ////console.log(res)
      }
    )
  }

  campo = "";
  getRegistroCollections(doc:string){
    this.campo = doc;
    ////console.log(doc)


  }

  public getRegistros(pg:number){
    ////console.log(pg)
    let data = {
      options: {
        page: pg,
        limit: 30,
        sort:{
            created_at: -1
        }
      },
    }
    this._infoService.getRegistros(data).subscribe(
      res =>{
        ////console.log(res)
        this.documentos = res.docs;
        this.headers= Object.keys(this.documentos[0].info)
        ////console.log(this.documentos);
        this.paginacion= res;
        ////console.log(this.paginacion)
      }
    )
  }



  passRegistro(item:any){
    let registro = {reg:item, coll:this.key} 
    let dialogRef = this.dialog.open(DialogDataJson,{
      data: registro
    
    });

    dialogRef.afterClosed().subscribe(result => {

      //console.log(result)
      if(result == item){
        //console.log('igual')
      }else{
        //console.log('cambio')
        this.getDataCollections(this.key)
      }
      item = result

    })
    // ////console.log(event)
  }


  buscarRegistro(){
    let registro = [[this.campo, this.search]];
    ////console.log(registro)
    let obj = Object.fromEntries(registro)
    ////console.log(obj)

    this._infoService.getDataCollectionsKey(obj, this.key).subscribe(
      res=>{
        this.documentos = res;
        ////console.log(res)
      }
    )
 
  }

  previus(item:any){

  }

  next(item:any){

  }

  newDataUp:any;
  progreso = 0
  authSiigo(tag:string){
    this.progreso = 1;
    this.newDataUp =  this._socketService.listen('UpSiigo').subscribe((data:any)=>{
      ////console.log(data);
      this.progreso = (data.i / data.length)*100
      ////console.log(this.progreso)
    })
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey
    }
    ////console.log(credenciales)
    this._siigoService.sendInvoicesPeriodo(credenciales, tag).subscribe(
      res => {
        ////console.log(res)
      },err=>{
        ////console.log(err.status)
        if(err.status == 200){
          this.getDataCollections(this.key)
          // let data = {titulo: 'Confirmaciòn', info:err.error.text, type: 'Confirm', icon:'done_all'}
  
          // let dialogRef = this.dialog.open(DialogConfirm,{
          //   data: data
          // });
        
          // dialogRef.afterClosed().subscribe(result => {
          //   this.getDataCollections(this.key)
          // })
        }
      }
    )
  }



}


@Component({
  selector: 'app-data-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./data-base.component.css']
})
export class DialogDataJson {
  motivos:any = [];
  keys:any = [];
  values:any = [];
  info:any;
  public editorOptions!: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;

  constructor(
    public _infoService:InfoService,
    public dialogRef: MatDialogRef<DialogDataJson>,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      ////console.log(data)
      this.editorOptions = new JsonEditorOptions()
      this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

      this.keys = Object.keys(data.reg)
      this.values = Object.values(data.reg)
      this.info = data.reg
      // ////console.log(this.keys)
     }

  onNoClick(): void {
    
  }

  cancelar(){
    this.dialogRef.close(this.info);
  }
  
  confirmar(){
    this.dialogRef.close('ok');
  }

  confirmarDelete(motivos:any){
    this.dialogRef.close(motivos);
  }

  doc:any
  getData(event:Event){
    this.doc = event;
    //console.log(this.doc)
  }

  UpdateRegistro(){
    //console.log(this.doc);
    if(this.doc){
      this.info = this.doc
    }
    this._infoService.updateRegistroVendedor(this.info, this.data.coll).subscribe(
      res=>{
        // this.doc = res
        //console.log(res)
        let data: Object
        data = {titulo: 'Exito', info:'Se Actualizo la Informacion Correctamente', icon:'done_all' }

        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
  
        });  
        dialogRef.afterClosed().subscribe(result => {


        })
        ////console.log(res)
      }
    )
    
  }

  deleteRegistro(){
    ////console.log(this.doc);
    this._infoService.deleteRegistro(this.info._id, this.data.coll).subscribe(
      res=>{
        let data: Object
        data = {titulo: 'Exito', info:'Se elimino la Informacion Correctamente', icon:'done_all' }

        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        
        });
  
        dialogRef.afterClosed().subscribe(result => {

          // this.loading  = false;
        })
        ////console.log(res)
      }
    )
    
  }

}
