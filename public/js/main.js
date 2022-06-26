const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// obtengo el nombre
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// unisrse al chat
socket.emit('joinRoom', { username, room });

// obtiene datos de salas y usuarios
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Mensaje desde el sv
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll de mensajes
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// enviar mensaje
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // obtengo los datos del mensaje
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // envia mensaje al server
  socket.emit('chatMessage', msg);

  // limpia los input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// mensaje al DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `: <span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

//  Añade nombre de la sala al DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Añade usuario al DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//confirmacion para cuando un usuario esta apunto de abandonar la sala de chat
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Estas seguro de abandonar?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
