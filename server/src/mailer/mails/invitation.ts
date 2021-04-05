import { sendMail } from '../mailer';
import { Invitation } from './../../entities/Invitation';

export async function sendInvitationMail(invitation: Invitation){
  await sendMail(
    '"Twenty" <register@twenty.test>',
    invitation.toEmail,
    "¡Te han invitado a unirte a Twenty!",
    `Te han invitado a Twenty, haz click en el siguiente enlace para registrarte: xxxxxx/${invitation.key}`,
  );
}