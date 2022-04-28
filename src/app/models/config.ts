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
        ){}
}


export class Empleado {
    constructor(
        public _id: any = undefined,
        public identificacion: any = new Date().getTime(),
        public contrato: string = 'SD100',
        public codigo: string = '',
        public Dias: number = 0,
        public name: string = '',
        public presupuestoUs: number = 0,
        public Cumplimiento: number = 0,
        public Comisiones: number = 0,
        public ComisionesCop: number = 0,
        public categorias: Categoria[] = [],
        public COP: number = 0,
        public Ventas: number = 0,
        public USD:number = 0
    ){}
}