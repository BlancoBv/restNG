import Twilio from "twilio";
import "dotenv/config";

const { SSID, TOKEN_TWILIO } = process.env;
const client = Twilio(SSID, TOKEN_TWILIO);

const sendMessage = async (listaProductos: string) => {
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+5219341126289`,
      body: `Nuevo pedido \n${listaProductos}`,
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err));
};

export default sendMessage;
