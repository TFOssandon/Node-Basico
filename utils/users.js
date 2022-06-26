const users = [];

// Une un usuario al chat seleccionado
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}
// se obtiene el usuario actual
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// cuando el usuario deja el chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// obtiene los datos de los usuarios conectados al chat
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
