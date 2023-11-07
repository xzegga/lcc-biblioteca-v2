export default function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 
    'May', 'Jun', 'Jul', 'Ago', 
    'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${day}, ${year}`;
}
