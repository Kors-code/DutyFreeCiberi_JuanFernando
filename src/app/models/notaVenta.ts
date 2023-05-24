export class NotaVenta {
    constructor(
        public _id:string = "",
        public consecutivo:number = 0,
        public prefix:string = "",
        public estado:string = "Activa",
        public folio:string = "",
        public tienda:string = "",
        public operacion:any= undefined,  
        public resolucion:string = "",
        public protocolo:string = "",
        public usuario:any = [],
        public cliente:any = undefined,
        public vendedor:any = [],
        public tienda_id:string = "",
        public info:string = "",
        public total:number = 0,
        public descuento:number = 0,

        public trm:number = 0,
        public trm_euro:number = 0,
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
        public pax:string = "",
        public scan:any = undefined
    ){}
}

export class MediosPago {
    constructor(
       public _id:number=0,
       public total:number=0,
       public restante:number=0,
       public recibido:number=0,
       public trm:number=0,
       public trm_euro:number=0,
       public cambio:number =0,
       public formaPagos:any[]=[
        {
            FormaPago:'CASH USD',
            Moneda:'USD',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:0
        },
        {
            FormaPago:'CASH COP',
            Moneda:'COP',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:1
        },
        {
            FormaPago:'CASH EUR',
            Moneda:'EUR',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:0
        },
        {
            FormaPago:'VISA COP',
            Moneda:'COP',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:1
        },
        {
            FormaPago:'MASTER COP',
            Moneda:'COP',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:1
        },
        {
            FormaPago:'AMEX COP',
            Moneda:'COP',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:1
        },
        {
            FormaPago:'DEBIT COP',
            Moneda:'COP',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:1
        },{
            FormaPago:'DINERS',
            Moneda:'COP',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:1
        },{
            FormaPago:'QR',
            Moneda:'COP',
            Importe:0,
            Cambio:0,
            ImportePago:0,
            Restante:0,
            TipoCambio:1
        }
       ]
    ){}
}

export class FormaPago {
    constructor(   
        public FormaPago:string = "",
        public Moneda:string = "",
        public Importe:number = 0,
        public Cambio:number = 0,
        public ImportePago:number = 0,
        public Restante:number = 0,
        public TipoCambio:number = 0,){}
}