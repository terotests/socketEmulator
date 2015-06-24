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

The following is automatically created class documentation.


















   


   
## Class socketEmulator


The class has following internal singleton variables:
        
* _initDone
        
        
### constructor( host , bUseReal )

```javascript

// var socket = io('http://localhost');


```
        


   
    
# trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### guid(t)

```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
        
```

### isArray(t)

```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### isFunction(fn)

```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### isObject(t)

```javascript
return t === Object(t);
```


    
    
    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
## Class _clientSocket


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _callBacks
        
* _socketIndex
        
* _socketCnt
        
        
### disconnect(t)

```javascript
this._socket.messageTo( {
    disconnect : true
});
```

### emit(name , data , callBackFn)
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

### getEnum(t)
The enumerated socket, stating from 1
```javascript
var myId = this.guid();

if(!_socketIndex[myId]) {
    _socketIndex[myId] = _socketCnt++;
} 
return _socketIndex[myId];
```

### getId(t)
Returns GUID of the current socket.
```javascript
return this.socketId;
```

### constructor( ip , port , bUseReal )
Create new instance with _clientSocket(ip,port);
```javascript

// The socket ID must be told to the server side too

if(!_socketIndex) {
    _socketIndex = {};
    _socketCnt = 1;
}

var myId = this.guid();

if(!_socketIndex[myId]) {
    _socketIndex[myId] = _socketCnt++;
} 

var me = this;
var openConnection = _tcpEmu(ip, port, "openConnection", "client");
var connection = _tcpEmu(ip, port, myId, "client");

this.socketId = myId;

connection.on("clientMessage", function(o,v) {
    
    if(v.connected) {
        me._socket = connection;
        me.trigger("connect", connection);
    } else {
        me.trigger(v.name, v.data);
    }
    
})

openConnection.messageTo({
    socketId : myId
});


```
        
### send(name , data)
A promisified interface of the &quot;emit&quot; for the _clientSocket
```javascript
var me = this;
return _promise( function(respFn) {
    me.emit( name, data, respFn);
});
```



   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en , ef)
Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```

### removeListener(name , fn)

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

### trigger(en , data , fn)
triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    
    
# trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### guid(t)

```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### isArray(t)

```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### isFunction(fn)

```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### isObject(t)

```javascript
return t === Object(t);
```


    
    


   
      
    
      
    



      
    
      
            
## Class _serverSocket


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _clients
        
* _rooms
        
        
### getPrefix(t)

```javascript
return this._ip+":"+this._port;
```

### constructor( ip , port )

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

var sockets = [];
var me = this;

this._ip = ip;
this._port = port;

var openConnection = _tcpEmu(ip, port, "openConnection", "server");

openConnection.on("serverMessage", function(o,v) {

    if(v.socketId) {
        //console.log("Trying to send msg to client ", v);
        var newSocket = _tcpEmu(ip, port, v.socketId, "server");

        var socket = _serverSocketWrap( newSocket, me );
        _clients[v.socketId] = socket;
        me.trigger("connect",  socket);
        
        if(socket.isConnected()) {

            newSocket.messageFrom({
                connected : true,
                socketId : v.socketId
            });        
        }
    }
})

```
        


   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en , ef)
Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```

### trigger(en , data , fn)
triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    



      
    
      
            
## Class _tcpEmu


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _msgBuffer
        
        
### constructor( server , port , socketId , role )

```javascript

var me = this;
this._server = server;
this._port = port;
this._socketId = socketId;
this._dbName = "tcp://"+this._server+":"+this._port+":"+this._socketId;

var bnTo   = this._dbName+":to";
var bnFrom = this._dbName+":from";

if(!_msgBuffer) _msgBuffer = {};
if(!_msgBuffer[bnTo]) _msgBuffer[bnTo] = [];
if(!_msgBuffer[bnFrom]) _msgBuffer[bnFrom] = [];

// Check for new messages to the client or server
later().every( 1/10, function() {

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
        
### messageFrom(msg)

```javascript
var bn = this._dbName+":from";
_msgBuffer[bn].push( msg );


```

### messageTo(msg)

```javascript
var bn = this._dbName+":to";
_msgBuffer[bn].push( msg );

```



   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en , ef)
Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```

### trigger(en , data , fn)
triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb(me, data, fn) } );    
return this;
```


    
    
    
# trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### guid(t)

```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### isArray(t)

```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### isFunction(fn)

```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### isObject(t)

```javascript
return t === Object(t);
```


    
    


   
      
    
      
    



      
    
      
            
## Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### add(fn , thisObj , args)

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

### asap(fn)

```javascript
this.add(fn);

```

### every(seconds , fn , name)

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

### constructor( interval , fn )

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
        
### once(key , fn , value)

```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### onFrame(fn)

```javascript

_framers.push(fn);
```

### polyfill(t)

```javascript
// --- let's not ---
```

### removeFrameFn(fn)

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



   


   



      
    
      
            
## Class _serverSocketWrap


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _rooms
        
* _socketRooms
        
        
### delegateToRoom(roomName , name , data)

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

### disconnect(t)

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

### emit(name , value)

```javascript

this._tcp.messageFrom({
    name : name,
    data : value
});
```

### getId(t)

```javascript
return this._tcp._socketId;
```

### getUserId(t)

```javascript

return this._userId;
```

### getUserRoles(t)

```javascript

return this._roles;
```

### constructor( tcpEmu , server )
The _serverSocketWrap is wrapper for the real server side socket functionality.
```javascript

var me = this;
this._roomPrefix = server.getPrefix();
this._tcp = tcpEmu;
this._server = server;
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
        
### isConnected(t)

```javascript
if(this._disconnected) return false;
return true;
```

### isInRoom(roomName)

```javascript
if(!_socketRooms) return false;
return _socketRooms[this.getId()].indexOf(roomName) >= 0;
```

### join(roomName)
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

### leave(roomName)

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

### leaveFromRooms(socket)

```javascript
var id = this.getId();
var me = this;

if(!_socketRooms) return;
if(!_socketRooms[id]) return;

_socketRooms[id].forEach( function(name) {
    me.leave(name); 
});
```

### removeListener(t)

```javascript
// TODO: not implemented yet
```

### setAuthInfo(userId , roles)
Each socket can have and in many implementations must have some userID and role, which can be used together with the ACL implementations.
```javascript

this._userId = userId;
this._roles = roles;
```



   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en , ef)
Binds event name to event function
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```

### trigger(en , data , fn)
triggers event with data and optional function
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```


    
    


   
      
    



      
    




