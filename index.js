const { PrismaClient } = require('@prisma/client');
const http = require('http');

const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/products' && req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      res.writeHead(200);
      res.end(JSON.stringify(products));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Database error' }));
    }
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify({ status: 'ok', message: 'Server is running' }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
