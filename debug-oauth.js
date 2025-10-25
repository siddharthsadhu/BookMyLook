// Test OAuth callback URL parsing
const urlParams = new URLSearchParams(window.location.search);
const accessToken = urlParams.get('accessToken');
const refreshToken = urlParams.get('refreshToken');
const error = urlParams.get('error');

console.log('🔍 OAuth Callback Debug:');
console.log('Full URL:', window.location.href);
console.log('URL Params:', Object.fromEntries(urlParams));
console.log('Access Token:', accessToken ? 'PRESENT' : 'MISSING');
console.log('Refresh Token:', refreshToken ? 'PRESENT' : 'MISSING');
console.log('Error:', error || 'NONE');

// Check if we have both tokens
if (accessToken && refreshToken) {
  console.log('✅ Tokens found - OAuth should work');
} else {
  console.log('❌ Missing tokens - OAuth failed');
}
