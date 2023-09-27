export function capitalizeFirstLetter(inputString: string): string {
  if (!inputString) {
    return inputString; // Handle empty strings
  }

  const firstLetter = inputString.charAt(0).toUpperCase();
  const restOfString = inputString.slice(1).toLowerCase();

  return firstLetter + restOfString;
}
