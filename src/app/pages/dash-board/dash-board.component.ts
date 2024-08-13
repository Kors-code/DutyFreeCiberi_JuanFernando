import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { ConnectableObservable } from 'rxjs';
import { Operacion } from 'src/app/models/operacion';
import { Presupuesto } from 'src/app/models/presupuesto';
import { InfoService } from 'src/app/services/info.service';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirm } from '../confirm-dialog/confirm-dialog.component';
import { colorSets } from './paleta';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  listColorSquema:any;
  colorScheme:any;
  presupuesto:Presupuesto
  acumulado = true
  date = new Date()
  dia = this.date.getDate()-1
  ultimoDia = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
  public identity:any;
  config:any;
  pOperacion:Operacion
  
  constructor(public _infoService:InfoService,
    private _userService:UserService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
    this.listColorSquema = colorSets
    this.presupuesto = new Presupuesto();
    this.colorScheme = this.listColorSquema[11]
    this.identity = this._userService.getIdentity();
    this.pOperacion=_userService.getPredetermidaOperacion();
    //////////console.log(this.identity)
    // Object.assign(this, { single });
  }
  collections:any = [];
  
  single: any[] = [  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }];


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

  ngOnInit(): void {
    this.getConfig()
    // this.getRegistros(1);
    // this.getCollections();
    // this.facturasVendedor()
  }

  
  getConfig(){
    this._infoService.getConfig(this.pOperacion._id).subscribe(
      res=>{
        if(res.length != 0){
          this.config = res[0];
          this.collections = this.config.tags
          // //console.log(this.collections)
        }
      })
  }

  cambiarColores(item:any){
    // // // ////////////console.log(item)
    this.colorScheme = item;
  }


  getCollections(){
    // //console.log(this.confi)
    // this._infoService.getCollections().subscribe(
    //   res=>{
    //     this.collections = res
    //     this.collections = this.collections.reverse();
    //   }
    // )
  }

  acumulador(){
    this.acumulado = ! this.acumulado
  }

  coleccion = ''
  passDataCollections(doc:string){
    this.coleccion = doc;
    this.getPresupuestosTag(doc);
    this.getInformeFolio(doc)
    this.getInformeCategoriasTienda(doc);
    // this.getInformeCategorias(doc);

  }

  downloadComisiones:any = []
  dataColl:any = []
  totalCoisiones =0
 

  getDataCollections(tag:string){
    this.log = true;
    this.totalCoisiones =0
    this.totalCoisionesCOP =0
    this._infoService.getDataCollections(tag).subscribe(
      res=>{
        if(res){
          this.dataColl = res  

          //console.log(this.dataColl)

          this.dataColl.forEach((element: {
            _id: any;
            FOLIO: any;
            CODIGO_VENDEDOR: any; VENDEDOR: any; PDV: any; Importe: number; COP: number; CLASIFICACION: any; Clasi: any; 
          }) => {
            let cod = element.CODIGO_VENDEDOR;
            let PDV = element.PDV;
            let pdv = this.presupuesto.tiendas.map(function(e:any) { return e.tienda; }).indexOf(PDV);

            // //console.log(pdv)
            console.log(this.presupuesto.ventas)
            console.log(element._id,  element.COP, element.Importe )
            this.presupuesto.ventas_usd = this.presupuesto.ventas_usd + element.Importe;
            this.presupuesto.ventas = this.presupuesto.ventas + element.COP;
            
            if(pdv != -1){
              // //console.log(this.presupuesto.tiendas[pdv].usd);
              this.presupuesto.tiendas[pdv].usd =  this.presupuesto.tiendas[pdv].usd + element.Importe;
              this.presupuesto.tiendas[pdv].ventas_cop =  this.presupuesto.tiendas[pdv].ventas_cop + element.COP;

              let listado = this.presupuesto.tiendas[pdv].ptto;
              for (let x = 0; x < listado.length; x++){
                const elements = listado[x].subscat;
                let importe = element.Importe;
                // //console.log(element.CLASIFICACION)
                  let pos2 = elements.map(function(e:any) { return e; }).indexOf( parseInt(element.CLASIFICACION));
                  if(pos2 != -1){
                    listado[x].ventas =  listado[x].ventas + importe;
                    listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
                   
                    break
                  }
              }

              // //console.log(this.presupuesto.tiendas[pdv]);
            }

            let sinVendedor = 0
            let pos = this.presupuesto.vendedores.map(function(e:any) { return e.codigo; }).indexOf(cod.toString());
            if(pos != -1){
              // //console.log(pos);
              if(this.presupuesto.vendedores[pos].rol == 'Ventas'){
                  if(this.presupuesto.vendedores[pos].name != 'MOSTRADOR'){
                    this.presupuesto.vendedores[pos].Ventas =this.presupuesto.vendedores[pos].Ventas + element.Importe;
                    this.presupuesto.vendedores[pos].COP = this.presupuesto.vendedores[pos].COP + element.COP;
                    this.presupuesto.vendedores[pos].Cumplimiento = (this.presupuesto.vendedores[pos].Ventas / this.presupuesto.vendedores[pos].USD)
                    let listado = this.presupuesto.vendedores[pos].categorias;
                      for (let x = 0; x < listado.length; x++){
                        const elements = listado[x].subscat;
                        let importe = element.Importe
                        let importeCop = element.COP
                        if(!listado[x].ventas_cop){
                          listado[x].ventas_cop = 0
                        }
                          let pos2 = elements.map(function(e:any) { return e; }).indexOf(parseInt(element.CLASIFICACION));
                          //console.log('posicion subcategoria '+ pos2)
                          if(pos == null){
                            //console.log('Clasi '+ element.CLASIFICACION)
                          }
                          if(pos2 != -1){
                           
                            listado[x].ventas =  listado[x].ventas + importe;
                            listado[x].ventas_cop =  listado[x].ventas_cop +  importeCop;
                            
                            listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
                            //////////console.log('Ventas cop1' + listado[x].ventas_cop)
                            
                            if(listado[x].cumplimiento >= 1.2){
                              ////////////console.log('1.2')
                              listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].asesor/100)
                              listado[x].comisionesCop = (listado[x].ventas_cop * (listado[x].cumplimientos[2].asesor/100))
                              //////////console.log('Ventas cop' + listado[x].ventas_cop)
                            }
                            
                            if(listado[x].cumplimiento <= 1.19 && listado[x].cumplimiento >= 1){
                              ////////////console.log('entro <1')
                              listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].asesor/100)
                              listado[x].comisionesCop = (listado[x].ventas_cop * (listado[x].cumplimientos[1].asesor/100))
                              //////////console.log('Ventas cop' + listado[x].ventas_cop)
                            }

                            if(listado[x].cumplimiento <= 0.999 && listado[x].cumplimiento >= 0.8){
                              ////////////console.log('entro 0.999')
                              listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].asesor/100)
                              listado[x].comisionesCop = (listado[x].ventas_cop * (listado[x].cumplimientos[0].asesor/100))
                              // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
                              //////////console.log('Ventas cop' + listado[x].ventas_cop)
                            }
                            break
                          }
                      }
                  }   
              }
            }else{
              sinVendedor = sinVendedor +  element.Importe;
              //////////console.log('sin vendedor '+ sinVendedor)
            }
                       
          });

          for(let h = 0; h < this.presupuesto.vendedores.length; h++){
            if(this.presupuesto.vendedores[h].rol != 'Ventas'){
              let tiendas = JSON.stringify(this.presupuesto.tiendas)
              this.presupuesto.vendedores[h].categorias = JSON.parse(tiendas);
              
                this.presupuesto.vendedores[h].categorias.forEach(element => {
                this.presupuesto.vendedores[h].Ventas = this.presupuesto.vendedores[h].Ventas + element.usd;
                // this.presupuesto.vendedores[h]. = this.presupuesto.vendedores[h].Ventas + element.usd;
                this.presupuesto.vendedores[h].USD = this.presupuesto.vendedores[h].USD + element.presupuesto_usd;
                this.presupuesto.vendedores[h].Cumplimiento = (this.presupuesto.vendedores[h].Ventas / this.presupuesto.vendedores[h].USD)
              });
            }
          }
          for (let g = 0; g < this.presupuesto.vendedores.length; g++) {
            // // ////////////console.log(this.presupuesto.vendedores[g])
            if(this.presupuesto.vendedores[g].rol == 'Ventas'){
              for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
                const cat = this.presupuesto.vendedores[g].categorias[t];
                this.presupuesto.vendedores[g].ComisionesCop =  this.presupuesto.vendedores[g].ComisionesCop + cat.comisionesCop
                this.presupuesto.vendedores[g].Comisiones =  this.presupuesto.vendedores[g].Comisiones + cat.comisionesUsd
                // this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
                // this.totalCoisionesCOP = this.totalCoisionesCOP + cat.comisionesCop
              }
            }else{
              ////console.log(this.presupuesto.vendedores[g])
              for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
                const cat = this.presupuesto.vendedores[g].categorias[t];
                let cumplimiento = cat.usd /cat.presupuesto_usd
                let ventasCops  = cat.ventasCop
                ////console.log(cumplimiento)

                if(cumplimiento >= 1.2){
                  if(this.presupuesto.vendedores[g].rol == 'Lider'){
                    ////console.log('LIDER >= 1.2' )
                    this.presupuesto.vendedores[g].Comisiones  = this.presupuesto.vendedores[g].Comisiones + cat.usd * (cat.cumplimientos[0].lider/100)
                    this.presupuesto.vendedores[g].ComisionesCop = this.presupuesto.vendedores[g].ComisionesCop + cat.ventas_cop *  (cat.cumplimientos[0].lider/100)
                  }
                  if(this.presupuesto.vendedores[g].rol == 'Gerente Ventas'){
                    this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Comisiones + cat.usd * (cat.cumplimientos[0].subGerente/100)
                    this.presupuesto.vendedores[g].ComisionesCop = this.presupuesto.vendedores[g].ComisionesCop + cat.ventas_cop *  (cat.cumplimientos[0].subGerente/100)
                  }
                }

                if(cumplimiento >= 1 && cumplimiento <= 1.199){
                  ////console.log('LIDER >= 1.199' )
                  if(this.presupuesto.vendedores[g].rol == 'Lider'){
                    this.presupuesto.vendedores[g].Comisiones = cat.usd * (cat.cumplimientos[1].lider/100)
                    this.presupuesto.vendedores[g].ComisionesCop = cat.ventas_cop *  (cat.cumplimientos[1].lider/100)
                  }
                  if(this.presupuesto.vendedores[g].rol == 'Gerente Ventas'){
                    this.presupuesto.vendedores[g].Comisiones = cat.usd * (cat.cumplimientos[1].subGerente/100)
                    this.presupuesto.vendedores[g].ComisionesCop = cat.ventas_cop *  (cat.cumplimientos[1].subGerente/100)
                  }
                }

                if(cumplimiento <= 0.999 && cumplimiento >= 0.8){
                  ////console.log('LIDER <= 0.99' )
                  if(this.presupuesto.vendedores[g].rol == 'Lider'){
                    this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Comisiones + cat.usd * (cat.cumplimientos[2].lider/100)
                    this.presupuesto.vendedores[g].ComisionesCop = this.presupuesto.vendedores[g].ComisionesCop + cat.ventas_cop *  (cat.cumplimientos[2].lider/100)
                  }
                  if(this.presupuesto.vendedores[g].rol == 'Gerente Ventas'){
                    this.presupuesto.vendedores[g].Comisiones = this.presupuesto.vendedores[g].Comisiones + cat.usd * (cat.cumplimientos[2].subGerente/100)
                    this.presupuesto.vendedores[g].ComisionesCop = this.presupuesto.vendedores[g].ComisionesCop + cat.ventas_cop *  (cat.cumplimientos[2].subGerente/100)
                  }
                }
                // this.totalCoisiones =  this.totalCoisiones + this.presupuesto.vendedores[g].Comisiones
                // this.totalCoisionesCOP = this.totalCoisionesCOP + this.presupuesto.vendedores[g].ComisionesCop  
              }
            }
          }
          this.getInformeCategorias(tag)
        }
        this.log = false;
        // //////////console.log(this.presupuesto)
      }
    )
  }

  passVendedor(item:any){
    let registro = {reg:item, coll:this.presupuesto.tag} 
    let dialogRef = this.dialog.open(DialogDataVendedor,{
      data: registro
    
    });

    dialogRef.afterClosed().subscribe(result => {

      //////////////console.log(result)
      if(result == item){
        //////////////console.log('igual')
      }else{
        //////////////console.log('cambio')
        // this.getDataCollections(this.key)
      }
      item = result
    })
  }

  getPresupuestosTag(tag:string){
    this._infoService.getPresupuestoTag(tag).subscribe(
      res=>{
        // console.log(res)
        this.presupuesto = res[0];
        this.getDataCollections(tag)
        // this.getInformePresupuestoVendedor(tag)
        this.getInformeVendedores(tag);
        this.getInformeCajeros(tag);
        ////console.log(this.presupuesto)
      }
    )
  }


  comisiones(item:any):any{
    ////////////console.log(item)
    if(item.categoras){
      let comis = 0
      for (let i = 0; i < item.categoras.length; i++) {
        const element = item.categoras[i];
        comis = comis + element.comisionesUs
      }
      return comis
    }
    
  }

  informe:any
  totalVendedores = 0;
  downloadVendedores:any[] = [];
  log = false;
  getInformeVendedores(tag:string){
    this.log = true;
    this._infoService.getInformeVendedor(tag).subscribe(
      res=>{
        this.totalVendedores = 0;
        this.single = [];
        this.downloadVendedores = [];
        this.informe = res
        console.log('informe',this.informe);
        // this.facturasVendedor(this.informe[0].Detalle)
        for (let index = 0; index <  this.informe.length; index++) {
          const element =  this.informe[index];
          element.folios = this.facturasVendedor(element.Detalle)
          this.totalVendedores = this.totalVendedores + element.Ventas;
          let obj = {
            "name": element.Vendedor[0],
            "value": element.Ventas
          }
          this.single.push(obj);
        
          this.downloadVendedores.push(
            {
              "Codigo": element._id,
              "Vendedor": element.Vendedor[0],              
              "USD": element.Ventas,
              "COP": element.VentasCop,
              "Unidades": element.Unidades,
              "Facturas": element.folios,
              "CostoVenta": element.Unidades,
              "item_promedio":  element.Ventas / element.Unidades,
              "fac_promedio":  element.Ventas / element.folios,

            }
          )
        }

        this.log = false;
      }
      
    )
  }

  informeCajeros:any
  totalCajeros = 0;
  downloadCajeros:any[] = [];

  getInformeCajeros(tag:string){
    this.log = true;
    this._infoService.getInformeCajeros(tag).subscribe(
      res=>{
        this.totalCajeros = 0;
        this.downloadCajeros = [];
        this.informeCajeros = res;
        // //console.log(this.informeCajeros)
        if(this.informeCajeros){
          for (let index = 0; index <  this.informeCajeros.length; index++) {
            const element =  this.informeCajeros[index];
            element.folios = this.facturasVendedor(element.Detalle)
            this.totalCajeros = this.totalCajeros + element.Ventas;    
            this.downloadCajeros.push(
              {
                "Codigo": element._id,          
                "USD": element.Ventas,
                "COP": element.VentasCop,
                "Unidades": element.Unidades,
                "Facturas": element.folios,
                "CostoVenta": element.Cost,
                "Cost_usd":element.Cost_usd,
                "item_promedio":  (element.Ventas / element.Unidades).toFixed(2),
                "fac_promedio":  (element.Ventas / element.folios).toFixed(2),
              }
            )
          }
        }
      
        this.log = false;
      }
      
    )
  }

  facturasVendedor(x:any[]){
        // ////console.log(x)
        var Indices = []

          for (var i = 0; i < x.length; i++) {
             let element = x[i]
             let pos= Indices.map(function(e:any) { return e; }).indexOf(element.folio);
             if(pos == -1){
              Indices.push(element.folio)
             } 
          }
          // ////console.log(Indices.length)
          return Indices.length
  }


  // cerrarPresupuesto(){
  //   let data = {titulo: 'Confirmaciòn', info:'Se Cerrara el Conteo esta seguro de procesar el cierre', type: 'Cancel', icon:'pan_tool'}
  
  //   let dialogRef = this.dialog.open(DialogConfirm,{
  //     data: data
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result){  
  //   this._infoService.offCollectionsInv(this.tag).subscribe(
  //     res=>{
  //       //console.log(res)
  //       // this.getCollectionsInventarios()
  //       window.location.reload();
  //     },err => {
  //       // this.getCollectionsInventarios()
  //       window.location.reload();

  //     });
  //   }
  //   })
  // }


  getInformePresupuestoVendedor(tag:string){
      this.log = true;
      this._infoService.getInformePresupuestoVendedor(tag).subscribe(
        res=>{
          // ////////////console.log(res)
          if(res){
            let informe:any = res
            for (let index = 0; index <  informe.length; index++) {
              const element =  informe[index];
                let pos = this.presupuesto.vendedores.map(function(e:any) { return e.Codigo; }).indexOf(element._id.cod);
                if(pos != -1){
                  for (let index = 0; index < this.presupuesto.vendedores[pos].categorias.length; index++) {
                    let cat = this.presupuesto.vendedores[pos].categorias[index];
                       let pos2 = cat.subscat.map(function(e:any) { return e; }).indexOf(element.cod_categ);
                        // ////////////console.log(pos)
                       if(pos2 != -1){
                         cat.ventas = element.Ventas
                         cat.comisionesUsd = element.Ventas * (this.presupuesto.vendedores[pos].categorias[index].cumplimientos[2].asesor/100)
                      }
                    // let pos2 = element.map(function(e:any) { return e; }).indexOf(detalle.cod_categ);
                  }
                }
  
                // ////////////console.log(element)
              
            }
          }
        
        })
  }

  informeCateg:any
  totalCategoria = 0;
  totalCategoriaCop = 0;
  totalCategoriaUnd = 0;
  totalCategoriaCosto = 0;
  totalCoisionesCOP = 0;
  getInformeCategorias2(tag:string){
    this.totalCategoria = 0;
    this.totalCategoriaCop = 0;
    this.totalCategoriaUnd = 0;
    this.totalCategoriaCosto = 0;
  
    this._infoService.getInformeCategorias(tag).subscribe(
      res=>{
        //console.log(res);
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
            let pos = elemento.subscat.map(function(e:any) { return e; }).indexOf(parseInt(element.Codigo[0]));
            if(pos != -1){
              elemento.ventas =   elemento.ventas + element.Ventas
              break
            }
          }

          this.dataPresupuest();
        }
      }
       
        // // ////////////console.log(this.multy)
      }
    )
  }

  getInformeCategorias3(tag:string){
    this.log =  true
    this.totalCategoria = 0;
    this.totalCategoriaCop = 0;
    this.totalCategoriaUnd = 0;
    this.totalCategoriaCosto = 0;
  
    this._infoService.getInformeCategorias(tag).subscribe(
      res=>{
        //////////console.log(res);
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
          this.dataPresupuest();
          // this.dataPresupuest();
        }
        // //////////console.log(this.presupuesto)
        // this.totalCoisiones =0
        // this.totalCoisionesCOP =0
        //   for (let g = 0; g < this.presupuesto.vendedores.length; g++) {
        //     // const element = this.presupuesto.vendedores[g];
        //     if(this.presupuesto.vendedores[g].rol == 'Lider'){
        //       // //////////console.log(this.presupuesto.vendedores[g].rol)
        //       let categ = JSON.stringify(this.presupuesto.categorias)
        //       this.presupuesto.vendedores[g].categorias = JSON.parse(categ)
        //       this.presupuesto.vendedores[g].USD = this.presupuesto.presupuesto_usd
        //       this.presupuesto.vendedores[g].Ventas = this.presupuesto.ventas_usd
        //       // this.presupuesto.vendedores[g].COP = this.presupuesto.ventas_usd
        //       this.presupuesto.vendedores[g].Cumplimiento = this.presupuesto.ventas_usd / this.presupuesto.presupuesto_usd
              
        //       for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
        //         const cat = this.presupuesto.vendedores[g].categorias[t];
        //         // //////////console.log(cat)
              
        //         if(cat.cumplimiento >= 1.2){
        //           // //////////console.log('entro 1')
        //           cat.comisionesUsd = cat.ventas * (cat.cumplimientos[2].lider/100)
        //           cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[2].lider/100))
        //           // //////////console.log(cat.comisionesCop)
        //           // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
        //         }else{
        //           if(cat.cumplimiento <= 1){
        //             // //////////console.log('entro 2')
        //             cat.comisionesUsd = cat.ventas * (cat.cumplimientos[1].lider/100)
        //             cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[1].lider/100))
        //             // //////////console.log(cat.comisionesCop)
        //             // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
        //           }else{
        //             if(cat.cumplimiento >= 0.1){
        //               // //////////console.log('entro 3')
        //               cat.comisionesUsd = cat.ventas * (cat.cumplimientos[0].lider/100)
        //               cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[0].lider/100))
        //               // //////////console.log(cat.comisionesCop)
        //               // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
        //             }
        //           }
        //         }
        //         // //////////console.log(cat)
        //         this.presupuesto.vendedores[g].Comisiones =  this.presupuesto.vendedores[g].Comisiones + cat.comisionesUsd
        //         this.presupuesto.vendedores[g].ComisionesCop =  this.presupuesto.vendedores[g].ComisionesCop + cat.comisionesCop
        //         this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
        //         this.totalCoisionesCOP = this.totalCoisionesCOP + cat.comisionesCop
        //       }
        //       // //////////console.log(this.presupuesto.vendedores[g])
        //     }

        //     if(this.presupuesto.vendedores[g].rol == 'Sub Gerente'){
        //       // //////////console.log(this.presupuesto.vendedores[g].rol)
        //       let categ = JSON.stringify(this.presupuesto.categorias)
        //       this.presupuesto.vendedores[g].categorias = JSON.parse(categ)
        //       this.presupuesto.vendedores[g].USD = this.presupuesto.presupuesto_usd
        //       this.presupuesto.vendedores[g].Ventas = this.presupuesto.ventas_usd
        //       // this.presupuesto.vendedores[g].COP = this.presupuesto.ventas_usd
        //       this.presupuesto.vendedores[g].Cumplimiento = this.presupuesto.ventas_usd / this.presupuesto.presupuesto_usd
              
        //       for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
        //         const cat = this.presupuesto.vendedores[g].categorias[t];
        //         // //////////console.log(cat)
              
        //         if(cat.cumplimiento >= 1.2){
        //           // //////////console.log('entro 1')
        //           cat.comisionesUsd = cat.ventas * (cat.cumplimientos[2].subGerente/100)
        //           cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[2].subGerente/100))
        //           // //////////console.log(cat.comisionesCop)
        //           // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
        //         }else{
        //           if(cat.cumplimiento <= 1){
        //             // //////////console.log('entro 2')
        //             cat.comisionesUsd = cat.ventas * (cat.cumplimientos[1].subGerente/100)
        //             cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[1].subGerente/100))
        //             // //////////console.log(cat.comisionesCop)
        //             // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
        //           }else{
        //             if(cat.cumplimiento >= 0.1){
        //               // //////////console.log('entro 3')
        //               cat.comisionesUsd = cat.ventas * (cat.cumplimientos[0].subGerente/100)
        //               cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[0].subGerente/100))
        //               // //////////console.log(cat.comisionesCop)
        //               // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
        //             }
        //           }
        //         }
        //         // //////////console.log(cat)
        //         this.presupuesto.vendedores[g].Comisiones =  this.presupuesto.vendedores[g].Comisiones + cat.comisionesUsd
        //         this.presupuesto.vendedores[g].ComisionesCop =  this.presupuesto.vendedores[g].ComisionesCop + cat.comisionesCop
        //         this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
        //         this.totalCoisionesCOP = this.totalCoisionesCOP + cat.comisionesCop
        //       }
        //       // //////////console.log(this.presupuesto.vendedores[g])
        //     }

        //     if(this.presupuesto.vendedores[g].rol == 'Gerente'){
        //       //////////console.log(this.presupuesto.vendedores[g].rol)
        //       let categ = JSON.stringify(this.presupuesto.categorias)
        //       this.presupuesto.vendedores[g].categorias = JSON.parse(categ)
        //       this.presupuesto.vendedores[g].USD = this.presupuesto.presupuesto_usd
        //       this.presupuesto.vendedores[g].Ventas = this.presupuesto.ventas_usd
        //       // this.presupuesto.vendedores[g].COP = this.presupuesto.ventas_usd
        //       this.presupuesto.vendedores[g].Cumplimiento = this.presupuesto.ventas_usd / this.presupuesto.presupuesto_usd
              
        //       for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
        //         const cat = this.presupuesto.vendedores[g].categorias[t];
        //         //////////console.log(cat)
              
        //         if(cat.cumplimiento >= 1.2){
        //           //////////console.log('entro 1')
        //           cat.comisionesUsd = cat.ventas * (cat.cumplimientos[2].gerente/100)
        //           cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[2].gerente/100))
        //           //////////console.log(cat.comisionesCop)
        //           // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
        //         }else{
        //           if(cat.cumplimiento <= 1){
        //             //////////console.log('entro 2')
        //             cat.comisionesUsd = cat.ventas * (cat.cumplimientos[1].gerente/100)
        //             cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[1].gerente/100))
        //             //////////console.log(cat.comisionesCop)
        //             // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
        //           }else{
        //             if(cat.cumplimiento >= 0.1){
        //               //////////console.log('entro 3')
        //               cat.comisionesUsd = cat.ventas * (cat.cumplimientos[0].gerente/100)
        //               cat.comisionesCop = (cat.ventasCop * (cat.cumplimientos[0].gerente/100))
        //               //////////console.log(cat.comisionesCop)
        //               // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
        //             }
        //           }
        //         }
        //         //////////console.log(cat)
        //         this.presupuesto.vendedores[g].Comisiones =  this.presupuesto.vendedores[g].Comisiones + cat.comisionesUsd
        //         this.presupuesto.vendedores[g].ComisionesCop =  this.presupuesto.vendedores[g].ComisionesCop + cat.comisionesCop
        //         this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
        //         this.totalCoisionesCOP = this.totalCoisionesCOP + cat.comisionesCop
        //       }
        //       // //////////console.log(this.presupuesto.vendedores[g])
        //     }

        //     if(this.presupuesto.vendedores[g].rol == 'Ventas'){
        //       // //////////console.log(this.presupuesto.vendedores[g])
        //       for (let t = 0; t < this.presupuesto.vendedores[g].categorias.length; t++) {
        //         const cat = this.presupuesto.vendedores[g].categorias[t];
        //         this.presupuesto.vendedores[g].ComisionesCop =  this.presupuesto.vendedores[g].ComisionesCop + cat.comisionesCop
        //         this.presupuesto.vendedores[g].Comisiones =  this.presupuesto.vendedores[g].Comisiones + cat.comisionesUsd
        //         this.totalCoisiones =  this.totalCoisiones + cat.comisionesUsd
        //         this.totalCoisionesCOP = this.totalCoisionesCOP + cat.comisionesCop
        //       }
        //     }
            
        //   }

          this.presupuesto.vendedores.sort(function(a, b){
            return b.USD - a.USD;
          });
          this.log =  false
          this.dataPresupuest();
      }
      })
     

  }

  getInformeCategorias(tag:string){
    this.totalCategoria = 0;
    this.totalCategoriaCop = 0;
    this.totalCategoriaUnd = 0;
    this.totalCategoriaCosto = 0;
    this.totalCoisiones=0
    this.totalCoisionesCOP = 0
  
    this._infoService.getInformeCategorias(tag).subscribe(
      res=>{
        //console.log(res);
        if(res){
        this.informeCateg = res;
        for (let index = 0; index <  this.informeCateg.length; index++) {
          const element =  this.informeCateg[index];
          this.totalCategoria = this.totalCategoria + element.Ventas
          this.totalCategoriaCop = this.totalCategoriaCop + element.Cop
          this.totalCategoriaUnd = this.totalCategoriaUnd + element.Unidades
          this.totalCategoriaCosto = this.totalCategoriaCosto + element.Cost
          for (let r = 0; r < this.presupuesto.categorias.length; r++) {
            const elemento = this.presupuesto.categorias[r];
            let pos = elemento.subscat.map(function(e:any) { return e; }).indexOf(parseInt(element._id));
            if(pos != -1){
              elemento.ventas =   elemento.ventas + element.Ventas
              elemento.ventasCop = element.Cop
              elemento.cumplimiento =   elemento.ventas / elemento.presupuesto_usd
              break
            }
          }
          this.dataPresupuest();
        }
      }
        for (let g = 0; g < this.presupuesto.vendedores.length; g++) {
          
          this.totalCoisiones =  this.totalCoisiones + this.presupuesto.vendedores[g].Comisiones
          this.totalCoisionesCOP = this.totalCoisionesCOP + this.presupuesto.vendedores[g].ComisionesCop

          let reg = {
            rol:this.presupuesto.vendedores[g].rol,
            identificacion:this.presupuesto.vendedores[g].identificacion,
            nombres:this.presupuesto.vendedores[g].name,
            codigo:this.presupuesto.vendedores[g].codigo,
            contrato:this.presupuesto.vendedores[g].contrato,
            presupuesto: Math.round(this.presupuesto.vendedores[g].USD),
            ventas: Math.round(this.presupuesto.vendedores[g].Ventas),
            cumplimiento:Math.round(this.presupuesto.vendedores[g].Cumplimiento * 100),
            comisionesUSD:Math.round(this.presupuesto.vendedores[g].Comisiones),
            comisionesCOP:Math.round(this.presupuesto.vendedores[g].ComisionesCop),
            dias_programados:this.presupuesto.vendedores[g].Dias
          }
          this.downloadComisiones.push(reg)
        }
      })

  }


  exportexcelCumplimiento() {
    /**passing table id**/
    let data = document.getElementById('table-data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    /**Generate workbook and add the worksheet**/
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /*save to file*/
    XLSX.writeFile(wb,'INFORVE VENDEDORES '+this.coleccion+'.xlsx');
  }

  dataPresupuest(){
    this.multy = [];
    for (let t = 0; t < this.presupuesto.categorias.length; t++) {
      const element = this.presupuesto.categorias[t];

      this.multy.push(
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
  }


  informeCategTieda:any
  totalTiendaAund = 0;
  totalTiendaDund = 0;
  totalTiendaA = 0;
  costoTiendaA = 0;
  totalTiendaD = 0;
  costoTiendaD = 0;
  totalTiendaAUsd = 0;
  totalTiendaDUsd = 0;
  getInformeCategoriasTienda(tag:string){
    this.totalTiendaA = 0;
    this.totalTiendaD = 0;
    this.costoTiendaA = 0;
    this.costoTiendaD = 0;
    this.totalTiendaAund = 0;
    this.totalTiendaDund = 0;
    this.totalTiendaAUsd = 0;
    this.totalTiendaDUsd = 0;
    this._infoService.getInformeCategoriasTienda(tag).subscribe(
      res=>{
        this.informeCategTieda = res;
        console.log(res);
        for (let index = 0; index <  this.informeCategTieda.length; index++) {
          const element =  this.informeCategTieda[index];
          // // ////////////console.log(element.PDV)
          if(element._id.pv == 'MDE A'){
            this.totalTiendaA =  this.totalTiendaA + element.Cop;
            this.costoTiendaA = this.costoTiendaA + element.Cost;
            this.totalTiendaAund =  this.totalTiendaAund + element.Unidades;
            this.totalTiendaAUsd = this.totalTiendaAUsd + element.Ventas
          }
          if(element._id.pv == 'MDE D'){
            this.totalTiendaD =  this.totalTiendaD + element.Cop;
            this.costoTiendaD = this.costoTiendaD + element.Cost;
            this.totalTiendaDund =  this.totalTiendaDund + element.Unidades;
            this.totalTiendaDUsd = this.totalTiendaDUsd + element.Ventas
          }    
        }
      }
    )
  }

  sortData(sort:any) {
    const data = this.informeCategTieda;
    if (!sort.active || sort.direction === '') {
      this.informeCategTieda = data;
      return;
    }

    this.informeCategTieda = data.sort((a: { PDV: string | number; _id: { pv: string | number; }; Unidades: number | number; Ventas: string | number; Cost: string | number; }, b: { PDV: string | number; _id: { pv: string | number; }; Unidades: string | number; Ventas: string | number; Cost: string | number; }) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'tienda':
          return this.compare(a.PDV, b.PDV, isAsc);
        case 'categoria':
          return this.compare(a._id.pv, b._id.pv, isAsc);
        case 'unds':
          return this.compare(a.Unidades, b.Unidades, isAsc);
        case 'ventas':
          return this.compare(a.Ventas, b.Ventas, isAsc);
        case 'costo':
          return this.compare(a.Cost, b.Cost, isAsc);
        default:
          return 0;
      }
    });
}


compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

  getInformeFolio(tag:string){
  
    this._infoService.getInformeFolio(tag).subscribe(
      (      res: any)=>{
        // this.informeCateg = res
        // // // ////////////console.log(res);
        // for (let index = 0; index <  this.informeCateg.length; index++) {
        //   const element =  this.informeCateg[index];
        //   this.totalCategoria = this.totalCategoria + element.Ventas
        //   this.totalCategoriaCop = this.totalCategoriaCop + element.Cop
        //   this.totalCategoriaUnd = this.totalCategoriaUnd + element.Unidades
        //   // this.single.push( {
        //   //   name: element._id,
        //   //   value: element.Ventas
        //   // })
        // }
        // // // // ////////////console.log(this.single)
      }
    )
  }

  view:[number, number] = [900, 600];
  viewBa: [number, number] = [900, 600];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;


  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';


  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'VENTAS';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'CATEGORIAS';
  legendTitle: string = 'Comparacion';


  onSelect(data: any): void {
    // // // // ////////////console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // // // // ////////////console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // // // // ////////////console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  passRegistro(item:any){
    // // // ////////////console.log(item)
  }




  downloadFile(data: any, title:string) {
    const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
  
    var a = document.createElement('a');
    var blob = new Blob([csvArray], {type: 'text/csv' }),
    url = window.URL.createObjectURL(blob);
  
    a.href = url;
    a.download = title+this.coleccion+".csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  search=''
  buscarRegistro(item:string){
   let ex = item.indexOf(this.search) >= 0
  //  //////////console.log(ex)
   if(ex){
    return true
   }else{
    return false
   }
   
   
  }

  
}




@Component({
  selector: 'app-dash-board-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DialogDataVendedor {
  motivos:any = [];
  keys:any = [];
  values:any = [];
  info:any;
  public editorOptions!: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;

  constructor(
    public _infoService:InfoService,
    public dialogRef: MatDialogRef<DialogDataVendedor>,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      ////////////////console.log(data)
      this.editorOptions = new JsonEditorOptions()
      this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

      this.keys = Object.keys(data.reg)
      this.values = Object.values(data.reg)
      this.info = data.reg

      this.ventasEmpleado(this.info)
      // ////////////////console.log(this.keys)
     }

     cancelar(){
      this.dialogRef.close(this.info);
    }

    totalEmpleado =0

    ventasEmpleado(item: any){
      this.totalEmpleado =0
      // for (let i = 0; i < item.Detalle.length; i++) {
      //   const element = item.Detalle[i];
      //   this.totalEmpleado =  this.totalEmpleado + element.valor        
      // }
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
      //////////////console.log(this.doc)
    }
  
    }
