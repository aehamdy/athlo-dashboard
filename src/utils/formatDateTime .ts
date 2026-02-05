export const formatDateTime = (isoDate: string) => {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
