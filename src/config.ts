const config = require("dotenv").config().parsed;

for (const key in config) {
  process.env[key] = config[key];
}
export namespace Slack {
  export const TOKEN = process.env.SLACK_BOT_TOKEN as string;
  export const SECRET = process.env.SLACK_SIGNING_SECRET as string;
  export const FAQ_BOT_ID = process.env.SLACK_FAQ_BOT_ID as string;
  export const PORT = process.env.APP_LISTEN_PORT as string;
}

export namespace DialogFlow {
  export const REGION = "Asia/Tokyo" as string;
  export const PROJECT_ID = process.env.GCP_PROJECT_ID || '';
  export const SESSION_ID = '123456';
  export const LANGUAGE_CODE = 'ja';
}
