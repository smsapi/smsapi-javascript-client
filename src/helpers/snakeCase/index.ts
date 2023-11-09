export const snakeCase = (value: string): string => {
  return value
    .replace(/[A-Z]/g, (c) => `_${c}`)
    .replace(/[-\s]/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
};
