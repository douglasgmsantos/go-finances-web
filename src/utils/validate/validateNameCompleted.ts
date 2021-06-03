const validateNameCompleted = (name: string): boolean =>
  name.trim().split(" ").length > 1 ? true : false


export default validateNameCompleted;
