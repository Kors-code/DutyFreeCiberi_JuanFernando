import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPvconfigFacElectronica } from 'src/app/models/facturacionElectronica';
import { Operacion } from 'src/app/models/operacion';
import { FacturaElectronicaService } from 'src/app/services/facturacionElectronica.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  public identity:any;
  public pOperacion:Operacion;
  public facturacionElectronica:AdminPvconfigFacElectronica;
  public cufe = '';
  public response:any;
  constructor(private _router: Router,
    private _userService:UserService, private _facturaElectronicaService:FacturaElectronicaService) {
      this.pOperacion= this._userService.getPredetermidaOperacion();
      this.facturacionElectronica = new AdminPvconfigFacElectronica();
   
   }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getElectronica()
  }

  
  getFacturacionStatus(cufe:string){
    this.response=undefined;
    let register = {
      token:this.facturacionElectronica.token,
      cufe:cufe,
      data:{
        sendmail: false,
        sendmailtome: false
      }
    }

    this._facturaElectronicaService.statusDocumentCufe(register).subscribe(
      res=>{
          console.log(res)
        this.response = res.ResponseDian.Envelope.Body.GetStatusResponse.GetStatusResult;
        console.log(this.response)
        this.cufe = ''
      }, err=>{
        console.log(err.error.text)
        let message = JSON.parse(err.error.text) 

       
      }
    )

  }
  

  getElectronica(){
    this._facturaElectronicaService.getElectronica().subscribe(
      res=>{
        if(res._id){
          this.facturacionElectronica = res;
        
        }
      }
    )
  }
 
}
