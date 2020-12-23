import * as Slack from "./bolt";
import * as dotenv from "dotenv";
import * as config from "./config";

dotenv.config({ path: "../" });

const app = Slack.app.app;

Slack.message.sayHello;
Slack.middleware.enableAll(app);

(async () => {
  await app.start(config.Slack.APP_LISTEN_PORT || 3000);
})();
