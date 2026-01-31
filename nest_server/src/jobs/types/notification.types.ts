export type Priority = 'realtime' | 'priority' | 'async';

export type Channel = 'email' | 'sms' | 'push';

export interface EmailPayload {
  to: string;
  subject: string;
  template: string;
  context: Record<string, unknown>;
}

export interface SmsPayload {
  to: string;
  text: string;
}

export interface PushPayload {
  userId: string;
  title: string;
  body: string;
}

export interface ChannelPayloadMap {
  email: EmailPayload;
  sms: SmsPayload;
  push: PushPayload;
}

export type JobData<C extends Channel = Channel> = {
  channel: C;
  payload: ChannelPayloadMap[C];
};
