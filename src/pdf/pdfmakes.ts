import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Inportcolaborativo } from '../interface/outputColaborativoJugador.interface';
import {  OutputTodosJugador } from '../interface/ouputTodosJugadorReporte.interface';

// Asigna las fuentes del archivo vfs_fonts.js a pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const estudiante = 'Martin 1A';

export const pdfVocabularioEstudiante = async (inputarray: Respuestavocabulario[]): Promise<string> => {

  const content: any[] = [
    { text: 'Reporte por Estudiante', style: 'header' },
    {
      text:[ { text: 'Estudiante: ', style: 'membrete' },
        { text:`${inputarray[0].nombre}` }
      ],
      style:'membreteLinea'
    },
    {
      text:[ { text: 'Cédula: ', style: 'membrete' },
        { text: `${inputarray[0].cedula}` }
      ],style:'membreteLinea'
    },
    {
      text:[ { text: 'Actividad: ', style: 'membrete' },
        { text: "Vocabulario" }
      ],style:'membreteLinea'
    },
  ];

  // Añadir contenido de inputarray
  inputarray.forEach(item => {
    content.push(
      {
        text:[ { text: 'Fecha: ', style: 'fecha' },
          { text:`${fechaEcuador(item.updatedAtDay)}`, style:'fechacontenido'}
        ],style:'fechalinea'
      },
      ...item.data.map((dataItem, index) => {
        const tableContent: any[] = [
          { text: `Actividad ${index + 1}`,style:'membrete2' },
          
        ];

        if (dataItem.Avance.Correcto.length > 0) {
          tableContent.push(
            { text: 'Correctos', style:'correctoTitle' },
            {
              style: 'tableExample',
              table: {
                widths: ['*'],
                body: [
                  [
                    { text: 'Palabra/Oración seleccionada', style: 'tableHeader' },
                  ],
                  ...SinRepeticiones({ input: dataItem.Avance.Correcto }).map((e, index) => [{ text: `${e}` }])
                ]
              },
              layout: {
                hLineWidth: (i: number) => 0.3,
                vLineWidth: (i: number) => 0.3,
                hLineColor: () => '#f2f2f2',
                vLineColor: () => '#f2f2f2',
                paddingTop: () => 5,
                paddingBottom: () => 5
                
              }
            }
          );
        }


        if (dataItem.Avance.Incorrecto.length > 0) {
          tableContent.push(
            { text: 'Incorrectos', style:'correctoTitle' },
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*'],
                body: [
                  [
                    { text: 'Palabra/Oración seleccionada (incorrecta)', style: 'tableHeader' },
                    { text: 'Palabra/Oración evaluada (correcta)', style: 'tableHeader' }
                  ],
                  ...dataItem.Avance.Incorrecto.map(e => [
                    { text: `${e.PalabraASeleccionada}` },
                    { text: `${e.PalabraAEvaluar}` }
                  ])
                ]
              },
              layout: {
                hLineWidth: (i: number) => 0.3,
                vLineWidth: (i: number) => 0.3,
                hLineColor: () => '#f2f2f2',
                vLineColor: () => '#f2f2f2',
                paddingTop: () => 5,
                paddingBottom: () => 5
                
              }
            }
          );
        }

        if (dataItem.Avance.NoContesto.length > 0) {
          tableContent.push(
            { text: 'No Contestados (por tiempo excedido)' , style:'correctoTitle'},
            {
              style: 'tableExample',
              table: {
                widths: ['*'],
                body: [
                  [
                    { text: 'Palabra/Oración evaluada', style: 'tableHeader' },
                  ],
                  ...SinRepeticiones({ input: dataItem.Avance.NoContesto }).map(e => [{ text: `${e}` }])
                ]
              },
              layout: {
                hLineWidth: (i: number) => 0,
                vLineWidth: (i: number) => 0,
                hLineColor: () => '#f2f2f2',
                vLineColor: () => '#f2f2f2',
                paddingTop: () => 5,
                paddingBottom: () => 5
              }
            }
          );
        }

        // Añadir más contenido según sea necesario, como "No contestados" u otros.

        return tableContent;
      }).flat()
    );
  });

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 80, 40, 80],
    content: content,
    defaultStyle: {
      font: 'Roboto'
    },
    styles: {
      header: {
        fontSize: 20,
        bold:true,
        color: '#4E388A'
      },
      membrete:{
        bold: true,
        
        color: '#8cc5b0',
      },
      membreteLinea:{
        marginTop:8,
        marginBottom:8
      },
      fecha:{
 color: '#85858C'
      },
      fechacontenido:{

      },
      fechalinea:{
        background:'#E6DFF0',
         color: "#62269E", 
         bold:true,
marginTop:8,
marginBottom:8
      },

      correctoTitle:{
        fontSize:14,
        marginTop:10,
        marginBottom:10,
        bold:true
      },
      membrete2:{
        bold: true,
        fontSize:13,
        color: '#8cc5b0',
        marginTop:10
      },
      tableHeader:{ fillColor: "#E6DFF0", color: "#62269E",alignment:'left', bold:true},
      tableBody:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'},
      tableBody1:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'}
    }
  };

  // Generador de PDF
  return new Promise<string>((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBase64((data) => {
      resolve(data);
    });
  });
};

