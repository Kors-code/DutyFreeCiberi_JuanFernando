export class Consecutivo {
    constructor(
        public _id:string = "",
        public prefix:string = "",
        public consecutivo:number = 1,
        public operacion:any= undefined,
        public resolucion:string = "",
        public protocolo:string = "",
        public tienda:string = "",
        public tienda_id:string = "",
        public info:string = "",
        public created_at:Date = new Date,
        public update_at:Date = new Date,
    ){}
}