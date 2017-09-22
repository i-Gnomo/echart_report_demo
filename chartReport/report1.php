<?php include(dirname(__FILE__) . "/../layout/headerdemo.php") ?>

<?php
    $initPage = 'a1';//页面
?>
<?php include(dirname(__FILE__) . "/../layout/tab_bar.php") ?>

<?php include(dirname(__FILE__) . "/../layout/search_box.php") ?>

<div id="main" style="padding: 20px;">
    <div class="loader"><img src="http://sales3.caridcc.com/resource/img/total.loading.gif"></div>
    <div class="rep-table-list" style="display: none;">
        <div class="chart_box report-chart-box">
            <div class="chart-title">客流趋势图 - 天数据</div>
            <div id="myChart" class="chart" style="width: 100%;height: 450px;">
                <p class="no-data">暂无数据</p>
            </div>
        </div>
    </div>    
    <div class="report-chart-box" style="width: 100%;display: none;">
        <div class="chart-title">客流趋势图 - 天数据<!-- <i class="chart-ctrl"></i> --></div>
        <div class="chart-main" style="height:auto">
            <div id="tableListBox" class="ph-top-list yaoyue-list" style="height: auto;">
                <div class="thead">
                    <ul>
                        <li style="width: 25%;">时间</li>
                        <li style="width: 25%;">环境客流</li>
                        <li style="width: 25%;">有效客流</li>
                        <li style="width: 25%;">性别占比</li>
                    </ul>
                </div>
                <div class="tbody">
                    <p class="no-data">暂无数据</p>
                    <!-- <ul> 
                        <li class="top-color">1</li>
                        <li>销售顾问A</li>
                        <li>65</li>
                        <li class="cj-rot">38%</li>
                    </ul> -->
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="<?php echo $staticPath ?>plugin/echarts/echarts.common.min.js?v=<?php echo $version; ?>"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/macarons.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/combdate.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/a1.js"></script>
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
            'day': '客流趋势图 - 天数据',
            'week': '客流趋势图 - 周数据',
            'month': '客流趋势图 - 月数据'
        }
    $(".chart-title").text(titleInfo[parms.date_type]);

    $(".rep-table-list,.report-chart-box").hide();
    $(".loader").css("display","block");
    rChart.renderChart(parms,'/used_car/report_n/js/r_report/data/a1_data_day.json');
}
$(function(){
    var myurl = $("#myEvalData").data('modeurl');
    console.log(myurl['0']);
    var _today_date = dayfun.gettoday();
    $('#daytime').datebox('setValue',_today_date);
    rChart.renderChart({
        'id': 1,
        'date_type': 'day',
        'date_time': _today_date
    },myurl['0']);
})
</script>
<?php include(dirname(__FILE__) . "/../layout/footerdemo.php") ?>