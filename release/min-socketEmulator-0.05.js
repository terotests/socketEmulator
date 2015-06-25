(function(){var t={},n=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this);var n=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){t.delegateToSocket=function(t){var n=this;return this._realSocket&&this._realSocket.on(t,function(i,e){n.trigger(t,i,e)}),this},t.getEventNames=function(){this._ev||(this._ev={}),this._ev[en]||(this._ev[en]=[]);var t=[];for(var n in this._ev)this._ev.hasOwnProperty(n)&&t.push(n);return t},t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this.delegateToSocket(t),this},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(n,i)}),this}}}(this),function(t){var n,i;t.disconnect=function(){return this._realSocket&&this._realSocket.disconnect?void this._realSocket.disconnect():void this._socket.messageTo({disconnect:!0})},t.emit=function(t,n,i){if(this._realSocket)return void this._realSocket.emit(t,n,i);var e={name:t,data:n};if(i){e._callBackId=this.guid();var o=this,r=function(t){i(t),o.removeListener(e._callBackId,r)};this.on(e._callBackId,r)}this._socket.messageTo(e)},t.getEnum=function(){var t=this.guid();return n[t]||(n[t]=i++),n[t]},t.getId=function(){return this.socketId},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e,o){n||(n={},i=1);var r=this;if(o)return this._realSocket=io.connect(options.url,options.ioOptions),this.socketId=this._realSocket.id||this.guid(),n[this.socketId]||(n[this.socketId]=i++),this._realSocket.on("disconnect",function(){r._connected=!1,r.trigger("disconnect")}),this._realSocket.on("connect",function(){r._connected=!0,r.trigger("connect")}),void this.getEventNames().forEach(function(t){r.delegateToSocket(t)});var c=this.guid();n[c]||(n[c]=i++);var a=s(t,e,"openConnection","client"),f=s(t,e,c,"client");this.socketId=c,f.on("clientMessage",function(t,n){n.connected?(r._socket=f,r.trigger("connect",f)):r.trigger(n.name,n.data)}),a.messageTo({socketId:c})}),t.send=function(t,n){var i=this;return _promise(function(e){i.emit(t,n,e)})}}(this)},i=function(t,n,e,o,r,s,c,a){var f,u=this;if(!(u instanceof i))return new i(t,n,e,o,r,s,c,a);var _=[t,n,e,o,r,s,c,a];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(t,n,e,o,r,s,c,a)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};i._classInfo={name:"_clientSocket"},i.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._clientSocket=i,this._clientSocket=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._clientSocket=i:this._clientSocket=i}.call(new Function("return this")());var e=function(){!function(t){t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(n,i)}),this}}}(this),function(t){var n,i;t.getPrefix=function(){return this._ip+":"+this._port},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e,o){i||(i={},n={});var r=this;if(o)return this._ip="real",this._port="server",this._real=!0,this._realSocket=require("socket.io")(t),void this._realSocket.on("connection",function(t){var i=u(t,r,!0);n[t.id]=i,r.trigger("connect",i),r.trigger("connection",i)});this._ip=t,this._port=e;var c=s(t,e,"openConnection","server");c.on("serverMessage",function(i,o){if(o.socketId){var c=s(t,e,o.socketId,"server"),a=u(c,r);n[o.socketId]=a,r.trigger("connect",a),r.trigger("connection",a),a.isConnected()&&c.messageFrom({connected:!0,socketId:o.socketId})}})})}(this)},o=function(t,n,i,e,r,s,c,a){var f,u=this;if(!(u instanceof o))return new o(t,n,i,e,r,s,c,a);var _=[t,n,i,e,r,s,c,a];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=o._classInfo.name)return new f(t,n,i,e,r,s,c,a)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};o._classInfo={name:"_serverSocket"},o.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._serverSocket=o,this._serverSocket=o):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._serverSocket=o:this._serverSocket=o}.call(new Function("return this")());var r=function(){!function(t){t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){var e=this;return this._ev[t].forEach(function(t){t(e,n,i)}),this}}}(this),function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n;t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,i,e,o){var r=this;this._server=t,this._port=i,this._socketId=e,this._dbName="tcp://"+this._server+":"+this._port+":"+this._socketId;var s=this._dbName+":to",c=this._dbName+":from";n||(n={}),n[s]||(n[s]=[]),n[c]||(n[c]=[]),a().every(.1,function(){if("server"==o){var t=n[s].slice();t.forEach(function(t){r.trigger("serverMessage",t),n[s].shift()})}if("client"==o){var t=n[c].slice();t.forEach(function(t){r.trigger("clientMessage",t),n[c].shift()})}})}),t.messageFrom=function(t){var i=this._dbName+":from";n[i].push(t)},t.messageTo=function(t){var i=this._dbName+":to";n[i].push(t)}}(this)},s=function(t,n,i,e,o,r,c,a){var f,u=this;if(!(u instanceof s))return new s(t,n,i,e,o,r,c,a);var _=[t,n,i,e,o,r,c,a];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=s._classInfo.name)return new f(t,n,i,e,o,r,c,a)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};s._classInfo={name:"_tcpEmu"},s.prototype=new r;var c=function(){!function(t){var n,i,e,o,r;t.add=function(t,n,e){if(n||e){var o;"[object Array]"===Object.prototype.toString.call(e)?o=e:(o=Array.prototype.slice.call(arguments,2),o||(o=[])),i.push([n,t,o])}else i.push(t)},t.asap=function(t){this.add(t)},t.every=function(t,n,i){i||(i="time"+(new Date).getTime()+Math.random(1e7)),o[i]={step:Math.floor(1e3*t),fn:n,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!n){var t,s;if(this.polyfill(),"undefined"!=typeof window){var t=window.requestAnimationFrame,s=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(n){t||(t=window[n+"RequestAnimationFrame"],s=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),s||(s=function(t){clearTimeout(t)}),i=[],e={},o={},r=[];var c=0,a=function(){for(var n,s=(new Date).getTime();n=i.shift();)"[object Array]"===Object.prototype.toString.call(n)?n[1].apply(n[0],n[2]):n();for(var f=0;f<r.length;f++){var u=r[f];u()}for(var _ in e)if(e.hasOwnProperty(_)){var h=e[_];h[0](h[1]),delete e[_]}for(var _ in o)if(o.hasOwnProperty(_)){var h=o[_];h.nextTime<s&&(h.fn(),h.nextTime=s+h.step),h.until&&h.until<s&&delete o[_]}t(a),c=s};a(),n=!0}}),t.once=function(t,n,i){e[t]=[n,i]},t.onFrame=function(t){r.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var n=r.indexOf(t);return n>=0?(t._onRemove&&t._onRemove(),r.splice(n,1),!0):!1}}(this)},a=function(t,n,i,e,o,r,s,c){var f,u=this;if(!(u instanceof a))return new a(t,n,i,e,o,r,s,c);var _=[t,n,i,e,o,r,s,c];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=a._classInfo.name)return new f(t,n,i,e,o,r,s,c)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};a._classInfo={name:"later"},a.prototype=new c;var f=function(){!function(t){t.delegateToSocket=function(t){var n=this;return this._socket&&this._socket.on(t,function(i,e){n.trigger(t,i,e)}),this},t.getEventNames=function(){this._ev||(this._ev={}),this._ev[en]||(this._ev[en]=[]);var t=[];for(var n in this._ev)this._ev.hasOwnProperty(n)&&t.push(n);return t},t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this.delegateToSocket(t),this},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(n,i)}),this}}}(this),function(t){var n,i;t.delegateToRoom=function(t,i,e){var o=this._roomPrefix+":"+t;if(n&&n[o]){var r=this;n[o].forEach(function(t){t!=r&&t.emit(i,e)})}},t.disconnect=function(){if(this._socket)return void this._socket.disconnect();var t=this;t._disconnected=!0,t.leaveFromRooms(),t.trigger("disconnect",t),t._disconnected=!0;var n=this._tcp._dbName;_localDB().clearDatabases(function(t){return t.name==n?!0:void 0})},t.emit=function(t,n){return this._socket?void this._socket.emit(t,n):void this._tcp.messageFrom({name:t,data:n})},t.getId=function(){return this._socket?this._socket.id:this._tcp._socketId},t.getUserId=function(){return this._userId},t.getUserRoles=function(){return this._roles},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n,i){var e=this;if(this._roomPrefix=n.getPrefix(),this._server=n,i)return this._socket=t,this.broadcast={to:function(t){return{emit:function(n,i){e._socket.broadcast.to(t).emit(n,i)}}}},void this.getEventNames().forEach(function(t){e.delegateToSocket(t)});this._tcp=t;t.on("serverMessage",function(t,n){return e._disconnected?void 0:n.disconnect?void e.disconnect():void(n._callBackId?e.trigger(n.name,n.data,function(t){e.emit(n._callBackId,t)}):e.trigger(n.name,n.data))}),this.broadcast={to:function(t){return{emit:function(n,i){e.delegateToRoom(t,n,i)}}}}}),t.isConnected=function(){return this._disconnected?!1:!0},t.isInRoom=function(t){return i?i[this.getId()].indexOf(t)>=0:!1},t.join=function(t){var e=this._roomPrefix+":"+t;return n||(n={}),n[e]||(n[e]=[]),n[e].indexOf(this)<0&&(n[e].push(this),i||(i={}),i[this.getId()]||(i[this.getId()]=[]),i[this.getId()].push(t)),this._socket?void this._socket.join(t):void 0},t.leave=function(t){var e=this._roomPrefix+":"+t;n||(n={}),n[e]||(n[e]=[]);var o;if((o=n[e].indexOf(this))>=0){n[e].splice(o,1);var r=this.getId(),s=i[r].indexOf(t);s>=0&&i[r].splice(s,1)}return this._socket?void this._socket.leave(t):void 0},t.leaveFromRooms=function(){var t=this.getId(),n=this;i&&i[t]&&i[t].forEach(function(t){n.leave(t)})},t.removeListener=function(){},t.setAuthInfo=function(t,n){this._userId=t,this._roles=n}}(this)},u=function(t,n,i,e,o,r,s,c){var a,f=this;if(!(f instanceof u))return new u(t,n,i,e,o,r,s,c);var _=[t,n,i,e,o,r,s,c];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){a=t.apply(f,_)}),"function"==typeof a){if(a._classInfo.name!=u._classInfo.name)return new a(t,n,i,e,o,r,s,c)}else if(a)return a;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,_)}):"function"==typeof f.init&&f.init.apply(f,_)};u._classInfo={name:"_serverSocketWrap"},u.prototype=new f,function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},i=function(t,n,e,o,r,s,c,a){var f,u=this;if(!(u instanceof i))return new i(t,n,e,o,r,s,c,a);var _=[t,n,e,o,r,s,c,a];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(t,n,e,o,r,s,c,a)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};i._classInfo={name:"socketEmulator"},i.prototype=new n,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());