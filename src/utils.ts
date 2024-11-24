export const shortenText = (text: string, len: number): string => {
  if (!text) return text;
  return text.length > len ? text.slice(0, 25) + "..." : text;
};

export const convertToDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} (${hours}:${minutes}:${seconds})`;
};
