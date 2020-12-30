import * as bolt from "./bolt";
import * as config from "./config";

const app = bolt.core.app;

bolt.middleware.enableAll(app);

(async () => {
  app.message("hello", async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`)
  });
  await app.start(config.Slack.APP_LISTEN_PORT || 3000);
})();
