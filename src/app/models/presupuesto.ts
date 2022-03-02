export class Presupuesto {
    constructor(
        public _id: string = '',
        public tag: string = '',
        public ventas:number = 0,
        public estado: string = 'Activa',
        public presupuesto:number = 0,
        public categorias:any[] = [
            {
              titulo:'Licores',
              participacion: 0,
              ventas: 0,
              presupuesto: 0,
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
                participacion: 0,
                ventas: 0,
                presupuesto: 0,
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
            },
            {
                titulo:'Tabaco',
                participacion: 0,
                ventas: 0,
                presupuesto: 0,
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
                participacion: 0,
                ventas: 0,
                presupuesto: 0,
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
                participacion: 0,
                ventas: 0,
                presupuesto: 0,
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