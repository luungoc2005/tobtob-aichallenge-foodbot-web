import io from 'socket.io-client';

let socket = null;

export const connect = () => {
  socket = io('http://localhost:5000')
  return socket
}

export default connect;