export function flattenArray(arr: (number | any[])[]): number[] {
  const result: number[] = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else if (typeof item === "number") {
      result.push(item);
    }
  }

  return result;
}
