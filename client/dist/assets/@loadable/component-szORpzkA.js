import{W as v}from"../vendor-dgo-HaTY.js";import{_ as x}from"../@hello-pangea/dnd-3c_gxvLa.js";import{_ as k,h as j}from"../@emotion/react-x2FgKCip.js";function S(r,n){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(d,y){return d.__proto__=y,d},S(r,n)}function q(r,n){r.prototype=Object.create(n.prototype),r.prototype.constructor=r,S(r,n)}function A(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function F(r,n){if(!r){var a=new Error("loadable: "+n);throw a.framesToPop=1,a.name="Invariant Violation",a}}var V=v.createContext(),G={initialChunks:{}},O="PENDING",J="RESOLVED",C="REJECTED";function B(r){return typeof r=="function"?{requireAsync:r,resolve:function(){},chunkName:function(){}}:r}var H=function(n){var a=function(y){return v.createElement(V.Consumer,null,function(m){return v.createElement(n,Object.assign({__chunkExtractor:m},y))})};return n.displayName&&(a.displayName=n.displayName+"WithChunkExtractor"),a},M=function(n){return n};function D(r){var n=r.defaultResolveComponent,a=n===void 0?M:n,d=r.render,y=r.onLoad;function m(b,u){u===void 0&&(u={});var c=B(b),p={};function _(s){return u.cacheKey?u.cacheKey(s):c.resolve?c.resolve(s):"static"}function L(s,l,o){var t=u.resolveComponent?u.resolveComponent(s,l):a(s);return j(o,t,{preload:!0}),t}var R=function(l){var o=_(l),t=p[o];return(!t||t.status===C)&&(t=c.requireAsync(l),t.status=O,p[o]=t,t.then(function(){t.status=J},function(e){console.error("loadable-components: failed to asynchronously load component",{fileName:c.resolve(l),chunkName:c.chunkName(l),error:e&&e.message}),t.status=C})),t},z=function(s){q(l,s),l.getDerivedStateFromProps=function(e,i){var f=_(e);return k({},i,{cacheKey:f,loading:i.loading||i.cacheKey!==f})};function l(t){var e;return e=s.call(this,t)||this,e.state={result:null,error:null,loading:!0,cacheKey:_(t)},F(!t.__chunkExtractor||c.requireSync,"SSR requires `@loadable/babel-plugin`, please install it"),t.__chunkExtractor?(u.ssr===!1||(c.requireAsync(t).catch(function(){return null}),e.loadSync(),t.__chunkExtractor.addChunk(c.chunkName(t))),A(e)):(u.ssr!==!1&&(c.isReady&&c.isReady(t)||c.chunkName&&G.initialChunks[c.chunkName(t)])&&e.loadSync(),e)}var o=l.prototype;return o.componentDidMount=function(){this.mounted=!0;var e=this.getCache();e&&e.status===C&&this.setCache(),this.state.loading&&this.loadAsync()},o.componentDidUpdate=function(e,i){i.cacheKey!==this.state.cacheKey&&this.loadAsync()},o.componentWillUnmount=function(){this.mounted=!1},o.safeSetState=function(e,i){this.mounted&&this.setState(e,i)},o.getCacheKey=function(){return _(this.props)},o.getCache=function(){return p[this.getCacheKey()]},o.setCache=function(e){e===void 0&&(e=void 0),p[this.getCacheKey()]=e},o.triggerOnLoad=function(){var e=this;y&&setTimeout(function(){y(e.state.result,e.props)})},o.loadSync=function(){if(this.state.loading)try{var e=c.requireSync(this.props),i=L(e,this.props,h);this.state.result=i,this.state.loading=!1}catch(f){console.error("loadable-components: failed to synchronously load component, which expected to be available",{fileName:c.resolve(this.props),chunkName:c.chunkName(this.props),error:f&&f.message}),this.state.error=f}},o.loadAsync=function(){var e=this,i=this.resolveAsync();return i.then(function(f){var E=L(f,e.props,h);e.safeSetState({result:E,loading:!1},function(){return e.triggerOnLoad()})}).catch(function(f){return e.safeSetState({error:f,loading:!1})}),i},o.resolveAsync=function(){var e=this.props;e.__chunkExtractor,e.forwardedRef;var i=x(e,["__chunkExtractor","forwardedRef"]);return R(i)},o.render=function(){var e=this.props,i=e.forwardedRef,f=e.fallback;e.__chunkExtractor;var E=x(e,["forwardedRef","fallback","__chunkExtractor"]),g=this.state,w=g.error,$=g.loading,I=g.result;if(u.suspense){var U=this.getCache()||this.loadAsync();if(U.status===O)throw this.loadAsync()}if(w)throw w;var N=f||u.fallback||null;return $?N:d({fallback:N,result:I,options:u,props:k({},E,{ref:i})})},l}(v.Component),W=H(z),h=v.forwardRef(function(s,l){return v.createElement(W,Object.assign({forwardedRef:l},s))});return h.displayName="Loadable",h.preload=function(s){h.load(s)},h.load=function(s){return R(s)},h}function T(b,u){return m(b,k({},u,{suspense:!0}))}return{loadable:m,lazy:T}}function Q(r){return r.__esModule?r.default:r.default||r}var K=D({defaultResolveComponent:Q,render:function(n){var a=n.result,d=n.props;return v.createElement(a,d)}}),X=K.loadable,Y=K.lazy,P=D({onLoad:function(n,a){n&&a.forwardedRef&&(typeof a.forwardedRef=="function"?a.forwardedRef(n):a.forwardedRef.current=n)},render:function(n){var a=n.result,d=n.props;return d.children?d.children(a):null}}),Z=P.loadable,ee=P.lazy,te=X;te.lib=Z;var re=Y;re.lib=ee;export{q as _,A as a,te as l};