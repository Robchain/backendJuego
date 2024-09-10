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
          {
            text:[ 
              { text: 'Curso: ', style: 'fecha' },
              { text:`${inputarray.Curso}`, style:'fechacontenido'},
              { text: 'Paralelo: ', style: 'fecha' },
              { text:`${inputarray.Paralelo}`, style:'fechacontenido'},
              { text: 'Docente: ', style: 'fecha' },
              { text:`${DocentesList2(inputarray.docentes)}`, style:'fechacontenido'}
            ],style:'fechalinea2'
          },
      ];

      inputarray.data!= undefined   
      
        // content.push({},{
        //   style: 'tableExample',
        //   table: {
        //     widths: ['*', '*'],
        //     body: [
        //       [
        //         { text: 'Fecha de creación', style: 'tableHeader' },
        //       ],
        //       ...inputarray.data.filter(item=>(item._id.Curso=== inputarray.Curso && item._id.Paralelo=== inputarray.Paralelo)).map(e => [
        //         { text: `${e._id.Nombre}` },
        //         { text: `${e.documentos.length}` }
        //       ])
        //     ]
        //   },
        //   layout: {
        //     hLineWidth: (i: number) => 0.3,
        //     vLineWidth: (i: number) => 0.3,
        //     hLineColor: () => '#f2f2f2',
        //     vLineColor: () => '#f2f2f2',
        //     paddingTop: () => 5,
        //     paddingBottom: () => 5
            
        //   }
        // })
     

        content.push()



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
