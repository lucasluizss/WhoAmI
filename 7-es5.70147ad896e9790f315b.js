function _defineProperties(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{DMmz:function(e,t,i){"use strict";i.r(t),i.d(t,"AppGameModule",(function(){return A}));var s=i("G7Y8"),n=function e(t,i){_classCallCheck(this,e),this.word=t,this.status=i},r=i("HDdC"),a=function(){function e(){_classCallCheck(this,e),this.maxProgress=0,this.currentProgress=0}return _createClass(e,[{key:"Finished",value:function(){this.again=!0,this.word=""}},{key:"Stop",value:function(){this.interrupted=!0}},{key:"NextWord",value:function(){var e=this;this.word=this.words[Math.floor(Math.random()*this.words.length)],this.words=this.words.filter((function(t){return t!==e.word}))}},{key:"LoadWords",value:function(e){this.words=e||[]}},{key:"Start",value:function(){var e=this;return new r.a((function(t){var i=["Prepare-se!","3","2","1"],s=i.length,n=setInterval((function(){e.word=i.shift(),s--||(clearInterval(n),e.again=!1,t.complete())}),1e3)}))}},{key:"PlayByTime",value:function(e){var t=this;return this.currentProgress=this.maxProgress=e,new r.a((function(e){t.NextWord();var i=setInterval((function(){--t.currentProgress<=0&&(clearInterval(i),e.complete()),t.interrupted&&(clearInterval(i),e.unsubscribe())}),1e3)}))}},{key:"PlayByNumberOfWords",value:function(e){this.currentProgress=this.maxProgress=e,this.NextWord()}},{key:"PlayTimeByWord",value:function(e,t){var i=this;return this.currentProgress=this.maxProgress=e,new r.a((function(e){i.NextWord(),e.next(new n(i.word,!0));var s=setInterval((function(){i.HasWords&&i.currentProgress--||(clearInterval(s),i.Finished(),e.complete()),i.interrupted&&(clearInterval(s),e.unsubscribe()),i.NextWord(),e.next(new n(i.word,!0))}),t)}))}},{key:"CanClick",get:function(){return void 0!==this.again}},{key:"HasWords",get:function(){return this.words&&this.words.length>0||0===this.words.length&&!!this.word}}]),e}(),o=function(){function e(){_classCallCheck(this,e),this.score=0,this.ClearHistoric()}return _createClass(e,[{key:"IsPlayerAddict",value:function(){return this.score===this.category.data.length}},{key:"SetPlayer",value:function(e){this.player=e||"An\xf4nimo"}},{key:"SetCategory",value:function(e){var t=JSON.parse(localStorage.getItem("categories"));this.category=t.find((function(t){return t.id===e}))}},{key:"IncorrectAnswer",value:function(e,t){this.AddHistoric(new n(e,!1)),this.score>0&&t&&this.score--}},{key:"RightAnswer",value:function(e){this.AddHistoric(new n(e,!0)),this.score++}},{key:"ClearHistoric",value:function(){this.score=0,this.historic=new Array}},{key:"AddHistoric",value:function(e){this.historic.push(e)}}]),e}(),c=function(){function e(t,i){_classCallCheck(this,e),this.player=t,this.score=i,this.date=new Date}return _createClass(e,[{key:"scoreTotal",get:function(){return this.score<0?0:this.score}}]),e}(),u=i("M4Nl"),l=i("sNC9"),d=i("fXoL"),h=i("tyNb"),f=i("ofXK"),m=["audioSuccess"],b=["audioError"],g=["audioFinalGame"];function v(e,t){if(1&e&&d.Kb(0,"progress",15),2&e){var i=d.Wb();d.ac("value",i.vm.currentProgress),d.ac("max",i.vm.maxProgress)}}function k(e,t){1&e&&(d.Mb(0,"div",23),d.Kb(1,"a",24),d.Mb(2,"p"),d.ic(3,"Parab\xe9ns voc\xea \xe9 um viciado!"),d.Lb(),d.Lb())}function y(e,t){if(1&e&&(d.Mb(0,"p",16),d.Mb(1,"del"),d.ic(2),d.Lb(),d.Lb()),2&e){var i=d.Wb().$implicit;d.zb(2),d.jc(i.word)}}function p(e,t){if(1&e&&(d.Mb(0,"p",16),d.ic(1),d.Lb()),2&e){var i=d.Wb().$implicit;d.zb(1),d.kc(" ",i.word," ")}}function w(e,t){if(1&e&&(d.Mb(0,"li",25),d.hc(1,y,3,1,"p",26),d.hc(2,p,2,1,"p",26),d.Lb()),2&e){var i=t.$implicit;d.zb(1),d.Zb("ngIf",!i.status),d.zb(1),d.Zb("ngIf",i.status)}}function P(e,t){if(1&e){var i=d.Nb();d.Mb(0,"div"),d.Mb(1,"h4",16),d.Kb(2,"span",17),d.ic(3),d.Kb(4,"span",17),d.Lb(),d.hc(5,k,4,0,"div",18),d.Kb(6,"hr"),d.Mb(7,"div",19),d.Mb(8,"ul",20),d.hc(9,w,3,2,"li",21),d.Lb(),d.Lb(),d.Kb(10,"hr"),d.Mb(11,"button",22),d.Ub("click",(function(){return d.ec(i),d.Wb().play()})),d.ic(12," JOGAR NOVAMENTE "),d.Lb(),d.Lb()}if(2&e){var s=d.Wb();d.zb(3),d.lc(" ",s.game.player," fez ",s.game.score," ponto(s) "),d.zb(2),d.Zb("ngIf",s.vm.isPlayerAddict),d.zb(4),d.Zb("ngForOf",s.game.historic)}}var M,C,W=function(){return["/home"]},I=[{path:"",component:(M=function(){function e(t){_classCallCheck(this,e),this.activatedRoute=t,this.game=new o,this.vm=new a}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.settings=new u.a,this.configureSound(),this.activatedRoute.queryParams.subscribe((function(t){e.game.SetCategory(+t.id)})),this.whoIsPlaying()}},{key:"whoIsPlaying",value:function(){var e=this;UIkit.modal.prompt("Digite seu nome:","").then((function(t){e.game.SetPlayer(t),e.notificate("Vamos jogar "+e.game.player),e.play()}))}},{key:"play",value:function(){this.audioFinalGame.nativeElement.pause(),this.game.ClearHistoric(),this.vm.LoadWords(this.game.category.data);var e=this;this.vm.Start().subscribe({complete:function(){e.callGameByMode()}})}},{key:"callGameByMode",value:function(){var e=this;switch(this.settings.gameMode){case l.a.ModeByTime:this.vm.PlayByTime(this.secoundsOfGame).subscribe({complete:function(){e.saveScoreResult()}});break;case l.a.ModeNumberOfWords:this.vm.PlayByNumberOfWords(this.settings.modeNumberOfWords.numberOfWords);break;case l.a.ModeTimeByWord:this.playTimePerWords();break;default:this.notificate("Este modo de jogo n\xe3o existe!","warning",10)}}},{key:"playTimePerWords",value:function(){var e=this;this.vm.PlayTimeByWord(this.settings.modeTimeByWord.numberOfWords,+this.settings.modeTimeByWord.time).subscribe({next:function(t){e.game.AddHistoric(t)},complete:function(){e.computeResult()}})}},{key:"rightAnswer",value:function(){this.notificate("Acertou!","success",.8),this.game.RightAnswer(this.vm.word)}},{key:"incorrectAnswer",value:function(){this.notificate("Errou!","danger",.8),this.game.IncorrectAnswer(this.vm.word,this.settings.losePointsWhenWrong)}},{key:"computeResult",value:function(){var e=this;UIkit.modal.prompt("Pontua\xe7\xe3o:","").then((function(t){e.game.score=+t||-1,e.saveScoreResult()}))}},{key:"saveScoreResult",value:function(){this.settings.soundEnabled&&this.audioFinalGame.nativeElement.play(),this.vm.isPlayerAddict=this.game.IsPlayerAddict(),s.a.AddResult(new c(this.game.player,this.game.score)),this.vm.Finished()}},{key:"notificate",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"primary",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3;this.checkNotificationSound(t),UIkit.notification({message:e,status:t,pos:"bottom-center",timeout:1e3*i})}},{key:"checkNotificationSound",value:function(e){this.settings.soundEnabled&&("success"===e&&this.audioSuccess.nativeElement.play(),"danger"===e&&this.audioError.nativeElement.play())}},{key:"onClick",value:function(e){var t=e.target,i=t.offsetWidth,s=e.clientX-t.getBoundingClientRect().left;this.vm.CanClick&&this.settings.gameMode!==l.a.ModeTimeByWord&&(!this.vm.HasWords||this.vm.currentProgress<=0?this.saveScoreResult():(this.settings.gameMode===l.a.ModeNumberOfWords&&--this.vm.currentProgress,this.checkAnswer(i,s)))}},{key:"checkAnswer",value:function(e,t){e/2>t?this.rightAnswer():this.incorrectAnswer(),this.vm.NextWord()}},{key:"configureSound",value:function(){var e=this;document.querySelectorAll("video, audio").forEach((function(t){t.muted=!e.settings.soundEnabled,e.settings.soundEnabled||t.pause()}))}},{key:"secoundsOfGame",get:function(){return Math.round(this.settings.modeByTime.time/1e3*100)/100}}]),e}(),M.\u0275fac=function(e){return new(e||M)(d.Jb(h.a))},M.\u0275cmp=d.Db({type:M,selectors:[["app-game"]],viewQuery:function(e,t){var i;1&e&&(d.mc(m,!0),d.mc(b,!0),d.mc(g,!0)),2&e&&(d.dc(i=d.Vb())&&(t.audioSuccess=i.first),d.dc(i=d.Vb())&&(t.audioError=i.first),d.dc(i=d.Vb())&&(t.audioFinalGame=i.first))},decls:21,vars:5,consts:[["data-src","assets/images/others/cover.jpg","uk-img","",1,"uk-height-viewport","uk-flex","uk-flex-center","uk-flex-middle","uk-background-cover","uk-ligth",3,"click"],[1,"uk-overlay","uk-ligth","uk-position-top-right"],[3,"routerLink","click"],["uk-icon","sign-out"],[1,"uk-margin"],[1,"uk-text-white-80"],["class","uk-progress",3,"value","max",4,"ngIf"],[4,"ngIf"],["audioSuccess",""],["src","assets/audios/success_answer.mp3","type","audio/mp3"],["audioError",""],["src","assets/audios/wrong_answer.mp3","type","audio/mp3"],["loop",""],["audioFinalGame",""],["src","assets/audios/final_game_result.mp3","type","audio/mp3"],[1,"uk-progress",3,"value","max"],[1,"uk-text-white-30"],["uk-icon","star"],["class","uk-alert-danger","uk-alert","",4,"ngIf"],[1,"uk-panel","uk-panel-scrollable"],[1,"uk-list"],["class","uk-margin-left",4,"ngFor","ngForOf"],[1,"uk-button","uk-button-primary","uk-width-1-1",3,"click"],["uk-alert","",1,"uk-alert-danger"],["uk-close","",1,"uk-alert-close"],[1,"uk-margin-left"],["class","uk-text-white-30",4,"ngIf"]],template:function(e,t){1&e&&(d.Mb(0,"div",0),d.Ub("click",(function(e){return t.onClick(e)})),d.Mb(1,"div",1),d.Mb(2,"a",2),d.Ub("click",(function(){return t.vm.Stop()})),d.Kb(3,"span",3),d.ic(4," SAIR"),d.Lb(),d.Lb(),d.Mb(5,"div",4),d.Mb(6,"div"),d.Mb(7,"p",5),d.ic(8),d.Lb(),d.hc(9,v,1,2,"progress",6),d.Lb(),d.hc(10,P,13,4,"div",7),d.Lb(),d.Lb(),d.Mb(11,"div"),d.Mb(12,"audio",null,8),d.Kb(14,"source",9),d.Lb(),d.Mb(15,"audio",null,10),d.Kb(17,"source",11),d.Lb(),d.Mb(18,"audio",12,13),d.Kb(20,"source",14),d.Lb(),d.Lb()),2&e&&(d.zb(2),d.Zb("routerLink",d.cc(4,W)),d.zb(6),d.kc(" ",t.vm.word," "),d.zb(1),d.Zb("ngIf",!t.vm.again),d.zb(1),d.Zb("ngIf",t.vm.again&&0!==t.game.score))},directives:[h.d,f.j,f.i],encapsulation:2}),M),data:{animation:"GamePage"}}],A=((C=function e(){_classCallCheck(this,e)}).\u0275mod=d.Hb({type:C}),C.\u0275inj=d.Gb({factory:function(e){return new(e||C)},imports:[[f.b,h.e.forChild(I)],h.e]}),C)}}]);