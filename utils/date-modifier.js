const dateModifier = date => {
  let cleanedDate = date;
  let day = date.substring(8, 10);
  let month = date.substring(5, 7);
  let year = date.substring(2, 4);
  let hour = date.substring(11, 13);
  let minute = date.substring(14, 16);
  cleanedDate = `On ${day}-${month}-${year} at ${hour}:${minute}`;
  return cleanedDate;
};
export default dateModifier;
