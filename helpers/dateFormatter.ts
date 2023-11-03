export default function formatDate(inputDate: Date): string {
    const meses: string[] = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
  
    const month = meses[inputDate.getUTCMonth()];
    const day = inputDate.getUTCDate();
    const year = inputDate.getUTCFullYear();
  
    const formattedDate = `${month} ${day}, ${year}`;
    
    return formattedDate;
  }