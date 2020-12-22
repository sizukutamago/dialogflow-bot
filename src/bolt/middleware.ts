import * as config from "../config";
import * as IF from "./interface";

export const noThreadMessages: any = async ({
  message,
  next,
}: IF.MiddlewareParam) => {
  if (!message?.thread_ts) await next();
};

export const getOnlyMentionedMessages: any = async ({
  message,
  next,
}: IF.MiddlewareParam) => {
  // subtype が bot message なら後続の処理へ
  if (message?.subtype === "bot_message") await next();
  const bodyText = message?.text as string;
  // メンションされているかチェック、されていたら後続の処理へ
  if (bodyText.includes(config.Slack.FAQ_BOT_ID)) await next();
};
