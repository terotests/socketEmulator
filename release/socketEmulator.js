var _socketEmu_prototype = function() {
  'use strict';
  var _promise_prototype = function() {
    'use strict';
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
        _myTrait_.after = function(seconds, fn, name) {

          if (!name) {
            name = "time" + (new Date()).getTime() + Math.random(10000000);
          }

          _everies[name] = {
            step: Math.floor(seconds * 1000),
            fn: fn,
            nextTime: 0,
            remove: true
          };
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

            this.polyfill();

            var frame, cancelFrame;
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
                    if (v.remove) {
                      if (v.nextTime > 0) {
                        v.fn();
                        delete _everies[n];
                      } else {
                        v.nextTime = ms + v.step;
                      }
                    } else {
                      v.fn();
                      v.nextTime = ms + v.step;
                    }
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
    if (typeof(window) != 'undefined') window['later'] = later;
    if (typeof(window) != 'undefined') window['later_prototype'] = later_prototype;;
    (function(_myTrait_) {
      _myTrait_.isArray = function(someVar) {
        return Object.prototype.toString.call(someVar) === '[object Array]';
      }
      _myTrait_.isFunction = function(fn) {
        return Object.prototype.toString.call(fn) == '[object Function]';
      }
      _myTrait_.isObject = function(obj) {
        return obj === Object(obj);
      }
    }(this));;
    (function(_myTrait_) {
      _myTrait_.all = function(firstArg) {

        var args;
        if (this.isArray(firstArg)) {
          args = firstArg;
        } else {
          args = Array.prototype.slice.call(arguments, 0);
        }
        // console.log(args);
        var targetLen = args.length,
          rCnt = 0,
          myPromises = [],
          myResults = new Array(targetLen);

        return this.then(
          function() {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[index] = v;
                  // console.log("Got a promise...",b, " cnt = ", rCnt);
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });





      }
      _myTrait_.collect = function(collectFn, promiseList, results) {

        var args;
        if (this.isArray(promiseList)) {
          args = promiseList;
        } else {
          args = [promiseList];
        }

        // console.log(args);
        var targetLen = args.length,
          isReady = false,
          noMore = false,
          rCnt = 0,
          myPromises = [],
          myResults = results || {};

        return this.then(
          function() {

            var allPromise = _promise();
            args.forEach(function(b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if ((isReady && !noMore) || (noMore == false && targetLen == rCnt)) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });

      }
      _myTrait_.fail = function(fn) {
        return this.then(null, fn);
      }
      _myTrait_.fulfill = function(withValue) {
        // if(this._fulfilled || this._rejected) return;

        if (this._rejected) return;
        if (this._fulfilled && withValue != this._stateValue) {
          return;
        }

        var me = this;
        this._fulfilled = true;
        this._stateValue = withValue;

        var chCnt = this._childPromises.length;

        while (chCnt--) {
          var p = this._childPromises.shift();
          if (p._onFulfill) {
            try {
              var x = p._onFulfill(withValue);
              // console.log("Returned ",x);
              if (typeof(x) != "undefined") {
                p.resolve(x);
              } else {
                p.fulfill(withValue);
              }
            } catch (e) {
              // console.error(e);
              /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
              p.reject(e);
            }
          } else {
            /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
            p.fulfill(withValue);
          }
        };
        // this._childPromises.length = 0;
        this._state = 1;
        this.triggerStateChange();

      }
      _myTrait_.genPlugin = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            console.log("Plugin args", args);
            var myPromise = _promise();
            this.then(function(v) {
              var args2 = Array.prototype.slice.call(arguments, 0);
              var z = args.concat(args2);
              var res = fn.apply(this, z);
              myPromise.resolve(res);
            }, function(r) {
              myPromise.reject(r);
            });
            return myPromise;

          }
        );
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(onFulfilled, onRejected) {
        // 0 = pending
        // 1 = fullfilled
        // 2 = error

        this._state = 0;
        this._stateValue = null;
        this._isAPromise = true;
        this._childPromises = [];

        if (this.isFunction(onFulfilled))
          this._onFulfill = onFulfilled;
        if (this.isFunction(onRejected))
          this._onReject = onRejected;

        if (!onRejected && this.isFunction(onFulfilled)) {



          var me = this;
          later().asap(
            function() {
              console.log("--- calling the onFulfilled ");
              onFulfilled(function(v) {
                me.resolve(v)
              }, function(v) {
                me.resolve(v);
              });
            });

        }
      });
      _myTrait_.isFulfilled = function(t) {
        return this._state == 1;
      }
      _myTrait_.isPending = function(t) {
        return this._state == 0;
      }
      _myTrait_.isRejected = function(v) {
        return this._state == 2;
      }
      _myTrait_.nodeStyle = function(fname, fn) {
        var me = this;
        this.plugin(fname,
          function() {
            var args = Array.prototype.slice.call(arguments, 0);
            var last, userCb, cbIndex = 0;
            if (args.length >= 0) {
              last = args[args.length - 1];
              if (Object.prototype.toString.call(last) == '[object Function]') {
                userCb = last;
                cbIndex = args.length - 1;
              }
            }

            var mainPromise = wishes().pending();
            this.then(function() {
              var nodePromise = wishes().pending();
              var args2 = Array.prototype.slice.call(arguments, 0);
              console.log("Orig args", args);
              console.log("Then args", args2);
              var z;
              if (args.length == 0)
                z = args2;
              if (args2.length == 0)
                z = args;
              if (!z) z = args2.concat(args);
              cbIndex = z.length; // 0,fn... 2
              if (userCb) cbIndex--;
              z[cbIndex] = function(err) {
                if (err) {
                  console.log("Got error ", err);
                  nodePromise.reject(err);
                  mainPromise.reject(err);
                  return;
                }
                if (userCb) {
                  var args = Array.prototype.slice.call(arguments);
                  var res = userCb.apply(this, args);
                  mainPromise.resolve(res);
                } else {
                  var args = Array.prototype.slice.call(arguments, 1);
                  mainPromise.resolve.apply(mainPromise, args);
                }
              }
              nodePromise.then(function(v) {
                mainPromise.resolve(v);
              });

              console.log("nodeStyle after concat", z);
              var res = fn.apply(this, z);
              // myPromise.resolve(res);
              // return nodePromise;
              return nodePromise;
            }, function(v) {
              mainPromise.reject(v);
            });
            return mainPromise;
            /*
                      log("..... now waiting "+ms);
                      var p = waitFor(ms);
                      p.then( function(v) {
                          myPromise.resolve(v);
                      });
                  */
          }
        );
      }
      _myTrait_.onStateChange = function(fn) {

        if (!this._listeners)
          this._listeners = [];

        this._listeners.push(fn);
      }
      _myTrait_.plugin = function(n, fn) {

        _myTrait_[n] = fn;

        return this;
      }
      _myTrait_.props = function(obj) {
        var args = [];

        for (var n in obj) {
          if (obj.hasOwnProperty(n)) {
            args.push({
              name: n,
              promise: obj[n]
            });
          }
        }


        // console.log(args);
        var targetLen = args.length,
          rCnt = 0,
          myPromises = [],
          myResults = {};

        return this.then(
          function() {

            var allPromise = wishes().pending();
            args.forEach(function(def) {
              var b = def.promise,
                name = def.name;
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function(v) {
                  myResults[name] = v;
                  rCnt++;
                  if (rCnt == targetLen) {
                    allPromise.resolve(myResults);
                  }
                }, function(v) {
                  allPromise.reject(v);
                });

              } else {
                allPromise.reject("Not list of promises");
              }
            })

            return allPromise;

          });

      }
      _myTrait_.reject = function(withReason) {

        // if(this._rejected || this._fulfilled) return;

        // conso

        if (this._fulfilled) return;
        if (this._rejected && withReason != this._rejectReason) return;


        this._state = 2;
        this._rejected = true;
        this._rejectReason = withReason;
        var me = this;

        var chCnt = this._childPromises.length;
        while (chCnt--) {
          var p = this._childPromises.shift();

          if (p._onReject) {
            try {
              p._onReject(withReason);
              p.reject(withReason);
            } catch (e) {
              /*
                           If either onFulfilled or onRejected throws an exception e, promise2 
                           must be rejected with e as the reason.            
                       */
              p.reject(e);
            }
          } else {
            /*
                       If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
                       fulfilled with the same value as promise1        
                   */
            p.reject(withReason);
          }
        };

        // this._childPromises.length = 0;
        this.triggerStateChange();

      }
      _myTrait_.rejectReason = function(reason) {
        if (reason) {
          this._rejectReason = reason;
          return;
        }
        return this._rejectReason;
      }
      _myTrait_.resolve = function(x) {

        // console.log("Resolving ", x);

        // can not do this many times...
        if (this._state > 0) return;

        if (x == this) {
          // error
          this._rejectReason = "TypeError";
          this.reject(this._rejectReason);
          return;
        }

        if (this.isObject(x) && x._isAPromise) {

          // 
          this._state = x._state;
          this._stateValue = x._stateValue;
          this._rejectReason = x._rejectReason;
          // ... 
          if (this._state === 0) {
            var me = this;
            x.onStateChange(function() {
              if (x._state == 1) {
                // console.log("State change");
                me.resolve(x.value());
              }
              if (x._state == 2) {
                me.reject(x.rejectReason());
              }
            });
          }
          if (this._state == 1) {
            // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
            this.fulfill(this._stateValue);
          }
          if (this._state == 2) {
            // console.log("Relved to be Promise was rejected ", x._rejectReason);
            this.reject(this._rejectReason);
          }
          return;
        }
        if (this.isObject(x) && x.then && this.isFunction(x.then)) {
          // console.log("Thenable ", x);
          var didCall = false;
          try {
            // Call the x.then
            var me = this;
            x.then.call(x,
              function(y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              },
              function(r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
          } catch (e) {
            if (!didCall) this.reject(e);
          }
          return;
        }
        this._state = 1;
        this._stateValue = x;

        // fulfill the promise...
        this.fulfill(x);

      }
      _myTrait_.state = function(newState) {
        if (typeof(newState) != "undefined") {
          this._state = newState;
        }
        return this._state;
      }
      _myTrait_.then = function(onFulfilled, onRejected) {

        if (!onRejected) onRejected = function() {};

        var p = new _promise(onFulfilled, onRejected);
        var me = this;

        if (this._state == 1) {
          later().asap(function() {
            me.fulfill(me.value());
          });
        }
        if (this._state == 2) {
          ater().asap(function() {
            me.reject(me.rejectReason());
          });
        }
        this._childPromises.push(p);
        return p;



      }
      _myTrait_.triggerStateChange = function(t) {
        var me = this;
        if (!this._listeners) return;
        this._listeners.forEach(function(fn) {
          fn(me);
        });
        // one-timer
        this._listeners.length = 0;
      }
      _myTrait_.value = function(v) {
        if (typeof(v) != "undefined") {
          this._stateValue = v;
          return this;
        }
        return this._stateValue;
      }
    }(this));
  }
  var _promise = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _promise) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
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
    } else return new _promise(a, b, c, d, e, f, g, h);
  };
  _promise._classInfo = {
    name: '_promise'
  };
  _promise.prototype = new _promise_prototype();
  if (typeof(window) != 'undefined') window['_promise'] = _promise;
  if (typeof(window) != 'undefined') window['_promise_prototype'] = _promise_prototype;
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
          // console.log("Server got message ", v);
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
  var _localDB_prototype = function() {
    'use strict';
    var dbTable_prototype = function() {;
      (function(_myTrait_) {
        var _eventOn;
        var _commands;
        _myTrait_.guid = function(t) {

          return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

          //return Math.random();
          // return Math.random().toString(36);

          /*    
           return Math.random().toString(36).substring(2, 15) +
                   Math.random().toString(36).substring(2, 15);
           */
          /*        
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                          .toString(16)
                          .substring(1);
             }
           
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();*/
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
        _myTrait_.addRows = function(rows) {

          var prom = _promise();

          var transaction = this._db.transaction([this._table], "readwrite");

          var me = this;
          // Do something when all the data is added to the database.
          transaction.oncomplete = function(event) {
            // console.log("Writing into "+me._table+" was successfull");
            prom.resolve(true);
          };

          transaction.onerror = function(event) {
            // Don't forget to handle errors!
          };

          var objectStore = transaction.objectStore(this._table);
          for (var i in rows) {
            var request = objectStore.add(rows[i]);
            request.onsuccess = function(event) {
              // console.log("Row ",i," written succesfully");
            };
          }

          console.log("About to add the rows to the table ");

          return prom;
        }
        _myTrait_.count = function(t) {
          var prom = _promise();
          var transaction = this._db.transaction([this._table], "readonly");

          transaction.objectStore(this._table).count().onsuccess = function(e) {
            prom.resolve(e.target.result);
          };

          return prom;

        }
        _myTrait_.forEach = function(fn) {

          var trans = this._db.transaction(this._table, "readwrite");
          var store = trans.objectStore(this._table);
          var items = [];

          trans.oncomplete = function(evt) {

          };

          var cursorRequest = store.openCursor();

          cursorRequest.onerror = function(error) {
            console.log(error);
          };

          cursorRequest.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
              fn(cursor.value, cursor);
              cursor.continue();
            }
          };

        }
        _myTrait_.get = function(key) {

          var prom = _promise();
          var transaction = db.transaction([this._table]);
          var objectStore = transaction.objectStore(this._table);
          var request = objectStore.get(key);
          request.onerror = function(event) {
            // Handle errors!
            prom.fail(event.target.errorCode);
          };
          request.onsuccess = function(event) {
            // Do something with the request.result!
            prom.resolve(request.result.name);
          };

          return prom;
        }
        _myTrait_.getAll = function(t) {

          var prom = _promise();

          var trans = this._db.transaction(this._table, "readonly");
          var store = trans.objectStore(this._table);
          var items = [];

          trans.oncomplete = function(evt) {
            prom.resolve(items);
          };

          var cursorRequest = store.openCursor();

          cursorRequest.onerror = function(error) {
            console.log(error);
          };

          cursorRequest.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
              items.push(cursor.value);
              cursor.continue();
            }
          };

          return prom;

        }
        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
          _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
        _myTrait_.__traitInit.push(function(db, tableName) {

          this._db = db;
          this._table = tableName;

        });
        _myTrait_.readAndDelete = function(t) {

          var prom = _promise();

          var trans = this._db.transaction(this._table, "readwrite");
          var store = trans.objectStore(this._table);
          var items = [];

          trans.oncomplete = function(evt) {
            prom.resolve(items);
          };

          var cursorRequest = store.openCursor();

          cursorRequest.onerror = function(error) {
            console.log(error);
          };

          cursorRequest.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
              items.push(cursor.value);
              cursor.delete(); // remove the key and continue...
              cursor.continue();
            }
          };

          return prom;

        }
        _myTrait_.update = function(key, data) {
          var prom = _promise();
          var me = this;
          var transaction = this._db.transaction([this._table], "readwrite");
          var objectStore = transaction.objectStore(this._table);
          try {
            var request = objectStore.get(key);
            request.onerror = function(event) {
              if (!request.result) {
                me.addRows([data]).then(function() {
                  prom.resolve(data);
                });
                return;
              }
              prom.fail(event.target.errorCode);
            };
            request.onsuccess = function(event) {
              if (!request.result) {
                me.addRows([data]).then(function() {
                  prom.resolve(data);
                });
                return;
              }
              var requestUpdate = objectStore.put(data);
              requestUpdate.onerror = function(event) {
                // Do something with the error
                prom.fail("update failed ");
              };
              requestUpdate.onsuccess = function(event) {
                // Success - the data is updated!
                prom.resolve(data);
              };

            };
          } catch (e) {
            return this.addRows([data]);
          }

          return prom;
        }
      }(this));
    }
    var dbTable = function(a, b, c, d, e, f, g, h) {
      if (this instanceof dbTable) {
        var args = [a, b, c, d, e, f, g, h];
        if (this.__factoryClass) {
          var m = this;
          var res;
          this.__factoryClass.forEach(function(initF) {
            res = initF.apply(m, args);
          });
          if (Object.prototype.toString.call(res) == '[object Function]') {
            if (res._classInfo.name != dbTable._classInfo.name) return new res(a, b, c, d, e, f, g, h);
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
      } else return new dbTable(a, b, c, d, e, f, g, h);
    };
    dbTable._classInfo = {
      name: 'dbTable'
    };
    dbTable.prototype = new dbTable_prototype();
    if (typeof(window) != 'undefined') window['dbTable'] = dbTable;
    if (typeof(window) != 'undefined') window['dbTable_prototype'] = dbTable_prototype;;
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
      var indexedDB;
      var IDBTransaction;
      var IDBKeyRange;
      var _initDone;
      var _dbList;
      _myTrait_._initDB = function(t) {

        if (_initDone) return;
        // In the following line, you should include the prefixes of implementations you want to test.
        indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        // DON'T use "var indexedDB = ..." if you're not in a function.
        // Moreover, you may need references to some window.IDB* objects:
        IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

        _initDone = true;

        _dbList = _localDB("sys.db", {
          tables: {
            databases: {
              createOptions: {
                keyPath: "name"
              },
            }
          }
        });
      }
      _myTrait_.clearDatabases = function(fn) {
        // console.log("Clear databases called ");

        _dbList.then(function() {
          var dbs = _dbList.table("databases");
          // console.log(" --- reading --- ");
          dbs.forEach(function(data, cursor) {
            if (fn(data)) {
              // console.log("Trying to delete ", data.name);
              indexedDB.deleteDatabase(data.name);
              cursor.delete();
            }
          });

        })
      }
      _myTrait_.createTable = function(name, options) {

        var objectStore = this._db.createObjectStore(name, options);

        return this.table(name);


      }
      _myTrait_.getDB = function(t) {
        return this._db;
      }
      _myTrait_.getStore = function(store_name, mode) {
        var tx = this._db.transaction(store_name, mode);
        return tx.objectStore(store_name);
      }
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(dbName, options) {

        if (this._db) return;
        this._initDB();

        if (!dbName) {
          return;
        }

        var me = this;

        var request = indexedDB.open(dbName, 4);

        request.onerror = function(event) {
          // Do something with request.errorCode!
          console.error(event.target.errorCode);
        };
        request.onsuccess = function(event) {
          // Do something with request.result!
          _dbList.then(function() {
            var dbs = _dbList.table("databases");
            dbs.addRows([{
              name: dbName
            }]);
          })
          me._db = event.target.result;
          later().add(
            function() {
              if (options && options.tables) {
                for (var n in options.tables) {
                  if (options.tables.hasOwnProperty(n)) {
                    var opts = options.tables[n];
                    // Create another object store called "names" with the autoIncrement flag set as true.    
                    try {
                      var objStore = me._db.createObjectStore(n, opts.createOptions);
                    } catch (e) {

                    }
                  }
                }
              }
              me.resolve(true);
            });


        };
        request.onupgradeneeded = function(event) {

          var db = event.target.result;
          me._db = db;
          /*
    {
        myTable : {
            createOptions : { autoIncrement : true },
        }
    }
    */

          if (options && options.tables) {
            for (var n in options.tables) {
              if (options.tables.hasOwnProperty(n)) {
                var opts = options.tables[n];
                // Create another object store called "names" with the autoIncrement flag set as true.    
                var objStore = db.createObjectStore(n, opts.createOptions);
              }
            }
          }

        };

      });
      _myTrait_.table = function(name) {
        return dbTable(this._db, name);
      }
    }(this));
  }
  _localDB_prototype.prototype = _promise.prototype
  var _localDB = function(a, b, c, d, e, f, g, h) {
    if (this instanceof _localDB) {
      var args = [a, b, c, d, e, f, g, h];
      if (this.__factoryClass) {
        var m = this;
        var res;
        this.__factoryClass.forEach(function(initF) {
          res = initF.apply(m, args);
        });
        if (Object.prototype.toString.call(res) == '[object Function]') {
          if (res._classInfo.name != _localDB._classInfo.name) return new res(a, b, c, d, e, f, g, h);
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
    } else return new _localDB(a, b, c, d, e, f, g, h);
  };
  _localDB._classInfo = {
    name: '_localDB'
  };
  _localDB.prototype = new _localDB_prototype();
  if (typeof(window) != 'undefined') window['_localDB'] = _localDB;
  if (typeof(window) != 'undefined') window['_localDB_prototype'] = _localDB_prototype;
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
      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit"))
        _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = []
      _myTrait_.__traitInit.push(function(server, port, socketId, role) {

        var me = this;
        this._server = server;
        this._port = port;
        this._socketId = socketId;
        this._dbName = "tcp://" + this._server + ":" + this._port + ":" + this._socketId;

        this._db = _localDB("tcp://" + this._server + ":" + this._port + ":" + this._socketId, {
          tables: {
            messagesTo: {
              createOptions: {
                autoIncrement: true
              },
            },
            messagesFrom: {
              createOptions: {
                autoIncrement: true
              },
            }
          }
        });

        // Check for new messages to the client or server
        later().every(1 / 10, function() {
          me._db.then(
            function() {
              if (role == "server") {
                me._db.table("messagesTo").readAndDelete().then(function(list) {
                  list.forEach(function(msg) {
                    me.trigger("serverMessage", msg);
                  });

                });
              }
              if (role == "client") {
                me._db.table("messagesFrom").readAndDelete().then(function(list) {
                  list.forEach(function(msg) {
                    me.trigger("clientMessage", msg);
                  });
                });
              }
            });

        });



        /*
// This is how the server side should be operating...
var io = require('socket.io')();
io.on('connection', function(socket){
  socket.emit('an event', { some: 'data' });
});

*/
      });
      _myTrait_.messageFrom = function(msg) {
        var me = this;
        this._db.then(function() {
          var tbl = me._db.table("messagesFrom");
          tbl.addRows([msg]);
        }).fail(function(e) {
          console.log("ERROR " + e);
        });

      }
      _myTrait_.messageTo = function(msg) {

        var me = this;
        this._db.then(function() {
          var tbl = me._db.table("messagesTo");
          tbl.addRows([msg]);
        }).fail(function(e) {
          console.log("ERROR " + e);
        });

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