export const capitalizeAndSeparate = (accessor: string): string => {
  return accessor
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

export const separateAndLowercase = (accessor: string): string => {
  return accessor.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
};

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatSnakeCase = (text: string): string => {
  return text
    .split("_")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
};
