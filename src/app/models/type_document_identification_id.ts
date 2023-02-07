export const type_document_identification_id = [
    {id:1, cod:'11', valor: 'Registro civil', icon:'child_care'},
    {id:2, cod:'12', valor: 'Tarjeta identidad', icon:'child_care'},
    {id:3, cod:'13', valor: 'Cédula de ciudadanía', icon:'face'},
    {id:4, cod:'21', valor: 'Tarjeta de extranjería', icon:'face'},
    {id:5, cod:'22', valor: 'Cédula de extranjería', icon:'face'},
    {id:6, cod:'31', valor: 'NIT', icon:'business'},
    {id:7, cod:'41', valor: 'Pasaporte', icon:'face'},
    {id:8, cod:'42', valor: 'Documento de indentificacíon extranjero', icon:'face'},
    {id:9, cod:'50', valor: 'NIT de otro país', icon:'business'},
    {id:10, cod:'91', valor: 'NUIP', icon:'business'},
]

export const type_organization_id = [
    {id:1, cod:'1', valor: 'Persona Jurídica', icon:'business'},
    {id:2, cod:'2', valor: 'Persona Natural', icon:'face'},
]

export const type_regime_id = [
    {id:1, cod:'1', valor: 'Responsable de IVA', icon:'attach_money'},
    {id:2, cod:'2', valor: 'No Responsable de IVA', icon:'money_off'},
]

export const type_liability_id = [
    {id:7, cod:'O-13', valor: 'Gran contribuyente', icon:'attach_money'},
    {id:9, cod:'O-15', valor: 'Autorretenedor', icon:'attach_money'},
    {id:14, cod:'O-23', valor: 'Agente de retención en impuesto sobre las ventas', icon:'attach_money'},
    {id:112, cod:'O-47', valor: 'Regimen Simple de Tributacion SIMPLE', icon:'attach_money'},
    {id:117, cod:'R-99-PN', valor: 'No responsable', icon:'money_off'},
]

export const type_document_id = [
    {id:1, cod:'01', valor: 'Factura de Venta Nacional', prefix:'fv', icon:'gavel'}, 
    {id:2, cod:'02', valor: 'Factura de Exportacion', prefix:'fv', icon:'gavel'}, 
    {id:3, cod:'03', valor: 'Factura de Contingencia', prefix:'fv', icon:'gavel'}, 
    
   

    {id:4, cod:'91', valor: 'Nota Crédito', prefix:'nc', icon:'gavel'}, 
    {id:5, cod:'92', valor: 'Nota Débito', prefix:'nd', icon:'gavel'}, 
    {id:6, cod:'', valor: 'ZIP', prefix:'z', icon:'gavel'},
    {id:7, cod:'89', valor: 'AttachDocument', prefix:'at', icon:'gavel'}, 
    {id:8, cod:'88', valor: 'ApplicationResponse', prefix:'ar', icon:'gavel'},
    {id:9, cod:'05', valor: 'Documento Soporte Electrónico', prefix:'dse', icon:'gavel'}, 
  ]

export const Taxes = [
    {
      id: 1,
      name: "IVA",
      descripcion: "Impuesto sobre la Ventas",
      code: "1"
    },
    {
      id: 2,
      name: "IC",
      descripcion: "Impuesto al Consumo Departamental",
      code: "2"
    },
    {
      id: 3,
      name: "ICA",
      descripcion: "Impuesto de Industria, Comercio y Aviso",
      code: "3"
    },
    {
      id: 4,
      name: "INC",
      descripcion: "Impuesto Nacional al Consumo",
      code: "4"
    },
    {
      id: 5,
      name: "ReteIVA",
      descripcion: "Retención sobre el IVA",
      code: "5"
    },
    {
      id: 6,
      name: "ReteRenta",
      descripcion: "Retención sobre Renta",
      code: "6"
    },
    {
      id: 7,
      name: "ReteICA",
      descripcion: "Retención sobre el ICA",
      code: "7"
    },
    {
      id: 8,
      name: "FtoHorticultura",
      descripcion: "Cuota de Fomento Hortifrutícula",
      code: "20"
    },
    {
      id: 9,
      name: "Timbre",
      descripcion: "Impuesto de Timbre",
      code: "21"
    },
    {
      id: 10,
      name: "Bolsas",
      descripcion: "Impuesto al Consumo de Bolsa Plástica",
      code: "22"
    },
    {
      id: 11,
      name: "INCarbono",
      descripcion: "Impuesto Nacional al Carbono",
      code: "23"
    },
    {
      id: 12,
      name: "INCombustibles",
      descripcion: "Impuesto Nacional a los Combustibles",
      code: "24"
    },
    {
      id: 13,
      name: "Sobretasa Combustibles",
      descripcion: "Sobretasa a los combustibles",
      code: "25"
    },
    {
      id: 14,
      name: "Sordicom",
      descripcion: "Contribución minoristas (Combustibles)",
      code: "26"
    },
    {
      id: 15,
      name: "Nombre de la figura tributaria",
      descripcion: "Otros tributos, tasas, contribuciones, y similares",
      code: "ZZ"
    }
   ]

   export const Reteciones = [
     {
      id: 1,
      name: "Compras generales (declarantes)",
      descripcion: "Otros tributos, tasas, contribuciones, y similares",
      code: "ZZ"
     },
     {
      id: 1,
      name: "Compras generales (no declarantes)",
      descripcion: "Otros tributos, tasas, contribuciones, y similares",
      code: "ZZ"
     }
   ]

export const departamentos_dian = [
    {
      id: 1,
      departament_id: 46,
      name: "Amazonas",
      code: 91
    },
    {
      id: 2,
      departament_id: 46,
      name: "Antioquia",
      code: 5
    },
    {
      id: 3,
      departament_id: 46,
      name: "Arauca",
      code: 81
    },
    {
      id: 4,
      departament_id: 46,
      name: "Atlántico",
      code: 8
    },
    {
      id: 5,
      departament_id: 46,
      name: "Bogotá",
      code: 11
    },
    {
      id: 6,
      departament_id: 46,
      name: "Bolívar",
      code: 13
    },
    {
      id: 7,
      departament_id: 46,
      name: "Boyacá",
      code: 15
    },
    {
      id: 8,
      departament_id: 46,
      name: "Caldas",
      code: 17
    },
    {
      id: 9,
      departament_id: 46,
      name: "Caquetá",
      code: 18
    },
    {
      id: 10,
      departament_id: 46,
      name: "Casanare",
      code: 85
    },
    {
      id: 11,
      departament_id: 46,
      name: "Cauca",
      code: 19
    },
    {
      id: 12,
      departament_id: 46,
      name: "Cesar",
      code: 20
    },
    {
      id: 13,
      departament_id: 46,
      name: "Chocó",
      code: 27
    },
    {
      id: 14,
      departament_id: 46,
      name: "Córdoba",
      code: 23
    },
    {
      id: 15,
      departament_id: 46,
      name: "Cundinamarca",
      code: 25
    },
    {
      id: 16,
      departament_id: 46,
      name: "Guainía",
      code: 94
    },
    {
      id: 17,
      departament_id: 46,
      name: "Guaviare",
      code: 95
    },
    {
      id: 18,
      departament_id: 46,
      name: "Huila",
      code: 41
    },
    {
      id: 19,
      departament_id: 46,
      name: "La Guajira",
      code: 44
    },
    {
      id: 20,
      departament_id: 46,
      name: "Magdalena",
      code: 47
    },
    {
      id: 21,
      departament_id: 46,
      name: "Meta",
      code: 50
    },
    {
      id: 22,
      departament_id: 46,
      name: "Nariño",
      code: 52
    },
    {
      id: 23,
      departament_id: 46,
      name: "Norte de Santander",
      code: 54
    },
    {
      id: 24,
      departament_id: 46,
      name: "Putumayo",
      code: 86
    },
    {
      id: 25,
      departament_id: 46,
      name: "Quindío",
      code: 63
    },
    {
      id: 26,
      departament_id: 46,
      name: "Risaralda",
      code: 66
    },
    {
      id: 27,
      departament_id: 46,
      name: "San Andrés y Providencia",
      code: 88
    },
    {
      id: 28,
      departament_id: 46,
      name: "Santander",
      code: 68
    },
    {
      id: 29,
      departament_id: 46,
      name: "Sucre",
      code: 70
    },
    {
      id: 30,
      departament_id: 46,
      name: "Tolima",
      code: 73
    },
    {
      id: 31,
      departament_id: 46,
      name: "Valle del Cauca",
      code: 76
    },
    {
      id: 32,
      departament_id: 46,
      name: "Vaupés",
      code: 97
    },
    {
      id: 33,
      departament_id: 46,
      name: "Vichada",
      code: 99
    }
   ]


