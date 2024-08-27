interface Estudiante {
    _id: string;
    Nombre: string;
    Usuario: string;
    Identificacion: string;
    Curso: string;
    Paralelo: string;
  }
  
  interface Rompecabeza {
    _id: string;
    Nombre: string;
    Pieza: number;
    FileBlanco: string;
    FileColor: string;
    Estado: string;
    createdAt: string;
    updatedAt: string;
    Juego: string;
  }
  
  interface Avance {
    Correcto: string[];
    Incorrecto: { PalabraAEvaluar: string; PalabraASeleccionada: string }[];
    NoContesto: string[];
  }
  
  interface DataItem {
    Estudiante: Estudiante;
    Rompecabeza: Rompecabeza;
    Avance: Avance;
    Terminado: boolean;
  }
  
  interface Item {
    updatedAtDay: string;
    data?: DataItem[]; // data es opcional porque no todos los objetos tienen esta propiedad
    tipo: string;
    FechaDeFin?: string; // Opcional
    FechaDeInicio?: string; // Opcional
    createdAt?: string; // Opcional
    updatedAt?: string; // Opcional
    motivo?: string; // Opcional
  }


export function groupAndSortByDate(array: Item[]): Record<string, Item[]> {
    // Agrupar por updatedAtDay
    const grouped = array.reduce((acc: Record<string, Item[]>, item) => {
      const key = item.updatedAtDay;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  
    // Convertir el objeto agrupado a un array de entradas [key, value]
    const groupedArray = Object.entries(grouped);
  
    // Ordenar por la clave (updatedAtDay) en orden descendente
    groupedArray.sort(([keyA], [keyB]) => {
      return new Date(keyB).getTime() - new Date(keyA).getTime();
    });
  
    // Convertir el array de entradas de nuevo a un objeto
    const sortedGrouped = groupedArray.reduce((acc: Record<string, Item[]>, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  
    return sortedGrouped;
  }