export type EmailSendInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
};

export interface EmailProvider {
  send(input: EmailSendInput): Promise<void>;
}
export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
}

export interface EmailProvider {
  verify(): Promise<void>;
  send(input: SendEmailInput): Promise<void>;
}
