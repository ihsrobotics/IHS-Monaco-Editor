import{g as Ue,R as $e,r as N}from"../vendor-1pvYTyrb.js";function le(){return le=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},le.apply(this,arguments)}function Je(e){var r=Object.create(null);return function(t){return r[t]===void 0&&(r[t]=e(t)),r[t]}}const rt=globalThis||void 0||self;function Qe(e){if(e.sheet)return e.sheet;for(var r=0;r<document.styleSheets.length;r++)if(document.styleSheets[r].ownerNode===e)return document.styleSheets[r]}function Xe(e){var r=document.createElement("style");return r.setAttribute("data-emotion",e.key),e.nonce!==void 0&&r.setAttribute("nonce",e.nonce),r.appendChild(document.createTextNode("")),r.setAttribute("data-s",""),r}var er=function(){function e(t){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=t.speedy===void 0?!0:t.speedy,this.tags=[],this.ctr=0,this.nonce=t.nonce,this.key=t.key,this.container=t.container,this.prepend=t.prepend,this.insertionPoint=t.insertionPoint,this.before=null}var r=e.prototype;return r.hydrate=function(n){n.forEach(this._insertTag)},r.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Xe(this));var a=this.tags[this.tags.length-1];if(this.isSpeedy){var s=Qe(a);try{s.insertRule(n,s.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},r.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}(),S="-ms-",U="-moz-",f="-webkit-",_e="comm",ye="rule",me="decl",rr="@import",Fe="@keyframes",tr="@layer",nr=Math.abs,J=String.fromCharCode,ar=Object.assign;function sr(e,r){return v(e,0)^45?(((r<<2^v(e,0))<<2^v(e,1))<<2^v(e,2))<<2^v(e,3):0}function je(e){return e.trim()}function ir(e,r){return(e=r.exec(e))?e[0]:e}function u(e,r,t){return e.replace(r,t)}function he(e,r){return e.indexOf(r)}function v(e,r){return e.charCodeAt(r)|0}function D(e,r,t){return e.slice(r,t)}function k(e){return e.length}function be(e){return e.length}function B(e,r){return r.push(e),e}function cr(e,r){return e.map(r).join("")}var Q=1,W=1,We=0,C=0,y=0,L="";function X(e,r,t,n,a,s,i){return{value:e,root:r,parent:t,type:n,props:a,children:s,line:Q,column:W,length:i,return:""}}function z(e,r){return ar(X("",null,null,"",null,null,0),e,{length:-e.length},r)}function or(){return y}function fr(){return y=C>0?v(L,--C):0,W--,y===10&&(W=1,Q--),y}function O(){return y=C<We?v(L,C++):0,W++,y===10&&(W=1,Q++),y}function M(){return v(L,C)}function H(){return C}function q(e,r){return D(L,e,r)}function G(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Le(e){return Q=W=1,We=k(L=e),C=0,[]}function ze(e){return L="",e}function Y(e){return je(q(C-1,de(e===91?e+2:e===40?e+1:e)))}function ur(e){for(;(y=M())&&y<33;)O();return G(e)>2||G(y)>3?"":" "}function lr(e,r){for(;--r&&O()&&!(y<48||y>102||y>57&&y<65||y>70&&y<97););return q(e,H()+(r<6&&M()==32&&O()==32))}function de(e){for(;O();)switch(y){case e:return C;case 34:case 39:e!==34&&e!==39&&de(y);break;case 40:e===41&&de(e);break;case 92:O();break}return C}function hr(e,r){for(;O()&&e+y!==57;)if(e+y===84&&M()===47)break;return"/*"+q(r,C-1)+"*"+J(e===47?e:O())}function dr(e){for(;!G(M());)O();return q(e,C)}function pr(e){return ze(Z("",null,null,null,[""],e=Le(e),0,[0],e))}function Z(e,r,t,n,a,s,i,c,o){for(var g=0,m=0,x=i,I=0,_=0,E=0,d=1,$=1,p=1,w=0,P="",K=a,F=s,T=n,h=P;$;)switch(E=w,w=O()){case 40:if(E!=108&&v(h,x-1)==58){he(h+=u(Y(w),"&","&\f"),"&\f")!=-1&&(p=-1);break}case 34:case 39:case 91:h+=Y(w);break;case 9:case 10:case 13:case 32:h+=ur(E);break;case 92:h+=lr(H()-1,7);continue;case 47:switch(M()){case 42:case 47:B(yr(hr(O(),H()),r,t),o);break;default:h+="/"}break;case 123*d:c[g++]=k(h)*p;case 125*d:case 59:case 0:switch(w){case 0:case 125:$=0;case 59+m:p==-1&&(h=u(h,/\f/g,"")),_>0&&k(h)-x&&B(_>32?Ee(h+";",n,t,x-1):Ee(u(h," ","")+";",n,t,x-2),o);break;case 59:h+=";";default:if(B(T=Ce(h,r,t,g,m,a,c,P,K=[],F=[],x),s),w===123)if(m===0)Z(h,r,T,T,K,s,x,c,F);else switch(I===99&&v(h,3)===110?100:I){case 100:case 108:case 109:case 115:Z(e,T,T,n&&B(Ce(e,T,T,0,0,a,c,P,a,K=[],x),F),a,F,x,c,n?K:F);break;default:Z(h,T,T,T,[""],F,0,c,F)}}g=m=_=0,d=p=1,P=h="",x=i;break;case 58:x=1+k(h),_=E;default:if(d<1){if(w==123)--d;else if(w==125&&d++==0&&fr()==125)continue}switch(h+=J(w),w*d){case 38:p=m>0?1:(h+="\f",-1);break;case 44:c[g++]=(k(h)-1)*p,p=1;break;case 64:M()===45&&(h+=Y(O())),I=M(),m=x=k(P=h+=dr(H())),w++;break;case 45:E===45&&k(h)==2&&(d=0)}}return s}function Ce(e,r,t,n,a,s,i,c,o,g,m){for(var x=a-1,I=a===0?s:[""],_=be(I),E=0,d=0,$=0;E<n;++E)for(var p=0,w=D(e,x+1,x=nr(d=i[E])),P=e;p<_;++p)(P=je(d>0?I[p]+" "+w:u(w,/&\f/g,I[p])))&&(o[$++]=P);return X(e,r,t,a===0?ye:c,o,g,m)}function yr(e,r,t){return X(e,r,t,_e,J(or()),D(e,2,-2),0)}function Ee(e,r,t,n){return X(e,r,t,me,D(e,0,n),D(e,n+1,-1),n)}function j(e,r){for(var t="",n=be(e),a=0;a<n;a++)t+=r(e[a],a,e,r)||"";return t}function mr(e,r,t,n){switch(e.type){case tr:if(e.children.length)break;case rr:case me:return e.return=e.return||e.value;case _e:return"";case Fe:return e.return=e.value+"{"+j(e.children,n)+"}";case ye:e.value=e.props.join(",")}return k(t=j(e.children,n))?e.return=e.value+"{"+t+"}":""}function br(e){var r=be(e);return function(t,n,a,s){for(var i="",c=0;c<r;c++)i+=e[c](t,n,a,s)||"";return i}}function vr(e){return function(r){r.root||(r=r.return)&&e(r)}}var Oe=function(r){var t=new WeakMap;return function(n){if(t.has(n))return t.get(n);var a=r(n);return t.set(n,a),a}},gr=function(r,t,n){for(var a=0,s=0;a=s,s=M(),a===38&&s===12&&(t[n]=1),!G(s);)O();return q(r,C)},xr=function(r,t){var n=-1,a=44;do switch(G(a)){case 0:a===38&&M()===12&&(t[n]=1),r[n]+=gr(C-1,t,n);break;case 2:r[n]+=Y(a);break;case 4:if(a===44){r[++n]=M()===58?"&\f":"",t[n]=r[n].length;break}default:r[n]+=J(a)}while(a=O());return r},wr=function(r,t){return ze(xr(Le(r),t))},Ae=new WeakMap,Sr=function(r){if(!(r.type!=="rule"||!r.parent||r.length<1)){for(var t=r.value,n=r.parent,a=r.column===n.column&&r.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(r.props.length===1&&t.charCodeAt(0)!==58&&!Ae.get(n))&&!a){Ae.set(r,!0);for(var s=[],i=wr(t,s),c=n.props,o=0,g=0;o<i.length;o++)for(var m=0;m<c.length;m++,g++)r.props[g]=s[o]?i[o].replace(/&\f/g,c[m]):c[m]+" "+i[o]}}},$r=function(r){if(r.type==="decl"){var t=r.value;t.charCodeAt(0)===108&&t.charCodeAt(2)===98&&(r.return="",r.value="")}};function De(e,r){switch(sr(e,r)){case 5103:return f+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return f+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return f+e+U+e+S+e+e;case 6828:case 4268:return f+e+S+e+e;case 6165:return f+e+S+"flex-"+e+e;case 5187:return f+e+u(e,/(\w+).+(:[^]+)/,f+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return f+e+S+"flex-item-"+u(e,/flex-|-self/,"")+e;case 4675:return f+e+S+"flex-line-pack"+u(e,/align-content|flex-|-self/,"")+e;case 5548:return f+e+S+u(e,"shrink","negative")+e;case 5292:return f+e+S+u(e,"basis","preferred-size")+e;case 6060:return f+"box-"+u(e,"-grow","")+f+e+S+u(e,"grow","positive")+e;case 4554:return f+u(e,/([^-])(transform)/g,"$1"+f+"$2")+e;case 6187:return u(u(u(e,/(zoom-|grab)/,f+"$1"),/(image-set)/,f+"$1"),e,"")+e;case 5495:case 3959:return u(e,/(image-set\([^]*)/,f+"$1$`$1");case 4968:return u(u(e,/(.+:)(flex-)?(.*)/,f+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+f+e+e;case 4095:case 3583:case 4068:case 2532:return u(e,/(.+)-inline(.+)/,f+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-r>6)switch(v(e,r+1)){case 109:if(v(e,r+4)!==45)break;case 102:return u(e,/(.+:)(.+)-([^]+)/,"$1"+f+"$2-$3$1"+U+(v(e,r+3)==108?"$3":"$2-$3"))+e;case 115:return~he(e,"stretch")?De(u(e,"stretch","fill-available"),r)+e:e}break;case 4949:if(v(e,r+1)!==115)break;case 6444:switch(v(e,k(e)-3-(~he(e,"!important")&&10))){case 107:return u(e,":",":"+f)+e;case 101:return u(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+f+(v(e,14)===45?"inline-":"")+"box$3$1"+f+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(v(e,r+11)){case 114:return f+e+S+u(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return f+e+S+u(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return f+e+S+u(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return f+e+S+e+e}return e}var Cr=function(r,t,n,a){if(r.length>-1&&!r.return)switch(r.type){case me:r.return=De(r.value,r.length);break;case Fe:return j([z(r,{value:u(r.value,"@","@"+f)})],a);case ye:if(r.length)return cr(r.props,function(s){switch(ir(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return j([z(r,{props:[u(s,/:(read-\w+)/,":"+U+"$1")]})],a);case"::placeholder":return j([z(r,{props:[u(s,/:(plac\w+)/,":"+f+"input-$1")]}),z(r,{props:[u(s,/:(plac\w+)/,":"+U+"$1")]}),z(r,{props:[u(s,/:(plac\w+)/,S+"input-$1")]})],a)}return""})}},Er=[Cr],Or=function(r){var t=r.key;if(t==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(d){var $=d.getAttribute("data-emotion");$.indexOf(" ")!==-1&&(document.head.appendChild(d),d.setAttribute("data-s",""))})}var a=r.stylisPlugins||Er,s={},i,c=[];i=r.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),function(d){for(var $=d.getAttribute("data-emotion").split(" "),p=1;p<$.length;p++)s[$[p]]=!0;c.push(d)});var o,g=[Sr,$r];{var m,x=[mr,vr(function(d){m.insert(d)})],I=br(g.concat(a,x)),_=function($){return j(pr($),I)};o=function($,p,w,P){m=w,_($?$+"{"+p.styles+"}":p.styles),P&&(E.inserted[p.name]=!0)}}var E={key:t,sheet:new er({key:t,container:i,nonce:r.nonce,speedy:r.speedy,prepend:r.prepend,insertionPoint:r.insertionPoint}),nonce:r.nonce,inserted:s,registered:{},insert:o};return E.sheet.hydrate(c),E},Ge={exports:{}},l={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b=typeof Symbol=="function"&&Symbol.for,ve=b?Symbol.for("react.element"):60103,ge=b?Symbol.for("react.portal"):60106,ee=b?Symbol.for("react.fragment"):60107,re=b?Symbol.for("react.strict_mode"):60108,te=b?Symbol.for("react.profiler"):60114,ne=b?Symbol.for("react.provider"):60109,ae=b?Symbol.for("react.context"):60110,xe=b?Symbol.for("react.async_mode"):60111,se=b?Symbol.for("react.concurrent_mode"):60111,ie=b?Symbol.for("react.forward_ref"):60112,ce=b?Symbol.for("react.suspense"):60113,Ar=b?Symbol.for("react.suspense_list"):60120,oe=b?Symbol.for("react.memo"):60115,fe=b?Symbol.for("react.lazy"):60116,Pr=b?Symbol.for("react.block"):60121,Tr=b?Symbol.for("react.fundamental"):60117,kr=b?Symbol.for("react.responder"):60118,Rr=b?Symbol.for("react.scope"):60119;function A(e){if(typeof e=="object"&&e!==null){var r=e.$$typeof;switch(r){case ve:switch(e=e.type,e){case xe:case se:case ee:case te:case re:case ce:return e;default:switch(e=e&&e.$$typeof,e){case ae:case ie:case fe:case oe:case ne:return e;default:return r}}case ge:return r}}}function Ve(e){return A(e)===se}l.AsyncMode=xe;l.ConcurrentMode=se;l.ContextConsumer=ae;l.ContextProvider=ne;l.Element=ve;l.ForwardRef=ie;l.Fragment=ee;l.Lazy=fe;l.Memo=oe;l.Portal=ge;l.Profiler=te;l.StrictMode=re;l.Suspense=ce;l.isAsyncMode=function(e){return Ve(e)||A(e)===xe};l.isConcurrentMode=Ve;l.isContextConsumer=function(e){return A(e)===ae};l.isContextProvider=function(e){return A(e)===ne};l.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===ve};l.isForwardRef=function(e){return A(e)===ie};l.isFragment=function(e){return A(e)===ee};l.isLazy=function(e){return A(e)===fe};l.isMemo=function(e){return A(e)===oe};l.isPortal=function(e){return A(e)===ge};l.isProfiler=function(e){return A(e)===te};l.isStrictMode=function(e){return A(e)===re};l.isSuspense=function(e){return A(e)===ce};l.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===ee||e===se||e===te||e===re||e===ce||e===Ar||typeof e=="object"&&e!==null&&(e.$$typeof===fe||e.$$typeof===oe||e.$$typeof===ne||e.$$typeof===ae||e.$$typeof===ie||e.$$typeof===Tr||e.$$typeof===kr||e.$$typeof===Rr||e.$$typeof===Pr)};l.typeOf=A;Ge.exports=l;var Mr=Ge.exports,we=Mr,Ir={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Nr={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},_r={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},qe={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Se={};Se[we.ForwardRef]=_r;Se[we.Memo]=qe;function Pe(e){return we.isMemo(e)?qe:Se[e.$$typeof]||Ir}var Fr=Object.defineProperty,jr=Object.getOwnPropertyNames,Te=Object.getOwnPropertySymbols,Wr=Object.getOwnPropertyDescriptor,Lr=Object.getPrototypeOf,ke=Object.prototype;function Ke(e,r,t){if(typeof r!="string"){if(ke){var n=Lr(r);n&&n!==ke&&Ke(e,n,t)}var a=jr(r);Te&&(a=a.concat(Te(r)));for(var s=Pe(e),i=Pe(r),c=0;c<a.length;++c){var o=a[c];if(!Nr[o]&&!(t&&t[o])&&!(i&&i[o])&&!(s&&s[o])){var g=Wr(r,o);try{Fr(e,o,g)}catch{}}}}return e}var zr=Ke;const tt=Ue(zr);var Dr=!0;function nt(e,r,t){var n="";return t.split(" ").forEach(function(a){e[a]!==void 0?r.push(e[a]+";"):n+=a+" "}),n}var Gr=function(r,t,n){var a=r.key+"-"+t.name;(n===!1||Dr===!1)&&r.registered[a]===void 0&&(r.registered[a]=t.styles)},Vr=function(r,t,n){Gr(r,t,n);var a=r.key+"-"+t.name;if(r.inserted[t.name]===void 0){var s=t;do r.insert(t===s?"."+a:"",s,r.sheet,!0),s=s.next;while(s!==void 0)}};function qr(e){for(var r=0,t,n=0,a=e.length;a>=4;++n,a-=4)t=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,t=(t&65535)*1540483477+((t>>>16)*59797<<16),t^=t>>>24,r=(t&65535)*1540483477+((t>>>16)*59797<<16)^(r&65535)*1540483477+((r>>>16)*59797<<16);switch(a){case 3:r^=(e.charCodeAt(n+2)&255)<<16;case 2:r^=(e.charCodeAt(n+1)&255)<<8;case 1:r^=e.charCodeAt(n)&255,r=(r&65535)*1540483477+((r>>>16)*59797<<16)}return r^=r>>>13,r=(r&65535)*1540483477+((r>>>16)*59797<<16),((r^r>>>15)>>>0).toString(36)}var Kr={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Br=/[A-Z]|^ms/g,Hr=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Be=function(r){return r.charCodeAt(1)===45},Re=function(r){return r!=null&&typeof r!="boolean"},ue=Je(function(e){return Be(e)?e:e.replace(Br,"-$&").toLowerCase()}),Me=function(r,t){switch(r){case"animation":case"animationName":if(typeof t=="string")return t.replace(Hr,function(n,a,s){return R={name:a,styles:s,next:R},a})}return Kr[r]!==1&&!Be(r)&&typeof t=="number"&&t!==0?t+"px":t};function V(e,r,t){if(t==null)return"";if(t.__emotion_styles!==void 0)return t;switch(typeof t){case"boolean":return"";case"object":{if(t.anim===1)return R={name:t.name,styles:t.styles,next:R},t.name;if(t.styles!==void 0){var n=t.next;if(n!==void 0)for(;n!==void 0;)R={name:n.name,styles:n.styles,next:R},n=n.next;var a=t.styles+";";return a}return Yr(e,r,t)}case"function":{if(e!==void 0){var s=R,i=t(e);return R=s,V(e,r,i)}break}}if(r==null)return t;var c=r[t];return c!==void 0?c:t}function Yr(e,r,t){var n="";if(Array.isArray(t))for(var a=0;a<t.length;a++)n+=V(e,r,t[a])+";";else for(var s in t){var i=t[s];if(typeof i!="object")r!=null&&r[i]!==void 0?n+=s+"{"+r[i]+"}":Re(i)&&(n+=ue(s)+":"+Me(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(r==null||r[i[0]]===void 0))for(var c=0;c<i.length;c++)Re(i[c])&&(n+=ue(s)+":"+Me(s,i[c])+";");else{var o=V(e,r,i);switch(s){case"animation":case"animationName":{n+=ue(s)+":"+o+";";break}default:n+=s+"{"+o+"}"}}}return n}var Ie=/label:\s*([^\s;\n{]+)\s*(;|$)/g,R,He=function(r,t,n){if(r.length===1&&typeof r[0]=="object"&&r[0]!==null&&r[0].styles!==void 0)return r[0];var a=!0,s="";R=void 0;var i=r[0];i==null||i.raw===void 0?(a=!1,s+=V(n,t,i)):s+=i[0];for(var c=1;c<r.length;c++)s+=V(n,t,r[c]),a&&(s+=i[c]);Ie.lastIndex=0;for(var o="",g;(g=Ie.exec(s))!==null;)o+="-"+g[1];var m=qr(s)+o;return{name:m,styles:s,next:R}},Zr=function(r){return r()},Ye=$e.useInsertionEffect?$e.useInsertionEffect:!1,at=Ye||Zr,Ne=Ye||N.useLayoutEffect,Ze=N.createContext(typeof HTMLElement<"u"?Or({key:"css"}):null);Ze.Provider;var Ur=function(r){return N.forwardRef(function(t,n){var a=N.useContext(Ze);return r(t,a,n)})},pe=N.createContext({}),Jr=function(r,t){if(typeof t=="function"){var n=t(r);return n}return le({},r,t)},Qr=Oe(function(e){return Oe(function(r){return Jr(e,r)})}),st=function(r){var t=N.useContext(pe);return r.theme!==t&&(t=Qr(t)(r.theme)),N.createElement(pe.Provider,{value:t},r.children)},it=Ur(function(e,r){var t=e.styles,n=He([t],void 0,N.useContext(pe)),a=N.useRef();return Ne(function(){var s=r.key+"-global",i=new r.sheet.constructor({key:s,nonce:r.sheet.nonce,container:r.sheet.container,speedy:r.sheet.isSpeedy}),c=!1,o=document.querySelector('style[data-emotion="'+s+" "+n.name+'"]');return r.sheet.tags.length&&(i.before=r.sheet.tags[0]),o!==null&&(c=!0,o.setAttribute("data-emotion",s),i.hydrate([o])),a.current=[i,c],function(){i.flush()}},[r]),Ne(function(){var s=a.current,i=s[0],c=s[1];if(c){s[1]=!1;return}if(n.next!==void 0&&Vr(r,n.next,!0),i.tags.length){var o=i.tags[i.tags.length-1].nextElementSibling;i.before=o,i.flush()}r.insert("",n,i,!1)},[r,n.name]),null});function Xr(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return He(r)}var ct=function(){var r=Xr.apply(void 0,arguments),t="animation-"+r.name;return{name:t,styles:"@keyframes "+t+"{"+r.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}};export{it as G,pe as T,le as _,rt as a,st as b,Xr as c,nt as g,tt as h,Vr as i,ct as k,Je as m,Gr as r,He as s,at as u,Ur as w};
