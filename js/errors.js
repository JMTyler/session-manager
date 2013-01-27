var _ratchetParams = {"server.environment": "production"};
_ratchetParams["notifier.snippet_version"] = "1"; var _ratchet=["##RATCHET##", _ratchetParams];
(function(w,d){w.onerror=function(e,u,l){_ratchet.push({_t:'uncaught',e:e,u:u,l:l});};})(window,document);

(function(a,b){'use strict';var c={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};function d(a){var b=c;var d=b.parser[b.strictMode?"strict":"loose"].exec(a);var e={};var f=14;while(f--)e[b.key[f]]=d[f]||"";e[b.q.name]={};e[b.key[12]].replace(b.q.parser,function(a,c,d){if(c)e[b.q.name][c]=d;});return e;}function e(a){if(a){var b=d(a);if(b.anchor==='')b.source=b.source.replace('#','');var c=b.source.replace('?'+b.query,'');a=c;}return a;}var f=function(a){var b=[];if(a.arguments&&a.stack)b=this.parseChromeExc(a);else if(a.stack)if(a.stack.indexOf('@')===-1)b=this.parseChromeExc(a);else b=this.parseFirefoxOrSafariExc(a);else{var c=parseInt(typeof a.line!=='undefined'?a.line:a.lineNumber,10)||0;var d=e((typeof a.sourceURL!=='undefined'?a.sourceURL:a.fileName)||null);b=[{filename:d,lineno:c}];}this.frames=b.reverse();};f.prototype.parseChromeExc=function(a){var b,c,d,f,g,h=[],i=a.stack.split('\n'),j,k,l=i.length,m=[];for(j=1;j<l;++j){k=i[j];b=k.replace(/^\s+|\s+$/g,'').slice(3);if(b==='unknown source')continue;else b=b.split(' ');if(b.length>2){c=b[0];d=b.slice(1).join(' ');f=0;}else if(b.length===2){c=b[0];d=b[1];}else{c=null;d=b[0];}if(d&&d!=='(unknown source)'){if(d[0]==='(')d=d.slice(1,-1);var n=/:([0-9]+(:([0-9]+))?)$/;var o=n.exec(d);if(o){f=o[1];f=f.split(':');if(f.length>1)g=parseInt(f[1],10);else g=null;f=parseInt(f[0],10);d=e(d.slice(0,d.indexOf(o[0])));}else{f=0;g=null;}}m.push({filename:d,lineno:f,colno:g,method:c});}return m;};f.prototype.parseFirefoxOrSafariExc=function(a){var b,c,d,f,g=[],h=a.stack.split('\n'),i,j,k=h.length,l=[];for(i=0;i<k;++i){j=h[i];if(j){b=j.split('@');if(b[0]){c=b[0].split('(');c=(typeof c[0]!=='undefined'&&String(c[0]).length)?c[0]:null;}else c=null;if(b.length>1){d=b[1].split(':');f=parseInt(d.slice(-1)[0],10)||0;d=e(d.slice(0,-1).join(':'))||'<native code>';}else if(b[0]==='[native code]'){c=null;d='<native code>';f=0;}l.push({filename:d,lineno:f,method:c});}}return l;};function g(){function a(a){return a<10?'0'+a:a;}Date.prototype.toRatchetJSON=function(b){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+a(this.getUTCMonth()+1)+'-'+a(this.getUTCDate())+'T'+a(this.getUTCHours())+':'+a(this.getUTCMinutes())+':'+a(this.getUTCSeconds())+'Z':null;};String.prototype.toRatchetJSON=Number.prototype.toRatchetJSON=Boolean.prototype.toRatchetJSON=function(a){return this.valueOf();};var b=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,d,e,f={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},g;function h(a){c.lastIndex=0;return c.test(a)?'"'+a.replace(c,function(a){var b=f[a];return typeof b==='string'?b:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+a+'"';}function i(a,b){var c,f,j,k,l=d,m,n=b[a];if(n&&typeof n==='object'&&typeof n.toRatchetJSON==='function')n=n.toRatchetJSON(a);if(typeof g==='function')n=g.call(b,a,n);switch(typeof n){case 'string':return h(n);case 'number':return isFinite(n)?String(n):'null';case 'boolean':case 'null':return String(n);case 'object':if(!n)return 'null';d+=e;m=[];if(Object.prototype.toString.apply(n)==='[object Array]'){k=n.length;for(c=0;c<k;c+=1)m[c]=i(c,n)||'null';j=m.length===0?'[]':d?'[\n'+d+m.join(',\n'+d)+'\n'+l+']':'['+m.join(',')+']';d=l;return j;}if(g&&typeof g==='object'){k=g.length;for(c=0;c<k;c+=1)if(typeof g[c]==='string'){f=g[c];j=i(f,n);if(j)m.push(h(f)+(d?': ':':')+j);}}else for(f in n)if(Object.prototype.hasOwnProperty.call(n,f)){j=i(f,n);if(j)m.push(h(f)+(d?': ':':')+j);}j=m.length===0?'{}':d?'{\n'+d+m.join(',\n'+d)+'\n'+l+'}':'{'+m.join(',')+'}';d=l;return j;}}return function(a,b,c){var f;d='';e='';if(typeof c==='number')for(f=0;f<c;f+=1)e+=' ';else if(typeof c==='string')e=c;g=b;if(b&&typeof b!=='function'&&(typeof b!=='object'||typeof b.length!=='number'))throw new Error('JSON.stringify');return i('',{'':a});};}var h=new RegExp('^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ');var i={accessToken:null,extraParams:null,handler:null,items:[],browserPlugins:[],logger:null,defaultLevel:'warning',initialize:function(b,c,d,e){this.accessToken=b;this.environment=d||c['server.environment'];this.defaultLevel=c.level||this.defaultLevel;this.endpoint=c.endpoint||'https://submit.ratchet.io/api/1/';this.extraParams=c;this.startTime=new Date().getTime();this.logger=e||(a.console?function(b){a.console.log(b);}:function(){});var f=(a.navigator.plugins||[]);var g;var h;var i=f.length;for(h=0;h<i;++h){g=f[h];this.browserPlugins.push({name:g.name,description:g.description});}},XMLHttpFactories:[function(){return new XMLHttpRequest();},function(){return new ActiveXObject("Msxml2.XMLHTTP");},function(){return new ActiveXObject("Msxml3.XMLHTTP");},function(){return new ActiveXObject("Microsoft.XMLHTTP");}],createXMLHTTPObject:function(){var a=false;var b=i.XMLHttpFactories;var c;var d=b.length;for(c=0;c<d;c++)try{a=b[c]();break;}catch(e){}return a;},push:function(a,b){if(a instanceof Error)this.handleError(a,b);else if(typeof a=='object'&&!a.hasOwnProperty('msg')&&a.hasOwnProperty(0)&&a.hasOwnProperty(1)&&a.hasOwnProperty(2))this.handleUncaughtError(a[0],a[1],a[2]);else if(typeof a=='object'&&a.hasOwnProperty("_t")&&a._t==='uncaught')this.handleUncaughtError(a.e,a.u,a.l);else if(typeof a=='object'&&a.hasOwnProperty("_t")&&a._t==='trace')this.handleErrorTrace(a,b);else if(typeof a=='object')this.handleMessage(a,b);else this.handleMessage({level:'info',msg:a.toString()},b);},handleMessage:function(a,b){if(!a.msg){var c="Object argument must contain the property 'msg'";this.logger(c);if(b)b(new Error(c));return;}var d;var e=a.level||'info';var f={level:e,body:{message:{body:a.msg}}};for(d in a)if(a.hasOwnProperty(d)&&d!=='level'&&d!=='msg')f.body.message[d]=a[d];if(b)f.callback=b;this.items.push(f);this.handleEvents();},handleUncaughtError:function(a,b,c){a=a||'uncaught exception';b=b||'(unknown)';c=c||0;var d=e(b);var f=[{filename:d,lineno:parseInt(c,10)||null}];var g=a.match(h);var i='(unknown)';if(g){i=g[g.length-1];a=a.replace((g[g.length-2]||'')+i+':','');}this._pushTrace({exception:{'class':i,message:a},frames:f},null);},handleError:function(a,b){var c=a.name||typeof a;var d=a.message||a.toString();var e={exception:{'class':c,message:d}};if(a.stack){var g=new f(a);var h=g.frames;if(h)e.frames=h;}if(!e.frames)this.handleMessage({msg:c+': '+d,level:'error'},b);else this._pushTrace(e,b);},handleErrorTrace:function(a,b){if(!a.trace){var c="Trace objects must contain the property 'trace'";this.logger(c);if(b)b(new Error(c));return;}this._pushTrace(a.trace,b);},_pushTrace:function(a,b){var c={body:{trace:a}};if(b)c.callback=b;this.items.push(c);this.handleEvents();},handleEvents:function(){if(this.handler)clearTimeout(this.handler);this.handler=setTimeout(this.asyncHandler,200);},asyncHandler:function(){var a;var b;var c=i.buildPayload;var d=i.postItem;try{a=i.items.shift();while(a){b=c(a);i.postItem(b,a.callback);a=i.items.shift();}}catch(e){i.printInternalError(e);}},postItem:function(a,b){var c=i.createXMLHTTPObject();if(c)try{try{var d=function(a){try{if(b&&d&&c.readyState===4){d=undefined;if(c.status===200)b(null);else if(typeof (c.status)==="number"&&c.status>=400&&c.status<600)b(new Error(c.status.toString()));else b(new Error());}}catch(e){b(new Error());}};c.open('POST',i.endpoint+'item/',true);if(c.setRequestHeader)c.setRequestHeader('Content-Type','application/json');c.onreadystatechange=d;c.send(a);}catch(e){if(typeof XDomainRequest!=="undefined"){var f=function(a){if(b)b(new Error());};var g=function(a){if(b)b(new Error());};var h=function(a){if(b)b();};c=new XDomainRequest();c.onprogress=function(){};c.ontimeout=f;c.onerror=g;c.onload=h;c.open('POST',i.endpoint+'item/',true);c.send(a);}}}catch(j){}},buildPayload:function(b){var c={access_token:i.accessToken,data:{environment:i.environment,level:i.defaultLevel,platform:'browser',framework:'browser-js',language:'javascript',request:{url:a.location.href,query_string:a.location.search,user_ip:"$remote_ip"},client:{runtime_ms:new Date().getTime()-i.startTime,timestamp:Math.round(new Date().getTime()/1000),javascript:{browser:a.navigator.userAgent,language:a.navigator.language,cookie_enabled:a.navigator.cookieEnabled,screen:{width:a.screen.width,height:a.screen.height},plugins:i.browserPlugins}},server:{},notifier:{name:'ratchet-browser-js',version:'0.9'}}};var d;var e;var f;var g;var h;for(d in b)if(b.hasOwnProperty(d))c.data[d]=b[d];var j=i.extraParams;for(d in j)if(j.hasOwnProperty(d)){f=j[d];g=d.split(".");h=c.data;for(e=0;e<g.length-1;e++)h=h[g[e]];h[g[g.length-1]]=f;}return i.stringify(c);},printInternalError:function(a){if(i.logger)i.logger('Internal ratchet error: '+a);}};var j={a:[{b:1}]};try{var k=JSON.stringify(j);if(k!=='{"a":[{"b":1}]}')i.stringify=g();else i.stringify=JSON.stringify;}catch(l){i.stringify=g();}if(typeof a._ratchet!=='undefined'&&a._ratchet.shift){var m=_ratchet.shift();var n=_ratchet.shift();var o=i;var p=_ratchet;var q=p.shift();o.initialize(m,n);a._ratchet=o;while(q){o.push(q);q=p.shift();}}})(window,document);