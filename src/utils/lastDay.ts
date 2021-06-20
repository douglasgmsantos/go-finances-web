export const lastedDay = (): string => {
  var date = new Date();
  var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return Intl.DateTimeFormat('pt-BR')
    .format(ultimoDia)
    .split("/")
    .reverse()
    .join()
    .replace(",", "-")
    .replace(",", "-");
}