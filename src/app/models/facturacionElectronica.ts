export class AdminPvconfigFacElectronica {
    constructor(
        public _id:string = "",
        public token = '',
        public factOperacion = new FactOperacion(),
        public factSoftware= new FactSoftware(),
        public factCertificado= new FactCertificado(),
        public factResolucion= new FactResolucion(),
        public factResoluciones:any[]= [],
        public factResolucionDS= new FactResolucion(),
        public factNotaCredito= new FactNotaCredito(),
        public factNotaDebito= new FactNotaDebito(),
        public set_pruebas:string = "",
        public pruebas:boolean=false,
        public created_at:Date = new Date(),
        public update_atDate = new Date(),
        public operacion:string = "",
    ){}
}

export class FactOperacion {
    constructor(
            public identification_number:number = 0,
            public dv:number = 0,
            public type_document_identification_id:number = 0,
            public type_organization_id:number = 0,
            public type_regime_id:number = 0,
            public type_liability_id:number = 0,
            public business_name:string = "",
            public merchant_registration:string = "",
            public municipality_id:number = 0,
            public address:string = "",
            public phone:number = 0,
            public email:string = "",
            public activa:boolean = false,
            public representante:string = "",
            public cedula:number = 0,
            
    ){}
}

export class FactSoftware {
    constructor(
        public id:string = "",
        public pin:number = 0
    ){}
}

export class FactCertificado {
    constructor(
	public certificate:string = "",
	public password:string = "",

    public protocolo:string = "",
    public vencimiento:any = ""
    
    ){}
}

export class FactResolucion {
    constructor(
		public type_document_id:number =  1,
        public prefix:string = "FE",
        public resolution:string = "",
        public resolution_date:string = "",
        public technical_key:string = "",
        public protocolo:string = "",
        public from:number = 0,
        public to:number =  0,
        public on:number =  0,
        public generated_to_date:number =  0,

        public date_from:string = "",
        public date_to:string = ""
    ){}
}

export class FactNotaCredito {
    constructor(
        public  type_document_id:number = 4,
        public  from:number = 1,
        public  to:number = 99999999,
        public  on:number =  1,
        public  prefix:string =  "NCE"
    ){}
}

export class NotaCredito {
    constructor(
        public  _id:string =  "",
        public company:any = [],
        public movimiento:string =  "",
        public generador:any = [],
        public  operacion:any =  undefined,
        public  type_document_id:number = 4,
        public  consecutivo:number =  0,
        public  prefix:string =  "",
        public  cufe:string =  "",
        public  fac_number:string =  '',
        public  fac_fecha:string =  '',
        public  total:number = 0,
        public  base_impuesto:number = 0,
        public  impuestos:number = 0,
        public send_electronica:any = [],
        public cliente:any = [],
        public electronica:any = [],
        public tasas:any = [],
        public productos:any[] = [],
        public created_at:number = 0
    ){}
}

export class FactNotaDebito {
    constructor(
        public  type_document_id:number = 5,
        public  on:number =  1,
        public  from:number = 1,
        public  to:number = 99999999,
        public  prefix:string =  "NDE"
    ){}
}