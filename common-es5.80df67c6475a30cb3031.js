function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{G7Y8:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var n=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"AddResult",value:function(e){var t=this.Get(),o=t.findIndex((function(t){return t.player===e.player}));e.score=e.scoreTotal,o>-1?t[o]=e:t.push(e),t.sort((function(e,t){return e.score<t.score?1:t.score<e.score?-1:0})),localStorage.setItem("ranking",JSON.stringify(t))}},{key:"Reset",value:function(){localStorage.removeItem("ranking")}},{key:"Get",value:function(){return JSON.parse(localStorage.getItem("ranking"))||[]}}]),e}()},M4Nl:function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));var n=o("sNC9"),r=o("AzD4"),i=function(){function e(){_classCallCheck(this,e),this.Load()}return _createClass(e,[{key:"Load",value:function(){var e=JSON.parse(localStorage.getItem("settings"));this.soundEnabled=e.soundEnabled,this.gameMode=e.gameMode,this.losePointsWhenWrong=e.losePointsWhenWrong,this.modeByTime=e.modeByTime,this.modeTimeByWord=e.modeTimeByWord,this.modeNumberOfWords=e.modeNumberOfWords}},{key:"Set",value:function(t,o,n,r,i,s){var a=new e;this.soundEnabled=a.soundEnabled=t,this.gameMode=a.gameMode=o,this.losePointsWhenWrong=a.losePointsWhenWrong=n,this.modeByTime=a.modeByTime=r,this.modeTimeByWord=a.modeTimeByWord=i,this.modeNumberOfWords=a.modeNumberOfWords=s,localStorage.setItem("settings",JSON.stringify(a))}},{key:"Reset",value:function(){localStorage.setItem("settings",JSON.stringify(r.configuration)),this.Load()}},{key:"IsModeByTime",get:function(){return+this.gameMode===n.a.ModeByTime}},{key:"IsModeNumberOfWords",get:function(){return+this.gameMode===n.a.ModeNumberOfWords}},{key:"IsModeTimeByWord",get:function(){return+this.gameMode===n.a.ModeTimeByWord}},{key:"SecoundsPerWord",get:function(){return Math.round(this.modeTimeByWord.time/1e3*100)/100}},{key:"SecoundsOfGame",get:function(){return Math.round(this.modeByTime.time/1e3*100)/100}}]),e}()},sNC9:function(e,t,o){"use strict";o.d(t,"b",(function(){return n})),o.d(t,"d",(function(){return r})),o.d(t,"c",(function(){return i})),o.d(t,"a",(function(){return s}));var n=function e(t){_classCallCheck(this,e),this.time=t},r=function e(t,o){_classCallCheck(this,e),this.time=t,this.numberOfWords=o},i=function e(t){_classCallCheck(this,e),this.numberOfWords=t},s=function(e){return e[e.ModeByTime=0]="ModeByTime",e[e.ModeTimeByWord=1]="ModeTimeByWord",e[e.ModeNumberOfWords=2]="ModeNumberOfWords",e}({})}}]);