// Simple test to check OAuth endpoints
console.log('Testing OAuth endpoints...');

// Test 1: Health check
fetch('http://localhost:3002/api/health')
  .then(res => res.json())
  .then(data => console.log('✅ Health check:', data))
  .catch(err => console.error('❌ Health check failed:', err));

// Test 2: OAuth initiate (should redirect)
fetch('http://localhost:3002/api/auth/google', { redirect: 'manual' })
  .then(res => {
    console.log('✅ OAuth initiate status:', res.status);
    console.log('✅ OAuth redirect location:', res.headers.get('location'));
  })
  .catch(err => console.error('❌ OAuth initiate failed:', err));
