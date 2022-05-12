import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Presupuesto } from 'src/app/models/presupuesto';
import { InfoService } from 'src/app/services/info.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { ChangePass } from './change-pass';

@Component({
  selector: 'app-cumplimiento',
  templateUrl: './cumplimiento.component.html',
  styleUrls: ['./cumplimiento.component.css']
})

export class CumplimientoComponent implements OnInit {

  public user:ChangePass;
  // public identity;
  public token:any;
  public errorMessage:any;
  public log: boolean = false;
  public company: string = '';
  public confirmNewpass:string = '';
  public id:string = '';
  invalidError:any;

  identidad:any;
  codigo:any;
  presupuesto:Presupuesto
  // public global: GlobalOffline;
  date = new Date()
  dia = this.date.getDate()
  ultimoDia = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  constructor(private _InfoService:InfoService,
              private _router: Router,
              public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
             ) {
              this.presupuesto = new Presupuesto();
      //  this.identity = this._userService.getIdentity();
       this.user = new ChangePass();
   }

  ngOnInit() {
    this.getCollections();
    // this.token = this._userService.getToken();
    // console.log(this.identity);
    // this.user._id = this.identity._id;
    // this.user.email = this.identity.email;
  }

  getDataCollectionVendedor(){
    console.log(this.identidad)
    console.log(this.codigo)
    this._InfoService.getDataCollectionsVendedor({id : this.identidad, cod : this.codigo},'FEB-22').subscribe(
      res=>{
        console.log(res)
      }
    )
  }

  collections:any = [];
  getCollections(){
    this._InfoService.getCollections().subscribe(
      res=>{
        this.collections = res
        this.collections = this.collections.reverse();
        // // //console.log(res)
      }
    )
  }

  acumulado = false
  coleccion = ''
   
  passDataCollections(doc:string){
    // // // //console.log(doc)
    this.coleccion = doc;
    
    this.getPresupuestosTag(doc);
    // this.getInformeFolio(doc)
    // this.getInformeCategoriasTienda(doc);
    // this.getInformeCategorias(doc);

  }

  acumulador(){
    this.acumulado = ! this.acumulado
  }


  getPresupuestosTag(tag:string){
    this._InfoService.getPresupuestoTag(tag).subscribe(
      res=>{
        this.presupuesto = res[0];
        this.getDataCollections(tag)
        // this.getInformePresupuestoVendedor(tag)
        // this.getInformeVendedores(tag);
        console.log(this.presupuesto)
      }
    )
  }

  dataColl:any = []
  totalCoisiones =0
  getDataCollections(tag:string){
    this.log = true;
    this._InfoService.getDataCollections(tag).subscribe(
      res=>{
        // //console.log(res)  
        if(res){
          this.dataColl = res  
          this.dataColl.forEach((element: { Codi: any; Detalle: any; Clasi: any; Importe: any; COP: any; PDV: any   }) => {
            let cod = element.Codi
            let PDV = element.PDV
            let pdv = this.presupuesto.tiendas.map(function(e:any) { return e.tienda; }).indexOf(PDV);
            
            if(pdv != -1){
              this.presupuesto.tiendas[pdv].usd =  this.presupuesto.tiendas[pdv].usd + element.Importe
              let listado = this.presupuesto.tiendas[pdv].ptto;
              for (let x = 0; x < listado.length; x++){
                const elements = listado[x].subscat;
                let importe = element.Importe
                  // //console.log('Importe ' +importe)
                  let pos2 = elements.map(function(e:any) { return e; }).indexOf(element.Clasi);
                  // //console.log('posicion subcategoria '+ pos2)
                  if(pos2 != -1){
                    // //console.log('Ventas ' +listado[x].ventas)
                    listado[x].ventas =  listado[x].ventas + importe;
                    listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
                    // //console.log('Ventas' +listado[x].ventas)
                    // //console.log('CUMPLIMIENTO ' +listado[x].cumplimiento)
                    break
                  }
              }
           
           
            }
            // //console.log(pdv)

            // //console.log(cod) 
            let pos = this.presupuesto.vendedores.map(function(e:any) { return e.codigo; }).indexOf(cod.toString());
            // //console.log(pos) 
            if(pos != -1){
              // //console.log(this.presupuesto.vendedores[pos])
              // this.presupuesto.vendedores[pos].Comisiones = 0;
              this.presupuesto.vendedores[pos].Ventas =this.presupuesto.vendedores[pos].Ventas + element.Importe;
              // this.presupuesto.vendedores[pos].COP = element.VentasCop;
              this.presupuesto.vendedores[pos].Cumplimiento = (this.presupuesto.vendedores[pos].Ventas / this.presupuesto.vendedores[pos].USD)
              let listado = this.presupuesto.vendedores[pos].categorias;
              for (let x = 0; x < listado.length; x++){
                const elements = listado[x].subscat;
                let importe = element.Importe
                  // //console.log('Importe ' +importe)
                  let importeCop = element.COP
                  let pos2 = elements.map(function(e:any) { return e; }).indexOf(element.Clasi);
                  // //console.log('posicion subcategoria '+ pos2)
                  if(pos2 != -1){
                    // //console.log('Ventas ' +listado[x].ventas)
                    listado[x].ventas =  listado[x].ventas + importe;
                    listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
                    // //console.log('Ventas' +listado[x].ventas)
                    // //console.log('CUMPLIMIENTO ' +listado[x].cumplimiento)
                    if(listado[x].cumplimiento >= 1.2){
                      // //console.log('entro 1')
                      listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].asesor/100)
                      // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
                    }else{
                      if(listado[x].cumplimiento <= 1){
                        // //console.log('entro 2')
                        listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].asesor/100)
                        // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
                      }else{
                        if(listado[x].cumplimiento <= 0.1){
                          // //console.log('entro 3')
                          listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].asesor/100)
                          // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
                        }
                      }
                    }
                    break
                  }
              }
            }
             
          });
          this.totalCoisiones =0
          for (let g = 0; g < this.presupuesto.vendedores.length; g++) {
            const element = this.presupuesto.vendedores[g];

            for (let t = 0; t < element.categorias.length; t++) {
              const cat = element.categorias[t];
              element.Comisiones =  element.Comisiones + cat.comisionesUsd
              this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
              
            }
            // //console.log(element)
            
          }
        }
        this.log = false;
      }
    )
  }



}