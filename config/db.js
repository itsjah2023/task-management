
import dotenv from 'dotenv';


dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;



const pool = new Pool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});
export const connectToDatabase = async () => {
    try {
        const client = await pool.connect();
        console.log('Successful Connection to DB');
        client.release();

    }   catch (err) {
        console.error('Error connecting', err);
    }

};


/*
pool.connect((err, client, release) => { 
    if (err) { 
       return console.error('Error acquiring client', err.stack); 
    } 
    console.log('Connected to PostgreSQL database'); 
    release();
});
*/
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  export const query = (text, params) => pool.query(text, params);
  export default pool;
  