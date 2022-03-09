export class Presupuesto {
    constructor(
        public _id: any = '',
        public tag: string = '',
        public estado: string = 'Activa',
        public ventas:number = 0,
        public ventas_usd:number = 0,
        public dias:number = 0,
        public presupuesto_cop:number = 0,
        public presupuesto_usd:number = 0,
        public presupuesto_dia_cop:number = 0,
        public presupuesto_dia_usd:number = 0,
        public cumplimiento_cop:number = 0,
        public cumplimiento_usd:number = 0,
        public tiendas:[] = [],
        
        public categorias:any[] = [
            {
              titulo:'Licores',
              participacion: 64.5,
              cumplimiento: 0,
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
                    asesor: 0.05,
                    asesorSking: 0,
                    lider: 0.05,
                    subGerente: 0.08,
                    gerente: 0.16,
                  },
                  {
                    inicia:100,
                    finaliza:119.9,
                    asesor: 0.08,
                    asesorSking: 0,
                    lider: 0.08,
                    subGerente: 0.014,
                    gerente: 0.19,
                  },
                  {
                    inicia:120,
                    finaliza:200,
                    asesor: 1.00,
                    asesorSking: 0,
                    lider: 0.12,
                    subGerente: 0.19,
                    gerente: 0.22,
                  }
               
              ]
            }, 
            {
                titulo:'Fragancias',
                participacion: 24,
                cumplimiento: 0,
                ventas: 0,
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
                      asesor: 0.05,
                      asesorSking: 0,
                      lider: 0.05,
                      subGerente: 0.08,
                      gerente: 0.16,
                    },
                    {
                      inicia:100,
                      finaliza:119.9,
                      asesor: 0.08,
                      asesorSking: 0,
                      lider: 0.08,
                      subGerente: 0.014,
                      gerente: 0.19,
                    },
                    {
                      inicia:120,
                      finaliza:200,
                      asesor: 1.00,
                      asesorSking: 0,
                      lider: 0.12,
                      subGerente: 0.19,
                      gerente: 0.22,
                    }
                 
                ]
            }, {
              titulo:'Skin care',
              participacion: 2.5,
              cumplimiento: 0,
              ventas: 0,
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
                    asesor: 0.05,
                    asesorSking: 0,
                    lider: 0.05,
                    subGerente: 0.08,
                    gerente: 0.16,
                  },
                  {
                    inicia:100,
                    finaliza:119.9,
                    asesor: 0.08,
                    asesorSking: 0,
                    lider: 0.08,
                    subGerente: 0.014,
                    gerente: 0.19,
                  },
                  {
                    inicia:120,
                    finaliza:200,
                    asesor: 1.00,
                    asesorSking: 0,
                    lider: 0.12,
                    subGerente: 0.19,
                    gerente: 0.22,
                  }
               
              ]
          },
            {
                titulo:'Tabaco',
                participacion: 5,
                cumplimiento: 0,
                ventas: 0,
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
                      asesor: 0.05,
                      asesorSking: 0,
                      lider: 0.05,
                      subGerente: 0.08,
                      gerente: 0.16,
                    },
                    {
                      inicia:100,
                      finaliza:119.9,
                      asesor: 0.08,
                      asesorSking: 0,
                      lider: 0.08,
                      subGerente: 0.014,
                      gerente: 0.19,
                    },
                    {
                      inicia:120,
                      finaliza:200,
                      asesor: 1.00,
                      asesorSking: 0,
                      lider: 0.12,
                      subGerente: 0.19,
                      gerente: 0.22,
                    }
                 
                ]
            },
            {
                titulo:'Relojes, Gafas y Joyería',
                participacion: 2.5,
                cumplimiento: 0,
                ventas: 0,
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
                      asesor: 0.05,
                      asesorSking: 0,
                      lider: 0.05,
                      subGerente: 0.08,
                      gerente: 0.16,
                    },
                    {
                      inicia:100,
                      finaliza:119.9,
                      asesor: 0.08,
                      asesorSking: 0,
                      lider: 0.08,
                      subGerente: 0.014,
                      gerente: 0.19,
                    },
                    {
                      inicia:120,
                      finaliza:200,
                      asesor: 1.00,
                      asesorSking: 0,
                      lider: 0.12,
                      subGerente: 0.19,
                      gerente: 0.22,
                    }
                ]
            },
            {
                titulo:'Electrónicos y Gifts',
                cumplimiento: 0,
                participacion: 1.5,
                ventas: 0,
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
                      asesor: 0.05,
                      asesorSking: 0,
                      lider: 0.05,
                      subGerente: 0.08,
                      gerente: 0.16,
                    },
                    {
                      inicia:100,
                      finaliza:119.9,
                      asesor: 0.08,
                      asesorSking: 0,
                      lider: 0.08,
                      subGerente: 0.014,
                      gerente: 0.19,
                    },
                    {
                      inicia:120,
                      finaliza:200,
                      asesor: 1.00,
                      asesorSking: 0,
                      lider: 0.12,
                      subGerente: 0.19,
                      gerente: 0.22,
                    }
                 
                ]
            }
        ]
    ){}
}