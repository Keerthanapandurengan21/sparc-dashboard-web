export const formatDate = (date) => {
  const d = new Date(date);

  const estDate = new Date(
    d.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const year = estDate.getFullYear();
  const month = String(estDate.getMonth() + 1).padStart(2, "0");
  const day = String(estDate.getDate()).padStart(2, "0");
  const hours = String(estDate.getHours()).padStart(2, "0");
  const minutes = String(estDate.getMinutes()).padStart(2, "0");
  const seconds = String(estDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};


  export const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).replace(",", "");
  };

  