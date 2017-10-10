function switchUrl(type){
    /**
     * [url 路由 根据天周月数据判断]
     * @type {String}
     */
    var url = _staticPath + 'js/r_report/data/b3_data.json';
    return url;
}

/**
 * [_main 图表容器]
 * @type {[type]}
 */
var _main = $("#main");

var mapA = null, mapB = null;

var heatmapA, heatmapB;

var rMap = (function(){
    var cht = {};
    /**
     * [getChartData 获取图表数据]
     * @param  {[type]} cbk [description]
     * @return {[type]}     [description]
     */
    var getMapData = function(parms,_url,cbk){
        //var _url = switchUrl(window.recordTime);
        $.post(_url,{info:parms},function(data){
            ////console.log(data);
            if(_main.length>0){
                _main.data('mapData',data);
                cbk && cbk();
            }
        })
    }

    /**
     * [initMap 初始化地图]
     * @return {[type]} [description]
     */
    cht.initMap = function(){
        mapA = new AMap.Map("myChart1", {
            resizeEnable: true,
            // center: [116.418261, 39.921984],
            zoom: 11
        });
        mapB = new AMap.Map("myChart2", {
            resizeEnable: true,
            // center: [116.418261, 39.921984],
            zoom: 11
        });
    }

    if(Core.loadUserdata('ereport') == 'y'){
        /**
         * [renderChart 渲染图表数据]
         * @return {[type]} [description]
         */
        cht.renderMap = function(parms,_url){
            getMapData(parms,_url,function(){
                // //console.log(_main.data('mapData'));
                var dataObj = JSON.parse(_main.data('mapData'));
                // var dataObj = _main.data('mapData');
                /**
                 * [if status状态为1 渲染地图数据]
                 * @param  {[type]} dataObj.status [description]
                 * @return {[type]}                [description]
                **/ 
                if(dataObj.status === 1){
                    //地理画像
                    setHeatMap(dataObj);
                }else{
                    setHeatMap(returnStatuError());
                }
            })
        }
    }else{
        cht.renderMap = function(opt,_url){
            var _url = switchUrl(window.recordTime);
            $.get(_url,function(data){
                var dataObj = data;
                if(dataObj.status === 1){
                    //地理画像
                    setHeatMap(dataObj);
                }
            })
        }
    }

    return cht;
})();

rMap.initMap();
// rMap.renderMap(parms,_url);

function isSupportCanvas() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}
function setHeatMap(_data){
    if($(".heatmap-canvas").length>0){
        $(".heatmap-canvas").each(function(index,item){
          $(this).parent('div').remove();  
        });
    }
    if (!isSupportCanvas()) {
        var notSupport = '热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~'; 
        document.getElementById('myChart1').innerHTML = '<P>'+ notSupport +'</p>';
        document.getElementById('myChart2').innerHTML = '<P>'+ notSupport +'</p>';
        return false;
    }

    mapA.plugin(["AMap.Heatmap"], function() {
        //初始化heatmap对象
        heatmapA = new AMap.Heatmap(mapA, {
            radius: 25, //给定半径
            opacity: [0, 0.8]
        });
    })

    mapB.plugin(["AMap.Heatmap"], function() {
        //初始化heatmap对象
        heatmapB = new AMap.Heatmap(mapB, {
            radius: 25, //给定半径
            opacity: [0, 0.8]
        });
    })

    if(typeof(_data['store_coord'])!='undefined'){
        console.log(_data['store_coord']);
        mapA.setZoomAndCenter(11, _data['store_coord']);
        mapB.setZoomAndCenter(11, _data['store_coord']);

        mapA.plugin(["AMap.Heatmap"], function() {
            //设置数据集：该数据
            heatmapA.setDataSet({
                data: _data['map_data'][0],
                max: 100
            });
        });

        mapB.plugin(["AMap.Heatmap"], function() {
            //设置数据集：该数据
            heatmapB.setDataSet({
                data: _data['map_data'][1],
                max: 100
            });
        });
    }else{
        mapA.plugin(["AMap.Heatmap"], function() {
            //设置数据集：该数据
            heatmapA.setDataSet({
                data: null,
                max: 100
            });
        });

        mapB.plugin(["AMap.Heatmap"], function() {
            //设置数据集：该数据
            heatmapB.setDataSet({
                data: null,
                max: 100
            });
        });
    }

    // var heatmapA, heatmapB;
    // mapA.plugin(["AMap.Heatmap"], function() {
    //     //初始化heatmap对象
    //     heatmapA = new AMap.Heatmap(mapA, {
    //         radius: 25, //给定半径
    //         opacity: [0, 0.8]
    //     });
    //     //设置数据集：该数据
    //     heatmapA.setDataSet({
    //         data: _data['map_data'][0],
    //         max: 100
    //     });
    // });

    // mapB.plugin(["AMap.Heatmap"], function() {
    //     //初始化heatmap对象
    //     heatmapB = new AMap.Heatmap(mapB, {
    //         radius: 25, //给定半径
    //         opacity: [0, 0.8]
    //     });
    //     //设置数据集：该数据
    //     heatmapB.setDataSet({
    //         data: _data['map_data'][1],
    //         max: 100
    //     });
    // });

    showChart();
}

function showChart(){
    $(".rep-table-list,.report-chart-box").show();
    $(".loader").css("display","none");
}

function returnStatuError(){
    var data = {};
    data['map_data'] = [];
    data['map_data'][0] = [];
    data['map_data'][1] = [];
    return data;
}