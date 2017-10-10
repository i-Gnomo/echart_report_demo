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
            <div class="chart-title">到店频次<i class="ask-tip white" data-title="第一次的离开时间与第二次的进入时间＞30分钟时，\n判断为到店1次，依次类推。"></i> - <span>天数据</span></div>
            <div id="myChart" class="chart" style="width: 100%;height: 450px;">
                <p class="no-data">暂无数据</p>
            </div>
        </div>
    </div>    
    <div class="rep-table-list" style="display: none;">
        <div class="chart_box report-chart-box">
            <div class="chart-title">驻店时长 - <span>天数据</span></div>
            <div style="width: 100%;">
                <ul id="hb_box" style="display:block;margin:40px;border-bottom:1px solid #f2f2f2;border-top:0;padding-bottom:20px;">
                    <li style="width: 33.33%;border-right:1px solid #f2f2f2;">
                        <p>平均驻店时长</p>
                        <h3>-</h3>
                        <p><em style="color:red;font-style:normal;">环比：-</em></p>
                    </li>
                    <li style="width: 33.33%;border-right:1px solid #f2f2f2;">
                        <p>跳出率<i class="ask-tip" style="margin-top:-3px;" data-title="停留时长少于1分钟的用户占所有用户的百分比"></i></p>
                        <h3>-</h3>
                        <p><em style="color:green;font-style:normal;">环比：-</em></p>
                    </li>
                    <li style="width: 33.33%;">
                        <p>深访率<i class="ask-tip" style="margin-top:-3px;" data-title="停留时长大于10分钟的用户占所有用户的百分比"></i></p>
                        <h3>-</h3>
                        <p><em style="color:green;font-style:normal;">环比：-</em></p>
                    </li>
                </ul>
            </div>
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
    var myurl = $("#myEvalData").data('modeurl');
    rChart.renderChart(parms,myurl['1']);
}
$(function(){
    var myurl = $("#myEvalData").data('modeurl');
    var _today_date = dayfun.gettoday();
    $('#daytime').datebox('setValue',_today_date);
    rChart.renderChart({
        'id': 1,
        'date_type': 'day',
        'date_time': _today_date
    },myurl['1']);
})
</script>
<?php include(dirname(__FILE__) . "/../layout/footerdemo.php") ?>