import * as config from "../config";
import * as types from "./interfaces";
import { App } from "@slack/bolt";

export const noThreadMessages: any = async ({
  message,
  next,
}: types.MiddlewareParam) => {
  if (!message?.thread_ts) await next();
};

export const getOnlyMentionedMessages: any = async ({
  message,
  next,
}: types.MiddlewareParam) => {
  // subtype が bot message なら後続の処理へ
  if (message?.subtype === "bot_message") await next();
  const bodyText = message?.text as string;
  // メンションされているかチェック、されていたら後続の処理へ
  if (bodyText.includes(config.Slack.FAQ_BOT_ID)) await next();
};

export const enableAll = (app: App): void => {
  if (process.env.SLACK_REQUEST_LOG_ENABLED !== "1") return;
  app.use(async (args: any) => {
    const copiedArgs = JSON.parse(JSON.stringify(args));
    await Promise.all([noThreadMessages(args), getOnlyMentionedMessages(args)]);
    copiedArgs.context.botToken = "xoxb-***";
    if (copiedArgs.context.userToken) {
      copiedArgs.context.userToken = "xoxp-***";
    }
    copiedArgs.client = {};
    copiedArgs.logger = {};
    args.logger.debug(
      "Dumping request data for debugging...\n\n" +
        JSON.stringify(copiedArgs, null, 2) +
        "\n"
    );
    const result = await args.next();
    args.logger.debug("next() call completed");
    return result;
  });
};
