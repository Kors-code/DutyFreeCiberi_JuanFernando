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
        public clave: string = '',
        public presupuestoUs: number = 0,
        public Cumplimiento: number = 0,
        public Comisiones: number = 0,
        public ComisionesCop: number = 0,
        public categorias: Categoria[] = [],
        public COP: number = 0,
        public Ventas: number = 0,
        public USD:number = 0,
        public rol:string = 'Ventas',
    ){}
}