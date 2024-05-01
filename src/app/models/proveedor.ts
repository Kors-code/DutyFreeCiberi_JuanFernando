export class Proveedor {
    constructor(
        public _id:string = "",
        public nit:string = "",
        public titulo:string = '',
        public telefono:string = "",
        public direccion:string = "",
        public ciudad:string = "",
        public contacto:string = "",

        public created_at:Date = new Date,
        public update_at:Date = new Date,
    ){}
}