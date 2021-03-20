import * as bolt from './bolt';
import * as config from './config'
import DialogFlowGateway from './dialogflow/DialogflowGateway'
import type {Elements, Element, TextElement, Block} from "./bolt/types"

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {

  const app = bolt.core.app

  app.event('app_mention', async ({ payload, say }): Promise<void> => {
    const blocks = payload?.blocks as Block[] | undefined;

    if (typeof blocks === 'undefined') {
      await say('よくわかりませんでした')
      return
    }

    const block = blocks.find((block: Block): block is Block => {
      return block.type === 'rich_text'
    })

    if (typeof block === 'undefined') {
      await say('よくわかりませんでした')
      return
    }

    const elements: Element[] | undefined = block.elements?.find((elements: Elements) => {
      return elements.type === 'rich_text_section'
    })?.elements

    const element = elements?.find((element): element is TextElement => {
      return element.type === 'text'
    })

    if (typeof element === 'undefined') {
      await say('よくわかりませんでした')
      return
    }

    const dialogFlowGateway = new DialogFlowGateway()
    const intentResponse = await dialogFlowGateway.detectIntent(element.text || '')
    // say() sends a message to the channel where the event was triggered
    await say(intentResponse.queryResult?.fulfillmentText || '')
    return
  })
  await app.start(config.Slack.PORT || 3000)
})()
