import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { colorSets } from '@swimlane/ngx-charts';
import { Tienda } from 'src/app/models/config';
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
  colorScheme:any;
  listColorSquema:any;
  identidad:any;
  codigo:any;
  presupuesto:Presupuesto
  // public global: GlobalOffline;
  date = new Date()
  dia = this.date.getDate()-1
  ultimoDia = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);


  
  constructor(private _InfoService:InfoService,
              private _router: Router,
              public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
             ) {
              this.presupuesto = new Presupuesto();
              this.listColorSquema = colorSets
              this.colorScheme = this.listColorSquema[11]
      //  this.identity = this._userService.getIdentity();
       this.user = new ChangePass();
   }

   public multy:any[]=[
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ]

  ngOnInit() {
    this.getCollections();
    // this.token = this._userService.getToken();
    // // // console.log(this.identity);
    // this.user._id = this.identity._id;
    // this.user.email = this.identity.email;
  }

  getDataCollectionVendedor(){
    // // console.log(this.identidad)
    // // console.log(this.codigo)
    this._InfoService.getDataCollectionsVendedor({id : this.identidad, cod : this.codigo},'FEB-22').subscribe(
      res=>{
        // // console.log(res)
      }
    )
  }

  collections:any = [];
  getCollections(){
    this._InfoService.getCollections().subscribe(
      res=>{
        this.collections = res
        this.collections = this.collections.reverse();
        // // //// // console.log(res)
      }
    )
  }

  acumulado = true
  coleccion = ''
   
  passDataCollections(doc:string){
    // // // //// // console.log(doc)
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
        // console.log(this.presupuesto)
      })
  }

  dataColl:any = []
  totalCoisiones =0
  getDataCollections(tag:string){
    this.log = true;
    this.totalCoisiones =0
    this.totalCoisionesCOP =0
    this._InfoService.getDataCollections(tag).subscribe(
      res=>{
        if(res){
          this.dataColl = res  
          this.dataColl.forEach((element: { Codi: any; Detalle: any; Clasi: any; Importe: any; COP: any; PDV: any,  TRM: any   }) => {
            let cod = element.Codi
            let PDV = element.PDV
            let pdv = this.presupuesto.tiendas.map(function(e:any) { return e.tienda; }).indexOf(PDV);
            // console.log(this.presupuesto.tiendas[pdv])
            if(pdv != -1){
              // console.log(this.presupuesto.tiendas[pdv].usd)
              this.presupuesto.tiendas[pdv].usd =  this.presupuesto.tiendas[pdv].usd + element.Importe
              let listado = this.presupuesto.tiendas[pdv].ptto;
              for (let x = 0; x < listado.length; x++){
                const elements = listado[x].subscat;
                let importe = element.Importe
                  // //// // console.log('Importe ' +importe)
                  let pos2 = elements.map(function(e:any) { return e; }).indexOf(element.Clasi);
                  // //// // console.log('posicion subcategoria '+ pos2)
                  if(pos2 != -1){

                    listado[x].ventas =  listado[x].ventas + importe;
                    listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
                   
                    break
                  }
              }
            }

            let pos = this.presupuesto.vendedores.map(function(e:any) { return e.codigo; }).indexOf(cod.toString());
            if(pos != -1){
              if(this.presupuesto.vendedores[pos].rol == 'Ventas'){
                  if(this.presupuesto.vendedores[pos].name != 'MOSTRADOR'){
                      // this.presupuesto.vendedores[pos].Comisiones = 0;
                      this.presupuesto.vendedores[pos].Ventas =this.presupuesto.vendedores[pos].Ventas + element.Importe;
                      // this.presupuesto.vendedores[pos].COP = element.VentasCop;
                      this.presupuesto.vendedores[pos].Cumplimiento = (this.presupuesto.vendedores[pos].Ventas / this.presupuesto.vendedores[pos].USD)
                      let listado = this.presupuesto.vendedores[pos].categorias;
                      for (let x = 0; x < listado.length; x++){
                        const elements = listado[x].subscat;
                        let importe = element.Importe
                          // //// // console.log('Importe ' +importe)
                          let importeCop = element.COP
                          let pos2 = elements.map(function(e:any) { return e; }).indexOf(element.Clasi);
                          // //// // console.log('posicion subcategoria '+ pos2)
                          if(pos2 != -1){
                            // //// // console.log('Ventas ' +listado[x].ventas)
                            listado[x].ventas =  listado[x].ventas + importe;
                            
                            listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
                            // //// // console.log('Ventas' +listado[x].ventas)
                            // //// // console.log('CUMPLIMIENTO ' +listado[x].cumplimiento)
                            if(listado[x].cumplimiento >= 1.2){
                              // // console.log('entro 1')
                              listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].asesor/100)
                              listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[2].asesor/100))* element.TRM
                              // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
                            }else{
                              if(listado[x].cumplimiento <= 1){
                                // //// // console.log('entro 2')
                                listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].asesor/100)
                                listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[1].asesor/100))* element.TRM
                                // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
                              }else{
                                if(listado[x].cumplimiento >= 0.1){
                                  // //// // console.log('entro 3')
                                  listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].asesor/100)
                                  listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[0].asesor/100))* element.TRM
                                  // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
                                }
                              }
                            }
                            break
                          }
                      }
                  }   
              }
            }
                       
          });

          for(let h = 0; h < this.presupuesto.vendedores.length; h++){
            if(this.presupuesto.vendedores[h].rol != 'Ventas'){
              let tiendas = JSON.stringify(this.presupuesto.tiendas)
              this.presupuesto.vendedores[h].categorias = JSON.parse(tiendas);
              
              this.presupuesto.vendedores[h].categorias.forEach(element => {
                this.presupuesto.vendedores[h].Ventas = this.presupuesto.vendedores[h].Ventas + element.usd;
                this.presupuesto.vendedores[h].USD = this.presupuesto.vendedores[h].USD + element.presupuesto_usd;
                this.presupuesto.vendedores[h].Cumplimiento = (this.presupuesto.vendedores[h].Ventas / this.presupuesto.vendedores[h].USD)
              });
            }
          }

          for (let g = 0; g < this.presupuesto.vendedores.length; g++) {
            // // console.log(this.presupuesto.vendedores[g])
            if(this.presupuesto.vendedores[g].rol == 'Ventas'){
              for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
                const cat = this.presupuesto.vendedores[g].categorias[t];
                this.presupuesto.vendedores[g].ComisionesCop =  this.presupuesto.vendedores[g].ComisionesCop + cat.comisionesCop
                this.presupuesto.vendedores[g].Comisiones =  this.presupuesto.vendedores[g].Comisiones + cat.comisionesUsd
                this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
                this.totalCoisionesCOP = this.totalCoisionesCOP + cat.comisionesCop
              }
            }else{
              for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
                const cat = this.presupuesto.vendedores[g].categorias[t];
                let cumplimiento = cat.presupuesto_usd / cat.usd
                console.log(cumplimiento)

                if(cumplimiento >= 1.2){
                  // // console.log('entro 1')
                  if(this.presupuesto.vendedores[g].rol == 'Lider'){
                    
                    this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Ventas * (cat.cumplimientos[0].lider/100)
                    console.log('lider ' +  this.presupuesto.vendedores[g].Comisiones)
                  }
                  if(this.presupuesto.vendedores[g].rol == 'Gerente Ventas'){
                    this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Ventas * (cat.cumplimientos[0].subGerente/100)
                  
                  }
                 
                  // this.presupuesto.vendedores[g].ComisionesCop
                  // listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].asesor/100)
                  // listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[2].asesor/100))* element.TRM
                  // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
                }else{
                  if(cumplimiento <= 1){
                    if(this.presupuesto.vendedores[g].rol == 'Lider'){
                      this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Ventas * (cat.cumplimientos[2].lider/100)
                      console.log('lider ' +  this.presupuesto.vendedores[g].Comisiones)
                    }

                    if(this.presupuesto.vendedores[g].rol == 'Gerente Ventas'){
                      this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Ventas * (cat.cumplimientos[2].subGerente/100)
                    }
                    // //// // console.log('entro 2')
                    // listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].asesor/100)
                    // listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[1].asesor/100))* element.TRM
                    // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
                  }else{
                    if(cumplimiento >= 0.1){
                      if(this.presupuesto.vendedores[g].rol == 'Lider'){
                        this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Ventas * (cat.cumplimientos[1].lider/100)
                        console.log('lider ' +  this.presupuesto.vendedores[g].Comisiones)
                      }
                      if(this.presupuesto.vendedores[g].rol == 'Gerente Ventas'){
                        this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Ventas * (cat.cumplimientos[1].subGerente/100)
                      }
                      // //// // console.log('entro 3')
                      // listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].asesor/100)
                      // listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[0].asesor/100))* element.TRM
                      // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
                    }
                  }
                }

                // this.presupuesto.vendedores[g].ComisionesCop =  this.presupuesto.vendedores[g].ComisionesCop + cat.comisionesCop
                // this.presupuesto.vendedores[g].Comisiones =  this.presupuesto.vendedores[g].Comisiones + cat.comisionesUsd
                // this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
                // this.totalCoisionesCOP = this.totalCoisionesCOP + cat.comisionesCop
              
              
              }
            }
 
          
          }

        
        }
        this.log = false;
        // // console.log(this.presupuesto)
      }
    )
  }

  informeCateg:any
  totalCategoria = 0;
  totalCategoriaCop = 0;
  totalCategoriaUnd = 0;
  totalCategoriaCosto = 0;
  totalCoisionesCOP = 0;
  
  getInformeCategorias(tag:string){
    this.totalCategoria = 0;
    this.totalCategoriaCop = 0;
    this.totalCategoriaUnd = 0;
    this.totalCategoriaCosto = 0;
  
    this._InfoService.getInformeCategorias(tag).subscribe(
      res=>{
        // console.log(res);
        if(res){
        this.informeCateg = res;
        for (let index = 0; index <  this.informeCateg.length; index++) {
          const element =  this.informeCateg[index];
          this.totalCategoria = this.totalCategoria + element.Ventas
          this.totalCategoriaCop = this.totalCategoriaCop + element.Cop
          this.totalCategoriaUnd = this.totalCategoriaUnd + element.Unidades
          this.totalCategoriaCosto = this.totalCategoriaCosto +element.Cost

          this.presupuesto.ventas_usd = this.presupuesto.ventas_usd + element.Ventas;
          this.presupuesto.ventas = this.presupuesto.ventas + element.Cop;

          for (let r = 0; r < this.presupuesto.categorias.length; r++) {
            const elemento = this.presupuesto.categorias[r];
            let pos = elemento.subscat.map(function(e:any) { return e; }).indexOf(element.Codigo[0]);
            if(pos != -1){
              elemento.ventas =   elemento.ventas + element.Ventas
              elemento.ventasCop = element.Cop
              elemento.cumplimiento =   elemento.ventas / elemento.presupuesto_usd
              break
            }
          }
          // this.dataPresupuest();
        }

        this.getDataCollections(tag)

        // console.log(this.presupuesto)
       
          
      }
      })
     

  }

  view:[number, number] = [300, 100];
  viewBa: [number, number] = [600, 400];
  // options
  showXAxis: boolean = false;
  showYAxis: boolean = true;


  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';


  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'VENTAS';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'CATEGORIAS';
  legendTitle: string = 'Comparacion';
  ad=''
  clave=''
  buscarCedula(id: any){
    // console.log(id)
    let pos = this.presupuesto.vendedores.map(function(e:any) { return e.identificacion; }).indexOf(id.toString());
    if(pos != -1){
      if(this.presupuesto.vendedores[pos].clave == this.clave){
        this.id = id
        // console.log(pos)
        this.dataPresupuest( this.presupuesto.vendedores[pos].categorias)
        this.dataPresupuestDia(this.presupuesto.vendedores[pos].categorias)
      }else{
        // console.log('error clave')
      }
    
    }
  }

  onSelect(data: any): void {
    // // // // //// console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // // // // //// console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // // // // //// console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  dataPresupuest(categorias:any[]){
    let multy = [];
    for (let t = 0; t < categorias.length; t++) {
      const element = categorias[t];
      // // console.log(element)
      multy.push(
        {
          "name": element.titulo,
          "series": [
            {
              "name": "PPTO",
              "value": element.presupuesto_usd
            },
            {
              "name": "VENTAS",
              "value": element.ventas
            }
          ]
      }) 
    }
    return this.multy = multy
  }

  // (cat.presupuesto_usd / presupuesto.dias)* dia 
  multy2:any=[]
  dataPresupuestDia(categorias:any[]){
    let multy = [];
    for (let t = 0; t < categorias.length; t++) {
      const element = categorias[t];
      // // console.log(element)
      multy.push(
        {
          "name": element.titulo,
          "series": [
            {
              "name": "PPTO",
              "value": (element.presupuesto_usd / this.presupuesto.dias)* this.dia
            },
            {
              "name": "VENTAS",
              "value": element.ventas
            }
          ]
      }) 
    }
    return this.multy2 = multy 
  }

}




