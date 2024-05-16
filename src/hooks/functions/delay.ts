/**
 * Creates a Promise that resolves after specified milliseconds
 *
 * @param ms - A number of milliseconds
 *
 * @returns A Promise of type void that resolves after ms
 */
export function delay(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}
