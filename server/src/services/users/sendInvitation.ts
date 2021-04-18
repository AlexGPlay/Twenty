import { Invitation } from './../../entities/Invitation';
import { getConnection } from "typeorm";
import { User } from './../../entities/User';
import { v4 as uuidv4 } from 'uuid';
import { sendInvitationMail } from '../../mailer/mails/invitation';

export async function sendInvitation(userId: number, email: string){
  await getConnection().transaction(async () => {
    const sender = await User.findOne(userId);
    console.log("sender", sender);
    if(!sender) return;

    const toSend = await User.findOne({ where: { email } });
    console.log("tosend", toSend);
    if(toSend) return;

    const uuid = uuidv4();

    const invitation = await Invitation.create({
      fromUser: sender,
      toEmail: email,
      key: uuid
    }).save();
    console.log("invitation", invitation);
    await sendInvitationMail(invitation);
  });
}