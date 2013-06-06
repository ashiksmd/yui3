YUI.add("datatype-date-format-ecma",function(e,t){e.namespace("Date"),e.mix(e.Date,{DATE_FORMATS_ECMA:{0:{},1:{weekday:"long",year:"numeric",month:"long",day:"numeric"},2:{weekday:"short",year:"numeric",month:"short",day:"numeric"},3:{weekday:"short",year:"2-digit",month:"numeric",day:"numeric"},4:{weekday:"long",month:"long",day:"numeric"},5:{weekday:"short",month:"short",day:"numeric"},6:{weekday:"short",month:"numeric",day:"numeric"},7:{year:"numeric",month:"long",day:"numeric"},8:{year:"numeric",month:"short",day:"numeric"},9:{year:"2-digit",month:"numeric",day:"numeric"},10:{year:"numeric",month:"long"},11:{month:"long",day:"numeric"},12:{month:"short",day:"numeric"},13:{month:"numeric",day:"numeric"},14:{weekday:"long"},15:{weekday:"short"},16:{month:"long"},17:{month:"short"},18:{year:"numeric",month:"2-digit",day:"2-digit"}},TIME_FORMATS_ECMA:{0:{},1:{hour:"numeric",minute:"2-digit"},2:{hour:"numeric",minute:"2-digit"},3:{hour:"numeric"}},TIMEZONE_FORMATS_ECMA:{0:{},1:{timeZoneName:"short"},2:{timeZoneName:"long"}},formatEcma:function(t,n){var r=n.dateFormat||0,i=n.timeFormat||0,s=n.timezoneFormat||0,o,u=e.Intl.getLang("datatype-date-format-advanced"),a,f="",l="";return e.Lang.isString(r)&&(r=e.Date.DATE_FORMATS[r]),e.Lang.isString(i)&&(i=e.Date.TIME_FORMATS[i]),e.Lang.isString(s)&&(s=e.Date.TIMEZONE_FORMATS[s]),r===e.Date.DATE_FORMATS.YMD_FULL&&u!=="en-US"&&u!=="es-US"&&(r=e.Date.DATE_FORMATS.YMD_SHORT),o={},e.mix(o,e.Date.DATE_FORMATS_ECMA[r]),e.mix(o,e.Date.TIME_FORMATS_ECMA[i]),e.mix(o,e.Date.TIMEZONE_FORMATS_ECMA[s]),n.timezone&&(o.timeZone=n.timezone),u.match(/^th/)&&(a=u.split("-u-")[1],a&&(f=a.match(/ca-[^\-]+/),l=a.match(/nu-[^\-]+/)),f?f="-"+f:f="-ca-buddhist",l&&(l="-"+l),u="th-u"+f+l),t.toLocaleString(u,o)}})},"@VERSION@",{requires:["datatype-date-format-advanced"]});
