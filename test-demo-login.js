// Test login with demo credentials
async function testLogin() {
  try {
    console.log('Testing login with demo credentials...');

    // Test with Siddharth Sadhu account
    const response1 = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'siddharthsadhu28@gmail.com',
        password: 'Sadhu@2006'
      })
    });

    const data1 = await response1.json();
    console.log('Siddharth login response:', response1.status, data1);

    // Test with another account
    const response2 = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'rahul@example.com',
        password: 'customer123'
      })
    });

    const data2 = await response2.json();
    console.log('Rahul login response:', response2.status, data2);

  } catch (error) {
    console.error('Login test failed:', error.message);
  }
}

testLogin();