// for (let g = 0; g < this.presupuesto.vendedores.length; g++) {
//   // const element = this.presupuesto.vendedores[g];
//   if(this.presupuesto.vendedores[g].rol == 'Lider'){
//     // let categ = JSON.stringify(this.presupuesto.categorias)
//     // this.presupuesto.vendedores[g].categorias = JSON.parse(categ);
//     this.presupuesto.vendedores[g].Ventas = this.presupuesto.vendedores[g].Ventas + element.Importe
//     this.presupuesto.vendedores[g].COP = this.presupuesto.vendedores[g].COP + element.COP
//     this.presupuesto.vendedores[g].Cumplimiento = this.presupuesto.ventas_usd / this.presupuesto.presupuesto_usd
    
//     let listado = this.presupuesto.vendedores[g].categorias;
//     for (let x = 0; x < listado.length; x++){
//       const elements = listado[x].subscat;
//         let importe = element.Importe
//         let importeCop = element.COP
//         let pos2 = elements.map(function(e:any) { return e; }).indexOf(element.Clasi);
//         // //// // console.log('posicion subcategoria '+ pos2)
//         if(pos2 != -1){
//           // //// // console.log('Ventas ' +listado[x].ventas)
//           listado[x].ventas =  listado[x].ventas + importe;
          
