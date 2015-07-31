# Socket Emulator

Emulates some of the socket.io behaviours so that at least some of the behaviours of the standard socket.io algorithms can be emulated in-browser. You can also simulate multiple clients and multiple servers during one browser session.

Alternatively, you can switch to `real socket.io` connection simulate multiple servers or multiple clients on from one server or one client -setup.

# Why?

Algorithms considering multiple clients and multiple servers require some additional overhead in both configuring the servers and configuring the clients. The Socket.io library multiplexes all point-to-point connections through one socket, which is good for production purposes but bad for testing or simulation purposes.

For example, if you have one browser sending requests to socket.io, all the requests will be interpreted as if they were coming from a single client application, even if you create multiple instances of the `socket object`.

Furthermore, the requests originating from the server will all be sent back to all socket instances at the same browser session.

# Limitations

Not all the socket.io commands are supported, at the moment the supported commands are

Client side socket:
- emit(`name`, `data`, `callBack`)
- on(`eventname`, `callBack`)
- disconnect()

Server side socket:
- emit(`name`, `data`)
- on(`eventname`, `callBack( responseFn )`)
- join(`room`)
- leave(`room`)
- broadcast.to(`room`).emit(`name`, `data`)
- disconnect()

# In-browser Demos

Example:
http://jsfiddle.net/8hyup32t/

Example with two servers:
http://jsfiddle.net/2jwf1czz/


# The difference between in-browser and "real" modes

At both client and server the socket is created using format
```javascript
  var clientSocket = _clientSocket("localhost", 1234, <optionalRealSocket>);
  var serverSocket = _serverSocket("localhost", 1234, <optionalIoLib>);
```
The last parameter is optional and decides whether to use real socket.io library or not. 

The `localhost", 1234` has to be the same in both client and server, because it acts as a key which connects the client and server together and makes possible simulating several server and client connections with one in-browser or socket.io session.

At the server side you create the real connection like this:

```javascript
var ioLib = require('socket.io')(http);
var s = require("./socketEmulator-0.05.js");
// virtual server listening port 1234
var sock = s._serverSocket("localhost", 1234, ioLib);
sock.on("connect", function(socket) {
   //  and use the socket then...
});
```
While the virtual setup only requires
```javascript
var s = require("./socketEmulator-0.05.js");
// virtual server listening port 1234
var sock = s._serverSocket("localhost", 1234);
sock.on("connect", function(socket) {
   //  and use the socket then...
});
```
At the client the real setup require the socket as last parameter like this:

```javascript
    var realSocket = io.connect("http://<my_server_name>:7777");
    var socket = _clientSocket("localhost", 5555, realSocket); 
```

While virtual setup can ignore the last parameter
```javascript
    var socket = _clientSocket("localhost", 5555); 
```

# Real node.js setup with multiple virtual servers at one server

In the example below we have two virtual servers

1. http://localhost:1234
2. http://localhost:5555

The actual socket.io server is listening to port `7777` and it will be setup as follows:

```javascript
var app = require('express')();
var http = require('http').Server(app);

// and here... initialize the server socket environment.
var ioLib = require('socket.io')(http);

var s = require("./socketEmulator-0.05.js");

// virtual server listening port 1234
var sock = s._serverSocket("localhost", 1234, ioLib);
sock.on("connect", function(socket) {
   //  Then use socket like socket.io library (with some limitations)
});

// virtual server listening port 5555
var sock = s._serverSocket("localhost", 5555, ioLib);
sock.on("connect", function(socket) {
   //  Then use socket like socket.io library (with some limitations)
});

app.get('/', function(req, res){
    
});

// The 7777 is the real server port
http.listen(7777, function(){
   console.log('listening on *:7777');
});

```

The client setup opens up first the connection to the port `7777` using socket.io and 
after the server is connected, the virtual sockets can be created using _clientSocket

```javascript
    var realSocket = io.connect("http://<my_server_name>:7777");

    var socket1 = _clientSocket("localhost", 5555, realSocket); 
    socket1.on("connect", function() {
        socket1.emit("msg", "some data here");
    });
    var socket2 = _clientSocket("localhost", 1234, realSocket); 
    socket2.on("connect", function() {
        socket2.emit("msg", "some other data here");
    });            

```

After that you can use the socket1 and socket2 like normal socket.io sockets (with some limitations)


## Creating server socket (in-Browser version)

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

## Client socket (in-Browser version)
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

The following is automatically created class documentation.

























   

 


   
#### Class socketEmulator





   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    
    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
