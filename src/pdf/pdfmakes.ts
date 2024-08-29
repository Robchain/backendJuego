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






// import fs from 'fs';
// import path from 'path';
// import PdfPrinter from 'pdfmake';

// // Definir las fuentes
// const fonts = {
//     Poppins: {
//         normal: path.resolve(__dirname, 'fonts/Poppins-Regular.ttf'),
//         bold: path.resolve(__dirname, 'fonts/Poppins-Bold.ttf'),
//         italics: path.resolve(__dirname, 'fonts/Poppins-Italic.ttf'),
//         bolditalics: path.resolve(__dirname, 'fonts/Poppins-BoldItalic.ttf')
//     }
// };

// // Crear una nueva instancia de PdfPrinter con las fuentes
// const printer = new PdfPrinter(fonts);

// // Leer y convertir el archivo PNG a base64
// const pngPath = path.resolve(__dirname, 'kronio_logo.png');
// const pngBuffer = fs.readFileSync(pngPath);
// const pngBase64 = pngBuffer.toString('base64');
// const pngDataUrl = `data:image/png;base64,${pngBase64}`;

// // Leer y convertir el icono de imagen a base64
// const iconPath = path.resolve(__dirname, 'icon.png');
// const iconBuffer = fs.readFileSync(iconPath);
// const iconBase64 = iconBuffer.toString('base64');
// const iconDataUrl = `data:image/png;base64,${iconBase64}`;

// // Leer y convertir el segundo icono de imagen a base64
// const iconPath2 = path.resolve(__dirname, 'icon2.png');
// const iconBuffer2 = fs.readFileSync(iconPath2);
// const iconBase64_2 = iconBuffer2.toString('base64');
// const iconDataUrl2 = `data:image/png;base64,${iconBase64_2}`;

