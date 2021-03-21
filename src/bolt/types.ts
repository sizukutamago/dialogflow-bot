import { Context, MessageEvent, AllMiddlewareArgs } from "@slack/bolt";
import { WebClient } from "@slack/web-api";

export interface MessageEventParam {
  message: MessageEvent;
  context: Context;
  client?: WebClient;
}
export interface MiddlewareParam extends AllMiddlewareArgs {
  message?: MessageEvent;
}

export type UserElement = {
  type: 'user'
  user_id: string
}

export type TextElement = {
  type: 'text',
  text: string
}

export type Element = UserElement | TextElement

export type Elements = {
  type: 'rich_text_section'
  elements: Element[]
}

export type Block = {
  block_id: string
  type: 'rich_text'
  elements: Elements[],
  thread_ts: string,
  parent_user_id: string,
}

export type Message = {
  text: string,
  type: 'message',
  blocks: Block[],
}

export type ThreadMessage = Message & {
  thread_ts: string,
  reply_count: number,
}

export type Result = {
  isQuestion: boolean,
  text: string
}

export type APIResult = {
  ok: boolean,
  messages?: Message[] | ThreadMessage[]
}
