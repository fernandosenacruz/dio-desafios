import qr from "qrcode-terminal";
import chalk from "chalk";

const handleQRCode = async (err, link) => {
  if (err) {
    console.error("Erro ao gerar QR Code:", err);
    return;
  }

  qr.generate(link, { small: true }, (qrcode) => {
    console.log(chalk.blue("QR Code gerado: \n"));
    console.log(qrcode);
  });
};

export default handleQRCode;