#### Class _clientSocket


- [disconnect](README.md#_clientSocket_disconnect)
- [emit](README.md#_clientSocket_emit)
- [getEnum](README.md#_clientSocket_getEnum)
- [getId](README.md#_clientSocket_getId)
- [send](README.md#_clientSocket_send)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    
    
##### trait events

- [on](README.md#_on)
- [removeListener](README.md#_removeListener)
- [trigger](README.md#_trigger)


    
    


   
      
    
      
    



      
    
      
            
#### Class _serverSocket


- [getPrefix](README.md#_serverSocket_getPrefix)



   
    
##### trait events

- [on](README.md#_on)
- [trigger](README.md#_trigger)


    
    


   
      
    



      
    
      
            
#### Class _tcpEmu


- [memoryPump](README.md#_tcpEmu_memoryPump)
- [messageFrom](README.md#_tcpEmu_messageFrom)
- [messageTo](README.md#_tcpEmu_messageTo)
- [socketPump](README.md#_tcpEmu_socketPump)



   
    
##### trait events

- [on](README.md#_on)
- [trigger](README.md#_trigger)


    
    
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    
      
    



      
    
      
            
#### Class later


- [add](README.md#later_add)
- [asap](README.md#later_asap)
- [every](README.md#later_every)
- [once](README.md#later_once)
- [onFrame](README.md#later_onFrame)
- [polyfill](README.md#later_polyfill)
- [removeFrameFn](README.md#later_removeFrameFn)



   


   



      
    
      
            
#### Class _serverSocketWrap


- [delegateToRoom](README.md#_serverSocketWrap_delegateToRoom)
- [disconnect](README.md#_serverSocketWrap_disconnect)
- [emit](README.md#_serverSocketWrap_emit)
- [getId](README.md#_serverSocketWrap_getId)
- [getUserId](README.md#_serverSocketWrap_getUserId)
- [getUserRoles](README.md#_serverSocketWrap_getUserRoles)
- [isConnected](README.md#_serverSocketWrap_isConnected)
- [isInRoom](README.md#_serverSocketWrap_isInRoom)
- [join](README.md#_serverSocketWrap_join)
- [leave](README.md#_serverSocketWrap_leave)
- [leaveFromRooms](README.md#_serverSocketWrap_leaveFromRooms)
- [removeListener](README.md#_serverSocketWrap_removeListener)
- [setAuthInfo](README.md#_serverSocketWrap_setAuthInfo)
- [to](README.md#_serverSocketWrap_to)



   
    
##### trait events

- [on](README.md#_on)
- [trigger](README.md#_trigger)


    
    


   
      
    



      
    





   
# Class socketEmulator


The class has following internal singleton variables:
        
* _initDone
        
        
### socketEmulator::constructor( host, bUseReal )

```javascript

// var socket = io('http://localhost');


```
        


   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
        
```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    
    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
# Class _clientSocket


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _callBacks
        
* _socketIndex
        
* _socketCnt
        
        
### <a name="_clientSocket_disconnect"></a>_clientSocket::disconnect(t)


```javascript
this._socket.messageTo( {
    disconnect : true
});
me._connected = false;
```

### <a name="_clientSocket_emit"></a>_clientSocket::emit(name, data, callBackFn)
`name` Message name
 
`data` Data to be sent, Object or string
 
`callBackFn` Callback, message from the receiver
 

Emit data from client to server
```javascript

var obj = {
    name : name,
    data : data
}

if( callBackFn ) {
    obj._callBackId = this.guid();
    var me = this;
    var handleCb = function(data) {
        callBackFn( data );
        me.removeListener( obj._callBackId  , handleCb );
    }
    this.on( obj._callBackId, handleCb )
}

this._socket.messageTo(obj);
```

### <a name="_clientSocket_getEnum"></a>_clientSocket::getEnum(t)

The enumerated socket, stating from 1
```javascript
var myId = this.socketId;

if(!_socketIndex[myId]) {
    _socketIndex[myId] = _socketCnt++;
} 
return _socketIndex[myId];
```

### <a name="_clientSocket_getId"></a>_clientSocket::getId(t)

Returns GUID of the current socket.
```javascript
return this.socketId;
```

### _clientSocket::constructor( ip, port, realSocket )
Create new instance with _clientSocket(ip,port);
```javascript

// The socket ID must be told to the server side too

if(!_socketIndex) {
    _socketIndex = {};
    _socketCnt = 1;
}

var me = this;
var myId = this.guid();
this.socketId = myId;

if(!_socketIndex[this.socketId]) {
    _socketIndex[this.socketId] = _socketCnt++;
} 

if(realSocket && !realSocket.connected) {
    realSocket.on("connect", function() {
        var openConnection = _tcpEmu(ip, port, "openConnection", "client", realSocket);
        var connection = _tcpEmu(ip, port, myId, "client", realSocket);
        
        connection.on("clientMessage", function(o,v) {
            if(v.connected) {
                me._socket = connection;
                me._connected = true;
                me.trigger("connect", connection);
            } else {
                me.trigger(v.name, v.data);
            }
        })
        openConnection.messageTo({
            socketId : myId
        })        
    });
    return;
}

var openConnection = _tcpEmu(ip, port, "openConnection", "client", realSocket);
var connection = _tcpEmu(ip, port, myId, "client", realSocket);

connection.on("clientMessage", function(o,v) {
    if(v.connected) {
        me._socket = connection;
        me._connected = true;
        me.trigger("connect", connection);
    } else {
        me.trigger(v.name, v.data);
    }
})
openConnection.messageTo({
    socketId : myId
});


```
        
### <a name="_clientSocket_send"></a>_clientSocket::send(name, data)

A promisified interface of the &quot;emit&quot; for the _clientSocket
```javascript
var me = this;
return _promise( function(respFn) {
    me.emit( name, data, respFn);
});
```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    
    
## trait events

The class has following internal singleton variables:
        
        
### <a name="_on"></a>::on(en, ef)
`en` Event name
 

Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

if(en == "connect" && this._connected) {
    ef(this._socket);
}

return this;
```

### <a name="_removeListener"></a>::removeListener(name, fn)


```javascript
if(!this._ev) return;
if(!this._ev[name]) return;

var list = this._ev[name];

for(var i=0; i<list.length; i++) {
    if(list[i]==fn) {
        list.splice(i,1);
        return;
    }
}

```

### <a name="_trigger"></a>::trigger(en, data, fn)

triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    
      
    



      
    
      
            
# Class _serverSocket


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _clients
        
* _rooms
        
        
### <a name="_serverSocket_getPrefix"></a>_serverSocket::getPrefix(t)


```javascript
return this._ip+":"+this._port;
```

### _serverSocket::constructor( ip, port, ioLib )

```javascript
/*

// This is how the server side should be operating...
var io = require('socket.io')();
io.on('connection', function(socket){
  socket.emit('an event', { some: 'data' });
});

*/

if(!_rooms) {
    _rooms = {};
    _clients = {};
}

var me = this;

var sockets = [];

this._ip = ip;
this._port = port;

if(ioLib) {
    ioLib.on('connection', function(socket){
        
        var openConnection = _tcpEmu(ip, port, "openConnection", "server", socket);
      
        openConnection.on("serverMessage", function(o,v) {
            
            if(v.socketId) {

                var newSocket = _tcpEmu(ip, port, v.socketId, "server", socket);
                
                var wrappedSocket = _serverSocketWrap( newSocket, me );
                _clients[v.socketId] = wrappedSocket;
                me.trigger("connect",  wrappedSocket);
                
                if(wrappedSocket.isConnected()) {
                    console.log("Trying to send the connected message back to client");
                    newSocket.messageFrom({
                        connected : true,
                        socketId : v.socketId
                    });        
                } else {
                    console.log("The socket was not connected");
                }
            }
        })        
    });    
    return;
}


var openConnection = _tcpEmu(ip, port, "openConnection", "server");

openConnection.on("serverMessage", function(o,v) {

    if(v.socketId) {
        //console.log("Trying to send msg to client ", v);
        var newSocket = _tcpEmu(ip, port, v.socketId, "server");

        var socket = _serverSocketWrap( newSocket, me );
        _clients[v.socketId] = socket;
        me.trigger("connect",  socket);
        me.trigger("connection",  socket);
        
        if(socket.isConnected()) {

            newSocket.messageFrom({
                connected : true,
                socketId : v.socketId
            });        
        }
    }
})

```
        


   
    
## trait events

The class has following internal singleton variables:
        
        
### <a name="_on"></a>::on(en, ef)
`en` Event name
 

Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```

### <a name="_trigger"></a>::trigger(en, data, fn)

triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    



      
    
      
            
# Class _tcpEmu


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _msgBuffer
        
        
### _tcpEmu::constructor( server, port, socketId, role, socket )

```javascript

var me = this;
this._server = server;
this._port = port;
this._role = role;
this._socketId = socketId;
this._dbName = "tcp://"+this._server+":"+this._port+":"+this._socketId;

if(socket) {
    // "this._dbName" is the message which is listened using socketPump
    this._socket = socket;
    this.socketPump(role);
} else {
    this.memoryPump(role);
}

```
        
### <a name="_tcpEmu_memoryPump"></a>_tcpEmu::memoryPump(role)

The memory storage transform layer implementation.
```javascript
var me = this;
var bnTo   = this._dbName+":to";
var bnFrom = this._dbName+":from";

if(!_msgBuffer) _msgBuffer = {};
if(!_msgBuffer[bnTo]) _msgBuffer[bnTo] = [];
if(!_msgBuffer[bnFrom]) _msgBuffer[bnFrom] = [];

later().every(1/10,
    function() {
        if(role=="server") {
        
            var list = _msgBuffer[bnTo].slice();
            list.forEach( function(msg) {
                 me.trigger("serverMessage", msg);
                 _msgBuffer[bnTo].shift();
            });
        
        }
        if(role=="client") {
            var list = _msgBuffer[bnFrom].slice();
            list.forEach( function(msg) {
                me.trigger("clientMessage", msg);
                _msgBuffer[bnFrom].shift();
            });   
        }
});
```

### <a name="_tcpEmu_messageFrom"></a>_tcpEmu::messageFrom(msg)

Message &quot;from&quot; refers to client getting message from the server. This is the function to be used when a server sends data back to the client.
```javascript
var socket = this._socket;
if(socket) {
    //console.log("The socket should emit to "+this._dbName);
    //console.log(msg);
    socket.emit(this._dbName, msg);
    return;
}

var bn = this._dbName+":from";
_msgBuffer[bn].push( msg );


```

### <a name="_tcpEmu_messageTo"></a>_tcpEmu::messageTo(msg)

Message &quot;to&quot; refers to client sending message to server. This is the function to be used when a client socket sends data to the server.
```javascript

var socket = this._socket;
if(socket) {
    socket.emit(this._dbName, msg);
    return;
}

var bn = this._dbName+":to";
_msgBuffer[bn].push( msg );

```

### <a name="_tcpEmu_socketPump"></a>_tcpEmu::socketPump(role)

The socket transform layer implementation.
```javascript
var me = this;

var socket = this._socket;
if(role=="server") {
    socket.on(this._dbName, function(data) {
        me.trigger("serverMessage", data);
    });
}
if(role=="client") {
    socket.on(this._dbName, function(data) {
        me.trigger("clientMessage", data);
    });
}

```



   
    
## trait events

The class has following internal singleton variables:
        
        
### <a name="_on"></a>::on(en, ef)
`en` Event name
 

Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```

### <a name="_trigger"></a>::trigger(en, data, fn)

triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb(me, data, fn) } );    
return this;
```


    
    
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    
      
    



      
    
      
            
# Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later_add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later_asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later_every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {

   var frame, cancelFrame;
   
   this.polyfill();
 
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   v.fn();
                   v.nextTime = ms + v.step;
               }
               if(v.until) {
                   if(v.until < ms) {
                       delete _everies[n];
                   }
               }
           }
       }       
       
       frame(_callQueQue);
       lastMs = ms;
    };
    _callQueQue();
    _initDone = true;
}
```
        
### <a name="later_once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later_onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later_polyfill"></a>later::polyfill(t)


```javascript
// --- let's not ---
```

### <a name="later_removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    
      
            
# Class _serverSocketWrap


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _rooms
        
* _socketRooms
        
        
### <a name="_serverSocketWrap_delegateToRoom"></a>_serverSocketWrap::delegateToRoom(roomName, name, data)


```javascript

var realRoomName = this._roomPrefix+":"+roomName;

if(_rooms && _rooms[realRoomName]) {
    var me = this;
    _rooms[realRoomName].forEach( function(socket) {
        if(socket != me ) {
            socket.emit( name, data );
        }
    })
}
```

### <a name="_serverSocketWrap_disconnect"></a>_serverSocketWrap::disconnect(t)


```javascript
var me = this;
me._disconnected = true;
me.leaveFromRooms();
me.trigger("disconnect", me);
// Then remove the socket from the listeners...
me._disconnected = true;

var dbName = this._tcp._dbName;

_localDB().clearDatabases( function(d) {
   if(d.name==dbName) return true;
});

return;
```

### <a name="_serverSocketWrap_emit"></a>_serverSocketWrap::emit(name, value)


```javascript

this._tcp.messageFrom({
    name : name,
    data : value
});
```

### <a name="_serverSocketWrap_getId"></a>_serverSocketWrap::getId(t)


```javascript
return this._tcp._socketId;
```

### <a name="_serverSocketWrap_getUserId"></a>_serverSocketWrap::getUserId(t)


```javascript

return this._userId;
```

### <a name="_serverSocketWrap_getUserRoles"></a>_serverSocketWrap::getUserRoles(t)


```javascript

return this._roles;
```

### _serverSocketWrap::constructor( tcpEmu, server, isReal )
The _serverSocketWrap is wrapper for the real server side socket functionality.
```javascript

var me = this;
this._roomPrefix = server.getPrefix();
this._server = server;
this._tcp = tcpEmu;

var disconnected = false;
tcpEmu.on("serverMessage", function(o,v) {
    
    if(me._disconnected) return; // not good enough
    
    if(v.disconnect) {
        me.disconnect();
        return;
    }    
    if(v._callBackId) {
        me.trigger(v.name, v.data, function(data) {
            me.emit(v._callBackId, data);
        });
    } else {
        me.trigger(v.name, v.data);
    }
})

this.broadcast = {
    to : function(room) {
        return {
            emit : function(name, value ) {
                me.delegateToRoom( room, name, value );
            }
        }
    }
}

/*
socket.broadcast.to(_ctx.channelId).emit('ctxupd_'+_ctx.channelId, cObj);
*/

```
        
### <a name="_serverSocketWrap_isConnected"></a>_serverSocketWrap::isConnected(t)


```javascript
if(this._disconnected) return false;
return true;
```

### <a name="_serverSocketWrap_isInRoom"></a>_serverSocketWrap::isInRoom(roomName)


```javascript
if(!_socketRooms) return false;
return _socketRooms[this.getId()].indexOf(roomName) >= 0;
```

### <a name="_serverSocketWrap_join"></a>_serverSocketWrap::join(roomName)

Adds a new client to some room
```javascript

var realRoomName = this._roomPrefix+":"+roomName;

if(!_rooms) _rooms = {};
if(!_rooms[realRoomName]) _rooms[realRoomName] = [];

if(_rooms[realRoomName].indexOf(this) < 0 ) {
    _rooms[realRoomName].push(this);
    if(!_socketRooms) _socketRooms = {};
    if(!_socketRooms[this.getId()]) _socketRooms[this.getId()] = [];
    
    _socketRooms[this.getId()].push(roomName);
}

```

### <a name="_serverSocketWrap_leave"></a>_serverSocketWrap::leave(roomName)


```javascript

var realRoomName = this._roomPrefix+":"+roomName;

if(!_rooms) _rooms = {};
if(!_rooms[realRoomName]) _rooms[realRoomName] = [];

var i;
if( ( i = _rooms[realRoomName].indexOf(this) ) >= 0 ) {
    _rooms[realRoomName].splice(i,1);
    var id = this.getId();
    
    var i2 = _socketRooms[id].indexOf( roomName );
    if(i2>=0) _socketRooms[id].splice(i2,1);
}


```

### <a name="_serverSocketWrap_leaveFromRooms"></a>_serverSocketWrap::leaveFromRooms(socket)


```javascript
var id = this.getId();
var me = this;

if(!_socketRooms) return;
if(!_socketRooms[id]) return;

_socketRooms[id].forEach( function(name) {
    me.leave(name); 
});
```

### <a name="_serverSocketWrap_removeListener"></a>_serverSocketWrap::removeListener(t)


```javascript
// TODO: not implemented yet
```

### <a name="_serverSocketWrap_setAuthInfo"></a>_serverSocketWrap::setAuthInfo(userId, roles)

Each socket can have and in many implementations must have some userID and role, which can be used together with the ACL implementations.
```javascript

this._userId = userId;
this._roles = roles;
```

### <a name="_serverSocketWrap_to"></a>_serverSocketWrap::to(roomName)


```javascript

var realRoomName = this._roomPrefix+":"+roomName;

return {
    emit : function(name, data) {
        console.log(" emit called ");
        if(_rooms && _rooms[realRoomName]) {
            _rooms[realRoomName].forEach( function(socket) {
                console.log(" emit with ", name, data);
                socket.emit( name, data );
            })        
        }
    }
}
```



   
    
## trait events

The class has following internal singleton variables:
        
        
### <a name="_on"></a>::on(en, ef)
`en` Event name
 

Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```

### <a name="_trigger"></a>::trigger(en, data, fn)

triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    



      
    




