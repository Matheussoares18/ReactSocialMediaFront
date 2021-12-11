export function phoneNumber(value: string): string {
  let receivedValue;

  receivedValue = value.replace(/\D/g, '');
  receivedValue = value.replace(/^0/, '');

  if (value.length > 10) {
    receivedValue = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (value.length > 5) {
    receivedValue = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (value.length > 2) {
    receivedValue = value.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    receivedValue = value.replace(/^(\d*)/, '($1');
  }

  const formatedValue = receivedValue;
  return formatedValue;
}
