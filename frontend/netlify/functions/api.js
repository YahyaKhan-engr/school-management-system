// Netlify serverless function — proxies all /api/* requests to InfinityFree
// This bypasses InfinityFree's browser JS challenge since it's server-to-server

const https = require('https');
const http = require('http');

// ⚠️ Replace with your actual InfinityFree domain
const BACKEND = 'http://yourschool.kesug.com';

exports.handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/api', '');
  const url = `${BACKEND}${path}`;

  return new Promise((resolve) => {
    const options = {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; SchoolApp/1.0)',
      },
    };

    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: data,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ success: false, message: err.message }),
      });
    });

    if (event.body) req.write(event.body);
    req.end();
  });
};
