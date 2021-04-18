import Queue from 'bull';
import { sendInvitation } from "../services/users/sendInvitation";

interface InvitationData {
  userId: number;
  newEmail: string;
}

const invitationsQueue = new Queue('invitations');

invitationsQueue.process(job => {
  const { userId, newEmail }: InvitationData = job.data;
  console.log("invitations queue");
  sendInvitation(userId, newEmail);
});

export default invitationsQueue;