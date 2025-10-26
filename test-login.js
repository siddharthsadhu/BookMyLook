// Test login API
async function testLogin() {
  try {
    console.log('Testing login API...');

    const response = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'siddharthsadhu28@gmail.com',
        password: 'Sadhu@2006'
      })
    });

    const data = await response.json();
    console.log('Login response:', response.status, data);

  } catch (error) {
    console.error('Login test failed:', error.message);
  }
}

testLogin();
