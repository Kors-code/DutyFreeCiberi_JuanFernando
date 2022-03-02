import { Component, OnInit, ViewChild } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  public editorOptions!: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent | undefined;
  presupuesto:Presupuesto
  constructor() {
    this.presupuesto = new Presupuesto()
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
    console.log(this.presupuesto)
   }

  ngOnInit(): void {
  }

  getData(event:any){
    console.log(event)
  }

}
