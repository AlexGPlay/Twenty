import { Server } from "socket.io";
import { User } from "../entities/User";
import { getValue, removeKey, setKeyValue } from "../util/redis";
import { getOnlineFriends } from "../services/users/getOnlineFriends";

export function useSocketController(io: Server){
  io.on('connect', async (socket) => {
    await setKeyValue(`io_${socket.request.userId}`, socket.id);
    console.log(`Connected user ${socket.request.userId}`);
    socket.emit('status', { status: 'connected' });

    const user = await User.findOne(socket.request.userId);
    if(!user) return;
    user.connected = true;
    await user.save();

    let friends = await getOnlineFriends(socket.request.userId);
    socket.emit('connectedFriends', { status: 'ownConnection', data: friends });
    
    for(const friend of friends){
      const userSocketId = await getValue(`io_${friend.id}`);
      if(!userSocketId) return;
      const userSocket = io.of('/').sockets.get(userSocketId);
      if(!userSocket) return;
      userSocket.emit('connectedFriends', { status: 'connected', data: [{ id: user.id, name: user.name, surname: user.surname }] });
    }

    socket.on('chatMessage', async (data) => {
      const msgInfo = { senderId: socket.request.userId, receiverId: data.toId, content: data.message };

      socket.emit('chatMessage', msgInfo);

      const userSocketId = await getValue(`io_${data.toId}`);
      if(!userSocketId) return;
      const userSocket = io.of('/').sockets.get(userSocketId);
      if(!userSocket) return;
      userSocket.emit('chatMessage', msgInfo);
    });

    socket.on('disconnect', async () => {
      User.update({ id: socket.request.userId }, { connected: false });
      console.log(`Disconnected user ${socket.request.userId}`);
      await removeKey(`io_${socket.request.userId}`);
      let friends = await getOnlineFriends(socket.request.userId);
      for(const friend of friends){
        const userSocketId = await getValue(`io_${friend.id}`);
        if(!userSocketId) return;
        const userSocket = io.of('/').sockets.get(userSocketId);
        if(!userSocket) return;
        userSocket.emit('connectedFriends', { status: 'disconnected', data: [{ id: user.id, name: user.name, surname: user.surname }] });
      }
    });
  });
}