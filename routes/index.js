

function log(message){
    console.log(
        "-------------------    voipDemo_ppt/routes/index.js   -------------------\n"+
        message
    );
}
function messageing_onMessage(event){
    var
        messageObject = event.data.messageObject,
        reqObject = event.data.reqObject,
        clientDest
    ;
    if(messageObject.dest == "server"){
        log("server recieved unhandeled messageObject:\n"+JSON.stringify(messageObject));
        reqObject.sendSuccessfulResponse();
    }else if(  (clientDest = messageing.clientManager.getClient(messageObject.dest) ) ){
        reqObject.sendSuccessfulResponse();
        clientDest.send(messageObject);
    }
}

var

    path = require("path"),
    messageingUrl = "sseMessageing",
    Messageing = require("nuf_messageing"),
    libDir = path.join(__dirname, "..","lib"),
    //Messageing = require( path.join(libDir, "messageing.js") ),
    server, app,
    messageing,
    clientManager
;


exports.init = function(_server, _app){
    log(
        "init received..\n"+
        "_server:"+_server +"\n"+
        "_app:"+_app +"\n"
    );
    server  = _server;
    app  = _app;
    messageing = new Messageing(app, messageingUrl);
    messageing.onMessage = messageing_onMessage;
    clientManager = messageing.clientManager;
};
exports.voipDemoPTT = function(req, res){
    function client_onConnected(event){
        var
            clientIds = Object.keys(clientManager.clients),
            messageObject
        ;
        if(clientIds.length >= 2){
            messageObject = new client.send.MessageObject(
                "setClientPartner",
               clientIds[0],
               "server",
               {
                    clientPartner:clientIds[1]
               }
            );
            clientManager.getClient(clientIds[0]).send(messageObject);
            messageObject = new client.send.MessageObject(
                "setClientPartner",
               clientIds[1],
               "server",
               {
                    clientPartner:clientIds[0]
               }
            );
            clientManager.getClient(clientIds[1]).send(messageObject);
        }
        for(var i=0; i<clientIds.length; i++){
            for(var j=0; j<clientIds.length; j++){
                if(i != j){
                    
                    break;
                }
            }
        }
        
    }   
    var client = clientManager.getNewClient();
    client.onConnected = client_onConnected;
    res.render(
        "home",
        {
            messageingObject:
                {  // messageingObject needed for messageingClient.js to connect
                    clientId:client.id,
                    messageingUrl:messageingUrl
                },
            userData:{
                voipConnection:{
                    data0:"adskljhaslopiigbnlmgnbkfh",
                    data1:"bdskljhaslopiigbnlmgnbkfh",
                    data2:"cdskljhaslopiigbnlmgnbkfh",
                    data3:"ddskljhaslopiigbnlmgnbkfh"
                }
            }
        }
    );
};
exports.not_found = function(req, res){
    //res.writeHead(404);
    res.status(404).send("page not found");
};