import prompt from "prompt";
import handleQRCode from "../handlers/qrcode.js";
import promptSchemaQRCode from "../prompt-schemas/prompt-schema-qrcode.js";

class QRCodeService {
  constructor() {
    this.prompt = prompt;
    this.promptSchema = promptSchemaQRCode;
    this.handleQRCode = handleQRCode;
  }

  async create(link) {
    try {
      console.log("link", link);
      this.prompt.get(this.promptSchema, await this.handleQRCode(null, link));
      this.prompt.start();
    } catch (error) {
      console.error("Erro ao criar QR Code:", error);
      this.prompt.stop();
    }
  }
}

export default QRCodeService;
