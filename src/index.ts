import { App } from '@slack/bolt';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../' });

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
    await app.start(process.env.APP_LISTEN_PORT || 8080);

    app.message('hello', async ({ message, say }) => {
        // say() sends a message to the channel where the event was triggered
        await say(`Hey there <@${message.user}>!`);
    });
})();
