import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { OutputJuegoVocabulario } from '../interface/juegoReporteVocabulario.interface';
import { DocentesList, DocentesList2, fechaEcuador } from '../helpers/helpers';
import { OutputJuegoColaborativo } from '../interface/juegoReporteColaborativo.interface';
import { OutputJuegoJuego } from '../interface/juegoReporteTodos.interface';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const pdfJuegoVocabulario = async (inputarray: OutputJuegoVocabulario): Promise<string> => {


    const content: any[] = [
        { text: 'Reporte vocabulario', style: 'header' },
        {text:'',style:'espacioEntrelineas'},
        {
            text:[ 
              { text: 'Desde: ', style: 'fecha' },
              { text:`${fechaEcuador(inputarray.fechaInicio)}`, style:'fechacontenido'},
              { text: 'Hasta: ', style: 'fecha' },
              { text:`${fechaEcuador(inputarray.fechaFin)}`, style:'fechacontenido'}
            ],style:'fechalinea2'
          },
          {text:'',style:'espacioEntrelineas'},
          {
            text:[ 
              { text: 'Curso: ', style: 'fecha' },
              { text:`${inputarray.Cursos.map(i=>i.Curso)}`, style:'fechacontenido'},
              { text: 'Paralelo: ', style: 'fecha' },
              { text:`${inputarray.Cursos.map(i=>i.Paralelo)}`, style:'fechacontenido'},
              { text: 'Docente: ', style: 'fecha' },
              { text:`${inputarray.Docente}`, style:'fechacontenido'}
              // { text:`${DocentesList(inputarray.data)}`, style:'fechacontenido'}
            ],style:'fechalinea2'
          },
          {text:'',style:'espacioEntrelineas'},
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
            espacioEntrelineas:{
          margin:5
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

export const pdfJuegoOracion = async (inputarray: OutputJuegoVocabulario): Promise<string> => {


  const content: any[] = [
      { text: 'Reporte Oración', style: 'header' },
      {text:'',style:'espacioEntrelineas'},
      {
          text:[ 
            { text: 'Desde: ', style: 'fecha' },
            { text:`${fechaEcuador(inputarray.fechaInicio)}`, style:'fechacontenido'},
            { text: 'Hasta: ', style: 'fecha' },
            { text:`${fechaEcuador(inputarray.fechaFin)}`, style:'fechacontenido'}
          ],style:'fechalinea2'
        },
        {text:'',style:'espacioEntrelineas'},
        {
          text:[ 
            { text: 'Curso: ', style: 'fecha' },
            { text:`${inputarray.Cursos.map(i=>i.Curso)}  `, style:'fechacontenido'},
            { text: 'Paralelo: ', style: 'fecha' },
            { text:`${inputarray.Cursos.map(i=>i.Paralelo)}  `, style:'fechacontenido'},
            { text: 'Docente: ', style: 'fecha' },
            { text:`${inputarray.Docente}`, style:'fechacontenido'}
            // { text:`${DocentesList(inputarray.data)}  `, style:'fechacontenido'}
          ],style:'fechalinea2'
        },
        {text:'',style:'espacioEntrelineas'},
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
          espacioEntrelineas:{
          margin:5
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



export const pdfJuegoColaborativo = async (inputarray: OutputJuegoColaborativo): Promise<string> => {


  const content: any[] = [
      { text: 'Reporte Colaborativo', style: 'header' },
      {text:'',style:'espacioEntrelineas'},
      {
          text:[ 
            { text: 'Desde: ', style: 'fecha' },
            { text:`${fechaEcuador(inputarray.fechaInicio)}`, style:'fechacontenido'},
            { text: 'Hasta: ', style: 'fecha' },
            { text:`${fechaEcuador(inputarray.fechaFin)}`, style:'fechacontenido'}
          ],style:'fechalinea2'
        },
        {text:'',style:'espacioEntrelineas'},
    ];

    inputarray.data.forEach(item=>{
          content.push( {
            text:[ 
              { text: 'Curso: ', style: 'fecha' },
              { text:`${item.curso}  `, style:'fechacontenido'},
              { text: 'Paralelo: ', style: 'fecha' },
              { text:`${item.paralelo}  `, style:'fechacontenido'},
              { text: 'Docente: ', style: 'fecha' },
              { text:`${DocentesList2(inputarray.docentes)}  `, style:'fechacontenido'}
            ],style:'fechalinea2'
          },
        {text:'',style:'espacioEntrelineas'},)
          
          content.push({
            style: 'tableExample',
            table: {
              widths: ['*', '*'],
              body: [
                [
                  { text: 'Nombre', style: 'tableHeader' },
                  { text: 'Juegos', style: 'tableHeader' }
                ],
                ...item.nameCounts.map(e => [
                  { text: `${e.nombre}` },
                  { text: `${e.count}` }
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
          espacioEntrelineas:{
          margin:5
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



export const pdfJuegoTodos = async (inputarray: OutputJuegoJuego): Promise<string> => {


  const content: any[] = [
      { text: 'Reporte', style: 'header' },
      {text:'',style:'espacioEntrelineas'},
      {
          text:[ 
            { text: 'Desde: ', style: 'fecha' },
            { text:`${fechaEcuador(inputarray.fechaInicio)}`, style:'fechacontenido'},
            {text:'   '},
            { text: 'Hasta: ', style: 'fecha' },
            { text:`${fechaEcuador(inputarray.fechaFin)}`, style:'fechacontenido'}
          ],style:'fechalinea2'
        },
    ];

     if(inputarray.dataVocabulario) {  
      
      content.push(
        {text:'',style:'espacioEntrelineas'},
        {
        text:[ 
          { text: 'Docente: ', style: 'fecha' },
          { text:`${DocentesList2(inputarray.dataColaborativo.docentes)}`, style:'fechacontenido'},
          // { text:`${DocentesList(inputarray.dataVocabulario.data)}`, style:'fechacontenido'},
        ],style:'fechalinea2'
      },
      {text:'',style:'espacioEntrelineas'},

        {
        
        text:[ 
          { text: 'Actividad: ', style: 'fecha' },
          { text:`Vocabulario`, style:'fechacontenido'},
        ],style:'fechalinea2'
      },
      {text:'',style:'espacioEntrelineas'},
      
      {
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [
            [
              { text: 'Nombre', style: 'tableHeader' },
              { text: 'Juegos', style: 'tableHeader' }
            ],
            ...inputarray.dataVocabulario.data.filter(item=>(item._id.Curso=== inputarray.Curso && item._id.Paralelo=== inputarray.Paralelo)).map(e => [
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
      }
    )

      }
      if(inputarray.dataOracion) {  
        content.push(
          {text:'',style:'espacioEntrelineas'},
          {
          text:[ 
            { text: 'Actividad: ', style: 'fecha' },
            { text:`Oración`, style:'fechacontenido'},
          ],style:'fechalinea2'
        },
        {text:'',style:'espacioEntrelineas'},
        // {
        //   text:[ 
        //     { text: 'Docente: ', style: 'fecha' },
        //     // { text:`${DocentesList(inputarray.dataOracion.data)}`, style:'fechacontenido'},
        //   ],style:'fechalinea2'
        // },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: 'Nombre', style: 'tableHeader' },
                { text: 'Juegos', style: 'tableHeader' }
              ],
              ...inputarray.dataOracion.data.filter(item=>(item._id.Curso=== inputarray.Curso && item._id.Paralelo=== inputarray.Paralelo)).map(e => [
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
        }
      )
        }

        if(inputarray.dataColaborativo){
          inputarray.dataColaborativo.data.map(item=>{
            

            content.push(
              {text:'',style:'espacioEntrelineas'},
              {
              text:[ 
                { text: 'Actividad: ', style: 'fecha' },
                { text:`Colaborativo`, style:'fechacontenido'},
              ],style:'fechalinea2'
            },
            {text:'',style:'espacioEntrelineas'},
            // {
            //   text:[ 
            //     { text: 'Docente: ', style: 'fecha' },
            //     // { text:`${DocentesList2(inputarray.dataColaborativo.docentes)}`, style:'fechacontenido'},
            //   ],style:'fechalinea2'
            // },
            {
              style: 'tableExample',
              table: {
                widths: ['*', '*'],
                body: [
                  [
                    { text: 'Nombre', style: 'tableHeader' },
                    { text: 'Juegos', style: 'tableHeader' }
                  ],
                  ...item.nameCounts.map(e => [
                    { text: `${e.nombre}` },
                    { text: `${e.count}` }
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
          )
          })
           
        }
  


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
        espacioEntrelineas:{
          margin:5
        },
        membreteLinea:{
          marginTop:8,
          marginBottom:8
        },
        fecha:{
          color: '#85858C',
          marginBottom:8
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














