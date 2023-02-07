import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfoService } from '../../services/info.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { SocketIOService } from '../../services/socketIo.service';
import { SiigoService } from 'src/app/services/siigo.service';
import { Config } from 'src/app/models/config';
import { Operacion } from 'src/app/models/operacion';
import { UserService } from 'src/app/services/user.service';

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
  check= false;
  displayedColumns: string[] = ['folio', 'fecha', 'vendedor','siigo', 'facsiigo','importe', 'trm', 'cop', 'ver'];
  pOperacion:Operacion
  constructor(public _infoService:InfoService,  public _socketService:SocketIOService,
    public _siigoService:SiigoService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
    _userService:UserService) {
      this.config = new Config();
      this.pOperacion=_userService.getPredetermidaOperacion();
     }

  ngOnInit(): void {
    this.getConfig();
    this.getCollections();
  }

  
  getConfig(){
    this._infoService.getConfig(this.pOperacion._id).subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          // localStorage.setItem('categ',JSON.stringify(this.config.categorias))

          ////// console.log(this.config)
        }
       
      }
    )
  }



  getCollections(){
    this._infoService.getCollections().subscribe(
      res=>{
        this.collections = res
        this.collections.reverse();
      }
    )
  }

 
  subir=-1
  totalCop=0
  totalUsd=0
  getDataCollections(tag:string){
    this.log = true;
    this.key = tag;
    this._infoService.getDataCollectionsPaginate(tag, 0).subscribe(
      res=>{
        console.log(res)
        this.documentos = res;
        this.headers= Object.keys(this.documentos[0])
        this.subir = this.documentos.map(function(e: { Estado: any; }) { return e.Estado; }).indexOf('Siigo');
        // // console.log(this.subir)
        this.progreso = 0
        this.totalCop=0
        this.totalUsd=0
        this.documentos.forEach((element: { COP: number; Importe: number; check: boolean; }) => {
          this.totalCop= this.totalCop + element.COP
          this.totalUsd= this.totalUsd + element.Importe
          element.check = false
        });

        if(this.subir != -1){
          // this.authSiigo(this.key)
        }
        this.log = false;
      }
    )
  }
  

  pagination(event: any){
    console.log(event)
    this._infoService.getDataCollectionsPaginate(this.key, event.pageIndex).subscribe(
      res=>{
        console.log(res)
        this.documentos = res;
      })
  }

  passDataCollections(tag:string){
    this.key = tag;
    this.getHeadersCollections(this.key);
  }

  getHeadersCollections(tag:string){
    this._infoService.getHeadersCollections(tag).subscribe(
      res =>{
        this.headers = res
        ////// console.log(res)
      }
    )
  }

  campo = "";
  getRegistroCollections(doc:string){
    this.campo = doc;
    ////// console.log(doc)


  }

  public getRegistros(pg:number){
    ////// console.log(pg)
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
        ////// console.log(res)
        this.documentos = res.docs;
        this.headers= Object.keys(this.documentos[0].info)
        ////// console.log(this.documentos);
        this.paginacion= res;
        ////// console.log(this.paginacion)
      }
    )
  }

  checkIguales(event: any){
    this.documentos.forEach((element: { check: any; }) => {
      element.check = event.checked
    })
  }


  passRegistro(item:any){
    let registro = {reg:item, coll:this.key} 
    let dialogRef = this.dialog.open(DialogDataJson,{
      data: registro
    
    });

    dialogRef.afterClosed().subscribe(result => {

      //// console.log(result)
      if(result == item){
        //// console.log('igual')
      }else{
        //// console.log('cambio')
        this.getDataCollections(this.key)
      }
      item = result

    })
    // ////// console.log(event)
  }


  buscarRegistro(){
    let registro = [[this.campo, this.search]];
    ////// console.log(registro)
    let obj = Object.fromEntries(registro)
    ////// console.log(obj)

    this._infoService.getDataCollectionsKey(obj, this.key).subscribe(
      res=>{
        this.documentos = res;
        ////// console.log(res)
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
      ////// console.log(data);
      this.progreso = (data.i / data.length)*100
      ////// console.log(this.progreso)
    })
    let credenciales={
      user:this.config.siigoUser,
      key:this.config.siigoKey
    }
    this._siigoService.sendInvoicesPeriodo(credenciales, tag).subscribe(
      res => {
        ////// console.log(res)
      },err=>{
        ////// console.log(err.status)
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

  pdfs(element:any){
    // console.log(element)
    this.log = true;
    this._infoService.generarPDF(element, this.key).subscribe(
      res => {
        // console.log(res)
        this.log = true;
        let data: Object
        data = {titulo: 'PDF Creado Correctamente', info:'Se realizara la consulta para validar cambios ', icon:'done_all' }

        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
        });
        this.getDataCollections(this.key)
      },err=>{
        this.getDataCollections(this.key)
      }
    )
  }

  downloadFile(datos: any, title:string) {

      let  json = JSON.stringify(datos)
      let data = JSON.parse(json)
      const headerCostumer = Object.keys(data[0]);

      let pos = headerCostumer.map(function(e) { return e; }).indexOf('Costumer');
      // console.log(pos)
      if(pos != -1 && pos != headerCostumer.length-1){
        data.forEach((element: any) => {
          element.Costumer = element.Costumer.NOMBRE_DE_PAX
          if(element.Pdf.length !=0){
            element.Pdf = element.Pdf[0]
           }else{
            element.Pdf = 'No generado'
           }
           if(element.Siigo.length !=0){
            element.Siigo =  element.Siigo[0].document.id
          }else{
            element.Siigo = 'No generado'
           }
          
          // element.splice(pos, 1)
          // [, element[element[element.length- 1]]] = [element[element[element.length- 1]], element[pos]]
        });      
      }

      // console.log(data)



    const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
  
    var a = document.createElement('a');
    var blob = new Blob([csvArray], {type: 'text/csv' }),
    url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = title+this.key+".csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
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
  config:any;
  pOperacion:Operacion
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;
  newEmpleado:any
 
  constructor(
    public _infoService:InfoService,
    public dialogRef: MatDialogRef<DialogDataJson>,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
    @Inject(MAT_DIALOG_DATA) public data: any,
    _userService:UserService) {
      this.pOperacion=_userService.getPredetermidaOperacion();
      ////// console.log(data)
      this.editorOptions = new JsonEditorOptions()
      this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

      this.keys = Object.keys(data.reg)
      this.values = Object.values(data.reg)
      this.info = data.reg
      this.getConfig()
      // ////// console.log(this.keys)
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
    //// console.log(this.doc)
  }

  UpdateRegistro(){
    //// console.log(this.doc);
    if(this.doc){
      this.info = this.doc
    }
    this._infoService.updateRegistroVendedor(this.info, this.data.coll).subscribe(
      res=>{
        // this.doc = res
        //// console.log(res)
        let data: Object
        data = {titulo: 'Exito', info:'Se Actualizo la Informacion Correctamente', icon:'done_all' }

        let dialogRef = this.dialog.open(DialogConfirm,{
          data: data
  
        });  
        dialogRef.afterClosed().subscribe(result => {


        })
        ////// console.log(res)
      }
    )
    
  }

  deleteRegistro(){
    ////// console.log(this.doc);
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
        ////// console.log(res)
      }
    )
    
  }

  getConfig(){
    this._infoService.getConfig(this.pOperacion._id).subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
        }
      })
  }

  addEmpleado(){
    // // console.log(this.info)
    // // console.log(this.newEmpleado)
    this.info.Nombre_del_vend = this.newEmpleado.name
    this.info.Codi = Number(this.newEmpleado.codigo)
  }

}
