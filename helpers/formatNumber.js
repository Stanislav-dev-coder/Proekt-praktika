const formatNumber = (value, digits = 0, separator = '.') => {
  const parts = String(parseFloat(value).toFixed(digits)).split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  if (digits === 0) return parts[0];

  parts[1] = parts[1].replace(/0*$/, '');

  if (parts[1].length === 0) return parts[0];

  return parts.join(separator);
};

export default formatNumber;
