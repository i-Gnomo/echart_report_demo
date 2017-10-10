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
	},
	getCookieData : function(ckname){
	    var cookies = document.cookie;
	    var name = ckname+'=';
	    var name_s = cookies.indexOf(name);
	    var s,e;
	    if(name_s>-1){
	        s = name_s + name.length;
	        e = cookies.indexOf(';',s);
	        if(e == -1){
	            e = cookies.length;
	        }
	        return unescape(cookies.substring(s,e));
	    }else{
	        return '';
	    }
	},
	noRealWayTip: function(targetSrc){
		//无法查看真实的客流报表数据
		layer.open({
			type: 1,
			title: '<div style="text-align:center;padding-left:60px;">温馨提示</div>',
			closeBtn: false,
			area: '300px;',
			shade: 0.5,
			shadeClose: true,
			id: 'LAY_norealdata',
			resize: false,
			btn: ['取消', '去查看'],
			btnAlign: 'c',
			moveType: 1,
			content: '<div style="padding: 25px; line-height: 22px; color: #454545; font-weight: 300;">要查看真实的客流报表数据，<br>需要先部署车巡“门店客流采集”智能硬件</div>',
			success: function(layero){
				var btn = layero.find('.layui-layer-btn');
				btn.find('.layui-layer-btn0').addClass('gray-btn');
				btn.find('.layui-layer-btn1').attr({
					href: targetSrc,
					target: '_blank'
				}).addClass('blue-btn');
			}
		})
	}
}

$(function(){
	$('.ask-tip').hover(function () {
        tipIndex = layer.tips($(this).attr('data-title').replace(/\\n/g, '<br/>'), this, {
        	area: '260px',
            tips: [1, '#1771c0'],
            time: 0,
            success: function (tip) {
                var box = $(tip[0]);
                box.offset({left: box.offset().left - 10});
            }
        });
    }, function () {
        if (tipIndex) {
            layer.close(tipIndex);
        }
    });
})