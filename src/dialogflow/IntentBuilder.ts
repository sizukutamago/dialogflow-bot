import {trainingPhrases, Intent} from './types'

export default class IntentBuilder {
    displayName?: string
    trainingPhrases?: trainingPhrases
    messages?: string

    setDisplay(displayName: string): this & Pick<Intent, 'displayName'> {
        return Object.assign(this, {displayName})
    }

    setTrainingPrases(trainingPhrases: string): this & Pick<Intent, 'trainingPhrases'> {
        return Object.assign(this, {
            trainingPhrases: {
                type: 'EXAMPLE',
                parts: [{text: trainingPhrases}]
            }
        })
    }

    setMessages(messages: string): this & Pick<Intent, 'messages'> {
        return Object.assign(this, {messages: [{text: {text:[messages]}}]})
    }

    build(this: Intent) {
        return this
    }
}
