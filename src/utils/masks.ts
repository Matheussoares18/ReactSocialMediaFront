export function phoneNumber(value: string): string {
  value = value.replace(/\D/g, '');
  value = value.replace(/^0/, '');

  if (value.length > 10) {
    value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (value.length > 5) {
    value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (value.length > 2) {
    value = value.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    value = value.replace(/^(\d*)/, '($1');
  }

  let formatedValue = value;
  return formatedValue;
}
