import * as config from "../config";
import * as types from "./types"

export const getOnlyMentionedMessages = async ({
  message,
  next,
}: types.MiddlewareParam) => {
  // subtype が bot message なら後続の処理へ
  const isBot = message?.subtype === 'bot_message'
  const bodyText = message?.text || ''
  // メンションされているかチェック、されていたら後続の処理へ
  const isMentioned = bodyText.includes(config.Slack.FAQ_BOT_ID)
  if (!isBot && isMentioned && typeof next !== 'undefined') return await next()
}
