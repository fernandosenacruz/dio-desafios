const permittedChars = async () => {
  const chars = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const isUppercase = process.env.UPPERCASE_LETTERS ?? "true";
  const isLowercase = process.env.LOWERCASE_LETTERS ?? "true";
  const hasNumbers = process.env.NUMBERS ?? "true";
  const hasSpecialChars = process.env.SPECIAL_CHARACTERS ?? "true";

  if (isUppercase) chars.push(...alphabet);
  if (isLowercase) chars.push(...alphabet.toLowerCase());
  if (hasNumbers) chars.push(..."0123456789");
  if (hasSpecialChars) chars.push(..."!@#$%^&*()_+[]{}|;:,.<>?");

  return chars;
};

export default permittedChars;