//           listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
//           // //// // console.log('Ventas' +listado[x].ventas)
//           // //// // console.log('CUMPLIMIENTO ' +listado[x].cumplimiento)
//           if(listado[x].cumplimiento >= 1.2){
//             // // console.log('entro 1')
//             listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].lider/100)
//             listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[2].lider/100))* element.TRM
//             // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
//           }else{
//             if(listado[x].cumplimiento <= 1){
//               // //// // console.log('entro 2')
//               listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].lider/100)
//               listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[1].lider/100))* element.TRM
//               // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
//             }else{
//               if(listado[x].cumplimiento >= 0.1){
//                 listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].lider/100)
//                 listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[0].lider/100))* element.TRM
//               }
//             }
//           }
//           break
//         }
//     }
//     // // console.log(this.presupuesto.vendedores[g])
//   }

//   if(this.presupuesto.vendedores[g].rol == 'Gerente Ventas'){
//     this.presupuesto.vendedores[g].Ventas = this.presupuesto.vendedores[g].Ventas + element.Importe
//     this.presupuesto.vendedores[g].COP = this.presupuesto.vendedores[g].COP + element.COP
//     this.presupuesto.vendedores[g].Cumplimiento = this.presupuesto.ventas_usd / this.presupuesto.presupuesto_usd
    
