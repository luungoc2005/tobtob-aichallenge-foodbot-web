import io from 'socket.io-client';

let socket = null;

export const connect = () => {
  socket = io('http://localhost:4321')
  return socket
}

export default connect;