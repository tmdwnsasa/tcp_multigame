import pools from '../db/database.js';
import { testAllConnections } from '../utils/db/testConnection.js';
import { getProtoMessages } from './loadProtos.js';
import { loadProtos } from './loadProtos.js';
import { v4 } from 'uuid';

const initServer = async () => {
  try {
    await loadProtos();
    await testAllConnections(pools);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;
