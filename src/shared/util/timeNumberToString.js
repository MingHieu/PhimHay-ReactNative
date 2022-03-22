export default timeNumberToString = time => {
  time = Math.ceil(time);
  let hours = Math.floor(time / 3600);
  let minute = Math.floor((time - hours * 3600) / 60);
  let second = time - 3600 * hours - 60 * minute;
  let result = '';
  result += hours ? (hours > 9 ? hours + ':' : '0' + hours + ':') : '';
  result += minute > 9 ? minute : '0' + minute;
  result += ':' + (second > 9 ? second : '0' + second);
  return result;
};
