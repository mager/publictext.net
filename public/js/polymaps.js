if(!org)var org={};if(!org.polymaps)org.polymaps={};
(function(s){function fa(e){var f=e.indexOf(":");return f<0?e:{space:s.ns[e.substring(0,f)],local:e.substring(f+1)}}function S(){for(var e=0;e<S.maps.length;e++)S.maps[e].resize()}function V(e){return 360/Math.PI*Math.atan(Math.exp(e*Math.PI/180))-90}function W(e){return 180/Math.PI*Math.log(Math.tan(Math.PI/4+e*Math.PI/360))}function Z(e,f){if(e.row>f.row){var c=e;e=f;f=c}return{x0:e.column,y0:e.row,x1:f.column,y1:f.row,dx:f.column-e.column,dy:f.row-e.row}}function ca(e,f,c,k,h){c=Math.max(c,Math.floor(f.y0));
k=Math.min(k,Math.ceil(f.y1));if(e.x0==f.x0&&e.y0==f.y0?e.x0+f.dy/e.dy*e.dx<f.x1:e.x1-f.dy/e.dy*e.dx<f.x0){var a=e;e=f;f=a}a=e.dx/e.dy;var g=f.dx/f.dy,l=e.dx>0,o=f.dx<0;for(c=c;c<k;c++){var t=a*Math.max(0,Math.min(e.dy,c+l-e.y0))+e.x0;h(Math.floor(g*Math.max(0,Math.min(f.dy,c+o-f.y0))+f.x0),Math.ceil(t),c)}}function da(e,f,c,k,h,a){var g=Z(e,f);f=Z(f,c);e=Z(c,e);if(g.dy>f.dy){c=g;g=f;f=c}if(g.dy>e.dy){c=g;g=e;e=c}if(f.dy>e.dy){c=f;f=e;e=c}g.dy&&ca(e,g,k,h,a);f.dy&&ca(e,f,k,h,a)}s.version="2.4.0";
var Y={x:0,y:0};s.ns={svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink"};s.id=function(){var e=0;return function(){return++e}}();s.svg=function(e){return document.createElementNS(s.ns.svg,e)};s.transform=function(e,f,c,k,h,a){var g={},l,o,t;if(!arguments.length){e=1;f=h=c=0;k=1;a=0}g.zoomFraction=function(m){if(!arguments.length)return o;o=m;l=Math.floor(o+Math.log(Math.sqrt(e*e+f*f+c*c+k*k))/Math.log(2));t=Math.pow(2,-l);return g};g.apply=function(m){var j=Math.pow(2,-m.zoom),
u=Math.pow(2,m.zoom-l);return{column:(e*m.column*j+c*m.row*j+h)*u,row:(f*m.column*j+k*m.row*j+a)*u,zoom:m.zoom-l}};g.unapply=function(m){var j=Math.pow(2,-m.zoom),u=Math.pow(2,m.zoom+l);return{column:(m.column*j*k-m.row*j*c-h*k+a*c)/(e*k-f*c)*u,row:(m.column*j*f-m.row*j*e-h*f+a*e)/(c*f-k*e)*u,zoom:m.zoom+l}};g.toString=function(){return"matrix("+[e*t,f*t,c*t,k*t].join(" ")+" 0 0)"};return g.zoomFraction(0)};s.cache=function(e,f){function c(j){m--;f&&f(j);delete g[j.key];if(j.next)j.next.prev=j.prev;
else if(o=j.prev)o.next=null;if(j.prev)j.prev.next=j.next;else if(l=j.next)l.prev=null}function k(){for(var j=o;m>t;j=j.prev){if(!j)break;j.lock||c(j)}}var h={},a={},g={},l=null,o=null,t=64,m=0;h.peek=function(j){return g[[j.zoom,j.column,j.row].join("/")]};h.load=function(j,u){var y=[j.zoom,j.column,j.row].join("/"),A=g[y];if(A){if(A.prev){if(A.prev.next=A.next)A.next.prev=A.prev;else o=A.prev;A.prev=null;A.next=l;l=l.prev=A}A.lock=1;return a[y]=A}A={key:y,column:j.column,row:j.row,zoom:j.zoom,next:l,
prev:null,lock:1};e.call(null,A,u);a[y]=g[y]=A;if(l)l.prev=A;else o=A;l=A;m++;return A};h.unload=function(j){if(!(j in a))return false;var u=a[j];u.lock=0;delete a[j];u.request&&u.request.abort(false)&&c(u);return u};h.locks=function(){return a};h.size=function(j){if(!arguments.length)return t;t=j;k();return h};h.flush=function(){k();return h};h.clear=function(){for(var j in g){var u=g[j];u.request&&u.request.abort(false);f&&f(g[j]);if(u.lock){u.lock=0;u.element.parentNode.removeChild(u.element)}}a=
{};g={};l=o=null;m=0;return h};return h};s.url=function(e){function f(k){var h=k.zoom<0?1:1<<k.zoom,a=k.column%h;if(a<0)a+=h;return e.replace(/{(.)}/g,function(g,l){switch(l){case "S":return c[(Math.abs(k.zoom)+k.row+a)%c.length];case "Z":return k.zoom;case "X":return a;case "Y":return k.row;case "B":var o=s.map.coordinateLocation({row:k.row,column:a,zoom:k.zoom}),t=s.map.coordinateLocation({row:k.row+1,column:a+1,zoom:k.zoom}),m=Math.ceil(Math.log(k.zoom)/Math.LN2);return t.lat.toFixed(m)+","+o.lon.toFixed(m)+
","+o.lat.toFixed(m)+","+t.lon.toFixed(m)}return l})}var c=[];f.template=function(k){if(!arguments.length)return e;e=k;return f};f.hosts=function(k){if(!arguments.length)return c;c=k;return f};return f};s.dispatch=function(e){var f={};e.on=function(c,k){for(var h=f[c]||(f[c]=[]),a=0;a<h.length;a++)if(h[a].handler==k)return e;h.push({handler:k,on:true});return e};e.off=function(c,k){var h=f[c];if(h)for(var a=0;a<h.length;a++){var g=h[a];if(g.handler==k){g.on=false;h.splice(a,1);break}}return e};return function(c){var k=
f[c.type];if(k){k=k.slice();for(var h=0;h<k.length;h++){var a=k[h];a.on&&a.handler.call(e,c)}}}};s.queue=function(){function e(){if(!(h>=a||!k.length)){h++;k.pop()()}}function f(g){for(var l=0;l<k.length;l++)if(k[l]==g){k.splice(l,1);return true}return false}function c(g,l,o){function t(){m=new XMLHttpRequest;o&&m.overrideMimeType(o);m.open("GET",g,true);m.onreadystatechange=function(){if(m.readyState==4){h--;m.status<300&&l(m);e()}};m.send(null)}var m;k.push(t);e();return{abort:function(j){if(f(t))return true;
if(j&&m){m.abort();return true}return false}}}var k=[],h=0,a=6;return{text:function(g,l,o){return c(g,function(t){t.responseText&&l(t.responseText)},o)},xml:function(g,l){return c(g,function(o){o.responseXML&&l(o.responseXML)},"application/xml")},json:function(g,l){return c(g,function(o){o.responseText&&l(JSON.parse(o.responseText))},"application/json")},image:function(g,l,o){function t(){m=document.createElement("img");m.onerror=function(){h--;e()};m.onload=function(){h--;o(m);e()};m.src=l;g.setAttributeNS(s.ns.xlink,
"href",l)}var m;k.push(t);e();return{abort:function(j){if(f(t))return true;if(j&&m){m.src="about:";return true}return false}}}}}();s.map=function(){function e(){if(u)if(t<u[0])t=u[0];else if(t>u[1])t=u[1];m=t-(t=Math.round(t));j=Math.pow(2,m)}function f(){if(n){var d=45/Math.pow(2,t+m-3),r=Math.max(Math.abs(C*g.x+A*g.y),Math.abs(B*g.x+E*g.y)),q=V(K-r*d/l.y);r=V(i+r*d/l.y);o.lat=Math.max(q,Math.min(r,o.lat));q=Math.max(Math.abs(C*g.y+A*g.x),Math.abs(B*g.y+E*g.x));o.lon=Math.max(n[0].lon-q*d/l.x,Math.min(n[1].lon+
q*d/l.x,o.lon))}}var c={},k,h,a=Y,g=Y,l={x:256,y:256},o={lat:37.76487,lon:-122.41948},t=12,m=0,j=1,u=[1,18],y=0,A=1,C=0,E=1,B=0,K=-180,i=180,n=[{lat:V(K),lon:-Infinity},{lat:V(i),lon:Infinity}];c.locationCoordinate=function(d){d=s.map.locationCoordinate(d);var r=Math.pow(2,t);d.column*=r;d.row*=r;d.zoom+=t;return d};c.coordinateLocation=s.map.coordinateLocation;c.coordinatePoint=function(d,r){var q=Math.pow(2,t-r.zoom),z=Math.pow(2,t-d.zoom),v=(r.column*q-d.column*z)*l.x*j;q=(r.row*q-d.row*z)*l.y*
j;return{x:g.x+A*v-C*q,y:g.y+C*v+A*q}};c.pointCoordinate=function(d,r){var q=Math.pow(2,t-d.zoom),z=(r.x-g.x)/j,v=(r.y-g.y)/j;return{column:d.column*q+(E*z-B*v)/l.x,row:d.row*q+(B*z+E*v)/l.y,zoom:t}};c.locationPoint=function(d){var r=Math.pow(2,t+m-3)/45,q=(d.lon-o.lon)*r*l.x;d=(W(o.lat)-W(d.lat))*r*l.y;return{x:g.x+A*q-C*d,y:g.y+C*q+A*d}};c.pointLocation=function(d){var r=45/Math.pow(2,t+m-3),q=(d.x-g.x)*r;d=(d.y-g.y)*r;return{lon:o.lon+(E*q-B*d)/l.x,lat:V(W(o.lat)-(B*q+E*d)/l.y)}};var w=s.svg("rect");
w.setAttribute("visibility","hidden");w.setAttribute("pointer-events","all");c.container=function(d){if(!arguments.length)return k;k=d;k.setAttribute("class","map");k.appendChild(w);return c.resize()};c.focusableParent=function(){for(var d=k;d;d=d.parentNode)if(d.tabIndex>=0)return d;return window};c.mouse=function(d){var r=(k.ownerSVGElement||k).createSVGPoint();if($<0&&(window.scrollX||window.scrollY)){var q=document.body.appendChild(s.svg("svg"));q.style.position="absolute";q.style.top=q.style.left=
"0px";var z=q.getScreenCTM();$=!(z.f||z.e);document.body.removeChild(q)}if($){r.x=d.pageX;r.y=d.pageY}else{r.x=d.clientX;r.y=d.clientY}return r.matrixTransform(k.getScreenCTM().inverse())};c.size=function(d){if(!arguments.length)return a;h=d;return c.resize()};c.resize=function(){if(h){a=h;S.remove(c)}else{w.setAttribute("width","100%");w.setAttribute("height","100%");b=w.getBBox();a={x:b.width,y:b.height};S.add(c)}w.setAttribute("width",a.x);w.setAttribute("height",a.y);g={x:a.x/2,y:a.y/2};f();c.dispatch({type:"resize"});
return c};c.tileSize=function(d){if(!arguments.length)return l;l=d;c.dispatch({type:"move"});return c};c.center=function(d){if(!arguments.length)return o;o=d;f();c.dispatch({type:"move"});return c};c.panBy=function(d){var r=45/Math.pow(2,t+m-3),q=d.x*r;d=d.y*r;return c.center({lon:o.lon+(B*d-E*q)/l.x,lat:V(W(o.lat)+(B*q+E*d)/l.y)})};c.centerRange=function(d){if(!arguments.length)return n;if(n=d){K=n[0].lat>-90?W(n[0].lat):-Infinity;i=n[0].lat<90?W(n[1].lat):Infinity}else{K=-Infinity;i=Infinity}f();
c.dispatch({type:"move"});return c};c.zoom=function(d){if(!arguments.length)return t+m;t=d;e();return c.center(o)};c.zoomBy=function(d,r,q){if(arguments.length<2)return c.zoom(t+m+d);if(arguments.length<3)q=c.pointLocation(r);t=t+m+d;e();var z=c.locationPoint(q);return c.panBy({x:r.x-z.x,y:r.y-z.y})};c.zoomRange=function(d){if(!arguments.length)return u;u=d;return c.zoom(t+m)};c.extent=function(d){if(!arguments.length)return[c.pointLocation({x:0,y:a.y}),c.pointLocation({x:a.x,y:0})];var r=c.locationPoint(d[0]),
q=c.locationPoint(d[1]),z=Math.max((q.x-r.x)/a.x,(r.y-q.y)/a.y);r=c.pointLocation({x:(r.x+q.x)/2,y:(r.y+q.y)/2});t=t+m-Math.log(z)/Math.log(2);e();return c.center(r)};c.angle=function(d){if(!arguments.length)return y;y=d;A=Math.cos(y);C=Math.sin(y);E=Math.cos(-y);B=Math.sin(-y);f();c.dispatch({type:"move"});return c};c.add=function(d){d.map(c);return c};c.remove=function(d){d.map(null);return c};c.dispatch=s.dispatch(c);return c};S.maps=[];S.add=function(e){for(var f=0;f<S.maps.length;f++)if(S.maps[f]==
e)return;S.maps.push(e)};S.remove=function(e){for(var f=0;f<S.maps.length;f++)if(S.maps[f]==e){S.maps.splice(f,1);return}};window.addEventListener("resize",S,false);s.map.locationCoordinate=function(e){var f=1/360;return{column:(e.lon+180)*f,row:(180-W(e.lat))*f,zoom:0}};s.map.coordinateLocation=function(e){var f=45/Math.pow(2,e.zoom-3);return{lon:f*e.column-180,lat:V(180-f*e.row)}};var $=/WebKit/.test(navigator.userAgent)?-1:0;s.layer=function(e,f){function c(B){for(var K=C[0].nextSibling;A<B;A++){u.insertBefore(C[-4],
K);u.insertBefore(C[2],K);u.insertBefore(C[1],K);for(var i=C[-4],n=-4;n<2;)C[n]=C[++n];C[n]=i}}function k(B){for(var K=C[0].nextSibling;A>B;A--){u.insertBefore(C[-1],K);u.insertBefore(C[2],C[-4]);for(var i=C[2],n=2;n>-4;)C[n]=C[--n];C[n]=i}}function h(){function B(O){var H=O.zoom,T=H<0?1:1<<H,U=O.column%T,x=O.row;if(U<0)U+=T;return{locationPoint:function(D){D=s.map.locationCoordinate(D);var G=Math.pow(2,H-D.zoom);return{x:q.x*(G*D.column-U),y:q.y*(G*D.row-x)}}}}function K(O,H,T){var U=I.zoom,x=2-
R,D=4+R;for(O=O;O<H;O++){var G=g.load({column:O,row:T,zoom:U},B);if(!G.ready&&!(G.key in M)){G.proxyRefs={};for(var J,N,P,Q=1;Q<=x;Q++){N=true;for(var X=0,ea=1<<Q;X<=ea;X++)for(var aa=0;aa<=ea;aa++)if((P=g.peek(J={column:(O<<Q)+aa,row:(T<<Q)+X,zoom:U+Q}))&&P.ready){M[P.key]=g.load(J);P.proxyCount++;G.proxyRefs[P.key]=P}else N=false;if(N)break}if(!N)for(Q=1;Q<=D;Q++)if((P=g.peek(J={column:O>>Q,row:T>>Q,zoom:U-Q}))&&P.ready){M[P.key]=g.load(J);P.proxyCount++;G.proxyRefs[P.key]=P;break}}M[G.key]=G}}
var i=a.map(),n=i.zoom(),w=n-(n=Math.round(n)),d=i.size(),r=i.angle(),q=i.tileSize(),z=i.locationCoordinate(i.center());if(A!=n){if(A<n)c(n);else if(A>n)k(n);else A=n;for(var v=-4;v<=2;v++){var L=C[v];L.setAttribute("class","zoom"+(v<0?"":"+")+v+" zoom"+(n+v));L.setAttribute("transform","scale("+Math.pow(2,-v)+")")}}u.setAttribute("transform","translate("+d.x/2+","+d.y/2+")"+(r?"rotate("+r/Math.PI*180+")":"")+(w?"scale("+Math.pow(2,w)+")":"")+(y?y.zoomFraction(w):""));var I=i.pointCoordinate(z,Y);
v=i.pointCoordinate(z,{x:d.x,y:0});n=i.pointCoordinate(z,d);i=i.pointCoordinate(z,{x:0,y:d.y});if(!w&&!r&&!y){z.column=(Math.round(q.x*z.column)+(d.x&1)/2)/q.x;z.row=(Math.round(q.y*z.row)+(d.y&1)/2)/q.y}if(y){I=y.unapply(I);v=y.unapply(v);n=y.unapply(n);i=y.unapply(i);z=y.unapply(z)}var R=t?t(I.zoom)-I.zoom:0;if(R){d=Math.pow(2,R);I.column*=d;I.row*=d;v.column*=d;v.row*=d;n.column*=d;n.row*=d;i.column*=d;i.row*=d;I.zoom=v.zoom=n.zoom=i.zoom+=R}w=g.locks();var M={};for(var F in w)w[F].proxyCount=
0;if(o&&R>-5&&R<3){r=I.zoom<0?1:1<<I.zoom;if(l){da(I,v,n,0,r,K);da(n,i,I,0,r,K)}else{d=Math.floor((I.column+n.column)/2);r=Math.max(0,Math.min(r-1,Math.floor((v.row+i.row)/2)));v=Math.min(4,I.zoom);d=d>>v<<v;r=r>>v<<v;K(d,d+1,r)}}for(F in M){v=M[F];d=Math.pow(2,v.level=v.zoom-z.zoom);v.element.setAttribute("transform","translate("+(v.x=q.x*(v.column-z.column*d))+","+(v.y=q.y*(v.row-z.row*d))+")")}for(F in w)if(!(F in M)){v=g.unload(F);v.element.parentNode.removeChild(v.element);delete v.proxyRefs}for(F in M){v=
M[F];if(v.element.parentNode!=C[v.level]){C[v.level].appendChild(v.element);a.show&&a.show(v)}}g.flush();a.dispatch({type:"move"})}var a={},g=a.cache=s.cache(e,f).size(512),l=true,o=true,t,m,j,u=s.svg("g"),y,A,C={};u.setAttribute("class","layer");for(var E=-4;E<=-1;E++)C[E]=u.appendChild(s.svg("g"));for(E=2;E>=1;E--)C[E]=u.appendChild(s.svg("g"));C[0]=u.appendChild(s.svg("g"));a.map=function(B){if(!arguments.length)return j;if(j){if(j==B){u.parentNode.appendChild(u);return a}j.off("move",h).off("resize",
h);u.parentNode.removeChild(u)}if(j=B){j.container().appendChild(u);a.init&&a.init(u);j.on("move",h).on("resize",h);h()}return a};a.container=function(){return u};a.levels=function(){return C};a.id=function(B){if(!arguments.length)return m;m=B;u.setAttribute("id",B);return a};a.visible=function(B){if(!arguments.length)return o;(o=B)?u.removeAttribute("visibility"):u.setAttribute("visibility","hidden");j&&h();return a};a.transform=function(B){if(!arguments.length)return y;y=B;j&&h();return a};a.zoom=
function(B){if(!arguments.length)return t;t=typeof B=="function"||B==null?B:function(){return B};j&&h();return a};a.tile=function(B){if(!arguments.length)return l;l=B;j&&h();return a};a.reload=function(){g.clear();j&&h();return a};a.dispatch=s.dispatch(a);a.on("load",function(B){if(B.tile.proxyRefs){for(var K in B.tile.proxyRefs){var i=B.tile.proxyRefs[K];--i.proxyCount<=0&&g.unload(K)&&i.element.parentNode.removeChild(i.element)}delete B.tile.proxyRefs}});return a};s.image=function(){var e=s.layer(function(c){var k=
c.element=s.svg("image"),h=e.map().tileSize();k.setAttribute("preserveAspectRatio","none");k.setAttribute("width",h.x);k.setAttribute("height",h.y);if(typeof f=="function"){k.setAttribute("opacity",0);c.request=s.queue.image(k,f(c),function(a){delete c.request;c.ready=true;c.img=a;k.removeAttribute("opacity");e.dispatch({type:"load",tile:c})})}else{c.ready=true;f&&k.setAttributeNS(s.ns.xlink,"href",f);e.dispatch({type:"load",tile:c})}},function(c){c.request&&c.request.abort(true)}),f;e.url=function(c){if(!arguments.length)return f;
f=typeof c=="string"&&/{.}/.test(c)?s.url(c):c;return e.reload()};return e};s.geoJson=function(e){function f(i){var n={lat:0,lon:0};return function(w){n.lat=w[1];n.lon=w[0];var d=i(n);w.x=d.x;w.y=d.y;return d}}function c(i,n){return i&&i.type in C&&C[i.type](i,n)}function k(i,n,w){return i.type in E&&E[i.type](i,n,w)}function h(){var i=a.map().zoom(),n=a.cache.locks(),w,d,r,q,z,v,L;if(y=="fixed")for(w in n){if((d=n[w]).scale!=i){L="scale("+Math.pow(2,d.zoom-i)+")";q=-1;for(z=(r=d.features).length;++q<
z;)k((v=r[q]).data.geometry,v.element,L);d.scale=i}}else for(w in n){q=-1;for(z=(r=(d=n[w]).features).length;++q<z;)k((v=r[q]).data.geometry,v.element,"");delete d.scale}}var a=s.layer(function(i,n){function w(r){var q=[];if(r.next)i.request=e(r.next.href,w);switch(r.type){case "FeatureCollection":for(var z=0;z<r.features.length;z++){var v=r.features[z],L=c(v.geometry,n);L&&q.push({element:d.appendChild(L),data:v})}break;case "Feature":(L=c(r.geometry,n))&&q.push({element:d.appendChild(L),data:r});
break;default:(L=c(r,n))&&q.push({element:d.appendChild(L),data:{type:"Feature",geometry:r}});break}i.ready=true;q.push.apply(i.features,q);a.dispatch({type:"load",tile:i,features:q})}var d=i.element=s.svg("g");i.features=[];n=f(n(i).locationPoint);if(l!=null)i.request=e(typeof l=="function"?l(i):l,w);else w({type:"FeatureCollection",features:A||[]})},function(i){i.request&&i.request.abort(true)}),g=a.container(),l,o=true,t="org.polymaps."+s.id(),m="url(#"+t+")",j=g.insertBefore(s.svg("clipPath"),
g.firstChild),u=j.appendChild(s.svg("rect")),y="auto",A;g.setAttribute("fill-rule","evenodd");j.setAttribute("id",t);if(!arguments.length)e=s.queue.json;var C={Point:function(i,n){var w=n(i.coordinates),d=s.svg("circle");d.setAttribute("r",4.5);d.setAttribute("transform","translate("+w.x+","+w.y+")");return d},MultiPoint:function(i,n){for(var w=s.svg("g"),d=i.coordinates,r,q,z=-1,v=d.length;++z<v;){q=w.appendChild(s.svg("circle"));q.setAttribute("r",4.5);q.setAttribute("transform","translate("+(r=
n(d[z])).x+","+r.y+")")}return w},LineString:function(i,n){for(var w=s.svg("path"),d=["M"],r=i.coordinates,q,z=-1,v=r.length;++z<v;)d.push((q=n(r[z])).x,",",q.y,"L");d.pop();if(d.length){w.setAttribute("d",d.join(""));return w}},MultiLineString:function(i,n){for(var w=s.svg("path"),d=[],r=i.coordinates,q,z=-1,v,L=r.length,I;++z<L;){q=r[z];v=-1;I=q.length;for(d.push("M");++v<I;)d.push((p=n(q[v])).x,",",p.y,"L");d.pop()}if(d.length){w.setAttribute("d",d.join(""));return w}},Polygon:function(i,n){for(var w=
s.svg("path"),d=[],r=i.coordinates,q,z=-1,v,L=r.length,I;++z<L;){q=r[z];v=-1;I=q.length-1;for(d.push("M");++v<I;)d.push((p=n(q[v])).x,",",p.y,"L");d[d.length-1]="Z"}if(d.length){w.setAttribute("d",d.join(""));return w}},MultiPolygon:function(i,n){for(var w=s.svg("path"),d=[],r=i.coordinates,q,z,v=-1,L,I,R=r.length,M,F;++v<R;){q=r[v];L=-1;for(M=q.length;++L<M;){z=q[L];I=-1;F=z.length-1;for(d.push("M");++I<F;)d.push((p=n(z[I])).x,",",p.y,"L");d[d.length-1]="Z"}}if(d.length){w.setAttribute("d",d.join(""));
return w}},GeometryCollection:function(i,n){for(var w=s.svg("g"),d=-1,r=i.geometries,q=r.length,z;++d<q;)(z=c(r[d],n))&&w.appendChild(z);return w}},E={Point:function(i,n,w){i=i.coordinates;n.setAttribute("transform","translate("+i.x+","+i.y+")"+w)},MultiPoint:function(i,n,w){i=i.coordinates;var d=-1,r=q.length;n=n.firstChild;for(var q;++d<r;){q=i[d];n.setAttribute("transform","translate("+q.x+","+q.y+")"+w);n=n.nextSibling}}};a.url=function(i){if(!arguments.length)return l;l=typeof i=="string"&&/{.}/.test(i)?
s.url(i):i;if(l!=null)A=null;typeof l=="string"&&a.tile(false);return a.reload()};a.features=function(i){if(!arguments.length)return A;if(A=i){l=null;a.tile(false)}return a.reload()};a.clip=function(i){if(!arguments.length)return o;o&&g.removeChild(j);if(o=i)g.insertBefore(j,g.firstChild);var n=a.cache.locks();for(var w in n)o?n[w].element.setAttribute("clip-path",m):n[w].element.removeAttribute("clip-path");return a};var B=a.tile;a.tile=function(i){arguments.length&&!i&&a.clip(i);return B.apply(a,
arguments)};var K=a.map;a.map=function(i){if(i&&u){var n=i.tileSize();u.setAttribute("width",n.x);u.setAttribute("height",n.y)}return K.apply(a,arguments)};a.scale=function(i){if(!arguments.length)return y;(y=i)?a.on("move",h):a.off("move",h);a.map()&&h();return a};a.show=function(i){o?i.element.setAttribute("clip-path",m):i.element.removeAttribute("clip-path");a.dispatch({type:"show",tile:i,features:i.features});return a};a.reshow=function(){var i=a.cache.locks();for(var n in i)a.show(i[n]);return a};
return a};s.dblclick=function(){function e(a){var g=k.zoom();g=a.shiftKey?Math.ceil(g)-g-1:1-g+Math.floor(g);c==="mouse"?k.zoomBy(g,k.mouse(a)):k.zoomBy(g)}var f={},c="mouse",k,h;f.zoom=function(a){if(!arguments.length)return c;c=a;return f};f.map=function(a){if(!arguments.length)return k;if(k){h.removeEventListener("dblclick",e,false);h=null}if(k=a){h=k.container();h.addEventListener("dblclick",e,false)}return f};return f};s.drag=function(){function e(g){if(!g.shiftKey){a={x:g.clientX,y:g.clientY};
k.focusableParent().focus();g.preventDefault();document.body.style.setProperty("cursor","move",null)}}function f(g){if(a){k.panBy({x:g.clientX-a.x,y:g.clientY-a.y});a.x=g.clientX;a.y=g.clientY}}var c={},k,h,a;c.map=function(g){if(!arguments.length)return k;if(k){h.removeEventListener("mousedown",e,false);h=null}if(k=g){h=k.container();h.addEventListener("mousedown",e,false)}return c};window.addEventListener("mousemove",f,false);window.addEventListener("mouseup",function(g){if(a){f(g);a=null;document.body.style.removeProperty("cursor")}},
false);return c};s.wheel=function(){function e(){l=null}function f(m){var j=(m.wheelDelta/120||-m.detail)*0.1,u;if(ba<0){u=Date.now();var y=u-h;if(y>9&&Math.abs(m.wheelDelta)/y>=50)ba=1;h=u}if(ba==1)j*=0.03;if(!a&&j){u=Date.now();if(u-k>200){j=j>0?+1:-1;k=u}else j=0}if(j)switch(g){case "mouse":u=o.mouse(m);l||(l=o.pointLocation(u));o.off("move",e).zoomBy(j,u,l).on("move",e);break;case "location":o.zoomBy(j,o.locationPoint(l),l);break;default:o.zoomBy(j);break}m.preventDefault();return false}var c=
{},k=0,h=0,a=true,g="mouse",l,o,t;c.smooth=function(m){if(!arguments.length)return a;a=m;return c};c.zoom=function(m,j){if(!arguments.length)return g;g=m;l=j;if(o)g=="mouse"?o.on("move",e):o.off("move",e);return c};c.map=function(m){if(!arguments.length)return o;if(o){t.removeEventListener("mousemove",e,false);t.removeEventListener("mousewheel",f,false);t.removeEventListener("DOMMouseScroll",f,false);t=null;o.off("move",e)}if(o=m){g=="mouse"&&o.on("move",e);t=o.container();t.addEventListener("mousemove",
e,false);t.addEventListener("mousewheel",f,false);t.addEventListener("DOMMouseScroll",f,false)}return c};return c};var ba=/WebKit\/533/.test(navigator.userAgent)?-1:0;s.arrow=function(){function e(y){if(!(y.ctrlKey||y.altKey||y.metaKey)){var A=Date.now(),C=0,E=0;switch(y.keyCode){case 37:if(!a.left){g=A;a.left=1;a.right||(C=m)}break;case 39:if(!a.right){g=A;a.right=1;a.left||(C=-m)}break;case 38:if(!a.up){g=A;a.up=1;a.down||(E=m)}break;case 40:if(!a.down){g=A;a.down=1;a.up||(E=-m)}break;default:return}if(C||
E)j.panBy({x:C,y:E});if(!l&&a.left|a.right|a.up|a.down)l=setInterval(k,t);y.preventDefault()}}function f(y){g=Date.now();switch(y.keyCode){case 37:a.left=0;break;case 39:a.right=0;break;case 38:a.up=0;break;case 40:a.down=0;break;default:return}if(l&&!(a.left|a.right|a.up|a.down))l=clearInterval(l);y.preventDefault()}function c(y){switch(y.charCode){case 45:case 95:j.zoom(Math.ceil(j.zoom())-1);break;case 43:case 61:j.zoom(Math.floor(j.zoom())+1);break;default:return}y.preventDefault()}function k(){if(j)if(!(Date.now()<
g+o)){var y=(a.left-a.right)*m,A=(a.up-a.down)*m;if(y||A)j.panBy({x:y,y:A})}}var h={},a={left:0,right:0,up:0,down:0},g=0,l,o=250,t=50,m=16,j,u;h.map=function(y){if(!arguments.length)return j;if(j){u.removeEventListener("keypress",c,false);u.removeEventListener("keydown",e,false);u.removeEventListener("keyup",f,false);u=null}if(j=y){u=j.focusableParent();u.addEventListener("keypress",c,false);u.addEventListener("keydown",e,false);u.addEventListener("keyup",f,false)}return h};h.speed=function(y){if(!arguments.length)return m;
m=y;return h};return h};s.hash=function(){function e(){var l=g(h);if(k!==l)location.replace(k=l)}function f(){if(location.hash!==k)a((k=location.hash).substring(1))}var c={},k,h,a=function(l){l=l.split("/").map(Number);if(l.length<3||l.some(isNaN))e();else{var o=h.size();h.zoomBy(l[0]-h.zoom(),{x:o.x/2,y:o.y/2},{lat:Math.min(89.99999999,Math.max(-89.99999999,l[1])),lon:l[2]})}},g=function(l){var o=l.center();l=l.zoom();var t=Math.max(0,Math.ceil(Math.log(l)/Math.LN2));return"#"+l.toFixed(2)+"/"+o.lat.toFixed(t)+
"/"+o.lon.toFixed(t)};c.map=function(l){if(!arguments.length)return h;if(h){h.off("move",e);window.removeEventListener("hashchange",f,false)}if(h=l){h.on("move",e);window.addEventListener("hashchange",f,false);location.hash?f():e()}return c};c.parser=function(l){if(!arguments.length)return a;a=l;return c};c.formatter=function(l){if(!arguments.length)return g;g=l;return c};return c};s.interact=function(){var e={},f=s.drag(),c=s.wheel(),k=s.dblclick(),h=s.arrow();e.map=function(a){f.map(a);c.map(a);
k.map(a);h.map(a);return e};return e};s.compass=function(){function e(x){B.setAttribute("class","compass active");I||(I=setInterval(f,r));R&&H.panBy(R);w=Date.now();return m(x)}function f(){R&&Date.now()>w+d&&H.panBy(R)}function c(x){if(x.shiftKey){F={x0:H.mouse(x)};H.focusableParent().focus();return m(x)}}function k(x){if(F){F.x1=H.mouse(x);O.setAttribute("x",Math.min(F.x0.x,F.x1.x));O.setAttribute("y",Math.min(F.x0.y,F.x1.y));O.setAttribute("width",Math.abs(F.x0.x-F.x1.x));O.setAttribute("height",
Math.abs(F.x0.y-F.x1.y));O.removeAttribute("display")}}function h(){B.setAttribute("class","compass");if(F){if(F.x1){H.extent([H.pointLocation({x:Math.min(F.x0.x,F.x1.x),y:Math.max(F.x0.y,F.x1.y)}),H.pointLocation({x:Math.max(F.x0.x,F.x1.x),y:Math.min(F.x0.y,F.x1.y)})]);O.setAttribute("display","none")}F=null}if(I){clearInterval(I);I=0}}function a(x){return function(){x?this.setAttribute("class","active"):this.removeAttribute("class");R=x}}function g(x){return function(D){B.setAttribute("class","compass active");
var G=H.zoom();H.zoom(x<0?Math.ceil(G)-1:Math.floor(G)+1);return m(D)}}function l(x){return function(D){H.zoom(x);return m(D)}}function o(){this.setAttribute("class","active")}function t(){this.removeAttribute("class")}function m(x){x.stopPropagation();x.preventDefault();return false}function j(x){var D=Math.SQRT1_2*i,G=i*0.7,J=i*0.2,N=s.svg("g"),P=N.appendChild(s.svg("path")),Q=N.appendChild(s.svg("path"));P.setAttribute("class","direction");P.setAttribute("pointer-events","all");P.setAttribute("d",
"M0,0L"+D+","+D+"A"+i+","+i+" 0 0,1 "+-D+","+D+"Z");Q.setAttribute("class","chevron");Q.setAttribute("d","M"+J+","+(G-J)+"L0,"+G+" "+-J+","+(G-J));Q.setAttribute("pointer-events","none");N.addEventListener("mousedown",e,false);N.addEventListener("mouseover",a(x),false);N.addEventListener("mouseout",a(null),false);N.addEventListener("dblclick",m,false);return N}function u(x){var D=i*0.4,G=D/2,J=s.svg("g"),N=J.appendChild(s.svg("path")),P=J.appendChild(s.svg("path")),Q=J.appendChild(s.svg("path")),
X=J.appendChild(s.svg("path"));N.setAttribute("class","back");N.setAttribute("d","M"+-D+",0V"+-D+"A"+D+","+D+" 0 1,1 "+D+","+-D+"V0Z");P.setAttribute("class","direction");P.setAttribute("d",N.getAttribute("d"));Q.setAttribute("class","chevron");Q.setAttribute("d","M"+-G+","+-D+"H"+G+(x>0?"M0,"+(-D-G)+"V"+-G:""));X.setAttribute("class","fore");X.setAttribute("fill","none");X.setAttribute("d",N.getAttribute("d"));J.addEventListener("mousedown",g(x),false);J.addEventListener("mouseover",o,false);J.addEventListener("mouseout",
t,false);J.addEventListener("dblclick",m,false);return J}function y(x){var D=i*0.2,G=i*0.4,J=s.svg("g"),N=J.appendChild(s.svg("rect")),P=J.appendChild(s.svg("path"));N.setAttribute("pointer-events","all");N.setAttribute("fill","none");N.setAttribute("x",-G);N.setAttribute("y",-0.75*G);N.setAttribute("width",2*G);N.setAttribute("height",1.5*G);P.setAttribute("class","chevron");P.setAttribute("d","M"+-D+",0H"+D);J.addEventListener("mousedown",l(x),false);J.addEventListener("dblclick",m,false);return J}
function A(){var x=i+6,D=x,G=H.size();switch(q){case "top-left":break;case "top-right":x=G.x-x;break;case "bottom-left":D=G.y-D;break;case "bottom-right":x=G.x-x;D=G.y-D;break}x="translate("+x+","+D+")";M&&M.setAttribute("transform",x);v&&v.setAttribute("transform",x);for(var J in K)J==H.zoom()?K[J].setAttribute("class","active"):K[J].removeAttribute("class")}function C(){for(;B.lastChild;)B.removeChild(B.lastChild);B.appendChild(O);if(L!="none"){M=B.appendChild(s.svg("g"));M.setAttribute("class",
"pan");var x=M.appendChild(s.svg("circle"));x.setAttribute("class","back");x.setAttribute("r",i);M.appendChild(j({x:0,y:-n})).setAttribute("transform","rotate(0)");M.appendChild(j({x:n,y:0})).setAttribute("transform","rotate(90)");M.appendChild(j({x:0,y:n})).setAttribute("transform","rotate(180)");M.appendChild(j({x:-n,y:0})).setAttribute("transform","rotate(270)");x=M.appendChild(s.svg("circle"));x.setAttribute("fill","none");x.setAttribute("class","fore");x.setAttribute("r",i)}else M=null;if(z!=
"none"){v=B.appendChild(s.svg("g"));v.setAttribute("class","zoom");x=-0.5;if(z=="big"){K={};var D=H.zoomRange()[0];for(x=0;D<=H.zoomRange()[1];D++,x++)(K[D]=v.appendChild(y(D))).setAttribute("transform","translate(0,"+-(x+0.75)*i*0.4+")")}D=L=="none"?0.4:2;v.setAttribute("transform","translate(0,"+i*(/^top-/.test(q)?D+(x+0.5)*0.4:-D)+")");v.appendChild(u(+1)).setAttribute("transform","translate(0,"+-(x+0.5)*i*0.4+")");v.appendChild(u(-1)).setAttribute("transform","scale(-1)")}else v=null;A()}var E=
{},B=s.svg("g"),K={},i=30,n=16,w=0,d=250,r=50,q="top-left",z="small",v,L="small",I,R,M,F,O=s.svg("rect"),H,T,U;B.setAttribute("class","compass");O.setAttribute("class","back fore");O.setAttribute("pointer-events","none");O.setAttribute("display","none");E.radius=function(x){if(!arguments.length)return i;i=x;H&&C();return E};E.speed=function(x){if(!arguments.length)return i;n=x;return E};E.position=function(x){if(!arguments.length)return q;q=x;H&&C();return E};E.pan=function(x){if(!arguments.length)return L;
L=x;H&&C();return E};E.zoom=function(x){if(!arguments.length)return z;z=x;H&&C();return E};E.map=function(x){if(!arguments.length)return H;if(H){T.removeEventListener("mousedown",c,false);T.removeChild(B);T=null;U.removeEventListener("mousemove",k,false);U.removeEventListener("mouseup",h,false);U=null;H.off("move",A).off("resize",A)}if(H=x){T=H.container();T.appendChild(B);T.addEventListener("mousedown",c,false);U=T.ownerDocument.defaultView;U.addEventListener("mousemove",k,false);U.addEventListener("mouseup",
h,false);H.on("move",A).on("resize",A);C()}return E};return E};s.grid=function(){function e(){var h=k.firstChild,a=c.size(),g=c.pointLocation(Y);c.pointLocation(a);var l=Math.pow(2,4-Math.round(c.zoom()));g.lat=Math.floor(g.lat/l)*l;g.lon=Math.ceil(g.lon/l)*l;for(var o;(o=c.locationPoint(g).x)<=a.x;g.lon+=l){h||(h=k.appendChild(s.svg("line")));h.setAttribute("x1",o);h.setAttribute("x2",o);h.setAttribute("y1",0);h.setAttribute("y2",a.y);h=h.nextSibling}for(;(o=c.locationPoint(g).y)<=a.y;g.lat-=l){h||
(h=k.appendChild(s.svg("line")));h.setAttribute("y1",o);h.setAttribute("y2",o);h.setAttribute("x1",0);h.setAttribute("x2",a.x);h=h.nextSibling}for(;h;){a=h.nextSibling;k.removeChild(h);h=a}}var f={},c,k=s.svg("g");k.setAttribute("class","grid");f.map=function(h){if(!arguments.length)return c;if(c){k.parentNode.removeChild(k);c.off("move",e).off("resize",e)}if(c=h){c.on("move",e).on("resize",e);c.container().appendChild(k);c.dispatch({type:"move"})}return f};return f};s.stylist=function(){function e(h){var a=
h.features.length,g=f.length,l=c.length,o,t,m,j,u,y;for(u=0;u<a;++u)if(t=(o=h.features[u]).element){o=o.data;for(y=0;y<g;++y){j=(m=f[y]).value;if(typeof j==="function")j=j.call(null,o);j==null?m.name.local?t.removeAttributeNS(m.name.space,m.name.local):t.removeAttribute(m.name):m.name.local?t.setAttributeNS(m.name.space,m.name.local,j):t.setAttribute(m.name,j)}for(y=0;y<l;++y){j=(m=c[y]).value;if(typeof j==="function")j=j.call(null,o);j==null?t.style.removeProperty(m.name):t.style.setProperty(m.name,
j,m.priority)}if(j=k){if(typeof j==="function")j=j.call(null,o);for(;t.lastChild;)t.removeChild(t.lastChild);j!=null&&t.appendChild(s.svg("title")).appendChild(document.createTextNode(j))}}}var f=[],c=[],k;e.attr=function(h,a){f.push({name:fa(h),value:a});return e};e.style=function(h,a,g){c.push({name:h,value:a,priority:arguments.length<3?null:g});return e};e.title=function(h){k=h;return e};return e}})(org.polymaps);
