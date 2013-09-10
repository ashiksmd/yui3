if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/datatype-list-format/datatype-list-format.js']) {
   __coverage__['build/datatype-list-format/datatype-list-format.js'] = {"path":"build/datatype-list-format/datatype-list-format.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":51}}},"2":{"name":"(anonymous_2)","line":24,"loc":{"start":{"line":24,"column":11},"end":{"line":24,"column":43}}},"3":{"name":"(anonymous_3)","line":36,"loc":{"start":{"line":36,"column":12},"end":{"line":36,"column":27}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":64,"column":56}},"2":{"start":{"line":7,"column":0},"end":{"line":7,"column":41}},"3":{"start":{"line":9,"column":0},"end":{"line":9,"column":21}},"4":{"start":{"line":11,"column":0},"end":{"line":61,"column":3}},"5":{"start":{"line":25,"column":9},"end":{"line":25,"column":68}},"6":{"start":{"line":37,"column":9},"end":{"line":37,"column":49}},"7":{"start":{"line":37,"column":37},"end":{"line":37,"column":47}},"8":{"start":{"line":39,"column":9},"end":{"line":45,"column":23}},"9":{"start":{"line":47,"column":9},"end":{"line":47,"column":37}},"10":{"start":{"line":47,"column":25},"end":{"line":47,"column":35}},"11":{"start":{"line":48,"column":9},"end":{"line":48,"column":42}},"12":{"start":{"line":48,"column":25},"end":{"line":48,"column":40}},"13":{"start":{"line":49,"column":9},"end":{"line":51,"column":10}},"14":{"start":{"line":50,"column":13},"end":{"line":50,"column":57}},"15":{"start":{"line":53,"column":9},"end":{"line":53,"column":57}},"16":{"start":{"line":54,"column":9},"end":{"line":56,"column":10}},"17":{"start":{"line":55,"column":14},"end":{"line":55,"column":62}},"18":{"start":{"line":57,"column":9},"end":{"line":57,"column":54}},"19":{"start":{"line":59,"column":9},"end":{"line":59,"column":23}}},"branchMap":{"1":{"line":37,"type":"if","locations":[{"start":{"line":37,"column":9},"end":{"line":37,"column":9}},{"start":{"line":37,"column":9},"end":{"line":37,"column":9}}]},"2":{"line":40,"type":"binary-expr","locations":[{"start":{"line":40,"column":22},"end":{"line":40,"column":50}},{"start":{"line":40,"column":54},"end":{"line":40,"column":64}}]},"3":{"line":41,"type":"binary-expr","locations":[{"start":{"line":41,"column":21},"end":{"line":41,"column":48}},{"start":{"line":41,"column":52},"end":{"line":41,"column":58}}]},"4":{"line":43,"type":"binary-expr","locations":[{"start":{"line":43,"column":19},"end":{"line":43,"column":44}},{"start":{"line":43,"column":48},"end":{"line":43,"column":51}}]},"5":{"line":47,"type":"if","locations":[{"start":{"line":47,"column":9},"end":{"line":47,"column":9}},{"start":{"line":47,"column":9},"end":{"line":47,"column":9}}]},"6":{"line":48,"type":"if","locations":[{"start":{"line":48,"column":9},"end":{"line":48,"column":9}},{"start":{"line":48,"column":9},"end":{"line":48,"column":9}}]},"7":{"line":49,"type":"if","locations":[{"start":{"line":49,"column":9},"end":{"line":49,"column":9}},{"start":{"line":49,"column":9},"end":{"line":49,"column":9}}]}},"code":["(function () { YUI.add('datatype-list-format', function (Y, NAME) {","","/**"," * list-format formats lists with locale dependent rules."," * @module datatype-list-format"," */","var MODULE_NAME = \"datatype-list-format\";","","Y.namespace(\"Array\");","","Y.mix(Y.Array, {","    /**","     * Substitute items into correct positions in pattern","     * For internal use only","     * @method __sub","     * @for Array","     * @private","     * @static","     * @param pattern {String} The pattern","     * @param item0 {String} item to replace {0} in pattern","     * @param item1 {String} item to replace {1} in pattern","     * @return {String} Result string after substitutions","     */","    __sub: function(pattern, item0, item1) {","         return pattern.replace(\"{0}\", item0).replace(\"{1}\", item1);","    },","","    /**","     * Format list into string","     * @method format","     * @for Array","     * @static","     * @param list {Array} The list to be formatted","     * @return {String} formatted result","     */","    format: function(list) {","         if(!Y.Lang.isArray(list)) { return \"\"; }","        ","         var localeData = Y.Intl.get(MODULE_NAME),","             middle = localeData.listPatternMiddle || \"{0}, {1}\",","             start = localeData.listPatternStart || middle,","             end = localeData.listPatternEnd,","             two = localeData.listPatternTwo || end,","             len = list.length,","             result, i;","","         if(len === 0) { return \"\"; }","         if(len === 1) { return list[0]; }","         if(len === 2) {","             return Y.Array.__sub(two, list[0], list[1]);","         }","","         result = Y.Array.__sub(start, list[0], list[1]);","         for(i=2; i<len-1; i++) {","              result = Y.Array.__sub(middle, result, list[i]);","         }","         result = Y.Array.__sub(end, result, list[i]);","","         return result;","    }","});","","","}, '@VERSION@', {\"lang\": [], \"requires\": [\"yui-base\"]});","","}());"]};
}
var __cov_MaWxvooF0T7gWOTLFSm6lg = __coverage__['build/datatype-list-format/datatype-list-format.js'];
__cov_MaWxvooF0T7gWOTLFSm6lg.s['1']++;YUI.add('datatype-list-format',function(Y,NAME){__cov_MaWxvooF0T7gWOTLFSm6lg.f['1']++;__cov_MaWxvooF0T7gWOTLFSm6lg.s['2']++;var MODULE_NAME='datatype-list-format';__cov_MaWxvooF0T7gWOTLFSm6lg.s['3']++;Y.namespace('Array');__cov_MaWxvooF0T7gWOTLFSm6lg.s['4']++;Y.mix(Y.Array,{__sub:function(pattern,item0,item1){__cov_MaWxvooF0T7gWOTLFSm6lg.f['2']++;__cov_MaWxvooF0T7gWOTLFSm6lg.s['5']++;return pattern.replace('{0}',item0).replace('{1}',item1);},format:function(list){__cov_MaWxvooF0T7gWOTLFSm6lg.f['3']++;__cov_MaWxvooF0T7gWOTLFSm6lg.s['6']++;if(!Y.Lang.isArray(list)){__cov_MaWxvooF0T7gWOTLFSm6lg.b['1'][0]++;__cov_MaWxvooF0T7gWOTLFSm6lg.s['7']++;return'';}else{__cov_MaWxvooF0T7gWOTLFSm6lg.b['1'][1]++;}__cov_MaWxvooF0T7gWOTLFSm6lg.s['8']++;var localeData=Y.Intl.get(MODULE_NAME),middle=(__cov_MaWxvooF0T7gWOTLFSm6lg.b['2'][0]++,localeData.listPatternMiddle)||(__cov_MaWxvooF0T7gWOTLFSm6lg.b['2'][1]++,'{0}, {1}'),start=(__cov_MaWxvooF0T7gWOTLFSm6lg.b['3'][0]++,localeData.listPatternStart)||(__cov_MaWxvooF0T7gWOTLFSm6lg.b['3'][1]++,middle),end=localeData.listPatternEnd,two=(__cov_MaWxvooF0T7gWOTLFSm6lg.b['4'][0]++,localeData.listPatternTwo)||(__cov_MaWxvooF0T7gWOTLFSm6lg.b['4'][1]++,end),len=list.length,result,i;__cov_MaWxvooF0T7gWOTLFSm6lg.s['9']++;if(len===0){__cov_MaWxvooF0T7gWOTLFSm6lg.b['5'][0]++;__cov_MaWxvooF0T7gWOTLFSm6lg.s['10']++;return'';}else{__cov_MaWxvooF0T7gWOTLFSm6lg.b['5'][1]++;}__cov_MaWxvooF0T7gWOTLFSm6lg.s['11']++;if(len===1){__cov_MaWxvooF0T7gWOTLFSm6lg.b['6'][0]++;__cov_MaWxvooF0T7gWOTLFSm6lg.s['12']++;return list[0];}else{__cov_MaWxvooF0T7gWOTLFSm6lg.b['6'][1]++;}__cov_MaWxvooF0T7gWOTLFSm6lg.s['13']++;if(len===2){__cov_MaWxvooF0T7gWOTLFSm6lg.b['7'][0]++;__cov_MaWxvooF0T7gWOTLFSm6lg.s['14']++;return Y.Array.__sub(two,list[0],list[1]);}else{__cov_MaWxvooF0T7gWOTLFSm6lg.b['7'][1]++;}__cov_MaWxvooF0T7gWOTLFSm6lg.s['15']++;result=Y.Array.__sub(start,list[0],list[1]);__cov_MaWxvooF0T7gWOTLFSm6lg.s['16']++;for(i=2;i<len-1;i++){__cov_MaWxvooF0T7gWOTLFSm6lg.s['17']++;result=Y.Array.__sub(middle,result,list[i]);}__cov_MaWxvooF0T7gWOTLFSm6lg.s['18']++;result=Y.Array.__sub(end,result,list[i]);__cov_MaWxvooF0T7gWOTLFSm6lg.s['19']++;return result;}});},'@VERSION@',{'lang':[],'requires':['yui-base']});
