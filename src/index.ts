import { App } from '@slack/bolt';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../' });

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
    await app.start(process.env.APP_LISTEN_PORT || 8080);

    console.log('⚡️ Bolt app is running!');
    app.command('/ping', async ({ command, ack, say, respond }) => {
        console.log(command);

        await ack();
        await say(`pong`);
    });
})();
