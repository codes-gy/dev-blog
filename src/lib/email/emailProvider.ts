import nodemailer from 'nodemailer';

export interface EmailProvider {
    send(to: string, subject: string, text: string): Promise<void>;
}

export class NodemailerProvider implements EmailProvider {
    private transporter;

    constructor(customHost?: string, customPort?: number) {
        const smtpHost = customHost || process.env.EMAIL_HOST;
        const smtpPort = customPort || Number(process.env.EMAIL_PORT) || 465;
        this.transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async send(to: string, subject: string, text: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html: `<div style="font-family: sans-serif; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${text.replace(/\n/g, '<br />')}</div>`,
        });
    }
}

export class ConsoleEmailProvider implements EmailProvider {
    async send(to: string, subject: string, text: string): Promise<void> {
        console.log(`[이메일] 수신: ${to} | 제목: ${subject} | 내용: ${text}`);
    }
}
