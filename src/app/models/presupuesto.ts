import { Empleado } from "./config";

export class Presupuesto {
    constructor(
        public _id: any = '',
        public tag: string = '',
        public estado: string = 'Activa',
        public ventas:number = 0,
        public comisiones:number =0,
        public ventas_usd:number = 0,
        public TRM:number = 0,
        public dias:number = 0,
        public capacidadVentas:number = 1,
        public presupuesto_cop:number = 0,
        public presupuesto_usd:number = 0,
        public presupuesto_dia_cop:number = 0,
        public presupuesto_dia_usd:number = 0,
        public cumplimiento_cop:number = 0,
        public cumplimiento_usd:number = 0,
        public tiendas:any[] = [],
        public vendedores:Empleado[] = [],
        public categorias:Categoria[] = new Categorias().categorias
    ){}
}

export class Categorias{
  constructor(
    public categorias:any[] = [
      {
        _id:new Date().getTime(),
        titulo:'Licores',
        participacion: 63.5,
        cumplimiento: 0,
        comisionesUsd:0,
        comisionesCop:0,
        ventas: 0,
        presupuesto_cop: 0,
        presupuesto_usd: 0,
        presupuesto_dia_cop: 0,
        presupuesto_dia_usd: 0,
        tiendas:[],
        detalle_ventas:[],
        subscat: [18],
        cumplimientos:[
            {
              inicia:0,
              finaliza:99.9,
              asesor: 0.50,
              asesorSking: 0,
              lider: 0.05,
              subGerente: 0.08,
              gerente: 0.16,
            },
            {
              inicia:100,
              finaliza:119.9,
              asesor: 0.80,
              asesorSking: 0,
              lider: 0.08,
              subGerente: 0.14,
              gerente: 0.19,
            },
            {
              inicia:120,
              finaliza:500,
              asesor: 1.00,
              asesorSking: 0,
              lider: 0.12,
              subGerente: 0.19,
              gerente: 0.22,
            }
         
        ]
      }, 
      {
        _id:new Date().getTime(),
          titulo:'Fragancias',
          participacion: 23,
          cumplimiento: 0,
          ventas: 0,
          comisionesUsd:0,
          comisionesCop:0,
          presupuesto_cop: 0,
          presupuesto_usd: 0,
          presupuesto_dia_cop: 0,
          presupuesto_dia_usd: 0,
          tiendas:[],
          detalle_ventas:[],
          subscat: [10, 11, 12],
          cumplimientos:[
              {
                inicia:0,
                finaliza:99.9,
                asesor: 0.70,
                asesorSking: 0,
                lider: 0.07,
                subGerente: 0.1,
                gerente: 0.20,
              },
              {
                inicia:100,
                finaliza:119.9,
                asesor: 1.6,
                asesorSking: 0,
                lider: 0.14,
                subGerente: 0.25,
                gerente: 0.30,
              },
              {
                inicia:120,
                finaliza:200,
                asesor: 2.10,
                asesorSking: 0,
                lider: 0.18,
                subGerente: 0.30,
                gerente: 0.40,
              }
           
          ]
      }, 
      {
        titulo:'Skin care',
        participacion: 2.5,
        cumplimiento: 0,
        ventas: 0,
        comisionesUsd:0,
        comisionesCop:0,
        presupuesto_cop: 0,
        presupuesto_usd: 0,
        presupuesto_dia_cop: 0,
        presupuesto_dia_usd: 0,
        tiendas:[],
        detalle_ventas:[],
        subscat: [13],
        cumplimientos:[
            {
              inicia:0,
              finaliza:99.9,
              asesor: 1.50,
              asesorSking: 2.5,
              lider: 0.15,
              subGerente: 0.18,
              gerente: 0.36,
            },
            {
              inicia:100,
              finaliza:119.9,
              asesor: 4.00,
              asesorSking: 3.00,
              lider: 0.30,
              subGerente: 0.45,
              gerente: 0.50,
            },
            {
              inicia:120,
              finaliza:200,
              asesor: 4.50,
              asesorSking: 3.50,
              lider: 0.35,
              subGerente: 0.50,
              gerente: 0.60,
            }
         
        ]
      },
      {
        _id:new Date().getTime(),
          titulo:'Tabaco',
          participacion: 6.5,
          cumplimiento: 0,
          ventas: 0,
          comisionesUsd:0,
          comisionesCop:0,
          presupuesto_cop: 0,
          presupuesto_usd: 0,
          presupuesto_dia_cop: 0,
          presupuesto_dia_usd: 0,
          tiendas:[],
          detalle_ventas:[],
          subscat: [17],
          cumplimientos:[
              {
                inicia:0,
                finaliza:99.9,
                asesor: 1.00,
                asesorSking: 0,
                lider: 0.10,
                subGerente: 0.13,
                gerente: 0.26,
              },
              {
                inicia:100,
                finaliza:119.9,
                asesor: 3.00,
                asesorSking: 0,
                lider: 0.20,
                subGerente: 0.35,
                gerente: 0.40,
              },
              {
                inicia:120,
                finaliza:200,
                asesor: 3.50,
                asesorSking: 0,
                lider: 0.25,
                subGerente: 0.40,
                gerente: 0.50,
              }
           
          ]
      },
      {
          _id:new Date().getTime(),
          titulo:'Relojes, Gafas y Joyería',
          participacion: 3.0,
          cumplimiento: 0,
          ventas: 0,
          comisionesUsd:0,
          comisionesCop:0,
          presupuesto_cop: 0,
          presupuesto_usd: 0,
          presupuesto_dia_cop: 0,
          presupuesto_dia_usd: 0,
          tiendas:[],
          detalle_ventas:[],
          subscat: [14, 15, 16],
          cumplimientos:[
              {
                inicia:0,
                finaliza:99.9,
                asesor: 1.50,
                asesorSking: 0,
                lider: 0.10,
                subGerente: 0.13,
                gerente: 0.26,
              },
              {
                inicia:100,
                finaliza:119.9,
                asesor: 3.70,
                asesorSking: 0,
                lider: 0.20,
                subGerente: 0.35,
                gerente: 0.40,
              },
              {
                inicia:120,
                finaliza:200,
                asesor: 4.20,
                asesorSking: 0,
                lider: 0.25,
                subGerente: 0.40,
                gerente: 0.50,
              }
          ]
      },
      {
        _id:new Date().getTime(),
          titulo:'Electrónicos y Gifts',
          cumplimiento: 0,
          participacion: 1.5,
          ventas: 0,
          comisionesUsd:0,
          comisionesCop:0,
          presupuesto_cop: 0,
          presupuesto_usd: 0,
          presupuesto_dia_cop: 0,
          presupuesto_dia_usd: 0,
          tiendas:[],
          detalle_ventas:[],
          subscat: [19, 21],
          cumplimientos:[
            {
              inicia:0,
              finaliza:99.9,
              asesor: 1.50,
              asesorSking: 0,
              lider: 0.10,
              subGerente: 0.13,
              gerente: 0.26,
            },
            {
              inicia:100,
              finaliza:119.9,
              asesor: 3.70,
              asesorSking: 0,
              lider: 0.20,
              subGerente: 0.35,
              gerente: 0.40,
            },
            {
              inicia:120,
              finaliza:200,
              asesor: 4.20,
              asesorSking: 0,
              lider: 0.25,
              subGerente: 0.40,
              gerente: 0.50,
            }
        ]
      }
  ]
  ){}
}

export class Categoria{
  constructor(
    public _id:number=0,
    public titulo:string='',
    public participacion:number= 63.5,
    public cumplimiento:number= 0,
    public comisionesUsd:number=0,
    public comisionesCop:number=0,
    public ventas:number= 0,
    public presupuesto_cop:number= 0,
    public presupuesto_usd:number= 0,
    public presupuesto_dia_cop:number= 0,
    public presupuesto_dia_usd:number= 0,
    public tiendas:[]=[],
    public detalle_ventas:[]=[],
    public subscat:number[]=[],
    public cumplimientos:Cumplimiento[] = []
  ){}
}

export class Cumplimiento{
  constructor(
      public inicia:number=0,
      public finaliza:number=99.9,
      public asesor:number= 0.50,
      public asesorSking:number= 0,
      public lider:number= 0.05,
      public subGerente:number= 0.08,
        
  ){}
}