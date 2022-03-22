export default timeStringToNumber = time => {
  const timeArr = time.split(":").map((item) => parseFloat(item.replace(/,/g, '.')));
  const result = timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
  return result;
};
