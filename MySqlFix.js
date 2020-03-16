"use strict";
process.title = 'bbbbb';

var fs = require('fs');
var colors = require('colors');
var FixProtocol = require('./lib/protocol.js'),
    tls       = require('tls'),
    moment    = require('moment');


var webSocketsServerPort = 1337;// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port "
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
  console.log((new Date()) + ' Connection from origin '
      + request.origin + '.');  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  // (http://en.wikipedia.org/wiki/Same_origin_policy)
  var connection = request.accept(null, request.origin); 
});

// FIX account credentials
var host = 'Yourfix.com';
var port = 443;
var username = 'tudak';
var password = 'sudak';
var TCompID = 'LMXBLM'; //LMXBDM - demo

var protocol = new FixProtocol();

var loginMessage = protocol.encode({
    BeginString:     'FIX.4.4',
    BodyLength:      '%l',
    MsgType:         'A',
    MsgSeqNum:       protocol.seqNum(),
    SenderCompID:    username,
    SendingTime:     moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:    TCompID,
    Username:        username,
    Password:        password,
    EncryptMethod:   0,
    HeartBtInt:      30,
    ResetSeqNumFlag: 'Y'
}, true);

var EURUSD_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'EURUSD',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              4001,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var GBPUSD_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'GBPUSD',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              4002,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var USDJPY_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'USDJPY',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              4004,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var GBPJPY_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'GBPJPY',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              4005,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var EURJPY_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'EURJPY',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              4006,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var AUDUSD_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'AUDUSD',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              4007,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

// var USDCHF_Message = protocol.encode({
//     BeginString:             'FIX.4.4',
//     BodyLength:              '%l',
//     MsgType:                 'V',
//     MsgSeqNum:               protocol.seqNum(),
//     SenderCompID:            username,
//     SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
//     TargetCompID:            TCompID,
//     MDReqID:                 'USDCHF',
//     SubscriptionRequestType: 1,
//     MarketDepth:             1,
//     MDUpdateType:            0,
//     NoRelatedSym:            1,
//     SecurityID:              4010,
//     SecurityIDSource:        8,
//     NoMDEntryTypes:          2,
//     MDEntryType:             "0\x01269=1"
// }, true);

var USDCAD_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'USDCAD',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              4013,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var NZDUSD_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'NZDUSD',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              100613,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var Gold_Spot_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'Gold (Spot)',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              100637,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var UK_Brent_Spot_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'UK Brent (Spot)',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              100805,
    SecurityIDSource:        8,
    NoMDEntryTypes:          2,
    MDEntryType:             "0\x01269=1"
}, true);

var US_Natural_Gas_Spot_Message = protocol.encode({
    BeginString:             'FIX.4.4',
    BodyLength:              '%l',
    MsgType:                 'V',
    MsgSeqNum:               protocol.seqNum(),
    SenderCompID:            username,
    SendingTime:             moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
    TargetCompID:            TCompID,
    MDReqID:                 'US Natural Gas (Spot)',
    SubscriptionRequestType: 1,
    MarketDepth:             1,
    MDUpdateType:            0,
    NoRelatedSym:            1,
    SecurityID:              100926,
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
		//console.log(loginMessage.blue);
        // send a quote subscription message
        cleartextStream.write(EURUSD_Message);
        cleartextStream.write(GBPUSD_Message);
        cleartextStream.write(USDJPY_Message);
        cleartextStream.write(EURJPY_Message);
        cleartextStream.write(AUDUSD_Message);
        cleartextStream.write(GBPJPY_Message);
        cleartextStream.write(USDCAD_Message);
        cleartextStream.write(NZDUSD_Message);
        cleartextStream.write(Gold_Spot_Message);
        cleartextStream.write(UK_Brent_Spot_Message);
        cleartextStream.write(US_Natural_Gas_Spot_Message);
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
				SenderCompID: username,
				SendingTime:  moment().subtract(0, "hours").format("YYYYMMDD-HH:mm:ss.SSS"),
				TargetCompID: TCompID,
				TestReqID:    data.TestReqID
			}, true);
			console.log(colors.cyan(data));
			cleartextStream.write(beat);
			

			break;
		case 'W':

                 var d = new Date();
                 var sendTime = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()+ ":" + d.getSeconds();
                 var mDEntryPx = data['MDEntryPx'].toString()
                 var sql = "UPDATE modx_fix_data SET mDEntryPx_buy = '" + mDEntryPx.split(',')[1] + "', mDEntryPx_sell = '" + mDEntryPx.split(',')[0] + "', sendingTime = '"+ sendTime +"' WHERE securityID = '" + data['SecurityID'] + "'";
  
    		  //**********************
                var mysql = require('mysql');
                var pool  = mysql.createPool({
                  connectionLimit : 15,
                  host            : 'localhost',
                  user            : 'admin_rm',
                  password        : 'cwJZ2K0kbR',
                  database        : 'admin_rm'
                });

                pool.query(sql, function (error, results, fields) {
                  if (error) throw error;
                  console.log(colors.yellow('update: mysql'));
                });
 
 
                //if (wsServer.connections.Count > 0) {
                    wsServer.broadcast(JSON.stringify(data));
                //}
			break;
		default:
			//console.log(colors.yellow(data));
			break;
	}

});
 

cleartextStream.on('end', function () {
    console.log('FIX connection closed'.red);
    process.exit(0);
});

cleartextStream.on('error', function (reason) {
    console.log('FIX connection error:' + reason);
});
