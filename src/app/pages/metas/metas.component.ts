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
  constructor(public _infoService:InfoService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
    this.config = new Config()
    this.presupuesto = new Presupuesto()
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
    //////console.log(this.presupuesto)

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

          ////console.log(this.config)
        }
       
      }
    )
  }



  
  pres:any
  getData(event:any){
    this.pres = event
    //////console.log(this.pres)
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
        //////console.log(res)
      }
    )
  }

  updatePresupuesto(){
    //////console.log(this.pres)
    this._infoService.updatePresupuesto(this.presupuesto).subscribe(
      res=>{
        //console.log(res)
        this.getPresupuestos()
      }
    )
  }

  deleteRegistro(){

  }

  passPresupuesto(item:any){
    //console.log(item)
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
    ////console.log(this.presupuesto.vendedores)

    for (let i = 0; i < this.presupuesto.vendedores.length; i++){
      this.presupuesto.capacidadVentas =   this.presupuesto.capacidadVentas + this.presupuesto.vendedores[i].Dias;
    }

    for (let i = 0; i < this.presupuesto.vendedores.length; i++){
      let vendedor = this.presupuesto.vendedores[i];
      let categorias:any = localStorage.getItem('categ');
      vendedor.categorias = JSON.parse(categorias);
      // vendedor.Dias = dias;
      ////console.log(vendedor);
      vendedor.USD =   (this.presupuesto.presupuesto_usd / this.presupuesto.capacidadVentas) * vendedor.Dias;
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

    // for (let i = 0; i < this.presupuesto.vendedores.length; i++){
    //   var vendedor = this.presupuesto.vendedores[i];
    //   // //////console.log(this.presupuesto.capacidadVentas)
     
    // }
   
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
    // this.presupuestarEmpleados();

    this.presupuesto.tiendas = this.config.tiendas;
   
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

    //console.log(this.presupuesto)

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
          this.presupuesto.tiendas[i].usd = (this.presupuesto.tiendas[i].part/100) * this.presupuesto.presupuesto_usd 
          this.presupuesto.tiendas[i].ptto = JSON.parse(categorias)
          this.presupuesto.tiendas[i].ptto.forEach((element: { presupuesto_cop: number; participacion: number; presupuesto_usd: number; presupuesto_dia_usd: number; presupuesto_dia_cop: number; }) => {
            // element.presupuesto_cop = this.presupuesto.presupuesto_cop * (element.participacion/100)
            element.presupuesto_usd =  this.presupuesto.tiendas[i].usd * (element.participacion/100)
            element.presupuesto_dia_usd = this.presupuesto.tiendas[i].usd / this.presupuesto.dias
            // element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)
          });
        }
      }



    }
   
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

  deleteEmpleado(i: any){
    this.presupuesto.vendedores.splice(i,1)
    this.TotalizarPtoEmpleados()
  }

}