//oracion

export const pdfOracionEstudiante = async (inputarray: Respuestavocabulario[]): Promise<string> => {

  const content: any[] = [
    { text: 'Reporte por Estudiante', style: 'header' },
    {
      text:[ { text: 'Estudiante: ', style: 'membrete' },
        { text:`${inputarray[0].nombre}` }
      ],
      style:'membreteLinea'
    },
    {
      text:[ { text: 'Cédula: ', style: 'membrete' },
        { text: `${inputarray[0].cedula}` }
      ],style:'membreteLinea'
    },
    {
      text:[ { text: 'Actividad: ', style: 'membrete' },
        { text: "Oración" }
      ],style:'membreteLinea'
    },
  ];

  // Añadir contenido de inputarray
  inputarray.forEach(item => {
    content.push(
      {
        text:[ { text: 'Fecha: ', style: 'fecha' },
          { text:`${fechaEcuador(item.updatedAtDay)}`, style:'fechacontenido'}
        ],style:'fechalinea'
      },
      ...item.data.map((dataItem, index) => {
        const tableContent: any[] = [
          { text: `Actividad ${index + 1}`,style:'membrete2' },          
        ];

        if (dataItem.Avance.Correcto.length > 0) {
          tableContent.push(
            { text: 'Correctos', style:'correctoTitle' },
            {
              style: 'tableExample',
              table: {
                widths: ['*'],
                body: [
                  [
                    { text: 'Palabra/Oración seleccionada', style: 'tableHeader' },
                  ],
                  ...SinRepeticiones({ input: dataItem.Avance.Correcto }).map((e, index) => [{ text: `${e}` }])
                ]
              },
              layout: {
                hLineWidth: (i: number) => 0.3,
                vLineWidth: (i: number) => 0.3,
                hLineColor: () => '#f2f2f2',
                vLineColor: () => '#f2f2f2',
                paddingTop: () => 5,
                paddingBottom: () => 5
                
              }
            }
          );
        }


        if (dataItem.Avance.Incorrecto.length > 0) {
          tableContent.push(
            { text: 'Incorrectos', style:'correctoTitle' },
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*'],
                body: [
                  [
                    { text: 'Palabra/Oración seleccionada (incorrecta)', style: 'tableHeader' },
                    { text: 'Palabra/Oración evaluada (correcta)', style: 'tableHeader' }
                  ],
                  ...dataItem.Avance.Incorrecto.map(e => [
                    { text: `${e.PalabraASeleccionada}` },
                    { text: `${e.PalabraAEvaluar}` }
                  ])
                ]
              },
              layout: {
                hLineWidth: (i: number) => 0.3,
                vLineWidth: (i: number) => 0.3,
                hLineColor: () => '#f2f2f2',
                vLineColor: () => '#f2f2f2',
                paddingTop: () => 5,
                paddingBottom: () => 5
                
              }
            }
          );
        }

        if (dataItem.Avance.NoContesto.length > 0) {
          tableContent.push(
            { text: 'No Contestados (por tiempo excedido)' , style:'correctoTitle'},
            {
              style: 'tableExample',
              table: {
                widths: ['*'],
                body: [
                  [
                    { text: 'Palabra/Oración evaluada', style: 'tableHeader' },
                  ],
                  ...SinRepeticiones({ input: dataItem.Avance.NoContesto }).map(e => [{ text: `${e}` }])
                ]
              },
              layout: {
                hLineWidth: (i: number) => 0,
                vLineWidth: (i: number) => 0,
                hLineColor: () => '#f2f2f2',
                vLineColor: () => '#f2f2f2',
                paddingTop: () => 5,
                paddingBottom: () => 5
              }
            }
          );
        }

        // Añadir más contenido según sea necesario, como "No contestados" u otros.

        return tableContent;
      }).flat()
    );
  });

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 80, 40, 80],
    content: content,
    defaultStyle: {
      font: 'Roboto'
    },
    styles: {
      header: {
        fontSize: 20,
        bold:true,
        color: '#4E388A'
      },
      membrete:{
        bold: true,
        
        color: '#8cc5b0',
      },
      membreteLinea:{
        marginTop:8,
        marginBottom:8
      },
      fecha:{
 color: '#85858C'
      },
      fechacontenido:{

      },
      fechalinea:{
        background:'#E6DFF0',
         color: "#62269E", 
         bold:true,
marginTop:8,
marginBottom:8
      },

      correctoTitle:{
        fontSize:14,
        marginTop:10,
        marginBottom:10,
        bold:true
      },
      membrete2:{
        bold: true,
        fontSize:13,
        color: '#8cc5b0',
        marginTop:10
      },
      tableHeader:{ fillColor: "#E6DFF0", color: "#62269E",alignment:'left', bold:true},
      tableBody:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'},
      tableBody1:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'}
    }
  };

  // Generador de PDF
  return new Promise<string>((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBase64((data) => {
      resolve(data);
    });
  });
};



