// import { App, LogLevel, ExpressReceiver } from "@slack/bolt";
import * as App from "./app";

export const sayHello = App.app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});
