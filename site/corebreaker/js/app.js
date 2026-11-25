/* 오래된 사파리(아이패드) 대비 */ for (const C of [Array, String]) if (!C.prototype.at) Object.defineProperty(C.prototype, 'at', { configurable: true, writable: true, value: function (i) { i = Math.trunc(i) || 0; if (i < 0) i += this.length; return i < 0 || i >= this.length ? undefined : this[i]; } });
(()=>{var Su=Object.defineProperty;var Eu=(i,t,e)=>()=>{if(e)throw e[0];try{return i&&(t=i(i=0)),t}catch(n){throw e=[n],n}};var wu=(i,t)=>{for(var e in t)Su(i,e,{get:t[e],enumerable:!0})};var iu={};wu(iu,{SND:()=>Cl,initAudio:()=>Pl,setVol:()=>wa,sfx:()=>ue});function Pl(){if(Xt){Xt.state==="suspended"&&Xt.resume();return}try{Xt=new(window.AudioContext||window.webkitAudioContext),Fi=Xt.createGain(),Fi.gain.value=Cl.vol,Fi.connect(Xt.destination),Rl=Xt.createBuffer(1,Xt.sampleRate*1.5,Xt.sampleRate);let i=Rl.getChannelData(0);for(let t=0;t<i.length;t++)i[t]=Math.random()*2-1}catch{Xt=null}}function wa(i){Cl.vol=i,Fi&&(Fi.gain.value=i)}function nu(i,t){let e=Xt.createGain();if(e.gain.value=i,Xt.createStereoPanner){let n=Xt.createStereoPanner();n.pan.value=Math.max(-1,Math.min(1,t||0)),e.connect(n),n.connect(Fi)}else e.connect(Fi);return e}function Tn(i,t,e,n,s,r,a="bandpass"){let o=Xt.currentTime,l=Xt.createBufferSource();l.buffer=Rl;let c=Xt.createBiquadFilter();c.type=a,c.frequency.setValueAtTime(t,o),c.frequency.exponentialRampToValueAtTime(Math.max(40,e),o+i),c.Q.value=n;let h=Xt.createGain();h.gain.setValueAtTime(1,o),h.gain.exponentialRampToValueAtTime(.001,o+i),l.connect(c),c.connect(h),h.connect(nu(s,r)),l.start(o),l.stop(o+i+.02)}function je(i,t,e,n,s,r){let a=Xt.currentTime,o=Xt.createOscillator();o.type=e,o.frequency.setValueAtTime(i,a),r&&o.frequency.exponentialRampToValueAtTime(r,a+t);let l=Xt.createGain();l.gain.setValueAtTime(n,a),l.gain.exponentialRampToValueAtTime(.001,a+t),o.connect(l),l.connect(nu(1,s)),o.start(a),o.stop(a+t+.02)}var Xt,Fi,Rl,Cl,ue,Ta=Eu(()=>{Xt=null,Fi=null,Rl=null,Cl={vol:.7};ue={shot(i,t=1,e=0){if(!Xt)return;let n=i==="owl"||i==="burst",s=i==="wasp";Tn(n?.45:i==="sting"||i==="viper"?.16:.22,n?2200:3200,120,.7,.9*t,e,"lowpass"),je(n?70:s?140:100,n?.3:.12,"sine",.6*t,e,40),Tn(.05,6e3,2e3,1.5,.35*t,e)},far(i,t,e){Xt&&Tn(.35,900,120,.6,.6*t,e,"lowpass")},hit(){Xt&&je(1400,.06,"square",.15,0)},head(){Xt&&(je(2200,.09,"triangle",.3,0),je(3300,.12,"sine",.15,0))},hurt(){Xt&&Tn(.18,600,200,1,.6,0,"lowpass")},kill(){Xt&&(je(880,.08,"triangle",.25,0),setTimeout(()=>je(1320,.14,"triangle",.25,0),70))},step(i,t){Xt&&Tn(.07,900,300,2,.45*i,t)},land(){Xt&&Tn(.12,500,120,1,.5,0,"lowpass")},reload(){Xt&&(Tn(.05,3e3,1500,3,.3,0),setTimeout(()=>Tn(.06,2500,900,3,.35,0),380))},empty(){Xt&&je(2600,.03,"square",.08,0)},beep(i){Xt&&je(i?1800:1200,.08,"square",.12,0)},plant(){Xt&&je(600,.25,"sawtooth",.12,0,900)},boom(){Xt&&(Tn(1.4,600,40,.5,1.3,0,"lowpass"),je(50,1,"sine",.8,0,25))},ability(i){Xt&&(i==="flash"?Tn(.3,5e3,800,.6,.6,0):i==="smoke"?Tn(.8,700,200,.5,.4,0,"lowpass"):je(i==="heal"?660:440,.25,"sine",.2,0,i==="heal"?990:880))},buy(){Xt&&(je(990,.06,"triangle",.2,0),setTimeout(()=>je(1480,.08,"triangle",.2,0),60))},round(i){if(!Xt)return;(i?[523,659,784,1046]:[392,330,262]).forEach((e,n)=>setTimeout(()=>je(e,.22,"triangle",.25,0),n*120))},tick(){Xt&&je(1e3,.03,"sine",.08,0)}}});var Tu=0,Gl=1,Au=2;var yh=1,fl=2,zn=3,li=0,ke=1,vn=2;var ii=0,si=1,Pi=2,Wl=3,Xl=4,Ru=5,Ei=100,Cu=101,Pu=102,ql=103,Yl=104,Lu=200,Iu=201,Du=202,Uu=203,bo=204,So=205,Nu=206,Ou=207,Fu=208,zu=209,Bu=210,ku=211,Hu=212,Vu=213,Gu=214,Wu=0,Xu=1,qu=2,Ir=3,Yu=4,$u=5,Zu=6,Ju=7,vh=0,Ku=1,ju=2,ri=0,Qu=1,td=2,ed=3,pl=4,nd=5,id=6;var Mh=300,hs=301,us=302,Eo=303,wo=304,ha=306,Bs=1e3,Mn=1001,To=1002,$e=1003,$l=1004;var Fa=1005;var cn=1006,sd=1007;var ks=1008;var ai=1009,rd=1010,ad=1011,ml=1012,bh=1013,ei=1014,ni=1015,Hs=1016,Sh=1017,Eh=1018,Ai=1020,od=1021,bn=1023,ld=1024,cd=1025,Ri=1026,ds=1027,hd=1028,wh=1029,ud=1030,Th=1031,Ah=1033,za=33776,Ba=33777,ka=33778,Ha=33779,Zl=35840,Jl=35841,Kl=35842,jl=35843,Rh=36196,Ql=37492,tc=37496,ec=37808,nc=37809,ic=37810,sc=37811,rc=37812,ac=37813,oc=37814,lc=37815,cc=37816,hc=37817,uc=37818,dc=37819,fc=37820,pc=37821,Va=36492,mc=36494,gc=36495,dd=36283,_c=36284,xc=36285,yc=36286;var Dr=2300,Ur=2301,Ga=2302,vc=2400,Mc=2401,bc=2402;var Ch=3e3,Ci=3001,fd=3200,pd=3201,Ph=0,md=1,hn="",Se="srgb",Vn="srgb-linear",gl="display-p3",ua="display-p3-linear",Nr="linear",le="srgb",Or="rec709",Fr="p3";var ki=7680;var Sc=519,gd=512,_d=513,xd=514,Lh=515,yd=516,vd=517,Md=518,bd=519,Ao=35044;var Ec="300 es",Ro=1035,Hn=2e3,zr=2001,ci=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Wa=Math.PI/180,Co=180/Math.PI;function oi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[i&255]+ze[i>>8&255]+ze[i>>16&255]+ze[i>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function De(i,t,e){return Math.max(t,Math.min(e,i))}function Sd(i,t){return(i%t+t)%t}function Xa(i,t,e){return(1-e)*i+e*t}function wc(i){return(i&i-1)===0&&i!==0}function Po(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function kn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var at=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Gt=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],p=n[2],m=n[5],g=n[8],_=s[0],f=s[3],u=s[6],v=s[1],x=s[4],S=s[7],A=s[2],T=s[5],R=s[8];return r[0]=a*_+o*v+l*A,r[3]=a*f+o*x+l*T,r[6]=a*u+o*S+l*R,r[1]=c*_+h*v+d*A,r[4]=c*f+h*x+d*T,r[7]=c*u+h*S+d*R,r[2]=p*_+m*v+g*A,r[5]=p*f+m*x+g*T,r[8]=p*u+m*S+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,p=o*l-h*r,m=c*r-a*l,g=e*d+n*p+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=p*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(qa.makeScale(t,e)),this}rotate(t){return this.premultiply(qa.makeRotation(-t)),this}translate(t,e){return this.premultiply(qa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},qa=new Gt;function Ih(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ed(){let i=Br("canvas");return i.style.display="block",i}var Tc={};function Ns(i){i in Tc||(Tc[i]=!0,console.warn(i))}var Ac=new Gt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Rc=new Gt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),sr={[Vn]:{transfer:Nr,primaries:Or,toReference:i=>i,fromReference:i=>i},[Se]:{transfer:le,primaries:Or,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[ua]:{transfer:Nr,primaries:Fr,toReference:i=>i.applyMatrix3(Rc),fromReference:i=>i.applyMatrix3(Ac)},[gl]:{transfer:le,primaries:Fr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Rc),fromReference:i=>i.applyMatrix3(Ac).convertLinearToSRGB()}},wd=new Set([Vn,ua]),te={enabled:!0,_workingColorSpace:Vn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!wd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=sr[t].toReference,s=sr[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return sr[i].primaries},getTransfer:function(i){return i===hn?Nr:sr[i].transfer}};function ls(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ya(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Hi,kr=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Hi===void 0&&(Hi=Br("canvas")),Hi.width=t.width,Hi.height=t.height;let n=Hi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Hi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Br("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ls(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ls(e[n]/255)*255):e[n]=ls(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Td=0,Hr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=oi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($a(s[a].image)):r.push($a(s[a]))}else r=$a(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function $a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?kr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ad=0,un=class i extends ci{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Mn,s=Mn,r=cn,a=ks,o=bn,l=ai,c=i.DEFAULT_ANISOTROPY,h=hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=oi(),this.name="",this.source=new Hr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ns("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ci?Se:hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bs:t.x=t.x-Math.floor(t.x);break;case Mn:t.x=t.x<0?0:1;break;case To:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bs:t.y=t.y-Math.floor(t.y);break;case Mn:t.y=t.y<0?0:1;break;case To:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ns("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Se?Ci:Ch}set encoding(t){Ns("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Ci?Se:hn}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=Mh;un.DEFAULT_ANISOTROPY=1;var fe=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],p=l[1],m=l[5],g=l[9],_=l[2],f=l[6],u=l[10];if(Math.abs(h-p)<.01&&Math.abs(d-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+_)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,S=(m+1)/2,A=(u+1)/2,T=(h+p)/4,R=(d+_)/4,D=(g+f)/4;return x>S&&x>A?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=R/n):S>A?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=T/s,r=D/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=D/r),this.set(n,s,r,e),this}let v=Math.sqrt((f-g)*(f-g)+(d-_)*(d-_)+(p-h)*(p-h));return Math.abs(v)<.001&&(v=1),this.x=(f-g)/v,this.y=(d-_)/v,this.z=(p-h)/v,this.w=Math.acos((c+m+u-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Lo=class extends ci{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(Ns("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ci?Se:hn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new un(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Hr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gn=class extends Lo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Vr=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Io=class extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hi=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],p=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==p||c!==m||h!==g){let f=1-o,u=l*p+c*m+h*g+d*_,v=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){let A=Math.sqrt(x),T=Math.atan2(A,u*v);f=Math.sin(f*T)/A,o=Math.sin(o*T)/A}let S=o*v;if(l=l*f+p*S,c=c*f+m*S,h=h*f+g*S,d=d*f+_*S,f===1-o){let A=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=A,c*=A,h*=A,d*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],p=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*m-c*p,t[e+1]=l*g+h*p+c*d-o*m,t[e+2]=c*g+h*m+o*p-l*d,t[e+3]=h*g-o*d-l*p-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),p=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=p*h*d+c*m*g,this._y=c*m*d-p*h*g,this._z=c*h*g+p*m*d,this._w=c*h*d-p*m*g;break;case"YXZ":this._x=p*h*d+c*m*g,this._y=c*m*d-p*h*g,this._z=c*h*g-p*m*d,this._w=c*h*d+p*m*g;break;case"ZXY":this._x=p*h*d-c*m*g,this._y=c*m*d+p*h*g,this._z=c*h*g+p*m*d,this._w=c*h*d-p*m*g;break;case"ZYX":this._x=p*h*d-c*m*g,this._y=c*m*d+p*h*g,this._z=c*h*g-p*m*d,this._w=c*h*d+p*m*g;break;case"YZX":this._x=p*h*d+c*m*g,this._y=c*m*d+p*h*g,this._z=c*h*g-p*m*d,this._w=c*h*d-p*m*g;break;case"XZY":this._x=p*h*d-c*m*g,this._y=c*m*d-p*h*g,this._z=c*h*g+p*m*d,this._w=c*h*d+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],p=n+o+d;if(p>0){let m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){let m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){let m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=a*d+this._w*p,this._x=n*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Cc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Za.copy(this).projectOnVector(t),this.sub(Za)}reflect(t){return this.sub(Za.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Za=new C,Cc=new hi,Li=class{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(t.matrixWorld),this.union(rr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),ar.subVectors(this.max,As),Vi.subVectors(t.a,As),Gi.subVectors(t.b,As),Wi.subVectors(t.c,As),Jn.subVectors(Gi,Vi),Kn.subVectors(Wi,Gi),yi.subVectors(Vi,Wi);let e=[0,-Jn.z,Jn.y,0,-Kn.z,Kn.y,0,-yi.z,yi.y,Jn.z,0,-Jn.x,Kn.z,0,-Kn.x,yi.z,0,-yi.x,-Jn.y,Jn.x,0,-Kn.y,Kn.x,0,-yi.y,yi.x,0];return!Ja(e,Vi,Gi,Wi,ar)||(e=[1,0,0,0,1,0,0,0,1],!Ja(e,Vi,Gi,Wi,ar))?!1:(or.crossVectors(Jn,Kn),e=[or.x,or.y,or.z],Ja(e,Vi,Gi,Wi,ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Dn=[new C,new C,new C,new C,new C,new C,new C,new C],_n=new C,rr=new Li,Vi=new C,Gi=new C,Wi=new C,Jn=new C,Kn=new C,yi=new C,As=new C,ar=new C,or=new C,vi=new C;function Ja(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){vi.fromArray(i,r);let o=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),l=t.dot(vi),c=e.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Rd=new Li,Rs=new C,Ka=new C,fs=class{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Rd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);let e=Rs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ka.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(Ka)),this.expandByPoint(Rs.copy(t.center).sub(Ka))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Un=new C,ja=new C,lr=new C,jn=new C,Qa=new C,cr=new C,to=new C,Gr=class{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Un.copy(this.origin).addScaledVector(this.direction,e),Un.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ja.copy(t).add(e).multiplyScalar(.5),lr.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(ja);let r=t.distanceTo(e)*.5,a=-this.direction.dot(lr),o=jn.dot(this.direction),l=-jn.dot(lr),c=jn.lengthSq(),h=Math.abs(1-a*a),d,p,m,g;if(h>0)if(d=a*l-o,p=a*o-l,g=r*h,d>=0)if(p>=-g)if(p<=g){let _=1/h;d*=_,p*=_,m=d*(d+a*p+2*o)+p*(a*d+p+2*l)+c}else p=r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;else p=-r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;else p<=-g?(d=Math.max(0,-(-a*r+o)),p=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+p*(p+2*l)+c):p<=g?(d=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+c):(d=Math.max(0,-(a*r+o)),p=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+p*(p+2*l)+c);else p=a>0?-r:r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ja).addScaledVector(lr,p),m}intersectSphere(t,e){Un.subVectors(t.center,this.origin);let n=Un.dot(this.direction),s=Un.dot(Un)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),h>=0?(r=(t.min.y-p.y)*h,a=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,a=(t.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-p.z)*d,l=(t.max.z-p.z)*d):(o=(t.max.z-p.z)*d,l=(t.min.z-p.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Un)!==null}intersectTriangle(t,e,n,s,r){Qa.subVectors(e,t),cr.subVectors(n,t),to.crossVectors(Qa,cr);let a=this.direction.dot(to),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;jn.subVectors(this.origin,t);let l=o*this.direction.dot(cr.crossVectors(jn,cr));if(l<0)return null;let c=o*this.direction.dot(Qa.cross(jn));if(c<0||l+c>a)return null;let h=-o*jn.dot(to);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ve=class i{constructor(t,e,n,s,r,a,o,l,c,h,d,p,m,g,_,f){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,p,m,g,_,f)}set(t,e,n,s,r,a,o,l,c,h,d,p,m,g,_,f){let u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=p,u[3]=m,u[7]=g,u[11]=_,u[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),a=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let p=a*h,m=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=p-_*c,e[9]=-o*l,e[2]=_-p*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){let p=l*h,m=l*d,g=c*h,_=c*d;e[0]=p+_*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=_+p*o,e[10]=a*l}else if(t.order==="ZXY"){let p=l*h,m=l*d,g=c*h,_=c*d;e[0]=p-_*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=_-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let p=a*h,m=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-m,e[8]=p*c+_,e[1]=l*d,e[5]=_*c+p,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let p=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-p*d,e[8]=g*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+g,e[10]=p-_*d}else if(t.order==="XZY"){let p=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=p*d+_,e[5]=a*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=_*d+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Cd,t,Pd)}lookAt(t,e,n){let s=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),Qn.crossVectors(n,en),Qn.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),Qn.crossVectors(n,en)),Qn.normalize(),hr.crossVectors(en,Qn),s[0]=Qn.x,s[4]=hr.x,s[8]=en.x,s[1]=Qn.y,s[5]=hr.y,s[9]=en.y,s[2]=Qn.z,s[6]=hr.z,s[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],p=n[9],m=n[13],g=n[2],_=n[6],f=n[10],u=n[14],v=n[3],x=n[7],S=n[11],A=n[15],T=s[0],R=s[4],D=s[8],y=s[12],w=s[1],z=s[5],G=s[9],Q=s[13],L=s[2],U=s[6],V=s[10],q=s[14],X=s[3],W=s[7],J=s[11],tt=s[15];return r[0]=a*T+o*w+l*L+c*X,r[4]=a*R+o*z+l*U+c*W,r[8]=a*D+o*G+l*V+c*J,r[12]=a*y+o*Q+l*q+c*tt,r[1]=h*T+d*w+p*L+m*X,r[5]=h*R+d*z+p*U+m*W,r[9]=h*D+d*G+p*V+m*J,r[13]=h*y+d*Q+p*q+m*tt,r[2]=g*T+_*w+f*L+u*X,r[6]=g*R+_*z+f*U+u*W,r[10]=g*D+_*G+f*V+u*J,r[14]=g*y+_*Q+f*q+u*tt,r[3]=v*T+x*w+S*L+A*X,r[7]=v*R+x*z+S*U+A*W,r[11]=v*D+x*G+S*V+A*J,r[15]=v*y+x*Q+S*q+A*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],p=t[10],m=t[14],g=t[3],_=t[7],f=t[11],u=t[15];return g*(+r*l*d-s*c*d-r*o*p+n*c*p+s*o*m-n*l*m)+_*(+e*l*m-e*c*p+r*a*p-s*a*m+s*c*h-r*l*h)+f*(+e*c*d-e*o*m-r*a*d+n*a*m+r*o*h-n*c*h)+u*(-s*o*h-e*l*d+e*o*p+s*a*d-n*a*p+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],p=t[10],m=t[11],g=t[12],_=t[13],f=t[14],u=t[15],v=d*f*c-_*p*c+_*l*m-o*f*m-d*l*u+o*p*u,x=g*p*c-h*f*c-g*l*m+a*f*m+h*l*u-a*p*u,S=h*_*c-g*d*c+g*o*m-a*_*m-h*o*u+a*d*u,A=g*d*l-h*_*l-g*o*p+a*_*p+h*o*f-a*d*f,T=e*v+n*x+s*S+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/T;return t[0]=v*R,t[1]=(_*p*r-d*f*r-_*s*m+n*f*m+d*s*u-n*p*u)*R,t[2]=(o*f*r-_*l*r+_*s*c-n*f*c-o*s*u+n*l*u)*R,t[3]=(d*l*r-o*p*r-d*s*c+n*p*c+o*s*m-n*l*m)*R,t[4]=x*R,t[5]=(h*f*r-g*p*r+g*s*m-e*f*m-h*s*u+e*p*u)*R,t[6]=(g*l*r-a*f*r-g*s*c+e*f*c+a*s*u-e*l*u)*R,t[7]=(a*p*r-h*l*r+h*s*c-e*p*c-a*s*m+e*l*m)*R,t[8]=S*R,t[9]=(g*d*r-h*_*r-g*n*m+e*_*m+h*n*u-e*d*u)*R,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*u+e*o*u)*R,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*m-e*o*m)*R,t[12]=A*R,t[13]=(h*_*s-g*d*s+g*n*p-e*_*p-h*n*f+e*d*f)*R,t[14]=(g*o*s-a*_*s-g*n*l+e*_*l+a*n*f-e*o*f)*R,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*p+e*o*p)*R,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,p=r*c,m=r*h,g=r*d,_=a*h,f=a*d,u=o*d,v=l*c,x=l*h,S=l*d,A=n.x,T=n.y,R=n.z;return s[0]=(1-(_+u))*A,s[1]=(m+S)*A,s[2]=(g-x)*A,s[3]=0,s[4]=(m-S)*T,s[5]=(1-(p+u))*T,s[6]=(f+v)*T,s[7]=0,s[8]=(g+x)*R,s[9]=(f-v)*R,s[10]=(1-(p+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Xi.set(s[0],s[1],s[2]).length(),a=Xi.set(s[4],s[5],s[6]).length(),o=Xi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],xn.copy(this);let c=1/r,h=1/a,d=1/o;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,e.setFromRotationMatrix(xn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Hn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),p=(n+s)/(n-s),m,g;if(o===Hn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===zr)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Hn){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),p=(e+t)*c,m=(n+s)*h,g,_;if(o===Hn)g=(a+r)*d,_=-2*d;else if(o===zr)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xi=new C,xn=new ve,Cd=new C(0,0,0),Pd=new C(1,1,1),Qn=new C,hr=new C,en=new C,Pc=new ve,Lc=new hi,Wr=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(De(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-De(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(De(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Pc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Lc.setFromEuler(this),this.setFromQuaternion(Lc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wr.DEFAULT_ORDER="XYZ";var Xr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Ld=0,Ic=new C,qi=new hi,Nn=new ve,ur=new C,Cs=new C,Id=new C,Dd=new hi,Dc=new C(1,0,0),Uc=new C(0,1,0),Nc=new C(0,0,1),Ud={type:"added"},Nd={type:"removed"},Ne=class i extends ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new C,e=new Wr,n=new hi,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ve},normalMatrix:{value:new Gt}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(Dc,t)}rotateY(t){return this.rotateOnAxis(Uc,t)}rotateZ(t){return this.rotateOnAxis(Nc,t)}translateOnAxis(t,e){return Ic.copy(t).applyQuaternion(this.quaternion),this.position.add(Ic.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Dc,t)}translateY(t){return this.translateOnAxis(Uc,t)}translateZ(t){return this.translateOnAxis(Nc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ur.copy(t):ur.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Cs,ur,this.up):Nn.lookAt(ur,Cs,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),qi.setFromRotationMatrix(Nn),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Ud)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nd)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Nn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Nn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,t,Id),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,Dd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),p=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ne.DEFAULT_UP=new C(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var yn=new C,On=new C,eo=new C,Fn=new C,Yi=new C,$i=new C,Oc=new C,no=new C,io=new C,so=new C,dr=!1,Ti=class i{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),yn.subVectors(t,e),s.cross(yn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){yn.subVectors(s,e),On.subVectors(n,e),eo.subVectors(t,e);let a=yn.dot(yn),o=yn.dot(On),l=yn.dot(eo),c=On.dot(On),h=On.dot(eo),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let p=1/d,m=(c*l-o*h)*p,g=(a*h-o*l)*p;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Fn)===null?!1:Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getUV(t,e,n,s,r,a,o,l){return dr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),dr=!0),this.getInterpolation(t,e,n,s,r,a,o,l)}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Fn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Fn.x),l.addScaledVector(a,Fn.y),l.addScaledVector(o,Fn.z),l)}static isFrontFacing(t,e,n,s){return yn.subVectors(n,e),On.subVectors(t,e),yn.cross(On).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),yn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return dr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),dr=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Yi.subVectors(s,n),$i.subVectors(r,n),no.subVectors(t,n);let l=Yi.dot(no),c=$i.dot(no);if(l<=0&&c<=0)return e.copy(n);io.subVectors(t,s);let h=Yi.dot(io),d=$i.dot(io);if(h>=0&&d<=h)return e.copy(s);let p=l*d-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Yi,a);so.subVectors(t,r);let m=Yi.dot(so),g=$i.dot(so);if(g>=0&&m<=g)return e.copy(r);let _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector($i,o);let f=h*g-m*d;if(f<=0&&d-h>=0&&m-g>=0)return Oc.subVectors(r,s),o=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(Oc,o);let u=1/(f+_+p);return a=_*u,o=p*u,e.copy(n).addScaledVector(Yi,a).addScaledVector($i,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},fr={h:0,s:0,l:0};function ro(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Dt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Se){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=Sd(t,1),e=De(e,0,1),n=De(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ro(a,r,t+1/3),this.g=ro(a,r,t),this.b=ro(a,r,t-1/3)}return te.toWorkingColorSpace(this,s),this}setStyle(t,e=Se){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Se){let n=Dh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ls(t.r),this.g=ls(t.g),this.b=ls(t.b),this}copyLinearToSRGB(t){return this.r=Ya(t.r),this.g=Ya(t.g),this.b=Ya(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Se){return te.fromWorkingColorSpace(Be.copy(this),t),Math.round(De(Be.r*255,0,255))*65536+Math.round(De(Be.g*255,0,255))*256+Math.round(De(Be.b*255,0,255))}getHexString(t=Se){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Be.copy(this),e);let n=Be.r,s=Be.g,r=Be.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=Se){te.fromWorkingColorSpace(Be.copy(this),t);let e=Be.r,n=Be.g,s=Be.b;return t!==Se?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(fr);let n=Xa(ti.h,fr.h,e),s=Xa(ti.s,fr.s,e),r=Xa(ti.l,fr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new Dt;Dt.NAMES=Dh;var Od=0,Wn=class extends ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=si,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=So,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=Ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==si&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bo&&(n.blendSrc=this.blendSrc),this.blendDst!==So&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},He=class extends Wn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=vh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ee=new C,pr=new at,sn=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ao,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)pr.fromBufferAttribute(this,e),pr.applyMatrix3(t),this.setXY(e,pr.x,pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=kn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=kn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=kn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=kn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=kn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ao&&(t.usage=this.usage),t}};var qr=class extends sn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Yr=class extends sn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ce=class extends sn{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Fd=0,ln=new ve,ao=new Ne,Zi=new C,nn=new Li,Ps=new Li,Ie=new C,Ve=class i extends ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ih(t)?Yr:qr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return ao.lookAt(t),ao.updateMatrix(),this.applyMatrix4(ao.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ce(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(t){let n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Ps.setFromBufferAttribute(o),this.morphTargetsRelative?(Ie.addVectors(nn.min,Ps.min),nn.expandByPoint(Ie),Ie.addVectors(nn.max,Ps.max),nn.expandByPoint(Ie)):(nn.expandByPoint(Ps.min),nn.expandByPoint(Ps.max))}nn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ie));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ie.fromBufferAttribute(o,c),l&&(Zi.fromBufferAttribute(t,c),Ie.add(Zi)),s=Math.max(s,n.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new sn(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<o;w++)c[w]=new C,h[w]=new C;let d=new C,p=new C,m=new C,g=new at,_=new at,f=new at,u=new C,v=new C;function x(w,z,G){d.fromArray(s,w*3),p.fromArray(s,z*3),m.fromArray(s,G*3),g.fromArray(a,w*2),_.fromArray(a,z*2),f.fromArray(a,G*2),p.sub(d),m.sub(d),_.sub(g),f.sub(g);let Q=1/(_.x*f.y-f.x*_.y);isFinite(Q)&&(u.copy(p).multiplyScalar(f.y).addScaledVector(m,-_.y).multiplyScalar(Q),v.copy(m).multiplyScalar(_.x).addScaledVector(p,-f.x).multiplyScalar(Q),c[w].add(u),c[z].add(u),c[G].add(u),h[w].add(v),h[z].add(v),h[G].add(v))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let w=0,z=S.length;w<z;++w){let G=S[w],Q=G.start,L=G.count;for(let U=Q,V=Q+L;U<V;U+=3)x(n[U+0],n[U+1],n[U+2])}let A=new C,T=new C,R=new C,D=new C;function y(w){R.fromArray(r,w*3),D.copy(R);let z=c[w];A.copy(z),A.sub(R.multiplyScalar(R.dot(z))).normalize(),T.crossVectors(D,z);let Q=T.dot(h[w])<0?-1:1;l[w*4]=A.x,l[w*4+1]=A.y,l[w*4+2]=A.z,l[w*4+3]=Q}for(let w=0,z=S.length;w<z;++w){let G=S[w],Q=G.start,L=G.count;for(let U=Q,V=Q+L;U<V;U+=3)y(n[U+0]),y(n[U+1]),y(n[U+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new sn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);let s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,d=new C;if(t)for(let p=0,m=t.count;p<m;p+=3){let g=t.getX(p+0),_=t.getX(p+1),f=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,f),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,p=new c.constructor(l.length*h),m=0,g=0;for(let _=0,f=l.length;_<f;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let u=0;u<h;u++)p[g++]=c[m++]}return new sn(p,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let p=c[h],m=t(p,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,p=c.length;d<p;d++){let m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let p=0,m=d.length;p<m;p++)h.push(d[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fc=new ve,Mi=new Gr,mr=new fs,zc=new C,Ji=new C,Ki=new C,ji=new C,oo=new C,gr=new C,_r=new at,xr=new at,yr=new at,Bc=new C,kc=new C,Hc=new C,vr=new C,Mr=new C,qt=class extends Ne{constructor(t=new Ve,e=new He){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(oo.fromBufferAttribute(d,t),a?gr.addScaledVector(oo,h):gr.addScaledVector(oo.sub(e),h))}e.add(gr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere),mr.applyMatrix4(r),Mi.copy(t.ray).recast(t.near),!(mr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(mr,zc)===null||Mi.origin.distanceToSquared(zc)>(t.far-t.near)**2))&&(Fc.copy(r).invert(),Mi.copy(t.ray).applyMatrix4(Fc),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){let f=p[g],u=a[f.materialIndex],v=Math.max(f.start,m.start),x=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let S=v,A=x;S<A;S+=3){let T=o.getX(S),R=o.getX(S+1),D=o.getX(S+2);s=br(this,u,t,n,c,h,d,T,R,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let f=g,u=_;f<u;f+=3){let v=o.getX(f),x=o.getX(f+1),S=o.getX(f+2);s=br(this,a,t,n,c,h,d,v,x,S),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){let f=p[g],u=a[f.materialIndex],v=Math.max(f.start,m.start),x=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let S=v,A=x;S<A;S+=3){let T=S,R=S+1,D=S+2;s=br(this,u,t,n,c,h,d,T,R,D),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let f=g,u=_;f<u;f+=3){let v=f,x=f+1,S=f+2;s=br(this,a,t,n,c,h,d,v,x,S),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}};function zd(i,t,e,n,s,r,a,o){let l;if(t.side===ke?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===li,o),l===null)return null;Mr.copy(o),Mr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Mr);return c<e.near||c>e.far?null:{distance:c,point:Mr.clone(),object:i}}function br(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ji),i.getVertexPosition(l,Ki),i.getVertexPosition(c,ji);let h=zd(i,t,e,n,Ji,Ki,ji,vr);if(h){s&&(_r.fromBufferAttribute(s,o),xr.fromBufferAttribute(s,l),yr.fromBufferAttribute(s,c),h.uv=Ti.getInterpolation(vr,Ji,Ki,ji,_r,xr,yr,new at)),r&&(_r.fromBufferAttribute(r,o),xr.fromBufferAttribute(r,l),yr.fromBufferAttribute(r,c),h.uv1=Ti.getInterpolation(vr,Ji,Ki,ji,_r,xr,yr,new at),h.uv2=h.uv1),a&&(Bc.fromBufferAttribute(a,o),kc.fromBufferAttribute(a,l),Hc.fromBufferAttribute(a,c),h.normal=Ti.getInterpolation(vr,Ji,Ki,ji,Bc,kc,Hc,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new C,materialIndex:0};Ti.getNormal(Ji,Ki,ji,d.normal),h.face=d}return h}var rn=class i extends Ve{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],p=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(d,2));function g(_,f,u,v,x,S,A,T,R,D,y){let w=S/R,z=A/D,G=S/2,Q=A/2,L=T/2,U=R+1,V=D+1,q=0,X=0,W=new C;for(let J=0;J<V;J++){let tt=J*z-Q;for(let ct=0;ct<U;ct++){let H=ct*w-G;W[_]=H*v,W[f]=tt*x,W[u]=L,c.push(W.x,W.y,W.z),W[_]=0,W[f]=0,W[u]=T>0?1:-1,h.push(W.x,W.y,W.z),d.push(ct/R),d.push(1-J/D),q+=1}}for(let J=0;J<D;J++)for(let tt=0;tt<R;tt++){let ct=p+tt+U*J,H=p+tt+U*(J+1),Y=p+(tt+1)+U*(J+1),ot=p+(tt+1)+U*J;l.push(ct,H,ot),l.push(H,Y,ot),X+=6}o.addGroup(m,X,y),m+=X,p+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ps(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ye(i){let t={};for(let e=0;e<i.length;e++){let n=ps(i[e]);for(let s in n)t[s]=n[s]}return t}function Bd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Uh(i){return i.getRenderTarget()===null?i.outputColorSpace:te.workingColorSpace}var kd={clone:ps,merge:Ye},Hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xn=class extends Wn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hd,this.fragmentShader=Vd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ps(t.uniforms),this.uniformsGroups=Bd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},$r=class extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Hn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ue=class extends $r{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Co*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Wa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Co*2*Math.atan(Math.tan(Wa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Wa*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Qi=-90,ts=1,Do=class extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ue(Qi,ts,t,e);s.layers=this.layers,this.add(s);let r=new Ue(Qi,ts,t,e);r.layers=this.layers,this.add(r);let a=new Ue(Qi,ts,t,e);a.layers=this.layers,this.add(a);let o=new Ue(Qi,ts,t,e);o.layers=this.layers,this.add(o);let l=new Ue(Qi,ts,t,e);l.layers=this.layers,this.add(l);let c=new Ue(Qi,ts,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,p,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Zr=class extends un{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:hs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Uo=class extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(Ns("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Ci?Se:hn),this.texture=new Zr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:cn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new rn(5,5,5),r=new Xn({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:ii});r.uniforms.tEquirect.value=e;let a=new qt(s,r),o=e.minFilter;return e.minFilter===ks&&(e.minFilter=cn),new Do(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},lo=new C,Gd=new C,Wd=new Gt,Bn=class{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=lo.subVectors(n,e).cross(Gd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(lo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Wd.getNormalMatrix(t),s=this.coplanarPoint(lo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},bi=new fs,Sr=new C,Vs=class{constructor(t=new Bn,e=new Bn,n=new Bn,s=new Bn,r=new Bn,a=new Bn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Hn){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],p=s[7],m=s[8],g=s[9],_=s[10],f=s[11],u=s[12],v=s[13],x=s[14],S=s[15];if(n[0].setComponents(l-r,p-c,f-m,S-u).normalize(),n[1].setComponents(l+r,p+c,f+m,S+u).normalize(),n[2].setComponents(l+a,p+h,f+g,S+v).normalize(),n[3].setComponents(l-a,p-h,f-g,S-v).normalize(),n[4].setComponents(l-o,p-d,f-_,S-x).normalize(),e===Hn)n[5].setComponents(l+o,p+d,f+_,S+x).normalize();else if(e===zr)n[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(t){return bi.center.set(0,0,0),bi.radius=.7071067811865476,bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Sr.x=s.normal.x>0?t.max.x:t.min.x,Sr.y=s.normal.y>0?t.max.y:t.min.y,Sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Sr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Nh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Xd(i,t){let e=t.isWebGL2,n=new WeakMap;function s(c,h){let d=c.array,p=c.usage,m=d.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,d,p),c.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,h,d){let p=h.array,m=h._updateRange,g=h.updateRanges;if(i.bindBuffer(d,c),m.count===-1&&g.length===0&&i.bufferSubData(d,0,p),g.length!==0){for(let _=0,f=g.length;_<f;_++){let u=g[_];e?i.bufferSubData(d,u.start*p.BYTES_PER_ELEMENT,p,u.start,u.count):i.bufferSubData(d,u.start*p.BYTES_PER_ELEMENT,p.subarray(u.start,u.start+u.count))}h.clearUpdateRanges()}m.count!==-1&&(e?i.bufferSubData(d,m.offset*p.BYTES_PER_ELEMENT,p,m.offset,m.count):i.bufferSubData(d,m.offset*p.BYTES_PER_ELEMENT,p.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let p=n.get(c);(!p||p.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let d=n.get(c);if(d===void 0)n.set(c,s(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,h),d.version=c.version}}return{get:a,remove:o,update:l}}var Sn=class i extends Ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,p=e/l,m=[],g=[],_=[],f=[];for(let u=0;u<h;u++){let v=u*p-a;for(let x=0;x<c;x++){let S=x*d-r;g.push(S,-v,0),_.push(0,0,1),f.push(x/o),f.push(1-u/l)}}for(let u=0;u<l;u++)for(let v=0;v<o;v++){let x=v+c*u,S=v+c*(u+1),A=v+1+c*(u+1),T=v+1+c*u;m.push(x,S,T),m.push(S,A,T)}this.setIndex(m),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(_,3)),this.setAttribute("uv",new ce(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$d=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Kd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ef=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,nf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,af=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,of=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,df=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ff=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,mf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,gf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_f=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ef=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,wf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Af=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,If=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Df=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Nf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Of=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ff=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$f=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Qf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ep=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ip=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,op=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,lp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,up=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_p=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ep=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ap=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Lp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Up=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Np=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Op=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,qp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,tm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,em=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,am=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,um=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_m=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ym=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Em=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ot={alphahash_fragment:qd,alphahash_pars_fragment:Yd,alphamap_fragment:$d,alphamap_pars_fragment:Zd,alphatest_fragment:Jd,alphatest_pars_fragment:Kd,aomap_fragment:jd,aomap_pars_fragment:Qd,batching_pars_vertex:tf,batching_vertex:ef,begin_vertex:nf,beginnormal_vertex:sf,bsdfs:rf,iridescence_fragment:af,bumpmap_pars_fragment:of,clipping_planes_fragment:lf,clipping_planes_pars_fragment:cf,clipping_planes_pars_vertex:hf,clipping_planes_vertex:uf,color_fragment:df,color_pars_fragment:ff,color_pars_vertex:pf,color_vertex:mf,common:gf,cube_uv_reflection_fragment:_f,defaultnormal_vertex:xf,displacementmap_pars_vertex:yf,displacementmap_vertex:vf,emissivemap_fragment:Mf,emissivemap_pars_fragment:bf,colorspace_fragment:Sf,colorspace_pars_fragment:Ef,envmap_fragment:wf,envmap_common_pars_fragment:Tf,envmap_pars_fragment:Af,envmap_pars_vertex:Rf,envmap_physical_pars_fragment:kf,envmap_vertex:Cf,fog_vertex:Pf,fog_pars_vertex:Lf,fog_fragment:If,fog_pars_fragment:Df,gradientmap_pars_fragment:Uf,lightmap_fragment:Nf,lightmap_pars_fragment:Of,lights_lambert_fragment:Ff,lights_lambert_pars_fragment:zf,lights_pars_begin:Bf,lights_toon_fragment:Hf,lights_toon_pars_fragment:Vf,lights_phong_fragment:Gf,lights_phong_pars_fragment:Wf,lights_physical_fragment:Xf,lights_physical_pars_fragment:qf,lights_fragment_begin:Yf,lights_fragment_maps:$f,lights_fragment_end:Zf,logdepthbuf_fragment:Jf,logdepthbuf_pars_fragment:Kf,logdepthbuf_pars_vertex:jf,logdepthbuf_vertex:Qf,map_fragment:tp,map_pars_fragment:ep,map_particle_fragment:np,map_particle_pars_fragment:ip,metalnessmap_fragment:sp,metalnessmap_pars_fragment:rp,morphcolor_vertex:ap,morphnormal_vertex:op,morphtarget_pars_vertex:lp,morphtarget_vertex:cp,normal_fragment_begin:hp,normal_fragment_maps:up,normal_pars_fragment:dp,normal_pars_vertex:fp,normal_vertex:pp,normalmap_pars_fragment:mp,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:_p,clearcoat_pars_fragment:xp,iridescence_pars_fragment:yp,opaque_fragment:vp,packing:Mp,premultiplied_alpha_fragment:bp,project_vertex:Sp,dithering_fragment:Ep,dithering_pars_fragment:wp,roughnessmap_fragment:Tp,roughnessmap_pars_fragment:Ap,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Cp,shadowmap_vertex:Pp,shadowmask_pars_fragment:Lp,skinbase_vertex:Ip,skinning_pars_vertex:Dp,skinning_vertex:Up,skinnormal_vertex:Np,specularmap_fragment:Op,specularmap_pars_fragment:Fp,tonemapping_fragment:zp,tonemapping_pars_fragment:Bp,transmission_fragment:kp,transmission_pars_fragment:Hp,uv_pars_fragment:Vp,uv_pars_vertex:Gp,uv_vertex:Wp,worldpos_vertex:Xp,background_vert:qp,background_frag:Yp,backgroundCube_vert:$p,backgroundCube_frag:Zp,cube_vert:Jp,cube_frag:Kp,depth_vert:jp,depth_frag:Qp,distanceRGBA_vert:tm,distanceRGBA_frag:em,equirect_vert:nm,equirect_frag:im,linedashed_vert:sm,linedashed_frag:rm,meshbasic_vert:am,meshbasic_frag:om,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:hm,meshmatcap_frag:um,meshnormal_vert:dm,meshnormal_frag:fm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:_m,meshtoon_vert:xm,meshtoon_frag:ym,points_vert:vm,points_frag:Mm,shadow_vert:bm,shadow_frag:Sm,sprite_vert:Em,sprite_frag:wm},nt={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Rn={basic:{uniforms:Ye([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Ye([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Ye([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Ye([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Ye([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Ye([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Ye([nt.points,nt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Ye([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Ye([nt.common,nt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Ye([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Ye([nt.sprite,nt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Ye([nt.common,nt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Ye([nt.lights,nt.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Rn.physical={uniforms:Ye([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};var Er={r:0,b:0,g:0};function Tm(i,t,e,n,s,r,a){let o=new Dt(0),l=r===!0?0:1,c,h,d=null,p=0,m=null;function g(f,u){let v=!1,x=u.isScene===!0?u.background:null;x&&x.isTexture&&(x=(u.backgroundBlurriness>0?e:t).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),v=!0);let S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ha)?(h===void 0&&(h=new qt(new rn(1,1,1),new Xn({name:"BackgroundCubeMaterial",uniforms:ps(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=u.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,h.material.toneMapped=te.getTransfer(x.colorSpace)!==le,(d!==x||p!==x.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=x,p=x.version,m=i.toneMapping),h.layers.enableAll(),f.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new qt(new Sn(2,2),new Xn({name:"BackgroundMaterial",uniforms:ps(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=u.backgroundIntensity,c.material.toneMapped=te.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||p!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=x,p=x.version,m=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function _(f,u){f.getRGB(Er,Uh(i)),n.buffers.color.setClear(Er.r,Er.g,Er.b,u,a)}return{getClearColor:function(){return o},setClearColor:function(f,u=1){o.set(f),l=u,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,_(o,l)},render:g}}function Am(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=f(null),c=l,h=!1;function d(L,U,V,q,X){let W=!1;if(a){let J=_(q,V,U);c!==J&&(c=J,m(c.object)),W=u(L,q,V,X),W&&v(L,q,V,X)}else{let J=U.wireframe===!0;(c.geometry!==q.id||c.program!==V.id||c.wireframe!==J)&&(c.geometry=q.id,c.program=V.id,c.wireframe=J,W=!0)}X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,D(L,U,V,q),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function p(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,U,V){let q=V.wireframe===!0,X=o[L.id];X===void 0&&(X={},o[L.id]=X);let W=X[U.id];W===void 0&&(W={},X[U.id]=W);let J=W[q];return J===void 0&&(J=f(p()),W[q]=J),J}function f(L){let U=[],V=[],q=[];for(let X=0;X<s;X++)U[X]=0,V[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:q,object:L,attributes:{},index:null}}function u(L,U,V,q){let X=c.attributes,W=U.attributes,J=0,tt=V.getAttributes();for(let ct in tt)if(tt[ct].location>=0){let Y=X[ct],ot=W[ct];if(ot===void 0&&(ct==="instanceMatrix"&&L.instanceMatrix&&(ot=L.instanceMatrix),ct==="instanceColor"&&L.instanceColor&&(ot=L.instanceColor)),Y===void 0||Y.attribute!==ot||ot&&Y.data!==ot.data)return!0;J++}return c.attributesNum!==J||c.index!==q}function v(L,U,V,q){let X={},W=U.attributes,J=0,tt=V.getAttributes();for(let ct in tt)if(tt[ct].location>=0){let Y=W[ct];Y===void 0&&(ct==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),ct==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor));let ot={};ot.attribute=Y,Y&&Y.data&&(ot.data=Y.data),X[ct]=ot,J++}c.attributes=X,c.attributesNum=J,c.index=q}function x(){let L=c.newAttributes;for(let U=0,V=L.length;U<V;U++)L[U]=0}function S(L){A(L,0)}function A(L,U){let V=c.newAttributes,q=c.enabledAttributes,X=c.attributeDivisors;V[L]=1,q[L]===0&&(i.enableVertexAttribArray(L),q[L]=1),X[L]!==U&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,U),X[L]=U)}function T(){let L=c.newAttributes,U=c.enabledAttributes;for(let V=0,q=U.length;V<q;V++)U[V]!==L[V]&&(i.disableVertexAttribArray(V),U[V]=0)}function R(L,U,V,q,X,W,J){J===!0?i.vertexAttribIPointer(L,U,V,X,W):i.vertexAttribPointer(L,U,V,q,X,W)}function D(L,U,V,q){if(n.isWebGL2===!1&&(L.isInstancedMesh||q.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let X=q.attributes,W=V.getAttributes(),J=U.defaultAttributeValues;for(let tt in W){let ct=W[tt];if(ct.location>=0){let H=X[tt];if(H===void 0&&(tt==="instanceMatrix"&&L.instanceMatrix&&(H=L.instanceMatrix),tt==="instanceColor"&&L.instanceColor&&(H=L.instanceColor)),H!==void 0){let Y=H.normalized,ot=H.itemSize,yt=e.get(H);if(yt===void 0)continue;let xt=yt.buffer,Lt=yt.type,Ut=yt.bytesPerElement,wt=n.isWebGL2===!0&&(Lt===i.INT||Lt===i.UNSIGNED_INT||H.gpuType===bh);if(H.isInterleavedBufferAttribute){let $t=H.data,N=$t.stride,Ge=H.offset;if($t.isInstancedInterleavedBuffer){for(let Mt=0;Mt<ct.locationSize;Mt++)A(ct.location+Mt,$t.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=$t.meshPerAttribute*$t.count)}else for(let Mt=0;Mt<ct.locationSize;Mt++)S(ct.location+Mt);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let Mt=0;Mt<ct.locationSize;Mt++)R(ct.location+Mt,ot/ct.locationSize,Lt,Y,N*Ut,(Ge+ot/ct.locationSize*Mt)*Ut,wt)}else{if(H.isInstancedBufferAttribute){for(let $t=0;$t<ct.locationSize;$t++)A(ct.location+$t,H.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let $t=0;$t<ct.locationSize;$t++)S(ct.location+$t);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let $t=0;$t<ct.locationSize;$t++)R(ct.location+$t,ot/ct.locationSize,Lt,Y,ot*Ut,ot/ct.locationSize*$t*Ut,wt)}}else if(J!==void 0){let Y=J[tt];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(ct.location,Y);break;case 3:i.vertexAttrib3fv(ct.location,Y);break;case 4:i.vertexAttrib4fv(ct.location,Y);break;default:i.vertexAttrib1fv(ct.location,Y)}}}}T()}function y(){G();for(let L in o){let U=o[L];for(let V in U){let q=U[V];for(let X in q)g(q[X].object),delete q[X];delete U[V]}delete o[L]}}function w(L){if(o[L.id]===void 0)return;let U=o[L.id];for(let V in U){let q=U[V];for(let X in q)g(q[X].object),delete q[X];delete U[V]}delete o[L.id]}function z(L){for(let U in o){let V=o[U];if(V[L.id]===void 0)continue;let q=V[L.id];for(let X in q)g(q[X].object),delete q[X];delete V[L.id]}}function G(){Q(),h=!0,c!==l&&(c=l,m(c.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:G,resetDefaultState:Q,dispose:y,releaseStatesOfGeometry:w,releaseStatesOfProgram:z,initAttributes:x,enableAttribute:S,disableUnusedAttributes:T}}function Rm(i,t,e,n){let s=n.isWebGL2,r;function a(h){r=h}function o(h,d){i.drawArrays(r,h,d),e.update(d,r,1)}function l(h,d,p){if(p===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,d,p),e.update(d,r,p)}function c(h,d,p){if(p===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<p;g++)this.render(h[g],d[g]);else{m.multiDrawArraysWEBGL(r,h,0,d,0,p);let g=0;for(let _=0;_<p;_++)g+=d[_];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Cm(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),f=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),u=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=p>0,S=a||t.has("OES_texture_float"),A=x&&S,T=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:f,maxVaryings:u,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:S,floatVertexTextures:A,maxSamples:T}}function Pm(i){let t=this,e=null,n=0,s=!1,r=!1,a=new Bn,o=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){let m=d.length!==0||p||n!==0||s;return s=p,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){e=h(d,p,0)},this.setState=function(d,p,m){let g=d.clippingPlanes,_=d.clipIntersection,f=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!f)r?h(null):c();else{let v=r?0:n,x=v*4,S=u.clippingState||null;l.value=S,S=h(g,p,x,m);for(let A=0;A!==x;++A)S[A]=e[A];u.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,p,m,g){let _=d!==null?d.length:0,f=null;if(_!==0){if(f=l.value,g!==!0||f===null){let u=m+_*4,v=p.matrixWorldInverse;o.getNormalMatrix(v),(f===null||f.length<u)&&(f=new Float32Array(u));for(let x=0,S=m;x!==_;++x,S+=4)a.copy(d[x]).applyMatrix4(v,o),a.normal.toArray(f,S),f[S+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,f}}function Lm(i){let t=new WeakMap;function e(a,o){return o===Eo?a.mapping=hs:o===wo&&(a.mapping=us),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Eo||o===wo)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Uo(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Jr=class extends $r{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},as=4,Vc=[.125,.215,.35,.446,.526,.582],wi=20,co=new Jr,Gc=new Dt,ho=null,uo=0,fo=0,Si=(1+Math.sqrt(5))/2,es=1/Si,Wc=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Si,es),new C(0,Si,-es),new C(es,0,Si),new C(-es,0,Si),new C(Si,es,0),new C(-Si,es,0)],Kr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ho,uo,fo),t.scissorTest=!1,wr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===hs||t.mapping===us?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Hs,format:bn,colorSpace:Vn,depthBuffer:!1},s=Xc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xc(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Im(r)),this._blurMaterial=Dm(r,t,e)}return s}_compileMaterial(t){let e=new qt(this._lodPlanes[0],t);this._renderer.compile(e,co)}_sceneToCubeUV(t,e,n,s){let o=new Ue(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Gc),h.toneMapping=ri,h.autoClear=!1;let m=new He({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),g=new qt(new rn,m),_=!1,f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,_=!0):(m.color.copy(Gc),_=!0);for(let u=0;u<6;u++){let v=u%3;v===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):v===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));let x=this._cubeSize;wr(s,v*x,u>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=d,t.background=f}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===hs||t.mapping===us;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new qt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;wr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,co)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Wc[(s-1)%Wc.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new qt(this._lodPlanes[s],c),p=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*wi-1),_=r/g,f=isFinite(r)?1+Math.floor(h*_):wi;f>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${wi}`);let u=[],v=0;for(let R=0;R<wi;++R){let D=R/_,y=Math.exp(-D*D/2);u.push(y),R===0?v+=y:R<f&&(v+=2*y)}for(let R=0;R<u.length;R++)u[R]=u[R]/v;p.envMap.value=t.texture,p.samples.value=f,p.weights.value=u,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);let{_lodMax:x}=this;p.dTheta.value=g,p.mipInt.value=x-n;let S=this._sizeLods[s],A=3*S*(s>x-as?s-x+as:0),T=4*(this._cubeSize-S);wr(e,A,T,3*S,2*S),l.setRenderTarget(e),l.render(d,co)}};function Im(i){let t=[],e=[],n=[],s=i,r=i-as+1+Vc.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-as?l=Vc[a-i+as-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,d=1+c,p=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,f=2,u=1,v=new Float32Array(_*g*m),x=new Float32Array(f*g*m),S=new Float32Array(u*g*m);for(let T=0;T<m;T++){let R=T%3*2/3-1,D=T>2?0:-1,y=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];v.set(y,_*g*T),x.set(p,f*g*T);let w=[T,T,T,T,T,T];S.set(w,u*g*T)}let A=new Ve;A.setAttribute("position",new sn(v,_)),A.setAttribute("uv",new sn(x,f)),A.setAttribute("faceIndex",new sn(S,u)),t.push(A),s>as&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Xc(i,t,e){let n=new Gn(i,t,e);return n.texture.mapping=ha,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Dm(i,t,e){let n=new Float32Array(wi),s=new C(0,1,0);return new Xn({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function qc(){return new Xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Yc(){return new Xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function _l(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Um(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Eo||l===wo,h=l===hs||l===us;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=t.get(o);return e===null&&(e=new Kr(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),t.set(o,d),d.texture}else{if(t.has(o))return t.get(o).texture;{let d=o.image;if(c&&d&&d.height>0||h&&d&&s(d)){e===null&&(e=new Kr(i));let p=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,p),o.addEventListener("dispose",r),p.texture}else return null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Nm(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Om(i,t,e,n){let s={},r=new WeakMap;function a(d){let p=d.target;p.index!==null&&t.remove(p.index);for(let g in p.attributes)t.remove(p.attributes[g]);for(let g in p.morphAttributes){let _=p.morphAttributes[g];for(let f=0,u=_.length;f<u;f++)t.remove(_[f])}p.removeEventListener("dispose",a),delete s[p.id];let m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(d,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function l(d){let p=d.attributes;for(let g in p)t.update(p[g],i.ARRAY_BUFFER);let m=d.morphAttributes;for(let g in m){let _=m[g];for(let f=0,u=_.length;f<u;f++)t.update(_[f],i.ARRAY_BUFFER)}}function c(d){let p=[],m=d.index,g=d.attributes.position,_=0;if(m!==null){let v=m.array;_=m.version;for(let x=0,S=v.length;x<S;x+=3){let A=v[x+0],T=v[x+1],R=v[x+2];p.push(A,T,T,R,R,A)}}else if(g!==void 0){let v=g.array;_=g.version;for(let x=0,S=v.length/3-1;x<S;x+=3){let A=x+0,T=x+1,R=x+2;p.push(A,T,T,R,R,A)}}else return;let f=new(Ih(p)?Yr:qr)(p,1);f.version=_;let u=r.get(d);u&&t.remove(u),r.set(d,f)}function h(d){let p=r.get(d);if(p){let m=d.index;m!==null&&p.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Fm(i,t,e,n){let s=n.isWebGL2,r;function a(m){r=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function h(m,g){i.drawElements(r,g,o,m*l),e.update(g,r,1)}function d(m,g,_){if(_===0)return;let f,u;if(s)f=i,u="drawElementsInstanced";else if(f=t.get("ANGLE_instanced_arrays"),u="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[u](r,g,o,m*l,_),e.update(g,r,_)}function p(m,g,_){if(_===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let u=0;u<_;u++)this.render(m[u]/l,g[u]);else{f.multiDrawElementsWEBGL(r,g,0,o,m,0,_);let u=0;for(let v=0;v<_;v++)u+=g[v];e.update(u,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=p}function zm(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Bm(i,t){return i[0]-t[0]}function km(i,t){return Math.abs(t[1])-Math.abs(i[1])}function Hm(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,a=new fe,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,d){let p=c.morphTargetInfluences;if(t.isWebGL2===!0){let m=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=m!==void 0?m.length:0,_=r.get(h);if(_===void 0||_.count!==g){let L=function(){G.dispose(),r.delete(h),h.removeEventListener("dispose",L)};_!==void 0&&_.texture.dispose();let v=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,S=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],T=h.morphAttributes.normal||[],R=h.morphAttributes.color||[],D=0;v===!0&&(D=1),x===!0&&(D=2),S===!0&&(D=3);let y=h.attributes.position.count*D,w=1;y>t.maxTextureSize&&(w=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let z=new Float32Array(y*w*4*g),G=new Vr(z,y,w,g);G.type=ni,G.needsUpdate=!0;let Q=D*4;for(let U=0;U<g;U++){let V=A[U],q=T[U],X=R[U],W=y*w*4*U;for(let J=0;J<V.count;J++){let tt=J*Q;v===!0&&(a.fromBufferAttribute(V,J),z[W+tt+0]=a.x,z[W+tt+1]=a.y,z[W+tt+2]=a.z,z[W+tt+3]=0),x===!0&&(a.fromBufferAttribute(q,J),z[W+tt+4]=a.x,z[W+tt+5]=a.y,z[W+tt+6]=a.z,z[W+tt+7]=0),S===!0&&(a.fromBufferAttribute(X,J),z[W+tt+8]=a.x,z[W+tt+9]=a.y,z[W+tt+10]=a.z,z[W+tt+11]=X.itemSize===4?a.w:1)}}_={count:g,texture:G,size:new at(y,w)},r.set(h,_),h.addEventListener("dispose",L)}let f=0;for(let v=0;v<p.length;v++)f+=p[v];let u=h.morphTargetsRelative?1:1-f;d.getUniforms().setValue(i,"morphTargetBaseInfluence",u),d.getUniforms().setValue(i,"morphTargetInfluences",p),d.getUniforms().setValue(i,"morphTargetsTexture",_.texture,e),d.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{let m=p===void 0?0:p.length,g=n[h.id];if(g===void 0||g.length!==m){g=[];for(let x=0;x<m;x++)g[x]=[x,0];n[h.id]=g}for(let x=0;x<m;x++){let S=g[x];S[0]=x,S[1]=p[x]}g.sort(km);for(let x=0;x<8;x++)x<m&&g[x][1]?(o[x][0]=g[x][0],o[x][1]=g[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(Bm);let _=h.morphAttributes.position,f=h.morphAttributes.normal,u=0;for(let x=0;x<8;x++){let S=o[x],A=S[0],T=S[1];A!==Number.MAX_SAFE_INTEGER&&T?(_&&h.getAttribute("morphTarget"+x)!==_[A]&&h.setAttribute("morphTarget"+x,_[A]),f&&h.getAttribute("morphNormal"+x)!==f[A]&&h.setAttribute("morphNormal"+x,f[A]),s[x]=T,u+=T):(_&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),f&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}let v=h.morphTargetsRelative?1:1-u;d.getUniforms().setValue(i,"morphTargetBaseInfluence",v),d.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function Vm(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var jr=class extends un{constructor(t,e,n,s,r,a,o,l,c,h){if(h=h!==void 0?h:Ri,h!==Ri&&h!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ri&&(n=ei),n===void 0&&h===ds&&(n=Ai),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:$e,this.minFilter=l!==void 0?l:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Oh=new un,Fh=new jr(1,1);Fh.compareFunction=Lh;var zh=new Vr,Bh=new Io,kh=new Zr,$c=[],Zc=[],Jc=new Float32Array(16),Kc=new Float32Array(9),jc=new Float32Array(4);function _s(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=$c[s];if(r===void 0&&(r=new Float32Array(s),$c[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function da(i,t){let e=Zc[t];e===void 0&&(e=new Int32Array(t),Zc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Gm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Wm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function Xm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function Ym(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;jc.set(n),i.uniformMatrix2fv(this.addr,!1,jc),Re(e,n)}}function $m(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Kc.set(n),i.uniformMatrix3fv(this.addr,!1,Kc),Re(e,n)}}function Zm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ae(e,n))return;Jc.set(n),i.uniformMatrix4fv(this.addr,!1,Jc),Re(e,n)}}function Jm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Km(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function jm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function Qm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function tg(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function eg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function ng(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function ig(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function sg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Fh:Oh;e.setTexture2D(t||r,s)}function rg(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Bh,s)}function ag(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||kh,s)}function og(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||zh,s)}function lg(i){switch(i){case 5126:return Gm;case 35664:return Wm;case 35665:return Xm;case 35666:return qm;case 35674:return Ym;case 35675:return $m;case 35676:return Zm;case 5124:case 35670:return Jm;case 35667:case 35671:return Km;case 35668:case 35672:return jm;case 35669:case 35673:return Qm;case 5125:return tg;case 36294:return eg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return og}}function cg(i,t){i.uniform1fv(this.addr,t)}function hg(i,t){let e=_s(t,this.size,2);i.uniform2fv(this.addr,e)}function ug(i,t){let e=_s(t,this.size,3);i.uniform3fv(this.addr,e)}function dg(i,t){let e=_s(t,this.size,4);i.uniform4fv(this.addr,e)}function fg(i,t){let e=_s(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function pg(i,t){let e=_s(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function mg(i,t){let e=_s(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function gg(i,t){i.uniform1iv(this.addr,t)}function _g(i,t){i.uniform2iv(this.addr,t)}function xg(i,t){i.uniform3iv(this.addr,t)}function yg(i,t){i.uniform4iv(this.addr,t)}function vg(i,t){i.uniform1uiv(this.addr,t)}function Mg(i,t){i.uniform2uiv(this.addr,t)}function bg(i,t){i.uniform3uiv(this.addr,t)}function Sg(i,t){i.uniform4uiv(this.addr,t)}function Eg(i,t,e){let n=this.cache,s=t.length,r=da(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Oh,r[a])}function wg(i,t,e){let n=this.cache,s=t.length,r=da(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Bh,r[a])}function Tg(i,t,e){let n=this.cache,s=t.length,r=da(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||kh,r[a])}function Ag(i,t,e){let n=this.cache,s=t.length,r=da(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||zh,r[a])}function Rg(i){switch(i){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return _g;case 35668:case 35672:return xg;case 35669:case 35673:return yg;case 5125:return vg;case 36294:return Mg;case 36295:return bg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return Eg;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Ag}}var No=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lg(e.type)}},Oo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Rg(e.type)}},Fo=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},po=/(\w+)(\])?(\[|\.)?/g;function Qc(i,t){i.seq.push(t),i.map[t.id]=t}function Cg(i,t,e){let n=i.name,s=n.length;for(po.lastIndex=0;;){let r=po.exec(n),a=po.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Qc(e,c===void 0?new No(o,i,t):new Oo(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Fo(o),Qc(e,d)),e=d}}}var cs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Cg(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function th(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Pg=37297,Lg=0;function Ig(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Dg(i){let t=te.getPrimaries(te.workingColorSpace),e=te.getPrimaries(i),n;switch(t===e?n="":t===Fr&&e===Or?n="LinearDisplayP3ToLinearSRGB":t===Or&&e===Fr&&(n="LinearSRGBToLinearDisplayP3"),i){case Vn:case ua:return[n,"LinearTransferOETF"];case Se:case gl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function eh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ig(i.getShaderSource(t),a)}else return s}function Ug(i,t){let e=Dg(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ng(i,t){let e;switch(t){case Qu:e="Linear";break;case td:e="Reinhard";break;case ed:e="OptimizedCineon";break;case pl:e="ACESFilmic";break;case id:e="AgX";break;case nd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Og(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(os).join(`
`)}function Fg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(os).join(`
`)}function zg(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Bg(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function os(i){return i!==""}function nh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ih(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function zo(i){return i.replace(kg,Vg)}var Hg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Vg(i,t){let e=Ot[t];if(e===void 0){let n=Hg.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return zo(e)}var Gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sh(i){return i.replace(Gg,Wg)}function Wg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rh(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Xg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===yh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===fl?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===zn&&(t="SHADOWMAP_TYPE_VSM"),t}function qg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case hs:case us:t="ENVMAP_TYPE_CUBE";break;case ha:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Yg(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===us&&(t="ENVMAP_MODE_REFRACTION"),t}function $g(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case vh:t="ENVMAP_BLENDING_MULTIPLY";break;case Ku:t="ENVMAP_BLENDING_MIX";break;case ju:t="ENVMAP_BLENDING_ADD";break}return t}function Zg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Jg(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Xg(e),c=qg(e),h=Yg(e),d=$g(e),p=Zg(e),m=e.isWebGL2?"":Og(e),g=Fg(e),_=zg(r),f=s.createProgram(),u,v,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(os).join(`
`),u.length>0&&(u+=`
`),v=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(os).join(`
`),v.length>0&&(v+=`
`)):(u=[rh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),v=[m,rh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?Ot.tonemapping_pars_fragment:"",e.toneMapping!==ri?Ng("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,Ug("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),a=zo(a),a=nh(a,e),a=ih(a,e),o=zo(o),o=nh(o,e),o=ih(o,e),a=sh(a),o=sh(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,u=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,v=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let S=x+u+a,A=x+v+o,T=th(s,s.VERTEX_SHADER,S),R=th(s,s.FRAGMENT_SHADER,A);s.attachShader(f,T),s.attachShader(f,R),e.index0AttributeName!==void 0?s.bindAttribLocation(f,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(f,0,"position"),s.linkProgram(f);function D(G){if(i.debug.checkShaderErrors){let Q=s.getProgramInfoLog(f).trim(),L=s.getShaderInfoLog(T).trim(),U=s.getShaderInfoLog(R).trim(),V=!0,q=!0;if(s.getProgramParameter(f,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,f,T,R);else{let X=eh(s,T,"vertex"),W=eh(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(f,s.VALIDATE_STATUS)+`

Program Info Log: `+Q+`
`+X+`
`+W)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(L===""||U==="")&&(q=!1);q&&(G.diagnostics={runnable:V,programLog:Q,vertexShader:{log:L,prefix:u},fragmentShader:{log:U,prefix:v}})}s.deleteShader(T),s.deleteShader(R),y=new cs(s,f),w=Bg(s,f)}let y;this.getUniforms=function(){return y===void 0&&D(this),y};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let z=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(f,Pg)),z},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(f),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Lg++,this.cacheKey=t,this.usedTimes=1,this.program=f,this.vertexShader=T,this.fragmentShader=R,this}var Kg=0,Bo=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new ko(t),e.set(t,n)),n}},ko=class{constructor(t){this.id=Kg++,this.code=t,this.usedTimes=0}};function jg(i,t,e,n,s,r,a){let o=new Xr,l=new Bo,c=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,p=s.vertexTextures,m=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function f(y,w,z,G,Q){let L=G.fog,U=Q.geometry,V=y.isMeshStandardMaterial?G.environment:null,q=(y.isMeshStandardMaterial?e:t).get(y.envMap||V),X=q&&q.mapping===ha?q.image.height:null,W=g[y.type];y.precision!==null&&(m=s.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));let J=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,tt=J!==void 0?J.length:0,ct=0;U.morphAttributes.position!==void 0&&(ct=1),U.morphAttributes.normal!==void 0&&(ct=2),U.morphAttributes.color!==void 0&&(ct=3);let H,Y,ot,yt;if(W){let We=Rn[W];H=We.vertexShader,Y=We.fragmentShader}else H=y.vertexShader,Y=y.fragmentShader,l.update(y),ot=l.getVertexShaderID(y),yt=l.getFragmentShaderID(y);let xt=i.getRenderTarget(),Lt=Q.isInstancedMesh===!0,Ut=Q.isBatchedMesh===!0,wt=!!y.map,$t=!!y.matcap,N=!!q,Ge=!!y.aoMap,Mt=!!y.lightMap,Ct=!!y.bumpMap,pt=!!y.normalMap,pe=!!y.displacementMap,zt=!!y.emissiveMap,E=!!y.metalnessMap,M=!!y.roughnessMap,F=y.anisotropy>0,K=y.clearcoat>0,Z=y.iridescence>0,j=y.sheen>0,mt=y.transmission>0,rt=F&&!!y.anisotropyMap,ut=K&&!!y.clearcoatMap,Et=K&&!!y.clearcoatNormalMap,Bt=K&&!!y.clearcoatRoughnessMap,$=Z&&!!y.iridescenceMap,Qt=Z&&!!y.iridescenceThicknessMap,Wt=j&&!!y.sheenColorMap,Rt=j&&!!y.sheenRoughnessMap,vt=!!y.specularMap,dt=!!y.specularColorMap,Nt=!!y.specularIntensityMap,jt=mt&&!!y.transmissionMap,xe=mt&&!!y.thicknessMap,Ht=!!y.gradientMap,et=!!y.alphaMap,P=y.alphaTest>0,it=!!y.alphaHash,st=!!y.extensions,Tt=!!U.attributes.uv1,bt=!!U.attributes.uv2,re=!!U.attributes.uv3,ae=ri;return y.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(ae=i.toneMapping),{isWebGL2:h,shaderID:W,shaderType:y.type,shaderName:y.name,vertexShader:H,fragmentShader:Y,defines:y.defines,customVertexShaderID:ot,customFragmentShaderID:yt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Ut,instancing:Lt,instancingColor:Lt&&Q.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:xt===null?i.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:Vn,map:wt,matcap:$t,envMap:N,envMapMode:N&&q.mapping,envMapCubeUVHeight:X,aoMap:Ge,lightMap:Mt,bumpMap:Ct,normalMap:pt,displacementMap:p&&pe,emissiveMap:zt,normalMapObjectSpace:pt&&y.normalMapType===md,normalMapTangentSpace:pt&&y.normalMapType===Ph,metalnessMap:E,roughnessMap:M,anisotropy:F,anisotropyMap:rt,clearcoat:K,clearcoatMap:ut,clearcoatNormalMap:Et,clearcoatRoughnessMap:Bt,iridescence:Z,iridescenceMap:$,iridescenceThicknessMap:Qt,sheen:j,sheenColorMap:Wt,sheenRoughnessMap:Rt,specularMap:vt,specularColorMap:dt,specularIntensityMap:Nt,transmission:mt,transmissionMap:jt,thicknessMap:xe,gradientMap:Ht,opaque:y.transparent===!1&&y.blending===si,alphaMap:et,alphaTest:P,alphaHash:it,combine:y.combine,mapUv:wt&&_(y.map.channel),aoMapUv:Ge&&_(y.aoMap.channel),lightMapUv:Mt&&_(y.lightMap.channel),bumpMapUv:Ct&&_(y.bumpMap.channel),normalMapUv:pt&&_(y.normalMap.channel),displacementMapUv:pe&&_(y.displacementMap.channel),emissiveMapUv:zt&&_(y.emissiveMap.channel),metalnessMapUv:E&&_(y.metalnessMap.channel),roughnessMapUv:M&&_(y.roughnessMap.channel),anisotropyMapUv:rt&&_(y.anisotropyMap.channel),clearcoatMapUv:ut&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Et&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Bt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Qt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(y.sheenRoughnessMap.channel),specularMapUv:vt&&_(y.specularMap.channel),specularColorMapUv:dt&&_(y.specularColorMap.channel),specularIntensityMapUv:Nt&&_(y.specularIntensityMap.channel),transmissionMapUv:jt&&_(y.transmissionMap.channel),thicknessMapUv:xe&&_(y.thicknessMap.channel),alphaMapUv:et&&_(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(pt||F),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Tt,vertexUv2s:bt,vertexUv3s:re,pointsUvs:Q.isPoints===!0&&!!U.attributes.uv&&(wt||et),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:Q.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:ct,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,useLegacyLights:i._useLegacyLights,decodeVideoTexture:wt&&y.map.isVideoTexture===!0&&te.getTransfer(y.map.colorSpace)===le,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===vn,flipSided:y.side===ke,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:st&&y.extensions.derivatives===!0,extensionFragDepth:st&&y.extensions.fragDepth===!0,extensionDrawBuffers:st&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:st&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:st&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function u(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let z in y.defines)w.push(z),w.push(y.defines[z]);return y.isRawShaderMaterial===!1&&(v(w,y),x(w,y),w.push(i.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function v(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function x(y,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),y.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function S(y){let w=g[y.type],z;if(w){let G=Rn[w];z=kd.clone(G.uniforms)}else z=y.uniforms;return z}function A(y,w){let z;for(let G=0,Q=c.length;G<Q;G++){let L=c[G];if(L.cacheKey===w){z=L,++z.usedTimes;break}}return z===void 0&&(z=new Jg(i,w,y,r),c.push(z)),z}function T(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),y.destroy()}}function R(y){l.remove(y)}function D(){l.dispose()}return{getParameters:f,getProgramCacheKey:u,getUniforms:S,acquireProgram:A,releaseProgram:T,releaseShaderCache:R,programs:c,dispose:D}}function Qg(){let i=new WeakMap;function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function e(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function t0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ah(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function oh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,p,m,g,_,f){let u=i[t];return u===void 0?(u={id:d.id,object:d,geometry:p,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:f},i[t]=u):(u.id=d.id,u.object=d,u.geometry=p,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=_,u.group=f),t++,u}function o(d,p,m,g,_,f){let u=a(d,p,m,g,_,f);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):e.push(u)}function l(d,p,m,g,_,f){let u=a(d,p,m,g,_,f);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):e.unshift(u)}function c(d,p){e.length>1&&e.sort(d||t0),n.length>1&&n.sort(p||ah),s.length>1&&s.sort(p||ah)}function h(){for(let d=t,p=i.length;d<p;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function e0(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new oh,i.set(n,[a])):s>=r.length?(a=new oh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function n0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Dt};break;case"SpotLight":e={position:new C,direction:new C,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function i0(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var s0=0;function r0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function a0(i,t){let e=new n0,n=i0(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new C);let r=new C,a=new ve,o=new ve;function l(h,d){let p=0,m=0,g=0;for(let G=0;G<9;G++)s.probe[G].set(0,0,0);let _=0,f=0,u=0,v=0,x=0,S=0,A=0,T=0,R=0,D=0,y=0;h.sort(r0);let w=d===!0?Math.PI:1;for(let G=0,Q=h.length;G<Q;G++){let L=h[G],U=L.color,V=L.intensity,q=L.distance,X=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)p+=U.r*V*w,m+=U.g*V*w,g+=U.b*V*w;else if(L.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(L.sh.coefficients[W],V);y++}else if(L.isDirectionalLight){let W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*w),L.castShadow){let J=L.shadow,tt=n.get(L);tt.shadowBias=J.bias,tt.shadowNormalBias=J.normalBias,tt.shadowRadius=J.radius,tt.shadowMapSize=J.mapSize,s.directionalShadow[_]=tt,s.directionalShadowMap[_]=X,s.directionalShadowMatrix[_]=L.shadow.matrix,S++}s.directional[_]=W,_++}else if(L.isSpotLight){let W=e.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(U).multiplyScalar(V*w),W.distance=q,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,s.spot[u]=W;let J=L.shadow;if(L.map&&(s.spotLightMap[R]=L.map,R++,J.updateMatrices(L),L.castShadow&&D++),s.spotLightMatrix[u]=J.matrix,L.castShadow){let tt=n.get(L);tt.shadowBias=J.bias,tt.shadowNormalBias=J.normalBias,tt.shadowRadius=J.radius,tt.shadowMapSize=J.mapSize,s.spotShadow[u]=tt,s.spotShadowMap[u]=X,T++}u++}else if(L.isRectAreaLight){let W=e.get(L);W.color.copy(U).multiplyScalar(V),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),s.rectArea[v]=W,v++}else if(L.isPointLight){let W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity*w),W.distance=L.distance,W.decay=L.decay,L.castShadow){let J=L.shadow,tt=n.get(L);tt.shadowBias=J.bias,tt.shadowNormalBias=J.normalBias,tt.shadowRadius=J.radius,tt.shadowMapSize=J.mapSize,tt.shadowCameraNear=J.camera.near,tt.shadowCameraFar=J.camera.far,s.pointShadow[f]=tt,s.pointShadowMap[f]=X,s.pointShadowMatrix[f]=L.shadow.matrix,A++}s.point[f]=W,f++}else if(L.isHemisphereLight){let W=e.get(L);W.skyColor.copy(L.color).multiplyScalar(V*w),W.groundColor.copy(L.groundColor).multiplyScalar(V*w),s.hemi[x]=W,x++}}v>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=nt.LTC_FLOAT_1,s.rectAreaLTC2=nt.LTC_FLOAT_2):(s.rectAreaLTC1=nt.LTC_HALF_1,s.rectAreaLTC2=nt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=nt.LTC_FLOAT_1,s.rectAreaLTC2=nt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=nt.LTC_HALF_1,s.rectAreaLTC2=nt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=p,s.ambient[1]=m,s.ambient[2]=g;let z=s.hash;(z.directionalLength!==_||z.pointLength!==f||z.spotLength!==u||z.rectAreaLength!==v||z.hemiLength!==x||z.numDirectionalShadows!==S||z.numPointShadows!==A||z.numSpotShadows!==T||z.numSpotMaps!==R||z.numLightProbes!==y)&&(s.directional.length=_,s.spot.length=u,s.rectArea.length=v,s.point.length=f,s.hemi.length=x,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=A,s.pointShadowMap.length=A,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=A,s.spotLightMatrix.length=T+R-D,s.spotLightMap.length=R,s.numSpotLightShadowsWithMaps=D,s.numLightProbes=y,z.directionalLength=_,z.pointLength=f,z.spotLength=u,z.rectAreaLength=v,z.hemiLength=x,z.numDirectionalShadows=S,z.numPointShadows=A,z.numSpotShadows=T,z.numSpotMaps=R,z.numLightProbes=y,s.version=s0++)}function c(h,d){let p=0,m=0,g=0,_=0,f=0,u=d.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){let S=h[v];if(S.isDirectionalLight){let A=s.directional[p];A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(u),p++}else if(S.isSpotLight){let A=s.spot[g];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(u),A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(u),g++}else if(S.isRectAreaLight){let A=s.rectArea[_];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(u),o.identity(),a.copy(S.matrixWorld),a.premultiply(u),o.extractRotation(a),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),_++}else if(S.isPointLight){let A=s.point[m];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(u),m++}else if(S.isHemisphereLight){let A=s.hemi[f];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(u),f++}}}return{setup:l,setupView:c,state:s}}function lh(i,t){let e=new a0(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function a(d){n.push(d)}function o(d){s.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function o0(i,t){let e=new WeakMap;function n(r,a=0){let o=e.get(r),l;return o===void 0?(l=new lh(i,t),e.set(r,[l])):a>=o.length?(l=new lh(i,t),o.push(l)):l=o[a],l}function s(){e=new WeakMap}return{get:n,dispose:s}}var Ho=class extends Wn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Vo=class extends Wn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},l0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function h0(i,t,e){let n=new Vs,s=new at,r=new at,a=new fe,o=new Ho({depthPacking:pd}),l=new Vo,c={},h=e.maxTextureSize,d={[li]:ke,[ke]:li,[vn]:vn},p=new Xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:l0,fragmentShader:c0}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new Ve;g.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new qt(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yh;let u=this.type;this.render=function(T,R,D){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;let y=i.getRenderTarget(),w=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),G=i.state;G.setBlending(ii),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let Q=u!==zn&&this.type===zn,L=u===zn&&this.type!==zn;for(let U=0,V=T.length;U<V;U++){let q=T[U],X=q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let W=X.getFrameExtents();if(s.multiply(W),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,X.mapSize.y=r.y)),X.map===null||Q===!0||L===!0){let tt=this.type!==zn?{minFilter:$e,magFilter:$e}:{};X.map!==null&&X.map.dispose(),X.map=new Gn(s.x,s.y,tt),X.map.texture.name=q.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();let J=X.getViewportCount();for(let tt=0;tt<J;tt++){let ct=X.getViewport(tt);a.set(r.x*ct.x,r.y*ct.y,r.x*ct.z,r.y*ct.w),G.viewport(a),X.updateMatrices(q,tt),n=X.getFrustum(),S(R,D,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===zn&&v(X,D),X.needsUpdate=!1}u=this.type,f.needsUpdate=!1,i.setRenderTarget(y,w,z)};function v(T,R){let D=t.update(_);p.defines.VSM_SAMPLES!==T.blurSamples&&(p.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Gn(s.x,s.y)),p.uniforms.shadow_pass.value=T.map.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,D,p,_,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,D,m,_,null)}function x(T,R,D,y){let w=null,z=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(z!==void 0)w=z;else if(w=D.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let G=w.uuid,Q=R.uuid,L=c[G];L===void 0&&(L={},c[G]=L);let U=L[Q];U===void 0&&(U=w.clone(),L[Q]=U,R.addEventListener("dispose",A)),w=U}if(w.visible=R.visible,w.wireframe=R.wireframe,y===zn?w.side=R.shadowSide!==null?R.shadowSide:R.side:w.side=R.shadowSide!==null?R.shadowSide:d[R.side],w.alphaMap=R.alphaMap,w.alphaTest=R.alphaTest,w.map=R.map,w.clipShadows=R.clipShadows,w.clippingPlanes=R.clippingPlanes,w.clipIntersection=R.clipIntersection,w.displacementMap=R.displacementMap,w.displacementScale=R.displacementScale,w.displacementBias=R.displacementBias,w.wireframeLinewidth=R.wireframeLinewidth,w.linewidth=R.linewidth,D.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let G=i.properties.get(w);G.light=D}return w}function S(T,R,D,y,w){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&w===zn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);let Q=t.update(T),L=T.material;if(Array.isArray(L)){let U=Q.groups;for(let V=0,q=U.length;V<q;V++){let X=U[V],W=L[X.materialIndex];if(W&&W.visible){let J=x(T,W,y,w);T.onBeforeShadow(i,T,R,D,Q,J,X),i.renderBufferDirect(D,null,Q,J,T,X),T.onAfterShadow(i,T,R,D,Q,J,X)}}}else if(L.visible){let U=x(T,L,y,w);T.onBeforeShadow(i,T,R,D,Q,U,null),i.renderBufferDirect(D,null,Q,U,T,null),T.onAfterShadow(i,T,R,D,Q,U,null)}}let G=T.children;for(let Q=0,L=G.length;Q<L;Q++)S(G[Q],R,D,y,w)}function A(T){T.target.removeEventListener("dispose",A);for(let D in c){let y=c[D],w=T.target.uuid;w in y&&(y[w].dispose(),delete y[w])}}}function u0(i,t,e){let n=e.isWebGL2;function s(){let P=!1,it=new fe,st=null,Tt=new fe(0,0,0,0);return{setMask:function(bt){st!==bt&&!P&&(i.colorMask(bt,bt,bt,bt),st=bt)},setLocked:function(bt){P=bt},setClear:function(bt,re,ae,Pe,We){We===!0&&(bt*=Pe,re*=Pe,ae*=Pe),it.set(bt,re,ae,Pe),Tt.equals(it)===!1&&(i.clearColor(bt,re,ae,Pe),Tt.copy(it))},reset:function(){P=!1,st=null,Tt.set(-1,0,0,0)}}}function r(){let P=!1,it=null,st=null,Tt=null;return{setTest:function(bt){bt?Ut(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(bt){it!==bt&&!P&&(i.depthMask(bt),it=bt)},setFunc:function(bt){if(st!==bt){switch(bt){case Wu:i.depthFunc(i.NEVER);break;case Xu:i.depthFunc(i.ALWAYS);break;case qu:i.depthFunc(i.LESS);break;case Ir:i.depthFunc(i.LEQUAL);break;case Yu:i.depthFunc(i.EQUAL);break;case $u:i.depthFunc(i.GEQUAL);break;case Zu:i.depthFunc(i.GREATER);break;case Ju:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}st=bt}},setLocked:function(bt){P=bt},setClear:function(bt){Tt!==bt&&(i.clearDepth(bt),Tt=bt)},reset:function(){P=!1,it=null,st=null,Tt=null}}}function a(){let P=!1,it=null,st=null,Tt=null,bt=null,re=null,ae=null,Pe=null,We=null;return{setTest:function(oe){P||(oe?Ut(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(oe){it!==oe&&!P&&(i.stencilMask(oe),it=oe)},setFunc:function(oe,Xe,An){(st!==oe||Tt!==Xe||bt!==An)&&(i.stencilFunc(oe,Xe,An),st=oe,Tt=Xe,bt=An)},setOp:function(oe,Xe,An){(re!==oe||ae!==Xe||Pe!==An)&&(i.stencilOp(oe,Xe,An),re=oe,ae=Xe,Pe=An)},setLocked:function(oe){P=oe},setClear:function(oe){We!==oe&&(i.clearStencil(oe),We=oe)},reset:function(){P=!1,it=null,st=null,Tt=null,bt=null,re=null,ae=null,Pe=null,We=null}}}let o=new s,l=new r,c=new a,h=new WeakMap,d=new WeakMap,p={},m={},g=new WeakMap,_=[],f=null,u=!1,v=null,x=null,S=null,A=null,T=null,R=null,D=null,y=new Dt(0,0,0),w=0,z=!1,G=null,Q=null,L=null,U=null,V=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,W=0,J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(J)[1]),X=W>=1):J.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),X=W>=2);let tt=null,ct={},H=i.getParameter(i.SCISSOR_BOX),Y=i.getParameter(i.VIEWPORT),ot=new fe().fromArray(H),yt=new fe().fromArray(Y);function xt(P,it,st,Tt){let bt=new Uint8Array(4),re=i.createTexture();i.bindTexture(P,re),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ae=0;ae<st;ae++)n&&(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)?i.texImage3D(it,0,i.RGBA,1,1,Tt,0,i.RGBA,i.UNSIGNED_BYTE,bt):i.texImage2D(it+ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,bt);return re}let Lt={};Lt[i.TEXTURE_2D]=xt(i.TEXTURE_2D,i.TEXTURE_2D,1),Lt[i.TEXTURE_CUBE_MAP]=xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Lt[i.TEXTURE_2D_ARRAY]=xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Lt[i.TEXTURE_3D]=xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ut(i.DEPTH_TEST),l.setFunc(Ir),zt(!1),E(Gl),Ut(i.CULL_FACE),pt(ii);function Ut(P){p[P]!==!0&&(i.enable(P),p[P]=!0)}function wt(P){p[P]!==!1&&(i.disable(P),p[P]=!1)}function $t(P,it){return m[P]!==it?(i.bindFramebuffer(P,it),m[P]=it,n&&(P===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=it),P===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=it)),!0):!1}function N(P,it){let st=_,Tt=!1;if(P)if(st=g.get(it),st===void 0&&(st=[],g.set(it,st)),P.isWebGLMultipleRenderTargets){let bt=P.texture;if(st.length!==bt.length||st[0]!==i.COLOR_ATTACHMENT0){for(let re=0,ae=bt.length;re<ae;re++)st[re]=i.COLOR_ATTACHMENT0+re;st.length=bt.length,Tt=!0}}else st[0]!==i.COLOR_ATTACHMENT0&&(st[0]=i.COLOR_ATTACHMENT0,Tt=!0);else st[0]!==i.BACK&&(st[0]=i.BACK,Tt=!0);Tt&&(e.isWebGL2?i.drawBuffers(st):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(st))}function Ge(P){return f!==P?(i.useProgram(P),f=P,!0):!1}let Mt={[Ei]:i.FUNC_ADD,[Cu]:i.FUNC_SUBTRACT,[Pu]:i.FUNC_REVERSE_SUBTRACT};if(n)Mt[ql]=i.MIN,Mt[Yl]=i.MAX;else{let P=t.get("EXT_blend_minmax");P!==null&&(Mt[ql]=P.MIN_EXT,Mt[Yl]=P.MAX_EXT)}let Ct={[Lu]:i.ZERO,[Iu]:i.ONE,[Du]:i.SRC_COLOR,[bo]:i.SRC_ALPHA,[Bu]:i.SRC_ALPHA_SATURATE,[Fu]:i.DST_COLOR,[Nu]:i.DST_ALPHA,[Uu]:i.ONE_MINUS_SRC_COLOR,[So]:i.ONE_MINUS_SRC_ALPHA,[zu]:i.ONE_MINUS_DST_COLOR,[Ou]:i.ONE_MINUS_DST_ALPHA,[ku]:i.CONSTANT_COLOR,[Hu]:i.ONE_MINUS_CONSTANT_COLOR,[Vu]:i.CONSTANT_ALPHA,[Gu]:i.ONE_MINUS_CONSTANT_ALPHA};function pt(P,it,st,Tt,bt,re,ae,Pe,We,oe){if(P===ii){u===!0&&(wt(i.BLEND),u=!1);return}if(u===!1&&(Ut(i.BLEND),u=!0),P!==Ru){if(P!==v||oe!==z){if((x!==Ei||T!==Ei)&&(i.blendEquation(i.FUNC_ADD),x=Ei,T=Ei),oe)switch(P){case si:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pi:i.blendFunc(i.ONE,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case si:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}S=null,A=null,R=null,D=null,y.set(0,0,0),w=0,v=P,z=oe}return}bt=bt||it,re=re||st,ae=ae||Tt,(it!==x||bt!==T)&&(i.blendEquationSeparate(Mt[it],Mt[bt]),x=it,T=bt),(st!==S||Tt!==A||re!==R||ae!==D)&&(i.blendFuncSeparate(Ct[st],Ct[Tt],Ct[re],Ct[ae]),S=st,A=Tt,R=re,D=ae),(Pe.equals(y)===!1||We!==w)&&(i.blendColor(Pe.r,Pe.g,Pe.b,We),y.copy(Pe),w=We),v=P,z=!1}function pe(P,it){P.side===vn?wt(i.CULL_FACE):Ut(i.CULL_FACE);let st=P.side===ke;it&&(st=!st),zt(st),P.blending===si&&P.transparent===!1?pt(ii):pt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),o.setMask(P.colorWrite);let Tt=P.stencilWrite;c.setTest(Tt),Tt&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),F(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Ut(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function zt(P){G!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),G=P)}function E(P){P!==Tu?(Ut(i.CULL_FACE),P!==Q&&(P===Gl?i.cullFace(i.BACK):P===Au?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),Q=P}function M(P){P!==L&&(X&&i.lineWidth(P),L=P)}function F(P,it,st){P?(Ut(i.POLYGON_OFFSET_FILL),(U!==it||V!==st)&&(i.polygonOffset(it,st),U=it,V=st)):wt(i.POLYGON_OFFSET_FILL)}function K(P){P?Ut(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function Z(P){P===void 0&&(P=i.TEXTURE0+q-1),tt!==P&&(i.activeTexture(P),tt=P)}function j(P,it,st){st===void 0&&(tt===null?st=i.TEXTURE0+q-1:st=tt);let Tt=ct[st];Tt===void 0&&(Tt={type:void 0,texture:void 0},ct[st]=Tt),(Tt.type!==P||Tt.texture!==it)&&(tt!==st&&(i.activeTexture(st),tt=st),i.bindTexture(P,it||Lt[P]),Tt.type=P,Tt.texture=it)}function mt(){let P=ct[tt];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function rt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ut(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Et(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Bt(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Qt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Rt(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function vt(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function dt(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Nt(P){ot.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),ot.copy(P))}function jt(P){yt.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),yt.copy(P))}function xe(P,it){let st=d.get(it);st===void 0&&(st=new WeakMap,d.set(it,st));let Tt=st.get(P);Tt===void 0&&(Tt=i.getUniformBlockIndex(it,P.name),st.set(P,Tt))}function Ht(P,it){let Tt=d.get(it).get(P);h.get(it)!==Tt&&(i.uniformBlockBinding(it,Tt,P.__bindingPointIndex),h.set(it,Tt))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),p={},tt=null,ct={},m={},g=new WeakMap,_=[],f=null,u=!1,v=null,x=null,S=null,A=null,T=null,R=null,D=null,y=new Dt(0,0,0),w=0,z=!1,G=null,Q=null,L=null,U=null,V=null,ot.set(0,0,i.canvas.width,i.canvas.height),yt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ut,disable:wt,bindFramebuffer:$t,drawBuffers:N,useProgram:Ge,setBlending:pt,setMaterial:pe,setFlipSided:zt,setCullFace:E,setLineWidth:M,setPolygonOffset:F,setScissorTest:K,activeTexture:Z,bindTexture:j,unbindTexture:mt,compressedTexImage2D:rt,compressedTexImage3D:ut,texImage2D:vt,texImage3D:dt,updateUBOMapping:xe,uniformBlockBinding:Ht,texStorage2D:Wt,texStorage3D:Rt,texSubImage2D:Et,texSubImage3D:Bt,compressedTexSubImage2D:$,compressedTexSubImage3D:Qt,scissor:Nt,viewport:jt,reset:et}}function d0(i,t,e,n,s,r,a){let o=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,d,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,M){return m?new OffscreenCanvas(E,M):Br("canvas")}function _(E,M,F,K){let Z=1;if((E.width>K||E.height>K)&&(Z=K/Math.max(E.width,E.height)),Z<1||M===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let j=M?Po:Math.floor,mt=j(Z*E.width),rt=j(Z*E.height);d===void 0&&(d=g(mt,rt));let ut=F?g(mt,rt):d;return ut.width=mt,ut.height=rt,ut.getContext("2d").drawImage(E,0,0,mt,rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+mt+"x"+rt+")."),ut}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function f(E){return wc(E.width)&&wc(E.height)}function u(E){return o?!1:E.wrapS!==Mn||E.wrapT!==Mn||E.minFilter!==$e&&E.minFilter!==cn}function v(E,M){return E.generateMipmaps&&M&&E.minFilter!==$e&&E.minFilter!==cn}function x(E){i.generateMipmap(E)}function S(E,M,F,K,Z=!1){if(o===!1)return M;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let j=M;if(M===i.RED&&(F===i.FLOAT&&(j=i.R32F),F===i.HALF_FLOAT&&(j=i.R16F),F===i.UNSIGNED_BYTE&&(j=i.R8)),M===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.R8UI),F===i.UNSIGNED_SHORT&&(j=i.R16UI),F===i.UNSIGNED_INT&&(j=i.R32UI),F===i.BYTE&&(j=i.R8I),F===i.SHORT&&(j=i.R16I),F===i.INT&&(j=i.R32I)),M===i.RG&&(F===i.FLOAT&&(j=i.RG32F),F===i.HALF_FLOAT&&(j=i.RG16F),F===i.UNSIGNED_BYTE&&(j=i.RG8)),M===i.RGBA){let mt=Z?Nr:te.getTransfer(K);F===i.FLOAT&&(j=i.RGBA32F),F===i.HALF_FLOAT&&(j=i.RGBA16F),F===i.UNSIGNED_BYTE&&(j=mt===le?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function A(E,M,F){return v(E,F)===!0||E.isFramebufferTexture&&E.minFilter!==$e&&E.minFilter!==cn?Math.log2(Math.max(M.width,M.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?M.mipmaps.length:1}function T(E){return E===$e||E===$l||E===Fa?i.NEAREST:i.LINEAR}function R(E){let M=E.target;M.removeEventListener("dispose",R),y(M),M.isVideoTexture&&h.delete(M)}function D(E){let M=E.target;M.removeEventListener("dispose",D),z(M)}function y(E){let M=n.get(E);if(M.__webglInit===void 0)return;let F=E.source,K=p.get(F);if(K){let Z=K[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&w(E),Object.keys(K).length===0&&p.delete(F)}n.remove(E)}function w(E){let M=n.get(E);i.deleteTexture(M.__webglTexture);let F=E.source,K=p.get(F);delete K[M.__cacheKey],a.memory.textures--}function z(E){let M=E.texture,F=n.get(E),K=n.get(M);if(K.__webglTexture!==void 0&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(F.__webglFramebuffer[Z]))for(let j=0;j<F.__webglFramebuffer[Z].length;j++)i.deleteFramebuffer(F.__webglFramebuffer[Z][j]);else i.deleteFramebuffer(F.__webglFramebuffer[Z]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[Z])}else{if(Array.isArray(F.__webglFramebuffer))for(let Z=0;Z<F.__webglFramebuffer.length;Z++)i.deleteFramebuffer(F.__webglFramebuffer[Z]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let Z=0;Z<F.__webglColorRenderbuffer.length;Z++)F.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[Z]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let Z=0,j=M.length;Z<j;Z++){let mt=n.get(M[Z]);mt.__webglTexture&&(i.deleteTexture(mt.__webglTexture),a.memory.textures--),n.remove(M[Z])}n.remove(M),n.remove(E)}let G=0;function Q(){G=0}function L(){let E=G;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),G+=1,E}function U(E){let M=[];return M.push(E.wrapS),M.push(E.wrapT),M.push(E.wrapR||0),M.push(E.magFilter),M.push(E.minFilter),M.push(E.anisotropy),M.push(E.internalFormat),M.push(E.format),M.push(E.type),M.push(E.generateMipmaps),M.push(E.premultiplyAlpha),M.push(E.flipY),M.push(E.unpackAlignment),M.push(E.colorSpace),M.join()}function V(E,M){let F=n.get(E);if(E.isVideoTexture&&pe(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){let K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ot(F,E,M);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+M)}function q(E,M){let F=n.get(E);if(E.version>0&&F.__version!==E.version){ot(F,E,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+M)}function X(E,M){let F=n.get(E);if(E.version>0&&F.__version!==E.version){ot(F,E,M);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+M)}function W(E,M){let F=n.get(E);if(E.version>0&&F.__version!==E.version){yt(F,E,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+M)}let J={[Bs]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[To]:i.MIRRORED_REPEAT},tt={[$e]:i.NEAREST,[$l]:i.NEAREST_MIPMAP_NEAREST,[Fa]:i.NEAREST_MIPMAP_LINEAR,[cn]:i.LINEAR,[sd]:i.LINEAR_MIPMAP_NEAREST,[ks]:i.LINEAR_MIPMAP_LINEAR},ct={[gd]:i.NEVER,[bd]:i.ALWAYS,[_d]:i.LESS,[Lh]:i.LEQUAL,[xd]:i.EQUAL,[Md]:i.GEQUAL,[yd]:i.GREATER,[vd]:i.NOTEQUAL};function H(E,M,F){if(F?(i.texParameteri(E,i.TEXTURE_WRAP_S,J[M.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,J[M.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,J[M.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,tt[M.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,tt[M.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==Mn||M.wrapT!==Mn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,T(M.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,T(M.minFilter)),M.minFilter!==$e&&M.minFilter!==cn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ct[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let K=t.get("EXT_texture_filter_anisotropic");if(M.magFilter===$e||M.minFilter!==Fa&&M.minFilter!==ks||M.type===ni&&t.has("OES_texture_float_linear")===!1||o===!1&&M.type===Hs&&t.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(E,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function Y(E,M){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,M.addEventListener("dispose",R));let K=M.source,Z=p.get(K);Z===void 0&&(Z={},p.set(K,Z));let j=U(M);if(j!==E.__cacheKey){Z[j]===void 0&&(Z[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Z[j].usedTimes++;let mt=Z[E.__cacheKey];mt!==void 0&&(Z[E.__cacheKey].usedTimes--,mt.usedTimes===0&&w(M)),E.__cacheKey=j,E.__webglTexture=Z[j].texture}return F}function ot(E,M,F){let K=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=i.TEXTURE_3D);let Z=Y(E,M),j=M.source;e.bindTexture(K,E.__webglTexture,i.TEXTURE0+F);let mt=n.get(j);if(j.version!==mt.__version||Z===!0){e.activeTexture(i.TEXTURE0+F);let rt=te.getPrimaries(te.workingColorSpace),ut=M.colorSpace===hn?null:te.getPrimaries(M.colorSpace),Et=M.colorSpace===hn||rt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let Bt=u(M)&&f(M.image)===!1,$=_(M.image,Bt,!1,s.maxTextureSize);$=zt(M,$);let Qt=f($)||o,Wt=r.convert(M.format,M.colorSpace),Rt=r.convert(M.type),vt=S(M.internalFormat,Wt,Rt,M.colorSpace,M.isVideoTexture);H(K,M,Qt);let dt,Nt=M.mipmaps,jt=o&&M.isVideoTexture!==!0&&vt!==Rh,xe=mt.__version===void 0||Z===!0,Ht=A(M,$,Qt);if(M.isDepthTexture)vt=i.DEPTH_COMPONENT,o?M.type===ni?vt=i.DEPTH_COMPONENT32F:M.type===ei?vt=i.DEPTH_COMPONENT24:M.type===Ai?vt=i.DEPTH24_STENCIL8:vt=i.DEPTH_COMPONENT16:M.type===ni&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Ri&&vt===i.DEPTH_COMPONENT&&M.type!==ml&&M.type!==ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=ei,Rt=r.convert(M.type)),M.format===ds&&vt===i.DEPTH_COMPONENT&&(vt=i.DEPTH_STENCIL,M.type!==Ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Ai,Rt=r.convert(M.type))),xe&&(jt?e.texStorage2D(i.TEXTURE_2D,1,vt,$.width,$.height):e.texImage2D(i.TEXTURE_2D,0,vt,$.width,$.height,0,Wt,Rt,null));else if(M.isDataTexture)if(Nt.length>0&&Qt){jt&&xe&&e.texStorage2D(i.TEXTURE_2D,Ht,vt,Nt[0].width,Nt[0].height);for(let et=0,P=Nt.length;et<P;et++)dt=Nt[et],jt?e.texSubImage2D(i.TEXTURE_2D,et,0,0,dt.width,dt.height,Wt,Rt,dt.data):e.texImage2D(i.TEXTURE_2D,et,vt,dt.width,dt.height,0,Wt,Rt,dt.data);M.generateMipmaps=!1}else jt?(xe&&e.texStorage2D(i.TEXTURE_2D,Ht,vt,$.width,$.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,$.width,$.height,Wt,Rt,$.data)):e.texImage2D(i.TEXTURE_2D,0,vt,$.width,$.height,0,Wt,Rt,$.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){jt&&xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ht,vt,Nt[0].width,Nt[0].height,$.depth);for(let et=0,P=Nt.length;et<P;et++)dt=Nt[et],M.format!==bn?Wt!==null?jt?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,dt.width,dt.height,$.depth,Wt,dt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,vt,dt.width,dt.height,$.depth,0,dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):jt?e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,dt.width,dt.height,$.depth,Wt,Rt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,vt,dt.width,dt.height,$.depth,0,Wt,Rt,dt.data)}else{jt&&xe&&e.texStorage2D(i.TEXTURE_2D,Ht,vt,Nt[0].width,Nt[0].height);for(let et=0,P=Nt.length;et<P;et++)dt=Nt[et],M.format!==bn?Wt!==null?jt?e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,dt.width,dt.height,Wt,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,et,vt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):jt?e.texSubImage2D(i.TEXTURE_2D,et,0,0,dt.width,dt.height,Wt,Rt,dt.data):e.texImage2D(i.TEXTURE_2D,et,vt,dt.width,dt.height,0,Wt,Rt,dt.data)}else if(M.isDataArrayTexture)jt?(xe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ht,vt,$.width,$.height,$.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,Wt,Rt,$.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,vt,$.width,$.height,$.depth,0,Wt,Rt,$.data);else if(M.isData3DTexture)jt?(xe&&e.texStorage3D(i.TEXTURE_3D,Ht,vt,$.width,$.height,$.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,Wt,Rt,$.data)):e.texImage3D(i.TEXTURE_3D,0,vt,$.width,$.height,$.depth,0,Wt,Rt,$.data);else if(M.isFramebufferTexture){if(xe)if(jt)e.texStorage2D(i.TEXTURE_2D,Ht,vt,$.width,$.height);else{let et=$.width,P=$.height;for(let it=0;it<Ht;it++)e.texImage2D(i.TEXTURE_2D,it,vt,et,P,0,Wt,Rt,null),et>>=1,P>>=1}}else if(Nt.length>0&&Qt){jt&&xe&&e.texStorage2D(i.TEXTURE_2D,Ht,vt,Nt[0].width,Nt[0].height);for(let et=0,P=Nt.length;et<P;et++)dt=Nt[et],jt?e.texSubImage2D(i.TEXTURE_2D,et,0,0,Wt,Rt,dt):e.texImage2D(i.TEXTURE_2D,et,vt,Wt,Rt,dt);M.generateMipmaps=!1}else jt?(xe&&e.texStorage2D(i.TEXTURE_2D,Ht,vt,$.width,$.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Wt,Rt,$)):e.texImage2D(i.TEXTURE_2D,0,vt,Wt,Rt,$);v(M,Qt)&&x(K),mt.__version=j.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function yt(E,M,F){if(M.image.length!==6)return;let K=Y(E,M),Z=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);let j=n.get(Z);if(Z.version!==j.__version||K===!0){e.activeTexture(i.TEXTURE0+F);let mt=te.getPrimaries(te.workingColorSpace),rt=M.colorSpace===hn?null:te.getPrimaries(M.colorSpace),ut=M.colorSpace===hn||mt===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);let Et=M.isCompressedTexture||M.image[0].isCompressedTexture,Bt=M.image[0]&&M.image[0].isDataTexture,$=[];for(let et=0;et<6;et++)!Et&&!Bt?$[et]=_(M.image[et],!1,!0,s.maxCubemapSize):$[et]=Bt?M.image[et].image:M.image[et],$[et]=zt(M,$[et]);let Qt=$[0],Wt=f(Qt)||o,Rt=r.convert(M.format,M.colorSpace),vt=r.convert(M.type),dt=S(M.internalFormat,Rt,vt,M.colorSpace),Nt=o&&M.isVideoTexture!==!0,jt=j.__version===void 0||K===!0,xe=A(M,Qt,Wt);H(i.TEXTURE_CUBE_MAP,M,Wt);let Ht;if(Et){Nt&&jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xe,dt,Qt.width,Qt.height);for(let et=0;et<6;et++){Ht=$[et].mipmaps;for(let P=0;P<Ht.length;P++){let it=Ht[P];M.format!==bn?Rt!==null?Nt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,0,0,it.width,it.height,Rt,it.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,dt,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Nt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,0,0,it.width,it.height,Rt,vt,it.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P,dt,it.width,it.height,0,Rt,vt,it.data)}}}else{Ht=M.mipmaps,Nt&&jt&&(Ht.length>0&&xe++,e.texStorage2D(i.TEXTURE_CUBE_MAP,xe,dt,$[0].width,$[0].height));for(let et=0;et<6;et++)if(Bt){Nt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,$[et].width,$[et].height,Rt,vt,$[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,dt,$[et].width,$[et].height,0,Rt,vt,$[et].data);for(let P=0;P<Ht.length;P++){let st=Ht[P].image[et].image;Nt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,0,0,st.width,st.height,Rt,vt,st.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,dt,st.width,st.height,0,Rt,vt,st.data)}}else{Nt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Rt,vt,$[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,dt,Rt,vt,$[et]);for(let P=0;P<Ht.length;P++){let it=Ht[P];Nt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,0,0,Rt,vt,it.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,P+1,dt,Rt,vt,it.image[et])}}}v(M,Wt)&&x(i.TEXTURE_CUBE_MAP),j.__version=Z.version,M.onUpdate&&M.onUpdate(M)}E.__version=M.version}function xt(E,M,F,K,Z,j){let mt=r.convert(F.format,F.colorSpace),rt=r.convert(F.type),ut=S(F.internalFormat,mt,rt,F.colorSpace);if(!n.get(M).__hasExternalTextures){let Bt=Math.max(1,M.width>>j),$=Math.max(1,M.height>>j);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,j,ut,Bt,$,M.depth,0,mt,rt,null):e.texImage2D(Z,j,ut,Bt,$,0,mt,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),pt(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Z,n.get(F).__webglTexture,0,Ct(M)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Z,n.get(F).__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(E,M,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),M.depthBuffer&&!M.stencilBuffer){let K=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||pt(M)){let Z=M.depthTexture;Z&&Z.isDepthTexture&&(Z.type===ni?K=i.DEPTH_COMPONENT32F:Z.type===ei&&(K=i.DEPTH_COMPONENT24));let j=Ct(M);pt(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j,K,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,j,K,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,K,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(M.depthBuffer&&M.stencilBuffer){let K=Ct(M);F&&pt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,M.width,M.height):pt(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{let K=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z=0;Z<K.length;Z++){let j=K[Z],mt=r.convert(j.format,j.colorSpace),rt=r.convert(j.type),ut=S(j.internalFormat,mt,rt,j.colorSpace),Et=Ct(M);F&&pt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Et,ut,M.width,M.height):pt(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Et,ut,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ut,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(E,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);let K=n.get(M.depthTexture).__webglTexture,Z=Ct(M);if(M.depthTexture.format===Ri)pt(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(M.depthTexture.format===ds)pt(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function wt(E){let M=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!M.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ut(M.__webglFramebuffer,E)}else if(F){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]=i.createRenderbuffer(),Lt(M.__webglDepthbuffer[K],E,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Lt(M.__webglDepthbuffer,E,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function $t(E,M,F){let K=n.get(E);M!==void 0&&xt(K.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&wt(E)}function N(E){let M=E.texture,F=n.get(E),K=n.get(M);E.addEventListener("dispose",D),E.isWebGLMultipleRenderTargets!==!0&&(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=M.version,a.memory.textures++);let Z=E.isWebGLCubeRenderTarget===!0,j=E.isWebGLMultipleRenderTargets===!0,mt=f(E)||o;if(Z){F.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(o&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer[rt]=[];for(let ut=0;ut<M.mipmaps.length;ut++)F.__webglFramebuffer[rt][ut]=i.createFramebuffer()}else F.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer=[];for(let rt=0;rt<M.mipmaps.length;rt++)F.__webglFramebuffer[rt]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(j)if(s.drawBuffers){let rt=E.texture;for(let ut=0,Et=rt.length;ut<Et;ut++){let Bt=n.get(rt[ut]);Bt.__webglTexture===void 0&&(Bt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&pt(E)===!1){let rt=j?M:[M];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ut=0;ut<rt.length;ut++){let Et=rt[ut];F.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[ut]);let Bt=r.convert(Et.format,Et.colorSpace),$=r.convert(Et.type),Qt=S(Et.internalFormat,Bt,$,Et.colorSpace,E.isXRRenderTarget===!0),Wt=Ct(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,Qt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,F.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Lt(F.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),H(i.TEXTURE_CUBE_MAP,M,mt);for(let rt=0;rt<6;rt++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let ut=0;ut<M.mipmaps.length;ut++)xt(F.__webglFramebuffer[rt][ut],E,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,ut);else xt(F.__webglFramebuffer[rt],E,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);v(M,mt)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(j){let rt=E.texture;for(let ut=0,Et=rt.length;ut<Et;ut++){let Bt=rt[ut],$=n.get(Bt);e.bindTexture(i.TEXTURE_2D,$.__webglTexture),H(i.TEXTURE_2D,Bt,mt),xt(F.__webglFramebuffer,E,Bt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),v(Bt,mt)&&x(i.TEXTURE_2D)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?rt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(rt,K.__webglTexture),H(rt,M,mt),o&&M.mipmaps&&M.mipmaps.length>0)for(let ut=0;ut<M.mipmaps.length;ut++)xt(F.__webglFramebuffer[ut],E,M,i.COLOR_ATTACHMENT0,rt,ut);else xt(F.__webglFramebuffer,E,M,i.COLOR_ATTACHMENT0,rt,0);v(M,mt)&&x(rt),e.unbindTexture()}E.depthBuffer&&wt(E)}function Ge(E){let M=f(E)||o,F=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let K=0,Z=F.length;K<Z;K++){let j=F[K];if(v(j,M)){let mt=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,rt=n.get(j).__webglTexture;e.bindTexture(mt,rt),x(mt),e.unbindTexture()}}}function Mt(E){if(o&&E.samples>0&&pt(E)===!1){let M=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],F=E.width,K=E.height,Z=i.COLOR_BUFFER_BIT,j=[],mt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=n.get(E),ut=E.isWebGLMultipleRenderTargets===!0;if(ut)for(let Et=0;Et<M.length;Et++)e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let Et=0;Et<M.length;Et++){j.push(i.COLOR_ATTACHMENT0+Et),E.depthBuffer&&j.push(mt);let Bt=rt.__ignoreDepthValues!==void 0?rt.__ignoreDepthValues:!1;if(Bt===!1&&(E.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ut&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,rt.__webglColorRenderbuffer[Et]),Bt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[mt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[mt])),ut){let $=n.get(M[Et]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$,0)}i.blitFramebuffer(0,0,F,K,0,0,F,K,Z,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let Et=0;Et<M.length;Et++){e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,rt.__webglColorRenderbuffer[Et]);let Bt=n.get(M[Et]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,Bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}}function Ct(E){return Math.min(s.maxSamples,E.samples)}function pt(E){let M=n.get(E);return o&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function pe(E){let M=a.render.frame;h.get(E)!==M&&(h.set(E,M),E.update())}function zt(E,M){let F=E.colorSpace,K=E.format,Z=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Ro||F!==Vn&&F!==hn&&(te.getTransfer(F)===le?o===!1?t.has("EXT_sRGB")===!0&&K===bn?(E.format=Ro,E.minFilter=cn,E.generateMipmaps=!1):M=kr.sRGBToLinear(M):(K!==bn||Z!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),M}this.allocateTextureUnit=L,this.resetTextureUnits=Q,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=W,this.rebindTextures=$t,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=pt}function f0(i,t,e){let n=e.isWebGL2;function s(r,a=hn){let o,l=te.getTransfer(a);if(r===ai)return i.UNSIGNED_BYTE;if(r===Sh)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Eh)return i.UNSIGNED_SHORT_5_5_5_1;if(r===rd)return i.BYTE;if(r===ad)return i.SHORT;if(r===ml)return i.UNSIGNED_SHORT;if(r===bh)return i.INT;if(r===ei)return i.UNSIGNED_INT;if(r===ni)return i.FLOAT;if(r===Hs)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===od)return i.ALPHA;if(r===bn)return i.RGBA;if(r===ld)return i.LUMINANCE;if(r===cd)return i.LUMINANCE_ALPHA;if(r===Ri)return i.DEPTH_COMPONENT;if(r===ds)return i.DEPTH_STENCIL;if(r===Ro)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===hd)return i.RED;if(r===wh)return i.RED_INTEGER;if(r===ud)return i.RG;if(r===Th)return i.RG_INTEGER;if(r===Ah)return i.RGBA_INTEGER;if(r===za||r===Ba||r===ka||r===Ha)if(l===le)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===za)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ba)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ka)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ha)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===za)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ba)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ka)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ha)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Zl||r===Jl||r===Kl||r===jl)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Zl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Jl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Kl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===jl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Rh)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ql||r===tc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Ql)return l===le?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===tc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ec||r===nc||r===ic||r===sc||r===rc||r===ac||r===oc||r===lc||r===cc||r===hc||r===uc||r===dc||r===fc||r===pc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===ec)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===nc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ic)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===sc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===rc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ac)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===oc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===lc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===cc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===hc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===uc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===dc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===fc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===pc)return l===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Va||r===mc||r===gc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Va)return l===le?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===mc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===gc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===dd||r===_c||r===xc||r===yc)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Va)return o.COMPRESSED_RED_RGTC1_EXT;if(r===_c)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===xc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===yc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ai?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Go=class extends Ue{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ge=class extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}},p0={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let f=e.getJointPose(_,n),u=this._getHandJoint(c,_);f!==null&&(u.matrix.fromArray(f.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=f.radius),u.visible=f!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&p>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(p0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ge;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Wo=class extends ci{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,p=null,m=null,g=null,_=e.getContextAttributes(),f=null,u=null,v=[],x=[],S=new at,A=null,T=new Ue;T.layers.enable(1),T.viewport=new fe;let R=new Ue;R.layers.enable(2),R.viewport=new fe;let D=[T,R],y=new Go;y.layers.enable(1),y.layers.enable(2);let w=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let Y=v[H];return Y===void 0&&(Y=new Os,v[H]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(H){let Y=v[H];return Y===void 0&&(Y=new Os,v[H]=Y),Y.getGripSpace()},this.getHand=function(H){let Y=v[H];return Y===void 0&&(Y=new Os,v[H]=Y),Y.getHandSpace()};function G(H){let Y=x.indexOf(H.inputSource);if(Y===-1)return;let ot=v[Y];ot!==void 0&&(ot.update(H.inputSource,H.frame,c||a),ot.dispatchEvent({type:H.type,data:H.inputSource}))}function Q(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",L);for(let H=0;H<v.length;H++){let Y=x[H];Y!==null&&(x[H]=null,v[H].disconnect(Y))}w=null,z=null,t.setRenderTarget(f),m=null,p=null,d=null,s=null,u=null,ct.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(S),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let Y={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,Y),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),u=new Gn(m.framebufferWidth,m.framebufferHeight,{format:bn,type:ai,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let Y=null,ot=null,yt=null;_.depth&&(yt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=_.stencil?ds:Ri,ot=_.stencil?Ai:ei);let xt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};d=new XRWebGLBinding(s,e),p=d.createProjectionLayer(xt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),u=new Gn(p.textureWidth,p.textureHeight,{format:bn,type:ai,depthTexture:new jr(p.textureWidth,p.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});let Lt=t.properties.get(u);Lt.__ignoreDepthValues=p.ignoreDepthValues}u.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ct.setContext(s),ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(H){for(let Y=0;Y<H.removed.length;Y++){let ot=H.removed[Y],yt=x.indexOf(ot);yt>=0&&(x[yt]=null,v[yt].disconnect(ot))}for(let Y=0;Y<H.added.length;Y++){let ot=H.added[Y],yt=x.indexOf(ot);if(yt===-1){for(let Lt=0;Lt<v.length;Lt++)if(Lt>=x.length){x.push(ot),yt=Lt;break}else if(x[Lt]===null){x[Lt]=ot,yt=Lt;break}if(yt===-1)break}let xt=v[yt];xt&&xt.connect(ot)}}let U=new C,V=new C;function q(H,Y,ot){U.setFromMatrixPosition(Y.matrixWorld),V.setFromMatrixPosition(ot.matrixWorld);let yt=U.distanceTo(V),xt=Y.projectionMatrix.elements,Lt=ot.projectionMatrix.elements,Ut=xt[14]/(xt[10]-1),wt=xt[14]/(xt[10]+1),$t=(xt[9]+1)/xt[5],N=(xt[9]-1)/xt[5],Ge=(xt[8]-1)/xt[0],Mt=(Lt[8]+1)/Lt[0],Ct=Ut*Ge,pt=Ut*Mt,pe=yt/(-Ge+Mt),zt=pe*-Ge;Y.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(zt),H.translateZ(pe),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let E=Ut+pe,M=wt+pe,F=Ct-zt,K=pt+(yt-zt),Z=$t*wt/M*E,j=N*wt/M*E;H.projectionMatrix.makePerspective(F,K,Z,j,E,M),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function X(H,Y){Y===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(Y.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;y.near=R.near=T.near=H.near,y.far=R.far=T.far=H.far,(w!==y.near||z!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,z=y.far);let Y=H.parent,ot=y.cameras;X(y,Y);for(let yt=0;yt<ot.length;yt++)X(ot[yt],Y);ot.length===2?q(y,T,R):y.projectionMatrix.copy(T.projectionMatrix),W(H,y,Y)};function W(H,Y,ot){ot===null?H.matrix.copy(Y.matrixWorld):(H.matrix.copy(ot.matrixWorld),H.matrix.invert(),H.matrix.multiply(Y.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(Y.projectionMatrix),H.projectionMatrixInverse.copy(Y.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Co*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(H){l=H,p!==null&&(p.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)};let J=null;function tt(H,Y){if(h=Y.getViewerPose(c||a),g=Y,h!==null){let ot=h.views;m!==null&&(t.setRenderTargetFramebuffer(u,m.framebuffer),t.setRenderTarget(u));let yt=!1;ot.length!==y.cameras.length&&(y.cameras.length=0,yt=!0);for(let xt=0;xt<ot.length;xt++){let Lt=ot[xt],Ut=null;if(m!==null)Ut=m.getViewport(Lt);else{let $t=d.getViewSubImage(p,Lt);Ut=$t.viewport,xt===0&&(t.setRenderTargetTextures(u,$t.colorTexture,p.ignoreDepthValues?void 0:$t.depthStencilTexture),t.setRenderTarget(u))}let wt=D[xt];wt===void 0&&(wt=new Ue,wt.layers.enable(xt),wt.viewport=new fe,D[xt]=wt),wt.matrix.fromArray(Lt.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(Lt.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),xt===0&&(y.matrix.copy(wt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),yt===!0&&y.cameras.push(wt)}}for(let ot=0;ot<v.length;ot++){let yt=x[ot],xt=v[ot];yt!==null&&xt!==void 0&&xt.update(yt,Y,c||a)}J&&J(H,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),g=null}let ct=new Nh;ct.setAnimationLoop(tt),this.setAnimationLoop=function(H){J=H},this.dispose=function(){}}};function m0(i,t){function e(f,u){f.matrixAutoUpdate===!0&&f.updateMatrix(),u.value.copy(f.matrix)}function n(f,u){u.color.getRGB(f.fogColor.value,Uh(i)),u.isFog?(f.fogNear.value=u.near,f.fogFar.value=u.far):u.isFogExp2&&(f.fogDensity.value=u.density)}function s(f,u,v,x,S){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(f,u):u.isMeshToonMaterial?(r(f,u),d(f,u)):u.isMeshPhongMaterial?(r(f,u),h(f,u)):u.isMeshStandardMaterial?(r(f,u),p(f,u),u.isMeshPhysicalMaterial&&m(f,u,S)):u.isMeshMatcapMaterial?(r(f,u),g(f,u)):u.isMeshDepthMaterial?r(f,u):u.isMeshDistanceMaterial?(r(f,u),_(f,u)):u.isMeshNormalMaterial?r(f,u):u.isLineBasicMaterial?(a(f,u),u.isLineDashedMaterial&&o(f,u)):u.isPointsMaterial?l(f,u,v,x):u.isSpriteMaterial?c(f,u):u.isShadowMaterial?(f.color.value.copy(u.color),f.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(f,u){f.opacity.value=u.opacity,u.color&&f.diffuse.value.copy(u.color),u.emissive&&f.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(f.map.value=u.map,e(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,e(u.alphaMap,f.alphaMapTransform)),u.bumpMap&&(f.bumpMap.value=u.bumpMap,e(u.bumpMap,f.bumpMapTransform),f.bumpScale.value=u.bumpScale,u.side===ke&&(f.bumpScale.value*=-1)),u.normalMap&&(f.normalMap.value=u.normalMap,e(u.normalMap,f.normalMapTransform),f.normalScale.value.copy(u.normalScale),u.side===ke&&f.normalScale.value.negate()),u.displacementMap&&(f.displacementMap.value=u.displacementMap,e(u.displacementMap,f.displacementMapTransform),f.displacementScale.value=u.displacementScale,f.displacementBias.value=u.displacementBias),u.emissiveMap&&(f.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,f.emissiveMapTransform)),u.specularMap&&(f.specularMap.value=u.specularMap,e(u.specularMap,f.specularMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest);let v=t.get(u).envMap;if(v&&(f.envMap.value=v,f.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=u.reflectivity,f.ior.value=u.ior,f.refractionRatio.value=u.refractionRatio),u.lightMap){f.lightMap.value=u.lightMap;let x=i._useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=u.lightMapIntensity*x,e(u.lightMap,f.lightMapTransform)}u.aoMap&&(f.aoMap.value=u.aoMap,f.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,f.aoMapTransform))}function a(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,u.map&&(f.map.value=u.map,e(u.map,f.mapTransform))}function o(f,u){f.dashSize.value=u.dashSize,f.totalSize.value=u.dashSize+u.gapSize,f.scale.value=u.scale}function l(f,u,v,x){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.size.value=u.size*v,f.scale.value=x*.5,u.map&&(f.map.value=u.map,e(u.map,f.uvTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,e(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function c(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.rotation.value=u.rotation,u.map&&(f.map.value=u.map,e(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,e(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function h(f,u){f.specular.value.copy(u.specular),f.shininess.value=Math.max(u.shininess,1e-4)}function d(f,u){u.gradientMap&&(f.gradientMap.value=u.gradientMap)}function p(f,u){f.metalness.value=u.metalness,u.metalnessMap&&(f.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,f.metalnessMapTransform)),f.roughness.value=u.roughness,u.roughnessMap&&(f.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,f.roughnessMapTransform)),t.get(u).envMap&&(f.envMapIntensity.value=u.envMapIntensity)}function m(f,u,v){f.ior.value=u.ior,u.sheen>0&&(f.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),f.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(f.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,f.sheenColorMapTransform)),u.sheenRoughnessMap&&(f.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,f.sheenRoughnessMapTransform))),u.clearcoat>0&&(f.clearcoat.value=u.clearcoat,f.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(f.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,f.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(f.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===ke&&f.clearcoatNormalScale.value.negate())),u.iridescence>0&&(f.iridescence.value=u.iridescence,f.iridescenceIOR.value=u.iridescenceIOR,f.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(f.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,f.iridescenceMapTransform)),u.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),u.transmission>0&&(f.transmission.value=u.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(f.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,f.transmissionMapTransform)),f.thickness.value=u.thickness,u.thicknessMap&&(f.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=u.attenuationDistance,f.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(f.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(f.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=u.specularIntensity,f.specularColor.value.copy(u.specularColor),u.specularColorMap&&(f.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,f.specularColorMapTransform)),u.specularIntensityMap&&(f.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,u){u.matcap&&(f.matcap.value=u.matcap)}function _(f,u){let v=t.get(u).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function g0(i,t,e,n){let s={},r={},a=[],o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,x){let S=x.program;n.uniformBlockBinding(v,S)}function c(v,x){let S=s[v.id];S===void 0&&(g(v),S=h(v),s[v.id]=S,v.addEventListener("dispose",f));let A=x.program;n.updateUBOMapping(v,A);let T=t.render.frame;r[v.id]!==T&&(p(v),r[v.id]=T)}function h(v){let x=d();v.__bindingPointIndex=x;let S=i.createBuffer(),A=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,S),S}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(v){let x=s[v.id],S=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,R=S.length;T<R;T++){let D=Array.isArray(S[T])?S[T]:[S[T]];for(let y=0,w=D.length;y<w;y++){let z=D[y];if(m(z,T,y,A)===!0){let G=z.__offset,Q=Array.isArray(z.value)?z.value:[z.value],L=0;for(let U=0;U<Q.length;U++){let V=Q[U],q=_(V);typeof V=="number"||typeof V=="boolean"?(z.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,G+L,z.__data)):V.isMatrix3?(z.__data[0]=V.elements[0],z.__data[1]=V.elements[1],z.__data[2]=V.elements[2],z.__data[3]=0,z.__data[4]=V.elements[3],z.__data[5]=V.elements[4],z.__data[6]=V.elements[5],z.__data[7]=0,z.__data[8]=V.elements[6],z.__data[9]=V.elements[7],z.__data[10]=V.elements[8],z.__data[11]=0):(V.toArray(z.__data,L),L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(v,x,S,A){let T=v.value,R=x+"_"+S;if(A[R]===void 0)return typeof T=="number"||typeof T=="boolean"?A[R]=T:A[R]=T.clone(),!0;{let D=A[R];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return A[R]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function g(v){let x=v.uniforms,S=0,A=16;for(let R=0,D=x.length;R<D;R++){let y=Array.isArray(x[R])?x[R]:[x[R]];for(let w=0,z=y.length;w<z;w++){let G=y[w],Q=Array.isArray(G.value)?G.value:[G.value];for(let L=0,U=Q.length;L<U;L++){let V=Q[L],q=_(V),X=S%A;X!==0&&A-X<q.boundary&&(S+=A-X),G.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=q.storage}}}let T=S%A;return T>0&&(S+=A-T),v.__size=S,v.__cache={},this}function _(v){let x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function f(v){let x=v.target;x.removeEventListener("dispose",f);let S=a.indexOf(x.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function u(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:u}}var Gs=class{constructor(t={}){let{canvas:e=Ed(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let p;n!==null?p=n.getContextAttributes().alpha:p=a;let m=new Uint32Array(4),g=new Int32Array(4),_=null,f=null,u=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Se,this._useLegacyLights=!1,this.toneMapping=ri,this.toneMappingExposure=1;let x=this,S=!1,A=0,T=0,R=null,D=-1,y=null,w=new fe,z=new fe,G=null,Q=new Dt(0),L=0,U=e.width,V=e.height,q=1,X=null,W=null,J=new fe(0,0,U,V),tt=new fe(0,0,U,V),ct=!1,H=new Vs,Y=!1,ot=!1,yt=null,xt=new ve,Lt=new at,Ut=new C,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function $t(){return R===null?q:1}let N=n;function Ge(b,I){for(let B=0;B<b.length;B++){let k=b[B],O=e.getContext(k,I);if(O!==null)return O}return null}try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r160"),e.addEventListener("webglcontextlost",et,!1),e.addEventListener("webglcontextrestored",P,!1),e.addEventListener("webglcontextcreationerror",it,!1),N===null){let I=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&I.shift(),N=Ge(I,b),N===null)throw Ge(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&N instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Mt,Ct,pt,pe,zt,E,M,F,K,Z,j,mt,rt,ut,Et,Bt,$,Qt,Wt,Rt,vt,dt,Nt,jt;function xe(){Mt=new Nm(N),Ct=new Cm(N,Mt,t),Mt.init(Ct),dt=new f0(N,Mt,Ct),pt=new u0(N,Mt,Ct),pe=new zm(N),zt=new Qg,E=new d0(N,Mt,pt,zt,Ct,dt,pe),M=new Lm(x),F=new Um(x),K=new Xd(N,Ct),Nt=new Am(N,Mt,K,Ct),Z=new Om(N,K,pe,Nt),j=new Vm(N,Z,K,pe),Wt=new Hm(N,Ct,E),Bt=new Pm(zt),mt=new jg(x,M,F,Mt,Ct,Nt,Bt),rt=new m0(x,zt),ut=new e0,Et=new o0(Mt,Ct),Qt=new Tm(x,M,F,pt,j,p,l),$=new h0(x,j,Ct),jt=new g0(N,pe,Ct,pt),Rt=new Rm(N,Mt,pe,Ct),vt=new Fm(N,Mt,pe,Ct),pe.programs=mt.programs,x.capabilities=Ct,x.extensions=Mt,x.properties=zt,x.renderLists=ut,x.shadowMap=$,x.state=pt,x.info=pe}xe();let Ht=new Wo(x,N);this.xr=Ht,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let b=Mt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Mt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(b){b!==void 0&&(q=b,this.setSize(U,V,!1))},this.getSize=function(b){return b.set(U,V)},this.setSize=function(b,I,B=!0){if(Ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=b,V=I,e.width=Math.floor(b*q),e.height=Math.floor(I*q),B===!0&&(e.style.width=b+"px",e.style.height=I+"px"),this.setViewport(0,0,b,I)},this.getDrawingBufferSize=function(b){return b.set(U*q,V*q).floor()},this.setDrawingBufferSize=function(b,I,B){U=b,V=I,q=B,e.width=Math.floor(b*B),e.height=Math.floor(I*B),this.setViewport(0,0,b,I)},this.getCurrentViewport=function(b){return b.copy(w)},this.getViewport=function(b){return b.copy(J)},this.setViewport=function(b,I,B,k){b.isVector4?J.set(b.x,b.y,b.z,b.w):J.set(b,I,B,k),pt.viewport(w.copy(J).multiplyScalar(q).floor())},this.getScissor=function(b){return b.copy(tt)},this.setScissor=function(b,I,B,k){b.isVector4?tt.set(b.x,b.y,b.z,b.w):tt.set(b,I,B,k),pt.scissor(z.copy(tt).multiplyScalar(q).floor())},this.getScissorTest=function(){return ct},this.setScissorTest=function(b){pt.setScissorTest(ct=b)},this.setOpaqueSort=function(b){X=b},this.setTransparentSort=function(b){W=b},this.getClearColor=function(b){return b.copy(Qt.getClearColor())},this.setClearColor=function(){Qt.setClearColor.apply(Qt,arguments)},this.getClearAlpha=function(){return Qt.getClearAlpha()},this.setClearAlpha=function(){Qt.setClearAlpha.apply(Qt,arguments)},this.clear=function(b=!0,I=!0,B=!0){let k=0;if(b){let O=!1;if(R!==null){let lt=R.texture.format;O=lt===Ah||lt===Th||lt===wh}if(O){let lt=R.texture.type,gt=lt===ai||lt===ei||lt===ml||lt===Ai||lt===Sh||lt===Eh,St=Qt.getClearColor(),At=Qt.getClearAlpha(),kt=St.r,Pt=St.g,It=St.b;gt?(m[0]=kt,m[1]=Pt,m[2]=It,m[3]=At,N.clearBufferuiv(N.COLOR,0,m)):(g[0]=kt,g[1]=Pt,g[2]=It,g[3]=At,N.clearBufferiv(N.COLOR,0,g))}else k|=N.COLOR_BUFFER_BIT}I&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",et,!1),e.removeEventListener("webglcontextrestored",P,!1),e.removeEventListener("webglcontextcreationerror",it,!1),ut.dispose(),Et.dispose(),zt.dispose(),M.dispose(),F.dispose(),j.dispose(),Nt.dispose(),jt.dispose(),mt.dispose(),Ht.dispose(),Ht.removeEventListener("sessionstart",We),Ht.removeEventListener("sessionend",oe),yt&&(yt.dispose(),yt=null),Xe.stop()};function et(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let b=pe.autoReset,I=$.enabled,B=$.autoUpdate,k=$.needsUpdate,O=$.type;xe(),pe.autoReset=b,$.enabled=I,$.autoUpdate=B,$.needsUpdate=k,$.type=O}function it(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function st(b){let I=b.target;I.removeEventListener("dispose",st),Tt(I)}function Tt(b){bt(b),zt.remove(b)}function bt(b){let I=zt.get(b).programs;I!==void 0&&(I.forEach(function(B){mt.releaseProgram(B)}),b.isShaderMaterial&&mt.releaseShaderCache(b))}this.renderBufferDirect=function(b,I,B,k,O,lt){I===null&&(I=wt);let gt=O.isMesh&&O.matrixWorld.determinant()<0,St=yu(b,I,B,k,O);pt.setMaterial(k,gt);let At=B.index,kt=1;if(k.wireframe===!0){if(At=Z.getWireframeAttribute(B),At===void 0)return;kt=2}let Pt=B.drawRange,It=B.attributes.position,be=Pt.start*kt,tn=(Pt.start+Pt.count)*kt;lt!==null&&(be=Math.max(be,lt.start*kt),tn=Math.min(tn,(lt.start+lt.count)*kt)),At!==null?(be=Math.max(be,0),tn=Math.min(tn,At.count)):It!=null&&(be=Math.max(be,0),tn=Math.min(tn,It.count));let Le=tn-be;if(Le<0||Le===1/0)return;Nt.setup(O,k,St,B,At);let In,me=Rt;if(At!==null&&(In=K.get(At),me=vt,me.setIndex(In)),O.isMesh)k.wireframe===!0?(pt.setLineWidth(k.wireframeLinewidth*$t()),me.setMode(N.LINES)):me.setMode(N.TRIANGLES);else if(O.isLine){let Vt=k.linewidth;Vt===void 0&&(Vt=1),pt.setLineWidth(Vt*$t()),O.isLineSegments?me.setMode(N.LINES):O.isLineLoop?me.setMode(N.LINE_LOOP):me.setMode(N.LINE_STRIP)}else O.isPoints?me.setMode(N.POINTS):O.isSprite&&me.setMode(N.TRIANGLES);if(O.isBatchedMesh)me.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)me.renderInstances(be,Le,O.count);else if(B.isInstancedBufferGeometry){let Vt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Da=Math.min(B.instanceCount,Vt);me.renderInstances(be,Le,Da)}else me.render(be,Le)};function re(b,I,B){b.transparent===!0&&b.side===vn&&b.forceSinglePass===!1?(b.side=ke,b.needsUpdate=!0,ir(b,I,B),b.side=li,b.needsUpdate=!0,ir(b,I,B),b.side=vn):ir(b,I,B)}this.compile=function(b,I,B=null){B===null&&(B=b),f=Et.get(B),f.init(),v.push(f),B.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),b!==B&&b.traverseVisible(function(O){O.isLight&&O.layers.test(I.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights(x._useLegacyLights);let k=new Set;return b.traverse(function(O){let lt=O.material;if(lt)if(Array.isArray(lt))for(let gt=0;gt<lt.length;gt++){let St=lt[gt];re(St,B,O),k.add(St)}else re(lt,B,O),k.add(lt)}),v.pop(),f=null,k},this.compileAsync=function(b,I,B=null){let k=this.compile(b,I,B);return new Promise(O=>{function lt(){if(k.forEach(function(gt){zt.get(gt).currentProgram.isReady()&&k.delete(gt)}),k.size===0){O(b);return}setTimeout(lt,10)}Mt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let ae=null;function Pe(b){ae&&ae(b)}function We(){Xe.stop()}function oe(){Xe.start()}let Xe=new Nh;Xe.setAnimationLoop(Pe),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(b){ae=b,Ht.setAnimationLoop(b),b===null?Xe.stop():Xe.start()},Ht.addEventListener("sessionstart",We),Ht.addEventListener("sessionend",oe),this.render=function(b,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ht.enabled===!0&&Ht.isPresenting===!0&&(Ht.cameraAutoUpdate===!0&&Ht.updateCamera(I),I=Ht.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,I,R),f=Et.get(b,v.length),f.init(),v.push(f),xt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),H.setFromProjectionMatrix(xt),ot=this.localClippingEnabled,Y=Bt.init(this.clippingPlanes,ot),_=ut.get(b,u.length),_.init(),u.push(_),An(b,I,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(X,W),this.info.render.frame++,Y===!0&&Bt.beginShadows();let B=f.state.shadowsArray;if($.render(B,b,I),Y===!0&&Bt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Qt.render(_,b),f.setupLights(x._useLegacyLights),I.isArrayCamera){let k=I.cameras;for(let O=0,lt=k.length;O<lt;O++){let gt=k[O];Fl(_,b,gt,gt.viewport)}}else Fl(_,b,I);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(x,b,I),Nt.resetDefaultState(),D=-1,y=null,v.pop(),v.length>0?f=v[v.length-1]:f=null,u.pop(),u.length>0?_=u[u.length-1]:_=null};function An(b,I,B,k){if(b.visible===!1)return;if(b.layers.test(I.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(I);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||H.intersectsSprite(b)){k&&Ut.setFromMatrixPosition(b.matrixWorld).applyMatrix4(xt);let gt=j.update(b),St=b.material;St.visible&&_.push(b,gt,St,B,Ut.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||H.intersectsObject(b))){let gt=j.update(b),St=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ut.copy(b.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Ut.copy(gt.boundingSphere.center)),Ut.applyMatrix4(b.matrixWorld).applyMatrix4(xt)),Array.isArray(St)){let At=gt.groups;for(let kt=0,Pt=At.length;kt<Pt;kt++){let It=At[kt],be=St[It.materialIndex];be&&be.visible&&_.push(b,gt,be,B,Ut.z,It)}}else St.visible&&_.push(b,gt,St,B,Ut.z,null)}}let lt=b.children;for(let gt=0,St=lt.length;gt<St;gt++)An(lt[gt],I,B,k)}function Fl(b,I,B,k){let O=b.opaque,lt=b.transmissive,gt=b.transparent;f.setupLightsView(B),Y===!0&&Bt.setGlobalState(x.clippingPlanes,B),lt.length>0&&xu(O,lt,I,B),k&&pt.viewport(w.copy(k)),O.length>0&&nr(O,I,B),lt.length>0&&nr(lt,I,B),gt.length>0&&nr(gt,I,B),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function xu(b,I,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;let lt=Ct.isWebGL2;yt===null&&(yt=new Gn(1,1,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")?Hs:ai,minFilter:ks,samples:lt?4:0})),x.getDrawingBufferSize(Lt),lt?yt.setSize(Lt.x,Lt.y):yt.setSize(Po(Lt.x),Po(Lt.y));let gt=x.getRenderTarget();x.setRenderTarget(yt),x.getClearColor(Q),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();let St=x.toneMapping;x.toneMapping=ri,nr(b,B,k),E.updateMultisampleRenderTarget(yt),E.updateRenderTargetMipmap(yt);let At=!1;for(let kt=0,Pt=I.length;kt<Pt;kt++){let It=I[kt],be=It.object,tn=It.geometry,Le=It.material,In=It.group;if(Le.side===vn&&be.layers.test(k.layers)){let me=Le.side;Le.side=ke,Le.needsUpdate=!0,zl(be,B,k,tn,Le,In),Le.side=me,Le.needsUpdate=!0,At=!0}}At===!0&&(E.updateMultisampleRenderTarget(yt),E.updateRenderTargetMipmap(yt)),x.setRenderTarget(gt),x.setClearColor(Q,L),x.toneMapping=St}function nr(b,I,B){let k=I.isScene===!0?I.overrideMaterial:null;for(let O=0,lt=b.length;O<lt;O++){let gt=b[O],St=gt.object,At=gt.geometry,kt=k===null?gt.material:k,Pt=gt.group;St.layers.test(B.layers)&&zl(St,I,B,At,kt,Pt)}}function zl(b,I,B,k,O,lt){b.onBeforeRender(x,I,B,k,O,lt),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(x,I,B,k,b,lt),O.transparent===!0&&O.side===vn&&O.forceSinglePass===!1?(O.side=ke,O.needsUpdate=!0,x.renderBufferDirect(B,I,k,O,b,lt),O.side=li,O.needsUpdate=!0,x.renderBufferDirect(B,I,k,O,b,lt),O.side=vn):x.renderBufferDirect(B,I,k,O,b,lt),b.onAfterRender(x,I,B,k,O,lt)}function ir(b,I,B){I.isScene!==!0&&(I=wt);let k=zt.get(b),O=f.state.lights,lt=f.state.shadowsArray,gt=O.state.version,St=mt.getParameters(b,O.state,lt,I,B),At=mt.getProgramCacheKey(St),kt=k.programs;k.environment=b.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(b.isMeshStandardMaterial?F:M).get(b.envMap||k.environment),kt===void 0&&(b.addEventListener("dispose",st),kt=new Map,k.programs=kt);let Pt=kt.get(At);if(Pt!==void 0){if(k.currentProgram===Pt&&k.lightsStateVersion===gt)return kl(b,St),Pt}else St.uniforms=mt.getUniforms(b),b.onBuild(B,St,x),b.onBeforeCompile(St,x),Pt=mt.acquireProgram(St,At),kt.set(At,Pt),k.uniforms=St.uniforms;let It=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(It.clippingPlanes=Bt.uniform),kl(b,St),k.needsLights=Mu(b),k.lightsStateVersion=gt,k.needsLights&&(It.ambientLightColor.value=O.state.ambient,It.lightProbe.value=O.state.probe,It.directionalLights.value=O.state.directional,It.directionalLightShadows.value=O.state.directionalShadow,It.spotLights.value=O.state.spot,It.spotLightShadows.value=O.state.spotShadow,It.rectAreaLights.value=O.state.rectArea,It.ltc_1.value=O.state.rectAreaLTC1,It.ltc_2.value=O.state.rectAreaLTC2,It.pointLights.value=O.state.point,It.pointLightShadows.value=O.state.pointShadow,It.hemisphereLights.value=O.state.hemi,It.directionalShadowMap.value=O.state.directionalShadowMap,It.directionalShadowMatrix.value=O.state.directionalShadowMatrix,It.spotShadowMap.value=O.state.spotShadowMap,It.spotLightMatrix.value=O.state.spotLightMatrix,It.spotLightMap.value=O.state.spotLightMap,It.pointShadowMap.value=O.state.pointShadowMap,It.pointShadowMatrix.value=O.state.pointShadowMatrix),k.currentProgram=Pt,k.uniformsList=null,Pt}function Bl(b){if(b.uniformsList===null){let I=b.currentProgram.getUniforms();b.uniformsList=cs.seqWithValue(I.seq,b.uniforms)}return b.uniformsList}function kl(b,I){let B=zt.get(b);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function yu(b,I,B,k,O){I.isScene!==!0&&(I=wt),E.resetTextureUnits();let lt=I.fog,gt=k.isMeshStandardMaterial?I.environment:null,St=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Vn,At=(k.isMeshStandardMaterial?F:M).get(k.envMap||gt),kt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Pt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),It=!!B.morphAttributes.position,be=!!B.morphAttributes.normal,tn=!!B.morphAttributes.color,Le=ri;k.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Le=x.toneMapping);let In=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,me=In!==void 0?In.length:0,Vt=zt.get(k),Da=f.state.lights;if(Y===!0&&(ot===!0||b!==y)){let on=b===y&&k.id===D;Bt.setState(k,b,on)}let ye=!1;k.version===Vt.__version?(Vt.needsLights&&Vt.lightsStateVersion!==Da.state.version||Vt.outputColorSpace!==St||O.isBatchedMesh&&Vt.batching===!1||!O.isBatchedMesh&&Vt.batching===!0||O.isInstancedMesh&&Vt.instancing===!1||!O.isInstancedMesh&&Vt.instancing===!0||O.isSkinnedMesh&&Vt.skinning===!1||!O.isSkinnedMesh&&Vt.skinning===!0||O.isInstancedMesh&&Vt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Vt.instancingColor===!1&&O.instanceColor!==null||Vt.envMap!==At||k.fog===!0&&Vt.fog!==lt||Vt.numClippingPlanes!==void 0&&(Vt.numClippingPlanes!==Bt.numPlanes||Vt.numIntersection!==Bt.numIntersection)||Vt.vertexAlphas!==kt||Vt.vertexTangents!==Pt||Vt.morphTargets!==It||Vt.morphNormals!==be||Vt.morphColors!==tn||Vt.toneMapping!==Le||Ct.isWebGL2===!0&&Vt.morphTargetsCount!==me)&&(ye=!0):(ye=!0,Vt.__version=k.version);let _i=Vt.currentProgram;ye===!0&&(_i=ir(k,I,O));let Hl=!1,Ts=!1,Ua=!1,Fe=_i.getUniforms(),xi=Vt.uniforms;if(pt.useProgram(_i.program)&&(Hl=!0,Ts=!0,Ua=!0),k.id!==D&&(D=k.id,Ts=!0),Hl||y!==b){Fe.setValue(N,"projectionMatrix",b.projectionMatrix),Fe.setValue(N,"viewMatrix",b.matrixWorldInverse);let on=Fe.map.cameraPosition;on!==void 0&&on.setValue(N,Ut.setFromMatrixPosition(b.matrixWorld)),Ct.logarithmicDepthBuffer&&Fe.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Fe.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Ts=!0,Ua=!0)}if(O.isSkinnedMesh){Fe.setOptional(N,O,"bindMatrix"),Fe.setOptional(N,O,"bindMatrixInverse");let on=O.skeleton;on&&(Ct.floatVertexTextures?(on.boneTexture===null&&on.computeBoneTexture(),Fe.setValue(N,"boneTexture",on.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Fe.setOptional(N,O,"batchingTexture"),Fe.setValue(N,"batchingTexture",O._matricesTexture,E));let Na=B.morphAttributes;if((Na.position!==void 0||Na.normal!==void 0||Na.color!==void 0&&Ct.isWebGL2===!0)&&Wt.update(O,B,_i),(Ts||Vt.receiveShadow!==O.receiveShadow)&&(Vt.receiveShadow=O.receiveShadow,Fe.setValue(N,"receiveShadow",O.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(xi.envMap.value=At,xi.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),Ts&&(Fe.setValue(N,"toneMappingExposure",x.toneMappingExposure),Vt.needsLights&&vu(xi,Ua),lt&&k.fog===!0&&rt.refreshFogUniforms(xi,lt),rt.refreshMaterialUniforms(xi,k,q,V,yt),cs.upload(N,Bl(Vt),xi,E)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(cs.upload(N,Bl(Vt),xi,E),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Fe.setValue(N,"center",O.center),Fe.setValue(N,"modelViewMatrix",O.modelViewMatrix),Fe.setValue(N,"normalMatrix",O.normalMatrix),Fe.setValue(N,"modelMatrix",O.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let on=k.uniformsGroups;for(let Oa=0,bu=on.length;Oa<bu;Oa++)if(Ct.isWebGL2){let Vl=on[Oa];jt.update(Vl,_i),jt.bind(Vl,_i)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return _i}function vu(b,I){b.ambientLightColor.needsUpdate=I,b.lightProbe.needsUpdate=I,b.directionalLights.needsUpdate=I,b.directionalLightShadows.needsUpdate=I,b.pointLights.needsUpdate=I,b.pointLightShadows.needsUpdate=I,b.spotLights.needsUpdate=I,b.spotLightShadows.needsUpdate=I,b.rectAreaLights.needsUpdate=I,b.hemisphereLights.needsUpdate=I}function Mu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,I,B){zt.get(b.texture).__webglTexture=I,zt.get(b.depthTexture).__webglTexture=B;let k=zt.get(b);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,I){let B=zt.get(b);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(b,I=0,B=0){R=b,A=I,T=B;let k=!0,O=null,lt=!1,gt=!1;if(b){let At=zt.get(b);At.__useDefaultFramebuffer!==void 0?(pt.bindFramebuffer(N.FRAMEBUFFER,null),k=!1):At.__webglFramebuffer===void 0?E.setupRenderTarget(b):At.__hasExternalTextures&&E.rebindTextures(b,zt.get(b.texture).__webglTexture,zt.get(b.depthTexture).__webglTexture);let kt=b.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(gt=!0);let Pt=zt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Pt[I])?O=Pt[I][B]:O=Pt[I],lt=!0):Ct.isWebGL2&&b.samples>0&&E.useMultisampledRTT(b)===!1?O=zt.get(b).__webglMultisampledFramebuffer:Array.isArray(Pt)?O=Pt[B]:O=Pt,w.copy(b.viewport),z.copy(b.scissor),G=b.scissorTest}else w.copy(J).multiplyScalar(q).floor(),z.copy(tt).multiplyScalar(q).floor(),G=ct;if(pt.bindFramebuffer(N.FRAMEBUFFER,O)&&Ct.drawBuffers&&k&&pt.drawBuffers(b,O),pt.viewport(w),pt.scissor(z),pt.setScissorTest(G),lt){let At=zt.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,At.__webglTexture,B)}else if(gt){let At=zt.get(b.texture),kt=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,At.__webglTexture,B||0,kt)}D=-1},this.readRenderTargetPixels=function(b,I,B,k,O,lt,gt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=zt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(St=St[gt]),St){pt.bindFramebuffer(N.FRAMEBUFFER,St);try{let At=b.texture,kt=At.format,Pt=At.type;if(kt!==bn&&dt.convert(kt)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let It=Pt===Hs&&(Mt.has("EXT_color_buffer_half_float")||Ct.isWebGL2&&Mt.has("EXT_color_buffer_float"));if(Pt!==ai&&dt.convert(Pt)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pt===ni&&(Ct.isWebGL2||Mt.has("OES_texture_float")||Mt.has("WEBGL_color_buffer_float")))&&!It){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=b.width-k&&B>=0&&B<=b.height-O&&N.readPixels(I,B,k,O,dt.convert(kt),dt.convert(Pt),lt)}finally{let At=R!==null?zt.get(R).__webglFramebuffer:null;pt.bindFramebuffer(N.FRAMEBUFFER,At)}}},this.copyFramebufferToTexture=function(b,I,B=0){let k=Math.pow(2,-B),O=Math.floor(I.image.width*k),lt=Math.floor(I.image.height*k);E.setTexture2D(I,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,b.x,b.y,O,lt),pt.unbindTexture()},this.copyTextureToTexture=function(b,I,B,k=0){let O=I.image.width,lt=I.image.height,gt=dt.convert(B.format),St=dt.convert(B.type);E.setTexture2D(B,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment),I.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,k,b.x,b.y,O,lt,gt,St,I.image.data):I.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,k,b.x,b.y,I.mipmaps[0].width,I.mipmaps[0].height,gt,I.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,k,b.x,b.y,gt,St,I.image),k===0&&B.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),pt.unbindTexture()},this.copyTextureToTexture3D=function(b,I,B,k,O=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let lt=b.max.x-b.min.x+1,gt=b.max.y-b.min.y+1,St=b.max.z-b.min.z+1,At=dt.convert(k.format),kt=dt.convert(k.type),Pt;if(k.isData3DTexture)E.setTexture3D(k,0),Pt=N.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)E.setTexture2DArray(k,0),Pt=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);let It=N.getParameter(N.UNPACK_ROW_LENGTH),be=N.getParameter(N.UNPACK_IMAGE_HEIGHT),tn=N.getParameter(N.UNPACK_SKIP_PIXELS),Le=N.getParameter(N.UNPACK_SKIP_ROWS),In=N.getParameter(N.UNPACK_SKIP_IMAGES),me=B.isCompressedTexture?B.mipmaps[O]:B.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,me.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,me.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,b.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,b.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,b.min.z),B.isDataTexture||B.isData3DTexture?N.texSubImage3D(Pt,O,I.x,I.y,I.z,lt,gt,St,At,kt,me.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),N.compressedTexSubImage3D(Pt,O,I.x,I.y,I.z,lt,gt,St,At,me.data)):N.texSubImage3D(Pt,O,I.x,I.y,I.z,lt,gt,St,At,kt,me),N.pixelStorei(N.UNPACK_ROW_LENGTH,It),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,be),N.pixelStorei(N.UNPACK_SKIP_PIXELS,tn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Le),N.pixelStorei(N.UNPACK_SKIP_IMAGES,In),O===0&&k.generateMipmaps&&N.generateMipmap(Pt),pt.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),pt.unbindTexture()},this.resetState=function(){A=0,T=0,R=null,pt.reset(),Nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===gl?"display-p3":"srgb",e.unpackColorSpace=te.workingColorSpace===ua?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Se?Ci:Ch}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Ci?Se:Vn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},Xo=class extends Gs{};Xo.prototype.isWebGL1Renderer=!0;var Qr=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Dt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ws=class extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}},qo=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ao,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=oi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},qe=new C,ta=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=kn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=kn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=kn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=kn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),s=ee(s,this.array),r=ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new sn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ui=class extends Wn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ns,Ls=new C,is=new C,ss=new C,rs=new at,Is=new at,Hh=new ve,Tr=new C,Ds=new C,Ar=new C,ch=new at,mo=new at,hh=new at,Ii=class extends Ne{constructor(t=new ui){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new Ve;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new qo(e,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new ta(n,3,0,!1)),ns.setAttribute("uv",new ta(n,2,3,!1))}this.geometry=ns,this.material=t,this.center=new at(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),Hh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Rr(Tr.set(-.5,-.5,0),ss,a,is,s,r),Rr(Ds.set(.5,-.5,0),ss,a,is,s,r),Rr(Ar.set(.5,.5,0),ss,a,is,s,r),ch.set(0,0),mo.set(1,0),hh.set(1,1);let o=t.ray.intersectTriangle(Tr,Ds,Ar,!1,Ls);if(o===null&&(Rr(Ds.set(-.5,.5,0),ss,a,is,s,r),mo.set(0,1),o=t.ray.intersectTriangle(Tr,Ar,Ds,!1,Ls),o===null))return;let l=t.ray.origin.distanceTo(Ls);l<t.near||l>t.far||e.push({distance:l,point:Ls.clone(),uv:Ti.getInterpolation(Ls,Tr,Ds,Ar,ch,mo,hh,new at),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Rr(i,t,e,n,s,r){rs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Is.x=r*rs.x-s*rs.y,Is.y=s*rs.x+r*rs.y):Is.copy(rs),i.copy(t),i.x+=Is.x,i.y+=Is.y,i.applyMatrix4(Hh)}var Xs=class extends Wn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},uh=new C,dh=new C,fh=new ve,go=new Gr,Cr=new fs,ea=class extends Ne{constructor(t=new Ve,e=new Xs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)uh.fromBufferAttribute(e,s-1),dh.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=uh.distanceTo(dh);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;fh.copy(s).invert(),go.copy(t.ray).applyMatrix4(fh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,h=new C,d=new C,p=new C,m=this.isLineSegments?2:1,g=n.index,f=n.attributes.position;if(g!==null){let u=Math.max(0,a.start),v=Math.min(g.count,a.start+a.count);for(let x=u,S=v-1;x<S;x+=m){let A=g.getX(x),T=g.getX(x+1);if(c.fromBufferAttribute(f,A),h.fromBufferAttribute(f,T),go.distanceSqToSegment(c,h,p,d)>l)continue;p.applyMatrix4(this.matrixWorld);let D=t.ray.origin.distanceTo(p);D<t.near||D>t.far||e.push({distance:D,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let u=Math.max(0,a.start),v=Math.min(f.count,a.start+a.count);for(let x=u,S=v-1;x<S;x+=m){if(c.fromBufferAttribute(f,x),h.fromBufferAttribute(f,x+1),go.distanceSqToSegment(c,h,p,d)>l)continue;p.applyMatrix4(this.matrixWorld);let T=t.ray.origin.distanceTo(p);T<t.near||T>t.far||e.push({distance:T,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};var qn=class extends un{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],p=n[s+1]-h,m=(a-h)/p;return(s+m)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new at:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new C,s=[],r=[],a=[],o=new C,l=new ve;for(let m=0;m<=t;m++){let g=m/t;s[m]=this.getTangentAt(g,new C)}r[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(s[m-1],s[m]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(De(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(o,g))}a[m].crossVectors(s[m],r[m])}if(e===!0){let m=Math.acos(De(r[0].dot(r[t]),-1,1));m/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(m=-m);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],m*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},qs=class extends dn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e){let n=e||new at,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,m=c-this.aY;l=p*h-m*d+this.aX,c=p*d+m*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Yo=class extends qs{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function xl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let p=(a-r)/c-(o-r)/(c+h)+(o-a)/h,m=(o-a)/h-(l-a)/(h+d)+(l-o)/d;p*=h,m*=h,s(a,o,p,m)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Pr=new C,_o=new xl,xo=new xl,yo=new xl,$o=class extends dn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new C){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Pr.subVectors(s[0],s[1]).add(s[0]),c=Pr);let d=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Pr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Pr),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),m),_=Math.pow(d.distanceToSquared(p),m),f=Math.pow(p.distanceToSquared(h),m);_<1e-4&&(_=1),g<1e-4&&(g=_),f<1e-4&&(f=_),_o.initNonuniformCatmullRom(c.x,d.x,p.x,h.x,g,_,f),xo.initNonuniformCatmullRom(c.y,d.y,p.y,h.y,g,_,f),yo.initNonuniformCatmullRom(c.z,d.z,p.z,h.z,g,_,f)}else this.curveType==="catmullrom"&&(_o.initCatmullRom(c.x,d.x,p.x,h.x,this.tension),xo.initCatmullRom(c.y,d.y,p.y,h.y,this.tension),yo.initCatmullRom(c.z,d.z,p.z,h.z,this.tension));return n.set(_o.calc(l),xo.calc(l),yo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new C().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function ph(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function _0(i,t){let e=1-i;return e*e*t}function x0(i,t){return 2*(1-i)*i*t}function y0(i,t){return i*i*t}function Fs(i,t,e,n){return _0(i,t)+x0(i,e)+y0(i,n)}function v0(i,t){let e=1-i;return e*e*e*t}function M0(i,t){let e=1-i;return 3*e*e*i*t}function b0(i,t){return 3*(1-i)*i*i*t}function S0(i,t){return i*i*i*t}function zs(i,t,e,n,s){return v0(i,t)+M0(i,e)+b0(i,n)+S0(i,s)}var na=class extends dn{constructor(t=new at,e=new at,n=new at,s=new at){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zs(t,s.x,r.x,a.x,o.x),zs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Zo=class extends dn{constructor(t=new C,e=new C,n=new C,s=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new C){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(zs(t,s.x,r.x,a.x,o.x),zs(t,s.y,r.y,a.y,o.y),zs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ia=class extends dn{constructor(t=new at,e=new at){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new at){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new at){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Jo=class extends dn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sa=class extends dn{constructor(t=new at,e=new at,n=new at){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new at){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Fs(t,s.x,r.x,a.x),Fs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ko=class extends dn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Fs(t,s.x,r.x,a.x),Fs(t,s.y,r.y,a.y),Fs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ra=class extends dn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new at){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(ph(o,l.x,c.x,h.x,d.x),ph(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new at().fromArray(s))}return this}},mh=Object.freeze({__proto__:null,ArcCurve:Yo,CatmullRomCurve3:$o,CubicBezierCurve:na,CubicBezierCurve3:Zo,EllipseCurve:qs,LineCurve:ia,LineCurve3:Jo,QuadraticBezierCurve:sa,QuadraticBezierCurve3:Ko,SplineCurve:ra}),jo=class extends dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mh[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new mh[s.type]().fromJSON(s))}return this}},Qo=class extends jo{constructor(t){super(),this.type="Path",this.currentPoint=new at,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ia(this.currentPoint.clone(),new at(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new sa(this.currentPoint.clone(),new at(t,e),new at(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new na(this.currentPoint.clone(),new at(t,e),new at(n,s),new at(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ra(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new qs(t,e,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},tl=class i extends Ve{constructor(t=[new at(0,-.5),new at(.5,0),new at(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=De(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/e,d=new C,p=new at,m=new C,g=new C,_=new C,f=0,u=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:f=t[v+1].x-t[v].x,u=t[v+1].y-t[v].y,m.x=u*1,m.y=-f,m.z=u*0,_.copy(m),m.normalize(),l.push(m.x,m.y,m.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:f=t[v+1].x-t[v].x,u=t[v+1].y-t[v].y,m.x=u*1,m.y=-f,m.z=u*0,g.copy(m),m.x+=_.x,m.y+=_.y,m.z+=_.z,m.normalize(),l.push(m.x,m.y,m.z),_.copy(g)}for(let v=0;v<=e;v++){let x=n+v*h*s,S=Math.sin(x),A=Math.cos(x);for(let T=0;T<=t.length-1;T++){d.x=t[T].x*S,d.y=t[T].y,d.z=t[T].x*A,a.push(d.x,d.y,d.z),p.x=v/e,p.y=T/(t.length-1),o.push(p.x,p.y);let R=l[3*T+0]*S,D=l[3*T+1],y=l[3*T+0]*A;c.push(R,D,y)}}for(let v=0;v<e;v++)for(let x=0;x<t.length-1;x++){let S=x+v*t.length,A=S,T=S+t.length,R=S+t.length+1,D=S+1;r.push(A,T,D),r.push(R,D,T)}this.setIndex(r),this.setAttribute("position",new ce(a,3)),this.setAttribute("uv",new ce(o,2)),this.setAttribute("normal",new ce(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},aa=class i extends tl{constructor(t=1,e=1,n=4,s=8){let r=new Qo;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}},Ys=class i extends Ve{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new C,h=new at;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,p=3;d<=e;d++,p+=3){let m=n+d/e*s;c.x=t*Math.cos(m),c.y=t*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[p]/t+1)/2,h.y=(a[p+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(o,3)),this.setAttribute("uv",new ce(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ms=class i extends Ve{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],p=[],m=[],g=0,_=[],f=n/2,u=0;v(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ce(d,3)),this.setAttribute("normal",new ce(p,3)),this.setAttribute("uv",new ce(m,2));function v(){let S=new C,A=new C,T=0,R=(e-t)/n;for(let D=0;D<=r;D++){let y=[],w=D/r,z=w*(e-t)+t;for(let G=0;G<=s;G++){let Q=G/s,L=Q*l+o,U=Math.sin(L),V=Math.cos(L);A.x=z*U,A.y=-w*n+f,A.z=z*V,d.push(A.x,A.y,A.z),S.set(U,R,V).normalize(),p.push(S.x,S.y,S.z),m.push(Q,1-w),y.push(g++)}_.push(y)}for(let D=0;D<s;D++)for(let y=0;y<r;y++){let w=_[y][D],z=_[y+1][D],G=_[y+1][D+1],Q=_[y][D+1];h.push(w,z,Q),h.push(z,G,Q),T+=6}c.addGroup(u,T,0),u+=T}function x(S){let A=g,T=new at,R=new C,D=0,y=S===!0?t:e,w=S===!0?1:-1;for(let G=1;G<=s;G++)d.push(0,f*w,0),p.push(0,w,0),m.push(.5,.5),g++;let z=g;for(let G=0;G<=s;G++){let L=G/s*l+o,U=Math.cos(L),V=Math.sin(L);R.x=y*V,R.y=f*w,R.z=y*U,d.push(R.x,R.y,R.z),p.push(0,w,0),T.x=U*.5+.5,T.y=V*.5*w+.5,m.push(T.x,T.y),g++}for(let G=0;G<s;G++){let Q=A+G,L=z+G;S===!0?h.push(L,L+1,Q):h.push(L+1,L,Q),D+=3}c.addGroup(u,D,S===!0?1:2),u+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var oa=class i extends Ve{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],d=t,p=(e-t)/s,m=new C,g=new at;for(let _=0;_<=s;_++){for(let f=0;f<=n;f++){let u=r+f/n*a;m.x=d*Math.cos(u),m.y=d*Math.sin(u),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}d+=p}for(let _=0;_<s;_++){let f=_*(n+1);for(let u=0;u<n;u++){let v=u+f,x=v,S=v+n+1,A=v+n+2,T=v+1;o.push(x,S,T),o.push(S,A,T)}}this.setIndex(o),this.setAttribute("position",new ce(l,3)),this.setAttribute("normal",new ce(c,3)),this.setAttribute("uv",new ce(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Cn=class i extends Ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new C,p=new C,m=[],g=[],_=[],f=[];for(let u=0;u<=n;u++){let v=[],x=u/n,S=0;u===0&&a===0?S=.5/e:u===n&&l===Math.PI&&(S=-.5/e);for(let A=0;A<=e;A++){let T=A/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+x*o),d.y=t*Math.cos(a+x*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+x*o),g.push(d.x,d.y,d.z),p.copy(d).normalize(),_.push(p.x,p.y,p.z),f.push(T+S,1-x),v.push(c++)}h.push(v)}for(let u=0;u<n;u++)for(let v=0;v<e;v++){let x=h[u][v+1],S=h[u][v],A=h[u+1][v],T=h[u+1][v+1];(u!==0||a>0)&&m.push(x,S,T),(u!==n-1||l<Math.PI)&&m.push(S,A,T)}this.setIndex(m),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(_,3)),this.setAttribute("uv",new ce(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var he=class extends Wn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ph,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Lr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function E0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var gs=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},el=class extends gs{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vc,endingEnd:vc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Mc:r=t,o=2*e-n;break;case bc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Mc:a=t,l=2*n-e;break;case bc:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,p=this._weightPrev,m=this._weightNext,g=(n-e)/(s-e),_=g*g,f=_*g,u=-p*f+2*p*_-p*g,v=(1+p)*f+(-1.5-2*p)*_+(-.5+p)*g+1,x=(-1-m)*f+(1.5+m)*_+.5*g,S=m*f-m*_;for(let A=0;A!==o;++A)r[A]=u*a[h+A]+v*a[c+A]+x*a[l+A]+S*a[d+A];return r}},nl=class extends gs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let p=0;p!==o;++p)r[p]=a[c+p]*d+a[l+p]*h;return r}},il=class extends gs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},En=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Lr(e,this.TimeBufferType),this.values=Lr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Lr(t.times,Array),values:Lr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new il(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new nl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new el(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Dr:e=this.InterpolantFactoryMethodDiscrete;break;case Ur:e=this.InterpolantFactoryMethodLinear;break;case Ga:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Dr;case this.InterpolantFactoryMethodLinear:return Ur;case this.InterpolantFactoryMethodSmooth:return Ga}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&E0(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ga,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,p=d-n,m=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[p+g]||_!==e[m+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,p=a*n;for(let m=0;m!==n;++m)e[p+m]=e[d+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=Ur;var Di=class extends En{};Di.prototype.ValueTypeName="bool";Di.prototype.ValueBufferType=Array;Di.prototype.DefaultInterpolation=Dr;Di.prototype.InterpolantFactoryMethodLinear=void 0;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var sl=class extends En{};sl.prototype.ValueTypeName="color";var rl=class extends En{};rl.prototype.ValueTypeName="number";var al=class extends gs{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)hi.slerpFlat(r,0,a,c-o,a,c,l);return r}},$s=class extends En{InterpolantFactoryMethodLinear(t){return new al(this.times,this.values,this.getValueSize(),t)}};$s.prototype.ValueTypeName="quaternion";$s.prototype.DefaultInterpolation=Ur;$s.prototype.InterpolantFactoryMethodSmooth=void 0;var Ui=class extends En{};Ui.prototype.ValueTypeName="string";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=Dr;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;var ol=class extends En{};ol.prototype.ValueTypeName="vector";var ll=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,p=c.length;d<p;d+=2){let m=c[d],g=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}},w0=new ll,cl=class{constructor(t){this.manager=t!==void 0?t:w0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};cl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Zs=class extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Js=class extends Zs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},vo=new ve,gh=new C,_h=new C,la=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vs,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;gh.setFromMatrixPosition(t.matrixWorld),e.position.copy(gh),_h.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(_h),e.updateMatrixWorld(),vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var xh=new ve,Us=new C,Mo=new C,hl=class extends la{constructor(){super(new Ue(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new at(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Us.setFromMatrixPosition(t.matrixWorld),n.position.copy(Us),Mo.copy(n.position),Mo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Mo),n.updateMatrixWorld(),s.makeTranslation(-Us.x,-Us.y,-Us.z),xh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xh)}},ca=class extends Zs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new hl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},ul=class extends la{constructor(){super(new Jr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ks=class extends Zs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new ul}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var yl="\\[\\]\\.:\\/",T0=new RegExp("["+yl+"]","g"),vl="[^"+yl+"]",A0="[^"+yl.replace("\\.","")+"]",R0=/((?:WC+[\/:])*)/.source.replace("WC",vl),C0=/(WCOD+)?/.source.replace("WCOD",A0),P0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vl),L0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vl),I0=new RegExp("^"+R0+C0+P0+L0+"$"),D0=["material","materials","bones","map"],dl=class{constructor(t,e,n){let s=n||de.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},de=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(T0,"")}static parseTrackName(t){let e=I0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);D0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};de.Composite=dl;de.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};de.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};de.prototype.GetterByBindingType=[de.prototype._getValue_direct,de.prototype._getValue_array,de.prototype._getValue_arrayElement,de.prototype._getValue_toArray];de.prototype.SetterByBindingTypeAndVersioning=[[de.prototype._setValue_direct,de.prototype._setValue_direct_setNeedsUpdate,de.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[de.prototype._setValue_array,de.prototype._setValue_array_setNeedsUpdate,de.prototype._setValue_array_setMatrixWorldNeedsUpdate],[de.prototype._setValue_arrayElement,de.prototype._setValue_arrayElement_setNeedsUpdate,de.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[de.prototype._setValue_fromArray,de.prototype._setValue_fromArray_setNeedsUpdate,de.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Q0=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var ft=2,Jt=60,Me=44,pn=6,pa=new Float32Array(Jt*Me).fill(pn),ma=new Uint8Array(Jt*Me),fi={H:pa,ZONE:ma,name:"항만 기지",dyn:[]},wn=(i,t)=>t*Jt+i,ie=(i,t,e,n,s=0)=>{for(let r=t;r<=n;r++)for(let a=i;a<=e;a++)pa[wn(a,r)]=s},ga=(i,t,e,n,s)=>{for(let r=t;r<=n;r++)for(let a=i;a<=e;a++)ma[wn(a,r)]=s};ie(22,2,37,6);ie(3,6,18,17);ie(41,6,56,17);ie(18,3,22,6);ie(37,3,41,6);ie(27,6,32,11);ie(26,11,33,30);ie(18,12,26,15);ie(33,12,41,15);ie(3,17,8,34);ie(3,30,22,35);ie(22,34,37,41);ie(27,30,32,34);ie(37,30,56,35);ie(50,17,56,34);ie(44,17,49,20);ie(19,20,25,25);ie(8,22,19,24);ie(25,21,26,23);ie(34,20,40,25);ie(33,21,34,23);ie(40,22,50,24);ie(10,10,11,11,pn);ie(48,10,49,11,pn);ie(29,18,30,19,pn);ie(5,26,6,27,pn);ie(53,26,54,27,pn);ga(6,8,15,14,1);ga(44,8,53,14,2);ga(23,36,36,40,3);ga(23,2,36,5,4);var _e=1.2,fn=2.4,U0=[[8,9,fn],[9,9,_e],[13,12,_e],[13,13,fn],[6,15,_e],[16,8,fn],[16,9,_e],[11,14,_e],[46,9,fn],[47,9,_e],[51,12,_e],[51,13,fn],[44,15,_e],[53,8,_e],[54,8,fn],[48,14,_e],[28,14,_e],[31,24,fn],[27,27,_e],[32,12,_e],[7,20,_e],[4,31,fn],[51,20,_e],[55,31,fn],[15,32,_e],[16,32,fn],[42,33,_e],[43,33,fn],[21,22,_e],[38,23,_e],[36,21,fn],[24,38,_e],[35,38,_e],[24,4,_e],[35,4,_e]];for(let[i,t,e]of U0)pa[wn(i,t)]=e;var Ze=i=>Math.floor(i/ft);function Yn(i,t){return i<0||t<0||i>=Jt||t>=Me?pn:pa[wn(i,t)]}function vs(i,t){let e=Ze(i),n=Ze(t);return e<0||n<0||e>=Jt||n>=Me?0:ma[wn(e,n)]}var ne=(i,t)=>({x:(i+.5)*ft,z:(t+.5)*ft}),$n={A:{name:"A",x:11*ft,z:11.5*ft,zone:1},B:{name:"B",x:49*ft,z:11.5*ft,zone:2}},Vh={atk:[[24,37],[27,39],[30,37],[33,39],[35,36]].map(([i,t])=>ne(i,t)),def:[[24,3],[27,5],[30,3],[33,5],[35,3]].map(([i,t])=>ne(i,t))},_a={A:[ne(9,7),ne(15,15),ne(5,12),ne(17,11)],B:[ne(50,7),ne(45,16),ne(55,12),ne(42,11)],mid:[ne(29,8),ne(30,13)]},Gh={A:[[ne(5,28),ne(5,18)],[ne(29,26),ne(22,13)],[ne(22,22),ne(10,23),ne(5,18)]],B:[[ne(53,28),ne(53,18)],[ne(30,26),ne(37,13)],[ne(37,22),ne(45,23),ne(53,18)]]};function Wh(i){return fi.dyn.push(i),i}function Ml(i){let t=fi.dyn.indexOf(i);t>=0&&fi.dyn.splice(t,1)}function bl(i,t,e,n,s=.5){let r=0,a=Ze(i-e),o=Ze(i+e),l=Ze(t-e),c=Ze(t+e);for(let h=l;h<=c;h++)for(let d=a;d<=o;d++){let p=Yn(d,h);if(p<=0)continue;let m=Math.max(d*ft,Math.min(i,(d+1)*ft)),g=Math.max(h*ft,Math.min(t,(h+1)*ft));if(!((m-i)**2+(g-t)**2>=e*e)){if(p>n+s)return null;p>r&&(r=p)}}for(let h of fi.dyn)if(!(i+e<h.x0||i-e>h.x1||t+e<h.z0||t-e>h.z1)){if(h.y1>n+s)return null;h.y1>r&&(r=h.y1)}return r}function pi(i,t,e,n,s,r,a){let o=a,l=Ze(i),c=Ze(e),h=n>0?1:-1,d=r>0?1:-1,p=Math.abs(n)>1e-9?ft/Math.abs(n):1/0,m=Math.abs(r)>1e-9?ft/Math.abs(r):1/0,g=Math.abs(n)>1e-9?(n>0?(l+1)*ft-i:i-l*ft)/Math.abs(n):1/0,_=Math.abs(r)>1e-9?(r>0?(c+1)*ft-e:e-c*ft)/Math.abs(r):1/0,f=0;for(let u=0;u<200&&f<o;u++){let v=Math.min(g,_,o),x=Yn(l,c);if(x>0){let S=t+s*f,A=t+s*v;if(S<=x){o=Math.min(o,f);break}if(A<=x){let T=s!==0?(x-t)/s:f;o=Math.min(o,Math.max(f,T));break}}if(g<_?(l+=h,f=g,g+=p):(c+=d,f=_,_+=m),l<-1||c<-1||l>Jt||c>Me)break}for(let u of fi.dyn){let v=N0(i,t,e,n,s,r,u);v!==null&&v<o&&(o=v)}if(s<0){let u=-t/s;u<o&&(o=u)}return o}function N0(i,t,e,n,s,r,a){let o=0,l=1/0;for(let[c,h,d,p]of[[i,n,a.x0,a.x1],[t,s,a.y0,a.y1],[e,r,a.z0,a.z1]]){if(Math.abs(h)<1e-9){if(c<d||c>p)return null;continue}let m=(d-c)/h,g=(p-c)/h;if(m>g&&([m,g]=[g,m]),o=Math.max(o,m),l=Math.min(l,g),o>l)return null}return o}var ys=(i,t)=>Yn(i,t)<=0;function Xh(i,t,e,n){let s=[Ze(i),Ze(t)],r=[Ze(e),Ze(n)],a=x=>{if(ys(x[0],x[1]))return x;for(let S=1;S<4;S++)for(let A=-S;A<=S;A++)for(let T=-S;T<=S;T++)if(ys(x[0]+T,x[1]+A))return[x[0]+T,x[1]+A];return x},o=a(s),l=a(r),c=Jt*Me,h=new Float32Array(c).fill(1/0),d=new Int32Array(c).fill(-1),p=new Uint8Array(c),m=[wn(o[0],o[1])];h[m[0]]=0;let g=x=>Math.hypot(x%Jt-l[0],Math.floor(x/Jt)-l[1]),_=wn(l[0],l[1]);for(;m.length;){let x=0,S=1/0;for(let D=0;D<m.length;D++){let y=h[m[D]]+g(m[D]);y<S&&(S=y,x=D)}let A=m[x];if(m[x]=m[m.length-1],m.pop(),A===_)break;if(p[A])continue;p[A]=1;let T=A%Jt,R=Math.floor(A/Jt);for(let D=-1;D<=1;D++)for(let y=-1;y<=1;y++){if(!y&&!D)continue;let w=T+y,z=R+D;if(!ys(w,z)||y&&D&&(!ys(T+y,R)||!ys(T,R+D)))continue;let G=wn(w,z),Q=h[A]+(y&&D?1.414:1);Q<h[G]&&(h[G]=Q,d[G]=A,m.push(G))}}if(d[_]<0&&_!==wn(o[0],o[1]))return null;let f=[];for(let x=_;x>=0&&x!==wn(o[0],o[1]);x=d[x])f.push(ne(x%Jt,Math.floor(x/Jt)));f.reverse();let u=[],v={x:i,z:t};for(let x=0;x<f.length;x++){let S=f[x+1];S&&O0(v.x,v.z,S.x,S.z)||(u.push(f[x]),v=f[x])}return u.push({x:e,z:n}),u}function O0(i,t,e,n){let s=Math.hypot(e-i,n-t),r=Math.ceil(s/.6);for(let a=1;a<=r;a++){let o=a/r,l=i+(e-i)*o,c=t+(n-t)*o;for(let[h,d]of[[.45,0],[-.45,0],[0,.45],[0,-.45]])if(!ys(Ze(l+h),Ze(c+d)))return!1}return!0}function di(i,t,e,n=!0){let s=document.createElement("canvas");s.width=i,s.height=t;let r=s.getContext("2d");e(r,i,t);let a=new qn(s);return a.colorSpace=Se,a.anisotropy=8,n&&(a.wrapS=a.wrapT=Bs),a}var xs=(i,t,e,n)=>{let s=i.getImageData(0,0,t,e);for(let r=0;r<s.data.length;r+=4){let a=(Math.random()-.5)*n;s.data[r]+=a,s.data[r+1]+=a,s.data[r+2]+=a}i.putImageData(s,0,0)};function qh(i){let t={floor:di(256,256,(g,_,f)=>{g.fillStyle="#8d8a84",g.fillRect(0,0,_,f),xs(g,_,f,18),g.strokeStyle="rgba(0,0,0,.18)",g.lineWidth=2;for(let u=0;u<=2;u++)g.beginPath(),g.moveTo(u*128,0),g.lineTo(u*128,f),g.stroke(),g.beginPath(),g.moveTo(0,u*128),g.lineTo(_,u*128),g.stroke()}),site:di(256,256,(g,_,f)=>{g.fillStyle="#6f7c88",g.fillRect(0,0,_,f),xs(g,_,f,14),g.strokeStyle="rgba(255,255,255,.12)",g.lineWidth=3;for(let u=0;u<4;u++)g.beginPath(),g.moveTo(u*64,0),g.lineTo(u*64,f),g.stroke(),g.beginPath(),g.moveTo(0,u*64),g.lineTo(_,u*64),g.stroke()}),wall:di(256,512,(g,_,f)=>{g.fillStyle="#c9c1b2",g.fillRect(0,0,_,f),xs(g,_,f,22),g.fillStyle="rgba(0,0,0,.08)";for(let u=0;u<f;u+=64)g.fillRect(0,u,_,3);g.fillStyle="#3c4a5c",g.fillRect(0,f-70,_,70),xs(g,_,f,6),g.fillStyle="#ffb21a",g.fillRect(0,f-74,_,6)}),crate:di(256,256,(g,_,f)=>{g.fillStyle="#7a5a36",g.fillRect(0,0,_,f),xs(g,_,f,26),g.strokeStyle="#4a3420",g.lineWidth=14,g.strokeRect(7,7,_-14,f-14),g.beginPath(),g.moveTo(10,10),g.lineTo(_-10,f-10),g.stroke(),g.fillStyle="rgba(0,0,0,.15)";for(let u=0;u<_;u+=32)g.fillRect(u,0,2,f)}),metal:di(256,256,(g,_,f)=>{g.fillStyle="#4b6a7d",g.fillRect(0,0,_,f),xs(g,_,f,16),g.fillStyle="rgba(255,255,255,.08)";for(let u=0;u<f;u+=16)g.fillRect(0,u,_,2);g.fillStyle="#e8eef2",g.font="900 40px sans-serif",g.fillText("RZ-07",20,60)})},e=new ge;i.add(e);let n=new he({map:t.floor,roughness:.92});t.floor.repeat.set(Jt*ft/6,Me*ft/6);let s=new qt(new Sn(Jt*ft,Me*ft),n);s.rotation.x=-Math.PI/2,s.position.set(Jt*ft/2,0,Me*ft/2),s.receiveShadow=!0,e.add(s);for(let g of Object.values($n)){let _=Object.entries($n).find(([,D])=>D===g)[1].zone,f=99,u=0,v=99,x=0;for(let D=0;D<Me;D++)for(let y=0;y<Jt;y++)ma[wn(y,D)]===_&&(f=Math.min(f,y),u=Math.max(u,y),v=Math.min(v,D),x=Math.max(x,D));let S=new he({map:t.site.clone(),roughness:.85});S.map.needsUpdate=!0,S.map.repeat.set((u-f+1)*ft/4,(x-v+1)*ft/4);let A=new qt(new Sn((u-f+1)*ft,(x-v+1)*ft),S);A.rotation.x=-Math.PI/2,A.position.set((f+u+1)/2*ft,.01,(v+x+1)/2*ft),A.receiveShadow=!0,e.add(A);let T=di(512,512,(D,y,w)=>{D.clearRect(0,0,y,w),D.strokeStyle="#ffd23a",D.lineWidth=10,D.setLineDash([40,20]),D.strokeRect(8,8,y-16,w-16),D.fillStyle="rgba(255,210,58,.85)",D.font="900 300px sans-serif",D.textAlign="center",D.textBaseline="middle",D.fillText(g.name,y/2,w/2+10)},!1),R=new qt(new Sn((u-f+1)*ft,(x-v+1)*ft),new He({map:T,transparent:!0,opacity:.55,depthWrite:!1}));R.rotation.x=-Math.PI/2,R.position.set(A.position.x,.02,A.position.z),e.add(R)}let r=new he({map:t.wall,roughness:.9}),a=new he({map:t.crate,roughness:.85}),o=new he({map:t.metal,roughness:.6,metalness:.3}),l=new rn(1,1,1),c=[],h=(g,_)=>{for(let f=-1;f<=1;f++)for(let u=-1;u<=1;u++)if(Yn(g+u,_+f)<pn&&g+u>=0&&_+f>=0&&g+u<Jt&&_+f<Me)return!0;return!1};for(let g=0;g<Me;g++){let _=null;for(let f=0;f<=Jt;f++){let u=f<Jt&&Yn(f,g)>=pn&&h(f,g);u&&!_&&(_=f),(!u||f===Jt)&&_!==null&&(c.push({x0:_,x1:f-1,z:g,h:pn,m:r}),_=null)}}for(let g=0;g<Me;g++)for(let _=0;_<Jt;_++){let f=Yn(_,g);f>0&&f<pn&&c.push({x0:_,x1:_,z:g,h:f,m:(_*7+g)%5===0?o:a})}for(let g of c){let _=(g.x1-g.x0+1)*ft,f=l.clone(),u=f.attributes.uv;for(let S=0;S<u.count;S++){let A=f.attributes.normal.getX(S),T=f.attributes.normal.getZ(S);(Math.abs(T)>.5||Math.abs(A)<.5)&&u.setX(S,u.getX(S)*_/4)}let v=new qt(f,g.m),x=g.h<pn?.12:0;v.scale.set(_-x*2,g.h,ft-x*2),v.position.set(g.x0*ft+_/2,g.h/2,(g.z+.5)*ft),v.castShadow=!0,v.receiveShadow=!0,e.add(v)}let d=(g,_,f,u,v)=>{let x=di(512,128,(A,T,R)=>{A.fillStyle="rgba(0,0,0,0)",A.clearRect(0,0,T,R),A.fillStyle=u,A.font="900 86px sans-serif",A.textAlign="center",A.textBaseline="middle",A.shadowColor=u,A.shadowBlur=24,A.fillText(v,T/2,R/2)},!1),S=new qt(new Sn(4,1),new He({map:x,transparent:!0,depthWrite:!1}));S.position.set(g,3.6,_),S.rotation.y=f,e.add(S)};d(5*ft+1,34.9*ft,Math.PI,"#ffd23a","A 롱 ↑"),d(53*ft+1,34.9*ft,Math.PI,"#ffd23a","B 메인 ↑"),d(29.5*ft+1,29.9*ft,Math.PI,"#36d1c4","미드 ↑"),d(18.1*ft,13.5*ft,Math.PI/2,"#ffd23a","◀ A"),d(40.9*ft,13.5*ft,-Math.PI/2,"#ffd23a","B ▶");let p=new qt(new Cn(400,32,16),new He({side:ke,fog:!1,map:di(16,256,(g,_,f)=>{let u=g.createLinearGradient(0,0,0,f);u.addColorStop(0,"#2b4f8a"),u.addColorStop(.45,"#8ab6e0"),u.addColorStop(.52,"#f2d6b0"),u.addColorStop(1,"#6d6a66"),g.fillStyle=u,g.fillRect(0,0,_,f)},!1)}));p.position.set(Jt,0,Me),e.add(p);let m=new qt(new Sn(900,900),new he({color:2776954,roughness:.3,metalness:.2}));m.rotation.x=-Math.PI/2,m.position.set(Jt,-.5,Me),e.add(m);for(let[g,_]of[[-14,30],[140,20],[60,-16]]){let f=new ge,u=new he({color:14178090,roughness:.6});for(let[x,S]of[[-2,-2],[2,-2],[-2,2],[2,2]]){let A=new qt(l,u);A.scale.set(.6,28,.6),A.position.set(x,14,S),f.add(A)}let v=new qt(l,u);v.scale.set(36,1.2,1.2),v.position.set(8,27,0),f.add(v),f.position.set(g,0,_),f.rotation.y=Math.random()*3,e.add(f)}return e}var Ke={sting:{id:"sting",name:"스팅",kind:"권총",slot:2,price:0,dmg:[78,26,22],rate:6.5,mag:12,reserve:36,reload:1.5,spread:.004,move:.03,recoil:.012,auto:!1,falloff:[30,.85],speed:6.75},viper:{id:"viper",name:"바이퍼",kind:"권총",slot:2,price:500,dmg:[104,34,28],rate:4,mag:8,reserve:24,reload:1.8,spread:.003,move:.025,recoil:.02,auto:!1,falloff:[30,.8],speed:6.75},wasp:{id:"wasp",name:"와스프",kind:"기관단총",slot:1,price:1100,dmg:[72,26,22],rate:13,mag:30,reserve:90,reload:2.2,spread:.01,move:.012,recoil:.0065,auto:!0,falloff:[20,.8],speed:6.75},burst:{id:"burst",name:"버스트",kind:"산탄총",slot:1,price:1700,dmg:[22,11,9],pellets:12,rate:1.1,mag:5,reserve:15,reload:2.6,spread:.06,move:.01,recoil:.05,auto:!1,falloff:[10,.5],speed:6.3},lance:{id:"lance",name:"랜스",kind:"소총",slot:1,price:2900,dmg:[160,40,34],rate:9.75,mag:25,reserve:75,reload:2.5,spread:.0025,move:.06,recoil:.0105,auto:!0,falloff:[50,.9],speed:6},halberd:{id:"halberd",name:"할버드",kind:"소총",slot:1,price:2900,dmg:[140,35,30],rate:11,mag:30,reserve:90,reload:2.3,spread:.0035,move:.05,recoil:.0085,auto:!0,falloff:[50,.9],speed:6},owl:{id:"owl",name:"아울",kind:"저격총",slot:1,price:4700,dmg:[255,150,120],rate:.6,mag:5,reserve:10,reload:3.6,spread:8e-4,move:.12,recoil:.06,auto:!1,falloff:[200,1],zoom:2.5,scopeOnly:!0,speed:5.4}},Yh=[["보조",["viper"]],["기관단총 · 산탄",["wasp","burst"]],["소총",["lance","halberd"]],["저격",["owl"]]],ya={light:{name:"가벼운 방어구",price:400,ap:25},heavy:{name:"무거운 방어구",price:1e3,ap:50}},we={blaze:{id:"blaze",name:"블레이즈",role:"돌격",color:"#ff6a3d",desc:"빠르게 치고 들어가는 돌격 요원",q:{id:"dash",name:"돌진",icon:"💨",free:1,max:2,price:150,desc:"바라보는 쪽으로 7m 순간 돌진"},e:{id:"flash",name:"섬광탄",icon:"✴️",free:0,max:2,price:250,desc:"던지고 0.6초 뒤 터져서 보고 있는 적의 눈을 멀게 함"}},mist:{id:"mist",name:"미스트",role:"연막",color:"#8a8cf2",desc:"연막으로 시야를 끊어 주는 요원",q:{id:"smoke",name:"연막구",icon:"☁️",free:2,max:3,price:100,desc:"조준한 곳(40m 안)에 15초 연막"},e:{id:"slow",name:"감속 지대",icon:"🌀",free:0,max:1,price:200,desc:"조준한 곳에 6초 동안 적을 느리게 하는 지대"}},echo:{id:"echo",name:"에코",role:"정찰",color:"#3fd1a3",desc:"적 위치를 밝혀내는 정찰 요원",q:{id:"pulse",name:"음파",icon:"📡",free:1,max:1,price:0,desc:"15m 안의 적을 벽 너머로 2초간 표시"},e:{id:"dart",name:"탐지 화살",icon:"🏹",free:0,max:2,price:200,desc:"맞은 곳 14m 안의 보이는 적을 3초 표시"}},medi:{id:"medi",name:"메디",role:"수호",color:"#f2d24a",desc:"팀을 치료하고 길을 막는 수호 요원",q:{id:"heal",name:"치유",icon:"💚",free:1,max:1,price:0,desc:"바라보는 아군(없으면 나)을 3초에 걸쳐 60 치유"},e:{id:"wall",name:"장벽",icon:"🧱",free:0,max:1,price:300,desc:"조준한 곳에 20초 동안 막는 벽"}}};function El(i,t,e){let n=i.dmg[t==="head"?0:t==="leg"?2:1];return Math.round(e>i.falloff[0]?n*i.falloff[1]:n)}var Ni=(i,t=.5,e=.4)=>new he({color:i,roughness:t,metalness:e}),Je={body:Ni(5923952,.35,.55),dark:Ni(2764598,.4,.6),grip:Ni(4864560,.85,0),acc:Ni(16738877,.45,.2),teal:Ni(3592644,.3,.3),glove:Ni(3951192,.8,0),skin:Ni(14858386,.7,0)};Je.teal.emissive=new Dt(3592644);Je.teal.emissiveIntensity=.8;var Zn=new rn(1,1,1),Sl=new ms(1,1,1,12);function mn(i,t,e,n,s,r,a,o,l,c=0){let h=new qt(t,e);return h.scale.set(n,s,r),h.position.set(a,o,l),h.rotation.x=c,i.add(h),h}function $h(i){let t=new ge,e=Ke[i],n=e.slot===2?.22:i==="owl"?.78:i==="burst"?.6:.52;mn(t,Zn,Je.body,.055,.08,n,0,0,-n/2),mn(t,Sl,Je.dark,.014,n*.5,.014,0,.018,-n-n*.2,Math.PI/2),mn(t,Zn,Je.grip,.045,.12,.05,0,-.08,-.06,.25),e.slot===1&&(mn(t,Zn,Je.dark,.04,i==="burst"?.04:.13,.06,0,-.09,-n*.45,-.15),mn(t,Zn,Je.body,.05,.06,.2,0,-.01,.12),mn(t,Zn,i==="owl"?Je.dark:Je.acc,.058,.012,n*.6,0,.046,-n*.45)),i==="owl"?(mn(t,Sl,Je.dark,.03,.26,.03,0,.075,-.3,Math.PI/2),mn(t,Sl,Je.teal,.033,.01,.033,0,.075,-.43,Math.PI/2)):mn(t,Zn,Je.teal,.012,.02,.02,0,.055,-.05),mn(t,Zn,Je.glove,.07,.09,.11,0,-.09,-.02),e.slot===1&&mn(t,Zn,Je.glove,.07,.07,.12,0,-.05,-n*.62),mn(t,Zn,Je.skin,.05,.05,.08,.02,-.12,.05);let s=new qt(new Sn(.22,.22),new He({map:va(),transparent:!0,depthWrite:!1,blending:Pi}));return s.position.set(0,.018,-n-n*.45),s.visible=!1,t.add(s),t.userData={flash:s,muzzle:s.position.clone(),len:n},t.traverse(r=>{r.isMesh&&(r.renderOrder=10)}),t}var xa=null;function va(){if(xa)return xa;let i=document.createElement("canvas");i.width=i.height=64;let t=i.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,30);return e.addColorStop(0,"rgba(255,255,220,1)"),e.addColorStop(.35,"rgba(255,190,80,.9)"),e.addColorStop(1,"rgba(255,120,20,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),xa=new qn(i),xa}var Ln={atk:{name:"공격",color:"#ff6a3d",hex:16738877},def:{name:"수비",color:"#36d1c4",hex:3592644}},F0=1.62,z0=1.15,Oi=.4,B0=1,js=class{constructor(t){this.id=t.id||"a"+B0++,this.name=t.name,this.team=t.team,this.agent=t.agent||"blaze",this.isBot=!!t.isBot,this.isLocal=!!t.isLocal,this.remote=!!t.remote,this.x=0,this.y=0,this.z=0,this.vx=0,this.vy=0,this.vz=0,this.yaw=0,this.pitch=0,this.hp=100,this.armor=0,this.alive=!0,this.onGround=!0,this.crouch=0,this.walk=!1,this.credits=800,this.kills=0,this.deaths=0,this.score=0,this.guns={1:null,2:{id:"sting",mag:12,res:36}},this.slot=2,this.abil={q:0,e:0},this.flashT=0,this.slowT=0,this.revealT=0,this.healT=0,this.reloadT=0,this.fireCD=0,this.shotN=0,this.spreadKick=0,this.lastShot=-9,this.animT=Math.random()*6,this.deadT=0,this.carry=!1,this.speedNow=0,this.model=Tl(this.team,this.agent),this.resetAbil(!0)}get gun(){return this.guns[this.slot]||this.guns[2]}get W(){return Ke[this.gun.id]}get eye(){return this.y+(this.crouch>.5?z0:F0)}resetAbil(t){let e=we[this.agent];t?this.abil={q:e.q.free,e:e.e.free}:(this.abil.q=Math.max(this.abil.q,e.q.free),this.abil.e=Math.max(this.abil.e,e.e.free))}setTeam(t){if(t===this.team)return;this.team=t;let e=this.model.parent;e&&e.remove(this.model),this.model=Tl(t,this.agent),e&&e.add(this.model)}setAgent(t){if(t===this.agent)return;this.agent=t;let e=this.model.parent;e&&e.remove(this.model),this.model=Tl(this.team,t),e&&e.add(this.model)}spawn(t,e){this.x=t.x,this.z=t.z,this.y=0,this.vx=this.vy=this.vz=0,this.yaw=e,this.pitch=0,this.hp=100,this.alive=!0,this.deadT=0,this.flashT=this.slowT=this.revealT=this.healT=0,this.reloadT=0,this.carry=!1,this.model.visible=!0,this.model.rotation.set(0,0,0),this.guns[this.slot]||(this.slot=2);for(let n of[1,2]){let s=this.guns[n];s&&(s.mag=Ke[s.id].mag,s.res=Ke[s.id].reserve)}}die(){this.alive=!1,this.hp=0,this.deaths++,this.deadT=0,this.guns[1]=null,this.armor=0,this.slot=2}};function Al(i,t,e,n,s,r={}){let o=(i.W.speed||6.75)*(i.walk?.52:1)*(i.crouch>.5?.42:1)*(i.slowT>0?.5:1);r.frozen&&(o=0);let l=i.onGround?60:12,c=e*o,h=n*o,d=Math.min(1,l*t/Math.max(.01,o||1));(i.onGround||e||n)&&(i.vx+=(c-i.vx)*d,i.vz+=(h-i.vz)*d),i.onGround&&s&&i.crouch<.5&&(i.vy=5.2,i.onGround=!1),i.vy-=18*t;let p=(f,u)=>r.zoneLock&&vs(f,u)!==r.zoneLock||bl(f,u,Oi,i.y)===null?!1:(i.x=f,i.z=u,!0),m=i.vx*t,g=i.vz*t;p(i.x+m,i.z)||(i.vx=0),p(i.x,i.z+g)||(i.vz=0);let _=bl(i.x,i.z,Oi*.95,i.y+.01,.5)??0;i.y+=i.vy*t,i.y<=_?(i.vy<-9&&r.onLand&&r.onLand(i.vy),i.y=_,i.vy=0,i.onGround=!0):i.y>_+.05&&(i.onGround=!1),i.speedNow=Math.hypot(i.vx,i.vz)}function Zh(i,t,e,n,s,r,a,o,l,c,h){let d=i-a,p=e-o,m=n*n+r*r,g=2*(d*n+p*r),_=d*d+p*p-l*l;if(m<1e-9)return null;let f=g*g-4*m*_;if(f<0)return null;let u=Math.sqrt(f);for(let v of[(-g-u)/(2*m),(-g+u)/(2*m)]){if(v<0)continue;let x=t+s*v;if(x>=c&&x<=h)return v}return null}function k0(i,t,e,n,s,r,a,o,l,c){let h=i-a,d=t-o,p=e-l,m=h*n+d*s+p*r,g=h*h+d*d+p*p-c*c,_=m*m-g;if(_<0)return null;let f=-m-Math.sqrt(_);return f>=0?f:null}function Jh(i,t,e,n,s,r,a){if(!i.alive)return null;let o=i.crouch>.5?.72:1,l=i.y+1.62*o,c=null,h=k0(t,e,n,s,r,a,i.x,l,i.z,.17);h!==null&&(c={t:h,part:"head"});let d=Zh(t,e,n,s,r,a,i.x,i.z,.3,i.y+.88*o,i.y+1.45*o);d!==null&&(!c||d<c.t)&&(c={t:d,part:"body"});let p=Zh(t,e,n,s,r,a,i.x,i.z,.24,i.y,i.y+.88*o);return p!==null&&(!c||p<c.t)&&(c={t:p,part:"leg"}),c}var Pn=new rn(1,1,1),wl=new Cn(1,16,12),Ma=new aa(1,1,4,10),ba={};function H0(i,t){let e=i+t;if(ba[e])return ba[e];let n=Ln[i].hex,s=new Dt(we[t].color);return ba[e]={suit:new he({color:i==="atk"?7031868:4021358,roughness:.8}),armor:new he({color:i==="atk"?10515290:6985131,roughness:.45,metalness:.25}),team:new he({color:n,emissive:n,emissiveIntensity:.6,roughness:.4}),agent:new he({color:s,roughness:.5}),visor:new he({color:724756,emissive:n,emissiveIntensity:.9,roughness:.2,metalness:.5}),skin:new he({color:14265221,roughness:.7}),boot:new he({color:2764081,roughness:.8}),gun:new he({color:1908773,roughness:.5,metalness:.6})},ba[e]}function Oe(i,t,e,n,s,r,a,o,l){let c=new qt(t,e);return c.scale.set(n,s,r),c.position.set(a,o,l),c.castShadow=!0,i.add(c),c}function Tl(i,t){let e=H0(i,t),n=new ge,s=new ge;n.add(s);let r=[],a=[];for(let d of[1,-1]){let p=new ge;p.position.set(d*.13,.92,0),s.add(p),Oe(p,Ma,e.suit,.1,.3,.1,0,-.22,0),Oe(p,Pn,e.armor,.15,.14,.06,0,-.18,.09);let m=new ge;m.position.y=-.46,p.add(m),Oe(m,Ma,e.suit,.09,.28,.09,0,-.2,0),Oe(m,Pn,e.boot,.14,.12,.28,0,-.42,.05),r.push(p),a.push(m)}let o=new ge;o.position.y=.95,s.add(o),Oe(o,Ma,e.suit,.22,.32,.16,0,.3,0),Oe(o,Pn,e.armor,.46,.36,.3,0,.36,.01),Oe(o,Pn,e.team,.47,.05,.31,0,.3,.01),Oe(o,Pn,e.agent,.12,.1,.02,.12,.45,.165),Oe(o,Pn,e.suit,.34,.32,.14,0,.36,-.22);let l=new ge;l.position.y=.66,o.add(l),Oe(l,wl,e.skin,.12,.13,.12,0,.02,0),Oe(l,wl,e.armor,.145,.12,.15,0,.07,-.01),Oe(l,Pn,e.visor,.22,.06,.06,0,.04,.11),Oe(l,Pn,e.team,.02,.06,.2,.14,.08,0);let c=new ge;c.position.set(0,.52,.05),o.add(c);for(let d of[1,-1]){let p=Oe(c,Ma,e.suit,.07,.2,.07,d*.24,-.12,.12);p.rotation.x=-1.1,Oe(c,wl,e.boot,.06,.06,.06,d*.08,-.16,.42)}let h=new ge;return h.position.set(.05,-.12,.42),c.add(h),Oe(h,Pn,e.gun,.07,.1,.6,0,0,.1),Oe(h,Pn,e.team,.072,.015,.4,0,.05,.1),n.userData={body:s,legs:r,knees:a,torso:o,head:l,arms:c,gun:h},n}function Kh(i,t){let e=i.model.userData;if(i.model.position.set(i.x,i.y,i.z),!i.alive){i.deadT+=t;let a=Math.min(1,i.deadT*2.2);i.model.rotation.set(-a*Math.PI/2*.95,i.yaw,0,"YXZ"),i.model.position.y=i.y+.15*a;return}i.model.rotation.set(0,i.yaw,0);let n=i.speedNow||0;i.animT+=t*(2+n*1.6);let s=Math.min(1,n/5)*.65,r=i.crouch;e.legs[0].rotation.x=Math.sin(i.animT)*s-r*1,e.legs[1].rotation.x=-Math.sin(i.animT)*s-r*1,e.knees[0].rotation.x=Math.max(0,-Math.sin(i.animT))*s*1.2+r*1.6,e.knees[1].rotation.x=Math.max(0,Math.sin(i.animT))*s*1.2+r*1.6,e.body.position.y=-r*.32+Math.abs(Math.sin(i.animT))*s*.04,e.torso.rotation.x=r*.25,e.arms.rotation.x=-i.pitch*.9-r*.2,e.head.rotation.x=-i.pitch*.5}var jh={easy:{react:[.55,.85],turn:4.5,err:.09,head:.12,burst:3},normal:{react:[.32,.55],turn:7,err:.05,head:.28,burst:4},hard:{react:[.18,.32],turn:11,err:.025,head:.5,burst:6}},Qh=["라온","해솔","다온","바람","노을","이든","하람","새봄","가람","누리","단비","한결","초롱","마루","별하","은솔"];function tu(i){return Qh[i%Qh.length]}var Sa=(i,t)=>{let e=t-i;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e};function eu(i){let t=i.credits,e=!!i.guns[1],n=a=>{let o=Ke[a];return i.credits>=o.price?(i.credits-=o.price,i.guns[1]={id:a,mag:o.mag,res:o.reserve},i.slot=1,!0):!1},s=(a,o,l)=>{i.credits>=o&&i.armor<l&&(i.credits-=o,i.armor=l)};e?s(i.credits>=1800?"heavy":"light",i.credits>=1800?1e3:400,i.credits>=1800?50:25):t>=3900?(i.agent==="echo"&&Math.random()<.35&&t>=5700?n("owl"):n(Math.random()<.5?"lance":"halberd"),s("heavy",1e3,50)):t>=2400&&Math.random()<.7?n(Math.random()<.5?"lance":"halberd"):t>=1600&&Math.random()<.5?(n(Math.random()<.7?"wasp":"burst"),s("light",400,25)):t>=700&&Math.random()<.4&&(i.credits-=500,i.guns[2]={id:"viper",mag:8,res:24});let r=we[i.agent];for(let a of["q","e"])for(;i.abil[a]<r[a].max&&i.credits>=r[a].price+300&&r[a].price>0;)i.credits-=r[a].price,i.abil[a]++;i.slot=i.guns[1]?1:2}var Ea=class{constructor(t,e="normal"){this.a=t,this.D=jh[e]||jh.normal,this.reset()}reset(){this.path=null,this.pi=0,this.goal=null,this.target=null,this.react=0,this.seenT=0,this.burst=0,this.think=0,this.strafe=0,this.strafeT=0,this.stuckT=0,this.lx=0,this.lz=0,this.waitT=0,this.lookYaw=null,this.plan=null,this.planT=0,this.usedAbil=!1,this.aimErr=[0,0]}go(t,e){this.path=Xh(this.a.x,this.a.z,t,e),this.pi=0,this.goal={x:t,z:e}}update(t,e){let n=this.a,s=this.D;if(!n.alive)return null;let r={wx:0,wz:0,jump:!1,fire:!1,crouch:!1,walk:!1,use:null,plant:!1,defuse:!1};if(this.think-=t,this.think<=0){this.think=.12;let h=null,d=1e9,p=Math.sin(n.yaw),m=Math.cos(n.yaw);for(let g of e.actors){if(!g.alive||g.team===n.team)continue;let _=g.x-n.x,f=g.z-n.z,u=Math.hypot(_,f);if(u>75)continue;let v=g.revealT>0||this.target===g&&this.seenT>0;!((_*p+f*m)/(u||1)>.35||u<4||this.hurtBy===g)&&!v||n.flashT>.3||e.canSee(n,g)&&u<d&&(d=u,h=g)}h&&h!==this.target&&(this.target=h,this.react=s.react[0]+Math.random()*(s.react[1]-s.react[0]),this.aimErr=[(Math.random()-.5)*s.err*6,(Math.random()-.5)*s.err*4]),h?(this.seenT=1.2,this.last={x:h.x,z:h.z},e.teamIntel(n.team,h)):this.seenT<=0&&(this.target=null)}this.seenT-=t,this.hurtBy=null;let a=n.W;if(this.target&&this.target.alive&&this.seenT>.9){let h=this.target,p=Math.random()<s.head?h.eye-.02:h.y+1.15*(h.crouch>.5?.72:1),m=h.x-n.x,g=h.z-n.z,_=Math.hypot(m,g),f=Math.atan2(m,g)+this.aimErr[0]/Math.max(1,_*.08),u=Math.atan2(p-n.eye,_)+this.aimErr[1]/Math.max(1,_*.08),v=s.turn*t,x=Sa(n.yaw,f),S=u-n.pitch;return n.yaw+=Math.max(-v,Math.min(v,x)),n.pitch+=Math.max(-v,Math.min(v,S)),this.aimErr[0]*=Math.pow(.15,t),this.aimErr[1]*=Math.pow(.15,t),this.react-=t,this.react<=0&&Math.abs(Sa(n.yaw,f))<.06+.4/Math.max(2,_)&&(n.gun.mag<=0?r.reload=!0:a.auto?(this.burst>0||Math.random()<t*8)&&(r.fire=!0,this.burst=this.burst>0?this.burst-1:s.burst):r.fire=Math.random()<t*(a.rate*.8),n.shotN>s.burst+2&&(r.fire=!1,this.burst=0)),this.strafeT-=t,this.strafeT<=0&&(this.strafeT=.4+Math.random()*.7,this.strafe=Math.random()<.5?-1:1,Math.random()<.3&&(this.strafe=0)),r.fire&&a.slot===1&&a.id!=="wasp"||(r.wx=Math.cos(n.yaw)*this.strafe,r.wz=-Math.sin(n.yaw)*this.strafe),n.hp<45&&n.agent==="medi"&&n.abil.q>0&&(r.use="q"),n.agent==="blaze"&&n.abil.e>0&&_>8&&_<22&&Math.random()<t*.4&&(r.use="e"),r}n.gun.mag<a.mag*.4&&n.gun.res>0&&!this.target&&(r.reload=!0),n.hp<60&&n.agent==="medi"&&n.abil.q>0&&(r.use="q");let o=n.team==="atk",l=e.core;this.planT-=t;let c=(h,d,p)=>{(this.plan!==p||!this.path)&&(this.plan=p,this.go(h,d))};if(e.phase==="buy")return this.lookYaw=o?Math.PI:0,r;if(o)if(l.state==="planted"){if(!this.post){let h=$n[l.site];this.post={x:h.x+(Math.random()-.5)*14,z:h.z+6+Math.random()*8}}c(this.post.x,this.post.z,"post")}else if(n.carry){let h=$n[e.atkSite];if(vs(n.x,n.z)===h.zone&&Math.hypot(n.x-h.x,n.z-h.z)<7)return r.plant=!0,this.path=null,r;this.route(e,h,"carry")}else if(l.state==="dropped"&&Math.hypot(l.x-n.x,l.z-n.z)<40)c(l.x,l.z,"pick");else{let h=$n[e.atkSite];Math.hypot(n.x-h.x,n.z-h.z)<9?(this.post||(this.post={x:h.x+(Math.random()-.5)*12,z:h.z+(Math.random()-.5)*8}),c(this.post.x,this.post.z,"onsite")):this.route(e,h,"push"),!this.usedAbil&&Math.hypot(n.x-h.x,n.z-h.z)<26&&(n.agent==="mist"&&n.abil.q>0?(this.usedAbil=!0,r.use="q",r.useAt=_a[h.name][Math.floor(Math.random()*2)]):n.agent==="echo"&&n.abil.q>0&&(this.usedAbil=!0,r.use="q"))}else if(l.state==="planted"){let h=e.intel[n.team],d=h&&e.time-h.t<2.5&&Math.hypot(h.x-l.x,h.z-l.z)<12;if(Math.hypot(l.x-n.x,l.z-n.z)<1.6&&!d)return r.defuse=!0,r.crouch=!0,this.path=null,r;c(l.x,l.z,"retake")}else{if(!this.hold){let d=this.site||"A",p=_a[d];this.hold=p[this.holdIdx%p.length]}let h=e.intel[n.team];h&&e.time-h.t<4&&this.rotateOk&&Math.hypot(h.x-n.x,h.z-n.z)<45?c(h.x,h.z,"rotate"+Math.round(h.t)):(c(this.hold.x,this.hold.z,"hold"),this.path&&this.pi>=this.path.length&&(this.lookYaw=this.holdLook))}if(this.path&&this.pi<this.path.length){let h=this.path[this.pi],d=h.x-n.x,p=h.z-n.z,m=Math.hypot(d,p);if(m<.7)this.pi++;else{r.wx=d/m,r.wz=p/m;let g=Math.atan2(d,p);n.yaw+=Math.max(-t*6,Math.min(t*6,Sa(n.yaw,g))),n.pitch*=.9}Math.hypot(n.x-this.lx,n.z-this.lz)<t*.6?(this.stuckT+=t,this.stuckT>1.2&&(this.stuckT=0,this.path=null,r.jump=!0)):this.stuckT=0,this.lx=n.x,this.lz=n.z}else this.lookYaw!==null&&this.lookYaw!==void 0&&(n.yaw+=Math.max(-t*3,Math.min(t*3,Sa(n.yaw,this.lookYaw))),Math.random()<t*.3&&(this.lookYaw+=(Math.random()-.5)*1.2));return r}route(t,e,n){let s=this.a;if(!this.entry){let o=Gh[e.name];this.entry=o[this.entryIdx%o.length].slice()}for(;this.entry.length&&Math.hypot(this.entry[0].x-s.x,this.entry[0].z-s.z)<3;)this.entry.shift();let r=this.entry[0]||{x:e.x,z:e.z},a=n+r.x+","+r.z;(this.plan!==a||!this.path)&&(this.plan=a,this.go(r.x,r.z))}};Ta();var Te={win:7,half:6,buyT:20,liveT:100,plantT:40,endT:6,plantHold:4,defuseHold:7,maxCredits:9e3},p_=new C,Ra=class{constructor(t,e){this.opts=e,this.el=t,this.auth=e.mode!=="client",this.time=0,this.events=[],this.feed=[],this.intel={atk:null,def:null},this.fx=[],this.smokes=[],this.zones=[],this.walls=[],this.projs=[],this.round=1,this.score={red:0,blue:0},this.phase="buy",this.timer=Te.buyT,this.streak={red:0,blue:0},this.core={state:"carried",holder:null,x:0,z:0,site:null,t:0,prog:0,defHalf:!1},this.atkSite="A",this.msg=null,this.over=null,this.initRender(),qh(this.scene),this.actors=[],this.me=this.addActor({id:e.myId||"me",name:e.me.name,grp:e.me.grp||"red",agent:e.me.agent,isLocal:!0}),this.viewGun=null,this.setViewGun(),this.auth&&e.bots!==!1&&this.fillBots(),this.startRound(!0)}teamOf(t){return t==="red"==this.round<=Te.half?"atk":"def"}addActor(t){let e=new js({...t,team:this.teamOf(t.grp)});return e.grp=t.grp,this.actors.push(e),this.scene.add(e.model),e.isLocal&&(e.model.visible=!1),e.isBot&&(e.brain=new Ea(e,this.opts.diff)),e}removeActor(t){this.scene.remove(t.model),this.actors=this.actors.filter(e=>e!==t),t.revealS&&this.scene.remove(t.revealS)}fillBots(){let t=Object.keys(we),e=0;for(let n of["red","blue"]){let s=this.actors.filter(r=>r.grp===n).length;for(let r=s;r<5;r++){let a=this.actors.filter(l=>l.grp===n).map(l=>l.agent),o=t.filter(l=>!a.includes(l));this.addActor({id:"bot"+n+r+Math.random().toString(36).slice(2,5),name:tu(e+++(n==="blue"?7:0))+" (봇)",grp:n,agent:o.length?o[Math.floor(Math.random()*o.length)]:t[Math.floor(Math.random()*t.length)],isBot:!0})}}}initRender(){let t=this.renderer=new Gs({antialias:!0,powerPreference:"high-performance"});t.setPixelRatio(Math.min(devicePixelRatio,this.opts.quality==="low"?1:1.6)),t.shadowMap.enabled=this.opts.quality!=="low",t.shadowMap.type=fl,t.toneMapping=pl,t.toneMappingExposure=1.05,t.outputColorSpace=Se,t.autoClear=!1,this.el.appendChild(t.domElement);let e=this.scene=new Ws;e.fog=new Qr(12109524,70,260),e.add(new Js(14675711,8023648,1.25));let n=new Ks(16773596,2.2);n.position.set(Jt*ft/2+40,90,Me*ft/2-30),n.target.position.set(Jt*ft/2,0,Me*ft/2),n.castShadow=!0,n.shadow.mapSize.set(2048,2048);let s=n.shadow.camera;s.left=-75,s.right=75,s.top=60,s.bottom=-60,s.near=10,s.far=220,n.shadow.bias=-6e-4,n.shadow.normalBias=.03,e.add(n,n.target),this.cam=new Ue(this.opts.fov||80,1,.05,600),this.cam.rotation.order="YXZ",this.vscene=new Ws,this.vscene.add(new Js(16777215,4478310,1.4));let r=new Ks(16777215,1.4);r.position.set(1,2,1),this.vscene.add(r),this.vcam=new Ue(62,1,.01,10),this.resize()}resize(){let t=this.el.clientWidth||innerWidth,e=this.el.clientHeight||innerHeight;this.renderer.setSize(t,e),this.cam.aspect=t/e,this.cam.updateProjectionMatrix(),this.vcam.aspect=t/e,this.vcam.updateProjectionMatrix()}setViewGun(){this.viewGun&&this.vscene.remove(this.viewGun),this.viewGun=$h(this.me.gun.id),this.viewGunId=this.me.gun.id,this.vscene.add(this.viewGun),this.vkick=0,this.vbob=0}dispose(){this.renderer.dispose(),this.renderer.domElement.remove()}startRound(t){for(let e of this.actors)e.setTeam(this.teamOf(e.grp));this.phase="buy",this.timer=Te.buyT;for(let e of this.smokes)this.scene.remove(e.g);this.smokes=[];for(let e of this.zones)this.scene.remove(e.m);this.zones=[];for(let e of this.walls)this.scene.remove(e.m),Ml(e.b);this.walls=[];for(let e of this.fx)e.o&&this.scene.remove(e.o);this.fx=[];for(let e of this.projs)this.scene.remove(e.m);this.projs=[],this.core={state:"carried",holder:null,x:0,z:0,site:null,t:0,prog:0,defHalf:!1},this.coreMesh&&(this.coreMesh.visible=!1);for(let e of["atk","def"])this.actors.filter(s=>s.team===e).sort((s,r)=>s.id<r.id?-1:1).forEach((s,r)=>{if(!s.isLocal&&!(s.isBot&&this.auth))return;let a=Vh[e][r%5];s.spawn({x:a.x+(r>=5?1:0),z:a.z},e==="atk"?Math.PI:0),t||!s.alive?s.resetAbil(!0):s.resetAbil(!1)});if(t||this.round===Te.half+1)for(let e of this.actors)e.credits=800,e.guns={1:null,2:{id:"sting",mag:12,res:36}},e.slot=2,e.armor=0,e.resetAbil(!0);if(this.auth){let e=this.actors.filter(r=>r.team==="atk"),n=e[Math.floor(Math.random()*e.length)];n&&(n.carry=!0,this.core.holder=n.id),this.atkSite=Math.random()<.5?"A":"B",this.actors.filter(r=>r.isBot&&r.team==="def").forEach((r,a)=>{r.brain.reset(),r.brain.site=a%2?"B":"A",r.brain.holdIdx=Math.floor(a/2)+Math.floor(Math.random()*2),r.brain.rotateOk=a%2===0,r.brain.hold=null,r.brain.holdLook=Math.PI}),e.filter(r=>r.isBot).forEach((r,a)=>{r.brain.reset(),r.brain.entryIdx=Math.floor(Math.random()*3),r.brain.entry=null,r.brain.post=null});for(let r of this.actors)r.isBot&&eu(r)}this.me&&(this.setViewGun(),this.me.yaw=this.me.team==="atk"?Math.PI:0),this.say(t?`${this.me.team==="atk"?"공격":"수비"} 팀으로 시작해요`:this.round===Te.half+1?"공수 교대! 이제 "+(this.me.team==="atk"?"공격":"수비")+"이에요":`라운드 ${this.round}`,this.me.team==="atk"?"코어를 A나 B 사이트에 설치하세요":"사이트를 지키고 코어를 해체하세요")}say(t,e){this.msg={big:t,small:e,t:3.2}}endRound(t,e){var o;if(this.phase==="end"||this.phase==="over")return;this.phase="end",this.timer=Te.endT;let n=((o=this.actors.find(l=>l.team===t))==null?void 0:o.grp)||(t===this.teamOf("red")?"red":"blue"),s=n==="red"?"blue":"red";this.auth&&this.score[n]++,this.streak[n]=0,this.streak[s]=Math.min(2,this.streak[s]+1);let r=this.core.state==="planted"||this.core.state==="exploded"||this.core.state==="defused";for(let l of this.actors){if(!(l.isLocal||l.isBot&&this.auth))continue;let c=l.grp===n;l.credits=Math.min(Te.maxCredits,l.credits+(c?3e3:1900+500*(this.streak[s]-1))+(r&&l.team==="atk"&&!c?300:0))}let a=this.me.grp===n;ue.round(a),this.say(a?"라운드 승리":"라운드 패배",e),this.lastWin={grp:n,why:e},this.auth&&this.score[n]>=Te.win&&(this.phase="over",this.timer=9999,this.over={win:a,grp:n})}update(t,e){this.time+=t;let n=this.me;if(this.auth&&this.tickRound(t),this.updateMe(t,e),this.auth)for(let s of this.actors)s.isBot&&this.updateBot(s,t);for(let s of this.actors)s.flashT=Math.max(0,s.flashT-t),s.slowT=Math.max(0,s.slowT-t),s.revealT=Math.max(0,s.revealT-t),s.healT>0&&s.alive&&(s.healT-=t,s.hp=Math.min(100,s.hp+20*t)),s.dashT>0&&(s.dashT-=t),s.isLocal||Kh(s,t),this.revealMark(s),s.remote&&s.net&&this.lerpRemote(s,t);for(let s of this.zones){s.t-=t;for(let r of this.actors)r.alive&&r.team!==s.team&&Math.hypot(r.x-s.x,r.z-s.z)<s.r&&(r.slowT=.25)}this.zones=this.zones.filter(s=>s.t<=0?(this.scene.remove(s.m),!1):(s.m.material.opacity=Math.min(.5,s.t*.4),!0));for(let s of this.smokes){s.t-=t;let r=Math.min(1,(15-s.t)*2.5)*Math.min(1,s.t*.8);s.g.scale.setScalar(Math.max(.01,r)),s.g.children.forEach((a,o)=>{a.material.rotation+=t*.05*(o%2?1:-1)})}this.smokes=this.smokes.filter(s=>s.t<=0?(this.scene.remove(s.g),!1):!0);for(let s of this.walls)s.t-=t;this.walls=this.walls.filter(s=>s.t<=0||s.hp<=0?(this.scene.remove(s.m),Ml(s.b),!1):!0),this.updateProjs(t);for(let s of this.fx)s.t-=t,s.upd&&s.upd(s,t);this.fx=this.fx.filter(s=>s.t<=0?(s.o&&this.scene.remove(s.o),!1):!0),this.updateCoreMesh(t),this.msg&&(this.msg.t-=t,this.msg.t<=0&&(this.msg=null)),this.feed=this.feed.filter(s=>this.time-s.t<6)}tickRound(t){if(this.phase==="over")return;this.timer-=t;let e=this.core;if(this.phase==="buy"&&this.timer<=0)this.phase="live",this.timer=Te.liveT,this.say("전투 시작!",this.me.team==="atk"?"코어를 들고 사이트로":"사이트를 지키세요");else if(this.phase==="live"||this.phase==="planted"){let n=s=>this.actors.some(r=>r.alive&&r.team===s);if(e.state==="planted"){if(e.t-=t,Math.floor(e.t)!==Math.floor(e.t+t)&&ue.beep(e.t<10),e.t<=0){this.explode(),this.endRound("atk","코어 폭발");return}if(!n("def")){this.endRound("atk","수비 전멸");return}}else{if(!n("atk")){this.endRound("def","공격 전멸");return}if(!n("def")){this.endRound("atk","수비 전멸");return}if(this.timer<=0){this.endRound("def","시간 종료");return}}if(e.state==="dropped"){for(let s of this.actors)if(s.alive&&s.team==="atk"&&Math.hypot(s.x-e.x,s.z-e.z)<1.3){e.state="carried",e.holder=s.id,s.carry=!0,s===this.me&&this.say("코어를 주웠어요","사이트에 가서 F를 길게 눌러 설치");break}}}else this.phase==="end"&&this.timer<=0&&(this.round++,this.startRound(!1))}explode(){let t=this.core;t.state="exploded",ue.boom(),this.addFx("boom",t.x,1,t.z);for(let e of this.actors)e.alive&&Math.hypot(e.x-t.x,e.z-t.z)<14&&(e.isLocal||e.isBot&&this.auth)&&this.kill(e,null,"core")}updateMe(t,e){let n=this.me;if(!n.alive){this.spectate(t,e);return}n.yaw-=e.dx,n.pitch=Math.max(-1.45,Math.min(1.45,n.pitch-e.dy)),e.dx=e.dy=0,n.walk=e.walk,n.crouch+=((e.crouch?1:0)-n.crouch)*Math.min(1,t*10);let s=(e.f?1:0)-(e.b?1:0),r=(e.r?1:0)-(e.l?1:0),a=Math.sin(n.yaw)*s-Math.cos(n.yaw)*r,o=Math.cos(n.yaw)*s+Math.sin(n.yaw)*r;(e.jx||e.jy)&&(a=Math.sin(n.yaw)*-e.jy-Math.cos(n.yaw)*e.jx,o=Math.cos(n.yaw)*-e.jy+Math.sin(n.yaw)*e.jx);let l=Math.hypot(a,o);l>1&&(a/=l,o/=l);let c=this.holding;n.dashT>0&&(n.vx=n.dashVx,n.vz=n.dashVz);let h=this.phase==="buy"?n.team==="atk"?3:4:null,d=n.onGround;Al(n,t,c?0:a,c?0:o,e.jump&&!c,{zoneLock:h,onLand:()=>ue.land()}),e.jump=!1,!d&&n.onGround&&(this.vkick+=.04),n.stepT=(n.stepT||0)-t*n.speedNow,n.onGround&&n.speedNow>4&&!n.walk&&n.crouch<.5&&n.stepT<=0&&(n.stepT=2.2,ue.step(.35,0),n.loud=this.time),e.slot&&e.slot!==n.slot&&n.guns[e.slot]&&(n.slot=e.slot,n.reloadT=0,n.fireCD=.35,this.setViewGun()),e.slot=0,this.viewGunId!==n.gun.id&&this.setViewGun(),this.weaponTick(n,t,e.fire,e.reload),e.reload=!1,(!e.fire||!n.W.auto)&&(e.fire||(n.trigger=!1)),e.q&&(this.useAbility(n,"q"),e.q=!1),e.e&&(this.useAbility(n,"e"),e.e=!1),this.holding=!1,e.use?this.tryPlantDefuse(n,t):n.useProg&&(n.useProg=0);let p=n.eye;this.cam.position.set(n.x,p,n.z),this.recoilP=(this.recoilP||0)*Math.pow(.002,t),this.cam.rotation.set(n.pitch+this.recoilP,n.yaw+Math.PI,0);let m=e.aim&&n.W.zoom?n.W.zoom:e.aim?1.15:1;this.scoped=e.aim&&!!n.W.zoom;let g=(this.opts.fov||80)/m;Math.abs(this.cam.fov-g)>.1&&(this.cam.fov+=(g-this.cam.fov)*Math.min(1,t*18),this.cam.updateProjectionMatrix()),this.aimHeld=e.aim}spectate(t,e){let n=this.actors.filter(r=>r.alive&&r.team===this.me.team&&r!==this.me);e.fireEdge&&(this.specI=(this.specI||0)+1,e.fireEdge=!1);let s=n.length?n[(this.specI||0)%n.length]:null;if(this.specOf=s,s)this.cam.position.set(s.x-Math.sin(s.yaw)*2.8,s.eye+.8,s.z-Math.cos(s.yaw)*2.8),this.cam.rotation.set(-.2+s.pitch*.5,s.yaw+Math.PI,0);else{let r=this.me;this.cam.position.set(r.x,8,r.z+6),this.cam.lookAt(r.x,0,r.z)}}weaponTick(t,e,n,s){let r=t.gun,a=t.W;if(t.fireCD-=e,t.reloadT>0){if(t.reloadT-=e,t.reloadT<=0){let o=a.mag-r.mag,l=Math.min(o,r.res);r.mag+=l,r.res-=l}return}if(s&&r.mag<a.mag&&r.res>0){t.reloadT=a.reload,t.isLocal&&ue.reload();return}if(!(this.phase==="buy"||this.phase==="over")){if(!n){this.time-t.lastShot>.32&&(t.shotN=0);return}if(!(t.fireCD>0)&&!(!a.auto&&t.trigger)){if(r.mag<=0){r.res>0?(t.reloadT=a.reload,t.isLocal&&ue.reload()):t.isLocal&&ue.empty(),t.trigger=!0;return}this.holding&&t.isLocal||(t.trigger=!0,r.mag--,t.fireCD=1/a.rate,t.lastShot=this.time,t.shotN++,this.fireShot(t))}}}spreadOf(t){let e=t.W,n=e.spread+e.move*Math.min(1,t.speedNow/5)*(t.walk?.4:1);return t.onGround||(n+=.12),t.crouch>.5&&(n*=.75),e.auto&&(n+=Math.min(10,Math.max(0,t.shotN-2))*e.recoil*.35),e.scopeOnly&&!(t.isLocal?this.scoped:t.scoped!==!1)&&(n+=.07),n}fireShot(t){let e=t.W,n=this.spreadOf(t),s=e.pellets||1,r=t.x,a=t.eye,o=t.z,l=!1;for(let c=0;c<s;c++){let h=Math.sqrt(Math.random())*n,d=Math.random()*Math.PI*2,p=t.yaw+Math.cos(d)*h,m=t.pitch+Math.sin(d)*h+(t.isLocal&&this.recoilP||0),g=Math.sin(p)*Math.cos(m),_=Math.sin(m),f=Math.cos(p)*Math.cos(m),u=pi(r,a,o,g,_,f,200),v=null;for(let S of this.actors){if(S===t||!S.alive||S.team===t.team)continue;let A=Jh(S,r,a,o,g,_,f);A&&A.t<u&&(!v||A.t<v.t)&&(v={...A,a:S})}let x=v?v.t:u;if((c===0||s>1&&c%3===0)&&this.tracer(t,r+g*x,a+_*x,o+f*x),v){l=!0;let S=El(e,v.part,v.t);this.addFx("blood",r+g*v.t,a+_*v.t,o+f*v.t),this.damage(v.a,S,v.part,t,e.id)}else if(u<200){this.addFx("spark",r+g*u-g*.02,a+_*u,o+f*u-f*.02);for(let S of this.walls)S.b&&Math.abs(r+g*u-(S.b.x0+S.b.x1)/2)<3.5&&Math.abs(o+f*u-(S.b.z0+S.b.z1)/2)<3.5&&(S.hp-=El(e,"body",u))}}t.isLocal?(ue.shot(e.id,1,0),this.recoilP=(this.recoilP||0)+e.recoil*(e.auto?.7+Math.min(8,t.shotN)*.08:1.6),t.yaw+=(Math.random()-.5)*e.recoil*(e.auto&&t.shotN>6?.9:.25),this.vkick=Math.min(.12,(this.vkick||0)+(e.slot===2?.035:.025)*(e.id==="owl"||e.id==="burst"?3:1)),this.viewGun&&(this.viewGun.userData.flash.visible=!0,this.flashT=.04)):this.soundAt(t,(c,h)=>Math.hypot(t.x-this.me.x,t.z-this.me.z)<45?ue.shot(e.id,c,h):ue.far(e.id,c,h),120),this.onShot&&this.onShot(t)}remoteShotSound(t,e,n,s){Math.hypot(s.x-this.me.x,s.z-this.me.z)<45?ue.shot(t,e,n):ue.far(t,e,n)}soundAt(t,e,n){let s=this.alivePov(),r=t.x-s.x,a=t.z-s.z,o=Math.hypot(r,a);if(o>n)return;let l=Math.max(.05,1-o/n),c=-Math.cos(s.yaw)*r+Math.sin(s.yaw)*a;e(l,Math.max(-1,Math.min(1,-c/Math.max(4,o))))}alivePov(){return this.me.alive?this.me:this.specOf||this.me}damage(t,e,n,s,r){if(s&&s.isLocal&&(n==="head"?ue.head():ue.hit(),this.hitMark={t:.25,head:n==="head",kill:!1}),!(t.isLocal||t.isBot&&this.auth)){this.net&&this.net.sendHit(t,e,n,s,r);return}this.applyDamage(t,e,n,s?s.id:null,r)}applyDamage(t,e,n,s,r){if(!t.alive)return;let a=Math.min(t.armor,Math.round(e*.66));t.armor-=a,t.hp-=e-a;let o=this.actors.find(l=>l.id===s);t.isBot&&(t.brain.hurtBy=o,o&&t.brain.target!==o&&(t.brain.target=o,t.brain.seenT=1.2,t.brain.react=.25)),t.isLocal&&(ue.hurt(),this.hurtDir=o?Math.atan2(o.x-t.x,o.z-t.z):null,this.hurtT=.8),t.hp<=0&&this.kill(t,o,r,n==="head")}kill(t,e,n,s){t.alive&&(t.die(),(t.carry||this.core.holder===t.id)&&(t.carry=!1,this.core.state==="carried"&&(this.core.state="dropped",this.core.x=t.x,this.core.z=t.z,this.core.holder=null)),this.onKill(t.id,e?e.id:null,n,s),this.net&&this.net.sendKill(t,e,n,s))}onKill(t,e,n,s){var o,l;let r=this.actors.find(c=>c.id===t),a=this.actors.find(c=>c.id===e);r&&r.alive&&r.die(),a&&a!==r&&(a.kills++,(a.isLocal||a.isBot&&this.auth)&&(a.credits=Math.min(Te.maxCredits,a.credits+200)),a.isLocal&&(ue.kill(),this.hitMark&&(this.hitMark.kill=!0))),this.feed.push({t:this.time,by:a?a.name:"",byTeam:a?a.team:"",to:r?r.name:"?",toTeam:r?r.team:"",w:n==="core"?"💥":((o=Ke[n])==null?void 0:o.name)||"",hs:s}),r&&r.isLocal&&this.say("쓰러졌어요",a?`${a.name} · ${((l=Ke[n])==null?void 0:l.name)||""}${s?" (헤드샷)":""}`:"")}tracer(t,e,n,s){let r=t.x,a=t.eye-.12,o=t.z;t.isLocal&&(r+=Math.sin(t.yaw)*.6+Math.cos(t.yaw)*-.18,o+=Math.cos(t.yaw)*.6-Math.sin(t.yaw)*-.18,a-=.08);let l=new Ve().setFromPoints([new C(r,a,o),new C(e,n,s)]),c=new ea(l,new Xs({color:16769696,transparent:!0,opacity:.8}));this.scene.add(c),this.fx.push({o:c,t:.06}),t.isLocal||this.addFx("muzzle",r+Math.sin(t.yaw)*.7,a+.05,o+Math.cos(t.yaw)*.7)}addFx(t,e,n,s){if(t==="spark"||t==="blood"||t==="muzzle"){let r=new ui({map:va(),color:t==="blood"?13111342:t==="muzzle"?16765562:16770720,transparent:!0,depthWrite:!1,blending:t==="blood"?si:Pi}),a=new Ii(r);if(a.position.set(e,n,s),a.scale.setScalar(t==="blood"?.45:t==="muzzle"?.5:.25),this.scene.add(a),this.fx.push({o:a,t:t==="blood"?.25:.08,upd:o=>{a.material.opacity=Math.max(0,o.t*6)}}),t==="spark"){let o=new qt(new Ys(.05,6),new He({color:1710618,transparent:!0,opacity:.7,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4}));o.position.set(e,n,s),o.lookAt(this.cam.position),this.scene.add(o),this.fx.push({o,t:12})}}else if(t==="boom"){let r=new qt(new Cn(1,24,16),new He({color:16756800,transparent:!0,opacity:.9}));r.position.set(e,n,s),this.scene.add(r),this.fx.push({o:r,t:1.2,upd:(a,o)=>{r.scale.addScalar(o*22),r.material.opacity=Math.max(0,a.t*.7)}})}else if(t==="flash"){let r=new Ii(new ui({map:va(),color:16777215,transparent:!0,depthWrite:!1,blending:Pi}));r.position.set(e,n,s),r.scale.setScalar(6),this.scene.add(r),this.fx.push({o:r,t:.35,upd:a=>{r.material.opacity=a.t*3}})}else if(t==="pulse"||t==="heal"){let r=new qt(new oa(.9,1,48),new He({color:t==="heal"?6160266:4182435,transparent:!0,side:vn,depthWrite:!1}));r.rotation.x=-Math.PI/2,r.position.set(e,.1,s),this.scene.add(r);let a=t==="heal"?2:15;this.fx.push({o:r,t:.8,upd:o=>{let l=(.8-o.t)/.8;r.scale.setScalar(.5+l*a),r.material.opacity=1-l}})}}revealMark(t){let e=t.alive&&t.revealT>0&&t.team!==this.me.team;if(e&&!t.revealS){let n=document.createElement("canvas");n.width=n.height=64;let s=n.getContext("2d");s.fillStyle="#ff3b3b",s.beginPath(),s.moveTo(32,6),s.lineTo(56,32),s.lineTo(32,58),s.lineTo(8,32),s.closePath(),s.fill(),s.strokeStyle="#fff",s.lineWidth=4,s.stroke(),t.revealS=new Ii(new ui({map:new qn(n),depthTest:!1,transparent:!0})),t.revealS.scale.setScalar(.6),t.revealS.renderOrder=20,this.scene.add(t.revealS)}t.revealS&&(t.revealS.visible=e,e&&t.revealS.position.set(t.x,t.y+2.2,t.z))}aimPoint(t,e){let n=Math.sin(t.yaw)*Math.cos(t.pitch),s=Math.sin(t.pitch),r=Math.cos(t.yaw)*Math.cos(t.pitch),a=Math.min(e,pi(t.x,t.eye,t.z,n,s,r,e));return{x:t.x+n*(a-.4),y:t.eye+s*a,z:t.z+r*(a-.4),d:a,dx:n,dy:s,dz:r}}useAbility(t,e,n){if(!t.alive||this.phase==="end"||this.phase==="over"||t.abil[e]<=0)return!1;let s=we[t.agent][e];if(this.phase==="buy"&&s.id!=="heal")return!1;t.abil[e]--;let r={k:"ab",t:s.id,by:t.id,team:t.team};if(s.id==="dash")return t.dashT=.28,t.dashVx=Math.sin(t.yaw)*25,t.dashVz=Math.cos(t.yaw)*25,ue.ability("dash"),!0;if(s.id==="flash"){let a=this.aimPoint(t,30);r={...r,x:t.x,y:t.eye,z:t.z,vx:a.dx*22,vy:a.dy*22+3,vz:a.dz*22}}else if(s.id==="smoke"){let a=n||this.aimPoint(t,40);r={...r,x:a.x,y:0,z:a.z}}else if(s.id==="slow"){let a=this.aimPoint(t,30);r={...r,x:a.x,y:0,z:a.z}}else if(s.id==="pulse")r={...r,x:t.x,y:0,z:t.z};else if(s.id==="dart"){let a=this.aimPoint(t,60);r={...r,x:a.x,y:a.y,z:a.z}}else if(s.id==="heal"){let a=t;for(let o of this.actors){if(o===t||!o.alive||o.team!==t.team)continue;let l=o.x-t.x,c=o.z-t.z,h=Math.hypot(l,c);h<15&&(l*Math.sin(t.yaw)+c*Math.cos(t.yaw))/h>.95&&(a=o)}r={...r,to:a.id,x:a.x,y:0,z:a.z}}else if(s.id==="wall"){let a=this.aimPoint(t,20);r={...r,x:a.x,y:0,z:a.z,ax:Math.abs(Math.sin(t.yaw))>Math.abs(Math.cos(t.yaw))?"z":"x"}}return this.abilityEvent(r),this.net&&this.net.sendEvent(r),!0}abilityEvent(t){let e=this.actors.find(n=>n.id===t.by);if(ue.ability(t.t),t.t==="flash")this.projs.push({kind:"flash",x:t.x,y:t.y,z:t.z,vx:t.vx,vy:t.vy,vz:t.vz,t:.6,team:t.team,m:this.ball(16777215)});else if(t.t==="smoke")this.addSmoke(t.x,t.z);else if(t.t==="slow"){let n=new qt(new Ys(4,40),new He({color:9080050,transparent:!0,opacity:.5,depthWrite:!1}));n.rotation.x=-Math.PI/2,n.position.set(t.x,.05,t.z),this.scene.add(n),this.zones.push({x:t.x,z:t.z,r:4,t:6,team:t.team,m:n})}else if(t.t==="pulse"){this.addFx("pulse",t.x,0,t.z);for(let n of this.actors)n.alive&&n.team!==t.team&&Math.hypot(n.x-t.x,n.z-t.z)<15&&(n.revealT=Math.max(n.revealT,2))}else if(t.t==="dart"){this.addFx("pulse",t.x,0,t.z);for(let n of this.actors)if(n.alive&&n.team!==t.team&&Math.hypot(n.x-t.x,n.z-t.z)<14){let s=n.x-t.x,r=n.eye-t.y,a=n.z-t.z,o=Math.hypot(s,r,a);pi(t.x,t.y,t.z,s/o,r/o,a/o,o)>=o-.3&&(n.revealT=Math.max(n.revealT,3))}}else if(t.t==="heal"){let n=this.actors.find(s=>s.id===t.to);n&&(n.healT=3,this.addFx("heal",n.x,0,n.z))}else if(t.t==="wall"){let r=t.ax==="z"?{x0:t.x-.3,x1:t.x+.3,z0:t.z-3.2,z1:t.z+3.2,y0:0,y1:3}:{x0:t.x-3.2,x1:t.x+3.2,z0:t.z-.3,z1:t.z+.3,y0:0,y1:3};this.actors.some(o=>o.alive&&o.x>r.x0-Oi&&o.x<r.x1+Oi&&o.z>r.z0-Oi&&o.z<r.z1+Oi)&&(t.ax==="z"?(r.x0+=1.2,r.x1+=1.2):(r.z0+=1.2,r.z1+=1.2)),Wh(r);let a=new qt(new rn(r.x1-r.x0,3,r.z1-r.z0),new he({color:15913546,emissive:8019984,roughness:.35,metalness:.2,transparent:!0,opacity:.92}));a.position.set((r.x0+r.x1)/2,1.5,(r.z0+r.z1)/2),a.castShadow=!0,this.scene.add(a),this.walls.push({b:r,m:a,t:20,hp:400})}e&&e.isLocal&&t.t!=="heal"&&(this.vkick+=.03)}ball(t){let e=new qt(new Cn(.1,10,8),new He({color:t}));return this.scene.add(e),e}updateProjs(t){for(let e of this.projs){e.t-=t;let n=e.x+e.vx*t,s=e.y+e.vy*t,r=e.z+e.vz*t,a=Math.hypot(n-e.x,s-e.y,r-e.z);a>0&&pi(e.x,e.y,e.z,(n-e.x)/a,(s-e.y)/a,(r-e.z)/a,a)<a?(e.vx*=-.3,e.vz*=-.3,e.vy=Math.abs(e.vy)*.3):(e.x=n,e.y=Math.max(.1,s),e.z=r),e.vy-=14*t,e.m.position.set(e.x,e.y,e.z),e.t<=0&&(this.scene.remove(e.m),e.kind==="flash"&&this.popFlash(e))}this.projs=this.projs.filter(e=>e.t>0)}popFlash(t){this.addFx("flash",t.x,t.y,t.z);for(let e of this.actors){if(!e.alive)continue;let n=t.x-e.x,s=t.y-e.eye,r=t.z-e.z,a=Math.hypot(n,s,r);if(a>32||pi(e.x,e.eye,e.z,n/a,s/a,r/a,a)<a-.3||this.smokeBlocks(e.x,e.eye,e.z,t.x,t.y,t.z))continue;let o=(n*Math.sin(e.yaw)*Math.cos(e.pitch)+s*Math.sin(e.pitch)+r*Math.cos(e.yaw)*Math.cos(e.pitch))/a;o<0||(e.flashT=Math.max(e.flashT,.5+o*2*(1-a/40)))}}addSmoke(t,e){let n=new ge;n.position.set(t,0,e);let s=()=>new ui({map:V0(),color:10462920,transparent:!0,depthWrite:!1,opacity:.92});for(let r=0;r<26;r++){let a=new Ii(s()),o=Math.random()*Math.PI*2,l=Math.random()*3,c=.8+Math.random()*3.8;a.position.set(Math.cos(o)*l,c,Math.sin(o)*l),a.scale.setScalar(4.2+Math.random()*2.2),a.material.rotation=Math.random()*6,n.add(a)}this.scene.add(n),this.smokes.push({x:t,z:e,r:4.5,t:15,g:n})}smokeBlocks(t,e,n,s,r,a){for(let o of this.smokes){if(o.t>14.6)continue;let l=o.x,c=2.5,h=o.z,d=o.r,p=s-t,m=r-e,g=a-n,_=p*p+m*m+g*g,f=Math.max(0,Math.min(1,((l-t)*p+(c-e)*m+(h-n)*g)/(_||1))),u=t+p*f-l,v=(e+m*f-c)*.75,x=n+g*f-h;if(u*u+v*v+x*x<d*d)return!0}return!1}canSee(t,e){let n=e.x,s=e.z;for(let r of[e.eye-.05,e.y+1]){let a=n-t.x,o=r-t.eye,l=s-t.z,c=Math.hypot(a,o,l);if(pi(t.x,t.eye,t.z,a/c,o/c,l/c,c)>=c-.4&&!this.smokeBlocks(t.x,t.eye,t.z,n,r,s))return!0}return!1}teamIntel(t,e){this.intel[t]={x:e.x,z:e.z,t:this.time}}tryPlantDefuse(t,e){let n=this.core;if(!(this.phase!=="live"&&this.phase!=="planted"))if(t.team==="atk"&&t.carry&&n.state==="carried"){let s=vs(t.x,t.z);if(s!==1&&s!==2){t.isLocal&&this.say("설치 구역이 아니에요","A · B 사이트의 노란 선 안에서 설치");return}if(this.holding=t.isLocal,t.useProg=(t.useProg||0)+e,t.isLocal&&Math.floor(t.useProg*4)!==Math.floor((t.useProg-e)*4)&&ue.tick(),t.useProg>=Te.plantHold){t.useProg=0;let r=s===1?"A":"B",a={k:"plant",by:t.id,x:t.x,z:t.z,site:r};this.auth?this.doPlant(a):this.net&&this.net.sendEvent(a)}}else if(t.team==="def"&&n.state==="planted"&&Math.hypot(t.x-n.x,t.z-n.z)<1.8){if(this.holding=t.isLocal,t.useProg=Math.max(t.useProg||0,n.defHalf&&t.useProg<Te.defuseHold/2?Te.defuseHold/2:0)+e,t.useProg>=Te.defuseHold/2&&!n.defHalf&&(n.defHalf=!0),t.isLocal&&Math.floor(t.useProg*2)!==Math.floor((t.useProg-e)*2)&&ue.tick(),t.useProg>=Te.defuseHold){t.useProg=0;let s={k:"defuse",by:t.id};this.auth?this.doDefuse(s):this.net&&this.net.sendEvent(s)}}else t.useProg=0}doPlant(t){let e=this.core;if(e.state!=="carried")return;let n=this.actors.find(s=>s.id===t.by);n&&(n.carry=!1),e.state="planted",e.x=t.x,e.z=t.z,e.site=t.site,e.t=Te.plantT,e.holder=null,e.defHalf=!1,this.phase="planted",ue.plant(),this.say(`코어 설치됨 — ${t.site} 사이트`,this.me.team==="atk"?"40초 동안 지키세요":"해체하세요! (F 길게, 7초)"),n&&(n.isLocal||n.isBot)&&(n.credits=Math.min(Te.maxCredits,n.credits+300))}doDefuse(t){let e=this.core;e.state==="planted"&&(e.state="defused",this.endRound("def","코어 해체"))}updateCoreMesh(t){let e=this.core;if(!this.coreMesh){let s=new ge,r=new qt(new ms(.28,.34,.5,8),new he({color:2764598,metalness:.6,roughness:.4}));r.position.y=.25,s.add(r);let a=new qt(new Cn(.16,16,12),new he({color:16726843,emissive:16719904,emissiveIntensity:2}));a.position.y=.58,s.add(a),s.userData.light=a;let o=new ca(16724016,4,8);o.position.y=.8,s.add(o),s.userData.pl=o,this.scene.add(s),this.coreMesh=s}let n=this.coreMesh;if(n.visible=e.state==="planted"||e.state==="dropped",n.visible){n.position.set(e.x,0,e.z);let s=e.state==="planted"?Math.sin(this.time*(e.t<10?18:7))>0?2.5:.3:.6;n.userData.light.material.emissiveIntensity=s,n.userData.pl.intensity=s*2}}lerpRemote(t,e){let n=t.net,s=Math.min(1,e*14);t.x+=(n.x-t.x)*s,t.y+=(n.y-t.y)*s,t.z+=(n.z-t.z)*s;let r=n.yaw-t.yaw;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;t.yaw+=r*s,t.pitch+=(n.pitch-t.pitch)*s,t.speedNow=n.sp||0,t.crouch=n.cr||0}updateBot(t,e){if(!t.alive)return;let n=t.brain.update(e,this)||{};t.walk=!!n.walk,t.crouch+=((n.crouch?1:0)-t.crouch)*Math.min(1,e*8),t.dashT>0&&(t.vx=t.dashVx,t.vz=t.dashVz);let s=n.plant||n.defuse;if(Al(t,e,s?0:n.wx||0,s?0:n.wz||0,n.jump,{zoneLock:this.phase==="buy"?t.team==="atk"?3:4:null}),t.flashT>.3&&(n.fire=!1),t.scoped=!0,this.weaponTick(t,e,n.fire,n.reload),n.fire||(t.trigger=!1),n.use)if(n.useAt){let r=t.yaw,a=t.pitch;t.yaw=Math.atan2(n.useAt.x-t.x,n.useAt.z-t.z),this.useAbility(t,n.use,{x:n.useAt.x,z:n.useAt.z}),t.yaw=r,t.pitch=a}else this.useAbility(t,n.use);s?this.tryPlantDefuse(t,e):t.useProg=0,t.stepT=(t.stepT||0)-e*t.speedNow,t.onGround&&t.speedNow>4&&t.stepT<=0&&(t.stepT=2.2,t.team!==this.me.team&&this.soundAt(t,(r,a)=>ue.step(r*.8,a),28))}buy(t,e){if(this.phase!=="buy"||!t.alive)return"지금은 살 수 없어요";if(e.startsWith("w:")){let n=e.slice(2),s=Ke[n],r=t.guns[s.slot];if(r&&r.id===n)return"이미 가지고 있어요";let a=r&&r.bought?Ke[r.id].price:0;return t.credits+a<s.price?"크레딧이 모자라요":(t.credits+=a-s.price,t.guns[s.slot]={id:n,mag:s.mag,res:s.reserve,bought:this.round},t.slot=s.slot,null)}if(e.startsWith("a:")){let n=e.slice(2),s=ya[n];return t.armor>=s.ap?"이미 있어요":t.credits<s.price?"크레딧이 모자라요":(t.credits-=s.price,t.armor=s.ap,null)}if(e.startsWith("s:")){let n=e.slice(2),s=we[t.agent][n];return t.abil[n]>=s.max?"더 살 수 없어요":t.credits<s.price?"크레딧이 모자라요":(t.credits-=s.price,t.abil[n]++,null)}return"?"}render(t){let e=this.me,n=this.renderer;if(n.clear(),n.render(this.scene,this.cam),e.alive&&this.viewGun&&!this.scoped){let s=this.viewGun;this.vkick*=Math.pow(5e-4,t);let r=e.onGround?Math.min(1,e.speedNow/6):.2;this.vbob+=t*(6+e.speedNow);let a=e.reloadT>0?Math.sin(Math.min(1,(e.W.reload-e.reloadT)/e.W.reload)*Math.PI):0,o=this.aimHeld?1:0;s.position.set(.16-o*.16+Math.cos(this.vbob)*.012*r,-.17+o*.05-Math.abs(Math.sin(this.vbob))*.014*r-a*.25-e.crouch*.01,-.3+this.vkick*1.5),s.scale.setScalar(.8),s.rotation.set(this.vkick*3+a*.9,0,a*.3),this.flashT>0&&(this.flashT-=t,this.flashT<=0?s.userData.flash.visible=!1:s.userData.flash.rotation.z=Math.random()*6),n.clearDepth(),n.render(this.vscene,this.vcam)}}},Aa=null;function V0(){if(Aa)return Aa;let i=document.createElement("canvas");i.width=i.height=128;let t=i.getContext("2d"),e=t.createRadialGradient(64,64,4,64,64,62);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.55,"rgba(240,240,250,.75)"),e.addColorStop(1,"rgba(230,230,240,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);for(let n=0;n<30;n++)t.fillStyle=`rgba(200,200,215,${Math.random()*.15})`,t.beginPath(),t.arc(20+Math.random()*88,20+Math.random()*88,6+Math.random()*14,0,7),t.fill();return Aa=new qn(i),Aa}var ht={f:0,b:0,l:0,r:0,jump:!1,crouch:!1,walk:!1,fire:!1,aim:!1,reload:!1,q:!1,e:!1,use:!1,slot:0,dx:0,dy:0,jx:0,jy:0,fireEdge:!1},Yt={sens:1,fov:80,vol:.7,quality:"high",xcolor:"#5dffb0",invert:!1};try{Object.assign(Yt,JSON.parse(localStorage.getItem("rz_settings")||"{}"))}catch{}function bs(){try{localStorage.setItem("rz_settings",JSON.stringify(Yt))}catch{}}var se={};function su(i){se=i}var Ms=!1,G0=()=>Ms;function ru(i){let t=(e,n)=>{if(se.typing&&se.typing())return;let s=e.code;s==="KeyW"||s==="ArrowUp"?ht.f=n:s==="KeyS"||s==="ArrowDown"?ht.b=n:s==="KeyA"||s==="ArrowLeft"?ht.l=n:s==="KeyD"||s==="ArrowRight"?ht.r=n:s==="Space"?(n&&!e.repeat&&(ht.jump=!0),e.preventDefault()):s==="ControlLeft"||s==="KeyC"?ht.crouch=n:s==="ShiftLeft"?ht.walk=n:s==="KeyR"&&n?ht.reload=!0:s==="KeyQ"&&n&&!e.repeat?ht.q=!0:s==="KeyE"&&n&&!e.repeat?ht.e=!0:s==="KeyF"?ht.use=n:s==="Digit1"&&n?ht.slot=1:s==="Digit2"&&n?ht.slot=2:s==="KeyB"&&n&&!e.repeat?se.buy&&se.buy():s==="Tab"?(e.preventDefault(),se.board&&se.board(n)):s==="Escape"&&n&&se.esc&&se.esc()};addEventListener("keydown",e=>t(e,!0)),addEventListener("keyup",e=>t(e,!1)),addEventListener("blur",()=>{ht.f=ht.b=ht.l=ht.r=0,ht.fire=ht.aim=ht.use=ht.crouch=ht.walk=!1}),i.addEventListener("mousedown",e=>{var n;if(!Ms&&se.wantLock&&se.wantLock()){(n=i.requestPointerLock)==null||n.call(i);return}e.button===0&&(ht.fire=!0,ht.fireEdge=!0),e.button===2&&(ht.aim=!ht.aim||!Yt.toggleAim)}),addEventListener("mouseup",e=>{e.button===0&&(ht.fire=!1),e.button===2&&!Yt.toggleAim&&(ht.aim=!1)}),i.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("pointerlockchange",()=>{Ms=document.pointerLockElement===i,Ms||(ht.fire=!1,se.unlock&&se.unlock())}),addEventListener("mousemove",e=>{if(!Ms)return;let n=.0022*Yt.sens*(se.zoom?se.zoom():1);ht.dx+=e.movementX*n,ht.dy+=e.movementY*n*(Yt.invert?-1:1)}),addEventListener("wheel",e=>{Ms&&(ht.slot=e.deltaY>0?2:1)})}function au(i){let t=document.getElementById("touch");if(window.HP_PORTAL&&HP_PORTAL.device)return HP_PORTAL.isMobile();if(!("ontouchstart"in window)&&!navigator.maxTouchPoints)return!1;t.classList.remove("hidden"),document.body.classList.add("touch");let e=t.querySelector(".stick"),n=t.querySelector(".knob"),s=null,r=0,a=0,o=null,l=0,c=0,h=(p,m,g)=>{let _=t.querySelector(p);_&&(_.addEventListener("touchstart",f=>{f.preventDefault(),f.stopPropagation(),_.classList.add("on"),m()},{passive:!1}),_.addEventListener("touchend",f=>{f.preventDefault(),_.classList.remove("on"),g&&g()},{passive:!1}))};h("[data-t=fire]",()=>{ht.fire=!0,ht.fireEdge=!0},()=>{ht.fire=!1}),h("[data-t=fire2]",()=>{ht.fire=!0,ht.fireEdge=!0},()=>{ht.fire=!1}),h("[data-t=aim]",()=>{ht.aim=!ht.aim}),h("[data-t=jump]",()=>{ht.jump=!0}),h("[data-t=crouch]",()=>{ht.crouch=!ht.crouch}),h("[data-t=reload]",()=>{ht.reload=!0}),h("[data-t=q]",()=>{ht.q=!0}),h("[data-t=e]",()=>{ht.e=!0}),h("[data-t=use]",()=>{ht.use=!0},()=>{ht.use=!1}),h("[data-t=buy]",()=>se.buy&&se.buy()),h("[data-t=swap]",()=>{ht.slot=se.curSlot&&se.curSlot()===1?2:1}),h("[data-t=menu]",()=>se.esc&&se.esc()),h("[data-t=board]",()=>se.board&&se.board(!0),()=>se.board&&se.board(!1)),i.addEventListener("touchstart",p=>{for(let m of p.changedTouches)m.clientX<innerWidth*.4&&s===null?(s=m.identifier,r=m.clientX,a=m.clientY,e.style.left=r+"px",e.style.top=a+"px",e.classList.add("on")):o===null&&(o=m.identifier,l=m.clientX,c=m.clientY)},{passive:!0}),i.addEventListener("touchmove",p=>{for(let m of p.changedTouches)if(m.identifier===s){let g=(m.clientX-r)/50,_=(m.clientY-a)/50,f=Math.hypot(g,_);f>1&&(g/=f,_/=f),ht.jx=g,ht.jy=_,n.style.transform=`translate(${g*40}px,${_*40}px)`}else if(m.identifier===o){let g=.006*Yt.sens*(se.zoom?se.zoom():1);ht.dx+=(m.clientX-l)*g,ht.dy+=(m.clientY-c)*g,l=m.clientX,c=m.clientY}},{passive:!0});let d=p=>{for(let m of p.changedTouches)m.identifier===s&&(s=null,ht.jx=ht.jy=0,n.style.transform="",e.classList.remove("on")),m.identifier===o&&(o=null)};return i.addEventListener("touchend",d),i.addEventListener("touchcancel",d),!0}var Qe=i=>document.querySelector(i),Ce=i=>String(i??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Dl={},mi=(i,t)=>{if(Dl[i]!==t){Dl[i]=t;let e=Qe(i);e&&(e.innerHTML=t)}};function ou(){Dl={}}var Ll=i=>(i=Math.max(0,Math.ceil(i)),`${Math.floor(i/60)}:${String(i%60).padStart(2,"0")}`),Il=null;function W0(){if(Il)return Il;let i=4,t=document.createElement("canvas");t.width=Jt*i,t.height=Me*i;let e=t.getContext("2d");for(let n=0;n<Me;n++)for(let s=0;s<Jt;s++){let r=Yn(s,n);e.fillStyle=r>=6?"rgba(0,0,0,0)":r>0?"#5b6672":"#9aa6b2",e.fillRect(s*i,n*i,i,i)}e.fillStyle="rgba(255,210,58,.35)";for(let n=0;n<Me;n++)for(let s=0;s<Jt;s++){let r=fi.ZONE[n*Jt+s];(r===1||r===2)&&e.fillRect(s*i,n*i,i,i)}e.font="900 22px sans-serif",e.fillStyle="#ffd23a",e.textAlign="center",e.textBaseline="middle";for(let n of Object.values($n))e.fillText(n.name,n.x/ft*i,n.z/ft*i);return Il=t,t}function lu(i){let t=Qe("#minimap");if(!t)return;let e=t.getContext("2d"),n=t.width,s=t.height,r=i.me,a=i.alivePov();e.clearRect(0,0,n,s),e.save();let o=2.6;e.translate(n/2,s/2),e.rotate(a.yaw+Math.PI),e.scale(o/(4/ft)/2*2,o/(4/ft)/2*2);let l=o*ft/4;e.setTransform(1,0,0,1,0,0),e.translate(n/2,s/2),e.rotate(a.yaw+Math.PI),e.scale(l,l),e.drawImage(W0(),-a.x/ft*4,-a.z/ft*4);let c=(d,p)=>[(d-a.x)/ft*4,(p-a.z)/ft*4];e.fillStyle="rgba(160,165,200,.75)";for(let d of i.smokes){let[p,m]=c(d.x,d.z);e.beginPath(),e.arc(p,m,d.r/ft*4,0,7),e.fill()}let h=i.core;if(h.state==="planted"||h.state==="dropped"&&r.team==="atk"){let[d,p]=c(h.x,h.z);e.fillStyle="#ff3b3b",e.fillRect(d-4,p-4,8,8)}for(let d of i.actors){if(!d.alive)continue;let p=d.team===r.team;if(!p&&!(d.revealT>0)&&!d.seenByMyTeam)continue;let[m,g]=c(d.x,d.z);e.save(),e.translate(m,g),e.rotate(-d.yaw+Math.PI),e.fillStyle=d===r?"#ffffff":p?Ln[d.team].color:"#ff3b3b",e.beginPath(),e.moveTo(0,-7),e.lineTo(5,5),e.lineTo(-5,5),e.closePath(),e.fill(),e.restore(),p&&d.carry&&(e.fillStyle="#ff3b3b",e.fillRect(m+4,g-9,5,5))}e.restore()}function cu(i,t){let e=i.me,n=i.alivePov(),s=i.score.red,r=i.score.blue,a=e.grp,o=a==="red"?"blue":"red",l=e.team,c=l==="atk"?"def":"atk",h=y=>i.actors.filter(w=>w.team===y).sort((w,z)=>w.id<z.id?-1:1).map(w=>`<i class="ag ${w.alive?"":"dead"}" style="--c:${we[w.agent].color}" title="${Ce(w.name)}">${Ce(we[w.agent].name[0])}</i>`).join(""),d=i.core,p=i.phase==="planted"?`<b class="core">◆ ${Math.ceil(d.t)}</b>`:i.phase==="buy"?`<b>${Ll(i.timer)}</b><small>구매</small>`:i.phase==="end"?`<b>${Ll(i.timer)}</b>`:`<b>${Ll(i.timer)}</b>`;mi("#top",`<div class="side me"><div class="icons">${h(l)}</div><b class="sc" style="color:${Ln[l].color}">${i.score[a]}</b></div>
    <div class="clock">${p}<small>라운드 ${i.round}</small></div>
    <div class="side op"><b class="sc" style="color:${Ln[c].color}">${i.score[o]}</b><div class="icons">${h(c)}</div></div>`),mi("#hp",`<div class="hpv"><b>${Math.max(0,Math.ceil(n.hp))}</b><small>체력</small></div><div class="hpv ar"><b>${n.armor}</b><small>방어구</small></div><div class="hpbar"><i style="width:${Math.max(0,n.hp)}%"></i></div>`);let m=n.gun,g=Ke[m.id];mi("#ammo",`<small>${Ce(g.kind)} · ${Ce(g.name)}</small><div><b>${m.mag}</b><span>/ ${m.res}</span></div>${n.reloadT>0?"<em>장전 중…</em>":m.mag===0?'<em class="warn">R 장전</em>':""}<div class="cr">◈ ${n.credits.toLocaleString()}</div>`);let _=we[n.agent];mi("#abil",["q","e"].map(y=>`<div class="ab ${n.abil[y]?"":"off"}"><span class="key">${y.toUpperCase()}</span><i>${_[y].icon}</i><small>${Ce(_[y].name)}</small><b>${"●".repeat(n.abil[y])}${"○".repeat(Math.max(0,_[y].max-n.abil[y]))}</b></div>`).join("")+`<div class="agname" style="color:${_.color}">${Ce(_.name)} <small>${Ce(_.role)}</small></div>`),mi("#feed",i.feed.slice(-6).map(y=>{var w,z;return`<div><b style="color:${((w=Ln[y.byTeam])==null?void 0:w.color)||"#ccc"}">${Ce(y.by)}</b><span>${Ce(y.w)}${y.hs?" 🎯":""}</span><b style="color:${((z=Ln[y.toTeam])==null?void 0:z.color)||"#ccc"}">${Ce(y.to)}</b></div>`}).join(""));let f=i.msg;mi("#msg",f?`<b>${Ce(f.big)}</b><small>${Ce(f.small||"")}</small>`:""),Qe("#msg").style.opacity=f?Math.min(1,f.t*2):0;let u=e.useProg||0,v=e.team==="atk"?Te.plantHold:Te.defuseHold;Qe("#prog").style.display=u>0?"block":"none",u>0&&mi("#prog",`<small>${e.team==="atk"?"코어 설치 중":"코어 해체 중"}</small><div><i style="width:${Math.min(100,u/v*100)}%"></i></div>`);let x="";e.alive?i.phase==="buy"?x="B: 상점 · 시작 전에 무기를 사세요":e.carry?x="◆ 코어를 들고 있어요 — 사이트에서 F 길게":e.team==="def"&&d.state==="planted"&&Math.hypot(e.x-d.x,e.z-d.z)<1.8&&(x="F 길게: 코어 해체 (7초)"):x=i.specOf?`관전 중: ${Ce(i.specOf.name)} · 클릭으로 바꾸기`:"다음 라운드를 기다려요",mi("#hint",x);let S=i.hitMark,A=Qe("#xhair");A.className=(S&&S.t>0?"hit"+(S.head?" head":"")+(S.kill?" kill":""):"")+(i.scoped?" scoped":""),S&&(S.t-=1/60,S.t<=0&&(i.hitMark=null));let T=e.alive?i.spreadOf(e):0;A.style.setProperty("--gap",`${4+Math.min(40,T*600)}px`);let R=Qe("#flash");R.style.opacity=Math.min(1,n.flashT*.9),Qe("#scope").style.display=i.scoped&&e.alive?"block":"none";let D=Qe("#hurt");i.hurtT>0?(i.hurtT-=1/60,D.style.opacity=Math.min(1,i.hurtT*1.5),i.hurtDir!==null&&(D.style.transform=`translate(-50%,-50%) rotate(${-(i.hurtDir-e.yaw)}rad)`)):D.style.opacity=0,Qe("#vign").style.opacity=e.alive&&e.hp<35?.6-e.hp/70:0,i.over&&!Qe("#over").dataset.shown&&X0(i)}function X0(i){let t=Qe("#over");t.dataset.shown="1",t.classList.remove("hidden"),t.innerHTML=`<div class="card"><h1 class="${i.over.win?"win":"lose"}">${i.over.win?"승리!":"패배"}</h1><p>${i.score[i.me.grp]} : ${i.score[i.me.grp==="red"?"blue":"red"]}</p>${hu(i)}<div class="row"><button id="again" class="primary">다시 하기</button><button id="tomenu">메인 메뉴</button></div></div>`}function hu(i){let t=e=>i.actors.filter(n=>n.grp===e).sort((n,s)=>s.kills-n.kills).map(n=>`<tr class="${n===i.me?"me":""} ${n.alive?"":"dead"}"><td><i class="ag" style="--c:${we[n.agent].color}">${Ce(we[n.agent].name[0])}</i> ${Ce(n.name)}</td><td>${n.kills}</td><td>${n.deaths}</td><td>◈ ${n.team===i.me.team?n.credits.toLocaleString():"—"}</td></tr>`).join("");return`<table class="sb"><tr><th>${Ln[i.me.team].name} (우리)</th><th>처치</th><th>죽음</th><th>크레딧</th></tr>${t(i.me.grp)}
  <tr><th>${Ln[i.me.team==="atk"?"def":"atk"].name} (상대)</th><th></th><th></th><th></th></tr>${t(i.me.grp==="red"?"blue":"red")}</table>`}function uu(i,t){let e=Qe("#board");e.classList.toggle("hidden",!t),t&&(e.innerHTML=`<div class="card">${hu(i)}</div>`)}function Ul(i,t){let e=i.me,n=we[e.agent],s=Qe("#shop");s.innerHTML=`<div class="card shop"><div class="shop-h"><h2>상점</h2><b class="cr">◈ ${e.credits.toLocaleString()}</b><small>구매 시간 ${Math.ceil(i.timer)}초 · B 또는 Esc 로 닫기</small></div>
  <div class="shop-grid">${Yh.map(([r,a])=>`<div class="col"><h3>${r}</h3>${a.map(o=>{var h;let l=Ke[o],c=((h=e.guns[l.slot])==null?void 0:h.id)===o;return`<button data-b="w:${o}" class="${c?"own":""} ${e.credits<l.price&&!c?"poor":""}"><b>${l.name}</b><small>${l.kind} · 머리 ${l.dmg[0]} / 몸 ${l.dmg[1]}</small><span>◈ ${l.price}</span></button>`}).join("")}</div>`).join("")}
  <div class="col"><h3>방어구</h3>${Object.entries(ya).map(([r,a])=>`<button data-b="a:${r}" class="${e.armor>=a.ap?"own":""}"><b>${a.name}</b><small>피해 흡수 ${a.ap}</small><span>◈ ${a.price}</span></button>`).join("")}
  <h3>기술 — ${n.name}</h3>${["q","e"].map(r=>`<button data-b="s:${r}" class="${e.abil[r]>=n[r].max?"own":""}"><b>${n[r].icon} ${n[r].name} <em>${e.abil[r]}/${n[r].max}</em></b><small>${n[r].desc}</small><span>◈ ${n[r].price}</span></button>`).join("")}</div></div>
  <p class="tip" id="shop-msg"></p></div>`,s.querySelectorAll("[data-b]").forEach(r=>r.onclick=()=>{let a=t(r.dataset.b);a?Qe("#shop-msg").textContent=a:Ul(i,t)})}Ta();var q0=14,gn=i=>Math.round(i*10)/10,Ss=i=>Math.round(i*100)/100,Ca=class{constructor(t,e){this.R=t,this.opts=e,this.host=!!e.host,this.seq=0,this.ring=[],this.seen={},this.G=null,this.myPeer=null,this.lastPub=0,this.lobby={n:e.name,g:e.grp,ag:e.agent,host:this.host?1:0,st:"lobby"},this.unsub=t.onPeers(n=>this.onPeers(n)),this.pub(this.lobby)}me(){return this.R.peers().find(t=>t.sameTab)}peers(){return this.R.peers().filter(t=>!t.sameTab&&t.kind==="viewer")}hostPeer(){return this.R.peers().find(t=>t.presence&&t.presence.host===1&&!t.sameTab)}pub(t){this.R.presence(t).catch(()=>{})}setLobby(t){Object.assign(this.lobby,t),this.pub(t)}leave(){try{this.unsub()}catch{}this.R.leave().catch(()=>{})}push(t){t.s=++this.seq,this.ring.push(t),this.ring.length>q0&&this.ring.shift(),this.dirty=!0}sendEvent(t){this.push({...t})}sendHit(t,e,n,s,r){this.push({k:"hit",to:t.id,d:e,p:n,by:s?s.id:null,w:r})}sendKill(t,e,n,s){this.push({k:"kill",to:t.id,by:e?e.id:null,w:n,hs:s?1:0})}attach(t){this.G=t,t.net=this,t.onShot=e=>{(e.isLocal||e.isBot&&t.auth)&&(!this.shotCD||t.time-this.shotCD>.05)&&(this.shotCD=t.time,this.push({k:"shot",by:e.id,w:e.gun.id}))},this.myPeer=(this.me()||{}).peer||t.me.id}tick(t){let e=this.G;if(!e||t-this.lastPub<66&&!this.dirty)return;this.lastPub=t,this.dirty=!1;let n=e.me,s={st:"game",g:n.grp,ag:n.agent,n:n.name,p:[gn(n.x),Ss(n.y),gn(n.z),Ss(n.yaw),Ss(n.pitch),gn(n.speedNow),gn(n.crouch),n.alive?1:0,Math.round(n.hp),n.armor,n.gun.id],ev:this.ring};if(this.host){let r=e.core;s.mt={r:e.round,ph:e.phase,tm:gn(e.timer),sc:[e.score.red,e.score.blue],c:[r.state,gn(r.x),gn(r.z),r.site,gn(r.t),r.holder],w:e.lastWin?[e.lastWin.grp,e.lastWin.why]:null,ov:e.over?e.over.grp:null},s.bots=e.actors.filter(a=>a.isBot).map(a=>[a.id,a.name,a.grp,a.agent,gn(a.x),Ss(a.y),gn(a.z),Ss(a.yaw),Ss(a.pitch),gn(a.speedNow),gn(a.crouch),a.alive?1:0,Math.round(a.hp),a.armor,a.gun.id])}this.pub(s)}onPeers(t){var s,r,a;this.opts.onLobby&&this.opts.onLobby(this);let e=this.G;if(!e)return;let n=this.peers();for(let o of e.actors.filter(l=>l.remote&&l.human))n.some(l=>l.peer===o.id)||(e.removeActor(o),this.host&&e.fillBots());for(let o of n){let l=o.presence||{};if(l.st!=="game")continue;let c=e.actors.find(h=>h.id===o.peer);if(!c){if(this.host){let h=e.actors.find(d=>d.isBot&&d.grp===l.g);h&&e.removeActor(h)}c=e.addActor({id:o.peer,name:l.n||"플레이어",grp:l.g||"blue",agent:l.ag||"blaze"}),c.remote=!0,c.human=!0}if(l.p){let h=l.p;c.net={x:h[0],y:h[1],z:h[2],yaw:h[3],pitch:h[4],sp:h[5],cr:h[6]};let d=!!h[7];!d&&c.alive&&c.die(),d&&!c.alive&&(c.alive=!0,c.model.visible=!0,c.x=h[0],c.z=h[2]),c.alive=d,c.hp=h[8],c.armor=h[9],((s=c.guns[1])==null?void 0:s.id)!==h[10]&&((r=c.guns[2])==null?void 0:r.id)!==h[10]&&(c.guns[1]={id:h[10],mag:30,res:0}),c.slot=((a=c.guns[1])==null?void 0:a.id)===h[10]?1:2}l.ag&&l.ag!==c.agent&&c.setAgent(l.ag),this.readEvents(o.peer,l.ev),!this.host&&l.host===1&&this.readHost(l)}}readEvents(t,e){if(!Array.isArray(e))return;let n=this.G,s=this.seen[t]||0,r=s;for(let a of e)!a||typeof a.s!="number"||a.s<=s||(r=Math.max(r,a.s),this.seen[t]!==void 0&&this.apply(a,t));this.seen[t]=r}apply(t,e){let n=this.G,s=r=>{let a=n.actors.find(o=>o.id===r);return a&&(a.isLocal||a.isBot&&n.auth)?a:null};if(t.k==="hit"){let r=s(t.to);r&&n.applyDamage(r,Math.min(260,Math.max(0,Number(t.d)||0)),t.p,t.by,t.w)}else if(t.k==="kill"){if(n.onKill(t.to,t.by,t.w,!!t.hs),n.auth){let r=n.actors.find(a=>a.id===t.to);r&&n.core.holder===r.id&&n.core.state==="carried"&&(n.core.state="dropped",n.core.x=r.x,n.core.z=r.z,n.core.holder=null)}}else if(t.k==="ab")n.abilityEvent(t);else if(t.k==="shot"){let r=n.actors.find(a=>a.id===t.by);r&&r.alive&&(n.soundAt(r,(a,o)=>n.remoteShotSound(t.w,a,o,r),120),n.addFx("muzzle",r.x+Math.sin(r.yaw)*.8,r.eye-.15,r.z+Math.cos(r.yaw)*.8))}else if(t.k==="plant"&&n.auth){let r=n.actors.find(a=>a.id===t.by);r&&n.core.holder===r.id&&n.doPlant(t)}else t.k==="defuse"&&n.auth&&n.doDefuse(t)}readHost(t){var o;let e=this.G,n=t.mt;if(Array.isArray(t.bots)){let l=new Set;for(let c of t.bots){let[h,d,p,m,g,_,f,u,v,x,S,A,T,R,D]=c;l.add(h);let y=e.actors.find(w=>w.id===h);y||(y=e.addActor({id:h,name:d,grp:p,agent:m}),y.remote=!0,y.x=g,y.z=f),y.net={x:g,y:_,z:f,yaw:u,pitch:v,sp:x,cr:S},!A&&y.alive&&y.die(),A&&!y.alive&&(y.alive=!0,y.model.visible=!0,y.x=g,y.z=f),y.alive=!!A,y.hp=T,y.armor=R,y.guns[1]={id:D,mag:30,res:0},y.slot=1}for(let c of e.actors.filter(h=>h.remote&&!h.human))l.has(c.id)||e.removeActor(c)}if(!n)return;n.r!==e.round&&(e.round=n.r,e.startRound(!1));let s=e.phase;e.phase=n.ph,e.timer=n.tm,e.score.red=n.sc[0],e.score.blue=n.sc[1];let r=e.core,a=n.c;if(a){let l=r.state;r.state=a[0],r.x=a[1],r.z=a[2],r.site=a[3],r.t=a[4],r.holder=a[5],e.me.carry=r.holder===e.me.id&&r.state==="carried",l!=="planted"&&r.state==="planted"&&e.say(`코어 설치됨 — ${r.site} 사이트`,e.me.team==="atk"?"40초 동안 지키세요":"해체하세요! (F 길게, 7초)")}s!=="end"&&n.ph==="end"&&n.w&&e.endRound(((o=e.actors.find(l=>l.grp===n.w[0]))==null?void 0:o.team)||"atk",n.w[1]),s==="buy"&&n.ph==="live"&&e.say("전투 시작!",""),n.ov&&!e.over&&(e.over={win:n.ov===e.me.grp,grp:n.ov})}};var _t=i=>document.querySelector(i),ws=i=>{for(let t of document.querySelectorAll(".screen"))t.classList.toggle("hidden",t.id!==i)},an=_t("#view"),Ft=null,Kt=null,Pa=null,La=0,Ol=0,gi=!1,Es=!1,Nl=0,Zt={name:"",agent:"blaze",grp:"red",diff:"normal"};try{Object.assign(Zt,JSON.parse(localStorage.getItem("rz_me")||"{}"))}catch{}var zi=()=>{try{localStorage.setItem("rz_me",JSON.stringify(Zt))}catch{}};Zt.name||(Zt.name=(window.HP_I18N&&HP_I18N.lang==="en"?"Agent":"요원")+Math.floor(100+Math.random()*900));function Bi(){ws("menu"),_t("#nick").value=Zt.name,_t("#nick").oninput=t=>{Zt.name=t.target.value.trim().slice(0,12)||Zt.name,zi()},_t("#m-solo").onclick=()=>$0("solo"),_t("#m-make").onclick=()=>Z0(),_t("#m-join").onclick=()=>J0(_t("#code").value.trim().toLowerCase()),_t("#m-set").onclick=()=>_u(Bi),_t("#m-help").onclick=()=>{ws("help"),_t("#help-back").onclick=Bi};let i=_t("#mp-note");Pa?(i.textContent="친구와 같은 방 코드로 들어오면 함께 싸워요 (빈자리는 봇이 채워요)",_t("#m-make").disabled=!1,_t("#m-join").disabled=!1):(i.textContent="함께 하기는 이 페이지를 공유받아 로그인한 사람끼리 됩니다 · 지금은 봇과 연습할 수 있어요",_t("#m-make").disabled=!0,_t("#m-join").disabled=!0)}function du(i){return Object.values(we).map(t=>`<button class="agent ${t.id===i?"sel":""}" data-ag="${t.id}" style="--c:${t.color}"><div class="face">${Y0(t)}</div><b>${t.name}</b><small>${t.role} · ${t.desc}</small>
  <div class="sk"><span><i>Q</i>${t.q.icon} ${t.q.name}</span><span><i>E</i>${t.e.icon} ${t.e.name}</span></div></button>`).join("")}function Y0(i){return`<svg viewBox="0 0 100 100"><defs><linearGradient id="g${i.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${i.color}"/><stop offset="1" stop-color="#0b1016"/></linearGradient></defs>
  <rect width="100" height="100" fill="url(#g${i.id})"/><path d="M20 100 C22 70 34 62 50 62 C66 62 78 70 80 100Z" fill="#1b232c"/><path d="M30 100 L36 72 L64 72 L70 100Z" fill="${i.color}" opacity=".55"/>
  <circle cx="50" cy="42" r="19" fill="#d9ab85"/><path d="M29 40 C29 22 71 22 71 40 L71 46 L29 46Z" fill="#2c3640"/><rect x="31" y="38" width="38" height="9" rx="4" fill="#0b0f14"/><rect x="33" y="40" width="34" height="4" rx="2" fill="${i.color}"/></svg>`}function $0(i){ws("agents");let t=()=>{_t("#ag-list").innerHTML=du(Zt.agent),document.querySelectorAll("[data-ag]").forEach(e=>e.onclick=()=>{Zt.agent=e.dataset.ag,zi(),t()}),_t("#ag-opts").innerHTML=`<div class="row"><span>시작 팀</span>${[["red","공격 먼저"],["blue","수비 먼저"]].map(([e,n])=>`<button data-grp="${e}" class="${Zt.grp===e?"sel":""}">${n}</button>`).join("")}</div>
    <div class="row"><span>봇 실력</span>${[["easy","쉬움"],["normal","보통"],["hard","어려움"]].map(([e,n])=>`<button data-diff="${e}" class="${Zt.diff===e?"sel":""}">${n}</button>`).join("")}</div>`,document.querySelectorAll("[data-grp]").forEach(e=>e.onclick=()=>{Zt.grp=e.dataset.grp,zi(),t()}),document.querySelectorAll("[data-diff]").forEach(e=>e.onclick=()=>{Zt.diff=e.dataset.diff,zi(),t()})};t(),_t("#ag-go").onclick=()=>tr({mode:"solo"}),_t("#ag-back").onclick=Bi}async function Z0(){let i=Math.random().toString(36).slice(2,6);await fu(i,!0)}async function J0(i){if(!/^[a-z0-9]{3,12}$/.test(i)){_t("#mp-note").textContent="방 코드를 확인해 주세요 (영문 소문자 · 숫자)";return}await fu(i,!1)}async function fu(i,t){let e;try{e=await Pa.join("rz-"+i)}catch(n){_t("#mp-note").textContent="방에 들어가지 못했어요 ("+(n.code||n.message)+")";return}Kt=new Ca(e,{host:t,name:Zt.name,grp:Zt.grp,agent:Zt.agent,onLobby:()=>Qs(i)}),ws("lobby"),Qs(i)}function Qs(i){if(!Kt||Ft){Kt&&Ft&&Kt.host;return}let t=Kt.me(),e=Kt.R.peers().filter(a=>a.kind==="viewer"),n=e.find(a=>a.presence&&a.presence.host===1);if(!Kt.host&&n&&n.presence.st==="game"){tr({mode:"client"});return}let s=a=>e.filter(o=>(o.sameTab?Zt.grp:o.presence.g)===a).map(o=>{var c,h;let l=o.sameTab?{n:Zt.name,ag:Zt.agent,host:Kt.host?1:0}:o.presence;return`<li style="--c:${((c=we[l.ag])==null?void 0:c.color)||"#888"}">${Ce(l.n||"?")}${o.sameTab?" <em>나</em>":""}${l.host===1?" 👑":""}<small>${Ce(((h=we[l.ag])==null?void 0:h.name)||"")}</small></li>`}).join("")||'<li class="muted">비어 있음 (봇이 채워요)</li>';_t("#lobby-body").innerHTML=`<h2>방 코드 <b class="code">${Ce(i)}</b></h2><p class="muted">친구에게 이 코드를 알려 주세요 · ${e.length}명 들어옴</p>
  <div class="teams"><div><h3 style="color:#ff6a3d">🔥 레드 (공격 먼저)</h3><ul>${s("red")}</ul><button data-grp="red" class="${Zt.grp==="red"?"sel":""}">레드로</button></div>
  <div><h3 style="color:#36d1c4">🛡️ 블루 (수비 먼저)</h3><ul>${s("blue")}</ul><button data-grp="blue" class="${Zt.grp==="blue"?"sel":""}">블루로</button></div></div>
  <h3>내 요원</h3><div class="agents mini">${du(Zt.agent)}</div>
  <div class="row">${Kt.host?`<span>봇 실력</span>${[["easy","쉬움"],["normal","보통"],["hard","어려움"]].map(([a,o])=>`<button data-diff="${a}" class="${Zt.diff===a?"sel":""}">${o}</button>`).join("")}`:""}</div>
  <div class="row">${Kt.host?'<button id="lb-start" class="primary big">▶ 시작</button>':'<p class="muted">방장이 시작하기를 기다리는 중…</p>'}<button id="lb-leave">나가기</button></div>`,document.querySelectorAll("#lobby-body [data-grp]").forEach(a=>a.onclick=()=>{Zt.grp=a.dataset.grp,zi(),Kt.setLobby({g:Zt.grp}),Qs(i)}),document.querySelectorAll("#lobby-body [data-ag]").forEach(a=>a.onclick=()=>{Zt.agent=a.dataset.ag,zi(),Kt.setLobby({ag:Zt.agent}),Qs(i)}),document.querySelectorAll("#lobby-body [data-diff]").forEach(a=>a.onclick=()=>{Zt.diff=a.dataset.diff,zi(),Qs(i)});let r=_t("#lb-start");r&&(r.onclick=()=>tr({mode:"host"})),_t("#lb-leave").onclick=()=>{Kt.leave(),Kt=null,Bi()}}function tr({mode:i}){Pl(),wa(Yt.vol),pu(),ws("play"),ou();let t=Kt&&(Kt.me()||{}).peer||"me";Ft=new Ra(an,{mode:i,me:{name:Zt.name,grp:Zt.grp,agent:Zt.agent},myId:t,diff:Zt.diff,fov:Yt.fov,quality:Yt.quality,bots:i!=="client"}),document.documentElement.style.setProperty("--xc",Yt.xcolor),Kt&&(Kt.attach(Ft),i==="host"&&(Kt.setLobby({st:"game"}),Kt.onPeers({}))),_t("#over").classList.add("hidden"),delete _t("#over").dataset.shown,gi=!1,Ol=performance.now(),Es||_t("#click").classList.remove("hidden"),cancelAnimationFrame(La),La=requestAnimationFrame(mu)}function pu(){Ft&&(Ft.dispose(),Ft=null),cancelAnimationFrame(La)}function mu(i){La=requestAnimationFrame(mu);let t=Math.min(.05,(i-Ol)/1e3);if(Ol=i,!Ft)return;Nl++;let e=!_t("#shop").classList.contains("hidden");if(e&&Ft.phase!=="buy"&&Ia(),(!gi||Kt)&&Ft.update(t,gi||e?{...ht,f:0,b:0,l:0,r:0,fire:!1,dx:0,dy:0,jx:0,jy:0}:ht),(gi||e)&&(ht.dx=ht.dy=0),Ft.render(t),cu(Ft,ht),Nl%2===0&&lu(Ft),Kt&&Kt.tick(i),e&&Nl%15===0){let s=_t("#shop .cr");s&&(s.textContent="◈ "+Ft.me.credits.toLocaleString())}let n=_t("#again");n&&!n.onclick&&(n.onclick=()=>{Kt&&!Kt.host||tr({mode:Kt?"host":"solo"})},_t("#tomenu").onclick=gu)}function gu(){var i;pu(),Kt&&(Kt.leave(),Kt=null),(i=document.exitPointerLock)==null||i.call(document),_t("#pause").classList.add("hidden"),Ia(),Bi()}function K0(){var i;!Ft||Ft.phase!=="buy"||!Ft.me.alive||((i=document.exitPointerLock)==null||i.call(document),_t("#shop").classList.remove("hidden"),Ul(Ft,t=>{let e=Ft.buy(Ft.me,t);return e||(Ft.setViewGun(),Promise.resolve().then(()=>(Ta(),iu)).then(n=>n.sfx.buy())),e}))}function Ia(){_t("#shop").classList.add("hidden")}function er(i){gi=i,_t("#pause").classList.toggle("hidden",!i),i&&(_t("#pause").innerHTML=`<div class="card"><h2>일시정지</h2>${Kt?'<p class="muted">함께 하는 중에는 게임이 멈추지 않아요</p>':""}<div class="col"><button id="p-resume" class="primary big">계속하기</button><button id="p-set">설정</button><button id="p-quit" class="danger">나가기</button></div></div>`,_t("#p-resume").onclick=()=>{var t;er(!1),Es||(t=an.requestPointerLock)==null||t.call(an)},_t("#p-set").onclick=()=>_u(()=>er(!0)),_t("#p-quit").onclick=gu)}function _u(i){let t=Ft?_t("#pause"):null,e=`<div class="card"><h2>설정</h2>
  <label>마우스 감도 <input id="s-sens" type="range" min="0.2" max="3" step="0.05" value="${Yt.sens}"><b>${Yt.sens.toFixed(2)}</b></label>
  <label>시야각 (FOV) <input id="s-fov" type="range" min="65" max="105" step="1" value="${Yt.fov}"><b>${Yt.fov}</b></label>
  <label>소리 <input id="s-vol" type="range" min="0" max="1" step="0.05" value="${Yt.vol}"><b>${Math.round(Yt.vol*100)}</b></label>
  <label>그래픽 <select id="s-q"><option value="high" ${Yt.quality==="high"?"selected":""}>높음 (그림자)</option><option value="low" ${Yt.quality==="low"?"selected":""}>낮음 (빠름)</option></select></label>
  <label>십자선 색 <input id="s-xc" type="color" value="${Yt.xcolor}"></label>
  <label><input id="s-inv" type="checkbox" ${Yt.invert?"checked":""}> 마우스 위아래 반전</label>
  <label><input id="s-tog" type="checkbox" ${Yt.toggleAim?"checked":""}> 조준(우클릭) 눌러서 켜고 끄기</label>
  <p class="muted">그래픽은 다음 판부터 바뀌어요.</p>
  <button id="s-back" class="primary">확인</button></div>`;t?t.innerHTML=e:(ws("setscr"),_t("#setscr").innerHTML=e);let n=(s,r,a=o=>o)=>{let o=_t(s);o.oninput=()=>{Yt[r]=a(Number(o.value)),o.nextElementSibling.textContent=r==="vol"?Math.round(Yt[r]*100):r==="sens"?Yt[r].toFixed(2):Yt[r],bs(),r==="vol"&&wa(Yt.vol),r==="fov"&&Ft&&(Ft.opts.fov=Yt.fov)}};n("#s-sens","sens"),n("#s-fov","fov"),n("#s-vol","vol"),_t("#s-q").onchange=s=>{Yt.quality=s.target.value,bs()},_t("#s-xc").oninput=s=>{Yt.xcolor=s.target.value,bs(),document.documentElement.style.setProperty("--xc",Yt.xcolor)},_t("#s-inv").onchange=s=>{Yt.invert=s.target.checked,bs()},_t("#s-tog").onchange=s=>{Yt.toggleAim=s.target.checked,bs()},_t("#s-back").onclick=i}ru(an);Es=au(an);su({typing:()=>document.activeElement&&document.activeElement.tagName==="INPUT"&&document.activeElement.type!=="range",wantLock:()=>!!Ft&&!gi&&_t("#shop").classList.contains("hidden"),unlock:()=>{Ft&&!Ft.over&&_t("#shop").classList.contains("hidden")&&!Es&&er(!0)},buy:()=>{var i;Ft&&(_t("#shop").classList.contains("hidden")?K0():(Ia(),Es||(i=an.requestPointerLock)==null||i.call(an)))},board:i=>{Ft&&uu(Ft,i)},esc:()=>{if(Ft){if(!_t("#shop").classList.contains("hidden")){Ia();return}Es&&er(!gi)}},zoom:()=>Ft&&Ft.scoped?.4:Ft&&Ft.aimHeld?.85:1,curSlot:()=>Ft?Ft.me.slot:2});document.addEventListener("pointerlockchange",()=>{document.pointerLockElement===an&&(_t("#click").classList.add("hidden"),gi&&er(!1))});_t("#click").onclick=()=>{var i;return(i=an.requestPointerLock)==null?void 0:i.call(an)};addEventListener("resize",()=>Ft&&Ft.resize());Bi();(async()=>{try{window.claude&&window.claude.use&&(Pa=await window.claude.use("room"),_t("#menu")&&!_t("#menu").classList.contains("hidden")&&Bi())}catch{Pa=null}})();window.__rz={get G(){return Ft},start:tr,I:ht,ST:Zt};})();
