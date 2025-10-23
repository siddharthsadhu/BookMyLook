import pkg from 'pg';
const { Client } = pkg;

async function testConnection() {
  const client = new Client({
    connectionString: 'postgresql://postgres:sadhu@localhost:5432/bookmylook?schema=public'
  });

  try {
    await client.connect();
    console.log('Database connected successfully');
    await client.end();
  } catch (error) {
    console.log('Database connection failed:', error.message);
  }
}

testConnection();
