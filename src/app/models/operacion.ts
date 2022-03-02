export class Operacion {

    constructor(
        public _id: string = '',
        public estado: string = '',
        public codigo: string = '',
        public titulo: string = '',
        public pais: string = '',
        public departamento: string = '',
        public cod_departamento: string = '',
        public ciudad: string = '',
        public codigopostal: string = '',
        public direccion: string = '',
        public telefono: number = 0,
        public mts2: number = 0,
        public email: string = '',
        public responsable:string = '',
        public horario: string = '',
        public ubicacion:any[] = [],
        public registro:string = '',
        public tipo:string = '',
        public company:string = '',
        public album: string = '',
        public img: string = '',
        public ficha: string = '',
        public ciberiUsers:any[] = [],
        public ip_servidor: string = '',
        public nombreRed: string = '',
        public claveRed: string = '',
    
        public created_at: Date = new Date(),
        public update_at: Date = new Date(),
        public coordenadas:any = undefined,
        public coordinates:any = undefined,
        public imagenes:any[] = [],
        public horarios:any[] = [],
        public mediosdepago:any[] = [],
       
     ){}



}