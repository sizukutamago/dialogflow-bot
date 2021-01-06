import { App } from '@slack/bolt';
import * as dotenv from 'dotenv';
dotenv.config();

const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();

const projectId = process.env.GCP_PROJECT_ID || '';
const sessionId = '123456';
const languageCode = 'ja';


async function detectIntent(
    query: string
) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
    await app.start(process.env.APP_LISTEN_PORT || 8080);

    app.message(/.*/, async ({ message, say }) => {
        const intentResponse = await detectIntent(message.text || '');
        // say() sends a message to the channel where the event was triggered
        await say(intentResponse.queryResult.fulfillmentText);
    });
})();
