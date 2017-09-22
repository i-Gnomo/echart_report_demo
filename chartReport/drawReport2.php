<?php include(dirname(__FILE__) . "/../layout/headerdemo.php") ?>

<?php
    $initPage = 'b2';//页面
?>
<?php include(dirname(__FILE__) . "/../layout/tab_bar.php") ?>

<form class="search-box cod-exist" style="height:30px">
    <input type="hidden" name="id" id="myid" value="1" />
    <span class="field" style="width:100px;text-align:right;padding-right:10px;">搜索条件：</span>
    <span class="field field-select">
        <select class="easyui-combobox" editable="false" name="shop_date_type" id="shop_date_type">
            <!-- <option value="day">天数据</option> -->
            <option value="week">周数据</option>
            <!-- <option value="month">月数据</option> -->
        </select>
    </span>
    <span class="field disn" attr-dateType="day">
        <!--按天查询-->
        <input class="easyui-datebox" id="daytime" name="day" editable="false" value=""/>
    </span>
    <span class="field" attr-dateType="week" id="weekField">
        <!--按周查询-->
        <input class="easyui-datebox week-comb" id="weektime" name="week" editable="false" value="" />
    </span>
    <span class="field disn" attr-dateType="month">
        <!--按月查询-->
        <input class="easyui-datebox month-comb" id="monthtime" name="month" editable="false" value=""/>
    </span>
  <button type="button" class="col-23a8eb" onclick="drawChart();"><i class="sure-search"></i>确定</button>
  <span class="tips" style="width:100px;display:inline-block;line-height:30px;height:30px;font-size:12px;margin-left:8px;color:red"></span>
</form>

<div id="main" style="padding: 20px;">
    <div class="section-row">
        <div class="loader"><img src="http://sales3.caridcc.com/resource/img/total.loading.gif"></div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">是否有车</div>
                <div id="myChart1" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">App应用
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart2" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">电商偏好
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart3" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">金融理财
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart4" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">游戏App
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart5" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">拍照App
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart6" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">餐饮美食
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart7" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">旅游出行
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart8" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">视频影音
                    <div class="legend-tip"><em class="em1"></em>全国平均值 | <em class="em2"></em>采样数据值</div>
                </div>
                <div id="myChart9" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript" src="<?php echo $staticPath ?>plugin/echarts/echarts.common.min.js?v=<?php echo $version; ?>"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/macarons.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/combdate.js"></script>
<!-- <script type="text/javascript">
$(function(){
$('#weektime').datebox('setValue', '2017-09-18/2017-09-24');
})
</script> -->
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/a5.js"></script>

<script type="text/javascript">
function drawChart(){
    //id:1
    //date_type:day
    //date_time:2017-09-06
    var parms = {};
        parms.id = $("#myid").val();
        parms.date_type = $('#shop_date_type').datebox('getValue');
        
    var tmbox = checkdateType(parms.date_type);
        parms.date_time = tmbox.datebox('getValue');
        var tip = $(".search-box").find(".tips");
        if(!parms.date_time){
            tip.text('请选择日期');
            return false;
        }else{
            tip.text('');  
        }
    $(".rep-table-list,.report-chart-box").hide();
    $(".loader").css("display","block");
    rChart.renderChart(parms,'/used_car/report_n/js/r_report/data/b2_data.json');
}

$(function(){
    var myurl = $("#myEvalData").data('modeurl');
    console.log(myurl['4']);
    $('#weektime').datebox('showPanel').datebox('panel').find("td.calendar-today").trigger("click");
    var _today_week = dayfun.getlastweek();
    rChart.renderChart({
        'id': 1,
        'date_type': 'week',
        'date_time': _today_week
    },'/used_car/report_n/js/r_report/data/b2_data.json');
})
</script>

<?php include(dirname(__FILE__) . "/../layout/footerdemo.php") ?>