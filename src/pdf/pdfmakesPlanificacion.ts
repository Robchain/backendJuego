import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { OutputJuegoVocabulario } from '../interface/juegoReporteVocabulario.interface';
import { fechaEcuador } from '../helpers/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const pdfJuegoVocabulario = async (inputarray: OutputJuegoVocabulario): Promise<string> => {


    const content: any[] = [
        { text: 'Reporte vocabulario', style: 'header' },
        {
            text:[ 
              { text: 'Desde: ', style: 'fecha' },
              { text:`${fechaEcuador(inputarray.fechaInicio)}`, style:'fechacontenido'},
              { text: 'Hasta: ', style: 'fecha' },
              { text:`${fechaEcuador(inputarray.fechaFin)}`, style:'fechacontenido'}
            ],style:'fechalinea2'
          },
          {
            text:[ 
              { text: 'Curso: ', style: 'fecha' },
              { text:`${inputarray.Cursos.map(i=>i.Curso)}`, style:'fechacontenido'},
              { text: 'Paralelo: ', style: 'fecha' },
              { text:`${inputarray.Cursos.map(i=>i.Paralelo)}`, style:'fechacontenido'},
              { text: 'Docente: ', style: 'fecha' },
            //   { text:`${DocentesList(inputarray.data)}`, style:'fechacontenido'}
            ],style:'fechalinea2'
          },
      ];

      

        content.push({
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: 'Nombre', style: 'tableHeader' },
                { text: 'Juegos', style: 'tableHeader' }
              ],
              ...inputarray.data.filter(item=>(item._id.Curso=== inputarray.Curso && item._id.Paralelo=== inputarray.Paralelo)).map(e => [
                { text: `${e._id.Nombre}` },
                { text: `${e.documentos.length}` }
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

 return new Promise<string>((resolve, reject) => {
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBase64((data) => {
      resolve(data);
    });
  });

}
