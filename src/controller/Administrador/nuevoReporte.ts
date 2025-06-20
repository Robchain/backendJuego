import { Request, Response } from "express";
import { IReporteNuevoCursoParalelo } from "../../interface/Reportes.inteface";
import { Salidavocabylario } from "../../interface/Reportes.interfaces";
import fs from 'fs';
import path from 'path';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from "pdfmake/interfaces";
import MultiJugador from "../../models/Administrador/MultiJugador";
import { pdfPlanificacion } from "../../pdf/pdfmakesPlanificacion";
import Persona from "../../models/Administrador/Persona";
var fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};
interface NameCount {
  nombre: string;
  count: number;
}
interface CourseParallelNameCount {
  curso: string;
  paralelo: string;
  nameCounts: NameCount[];
}

export const reportePrimero = async (req: Request, res: Response) => {
try {
    const { Curso, Paralelo,FechaInicio, FechaFin} = req.body as IReporteNuevoCursoParalelo;
    //borrar juego y por juego y solo buscar colaborativa
    
    let fechaInicio = new Date(FechaInicio);

    let fechaFin = new Date(FechaFin);

    let objetosConAvance: any[] = []

    const docente = await Persona.aggregate([
                      {
                        '$match': {
                          'TipoUsuario': 'DOCENTE', 
                          'Curso': Curso, 
                          'Paralelo': Paralelo
                        }
                      }
                    ]);

        
    objetosConAvance = await MultiJugador.aggregate([
      {
        '$match': {
          'Curso': Curso, 
          'Paralelo': Paralelo,
          "updatedAt": {
            $gte: fechaInicio,
            $lte: fechaFin
          }
        }
      }, {
        '$addFields': {
          'createdAtDay': {
            '$dateToString': {
              'format': '%Y-%m-%d', 
              'date': '$createdAt'
            }
          }
        }
      }, {
        '$group': {
          '_id': {
            'curso': '$Curso', 
            'paralelo': '$Paralelo', 
            'TipoDeJuego': '$TipoDeJuego'
          }, 
          'documentos': {
            '$push': '$$ROOT'
          }
        }
      }, {
        '$sort': {
          '_id.updatedAtDay': -1
        }
      }
    ])
    
    const docentesUnicos = new Set<string>();

    // Recorrer cada objeto en el array
    objetosConAvance.forEach(obj => {
      // Recorrer cada documento dentro del objeto
      obj.documentos.forEach((doc:any) => {
        docentesUnicos.add(doc.Docente);
      });
    });
    
    // Convertir el Set a un array
    const listadoDocentesUnicos = Array.from(docentesUnicos);
    const totalDocumentos = objetosConAvance.reduce((acc, obj) => acc + obj.documentos.length, 0);

    let echaInicio =  FechaInicio.toString() ;
          
    let echaFin=    FechaFin.toString();
    const final = {
      data:objetosConAvance,
      docentes:[`${docente[0].Nombre} ${docente[0].Apellido}`] ,
      total:totalDocumentos,
      fechaInicio: echaInicio,
                fechaFin:    echaFin,
                Curso, 
                Paralelo,
    }
        const pdfdata = await pdfPlanificacion(final);
        console.log({ Curso, Paralelo,FechaInicio, FechaFin})
    res.status(200).json({data:final, pdf:pdfdata});

    
  } catch (error) {
    res.status(500).json(error);
  }
}






const generatePdfBase64 = (objectosalida:Salidavocabylario[],Juego:string): Promise<string> => {
  const printer = new PdfPrinter(fonts);
  const pdfsalida = vocabularioPDFPorJuego(objectosalida,Juego);
  return new Promise((resolve, reject) => {

     const pdfDoc = printer.createPdfKitDocument(pdfsalida);
    let chunks: Uint8Array[] = [];
    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk);
      // console.log('Received chunk of size:', chunk.length);
  });

  pdfDoc.on('end', () => {
    //console.log('PDF generation finished');
    const pdfBuffer = Buffer.concat(chunks);
    //console.log('PDF buffer length:', pdfBuffer.length);
    const pdfBase64 = pdfBuffer.toString('base64');
    resolve(pdfBase64);
});

pdfDoc.on('error', (error) => {
  //console.error('Error generating PDF:', error);
  reject(error);
});

