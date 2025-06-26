import chalk from "chalk";

const promptSchemaMain = [
  {
    name: "option",
    description: chalk.green(
      "Escolha a ferramenta: \n1 - QRCODE \n2 - PASSWORD"
    ),
    pattern: /^[1-2]+$/,
    message: chalk.red("Escolha apenas entre 1 e 2"),
    required: true,
  },
];

export default promptSchemaMain;
