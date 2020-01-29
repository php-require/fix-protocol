$(function () {
  "use strict";  // for better performance - to avoid searching in DOM
  var content = $('#content');
  var status = $('#status'); 

  window.WebSocket = window.WebSocket || window.MozWebSocket;  // if browser doesn't support WebSocket, just show
  // some notification and exit
  if (!window.WebSocket) {
    content.html($('<p>',
      { text:'Sorry, but your browser doesn\'t support WebSocket.'}
    ));
    return;
  }  // open connection
  var connection = new WebSocket('ws://127.0.0.1:1337');  connection.onopen = function () {
    status.text('connected');
  };  connection.onerror = function (error) {
    // just in there were some problems with connection...
    content.html($('<p>', {
      text: 'Sorry, but there\'s some problem with your '
         + 'connection or the server is down.'
    }));
  };
  connection.onmessage = function (message) {
    // try to parse JSON message. Because we know that the server
    // always returns JSON this should work without any problem but
    // we should make sure that the massage is not chunked or
    // otherwise damaged.
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('Invalid JSON: ', message.data);
      return;
    }
      
      addMessage(json);
	  //console.log(message)
  };
  function addMessage(message) {
    content.prepend('<p> MDReqID:' + message.MDReqID + ' MDEntryPx: '+ message.MDEntryPx + '</p>');
  }
});