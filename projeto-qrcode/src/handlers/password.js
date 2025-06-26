import permittedChars from "../utils/permitted-chars.js";

const handlePassword = async () => {
  const passwordLength = Number(process.env.PASSWORD_LENGTH ?? 8);
  const chars = await permittedChars();

  const password = Array.from({ length: passwordLength }, () => {
    return chars[Math.floor(Math.random() * chars.length)];
  }).join("");

  return password;
};

export default handlePassword;
