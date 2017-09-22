// JavaScript Document
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
if(Sys.ie) document.documentElement.addBehavior("#default#userdata");
try{$.fn.combobox.defaults.editable = false;$.fn.datebox.defaults.editable = false;}catch(e){}

var Core = {
	saveUserdata : function(name,data){
		  if(Sys.ie){
			  if(data.length < 54889) {
				  with(document.documentElement){setAttribute("value",data);save('Dv__'+name);}
			  }
		  } else if(window.localStorage){
			  localStorage.setItem('Dv__'+name, data);
		  } else if(window.sessionStorage){
			  sessionStorage.setItem('Dv__'+name, data);
		  }
	},
	loadUserdata : function(name){
		if(Sys.ie){
			with(document.documentElement){load('Dv__' + name);return getAttribute("value");}
		} else if(window.localStorage){
			return localStorage.getItem('Dv__'+name);
		} else if(window.sessionStorage){
			return sessionStorage.getItem('Dv__'+name);
		}
	},
	delUserdata : function(name){
		if(Sys.ie){
			with(document.documentElement){removeAttribute('value');save('Dv__'+name);}
		} else if(window.localStorage){
			localStorage.removeItem('Dv__'+name);
		} else if(window.sessionStorage){
			sessionStorage.removeItem('Dv__'+name);
		}
		return true;
	}
}