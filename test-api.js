import fetch from 'node-fetch';

async function testLoginAPI() {
  try {
    console.log('Testing login API...');

    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js Test'
      },
      body: JSON.stringify({
        email: 'admin@bookmylook.com',
        password: 'admin123'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.text();
    console.log('Response body:', data);

    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed JSON:', JSON.stringify(jsonData, null, 2));
    } catch (e) {
      console.log('Response is not JSON');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testLoginAPI();
