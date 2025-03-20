// note : run the command “npx ts-node src/db/db_test.ts” to test the connection to the database
// Dans le .env, et juste pour le test, il faut que host soit l'adresse url du container et que le port utilisé soit exposé

import { pool } from './db_connect';

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully!');
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

testConnection()
  .then(() => console.log('Connection tested'))
  .catch(console.error);
