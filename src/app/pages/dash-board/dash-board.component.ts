import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { ConnectableObservable } from 'rxjs';
import { Presupuesto } from 'src/app/models/presupuesto';
import { InfoService } from 'src/app/services/info.service';
import { colorSets } from './paleta';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  listColorSquema:any;
  colorScheme:any;
  presupuesto:Presupuesto
  constructor(public _infoService:InfoService,
    public dialog: MatDialog, @Inject(DOCUMENT) doc: any,) {
    this.listColorSquema = colorSets
    this.presupuesto = new Presupuesto();
    this.colorScheme = this.listColorSquema[11]
    // // // //console.log(this.listColorSquema)
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
    // this.getRegistros(1);
    this.getCollections();
  }

  cambiarColores(item:any){
    // // // //console.log(item)
    this.colorScheme = item;
  }


  getCollections(){
    this._infoService.getCollections().subscribe(
      res=>{
        this.collections = res
        this.collections = this.collections.reverse();
        // // //console.log(res)
      }
    )
  }

  coleccion = ''
  passDataCollections(doc:string){
    // // // //console.log(doc)
    this.coleccion = doc;
    
    this.getPresupuestosTag(doc);
    this.getInformeFolio(doc)
    this.getInformeCategoriasTienda(doc);
    this.getInformeCategorias(doc);

  }
  downloadComisiones:any = []
  dataColl:any = []
  totalCoisiones =0
  getDataCollections(tag:string){
    this.log = true;
    this._infoService.getDataCollections(tag).subscribe(
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
            let reg = {
              identificacion:this.presupuesto.vendedores[g].identificacion,
              nombres:this.presupuesto.vendedores[g].name,
              codigo:this.presupuesto.vendedores[g].codigo,
              contrato:this.presupuesto.vendedores[g].contrato,
              presupuesto:this.presupuesto.vendedores[g].USD,
              ventas:this.presupuesto.vendedores[g].Ventas,
              cumplimiento:this.presupuesto.vendedores[g].Cumplimiento,
              comisiones:this.presupuesto.vendedores[g].Comisiones

            }
            this.downloadComisiones.push(reg)
      
          }
          this.presupuesto.vendedores.sort(function(a, b){
            return b.USD - a.USD;
          });
        }
        this.log = false;
      }
    )
  }

  passVendedor(item:any){
    let registro = {reg:item, coll:this.presupuesto.tag} 
    let dialogRef = this.dialog.open(DialogDataVendedor,{
      data: registro
    
    });

    dialogRef.afterClosed().subscribe(result => {

      ////console.log(result)
      if(result == item){
        ////console.log('igual')
      }else{
        ////console.log('cambio')
        // this.getDataCollections(this.key)
      }
      item = result

    })
    //console.log(item)
  }

  getPresupuestosTag(tag:string){
    this._infoService.getPresupuestoTag(tag).subscribe(
      res=>{
        this.presupuesto = res[0];
        this.getDataCollections(tag)
        // this.getInformePresupuestoVendedor(tag)
        this.getInformeVendedores(tag);
        //console.log(this.presupuesto)
      }
    )
  }


  comisiones(item:any):any{
    //console.log(item)
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
        //console.log(res);
        for (let index = 0; index <  this.informe.length; index++) {
          const element =  this.informe[index];
          // //console.log(element)
          this.totalVendedores = this.totalVendedores + element.Ventas;
          let obj = {
            "name": element.Vendedor[0],
            "value": element.Ventas
          }
          this.single.push(obj);
          // //console.log(this.presupuesto);
          // let pos = this.presupuesto.vendedores.map(function(e:any) { return Number(e.codigo);}).indexOf(element._id);
          // if(pos != -1){
          //   // //console.log(this.presupuesto.vendedores[pos])
          //   this.presupuesto.vendedores[pos].Comisiones = 0;
          //   this.presupuesto.vendedores[pos].Ventas = element.Ventas;
          //   this.presupuesto.vendedores[pos].COP = element.VentasCop;
          //   this.presupuesto.vendedores[pos].Cumplimiento = (this.presupuesto.vendedores[pos].Ventas / this.presupuesto.vendedores[pos].USD)
          //   let listado = this.presupuesto.vendedores[pos].categorias;
          //   for (let x = 0; x < listado.length; x++) {
          //     const elements = listado[x].subscat;
          //     element.Detalle.forEach((detalle: { cod_categ: any; valorCop:number; ventas: number; valor: number; cumplimiento: number; presupuesto_usd: number; }) => {
          //       let importe = detalle.valor
          //       // //console.log('Importe ' +importe)
          //       let importeCop = detalle.valorCop
          //       let pos2 = elements.map(function(e:any) { return e; }).indexOf(detalle.cod_categ);
          //       // //console.log('posicion subcategoria '+ pos2)
          //       if(pos2 != -1){
          //         // //console.log('Ventas ' +listado[x].ventas)
          //         listado[x].ventas =  listado[x].ventas + importe;
          //         listado[x].cumplimiento =   listado[x].ventas / listado[x].presupuesto_usd
          //         // //console.log('Ventas' +listado[x].ventas)
          //         // //console.log('CUMPLIMIENTO ' +listado[x].cumplimiento)
          //         if(listado[x].cumplimiento >= 1.2){
          //           // //console.log('entro 1')
          //           listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[2].asesor/100)
          //           // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones + listado[x].comisionesUsd
          //         }else{
          //           if(listado[x].cumplimiento <= 1){
          //             // //console.log('entro 2')
          //             listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[1].asesor/100)
          //             // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
          //           }else{
          //             if(listado[x].cumplimiento <= 0.1){
          //               // //console.log('entro 3')
          //               listado[x].comisionesUsd = listado[x].ventas * (listado[x].cumplimientos[0].asesor/100)
          //               // this.presupuesto.vendedores[pos].Comisiones = this.presupuesto.vendedores[pos].Comisiones +listado[x].comisionesUsd
          //             }
          //           }
          //         }
          //       }
          //       // // //console.log(importe)
          //     });
          //       // // //console.log(detalle.cod_categ) 
          //   }
          // }
          this.downloadVendedores.push(
            {
              "Codigo": element._id,
              "Vendedor": element.Vendedor[0],              
              "USD": element.Ventas,
              "COP": element.VentasCop,
              "Unidades": element.Unidades,
              "CostoVenta": element.Unidades,

            }
          )
        }

        // for (let t = 0; t < this.presupuesto.vendedores.length; t++) {
        //   const element = this.presupuesto.vendedores[t];
        //   // //console.log(element)
          
        // }

        // // //console.log(this.presupuesto)
        this.log = false;
      }
    )
  }


  getInformePresupuestoVendedor(tag:string){
      this.log = true;
      this._infoService.getInformePresupuestoVendedor(tag).subscribe(
        res=>{
          // //console.log(res)
          if(res){
            let informe:any = res
            for (let index = 0; index <  informe.length; index++) {
              const element =  informe[index];
                let pos = this.presupuesto.vendedores.map(function(e:any) { return e.Codigo; }).indexOf(element._id.cod);
                if(pos != -1){
                  for (let index = 0; index < this.presupuesto.vendedores[pos].categorias.length; index++) {
                    let cat = this.presupuesto.vendedores[pos].categorias[index];
                       let pos2 = cat.subscat.map(function(e:any) { return e; }).indexOf(element.cod_categ);
                        // //console.log(pos)
                       if(pos2 != -1){
                         cat.ventas = element.Ventas
                         cat.comisionesUsd = element.Ventas * (this.presupuesto.vendedores[pos].categorias[index].cumplimientos[2].asesor/100)
                      }
                    // let pos2 = element.map(function(e:any) { return e; }).indexOf(detalle.cod_categ);
                  }
                }
  
                // //console.log(element)
              
            }
          }
        
        })
  }

  informeCateg:any
  totalCategoria = 0;
  totalCategoriaCop = 0;
  totalCategoriaUnd = 0;
  totalCategoriaCosto = 0
  getInformeCategorias(tag:string){
    this.totalCategoria = 0;
    this.totalCategoriaCop = 0;
    this.totalCategoriaUnd = 0;
    this.totalCategoriaCosto = 0;
  
    this._infoService.getInformeCategorias(tag).subscribe(
      res=>{
        // //console.log(res);
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
              break
            }
          }

          this.dataPresupuest();
        }
      }
       
        // // //console.log(this.multy)
      }
    )
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
        // // //console.log(res);
        for (let index = 0; index <  this.informeCategTieda.length; index++) {
          const element =  this.informeCategTieda[index];
          // // //console.log(element.PDV)
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
        // // // //console.log(res);
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
        // // // // //console.log(this.single)
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
    // // // // //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // // // // //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // // // // //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  passRegistro(item:any){
    // // // //console.log(item)
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
  //  console.log(ex)
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
      //////console.log(data)
      this.editorOptions = new JsonEditorOptions()
      this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

      this.keys = Object.keys(data.reg)
      this.values = Object.values(data.reg)
      this.info = data.reg

      this.ventasEmpleado(this.info)
      // //////console.log(this.keys)
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
      ////console.log(this.doc)
    }
  
    }
