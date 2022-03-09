import { Component, OnInit, ViewChild } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  public editorOptions!: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;
  presupuesto:Presupuesto
  constructor(public _infoService:InfoService,) {
    this.presupuesto = new Presupuesto()
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
    console.log(this.presupuesto)
   }

  ngOnInit(): void {
    this.getPresupuestos()
  }

  

  pres:any
  getData(event:any){
   
    this.pres = event
    console.log(this.pres)
  }

  registerPresupuesto(){
    this.presupuesto._id = undefined;
    this._infoService.agregarPresupuesto(this.presupuesto).subscribe(
      res=>{
        console.log(res)
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
    console.log(this.pres)
    this._infoService.updatePresupuesto(this.presupuesto).subscribe(
      res=>{
        console.log(res)
        this.getPresupuestos()
      }
    )
  }

  deleteRegistro(){

  }

  passPresupuesto(item:any){
    this.presupuesto = item
  }

  Presupuestar(){
    this.presupuesto.presupuesto_dia_cop = this.presupuesto.presupuesto_cop / this.presupuesto.dias;
    this.presupuesto.presupuesto_dia_usd = this.presupuesto.presupuesto_usd / this.presupuesto.dias;

    this.presupuesto.categorias.forEach(element => {
      element.presupuesto_cop = this.presupuesto.presupuesto_cop * (element.participacion/100)
      element.presupuesto_usd = this.presupuesto.presupuesto_usd * (element.participacion/100)
      element.presupuesto_dia_usd = this.presupuesto.presupuesto_dia_usd * (element.participacion/100)
      element.presupuesto_dia_cop = this.presupuesto.presupuesto_dia_cop * (element.participacion/100)

    });
    console.log(this.presupuesto)
  }

}
