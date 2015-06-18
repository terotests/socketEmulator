var _socketEmu_prototype = function() {
  'use strict';
  var _clientSocket_prototype = function() {;
    (function(_myTrait_) {
      _myTrait_.on = function(en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);

        return this;
      }
      _myTrait_.removeListener = function(name, fn) {
        if (!this._ev) return;
        if (!this._ev[name]) return;

        var list = this._ev[name];

        for (var i = 0; i < list.length; i++) {
          if (list[i] == fn) {
            list.splice(i, 1);
            return;
          }
        }

      }
      _myTrait_.trigger = function(en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function(cb) {
          cb(data, fn)
        });
        return this;
      }
    }(this));;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _channelIndex;
      var _rootData;
      var _callBacks;
      _myTrait_.disconnect = function(t) {
        this._socket.messageTo({
          disconnect: true
        });
      }
      _myTrait_.emit = function(name, data, callBackFn) {

        var obj = {
          name: name,
          data: data
        }

        if (callBackFn) {
          obj._callBackId = this.guid();
          var me = this;
          var handleCb = function(data) {
            callBackFn(data);
            me.removeListener(obj._callBackId, handleCb);
          }
          this.on(obj._callBackId, handleCb)
        }

        this._socket.messageTo(obj);
      }
      _myTrait_.getId = function(t) {
        return this.socketId;
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(ip, port, socketId) {

        // The socket ID must be told to the server side too

        var myId = socketId || this.guid();
        var me = this;
        var openConnection = _tcpEmu(ip, port, "openConnection", "client");
        var connection = _tcpEmu(ip, port, myId, "client");

        this.socketId = myId;

        connection.on("clientMessage", function(o, v) {

          if (v.connected) {
            me._socket = connection;
            me.trigger("connect", connection);
          } else {
            me.trigger(v.name, v.data);
          }

        })

        openConnection.messageTo({
          socketId: myId
        });


      });
    }(this));
  }
  var _clientSocket = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _clientSocket) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _clientSocket._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _clientSocket(a, b, c, d, e, f, g, h);
  };
  _clientSocket._classInfo = {
    name: '_clientSocket'
  };
  _clientSocket.prototype = new _clientSocket_prototype();
  if (typeof(window) != 'undefined') window['_clientSocket'] = _clientSocket;
  if (typeof(window) != 'undefined') window['_clientSocket_prototype'] = _clientSocket_prototype;
  var _serverSocket_prototype = function() {;
    (function(_myTrait_) {
      _myTrait_.on = function(en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);

        return this;
      }
      _myTrait_.trigger = function(en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function(cb) {
          cb(data, fn)
        });
        return this;
      }
    }(this));;
    (function(_myTrait_) {
      var _channelIndex;
      var _rootData;
      var _clients;
      var _rooms;
      _myTrait_.emit = function(t) {

      }
      _myTrait_.getPrefix = function(t) {
        return this._ip + ":" + this._port;
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(ip, port) {
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

        var sockets = [];
        var me = this;

        this._ip = ip;
        this._port = port;

        var openConnection = _tcpEmu(ip, port, "openConnection", "server");

        openConnection.on("serverMessage", function(o, v) {
          console.log("Server got message ", v);
          if (v.socketId) {
            //console.log("Trying to send msg to client ", v);
            var newSocket = _tcpEmu(ip, port, v.socketId, "server");

            var socket = _serverSocketWrap(newSocket, me);
            _clients[v.socketId] = socket;
            me.trigger("connect", socket);

            if (socket.isConnected()) {

              newSocket.messageFrom({
                connected: true,
                socketId: v.socketId
              });
            }
          }
        })

      });
      _myTrait_.join = function(t) {

      }
      _myTrait_.removeListener = function(t) {

      }
    }(this));
  }
  var _serverSocket = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _serverSocket) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _serverSocket._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _serverSocket(a, b, c, d, e, f, g, h);
  };
  _serverSocket._classInfo = {
    name: '_serverSocket'
  };
  _serverSocket.prototype = new _serverSocket_prototype();
  if (typeof(window) != 'undefined') window['_serverSocket'] = _serverSocket;
  if (typeof(window) != 'undefined') window['_serverSocket_prototype'] = _serverSocket_prototype;
  var _tcpEmu_prototype = function() {;
    (function(_myTrait_) {
      _myTrait_.on = function(en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);

        return this;
      }
      _myTrait_.trigger = function(en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function(cb) {
          cb(me, data, fn)
        });
        return this;
      }
    }(this));;
    (function(_myTrait_) {
      var _eventOn;
      var _commands;
      _myTrait_.guid = function(t) {

        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

      }
      _myTrait_.isArray = function(t) {

        if (typeof(t) == "undefined") return this.__isA;

        return Object.prototype.toString.call(t) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(t) {

        if (typeof(t) == "undefined") return this.__isO;

        return t === Object(t);
      }
    }(this));;
    (function(_myTrait_) {
      var _channelIndex;
      var _rootData;
      var _msgBuffer;
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(server, port, socketId, role) {

        var me = this;
        this._server = server;
        this._port = port;
        this._socketId = socketId;
        this._dbName = "tcp://" + this._server + ":" + this._port + ":" + this._socketId;

        var bnTo = this._dbName + ":to";
        var bnFrom = this._dbName + ":from";

        if (!_msgBuffer) _msgBuffer = {};
        if (!_msgBuffer[bnTo]) _msgBuffer[bnTo] = [];
        if (!_msgBuffer[bnFrom]) _msgBuffer[bnFrom] = [];

        // Check for new messages to the client or server
        later().every(1 / 10, function() {

          if (role == "server") {

            var list = _msgBuffer[bnTo].slice();
            list.forEach(function(msg) {
              me.trigger("serverMessage", msg);
              _msgBuffer[bnTo].shift();
            });

          }
          if (role == "client") {
            var list = _msgBuffer[bnFrom].slice();
            list.forEach(function(msg) {
              me.trigger("clientMessage", msg);
              _msgBuffer[bnFrom].shift();
            });
          }

        });

      });
      _myTrait_.messageFrom = function(msg) {
        var bn = this._dbName + ":from";
        _msgBuffer[bn].push(msg);


      }
      _myTrait_.messageTo = function(msg) {
        var bn = this._dbName + ":to";
        _msgBuffer[bn].push(msg);

      }
    }(this));
  }
  var _tcpEmu = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _tcpEmu) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _tcpEmu._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _tcpEmu(a, b, c, d, e, f, g, h);
  };
  _tcpEmu._classInfo = {
    name: '_tcpEmu'
  };
  _tcpEmu.prototype = new _tcpEmu_prototype();
  if (typeof(window) != 'undefined') window['_tcpEmu'] = _tcpEmu;
  if (typeof(window) != 'undefined') window['_tcpEmu_prototype'] = _tcpEmu_prototype;
  var later_prototype = function() {;
    (function(_myTrait_) {
      var _initDone;
      var _callers;
      var _oneTimers;
      var _everies;
      var _framers;
      _myTrait_.add = function(fn, thisObj, args) {
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
      }
      _myTrait_.asap = function(fn) {
        this.add(fn);

      }
      _myTrait_.every = function(seconds, fn, name) {

        if (!name) {
          name = "time" + (new Date()).getTime() + Math.random(10000000);
        }

        _everies[name] = {
          step: Math.floor(seconds * 1000),
          fn: fn,
          nextTime: 0
        };
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(interval, fn) {
        if (!_initDone) {

          var frame, cancelFrame;

          this.polyfill();

          if (typeof(window) != "undefined") {
            var frame = window['requestAnimationFrame'],
              cancelFrame = window['cancelRequestAnimationFrame'];
            ['', 'ms', 'moz', 'webkit', 'o'].forEach(function(x) {
              if (!frame) {
                frame = window[x + 'RequestAnimationFrame'];
                cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
              }
            });
          }

          if (!frame)
            frame = function(cb) {
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
      _myTrait_.once = function(key, fn, value) {
        // _oneTimers

        _oneTimers[key] = [fn, value];
      }
      _myTrait_.onFrame = function(fn) {

        _framers.push(fn);
      }
      _myTrait_.polyfill = function(t) {
        // --- let's not ---
      }
      _myTrait_.removeFrameFn = function(fn) {

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
      }
    }(this));
  }
  var later = function(a, b, c, d, e, f, g, h) {
    if (this instanceof later) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new later(a, b, c, d, e, f, g, h);
  };
  later._classInfo = {
    name: 'later'
  };
  later.prototype = new later_prototype();
  var _serverSocketWrap_prototype = function() {;
    (function(_myTrait_) {
      _myTrait_.on = function(en, ef) {
        if (!this._ev) this._ev = {};
        if (!this._ev[en]) this._ev[en] = [];

        this._ev[en].push(ef);

        return this;
      }
      _myTrait_.trigger = function(en, data, fn) {

        if (!this._ev) return;
        if (!this._ev[en]) return;
        var me = this;
        this._ev[en].forEach(function(cb) {
          cb(data, fn)
        });
        return this;
      }
    }(this));;
    (function(_myTrait_) {
      var _channelIndex;
      var _rootData;
      var _rooms;
      var _socketRooms;
      _myTrait_.delegateToRoom = function(roomName, name, data) {

        var realRoomName = this._roomPrefix + ":" + roomName;

        if (_rooms && _rooms[realRoomName]) {
          var me = this;
          _rooms[realRoomName].forEach(function(socket) {
            if (socket != me) {
              socket.emit(name, data);
            }
          })
        }
      }
      _myTrait_.disconnect = function(t) {
        var me = this;
        me._disconnected = true;
        me.leaveFromRooms();
        me.trigger("disconnect", me);
        // Then remove the socket from the listeners...
        me._disconnected = true;

        var dbName = this._tcp._dbName;

        _localDB().clearDatabases(function(d) {
          if (d.name == dbName) return true;
        });

        return;
      }
      _myTrait_.emit = function(name, value) {

        this._tcp.messageFrom({
          name: name,
          data: value
        });
      }
      _myTrait_.getId = function(t) {
        return this._tcp._socketId;
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(tcpEmu, server) {

        var me = this;
        this._roomPrefix = server.getPrefix();
        this._tcp = tcpEmu;
        this._server = server;
        var disconnected = false;
        tcpEmu.on("serverMessage", function(o, v) {

          if (me._disconnected) return; // not good enough

          if (v.disconnect) {
            me.disconnect();
            return;
          }
          if (v._callBackId) {
            me.trigger(v.name, v.data, function(data) {
              me.emit(v._callBackId, data);
            });
          } else {
            me.trigger(v.name, v.data);
          }
        })

        this.broadcast = {
          to: function(room) {
            return {
              emit: function(name, value) {
                me.delegateToRoom(room, name, value);
              }
            }
          }
        }

        /*
socket.broadcast.to(_ctx.channelId).emit('ctxupd_'+_ctx.channelId, cObj);
*/

      });
      _myTrait_.isConnected = function(t) {
        if (this._disconnected) return false;
        return true;
      }
      _myTrait_.join = function(roomName) {

        var realRoomName = this._roomPrefix + ":" + roomName;

        if (!_rooms) _rooms = {};
        if (!_rooms[realRoomName]) _rooms[realRoomName] = [];

        if (_rooms[realRoomName].indexOf(this) < 0) {
          _rooms[realRoomName].push(this);
          if (!_socketRooms) _socketRooms = {};
          if (!_socketRooms[this.getId()]) _socketRooms[this.getId()] = [];

          _socketRooms[this.getId()].push(roomName);
        }
      }
      _myTrait_.leave = function(roomName) {

        var realRoomName = this._roomPrefix + ":" + roomName;

        if (!_rooms) _rooms = {};
        if (!_rooms[realRoomName]) _rooms[realRoomName] = [];

        var i;
        if ((i = _rooms[realRoomName].indexOf(this)) >= 0) {
          _rooms[realRoomName].splice(i, 1);
          var id = this.getId();

          var i2 = _socketRooms[id].indexOf(roomName);
          if (i2 >= 0) _socketRooms[id].splice(i2, 1);
        }


      }
      _myTrait_.leaveFromRooms = function(socket) {
        var id = this.getId();
        var me = this;

        if (!_socketRooms) return;
        if (!_socketRooms[id]) return;

        _socketRooms[id].forEach(function(name) {
          me.leave(name);
        });
      }
      _myTrait_.removeListener = function(t) {

      }
    }(this));
  }
  var _serverSocketWrap = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _serverSocketWrap) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _serverSocketWrap._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (this.__traitInit) {
        var m = this;
        this.__traitInit.forEach(function(initF) {
          initF.apply(m, args);
        })
      } else {
        if (typeof this.init == 'function')
          this.init.apply(this, args);
      }
    } else return new _serverSocketWrap(a, b, c, d, e, f, g, h);
  };
  _serverSocketWrap._classInfo = {
    name: '_serverSocketWrap'
  };
  _serverSocketWrap.prototype = new _serverSocketWrap_prototype();
  if (typeof(window) != 'undefined') window['_serverSocketWrap'] = _serverSocketWrap;
  if (typeof(window) != 'undefined') window['_serverSocketWrap_prototype'] = _serverSocketWrap_prototype;;
  (function(_myTrait_) {
    var _eventOn;
    var _commands;
    _myTrait_.guid = function(t) {

      return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

    }
    _myTrait_.isArray = function(t) {

      if (typeof(t) == "undefined") return this.__isA;

      return Object.prototype.toString.call(t) === '[object Array]';
    }
    _myTrait_.isFunction = function(fn) {
      return Object.prototype.toString.call(fn) == '[object Function]';
    }
    _myTrait_.isObject = function(t) {

      if (typeof(t) == "undefined") return this.__isO;

      return t === Object(t);
    }
  }(this));;
  (function(_myTrait_) {
    var _initDone;
    if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
      _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
    if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
    _myTrait_.__traitInit.push(function(host) {

      // var socket = io('http://localhost');


    });
  }(this));
}
var _socketEmu = function(a, b, c, d, e, f, g, h) {
  if (this instanceof _socketEmu) {
    var args = [a, b, c, d, e, f, g, h];
    if (this.__factoryClass) {
      var m = this;
      var res;
      this.__factoryClass.forEach(function(initF) {
        res = initF.apply(m, args);
      });
      if (Object.prototype.toString.call(res) == '[object Function]') {
        if (res._classInfo.name != _socketEmu._classInfo.name) return new res(a, b, c, d, e, f, g, h);
      } else {
        if (res) return res;
      }
    }
    if (this.__traitInit) {
      var m = this;
      this.__traitInit.forEach(function(initF) {
        initF.apply(m, args);
      })
    } else {
      if (typeof this.init == 'function')
        this.init.apply(this, args);
    }
  } else return new _socketEmu(a, b, c, d, e, f, g, h);
};
_socketEmu._classInfo = {
  name: '_socketEmu'
};
_socketEmu.prototype = new _socketEmu_prototype();
if (typeof(window) != 'undefined') window['_socketEmu'] = _socketEmu;
if (typeof(window) != 'undefined') window['_socketEmu_prototype'] = _socketEmu_prototype;