export const pdfColaborativoEstudiante = async (inputarray: Inportcolaborativo[]): Promise<string> => {

 
  const content: any[] = [
    { text: 'Reporte por Estudiante', style: 'header' },
    {
      text:[ { text: 'Estudiante: ', style: 'membrete' },
        { text:`${inputarray[0].nombre}` }
      ],
      style:'membreteLinea'
    },
    {
      text:[ { text: 'Cédula: ', style: 'membrete' },
        { text: `${inputarray[0].cedula}` }
      ],style:'membreteLinea'
    },
    {
      text:[ { text: 'Actividad: ', style: 'membrete' },
        { text: "Oración" }
      ],style:'membreteLinea'
    },
  ];

  // Añadir contenido de inputarray
  inputarray.forEach((item, index) => {
    const tableContent: any[] = [
          

    ];
    content.push(
      {
        text:[ { text: 'Fecha: ', style: 'fecha' },
          { text:`${fechaEcuador(item.updatedAtDay)}`, style:'fechacontenido'}
        ],style:'fechalinea'
      },
      {
        text:[ 
          { text: 'Fecha de inicio: ', style: 'fecha' },
          { text:`${fechaEcuador(item.FechaDeInicio)}`, style:'fechacontenido'},
          { text: 'Fecha de cierre: ', style: 'fecha' },
          { text:`${fechaEcuador(item.FechaDeFin)}`, style:'fechacontenido'}
        ],style:'fechalinea2'
      },
      item.motivo.length > 0 ? {
        text:[ { text: 'Motivo: ', style: 'fecha' },
          { text:`${item.motivo}`, style:'fechacontenido'}
        ],style:'fechalinea2'
      }:{
        text:''
      },
      

      item.Avance.Correcto.length>0 ? { text: 'Correctos', style:'correctoTitle' }:{text:''},
      item.Avance.Correcto.length>0 ? {
                style: 'tableExample',
                table: {
                  widths: ['*'],
                  body: [
                    [
                      { text: 'Palabra/Oración seleccionada', style: 'tableHeader' },
                    ],
                    ...SinRepeticiones({ input: item.Avance.Correcto}).map((e, index) => [{ text: `${e}` }])
                  ]
                },
                layout: {
                  hLineWidth: (i: number) => 0.3,
                  vLineWidth: (i: number) => 0.3,
                  hLineColor: () => '#f2f2f2',
                  vLineColor: () => '#f2f2f2',
                  paddingTop: () => 5,
                  paddingBottom: () => 5
                  
                }
              }:{text:''},
      
              item.Avance.Incorrecto.length>0? { text: 'Incorrectos', style:'correctoTitle' }:{text:''},
              item.Avance.Incorrecto.length>0? {
                        style: 'tableExample',
                        table: {
                          widths: ['*', '*'],
                          body: [
                            [
                              { text: 'Palabra/Oración seleccionada (incorrecta)', style: 'tableHeader' },
                              { text: 'Palabra/Oración evaluada (correcta)', style: 'tableHeader' }
                            ],
                            ...item.Avance.Incorrecto.map(e => [
                              { text: `${e.PalabraASeleccionada}` },
                              { text: `${e.PalabraAEvaluar}` }
                            ])
                          ]
                        },
                        layout: {
                          hLineWidth: (i: number) => 0.3,
                          vLineWidth: (i: number) => 0.3,
                          hLineColor: () => '#f2f2f2',
                          vLineColor: () => '#f2f2f2',
                          paddingTop: () => 5,
                          paddingBottom: () => 5
                          
                        }
                      }:{text:''},
      
                      item.Avance.NoContesto.length>0?{ text: 'No Contestados (por tiempo excedido)' , style:'correctoTitle'}:{text:''},
                      item.Avance.NoContesto.length>0? {
                                style: 'tableExample',
                                table: {
                                  widths: ['*'],
                                  body: [
                                    [
                                      { text: 'Palabra/Oración evaluada', style: 'tableHeader' },
                                    ],
                                    ...SinRepeticiones({ input: item.Avance.NoContesto}).map(e => [{ text: `${e}` }])
                                  ]
                                },
                                layout: {
                                  hLineWidth: (i: number) => 0,
                                  vLineWidth: (i: number) => 0,
                                  hLineColor: () => '#f2f2f2',
                                  vLineColor: () => '#f2f2f2',
                                  paddingTop: () => 5,
                                  paddingBottom: () => 5
                                }
                              }:{text:''},
    );
  });

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 80, 40, 80],
    content: content,
    defaultStyle: {
      font: 'Roboto'
    },
    
    styles: {
      header: {
        fontSize: 20,
        bold:true,
        color: '#4E388A'
      },
      fechalinea2:{
        color: "#62269E", 
        bold:true,
marginTop:8,
marginBottom:8
      },
      membrete:{
        bold: true,
        
        color: '#8cc5b0',
      },
      membreteLinea:{
        marginTop:8,
        marginBottom:8
      },
      fecha:{
 color: '#85858C'
      },
      fechacontenido:{

      },
      fechalinea:{
        background:'#E6DFF0',
         color: "#62269E", 
         bold:true,
marginTop:8,
marginBottom:8
      },

      correctoTitle:{
        fontSize:14,
        marginTop:10,
        marginBottom:10,
        bold:true
      },
      membrete2:{
        bold: true,
        fontSize:13,
        color: '#8cc5b0',
        marginTop:10
      },
      tableHeader:{ fillColor: "#E6DFF0", color: "#62269E",alignment:'left', bold:true},
      tableBody:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'},
      tableBody1:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'}
    }
  };

  // Generador de PDF
  return new Promise<string>((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBase64((data) => {
      resolve(data);
    });
  });
};



