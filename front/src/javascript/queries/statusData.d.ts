export type Status = {
  id: Number;
  createdAt: string;
  updatedAt: string;
  userId: Number;
  status: string;
}

export type StatusResponse = {
  currentStatus: {
    status?: Status;
    error?: string;
  }
}