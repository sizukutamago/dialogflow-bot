import { App, LogLevel, ExpressReceiver } from "@slack/bolt";
import * as config from "../config";

import * as dotenv from "dotenv";
dotenv.config({ path: `envs/.env.${process.env.STAGE}` });

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
