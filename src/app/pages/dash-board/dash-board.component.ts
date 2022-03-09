import { Component, OnInit } from '@angular/core';
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
  constructor(public _infoService:InfoService,) {
    this.listColorSquema = colorSets
    this.presupuesto = new Presupuesto();
    this.colorScheme = this.listColorSquema[11]
    // // console.log(this.listColorSquema)
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
    // // console.log(item)
    this.colorScheme = item;
  }


  getCollections(){
    this._infoService.getCollections().subscribe(
      res=>{
        this.collections = res
        this.collections = this.collections.reverse();
        // // console.log(res)
      }
    )
  }

  coleccion = ''
  passDataCollections(doc:string){
    // // console.log(doc)
    this.coleccion = doc;
    this.getPresupuestosTag(doc);
    this.getInformeVendedores(doc);
    this.getInformeFolio(doc)
    this.getInformeCategoriasTienda(doc);
    this.getInformeCategorias(doc);
  }

  passVendedor(item:any){
    // // console.log(item)
  }

  getPresupuestosTag(tag:string){
    this._infoService.getPresupuestoTag(tag).subscribe(
      res=>{
        this.presupuesto = res[0];
        // console.log(res)
      }
    )
  }


  informe:any
  totalVendedores = 0;
  getInformeVendedores(tag:string){
    this._infoService.getInformeVendedor(tag).subscribe(
      res=>{
        this.totalVendedores = 0;
        this.single = [];
        this.informe = res
        console.log(res);
        for (let index = 0; index <  this.informe.length; index++) {
          const element =  this.informe[index];
          this.totalVendedores = this.totalVendedores + element.Ventas;
          let obj = {
            "name": element.Vendedor[0],
            "value": element.Ventas
          }
          this.single.push(obj);
        }
        // // console.log(this.single)

        
      }
    )
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
        this.informeCateg = res;
        
        // console.log(res);
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
       
        // console.log(this.multy)
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
        // console.log(res);
        for (let index = 0; index <  this.informeCategTieda.length; index++) {
          const element =  this.informeCategTieda[index];
          // console.log(element.PDV)
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
        // // console.log(res);
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
        // // // console.log(this.single)
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
    // // // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // // // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // // // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  passRegistro(item:any){
    // // console.log(item)
  }
}
