import io from 'socket.io-client';

export const socket = io('http://localhost:4321');

export default socket