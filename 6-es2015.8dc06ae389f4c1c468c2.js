(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{Vuud:function(t,e,i){"use strict";i.r(e);var n=i("8Y7J");class s{constructor(t){this.activatedRoute=t,this.score=0,this.item="",this.maxProgress=0,this.currentProgress=0,this.counter=0}ngOnInit(){window.addEventListener("devicemotion",this.handleMotionEvent,!0),window.DeviceOrientationEvent?window.addEventListener("deviceorientation",this.handleOrientation):this.notificate("DeviceOrientationEvent is not supported"),this.checkSettings(),this.activatedRoute.queryParams.subscribe(t=>{const e=+t.id,i=JSON.parse(localStorage.getItem("categories"));this.categoryItem=i.find(t=>t.id===e)}),this.whoIsPlaying()}whoIsPlaying(){UIkit.modal.prompt("Name:","").then(t=>{this.player=t||"Anonymous",this.notificate(`Lets play ${t}`),this.play(this.categoryItem)})}play(t){this.items=t.data||[],this.maxProgress=this.counter=this.settings.numberOfWords,this.again=!1,this.settings.playWithTime?this.showItemsWithTime(this.items):this.showItems()}showItems(){this.item=this.getItem(this.items),this.currentProgress++,this.items=this.items.filter(t=>t!==this.item)}showItemsWithTime(t){if(!t.length||!this.counter)return this.again=!0,this.item="TEMPO ESGOTADO!",void this.computeResult();setTimeout(()=>{this.item=this.getItem(t),this.currentProgress++,this.counter--,this.showItemsWithTime(t.filter(t=>t!==this.item))},+this.settings.time||2e3)}getItem(t){return t[Math.floor(Math.random()*t.length)]}rightAnswer(){this.notificate("Acertou!",1),this.score++}incorrectAnswer(){this.notificate("Errou!",1),this.score>0&&this.score--}computeResult(){UIkit.modal.prompt("Score:","").then(t=>{this.score=+t,this.saveScoreResult()})}saveScoreResult(){const t={name:this.player,score:this.score},e=JSON.parse(localStorage.getItem("ranking"))||[],i=e.findIndex(e=>e.name===t.name);i>-1?e[i]=t:e.push(t),localStorage.setItem("ranking",JSON.stringify(e))}checkSettings(){this.settings=JSON.parse(localStorage.getItem("settings"))}notificate(t,e=3){UIkit.notification({message:t,status:"primary",pos:"bottom-center",timeout:1e3*e})}handleOrientation(t){let e=t.alpha,i=t.beta,n=t.gamma;this.notificate(`Absolute: ${t.absolute}`,10),this.notificate(`Alpha: ${e}`,10),this.notificate(`Beta: ${i}`,10),this.notificate(`Gamma: ${n}`,10)}handleMotionEvent(t){let e=t.accelerationIncludingGravity.y,i=t.accelerationIncludingGravity.z;this.notificate(`${t.accelerationIncludingGravity.x}`),this.notificate(`${e}`),this.notificate(`${i}`)}onClick(t){const e=t.target,i=e.offsetWidth,n=t.clientX-e.getBoundingClientRect().left;if(!(this.counter>0))return this.again=!0,this.item="FIM!",void this.saveScoreResult();this.showItems(),this.counter--,i/2>n?this.incorrectAnswer():this.rightAnswer()}}class l{}var o=i("pMnS"),a=i("SVse"),r=i("iInd"),u=n.nb({encapsulation:2,styles:[],data:{}});function c(t){return n.Fb(0,[(t()(),n.pb(0,0,null,null,1,"button",[["class","uk-button uk-button-primary uk-button-large"]],null,[[null,"click"]],(function(t,e,i){var n=!0,s=t.component;return"click"===e&&(n=!1!==s.play(s.categoryItem)&&n),n}),null,null)),(t()(),n.Eb(-1,null,[" JOGAR NOVAMENTE "]))],null,null)}function h(t){return n.Fb(0,[(t()(),n.pb(0,0,null,null,6,"div",[["class","uk-inline"]],null,[[null,"click"]],(function(t,e,i){var n=!0;return"click"===e&&(n=!1!==t.component.onClick(i)&&n),n}),null,null)),(t()(),n.pb(1,0,null,null,0,"img",[["alt",""],["src","https://getuikit.com/docs/images/photo.jpg"]],null,null,null,null,null)),(t()(),n.pb(2,0,null,null,4,"div",[["class","uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle"]],null,null,null,null,null)),(t()(),n.pb(3,0,null,null,1,"h1",[],null,null,null,null,null)),(t()(),n.Eb(4,null,[" "," "])),(t()(),n.eb(16777216,null,null,1,null,c)),n.ob(6,16384,null,0,a.i,[n.M,n.J],{ngIf:[0,"ngIf"]},null)],(function(t,e){t(e,6,0,e.component.again)}),(function(t,e){t(e,4,0,e.component.item)}))}function m(t){return n.Fb(0,[(t()(),n.pb(0,0,null,null,1,"app-game",[],null,null,null,h,u)),n.ob(1,114688,null,0,s,[r.a],null,null)],(function(t,e){t(e,1,0)}),null)}var g=n.lb("app-game",s,m,{},{},[]);i.d(e,"AppGameModuleNgFactory",(function(){return p}));var p=n.mb(l,[],(function(t){return n.yb([n.zb(512,n.j,n.X,[[8,[o.a,g]],[3,n.j],n.v]),n.zb(4608,a.k,a.j,[n.s,[2,a.r]]),n.zb(1073742336,a.b,a.b,[]),n.zb(1073742336,r.o,r.o,[[2,r.t],[2,r.k]]),n.zb(1073742336,l,l,[]),n.zb(1024,r.i,(function(){return[[{path:"",component:s}]]}),[])])}))}}]);