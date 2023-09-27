export function shortenText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength - 3) + "...";
  }
}
