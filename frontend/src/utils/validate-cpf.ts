export function validateCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, '');

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (parseInt(cpf.charAt(9), 10) !== digit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i), 10) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;

  if (parseInt(cpf.charAt(10), 10) !== digit) return false;

  return true;
}
