import * as types from "./types"

export const ignoreThreadMessage = async ({
  message,
  next,
}: types.MiddlewareParam) => {
  if (!message?.thread_ts && typeof next !== 'undefined') return await next()
}

export const ignoreMentionMessage = async ({
  message,
  next,
}: types.MiddlewareParam) => {

  //@ts-ignore
  const isMentionMessage = message?.blocks[0]?.elements[0]?.elements?.some(element => {
    return element.type === 'user'
  })

  if (!isMentionMessage && typeof next !== 'undefined') return await next()
}
