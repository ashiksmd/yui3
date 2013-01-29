YUI.add("intl-format",function(e,t){var n,r,i,s,o,u,a,f,l;e.Intl.MsgBaseFormatter=function(e){this.values=e},n=e.Intl.MsgBaseFormatter,e.mix(n.prototype,{getValue:function(t){return e.Lang.isArray(this.values)&&(t=parseInt(t,10)),this.values[t]},getParams:function(e){if(!e||!e.key)return!1;var t=this.getValue(e.key);return t!==undefined?(e.value=t,!0):!1},format:function(){e.error("Not implemented")}}),e.mix(n,{createInstance:function(){e.error("Not implemented")},getCurrentTimeZone:function(){var t=(new Date).getTimezoneOffset()*-60;return e.Date.Timezone.getTimezoneIdForOffset(t)}}),e.Intl.StringFormatter=function(e){r.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*}"},r=e.Intl.StringFormatter,e.extend(r,n),r.createInstance=function(e){return new r(e)},e.mix(r.prototype,{getParams:function(e,t){if(t&&t[1]){e.key=t[1];if(n.prototype.getParams.call(this,e))return!0}return!1},format:function(e){var t=new RegExp(this.regex,"gm"),n=null,r;while(n=t.exec(e))r={},this.getParams(r,n)&&(e=e.replace(n[0],r.value));return e}},!0),e.Intl.DateFormatter=function(t){i.superclass.constructor.call(this,t),this.styles={"short":[e.Date.DATE_FORMATS.YMD_SHORT,0,0],medium:[e.Date.DATE_FORMATS.YMD_ABBREVIATED,0,0],"long":[e.Date.DATE_FORMATS.YMD_LONG,0,0],full:[e.Date.DATE_FORMATS.WYMD_LONG,0,0]},this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}"},i=e.Intl.DateFormatter,e.extend(i,n),i.createInstance=function(e){return new i(e)},e.mix(i.prototype,{getParams:function(e,t){return t&&(t[1]&&(e.key=t[1]),t[3]&&(e.style=t[3])),e.style||(e.style="medium"),this.styles[e.style]?e.key&&n.prototype.getParams.call(this,e)?!0:!1:!1},format:function(t,r){var i=new RegExp(this.regex,"gm"),s=null,o,u,a;while(s=i.exec(t))o={},this.getParams(o,s)&&(u=this.styles[o.style],a=e.Date.format(new Date(o.value),{timezone:r.timezone||n.getCurrentTimeZone(),dateFormat:u[0],timeFormat:u[1],timezoneFormat:u[2]}),t=t.replace(s[0],a));return t}},!0),e.Intl.TimeFormatter=function(t){s.superclass.constructor.call(this,t),this.styles={"short":[0,e.Date.TIME_FORMATS.HM_SHORT,e.Date.TIMEZONE_FORMATS.NONE],medium:[0,e.Date.TIME_FORMATS.HM_ABBREVIATED,e.Date.TIMEZONE_FORMATS.NONE],"long":[0,e.Date.TIME_FORMATS.HM_ABBREVIATED,e.Date.TIMEZONE_FORMATS.Z_SHORT],full:[0,e.Date.TIME_FORMATS.HM_ABBREVIATED,e.Date.TIMEZONE_FORMATS.Z_ABBREVIATED]},this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}"},s=e.Intl.TimeFormatter,e.extend(s,i),s.createInstance=function(e){return new s(e)},e.Intl.NumberFormatter=function(t){o.superclass.constructor.call(this,t),this.styles={integer:e.Number.STYLES.NUMBER_STYLE,percent:e.Number.STYLES.PERCENT_STYLE,currency:e.Number.STYLES.CURRENCY_STYLE},this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}"},o=e.Intl.NumberFormatter,e.extend(o,n),o.createInstance=function(e){return new o(e)},e.mix(o.prototype,{getParams:function(e,t){return t&&(t[1]&&(e.key=t[1]),t[3]&&(e.style=t[3])),e.style||(e.style="integer",e.showDecimal=!0),this.styles[e.style]?e.key&&n.prototype.getParams.call(this,e)?!0:!1:!1},format:function(t){var n=new RegExp(this.regex,"gm"),r=null,i,s;while(r=n.exec(t))i={},this.getParams(i,r)&&(s={style:this.styles[i.style]},i.style==="integer"&&!i.showDecimal&&(s.parseIntegerOnly=!0),t=t.replace(r[0],e.Number.format(i.value,s)));return t}},!0),e.Intl.SelectFormatter=function(e){u.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*"},u=e.Intl.SelectFormatter,e.extend(u,n),u.createInstance=function(e){return new u(e)},e.mix(u.prototype,{getParams:function(e,t){return t&&t[1]&&(e.key=t[1]),e.key&&n.prototype.getParams.call(this,e)?!0:!1},parseOptions:function(e,t){var n={},r="",i="",s="",o,u;for(o=t;o<e.length;o++){u=e.charAt(o);if(u==="\\")s+=u+e.charAt(o+1),o++;else if(u==="}"){if(s===""){o++;break}i=s,n[r.trim()]=i,s=r=i=""}else u==="{"?(r=s,s=""):s+=u}return s!==""?null:{options:n,next:o}},select:function(e,t){for(var n in e){if(n==="other")continue;if(n===t.value)return e[n]}return e.other},format:function(e){var t=new RegExp(this.regex,"gm"),n=null,r,i,s,o;while(n=t.exec(e)){r={};if(this.getParams(r,n)){i=this.parseOptions(e,t.lastIndex);if(!i)continue;t.lastIndex=i.next,i=i.options,s=this.select(i,r),s&&(o=e.indexOf(n[0]),e=e.slice(0,o)+s+e.slice(t.lastIndex))}}return e}},!0),e.Intl.PluralFormatter=function(e){a.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*"},a=e.Intl.PluralFormatter,e.extend(a,u),a.createInstance=function(e){return new a(e)},a.prototype.select=function(e,t){var n=e.other;return t.value===0&&e.zero&&(n=e.zero),t.value===1&&e.one&&(n=e.one),t.value===2&&e.two&&(n=e.two),n=n.replace("#",(new o({VAL:t.value})).format("{VAL, number, integer}")),n},e.Intl.ChoiceFormatter=function(e){f.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}"},f=e.Intl.ChoiceFormatter,e.extend(f,u),f.createInstance=function(e){return new f(e)},e.mix(f.prototype,{parseOptions:function(e){var t=[],n=e.split("|"),r,i,s,o,u,a,f;for(r=0;r<n.length;r++){s=n[r],o=["#","<","\u2264"];for(i=0;i<o.length;i++){u=o[i];if(s.indexOf(u)!==-1){a=s.split(u),f={value:parseInt(a[0],10),result:a[1],relation:u},t.push(f);break}}}return t},getParams:function(e,t){return u.prototype.getParams.call(this,e,t)&&t[2]?(e.choices=this.parseOptions(t[2]),e.choices===[]?!1:!0):!1},select:function(e){var t,n,r,i,s;for(s=0;s<e.choices.length;s++){t=e.choices[s],n=t.value,r=t.result,i=t.relation;if(i==="#"&&n===e.value||i==="<"&&n<e.value||i==="\u2264"&&n<=e.value)return r}return""},format:function(e){var t=new RegExp(this.regex,"gm"),n=null,r,i;while(n=t.exec(e))r={},this.getParams(r,n)&&(i=this.select(r),i&&(e=e.replace(n[0],i)));return e}},!0),l=[r,i,s,o,f,a,u],e.mix(e.Intl,{formatMessage:function(e,t,n){n=n||{};var r,i;for(r=0;r<l.length;r++)i=l[r].createInstance(t),e=i.format(e,n);return e}})},"@VERSION@",{requires:["datatype-date-advanced-format","datatype-number-advanced-format","intl"]});
