import { App, LogLevel, ExpressReceiver } from "@slack/bolt";
import * as config from "../config";

export const receiver = new ExpressReceiver({
  signingSecret: config.Slack.SECRET,
});

const args = {
  logLevel: LogLevel.DEBUG,
  token: config.Slack.TOKEN,
  signingSecret: config.Slack.SECRET,
  receiver,
};

export const app = new App(args);
