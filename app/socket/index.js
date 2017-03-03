'use strict';
const h = require('../helpers');

module.exports = (io, app) => {
  let allrooms = app.locals.chatrooms;

  // allrooms.push({
  //   room: 'Good food',
  //   roomID: '0001',
  //   users: []
  // });

  // allrooms.push({
  //   room: 'Cloud computing',
  //   roomID: '0002',
  //   users: []
  // });

  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatrooms', () => {
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });

    socket.on('createNewRoom', newRoomInput => {
      // console.log(newRoomInput);
      // check to see if a room with the same title exists or not
      // if not, create one and broadcast it to everyone
      if(!h.findRoomByName(allrooms, newRoomInput)) {
        allrooms.push({
          room: newRoomInput,
          roomID: h.randomHex(), //write a helper to automatically generate this id
          users: []
        });

        // emit an updated list to the creator
        socket.emit('chatRoomsList', JSON.stringify(allrooms));

        // emit an updated list to everyone connected to the rooms page
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
      }
    });
  });

  io.of('/chatter').on('connection', socket => {
    // join a chatroom
    socket.on('join', data => {
      let usersList = h.addUserToRoom(allrooms, data, socket);

      // update the list of active users as shown on the chatroom page
      socket.broadcast.to(data.roomID).emit('updateUsersList', JSON.stringify(usersList.users));
      socket.emit('updateUsersList', JSON.stringify(usersList.users));
    });

    // when a socket exits
    socket.on('disconnect', () => {
      // find the room, to wich the socket is connected to and purge the user
      let room = h.removeUserFromRoom(allrooms, socket);
      socket.broadcast.to(room.roomID).emit('updateUsersList', JSON.stringify(room.users));
      socket.emit('updateUsersList', JSON.stringify(room.users));
    });

    socket.on('newMessage', data => {
      socket.broadcast.to(data.roomID).emit('inMessage', JSON.stringify(data));
    });
  });
}