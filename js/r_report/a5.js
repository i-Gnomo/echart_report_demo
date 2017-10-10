function switchUrl(type){
    /**
     * [url 路由 根据天周月数据判断]
     * @type {String}
     */
    var url = _staticPath + 'js/r_report/data/b2_data.json';
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
            ////console.log(data);
            if(_main.length>0){
                _main.data('chartData',data);
                cbk && cbk();
            }
        })
    }

    if(Core.loadUserdata('ereport') == 'y'){
        /**
         * [renderChart 渲染图表数据]
         * @return {[type]} [description]
         */
        cht.renderChart = function(parms,_url){
            getChartData(parms,_url,function(){
                //console.log(_main.data('chartData'));
                var dataObj = JSON.parse(_main.data('chartData'));
                // var dataObj = _main.data('chartData');
                /**
                 * [if status状态为1 渲染图表数据]
                 * @param  {[type]} dataObj.status [description]
                 * @return {[type]}                [description]
                 */
                if(dataObj.status === 1){
                    //大数据画像
                    statuMessg.statuSucces();
                    setCharts(dataObj.figure_data);
                }else{
                    statuMessg.statuError(dataObj.message);
                    showChart();
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
                    setCharts(dataObj.figure_data);
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
                    formatter: "{b} : {c}%"
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
    //console.log(chart_Data);
    var legendArr = ['全国平均值','采样数据值'];
    var seriesArr = new Array();
    var seriesData = chart_Data['series'];
    var max_yAxis = [];

    for(var i=0;i<seriesData.length;i++){
        seriesArr[seriesArr.length] = {
            name: legendArr[i],
            type: 'bar',
            barMaxWidth: 10,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: seriesData[i],
            itemStyle: {
                normal: {
                    color: colorStr[i]?colorStr[i]:'#a2dcb6',
                    label: {
                        show: i===0?false:true,
                        position: 'top',
                        formatter: '{c}%',
                        textStyle: {
                            color: "#000000"
                        }
                    }
                }
            }
        }
        max_yAxis.push($.getMaxNumber(seriesData[i]));
    }
    
    var yAxis_MAX = $.getMaxNumber(max_yAxis);
        yAxis_MAX = Math.ceil(yAxis_MAX/5)*5;
        if(yAxis_MAX>65 && yAxis_MAX<100){
            yAxis_MAX = yAxis_MAX +5;
        }
    var yAxis_INTER = 10;
    if(yAxis_MAX%2 === 0){
        yAxis_INTER = yAxis_MAX/2;
    }else if(yAxis_MAX%3 === 0){
        yAxis_INTER = yAxis_MAX/3;
    }else if(yAxis_MAX%5 === 0){
        yAxis_INTER = yAxis_MAX/5;
    } 

    // 指定图表的配置项和数据
    var option = $.barChartOption({
        has_toolbox: false, //显示toolbox工具栏
        tooltip_formatter: function (data) {
            ////console.log(data);
            var str = data[0].name +'<br/>'+ data[0].seriesName + '：'+data[0].value+'%';
                str += '<br/>'+ data[1].seriesName + '：'+data[1].value+'%';
            return str;
        },
        has_legend: false,
        legend_data: '',
        x_rotate: 45,
        xAxis_data: chart_Data['x_categories'],
        yAxis_name: '',
        yAxis_min: 0,
        yAxis_max: yAxis_MAX,
        yAxis_interval: yAxis_INTER,
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
        _color: ['#ff7b7b','#00bfe6','#a2dcb6'],
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

function setCharts(chartData){
    var myChart = [];
    var boxArr = ['car','app','ec','financial','game','photo','repast','travel','video'];

    //是否有车
    var _chart1 = document.getElementById('myChart1');
    myChart[myChart.length] = echarts.init(_chart1,'macarons',{width: _chart1.width,height: _chart1.height});
    myChart[0].setOption(setPieCharts('是否有车', chartData['car']));

    //App应用
    var colorArr = ['#ffc107','#a2dcb6'];
    for(var i=1;i<boxArr.length;i++){
        let _chart = document.getElementById('myChart'+(i-(-1)));
        myChart[myChart.length] = echarts.init(_chart,'macarons',{width: _chart.width,height: _chart.height});
        myChart[i].setOption(setBarCharts('', chartData[boxArr[i]], colorArr));
    }

    showChart();
    for(let j=0;j<myChart.length;j++){
        myChart[j].resize();
    }
    setTimeout(function (){
        window.onresize = function () {
            for(let j=0;j<myChart.length;j++){
                myChart[j].resize();
            }
        }
    },200);

}

function showChart(){
    $(".rep-table-list,.report-chart-box").show();
    $(".loader").css("display","none");
}