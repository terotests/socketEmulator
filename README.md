









   


   
## Class socketEmulator


## Singleton variables
        
* _initDone
        
        
### constructor( host,bUseReal )

        


   
    
# trait _dataTrait

## Singleton variables
        
* _eventOn
        
* _commands
        
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    
    
    
    
    
    
    
    
    
    
    


   
      
    
      
            
## Class _clientSocket


## Singleton variables
        
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

## Singleton variables
        
        
### on(en,ef)
Binds event name to event function

### removeListener(name,fn)


### trigger(en,data,fn)
triggers event with data and optional function


    
    
    
# trait _dataTrait

## Singleton variables
        
* _eventOn
        
* _commands
        
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    


   
      
    
      
    



      
    
      
            
## Class _serverSocket


## Singleton variables
        
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

## Singleton variables
        
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    


   
      
    



      
    
      
            
## Class _tcpEmu


## Singleton variables
        
* _channelIndex
        
* _rootData
        
* _msgBuffer
        
        
### constructor( server,port,socketId,role )

        
### messageFrom(msg)


### messageTo(msg)




   
    
# trait events

## Singleton variables
        
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    
    
# trait _dataTrait

## Singleton variables
        
* _eventOn
        
* _commands
        
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    


   
      
    
      
    



      
    
      
            
## Class later


## Singleton variables
        
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


## Singleton variables
        
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

## Singleton variables
        
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    


   
      
    



      
    