export const municipialities = [
    {
      id: 1,
      "departament_id": 2,
      name: "Medellín",
      code: 5001,
      codefacturador: 12601
    },
    {
      id: 2,
      "departament_id": 2,
      name: "Abejorral",
      code: 5002,
      codefacturador: 12533
    },
    {
      id: 3,
      "departament_id": 2,
      name: "Abriaquí",
      code: 5004,
      codefacturador: 12534
    },
    {
      id: 4,
      "departament_id": 2,
      name: "Alejandría",
      code: 5021,
      codefacturador: 12535
    },
    {
      id: 5,
      "departament_id": 2,
      name: "Amagá",
      code: 5030,
      codefacturador: 12536
    },
    {
      id: 6,
      "departament_id": 2,
      name: "Amalfi",
      code: 5031,
      codefacturador: 12537
    },
    {
      id: 7,
      "departament_id": 2,
      name: "Andes",
      code: 5034,
      codefacturador: 12538
    },
    {
      id: 8,
      "departament_id": 2,
      name: "Angelópolis",
      code: 5036,
      codefacturador: 12539
    },
    {
      id: 9,
      "departament_id": 2,
      name: "Angostura",
      code: 5038,
      codefacturador: 12540
    },
    {
      id: 10,
      "departament_id": 2,
      name: "Anorí",
      code: 5040,
      codefacturador: 12541
    },
    {
      id: 11,
      "departament_id": 2,
      name: "Santa Fé De Antioquia",
      code: 5042,
      codefacturador: 12723
    },
    {
      id: 12,
      "departament_id": 2,
      name: "Anzá",
      code: 5044,
      codefacturador: 12543
    },
    {
      id: 13,
      "departament_id": 2,
      name: "Apartadó",
      code: 5045,
      codefacturador: 12544
    },
    {
      id: 14,
      "departament_id": 2,
      name: "Arboletes",
      code: 5051,
      codefacturador: 12545
    },
    {
      id: 15,
      "departament_id": 2,
      name: "Argelia",
      code: 5055,
      codefacturador: 12920
    },
    {
      id: 16,
      "departament_id": 2,
      name: "Armenia",
      code: 5059,
      codefacturador: 13337
    },
    {
      id: 17,
      "departament_id": 2,
      name: "Barbosa",
      code: 5079,
      codefacturador: 13366
    },
    {
      id: 18,
      "departament_id": 2,
      name: "Belmira",
      code: 5086,
      codefacturador: 12550
    },
    {
      id: 19,
      "departament_id": 2,
      name: "Bello",
      code: 5088,
      codefacturador: 12549
    },
    {
      id: 20,
      "departament_id": 2,
      name: "Betania",
      code: 5091,
      codefacturador: 12551
    },
    {
      id: 21,
      "departament_id": 2,
      name: "Betulia",
      code: 5093,
      codefacturador: 13369
    },
    {
      id: 22,
      "departament_id": 2,
      name: "Ciudad Bolívar ",
      code: 5101,
      codefacturador: 12568
    },
    {
      id: 23,
      "departament_id": 2,
      name: "Briceño",
      code: 5107,
      codefacturador: 12742
    },
    {
      id: 24,
      "departament_id": 2,
      name: "Buriticá",
      code: 5113,
      codefacturador: 12555
    },
    {
      id: 25,
      "departament_id": 2,
      name: "Cáceres",
      code: 5120,
      codefacturador: 12556
    },
    {
      id: 26,
      "departament_id": 2,
      name: "Caicedo",
      code: 5125,
      codefacturador: 12557
    },
    {
      id: 27,
      "departament_id": 2,
      name: "Caldas",
      code: 5129,
      codefacturador: 12745
    },
    {
      id: 28,
      "departament_id": 2,
      name: "Campamento",
      code: 5134,
      codefacturador: 12559
    },
    {
      id: 29,
      "departament_id": 2,
      name: "Cañasgordas",
      code: 5138,
      codefacturador: 12992
    },
    {
      id: 30,
      "departament_id": 2,
      name: "Caracolí",
      code: 5142,
      codefacturador: 12561
    },
    {
      id: 31,
      "departament_id": 2,
      name: "Caramanta",
      code: 5145,
      codefacturador: 12562
    },
    {
      id: 32,
      "departament_id": 2,
      name: "Carepa",
      code: 5147,
      codefacturador: 12563
    },
    {
      id: 33,
      "departament_id": 2,
      name: "El Carmen De Viboral",
      code: 5148,
      codefacturador: 12701
    },
    {
      id: 34,
      "departament_id": 2,
      name: "Carolina",
      code: 5150,
      codefacturador: 12565
    },
    {
      id: 35,
      "departament_id": 2,
      name: "Caucasia",
      code: 5154,
      codefacturador: 12566
    },
    {
      id: 36,
      "departament_id": 2,
      name: "Chigorodó",
      code: 5172,
      codefacturador: 12567
    },
    {
      id: 37,
      "departament_id": 2,
      name: "Cisneros",
      code: 5190,
      codefacturador: 12568
    },
    {
      id: 38,
      "departament_id": 2,
      name: "Cocorná",
      code: 5197,
      codefacturador: 12569
    },
    {
      id: 39,
      "departament_id": 2,
      name: "Concepción",
      code: 5206,
      codefacturador: 13383
    },
    {
      id: 40,
      "departament_id": 2,
      name: "Concordia",
      code: 5209,
      codefacturador: 13207
    },
    {
      id: 41,
      "departament_id": 2,
      name: "Copacabana",
      code: 5212,
      codefacturador: 12572
    },
    {
      id: 42,
      "departament_id": 2,
      name: "Dabeiba",
      code: 5234,
      codefacturador: 12573
    },
    {
      id: 43,
      "departament_id": 2,
      name: "Donmatías",
      code: 5237,
      codefacturador: 12574
    },
    {
      id: 44,
      "departament_id": 2,
      name: "Ebéjico",
      code: 5240,
      codefacturador: 12575
    },
    {
      id: 45,
      "departament_id": 2,
      name: "El Bagre ",
      code: 5250,
      codefacturador: 12576
    },
    {
      id: 46,
      "departament_id": 2,
      name: "Entrerríos",
      code: 5264,
      codefacturador: 12577
    },
    {
      id: 47,
      "departament_id": 2,
      name: "Envigado",
      code: 5266,
      codefacturador: 12578
    },
    {
      id: 48,
      "departament_id": 2,
      name: "Fredonia",
      code: 5282,
      codefacturador: 12579
    },
    {
      id: 49,
      "departament_id": 2,
      name: "Frontino",
      code: 5284,
      codefacturador: 12580
    },
    {
      id: 50,
      "departament_id": 2,
      name: "Giraldo",
      code: 5306,
      codefacturador: 12581
    },
    {
      id: 51,
      "departament_id": 2,
      name: "Girardota",
      code: 5308,
      codefacturador: 12582
    },
    {
      id: 52,
      "departament_id": 2,
      name: "Gómez Plata ",
      code: 5310,
      codefacturador: 12583
    },
    {
      id: 53,
      "departament_id": 2,
      name: "Granada",
      code: 5313,
      codefacturador: 13241
    },
    {
      id: 54,
      "departament_id": 2,
      name: "Guadalupe",
      code: 5315,
      codefacturador: 13400
    },
    {
      id: 55,
      "departament_id": 2,
      name: "Guarne",
      code: 5318,
      codefacturador: 12586
    },
    {
      id: 56,
      "departament_id": 2,
      name: "Guatapé",
      code: 5321,
      codefacturador: 12587
    },
    {
      id: 57,
      "departament_id": 2,
      name: "Heliconia",
      code: 5347,
      codefacturador: 12588
    },
    {
      id: 58,
      "departament_id": 2,
      name: "Hispania",
      code: 5353,
      codefacturador: 12589
    },
    {
      id: 59,
      "departament_id": 2,
      name: "Itagüí",
      code: 5360,
      codefacturador: 12590
    },
    {
      id: 60,
      "departament_id": 2,
      name: "Ituango",
      code: 5361,
      codefacturador: 12591
    },
    {
      id: 61,
      "departament_id": 2,
      name: "Jardín",
      code: 5364,
      codefacturador: 12592
    },
    {
      id: 62,
      "departament_id": 2,
      name: "Jericó",
      code: 5368,
      codefacturador: 12778
    },
    {
      id: 63,
      "departament_id": 2,
      name: "La Ceja ",
      code: 5376,
      codefacturador: 12594
    },
    {
      id: 64,
      "departament_id": 2,
      name: "La Estrella ",
      code: 5380,
      codefacturador: 12595
    },
    {
      id: 65,
      "departament_id": 2,
      name: "La Pintada ",
      code: 5390,
      codefacturador: 12596
    },
    {
      id: 66,
      "departament_id": 2,
      name: "La Unión ",
      code: 5400,
      codefacturador: 13458
    },
    {
      id: 67,
      "departament_id": 2,
      name: "Liborina",
      code: 5411,
      codefacturador: 12598
    },
    {
      id: 68,
      "departament_id": 2,
      name: "Maceo",
      code: 5425,
      codefacturador: 12599
    },
    {
      id: 69,
      "departament_id": 2,
      name: "Marinilla",
      code: 5440,
      codefacturador: 12600
    },
    {
      id: 70,
      "departament_id": 2,
      name: "Montebello",
      code: 5467,
      codefacturador: 12602
    },
    {
      id: 71,
      "departament_id": 2,
      name: "Murindó",
      code: 5475,
      codefacturador: 12603
    },
    {
      id: 72,
      "departament_id": 2,
      name: "Mutatá",
      code: 5480,
      codefacturador: 12604
    },
    {
      id: 73,
      "departament_id": 2,
      name: "Nariño",
      code: 5483,
      codefacturador: 13298
    },
    {
      id: 74,
      "departament_id": 2,
      name: "Necoclí",
      code: 5490,
      codefacturador: 12607
    },
    {
      id: 75,
      "departament_id": 2,
      name: "Nechí",
      code: 5495,
      codefacturador: 12606
    },
    {
      id: 76,
      "departament_id": 2,
      name: "Olaya",
      code: 5501,
      codefacturador: 12608
    },
    {
      id: 77,
      "departament_id": 2,
      name: "Peñol",
      code: 5541,
      codefacturador: 12874
    },
    {
      id: 78,
      "departament_id": 2,
      name: "Peque",
      code: 5543,
      codefacturador: 12610
    },
    {
      id: 79,
      "departament_id": 2,
      name: "Pueblorrico",
      code: 5576,
      codefacturador: 12611
    },
    {
      id: 80,
      "departament_id": 2,
      name: "Puerto Berrío ",
      code: 5579,
      codefacturador: 12612
    },
    {
      id: 81,
      "departament_id": 2,
      name: "Puerto Nare ",
      code: 5585,
      codefacturador: 12613
    },
    {
      id: 82,
      "departament_id": 2,
      name: "Puerto Triunfo ",
      code: 5591,
      codefacturador: 12614
    },
    {
      id: 83,
      "departament_id": 2,
      name: "Remedios",
      code: 5604,
      codefacturador: 12615
    },
    {
      id: 84,
      "departament_id": 2,
      name: "Retiro",
      code: 5607,
      codefacturador: 12616
    },
    {
      id: 85,
      "departament_id": 2,
      name: "Rionegro",
      code: 5615,
      codefacturador: 13428
    },
    {
      id: 86,
      "departament_id": 2,
      name: "Sabanalarga",
      code: 5628,
      codefacturador: 12911
    },
    {
      id: 87,
      "departament_id": 2,
      name: "Sabaneta",
      code: 5631,
      codefacturador: 12619
    },
    {
      id: 88,
      "departament_id": 2,
      name: "Salgar",
      code: 5642,
      codefacturador: 12620
    },
    {
      id: 89,
      "departament_id": 2,
      name: "San Andrés De Cuerquía",
      code: 5647,
      codefacturador: 13430
    },
    {
      id: 90,
      "departament_id": 2,
      name: "San Carlos ",
      code: 5649,
      codefacturador: 13039
    },
    {
      id: 91,
      "departament_id": 2,
      name: "San Francisco ",
      code: 5652,
      codefacturador: 13331
    },
    {
      id: 92,
      "departament_id": 2,
      name: "San Jerónimo ",
      code: 5656,
      codefacturador: 12624
    },
    {
      id: 93,
      "departament_id": 2,
      name: "San José De La Montaña ",
      code: 5658,
      codefacturador: 12625
    },
    {
      id: 94,
      "departament_id": 2,
      name: "San Juan De Urabá",
      code: 5659,
      codefacturador: 12626
    },
    {
      id: 95,
      "departament_id": 2,
      name: "San Luis ",
      code: 5660,
      codefacturador: 13515
    },
    {
      id: 96,
      "departament_id": 2,
      name: "San Pedro De Los Milagros ",
      code: 5664,
      codefacturador: 13314
    },
    {
      id: 97,
      "departament_id": 2,
      name: "San Pedro De Urabá",
      code: 5665,
      codefacturador: 12629
    },
    {
      id: 98,
      "departament_id": 2,
      name: "San Rafael ",
      code: 5667,
      codefacturador: 12630
    },
    {
      id: 99,
      "departament_id": 2,
      name: "San Roque ",
      code: 5670,
      codefacturador: 12631
    },
    {
      id: 100,
      "departament_id": 2,
      name: "San Vicente Ferrer",
      code: 5674,
      codefacturador: 12896
    },
    {
      id: 101,
      "departament_id": 2,
      name: "Santa Bárbara ",
      code: 5679,
      codefacturador: 13437
    },
    {
      id: 102,
      "departament_id": 2,
      name: "Santa Rosa De Osos",
      code: 5686,
      codefacturador: 12634
    },
    {
      id: 103,
      "departament_id": 2,
      name: "Santo Domingo ",
      code: 5690,
      codefacturador: 12635
    },
    {
      id: 104,
      "departament_id": 2,
      name: "El Santuario ",
      code: 5697,
      codefacturador: 13277
    },
    {
      id: 105,
      "departament_id": 2,
      name: "Segovia",
      code: 5736,
      codefacturador: 12637
    },
    {
      id: 106,
      "departament_id": 2,
      name: "Sonsón",
      code: 5756,
      codefacturador: 12638
    },
    {
      id: 107,
      "departament_id": 2,
      name: "Sopetrán",
      code: 5761,
      codefacturador: 12639
    },
    {
      id: 108,
      "departament_id": 2,
      name: "Támesis",
      code: 5789,
      codefacturador: 12640
    },
    {
      id: 109,
      "departament_id": 2,
      name: "Tarazá",
      code: 5790,
      codefacturador: 12641
    },
    {
      id: 110,
      "departament_id": 2,
      name: "Tarso",
      code: 5792,
      codefacturador: 12642
    },
    {
      id: 111,
      "departament_id": 2,
      name: "Titiribí",
      code: 5809,
      codefacturador: 12643
    },
    {
      id: 112,
      "departament_id": 2,
      name: "Toledo",
      code: 5819,
      codefacturador: 12644
    },
    {
      id: 113,
      "departament_id": 2,
      name: "Turbo",
      code: 5837,
      codefacturador: 12645
    },
    {
      id: 114,
      "departament_id": 2,
      name: "Uramita",
      code: 5842,
      codefacturador: 12646
    },
    {
      id: 115,
      "departament_id": 2,
      name: "Urrao",
      code: 5847,
      codefacturador: 12647
    },
    {
      id: 116,
      "departament_id": 2,
      name: "Valdivia",
      code: 5854,
      codefacturador: 12648
    },
    {
      id: 117,
      "departament_id": 2,
      name: "Valparaíso",
      code: 5856,
      codefacturador: 12899
    },
    {
      id: 118,
      "departament_id": 2,
      name: "Vegachí",
      code: 5858,
      codefacturador: 12650
    },
    {
      id: 119,
      "departament_id": 2,
      name: "Venecia",
      code: 5861,
      codefacturador: 12651
    },
    {
      id: 120,
      "departament_id": 2,
      name: "Vigía Del Fuerte",
      code: 5873,
      codefacturador: 12652
    },
    {
      id: 121,
      "departament_id": 2,
      name: "Yalí",
      code: 5885,
      codefacturador: 12653
    },
    {
      id: 122,
      "departament_id": 2,
      name: "Yarumal",
      code: 5887,
      codefacturador: 12654
    },
    {
      id: 123,
      "departament_id": 2,
      name: "Yolombó",
      code: 5890,
      codefacturador: 12655
    },
    {
      id: 124,
      "departament_id": 2,
      name: "Yondó",
      code: 5893,
      codefacturador: 12656
    },
    {
      id: 125,
      "departament_id": 2,
      name: "Zaragoza",
      code: 5895,
      codefacturador: 12657
    },
    {
      id: 126,
      "departament_id": 4,
      name: "Barranquilla",
      code: 8001,
      codefacturador: 12666
    },
    {
      id: 127,
      "departament_id": 4,
      name: "Baranoa",
      code: 8078,
      codefacturador: 12665
    },
    {
      id: 128,
      "departament_id": 4,
      name: "Campo De La Cruz",
      code: 8137,
      codefacturador: 12667
    },
    {
      id: 129,
      "departament_id": 4,
      name: "Candelaria",
      code: 8141,
      codefacturador: 12668
    },
    {
      id: 130,
      "departament_id": 4,
      name: "Galapa",
      code: 8296,
      codefacturador: 12669
    },
    {
      id: 131,
      "departament_id": 4,
      name: "Juan De Acosta",
      code: 8372,
      codefacturador: 12670
    },
    {
      id: 132,
      "departament_id": 4,
      name: "Luruaco",
      code: 8421,
      codefacturador: 12671
    },
    {
      id: 133,
      "departament_id": 4,
      name: "Malambo",
      code: 8433,
      codefacturador: 12672
    },
    {
      id: 134,
      "departament_id": 4,
      name: "Manatí",
      code: 8436,
      codefacturador: 12673
    },
    {
      id: 135,
      "departament_id": 4,
      name: "Palmar De Varela",
      code: 8520,
      codefacturador: 12674
    },
    {
      id: 136,
      "departament_id": 4,
      name: "Piojó",
      code: 8549,
      codefacturador: 12675
    },
    {
      id: 137,
      "departament_id": 4,
      name: "Polonuevo",
      code: 8558,
      codefacturador: 12676
    },
    {
      id: 138,
      "departament_id": 4,
      name: "Ponedera",
      code: 8560,
      codefacturador: 12677
    },
    {
      id: 139,
      "departament_id": 4,
      name: "Puerto Colombia ",
      code: 8573,
      codefacturador: 12678
    },
    {
      id: 140,
      "departament_id": 4,
      name: "Repelón",
      code: 8606,
      codefacturador: 12679
    },
    {
      id: 141,
      "departament_id": 4,
      name: "Sabanagrande",
      code: 8634,
      codefacturador: 12680
    },
    {
      id: 142,
      "departament_id": 4,
      name: "Sabanalarga",
      code: 8638,
      codefacturador: 12911
    },
    {
      id: 143,
      "departament_id": 4,
      name: "Santa Lucía ",
      code: 8675,
      codefacturador: 12682
    },
    {
      id: 144,
      "departament_id": 4,
      name: "Santo Tomás ",
      code: 8685,
      codefacturador: 12683
    },
    {
      id: 145,
      "departament_id": 4,
      name: "Soledad",
      code: 8758,
      codefacturador: 12684
    },
    {
      id: 146,
      "departament_id": 4,
      name: "Suan",
      code: 8770,
      codefacturador: 12685
    },
    {
      id: 147,
      "departament_id": 4,
      name: "Tubará",
      code: 8832,
      codefacturador: 12686
    },
    {
      id: 148,
      "departament_id": 4,
      name: "Usiacurí",
      code: 8849,
      codefacturador: 12687
    },
    {
      id: 149,
      "departament_id": 5,
      name: "Bogotá, D.c. ",
      code: 11001,
      codefacturador: 12688
    },
    {
      id: 150,
      "departament_id": 6,
      name: "Cartagena De Indias",
      code: 13001,
      codefacturador: 12697
    },
    {
      id: 151,
      "departament_id": 6,
      name: "Achí",
      code: 13006,
      codefacturador: 12689
    },
    {
      id: 152,
      "departament_id": 6,
      name: "Altos Del Rosario",
      code: 13030,
      codefacturador: 12690
    },
    {
      id: 153,
      "departament_id": 6,
      name: "Arenal",
      code: 13042,
      codefacturador: 12691
    },
    {
      id: 154,
      "departament_id": 6,
      name: "Arjona",
      code: 13052,
      codefacturador: 12692
    },
    {
      id: 155,
      "departament_id": 6,
      name: "Arroyohondo",
      code: 13062,
      codefacturador: 12693
    },
    {
      id: 156,
      "departament_id": 6,
      name: "Barranco De Loba",
      code: 13074,
      codefacturador: 12694
    },
    {
      id: 157,
      "departament_id": 6,
      name: "Calamar",
      code: 13140,
      codefacturador: 13160
    },
    {
      id: 158,
      "departament_id": 6,
      name: "Cantagallo",
      code: 13160,
      codefacturador: 12696
    },
    {
      id: 159,
      "departament_id": 6,
      name: "Cicuco",
      code: 13188,
      codefacturador: 12698
    },
    {
      id: 160,
      "departament_id": 6,
      name: "Córdoba",
      code: 13212,
      codefacturador: 13341
    },
    {
      id: 161,
      "departament_id": 6,
      name: "Clemencia",
      code: 13222,
      codefacturador: 12699
    },
    {
      id: 162,
      "departament_id": 6,
      name: "El Carmen De Bolívar",
      code: 13244,
      codefacturador: 12701
    },
    {
      id: 163,
      "departament_id": 6,
      name: "El Guamo ",
      code: 13248,
      codefacturador: 12702
    },
    {
      id: 164,
      "departament_id": 6,
      name: "El Peñón ",
      code: 13268,
      codefacturador: 13390
    },
    {
      id: 165,
      "departament_id": 6,
      name: "Hatillo De Loba",
      code: 13300,
      codefacturador: 12704
    },
    {
      id: 166,
      "departament_id": 6,
      name: "Magangué",
      code: 13430,
      codefacturador: 12705
    },
    {
      id: 167,
      "departament_id": 6,
      name: "Mahates",
      code: 13433,
      codefacturador: 12706
    },
    {
      id: 168,
      "departament_id": 6,
      name: "Margarita",
      code: 13440,
      codefacturador: 12707
    },
    {
      id: 169,
      "departament_id": 6,
      name: "María La Baja",
      code: 13442,
      codefacturador: 12708
    },
    {
      id: 170,
      "departament_id": 6,
      name: "Montecristo",
      code: 13458,
      codefacturador: 12710
    },
    {
      id: 171,
      "departament_id": 6,
      name: "Mompós",
      code: 13468,
      codefacturador: 12709
    },
    {
      id: 172,
      "departament_id": 6,
      name: "Morales",
      code: 13473,
      codefacturador: 12939
    },
    {
      id: 173,
      "departament_id": 6,
      name: "Norosí",
      code: 13490,
      codefacturador: 12871
    },
    {
      id: 174,
      "departament_id": 6,
      name: "Pinillos",
      code: 13549,
      codefacturador: 12712
    },
    {
      id: 175,
      "departament_id": 6,
      name: "Regidor",
      code: 13580,
      codefacturador: 12713
    },
    {
      id: 176,
      "departament_id": 6,
      name: "Río Viejo ",
      code: 13600,
      codefacturador: 12714
    },
    {
      id: 177,
      "departament_id": 6,
      name: "San Cristóbal ",
      code: 13620,
      codefacturador: 12715
    },
    {
      id: 178,
      "departament_id": 6,
      name: "San Estanislao ",
      code: 13647,
      codefacturador: 12716
    },
    {
      id: 179,
      "departament_id": 6,
      name: "San Fernando ",
      code: 13650,
      codefacturador: 12717
    },
    {
      id: 180,
      "departament_id": 6,
      name: "San Jacinto ",
      code: 13654,
      codefacturador: 12718
    },
    {
      id: 181,
      "departament_id": 6,
      name: "San Jacinto Del Cauca",
      code: 13655,
      codefacturador: 12719
    },
    {
      id: 182,
      "departament_id": 6,
      name: "San Juan Nepomuceno",
      code: 13657,
      codefacturador: 12720
    },
    {
      id: 183,
      "departament_id": 6,
      name: "San Martín De Loba",
      code: 13667,
      codefacturador: 12721
    },
    {
      id: 184,
      "departament_id": 6,
      name: "San Pablo ",
      code: 13670,
      codefacturador: 13313
    },
    {
      id: 185,
      "departament_id": 6,
      name: "Santa Catalina ",
      code: 13673,
      codefacturador: 12723
    },
    {
      id: 186,
      "departament_id": 6,
      name: "Santa Rosa ",
      code: 13683,
      codefacturador: 12949
    },
    {
      id: 187,
      "departament_id": 6,
      name: "Santa Rosa Del Sur",
      code: 13688,
      codefacturador: 12725
    },
    {
      id: 188,
      "departament_id": 6,
      name: "Simití",
      code: 13744,
      codefacturador: 12726
    },
    {
      id: 189,
      "departament_id": 6,
      name: "Soplaviento",
      code: 13760,
      codefacturador: 12727
    },
    {
      id: 190,
      "departament_id": 6,
      name: "Talaigua Nuevo ",
      code: 13780,
      codefacturador: 12728
    },
    {
      id: 191,
      "departament_id": 6,
      name: "Tiquisio",
      code: 13810,
      codefacturador: 12729
    },
    {
      id: 192,
      "departament_id": 6,
      name: "Turbaco",
      code: 13836,
      codefacturador: 12730
    },
    {
      id: 193,
      "departament_id": 6,
      name: "Turbaná",
      code: 13838,
      codefacturador: 12731
    },
    {
      id: 194,
      "departament_id": 6,
      name: "Villanueva",
      code: 13873,
      codefacturador: 13448
    },
    {
      id: 195,
      "departament_id": 6,
      name: "Zambrano",
      code: 13894,
      codefacturador: 12733
    },
    {
      id: 196,
      "departament_id": 7,
      name: "Tunja",
      code: 15001,
      codefacturador: 12848
    },
    {
      id: 197,
      "departament_id": 7,
      name: "Almeida",
      code: 15022,
      codefacturador: 12734
    },
    {
      id: 198,
      "departament_id": 7,
      name: "Aquitania",
      code: 15047,
      codefacturador: 12735
    },
    {
      id: 199,
      "departament_id": 7,
      name: "Arcabuco",
      code: 15051,
      codefacturador: 12736
    },
    {
      id: 200,
      "departament_id": 7,
      name: "Belén",
      code: 15087,
      codefacturador: 13265
    },
    {
      id: 201,
      "departament_id": 7,
      name: "Berbeo",
      code: 15090,
      codefacturador: 12738
    },
    {
      id: 202,
      "departament_id": 7,
      name: "Betéitiva",
      code: 15092,
      codefacturador: 12739
    },
    {
      id: 203,
      "departament_id": 7,
      name: "Boavita",
      code: 15097,
      codefacturador: 12740
    },
    {
      id: 204,
      "departament_id": 7,
      name: "Boyacá",
      code: 15104,
      codefacturador: 12741
    },
    {
      id: 205,
      "departament_id": 7,
      name: "Briceño",
      code: 15106,
      codefacturador: 12742
    },
    {
      id: 206,
      "departament_id": 7,
      name: "Buenavista",
      code: 15109,
      codefacturador: 13450
    },
    {
      id: 207,
      "departament_id": 7,
      name: "Busbanzá",
      code: 15114,
      codefacturador: 12744
    },
    {
      id: 208,
      "departament_id": 7,
      name: "Caldas",
      code: 15131,
      codefacturador: 12745
    },
    {
      id: 209,
      "departament_id": 7,
      name: "Campohermoso",
      code: 15135,
      codefacturador: 12746
    },
    {
      id: 210,
      "departament_id": 7,
      name: "Cerinza",
      code: 15162,
      codefacturador: 12747
    },
    {
      id: 211,
      "departament_id": 7,
      name: "Chinavita",
      code: 15172,
      codefacturador: 12748
    },
    {
      id: 212,
      "departament_id": 7,
      name: "Chiquinquirá",
      code: 15176,
      codefacturador: 12749
    },
    {
      id: 213,
      "departament_id": 7,
      name: "Chiscas",
      code: 15180,
      codefacturador: 12751
    },
    {
      id: 214,
      "departament_id": 7,
      name: "Chita",
      code: 15183,
      codefacturador: 12752
    },
    {
      id: 215,
      "departament_id": 7,
      name: "Chitaraque",
      code: 15185,
      codefacturador: 12753
    },
    {
      id: 216,
      "departament_id": 7,
      name: "Chivatá",
      code: 15187,
      codefacturador: 12754
    },
    {
      id: 217,
      "departament_id": 7,
      name: "Ciénega",
      code: 15189,
      codefacturador: 12756
    },
    {
      id: 218,
      "departament_id": 7,
      name: "Cómbita",
      code: 15204,
      codefacturador: 12757
    },
    {
      id: 219,
      "departament_id": 7,
      name: "Coper",
      code: 15212,
      codefacturador: 12758
    },
    {
      id: 220,
      "departament_id": 7,
      name: "Corrales",
      code: 15215,
      codefacturador: 12759
    },
    {
      id: 221,
      "departament_id": 7,
      name: "Covarachía",
      code: 15218,
      codefacturador: 12760
    },
    {
      id: 222,
      "departament_id": 7,
      name: "Cubará",
      code: 15223,
      codefacturador: 12761
    },
    {
      id: 223,
      "departament_id": 7,
      name: "Cucaita",
      code: 15224,
      codefacturador: 12762
    },
    {
      id: 224,
      "departament_id": 7,
      name: "Cuítiva",
      code: 15226,
      codefacturador: 12763
    },
    {
      id: 225,
      "departament_id": 7,
      name: "Chíquiza",
      code: 15232,
      codefacturador: 12750
    },
    {
      id: 226,
      "departament_id": 7,
      name: "Chivor",
      code: 15236,
      codefacturador: 12755
    },
    {
      id: 227,
      "departament_id": 7,
      name: "Duitama",
      code: 15238,
      codefacturador: 12764
    },
    {
      id: 228,
      "departament_id": 7,
      name: "El Cocuy ",
      code: 15244,
      codefacturador: 12765
    },
    {
      id: 229,
      "departament_id": 7,
      name: "El Espino ",
      code: 15248,
      codefacturador: 12766
    },
    {
      id: 230,
      "departament_id": 7,
      name: "Firavitoba",
      code: 15272,
      codefacturador: 12767
    },
    {
      id: 231,
      "departament_id": 7,
      name: "Floresta",
      code: 15276,
      codefacturador: 12768
    },
    {
      id: 232,
      "departament_id": 7,
      name: "Gachantivá",
      code: 15293,
      codefacturador: 12769
    },
    {
      id: 233,
      "departament_id": 7,
      name: "Gámeza",
      code: 15296,
      codefacturador: 12770
    },
    {
      id: 234,
      "departament_id": 7,
      name: "Garagoa",
      code: 15299,
      codefacturador: 12771
    },
    {
      id: 235,
      "departament_id": 7,
      name: "Guacamayas",
      code: 15317,
      codefacturador: 12772
    },
    {
      id: 236,
      "departament_id": 7,
      name: "Guateque",
      code: 15322,
      codefacturador: 12773
    },
    {
      id: 237,
      "departament_id": 7,
      name: "Guayatá",
      code: 15325,
      codefacturador: 12774
    },
    {
      id: 238,
      "departament_id": 7,
      name: "Güicán De La Sierra",
      code: 15332,
      codefacturador: 12775
    },
    {
      id: 239,
      "departament_id": 7,
      name: "Iza",
      code: 15362,
      codefacturador: 12776
    },
    {
      id: 240,
      "departament_id": 7,
      name: "Jenesano",
      code: 15367,
      codefacturador: 12777
    },
    {
      id: 241,
      "departament_id": 7,
      name: "Jericó",
      code: 15368,
      codefacturador: 12778
    },
    {
      id: 242,
      "departament_id": 7,
      name: "Labranzagrande",
      code: 15377,
      codefacturador: 12782
    },
    {
      id: 243,
      "departament_id": 7,
      name: "La Capilla ",
      code: 15380,
      codefacturador: 12779
    },
    {
      id: 244,
      "departament_id": 7,
      name: "La Victoria ",
      code: 15401,
      codefacturador: 12781
    },
    {
      id: 245,
      "departament_id": 7,
      name: "La Uvita ",
      code: 15403,
      codefacturador: 12780
    },
    {
      id: 246,
      "departament_id": 7,
      name: "Villa De Leyva",
      code: 15407,
      codefacturador: 12652
    },
    {
      id: 247,
      "departament_id": 7,
      name: "Macanal",
      code: 15425,
      codefacturador: 12784
    },
    {
      id: 248,
      "departament_id": 7,
      name: "Maripí",
      code: 15442,
      codefacturador: 12785
    },
    {
      id: 249,
      "departament_id": 7,
      name: "Miraflores",
      code: 15455,
      codefacturador: 13162
    },
    {
      id: 250,
      "departament_id": 7,
      name: "Mongua",
      code: 15464,
      codefacturador: 12787
    },
    {
      id: 251,
      "departament_id": 7,
      name: "Monguí",
      code: 15466,
      codefacturador: 12788
    },
    {
      id: 252,
      "departament_id": 7,
      name: "Moniquirá",
      code: 15469,
      codefacturador: 12789
    },
    {
      id: 253,
      "departament_id": 7,
      name: "Motavita",
      code: 15476,
      codefacturador: 12790
    },
    {
      id: 254,
      "departament_id": 7,
      name: "Muzo",
      code: 15480,
      codefacturador: 12791
    },
    {
      id: 255,
      "departament_id": 7,
      name: "Nobsa",
      code: 15491,
      codefacturador: 12792
    },
    {
      id: 256,
      "departament_id": 7,
      name: "Nuevo Colón ",
      code: 15494,
      codefacturador: 12793
    },
    {
      id: 257,
      "departament_id": 7,
      name: "Oicatá",
      code: 15500,
      codefacturador: 12794
    },
    {
      id: 258,
      "departament_id": 7,
      name: "Otanche",
      code: 15507,
      codefacturador: 12795
    },
    {
      id: 259,
      "departament_id": 7,
      name: "Pachavita",
      code: 15511,
      codefacturador: 12796
    },
    {
      id: 260,
      "departament_id": 7,
      name: "Páez",
      code: 15514,
      codefacturador: 12941
    },
    {
      id: 261,
      "departament_id": 7,
      name: "Paipa",
      code: 15516,
      codefacturador: 12798
    },
    {
      id: 262,
      "departament_id": 7,
      name: "Pajarito",
      code: 15518,
      codefacturador: 12799
    },
    {
      id: 263,
      "departament_id": 7,
      name: "Panqueba",
      code: 15522,
      codefacturador: 12800
    },
    {
      id: 264,
      "departament_id": 7,
      name: "Pauna",
      code: 15531,
      codefacturador: 12801
    },
    {
      id: 265,
      "departament_id": 7,
      name: "Paya",
      code: 15533,
      codefacturador: 12802
    },
    {
      id: 266,
      "departament_id": 7,
      name: "Paz De Río",
      code: 15537,
      codefacturador: 12908
    },
    {
      id: 267,
      "departament_id": 7,
      name: "Pesca",
      code: 15542,
      codefacturador: 12804
    },
    {
      id: 268,
      "departament_id": 7,
      name: "Pisba",
      code: 15550,
      codefacturador: 12805
    },
    {
      id: 269,
      "departament_id": 7,
      name: "Puerto Boyacá ",
      code: 15572,
      codefacturador: 12806
    },
    {
      id: 270,
      "departament_id": 7,
      name: "Quípama",
      code: 15580,
      codefacturador: 12807
    },
    {
      id: 271,
      "departament_id": 7,
      name: "Ramiriquí",
      code: 15599,
      codefacturador: 12808
    },
    {
      id: 272,
      "departament_id": 7,
      name: "Ráquira",
      code: 15600,
      codefacturador: 12809
    },
    {
      id: 273,
      "departament_id": 7,
      name: "Rondón",
      code: 15621,
      codefacturador: 12810
    },
    {
      id: 274,
      "departament_id": 7,
      name: "Saboyá",
      code: 15632,
      codefacturador: 12811
    },
    {
      id: 275,
      "departament_id": 7,
      name: "Sáchica",
      code: 15638,
      codefacturador: 12812
    },
    {
      id: 276,
      "departament_id": 7,
      name: "Samacá",
      code: 15646,
      codefacturador: 12813
    },
    {
      id: 277,
      "departament_id": 7,
      name: "San Eduardo ",
      code: 15660,
      codefacturador: 12814
    },
    {
      id: 278,
      "departament_id": 7,
      name: "San José De Pare",
      code: 15664,
      codefacturador: 12815
    },
    {
      id: 279,
      "departament_id": 7,
      name: "San Luis De Gaceno",
      code: 15667,
      codefacturador: 12816
    },
    {
      id: 280,
      "departament_id": 7,
      name: "San Mateo ",
      code: 15673,
      codefacturador: 12817
    },
    {
      id: 281,
      "departament_id": 7,
      name: "San Miguel De Sema",
      code: 15676,
      codefacturador: 12818
    },
    {
      id: 282,
      "departament_id": 7,
      name: "San Pablo De Borbur",
      code: 15681,
      codefacturador: 12819
    },
    {
      id: 283,
      "departament_id": 7,
      name: "Santana",
      code: 15686,
      codefacturador: 12823
    },
    {
      id: 284,
      "departament_id": 7,
      name: "Santa María ",
      code: 15690,
      codefacturador: 13192
    },
    {
      id: 285,
      "departament_id": 7,
      name: "Santa Rosa De Viterbo",
      code: 15693,
      codefacturador: 12821
    },
    {
      id: 286,
      "departament_id": 7,
      name: "Santa Sofía ",
      code: 15696,
      codefacturador: 12822
    },
    {
      id: 287,
      "departament_id": 7,
      name: "Sativanorte",
      code: 15720,
      codefacturador: 12824
    },
    {
      id: 288,
      "departament_id": 7,
      name: "Sativasur",
      code: 15723,
      codefacturador: 12825
    },
    {
      id: 289,
      "departament_id": 7,
      name: "Siachoque",
      code: 15740,
      codefacturador: 12826
    },
    {
      id: 290,
      "departament_id": 7,
      name: "Soatá",
      code: 15753,
      codefacturador: 12827
    },
    {
      id: 291,
      "departament_id": 7,
      name: "Socotá",
      code: 15755,
      codefacturador: 12829
    },
    {
      id: 292,
      "departament_id": 7,
      name: "Socha",
      code: 15757,
      codefacturador: 12828
    },
    {
      id: 293,
      "departament_id": 7,
      name: "Sogamoso",
      code: 15759,
      codefacturador: 12830
    },
    {
      id: 294,
      "departament_id": 7,
      name: "Somondoco",
      code: 15761,
      codefacturador: 12831
    },
    {
      id: 295,
      "departament_id": 7,
      name: "Sora",
      code: 15762,
      codefacturador: 12832
    },
    {
      id: 296,
      "departament_id": 7,
      name: "Sotaquirá",
      code: 15763,
      codefacturador: 12834
    },
    {
      id: 297,
      "departament_id": 7,
      name: "Soracá",
      code: 15764,
      codefacturador: 12833
    },
    {
      id: 298,
      "departament_id": 7,
      name: "Susacón",
      code: 15774,
      codefacturador: 12835
    },
    {
      id: 299,
      "departament_id": 7,
      name: "Sutamarchán",
      code: 15776,
      codefacturador: 12836
    },
    {
      id: 300,
      "departament_id": 7,
      name: "Sutatenza",
      code: 15778,
      codefacturador: 12837
    },
    {
      id: 301,
      "departament_id": 7,
      name: "Tasco",
      code: 15790,
      codefacturador: 12838
    },
    {
      id: 302,
      "departament_id": 7,
      name: "Tenza",
      code: 15798,
      codefacturador: 12839
    },
    {
      id: 303,
      "departament_id": 7,
      name: "Tibaná",
      code: 15804,
      codefacturador: 12840
    },
    {
      id: 304,
      "departament_id": 7,
      name: "Tibasosa",
      code: 15806,
      codefacturador: 12841
    },
    {
      id: 305,
      "departament_id": 7,
      name: "Tinjacá",
      code: 15808,
      codefacturador: 12842
    },
    {
      id: 306,
      "departament_id": 7,
      name: "Tipacoque",
      code: 15810,
      codefacturador: 12843
    },
    {
      id: 307,
      "departament_id": 7,
      name: "Toca",
      code: 15814,
      codefacturador: 12844
    },
    {
      id: 308,
      "departament_id": 7,
      name: "Togüí",
      code: 15816,
      codefacturador: 12845
    },
    {
      id: 309,
      "departament_id": 7,
      name: "Tópaga",
      code: 15820,
      codefacturador: 12846
    },
    {
      id: 310,
      "departament_id": 7,
      name: "Tota",
      code: 15822,
      codefacturador: 12847
    },
    {
      id: 311,
      "departament_id": 7,
      name: "Tununguá",
      code: 15832,
      codefacturador: 12849
    },
    {
      id: 312,
      "departament_id": 7,
      name: "Turmequé",
      code: 15835,
      codefacturador: 12850
    },
    {
      id: 313,
      "departament_id": 7,
      name: "Tuta",
      code: 15837,
      codefacturador: 12851
    },
    {
      id: 314,
      "departament_id": 7,
      name: "Tutazá",
      code: 15839,
      codefacturador: 12852
    },
    {
      id: 315,
      "departament_id": 7,
      name: "Úmbita",
      code: 15842,
      codefacturador: 12853
    },
    {
      id: 316,
      "departament_id": 7,
      name: "Ventaquemada",
      code: 15861,
      codefacturador: 12854
    },
    {
      id: 317,
      "departament_id": 7,
      name: "Viracachá",
      code: 15879,
      codefacturador: 12855
    },
    {
      id: 318,
      "departament_id": 7,
      name: "Zetaquira",
      code: 15897,
      codefacturador: 12856
    },
    {
      id: 319,
      "departament_id": 8,
      name: "Manizales",
      code: 17001,
      codefacturador: 12865
    },
    {
      id: 320,
      "departament_id": 8,
      name: "Aguadas",
      code: 17013,
      codefacturador: 12857
    },
    {
      id: 321,
      "departament_id": 8,
      name: "Anserma",
      code: 17042,
      codefacturador: 12858
    },
    {
      id: 322,
      "departament_id": 8,
      name: "Aranzazu",
      code: 17050,
      codefacturador: 12859
    },
    {
      id: 323,
      "departament_id": 8,
      name: "Belalcázar",
      code: 17088,
      codefacturador: 12860
    },
    {
      id: 324,
      "departament_id": 8,
      name: "Chinchiná",
      code: 17174,
      codefacturador: 12861
    },
    {
      id: 325,
      "departament_id": 8,
      name: "Filadelfia",
      code: 17272,
      codefacturador: 12862
    },
    {
      id: 326,
      "departament_id": 8,
      name: "La Dorada ",
      code: 17380,
      codefacturador: 12863
    },
    {
      id: 327,
      "departament_id": 8,
      name: "La Merced ",
      code: 17388,
      codefacturador: 12864
    },
    {
      id: 328,
      "departament_id": 8,
      name: "Manzanares",
      code: 17433,
      codefacturador: 12866
    },
    {
      id: 329,
      "departament_id": 8,
      name: "Marmato",
      code: 17442,
      codefacturador: 12867
    },
    {
      id: 330,
      "departament_id": 8,
      name: "Marquetalia",
      code: 17444,
      codefacturador: 12868
    },
    {
      id: 331,
      "departament_id": 8,
      name: "Marulanda",
      code: 17446,
      codefacturador: 12869
    },
    {
      id: 332,
      "departament_id": 8,
      name: "Neira",
      code: 17486,
      codefacturador: 12870
    },
    {
      id: 333,
      "departament_id": 8,
      name: "Norcasia",
      code: 17495,
      codefacturador: 12871
    },
    {
      id: 334,
      "departament_id": 8,
      name: "Pácora",
      code: 17513,
      codefacturador: 12872
    },
    {
      id: 335,
      "departament_id": 8,
      name: "Palestina",
      code: 17524,
      codefacturador: 13186
    },
    {
      id: 336,
      "departament_id": 8,
      name: "Pensilvania",
      code: 17541,
      codefacturador: 12874
    },
    {
      id: 337,
      "departament_id": 8,
      name: "Riosucio",
      code: 17614,
      codefacturador: 13009
    },
    {
      id: 338,
      "departament_id": 8,
      name: "Risaralda",
      code: 17616,
      codefacturador: 12876
    },
    {
      id: 339,
      "departament_id": 8,
      name: "Salamina",
      code: 17653,
      codefacturador: 13221
    },
    {
      id: 340,
      "departament_id": 8,
      name: "Samaná",
      code: 17662,
      codefacturador: 12878
    },
    {
      id: 341,
      "departament_id": 8,
      name: "San José ",
      code: 17665,
      codefacturador: 12879
    },
    {
      id: 342,
      "departament_id": 8,
      name: "Supía",
      code: 17777,
      codefacturador: 12880
    },
    {
      id: 343,
      "departament_id": 8,
      name: "Victoria",
      code: 17867,
      codefacturador: 12881
    },
    {
      id: 344,
      "departament_id": 8,
      name: "Villamaría",
      code: 17873,
      codefacturador: 12882
    },
    {
      id: 345,
      "departament_id": 8,
      name: "Viterbo",
      code: 17877,
      codefacturador: 12883
    },
    {
      id: 346,
      "departament_id": 9,
      name: "Florencia",
      code: 18001,
      codefacturador: 12930
    },
    {
      id: 347,
      "departament_id": 9,
      name: "Albania",
      code: 18029,
      codefacturador: 13364
    },
    {
      id: 348,
      "departament_id": 9,
      name: "Belén De Los Andaquíes",
      code: 18094,
      codefacturador: 12885
    },
    {
      id: 349,
      "departament_id": 9,
      name: "Cartagena Del Chairá",
      code: 18150,
      codefacturador: 12886
    },
    {
      id: 350,
      "departament_id": 9,
      name: "Curillo",
      code: 18205,
      codefacturador: 12887
    },
    {
      id: 351,
      "departament_id": 9,
      name: "El Doncello ",
      code: 18247,
      codefacturador: 12888
    },
    {
      id: 352,
      "departament_id": 9,
      name: "El Paujíl ",
      code: 18256,
      codefacturador: 12889
    },
    {
      id: 353,
      "departament_id": 9,
      name: "La Montañita ",
      code: 18410,
      codefacturador: 12891
    },
    {
      id: 354,
      "departament_id": 9,
      name: "Milán",
      code: 18460,
      codefacturador: 12892
    },
    {
      id: 355,
      "departament_id": 9,
      name: "Morelia",
      code: 18479,
      codefacturador: 12893
    },
    {
      id: 356,
      "departament_id": 9,
      name: "Puerto Rico ",
      code: 18592,
      codefacturador: 13252
    },
    {
      id: 357,
      "departament_id": 9,
      name: "San José Del Fragua",
      code: 18610,
      codefacturador: 12815
    },
    {
      id: 358,
      "departament_id": 9,
      name: "San Vicente Del Caguán",
      code: 18753,
      codefacturador: 12896
    },
    {
      id: 359,
      "departament_id": 9,
      name: "Solano",
      code: 18756,
      codefacturador: 12897
    },
    {
      id: 360,
      "departament_id": 9,
      name: "Solita",
      code: 18785,
      codefacturador: 12898
    },
    {
      id: 361,
      "departament_id": 9,
      name: "Valparaíso",
      code: 18860,
      codefacturador: 12899
    },
    {
      id: 362,
      "departament_id": 11,
      name: "Popayán",
      code: 19001,
      codefacturador: 12944
    },
    {
      id: 363,
      "departament_id": 11,
      name: "Almaguer",
      code: 19022,
      codefacturador: 12919
    },
    {
      id: 364,
      "departament_id": 11,
      name: "Argelia",
      code: 19050,
      codefacturador: 12920
    },
    {
      id: 365,
      "departament_id": 11,
      name: "Balboa",
      code: 19075,
      codefacturador: 13350
    },
    {
      id: 366,
      "departament_id": 11,
      name: "Bolívar",
      code: 19100,
      codefacturador: 13370
    },
    {
      id: 367,
      "departament_id": 11,
      name: "Buenos Aires ",
      code: 19110,
      codefacturador: 12923
    },
    {
      id: 368,
      "departament_id": 11,
      name: "Cajibío",
      code: 19130,
      codefacturador: 12924
    },
    {
      id: 369,
      "departament_id": 11,
      name: "Caldono",
      code: 19137,
      codefacturador: 12925
    },
    {
      id: 370,
      "departament_id": 11,
      name: "Caloto",
      code: 19142,
      codefacturador: 12926
    },
    {
      id: 371,
      "departament_id": 11,
      name: "Corinto",
      code: 19212,
      codefacturador: 12927
    },
    {
      id: 372,
      "departament_id": 11,
      name: "El Tambo ",
      code: 19256,
      codefacturador: 13279
    },
    {
      id: 373,
      "departament_id": 11,
      name: "Florencia",
      code: 19290,
      codefacturador: 12930
    },
    {
      id: 374,
      "departament_id": 11,
      name: "Guachené",
      code: 19300,
      codefacturador: 12772
    },
    {
      id: 375,
      "departament_id": 11,
      name: "Guapí",
      code: 19318,
      codefacturador: 12931
    },
    {
      id: 376,
      "departament_id": 11,
      name: "Inzá",
      code: 19355,
      codefacturador: 12932
    },
    {
      id: 377,
      "departament_id": 11,
      name: "Jambaló",
      code: 19364,
      codefacturador: 12933
    },
    {
      id: 378,
      "departament_id": 11,
      name: "La Sierra ",
      code: 19392,
      codefacturador: 12934
    },
    {
      id: 379,
      "departament_id": 11,
      name: "La Vega ",
      code: 19397,
      codefacturador: 13094
    },
    {
      id: 380,
      "departament_id": 11,
      name: "López De Micay",
      code: 19418,
      codefacturador: 12936
    },
    {
      id: 381,
      "departament_id": 11,
      name: "Mercaderes",
      code: 19450,
      codefacturador: 12937
    },
    {
      id: 382,
      "departament_id": 11,
      name: "Miranda",
      code: 19455,
      codefacturador: 12938
    },
    {
      id: 383,
      "departament_id": 11,
      name: "Morales",
      code: 19473,
      codefacturador: 12939
    },
    {
      id: 384,
      "departament_id": 11,
      name: "Padilla",
      code: 19513,
      codefacturador: 12940
    },
    {
      id: 385,
      "departament_id": 11,
      name: "Páez",
      code: 19517,
      codefacturador: 12941
    },
    {
      id: 386,
      "departament_id": 11,
      name: "Patía",
      code: 19532,
      codefacturador: 13301
    },
    {
      id: 387,
      "departament_id": 11,
      name: "Piamonte",
      code: 19533,
      codefacturador: 12942
    },
    {
      id: 388,
      "departament_id": 11,
      name: "Piendamó - Tunía",
      code: 19548,
      codefacturador: 12943
    },
    {
      id: 389,
      "departament_id": 11,
      name: "Puerto Tejada ",
      code: 19573,
      codefacturador: 12945
    },
    {
      id: 390,
      "departament_id": 11,
      name: "Puracé",
      code: 19585,
      codefacturador: 12946
    },
    {
      id: 391,
      "departament_id": 11,
      name: "Rosas",
      code: 19622,
      codefacturador: 12947
    },
    {
      id: 392,
      "departament_id": 11,
      name: "San Sebastián ",
      code: 19693,
      codefacturador: 13222
    },
    {
      id: 393,
      "departament_id": 11,
      name: "Santander De Quilichao",
      code: 19698,
      codefacturador: 12950
    },
    {
      id: 394,
      "departament_id": 11,
      name: "Santa Rosa ",
      code: 19701,
      codefacturador: 12949
    },
    {
      id: 395,
      "departament_id": 11,
      name: "Silvia",
      code: 19743,
      codefacturador: 12951
    },
    {
      id: 396,
      "departament_id": 11,
      name: "Sotara",
      code: 19760,
      codefacturador: 12952
    },
    {
      id: 397,
      "departament_id": 11,
      name: "Suárez",
      code: 19780,
      codefacturador: 13517
    },
    {
      id: 398,
      "departament_id": 11,
      name: "Sucre",
      code: 19785,
      codefacturador: 13472
    },
    {
      id: 399,
      "departament_id": 11,
      name: "Timbío",
      code: 19807,
      codefacturador: 12955
    },
    {
      id: 400,
      "departament_id": 11,
      name: "Timbiquí",
      code: 19809,
      codefacturador: 12956
    },
    {
      id: 401,
      "departament_id": 11,
      name: "Toribío",
      code: 19821,
      codefacturador: 12957
    },
    {
      id: 402,
      "departament_id": 11,
      name: "Totoró",
      code: 19824,
      codefacturador: 12958
    },
    {
      id: 403,
      "departament_id": 11,
      name: "Villa Rica ",
      code: 19845,
      codefacturador: 12959
    },
    {
      id: 404,
      "departament_id": 12,
      name: "Valledupar",
      code: 20001,
      codefacturador: 12984
    },
    {
      id: 405,
      "departament_id": 12,
      name: "Aguachica",
      code: 20011,
      codefacturador: 12960
    },
    {
      id: 406,
      "departament_id": 12,
      name: "Agustín Codazzi ",
      code: 20013,
      codefacturador: 12961
    },
    {
      id: 407,
      "departament_id": 12,
      name: "Astrea",
      code: 20032,
      codefacturador: 12962
    },
    {
      id: 408,
      "departament_id": 12,
      name: "Becerril",
      code: 20045,
      codefacturador: 12963
    },
    {
      id: 409,
      "departament_id": 12,
      name: "Bosconia",
      code: 20060,
      codefacturador: 12964
    },
    {
      id: 410,
      "departament_id": 12,
      name: "Chimichagua",
      code: 20175,
      codefacturador: 12965
    },
    {
      id: 411,
      "departament_id": 12,
      name: "Chiriguaná",
      code: 20178,
      codefacturador: 12966
    },
    {
      id: 412,
      "departament_id": 12,
      name: "Curumaní",
      code: 20228,
      codefacturador: 12967
    },
    {
      id: 413,
      "departament_id": 12,
      name: "El Copey ",
      code: 20238,
      codefacturador: 12968
    },
    {
      id: 414,
      "departament_id": 12,
      name: "El Paso ",
      code: 20250,
      codefacturador: 12969
    },
    {
      id: 415,
      "departament_id": 12,
      name: "Gamarra",
      code: 20295,
      codefacturador: 12970
    },
    {
      id: 416,
      "departament_id": 12,
      name: "González",
      code: 20310,
      codefacturador: 12971
    },
    {
      id: 417,
      "departament_id": 12,
      name: "La Gloria ",
      code: 20383,
      codefacturador: 12972
    },
    {
      id: 418,
      "departament_id": 12,
      name: "La Jagua De Ibirico",
      code: 20400,
      codefacturador: 12972
    },
    {
      id: 419,
      "departament_id": 12,
      name: "Manaure Balcón Del Cesar",
      code: 20443,
      codefacturador: 12974
    },
    {
      id: 420,
      "departament_id": 12,
      name: "Pailitas",
      code: 20517,
      codefacturador: 12975
    },
    {
      id: 421,
      "departament_id": 12,
      name: "Pelaya",
      code: 20550,
      codefacturador: 12976
    },
    {
      id: 422,
      "departament_id": 12,
      name: "Pueblo Bello ",
      code: 20570,
      codefacturador: 12977
    },
    {
      id: 423,
      "departament_id": 12,
      name: "Río De Oro",
      code: 20614,
      codefacturador: 12978
    },
    {
      id: 424,
      "departament_id": 12,
      name: "La Paz ",
      code: 20621,
      codefacturador: 13408
    },
    {
      id: 425,
      "departament_id": 12,
      name: "San Alberto ",
      code: 20710,
      codefacturador: 12980
    },
    {
      id: 426,
      "departament_id": 12,
      name: "San Diego ",
      code: 20750,
      codefacturador: 12981
    },
    {
      id: 427,
      "departament_id": 12,
      name: "San Martín ",
      code: 20770,
      codefacturador: 13257
    },
    {
      id: 428,
      "departament_id": 12,
      name: "Tamalameque",
      code: 20787,
      codefacturador: 12983
    },
    {
      id: 429,
      "departament_id": 14,
      name: "Montería",
      code: 23001,
      codefacturador: 13029
    },
    {
      id: 430,
      "departament_id": 14,
      name: "Ayapel",
      code: 23068,
      codefacturador: 13015
    },
    {
      id: 431,
      "departament_id": 14,
      name: "Buenavista",
      code: 23079,
      codefacturador: 13450
    },
    {
      id: 432,
      "departament_id": 14,
      name: "Canalete",
      code: 23090,
      codefacturador: 13017
    },
    {
      id: 433,
      "departament_id": 14,
      name: "Cereté",
      code: 23162,
      codefacturador: 13018
    },
    {
      id: 434,
      "departament_id": 14,
      name: "Chimá",
      code: 23168,
      codefacturador: 13380
    },
    {
      id: 435,
      "departament_id": 14,
      name: "Chinú",
      code: 23182,
      codefacturador: 13020
    },
    {
      id: 436,
      "departament_id": 14,
      name: "Ciénaga De Oro",
      code: 23189,
      codefacturador: 13021
    },
    {
      id: 437,
      "departament_id": 14,
      name: "Cotorra",
      code: 23300,
      codefacturador: 13022
    },
    {
      id: 438,
      "departament_id": 14,
      name: "La Apartada ",
      code: 23350,
      codefacturador: 13023
    },
    {
      id: 439,
      "departament_id": 14,
      name: "Lorica",
      code: 23417,
      codefacturador: 13024
    },
    {
      id: 440,
      "departament_id": 14,
      name: "Los Córdobas ",
      code: 23419,
      codefacturador: 13025
    },
    {
      id: 441,
      "departament_id": 14,
      name: "Momil",
      code: 23464,
      codefacturador: 13026
    },
    {
      id: 442,
      "departament_id": 14,
      name: "Montelíbano",
      code: 23466,
      codefacturador: 13028
    },
    {
      id: 443,
      "departament_id": 14,
      name: "Moñitos",
      code: 23500,
      codefacturador: 12905
    },
    {
      id: 444,
      "departament_id": 14,
      name: "Planeta Rica ",
      code: 23555,
      codefacturador: 13030
    },
    {
      id: 445,
      "departament_id": 14,
      name: "Pueblo Nuevo ",
      code: 23570,
      codefacturador: 13031
    },
    {
      id: 446,
      "departament_id": 14,
      name: "Puerto Escondido ",
      code: 23574,
      codefacturador: 13032
    },
    {
      id: 447,
      "departament_id": 14,
      name: "Puerto Libertador ",
      code: 23580,
      codefacturador: 13033
    },
    {
      id: 448,
      "departament_id": 14,
      name: "Purísima De La Concepción",
      code: 23586,
      codefacturador: 13034
    },
    {
      id: 449,
      "departament_id": 14,
      name: "Sahagún",
      code: 23660,
      codefacturador: 13035
    },
    {
      id: 450,
      "departament_id": 14,
      name: "San Andrés De Sotavento",
      code: 23670,
      codefacturador: 13430
    },
    {
      id: 451,
      "departament_id": 14,
      name: "San Antero ",
      code: 23672,
      codefacturador: 13037
    },
    {
      id: 452,
      "departament_id": 14,
      name: "San Bernardo Del Viento",
      code: 23675,
      codefacturador: 13311
    },
    {
      id: 453,
      "departament_id": 14,
      name: "San Carlos ",
      code: 23678,
      codefacturador: 13039
    },
    {
      id: 454,
      "departament_id": 14,
      name: "San José De Uré",
      code: 23682,
      codefacturador: 12815
    },
    {
      id: 455,
      "departament_id": 14,
      name: "San Pelayo ",
      code: 23686,
      codefacturador: 13040
    },
    {
      id: 456,
      "departament_id": 14,
      name: "Tierralta",
      code: 23807,
      codefacturador: 13041
    },
    {
      id: 457,
      "departament_id": 14,
      name: "Tuchín",
      code: 23815,
      codefacturador: 12686
    },
    {
      id: 458,
      "departament_id": 14,
      name: "Valencia",
      code: 23855,
      codefacturador: 13042
    },
    {
      id: 459,
      "departament_id": 15,
      name: "Agua De Dios",
      code: 25001,
      codefacturador: 13043
    },
    {
      id: 460,
      "departament_id": 15,
      name: "Albán",
      code: 25019,
      codefacturador: 13260
    },
    {
      id: 461,
      "departament_id": 15,
      name: "Anapoima",
      code: 25035,
      codefacturador: 13045
    },
    {
      id: 462,
      "departament_id": 15,
      name: "Anolaima",
      code: 25040,
      codefacturador: 13046
    },
    {
      id: 463,
      "departament_id": 15,
      name: "Arbeláez",
      code: 25053,
      codefacturador: 13047
    },
    {
      id: 464,
      "departament_id": 15,
      name: "Beltrán",
      code: 25086,
      codefacturador: 13048
    },
    {
      id: 465,
      "departament_id": 15,
      name: "Bituima",
      code: 25095,
      codefacturador: 13049
    },
    {
      id: 466,
      "departament_id": 15,
      name: "Bojacá",
      code: 25099,
      codefacturador: 13050
    },
    {
      id: 467,
      "departament_id": 15,
      name: "Cabrera",
      code: 25120,
      codefacturador: 13372
    },
    {
      id: 468,
      "departament_id": 15,
      name: "Cachipay",
      code: 25123,
      codefacturador: 13052
    },
    {
      id: 469,
      "departament_id": 15,
      name: "Cajicá",
      code: 25126,
      codefacturador: 13053
    },
    {
      id: 470,
      "departament_id": 15,
      name: "Caparrapí",
      code: 25148,
      codefacturador: 13054
    },
    {
      id: 471,
      "departament_id": 15,
      name: "Cáqueza",
      code: 25151,
      codefacturador: 13055
    },
    {
      id: 472,
      "departament_id": 15,
      name: "Carmen De Carupa",
      code: 25154,
      codefacturador: 13056
    },
    {
      id: 473,
      "departament_id": 15,
      name: "Chaguaní",
      code: 25168,
      codefacturador: 13057
    },
    {
      id: 474,
      "departament_id": 15,
      name: "Chía",
      code: 25175,
      codefacturador: 13058
    },
    {
      id: 475,
      "departament_id": 15,
      name: "Chipaque",
      code: 25178,
      codefacturador: 13059
    },
    {
      id: 476,
      "departament_id": 15,
      name: "Choachí",
      code: 25181,
      codefacturador: 13060
    },
    {
      id: 477,
      "departament_id": 15,
      name: "Chocontá",
      code: 25183,
      codefacturador: 13061
    },
    {
      id: 478,
      "departament_id": 15,
      name: "Cogua",
      code: 25200,
      codefacturador: 13062
    },
    {
      id: 479,
      "departament_id": 15,
      name: "Cota",
      code: 25214,
      codefacturador: 13063
    },
    {
      id: 480,
      "departament_id": 15,
      name: "Cucunubá",
      code: 25224,
      codefacturador: 13064
    },
    {
      id: 481,
      "departament_id": 15,
      name: "El Colegio ",
      code: 25245,
      codefacturador: 13065
    },
    {
      id: 482,
      "departament_id": 15,
      name: "El Peñón ",
      code: 25258,
      codefacturador: 13390
    },
    {
      id: 483,
      "departament_id": 15,
      name: "El Rosal ",
      code: 25260,
      codefacturador: 13067
    },
    {
      id: 484,
      "departament_id": 15,
      name: "Facatativá",
      code: 25269,
      codefacturador: 13068
    },
    {
      id: 485,
      "departament_id": 15,
      name: "Fómeque",
      code: 25279,
      codefacturador: 13069
    },
    {
      id: 486,
      "departament_id": 15,
      name: "Fosca",
      code: 25281,
      codefacturador: 13070
    },
    {
      id: 487,
      "departament_id": 15,
      name: "Funza",
      code: 25286,
      codefacturador: 13071
    },
    {
      id: 488,
      "departament_id": 15,
      name: "Fúquene",
      code: 25288,
      codefacturador: 13072
    },
    {
      id: 489,
      "departament_id": 15,
      name: "Fusagasugá",
      code: 25290,
      codefacturador: 13073
    },
    {
      id: 490,
      "departament_id": 15,
      name: "Gachalá",
      code: 25293,
      codefacturador: 13074
    },
    {
      id: 491,
      "departament_id": 15,
      name: "Gachancipá",
      code: 25295,
      codefacturador: 13075
    },
    {
      id: 492,
      "departament_id": 15,
      name: "Gachetá",
      code: 25297,
      codefacturador: 13076
    },
    {
      id: 493,
      "departament_id": 15,
      name: "Gama",
      code: 25299,
      codefacturador: 13077
    },
    {
      id: 494,
      "departament_id": 15,
      name: "Girardot",
      code: 25307,
      codefacturador: 13078
    },
    {
      id: 495,
      "departament_id": 15,
      name: "Granada",
      code: 25312,
      codefacturador: 13241
    },
    {
      id: 496,
      "departament_id": 15,
      name: "Guachetá",
      code: 25317,
      codefacturador: 13080
    },
    {
      id: 497,
      "departament_id": 15,
      name: "Guaduas",
      code: 25320,
      codefacturador: 13081
    },
    {
      id: 498,
      "departament_id": 15,
      name: "Guasca",
      code: 25322,
      codefacturador: 13082
    },
    {
      id: 499,
      "departament_id": 15,
      name: "Guataquí",
      code: 25324,
      codefacturador: 13083
    },
    {
      id: 500,
      "departament_id": 15,
      name: "Guatavita",
      code: 25326,
      codefacturador: 13084
    },
    {
      id: 501,
      "departament_id": 15,
      name: "Guayabal De Síquima",
      code: 25328,
      codefacturador: 13085
    },
    {
      id: 502,
      "departament_id": 15,
      name: "Guayabetal",
      code: 25335,
      codefacturador: 13086
    },
    {
      id: 503,
      "departament_id": 15,
      name: "Gutiérrez",
      code: 25339,
      codefacturador: 13087
    },
    {
      id: 504,
      "departament_id": 15,
      name: "Jerusalén",
      code: 25368,
      codefacturador: 13088
    },
    {
      id: 505,
      "departament_id": 15,
      name: "Junín",
      code: 25372,
      codefacturador: 13089
    },
    {
      id: 506,
      "departament_id": 15,
      name: "La Calera ",
      code: 25377,
      codefacturador: 13090
    },
    {
      id: 507,
      "departament_id": 15,
      name: "La Mesa ",
      code: 25386,
      codefacturador: 13091
    },
    {
      id: 508,
      "departament_id": 15,
      name: "La Palma ",
      code: 25394,
      codefacturador: 13092
    },
    {
      id: 509,
      "departament_id": 15,
      name: "La Peña ",
      code: 25398,
      codefacturador: 13093
    },
    {
      id: 510,
      "departament_id": 15,
      name: "La Vega ",
      code: 25402,
      codefacturador: 13094
    },
    {
      id: 511,
      "departament_id": 15,
      name: "Lenguazaque",
      code: 25407,
      codefacturador: 13095
    },
    {
      id: 512,
      "departament_id": 15,
      name: "Machetá",
      code: 25426,
      codefacturador: 13096
    },
    {
      id: 513,
      "departament_id": 15,
      name: "Madrid",
      code: 25430,
      codefacturador: 13097
    },
    {
      id: 514,
      "departament_id": 15,
      name: "Manta",
      code: 25436,
      codefacturador: 13098
    },
    {
      id: 515,
      "departament_id": 15,
      name: "Medina",
      code: 25438,
      codefacturador: 13099
    },
    {
      id: 516,
      "departament_id": 15,
      name: "Mosquera",
      code: 25473,
      codefacturador: 13297
    },
    {
      id: 517,
      "departament_id": 15,
      name: "Nariño",
      code: 25483,
      codefacturador: 13298
    },
    {
      id: 518,
      "departament_id": 15,
      name: "Nemocón",
      code: 25486,
      codefacturador: 13102
    },
    {
      id: 519,
      "departament_id": 15,
      name: "Nilo",
      code: 25488,
      codefacturador: 13103
    },
    {
      id: 520,
      "departament_id": 15,
      name: "Nimaima",
      code: 25489,
      codefacturador: 13104
    },
    {
      id: 521,
      "departament_id": 15,
      name: "Nocaima",
      code: 25491,
      codefacturador: 13105
    },
    {
      id: 522,
      "departament_id": 15,
      name: "Venecia",
      code: 25506,
      codefacturador: 12651
    },
    {
      id: 523,
      "departament_id": 15,
      name: "Pacho",
      code: 25513,
      codefacturador: 13107
    },
    {
      id: 524,
      "departament_id": 15,
      name: "Paime",
      code: 25518,
      codefacturador: 13108
    },
    {
      id: 525,
      "departament_id": 15,
      name: "Pandi",
      code: 25524,
      codefacturador: 13109
    },
    {
      id: 526,
      "departament_id": 15,
      name: "Paratebueno",
      code: 25530,
      codefacturador: 13110
    },
    {
      id: 527,
      "departament_id": 15,
      name: "Pasca",
      code: 25535,
      codefacturador: 13111
    },
    {
      id: 528,
      "departament_id": 15,
      name: "Puerto Salgar ",
      code: 25572,
      codefacturador: 13112
    },
    {
      id: 529,
      "departament_id": 15,
      name: "Pulí",
      code: 25580,
      codefacturador: 13113
    },
    {
      id: 530,
      "departament_id": 15,
      name: "Quebradanegra",
      code: 25592,
      codefacturador: 13114
    },
    {
      id: 531,
      "departament_id": 15,
      name: "Quetame",
      code: 25594,
      codefacturador: 13115
    },
    {
      id: 532,
      "departament_id": 15,
      name: "Quipile",
      code: 25596,
      codefacturador: 13116
    },
    {
      id: 533,
      "departament_id": 15,
      name: "Apulo",
      code: 25599,
      codefacturador: 13349
    },
    {
      id: 534,
      "departament_id": 15,
      name: "Ricaurte",
      code: 25612,
      codefacturador: 13308
    },
    {
      id: 535,
      "departament_id": 15,
      name: "San Antonio Del Tequendama",
      code: 25645,
      codefacturador: 13119
    },
    {
      id: 536,
      "departament_id": 15,
      name: "San Bernardo ",
      code: 25649,
      codefacturador: 13311
    },
    {
      id: 537,
      "departament_id": 15,
      name: "San Cayetano ",
      code: 25653,
      codefacturador: 13121
    },
    {
      id: 538,
      "departament_id": 15,
      name: "San Francisco ",
      code: 25658,
      codefacturador: 13331
    },
    {
      id: 539,
      "departament_id": 15,
      name: "San Juan De Rioseco",
      code: 25662,
      codefacturador: 13123
    },
    {
      id: 540,
      "departament_id": 15,
      name: "Sasaima",
      code: 25718,
      codefacturador: 13124
    },
    {
      id: 541,
      "departament_id": 15,
      name: "Sesquilé",
      code: 25736,
      codefacturador: 13125
    },
    {
      id: 542,
      "departament_id": 15,
      name: "Sibaté",
      code: 25740,
      codefacturador: 13126
    },
    {
      id: 543,
      "departament_id": 15,
      name: "Silvania",
      code: 25743,
      codefacturador: 13127
    },
    {
      id: 544,
      "departament_id": 15,
      name: "Simijaca",
      code: 25745,
      codefacturador: 13128
    },
    {
      id: 545,
      "departament_id": 15,
      name: "Soacha",
      code: 25754,
      codefacturador: 13129
    },
    {
      id: 546,
      "departament_id": 15,
      name: "Sopó",
      code: 25758,
      codefacturador: 13130
    },
    {
      id: 547,
      "departament_id": 15,
      name: "Subachoque",
      code: 25769,
      codefacturador: 13131
    },
    {
      id: 548,
      "departament_id": 15,
      name: "Suesca",
      code: 25772,
      codefacturador: 13132
    },
    {
      id: 549,
      "departament_id": 15,
      name: "Supatá",
      code: 25777,
      codefacturador: 13133
    },
    {
      id: 550,
      "departament_id": 15,
      name: "Susa",
      code: 25779,
      codefacturador: 13134
    },
    {
      id: 551,
      "departament_id": 15,
      name: "Sutatausa",
      code: 25781,
      codefacturador: 13135
    },
    {
      id: 552,
      "departament_id": 15,
      name: "Tabio",
      code: 25785,
      codefacturador: 13136
    },
    {
      id: 553,
      "departament_id": 15,
      name: "Tausa",
      code: 25793,
      codefacturador: 13137
    },
    {
      id: 554,
      "departament_id": 15,
      name: "Tena",
      code: 25797,
      codefacturador: 13138
    },
    {
      id: 555,
      "departament_id": 15,
      name: "Tenjo",
      code: 25799,
      codefacturador: 13139
    },
    {
      id: 556,
      "departament_id": 15,
      name: "Tibacuy",
      code: 25805,
      codefacturador: 13140
    },
    {
      id: 557,
      "departament_id": 15,
      name: "Tibirita",
      code: 25807,
      codefacturador: 13141
    },
    {
      id: 558,
      "departament_id": 15,
      name: "Tocaima",
      code: 25815,
      codefacturador: 13142
    },
    {
      id: 559,
      "departament_id": 15,
      name: "Tocancipá",
      code: 25817,
      codefacturador: 13143
    },
    {
      id: 560,
      "departament_id": 15,
      name: "Topaipí",
      code: 25823,
      codefacturador: 13144
    },
    {
      id: 561,
      "departament_id": 15,
      name: "Ubalá",
      code: 25839,
      codefacturador: 13145
    },
    {
      id: 562,
      "departament_id": 15,
      name: "Ubaque",
      code: 25841,
      codefacturador: 13146
    },
    {
      id: 563,
      "departament_id": 15,
      name: "Villa De San Diego De Ubaté",
      code: 25843,
      codefacturador: 12652
    },
    {
      id: 564,
      "departament_id": 15,
      name: "Une",
      code: 25845,
      codefacturador: 13148
    },
    {
      id: 565,
      "departament_id": 15,
      name: "Útica",
      code: 25851,
      codefacturador: 13149
    },
    {
      id: 566,
      "departament_id": 15,
      name: "Vergara",
      code: 25862,
      codefacturador: 13150
    },
    {
      id: 567,
      "departament_id": 15,
      name: "Vianí",
      code: 25867,
      codefacturador: 13151
    },
    {
      id: 568,
      "departament_id": 15,
      name: "Villagómez",
      code: 25871,
      codefacturador: 13152
    },
    {
      id: 569,
      "departament_id": 15,
      name: "Villapinzón",
      code: 25873,
      codefacturador: 13153
    },
    {
      id: 570,
      "departament_id": 15,
      name: "Villeta",
      code: 25875,
      codefacturador: 13154
    },
    {
      id: 571,
      "departament_id": 15,
      name: "Viotá",
      code: 25878,
      codefacturador: 13155
    },
    {
      id: 572,
      "departament_id": 15,
      name: "Yacopí",
      code: 25885,
      codefacturador: 13156
    },
    {
      id: 573,
      "departament_id": 15,
      name: "Zipacón",
      code: 25898,
      codefacturador: 13157
    },
    {
      id: 574,
      "departament_id": 15,
      name: "Zipaquirá",
      code: 25899,
      codefacturador: 13158
    },
    {
      id: 575,
      "departament_id": 13,
      name: "Quibdó",
      code: 27001,
      codefacturador: 13006
    },
    {
      id: 576,
      "departament_id": 13,
      name: "Acandí",
      code: 27006,
      codefacturador: 12985
    },
    {
      id: 577,
      "departament_id": 13,
      name: "Alto Baudó ",
      code: 27025,
      codefacturador: 12986
    },
    {
      id: 578,
      "departament_id": 13,
      name: "Atrato",
      code: 27050,
      codefacturador: 12987
    },
    {
      id: 579,
      "departament_id": 13,
      name: "Bagadó",
      code: 27073,
      codefacturador: 12988
    },
    {
      id: 580,
      "departament_id": 13,
      name: "Bahía Solano ",
      code: 27075,
      codefacturador: 12989
    },
    {
      id: 581,
      "departament_id": 13,
      name: "Bajo Baudó ",
      code: 27077,
      codefacturador: 12990
    },
    {
      id: 582,
      "departament_id": 13,
      name: "Bojayá",
      code: 27099,
      codefacturador: 12991
    },
    {
      id: 583,
      "departament_id": 13,
      name: "El Cantón Del San Pablo ",
      code: 27135,
      codefacturador: 13237
    },
    {
      id: 584,
      "departament_id": 13,
      name: "Carmen Del Darién",
      code: 27150,
      codefacturador: 12993
    },
    {
      id: 585,
      "departament_id": 13,
      name: "Cértegui",
      code: 27160,
      codefacturador: 12994
    },
    {
      id: 586,
      "departament_id": 13,
      name: "Condoto",
      code: 27205,
      codefacturador: 12995
    },
    {
      id: 587,
      "departament_id": 13,
      name: "El Carmen De Atrato",
      code: 27245,
      codefacturador: 13388
    },
    {
      id: 588,
      "departament_id": 13,
      name: "El Litoral Del San Juan ",
      code: 27250,
      codefacturador: 12702
    },
    {
      id: 589,
      "departament_id": 13,
      name: "Istmina",
      code: 27361,
      codefacturador: 12997
    },
    {
      id: 590,
      "departament_id": 13,
      name: "Juradó",
      code: 27372,
      codefacturador: 12998
    },
    {
      id: 591,
      "departament_id": 13,
      name: "Lloró",
      code: 27413,
      codefacturador: 13000
    },
    {
      id: 592,
      "departament_id": 13,
      name: "Medio Atrato ",
      code: 27425,
      codefacturador: 13001
    },
    {
      id: 593,
      "departament_id": 13,
      name: "Medio Baudó ",
      code: 27430,
      codefacturador: 13002
    },
    {
      id: 594,
      "departament_id": 13,
      name: "Medio San Juan",
      code: 27450,
      codefacturador: 13003
    },
    {
      id: 595,
      "departament_id": 13,
      name: "Nóvita",
      code: 27491,
      codefacturador: 13004
    },
    {
      id: 596,
      "departament_id": 13,
      name: "Nuquí",
      code: 27495,
      codefacturador: 13005
    },
    {
      id: 597,
      "departament_id": 13,
      name: "Río Iró ",
      code: 27580,
      codefacturador: 13007
    },
    {
      id: 598,
      "departament_id": 13,
      name: "Río Quito ",
      code: 27600,
      codefacturador: 13008
    },
    {
      id: 599,
      "departament_id": 13,
      name: "Riosucio",
      code: 27615,
      codefacturador: 13009
    },
    {
      id: 600,
      "departament_id": 13,
      name: "San José Del Palmar",
      code: 27660,
      codefacturador: 13010
    },
    {
      id: 601,
      "departament_id": 13,
      name: "Sipí",
      code: 27745,
      codefacturador: 13011
    },
    {
      id: 602,
      "departament_id": 13,
      name: "Tadó",
      code: 27787,
      codefacturador: 13012
    },
    {
      id: 603,
      "departament_id": 13,
      name: "Unguía",
      code: 27800,
      codefacturador: 13013
    },
    {
      id: 604,
      "departament_id": 13,
      name: "Unión Panamericana ",
      code: 27810,
      codefacturador: 13014
    },
    {
      id: 605,
      "departament_id": 18,
      name: "Neiva",
      code: 41001,
      codefacturador: 13182
    },
    {
      id: 606,
      "departament_id": 18,
      name: "Acevedo",
      code: 41006,
      codefacturador: 13164
    },
    {
      id: 607,
      "departament_id": 18,
      name: "Agrado",
      code: 41013,
      codefacturador: 13165
    },
    {
      id: 608,
      "departament_id": 18,
      name: "Aipe",
      code: 41016,
      codefacturador: 13166
    },
    {
      id: 609,
      "departament_id": 18,
      name: "Algeciras",
      code: 41020,
      codefacturador: 13167
    },
    {
      id: 610,
      "departament_id": 18,
      name: "Altamira",
      code: 41026,
      codefacturador: 13168
    },
    {
      id: 611,
      "departament_id": 18,
      name: "Baraya",
      code: 41078,
      codefacturador: 13169
    },
    {
      id: 612,
      "departament_id": 18,
      name: "Campoalegre",
      code: 41132,
      codefacturador: 13170
    },
    {
      id: 613,
      "departament_id": 18,
      name: "Colombia",
      code: 41206,
      codefacturador: 13171
    },
    {
      id: 614,
      "departament_id": 18,
      name: "Elías",
      code: 41244,
      codefacturador: 13172
    },
    {
      id: 615,
      "departament_id": 18,
      name: "Garzón",
      code: 41298,
      codefacturador: 13173
    },
    {
      id: 616,
      "departament_id": 18,
      name: "Gigante",
      code: 41306,
      codefacturador: 13174
    },
    {
      id: 617,
      "departament_id": 18,
      name: "Guadalupe",
      code: 41319,
      codefacturador: 13400
    },
    {
      id: 618,
      "departament_id": 18,
      name: "Hobo",
      code: 41349,
      codefacturador: 13176
    },
    {
      id: 619,
      "departament_id": 18,
      name: "Íquira",
      code: 41357,
      codefacturador: 13177
    },
    {
      id: 620,
      "departament_id": 18,
      name: "Isnos",
      code: 41359,
      codefacturador: 13178
    },
    {
      id: 621,
      "departament_id": 18,
      name: "La Argentina ",
      code: 41378,
      codefacturador: 13179
    },
    {
      id: 622,
      "departament_id": 18,
      name: "La Plata ",
      code: 41396,
      codefacturador: 13180
    },
    {
      id: 623,
      "departament_id": 18,
      name: "Nátaga",
      code: 41483,
      codefacturador: 13181
    },
    {
      id: 624,
      "departament_id": 18,
      name: "Oporapa",
      code: 41503,
      codefacturador: 13183
    },
    {
      id: 625,
      "departament_id": 18,
      name: "Paicol",
      code: 41518,
      codefacturador: 13184
    },
    {
      id: 626,
      "departament_id": 18,
      name: "Palermo",
      code: 41524,
      codefacturador: 13185
    },
    {
      id: 627,
      "departament_id": 18,
      name: "Palestina",
      code: 41530,
      codefacturador: 13186
    },
    {
      id: 628,
      "departament_id": 18,
      name: "Pital",
      code: 41548,
      codefacturador: 13187
    },
    {
      id: 629,
      "departament_id": 18,
      name: "Pitalito",
      code: 41551,
      codefacturador: 13188
    },
    {
      id: 630,
      "departament_id": 18,
      name: "Rivera",
      code: 41615,
      codefacturador: 13189
    },
    {
      id: 631,
      "departament_id": 18,
      name: "Saladoblanco",
      code: 41660,
      codefacturador: 13190
    },
    {
      id: 632,
      "departament_id": 18,
      name: "San Agustín ",
      code: 41668,
      codefacturador: 13191
    },
    {
      id: 633,
      "departament_id": 18,
      name: "Santa María ",
      code: 41676,
      codefacturador: 13192
    },
    {
      id: 634,
      "departament_id": 18,
      name: "Suaza",
      code: 41770,
      codefacturador: 13193
    },
    {
      id: 635,
      "departament_id": 18,
      name: "Tarqui",
      code: 41791,
      codefacturador: 13194
    },
    {
      id: 636,
      "departament_id": 18,
      name: "Tesalia",
      code: 41797,
      codefacturador: 13197
    },
    {
      id: 637,
      "departament_id": 18,
      name: "Tello",
      code: 41799,
      codefacturador: 13195
    },
    {
      id: 638,
      "departament_id": 18,
      name: "Teruel",
      code: 41801,
      codefacturador: 13196
    },
    {
      id: 639,
      "departament_id": 18,
      name: "Timaná",
      code: 41807,
      codefacturador: 13198
    },
    {
      id: 640,
      "departament_id": 18,
      name: "Villavieja",
      code: 41872,
      codefacturador: 13199
    },
    {
      id: 641,
      "departament_id": 18,
      name: "Yaguará",
      code: 41885,
      codefacturador: 13200
    },
    {
      id: 642,
      "departament_id": 19,
      name: "Riohacha",
      code: 44001,
      codefacturador: 13510
    },
    {
      id: 643,
      "departament_id": 19,
      name: "Albania",
      code: 44035,
      codefacturador: 13364
    },
    {
      id: 644,
      "departament_id": 19,
      name: "Barrancas",
      code: 44078,
      codefacturador: 13368
    },
    {
      id: 645,
      "departament_id": 19,
      name: "Dibulla",
      code: 44090,
      codefacturador: 12573
    },
    {
      id: 646,
      "departament_id": 19,
      name: "Distracción",
      code: 44098,
      codefacturador: 12573
    },
    {
      id: 647,
      "departament_id": 19,
      name: "El Molino ",
      code: 44110,
      codefacturador: 12702
    },
    {
      id: 648,
      "departament_id": 19,
      name: "Fonseca",
      code: 44279,
      codefacturador: 13069
    },
    {
      id: 649,
      "departament_id": 19,
      name: "Hatonuevo",
      code: 44378,
      codefacturador: 12902
    },
    {
      id: 650,
      "departament_id": 19,
      name: "La Jagua Del Pilar",
      code: 44420,
      codefacturador: 12972
    },
    {
      id: 651,
      "departament_id": 19,
      name: "Maicao",
      code: 44430,
      codefacturador: 12706
    },
    {
      id: 652,
      "departament_id": 19,
      name: "Manaure",
      code: 44560,
      codefacturador: 12974
    },
    {
      id: 653,
      "departament_id": 19,
      name: "San Juan Del Cesar",
      code: 44650,
      codefacturador: 12626
    },
    {
      id: 654,
      "departament_id": 19,
      name: "Uribia",
      code: 44847,
      codefacturador: 12646
    },
    {
      id: 655,
      "departament_id": 19,
      name: "Urumita",
      code: 44855,
      codefacturador: 12647
    },
    {
      id: 656,
      "departament_id": 19,
      name: "Villanueva",
      code: 44874,
      codefacturador: 13448
    },
    {
      id: 657,
      "departament_id": 20,
      name: "Santa Marta ",
      code: 47001,
      codefacturador: 13226
    },
    {
      id: 658,
      "departament_id": 20,
      name: "Algarrobo",
      code: 47030,
      codefacturador: 13201
    },
    {
      id: 659,
      "departament_id": 20,
      name: "Aracataca",
      code: 47053,
      codefacturador: 13202
    },
    {
      id: 660,
      "departament_id": 20,
      name: "Ariguaní",
      code: 47058,
      codefacturador: 13203
    },
    {
      id: 661,
      "departament_id": 20,
      name: "Cerro De San Antonio",
      code: 47161,
      codefacturador: 13377
    },
    {
      id: 662,
      "departament_id": 20,
      name: "Chivolo",
      code: 47170,
      codefacturador: 13205
    },
    {
      id: 663,
      "departament_id": 20,
      name: "Ciénaga",
      code: 47189,
      codefacturador: 13206
    },
    {
      id: 664,
      "departament_id": 20,
      name: "Concordia",
      code: 47205,
      codefacturador: 13207
    },
    {
      id: 665,
      "departament_id": 20,
      name: "El Banco ",
      code: 47245,
      codefacturador: 13208
    },
    {
      id: 666,
      "departament_id": 20,
      name: "El Piñón ",
      code: 47258,
      codefacturador: 13209
    },
    {
      id: 667,
      "departament_id": 20,
      name: "El Retén ",
      code: 47268,
      codefacturador: 13210
    },
    {
      id: 668,
      "departament_id": 20,
      name: "Fundación",
      code: 47288,
      codefacturador: 13211
    },
    {
      id: 669,
      "departament_id": 20,
      name: "Guamal",
      code: 47318,
      codefacturador: 13242
    },
    {
      id: 670,
      "departament_id": 20,
      name: "Nueva Granada ",
      code: 47460,
      codefacturador: 13213
    },
    {
      id: 671,
      "departament_id": 20,
      name: "Pedraza",
      code: 47541,
      codefacturador: 13214
    },
    {
      id: 672,
      "departament_id": 20,
      name: "Pijiño Del Carmen",
      code: 47545,
      codefacturador: 13215
    },
    {
      id: 673,
      "departament_id": 20,
      name: "Pivijay",
      code: 47551,
      codefacturador: 13216
    },
    {
      id: 674,
      "departament_id": 20,
      name: "Plato",
      code: 47555,
      codefacturador: 13217
    },
    {
      id: 675,
      "departament_id": 20,
      name: "Puebloviejo",
      code: 47570,
      codefacturador: 13218
    },
    {
      id: 676,
      "departament_id": 20,
      name: "Remolino",
      code: 47605,
      codefacturador: 13219
    },
    {
      id: 677,
      "departament_id": 20,
      name: "Sabanas De San Ángel",
      code: 47660,
      codefacturador: 13220
    },
    {
      id: 678,
      "departament_id": 20,
      name: "Salamina",
      code: 47675,
      codefacturador: 13221
    },
    {
      id: 679,
      "departament_id": 20,
      name: "San Sebastián De Buenavista",
      code: 47692,
      codefacturador: 13222
    },
    {
      id: 680,
      "departament_id": 20,
      name: "San Zenón ",
      code: 47703,
      codefacturador: 13223
    },
    {
      id: 681,
      "departament_id": 20,
      name: "Santa Ana ",
      code: 47707,
      codefacturador: 13224
    },
    {
      id: 682,
      "departament_id": 20,
      name: "Santa Bárbara De Pinto",
      code: 47720,
      codefacturador: 13225
    },
    {
      id: 683,
      "departament_id": 20,
      name: "Sitionuevo",
      code: 47745,
      codefacturador: 13227
    },
    {
      id: 684,
      "departament_id": 20,
      name: "Tenerife",
      code: 47798,
      codefacturador: 13228
    },
    {
      id: 685,
      "departament_id": 20,
      name: "Zapayán",
      code: 47960,
      codefacturador: 13229
    },
    {
      id: 686,
      "departament_id": 20,
      name: "Zona Bananera ",
      code: 47980,
      codefacturador: 13230
    },
    {
      id: 687,
      "departament_id": 21,
      name: "Villavicencio",
      code: 50001,
      codefacturador: 13258
    },
    {
      id: 688,
      "departament_id": 21,
      name: "Acacías",
      code: 50006,
      codefacturador: 13231
    },
    {
      id: 689,
      "departament_id": 21,
      name: "Barranca De Upía",
      code: 50110,
      codefacturador: 13232
    },
    {
      id: 690,
      "departament_id": 21,
      name: "Cabuyaro",
      code: 50124,
      codefacturador: 13233
    },
    {
      id: 691,
      "departament_id": 21,
      name: "Castilla La Nueva",
      code: 50150,
      codefacturador: 13234
    },
    {
      id: 692,
      "departament_id": 21,
      name: "Cubarral",
      code: 50223,
      codefacturador: 13235
    },
    {
      id: 693,
      "departament_id": 21,
      name: "Cumaral",
      code: 50226,
      codefacturador: 13236
    },
    {
      id: 694,
      "departament_id": 21,
      name: "El Calvario ",
      code: 50245,
      codefacturador: 13237
    },
    {
      id: 695,
      "departament_id": 21,
      name: "El Castillo ",
      code: 50251,
      codefacturador: 13238
    },
    {
      id: 696,
      "departament_id": 21,
      name: "El Dorado ",
      code: 50270,
      codefacturador: 13239
    },
    {
      id: 697,
      "departament_id": 21,
      name: "Fuente De Oro",
      code: 50287,
      codefacturador: 13240
    },
    {
      id: 698,
      "departament_id": 21,
      name: "Granada",
      code: 50313,
      codefacturador: 13241
    },
    {
      id: 699,
      "departament_id": 21,
      name: "Guamal",
      code: 50318,
      codefacturador: 13242
    },
    {
      id: 700,
      "departament_id": 21,
      name: "Mapiripán",
      code: 50325,
      codefacturador: 13246
    },
    {
      id: 701,
      "departament_id": 21,
      name: "Mesetas",
      code: 50330,
      codefacturador: 13247
    },
    {
      id: 702,
      "departament_id": 21,
      name: "La Macarena ",
      code: 50350,
      codefacturador: 13243
    },
    {
      id: 703,
      "departament_id": 21,
      name: "Uribe",
      code: 50370,
      codefacturador: 12646
    },
    {
      id: 704,
      "departament_id": 21,
      name: "Lejanías",
      code: 50400,
      codefacturador: 13245
    },
    {
      id: 705,
      "departament_id": 21,
      name: "Puerto Concordia ",
      code: 50450,
      codefacturador: 13248
    },
    {
      id: 706,
      "departament_id": 21,
      name: "Puerto Gaitán ",
      code: 50568,
      codefacturador: 13249
    },
    {
      id: 707,
      "departament_id": 21,
      name: "Puerto López ",
      code: 50573,
      codefacturador: 13251
    },
    {
      id: 708,
      "departament_id": 21,
      name: "Puerto Lleras ",
      code: 50577,
      codefacturador: 13250
    },
    {
      id: 709,
      "departament_id": 21,
      name: "Puerto Rico ",
      code: 50590,
      codefacturador: 13252
    },
    {
      id: 710,
      "departament_id": 21,
      name: "Restrepo",
      code: 50606,
      codefacturador: 13253
    },
    {
      id: 711,
      "departament_id": 21,
      name: "San Carlos De Guaroa",
      code: 50680,
      codefacturador: 13039
    },
    {
      id: 712,
      "departament_id": 21,
      name: "San Juan De Arama",
      code: 50683,
      codefacturador: 13255
    },
    {
      id: 713,
      "departament_id": 21,
      name: "San Juanito ",
      code: 50686,
      codefacturador: 13256
    },
    {
      id: 714,
      "departament_id": 21,
      name: "San Martín ",
      code: 50689,
      codefacturador: 13257
    },
    {
      id: 715,
      "departament_id": 21,
      name: "Vistahermosa",
      code: 50711,
      codefacturador: 13259
    },
    {
      id: 716,
      "departament_id": 22,
      name: "Pasto",
      code: 52001,
      codefacturador: 13301
    },
    {
      id: 717,
      "departament_id": 22,
      name: "Albán",
      code: 52019,
      codefacturador: 13260
    },
    {
      id: 718,
      "departament_id": 22,
      name: "Aldana",
      code: 52022,
      codefacturador: 13261
    },
    {
      id: 719,
      "departament_id": 22,
      name: "Ancuyá",
      code: 52036,
      codefacturador: 13262
    },
    {
      id: 720,
      "departament_id": 22,
      name: "Arboleda",
      code: 52051,
      codefacturador: 13263
    },
    {
      id: 721,
      "departament_id": 22,
      name: "Barbacoas",
      code: 52079,
      codefacturador: 13264
    },
    {
      id: 722,
      "departament_id": 22,
      name: "Belén",
      code: 52083,
      codefacturador: 13265
    },
    {
      id: 723,
      "departament_id": 22,
      name: "Buesaco",
      code: 52110,
      codefacturador: 13266
    },
    {
      id: 724,
      "departament_id": 22,
      name: "Colón",
      code: 52203,
      codefacturador: 13324
    },
    {
      id: 725,
      "departament_id": 22,
      name: "Consacá",
      code: 52207,
      codefacturador: 13269
    },
    {
      id: 726,
      "departament_id": 22,
      name: "Contadero",
      code: 52210,
      codefacturador: 13270
    },
    {
      id: 727,
      "departament_id": 22,
      name: "Córdoba",
      code: 52215,
      codefacturador: 13341
    },
    {
      id: 728,
      "departament_id": 22,
      name: "Cuaspúd",
      code: 52224,
      codefacturador: 13272
    },
    {
      id: 729,
      "departament_id": 22,
      name: "Cumbal",
      code: 52227,
      codefacturador: 13273
    },
    {
      id: 730,
      "departament_id": 22,
      name: "Cumbitara",
      code: 52233,
      codefacturador: 13274
    },
    {
      id: 731,
      "departament_id": 22,
      name: "Chachagüí",
      code: 52240,
      codefacturador: 13267
    },
    {
      id: 732,
      "departament_id": 22,
      name: "El Charco ",
      code: 52250,
      codefacturador: 13275
    },
    {
      id: 733,
      "departament_id": 22,
      name: "El Peñol ",
      code: 52254,
      codefacturador: 13390
    },
    {
      id: 734,
      "departament_id": 22,
      name: "El Rosario ",
      code: 52256,
      codefacturador: 13277
    },
    {
      id: 735,
      "departament_id": 22,
      name: "El Tablón De Gómez",
      code: 52258,
      codefacturador: 13278
    },
    {
      id: 736,
      "departament_id": 22,
      name: "El Tambo ",
      code: 52260,
      codefacturador: 13279
    },
    {
      id: 737,
      "departament_id": 22,
      name: "Funes",
      code: 52287,
      codefacturador: 13280
    },
    {
      id: 738,
      "departament_id": 22,
      name: "Guachucal",
      code: 52317,
      codefacturador: 13281
    },
    {
      id: 739,
      "departament_id": 22,
      name: "Guaitarilla",
      code: 52320,
      codefacturador: 13282
    },
    {
      id: 740,
      "departament_id": 22,
      name: "Gualmatán",
      code: 52323,
      codefacturador: 13283
    },
    {
      id: 741,
      "departament_id": 22,
      name: "Iles",
      code: 52352,
      codefacturador: 13284
    },
    {
      id: 742,
      "departament_id": 22,
      name: "Imués",
      code: 52354,
      codefacturador: 13285
    },
    {
      id: 743,
      "departament_id": 22,
      name: "Ipiales",
      code: 52356,
      codefacturador: 13286
    },
    {
      id: 744,
      "departament_id": 22,
      name: "La Cruz ",
      code: 52378,
      codefacturador: 13287
    },
    {
      id: 745,
      "departament_id": 22,
      name: "La Florida ",
      code: 52381,
      codefacturador: 13288
    },
    {
      id: 746,
      "departament_id": 22,
      name: "La Llanada ",
      code: 52385,
      codefacturador: 13289
    },
    {
      id: 747,
      "departament_id": 22,
      name: "La Tola ",
      code: 52390,
      codefacturador: 13290
    },
    {
      id: 748,
      "departament_id": 22,
      name: "La Unión ",
      code: 52399,
      codefacturador: 13458
    },
    {
      id: 749,
      "departament_id": 22,
      name: "Leiva",
      code: 52405,
      codefacturador: 13292
    },
    {
      id: 750,
      "departament_id": 22,
      name: "Linares",
      code: 52411,
      codefacturador: 13293
    },
    {
      id: 751,
      "departament_id": 22,
      name: "Los Andes ",
      code: 52418,
      codefacturador: 13294
    },
    {
      id: 752,
      "departament_id": 22,
      name: "Magüí",
      code: 52427,
      codefacturador: 13295
    },
    {
      id: 753,
      "departament_id": 22,
      name: "Mallama",
      code: 52435,
      codefacturador: 13296
    },
    {
      id: 754,
      "departament_id": 22,
      name: "Mosquera",
      code: 52473,
      codefacturador: 13297
    },
    {
      id: 755,
      "departament_id": 22,
      name: "Nariño",
      code: 52480,
      codefacturador: 13298
    },
    {
      id: 756,
      "departament_id": 22,
      name: "Olaya Herrera ",
      code: 52490,
      codefacturador: 13299
    },
    {
      id: 757,
      "departament_id": 22,
      name: "Ospina",
      code: 52506,
      codefacturador: 13300
    },
    {
      id: 758,
      "departament_id": 22,
      name: "Francisco Pizarro ",
      code: 52520,
      codefacturador: 13070
    },
    {
      id: 759,
      "departament_id": 22,
      name: "Policarpa",
      code: 52540,
      codefacturador: 13303
    },
    {
      id: 760,
      "departament_id": 22,
      name: "Potosí",
      code: 52560,
      codefacturador: 13304
    },
    {
      id: 761,
      "departament_id": 22,
      name: "Providencia",
      code: 52565,
      codefacturador: 13305
    },
    {
      id: 762,
      "departament_id": 22,
      name: "Puerres",
      code: 52573,
      codefacturador: 13306
    },
    {
      id: 763,
      "departament_id": 22,
      name: "Pupiales",
      code: 52585,
      codefacturador: 13307
    },
    {
      id: 764,
      "departament_id": 22,
      name: "Ricaurte",
      code: 52612,
      codefacturador: 13308
    },
    {
      id: 765,
      "departament_id": 22,
      name: "Roberto Payán ",
      code: 52621,
      codefacturador: 13309
    },
    {
      id: 766,
      "departament_id": 22,
      name: "Samaniego",
      code: 52678,
      codefacturador: 13310
    },
    {
      id: 767,
      "departament_id": 22,
      name: "Sandoná",
      code: 52683,
      codefacturador: 13315
    },
    {
      id: 768,
      "departament_id": 22,
      name: "San Bernardo ",
      code: 52685,
      codefacturador: 13311
    },
    {
      id: 769,
      "departament_id": 22,
      name: "San Lorenzo ",
      code: 52687,
      codefacturador: 13312
    },
    {
      id: 770,
      "departament_id": 22,
      name: "San Pablo ",
      code: 52693,
      codefacturador: 13313
    },
    {
      id: 771,
      "departament_id": 22,
      name: "San Pedro De Cartago",
      code: 52694,
      codefacturador: 13314
    },
    {
      id: 772,
      "departament_id": 22,
      name: "Santa Bárbara ",
      code: 52696,
      codefacturador: 13437
    },
    {
      id: 773,
      "departament_id": 22,
      name: "Santacruz",
      code: 52699,
      codefacturador: 13317
    },
    {
      id: 774,
      "departament_id": 22,
      name: "Sapuyes",
      code: 52720,
      codefacturador: 13318
    },
    {
      id: 775,
      "departament_id": 22,
      name: "Taminango",
      code: 52786,
      codefacturador: 13319
    },
    {
      id: 776,
      "departament_id": 22,
      name: "Tangua",
      code: 52788,
      codefacturador: 13320
    },
    {
      id: 777,
      "departament_id": 22,
      name: "San Andrés De Tumaco",
      code: 52835,
      codefacturador: 13430
    },
    {
      id: 778,
      "departament_id": 22,
      name: "Túquerres",
      code: 52838,
      codefacturador: 13322
    },
    {
      id: 779,
      "departament_id": 22,
      name: "Yacuanquer",
      code: 52885,
      codefacturador: 13323
    },
    {
      id: 780,
      "departament_id": 23,
      name: "San José De Cúcuta",
      code: 54001,
      codefacturador: 12879
    },
    {
      id: 781,
      "departament_id": 23,
      name: "Ábrego",
      code: 54003,
      codefacturador: 12533
    },
    {
      id: 782,
      "departament_id": 23,
      name: "Arboledas",
      code: 54051,
      codefacturador: 13263
    },
    {
      id: 783,
      "departament_id": 23,
      name: "Bochalema",
      code: 54099,
      codefacturador: 12740
    },
    {
      id: 784,
      "departament_id": 23,
      name: "Bucarasica",
      code: 54109,
      codefacturador: 13371
    },
    {
      id: 785,
      "departament_id": 23,
      name: "Cácota",
      code: 54125,
      codefacturador: 13052
    },
    {
      id: 786,
      "departament_id": 23,
      name: "Cáchira",
      code: 54128,
      codefacturador: 13052
    },
    {
      id: 787,
      "departament_id": 23,
      name: "Chinácota",
      code: 54172,
      codefacturador: 12965
    },
    {
      id: 788,
      "departament_id": 23,
      name: "Chitagá",
      code: 54174,
      codefacturador: 12752
    },
    {
      id: 789,
      "departament_id": 23,
      name: "Convención",
      code: 54206,
      codefacturador: 13385
    },
    {
      id: 790,
      "departament_id": 23,
      name: "Cucutilla",
      code: 54223,
      codefacturador: 13064
    },
    {
      id: 791,
      "departament_id": 23,
      name: "Durania",
      code: 54239,
      codefacturador: 12764
    },
    {
      id: 792,
      "departament_id": 23,
      name: "El Carmen ",
      code: 54245,
      codefacturador: 13388
    },
    {
      id: 793,
      "departament_id": 23,
      name: "El Tarra ",
      code: 54250,
      codefacturador: 13279
    },
    {
      id: 794,
      "departament_id": 23,
      name: "El Zulia ",
      code: 54261,
      codefacturador: 13279
    },
    {
      id: 795,
      "departament_id": 23,
      name: "Gramalote",
      code: 54313,
      codefacturador: 12971
    },
    {
      id: 796,
      "departament_id": 23,
      name: "Hacarí",
      code: 54344,
      codefacturador: 13087
    },
    {
      id: 797,
      "departament_id": 23,
      name: "Herrán",
      code: 54347,
      codefacturador: 12588
    },
    {
      id: 798,
      "departament_id": 23,
      name: "Labateca",
      code: 54377,
      codefacturador: 13355
    },
    {
      id: 799,
      "departament_id": 23,
      name: "La Esperanza ",
      code: 54385,
      codefacturador: 12863
    },
    {
      id: 800,
      "departament_id": 23,
      name: "La Playa ",
      code: 54398,
      codefacturador: 13180
    },
    {
      id: 801,
      "departament_id": 23,
      name: "Los Patios ",
      code: 54405,
      codefacturador: 13459
    },
    {
      id: 802,
      "departament_id": 23,
      name: "Lourdes",
      code: 54418,
      codefacturador: 13411
    },
    {
      id: 803,
      "departament_id": 23,
      name: "Mutiscua",
      code: 54480,
      codefacturador: 12604
    },
    {
      id: 804,
      "departament_id": 23,
      name: "Ocaña",
      code: 54498,
      codefacturador: 13417
    },
    {
      id: 805,
      "departament_id": 23,
      name: "Pamplona",
      code: 54518,
      codefacturador: 13505
    },
    {
      id: 806,
      "departament_id": 23,
      name: "Pamplonita",
      code: 54520,
      codefacturador: 13505
    },
    {
      id: 807,
      "departament_id": 23,
      name: "Puerto Santander ",
      code: 54553,
      codefacturador: 13112
    },
    {
      id: 808,
      "departament_id": 23,
      name: "Ragonvalia",
      code: 54599,
      codefacturador: 13117
    },
    {
      id: 809,
      "departament_id": 23,
      name: "Salazar",
      code: 54660,
      codefacturador: 13221
    },
    {
      id: 810,
      "departament_id": 23,
      name: "San Calixto ",
      code: 54670,
      codefacturador: 13038
    },
    {
      id: 811,
      "departament_id": 23,
      name: "San Cayetano ",
      code: 54673,
      codefacturador: 13121
    },
    {
      id: 812,
      "departament_id": 23,
      name: "Santiago",
      code: 54680,
      codefacturador: 13333
    },
    {
      id: 813,
      "departament_id": 23,
      name: "Sardinata",
      code: 54720,
      codefacturador: 12663
    },
    {
      id: 814,
      "departament_id": 23,
      name: "Silos",
      code: 54743,
      codefacturador: 13334
    },
    {
      id: 815,
      "departament_id": 23,
      name: "Teorama",
      code: 54800,
      codefacturador: 12839
    },
    {
      id: 816,
      "departament_id": 23,
      name: "Tibú",
      code: 54810,
      codefacturador: 13141
    },
    {
      id: 817,
      "departament_id": 23,
      name: "Toledo",
      code: 54820,
      codefacturador: 12644
    },
    {
      id: 818,
      "departament_id": 23,
      name: "Villa Caro ",
      code: 54871,
      codefacturador: 12652
    },
    {
      id: 819,
      "departament_id": 23,
      name: "Villa Del Rosario",
      code: 54874,
      codefacturador: 12652
    },
    {
      id: 820,
      "departament_id": 25,
      name: "Armenia",
      code: 63001,
      codefacturador: 13337
    },
    {
      id: 821,
      "departament_id": 25,
      name: "Buenavista",
      code: 63111,
      codefacturador: 13450
    },
    {
      id: 822,
      "departament_id": 25,
      name: "Calarcá",
      code: 63130,
      codefacturador: 13339
    },
    {
      id: 823,
      "departament_id": 25,
      name: "Circasia",
      code: 63190,
      codefacturador: 13340
    },
    {
      id: 824,
      "departament_id": 25,
      name: "Córdoba",
      code: 63212,
      codefacturador: 13341
    },
    {
      id: 825,
      "departament_id": 25,
      name: "Filandia",
      code: 63272,
      codefacturador: 13342
    },
    {
      id: 826,
      "departament_id": 25,
      name: "Génova",
      code: 63302,
      codefacturador: 13343
    },
    {
      id: 827,
      "departament_id": 25,
      name: "La Tebaida ",
      code: 63401,
      codefacturador: 13344
    },
    {
      id: 828,
      "departament_id": 25,
      name: "Montenegro",
      code: 63470,
      codefacturador: 13345
    },
    {
      id: 829,
      "departament_id": 25,
      name: "Pijao",
      code: 63548,
      codefacturador: 13346
    },
    {
      id: 830,
      "departament_id": 25,
      name: "Quimbaya",
      code: 63594,
      codefacturador: 13347
    },
    {
      id: 831,
      "departament_id": 25,
      name: "Salento",
      code: 63690,
      codefacturador: 13348
    },
    {
      id: 832,
      "departament_id": 26,
      name: "Pereira",
      code: 66001,
      codefacturador: 13358
    },
    {
      id: 833,
      "departament_id": 26,
      name: "Apía",
      code: 66045,
      codefacturador: 13349
    },
    {
      id: 834,
      "departament_id": 26,
      name: "Balboa",
      code: 66075,
      codefacturador: 13350
    },
    {
      id: 835,
      "departament_id": 26,
      name: "Belén De Umbría",
      code: 66088,
      codefacturador: 13351
    },
    {
      id: 836,
      "departament_id": 26,
      name: "Dosquebradas",
      code: 66170,
      codefacturador: 13352
    },
    {
      id: 837,
      "departament_id": 26,
      name: "Guática",
      code: 66318,
      codefacturador: 13353
    },
    {
      id: 838,
      "departament_id": 26,
      name: "La Celia ",
      code: 66383,
      codefacturador: 13354
    },
    {
      id: 839,
      "departament_id": 26,
      name: "La Virginia ",
      code: 66400,
      codefacturador: 13355
    },
    {
      id: 840,
      "departament_id": 26,
      name: "Marsella",
      code: 66440,
      codefacturador: 13356
    },
    {
      id: 841,
      "departament_id": 26,
      name: "Mistrató",
      code: 66456,
      codefacturador: 13357
    },
    {
      id: 842,
      "departament_id": 26,
      name: "Pueblo Rico ",
      code: 66572,
      codefacturador: 13359
    },
    {
      id: 843,
      "departament_id": 26,
      name: "Quinchía",
      code: 66594,
      codefacturador: 13360
    },
    {
      id: 844,
      "departament_id": 26,
      name: "Santa Rosa De Cabal",
      code: 66682,
      codefacturador: 13361
    },
    {
      id: 845,
      "departament_id": 26,
      name: "Santuario",
      code: 66687,
      codefacturador: 13362
    },
    {
      id: 846,
      "departament_id": 28,
      name: "Bucaramanga",
      code: 68001,
      codefacturador: 13371
    },
    {
      id: 847,
      "departament_id": 28,
      name: "Aguada",
      code: 68013,
      codefacturador: 13363
    },
    {
      id: 848,
      "departament_id": 28,
      name: "Albania",
      code: 68020,
      codefacturador: 13364
    },
    {
      id: 849,
      "departament_id": 28,
      name: "Aratoca",
      code: 68051,
      codefacturador: 13365
    },
    {
      id: 850,
      "departament_id": 28,
      name: "Barbosa",
      code: 68077,
      codefacturador: 13366
    },
    {
      id: 851,
      "departament_id": 28,
      name: "Barichara",
      code: 68079,
      codefacturador: 13367
    },
    {
      id: 852,
      "departament_id": 28,
      name: "Barrancabermeja",
      code: 68081,
      codefacturador: 13368
    },
    {
      id: 853,
      "departament_id": 28,
      name: "Betulia",
      code: 68092,
      codefacturador: 13369
    },
    {
      id: 854,
      "departament_id": 28,
      name: "Bolívar",
      code: 68101,
      codefacturador: 13370
    },
    {
      id: 855,
      "departament_id": 28,
      name: "Cabrera",
      code: 68121,
      codefacturador: 13372
    },
    {
      id: 856,
      "departament_id": 28,
      name: "California",
      code: 68132,
      codefacturador: 13373
    },
    {
      id: 857,
      "departament_id": 28,
      name: "Capitanejo",
      code: 68147,
      codefacturador: 13374
    },
    {
      id: 858,
      "departament_id": 28,
      name: "Carcasí",
      code: 68152,
      codefacturador: 13375
    },
    {
      id: 859,
      "departament_id": 28,
      name: "Cepitá",
      code: 68160,
      codefacturador: 13376
    },
    {
      id: 860,
      "departament_id": 28,
      name: "Cerrito",
      code: 68162,
      codefacturador: 13377
    },
    {
      id: 861,
      "departament_id": 28,
      name: "Charalá",
      code: 68167,
      codefacturador: 13378
    },
    {
      id: 862,
      "departament_id": 28,
      name: "Charta",
      code: 68169,
      codefacturador: 13379
    },
    {
      id: 863,
      "departament_id": 28,
      name: "Chima",
      code: 68176,
      codefacturador: 13380
    },
    {
      id: 864,
      "departament_id": 28,
      name: "Chipatá",
      code: 68179,
      codefacturador: 13381
    },
    {
      id: 865,
      "departament_id": 28,
      name: "Cimitarra",
      code: 68190,
      codefacturador: 13382
    },
    {
      id: 866,
      "departament_id": 28,
      name: "Concepción",
      code: 68207,
      codefacturador: 13383
    },
    {
      id: 867,
      "departament_id": 28,
      name: "Confines",
      code: 68209,
      codefacturador: 13384
    },
    {
      id: 868,
      "departament_id": 28,
      name: "Contratación",
      code: 68211,
      codefacturador: 13385
    },
    {
      id: 869,
      "departament_id": 28,
      name: "Coromoro",
      code: 68217,
      codefacturador: 13386
    },
    {
      id: 870,
      "departament_id": 28,
      name: "Curití",
      code: 68229,
      codefacturador: 13387
    },
    {
      id: 871,
      "departament_id": 28,
      name: "El Carmen De Chucurí",
      code: 68235,
      codefacturador: 12701
    },
    {
      id: 872,
      "departament_id": 28,
      name: "El Guacamayo ",
      code: 68245,
      codefacturador: 13389
    },
    {
      id: 873,
      "departament_id": 28,
      name: "El Peñón ",
      code: 68250,
      codefacturador: 13390
    },
    {
      id: 874,
      "departament_id": 28,
      name: "El Playón ",
      code: 68255,
      codefacturador: 13391
    },
    {
      id: 875,
      "departament_id": 28,
      name: "Encino",
      code: 68264,
      codefacturador: 13392
    },
    {
      id: 876,
      "departament_id": 28,
      name: "Enciso",
      code: 68266,
      codefacturador: 13393
    },
    {
      id: 877,
      "departament_id": 28,
      name: "Florián",
      code: 68271,
      codefacturador: 13394
    },
    {
      id: 878,
      "departament_id": 28,
      name: "Floridablanca",
      code: 68276,
      codefacturador: 13395
    },
    {
      id: 879,
      "departament_id": 28,
      name: "Galán",
      code: 68296,
      codefacturador: 13396
    },
    {
      id: 880,
      "departament_id": 28,
      name: "Gámbita",
      code: 68298,
      codefacturador: 13397
    },
    {
      id: 881,
      "departament_id": 28,
      name: "Girón",
      code: 68307,
      codefacturador: 13398
    },
    {
      id: 882,
      "departament_id": 28,
      name: "Guaca",
      code: 68318,
      codefacturador: 13399
    },
    {
      id: 883,
      "departament_id": 28,
      name: "Guadalupe",
      code: 68320,
      codefacturador: 13400
    },
    {
      id: 884,
      "departament_id": 28,
      name: "Guapotá",
      code: 68322,
      codefacturador: 13401
    },
    {
      id: 885,
      "departament_id": 28,
      name: "Guavatá",
      code: 68324,
      codefacturador: 13402
    },
    {
      id: 886,
      "departament_id": 28,
      name: "Güepsa",
      code: 68327,
      codefacturador: 13403
    },
    {
      id: 887,
      "departament_id": 28,
      name: "Hato",
      code: 68344,
      codefacturador: 13404
    },
    {
      id: 888,
      "departament_id": 28,
      name: "Jesús María ",
      code: 68368,
      codefacturador: 13405
    },
    {
      id: 889,
      "departament_id": 28,
      name: "Jordán",
      code: 68370,
      codefacturador: 13406
    },
    {
      id: 890,
      "departament_id": 28,
      name: "La Belleza ",
      code: 68377,
      codefacturador: 13407
    },
    {
      id: 891,
      "departament_id": 28,
      name: "Landázuri",
      code: 68385,
      codefacturador: 13409
    },
    {
      id: 892,
      "departament_id": 28,
      name: "La Paz ",
      code: 68397,
      codefacturador: 13408
    },
    {
      id: 893,
      "departament_id": 28,
      name: "Lebrija",
      code: 68406,
      codefacturador: 13410
    },
    {
      id: 894,
      "departament_id": 28,
      name: "Los Santos ",
      code: 68418,
      codefacturador: 13411
    },
    {
      id: 895,
      "departament_id": 28,
      name: "Macaravita",
      code: 68425,
      codefacturador: 13412
    },
    {
      id: 896,
      "departament_id": 28,
      name: "Málaga",
      code: 68432,
      codefacturador: 13413
    },
    {
      id: 897,
      "departament_id": 28,
      name: "Matanza",
      code: 68444,
      codefacturador: 13414
    },
    {
      id: 898,
      "departament_id": 28,
      name: "Mogotes",
      code: 68464,
      codefacturador: 13415
    },
    {
      id: 899,
      "departament_id": 28,
      name: "Molagavita",
      code: 68468,
      codefacturador: 13416
    },
    {
      id: 900,
      "departament_id": 28,
      name: "Ocamonte",
      code: 68498,
      codefacturador: 13417
    },
    {
      id: 901,
      "departament_id": 28,
      name: "Oiba",
      code: 68500,
      codefacturador: 13418
    },
    {
      id: 902,
      "departament_id": 28,
      name: "Onzaga",
      code: 68502,
      codefacturador: 13419
    },
    {
      id: 903,
      "departament_id": 28,
      name: "Palmar",
      code: 68522,
      codefacturador: 13420
    },
    {
      id: 904,
      "departament_id": 28,
      name: "Palmas Del Socorro",
      code: 68524,
      codefacturador: 13421
    },
    {
      id: 905,
      "departament_id": 28,
      name: "Páramo",
      code: 68533,
      codefacturador: 13422
    },
    {
      id: 906,
      "departament_id": 28,
      name: "Piedecuesta",
      code: 68547,
      codefacturador: 13423
    },
    {
      id: 907,
      "departament_id": 28,
      name: "Pinchote",
      code: 68549,
      codefacturador: 13424
    },
    {
      id: 908,
      "departament_id": 28,
      name: "Puente Nacional ",
      code: 68572,
      codefacturador: 13425
    },
    {
      id: 909,
      "departament_id": 28,
      name: "Puerto Parra ",
      code: 68573,
      codefacturador: 13426
    },
    {
      id: 910,
      "departament_id": 28,
      name: "Puerto Wilches ",
      code: 68575,
      codefacturador: 13427
    },
    {
      id: 911,
      "departament_id": 28,
      name: "Rionegro",
      code: 68615,
      codefacturador: 13428
    },
    {
      id: 912,
      "departament_id": 28,
      name: "Sabana De Torres",
      code: 68655,
      codefacturador: 13429
    },
    {
      id: 913,
      "departament_id": 28,
      name: "San Andrés ",
      code: 68669,
      codefacturador: 13430
    },
    {
      id: 914,
      "departament_id": 28,
      name: "San Benito ",
      code: 68673,
      codefacturador: 13431
    },
    {
      id: 915,
      "departament_id": 28,
      name: "San Gil ",
      code: 68679,
      codefacturador: 13432
    },
    {
      id: 916,
      "departament_id": 28,
      name: "San Joaquín ",
      code: 68682,
      codefacturador: 13433
    },
    {
      id: 917,
      "departament_id": 28,
      name: "San José De Miranda",
      code: 68684,
      codefacturador: 13434
    },
    {
      id: 918,
      "departament_id": 28,
      name: "San Miguel ",
      code: 68686,
      codefacturador: 13435
    },
    {
      id: 919,
      "departament_id": 28,
      name: "San Vicente De Chucurí",
      code: 68689,
      codefacturador: 13436
    },
    {
      id: 920,
      "departament_id": 28,
      name: "Santa Bárbara ",
      code: 68705,
      codefacturador: 13437
    },
    {
      id: 921,
      "departament_id": 28,
      name: "Santa Helena Del Opón",
      code: 68720,
      codefacturador: 13438
    },
    {
      id: 922,
      "departament_id": 28,
      name: "Simacota",
      code: 68745,
      codefacturador: 13439
    },
    {
      id: 923,
      "departament_id": 28,
      name: "Socorro",
      code: 68755,
      codefacturador: 13440
    },
    {
      id: 924,
      "departament_id": 28,
      name: "Suaita",
      code: 68770,
      codefacturador: 13441
    },
    {
      id: 925,
      "departament_id": 28,
      name: "Sucre",
      code: 68773,
      codefacturador: 13472
    },
    {
      id: 926,
      "departament_id": 28,
      name: "Suratá",
      code: 68780,
      codefacturador: 13443
    },
    {
      id: 927,
      "departament_id": 28,
      name: "Tona",
      code: 68820,
      codefacturador: 13444
    },
    {
      id: 928,
      "departament_id": 28,
      name: "Valle De San José",
      code: 68855,
      codefacturador: 13042
    },
    {
      id: 929,
      "departament_id": 28,
      name: "Vélez",
      code: 68861,
      codefacturador: 13446
    },
    {
      id: 930,
      "departament_id": 28,
      name: "Vetas",
      code: 68867,
      codefacturador: 13447
    },
    {
      id: 931,
      "departament_id": 28,
      name: "Villanueva",
      code: 68872,
      codefacturador: 13448
    },
    {
      id: 932,
      "departament_id": 28,
      name: "Zapatoca",
      code: 68895,
      codefacturador: 13449
    },
    {
      id: 933,
      "departament_id": 29,
      name: "Sincelejo",
      code: 70001,
      codefacturador: 13471
    },
    {
      id: 934,
      "departament_id": 29,
      name: "Buenavista",
      code: 70110,
      codefacturador: 13450
    },
    {
      id: 935,
      "departament_id": 29,
      name: "Caimito",
      code: 70124,
      codefacturador: 13451
    },
    {
      id: 936,
      "departament_id": 29,
      name: "Colosó",
      code: 70204,
      codefacturador: 13453
    },
    {
      id: 937,
      "departament_id": 29,
      name: "Corozal",
      code: 70215,
      codefacturador: 13454
    },
    {
      id: 938,
      "departament_id": 29,
      name: "Coveñas",
      code: 70221,
      codefacturador: 12760
    },
    {
      id: 939,
      "departament_id": 29,
      name: "Chalán",
      code: 70230,
      codefacturador: 13452
    },
    {
      id: 940,
      "departament_id": 29,
      name: "El Roble ",
      code: 70233,
      codefacturador: 13455
    },
    {
      id: 941,
      "departament_id": 29,
      name: "Galeras",
      code: 70235,
      codefacturador: 13456
    },
    {
      id: 942,
      "departament_id": 29,
      name: "Guaranda",
      code: 70265,
      codefacturador: 13457
    },
    {
      id: 943,
      "departament_id": 29,
      name: "La Unión ",
      code: 70400,
      codefacturador: 13458
    },
    {
      id: 944,
      "departament_id": 29,
      name: "Los Palmitos ",
      code: 70418,
      codefacturador: 13459
    },
    {
      id: 945,
      "departament_id": 29,
      name: "Majagual",
      code: 70429,
      codefacturador: 13460
    },
    {
      id: 946,
      "departament_id": 29,
      name: "Morroa",
      code: 70473,
      codefacturador: 13461
    },
    {
      id: 947,
      "departament_id": 29,
      name: "Ovejas",
      code: 70508,
      codefacturador: 13462
    },
    {
      id: 948,
      "departament_id": 29,
      name: "Palmito",
      code: 70523,
      codefacturador: 13463
    },
    {
      id: 949,
      "departament_id": 29,
      name: "Sampués",
      code: 70670,
      codefacturador: 13464
    },
    {
      id: 950,
      "departament_id": 29,
      name: "San Benito Abad",
      code: 70678,
      codefacturador: 13465
    },
    {
      id: 951,
      "departament_id": 29,
      name: "San Juan De Betulia",
      code: 70702,
      codefacturador: 13466
    },
    {
      id: 952,
      "departament_id": 29,
      name: "San Marcos ",
      code: 70708,
      codefacturador: 13467
    },
    {
      id: 953,
      "departament_id": 29,
      name: "San Onofre ",
      code: 70713,
      codefacturador: 13468
    },
    {
      id: 954,
      "departament_id": 29,
      name: "San Pedro ",
      code: 70717,
      codefacturador: 13469
    },
    {
      id: 955,
      "departament_id": 29,
      name: "San Luis De Sincé",
      code: 70742,
      codefacturador: 12913
    },
    {
      id: 956,
      "departament_id": 29,
      name: "Sucre",
      code: 70771,
      codefacturador: 13472
    },
    {
      id: 957,
      "departament_id": 29,
      name: "Santiago De Tolú",
      code: 70820,
      codefacturador: 13333
    },
    {
      id: 958,
      "departament_id": 29,
      name: "Tolú Viejo ",
      code: 70823,
      codefacturador: 13473
    },
    {
      id: 959,
      "departament_id": 30,
      name: "Ibagué",
      code: 73001,
      codefacturador: 13496
    },
    {
      id: 960,
      "departament_id": 30,
      name: "Alpujarra",
      code: 73024,
      codefacturador: 13475
    },
    {
      id: 961,
      "departament_id": 30,
      name: "Alvarado",
      code: 73026,
      codefacturador: 13476
    },
    {
      id: 962,
      "departament_id": 30,
      name: "Ambalema",
      code: 73030,
      codefacturador: 13477
    },
    {
      id: 963,
      "departament_id": 30,
      name: "Anzoátegui",
      code: 73043,
      codefacturador: 13478
    },
    {
      id: 964,
      "departament_id": 30,
      name: "Armero",
      code: 73055,
      codefacturador: 13337
    },
    {
      id: 965,
      "departament_id": 30,
      name: "Ataco",
      code: 73067,
      codefacturador: 13479
    },
    {
      id: 966,
      "departament_id": 30,
      name: "Cajamarca",
      code: 73124,
      codefacturador: 13480
    },
    {
      id: 967,
      "departament_id": 30,
      name: "Carmen De Apicalá",
      code: 73148,
      codefacturador: 13481
    },
    {
      id: 968,
      "departament_id": 30,
      name: "Casabianca",
      code: 73152,
      codefacturador: 13482
    },
    {
      id: 969,
      "departament_id": 30,
      name: "Chaparral",
      code: 73168,
      codefacturador: 13483
    },
    {
      id: 970,
      "departament_id": 30,
      name: "Coello",
      code: 73200,
      codefacturador: 13484
    },
    {
      id: 971,
      "departament_id": 30,
      name: "Coyaima",
      code: 73217,
      codefacturador: 13485
    },
    {
      id: 972,
      "departament_id": 30,
      name: "Cunday",
      code: 73226,
      codefacturador: 13486
    },
    {
      id: 973,
      "departament_id": 30,
      name: "Dolores",
      code: 73236,
      codefacturador: 13487
    },
    {
      id: 974,
      "departament_id": 30,
      name: "Espinal",
      code: 73268,
      codefacturador: 13488
    },
    {
      id: 975,
      "departament_id": 30,
      name: "Falan",
      code: 73270,
      codefacturador: 13489
    },
    {
      id: 976,
      "departament_id": 30,
      name: "Flandes",
      code: 73275,
      codefacturador: 13490
    },
    {
      id: 977,
      "departament_id": 30,
      name: "Fresno",
      code: 73283,
      codefacturador: 13491
    },
    {
      id: 978,
      "departament_id": 30,
      name: "Guamo",
      code: 73319,
      codefacturador: 13492
    },
    {
      id: 979,
      "departament_id": 30,
      name: "Herveo",
      code: 73347,
      codefacturador: 13494
    },
    {
      id: 980,
      "departament_id": 30,
      name: "Honda",
      code: 73349,
      codefacturador: 13495
    },
    {
      id: 981,
      "departament_id": 30,
      name: "Icononzo",
      code: 73352,
      codefacturador: 13497
    },
    {
      id: 982,
      "departament_id": 30,
      name: "Lérida",
      code: 73408,
      codefacturador: 13498
    },
    {
      id: 983,
      "departament_id": 30,
      name: "Líbano",
      code: 73411,
      codefacturador: 13499
    },
    {
      id: 984,
      "departament_id": 30,
      name: "San Sebastián De Mariquita",
      code: 73443,
      codefacturador: 13222
    },
    {
      id: 985,
      "departament_id": 30,
      name: "Melgar",
      code: 73449,
      codefacturador: 13501
    },
    {
      id: 986,
      "departament_id": 30,
      name: "Murillo",
      code: 73461,
      codefacturador: 13502
    },
    {
      id: 987,
      "departament_id": 30,
      name: "Natagaima",
      code: 73483,
      codefacturador: 13503
    },
    {
      id: 988,
      "departament_id": 30,
      name: "Ortega",
      code: 73504,
      codefacturador: 13504
    },
    {
      id: 989,
      "departament_id": 30,
      name: "Palocabildo",
      code: 73520,
      codefacturador: 13505
    },
    {
      id: 990,
      "departament_id": 30,
      name: "Piedras",
      code: 73547,
      codefacturador: 13506
    },
    {
      id: 991,
      "departament_id": 30,
      name: "Planadas",
      code: 73555,
      codefacturador: 13507
    },
    {
      id: 992,
      "departament_id": 30,
      name: "Prado",
      code: 73563,
      codefacturador: 13508
    },
    {
      id: 993,
      "departament_id": 30,
      name: "Purificación",
      code: 73585,
      codefacturador: 13509
    },
    {
      id: 994,
      "departament_id": 30,
      name: "Rioblanco",
      code: 73616,
      codefacturador: 13510
    },
    {
      id: 995,
      "departament_id": 30,
      name: "Roncesvalles",
      code: 73622,
      codefacturador: 13511
    },
    {
      id: 996,
      "departament_id": 30,
      name: "Rovira",
      code: 73624,
      codefacturador: 13512
    },
    {
      id: 997,
      "departament_id": 30,
      name: "Saldaña",
      code: 73671,
      codefacturador: 13513
    },
    {
      id: 998,
      "departament_id": 30,
      name: "San Antonio ",
      code: 73675,
      codefacturador: 13514
    },
    {
      id: 999,
      "departament_id": 30,
      name: "San Luis ",
      code: 73678,
      codefacturador: 13515
    },
    {
      id: 1000,
      "departament_id": 30,
      name: "Santa Isabel ",
      code: 73686,
      codefacturador: 13516
    },
    {
      id: 1001,
      "departament_id": 30,
      name: "Suárez",
      code: 73770,
      codefacturador: 13517
    },
    {
      id: 1002,
      "departament_id": 30,
      name: "Valle De San Juan",
      code: 73854,
      codefacturador: 13518
    },
    {
      id: 1003,
      "departament_id": 30,
      name: "Venadillo",
      code: 73861,
      codefacturador: 13519
    },
    {
      id: 1004,
      "departament_id": 30,
      name: "Villahermosa",
      code: 73870,
      codefacturador: 13520
    },
    {
      id: 1005,
      "departament_id": 30,
      name: "Villarrica",
      code: 73873,
      codefacturador: 13521
    },
    {
      id: 1006,
      "departament_id": 31,
      name: "Cali",
      code: 76001,
      codefacturador: 48324
    },
    {
      id: 1007,
      "departament_id": 31,
      name: "Alcalá",
      code: 76020,
      codefacturador: 13364
    },
    {
      id: 1008,
      "departament_id": 31,
      name: "Andalucía",
      code: 76036,
      codefacturador: 13262
    },
    {
      id: 1009,
      "departament_id": 31,
      name: "Ansermanuevo",
      code: 76041,
      codefacturador: 12858
    },
    {
      id: 1010,
      "departament_id": 31,
      name: "Argelia",
      code: 76054,
      codefacturador: 12920
    },
    {
      id: 1011,
      "departament_id": 31,
      name: "Bolívar",
      code: 76100,
      codefacturador: 13370
    },
    {
      id: 1012,
      "departament_id": 31,
      name: "Buenaventura",
      code: 76109,
      codefacturador: 13371
    },
    {
      id: 1013,
      "departament_id": 31,
      name: "Guadalajara De Buga",
      code: 76111,
      codefacturador: 13281
    },
    {
      id: 1014,
      "departament_id": 31,
      name: "Bugalagrande",
      code: 76113,
      codefacturador: 13266
    },
    {
      id: 1015,
      "departament_id": 31,
      name: "Caicedonia",
      code: 76122,
      codefacturador: 12557
    },
    {
      id: 1016,
      "departament_id": 31,
      name: "Calima",
      code: 76126,
      codefacturador: 13373
    },
    {
      id: 1017,
      "departament_id": 31,
      name: "Candelaria",
      code: 76130,
      codefacturador: 12668
    },
    {
      id: 1018,
      "departament_id": 31,
      name: "Cartago",
      code: 76147,
      codefacturador: 12886
    },
    {
      id: 1019,
      "departament_id": 31,
      name: "Dagua",
      code: 76233,
      codefacturador: 12573
    },
    {
      id: 1020,
      "departament_id": 31,
      name: "El Águila ",
      code: 76243,
      codefacturador: 12575
    },
    {
      id: 1021,
      "departament_id": 31,
      name: "El Cairo ",
      code: 76246,
      codefacturador: 12928
    },
    {
      id: 1022,
      "departament_id": 31,
      name: "El Cerrito ",
      code: 76248,
      codefacturador: 13238
    },
    {
      id: 1023,
      "departament_id": 31,
      name: "El Dovio ",
      code: 76250,
      codefacturador: 13239
    },
    {
      id: 1024,
      "departament_id": 31,
      name: "Florida",
      code: 76275,
      codefacturador: 13394
    },
    {
      id: 1025,
      "departament_id": 31,
      name: "Ginebra",
      code: 76306,
      codefacturador: 13174
    },
    {
      id: 1026,
      "departament_id": 31,
      name: "Guacarí",
      code: 76318,
      codefacturador: 12772
    },
    {
      id: 1027,
      "departament_id": 31,
      name: "Jamundí",
      code: 76364,
      codefacturador: 12933
    },
    {
      id: 1028,
      "departament_id": 31,
      name: "La Cumbre ",
      code: 76377,
      codefacturador: 13287
    },
    {
      id: 1029,
      "departament_id": 31,
      name: "La Unión ",
      code: 76400,
      codefacturador: 13458
    },
    {
      id: 1030,
      "departament_id": 31,
      name: "La Victoria ",
      code: 76403,
      codefacturador: 12781
    },
    {
      id: 1031,
      "departament_id": 31,
      name: "Obando",
      code: 76497,
      codefacturador: 13005
    },
    {
      id: 1032,
      "departament_id": 31,
      name: "Palmira",
      code: 76520,
      codefacturador: 13421
    },
    {
      id: 1033,
      "departament_id": 31,
      name: "Pradera",
      code: 76563,
      codefacturador: 13304
    },
    {
      id: 1034,
      "departament_id": 31,
      name: "Restrepo",
      code: 76606,
      codefacturador: 13253
    },
    {
      id: 1035,
      "departament_id": 31,
      name: "Riofrío",
      code: 76616,
      codefacturador: 13510
    },
    {
      id: 1036,
      "departament_id": 31,
      name: "Roldanillo",
      code: 76622,
      codefacturador: 12979
    },
    {
      id: 1037,
      "departament_id": 31,
      name: "San Pedro ",
      code: 76670,
      codefacturador: 13469
    },
    {
      id: 1038,
      "departament_id": 31,
      name: "Sevilla",
      code: 76736,
      codefacturador: 13125
    },
    {
      id: 1039,
      "departament_id": 31,
      name: "Toro",
      code: 76823,
      codefacturador: 12957
    },
    {
      id: 1040,
      "departament_id": 31,
      name: "Trujillo",
      code: 76828,
      codefacturador: 12916
    },
    {
      id: 1041,
      "departament_id": 31,
      name: "Tuluá",
      code: 76834,
      codefacturador: 12686
    },
    {
      id: 1042,
      "departament_id": 31,
      name: "Ulloa",
      code: 76845,
      codefacturador: 13147
    },
    {
      id: 1043,
      "departament_id": 31,
      name: "Versalles",
      code: 76863,
      codefacturador: 13150
    },
    {
      id: 1044,
      "departament_id": 31,
      name: "Vijes",
      code: 76869,
      codefacturador: 12652
    },
    {
      id: 1045,
      "departament_id": 31,
      name: "Yotoco",
      code: 76890,
      codefacturador: 12918
    },
    {
      id: 1046,
      "departament_id": 31,
      name: "Yumbo",
      code: 76892,
      codefacturador: 12918
    },
    {
      id: 1047,
      "departament_id": 31,
      name: "Zarzal",
      code: 76895,
      codefacturador: 12657
    },
    {
      id: 1048,
      "departament_id": 3,
      name: "Arauca",
      code: 81001,
      codefacturador: 12658
    },
    {
      id: 1049,
      "departament_id": 3,
      name: "Arauquita",
      code: 81065,
      codefacturador: 12659
    },
    {
      id: 1050,
      "departament_id": 3,
      name: "Cravo Norte ",
      code: 81220,
      codefacturador: 12660
    },
    {
      id: 1051,
      "departament_id": 3,
      name: "Fortul",
      code: 81300,
      codefacturador: 12661
    },
    {
      id: 1052,
      "departament_id": 3,
      name: "Puerto Rondón ",
      code: 81591,
      codefacturador: 12662
    },
    {
      id: 1053,
      "departament_id": 3,
      name: "Saravena",
      code: 81736,
      codefacturador: 12663
    },
    {
      id: 1054,
      "departament_id": 3,
      name: "Tame",
      code: 81794,
      codefacturador: 12664
    },
    {
      id: 1055,
      "departament_id": 10,
      name: "Yopal",
      code: 85001,
      codefacturador: 12918
    },
    {
      id: 1056,
      "departament_id": 10,
      name: "Aguazul",
      code: 85010,
      codefacturador: 12900
    },
    {
      id: 1057,
      "departament_id": 10,
      name: "Chámeza",
      code: 85015,
      codefacturador: 12901
    },
    {
      id: 1058,
      "departament_id": 10,
      name: "Hato Corozal ",
      code: 85125,
      codefacturador: 12902
    },
    {
      id: 1059,
      "departament_id": 10,
      name: "La Salina ",
      code: 85136,
      codefacturador: 12903
    },
    {
      id: 1060,
      "departament_id": 10,
      name: "Maní",
      code: 85139,
      codefacturador: 12904
    },
    {
      id: 1061,
      "departament_id": 10,
      name: "Monterrey",
      code: 85162,
      codefacturador: 12905
    },
    {
      id: 1062,
      "departament_id": 10,
      name: "Nunchía",
      code: 85225,
      codefacturador: 12906
    },
    {
      id: 1063,
      "departament_id": 10,
      name: "Orocué",
      code: 85230,
      codefacturador: 12907
    },
    {
      id: 1064,
      "departament_id": 10,
      name: "Paz De Ariporo",
      code: 85250,
      codefacturador: 12908
    },
    {
      id: 1065,
      "departament_id": 10,
      name: "Pore",
      code: 85263,
      codefacturador: 12909
    },
    {
      id: 1066,
      "departament_id": 10,
      name: "Recetor",
      code: 85279,
      codefacturador: 12910
    },
    {
      id: 1067,
      "departament_id": 10,
      name: "Sabanalarga",
      code: 85300,
      codefacturador: 12911
    },
    {
      id: 1068,
      "departament_id": 10,
      name: "Sácama",
      code: 85315,
      codefacturador: 12912
    },
    {
      id: 1069,
      "departament_id": 10,
      name: "San Luis De Palenque",
      code: 85325,
      codefacturador: 12913
    },
    {
      id: 1070,
      "departament_id": 10,
      name: "Támara",
      code: 85400,
      codefacturador: 12914
    },
    {
      id: 1071,
      "departament_id": 10,
      name: "Tauramena",
      code: 85410,
      codefacturador: 12915
    },
    {
      id: 1072,
      "departament_id": 10,
      name: "Trinidad",
      code: 85430,
      codefacturador: 12916
    },
    {
      id: 1073,
      "departament_id": 10,
      name: "Villanueva",
      code: 85440,
      codefacturador: 13448
    },
    {
      id: 1074,
      "departament_id": 24,
      name: "Mocoa",
      code: 86001,
      codefacturador: 13325
    },
    {
      id: 1075,
      "departament_id": 24,
      name: "Colón",
      code: 86219,
      codefacturador: 13324
    },
    {
      id: 1076,
      "departament_id": 24,
      name: "Orito",
      code: 86320,
      codefacturador: 13326
    },
    {
      id: 1077,
      "departament_id": 24,
      name: "Puerto Asís ",
      code: 86568,
      codefacturador: 13327
    },
    {
      id: 1078,
      "departament_id": 24,
      name: "Puerto Caicedo ",
      code: 86569,
      codefacturador: 12806
    },
    {
      id: 1079,
      "departament_id": 24,
      name: "Puerto Guzmán ",
      code: 86571,
      codefacturador: 13329
    },
    {
      id: 1080,
      "departament_id": 24,
      name: "Puerto Leguízamo ",
      code: 86573,
      codefacturador: 13330
    },
    {
      id: 1081,
      "departament_id": 24,
      name: "Sibundoy",
      code: 86749,
      codefacturador: 13334
    },
    {
      id: 1082,
      "departament_id": 24,
      name: "San Francisco ",
      code: 86755,
      codefacturador: 13331
    },
    {
      id: 1083,
      "departament_id": 24,
      name: "San Miguel ",
      code: 86757,
      codefacturador: 13435
    },
    {
      id: 1084,
      "departament_id": 24,
      name: "Santiago",
      code: 86760,
      codefacturador: 13333
    },
    {
      id: 1085,
      "departament_id": 24,
      name: "Valle Del Guamuez",
      code: 86865,
      codefacturador: 13335
    },
    {
      id: 1086,
      "departament_id": 24,
      name: "Villagarzón",
      code: 86885,
      codefacturador: 13336
    },
    {
      id: 1087,
      "departament_id": 27,
      name: "San Andrés ",
      code: 88001,
      codefacturador: 48357
    },
    {
      id: 1088,
      "departament_id": 27,
      name: "Providencia",
      code: 88564,
      codefacturador: 48358
    },
    {
      id: 1089,
      "departament_id": 1,
      name: "Leticia",
      code: 91001,
      codefacturador: 12531
    },
    {
      id: 1090,
      "departament_id": 1,
      name: "El Encanto ",
      code: 91263,
      codefacturador: 13239
    },
    {
      id: 1091,
      "departament_id": 1,
      name: "La Chorrera ",
      code: 91405,
      codefacturador: 13354
    },
    {
      id: 1092,
      "departament_id": 1,
      name: "La Pedrera ",
      code: 91407,
      codefacturador: 13408
    },
    {
      id: 1093,
      "departament_id": 1,
      name: "La Victoria ",
      code: 91430,
      codefacturador: 12781
    },
    {
      id: 1094,
      "departament_id": 1,
      name: "Mirití - Paraná",
      code: 91460,
      codefacturador: 12938
    },
    {
      id: 1095,
      "departament_id": 1,
      name: "Puerto Alegría ",
      code: 91530,
      codefacturador: 13306
    },
    {
      id: 1096,
      "departament_id": 1,
      name: "Puerto Arica ",
      code: 91536,
      codefacturador: 13306
    },
    {
      id: 1097,
      "departament_id": 1,
      name: "Puerto Nariño ",
      code: 91540,
      codefacturador: 12532
    },
    {
      id: 1098,
      "departament_id": 1,
      name: "Puerto Santander ",
      code: 91669,
      codefacturador: 13112
    },
    {
      id: 1099,
      "departament_id": 1,
      name: "Tarapacá",
      code: 91798,
      codefacturador: 13525
    },
    {
      id: 1100,
      "departament_id": 16,
      name: "Inírida",
      code: 94001,
      codefacturador: 13159
    },
    {
      id: 1101,
      "departament_id": 16,
      name: "Barranco Minas ",
      code: 94343,
      codefacturador: 12694
    },
    {
      id: 1102,
      "departament_id": 16,
      name: "Mapiripana",
      code: 94663,
      codefacturador: 13246
    },
    {
      id: 1103,
      "departament_id": 16,
      name: "San Felipe ",
      code: 94883,
      codefacturador: 12716
    },
    {
      id: 1104,
      "departament_id": 16,
      name: "Puerto Colombia ",
      code: 94884,
      codefacturador: 12678
    },
    {
      id: 1105,
      "departament_id": 16,
      name: "La Guadalupe ",
      code: 94885,
      codefacturador: 12972
    },
    {
      id: 1106,
      "departament_id": 16,
      name: "Cacahual",
      code: 94886,
      codefacturador: 13233
    },
    {
      id: 1107,
      "departament_id": 16,
      name: "Pana Pana ",
      code: 94887,
      codefacturador: 13505
    },
    {
      id: 1108,
      "departament_id": 16,
      name: "Morichal",
      code: 94888,
      codefacturador: 12893
    },
    {
      id: 1109,
      "departament_id": 17,
      name: "San José Del Guaviare",
      code: 95001,
      codefacturador: 13163
    },
    {
      id: 1110,
      "departament_id": 17,
      name: "Calamar",
      code: 95015,
      codefacturador: 13160
    },
    {
      id: 1111,
      "departament_id": 17,
      name: "El Retorno ",
      code: 95025,
      codefacturador: 13161
    },
    {
      id: 1112,
      "departament_id": 17,
      name: "Miraflores",
      code: 95200,
      codefacturador: 13162
    },
    {
      id: 1113,
      "departament_id": 32,
      name: "Mitú",
      code: 97001,
      codefacturador: 13523
    },
    {
      id: 1114,
      "departament_id": 32,
      name: "Carurú",
      code: 97161,
      codefacturador: 12886
    },
    {
      id: 1115,
      "departament_id": 32,
      name: "Pacoa",
      code: 97511,
      codefacturador: 13107
    },
    {
      id: 1116,
      "departament_id": 32,
      name: "Taraira",
      code: 97666,
      codefacturador: 13525
    },
    {
      id: 1117,
      "departament_id": 32,
      name: "Papunahua",
      code: 97777,
      codefacturador: 12800
    },
    {
      id: 1118,
      "departament_id": 32,
      name: "Yavaraté",
      code: 97889,
      codefacturador: 13527
    },
    {
      id: 1119,
      "departament_id": 33,
      name: "Puerto Carreño ",
      code: 99001,
      codefacturador: 13530
    },
    {
      id: 1120,
      "departament_id": 33,
      name: "La Primavera ",
      code: 99524,
      codefacturador: 13529
    },
    {
      id: 1121,
      "departament_id": 33,
      name: "Santa Rosalía ",
      code: 99624,
      codefacturador: 13531
    },
    {
      id: 1122,
      "departament_id": 33,
      name: "Cumaribo",
      code: 99773,
      codefacturador: 13528
    }
   ]



   export const type_workers = [
    {
        id: "1",
        name: "Dependiente",
        code: "1"
    },
    {
        id: "2",
        name: "Servicio domestico",
        code: "2"
    },
    {
        id: "3",
        name: "Independiente",
        code: "3"
    },
    {
        id: "4",
        name: "Madre comunitaria",
        code: "4"
    },
    {
        id: "5",
        name: "Aprendices del Sena en etapa lectiva",
        code: "12"
    },
    {
        id: "6",
        name: "Independiente agremiado o asociado",
        code: "16"
    },
    {
        id: "7",
        name: "Funcionarios públicos sin tope máximo de ibc",
        code: "18"
    },
    {
        id: "8",
        name: "Aprendices del SENA en etapa productiva",
        code: "19"
    },
    {
        id: "9",
        name: "Estudiantes (régimen especial ley 789 de 2002)",
        code: "20"
    },
    {
        id: "10",
        name: "Estudiantes de postgrado en salud",
        code: "21"
    },
    {
        id: "11",
        name: "Profesor de establecimiento particular",
        code: "22"
    },
    {
        id: "12",
        name: "Estudiantes aportes solo riesgos laborales",
        code: "23"
    },
    {
        id: "13",
        name: "Dependiente entidades o universidades públicas con régimen especial en salud",
        code: "30"
    },
    {
        id: "14",
        name: "Cooperados o pre cooperativas de trabajo asociado",
        code: "31"
    },
    {
        id: "15",
        name: "Cotizante miembro de la carrera diplomática o consular de un país extranjero o funcionario de organismo multilateral",
        code: "32"
    },
    {
        id: "16",
        name: "Beneficiario del fondo de solidaridad pensional",
        code: "33"
    },
    {
        id: "17",
        name: "Concejal municipal o distrital o edil de junta administrativa local que percibe honorarios amparado por póliza de salud",
        code: "34"
    },
    {
        id: "18",
        name: "Concejal municipal o distrital que percibe honorarios no amparado con póliza de salud",
        code: "35"
    },
    {
        id: "19",
        name: "Concejal municipal o distrital que percibe honorarios no amparado con póliza de salud beneficiario del fondo de solidaridad pensional.",
        code: "36"
    },
    {
        id: "20",
        name: "Beneficiario upc adicional",
        code: "40"
    },
    {
        id: "21",
        name: "Beneficiario sin ingresos con pago por tercero",
        code: "41"
    },
    {
        id: "22",
        name: "Cotizante pago solo salud articulo 2 ley 1250 de 2008 (independientes de bajos ingresos)",
        code: "42"
    },
    {
        id: "23",
        name: "Cotizante voluntario a pensiones con pago por tercero",
        code: "43"
    },
    {
        id: "24",
        name: "Cotizante dependiente de empleo de emergencia con duración mayor o igual a un mes",
        code: "44"
    },
    {
        id: "25",
        name: "Cotizante dependiente de empleo de emergencia con duración menor a un mes",
        code: "45"
    },
    {
        id: "26",
        name: "Trabajador dependiente de entidad beneficiaria del sistema general de participaciones - aportes patronales",
        code: "47"
    },
    {
        id: "27",
        name: "Trabajador de tiempo parcial",
        code: "51"
    },
    {
        id: "28",
        name: "Beneficiario del mecanismo de protección al cesante",
        code: "52"
    },
    {
        id: "29",
        name: "Afiliado participe",
        code: "53"
    },
    {
        id: "30",
        name: "Pre pensionado de entidad en liquidación.",
        code: "54"
    },
    {
        id: "31",
        name: "Afiliado participe - dependiente",
        code: "55"
    },
    {
        id: "32",
        name: "Pre pensionado con aporte voluntario a salud",
        code: "56"
    },
    {
        id: "33",
        name: "Independiente voluntario al sistema de riesgos laborales",
        code: "57"
    },
    {
        id: "34",
        name: "Estudiantes de prácticas laborales en el sector público",
        code: "58"
    },
    {
        id: "35",
        name: "Independiente con contrato de prestación de servicios superior a 1 mes",
        code: "59"
    },
    {
        id: "36",
        name: "Beneficiario programa de reincorporación",
        code: "61"
    }
    ]

  export const sub_type_worker_id=  [
    {
        id: "1",
        name: "No Aplica",
        code: "0"
    },
    {
        id: "2",
        name: "Dependiente pensionado por vejez activo",
        code: "1"
    },
    {
        id: "3",
        name: "Independiente pensionado por vejez activo",
        code: "2"
    },
    {
        id: "4",
        name: "Cotizante no obligado a cotizar a pensión por edad",
        code: "3"
    },
    {
        id: "5",
        name: "Cotizante con requisitos cumplidos para pensión",
        code: "4"
    },
    {
        id: "6",
        name: "Cotizante a quien se le ha reconocido indemnización sustitutiva o devolución de saldos",
        code: "12"
    },
    {
        id: "7",
        name: "Cotizante perteneciente a un régimen de exceptuado de pensiones a entidades autorizadas para recibir aportes exclusivamente de un grupo de sus propios trabajadores",
        code: "16"
    },
    {
        id: "8",
        name: "Cotizante pensionado con mesada superior a 25 smlmv",
        code: "18"
    },
    {
        id: "9",
        name: "Residente en el exterior afiliado voluntario al sistema general de pensiones y/o afiliado",
        code: "19"
    },
    {
        id: "10",
        name: "Conductores del servicio público de transporte terrestre automotor individual de pasajeros en vehículos taxi decreto 1047 de 2014",
        code: "20"
    },
    {
        id: "11",
        name: "Conductores servicio taxi no aporte pensión dec. 1047",
        code: "21"
    }
]  

