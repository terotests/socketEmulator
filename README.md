# Socket Emulator

## Requirements

- requires indexedDB
- clears the data from indexedDB client disconnect() is called

## Creating server socket:

```
var server = _serverSocket("localhost", 1234);  
server.on("connect", function(socket) {
    socket.join("all"); // room for the sockets
    socket.on("hello", function(data) {
        socket.emit("response", "Hello to you too");
    });
});
```

Sending to other sockets in room

```
socket.delegateToRoom("all", "hello", data); // <room>, <msg>, <data>
```

## Client socket
```
    var client = _clientSocket("localhost", 1234);  
    client.on("connect", function() {
        client.emit("hello", "there");
        client.on("response", function(data) {
             console.log(data);
        });
    });
```

## Manually clearing the IndexedDB cache

Because IndexedDB does not maintain table information, the system implements clearDatabases to
clear up all the temporary databases for the channels.

```
_localDB().clearDatabases( function(data) {
    if(data.name.indexOf("tcp://")>=0) return true;
    // or just return "true"
});
```







