import {part, trainingPhrases, Intent} from './types'
import {IntentsClient, SessionsClient} from '@google-cloud/dialogflow'
import * as config from '../config'

const intentsClient = new IntentsClient()

export default class DialogFlowGateway {

  private sessionClient

  constructor() {
    this.sessionClient = new SessionsClient()
  }

  createIntent = async (): Promise<void> => {
    const agentPath = intentsClient.agentPath(config.DialogFlow.PROJECT_ID);
    const part: part = {
      text: 'テスト練習'
    }

    const trainingPhrases: trainingPhrases = [{
      type: 'EXAMPLE',
      parts: [part]
    }]

    const intent: Intent = {
      displayName: 'test',
      trainingPhrases: trainingPhrases,
      messages: [{
        text: {
          text: ['aaaa']
        }
      }]
    }

    const createIntentRequest = {
      parent: agentPath,
      intent
    }

    console.log(intent)

    const [response] = await intentsClient.createIntent(createIntentRequest)
    console.log(response)
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
