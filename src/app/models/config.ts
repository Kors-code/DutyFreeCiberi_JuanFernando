import { Categoria, Categorias } from "./presupuesto";

export class Config{
    constructor(
            public _id: any = undefined,
            public siigoUser:string = '',  
            public siigoKey:string = '',  
            public tags:any[] = [],
            public empleados:Empleado[] = [],
            public categorias:any[] = new Categorias().categorias,
            public tiendas:any[] = [],
            public inventarios:any[] = [],
            public emailSalida: string = '',
            public passEmailSalida: string = '',
            public notificar:any[] = [],
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
        public part: number = 0,
        public ptto:any[] = [],
        public presupuesto_usd: number = 0,
        public usd: number = 0,
        public cumplimientos:any[] = [],   
        public ventas_cop: number = 0,
        public presupuesto_cop: number = 0,  
    ){}
}