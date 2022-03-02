import { Component, OnInit } from '@angular/core';
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
  constructor(public _infoService:InfoService,) {
    this.listColorSquema = colorSets
    this.colorScheme = this.listColorSquema[11]
    console.log(this.listColorSquema)
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

  ngOnInit(): void {
    // this.getRegistros(1);
    this.getCollections();
  }

  cambiarColores(item:any){
    console.log(item)
    this.colorScheme = item;
  }


  getCollections(){
    this._infoService.getCollections().subscribe(
      res=>{
        this.collections = res
        this.collections = this.collections.reverse();
        console.log(res)
      }
    )
  }

  passDataCollections(doc:string){
    console.log(doc)
    this.getInformeCategorias(doc);
    this.getInformeVendedores(doc);
    this.getInformeFolio(doc)
  }

  passVendedor(item:any){
    console.log(item)
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
        console.log(this.single)

        
      }
    )
  }

  informeCateg:any
  totalCategoria = 0;
  totalCategoriaCop = 0;
  totalCategoriaUnd = 0;
  getInformeCategorias(tag:string){
    this.totalCategoria = 0;
    this.totalCategoriaCop = 0;
    this.totalCategoriaUnd = 0;
    this._infoService.getInformeCategorias(tag).subscribe(
      res=>{
        this.informeCateg = res
        console.log(res);
        for (let index = 0; index <  this.informeCateg.length; index++) {
          const element =  this.informeCateg[index];
          this.totalCategoria = this.totalCategoria + element.Ventas
          this.totalCategoriaCop = this.totalCategoriaCop + element.Cop
          this.totalCategoriaUnd = this.totalCategoriaUnd + element.Unidades
          // this.single.push( {
          //   name: element._id,
          //   value: element.Ventas
          // })
        }
        // console.log(this.single)
      }
    )
  }


  getInformeFolio(tag:string){
  
    this._infoService.getInformeFolio(tag).subscribe(
      res=>{
        // this.informeCateg = res
        console.log(res);
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
        // console.log(this.single)
      }
    )
  }


  view:[number, number] = [900, 600];
  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';


  

  


  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  passRegistro(item:any){
    console.log(item)
  }
}
