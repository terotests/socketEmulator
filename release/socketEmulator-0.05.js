// The code template begins here
'use strict';

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var socketEmulator_prototype = function socketEmulator_prototype() {
    // Then create the traits and subclasses for this class here...

    // trait comes here...

    (function (_myTrait_) {
      var _eventOn;
      var _commands;

      // Initialize static variables here...

      /**
       * @param float t
       */
      _myTrait_.guid = function (t) {

        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      };

      /**
       * @param float t
       */
      _myTrait_.isArray = function (t) {
        return Object.prototype.toString.call(t) === '[object Array]';
      };

      /**
       * @param float fn
       */
      _myTrait_.isFunction = function (fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      };

      /**
       * @param float t
       */
      _myTrait_.isObject = function (t) {
        return t === Object(t);
      };
    })(this);

    // the subclass definition comes around here then

    // The class definition is here...
    var _clientSocket_prototype = function _clientSocket_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {
        var _eventOn;
        var _commands;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * Binds event name to event function
         * @param string en  - Event name
         * @param float ef
         */
        _myTrait_.on = function (en, ef) {
          if (!this._ev) this._ev = {};
          if (!this._ev[en]) this._ev[en] = [];

          this._ev[en].push(ef);

          if (en == 'connect' && this._connected) {
            ef(this._socket);
          }

          return this;
        };

        /**
         * @param float name
         * @param float fn
         */
        _myTrait_.removeListener = function (name, fn) {
          if (!this._ev) return;
          if (!this._ev[name]) return;

          var list = this._ev[name];

          for (var i = 0; i < list.length; i++) {
            if (list[i] == fn) {
              list.splice(i, 1);
              return;
            }
          }
        };

        /**
         * triggers event with data and optional function
         * @param string en
         * @param float data
         * @param float fn
         */
        _myTrait_.trigger = function (en, data, fn) {

          if (!this._ev) return;
          if (!this._ev[en]) return;
          var me = this;
          this._ev[en].forEach(function (cb) {
            cb(data, fn);
          });
          return this;
        };
      })(this);

      (function (_myTrait_) {
        var _channelIndex;
        var _rootData;
        var _callBacks;
        var _socketIndex;
        var _socketCnt;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.disconnect = function (t) {
          this._socket.messageTo({
            disconnect: true
          });
          me._connected = false;
        };

        /**
         * Emit data from client to server
         * @param String name  - Message name
         * @param Object data  - Data to be sent, Object or string
         * @param Function callBackFn  - Callback, message from the receiver
         */
        _myTrait_.emit = function (name, data, callBackFn) {

          var obj = {
            name: name,
            data: data
          };

          if (callBackFn) {
            obj._callBackId = this.guid();
            var me = this;
            var handleCb = function handleCb(data) {
              callBackFn(data);
              me.removeListener(obj._callBackId, handleCb);
            };
            this.on(obj._callBackId, handleCb);
          }

          this._socket.messageTo(obj);
        };

        /**
         * The enumerated socket, stating from 1
         * @param float t
         */
        _myTrait_.getEnum = function (t) {
          var myId = this.socketId;

          if (!_socketIndex[myId]) {
            _socketIndex[myId] = _socketCnt++;
          }
          return _socketIndex[myId];
        };

        /**
         * Returns GUID of the current socket.
         * @param float t
         */
        _myTrait_.getId = function (t) {
          return this.socketId;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (ip, port, realSocket) {

          // The socket ID must be told to the server side too

          if (!_socketIndex) {
            _socketIndex = {};
            _socketCnt = 1;
          }

          var me = this;
          var myId = this.guid();
          this.socketId = myId;

          if (!_socketIndex[this.socketId]) {
            _socketIndex[this.socketId] = _socketCnt++;
          }

          if (realSocket) {

            var whenConnected = function whenConnected() {
              console.log('whenConnected called');
              var openConnection = _tcpEmu(ip, port, 'openConnection', 'client', realSocket);
              var connection = _tcpEmu(ip, port, myId, 'client', realSocket);

              connection.on('clientMessage', function (o, v) {
                console.log('clientMessage received ', v);
                if (v.connected) {
                  me._socket = connection;
                  me._connected = true;
                  me.trigger('connect', connection);
                } else {
                  me.trigger(v.name, v.data);
                }
              });
              console.log('Sending message to _tcpEmu with real socket ');
              openConnection.messageTo({
                socketId: myId
              });
            };

            if (realSocket.connected) {
              console.log('realSocket was connected');
              whenConnected();
            } else {
              console.log('realSocket was not connected');
              realSocket.on('connect', whenConnected);
            }

            // this._connected
            return;
          }

          var openConnection = _tcpEmu(ip, port, 'openConnection', 'client', realSocket);
          var connection = _tcpEmu(ip, port, myId, 'client', realSocket);

          connection.on('clientMessage', function (o, v) {
            if (v.connected) {
              me._socket = connection;
              me._connected = true;
              me.trigger('connect', connection);
            } else {
              me.trigger(v.name, v.data);
            }
          });
          openConnection.messageTo({
            socketId: myId
          });
        });

        /**
         * A promisified interface of the &quot;emit&quot; for the _clientSocket
         * @param float name
         * @param float data
         */
        _myTrait_.send = function (name, data) {
          var me = this;
          return _promise(function (respFn) {
            me.emit(name, data, respFn);
          });
        };
      })(this);
    };

    var _clientSocket = function _clientSocket(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _clientSocket) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _clientSocket._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _clientSocket(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _clientSocket._classInfo = {
      name: '_clientSocket'
    };
    _clientSocket.prototype = new _clientSocket_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['_clientSocket'] = _clientSocket;
        this._clientSocket = _clientSocket;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['_clientSocket'] = _clientSocket;
      } else {
        this._clientSocket = _clientSocket;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var _serverSocket_prototype = function _serverSocket_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * Binds event name to event function
         * @param string en  - Event name
         * @param float ef
         */
        _myTrait_.on = function (en, ef) {
          if (!this._ev) this._ev = {};
          if (!this._ev[en]) this._ev[en] = [];

          this._ev[en].push(ef);

          return this;
        };

        /**
         * triggers event with data and optional function
         * @param string en
         * @param float data
         * @param float fn
         */
        _myTrait_.trigger = function (en, data, fn) {

          if (!this._ev) return;
          if (!this._ev[en]) return;
          var me = this;
          this._ev[en].forEach(function (cb) {
            cb(data, fn);
          });
          return this;
        };
      })(this);

      (function (_myTrait_) {
        var _channelIndex;
        var _rootData;
        var _clients;
        var _rooms;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.getPrefix = function (t) {
          return this._ip + ':' + this._port;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (ip, port, ioLib) {
          /*
          // This is how the server side should be operating...
          var io = require('socket.io')();
          io.on('connection', function(socket){
          socket.emit('an event', { some: 'data' });
          });
          */

          if (!_rooms) {
            _rooms = {};
            _clients = {};
          }

          var me = this;

          var sockets = [];

          this._ip = ip;
          this._port = port;

          if (ioLib) {
            ioLib.on('connection', function (socket) {

              console.log('socket.io got connection');
              console.log('ip, port', ip, port);

              var openConnection = _tcpEmu(ip, port, 'openConnection', 'server', socket);

              var myRealSocket;
              socket.on('disconnect', function () {
                console.log('ioLib at server sent disconnect');
                if (myRealSocket) myRealSocket.close();
              });

              openConnection.on('serverMessage', function (o, v) {

                if (v.socketId) {

                  var newSocket = _tcpEmu(ip, port, v.socketId, 'server', socket);
                  myRealSocket = newSocket;

                  var wrappedSocket = _serverSocketWrap(newSocket, me);
                  _clients[v.socketId] = wrappedSocket;
                  me.trigger('connect', wrappedSocket);

                  if (wrappedSocket.isConnected()) {
                    console.log('Trying to send the connected message back to client');
                    newSocket.messageFrom({
                      connected: true,
                      socketId: v.socketId
                    });
                  } else {
                    console.log('The socket was not connected');
                  }
                }
              });
            });
            return;
          }

          var openConnection = _tcpEmu(ip, port, 'openConnection', 'server');

          openConnection.on('serverMessage', function (o, v) {

            if (v.socketId) {
              //console.log("Trying to send msg to client ", v);
              var newSocket = _tcpEmu(ip, port, v.socketId, 'server');

              var socket = _serverSocketWrap(newSocket, me);
              _clients[v.socketId] = socket;
              me.trigger('connect', socket);
              me.trigger('connection', socket);

              if (socket.isConnected()) {

                newSocket.messageFrom({
                  connected: true,
                  socketId: v.socketId
                });
              }
            }
          });
        });
      })(this);
    };

    var _serverSocket = function _serverSocket(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _serverSocket) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _serverSocket._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _serverSocket(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _serverSocket._classInfo = {
      name: '_serverSocket'
    };
    _serverSocket.prototype = new _serverSocket_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['_serverSocket'] = _serverSocket;
        this._serverSocket = _serverSocket;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['_serverSocket'] = _serverSocket;
      } else {
        this._serverSocket = _serverSocket;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var _tcpEmu_prototype = function _tcpEmu_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * Binds event name to event function
         * @param string en  - Event name
         * @param float ef
         */
        _myTrait_.on = function (en, ef) {
          if (!this._ev) this._ev = {};
          if (!this._ev[en]) this._ev[en] = [];

          this._ev[en].push(ef);

          return this;
        };

        /**
         * triggers event with data and optional function
         * @param string en
         * @param float data
         * @param float fn
         */
        _myTrait_.trigger = function (en, data, fn) {

          if (!this._ev) return;
          if (!this._ev[en]) return;
          var me = this;
          this._ev[en].forEach(function (cb) {
            cb(me, data, fn);
          });
          return this;
        };
      })(this);

      // trait comes here...

      (function (_myTrait_) {
        var _eventOn;
        var _commands;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _channelIndex;
        var _rootData;
        var _msgBuffer;
        var _log;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.close = function (t) {
          this.trigger('disconnect');
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (server, port, socketId, role, socket) {

          var me = this;
          this._server = server;
          this._port = port;
          this._role = role;
          this._socketId = socketId;
          this._dbName = 'tcp://' + this._server + ':' + this._port + ':' + this._socketId;

          if (!_log) {
            if (typeof lokki != 'undefined') {
              _log = lokki('tcp');
            } else {
              _log = {
                log: function log() {},
                error: function error() {}
              };
            }
          }

          if (socket) {
            // "this._dbName" is the message which is listened using socketPump
            this._socket = socket;
            this.socketPump(role);
          } else {
            this.memoryPump(role);
          }
        });

        /**
         * The memory storage transform layer implementation.
         * @param float role
         */
        _myTrait_.memoryPump = function (role) {
          var me = this;
          var bnTo = this._dbName + ':to';
          var bnFrom = this._dbName + ':from';

          if (!_msgBuffer) _msgBuffer = {};
          if (!_msgBuffer[bnTo]) _msgBuffer[bnTo] = [];
          if (!_msgBuffer[bnFrom]) _msgBuffer[bnFrom] = [];

          var _mfn = function _mfn() {
            if (role == 'server') {
              var list = _msgBuffer[bnTo].slice();
              list.forEach(function (msg) {
                _log.log('server got message ', msg);
                me.trigger('serverMessage', msg);
                _msgBuffer[bnTo].shift();
              });
            }
            if (role == 'client') {
              var list = _msgBuffer[bnFrom].slice();
              list.forEach(function (msg) {
                me.trigger('clientMessage', msg);
                _msgBuffer[bnFrom].shift();
              });
            }
          };
          later().every(1 / 10, _mfn);
        };

        /**
         * Message &quot;from&quot; refers to client getting message from the server. This is the function to be used when a server sends data back to the client.
         * @param float msg
         */
        _myTrait_.messageFrom = function (msg) {
          var socket = this._socket;
          if (socket) {
            //console.log("The socket should emit to "+this._dbName);
            //console.log(msg);
            socket.emit(this._dbName, msg);
            return;
          }

          var bn = this._dbName + ':from';
          _msgBuffer[bn].push(msg);
        };

        /**
         * Message &quot;to&quot; refers to client sending message to server. This is the function to be used when a client socket sends data to the server.
         * @param float msg
         */
        _myTrait_.messageTo = function (msg) {

          var socket = this._socket;
          if (socket) {

            _log.log('_tcpEmu, emitting ', this._dbName, msg);
            socket.emit(this._dbName, msg);
            return;
          }

          var bn = this._dbName + ':to';
          _msgBuffer[bn].push(msg);
        };

        /**
         * The socket transform layer implementation.
         * @param float role
         */
        _myTrait_.socketPump = function (role) {
          var me = this;

          var socket = this._socket;
          if (role == 'server') {

            _log.log('initializing the socketPump for server');
            socket.on(this._dbName, function (data) {
              _log.log('socketPump', me._dbName);
              me.trigger('serverMessage', data);
            });
          }
          if (role == 'client') {
            socket.on(this._dbName, function (data) {
              me.trigger('clientMessage', data);
            });
          }
        };
      })(this);
    };

    var _tcpEmu = function _tcpEmu(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _tcpEmu) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _tcpEmu._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _tcpEmu(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _tcpEmu._classInfo = {
      name: '_tcpEmu'
    };
    _tcpEmu.prototype = new _tcpEmu_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var later_prototype = function later_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _initDone;
        var _callers;
        var _oneTimers;
        var _everies;
        var _framers;

        // Initialize static variables here...

        /**
         * @param function fn
         * @param float thisObj
         * @param float args
         */
        _myTrait_.add = function (fn, thisObj, args) {
          if (thisObj || args) {
            var tArgs;
            if (Object.prototype.toString.call(args) === '[object Array]') {
              tArgs = args;
            } else {
              tArgs = Array.prototype.slice.call(arguments, 2);
              if (!tArgs) tArgs = [];
            }
            _callers.push([thisObj, fn, tArgs]);
          } else {
            _callers.push(fn);
          }
        };

        /**
         * @param function fn
         */
        _myTrait_.asap = function (fn) {
          this.add(fn);
        };

        /**
         * @param float seconds
         * @param float fn
         * @param float name
         */
        _myTrait_.every = function (seconds, fn, name) {

          if (!name) {
            name = 'time' + new Date().getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0
          };
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (interval, fn) {
          if (!_initDone) {

            var frame, cancelFrame;

            this.polyfill();

            if (typeof window != 'undefined') {
              var frame = window['requestAnimationFrame'],
                  cancelFrame = window['cancelRequestAnimationFrame'];
              ['', 'ms', 'moz', 'webkit', 'o'].forEach(function (x) {
                if (!frame) {
                  frame = window[x + 'RequestAnimationFrame'];
                  cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                }
              });
            }

            if (!frame) frame = function (cb) {
              return setTimeout(cb, 16);
            };

            if (!cancelFrame) cancelFrame = function (id) {
              clearTimeout(id);
            };

            _callers = [];
            _oneTimers = {};
            _everies = {};
            _framers = [];
            var lastMs = 0;

            var _callQueQue = function _callQueQue() {
              var ms = new Date().getTime();
              var fn;
              while (fn = _callers.shift()) {
                if (Object.prototype.toString.call(fn) === '[object Array]') {
                  fn[1].apply(fn[0], fn[2]);
                } else {
                  fn();
                }
              }

              for (var i = 0; i < _framers.length; i++) {
                var fFn = _framers[i];
                fFn();
              }

              for (var n in _oneTimers) {
                if (_oneTimers.hasOwnProperty(n)) {
                  var v = _oneTimers[n];
                  v[0](v[1]);
                  delete _oneTimers[n];
                }
              }

              for (var n in _everies) {
                if (_everies.hasOwnProperty(n)) {
                  var v = _everies[n];
                  if (v.nextTime < ms) {
                    v.fn();
                    v.nextTime = ms + v.step;
                  }
                  if (v.until) {
                    if (v.until < ms) {
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
        });

        /**
         * @param  key
         * @param float fn
         * @param float value
         */
        _myTrait_.once = function (key, fn, value) {
          // _oneTimers

          _oneTimers[key] = [fn, value];
        };

        /**
         * @param function fn
         */
        _myTrait_.onFrame = function (fn) {

          _framers.push(fn);
        };

        /**
         * @param float t
         */
        _myTrait_.polyfill = function (t) {};

        /**
         * @param float fn
         */
        _myTrait_.removeFrameFn = function (fn) {

          var i = _framers.indexOf(fn);
          if (i >= 0) {
            if (fn._onRemove) {
              fn._onRemove();
            }
            _framers.splice(i, 1);
            return true;
          } else {
            return false;
          }
        };
      })(this);
    };

    var later = function later(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof later) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new later(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    later._classInfo = {
      name: 'later'
    };
    later.prototype = new later_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _serverSocketWrap_prototype = function _serverSocketWrap_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * Binds event name to event function
         * @param string en  - Event name
         * @param float ef
         */
        _myTrait_.on = function (en, ef) {
          if (!this._ev) this._ev = {};
          if (!this._ev[en]) this._ev[en] = [];

          this._ev[en].push(ef);

          return this;
        };

        /**
         * triggers event with data and optional function
         * @param string en
         * @param float data
         * @param float fn
         */
        _myTrait_.trigger = function (en, data, fn) {

          if (!this._ev) return;
          if (!this._ev[en]) return;
          var me = this;
          this._ev[en].forEach(function (cb) {
            cb(data, fn);
          });
          return this;
        };
      })(this);

      (function (_myTrait_) {
        var _channelIndex;
        var _rootData;
        var _rooms;
        var _socketRooms;

        // Initialize static variables here...

        /**
         * @param float roomName
         * @param float name
         * @param float data
         */
        _myTrait_.delegateToRoom = function (roomName, name, data) {

          var realRoomName = this._roomPrefix + ':' + roomName;

          if (_rooms && _rooms[realRoomName]) {
            var me = this;
            _rooms[realRoomName].forEach(function (socket) {
              if (socket != me) {
                socket.emit(name, data);
              }
            });
          }
        };

        /**
         * @param float t
         */
        _myTrait_.disconnect = function (t) {
          var me = this;
          me._disconnected = true;

          console.log('_serverSocketWrap disconnecting');

          me.leaveFromRooms();
          console.log('_serverSocketWrap left from rooms');
          me.trigger('disconnect', me);
          // Then remove the socket from the listeners...
          me._disconnected = true;

          // TODO: check if the code below could be defined in a cross-platform way
          /*
          var dbName = this._tcp._dbName;
          if(typeof(_localDB) != "undefined") {
          _localDB().clearDatabases( function(d) {
          if(d.name==dbName) return true;
          });
          }
          */

          return;
        };

        /**
         * @param float name
         * @param float value
         */
        _myTrait_.emit = function (name, value) {

          this._tcp.messageFrom({
            name: name,
            data: value
          });
        };

        /**
         * @param float t
         */
        _myTrait_.getId = function (t) {
          return this._tcp._socketId;
        };

        /**
         * @param float t
         */
        _myTrait_.getUserId = function (t) {

          return this._userId;
        };

        /**
         * @param float t
         */
        _myTrait_.getUserRoles = function (t) {

          return this._roles;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (tcpEmu, server, isReal) {

          var me = this;
          this._roomPrefix = server.getPrefix();
          this._server = server;
          this._tcp = tcpEmu;

          tcpEmu.on('disconnect', function () {
            console.log('tcpEmu sent disconnect');
            me.disconnect();
          });

          var disconnected = false;
          tcpEmu.on('serverMessage', function (o, v) {

            if (me._disconnected) return; // not good enough

            if (v.disconnect) {
              me.disconnect();
              return;
            }
            if (v._callBackId) {
              me.trigger(v.name, v.data, function (data) {
                me.emit(v._callBackId, data);
              });
            } else {
              me.trigger(v.name, v.data);
            }
          });

          this.broadcast = {
            to: function to(room) {
              return {
                emit: function emit(name, value) {
                  me.delegateToRoom(room, name, value);
                }
              };
            }
          }

          /*
          socket.broadcast.to(_ctx.channelId).emit('ctxupd_'+_ctx.channelId, cObj);
          */

          ;
        });

        /**
         * @param float t
         */
        _myTrait_.isConnected = function (t) {
          if (this._disconnected) return false;
          return true;
        };

        /**
         * @param float roomName
         */
        _myTrait_.isInRoom = function (roomName) {
          if (!_socketRooms) return false;
          return _socketRooms[this.getId()].indexOf(roomName) >= 0;
        };

        /**
         * Adds a new client to some room
         * @param String roomName
         */
        _myTrait_.join = function (roomName) {

          var realRoomName = this._roomPrefix + ':' + roomName;

          if (!_rooms) _rooms = {};
          if (!_rooms[realRoomName]) _rooms[realRoomName] = [];

          if (_rooms[realRoomName].indexOf(this) < 0) {
            _rooms[realRoomName].push(this);
            if (!_socketRooms) _socketRooms = {};
            if (!_socketRooms[this.getId()]) _socketRooms[this.getId()] = [];

            _socketRooms[this.getId()].push(roomName);
          }
        };

        /**
         * @param float roomName
         */
        _myTrait_.leave = function (roomName) {

          var realRoomName = this._roomPrefix + ':' + roomName;

          if (!_rooms) _rooms = {};
          if (!_rooms[realRoomName]) _rooms[realRoomName] = [];

          var i;
          if ((i = _rooms[realRoomName].indexOf(this)) >= 0) {
            _rooms[realRoomName].splice(i, 1);
            var id = this.getId();

            var i2 = _socketRooms[id].indexOf(roomName);
            if (i2 >= 0) _socketRooms[id].splice(i2, 1);
          }
        };

        /**
         * @param float socket
         */
        _myTrait_.leaveFromRooms = function (socket) {
          var id = this.getId();
          var me = this;

          if (!_socketRooms) return;
          if (!_socketRooms[id]) return;

          _socketRooms[id].forEach(function (name) {
            me.leave(name);
          });
        };

        /**
         * @param float t
         */
        _myTrait_.removeListener = function (t) {};

        /**
         * Each socket can have and in many implementations must have some userID and role, which can be used together with the ACL implementations.
         * @param float userId
         * @param float roles
         */
        _myTrait_.setAuthInfo = function (userId, roles) {

          this._userId = userId;
          this._roles = roles;
        };

        /**
         * @param string roomName
         */
        _myTrait_.to = function (roomName) {

          var realRoomName = this._roomPrefix + ':' + roomName;

          return {
            emit: function emit(name, data) {
              console.log(' emit called ');
              if (_rooms && _rooms[realRoomName]) {
                _rooms[realRoomName].forEach(function (socket) {
                  console.log(' emit with ', name, data);
                  socket.emit(name, data);
                });
              }
            }
          };
        };
      })(this);
    };

    var _serverSocketWrap = function _serverSocketWrap(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _serverSocketWrap) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _serverSocketWrap._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _serverSocketWrap(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _serverSocketWrap._classInfo = {
      name: '_serverSocketWrap'
    };
    _serverSocketWrap.prototype = new _serverSocketWrap_prototype();

    (function (_myTrait_) {
      var _initDone;

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (host, bUseReal) {});
    })(this);
  };

  var socketEmulator = function socketEmulator(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof socketEmulator) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != socketEmulator._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new socketEmulator(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  socketEmulator._classInfo = {
    name: 'socketEmulator'
  };
  socketEmulator.prototype = new socketEmulator_prototype();

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());

// --- let's not ---

// TODO: not implemented yet

// var socket = io('http://localhost');