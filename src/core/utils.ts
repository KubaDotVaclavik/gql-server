export const wait = async (time) => {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), time));
};