pdfDoc.end();
//sconsole.log("PDF document ended");
});
  
}
// este es para vocabulario y oraciones filtro: Curso y paralelo
const vocabularioPDFPorJuego = (objectosalida:Salidavocabylario[],Juego:string)=>{
      var doc:TDocumentDefinitions


      const pngPath = path.resolve(__dirname, '../../assets/LOGO BLIPBLA.png');
      const pngBuffer = fs.readFileSync(pngPath);
      const pngBase64 = pngBuffer.toString('base64');
      const pngDataUrl = `data:image/png;base64,${pngBase64}`;

      const body = [
        [
          { text: 'Nombre', alignment: 'center', style: 'tableHeader' },
          { text: 'Frase a evaluar', alignment: 'center', style: 'tableHeader' },
          { text: 'Frase seleccionada', alignment: 'center', style: 'tableHeader' },
          { text: 'Resultado', alignment: 'center', style: 'tableHeader' },
          { text: 'Mes', alignment: 'center', style: 'tableHeader' },
          { text: 'Año', alignment: 'center', style: 'tableHeader' }
        ]
      ];

      objectosalida.forEach(obj => {
        const estudiante = obj.documentos.Estudiante.Nombre;
        
        const correcto = obj.documentos.Avance.flatMap(avance => avance.Correcto);
        const incorrectos = obj.documentos.Avance.flatMap(avance => avance.Incorrecto);
        const {mes, anio} = getMesYAnio(obj.documentos.updatedAt);
        
        
        incorrectos.forEach(incorrecto => {
          const fila = [
            { text: estudiante, alignment: 'left', style: 'content' },
            { text: incorrecto.PalabraAEvaluar, alignment: 'left', style: 'content' },
            { text: incorrecto.PalabraASeleccionada, alignment: 'left', style: 'content' },
            { text: 'Incorrecto', alignment: 'left', style: 'content' },
            { text: mes, alignment: 'left', style: 'content' },
            { text: anio, alignment: 'left', style: 'content' }
          ];
          body.push(fila);
        });

        correcto.forEach(correcto=>{
          const fila = [
            { text: estudiante, alignment: 'left', style: 'content' },
            { text: correcto, alignment: 'left', style: 'content' },
            { text: "------", alignment: 'left', style: 'content' },
            { text: 'Correcto', alignment: 'left', style: 'content' },
            { text: mes, alignment: 'left', style: 'content' },
            { text: anio, alignment: 'left', style: 'content' }
          ];
          body.push(fila);
        })
      });






  return doc={
    pageSize:'A4',
    pageMargins:[40, 80, 40, 80],
    content: [
      { image: pngDataUrl, width: 150, height: 50, margin: [5, 0, 0, 0], lineHeight:2},
      {text:`Curso: ${objectosalida[0].documentos.Estudiante.Curso} ${objectosalida[0].documentos.Estudiante.Paralelo} -- Profesor: Robert Roman`, style:'subheader', alignment:"center"},     
      {text:`${Juego}:${objectosalida.length} juegos`, lineHeight:2},
      {
        style: 'tableExample',
        table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            body: body
        },
        layout: {
            hLineWidth: (i: number, node: any) => {
                return 0.5; // Líneas horizontales solo en el borde superior e inferior
            },
            vLineWidth: (i: number, node: any) => {
                return  0.5; // Líneas verticales solo en los bordes izquierdo y derecho
            },
            hLineColor: (i: number, node: any) => {
                return '#4E388A';
            },
            vLineColor: (i: number, node: any) => {
                return '#4E388A';
            },
            paddingTop: (i: number, node: any) => 5,
            paddingBottom: (i: number, node: any) => 5
        }
    },
    {text:'   ',lineHeight:2},
    {text:`Total: ${objectosalida.length} juegos`}
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
      },
      subheader: {
        fontSize: 16,
        bold: true,
        lineHeight:2
      },
      tableHeader:{
          bold:true,
          fontSize:12
      },
      content:{
        fontSize:8
      },
    },
    defaultStyle: {
      font: 'Helvetica'
    }
  };
}


function getMesYAnio(fecha: Date): { mes: string, anio: string } {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const date = new Date(fecha);
  const mes = meses[date.getMonth()];
  const anio = date.getFullYear().toString();
  return { mes, anio };
}

