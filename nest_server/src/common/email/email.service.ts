import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from '../prisma/prisma.service';
// import { Prisma } from '@prisma/client';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly prisma: PrismaService,
  ) {}

  async sendEmail(data: {
    to: string;
    subject: string;
    template: string;
    context: Record<string, unknown>;
    userId?: string;
  }): Promise<void> {
    // to: string,
    // subject: string,
    // template: string,
    // context: Record<string, unknown>,
    // userId?: string, // ✅ optional userId
    const { to, subject, template, context, userId } = data;

    /////////////////////////////////////////
    // 1️⃣ Create DB Log
    /////////////////////////////////////////

    const log = await this.prisma.notificationLog.create({
      data: {
        userId: userId ?? null, // ✅ bind user
        recipient: to,
        channel: 'EMAIL',
        status: 'PENDING',
        title: subject,
        // metadata: context as Prisma.InputJsonValue,
        provider: 'SMTP',
      },
    });

    try {
      /////////////////////////////////////////
      // 2️⃣ Tracking URL
      /////////////////////////////////////////

      const trackingUrl = `${process.env.SERVER_URL}/track/email/${log.id}`;

      /////////////////////////////////////////
      // 3️⃣ Send Email
      /////////////////////////////////////////

      await this.mailer.sendMail({
        to,
        subject,
        template,
        context: {
          ...context,
          trackingUrl,
        },
      });

      /////////////////////////////////////////
      // 4️⃣ Update Success
      /////////////////////////////////////////

      await this.prisma.notificationLog.update({
        where: { id: log.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
      });

      // return { success: true };
      return;
    } catch (error) {
      /////////////////////////////////////////
      // 5️⃣ Update Failure
      /////////////////////////////////////////

      await this.prisma.notificationLog.update({
        where: { id: log.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : JSON.stringify(error),
          retryCount: { increment: 1 },
        },
      });

      throw error;
    }
  }
}
