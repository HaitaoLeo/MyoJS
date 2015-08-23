!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function EventEmitter(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function isFunction(arg){return"function"==typeof arg}function isNumber(arg){return"number"==typeof arg}function isObject(arg){return"object"==typeof arg&&null!==arg}function isUndefined(arg){return void 0===arg}module.exports=EventEmitter,EventEmitter.EventEmitter=EventEmitter,EventEmitter.prototype._events=void 0,EventEmitter.prototype._maxListeners=void 0,EventEmitter.defaultMaxListeners=10,EventEmitter.prototype.setMaxListeners=function(n){if(!isNumber(n)||0>n||isNaN(n))throw TypeError("n must be a positive number");return this._maxListeners=n,this},EventEmitter.prototype.emit=function(type){var er,handler,len,args,i,listeners;if(this._events||(this._events={}),"error"===type&&(!this._events.error||isObject(this._events.error)&&!this._events.error.length)){if(er=arguments[1],er instanceof Error)throw er;throw TypeError('Uncaught, unspecified "error" event.')}if(handler=this._events[type],isUndefined(handler))return!1;if(isFunction(handler))switch(arguments.length){case 1:handler.call(this);break;case 2:handler.call(this,arguments[1]);break;case 3:handler.call(this,arguments[1],arguments[2]);break;default:for(len=arguments.length,args=new Array(len-1),i=1;len>i;i++)args[i-1]=arguments[i];handler.apply(this,args)}else if(isObject(handler)){for(len=arguments.length,args=new Array(len-1),i=1;len>i;i++)args[i-1]=arguments[i];for(listeners=handler.slice(),len=listeners.length,i=0;len>i;i++)listeners[i].apply(this,args)}return!0},EventEmitter.prototype.addListener=function(type,listener){var m;if(!isFunction(listener))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",type,isFunction(listener.listener)?listener.listener:listener),this._events[type]?isObject(this._events[type])?this._events[type].push(listener):this._events[type]=[this._events[type],listener]:this._events[type]=listener,isObject(this._events[type])&&!this._events[type].warned){var m;m=isUndefined(this._maxListeners)?EventEmitter.defaultMaxListeners:this._maxListeners,m&&m>0&&this._events[type].length>m&&(this._events[type].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[type].length),"function"==typeof console.trace&&console.trace())}return this},EventEmitter.prototype.on=EventEmitter.prototype.addListener,EventEmitter.prototype.once=function(type,listener){function g(){this.removeListener(type,g),fired||(fired=!0,listener.apply(this,arguments))}if(!isFunction(listener))throw TypeError("listener must be a function");var fired=!1;return g.listener=listener,this.on(type,g),this},EventEmitter.prototype.removeListener=function(type,listener){var list,position,length,i;if(!isFunction(listener))throw TypeError("listener must be a function");if(!this._events||!this._events[type])return this;if(list=this._events[type],length=list.length,position=-1,list===listener||isFunction(list.listener)&&list.listener===listener)delete this._events[type],this._events.removeListener&&this.emit("removeListener",type,listener);else if(isObject(list)){for(i=length;i-->0;)if(list[i]===listener||list[i].listener&&list[i].listener===listener){position=i;break}if(0>position)return this;1===list.length?(list.length=0,delete this._events[type]):list.splice(position,1),this._events.removeListener&&this.emit("removeListener",type,listener)}return this},EventEmitter.prototype.removeAllListeners=function(type){var key,listeners;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[type]&&delete this._events[type],this;if(0===arguments.length){for(key in this._events)"removeListener"!==key&&this.removeAllListeners(key);return this.removeAllListeners("removeListener"),this._events={},this}if(listeners=this._events[type],isFunction(listeners))this.removeListener(type,listeners);else for(;listeners.length;)this.removeListener(type,listeners[listeners.length-1]);return delete this._events[type],this},EventEmitter.prototype.listeners=function(type){var ret;return ret=this._events&&this._events[type]?isFunction(this._events[type])?[this._events[type]]:this._events[type].slice():[]},EventEmitter.listenerCount=function(emitter,type){var ret;return ret=emitter._events&&emitter._events[type]?isFunction(emitter._events[type])?1:emitter._events[type].length:0}},{}],2:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),CircularBuffer=function(){function CircularBuffer(size){_classCallCheck(this,CircularBuffer),this.pos=0,this._buf=[],this.size=size}return _createClass(CircularBuffer,[{key:"get",value:function(i){return i&&null!==i||(i=0),i>=this.size?null:i>=this._buf.length?null:this._buf[(this.pos-i-1)%this.size]}},{key:"push",value:function(o){return this._buf[this.pos%this.size]=o,this.pos++}}]),CircularBuffer}();exports.CircularBuffer=CircularBuffer},{}],3:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_PoseJs=require("./Pose.js"),_QuaternionJs=require("./Quaternion.js"),_Vector3Js=require("./Vector3.js"),Frame=function(){function Frame(data){if(_classCallCheck(this,Frame),!data)throw new Error("Missing constructor arguments");if("object"!=typeof data)throw new Error("Constructor parameter needs to be an object");if(!data.hasOwnProperty("id")||data.id!==parseInt(data.id,10))throw new Error("Frame id needs to be of type integer");if(!data.hasOwnProperty("timestamp")||"string"!=typeof data.timestamp)throw new Error("Timestamp needs to be of type string");this.id=data.id,this.timestamp=data.timestamp,data.euler&&(this.euler=data.euler),data.rssi&&(this.rssi=data.rssi),data.event&&(this.event=data.event),this.pose=data.pose?new _PoseJs.Pose(data.pose):_PoseJs.Pose.invalid(),this.rotation=data.rotation?new _QuaternionJs.Quaternion(data.rotation):_QuaternionJs.Quaternion.invalid(),this.accel=data.accel?new _Vector3Js.Vector3(data.accel):_Vector3Js.Vector3.invalid(),this.gyro=data.gyro?new _Vector3Js.Vector3(data.gyro):_Vector3Js.Vector3.invalid(),this.emg=data.emg?data.emg:[],this.data=data,this.type="frame"}return _createClass(Frame,[{key:"toString",value:function(){return"[Frame id:"+this.id+" timestamp:"+this.timestamp+" accel:"+this.accel.toString()+"]"}}]),Frame}();exports.Frame=Frame},{"./Pose.js":7,"./Quaternion.js":8,"./Vector3.js":9}],4:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x,_x2,_x3){for(var _again=!0;_again;){var object=_x,property=_x2,receiver=_x3;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x=parent,_x2=property,_x3=receiver,_again=!0}},_events=require("events"),_MyoJs=require("./Myo.js"),_connectionBaseConnectionJs=require("./connection/BaseConnection.js"),_CircularBufferJs=require("./CircularBuffer.js"),Hub=function(_EventEmitter){function Hub(opt){var _this=this;_classCallCheck(this,Hub),_get(Object.getPrototypeOf(Hub.prototype),"constructor",this).call(this,opt),this.connection=new _connectionBaseConnectionJs.BaseConnection(opt),this.history=new _CircularBufferJs.CircularBuffer(200),this.myos=[],this.connection.connect(),this.connection.on("deviceInfo",function(){_this.myo=new _MyoJs.Myo(_this.connection)}),this.connection.on("frame",function(frame){_this.history.push(frame),_this.emit("frame",frame)}),this.connection.on("pose",function(pose){_this.emit("pose",pose)}),this.connection.on("event",function(event){_this.emit(event.type)}),this.connection.on("ready",function(){_this.emit("ready")}),this.connection.on("connect",function(){_this.emit("connect")}),this.connection.on("disconnect",function(){_this.emit("disconnect")})}return _inherits(Hub,_EventEmitter),_createClass(Hub,[{key:"frame",value:function(num){return this.history.get(num)||null}},{key:"waitForMyo",value:function(timeoutMilliseconds){if(!timeoutMilliseconds||timeoutMilliseconds!==parseInt(timeoutMilliseconds,10))throw new Error("timeoutMilliseconds needs to be of type integer");this.connection.send({waitForMyo:timeoutMilliseconds})}},{key:"run",value:function(durationMilliseconds){if(!durationMilliseconds||durationMilliseconds!==parseInt(durationMilliseconds,10))throw new Error("durationMilliseconds needs to be of type integer");this.connection.send({run:durationMilliseconds})}},{key:"runOnce",value:function(durationMilliseconds){if(!durationMilliseconds||durationMilliseconds!==parseInt(durationMilliseconds,10))throw new Error("durationMilliseconds needs to be of type integer");this.connection.send({runOnce:durationMilliseconds})}},{key:"toString",value:function(){return"[Hub history:"+this.history+"]"}}]),Hub}(_events.EventEmitter);exports.Hub=Hub},{"./CircularBuffer.js":2,"./Myo.js":6,"./connection/BaseConnection.js":10,events:1}],5:[function(require,module,exports){(function(global){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_connectionBaseConnectionJs=require("./connection/BaseConnection.js"),_HubJs=require("./Hub.js"),_MyoJs=require("./Myo.js"),_CircularBufferJs=require("./CircularBuffer.js"),_PoseJs=require("./Pose.js"),_QuaternionJs=require("./Quaternion.js"),_Vector3Js=require("./Vector3.js"),_FrameJs=require("./Frame.js"),MyoJS=function(){function MyoJS(){_classCallCheck(this,MyoJS)}return _createClass(MyoJS,null,[{key:"BaseConnection",value:function(){return _connectionBaseConnectionJs.BaseConnection}},{key:"CircularBuffer",value:function(){return _CircularBufferJs.CircularBuffer}},{key:"Hub",value:function(){return new _HubJs.Hub}},{key:"Myo",value:function(){return _MyoJs.Myo}},{key:"Frame",value:function(){return _FrameJs.Frame}},{key:"Pose",value:function(){return _PoseJs.Pose}},{key:"Quaternion",value:function(){return _QuaternionJs.Quaternion}},{key:"Vector3",value:function(){return _Vector3Js.Vector3}}]),MyoJS}();exports.MyoJS=MyoJS,exports["default"]=MyoJS,global.Myo=MyoJS}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./CircularBuffer.js":2,"./Frame.js":3,"./Hub.js":4,"./Myo.js":6,"./Pose.js":7,"./Quaternion.js":8,"./Vector3.js":9,"./connection/BaseConnection.js":10}],6:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Myo=function(){function Myo(context){if(_classCallCheck(this,Myo),!context)throw new Error("Missing context");this.context=context}return _createClass(Myo,[{key:"requestRssi",value:function(){this.context.send({requestRssi:!0})}},{key:"vibrate",value:function(length){switch(length){case Myo.VIBRATION_SHORT:this.context.send({command:"vibrate",args:[Myo.VIBRATION_SHORT]});break;case Myo.VIBRATION_MEDIUM:this.context.send({command:"vibrate",args:[Myo.VIBRATION_MEDIUM]});break;case Myo.VIBRATION_LONG:this.context.send({command:"vibrate",args:[Myo.VIBRATION_LONG]});break;default:throw new Error("Valid values are: Myo.VIBRATION_SHORT, Myo.VIBRATION_MEDIUM, Myo.VIBRATION_LONG")}}},{key:"unlock",value:function(option){switch(option){case Myo.UNLOCK_TIMED:this.context.send({command:"unlock",args:[Myo.UNLOCK_TIMED]});break;case Myo.UNLOCK_HOLD:this.context.send({command:"unlock",args:[Myo.UNLOCK_HOLD]});break;default:throw new Error("Valid values are: Myo.UNLOCK_TIMED, Myo.UNLOCK_HOLD")}}},{key:"lock",value:function(){this.context.send({command:"lock"})}},{key:"notifyUserAction",value:function(action){switch(action){case Myo.USER_ACTION_SINGLE:this.context.send({command:"notifyUserAction",args:[Myo.USER_ACTION_SINGLE]});break;default:throw new Error("Valid values are: Myo.USER_ACTION_SINGLE")}}}]),Myo}();exports.Myo=Myo,Myo.VIBRATION_SHORT=0,Myo.VIBRATION_MEDIUM=1,Myo.VIBRATION_LONG=2,Myo.UNLOCK_TIMED=0,Myo.UNLOCK_HOLD=1,Myo.USER_ACTION_SINGLE=0},{}],7:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Pose=function(){function Pose(data){if(_classCallCheck(this,Pose),"object"!=typeof data||"[object Array]"===Object.prototype.toString.call(data))throw new Error("Constructor parameter needs to be an object");if(this.type=data.type,this.valid=!data.hasOwnProperty("invalid"),this.valid&&(!data.hasOwnProperty("type")||data.type!==parseInt(data.type,10)))throw new Error("Pose type needs to be of type integer")}return _createClass(Pose,[{key:"isEqualTo",value:function(other){return this.type===other.type}},{key:"toString",value:function(){if(!this.valid)return"[Pose invalid]";switch(this.type){case Pose.POSE_REST:return"[Pose type:"+this.type.toString()+" POSE_REST]";case Pose.POSE_FIST:return"[Pose type:"+this.type.toString()+" POSE_FIST]";case Pose.POSE_WAVE_IN:return"[Pose type:"+this.type.toString()+" POSE_WAVE_IN]";case Pose.POSE_WAVE_OUT:return"[Pose type:"+this.type.toString()+" POSE_WAVE_OUT]";case Pose.POSE_FINGERS_SPREAD:return"[Pose type:"+this.type.toString()+" POSE_FINGERS_SPREAD]";case Pose.POSE_DOUBLE_TAP:return"[Pose type:"+this.type.toString()+" POSE_DOUBLE_TAP]";default:return"[Pose type:"+this.type.toString()+"]"}}}],[{key:"invalid",value:function(){return new Pose({invalid:!0})}}]),Pose}();exports.Pose=Pose,Pose.POSE_REST=0,Pose.POSE_FIST=1,Pose.POSE_WAVE_IN=2,Pose.POSE_WAVE_OUT=3,Pose.POSE_FINGERS_SPREAD=4,Pose.POSE_DOUBLE_TAP=5},{}],8:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Quaternion=function(){function Quaternion(data){if(_classCallCheck(this,Quaternion),this.valid=!data.hasOwnProperty("invalid"),this.valid){if("[object Array]"!==Object.prototype.toString.call(data))throw new Error("Components needs to be an array");if(isNaN(data[0])||isNaN(data[1])||isNaN(data[2])||isNaN(data[3]))throw new Error("Component values needs to be integers or numbers");this.x=data[0],this.y=data[1],this.z=data[2],this.w=data[3]}else this.x=0/0,this.y=0/0,this.z=0/0,this.w=0/0}return _createClass(Quaternion,[{key:"normalized",value:function(){var magnitude=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return new Quaternion([this.x/magnitude,this.y/magnitude,this.z/magnitude,this.w/magnitude])}},{key:"conjugate",value:function(){return new Quaternion([-this.x,-this.y,-this.z,this.w])}},{key:"toEuler",value:function(){var test,heading,attitude,bank,sqx,sqy,sqz,sqw,unit;return sqw=this.w*this.w,sqx=this.x*this.x,sqy=this.y*this.y,sqz=this.z*this.z,unit=sqx+sqy+sqz+sqw,test=this.x*this.y+this.z*this.w,test>.499*unit?(heading=2*Math.atan2(this.x,this.w),attitude=Math.PI/2,bank=0):-.499*unit>test?(heading=-2*Math.atan2(this.x,this.w),attitude=-Math.PI/2,bank=0):(heading=Math.atan2(2*this.y*this.w-2*this.x*this.z,sqx-sqy-sqz+sqw),attitude=Math.asin(2*test/unit),bank=Math.atan2(2*this.x*this.w-2*this.y*this.z,-sqx+sqy-sqz+sqw)),{heading:heading,attitude:attitude,bank:bank}}},{key:"roll",value:function(){return Math.atan2(2*this.y*this.w-2*this.x*this.z,1-2*this.y*this.y-2*this.z*this.z)}},{key:"pitch",value:function(){return Math.atan2(2*this.x*this.w-2*this.y*this.z,1-2*this.x*this.x-2*this.z*this.z)}},{key:"yaw",value:function(){return Math.asin(2*this.x*this.y+2*this.z*this.w)}},{key:"toString",value:function(){return this.valid?"[Quaternion x:"+this.x+" y:"+this.y+" z:"+this.z+" w:"+this.w+"]":"[Quaternion invalid]"}}],[{key:"invalid",value:function(){return new Quaternion({invalid:!0})}}]),Quaternion}();exports.Quaternion=Quaternion},{}],9:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Vector3=function(){function Vector3(data){if(_classCallCheck(this,Vector3),!data)throw new Error("Missing constructor arguments");if("object"!=typeof data)throw new Error("Constructor parameter needs to be an object");if(this.valid=!data.hasOwnProperty("invalid"),this.valid){if(!data||"[object Array]"!==Object.prototype.toString.call(data))throw new Error("Components needs to be an array");if(isNaN(data[0])||isNaN(data[1])||isNaN(data[2]))throw new Error("Component values needs to be integers or numbers");this.x=data[0],this.y=data[1],this.z=data[2]}else this.x=0/0,this.y=0/0,this.z=0/0}return _createClass(Vector3,[{key:"opposite",value:function(){return new Vector3([-this.x,-this.y,-this.z])}},{key:"plus",value:function(other){return new Vector3([this.x+other.x,this.y+other.y,this.z+other.z])}},{key:"plusAssign",value:function(other){return this.x+=other.x,this.y+=other.y,this.z+=other.z,this}},{key:"minus",value:function(other){return new Vector3([this.x-other.x,this.y-other.y,this.z-other.z])}},{key:"minusAssign",value:function(other){return this.x-=other.x,this.y-=other.y,this.z-=other.z,this}},{key:"multiply",value:function(scalar){return new Vector3([this.x*scalar,this.y*scalar,this.z*scalar])}},{key:"multiplyAssign",value:function(scalar){return this.x*=scalar,this.y*=scalar,this.z*=scalar,this}},{key:"divide",value:function(scalar){return new Vector3([this.x/scalar,this.y/scalar,this.z/scalar])}},{key:"divideAssign",value:function(scalar){return this.x/=scalar,this.y/=scalar,this.z/=scalar,this}},{key:"isEqualTo",value:function(other){return!(this.x!==other.x||this.y!==other.y||this.z!==other.z)}},{key:"angleTo",value:function(other){var returnValue,denom=this.magnitudeSquared()*other.magnitudeSquared();return returnValue=0>=denom?0:Math.acos(this.dot(other)/Math.sqrt(denom))}},{key:"cross",value:function(other){return new Vector3([this.y*other.z-this.z*other.y,this.z*other.x-this.x*other.z,this.x*other.y-this.y*other.x])}},{key:"distanceTo",value:function(other){return Math.sqrt((this.x-other.x)*(this.x-other.x)+(this.y-other.y)*(this.y-other.y)+(this.z-other.z)*(this.z-other.z))}},{key:"dot",value:function(other){return this.x*other.x+this.y*other.y+this.z*other.z}},{key:"isValid",value:function(){return this.x<=Number.MAX_VALUE&&this.x>=-Number.MAX_VALUE&&this.y<=Number.MAX_VALUE&&this.y>=-Number.MAX_VALUE&&this.z<=Number.MAX_VALUE&&this.z>=-Number.MAX_VALUE}},{key:"magnitude",value:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}},{key:"magnitudeSquared",value:function(){return this.x*this.x+this.y*this.y+this.z*this.z}},{key:"normalized",value:function(){var denom=this.magnitudeSquared();return 0>=denom?new Vector3([0,0,0]):(denom=1/Math.sqrt(denom),new Vector3([this.x*denom,this.y*denom,this.z*denom]))}},{key:"pitch",value:function(){return Math.atan2(this.y,-this.z)}},{key:"yaw",value:function(){return Math.atan2(this.x,-this.z)}},{key:"roll",value:function(){return Math.atan2(this.x,-this.y)}},{key:"toString",value:function(){return this.valid?"[Vector3 x:"+this.x+" y:"+this.y+" z:"+this.z+"]":"[Vector3 invalid]"}}],[{key:"zero",value:function(){return new Vector3([0,0,0])}},{key:"xAxis",value:function(){return new Vector3([1,0,0])}},{key:"yAxis",value:function(){return new Vector3([0,1,0])}},{key:"zAxis",value:function(){return new Vector3([0,0,1])}},{key:"left",value:function(){return new Vector3([-1,0,0])}},{key:"right",value:function(){return Vector3.xAxis()}},{key:"down",value:function(){return new Vector3([0,-1,0])}},{key:"up",value:function(){return Vector3.yAxis()}},{key:"forward",value:function(){return new Vector3([0,0,-1])}},{key:"backward",value:function(){return Vector3.zAxis()}},{key:"invalid",value:function(){return new Vector3({invalid:!0})}}]),Vector3}();exports.Vector3=Vector3},{}],10:[function(require,module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function(_x2,_x3,_x4){for(var _again=!0;_again;){var object=_x2,property=_x3,receiver=_x4;desc=parent=getter=void 0,_again=!1,null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0!==desc){if("value"in desc)return desc.value;var getter=desc.get;return void 0===getter?void 0:getter.call(receiver)}var parent=Object.getPrototypeOf(object);if(null===parent)return void 0;_x2=parent,_x3=property,_x4=receiver,_again=!0}},_events=require("events"),_FrameJs=require("./../Frame.js"),BaseConnection=function(_EventEmitter){function BaseConnection(){var _ref=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],_ref$host=_ref.host,host=void 0===_ref$host?"127.0.0.1":_ref$host,_ref$port=_ref.port,port=void 0===_ref$port?6450:_ref$port;if(_classCallCheck(this,BaseConnection),_get(Object.getPrototypeOf(BaseConnection.prototype),"constructor",this).call(this),"string"!=typeof host)throw new Error("Host needs to be of type string");if(port!==parseInt(port,10))throw new Error("Port needs to be of type integer");this.host=host,this.port=port,this.connected=!1}return _inherits(BaseConnection,_EventEmitter),_createClass(BaseConnection,[{key:"getUrl",value:function(){return"ws://"+this.host+":"+this.port+"/"}},{key:"handleOpen",value:function(){var returnValue;return this.connected?returnValue="connected":(this.send({command:"requestDeviceInfo"}),returnValue="connecting"),returnValue}},{key:"handleClose",value:function(){var returnValue;return this.connected?(this.disconnect(),this.startReconnection(),returnValue="disconnecting"):returnValue="disconnected",returnValue}},{key:"startReconnection",value:function(){var returnValue,_this=this;return this.reconnectionTimer?returnValue="already reconnecting":(this.reconnectionTimer=setInterval(function(){_this.reconnect()},500),returnValue="reconnecting"),returnValue}},{key:"stopReconnection",value:function(){this.reconnectionTimer=clearInterval(this.reconnectionTimer)}},{key:"disconnect",value:function(allowReconnect){return allowReconnect||this.stopReconnection(),this.socket?(this.socket.close(),delete this.socket,this.connected&&(this.connected=!1,this.emit("disconnect")),!0):void 0}},{key:"reconnect",value:function(){var returnValue;return this.connected?(this.stopReconnection(),returnValue="stopReconnection"):(this.disconnect(!0),this.connect(),returnValue="connect"),returnValue}},{key:"handleData",value:function(data){var message,frameObject,frame,deviceInfo;if(!data)throw new Error("No data received");try{message=JSON.parse(data)}catch(exception){throw new Error("Invalid JSON")}return!this.connected&&message.hasOwnProperty("frame")&&(frame=message.frame,frame.hasOwnProperty("deviceInfo"))?(deviceInfo=frame.deviceInfo,this.emit("deviceInfo",deviceInfo),this.connected=!0,void this.emit("connect")):void(this.connected&&message.hasOwnProperty("frame")&&(frameObject=new _FrameJs.Frame(message.frame),this.emit(frameObject.type,frameObject),frameObject.pose&&this.emit("pose",frameObject.pose),frameObject.event&&this.emit("event",frameObject.event)))}},{key:"connect",value:function(){var _this2=this,inBrowser="undefined"!=typeof window;if(this.socket)return"socket already created";if(this.emit("ready"),inBrowser)this.socket=new WebSocket(this.getUrl());else{var ConnectionType=require("ws");this.socket=new ConnectionType(this.getUrl())}return this.socket.onopen=function(){_this2.handleOpen()},this.socket.onclose=function(data){_this2.handleClose(data.code,data.reason)},this.socket.onmessage=function(message){_this2.handleData(message.data)},this.socket.onerror=function(data){_this2.handleClose("connectError",data.data)},!0}},{key:"send",value:function(data){if("object"!=typeof data||"string"==typeof data)throw new Error("Parameter needs to be an object");this.socket.send(JSON.stringify(data))}}]),BaseConnection}(_events.EventEmitter);exports.BaseConnection=BaseConnection},{"./../Frame.js":3,events:1,ws:void 0}]},{},[5]);