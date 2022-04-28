import { Component, Inject, OnInit } from '@angular/core';
import { Categoria, Cumplimiento } from '../../models/presupuesto';
import { Config, Empleado } from '../../models/config';
import { InfoService } from 'src/app/services/info.service';
import { ThisReceiver } from '@angular/compiler';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
value:any
config:Config ;
checked:boolean = true;
categoria:Categoria;
cumplimiento:Cumplimiento;
empleado:Empleado
tag = ''
nuevo= false;
  constructor(public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
  public _infoService:InfoService,) {
    this.config = new Config();
    this.categoria = new Categoria();
    this.cumplimiento = new Cumplimiento();
    this.empleado = new Empleado();
    //console.log(this.config)
   }

  ngOnInit(): void {
    this.getConfig()
  }


  guardarConfigurcion(){
    this._infoService.agregarConfiguracion(this.config).subscribe(
      res=>{
        //console.log(res)
      }
    )
    //console.log(this.config)
  }

  getConfig(){
    this._infoService.getConfig().subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
        }
        // //console.log(res)
      }
    )
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


  addTag(){
    this.config.tags.unshift({tag:this.tag, Activo: this.checked});
    this.tag = ''
  }

  deleteTag(i:number){
    this.config.tags.splice(i,1);
  }

  pasCategoria(item:Categoria){
    this.categoria=item
  }

  subscat=0;
  addSubscat(){
    this.categoria.subscat.unshift(this.subscat)
    this.subscat=0;
  }

  deleteSubscat(i:number){
    this.categoria.subscat.splice(i,1);
  }

  pasCumplimiento(item:Cumplimiento){
    this.cumplimiento = item
  }

  addCumpli(){
    this.categoria.cumplimientos.unshift(this.cumplimiento)
    this.cumplimiento=new Cumplimiento();
    //console.log(this.categoria)
  }

  deleteCumplimiento(i:number){
    this.categoria.cumplimientos.splice(i,1);
  }

  editCumplimiento(){
    this.cumplimiento=new Cumplimiento();
  }

  addCategoria(){
    this.categoria._id= new Date().getTime();
    this.config.categorias.unshift(this.categoria)
    this.cumplimiento=new Cumplimiento();
    this.categoria = new Categoria();
    this.nuevo=false;
  }

  catParticipacion =0
  cambioParticipacion(item: any){
    // console.log(item)
    let valor =0
    for (let s = 0; s < this.config.categorias.length; s++) {
      const element = this.config.categorias[s];
      valor = valor + element.participacion
      this.catParticipacion =  valor
    }
    if(valor >= 100.001){
      // console.log('mayor a 100')
      let data = {titulo: 'Error', info:'La cifra genera participacion erronea mayor a 100% Valor ' + valor, type: 'Confirm', icon:'cancel'}
  
      let dialogRef = this.dialog.open(DialogConfirm,{
        data: data
      });
    
      dialogRef.afterClosed().subscribe(result => {
        // this.getfacturacionSiigo()
      })
    }else{


    }
  }

  editCategoria(){
    this.cumplimiento=new Cumplimiento();
    this.categoria = new Categoria(); 
  }

  deleteCategoria(i:number){
    this.config.categorias.splice(i,1);
    this.categoria = new Categoria(); 
  }


  tienda = ''
  tiendaParticipacion = 0
  addTienda(){
    this.config.tiendas.push({tienda:this.tienda, part:this.tiendaParticipacion,ptto:[], presupuesto_usd:0, usd:0})
    this.tienda = ''
    this.tiendaParticipacion = 0
  }

  pastienda(item:any){
    this.tienda = item.tienda;
    this.tiendaParticipacion = item.part
  }

  deleteTienda(i:number){
    this.config.tiendas.splice(i,1)
  }

  editTienda(){
    this.tienda =''
    this.tiendaParticipacion =0
  }

  addEmpleado(){
    this.config.empleados.unshift(this.empleado)
    this.empleado = new Empleado;
  }

  editEmpleado(){
    this.empleado = new Empleado();
  }

  pasEmpleado(item: any){
    this.empleado = item;
  }

  deleteEmpleado(i:number){
    this.config.empleados.splice(i,1);
  }

}
