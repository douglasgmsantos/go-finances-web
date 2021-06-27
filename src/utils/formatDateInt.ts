const formatDateInt = (date: number): string => {
    const year = String(date).substring(0,4)
    const month = String(date).substring(4,6)
    const day = String(date).substring(6,8)
    return `${day}/${month}/${year}`
}
  

export default formatDateInt;