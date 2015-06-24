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
```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
        
```


### isArray(t)
```javascript

if(typeof(t)=="undefined") return this.__isA;

return Object.prototype.toString.call( t ) === '[object Array]';
```


### isFunction(fn)
```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```


### isObject(t)
```javascript

if(typeof(t)=="undefined") return this.__isO;

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


### emit(name,data,callBackFn)
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
Emit data from client to server

### getEnum(t)
```javascript
var myId = this.guid();

if(!_socketIndex[myId]) {
    _socketIndex[myId] = _socketCnt++;
} 
return _socketIndex[myId];
```
The enumerated socket, stating from 1

### getId(t)
```javascript
return this.socketId;
```
Returns GUID of the current socket.

### constructor( ip,port,bUseReal )
Create new instance with _clientSocket(ip,port);
        
### send(name,data)
```javascript
var me = this;
return _promise( function(respFn) {
    me.emit( name, data, respFn);
});
```
A promisified interface of the &quot;emit&quot; for the _clientSocket



   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en,ef)
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```
Binds event name to event function

### removeListener(name,fn)
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


### trigger(en,data,fn)
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```
triggers event with data and optional function


    
    
    
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

if(typeof(t)=="undefined") return this.__isA;

return Object.prototype.toString.call( t ) === '[object Array]';
```


### isFunction(fn)
```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```


### isObject(t)
```javascript

if(typeof(t)=="undefined") return this.__isO;

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


### constructor( ip,port )

        


   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en,ef)
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```
Binds event name to event function

### trigger(en,data,fn)
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```
triggers event with data and optional function


    
    


   
      
    



      
    
      
            
## Class _tcpEmu


The class has following internal singleton variables:
        
* _channelIndex
        
* _rootData
        
* _msgBuffer
        
        
### constructor( server,port,socketId,role )

        
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
        
        
### on(en,ef)
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```
Binds event name to event function

### trigger(en,data,fn)
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb(me, data, fn) } );    
return this;
```
triggers event with data and optional function


    
    
    
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

if(typeof(t)=="undefined") return this.__isA;

return Object.prototype.toString.call( t ) === '[object Array]';
```


### isFunction(fn)
```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```


### isObject(t)
```javascript

if(typeof(t)=="undefined") return this.__isO;

return t === Object(t);
```



    
    


   
      
    
      
    



      
    
      
            
## Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### add(fn,thisObj,args)
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


### every(seconds,fn,name)
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


### constructor( interval,fn )

        
### once(key,fn,value)
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
        
        
### delegateToRoom(roomName,name,data)
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


### emit(name,value)
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


### constructor( tcpEmu,server )
The _serverSocketWrap is wrapper for the real server side socket functionality.
        
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
Adds a new client to some room

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

```


### setAuthInfo(userId,roles)
```javascript

this._userId = userId;
this._roles = roles;
```
Each socket can have and in many implementations must have some userID and role, which can be used together with the ACL implementations.



   
    
# trait events

The class has following internal singleton variables:
        
        
### on(en,ef)
```javascript
if(!this._ev) this._ev = {};
if(!this._ev[en]) this._ev[en] = [];

this._ev[en].push(ef);

return this;
```
Binds event name to event function

### trigger(en,data,fn)
```javascript

if(!this._ev) return;
if(!this._ev[en]) return;
var me = this;
this._ev[en].forEach( function(cb) { cb( data, fn) } );    
return this;
```
triggers event with data and optional function


    
    


   
      
    



      
    




