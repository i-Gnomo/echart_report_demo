<?php include(dirname(__FILE__) . "/../layout/headerdemo.php") ?>

<?php
    $initPage = 'b1';//页面
?>
<?php include(dirname(__FILE__) . "/../layout/tab_bar.php") ?>

<?php include(dirname(__FILE__) . "/../layout/search_box.php") ?>

<div id="main" style="padding: 20px;">
    <div class="section-row">
        <div class="loader"><img src="http://sales3.caridcc.com/resource/img/total.loading.gif"></div>
        <!--男女比例-->
        <div class="rep-table-list col-4x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">男女比例</div>
                <div id="myChart1" class="chart" attr-chart="true" chart-type="sex">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <!--年龄分段-->
        <div class="rep-table-list col-4x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">年龄分段</div>
                <div id="myChart2" class="chart" attr-chart="true" chart-type="age">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <!--消费水平-->
        <div class="rep-table-list col-4x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">消费水平</div>
                <div id="myChart3" class="chart" attr-chart="true" chart-type="consume">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <!--运营商-->
        <div class="rep-table-list col-4x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">运营商</div>
                <div id="myChart4" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
    </div>
    <div class="section-row">
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">手机品牌</div>
                <div id="myChart5" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">兴趣爱好</div>
                <div id="myChart6" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">省份</div>
                <div id="myChart7" class="chart" attr-chart="true" chart-type="isp">
                    
                </div>
            </div>
        </div>
        <div class="rep-table-list col-3x" style="display: none;">
            <div class="chart_box report-chart-box">
                <div class="chart-title">城市</div>
                <div id="myChart8" class="chart" attr-chart="true" chart-type="isp">
                    <p class="no-data">暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="<?php echo $staticPath ?>plugin/echarts/echarts.min.js?v=<?php echo $version; ?>"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/macarons.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/china.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/combdate.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/a4.js"></script>
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
    rChart.renderChart(parms,'/used_car/report_n/js/r_report/data/b1_data_day.json');
}
$(function(){
    var myurl = $("#myEvalData").data('modeurl');
    console.log(myurl['3']);
    var _today_date = dayfun.gettoday();
    $('#daytime').datebox('setValue',_today_date);
    rChart.renderChart({
        'id': 1,
        'date_type': 'day',
        'date_time': _today_date
    },'/used_car/report_n/js/r_report/data/b1_data_day.json');
})
</script>


<?php include(dirname(__FILE__) . "/../layout/footerdemo.php") ?>