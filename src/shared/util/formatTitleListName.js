export default formatTitleListName = name => {
  if (name.toLowerCase().indexOf('loklok') == -1) return name;
  name = name.replace('Loklok', 'Phimhay');
  name = name.replace('LOKLOK', 'PHIMHAY');
  name = name.replace('LokLok', 'PhimHay');
  return name;
};
