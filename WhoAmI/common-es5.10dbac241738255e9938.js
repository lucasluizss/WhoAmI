function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,o,t){return o&&_defineProperties(e.prototype,o),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{G7Y8:function(e,o,t){"use strict";t.d(o,"a",(function(){return n}));var n=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"AddResult",value:function(e){var o=JSON.parse(localStorage.getItem("ranking"))||[],t=o.findIndex((function(o){return o.player===e.player}));t>-1?o[t]=e:o.push(e),localStorage.setItem("ranking",JSON.stringify(o))}},{key:"Reset",value:function(){localStorage.removeItem("ranking")}}]),e}()},M4Nl:function(e,o,t){"use strict";t.d(o,"a",(function(){return i}));var n=t("AzD4"),i=function(){function e(){_classCallCheck(this,e),this.Load()}return _createClass(e,[{key:"Load",value:function(){var e=JSON.parse(localStorage.getItem("settings"));this.gameMode=e.gameMode,this.losePointsWhenWrong=e.losePointsWhenWrong,this.modeByTime=e.modeByTime,this.modeTimeByWord=e.modeTimeByWord,this.modeNumberOfWords=e.modeNumberOfWords}},{key:"Set",value:function(o,t,n,i,r){var s=new e;this.gameMode=s.gameMode=o,this.losePointsWhenWrong=s.losePointsWhenWrong=t,this.modeByTime=s.modeByTime=n,this.modeTimeByWord=s.modeTimeByWord=i,this.modeNumberOfWords=s.modeNumberOfWords=r,localStorage.setItem("settings",JSON.stringify(s))}},{key:"Reset",value:function(){var e=n.configuration;this.gameMode=e.gameMode,this.losePointsWhenWrong=e.losePointsWhenWrong,this.modeByTime=e.modeByTime,this.modeTimeByWord=e.modeTimeByWord,this.modeNumberOfWords=e.modeNumberOfWords,localStorage.setItem("settings",JSON.stringify(e))}}]),e}()},sNC9:function(e,o,t){"use strict";t.d(o,"b",(function(){return n})),t.d(o,"d",(function(){return i})),t.d(o,"c",(function(){return r})),t.d(o,"a",(function(){return s}));var n=function e(o){_classCallCheck(this,e),this.time=o},i=function e(o,t){_classCallCheck(this,e),this.time=o,this.numberOfWords=t},r=function e(o){_classCallCheck(this,e),this.numberOfWords=o},s=function(e){return e[e.ModeByTime=0]="ModeByTime",e[e.ModeTimeByWord=1]="ModeTimeByWord",e[e.ModeNumberOfWords=2]="ModeNumberOfWords",e}({})}}]);