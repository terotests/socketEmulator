(function(){var t={},n=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this);var n=function(){!function(t){t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this},t.removeListener=function(t,n){if(this._ev&&this._ev[t])for(var i=this._ev[t],e=0;e<i.length;e++)if(i[e]==n)return void i.splice(e,1)},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(n,i)}),this}}}(this),function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){var n,i;t.disconnect=function(){this._socket.messageTo({disconnect:!0})},t.emit=function(t,n,i){var e={name:t,data:n};if(i){e._callBackId=this.guid();var r=this,o=function(t){i(t),r.removeListener(e._callBackId,o)};this.on(e._callBackId,o)}this._socket.messageTo(e)},t.getEnum=function(){var t=this.guid();return n[t]||(n[t]=i++),n[t]},t.getId=function(){return this.socketId},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e){n||(n={},i=1);var r=this.guid();n[r]||(n[r]=i++);var o=this,a=s(t,e,"openConnection","client"),c=s(t,e,r,"client");this.socketId=r,c.on("clientMessage",function(t,n){n.connected?(o._socket=c,o.trigger("connect",c)):o.trigger(n.name,n.data)}),a.messageTo({socketId:r})}),t.send=function(t,n){var i=this;return _promise(function(e){i.emit(t,n,e)})}}(this)},i=function(t,n,e,r,o,s,a,c){var f,u=this;if(!(u instanceof i))return new i(t,n,e,r,o,s,a,c);var _=[t,n,e,r,o,s,a,c];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(t,n,e,r,o,s,a,c)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};i._classInfo={name:"_clientSocket"},i.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._clientSocket=i,this._clientSocket=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._clientSocket=i:this._clientSocket=i}.call(new Function("return this")());var e=function(){!function(t){t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(n,i)}),this}}}(this),function(t){var n,i;t.emit=function(){},t.getPrefix=function(){return this._ip+":"+this._port},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e){i||(i={},n={});var r=this;this._ip=t,this._port=e;var o=s(t,e,"openConnection","server");o.on("serverMessage",function(i,o){if(o.socketId){var a=s(t,e,o.socketId,"server"),c=u(a,r);n[o.socketId]=c,r.trigger("connect",c),c.isConnected()&&a.messageFrom({connected:!0,socketId:o.socketId})}})}),t.join=function(){},t.removeListener=function(){}}(this)},r=function(t,n,i,e,o,s,a,c){var f,u=this;if(!(u instanceof r))return new r(t,n,i,e,o,s,a,c);var _=[t,n,i,e,o,s,a,c];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=r._classInfo.name)return new f(t,n,i,e,o,s,a,c)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};r._classInfo={name:"_serverSocket"},r.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._serverSocket=r,this._serverSocket=r):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._serverSocket=r:this._serverSocket=r}.call(new Function("return this")());var o=function(){!function(t){t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){var e=this;return this._ev[t].forEach(function(t){t(e,n,i)}),this}}}(this),function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){var n;t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,i,e,r){var o=this;this._server=t,this._port=i,this._socketId=e,this._dbName="tcp://"+this._server+":"+this._port+":"+this._socketId;var s=this._dbName+":to",a=this._dbName+":from";n||(n={}),n[s]||(n[s]=[]),n[a]||(n[a]=[]),c().every(.1,function(){if("server"==r){var t=n[s].slice();t.forEach(function(t){o.trigger("serverMessage",t),n[s].shift()})}if("client"==r){var t=n[a].slice();t.forEach(function(t){o.trigger("clientMessage",t),n[a].shift()})}})}),t.messageFrom=function(t){var i=this._dbName+":from";n[i].push(t)},t.messageTo=function(t){var i=this._dbName+":to";n[i].push(t)}}(this)},s=function(t,n,i,e,r,o,a,c){var f,u=this;if(!(u instanceof s))return new s(t,n,i,e,r,o,a,c);var _=[t,n,i,e,r,o,a,c];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=s._classInfo.name)return new f(t,n,i,e,r,o,a,c)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};s._classInfo={name:"_tcpEmu"},s.prototype=new o;var a=function(){!function(t){var n,i,e,r,o;t.add=function(t,n,e){if(n||e){var r;"[object Array]"===Object.prototype.toString.call(e)?r=e:(r=Array.prototype.slice.call(arguments,2),r||(r=[])),i.push([n,t,r])}else i.push(t)},t.asap=function(t){this.add(t)},t.every=function(t,n,i){i||(i="time"+(new Date).getTime()+Math.random(1e7)),r[i]={step:Math.floor(1e3*t),fn:n,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!n){var t,s;if(this.polyfill(),"undefined"!=typeof window){var t=window.requestAnimationFrame,s=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(n){t||(t=window[n+"RequestAnimationFrame"],s=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),s||(s=function(t){clearTimeout(t)}),i=[],e={},r={},o=[];var a=0,c=function(){for(var n,s=(new Date).getTime();n=i.shift();)"[object Array]"===Object.prototype.toString.call(n)?n[1].apply(n[0],n[2]):n();for(var f=0;f<o.length;f++){var u=o[f];u()}for(var _ in e)if(e.hasOwnProperty(_)){var h=e[_];h[0](h[1]),delete e[_]}for(var _ in r)if(r.hasOwnProperty(_)){var h=r[_];h.nextTime<s&&(h.fn(),h.nextTime=s+h.step),h.until&&h.until<s&&delete r[_]}t(c),a=s};c(),n=!0}}),t.once=function(t,n,i){e[t]=[n,i]},t.onFrame=function(t){o.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var n=o.indexOf(t);return n>=0?(t._onRemove&&t._onRemove(),o.splice(n,1),!0):!1}}(this)},c=function(t,n,i,e,r,o,s,a){var f,u=this;if(!(u instanceof c))return new c(t,n,i,e,r,o,s,a);var _=[t,n,i,e,r,o,s,a];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=c._classInfo.name)return new f(t,n,i,e,r,o,s,a)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};c._classInfo={name:"later"},c.prototype=new a;var f=function(){!function(t){t.on=function(t,n){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(n),this},t.trigger=function(t,n,i){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(n,i)}),this}}}(this),function(t){var n,i;t.delegateToRoom=function(t,i,e){var r=this._roomPrefix+":"+t;if(n&&n[r]){var o=this;n[r].forEach(function(t){t!=o&&t.emit(i,e)})}},t.disconnect=function(){var t=this;t._disconnected=!0,t.leaveFromRooms(),t.trigger("disconnect",t),t._disconnected=!0;var n=this._tcp._dbName;_localDB().clearDatabases(function(t){return t.name==n?!0:void 0})},t.emit=function(t,n){this._tcp.messageFrom({name:t,data:n})},t.getId=function(){return this._tcp._socketId},t.getUserId=function(){return this._userId},t.getUserRoles=function(){return this._roles},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){var i=this;this._roomPrefix=n.getPrefix(),this._tcp=t,this._server=n;t.on("serverMessage",function(t,n){return i._disconnected?void 0:n.disconnect?void i.disconnect():void(n._callBackId?i.trigger(n.name,n.data,function(t){i.emit(n._callBackId,t)}):i.trigger(n.name,n.data))}),this.broadcast={to:function(t){return{emit:function(n,e){i.delegateToRoom(t,n,e)}}}}}),t.isConnected=function(){return this._disconnected?!1:!0},t.isInRoom=function(t){return i?i[this.getId()].indexOf(t)>=0:!1},t.join=function(t){var e=this._roomPrefix+":"+t;n||(n={}),n[e]||(n[e]=[]),n[e].indexOf(this)<0&&(n[e].push(this),i||(i={}),i[this.getId()]||(i[this.getId()]=[]),i[this.getId()].push(t))},t.leave=function(t){var e=this._roomPrefix+":"+t;n||(n={}),n[e]||(n[e]=[]);var r;if((r=n[e].indexOf(this))>=0){n[e].splice(r,1);var o=this.getId(),s=i[o].indexOf(t);s>=0&&i[o].splice(s,1)}},t.leaveFromRooms=function(){var t=this.getId(),n=this;i&&i[t]&&i[t].forEach(function(t){n.leave(t)})},t.removeListener=function(){},t.setAuthInfo=function(t,n){this._userId=t,this._roles=n}}(this)},u=function(t,n,i,e,r,o,s,a){var c,f=this;if(!(f instanceof u))return new u(t,n,i,e,r,o,s,a);var _=[t,n,i,e,r,o,s,a];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,_)}),"function"==typeof c){if(c._classInfo.name!=u._classInfo.name)return new c(t,n,i,e,r,o,s,a)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,_)}):"function"==typeof f.init&&f.init.apply(f,_)};u._classInfo={name:"_serverSocketWrap"},u.prototype=new f,function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},i=function(t,n,e,r,o,s,a,c){var f,u=this;if(!(u instanceof i))return new i(t,n,e,r,o,s,a,c);var _=[t,n,e,r,o,s,a,c];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,_)}),"function"==typeof f){if(f._classInfo.name!=i._classInfo.name)return new f(t,n,e,r,o,s,a,c)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,_)}):"function"==typeof u.init&&u.init.apply(u,_)};i._classInfo={name:"socketEmulator"},i.prototype=new n,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());