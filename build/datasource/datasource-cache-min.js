YUI.add("datasource-cache",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.mix(A,{NS:"cache",NAME:"dataSourceCache",ATTRS:{}});B.extend(A,B.Cache,{initializer:function(C){this.doBefore("_defRequestFn",this._beforeDefRequestFn);this.doBefore("_defResponseFn",this._beforeDefResponseFn);},_beforeDefRequestFn:function(D){var C=(this.retrieve(D.request))||null;if(C&&C.response){this.get("host").fire("response",B.mix({response:C.response},D));return new B.Do.Halt("DataSourceCache plugin halted _defRequestFn");}},_beforeDefResponseFn:function(C){this.add(C.request,C.response,(C.callback&&C.callback.argument));}});B.namespace("Plugin").DataSourceCache=A;},"@VERSION@",{requires:["datasource-local","cache"]});