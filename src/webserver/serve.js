const express = require('express');
const path = require('path');
const app = express();

const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({ target: `http://localhost:${process.env.BACKEND_PORT || 4000}`, changeOrigin: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000);