import * as bolt from './bolt';
import * as config from './config'
import DialogFlowGateway from './dialogflow/DialogflowGateway'
import type {Elements, Element, TextElement, Block, Result, ThreadMessage, Message, APIResult} from './bolt/types'
import {ignoreThreadMessage, ignoreMentionMessage} from './bolt/middleware'

const detectIntent = async (query: string = ''): Promise<string> => {
  const dialogFlowGateway = new DialogFlowGateway()
  const intentResponse = await dialogFlowGateway.detectIntent(query)
  return intentResponse.queryResult?.fulfillmentText || ''
}

const createIntent = async (question: string, answer: string): Promise<void> => {
  const dialogFlowGateway = new DialogFlowGateway()
  await dialogFlowGateway.createIntent(question, answer)
}

const getTextElement = (blocks: Block[] | undefined): TextElement | null => {
  if (typeof blocks === 'undefined') {
    return null
  }

  const block = blocks.find((block: Block): block is Block => {
    return block.type === 'rich_text'
  })

  if (typeof block === 'undefined') {
    return null
  }

  const elements: Element[] | undefined = block.elements?.find((elements: Elements) => {
    return elements.type === 'rich_text_section'
  })?.elements

  const element = elements?.find((element): element is TextElement => {
    return element.type === 'text'
  })

  return element || null
}

const getUserText = (blocks: Block[] | undefined): Result => {
  const element = getTextElement(blocks)

  if (!element) {
    return {
      isQuestion: false,
      text: 'よくわかりませんでした'
    }
  }

  return {
    isQuestion: true,
    text: element.text
  }
}


// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {

  const app = bolt.core.app

  app.event('app_mention', async ({ payload, say }): Promise<void> => {
    const userTextResult = getUserText(payload?.blocks)

    if (!userTextResult.isQuestion) {
      await say(userTextResult.text)
      return
    }

    if (payload.thread_ts) {
      const replies: APIResult = await app.client.conversations.replies({
        token: process.env.SLACK_BOT_TOKEN,
        channel: payload.channel,
        ts: payload.thread_ts,
        inclusive: true,
      })

      if (!replies.ok && typeof replies === 'undefined') {
        return
      }

      // @ts-ignore
      const parentMessage: ThreadMessage | undefined = replies.messages?.find((message: Message | ThreadMessage): ThreadMessage => {
        // @ts-ignore
        return message.reply_count
      })

      if (typeof parentMessage === 'undefined') {
        return;
      }

      const question = getTextElement(parentMessage.blocks)
      if (!question) {
        return
      }
      await createIntent(question.text, userTextResult.text)

      await say({text: `${question.text} = ${userTextResult.text} を登録しました`, thread_ts: parentMessage.thread_ts})
      return
    }

    const intentResponse = await detectIntent(userTextResult.text)
    await say(intentResponse)
    return
  })

  app.message(ignoreThreadMessage, ignoreMentionMessage, async ({ payload, say }): Promise<void> => {
    const userTextResult = getUserText(payload?.blocks as Block[])

    if (!userTextResult.isQuestion) {
      await say(userTextResult.text)
      return
    }

    const intentResponse = await detectIntent(userTextResult.text)
    await say(intentResponse)
    return
  })
  await app.start(config.Slack.PORT || 3000)
})()
