import timeStringToNumber from './timeStringToNumber';

export default PF_SRT = f => {
  //SRT format
  let pattern =
    /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|$))/gm;
  let _regExp = new RegExp(pattern);
  let toLineObj = function (group) {
    return {
      line: group[1],
      startTime: timeStringToNumber(group[2]),
      endTime: timeStringToNumber(group[3]),
      text: group[4],
    };
  };
  let result = [];
  if (f == null) return _subtitles;

  f = f.replace(/\r\n|\r|\n/g, '\n');

  while ((matches = pattern.exec(f)) != null) {
    result.push(toLineObj(matches));
  }
  return result;
};
