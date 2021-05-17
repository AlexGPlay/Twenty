import { Invitation } from './../../entities/Invitation';
import { User } from './../../entities/User';
import { v4 as uuidv4 } from 'uuid';
import { sendInvitationMail } from '../../mailer/mails/invitation';
import { startTransaction } from '../../util/db';

export async function sendInvitation(userId: number, email: string){
  try{
    await startTransaction(async (manager) => {
      const sender = await manager.findOne(User, userId);
      if(!sender) return;

      const toSend = await manager.findOne(User, { where: { email } });
      if(toSend) return;

      const uuid = uuidv4();

      await manager.decrement(User, { id: userId }, 'pendingInvitations', 1);

      const invitation = await manager.create(Invitation, {
        fromUser: sender,
        toEmail: email,
        key: uuid
      });

      await manager.save(invitation);

      await sendInvitationMail(invitation);
    });
  }
  catch(e){
    console.log(e);
  }
}