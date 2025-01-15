export function formatDate(dateStr: Date) {
   return Intl.DateTimeFormat("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
   }).format(new Date(dateStr));
}

export function formatDateTime(dateStr: Date) {
   return Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "numeric",
   })
      .format(new Date(dateStr))
      .split("/")
      .join("-");
}
