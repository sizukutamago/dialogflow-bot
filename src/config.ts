import * as dotenv from 'dotenv'

const config = dotenv.config().parsed

for (const k in config) {
  process.env[k] = config[k]
}

export const Slack = {
  TOKEN: process.env.SLACK_BOT_TOKEN as string,
  SECRET: process.env.SLACK_SIGNING_SECRET as string,
  FAQ_BOT_ID: process.env.SLACK_FAQ_BOT_ID as string,
  PORT: process.env.APP_LISTEN_PORT as string,
} as const

export const DialogFlow = {
  REGION: 'Asia/Tokyo' as string,
  PROJECT_ID: process.env.GCP_PROJECT_ID || '',
  SESSION_ID: '123456',
  LANGUAGE_CODE: 'ja',
} as const
