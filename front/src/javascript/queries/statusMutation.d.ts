import { Status } from "./statusData"

export type StatusRequest = {
  status: string;
}

export type StatusResponse = {
  createStatus: {
    status?: Status;
    error?: string;
  }
}