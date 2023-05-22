export class NotaVenta {
    constructor(
        public _id:string = "",
        public consecutivo:number = 0,
        public prefix:string = "",
        public estado:string = "Activa",
        public tienda:string = "",
        public operacion:any= undefined,  
        public resolucion:string = "",
        public protocolo:string = "",
        public usuario:any = [],
        public cliente:any = [],
        public vendedor:any = [],
        public tienda_id:string = "",
        public info:string = "",
        public total:number = 0,

        public trm:number = 0,
        public mediosPago:any = [], 
        public productos:any=[],


        public created_at:Date = new Date,
        public update_at:Date = new Date,
    ){}
}



export class Cliente {

    constructor(
        public _id:string = "",
        public STEB_BAG:string = "",
        public TipoIdentificacion:string = "",
        public NIdentificacion:string = "",
        public Pasajero:string = "",
        public Direccion:string = "",
        public Origen:string = "",
        public Aerolinea:string = "",
        public Asiento:string = "",
        public Fecha:string = "",
        public Correo:string = "",
        public Destino:string = "",
        public Vuelo:string = "",
        public Nacionalidad:string = "",
        public Sexo:string = "",

    ){}
}