# Socket Emulator

Emulates some of the socket.io behaviours so that at least some of the behaviours of the standard socket.io algorithms can be emulated in-browser.

Example:
http://jsfiddle.net/8hyup32t/

Example with two servers:
http://jsfiddle.net/2jwf1czz/


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

# Class Documentation

{{classDocs}}


















   


   
## Class socketEmulator


The class has following internal singleton variables:
        
* _initDone
        
        
### constructor( host,bUseReal )

        


   
    
# trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    
    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
## Class _clientSocket


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _callBacks
        
* _socketIndex
        
* _socketCnt
        
        
### disconnect(t)


### emit(name,data,callBackFn)
Emit data from client to server

### getEnum(t)
The enumerated socket, stating from 1

### getId(t)
Returns GUID of the current socket.

### constructor( ip,port,bUseReal )
Create new instance with _clientSocket(ip,port);
        
### send(name,data)
A promisified interface of the &quot;emit&quot; for the _clientSocket



   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en,ef)
Binds event name to event function

### removeListener(name,fn)


### trigger(en,data,fn)
triggers event with data and optional function


    
    
    
# trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    


   
      
    
      
    



      
    
      
            
## Class _serverSocket


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _clients
        
* _rooms
        
        
### emit(t)


### getPrefix(t)


### constructor( ip,port )

        
### join(t)


### removeListener(t)




   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    


   
      
    



      
    
      
            
## Class _tcpEmu


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _msgBuffer
        
        
### constructor( server,port,socketId,role )

        
### messageFrom(msg)


### messageTo(msg)




   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    
    
# trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    


   
      
    
      
    



      
    
      
            
## Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### add(fn,thisObj,args)


### asap(fn)


### every(seconds,fn,name)


### constructor( interval,fn )

        
### once(key,fn,value)


### onFrame(fn)


### polyfill(t)


### removeFrameFn(fn)




   


   



      
    
      
            
## Class _serverSocketWrap


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _rooms
        
* _socketRooms
        
        
### delegateToRoom(roomName,name,data)


### disconnect(t)


### emit(name,value)


### getId(t)


### getUserId(t)


### getUserRoles(t)


### constructor( tcpEmu,server )
The _serverSocketWrap is wrapper for the real server side socket functionality.
        
### isConnected(t)


### isInRoom(roomName)


### join(roomName)
Adds a new client to some room

### leave(roomName)


### leaveFromRooms(socket)


### removeListener(t)


### setAuthInfo(userId,roles)




   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    


   
      
    



      
    




