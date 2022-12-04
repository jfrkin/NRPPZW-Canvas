const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static("views"));

app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
  });


const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
if (externalUrl) {
    const hostname = '127.0.0.1';
    app.listen(port, hostname, () => {
        console.log(`Server locally running at http://${hostname}:${port}/ and from
        outside on ${externalUrl}`);
    });
} else {
    http.createServer(app).listen(port, function () {
        console.log(`Server running at https://localhost:${port}/`);
    });
}
