import * as Slack from "./bolt";
import * as config from "./config";

const app = Slack.app.app;

Slack.message.sayHello;
Slack.middleware.enableAll(app);

(async () => {
  await app.start(config.Slack.APP_LISTEN_PORT || 3000);
})();
