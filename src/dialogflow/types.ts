export type part = {
    text: string
}

export type trainingPhrases = {
    type: 'EXAMPLE'
    parts: part[]
}[]


export type message = {
    text: string[]
  }

export type messages = {
    text: message
}[]

export type Intent = {
    displayName: string
    trainingPhrases: trainingPhrases
    messages: messages
}