export const pdfTodosEstudiante = async (inputarray: OutputTodosJugador): Promise<string> => {

 
  const content: any[] = [
    { text: 'Reporte por Estudiante', style: 'header' },
    {
      text:[ { text: 'Estudiante: ', style: 'membrete' },
        { text:`${inputarray.nombre}` }
      ],
      style:'membreteLinea'
    },
    {
      text:[ { text: 'Cédula: ', style: 'membrete' },
        { text: `${inputarray.cedula}` }
      ],style:'membreteLinea'
    },

    // {
    //   text:[ { text: 'Actividad: ', style: 'membrete' },
    //     { text: "Oración" }
    //   ],style:'membreteLinea'
    // },
  ];
  inputarray.salida.forEach((item, index) => {
    content.push(
          {
            text:[ { text: 'Fecha: ', style: 'fecha' },
              { text:`${fechaEcuador(item.updatedAtDay)}`, style:'fechacontenido'}
            ],style:'fechalinea'
          },
          item.data.map(individual=>{
            const tableContent: any[] = [
                
            ];
            
            if(individual.tipo === 'vocabulario'){
              tableContent.push(
                {
                  text:[ { text: 'Actividad: ', style: 'membrete' },
                    { text: `${individual.tipo}` }
                  ],style:'membreteLinea'
                },     
              )
              
                
              individual.Avance != null?       tableContent.push(
                    individual.Avance.Correcto.length > 0 ? { text: 'Correctos', style:'correctoTitle' }:{text:''},
                    individual.Avance.Correcto.length > 0 ?     {
                      style: 'tableExample',
                      table: {
                        widths: ['*'],
                        body: [
                          [
                            { text: 'Palabra/Oración seleccionada', style: 'tableHeader' },
                          ],
                          ...SinRepeticiones({ input: individual.Avance.Correcto }).map((e, index) => [{ text: `${e}` }])
                        ]
                      },
                      layout: {
                        hLineWidth: (i: number) => 0.3,
                        vLineWidth: (i: number) => 0.3,
                        hLineColor: () => '#f2f2f2',
                        vLineColor: () => '#f2f2f2',
                        paddingTop: () => 5,
                        paddingBottom: () => 5
                        
                      }
                    }:{text:'dasdadadada'}
                  ):{text:'dasd'};
                
               

             if( individual.Avance != undefined){
              if (individual.Avance.Incorrecto.length > 0) {
                tableContent.push(
                  { text: 'Incorrectos', style:'correctoTitle' },
                  {
                    style: 'tableExample',
                    table: {
                      widths: ['*', '*'],
                      body: [
                        [
                          { text: 'Palabra/Oración seleccionada (incorrecta)', style: 'tableHeader' },
                          { text: 'Palabra/Oración evaluada (correcta)', style: 'tableHeader' }
                        ],
                        ...individual.Avance.Incorrecto.map(e => [
                          { text: `${e.PalabraASeleccionada}` },
                          { text: `${e.PalabraAEvaluar}` }
                        ])
                      ]
                    },
                    layout: {
                      hLineWidth: (i: number) => 0.3,
                      vLineWidth: (i: number) => 0.3,
                      hLineColor: () => '#f2f2f2',
                      vLineColor: () => '#f2f2f2',
                      paddingTop: () => 5,
                      paddingBottom: () => 5
                      
                    }
                  }
                );
              }
             }
              
            }

            if(individual.tipo === 'oracion'){
              tableContent.push(
                {
                  text:[ { text: 'Actividad: ', style: 'membrete' },
                    { text: `${individual.tipo}` }
                  ],style:'membreteLinea'
                },     
              )

            }
            if(individual.tipo === 'colaborativo'){
              if(individual.motivo != undefined){

              
              tableContent.push(
                individual.motivo.length > 0 ? {
                  text:[ { text: 'Motivo: ', style: 'fecha' },
                    { text:`${individual.motivo}`, style:'fechacontenido'}
                  ],style:'fechalinea2'
                }:{
                  text:''
                }     
              )}

              tableContent.push(
                
              )
            }



            return tableContent;
          }).flat()
        );
  })


  
  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 80, 40, 80],
    content: content,
    defaultStyle: {
      font: 'Roboto'
    },
    
    styles: {
      header: {
        fontSize: 20,
        bold:true,
        color: '#4E388A'
      },
      fechalinea2:{
        color: "#62269E", 
        bold:true,
marginTop:8,
marginBottom:8
      },
      membrete:{
        bold: true,
        
        color: '#8cc5b0',
      },
      membreteLinea:{
        marginTop:8,
        marginBottom:8
      },
      fecha:{
 color: '#85858C'
      },
      fechacontenido:{

      },
      fechalinea:{
        background:'#E6DFF0',
         color: "#62269E", 
         bold:true,
marginTop:8,
marginBottom:8
      },

      correctoTitle:{
        fontSize:14,
        marginTop:10,
        marginBottom:10,
        bold:true
      },
      membrete2:{
        bold: true,
        fontSize:13,
        color: '#8cc5b0',
        marginTop:10
      },
      tableHeader:{ fillColor: "#E6DFF0", color: "#62269E",alignment:'left', bold:true},
      tableBody:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'},
      tableBody1:{ fillColor: "##E6DFF0", color: "##85858C",alignment:'left'}
    }
  };

  // Generador de PDF
  return new Promise<string>((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBase64((data) => {
      resolve(data);
    });
  });
};




