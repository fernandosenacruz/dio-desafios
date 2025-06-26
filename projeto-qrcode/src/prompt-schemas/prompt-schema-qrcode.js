import chalk from "chalk";

const promptSchemaQRCode = [
  {
    name: "link",
    description: chalk.bgBlue("Digite o link para gerar o QR CODE"),
  },
  {
    name: "type",
    description: chalk.blue(
      "Escolha entre o tipo de QRcode \n 1 - NORMAL ou 2 - TERMINAL"
    ),
    pattern: /^[1-2]+$/,
    message: chalk.red.italic("Escolha apenas entre 1 e 2"),
    required: true,
  },
];

export default promptSchemaQRCode;
