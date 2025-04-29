const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Statisches Frontend (React Build)
app.use(express.static(path.join(__dirname, 'build')));

// API-Proxy → leitet alles /diagnose_* an den Agent weiter
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use(
  ['/diagnose_start', '/diagnose_continue'],
  createProxyMiddleware({
    target: process.env.AGENT_API_URL || 'http://localhost:8000',
    changeOrigin: true,
  })
);

// Catch-all für SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`DogBot UI + Proxy läuft auf Port ${PORT}`);
});
