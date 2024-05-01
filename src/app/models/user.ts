
export class User{

    constructor(
        public _id: any = undefined,
        public identificacion: string = '',
        public name: string = '',
        public surname: string = '',
        public email: string = '',
        public password: string = '',
        public estado: string = '',
        public image:string= 'assets/m.svg',
        public portada:string= '',
        public color:string= '',
        public cargo:string= '',
        public perfil:string= '',
        public origen:string= '',
        public rol:string= '',
        public company: any[] = [],
        public confirm:boolean=  false,
        public created_at:Date = new Date(),
        public update_at:Date = new Date(),
        public modulos:any[] = [],
        public operaciones:any[] = []
    ){ }  


}

 export class credencial {
            
        constructor(
            public modulo: string = '',
            public add: boolean = false,
            public edit: boolean = false,
            public see: boolean = false,
            public delet: boolean = false){}
}

export class Imagen {
    
constructor(
    public Location: string = '',
    public Key: string = '',
    public Bucket: string = ''
){}
}


export class Permisos {   
    constructor(
        public permisos:Object[] = [
            {   titulo:"Configuracion",
                description:"Variables de Configuracion",
                link:'/Configuracion',
                img:'config.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },
            {   
                titulo:"Facturación Electrónica",
                description:"Trasmision de informacion",
                link:'/Electronica',
                img:'electronica.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },
            {   
                titulo:"Validacion Electronica",
                description:"Revision estatus ",
                link:'/Validacion',
                img:'validacion.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },{   
                titulo:"Facturación POS",
                description:"Documentos Manuales",
                link:'/Pos',
                img:'pos.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },{   
                titulo:"Ordenes de Compra",
                description:"Solicitudes de compras",
                link:'/Compras',
                img:'ordenes.svg',
                editar:true,
                eliminar:true,
                escribir:true,
                autoriza:false,
            },
            {   
                titulo:"Usuarios",
                description:"Gestion de Usuarios",
                link:'/Users',
                img:'users.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },{   
                titulo:"Cambiar Contraseña",
                description:"Actualiza las credenciales de acceso",
                link:'/Pass',
                img:'pass.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },{   
                titulo:"Importar Datos",
                description:"Sube la informacion a procesar",
                link:'/import-Data',
                img:'file.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },{   
                titulo:"Bases De Datos",
                description:"Consulta los registros generados",
                link:'/Data-Base',
                img:'data.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },
            {   
                titulo:"Dash Bord",
                description:"Cumplimiento Presupuestal",
                link:'/Dash-Board',
                img:'dash.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },{   
                titulo:"Metas y Presupuestos",
                description:"Planeacion y parametrizacaion de cumplimientos",
                link:'/Metas-Presupuestos',
                img:'metas.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },
            {   
                titulo:"Siigo",
                description:"Gestiona la conexion de informacion a plataforma Siigo",
                link:'/Siigo-conection',
                img:'siigo.png',
                editar:true,
                eliminar:true,
                escribir:true,
            },
            {   
                titulo:"Comprobantes SIIGO",
                description:"Gestiona la  de Comprobantes a plataforma Siigo",
                link:'/Siigo-comprobantes',
                img:'doc.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },
            {   
                titulo:"Cumplimiento",
                description:"Resultados y tendencia de cumplimiento ",
                link:'/Cumplimieto',
                img:'cumplimiento.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },
            {   
                titulo:"Inventarios",
                description:"Tomas de Inventario ",
                link:'/inventarios',
                img:'inventario.svg',
                historico:true,
                importar:true,
                panel:true,
                toma:true,
            }, 
            // {   
            //     titulo:"Cambios de Precio",
            //     description:"Registro y cambio de habladores de Precio",
            //     link:'/Precios',
            //     img:'precios.svg',
            //     editar:true,
            //     eliminar:true,
            //     escribir:true,
            // },
            {   
                titulo:"Informes Personalizados",
                description:"Informes a la medida",
                link:'/Informes',
                img:'informes.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            },

            {   
                titulo:"Operaciones",
                description:"Gestion de centros de trabajo",
                link:'/Operaciones',
                img:'airport.svg',
                editar:true,
                eliminar:true,
                escribir:true,
            }
           
             
        ]
    ){}
    }

    export class Funcionalidad{
        constructor(  
            public description:string = '',
            public titulo:string = '',
            public escribir:any = undefined,
            public eliminar:any = undefined,
            public editar:any = undefined,
            public autoriza:any=undefined
           
        ){}
    }
    
    export class Acceso{
        constructor(
            public escribir:any = undefined,
            public eliminar:any = undefined,
            public editar:any = undefined,
            public autorizar:any = undefined,
        ){}
    }    



