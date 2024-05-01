import { Proveedor } from "./proveedor";

export class Ordencompra {
    constructor(
        public _id:string = "",
        public consecutivo:number = 0,
        public estado:string = "Activa",
        public tienda:string = "",
        public operacion:any= undefined,  
        public protocolo:string = "",
        public proveedor:Proveedor = new Proveedor,
        public solicita_nombre:string = "",
        public solicita_cargo:string = "",
        public solicita_area:string = "",
        public cotizaciones:any = [],
        public total:number = 0,
        public impuestos:number = 0,
        public descuento:number = 0,

        public observaciones:string = "",
        public mediosPago:any = [], 
        public productos:any=[],
        public autorizaciones:any=[],
        public fecha_entrega:Date = new Date,
        public fecha_pago:Date = new Date,
        public condiciones_pago:string = "",

        public created_at:Date = new Date,
        public update_at:Date = new Date,
    ){}
}