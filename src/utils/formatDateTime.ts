export const formatDateTime = (
  isoDate: string | Date,
): { date: string; time: string } => {
  const stringDate =
    typeof isoDate === "string" ? isoDate : isoDate.toISOString();
  const date: Date = new Date(stringDate);

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
