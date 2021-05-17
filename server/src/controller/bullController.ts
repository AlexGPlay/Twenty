import { setQueues, BullAdapter, router } from "bull-board";
import { Express } from 'express';

import invitationsQueue from "../queues/invitationQueue";

setQueues([
  new BullAdapter(invitationsQueue)
]);

export function useBullController(app: Express){
  app.use('/bull', router);
}