export const firstDay = (): string => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return Intl.DateTimeFormat('pt-BR')
    .format(firstDay)
    .split("/")
    .reverse()
    .join()
    .replace(",", "-")
    .replace(",", "-");
}