export const payroll_type_document_identification_id = [
  {
      id: "1",
      name: "Cedula de ciudadanía",
      code: "13"
  },
  {
      id: "2",
      name: "Cedula de extranjería",
      code: "22"
  },
  {
      id: "3",
      name: "Tarjeta de identidad",
      code: "12"
  },
  {
      id: "4",
      name: "Pasaporte",
      code: "41"
  }
]

export const type_contract_id = [
  {
      "id": "1",
      "name": "Término Fijo",
      "code": "1"
  },
  {
      "id": "2",
      "name": "Término Indefinido",
      "code": "2"
  },
  {
      "id": "3",
      "name": "Obra o Labor",
      "code": "3"
  },
  {
      "id": "4",
      "name": "Aprendizaje",
      "code": "4"
  },
  {
      "id": "5",
      "name": "Practicas",
      "code": "5"
  }
]


export const payment_methods= [
      {
          "id": "1",
          "name": "Instrumento no definido",
          "code": "1"
      },
      {
          "id": "2",
          "name": "Crédito ACH",
          "code": "2"
      },
      {
          "id": "3",
          "name": "Débito ACH",
          "code": "3"
      },
      {
          "id": "4",
          "name": "Reversión débito de demanda ACH",
          "code": "4"
      },
      {
          "id": "5",
          "name": "Reversión crédito de demanda ACH ",
          "code": "5"
      },
      {
          "id": "6",
          "name": "Crédito de demanda ACH",
          "code": "6"
      },
      {
          "id": "7",
          "name": "Débito de demanda ACH",
          "code": "7"
      },
      {
          "id": "8",
          "name": "Mantener",
          "code": "8"
      },
      {
          "id": "9",
          "name": "Clearing Nacional o Regional",
          "code": "9"
      },
      {
          "id": "10",
          "name": "Efectivo",
          "code": "10"
      },
      {
          "id": "11",
          "name": "Reversión Crédito Ahorro",
          "code": "11"
      },
      {
          "id": "12",
          "name": "Reversión Débito Ahorro",
          "code": "12"
      },
      {
          "id": "13",
          "name": "Crédito Ahorro",
          "code": "13"
      },
      {
          "id": "14",
          "name": "Débito Ahorro",
          "code": "14"
      },
      {
          "id": "15",
          "name": "Bookentry Crédito",
          "code": "15"
      },
      {
          "id": "16",
          "name": "Bookentry Débito",
          "code": "16"
      },
      {
          "id": "17",
          "name": "Concentración de la demanda en efectivo /Desembolso Crédito (CCD)",
          "code": "17"
      },
      {
          "id": "18",
          "name": "Concentración de la demanda en efectivo / Desembolso (CCD) débito",
          "code": "18"
      },
      {
          "id": "19",
          "name": "Crédito Pago negocio corporativo (CTP)",
          "code": "19"
      },
      {
          "id": "20",
          "name": "Cheque",
          "code": "20"
      },
      {
          "id": "21",
          "name": "Poyecto bancario",
          "code": "21"
      },
      {
          "id": "22",
          "name": "Proyecto bancario certificado",
          "code": "22"
      },
      {
          "id": "23",
          "name": "Cheque bancario",
          "code": "23"
      },
      {
          "id": "24",
          "name": "Nota cambiaria esperando aceptación",
          "code": "24"
      },
      {
          "id": "25",
          "name": "Cheque certificado",
          "code": "25"
      },
      {
          "id": "26",
          "name": "Cheque Local",
          "code": "26"
      },
      {
          "id": "27",
          "name": "Débito Pago Neogcio Corporativo (CTP)",
          "code": "27"
      },
      {
          "id": "28",
          "name": "Crédito Negocio Intercambio Corporativo (CTX)",
          "code": "28"
      },
      {
          "id": "29",
          "name": "Débito Negocio Intercambio Corporativo (CTX)",
          "code": "29"
      },
      {
          "id": "30",
          "name": "Transferecia Crédito",
          "code": "30"
      },
      {
          "id": "31",
          "name": "Transferencia Débito",
          "code": "31"
      },
      {
          "id": "32",
          "name": "Concentración Efectivo / Desembolso Crédito plus (CCD+)",
          "code": "32"
      },
      {
          "id": "33",
          "name": "Concentración Efectivo / Desembolso Débito plus (CCD+)",
          "code": "33"
      },
      {
          "id": "34",
          "name": "Pago y depósito pre acordado (PPD)",
          "code": "34"
      },
      {
          "id": "35",
          "name": "Concentración efectivo ahorros / Desembolso Crédito (CCD)",
          "code": "35"
      },
      {
          "id": "36",
          "name": "Concentración efectivo ahorros / Desembolso Drédito (CCD)",
          "code": "36"
      },
      {
          "id": "37",
          "name": "Pago Negocio Corporativo Ahorros Crédito (CTP)",
          "code": "37"
      },
      {
          "id": "38",
          "name": "Pago Neogcio Corporativo Ahorros Débito (CTP)",
          "code": "38"
      },
      {
          "id": "39",
          "name": "Crédito Negocio Intercambio Corporativo (CTX)",
          "code": "39"
      },
      {
          "id": "40",
          "name": "Débito Negocio Intercambio Corporativo (CTX)",
          "code": "40"
      },
      {
          "id": "41",
          "name": "Concentración efectivo/Desembolso Crédito plus (CCD+) ",
          "code": "41"
      },
      {
          "id": "42",
          "name": "Consiganción bancaria",
          "code": "42"
      },
      {
          "id": "43",
          "name": "Concentración efectivo / Desembolso Débito plus (CCD+)",
          "code": "43"
      },
      {
          "id": "44",
          "name": "Nota cambiaria",
          "code": "44"
      },
      {
          "id": "45",
          "name": "Transferencia Crédito Bancario",
          "code": "45"
      },
      {
          "id": "46",
          "name": "Transferencia Débito Interbancario",
          "code": "46"
      },
      {
          "id": "47",
          "name": "Transferencia Débito Bancaria",
          "code": "47"
      },
      {
          "id": "48",
          "name": "Tarjeta Crédito",
          "code": "48"
      },
      {
          "id": "49",
          "name": "Tarjeta Débito",
          "code": "49"
      },
      {
          "id": "50",
          "name": "Postgiro",
          "code": "50"
      },
      {
          "id": "51",
          "name": "Telex estándar bancario francés",
          "code": "51"
      },
      {
          "id": "52",
          "name": "Pago comercial urgente",
          "code": "52"
      },
      {
          "id": "53",
          "name": "Pago Tesorería Urgente",
          "code": "53"
      },
      {
          "id": "54",
          "name": "Nota promisoria",
          "code": "60"
      },
      {
          "id": "55",
          "name": "Nota promisoria firmada por el acreedor",
          "code": "61"
      },
      {
          "id": "56",
          "name": "Nota promisoria firmada por el acreedor, avalada por el banco",
          "code": "62"
      },
      {
          "id": "57",
          "name": "Nota promisoria firmada por el acreedor, avalada por un tercero",
          "code": "63"
      },
      {
          "id": "58",
          "name": "Nota promisoria firmada pro el banco",
          "code": "64"
      },
      {
          "id": "59",
          "name": "Nota promisoria firmada por un banco avalada por otro banco",
          "code": "65"
      },
      {
          "id": "60",
          "name": "Nota promisoria firmada ",
          "code": "66"
      },
      {
          "id": "61",
          "name": "Nota promisoria firmada por un tercero avalada por un banco",
          "code": "67"
      },
      {
          "id": "62",
          "name": "Retiro de nota por el por el acreedor",
          "code": "70"
      },
      {
          "id": "63",
          "name": "Retiro de nota por el por el acreedor sobre un banco",
          "code": "74"
      },
      {
          "id": "64",
          "name": "Retiro de nota por el acreedor, avalada por otro banco",
          "code": "75"
      },
      {
          "id": "65",
          "name": "Retiro de nota por el acreedor, sobre un banco avalada por un tercero",
          "code": "76"
      },
      {
          "id": "66",
          "name": "Retiro de una nota por el acreedor sobre un tercero",
          "code": "77"
      },
      {
          "id": "67",
          "name": "Retiro de una nota por el acreedor sobre un tercero avalada por un banco",
          "code": "78"
      },
      {
          "id": "68",
          "name": "Nota bancaria tranferible",
          "code": "91"
      },
      {
          "id": "69",
          "name": "Cheque local traferible",
          "code": "92"
      },
      {
          "id": "70",
          "name": "Giro referenciado",
          "code": "93"
      },
      {
          "id": "71",
          "name": "Giro urgente",
          "code": "94"
      },
      {
          "id": "72",
          "name": "Giro formato abierto",
          "code": "95"
      },
      {
          "id": "73",
          "name": "Método de pago solicitado no usuado",
          "code": "96"
      },
      {
          "id": "74",
          "name": "Clearing entre partners",
          "code": "97"
      },
      {
          "id": "75",
          "name": "Acuerdo mutuo",
          "code": "ZZZ"
      }
  ]

  export const payroll_periods= [
    {
        "id": "1",
        "name": "Semanal",
        "code": "1",
        "dias": 7
    },
    {
        "id": "2",
        "name": "Decenal",
        "code": "2",
        "dias": 12
    },
    {
        "id": "3",
        "name": "Catorcenal",
        "code": "3",
        "dias": 14
    },
    {
        "id": "4",
        "name": "Quincenal",
        "code": "4",
        "dias": 15
    },
    {
        "id": "5",
        "name": "Mensual",
        "code": "5",
        "dias": 30
    }
]