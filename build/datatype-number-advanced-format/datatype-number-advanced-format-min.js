YUI.add("datatype-number-advanced-format",function(e,t){var n,r,i;e.Number._zeroPad=function(e,t,n,r){e=typeof e=="string"?e:String(e);if(e.length>=t)return e;n=n||"0";var i=[],s;for(s=e.length;s<t;s++)i.push(n);return i[r?"unshift":"push"](e),i.join("")},e.Number.__BaseFormat=function(t,n){if(!t&&!n)return;e.mix(this,{_pattern:t,_segments:[],Formats:n})},n=e.Number.__BaseFormat,e.mix(n.prototype,{format:function(e){var t=[],n=0;for(;n<this._segments.length;n++)t.push(this._segments[n].format(e));return t.join("")},parse:function(t,n){var r=this._createParseObject(),i=n||0,s=0;for(;s<this._segments.length;s++)i=this._segments[s].parse(r,t,i);return i<t.length&&e.error("Parse Error: Input too long"),r},_createParseObject:function(){e.error("Not implemented")}}),n.Segment=function(e,t){if(!e&&!t)return;this._parent=e,this._s=t},e.mix(n.Segment.prototype,{format:function(){return this._s},parse:function(){e.error("Not implemented")},getFormat:function(){return this._parent}}),e.mix(n.Segment,{_parseLiteral:function(t,n,r){n.length-r<t.length&&e.error("Parse Error: Input too short");for(var i=0;i<t.length;i++)t.charAt(i)!==n.charAt(r+i)&&e.error("Parse Error: Input does not match");return r+t.length},_parseInt:function(t,n,r,i,s,o,u){var a=o||i.length-s,f=s,l=0,c,h,p;for(;l<a;l++)if(!i.charAt(s++).match(/\d/)){s--;break}return c=s,f===c&&e.error("Error parsing number. Number not present"),o&&c-f!==o&&e.error("Error parsing number. Number too short"),h=parseInt(i.substring(f,c),u||10),n&&(p=t||e.config.win,typeof n=="function"?n.call(p,h+r):p[n]=h+r),c}}),n.TextSegment=function(e,t){if(!e&&!t)return;n.TextSegment.superclass.constructor.call(this,e,t)},e.extend(n.TextSegment,n.Segment),e.mix(n.TextSegment.prototype,{toString:function(){return'text: "'+this._s+'"'},parse:function(e,t,r){return n.Segment._parseLiteral(this._s,t,r)}},!0),e.Number.__zNumberFormat=function(e,t,i){var s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x;if(arguments.length===0)return;r.superclass.constructor.call(this,e,t);if(!e)return;e==="{plural_style}"&&(e=this.Formats.decimalFormat,this._isPluralCurrency=!0,this._pattern=e),this.currency=this.Formats.defaultCurrency;if(this.currency===undefined||!this.currency)this.currency="USD";s=e.split(/;/),e=s[0],this._useGrouping=e.indexOf(",")!==-1,this._parseIntegerOnly=e.indexOf(".")===-1,this._useGrouping&&(o=e.match(/[0#,]+/),u=new RegExp("[0#]+","g"),a=o[0].match(u),f=a.length-2,this._primaryGrouping=a[f+1].length,this._secondaryGrouping=f>0?a[f].length:a[f+1].length),f=0,l=this.__parseStatic(e,f),f=l.offset,c=l.text!=="",c&&this._segments.push(new n.TextSegment(this,l.text)),h=f;while(f<e.length&&r._META_CHARS.indexOf(e.charAt(f))!==-1)f++;p=f,d=e.substring(h,p),v=d.indexOf(this.Formats.exponentialSymbol),m=v!==-1?d.substring(v+1):null,m&&(d=d.substring(0,v),this._showExponent=!0),g=d.indexOf("."),y=g!==-1?d.substring(0,g):d,y&&(y=y.replace(/[^#0]/g,""),b=y.indexOf("0"),b!==-1&&(this._minIntDigits=y.length-b),this._maxIntDigits=y.length),w=g!==-1?d.substring(g+1):null,w&&(b=w.lastIndexOf("0"),b!==-1&&(this._minFracDigits=b+1),this._maxFracDigits=w.replace(/[^#0]/g,"").length),this._segments.push(new r.NumberSegment(this,d)),l=this.__parseStatic(e,f),f=l.offset,l.text!==""&&this._segments.push(new n.TextSegment(this,l.text));if(i)return;s.length>1?(e=s[1],this._negativeFormatter=new r(e,t,!0)):(E=new r("",t),E._segments=E._segments.concat(this._segments),S=c?1:0,x=new n.TextSegment(E,this.Formats.minusSign),E._segments.splice(S,0,x),this._negativeFormatter=E)},r=e.Number.__zNumberFormat,e.extend(r,e.Number.__BaseFormat),e.mix(r,{_NUMBER:"number",_INTEGER:"integer",_CURRENCY:"currency",_PERCENT:"percent",_META_CHARS:"0#.,E"}),e.mix(r.prototype,{_groupingOffset:Number.MAX_VALUE,_minIntDigits:1,_isCurrency:!1,_isPercent:!1,_isPerMille:!1,_showExponent:!1,format:function(e){if(e<0&&this._negativeFormatter)return this._negativeFormatter.format(e);var t=n.prototype.format.call(this,e),r="";return this._isPluralCurrency&&(e===1?(r=this.Formats.currencyPatternSingular,r=r.replace("{1}",this.Formats[this.currency+"_currencySingular"])):(r=this.Formats.currencyPatternPlural,r=r.replace("{1}",this.Formats[this.currency+"_currencyPlural"])),t=r.replace("{0}",t)),t},parse:function(t,r){var i,s,o;if(t.indexOf(this.Formats.minusSign)!==-1&&this._negativeFormatter)return this._negativeFormatter.parse(t,r);this._isPluralCurrency&&(i=this.Formats[this.currency+"_currencySingular"],s=this.Formats[this.currency+"_currencyPlural"],t=e.Lang.trim(t.replace(s,"").replace(i,""))),o=null;try{o=n.prototype.parse.call(this,t,r),o=o.value}catch(u){e.error("Failed to parse: "+t,u)}return o},__parseStatic:function(e,t){var n=[],i,s,o;while(t<e.length){i=e.charAt(t++);if(r._META_CHARS.indexOf(i)!==-1){t--;break}switch(i){case"'":s=t;while(t<e.length&&e.charAt(t)!=="'")t++;o=t,i=o-s===0?"'":e.substring(s,o);break;case"%":i=this.Formats.percentSign,this._isPercent=!0;break;case"\u2030":i=this.Formats.perMilleSign,this._isPerMille=!0;break;case"\u00a4":e.charAt(t)==="\u00a4"?(i=this.Formats[this.currency+"_currencyISO"],t++):i=this.Formats[this.currency+"_currencySymbol"],this._isCurrency=!0}n.push(i)}return{text:n.join(""),offset:t}},_createParseObject:function(){return{value:null}}},!0),r.NumberSegment=function(e,t){if(e===null&&t===null)return;r.NumberSegment.superclass.constructor.call(this,e,t)},e.extend(r.NumberSegment,n.Segment),e.mix(r.NumberSegment.prototype,{format:function(e){var t,n,r;return isNaN(e)?this._parent.Formats.nanSymbol:e===Number.NEGATIVE_INFINITY||e===Number.POSITIVE_INFINITY?this._parent.Formats.infinitySign:(typeof e!="number"&&(e=Number(e)),e=Math.abs(e),this._parent._isPercent?e*=100:this._parent._isPerMille&&(e*=1e3),this._parent._parseIntegerOnly&&(e=Math.floor(e)),t=this._parent.Formats.exponentialSymbol,n=new RegExp(t+"+"),r=this._parent._showExponent?e.toExponential(this._parent._maxFracDigits).toUpperCase().replace(n,t):e.toFixed(this._parent._maxFracDigits||0),r=this._normalize(r),r)},_normalize:function(t){var n=this._parent.Formats.exponentialSymbol,r=new RegExp("[\\."+n+"]"),i=t.split(r),s=i.shift(),o=[],u=this._parent._primaryGrouping,a="0",f=this._parent.Formats.decimalSeparator,l,c;s.length<this._parent._minIntDigits&&(s=e.Number._zeroPad(s,this._parent._minIntDigits,this._parent.Formats.numberZero));if(s.length>this._parent._primaryGrouping&&this._parent._useGrouping){c=s.length-u;while(c>0)o.unshift(s.substr(c,u)),o.unshift(this._parent.Formats.groupingSeparator),u=this._parent._secondaryGrouping,c-=u;o.unshift(s.substring(0,c+u)),s=o.join("")}if(t.match(/\./))a=i.shift();else if(t.match(/\e/)||t.match(/\E/))l=i.shift();return a=a.replace(/0+$/,""),a.length<this._parent._minFracDigits&&(a=e.Number._zeroPad(a,this._parent._minFracDigits,this._parent.Formats.numberZero,!0)),o=[s],a.length>0&&o.push(f,a),l&&o.push(n,l.replace(/^\+/,"")),o.join("")},parse:function(t,n,r){var i=this._parent.Formats.groupingSeparator,s=this._parent.Formats.decimalSeparator,o=this._parent.Formats.minusSign,u=this._parent.Formats.exponentialSymbol,a="[\\"+o+"0-9"+i+"]+",f,l,c,h,p=null,d,v=this._parent._secondaryGrouping||this._parent._primaryGrouping;this._parent._parseIntegerOnly||(a+="(\\"+s+"[0-9]+)?"),this._parent._showExponent&&(a+="("+u+"\\+?[0-9]+)"),f=new RegExp(a),l=n.match(f),l||e.error("Error parsing: Number does not match pattern"),c=n.indexOf(o)!==-1,h=r+l[0].length,n=n.slice(r,h);if(this._parent.showExponent)p=n.split(u);else if(this._parent._useGrouping){this._parent._primaryGrouping||e.error("Error parsing: Invalid pattern"),d=n.length-this._parent._primaryGrouping-1,l[1]&&(d-=l[1].length),d>0&&(n.charAt(d)!==","&&e.error("Error parsing: Number does not match pattern"),n=n.slice(0,d)+n.slice(d+1)),d=d-v-1;while(d>0)n.charAt(d)!==","&&e.error("Error parsing: Number does not match pattern"),n=n.slice(0,d)+n.slice(d+1),d=d-v-1;n.indexOf(i)!==-1&&e.error("Error parsing: Number does not match pattern")}return p?t.value=parseFloat(p[0],10)*Math.pow(10,parseFloat(p[1],10)):t.value=parseFloat(n,10),c&&(t.value*=-1),this._parent._isPercent?t.value/=100:this._parent._isPerMille&&(t.value/=1e3),h}},!0),e.Number.__YNumberFormat=function(t){t=t||e.Number.STYLES.NUMBER_STYLE,e.Lang.isString(t)&&(t=e.Number.STYLES[t]);var n="",i=e.Intl.get("datatype-number-advanced-format");switch(t){case e.Number.STYLES.CURRENCY_STYLE:n=i.currencyFormat;break;case e.Number.STYLES.ISO_CURRENCY_STYLE:n=i.currencyFormat,n=n.replace("\u00a4","\u00a4\u00a4");break;case e.Number.STYLES.NUMBER_STYLE:n=i.decimalFormat;break;case e.Number.STYLES.PERCENT_STYLE:n=i.percentFormat;break;case e.Number.STYLES.PLURAL_CURRENCY_STYLE:n="{plural_style}";break;case e.Number.STYLES.SCIENTIFIC_STYLE:n=i.scientificFormat}this._numberFormatInstance=new r(n,i)},i=e.Number.__YNumberFormat,e.mix(e.Number,{STYLES:{CURRENCY_STYLE:1,ISO_CURRENCY_STYLE:2,NUMBER_STYLE:4,PERCENT_STYLE:8,PLURAL_CURRENCY_STYLE:16,SCIENTIFIC_STYLE:32}}),e.mix(i.prototype,{format:function(e){return this._numberFormatInstance.format(e)},isParseIntegerOnly:function(){return this._numberFormatInstance._parseIntegerOnly},parse:function(e,t){return this._numberFormatInstance.parse(e,t)},setParseIntegerOnly:function(e){this._numberFormatInstance._parseIntegerOnly=e}}),e.mix(e.Number,{_oldFormat:e.Number.format,_oldParse:e.Number.parse}),e.mix(e.Number,{format:function(t,n){n=n||{};if(n.prefix!==undefined||n.decimalPlaces!==undefined||n.decimalSeparator!==undefined||n.thousandsSeparator!==undefined||n.suffix!==undefined)return e.Number._oldFormat(t,n);try{var r=new i(n.style);return n.parseIntegerOnly&&r.setParseIntegerOnly(!0),r.format(t)}catch(s){}return e.Number._oldFormat(t,n)},parse:function(t,n){try{var r=new i(n.style);return r.parse(t,n.parsePosition)}catch(s){}return e.Number._oldParse(t)}},!0),e.namespace("Parsers").number=e.Number.parse},"@VERSION@",{lang:["af","af-NA","af-ZA","am-ET","am","ar-AE","ar-BH","ar-DZ","ar-EG","ar-IQ","ar-JO","ar","ar-KW","ar-LB","ar-LY","ar-MA","ar-OM","ar-QA","ar-SA","ar-SD","ar-SY","ar-TN","ar-YE","as-IN","as","az-AZ","az-Cyrl-AZ","az-Cyrl","az","az-Latn-AZ","be-BY","be","bg-BG","bg","bn-BD","bn-IN","bn","bo-CN","bo-IN","bo","ca-ES","ca","cs-CZ","cs","cy-GB","cy","da-DK","da","de-AT","de-BE","de-CH","de-DE","de","de-LI","de-LU","el-CY","el-GR","el","en-AU","en-BE","en-BW","en-BZ","en-CA","en-GB","en-HK","en-IE","en-IN","en-JM","en-JO","en-MH","en-MT","en-MY","en-NA","en-NZ","en-PH","en-PK","en-RH","en-SG","en-TT","en-US","en-US-POSIX","en-VI","en-ZA","en-ZW","eo","es-AR","es-BO","es-CL","es-CO","es-CR","es-DO","es-EC","es-ES","es-GT","es-HN","es","es-MX","es-NI","es-PA","es-PE","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et-EE","et","eu-ES","eu","fa-AF","fa-IR","fa","fi-FI","fi","fil","fil-PH","fo-FO","fo","fr-BE","fr-CA","fr-CH","fr-FR","fr","fr-LU","fr-MC","fr-SN","ga-IE","ga","gl-ES","gl","gsw-CH","gsw","gu-IN","gu","gv-GB","gv","ha-GH","ha","ha-Latn-GH","ha-Latn-NE","ha-Latn-NG","ha-NE","ha-NG","haw","haw-US","he-IL","he","hi-IN","hi","hr-HR","hr","hu-HU","hu","hy-AM","hy","id-ID","id","ii-CN","ii","in-ID","in","is-IS","is","it-CH","it-IT","it","iw-IL","iw","ja-JP","ja-JP-TRADITIONAL","ja","","ka-GE","ka","kk-Cyrl-KZ","kk","kk-KZ","kl-GL","kl","km","km-KH","kn-IN","kn","ko","kok-IN","kok","ko-KR","kw-GB","kw","lt","lt-LT","lv","lv-LV","mk","mk-MK","ml-IN","ml","mr-IN","mr","ms-BN","ms","ms-MY","mt","mt-MT","nb","nb-NO","ne-IN","ne","ne-NP","nl-BE","nl","nl-NL","nn","nn-NO","no","no-NO","no-NO-NY","om-ET","om","om-KE","or-IN","or","pa-Arab","pa-Arab-PK","pa-Guru-IN","pa-IN","pa","pa-PK","pl","pl-PL","ps-AF","ps","pt-BR","pt","pt-PT","ro","ro-MD","ro-RO","ru","ru-RU","ru-UA","sh-BA","sh-CS","sh","sh-YU","si","si-LK","sk","sk-SK","sl","sl-SI","so-DJ","so-ET","so","so-KE","so-SO","sq-AL","sq","sr-BA","sr-CS","sr-Cyrl-BA","sr-Cyrl-CS","sr-Cyrl-ME","sr-Cyrl-RS","sr-Cyrl-YU","sr","sr-Latn-BA","sr-Latn-CS","sr-Latn","sr-Latn-ME","sr-Latn-RS","sr-Latn-YU","sr-ME","sr-RS","sr-YU","sv-FI","sv","sv-SE","sw","sw-KE","sw-TZ","ta-IN","ta","te-IN","te","th","th-TH","ti-ER","ti-ET","ti","tl","tl-PH","tr","tr-TR","uk","uk-UA","ur-IN","ur","ur-PK","uz-AF","uz-Arab-AF","uz-Arab","uz-Cyrl-UZ","uz","uz-Latn","uz-Latn-UZ","uz-UZ","vi","vi-VN","zh-CN","zh-Hans-CN","zh-Hans-HK","zh-Hans-MO","zh-Hans-SG","zh-Hant-HK","zh-Hant","zh-Hant-MO","zh-Hant-TW","zh-HK","zh","zh-MO","zh-SG","zh-TW","zu","zu-ZA"],requires:["datatype-number-format","datatype-number-parse"]});
