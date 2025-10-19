import http from 'http';

const postData = JSON.stringify({
  email: 'admin@bookmylook.com',
  password: 'admin123'
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Making login request...');

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);

  res.setEncoding('utf8');
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response body:', data);
    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed response:', JSON.stringify(jsonData, null, 2));
    } catch (e) {
      console.log('Response is not valid JSON');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
