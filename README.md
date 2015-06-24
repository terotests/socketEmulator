









   


   
## Class socketEmulator


## Singleton variables
        
* _initDone
        
        // Initialize static variables here...
        
### constructor( host,bUseReal )
        


   
    
# trait _dataTrait

## Singleton variables
        
* _eventOn
        
* _commands
        
        // Initialize static variables here...
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    
    
    
    
    
    
    
    
    
    
    


   
      
    
      
            // the subclass definition comes around here then
            
## Class _clientSocket


## Singleton variables
        
* _channelIndex
        
* _rootData
        
* _callBacks
        
* _socketIndex
        
* _socketCnt
        
        // Initialize static variables here...
        
### disconnect(t)


### emit(name,data,callBackFn)
Emit data from client to server

### getEnum(t)


### getId(t)


### constructor( ip,port,bUseReal )
        
### send(name,data)
A promisified interface of the &quot;emit&quot; for the _clientSocket



   
    
# trait events

## Singleton variables
        
        // Initialize static variables here...
        
### on(en,ef)
Binds event name to event function

### removeListener(name,fn)


### trigger(en,data,fn)
triggers event with data and optional function


    
    
    
# trait _dataTrait

## Singleton variables
        
* _eventOn
        
* _commands
        
        // Initialize static variables here...
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    


   
      
    
      
    



      
    
      
            // the subclass definition comes around here then
            
## Class _serverSocket


## Singleton variables
        
* _channelIndex
        
* _rootData
        
* _clients
        
* _rooms
        
        // Initialize static variables here...
        
### emit(t)


### getPrefix(t)


### constructor( ip,port )
        
### join(t)


### removeListener(t)




   
    
# trait events

## Singleton variables
        
        // Initialize static variables here...
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    


   
      
    



      
    
      
            // the subclass definition comes around here then
            
## Class _tcpEmu


## Singleton variables
        
* _channelIndex
        
* _rootData
        
* _msgBuffer
        
        // Initialize static variables here...
        
### constructor( server,port,socketId,role )
        
### messageFrom(msg)


### messageTo(msg)




   
    
# trait events

## Singleton variables
        
        // Initialize static variables here...
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    
    
# trait _dataTrait

## Singleton variables
        
* _eventOn
        
* _commands
        
        // Initialize static variables here...
        
### guid(t)


### isArray(t)


### isFunction(fn)


### isObject(t)



    
    


   
      
    
      
    



      
    
      
            // the subclass definition comes around here then
            
## Class later


## Singleton variables
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        // Initialize static variables here...
        
### add(fn,thisObj,args)


### asap(fn)


### every(seconds,fn,name)


### constructor( interval,fn )
        
### once(key,fn,value)


### onFrame(fn)


### polyfill(t)


### removeFrameFn(fn)




   


   



      
    
      
            // the subclass definition comes around here then
            
## Class _serverSocketWrap


## Singleton variables
        
* _channelIndex
        
* _rootData
        
* _rooms
        
* _socketRooms
        
        // Initialize static variables here...
        
### delegateToRoom(roomName,name,data)


### disconnect(t)


### emit(name,value)


### getId(t)


### getUserId(t)


### getUserRoles(t)


### constructor( tcpEmu,server )
        
### isConnected(t)


### isInRoom(roomName)


### join(roomName)


### leave(roomName)


### leaveFromRooms(socket)


### removeListener(t)


### setAuthInfo(userId,roles)




   
    
# trait events

## Singleton variables
        
        // Initialize static variables here...
        
### on(en,ef)
Binds event name to event function

### trigger(en,data,fn)
triggers event with data and optional function


    
    


   
      
    



      
    




