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
  elements: Elements[]
}
