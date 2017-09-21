function switchUrl(type){
    /**
     * [url 路由 根据天周月数据判断]
     * @type {String}
     */
    var url = '/pfapi/figure/base_data';
    switch(type){
        case 'day':
            url = '/used_car/report_n/js/r_report/data/b1_data_day.json';
            break;
        case 'week':
            url = '/used_car/report_n/js/r_report/data/b1_data_week.json';
            break;
        case 'month':
            url = '/used_car/report_n/js/r_report/data/b1_data_month.json';
            break;
        default:
            url = '/used_car/report_n/js/r_report/data/b1_data_day.json';

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
            ////console.log(data);
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
    cht.renderChart = function(parms,_url){
        getChartData(parms,_url,function(){
            //console.log(_main.data('chartData'));
            // var dataObj = JSON.parse(_main.data('chartData'));
            var dataObj = _main.data('chartData');
            /**
             * [if status状态为1 渲染图表数据]
             * @param  {[type]} dataObj.status [description]
             * @return {[type]}                [description]
             */
            if(dataObj.status === 1){
                //基础画像 男女比例
                //console.log(dataObj.figure_data);
                setCharts(dataObj.figure_data);
            }
        })
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
        ////console.log(n);
        return n;
    }
})

$.extend({
    barChartOption: function(opt){
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
            legend: {
                show: opt.has_legend,
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
                        interval: 0,
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

$.extend({
    pieChartOption: function(opt){
        var optColor = opt._color;
        var optLegendForm = opt._formater;
        var optLegendData = opt.legend_data;
        var optDataTitle = opt.data_title;
        var optSeriesData = opt.series_data;
        var initOpt = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}%"
                },
                color: optColor,
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    left: 15,
                    y: 'top',
                    top: 10,
                    formatter: optLegendForm,
                    data: optLegendData
                },
                series : [
                    {
                        name: optDataTitle,
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: optSeriesData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
        }
        return initOpt;
    }
})

//生成柱状图
function setBarCharts(chart_Title, chart_Data,colorStr){
    // var x_Rotate = (window.recordTime == 'day')? 45: 0;
    var xAxisArr = new Array();
    var seriesArr = new Array();
    var seriesData = new Array();
    for(var x=0;x<chart_Data.length;x++){
        xAxisArr.push(chart_Data[x]['name']);
        seriesData.push(chart_Data[x]['y']);
    }
    seriesArr[seriesArr.length] = {
        name: chart_Title,
        type: 'bar',
        barWidth: 12,
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: seriesData,
        itemStyle: {
            normal: {
                color: colorStr?colorStr:'#a2dcb6',
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    textStyle: {
                        color: "#000000"
                    }
                }
            }
        }
    }

    //console.log(xAxisArr);
    // 指定图表的配置项和数据
    var option = $.barChartOption({
        has_toolbox: false, //显示toolbox工具栏
        tooltip_formatter: function (data) {
            ////console.log(data);
            var str = data[0].seriesName +'<br/>'+ data[0].name + '：'+data[0].value+'%';
            return str;
        },
        has_legend: false,
        legend_data: '',
        x_rotate: 45,
        xAxis_data: xAxisArr,
        yAxis_name: '',
        yAxis_min: 0,
        yAxis_max: 100,
        yAxis_interval: 25,
        series_array: seriesArr
    })

    return option;
}

//生成饼形图
function setPieCharts(chart_Title, chart_Data){
    //饼形图 性别比例
    var dataTitle = chart_Title; //图例title
    var dataSex = chart_Data;
    var seriesArr = new Array(); //series data
    var legendArr = new Array(); //legend data
    for(var x=0;x<dataSex.length;x++){
        var temp = {
            name: dataSex[x]['name'],
            value: dataSex[x]['y']
        }
        seriesArr[seriesArr.length] = temp;
        var lengend_temp = {
            name: dataSex[x]['name'],
            icon: 'pin'
        }
        legendArr[legendArr.length] = lengend_temp;
    }

    // 指定图表的配置项和数据
    var option = $.pieChartOption({
        _color: ['#ff7b7b','#a2dcb6','#00bfe6'],
        _formater: function (name) {
                var str = '';
                for(var i=0;i<seriesArr.length;i++){
                    if(seriesArr[i]['name'] == name){
                        str = seriesArr[i]['value'];
                    }
                }
                return name + '('+str+'%)';
            },
        legend_data: legendArr,
        data_title: dataTitle,
        series_data: seriesArr
    });

    return option;
}

//年龄分段
function setPictorialBar(chart_Title, chart_Data){
    //console.log(chart_Data);

    //年龄分段
    var pathSymbols = {
        pepole: 'image://../js/r_report/pepo.png'
    };

    var yAxisArr = new Array(); //yAxis data
    var seriesArr = new Array(); //series data
    for(var x=0;x<chart_Data.length;x++){
        yAxisArr.push(chart_Data[x]['name']);
        var temp = {
            value: chart_Data[x]['y'],
            symbol: pathSymbols.pepole
        }
        seriesArr[seriesArr.length] = temp; 
    }

    var labelSetting = {
        normal: {
            show: true,
            position: 'right',
            offset: [-20, -15],
            formatter: '{c}%',
            textStyle: {
                fontSize: 12,
                color: '#000000'
            }
        }
    };

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{b}：{c}%',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            containLabel: true,
            left: 20
        },
        yAxis: {
            data: yAxisArr,
            inverse: true,
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {
                margin: 20,
                textStyle: {
                    fontSize: 12
                }
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 20
                }
            }
        },
        xAxis: {
            splitLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            axisLine: {show: false}
        },
        series: [{
            name: chart_Title,
            type: 'pictorialBar',
            label: labelSetting,
            symbolRepeat: true,
            symbolSize: ['60%', '60%'],
            barCategoryGap: '30%',
            data: seriesArr
        }]
    };

    return option;
}

