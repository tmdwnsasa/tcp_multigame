import { userSessions } from './sessions.js';
import User from '../classes/models/user.class.js';

export const addUser = (deviceId, playerId, socket) => {
  const user = new User(deviceId, playerId, socket);
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.deviceId === id);
};

export const getAllUsers = () => {
  return userSessions;
};
