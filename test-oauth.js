import fetch from 'node-fetch';

async function testOAuth() {
  try {
    console.log('Testing OAuth endpoints...');

    // Test health endpoint
    const healthResponse = await fetch('http://localhost:3002/api/health');
    console.log('Health check:', healthResponse.status, await healthResponse.text());

    // Test OAuth initiate endpoint (should redirect)
    const oauthResponse = await fetch('http://localhost:3002/api/auth/google', {
      redirect: 'manual'
    });
    console.log('OAuth initiate:', oauthResponse.status, oauthResponse.headers.get('location'));

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testOAuth();
