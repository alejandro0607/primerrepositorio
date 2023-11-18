const http = require('http');
const fs = require('fs')
let users = [
  {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
    city: "New York"
  },
  {
    name: "Bob",
    age: 30,
    email: "bob@example.com",
    city: "San Francisco"
  },
  {
    name: "Charlie",
    age: 28,
    email: "charlie@example.com",
    city: "Los Angeles"
  }
];
const PORT = 3001;
// request
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const name = req.url.split('?')[1];
    const usuarios = users.find(x => x.name === name);
    if (usuarios) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(usuarios));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('User no encontrado\n');
    }
  }


});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});