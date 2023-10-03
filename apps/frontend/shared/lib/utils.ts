export const getBooleanFromString = (str?: string | null): boolean =>
  str === 'true' || str === 'false' ? JSON.parse(str) : false;
