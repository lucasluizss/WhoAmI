function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,e){for(var i=0;i<e.length;i++){var t=e[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function _createClass(n,e,i){return e&&_defineProperties(n.prototype,e),i&&_defineProperties(n,i),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{uw9W:function(n,e,i){"use strict";i.r(e),i.d(e,"AppRankingModule",(function(){return f}));var t=i("fXoL"),r=i("ofXK");function a(n,e){if(1&n&&(t.Mb(0,"li"),t.gc(1),t.Mb(2,"span",6),t.gc(3),t.Lb(),t.Lb()),2&n){var i=e.$implicit;t.zb(1),t.ic("",i.player," "),t.zb(2),t.hc(i.score)}}var c,o,s=((c=function(){function n(){_classCallCheck(this,n),this.rankingList=[]}return _createClass(n,[{key:"ngOnInit",value:function(){var n=JSON.parse(localStorage.getItem("ranking"))||[];n.sort((function(n,e){return n.score<e.score?1:e.score<n.score?-1:0})),this.rankingList=n}}]),n}()).\u0275fac=function(n){return new(n||c)},c.\u0275cmp=t.Db({type:c,selectors:[["app-ranking"]],decls:7,vars:1,consts:[[1,"uk-container","uk-padding"],[1,"uk-card","uk-card-default","uk-card-body","uk-width-1-2@m"],[1,"uk-card-title"],["uk-icon","icon: star",1,"icon"],[1,"uk-list","uk-list-large","uk-list-divider"],[4,"ngFor","ngForOf"],[1,"uk-badge"]],template:function(n,e){1&n&&(t.Mb(0,"div",0),t.Mb(1,"div",1),t.Mb(2,"h3",2),t.gc(3,"Ranking "),t.Kb(4,"span",3),t.Lb(),t.Mb(5,"ul",4),t.fc(6,a,4,2,"li",5),t.Lb(),t.Lb(),t.Lb()),2&n&&(t.zb(6),t.Xb("ngForOf",e.rankingList))},directives:[r.h],encapsulation:2}),c),u=i("tyNb"),l=[{path:"",component:s,data:{animation:""}}],f=((o=function n(){_classCallCheck(this,n)}).\u0275mod=t.Hb({type:o}),o.\u0275inj=t.Gb({factory:function(n){return new(n||o)},imports:[[r.b,u.e.forChild(l)],u.e]}),o)}}]);