function switchUrl(type){
    /**
     * [url 路由 根据天周月数据判断]
     * @type {String}
     */
    var url = _staticPath + 'js/r_report/data/a2_data_day.json';
    switch(type){
        case 'day':
            url = _staticPath + 'js/r_report/data/a2_data_day.json';
            break;
        case 'week':
            url = _staticPath + 'js/r_report/data/a2_data_week.json';
            break;
        case 'month':
            url = _staticPath + 'js/r_report/data/a2_data_month.json';
            break;
        default:
            url = _staticPath + 'js/r_report/data/a2_data_day.json';

    }
    return url;
}

/**
 * [_main 图表容器]
 * @type {[type]}
 */
var _main = $("#main");

var rChart = (function(){
    var cht = {};
    /**
     * [getChartData 获取图表数据]
     * @param  {[type]} cbk [description]
     * @return {[type]}     [description]
     */
    var getChartData = function(parms,_url,cbk){
        // var _url = switchUrl(window.recordTime);
        $.post(_url,{info:parms},function(data){
            if(_main.length>0){
                _main.data('chartData',data);
                cbk && cbk();
            }
        })
    }

    cht.databaseRender = function(dataObj){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('myChart'),'macarons');
        //到店频次
        myChart.setOption(setCharts(dataObj.ddpc_flow));

        var myChart2 = echarts.init(document.getElementById('myChart2'),'macarons');
        //驻店时长
        myChart2.setOption(setChartsZd(dataObj.zd_flow));

        setHbData(dataObj);

        showChart();
        
        myChart.resize();
        myChart2.resize();
        setTimeout(function (){
            window.onresize = function () {
                myChart.resize();
                myChart2.resize();
            }
        },200);
    }

    if(Core.loadUserdata('ereport') == 'y'){
        /**
         * [renderChart 渲染图表数据]
         * @return {[type]} [description]
         */
        cht.renderChart = function(parms,_url){
            getChartData(parms,_url,function(){
                //console.log(_main.data('chartData'));
                // var dataObj = _main.data('chartData');
                var dataObj = JSON.parse(_main.data('chartData'));

                //console.log(dataObj.status);
                /**
                 * [if status状态为1 渲染图表数据]
                 * @param  {[type]} dataObj.status [description]
                 * @return {[type]}                [description]
                 */
                if(dataObj.status === 1){
                    statuMessg.statuSucces();
                    cht.databaseRender(dataObj);
                }else{
                    statuMessg.statuError(dataObj.message);
                }
            })
        }
    }else{
        cht.renderChart = function(opt,_url){
            var _url = switchUrl(window.recordTime);
            $.get(_url,function(data){
                var dataObj = data;
                if(dataObj.status === 1){
                    statuMessg.statuSucces();
                    cht.databaseRender(dataObj);
                }
            })
        }        
    }  
    return cht;
})();

/*图表入口*/
// rChart.renderChart();

$.extend({
    'evalChartSize': function(chart){
        /**
         * [改变窗口大小]
         * @param  {[type]}
         * @return {[type]}
         */
        $(window).on("resize",function(){
            var _w = $(window).width()-$(".leftsidebar").width();
            if( _w>990){
                chart.resize({width:_w});
            }
        })
    },
    'getMaxNumber': function(array){
        /**
         * [arr 获取数组内的最大数值]
         * @type {[type]}
         */
        var arr = array;
        var n = 0;
        for(var i=0;i<arr.length;i++){
            if(n < arr[i]){
                n = arr[i];
            }
        }
        //console.log(n);
        return n;
    }
})

$.extend({
    chartOption: function(opt){
        /**
         * 初始化图表参数
         */
        //opt.tooltip_formatter 信息提示框
        //opt.legend_data 图例数据
        //opt.xAxis_data x坐标轴数据
        //opt.yAxis_name y坐标轴名称
        //opt.yAxis_max y坐标最大值
        //opt.series_array 数据
        
        var initOpt = {
            tooltip: {
                trigger: 'axis',
                formatter: opt.tooltip_formatter
            },
            toolbox: {
                show : true,
                orient: 'horizontal',
                right: '20',
                top: '10',
                color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#ccc',
                borderWidth: 0,
                padding: 5,
                showTitle: true,
                feature : {
                    dataView : {
                        show : true,
                        title : '数据视图',
                        readOnly: true,
                        lang : ['数据视图', '关闭', '刷新'],
                        optionToContent: function(opt) {
                            var axisData = opt.xAxis[0].data;
                            var series = opt.series;
                            var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                         + '<td>时间</td>'
                                         + '<td>' + series[0].name + '</td>'
                                         + '<td>' + series[1].name + '</td>'
                                         + '</tr>';
                            for (var i = 0, l = axisData.length; i < l; i++) {
                                table += '<tr>'
                                         + '<td>' + axisData[i] + '</td>'
                                         + '<td>' + series[0].data[i] + '</td>'
                                         + '<td>' + series[1].data[i] + '</td>'
                                         + '</tr>';
                            }
                            table += '</tbody></table>';
                            return table;
                        }
                    },
                    magicType: {
                        show : true,
                        title : {
                            line : '动态类型切换-折线图',
                            bar : '动态类型切换-柱形图'
                        },
                        type : ['line', 'bar']
                    },
                    restore : {
                        show : true,
                        title : '还原',
                        color : 'black'
                    },
                    saveAsImage : {
                        show : true,
                        title : '保存为图片',
                        type : 'jpeg',
                        lang : ['点击本地保存'] 
                    }
                }
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                y: 'bottom',
                data: opt.legend_data
            },
            xAxis: [
                {
                    type : 'category',
                    position: 'bottom',
                    axisLine : {
                        show: true,
                        lineStyle: {
                            color: '#dddddd',
                            type: 'solid',
                            width: 1
                        }
                    },
                    axisTick : {
                        show: true,
                        length: 10,
                        lineStyle: {
                            color: '#dddddd',
                            type: 'solid',
                            width: 1
                        }
                    },
                    axisLabel : {
                        show:true,
                        interval: 'auto',
                        rotate: opt.x_rotate,
                        margin: 10,
                        textStyle: {
                            color: '#454545',
                            fontFamily: 'sans-serif',
                            fontSize: 12,
                            fontStyle: 'normal'
                        }
                    },
                    data: opt.xAxis_data
                }
            ],
            yAxis: [
                {
                    axisLine : {
                        show: false,
                    },
                    axisTick : {
                        show: false,
                    },
                    type: 'value',
                    min: 0,
                    max: opt.yAxis_max,
                    interval: opt.yAxis_interval,
                    name: opt.yAxis_name,
                    nameTextStyle: {
                        color: '#454545'
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#454545',
                        },
                        formatter: '{value}' + opt.yAxis_unit
                    }
                }
            ],
            series: opt.series_array
        };
        return initOpt;
    }
})

