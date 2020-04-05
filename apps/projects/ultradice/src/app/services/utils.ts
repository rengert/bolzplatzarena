export function getValueOrDefault(value?: number): number {
  return value === undefined ? 0 : value;
}
