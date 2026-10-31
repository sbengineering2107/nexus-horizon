/** Normalise an Indian mobile/landline to its 10 national digits, or throw. */
function nationalDigits(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length !== 10) {
    throw new Error(`Invalid Indian phone number: "${input}"`);
  }
  return digits;
}

export function telHref(phone: string): string {
  return `tel:+91${nationalDigits(phone)}`;
}

export function whatsappHref(number: string, message?: string): string {
  const base = `https://wa.me/91${nationalDigits(number)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
