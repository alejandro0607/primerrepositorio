const http = require('http');
const fs= require ('fs')
const PORT = 3001;
// request
const server = http.createServer((req, res) =>{
  if (req.method === 'GET') {
    const nombre = req.url.split("?")[0]
    const edad = req.url.split("?")[1]
    const booleano = req.url.split("?")[2]
    console.log(nombre)
    console.log(edad)
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (edad >= 18 && booleano == "si") {
      fs.appendFileSync("nombre.txt", nombre)
    }else if (edad < 18){
        fs.appendFileSync("nombre.txt", nombre)
        
      }
      if (edad >= 18 && booleano == "si") {
        res.end ("hola " + nombre  + "eres mayor de edad");
      }else if (edad < 18){
          res.end ("hola " + nombre  + "eres menor de edad");
    } 
    }
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

