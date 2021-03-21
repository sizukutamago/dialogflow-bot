import {IntentsClient, SessionsClient} from '@google-cloud/dialogflow'
import * as config from '../config'
import IntentBuilder from "./IntentBuilder";

const intentsClient = new IntentsClient()

export default class DialogFlowGateway {

  private sessionClient

  constructor() {
    this.sessionClient = new SessionsClient()
  }

  createIntent = async (question: string, answer: string): Promise<void> => {
    const agentPath = intentsClient.agentPath(config.DialogFlow.PROJECT_ID);

    const intentBuilder = new IntentBuilder();
    const intent = intentBuilder.setDisplay(question).setTrainingPhrase(question).setMessages(answer).build()

    const createIntentRequest = {
      parent: agentPath,
      intent
    }

    await intentsClient.createIntent(createIntentRequest)
  }

 detectIntent = async (query: string) => {
    // The path to identify the agent that owns the created intent.
    const sessionPath = this.sessionClient.projectAgentSessionPath(config.DialogFlow.PROJECT_ID, config.DialogFlow.SESSION_ID)

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: config.DialogFlow.LANGUAGE_CODE,
        },
      },
    }

    const responses = await this.sessionClient.detectIntent(request)
    return responses[0]
  }
}
