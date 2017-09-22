<?php include(dirname(__FILE__) . "/../layout/headerdemo.php") ?>

<?php
    $initPage = 'a2';//页面
?>
<?php include(dirname(__FILE__) . "/../layout/tab_bar.php") ?>

<?php include(dirname(__FILE__) . "/../layout/search_box.php") ?>

<div id="main" style="padding: 20px;">
    <div class="loader"><img src="http://sales3.caridcc.com/resource/img/total.loading.gif"></div>
    <div class="rep-table-list" style="display: none;">
        <div class="chart_box report-chart-box">
            <div class="chart-title">到店频次 - <span>天数据</span></div>
            <div id="myChart" class="chart" style="width: 100%;height: 450px;">
                <p class="no-data">暂无数据</p>
            </div>
        </div>
    </div>    
    <div class="rep-table-list" style="display: none;">
        <div class="chart_box report-chart-box">
            <div class="chart-title">驻店时长 - <span>天数据</span></div>
            <div id="myChart2" class="chart" style="width: 100%;height: 450px;">
                <p class="no-data">暂无数据</p>
            </div>
        </div>
    </div> 
</div>

<script type="text/javascript" src="<?php echo $staticPath ?>plugin/echarts/echarts.common.min.js?v=<?php echo $version; ?>"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/macarons.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/combdate.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/a2.js"></script>
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

    var titleInfo = {
            'day': '天数据',
            'week': '周数据',
            'month': '月数据'
        }
    $(".chart-title").find("span").text(titleInfo[parms.date_type]);

    $(".rep-table-list,.report-chart-box").hide();
    $(".loader").css("display","block");
    rChart.renderChart(parms,'/used_car/report_n/js/r_report/data/a2_data_day.json');
}
$(function(){
    var myurl = $("#myEvalData").data('modeurl');
    console.log(myurl['1']);
    var _today_date = dayfun.gettoday();
    $('#daytime').datebox('setValue',_today_date);
    rChart.renderChart({
        'id': 1,
        'date_type': 'day',
        'date_time': _today_date
    },'/used_car/report_n/js/r_report/data/a2_data_day.json');
})
</script>
<?php include(dirname(__FILE__) . "/../layout/footerdemo.php") ?>