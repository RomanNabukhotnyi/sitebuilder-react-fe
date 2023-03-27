export const useUtils = () => {
  const prepareData = <T extends object>(obj: T): T | undefined => {
    const preparedObject = Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v != null && v !== '')
    );
    return Object.keys(preparedObject).length ? preparedObject as T : undefined;
  };

  return {
    prepareData,
  };
};
