import prompt from "prompt";
import promptSchemaMain from "./prompt-schemas/prompt-schema-main.js";
import QRCodeService from "./services/qrcode.js";
import PasswordService from "./services/password.js";

const getLink = async () => {
  return new Promise((resolve, reject) => {
    prompt.get(
      {
        name: "link",
        description: "Digite o link que deseja gerar o QR Code",
        required: true,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.link);
        }
      }
    );
  });
};

const main = async () => {
  prompt.get(promptSchemaMain, async (err, result) => {
    if (err) {
      console.error("Erro ao obter entrada do usuário:", err);
      return;
    }

    const { option } = result;

    switch (option) {
      case "1": {
        const link = await getLink();
        if (!link) {
          console.error("Link não pode ser vazio!");
          return;
        }
        const qrCodeService = new QRCodeService();
        await qrCodeService.create(link);
        break;
      }
      case "2": {
        const passwordService = new PasswordService();
        await passwordService.create();
        break;
      }
      default: {
        console.log("Opção inválida. Por favor, escolha 1 ou 2.");
        break;
      }
    }

    prompt.stop();
  });
  prompt.start();
};

main().catch((error) => {
  console.error("Erro inesperado:", error);
  prompt.stop();
});
