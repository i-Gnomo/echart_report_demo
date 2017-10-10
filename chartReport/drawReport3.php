<?php include(dirname(__FILE__) . "/../layout/headerdemo.php") ?>

<?php
    $initPage = 'b3';//页面
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
        <div class="rep-table-list col-2x">
            <div class="chart_box report-chart-box" style="padding-bottom: 15px;">
                <div class="chart-title">工作地</div>
                <div class="chart" attr-chart="true" style="height: 500px">
                    <div id="myChart1" style="margin:15px;height: 100%;"></div>
                </div>
            </div>
        </div>
        <div class="rep-table-list col-2x">
            <div class="chart_box report-chart-box" style="padding-bottom: 15px;">
                <div class="chart-title">居住地</div>
                <div class="chart" attr-chart="true" style="height: 500px">
                    <div id="myChart2" style="margin:15px;height: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
<script src="http://webapi.amap.com/maps?v=1.3&key=99e629383930ae7c4a6b8c9c45329fe4"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/combdate.js"></script>
<script type="text/javascript" src="<?php echo $staticPath ?>js/r_report/a6.js"></script>
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
    var myurl = $("#myEvalData").data('modeurl');
    rMap.renderMap(parms,myurl['5']);
}
$(function(){
    var myurl = $("#myEvalData").data('modeurl');
    $('#weektime').datebox('showPanel').datebox('panel').find("td.calendar-today").trigger("click");
    var _today_week = dayfun.getlastweek();
    rMap.renderMap({
        'id': 1,
        'date_type': 'week',
        'date_time': _today_week
    },myurl['5']);
})
</script>


<?php include(dirname(__FILE__) . "/../layout/footerdemo.php") ?>