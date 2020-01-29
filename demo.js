"use strict";
process.title = 'lmax';

var colors = require('colors');
var webSocketServer = require('websocket').server;
var http = require('http');
var FixProtocol = require('./lib/protocol.js'),
    tls       = require('tls'),
    moment    = require('moment');

colors.setTheme({
  zalupa: ['green', 'underline']
});

var webSocketsServerPort = 1337;// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');


var server = http.createServer(function(request, response) {
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port ".rainbow
      + webSocketsServerPort);
});

var wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request. For more info 
  // http://tools.ietf.org/html/rfc6455#page-6
  httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin '.yellow
      + request.origin + '.');  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin); 
});

// FIX account credentials
var host = 'fix-marketdata.london-demo.lmax.com';
var port = 443;
var username = 'sudak';
var password = 'tudak';

var protocol = new FixProtocol();

var loginMessage = protocol.encode({
    BeginString:     'FIX.4.4',
    BodyLength:      '%l',
    MsgType:         'A',
    MsgSeqNum:       protocol.seqNum(),
    SenderCompID:    'sudak',
    SendingTime:     moment().subtract(3, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:    'LMXBDM',
    Username:        username,
    Password:        password,
    EncryptMethod:   0,
    HeartBtInt:      30,
    ResetSeqNumFlag: 'Y'
}, true);

var quoteMessage = protocol.encode({
    BeginString:             'FIX.4.4',
    //body length should always be %l
    // it will be replaced with actual length
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    // username
    SenderCompID:            'sudak',
    // This should be very accurate otherwise the engine
    // will close the connection, I'm using momentjs to
    // have my time match the engine time
    SendingTime:             moment().subtract(3, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            'LMXBDM',
    MDReqID:                 'EURUSD',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    // 4001 = EURUSD
    SecurityID:              4001,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);


var connectionOptions = {
    secureProtocol: 'TLSv1_method'
};

var cleartextStream = tls.connect(port, host,
    connectionOptions, function () {
        // connected to FIX server
        // send a FIX login message
        cleartextStream.write(loginMessage);
        console.log('==============fix message=============='.bgWhite.red);
		console.log(loginMessage.zalupa);
        // send a quote subscription message
        cleartextStream.write(quoteMessage);
		console.log(quoteMessage.zalupa);
        console.log('==============fix message=============='.bgWhite.red);
    });


cleartextStream.setEncoding('utf8');

// parse response from FIX server
cleartextStream.on('data', function (data) {

    // parse the FIX message
    var data = protocol.decode(data);
	switch (data.MsgType) {
		case '1':
			var beat = protocol.encode({
				BeginString:  'FIX.4.4',
				BodyLength:   '%l',
				MsgType:      0,
				MsgSeqNum:    protocol.seqNum(),
				SenderCompID: 'sudak',
				SendingTime:  moment().subtract(3, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
				TargetCompID: 'LMXBDM',
				TestReqID:    data.TestReqID
			}, true);
			console.log(colors.cyan(data));
			cleartextStream.write(beat);
			console.log(colors.magenta(beat));
			break;
		case 'W':
			console.log(colors.green(data));
			//if (wsServer.connections.Count > 0) {
				wsServer.broadcast(JSON.stringify(data));
			//}
			break;
		default:
			console.log(colors.yellow(data));
			break;
	}

});

cleartextStream.on('end', function () {
    console.log('FIX connection closed'.red);
    process.exit(0);
});

cleartextStream.on('error', function (reason) {
    console.log('FIX connection error: '.red + reason);
});