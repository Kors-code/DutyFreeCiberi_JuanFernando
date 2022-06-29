import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Presupuesto, Categorias, Categoria } from '../../models/presupuesto';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { InfoService } from 'src/app/services/info.service';
import * as XLSX from 'xlsx';
import TrmApi from "trm-api";
import { Config, Empleado } from 'src/app/models/config';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  public editorOptions!: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;
  presupuesto:Presupuesto
  trm:any;
  trmApi:any;
  config:any;
  selected = new FormControl(0);
  Roles = ['Ventas', 'Skin', 'Lider', 'Gerente Ventas', 'Gerente']
  constructor(public _infoService:InfoService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
    this.config = new Config()
    this.presupuesto = new Presupuesto()
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
    console.log(this.presupuesto)

    this.trmApi =  new TrmApi("aEOKmLbbPROhCr6iDiieAGCqt");
    this.trmApi
      .latest()
      .then((data:any) =>  console.log(this.trm =  data.valor))
      .catch((error:any) => console.log(error));
    //console.log(this.trm);

   }

  ngOnInit(): void {
    this.getConfig()
    this.getPresupuestos()
  }


  getConfig(){
    this._infoService.getConfig().subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          localStorage.setItem('categ',JSON.stringify(this.config.categorias))
          localStorage.setItem('colaboradores',JSON.stringify(this.config.empleados))
        }
      })
  }
  
  pres:any
  getData(event:any){
    this.pres = event
  }

  registerPresupuesto(){
    this.presupuesto._id = undefined;
    this.presupuesto.TRM = this.trm;
    this._infoService.agregarPresupuesto(this.presupuesto).subscribe(
      res=>{
        //////console.log(res)
        this.getPresupuestos()
      }
    )
  }

  presupuestos:Presupuesto[]=[];
  getPresupuestos(){
    this._infoService.getPresupuestos().subscribe(
      res=>{
        this.presupuestos = res;
        console.log(res)
      }
    )
  }

  updatePresupuesto(){
    //////console.log(this.pres)
    this._infoService.updatePresupuesto(this.presupuesto).subscribe(
      res=>{
        console.log(res)
        if(res){
          let data = {titulo: 'Exito', info:'Se guardaron los cambios en el presupuesto ', type: 'Confirm', icon:'done_all'}
  
          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // this.getfacturacionSiigo()
          })
        }

        this.getPresupuestos()
      }
    )
  }

  deleteRegistro(){

    let data = {titulo: 'Eliminar', info:'Se eliminara el presupuesto no se recuperara mas adelante ', type: 'Cancel_Delete', icon:'stop'}
  
    let dialogRef = this.dialog.open(DialogConfirm,{
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._infoService.deletePresupuesto(this.presupuesto).subscribe(
          res=>{
            console.log(res)
            let data = {titulo: 'Exito', info:'Se Elimino el presupuesto ', type: 'Confirm', icon:'done_all'}
  
            let dialogRef = this.dialog.open(DialogConfirm,{
              data: data
            });

            this.getPresupuestos()
            this.presupuesto = new Presupuesto()

          })
      }
      // this.getfacturacionSiigo()
    })


      
  }

  recaulcular(){
    let data = {titulo: 'Confirmacion', info:'Se recalcula el presupuesto con la cofiguracion actual', type: 'Cancel_Delete', icon:'help_center'}
    let dialogRef = this.dialog.open(DialogConfirm,{
      data: data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
       
        this.presupuesto.presupuesto_dia_cop = this.presupuesto.presupuesto_cop / this.presupuesto.dias;
        this.presupuesto.presupuesto_dia_usd = this.presupuesto.presupuesto_usd / this.presupuesto.dias;
        
        let categorias:any = localStorage.getItem('categ');
        this.presupuesto.categorias = JSON.parse(categorias)
    
        this.presupuesto.categorias.forEach(element => {
          element.presupuesto_cop = this.presupuesto.presupuesto_cop * (element.participacion/100)
          element.presupuesto_usd = this.presupuesto.presupuesto_usd * (element.participacion/100)
          element.presupuesto_dia_usd = this.presupuesto.presupuesto_dia_usd * (element.participacion/100)
          element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)
        });
      
        this.presupuesto.tiendas = this.config.tiendas;  
        for(var i = 0;i < this.presupuesto.tiendas.length; i++){
          this.presupuesto.tiendas[i].presupuesto_usd = (this.presupuesto.tiendas[i].part/100) * this.presupuesto.presupuesto_usd 
          this.presupuesto.tiendas[i].ptto = JSON.parse(categorias)
          this.presupuesto.tiendas[i].ptto.forEach((element: { presupuesto_cop: number; participacion: number; presupuesto_usd: number; presupuesto_dia_usd: number; presupuesto_dia_cop: number; ventas_cop: number;}) => {
            element.presupuesto_cop = 0
            element.ventas_cop = 0
            element.presupuesto_usd =  this.presupuesto.tiendas[i].presupuesto_usd * (element.participacion/100)
            element.presupuesto_dia_usd = this.presupuesto.tiendas[i].presupuesto_usd / this.presupuesto.dias
            // element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)
          });
        }

        this.TotalizarPtoEmpleados()
      }
    })
    

    console.log(this.presupuesto)
  }

  passPresupuesto(item:any){
    console.log(item)
    this.presupuesto = item
    this.trm = item.TRM;
    this.selected.setValue(0);
  }

  cambiarCop(){
    this.presupuesto.presupuesto_cop = this.presupuesto.presupuesto_usd * Math.round(this.trm);
  }


  dias = 0;
  TotalizarPtoEmpleados(){
    this.presupuesto.capacidadVentas = 0;
    this.presupuesto.presupuesto_vendedores = 0
   
    for (let i = 0; i < this.presupuesto.vendedores.length; i++){
      let vendedor = this.presupuesto.vendedores[i];
      let categ = JSON.stringify(this.presupuesto.categorias)
      vendedor.categorias = JSON.parse(categ);
      // vendedor.Dias = dias;
      ////console.log(vendedor);
       vendedor.USD =  Math.round((this.presupuesto.presupuesto_usd / this.presupuesto.capacidadVentasEsperada) * vendedor.Dias)  
      ////console.log(this.presupuesto.vendedores[i].USD)
      for (let d = 0; d < this.presupuesto.vendedores[i].categorias.length; d++) {
        ////console.log(vendedor.USD)
        ////console.log(vendedor.USD * (this.presupuesto.vendedores[i].categorias[d].participacion/100))
        // var element = this.presupuesto.vendedores[i].categorias[d];
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_cop= 0;
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_dia_cop= 0;
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_dia_usd= 0;
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_usd = 0;
        this.presupuesto.vendedores[i].categorias[d].presupuesto_usd = vendedor.USD * (this.presupuesto.vendedores[i].categorias[d].participacion/100);
        this.presupuesto.vendedores[i].categorias[d].presupuesto_dia_usd = this.presupuesto.vendedores[i].categorias[d].presupuesto_usd / vendedor.Dias;
        ////console.log(this.presupuesto.vendedores[i].categorias[d])
      }
    }

    for (let i = 0; i < this.presupuesto.vendedores.length; i++){
      this.presupuesto.capacidadVentas =   this.presupuesto.capacidadVentas + this.presupuesto.vendedores[i].Dias;
      this.presupuesto.presupuesto_vendedores =   this.presupuesto.presupuesto_vendedores + this.presupuesto.vendedores[i].USD;
    }

    this.presupuesto.vendedores.sort(function(a, b){
      return b.USD - a.USD;
    });
   
  }

  TotalizarTienda(){
    let categorias:any = localStorage.getItem('categ');
    // this.presupuesto.tiendas = this.config.tiendas;  
    for(var i = 0;i < this.presupuesto.tiendas.length; i++){
      this.presupuesto.tiendas[i].presupuesto_usd = (this.presupuesto.tiendas[i].part/100) * this.presupuesto.presupuesto_usd 
      this.presupuesto.tiendas[i].ptto = JSON.parse(categorias)
      this.presupuesto.tiendas[i].ptto.forEach((element: { presupuesto_cop: number; participacion: number; presupuesto_usd: number; presupuesto_dia_usd: number; presupuesto_dia_cop: number; }) => {
        // element.presupuesto_cop = this.presupuesto.presupuesto_cop * (element.participacion/100)
        element.presupuesto_usd =  this.presupuesto.tiendas[i].presupuesto_usd * (element.participacion/100)
        element.presupuesto_dia_usd = this.presupuesto.tiendas[i].presupuesto_usd / this.presupuesto.dias
        // element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)
      });
    }
  }



  TotalizarPtoEmpleado(vendedor: any){
    this.presupuesto.capacidadVentas = 0;
    this.presupuesto.presupuesto_vendedores = 0
  
    for (let i = 0; i < this.presupuesto.vendedores.length; i++){
      this.presupuesto.capacidadVentas =   this.presupuesto.capacidadVentas + this.presupuesto.vendedores[i].Dias;
      this.presupuesto.presupuesto_vendedores =   this.presupuesto.presupuesto_vendedores + this.presupuesto.vendedores[i].USD;
    }

      let categ = JSON.stringify(this.presupuesto.categorias)
      vendedor.categorias = JSON.parse(categ);
      // vendedor.Dias = dias;
      ////console.log(vendedor);
      // vendedor.USD =   (this.presupuesto.presupuesto_usd / this.presupuesto.capacidadVentasEsperada) * vendedor.Dias;
      ////console.log(this.presupuesto.vendedores[i].USD)

        vendedor.USD =  Math.round((this.presupuesto.presupuesto_usd / this.presupuesto.capacidadVentasEsperada) * vendedor.Dias)  
      if(vendedor.rol != 'Ventas'){
        vendedor.USD = this.presupuesto.presupuesto_usd;
      }

      for (let d = 0; d < vendedor.categorias.length; d++) {
        ////console.log(vendedor.USD)
        ////console.log(vendedor.USD * (this.presupuesto.vendedores[i].categorias[d].participacion/100))
        // var element = this.presupuesto.vendedores[i].categorias[d];
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_cop= 0;
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_dia_cop= 0;
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_dia_usd= 0;
        // this.presupuesto.vendedores[i].categorias[d].presupuesto_usd = 0;
        vendedor.categorias[d].presupuesto_usd = vendedor.USD * (vendedor.categorias[d].participacion/100);
        vendedor.categorias[d].presupuesto_dia_usd = vendedor.categorias[d].presupuesto_usd / vendedor.Dias;
        ////console.log(this.presupuesto.vendedores[i].categorias[d])
      }
    
    this.presupuesto.vendedores.sort(function(a, b){
      return b.USD - a.USD;
    });
   
    // item.presupuestoUs = this.presupuesto.presupuesto_usd 
  
  }

  nuevoPresupuesto(){
    this.presupuesto = new Presupuesto()
    
  }

  Presupuestar(){
    this.presupuesto.presupuesto_dia_cop = this.presupuesto.presupuesto_cop / this.presupuesto.dias;
    this.presupuesto.presupuesto_dia_usd = this.presupuesto.presupuesto_usd / this.presupuesto.dias;
    
    let categorias:any = localStorage.getItem('categ');
    //////console.log(JSON.parse(categorias))
    this.presupuesto.categorias = JSON.parse(categorias)

    this.presupuesto.categorias.forEach(element => {
      element.presupuesto_cop = this.presupuesto.presupuesto_cop * (element.participacion/100)
      element.presupuesto_usd = this.presupuesto.presupuesto_usd * (element.participacion/100)
      element.presupuesto_dia_usd = this.presupuesto.presupuesto_dia_usd * (element.participacion/100)
      element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)
    });
   
    let colaboradores:any = localStorage.getItem('colaboradores');
    this.presupuesto.vendedores = JSON.parse(colaboradores);

    this.presupuesto.tiendas = this.config.tiendas;  
    for(var i = 0;i < this.presupuesto.tiendas.length; i++){
      this.presupuesto.tiendas[i].presupuesto_usd = (this.presupuesto.tiendas[i].part/100) * this.presupuesto.presupuesto_usd 
      this.presupuesto.tiendas[i].ptto = JSON.parse(categorias)
      this.presupuesto.tiendas[i].ptto.forEach((element: { presupuesto_cop: number; participacion: number; presupuesto_usd: number; presupuesto_dia_usd: number; presupuesto_dia_cop: number; }) => {
        element.presupuesto_cop = 0
        element.presupuesto_usd =  this.presupuesto.tiendas[i].presupuesto_usd * (element.participacion/100)
        element.presupuesto_dia_usd = this.presupuesto.tiendas[i].presupuesto_usd / this.presupuesto.dias
        // element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)
      });
    }

    console.log(this.presupuesto)

  }

  catParticipacion =0
  cambioParticipacion(item: any){
    // //console.log(item)
    let valor =0
    for (let s = 0; s < this.presupuesto.categorias.length; s++) {
      const element = this.presupuesto.categorias[s];
      valor = valor + element.participacion
      this.catParticipacion =  valor
    }
    if(valor >= 100.001){
      // //console.log('mayor a 100')
      let data = {titulo: 'Error', info:'La cifra genera participacion erronea mayor a 100% Valor ' + valor, type: 'Confirm', icon:'cancel'}
  
      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // this.getfacturacionSiigo()
      })
    }else{

      //console.log('cifra correcta')

      if(this.presupuesto.dias){
        //console.log(item)
        item.presupuesto_cop = this.presupuesto.presupuesto_cop * (item.participacion/100)
        item.presupuesto_usd = this.presupuesto.presupuesto_usd * (item.participacion/100)
        item.presupuesto_dia_usd = this.presupuesto.presupuesto_dia_usd * (item.participacion/100)
        item.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (item.participacion/100)
      }if(valor == 100){

        localStorage.setItem('categ',JSON.stringify(this.presupuesto.categorias))
        this.TotalizarPtoEmpleados()

        this.presupuesto.tiendas = this.config.tiendas;
   
        for(var i = 0;i < this.presupuesto.tiendas.length; i++){
          let categorias:any = localStorage.getItem('categ');
          // this.presupuesto.tiendas[i].usd = (this.presupuesto.tiendas[i].part/100) * this.presupuesto.presupuesto_usd 
          this.presupuesto.tiendas[i].ptto = JSON.parse(categorias)
          this.presupuesto.tiendas[i].ptto.forEach((element: { presupuesto_cop: number; participacion: number; presupuesto_usd: number; presupuesto_dia_usd: number; presupuesto_dia_cop: number; }) => {
            // element.presupuesto_cop = this.presupuesto.presupuesto_cop * (element.participacion/100)
            element.presupuesto_usd =  this.presupuesto.tiendas[i].presupuesto_usd * (element.participacion/100)
            element.presupuesto_dia_usd = this.presupuesto.tiendas[i].presupuesto_usd / this.presupuesto.dias
            // element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)
          });
        }
      }



    }

    this.TotalizarTienda()
   
  }

  log = false;
  data:any[] = []; 

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

      this.log= false;
    };

    reader.readAsBinaryString(target.files[0]);

  }

  registros:any = [];
  registrosCostumer:any = [];
  presupuestarEmpleados(){
    this.log= true;
    this.presupuesto.vendedores = this.config.empleados;
    this.log= false;
    this.presupuesto.tiendas = this.config.tiendas
  }

  newEmp=false
  newEmpleado:any
  empleado = new Empleado()

  deleteEmpleado(i: any){
    this.presupuesto.vendedores.splice(i,1)
    this.TotalizarPtoEmpleados()
  }

  addEmpleadoConfig(){
    this.config.empleados.unshift(this.empleado)
    this.empleado = new Empleado;
    this.updateConfiguracion()
  }

  updateConfiguracion(){
    this._infoService.updateConfiguracion(this.config).subscribe(
      res=>{
        //console.log(res)
        if(res){
          let data = {titulo: 'Confirmaciòn', info:'Configuracion Guardada Correctamente', type: 'Confirm', icon:'done_all'}
  
          let dialogRef = this.dialog.open(DialogConfirm,{
            data: data
          });
        
          dialogRef.afterClosed().subscribe(result => {
            // this.getfacturacionSiigo()
          })
          this.getConfig()    
        }
        
      }
    )
  }

  addEmpleado(){
    this.presupuesto.vendedores.push(
      this.newEmpleado
    )
    this.TotalizarPtoEmpleados()
    this.newEmpleado = ''
  }

  verEmpleado(item: any){
    // console.log(item)
    let pos = this.presupuesto.vendedores.map(function(e:any) { return e.identificacion; }).indexOf(item.identificacion);
    // console.log(pos)
    if(pos == -1){
      return true
    }else{
      return false
    }
  
  }

  editEmpleado(){

  }

  search=''
  buscarRegistro(item:string){
   let ex = item.indexOf(this.search) >= 0
  //  console.log(ex)
   if(ex){
    return true
   }else{
    return false
   }
   
   
  }

}
