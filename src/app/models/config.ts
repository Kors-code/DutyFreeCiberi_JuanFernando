import { Categoria, Categorias } from "./presupuesto";

export class Config{
    constructor(
            public _id: any = undefined,
            public siigoUser:string = '',  
            public siigoKey:string = '',  
            public cuentas:any[] = [],
            public comprobantes:any[]=[],
            public tags:any[] = [],
            public empleados:Empleado[] = [],
            public dataOperacion:DataOperacion = new DataOperacion(),
            public categorias:any[] = new Categorias().categorias,
            public tiendas:any[] = [],
            public inventarios:any[] = [],
            public emailSalida: string = '',
            public passEmailSalida: string = '',
            public notificar:any[] = [],
            public protocoloFacturacion:string = '',
            public operacion:string = '',
            public consecutivoCompCosto=0,
            public consecutivoCompVenta=0,
            public consecutivoCompCaja=0,
        ){}
}

export class DataOperacion {

    constructor(
        public identification_number: string = '',
        public dv: string = '',
        public business_name: string = '',
        public address: string = '',
        public city: string = '',
        public phone: string = '',
        public email: string = '',
        public trm_euro: number = 0,
        public trm_usd: number = 0,
    ){}
}


export class Empleado {
    constructor(
        public _id: any = undefined,
        public identificacion: any = 0,
        public contrato: any = 0,
        public codigo: string = '',
        public Dias: number = 0,
        public name: string = '',
        public email: string = '',
      
        public clave: string = '',
        public presupuestoUs: number = 0,
        public Cumplimiento: number = 0,
        public Comisiones: number = 0,
        public ComisionesCop: number = 0,
        public categorias: Categoria[] = [],
        public ptto: Categoria[] = [],
        
        public COP: number = 0,
        public Ventas: number = 0,
        public USD:number = 0,
        public rol:string = 'Ventas',
    ){}
}

export class Tienda {
    constructor(
        public _id: any = undefined,
        public tienda: string = '',
        public nombre: string = '',
        public centro_costos: string = '',
        public resolucion: string = '',
        public part: number = 0,
        public ptto:any[] = [],
        public presupuesto_usd: number = 0,
        public usd: number = 0,
        public cumplimientos:any[] = [],   
        public ventas_cop: number = 0,
        public presupuesto_cop: number = 0,  
    ){}
}

export class TerceroSiigo {
    constructor(
        public _id:number = 0,
        public titulo: string = '',
        public cuenta: number = 0,
        public centro_costos: number = 0,
        public id_tercero: number = 0,
        public descripcion: string = '',
        public due: boolean = false,
    ){}
}


export class ComprobanteSiigo {
    constructor(
        public _id:number = 0,
        public titulo: string = '',
        public idSiigo: number = 0,
        public descripcion: string = '',
    ){}
}


export class ItenmComprobanteSiigo {
    constructor(
       public account: any=[],
        public customer:any=[],
        public description:string= "",
        public cost_center: number= 0,
        public value: string= "", 
        public due:any ={
                date: '',
                prefix:'RC',
                consecutive:1,
                quote:1
            },
    ){}
}


export class Comprobante {
    constructor(
        public _id:any = undefined,
        public user:string='',
        public key:string='',
        public data: any[]=[],
        public date:string='',
        public iddoc:string='',
        public _idOperacionstring='',
        public obs: string='',
        public document:any=undefined,
        public id:any=undefined,
        public items:any=undefined,
        public metadata:any=undefined,
        public name:any=undefined,
        public number:any=undefined,
        public observations:any=undefined,

    ){}
}
