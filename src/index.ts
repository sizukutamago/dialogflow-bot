import * as bolt from "./bolt";
import * as config from "./config";
const dialogflow = require("@google-cloud/dialogflow");
const sessionClient = new dialogflow.SessionsClient();

const detectIntent = async (query: string) => {
  // The path to identify the agent that owns the created intent.
  const sessionPath = sessionClient.projectAgentSessionPath(config.DialogFlow.PROJECT_ID, config.DialogFlow.SESSION_ID);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: config.DialogFlow.LANGUAGE_CODE,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
};

const app = bolt.core.app;

bolt.middleware.getOnlyMentionedMessages;

(async () => {
  app.message(/.*/, async ({ message, say }) => {
    const intentResponse = await detectIntent(message.text || "");
    // say() sends a message to the channel where the event was triggered
    await say(intentResponse.queryResult.fulfillmentText);
  });
  await app.start(config.Slack.PORT || 3000);
})();
