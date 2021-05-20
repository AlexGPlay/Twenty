import { io } from 'socket.io-client';
import { BACKEND_SERVER } from '../../server/constants';

export const socket = io(BACKEND_SERVER, { autoConnect: true, withCredentials: true });