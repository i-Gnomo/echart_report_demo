<?php include(dirname(__FILE__) . "/../layout/headerdemo.php") ?>

<?php
    $initPage = 'a3';//页面
?>
<?php include(dirname(__FILE__) . "/../layout/tab_bar.php") ?>

<?php include(dirname(__FILE__) . "/../layout/search_box.php") ?>

<div id="main" style="padding: 20px;">
    <div class="loader"><img src="http://sales3.caridcc.com/resource/img/total.loading.gif"></div>
    <div class="rep-table-list" style="display: none;">
        <div class="chart_box report-chart-box">
            <div class="chart-title">滞留客流趋势图 - 天数据</div>
            <div id="myChart" class="chart" style="width: 100%;height: 450px;">
                <p class="no-data">暂无数据</p>
            </div>
        </div>
    </div>
    <div class="report-chart-box" style="width: 100%;display: none;">
        <div class="chart-title">滞留客流趋势图 - 天数据
            <!-- <i class="chart-ctrl"></i> -->
        </div>
        <div class="chart-main" style="height:auto">
            <div id="tableListBox" class="ph-top-list yaoyue-list" style="height: auto;">
                <div class="thead">
                    <ul>
                        <li style="width: 10%;">时间</li>
                        <li style="width: 15%;">滞留3分钟以上</li>
                        <li style="width: 15%;">滞留5分钟以上</li>
                        <li style="width: 15%;">滞留10分钟以上</li>
                        <li style="width: 15%;">滞留20分钟以上</li>
                        <li style="width: 15%;">滞留30分钟以上</li>
                        <li style="width: 15%;">滞留60分钟以上</li>
                    </ul>
                </div>
                <div class="tbody">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="<?php echo $staticPath ?>plugin/echarts/echarts.common.min.js?v=<?php echo $version; ?>"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/macarons.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/combdate.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/a3.js"></script>
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
            'day': '滞留客流趋势图 - 天数据',
            'week': '滞留客流趋势图 - 周数据',
            'month': '滞留客流趋势图 - 月数据'
        }
    $(".chart-title").text(titleInfo[parms.date_type]);

    $(".rep-table-list,.report-chart-box").hide();
    $(".loader").css("display","block");
    var myurl = $("#myEvalData").data('modeurl');
    rChart.renderChart(parms,myurl['2']);
}
$(function(){
    var myurl = $("#myEvalData").data('modeurl');
    var _today_date = dayfun.gettoday();
    $('#daytime').datebox('setValue',_today_date);
    rChart.renderChart({
        'id': 1,
        'date_type': 'day',
        'date_time': _today_date
    },myurl['2']);
})
</script>


<?php include(dirname(__FILE__) . "/../layout/footerdemo.php") ?>