YUI.add("datatype-date-format-advanced",function(e,t){var n="datatype-date-format-advanced",r,i,s,o,u,a,f,l="<datePattern>",c="</datePattern>";r=e.Intl.Common.BaseFormat,e.Date.__advancedFormat=!0,i={weekdayMonShort:"M",weekdayTueShort:"T",weekdayWedShort:"W",weekdayThuShort:"T",weekdayFriShort:"F",weekdaySatShort:"S",weekdaySunShort:"S",monthJanShort:"J",monthFebShort:"F",monthMarShort:"M",monthAprShort:"A",monthMayShort:"M",monthJunShort:"J",monthJulShort:"J",monthAugShort:"A",monthSepShort:"S",monthOctShort:"O",monthNovShort:"N",monthDecShort:"D"},e.Date.__zDateFormat=function(t,n,i){s.superclass.constructor.call(this,t,n),this.timeZone=new e.Date.Timezone(i);if(t===null)return;var o,u,a,f,l,c,h=/^(('((''|[^'])+?)'(?!'))|[^GyMwWDdFEaHkKhmsSzZ']+)/;for(u=0;u<t.length;u++)a=t.charAt(u),s._META_CHARS.indexOf(a)!==-1?(l=new RegExp("^"+a+"+"),f=l.exec(t.slice(u))[0],o=this._createSegment(a,f),o!==null&&(u+=f.length-1,o._index=this._segments.length,this._segments.push(o))):(f=h.exec(t.slice(u)),f&&(f=f[0],c=f.length,u+=c-1,f.indexOf("''")!==-1&&(f=f.replace("''","'"),t=t.slice(0,u)+f+t.slice(u+c)),f=f.replace(/^'/,"").replace(/'$/,""),o=new r.TextSegment(this,f),this._segments.push(o)))},s=e.Date.__zDateFormat,e.extend(s,r),e.mix(s,{SHORT:0,MEDIUM:1,LONG:2,DEFAULT:1,_META_CHARS:"GyMwWDdFEaHkKhmsSzZ"}),e.mix(s.prototype,{_createSegment:function(e,t){if(!t)return null;var n=null;switch(e){case"G":n=new s.EraSegment(this,t);break;case"y":n=new s.YearSegment(this,t);break;case"M":n=new s.MonthSegment(this,t);break;case"w":case"W":n=new s.WeekSegment(this,t);break;case"D":case"d":n=new s.DaySegment(this,t);break;case"F":case"E":n=new s.WeekdaySegment(this,t);break;case"a":n=new s.AmPmSegment(this,t);break;case"H":case"k":case"K":case"h":n=new s.HourSegment(this,t);break;case"m":n=new s.MinuteSegment(this,t);break;case"s":case"S":n=new s.SecondSegment(this,t);break;case"z":case"Z":n=new s.TimezoneSegment(this,t)}return n},format:function(e,t){var n=!1,r=[],i=!1,s;t!==null&&t!==""&&(n=!0);for(s=0;s<this._segments.length;s++)this._segments[s]._s===l?(n&&r.push(t),i=!0):this._segments[s]._s===c?i=!1:(!i||!n)&&r.push(this._segments[s].format(e));return r.join("")}},!0),s.DateSegment=function(e,t){s.DateSegment.superclass.constructor.call(this,e,t)},e.extend(s.DateSegment,r.Segment),s.EraSegment=function(e,t){s.EraSegment.superclass.constructor.call(this,e,t)},e.extend(s.EraSegment,s.DateSegment),s.EraSegment.prototype.format=function(){return this.getFormat().AD},s.YearSegment=function(e,t){s.YearSegment.superclass.constructor.call(this,e,t)},e.extend(s.YearSegment,s.DateSegment),e.mix(s.YearSegment.prototype,{format:function(t){var n=String(t.getFullYear());return this._s.length!==1&&this._s.length<4?n.substr(n.length-2):e.Intl.Common.zeroPad(n,this._s.length)}},!0),s.MonthSegment=function(e,t){s.MonthSegment.superclass.constructor.call(this,e,t),this.initialize()},e.extend(s.MonthSegment,s.DateSegment),e.mix(s.MonthSegment.prototype,{initialize:function(){s.MonthSegment.MONTHS={},s.MonthSegment.MONTHS[s.SHORT]=[i.monthJanShort,i.monthFebShort,i.monthMarShort,i.monthAprShort,i.monthMayShort,i.monthJunShort,i.monthJulShort,i.monthAugShort,i.monthSepShort,i.monthOctShort,i.monthNovShort,i.monthDecShort];var e=this.getFormat().Formats;s.MonthSegment.MONTHS[s.MEDIUM]=[e.monthJanMedium,e.monthFebMedium,e.monthMarMedium,e.monthAprMedium,e.monthMayMedium,e.monthJunMedium,e.monthJulMedium,e.monthAugMedium,e.monthSepMedium,e.monthOctMedium,e.monthNovMedium,e.monthDecMedium],s.MonthSegment.MONTHS[s.LONG]=[e.monthJanLong,e.monthFebLong,e.monthMarLong,e.monthAprLong,e.monthMayLong,e.monthJunLong,e.monthJulLong,e.monthAugLong,e.monthSepLong,e.monthOctLong,e.monthNovLong,e.monthDecLong]},format:function(t){var n=t.getMonth();switch(this._s.length){case 1:return String(n+1);case 2:return e.Intl.Common.zeroPad(n+1,2);case 3:return s.MonthSegment.MONTHS[s.MEDIUM][n]||s.MonthSegment.MONTHS[s.LONG][n];case 5:return s.MonthSegment.MONTHS[s.SHORT][n]}return s.MonthSegment.MONTHS[s.LONG][n]}},!0),s.WeekSegment=function(e,t){s.WeekSegment.superclass.constructor.call(this,e,t)},e.extend(s.WeekSegment,s.DateSegment),s.WeekSegment.prototype.format=function(t){var n=t.getYear(),r=t.getMonth(),i=t.getDate(),s=/w/.test(this._s),o=new Date(n,s?0:r,1),u=1;while(!(o.getMonth()>r||o.getMonth()===r&&o.getDate()>=i))o.setDate(o.getDate()+7),u++;return e.Intl.Common.zeroPad(u,this._s.length)},s.DaySegment=function(e,t){s.DaySegment.superclass.constructor.call(this,e,t)},e.extend(s.DaySegment,s.DateSegment),s.DaySegment.prototype.format=function(t){var n=t.getMonth(),r=t.getDate(),i=t.getYear(),s;if(/D/.test(this._s))while(n>0)s=new Date(i,n,1),s.setDate(0),r+=s.getDate(),n--;return e.Intl.Common.zeroPad(r,this._s.length)},s.WeekdaySegment=function(e,t){s.WeekdaySegment.superclass.constructor.call(this,e,t),this.initialize()},e.extend(s.WeekdaySegment,s.DateSegment),e.mix(s.WeekdaySegment.prototype,{initialize:function(){s.WeekdaySegment.WEEKDAYS={},s.WeekdaySegment.WEEKDAYS[s.SHORT]=[i.weekdaySunShort,i.weekdayMonShort,i.weekdayTueShort,i.weekdayWedShort,i.weekdayThuShort,i.weekdayFriShort,i.weekdaySatShort];var e=this.getFormat().Formats;s.WeekdaySegment.WEEKDAYS[s.MEDIUM]=[e.weekdaySunMedium,e.weekdayMonMedium,e.weekdayTueMedium,e.weekdayWedMedium,e.weekdayThuMedium,e.weekdayFriMedium,e.weekdaySatMedium],s.WeekdaySegment.WEEKDAYS[s.LONG]=[e.weekdaySunLong,e.weekdayMonLong,e.weekdayTueLong,e.weekdayWedLong,e.weekdayThuLong,e.weekdayFriLong,e.weekdaySatLong]},format:function(t){var n=t.getDay(),r;if(/E/.test(this._s)){switch(this._s.length){case 4:r=s.LONG;break;case 5:r=s.SHORT;break;default:r=s.MEDIUM}return s.WeekdaySegment.WEEKDAYS[r][n]}return e.Intl.Common.zeroPad(n,this._s.length)}},!0),s.TimeSegment=function(e,t){s.TimeSegment.superclass.constructor.call(this,e,t)},e.extend(s.TimeSegment,e.Intl.Common.BaseFormat.Segment),s.HourSegment=function(e,t){s.HourSegment.superclass.constructor.call(this,e,t)},e.extend(s.HourSegment,s.TimeSegment
),e.mix(s.HourSegment.prototype,{format:function(t){var n=t.getHours();return n>12&&/[hK]/.test(this._s)?n-=12:n===0&&/[h]/.test(this._s)&&(n=12),e.Intl.Common.zeroPad(n,this._s.length)}},!0),s.MinuteSegment=function(e,t){s.MinuteSegment.superclass.constructor.call(this,e,t)},e.extend(s.MinuteSegment,s.TimeSegment),e.mix(s.MinuteSegment.prototype,{format:function(t){var n=t.getMinutes();return e.Intl.Common.zeroPad(n,this._s.length)}},!0),s.SecondSegment=function(e,t){s.SecondSegment.superclass.constructor.call(this,e,t)},e.extend(s.SecondSegment,s.TimeSegment),s.SecondSegment.prototype.format=function(t){var n=/s/.test(this._s)?t.getSeconds():t.getMilliseconds();return e.Intl.Common.zeroPad(n,this._s.length)},s.AmPmSegment=function(e,t){s.AmPmSegment.superclass.constructor.call(this,e,t)},e.extend(s.AmPmSegment,s.TimeSegment),e.mix(s.AmPmSegment.prototype,{format:function(e){var t=e.getHours();return t<12?this.getFormat().Formats.periodAm:this.getFormat().Formats.periodPm}},!0),s.TimezoneSegment=function(e,t){s.TimezoneSegment.superclass.constructor.call(this,e,t)},e.extend(s.TimezoneSegment,s.TimeSegment),e.mix(s.TimezoneSegment.prototype,{format:function(){var e=this.getFormat().timeZone;return/Z/.test(this._s)?e.getShortName():this._s.length<4?e.getMediumName():e.getLongName()}},!0),e.Date.__BuddhistDateFormat=function(e,t,n){o.superclass.constructor.call(this,e,t,n);var r=this._segments,i;for(i=0;i<r.length;i++)r[i]instanceof s.YearSegment?r[i]=new o.YearSegment(r[i]):r[i]instanceof s.EraSegment&&(r[i]=new o.EraSegment(r[i]))},o=e.Date.__BuddhistDateFormat,e.extend(o,s),o.YearSegment=function(e){o.YearSegment.superclass.constructor.call(this,e._parent,e._s)},e.extend(o.YearSegment,s.YearSegment),o.YearSegment.prototype.format=function(t){var n=t.getFullYear();return n=String(n+543),this._s.length!==1&&this._s.length<4?n.substr(n.length-2):e.Intl.Common.zeroPad(n,this._s.length)},o.EraSegment=function(e){o.EraSegment.superclass.constructor.call(this,e._parent,e._s)},e.extend(o.EraSegment,s.EraSegment),o.EraSegment.prototype.format=function(){return"BE"},e.Date.__YDateFormat=function(t,r,i,u,a){if(t===undefined||t===null)t=e.Date.Timezone.getTimezoneIdForOffset((new Date).getTimezoneOffset()*-60);this._Formats=e.Intl.get(n),e.Date.Timezone.isValidTimezoneId(t)||e.error("Could not find timezone: "+t),this._timeZone=t,this._timeZoneInstance=new e.Date.Timezone(this._timeZone),this._dateFormat=r||0,this._timeFormat=i||0,this._timeZoneFormat=u||0,this._relative=a||!1,this._pattern=this._generatePattern();var f=e.Intl.getLang(n);f.match(/^th/)&&!f.match(/u-ca-gregory/)?this._dateFormatInstance=new o(this._pattern,this._Formats,this._timeZone):this._dateFormatInstance=new s(this._pattern,this._Formats,this._timeZone)},u=e.Date.__YDateFormat,e.mix(e.Date,{DATE_FORMATS:{NONE:0,WYMD_LONG:1,WYMD_ABBREVIATED:2,WYMD_SHORT:3,WMD_LONG:4,WMD_ABBREVIATED:5,WMD_SHORT:6,YMD_LONG:7,YMD_ABBREVIATED:8,YMD_SHORT:9,YM_LONG:10,MD_LONG:11,MD_ABBREVIATED:12,MD_SHORT:13,W_LONG:14,W_ABBREVIATED:15,M_LONG:16,M_ABBREVIATED:17,YMD_FULL:18,RELATIVE_DATE:19},TIME_FORMATS:{NONE:0,HM_ABBREVIATED:1,HM_SHORT:2,H_ABBREVIATED:3},TIMEZONE_FORMATS:{NONE:0,Z_ABBREVIATED:1,Z_SHORT:2}}),e.mix(u.prototype,{_generateDatePattern:function(){var t=this._dateFormat;t&&e.Lang.isString(t)&&(t=e.Date.DATE_FORMATS[t]);if(t===null)return"";switch(t){case e.Date.DATE_FORMATS.NONE:return this._relative=!1,"";case e.Date.DATE_FORMATS.WYMD_LONG:return this._Formats.WYMD_long;case e.Date.DATE_FORMATS.WYMD_ABBREVIATED:return this._Formats.WYMD_abbreviated;case e.Date.DATE_FORMATS.WYMD_SHORT:return this._Formats.WYMD_short;case e.Date.DATE_FORMATS.WMD_LONG:return this._Formats.WMD_long;case e.Date.DATE_FORMATS.WMD_ABBREVIATED:return this._Formats.WMD_abbreviated;case e.Date.DATE_FORMATS.WMD_SHORT:return this._Formats.WMD_short;case e.Date.DATE_FORMATS.YMD_LONG:return this._Formats.YMD_long;case e.Date.DATE_FORMATS.YMD_ABBREVIATED:return this._Formats.YMD_abbreviated;case e.Date.DATE_FORMATS.YMD_SHORT:return this._Formats.YMD_short;case e.Date.DATE_FORMATS.YM_LONG:return this._relative=!1,this._Formats.YM_long;case e.Date.DATE_FORMATS.MD_LONG:return this._Formats.MD_long;case e.Date.DATE_FORMATS.MD_ABBREVIATED:return this._Formats.MD_abbreviated;case e.Date.DATE_FORMATS.MD_SHORT:return this._Formats.MD_short;case e.Date.DATE_FORMATS.W_LONG:return this._relative=!1,this._Formats.W_long;case e.Date.DATE_FORMATS.W_ABBREVIATED:return this._relative=!1,this._Formats.W_abbreviated;case e.Date.DATE_FORMATS.M_LONG:return this._relative=!1,this._Formats.M_long;case e.Date.DATE_FORMATS.M_ABBREVIATED:return this._relative=!1,this._Formats.M_abbreviated;case e.Date.DATE_FORMATS.YMD_FULL:return this._Formats.YMD_full;default:e.error("Date format given does not exist")}},_generateTimePattern:function(){var t=this._timeFormat;t&&e.Lang.isString(t)&&(t=e.Date.TIME_FORMATS[t]);if(t===null)return"";switch(t){case e.Date.TIME_FORMATS.NONE:return"";case e.Date.TIME_FORMATS.HM_ABBREVIATED:return this._Formats.HM_abbreviated;case e.Date.TIME_FORMATS.HM_SHORT:return this._Formats.HM_short;case e.Date.TIME_FORMATS.H_ABBREVIATED:return this._Formats.H_abbreviated;default:e.error("Time format given does not exist")}},_generateTimeZonePattern:function(){var t=this._timeZoneFormat;t&&e.Lang.isString(t)&&(t=e.Date.TIMEZONE_FORMATS[t]);if(t===null)return"";switch(t){case e.Date.TIMEZONE_FORMATS.NONE:return"";case e.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:return"z";case e.Date.TIMEZONE_FORMATS.Z_SHORT:return"Z";default:e.error("Time Zone format given does not exist")}},_generatePattern:function(){var t=this._generateDatePattern(),n=this._generateTimePattern(),r=this._generateTimeZonePattern(),i="";return t!==""&&(t="'"+l+"'"+t+"'"+c+"'"),n!==""&&r!==""?i=this._Formats.DateTimeTimezoneCombination:n!==""?i=this._Formats.DateTimeCombination:r!==""?i=this._Formats.DateTimezoneCombination:t!==""&&(i="{1}"),i=i.replace("{0}",n).replace("{1}",t).replace("{2}",r),i=e.Lang.trim(i.replace(/\s\s+/g
," ")),i},format:function(t){(t===null||!e.Lang.isDate(t))&&e.error("format called without a date.");var n=this._timeZoneInstance.getRawOffset()*1e3,r=null,i=new Date,s=new Date(i.getTime()+864e5),o=new Date(i.getTime()-864e5);return t=new Date(t.getTime()+t.getTimezoneOffset()*60*1e3+n),this._relative&&(t.getFullYear()===i.getFullYear()&&t.getMonth()===i.getMonth()&&t.getDate()===i.getDate()&&(r=this._Formats.today),t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()&&(r=this._Formats.tomorrow),t.getFullYear()===o.getFullYear()&&t.getMonth()===o.getMonth()&&t.getDate()===o.getDate()&&(r=this._Formats.yesterday)),this._dateFormatInstance.format(t,r)}},!0),e.Date.__YRelativeTimeFormat=function(t){t===null?t=e.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:e.Lang.isString(t)&&(t=e.Date.RELATIVE_TIME_FORMATS[t]),this.patterns=e.Intl.get(n),this.style=t;switch(t){case e.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:this.numUnits=2,this.abbr=!0;break;case e.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:this.numUnits=2,this.abbr=!1;break;case e.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:this.numUnits=1,this.abbr=!0;break;case e.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:this.numUnits=1,this.abbr=!1;break;default:e.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS")}},a=e.Date.__YRelativeTimeFormat,e.mix(e.Date,{currentDate:function(){return new Date},RELATIVE_TIME_FORMATS:{ONE_OR_TWO_UNITS_ABBREVIATED:0,ONE_OR_TWO_UNITS_LONG:1,ONE_UNIT_ABBREVIATED:2,ONE_UNIT_LONG:4}}),a.prototype._addResult=function(e,t){if(t===0&&this.result.length===0&&e!=="second")return!1;var n,r=e+"s",i=e+"_abbr",s=r+"_abbr";return this.abbr?n=t+" "+(t!==1?this.patterns[s]:this.patterns[i]):n=t+" "+(t!==1?this.patterns[r]:this.patterns[e]),this.result.push(n),!0},a.prototype.format=function(t,n){n===null?(n=(new Date).getTime()/1e3,t>n&&e.error("timeValue must be in the past")):t>n&&e.error("relativeTo must be greater than or equal to timeValue");var r=new Date((n-t)*1e3),i=this.numUnits,s,o,u;s=[["year",r.getUTCFullYear()-1970],["month",r.getUTCMonth()],["day",r.getUTCDate()-1],["hour",r.getUTCHours()],["minute",r.getUTCMinutes()],["second",r.getUTCSeconds()]],this.result=[];for(u=0;u<s.length&&i>0;u++)this._addResult(s[u][0],s[u][1])&&i--;o=this.result.length===1?this.patterns["RelativeTime/oneUnit"]:this.patterns["RelativeTime/twoUnits"];for(u=0;u<this.result.length;u++)o=o.replace("{"+u+"}",this.result[u]);for(u=this.result.length;u<this.numUnits;u++)o=o.replace("{"+u+"}","");return o=e.Lang.trim(o.replace(/\s+/g," ")),o},e.mix(e.Date,{_stripDecimals:function(e){return e>0?Math.floor(e):Math.ceil(e)}}),e.Date.__YDurationFormat=function(t){t&&e.Lang.isString(t)&&(t=e.Date.DURATION_FORMATS[t]),this.style=t,this.patterns=e.Intl.get(n)},f=e.Date.__YDurationFormat,e.mix(e.Date,{DURATION_FORMATS:{HMS_LONG:0,HMS_SHORT:1}}),e.mix(f,{_getDuration_XML:function(t){var n=new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),r=t.match(n);return r===null&&e.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'"),{hours:parseInt(r[4]||-1,10),minutes:parseInt(r[5]||-1,10),seconds:parseFloat(r[6]||-1,10)}},_getDuration_Seconds:function(t){var n={};return t<0&&e.error("TimeValue cannot be negative"),n.hours=e.Date._stripDecimals(t/3600),t%=3600,n.minutes=e.Date._stripDecimals(t/60),t%=60,n.seconds=t,n}}),f.prototype.format=function(t){e.Lang.isNumber(t)?t=f._getDuration_Seconds(t):e.Lang.isString(t)&&(t=f._getDuration_XML(t));var n=this.style===e.Date.DURATION_FORMATS.HMS_LONG?-1:0,r={hours:"",minutes:"",seconds:""},i="",s=function(e){return e};if(t.hours===undefined||t.hours===null||t.hours<0)t.hours=n;if(t.minutes===undefined||t.minutes===null||t.minutes<0)t.minutes=n;if(t.seconds===undefined||t.seconds===null||t.seconds<0)t.seconds=n;return(t.minutes>59||t.seconds>59)&&e.error("Minutes and Seconds should be less than 60"),e.Number!==undefined&&e.Number.format!==undefined&&(s=function(t){return e.Number.format(t)}),this.style===e.Date.DURATION_FORMATS.HMS_LONG?(i=this.patterns.HMS_long,t.hours>=0&&(r.hours=s(t.hours)+" "+(t.hours===1?this.patterns.hour:this.patterns.hours)),t.minutes>=0&&(r.minutes=t.minutes+" "+(t.minutes===1?this.patterns.minute:this.patterns.minutes)),t.seconds>=0&&(r.seconds=t.seconds+" "+(t.seconds===1?this.patterns.second:this.patterns.seconds))):(i=this.patterns.HMS_short,r={hours:s(t.hours),minutes:e.Intl.Common.zeroPad(t.minutes,2),seconds:e.Intl.Common.zeroPad(t.seconds,2)}),i=i.replace("{0}",r.hours),i=i.replace("{1}",r.minutes),i=i.replace("{2}",r.seconds),i=e.Lang.trim(i.replace(/\s\s+/g," ")),i},e.Date.formatWithStrfTime=e.Date.format,e.mix(e.Date,{format:function(t,n){n=n||{};if(n.format&&e.Lang.isString(n.format))return e.Date.formatWithStrfTime(t,n);if(!e.Lang.isDate(t))return e.Lang.isValue(t)?t:"";var r,i;if(n.dateFormat||n.timeFormat||n.timezoneFormat)return window.Intl!==undefined&&!n.relativeDate?e.Date.formatEcma(t,n):(r=new u(n.timezone,n.dateFormat,n.timeFormat,n.timezoneFormat,n.relativeDate),r.format(t));i=typeof e.Date.currentDate=="function"?e.Date.currentDate():e.Date.currentDate;if(n.relativeTimeFormat)return r=new a(n.relativeTimeFormat,i),r.format(t.getTime()/1e3,e.Date.currentDate.getTime()/1e3);e.error("Unrecognized format options.")},formatDuration:function(e,t){return t=t||{},(new f(t.style)).format(e)}},!0)},"@VERSION@",{lang:["en-US","th"],requires:["datatype-date-format","datatype-date-timezone"]});
