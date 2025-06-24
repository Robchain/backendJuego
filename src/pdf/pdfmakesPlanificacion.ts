import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { OutputJuegoVocabulario } from '../interface/juegoReporteVocabulario.interface';
import { DocentesList2, fechaEcuador } from '../helpers/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { OutputPlanificacion } from '../interface/planifiacion.interface';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const pdfPlanificacion = async (inputarray: OutputPlanificacion): Promise<string> => {


    const content: any[] = [
        { text: 'Reporte Planificación Colaborativa', style: 'header' },
        {text:'',style:'espacioEntrelineas'},
          {
            text:[ 
              { text: 'Curso: ', style: 'fecha' },
              { text:`${inputarray.Curso}`, style:'fechacontenido'},
              {text:'   '},
              { text: 'Paralelo: ', style: 'fecha' },
              { text:`${inputarray.Paralelo}`, style:'fechacontenido'},
              {text:'   '},
              { text: 'Docente: ', style: 'fecha' },
              { text:`${DocentesList2(inputarray.docentes)}`, style:'fechacontenido'},
              {text:'   '},
            ],style:'fechalinea2'
          },
      ];

let totalJuegos = 0;

inputarray.data !== undefined && inputarray.data.forEach(juego => {
  const tipoTexto =
    juego._id.TipoDeJuego === '1' ? "Vocabulario:" :
    juego._id.TipoDeJuego === '2' ? "Oración:" :
    juego._id.TipoDeJuego === '3' ? "Mixto:" :
    "Desconocido:";

  const cantidad = juego.documentos.length;
  totalJuegos += cantidad;

  // Título de grupo
  content.push({
    text: [
      { text: tipoTexto + ' ', color: '#8cc5b0', bold: true },
      { text: `${cantidad} Juegos`, bold: true }
    ],
    margin: [0, 10, 0, 4]
  });

  // Tabla con solo la columna de fecha
  content.push({
    style: 'tableExample',
    table: {
      widths: ['*'],
      body: [
        [
          { text: 'Fecha de creación', style: 'tableHeader' }
        ],
        ...juego.documentos.map(i => [
          { text: fechaEcuador(i.createdAtDay) }
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
  });
});

// Línea de total
content.push({
  text: [
    { text: 'TOTAL: ', color: '#8cc5b0', bold: true },
    { text: `${totalJuegos}`, bold: true }
  ],
  margin: [0, 10, 0, 0]
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
            color: '#9696D3'
          },
          membrete:{
            bold: true,
            
            color: '#8cc5b0',
          },
          membreteLinea:{
            marginTop:8,
            marginBottom:8
          },
          espacioEntrelineas:{
          margin:5
        },
          fecha:{
     color: '#85858C'
          },
          fechacontenido:{
          color: '#62269E'
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

 return new Promise<string>((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBase64((data) => {
      resolve(data);
    });
  });

}