const fechaEcuador = (fecha: string) => {
  const fechaUtc = new Date(fecha);
  const fechaLocal = new Date(fechaUtc.getTime() - fechaUtc.getTimezoneOffset() * 60000);
  
  // Asegúrate de que las opciones estén correctamente definidas con los tipos literales esperados
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    timeZone: 'America/Guayaquil' 
  };

  const fechaFormateada = fechaLocal.toLocaleDateString('es-EC', options);
  return fechaFormateada;
}






export interface Respuestavocabulario {
  updatedAtDay: string;
  data:         Datum[];
  tipo:         string;
  nombre: string;
  cedula: string;
}

export interface Datum {
  Estudiante:  Estudiante;
  Rompecabeza: Rompecabeza;
  Avance:      Avance;
  Terminado:   boolean;
}

export interface Avance {
  Correcto:   string[];
  Incorrecto: Incorrecto[];
  NoContesto: string[];
}

export interface Incorrecto {
  PalabraAEvaluar:      string;
  PalabraASeleccionada: string;
}

export interface Estudiante {
  _id:            string;
  Nombre:         string;
  Usuario:        string;
  Identificacion: string;
  Curso:          string;
  Paralelo:       string;
}

export interface Rompecabeza {
  _id:        string;
  Nombre:     string;
  Pieza:      number;
  FileBlanco: string;
  FileColor:  string;
  Estado:     string;
  createdAt:  Date;
  updatedAt:  Date;
  Juego:      string;
}


export const SinRepeticiones = ({input}:{input:string[]})=>{
  // const palabras = ["manzana", "banana", "manzana", "uva", "naranja", "banana"];

// Crear un conjunto para almacenar palabras únicas
const palabrasUnicas = new Set(input);

// Convertir el conjunto en un array
const palabrasSinRepetir = Array.from(palabrasUnicas);

return  palabrasSinRepetir; // Esto mostrará ["manzana", "banana", "uva", "naranja"]

}


