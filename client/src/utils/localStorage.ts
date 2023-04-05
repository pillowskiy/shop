export const getLocalStorage = (key: string) => {
  if (
    typeof window !== 'undefined' &&
    typeof localStorage !== undefined
  ) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}