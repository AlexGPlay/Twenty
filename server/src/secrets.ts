export const MAILER_EMAIL = (process.env['MAILER_EMAIL'] || '').trim();
export const MAILER_PASSWORD = (process.env['MAILER_PASSWORD'] || '').trim();
export const MAILER_HOST = (process.env['MAILER_HOST'] || '').trim();
export const MAILER_PORT = Number(process.env['MAILER_PORT'] || 0);