function setCharts(chartData){
    //到店频次
    //console.log(chartData);
    var x_Rotate = 0;

    var ddps_data = (function(_data){
            var groupA = [], groupB = [];
            for(var i=0;i<_data.length;i++){
                groupA[i] = _data[i].name;
                groupB[i] = _data[i].y;
                // group_max.push($.getMaxNumber(temp));
                //console.log(temp);
            }
            return {
                '0': groupA,
                '1': groupB
            };
        })(chartData);

    //return false;

    var y_max = $.getMaxNumber(ddps_data['1']);
        //console.log(y_max);
        // y_max = y_max>250?y_max:250;

    var Y_Interval = (y_max === 250)?50:get_y_interval(y_max);

    function get_y_interval(max){
        var _max = max;
        if(_max<=100){
            y_max = _max = Math.ceil(_max/10)*10;
            return _max/5; 
        }
        if(_max<1000){
            y_max = _max = Math.ceil(_max/100)*100;
            return _max/5;
        }
        if(_max>=1000){
            y_max = _max = Math.ceil(_max/1000)*1000;
            return _max/10;
        }
    }


    // 指定图表的配置项和数据
    var option = $.chartOption({
        tooltip_formatter: function(value){
            //console.log(value[0]);
            var str = value[0].seriesName +'<br/>';
                str += value[0].name + '：' + value[0].value + '人';
            return str;
        },
        legend_data: ['到店频次'],
        x_rotate: x_Rotate,
        xAxis_data: ddps_data['0'],
        yAxis_name: '人数',
        yAxis_unit: '',
        yAxis_min: 0,
        yAxis_max: y_max,
        yAxis_interval: Y_Interval,
        series_array: [
            {
                name: '到店频次',
                type: 'bar',
                barMaxWidth: '100',
                data: ddps_data['1'],
                itemStyle: {
                    normal: {
                        color: "#a9d86e",
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}人'
                        }
                    }
                }
            }
        ]
    })

    option.legend.show = false;

    return option;
}

function setChartsZd(chartData){
    //驻店时长
    //console.log(chartData);
    var x_Rotate = 0;

    var ddps_data = (function(_data){
            var groupA = [], groupB = [];
            for(var i=0;i<_data.length;i++){
                groupA[i] = _data[i].name;
                groupB[i] = _data[i].y;
                // group_max.push($.getMaxNumber(temp));
                //console.log(temp);
            }
            return {
                '0': groupA,
                '1': groupB
            };
        })(chartData.chart_data);

    //return false;

    var y_max = 100;

    var Y_Interval = 25;

    // 指定图表的配置项和数据
    var option = $.chartOption({
        tooltip_formatter: function(value){
            //console.log(value[0]);
            var str = value[0].seriesName +'<br/>';
                str += value[0].name + '：' + value[0].value + '%';
            return str;
        },
        legend_data: ['驻店时长'],
        x_rotate: x_Rotate,
        xAxis_data: ddps_data['0'],
        yAxis_name: '',
        yAxis_unit: '%',
        yAxis_min: 0,
        yAxis_max: y_max,
        yAxis_interval: Y_Interval,
        series_array: [
            {
                name: '驻店时长',
                type: 'bar',
                barMaxWidth: '100',
                data: ddps_data['1'],
                itemStyle: {
                    normal: {
                        color: "#00bfe6",
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{c}%'
                        }
                    }
                }
            }
        ]
    })

    option.legend.show = false;

    return option;
}


function showChart(){
    $(".rep-table-list,.report-chart-box").show();
    $(".loader").css("display","none");
}

function setHbData(data){
    var box = $("#hb_box");
        box.find("li").eq(0).find("h3").text(data['zd_flow']['avg_stay_time']);
        box.find("li").eq(1).find("h3").text(data['zd_flow']['tc']+'%');
        box.find("li").eq(2).find("h3").text(data['zd_flow']['sf']+'%');

    var hb_avg = (data['zd_flow']['hb_avg_stay_time_bj']>0?'':'-') + data['zd_flow']['hb_avg_stay_time'];
        box.find("li").eq(0).find("em").text('环比：'+hb_avg);
        box.find("li").eq(1).find("em").text('环比：'+data['zd_flow']['hb_tc']+'%');
        box.find("li").eq(2).find("em").text('环比：'+data['zd_flow']['hb_sf']+'%');
}