//地图
function setMapCharts(chart_Title, chart_Data){
    var seriesArr = new Array();
    for(var x=0;x<chart_Data.length;x++){
        var _name = chart_Data[x]['fullname'];
        var temp = {
            name: _name.substring(0,_name.length-1), 
            value: chart_Data[x]['value']
        }
        seriesArr[seriesArr.length] = temp; 
    }

    //console.log(seriesArr);
    var option = {
            tooltip: {},
            visualMap: {
                show: false,
                inRange: {
                    color: ['#a2dcb6']
                }
            },
            geo: {
                map: 'china',
                roam: false,
                layoutSize: ['100%','100%'],
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis:{
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.4)'
                    }
                }
            },
            series : [
                {
                   type: 'scatter',
                   coordinateSystem: 'geo'
                },
                {
                    name: '省份',
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    tooltip: {
                        show: true,
                        formatter: function(data){
                            if(isNaN(data.value)){
                                return '';
                            }
                            var str = data.seriesName +'：'+ data.name +'<br/>占比：'+ data.value + '%';
                            return str;
                        }
                    },
                    data: seriesArr
                }
            ]
        };
    
    return option;
}

function setCharts(chartData){
    var boxArr = ['sex','age','consume','isp','brand','hobby','province','city'];

    //性别比例
    var _chart1 = document.getElementById('myChart1');
    var myChart = echarts.init(_chart1,'macarons',{width: _chart1.width,height: _chart1.height});
    myChart.setOption(setPieCharts('性别比例', chartData['sex']));

    //年龄分段
    var myChart2 = echarts.init(document.getElementById('myChart2'),'macarons');
    myChart2.setOption(setPictorialBar('年龄分段', chartData['age']));

    //消费水平
    var _chart3 = document.getElementById('myChart3');
    var myChart3 = echarts.init(_chart3,'macarons',{width: _chart3.width,height: _chart3.height});
    myChart3.setOption(setPieCharts('消费水平', chartData['consume']));
    
    //运营商
    var _chart4 = document.getElementById('myChart4');
    var myChart4 = echarts.init(_chart4,'macarons',{width: _chart4.width,height: _chart4.height});
    myChart4.setOption(setPieCharts('运营商', chartData['isp']));

    //手机品牌
    var myChart5 = echarts.init(document.getElementById('myChart5'),'macarons');
    myChart5.setOption(setBarCharts('手机品牌', chartData['brand'],'#a2dcb6'));

    //兴趣爱好
    var myChart6 = echarts.init(document.getElementById('myChart6'),'macarons');
    myChart6.setOption(setBarCharts('兴趣爱好', chartData['hobby'],'#ffc107'));

    //城市
    var myChart8 = echarts.init(document.getElementById('myChart8'),'macarons');
    myChart8.setOption(setBarCharts('城市', chartData['city'],'#00bfe6'));

    //省份
    var myChart7 = echarts.init(document.getElementById('myChart7'),'macarons');
    myChart7.setOption(setMapCharts('省份', chartData['province']));

    showChart();

    
    myChart.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
    myChart5.resize();
    myChart6.resize();
    myChart7.resize();
    myChart8.resize();
    setTimeout(function (){
        window.onresize = function () {
            myChart.resize();
            myChart2.resize();
            myChart3.resize();
            myChart4.resize();
            myChart5.resize();
            myChart6.resize();
            myChart7.resize();
            myChart8.resize();
        }
    },200);

}

function showChart(){
    $(".rep-table-list,.report-chart-box").show();
    $(".loader").css("display","none");
}