function switchUrl(type){
    /**
     * [url 路由 根据天周月数据判断]
     * @type {String}
     */
    // var url = '/pfapi/passenger_flow/flow_data';
    var url = '';
    switch(type){
        case 'day':
            url = '/used_car/report_n/js/r_report/data/a1_data_day.json';
            break;
        case 'week':
            url = '/used_car/report_n/js/r_report/data/a1_data_week.json';
            break;
        case 'month':
            url = '/used_car/report_n/js/r_report/data/a1_data_month.json';
            break;
        default:
            url = '/used_car/report_n/js/r_report/data/a1_data_day.json';

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
        var _url = switchUrl(window.recordTime);
        $.get(_url,function(data){
            //console.log(data);
            if(_main.length>0){
                _main.data('chartData',data);
                cbk && cbk();
            }
        })
    }

    /**
     * [renderChart 渲染图表数据]
     * @return {[type]} [description]
     */
    cht.renderChart = function(opt,_url){
        //alert(opt);
        getChartData(opt,_url,function(){
            //console.log(_main.data('chartData'));
            var dataObj = _main.data('chartData');
            // var dataObj = JSON.parse(_main.data('chartData'));
            /**
             * [if status状态为1 渲染图表数据]
             * @param  {[type]} dataObj.status [description]
             * @return {[type]}                [description]
             */
            if(dataObj.status === 1){
                setCharts(dataObj.chart_data);
                setTableList(dataObj.table_data);
            }
        })
    }

    return cht;
})();

/*图表入口*/
// rChart.renderChart(opts);

$.extend({
    'evalChartSize': function(chart){
        /**
         * [改变窗口大小]
         * @param  {[type]}
         * @return {[type]}
         */
        chart.resize();
        setTimeout(function (){
            window.onresize = function () {
                chart.resize();
            }
        },200);
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
                    mark : {
                        show : true,
                        title : {
                            mark : '辅助线-开关',
                            markUndo : '辅助线-删除',
                            markClear : '辅助线-清空'
                        },
                        lineStyle : {
                            width : 1,
                            color : '#1e90ff',
                            type : 'dashed'
                        }
                    },
                    dataZoom : {
                        show : true,
                        title : {
                            dataZoom : '区域缩放',
                            dataZoomReset : '区域缩放-后退'
                        }
                    },
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
                        formatter: '{value}'
                    }
                }
            ],
            series: opt.series_array
        };
        return initOpt;
    }
})

function setCharts(chartData){
    //console.log(chartData.data);
    //var _data = JSON.stringify();
    var x_Rotate = (window.recordTime == 'day')? 45: 0;
    var _Y_MAX = (function(_data){
            var group_max = [];
            for(var i=0;i<_data.length;i++){
                //console.log(_data[i].length);
                var temp = new Array();
                for(var j=0;j<_data[i].length;j++){
                    temp.push(_data[i][j][1]);
                }
                group_max.push($.getMaxNumber(temp));
                //console.log(temp);
            }
            //console.log(group_max);
            return group_max;
        })(chartData.data);

    var y_max = $.getMaxNumber(_Y_MAX);
        //console.log(y_max);
        y_max = y_max>250?y_max:250;

    var Y_Interval = (y_max === 250)?50:get_y_interval(y_max);

    function get_y_interval(max){
        var _max = max;
        if(_max<1000){
            y_max = _max = Math.ceil(_max/100)*100;
            return _max/5;
        }
        if(_max>=1000){
            y_max = _max = Math.ceil(_max/1000)*1000;
            return _max/10;
        }
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('myChart'),'macarons');

    // 指定图表的配置项和数据
    var option = $.chartOption({
        tooltip_formatter: function(value){
            var str = value[0].axisValueLabel +'<br/>';
                str += value[0].seriesName + '：' + value[0].data[1] + '人<br/>';
                str += value[1].seriesName + '：' + value[1].data[1] + '人';
            return str;
        },
        legend_data: ['环境客流','有效客流'],
        x_rotate: x_Rotate,
        xAxis_data: chartData.x_categories,
        yAxis_name: '人数',
        yAxis_min: 0,
        yAxis_max: y_max,
        yAxis_interval: Y_Interval,
        series_array: [
            {
                name: '环境客流',
                type: 'line',
                data: chartData.data[0]
            },
            {
                name: '有效客流',
                type: 'line',
                data: chartData.data[1]
            }
        ]
    })

    //add min: 0,max: 250,interval: 50,

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    showChart();
    $.evalChartSize(myChart);
}

function setTableList(data){
    var _data = data;
    var table_bd = $("#tableListBox").find(".tbody");
    var _str = '';
    for(var i=0;i<_data.length;i++){
        _str += '<ul>';
        _str += '<li style="width: 25%;" class="top-color">'+(_data[i][0]?_data[i][0]:'')+'</li>';
        _str += '<li style="width: 25%;">'+(_data[i][1]?_data[i][1]:'')+'</li>';
        _str += '<li style="width: 25%;">'+(_data[i][2]?_data[i][2]:'')+'</li>';
        _str += '<li style="width: 25%;" class="cj-rot">'+(_data[i][3]?_data[i][3]:'')+'</li>';            
        _str += '</ul>'; 
    }
    table_bd.html(_str);
}

function showChart(){
    $(".rep-table-list,.report-chart-box").show();
    $(".loader").css("display","none");
}