// export const generatePDF = (): Promise<string> => {
//     const docDefinition = {
//         pageSize: 'A4',
//         pageMargins: [40, 80, 40, 80],
//         content: [
//             { text: 'Reporte de Asistencia', style: 'header' },
//             { text: '01 de noviembre al 15 de noviembre del 2022', style: 'caption' },
//             {
//                 style: 'tableExample',
//                 table: {
//                     widths: ['*', '*', '*', '*', '*', '*', '*'],
//                     body: [
//                         [{ text: 'Horario Fijo - Oficina', colSpan: 7, alignment: 'center', style: 'header', margin: [0, 5] }, {}, {}, {}, {}, {}, {}],
//                         [
//                             { text: 'L', alignment: 'center', style: 'days' },
//                             { text: 'M', alignment: 'center', style: 'days' },
//                             { text: 'M', alignment: 'center', style: 'days', fillColor: '#4E388A', color: '#fff' },
//                             { text: 'J', alignment: 'center', style: 'days' },
//                             { text: 'V', alignment: 'center', style: 'days' },
//                             { text: 'S', alignment: 'center', style: 'days' },
//                             { text: 'D', alignment: 'center', style: 'days' }
//                         ],
//                         [{ text: 'Hora de entrada', style: 'footer3' }, { text: '08:00', style: 'footer3', alignment: 'right' }, {}, {}, {}, {}, {}],
//                         [{ text: 'Hora de salida', style: 'footer3' }, { text: '17:00', style: 'footer3', alignment: 'right' }, {}, {}, {}, {}, {}],
//                         [{ text: 'Tiempo de descanso', style: 'footer3' }, { text: '60 min', style: 'footer3', alignment: 'right' }, {}, {}, {}, {}, {}]
//                     ]
//                 },
//                 layout: {
//                     hLineWidth: (i: number, node: any) => {
//                         return (i === 0 || i === node.table.body.length) ? 1 : 0; // Líneas horizontales solo en el borde superior e inferior
//                     },
//                     vLineWidth: (i: number, node: any) => {
//                         return (i === 0 || i === node.table.widths.length) ? 1 : 0; // Líneas verticales solo en los bordes izquierdo y derecho
//                     },
//                     hLineColor: (i: number, node: any) => {
//                         return '#4E388A';
//                     },
//                     vLineColor: (i: number, node: any) => {
//                         return '#4E388A';
//                     },
//                     paddingTop: (i: number, node: any) => 5,
//                     paddingBottom: (i: number, node: any) => 5
//                 }
//             }
//         ],
//         background: (currentPage: number, pageSize: any) => {
//             return {
//                 image: pngDataUrl,
//                 width: 211.2,
//                 height: 352,
//                 opacity: 0.5,
//                 absolutePosition: { x: 191.78, y: 245.29 }
//             };
//         },
//         defaultStyle: {
//             font: 'Poppins'
//         },
//         footer: (currentPage: number, pageSize: any) => {
//             return {
//                 layout: {
//                     hLineWidth: (i: number, node: any) => {
//                         return (i === 0) ? 2 : 0;  // Grosor del borde superior
//                     },
//                     vLineWidth: (i: number, node: any) => {
//                         return 0; // Elimina las líneas verticales
//                     },
//                     hLineColor: (i: number, node: any) => {
//                         return (i === 0) ? '#000' : '#FFF';  // Color del borde superior
//                     }
//                 },
//                 table: {
//                     widths: ['*', '*'],
//                     body: [
//                         [
//                             {
//                                 columns: [
//                                     { image: iconDataUrl, width: 13, height: 13, margin: [5, 0, 0, 0] },
//                                     { text: ' No se registró salida', style: 'footer3', margin: [5, 0, 0, 0] }
//                                 ],
//                                 border: [false, false, false, false]
//                             },
//                             {
//                                 columns: [
//                                     { image: iconDataUrl2, width: 12, height: 12, margin: [5, 0, 0, 0] },
//                                     { text: ' Atraso', style: 'footer3', margin: [5, 0, 0, 0] }
//                                 ],
//                                 border: [false, false, false, false]
//                             }
//                         ],
//                         [
//                             { text: 'Empresa: Unidad Educativa Brisas del Río', style: 'footer1', margin: [10, 0, 0, 0], border: [false, false, false, false] },
//                             { text: '25 - Noviembre - 2022', style: 'footer2', margin: [0, 0, 10, 0], border: [false, false, false, false] }
//                         ],
//                         [
//                             { text: 'Generado por: Edison Aciniegas', style: 'footer1', margin: [10, 0, 0, 0], border: [false, false, false, false] },
//                             { text: '', border: [false, false, false, false] }
//                         ]
//                     ]
//                 }
//             };
//         },
//         styles: {
//             header: {
//                 font: 'Poppins',
//                 fontSize: 20,
//                 bold: true,
//                 color: '#4E388A'
//             },
//             caption: {
//                 font: 'Poppins',
//                 color: '#222025',
//                 fontSize: 11
//             },
//             footer1: {
//                 fontSize: 8
//             },
//             footer2: {
//                 alignment: 'right',
//                 fontSize: 8
//             },
//             footer3: {
//                 fontSize: 8,
//                 color: '#646464'
//             },
//             days: {
//                 fontSize: 10,
//                 bold: true,
//                 color: '#4E388A'
//             },
//             default: {
//                 font: 'Poppins'
//             }
//         }
//     };

//     return new Promise<string>((resolve, reject) => {
//         const pdfDoc = printer.createPdfKitDocument(docDefinition);

//         let chunks: Uint8Array[] = [];
//         pdfDoc.on('data', (chunk) => {
//             chunks.push(chunk);
//             console.log('Received chunk of size:', chunk.length);
//         });

//         pdfDoc.on('end', () => {
//             console.log('PDF generation finished');
//             const pdfBuffer = Buffer.concat(chunks);
//             console.log('PDF buffer length:', pdfBuffer.length);
//             const pdfBase64 = pdfBuffer.toString('base64');
//             resolve(pdfBase64);
//         });

//         pdfDoc.on('error', (error) => {
//             console.error('Error generating PDF:', error);
//             reject(error);
//         });

//         pdfDoc.end();
//         console.log("PDF document ended");
//     });
// };
