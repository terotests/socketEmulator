# Socket Emulator

Emulates some of the socket.io behaviours so that at least some of the behaviours of the standard socket.io algorithms can be emulated in-browser.

Example http://jsfiddle.net/36egd9pt/


## Creating server socket:

```javascript
var server = _serverSocket("localhost", 1234);  
server.on("connect", function(socket) {
    socket.join("all"); // join room "all"
    // react to emitted messages "hello"
    socket.on("hello", function(data) {
        socket.emit("response", "Hello to you too"); // emit back to socket
    });
});
```

Adding socket to room

```javascript
socket.join("room");
```

Sending to other sockets in room

```javascript
socket.broadcast.to("room").emit("msgname", data);
```

or
```javascript
socket.delegateToRoom("room", "msgname", data); // <room>, <msg>, <data>
```

Responding to client message (if client expects a callback)

```
    socket.on("message", function(data, responseFn) {
        // repond to client
        responseFn( "this goes to client ");
    })
```

Disconnecting

```
socket.disconnect();
```

## Client socket
```javascript
    var client = _clientSocket("localhost", 1234);  
    client.on("connect", function() {
        client.emit("hello", "there");
        client.on("response", function(data) {
             console.log(data);
        });
    });
```

Ask server to confirm data sendin or to respond: 

```
    client.emit("message", payload, function(resp) {
         // server returned resp
    })
```

The server code looks like this:

```
    socket.on("message", function(data, responseFn) {
        // repond to client
        responseFn( "this goes to client ");
    })
```

Disconnecting

```
socket.disconnect();
```

## Manually clearing the IndexedDB cache

Because IndexedDB does not maintain table information, the system implements clearDatabases to
clear up all the temporary databases for the channels.

```javascript
_localDB().clearDatabases( function(data) {
    if(data.name.indexOf("tcp://")>=0) return true;
    // or just return "true"
});
```







