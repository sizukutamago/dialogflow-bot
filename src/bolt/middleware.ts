import * as config from "../config";
import * as types from "./types";
import { App } from "@slack/bolt";

export const getOnlyMentionedMessages: any = async ({
  message,
  next,
}: types.MiddlewareParam): Promise<void> => {
  // subtype が bot message なら後続の処理へ
  const isBot = message?.subtype === "bot_message";
  if (!isBot) return;
  const bodyText = message?.text as string;
  // メンションされているかチェック、されていたら後続の処理へ
  const isMentioned = bodyText.includes(config.Slack.FAQ_BOT_ID);
  if (isMentioned) await next();
};

export const enableAll = (app: App): void => {
  if (process.env.SLACK_REQUEST_LOG_ENABLED !== "1") return;
  app.use(async (args: any) => {
    const copiedArgs = JSON.parse(JSON.stringify(args));
    await Promise.all([getOnlyMentionedMessages(args)]);
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
