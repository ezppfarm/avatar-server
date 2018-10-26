const http = require('http');
const fs = require('fs');
const port = 6969; // Change this if you have something else running on port 6969.

function AvatarServer(req, res) {
    var id = "0";
    var url = req.url;
    var request_id = url.split("/")
    console.log("new request: " + url)
    if (url.indexOf(".ico") > -1) {
        id = 0
    } else if (url != "/") {
        id = request_id[1]
    }
    
    
    if (!fs.existsSync(__dirname + "/avatars/" + id + ".png")) {
        var avatar = fs.readFileSync(__dirname + "/avatars/" + '0' + ".png");
    } else {
        var avatar = fs.readFileSync(__dirname + "/avatars/" + id + ".png");
    }
    res.writeHead(200, {'Content-Type': 'image/png' });
    console.log(url);
    res.end(avatar, 'binary');
}

const server = http.createServer(AvatarServer)

server.listen(port)
