const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8080

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
}

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url
  filePath = path.join(__dirname, filePath)

  const ext = path.extname(filePath)
  const mime = mimeTypes[ext] || 'text/plain'

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('Not Found')
      return
    }
    res.writeHead(200, { 'Content-Type': mime })
    res.end(data)
  })
})

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT)
})