//     let listado = this.presupuesto.vendedores[g].categorias;
//     for (let x = 0; x < listado.length; x++){
//       const elements = listado[x].subscat;
//       let importe = element.Importe
//         let importeCop = element.COP
//         let pos2 = elements.map(function(e:any) { return e; }).indexOf(element.Clasi);
//         // //// // console.log('posicion subcategoria '+ pos2)
//         if(pos2 != -1){
//           // //// // console.log('Ventas ' +listado[x].ventas)
//           listado[x].ventas =  listado[x].ventas + importe;
          
//           listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
//           // //// // console.log('Ventas' +listado[x].ventas)
//           // //// // console.log('CUMPLIMIENTO ' +listado[x].cumplimiento)
//           if(listado[x].cumplimiento >= 1.2){
//             // // console.log('entro 1')
//             listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].subGerente/100)
//             listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[2].subGerente/100))* element.TRM
//             // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
//           }else{
//             if(listado[x].cumplimiento <= 1){
//               // //// // console.log('entro 2')
//               listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].subGerente/100)
//               listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[1].subGerente/100))* element.TRM
//               // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
//             }else{
//               if(listado[x].cumplimiento >= 0.1){
//                 listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].subGerente/100)
//                 listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[0].subGerente/100))* element.TRM
//               }
//             }
//           }
//           break
//         }
//     }
    
//   }

//   if(this.presupuesto.vendedores[g].rol == 'Gerente'){
//     this.presupuesto.vendedores[g].Ventas = this.presupuesto.vendedores[g].Ventas + element.Importe
//     this.presupuesto.vendedores[g].COP = this.presupuesto.vendedores[g].COP + element.COP
//     this.presupuesto.vendedores[g].Cumplimiento = this.presupuesto.ventas_usd / this.presupuesto.presupuesto_usd
    
//     let listado = this.presupuesto.vendedores[g].categorias;
//     for (let x = 0; x < listado.length; x++){
//       const elements = listado[x].subscat;
//       let importe = element.Importe
//         let importeCop = element.COP
//         let pos2 = elements.map(function(e:any) { return e; }).indexOf(element.Clasi);
//         // //// // console.log('posicion subcategoria '+ pos2)
//         if(pos2 != -1){
//           // //// // console.log('Ventas ' +listado[x].ventas)
//           listado[x].ventas =  listado[x].ventas + importe;
          
//           listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
//           // //// // console.log('Ventas' +listado[x].ventas)
//           // //// // console.log('CUMPLIMIENTO ' +listado[x].cumplimiento)
//           if(listado[x].cumplimiento >= 1.2){
//             // // console.log('entro 1')
//             listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].gerente/100)
//             listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[2].gerente/100))* element.TRM
//             // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
//           }else{
//             if(listado[x].cumplimiento <= 1){
//               // //// // console.log('entro 2')
//               listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].gerente/100)
//               listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[1].gerente/100))* element.TRM
//               // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
//             }else{
//               if(listado[x].cumplimiento >= 0.1){
//                 listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].gerente/100)
//                 listado[x].comisionesCop = (listado[x].ventas * (listado[x].cumplimientos[0].gerente/100))* element.TRM
//               }
//             }
//           }
//           break
//         }
//     }
//   }

// } 