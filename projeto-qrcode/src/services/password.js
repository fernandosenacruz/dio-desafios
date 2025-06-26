import chalk from "chalk";
import handlePassword from "../handlers/password.js";

class PasswordService {
  constructor() {
    this.handlePassword = handlePassword;
  }

  async create() {
    try {
      const password = await this.handlePassword();
      console.log(chalk.green("Senha gerada com sucesso!"));
      console.log(chalk.blue(`Senha: ${password}`));
    } catch (error) {
      console.error(chalk.red("Erro ao gerar senha:", error.message));
    }
  }
}

export default PasswordService;