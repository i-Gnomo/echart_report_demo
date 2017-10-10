$(function(){
    $.fn.extend({
        setWeekInput: function(){ //获取一周日期
            var _t= $(this),
                _p = _t.datebox('panel'); //日期选择对象
                _p.find(".calendar-header div").unbind('c_header').bind("click.c_header",function(e){
                    setTimeout(function(){
                        var _cellbox = _t.datebox('panel').find('.calendar-dtable tbody');
                        bindTds(_cellbox);
                    }, 0);
                })
                _p.find(".calendar-header .calendar-text").click(function(e){
                    e.stopPropagation();
                })
                _t.datebox({
                    onShowPanel: function () {
                        _p.find('.calendar-selected').removeClass("calendar-selected");
                        var _cellbox = _p.find('.calendar-dtable tbody');
                        bindTds(_cellbox);
                    },
                    formatter: function (d) {
                        return _t.data('mydate');
                    }
                })
            function bindTds(_cellbox){
                var tds = _cellbox.find("td");
                    tds.each(function(index,item){
                        $(item).unbind(".week").bind("mouseover.week",function(e){
                            $(this).siblings("td").addClass("calendar-nav-hover");
                        }).bind("mouseout.week",function(e){
                            $(this).siblings("td").removeClass("calendar-nav-hover");
                        }).bind("click.week",function(e){
                            e.stopPropagation();
                            var _parent = $(this).parent("tr");
                            var s_day = _parent.find("td:first").attr("abbr");
                            var e_day = _parent.find("td:last").attr("abbr");
                                s_day = splitVal(s_day);
                                e_day = splitVal(e_day);
                            //console.log(s_day+'-'+e_day);
                            _t.data('mydate',s_day + '/' + e_day);
                            _t.datebox('hidePanel').datebox('setValue', s_day + '/' + e_day);
                        });

                    })
            }
            //格式化日期
            function splitVal(_v){
                var arr = new Array();
                    arr = _v.split(",");
                var y = arr[0],
                    m = parseInt(arr[1])>9? parseInt(arr[1]) : ('0'+parseInt(arr[1])),
                    d = parseInt(arr[2])>9? parseInt(arr[2]) : ('0'+parseInt(arr[2]));
                //console.log(arr);
                return y +'-'+ m +'-'+ d;
            }
        },
        setMonthInput: function(){ //获取月份日期
            var _this = $(this);
            //console.log(_this);
            var _p = _this.datebox('panel'), //日期选择对象
                isMonth = false, //是否是月份选择
                isVers1dot4 = _p.find('a.datebox-current'),
                panel_span = isVers1dot4.length ? _p.find('div.calendar-title span') : _p.find('span.calendar-text'); //1.4.x版本
                // _span元素触发月份面板
                if (isVers1dot4.length) {//1.3.x版本，取消Today按钮的click事件，重新绑定新事件设置日期框为今天，防止弹出日期选择面板
                    isVers1dot4.unbind('click').click(function () {
                        var now = new Date();
                        _this.datebox('hidePanel').datebox('setValue', now.getFullYear() + '-' + (now.getMonth() + 1));
                    });
                }
            var yearInput = _p.find('input.calendar-menu-year');//年份输入框
            var panelTimer = null;
            _this.datebox({
                onShowPanel: function () {//显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
                    // panel_span.trigger('click');
                    clearTimeout(panelTimer);
                    panelTimer = setTimeout(function(){
                        panel_span.trigger('click'); //触发click事件弹出月份层
                        //fix 1.3.x不选择日期点击其他地方隐藏在弹出日期框显示日期面板

                        if (_p.find('div.calendar-menu').is(':hidden')){
                            _p.find('div.calendar-menu').show();
                        } 
                        if (!isMonth){
                            setTimeout(function () {//延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
                                isMonth = _p.find('div.calendar-menu-month-inner td');
                                isMonth.click(function (e) {
                                    e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
                                    var year = /\d{4}/.exec(panel_span.html())[0],//得到年份
                                        month = parseInt($(this).attr('abbr'), 10); //月份，这里不需要+1
                                    _this.datebox('hidePanel').datebox('setValue', year + '-' + month); //隐藏日期对象并设置日期的值
                                });
                            }, 0);
                        }
                        yearInput.unbind();//解绑年份输入框中任何事件
                    }, 0);
                },
                parser: function (s) {
                    if (!s) return new Date();
                    var arr = s.split('-');
                    return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
                },
                formatter: function (d) {
                    var _m = d.getMonth() + 1;
                        _m = _m>9?_m:('0'+_m);
                    return d.getFullYear() + '-' + _m;/*getMonth返回的是0开始的，忘记了。。已修正*/ 
                }
            });
        }
    })
    $('.week-comb').setWeekInput();
    $('.month-comb').setMonthInput();

})

window.recordTime = 'day';
$("#shop_date_type").combobox({
    onSelect: function(record){
        // $(".rep-table-list,.report-chart-box").hide();
        window.recordTime = record.value;
        $(".field[attr-dateType]").addClass("disn");
        $(".field[attr-dateType='"+record.value+"']").removeClass("disn");
    }
})
function checkdateType(type){
    var timeBox = $('#daytime');
        switch(type){
            case 'day':
                timeBox = $('#daytime');
                break;
            case 'week':
                timeBox = $('#weektime');
                break;
            case 'month':
                timeBox = $('#monthtime');
                break;
            default:
                timeBox = $('#daytime');
        }
    return timeBox;
}

var dayfun = {
    gettoday: function(){
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth()+1;
        var day = d.getDate();
        var s = year+'-'+(mon<10?('0'+mon):mon)+'-'+(day<10?('0'+day):day);
        return s;
    },
    getBeforeDate: function(d,n){
        var n = n;
        d.setDate(d.getDate()-n);
        var year = d.getFullYear();
        var mon=d.getMonth()+1;
        var day=d.getDate();
        s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        return s;
    },
    getAfterDate: function(d,n){
        var n = n;
        d.setDate(d.getDate()+n);
        var year = d.getFullYear();
        var mon=d.getMonth()+1;
        var day=d.getDate();
        s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
        return s;
    },
    getlastweek: function(){
        var _this = this;
        var d = new Date();
        var _w = d.getDay();
        var s = _w == 0? 6:(_w - 1);
        var e = 6;
        var s = _this.getBeforeDate(d,s)+'/'+_this.getAfterDate(d,e);
        return s;
    },
    getdaymonth: function(){
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth()+1;
        var s = year+'-'+(mon<10?('0'+mon):mon);
        return s;
    }
}

var statuMessg = {
    statuError: function(msg){
        $('.report-chart-box .chart').hide();
        $('.report-chart-box').find('.no-data').remove();
        showChart();
        $('.report-chart-box .chart').before('<p class="no-data">'+msg+'</p>');
    },
    statuSucces: function(){
        $('.report-chart-box .chart').show();
        $('.report-chart-box').find('.no-data').remove();
    }
}