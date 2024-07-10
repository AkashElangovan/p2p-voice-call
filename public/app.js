const socket = io();
let peerConnection;
let localStream;
let remoteStream;

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  alert(data.message || data.error);
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (data.message === 'Login successful') {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('call').style.display = 'block';
    socket.emit('join', username);
    setupWebRTC();
  } else {
    alert(data.error);
  }
}

async function setupWebRTC() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  peerConnection = new RTCPeerConnection();
  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

  peerConnection.ontrack = event => {
    remoteStream = event.streams[0];
    // You can add audio playback here
  };

  socket.on('user-connected', (username) => {
    const option = document.createElement('option');
    option.value = option.textContent = username;
    document.getElementById('userList').appendChild(option);
  });

  socket.on('call-made', async (data) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    socket.emit('make-answer', {
      answer,
      to: data.from
    });
  });

  socket.on('answer-made', async (data) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
  });
}

async function callUser() {
  const selectedUser = document.getElementById('userList').value;
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  socket.emit('call-user', {
    offer,
    to: selectedUser
  });
}

function endCall() {
  if (peerConnection) {
    peerConnection.close();
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  // Reset UI as needed
}