import {part, trainingPhrases, Intent} from './types'
import dialogflow from '@google-cloud/dialogflow'
import * as config from '../config'

const intentsClient = new dialogflow.IntentsClient()

let createIntent = async (): Promise<void> => {
  const agentPath = intentsClient.agentPath(config.DialogFlow.PROJECT_ID);

  let part: part = {
    text: 'テスト練習'
  }

  let trainingPhrases: trainingPhrases = [{
    type: 'EXAMPLE',
    parts: [part]
  }]

  let intent: Intent = {
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

createIntent()