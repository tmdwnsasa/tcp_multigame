import { v4 as uuidv4 } from 'uuid';
import Game from '../classes/models/game.class.js';

export const userSessions = [];
export const gameSession = new Game(uuidv4());
