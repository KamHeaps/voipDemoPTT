function log(message){
    console.log(
        "-------------------    ./voipDemo_ppt/app.js    -------------------\n"+
        message
    );
}

var
    server = require('http').createServer(),
    port = 50552,
    path = require("path"),
    express = require("express"),
    bodyParser = require('body-parser'),
    routes = require(path.join(__dirname, "routes")),
    app = express()
//    serverConfig = require('./voipTPPConfig.json').serverConfig
;

// app setup
// templates use .ejs 
app.set("view engine", "ejs");
app.set('views', [path.join(__dirname, "views")]);

app.use( express.static( path.join(__dirname, "public") ) );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialize routes 
routes.init(server, app );
// covers

server.on('request', app);
server.listen(port, function () { log('Listening on ' + server.address().port); });

// Routes
// gets
log("routes.voipDemoPTT:"+routes.voipDemoPTT);
app.get("/voipDemoPTT", routes.voipDemoPTT);
// default response for get and must be last added
app.get("*", routes.not_found);
