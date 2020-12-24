import * as dotenv from "dotenv";

const config = dotenv.config({ path: "../.env" }).parsed;

for (const key in config) {
  process.env[key] = config[key];
}
export namespace General {
  export const PORT = process.env.PORT as string;
}

export namespace Slack {
  export const TOKEN = process.env.SLACK_BOT_TOKEN as string;
  export const SECRET = process.env.SLACK_SIGNING_SECRET as string;
  export const CHANNEL = process.env.SLACK_CHANNEL as string;
  export const FAQ_BOT_ID = "<@U01F4UAKC>" as string;
  export const APP_LISTEN_PORT = 8080 as number;
}

export namespace DialogFlow {
  export const REGION = "Asia/Tokyo" as string;
}
