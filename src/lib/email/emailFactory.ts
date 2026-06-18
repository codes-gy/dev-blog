import { ConsoleEmailProvider, EmailProvider, NodemailerProvider } from './emailProvider';

export function getEmailProvider(): EmailProvider {
    const providerType = process.env.EMAIL_PROVIDER?.toLowerCase();

    switch (providerType) {
        case 'naver':
            return new NodemailerProvider('smtp.naver.com', 465);

        case 'gmail':
        case 'google':
            return new NodemailerProvider('smtp.gmail.com', 465);

        case 'daum':
        case 'kakao':
            return new NodemailerProvider('smtp.daum.net', 465);

        case 'nodemailer':
            return new NodemailerProvider();

        case 'console':
            return new ConsoleEmailProvider();

        default:
            return new NodemailerProvider();
    }
}
