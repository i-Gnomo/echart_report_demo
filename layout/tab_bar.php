<?php
    $initPage = isset($initPage) ? $initPage : '';
    function getTabsType($href,$title,$type){
        global $initPage;
        echo '<a '.($type == $initPage? 'class="active"':'href="'.$href.'"').'>'.$title.'</a>';
    }
?>
<div class="tabs-links header-link fixed-width" id="myEvalData">
    <a href="javascript:switchModeData();" style="width:120px" class="modetype active"><i class="is-real"></i></a>
    <a href="report1.php" <?php if($initPage=='a1'||$initPage=='a2'||$initPage=='a3'){ echo 'class="active"';} ?> >客流分析</a>
    <a href="drawReport1.php" <?php if($initPage=='b1'||$initPage=='b2'||$initPage=='b3'){ echo 'class="active"';} ?>>画像分析</a>
</div>
<div class="tabs-links header-link fixed-width child-tabs">
<?php if($initPage=='a1'||$initPage=='a2'||$initPage=='a3'){
    echo getTabsType('report1.php','客流数据分析','a1').getTabsType('report2.php','新老客户分析','a2').getTabsType('report3.php','滞留数据分析','a3');;
}
?>
<?php if($initPage=='b1'||$initPage=='b2'||$initPage=='b3'){
    echo getTabsType('drawReport1.php','基础画像','b1').getTabsType('drawReport2.php','大数据画像','b2').getTabsType('drawReport3.php','地理画像','b3');;
}
?>
</div>
<script type="text/javascript">
//获取是否能查看真实数据的cookie值
const truthCookie = Core.getCookieData('truthdata_cookie');
//console.log(truthCookie);
function switchModeData(){
    /**
     * [真实数据模拟数据切换时判断]
     * @param  {String} truthCookie! [有值可以切换]
     */
    if(truthCookie!=''&& typeof(truthCookie)!='undefined'){
        //改变数据模式
        (Core.loadUserdata('ereport') == 'y')? Core.saveUserdata('ereport','n'):Core.saveUserdata('ereport','y');
    }else{
        //console.log('无法查看真实的客流报表数据');
        Core.saveUserdata('ereport','n');
        Core.noRealWayTip('#');
        return false;
    }
    location.reload();
}
function getjsonBox(){
    /**
     * [dataArr 存储数据路由]
     * @type {Array}
     */
    var dataArr = new Array();
    if(Core.loadUserdata('ereport') == 'y'){//真实数据
        dataArr.push('/pfapi/passenger_flow/flow_data');
        dataArr.push('/pfapi/passenger_flow/detail_flow');
        dataArr.push('/pfapi/passenger_flow/retention_data');
        dataArr.push('/pfapi/figure/base_data');
        dataArr.push('/pfapi/figure/advance_data');
        dataArr.push('/pfapi/figure/heatmap');
    }else{
        dataArr = new Array();//模拟数据
        dataArr.push('/html/report/js/r_report/data/a1_data_day.json');
        dataArr.push('/html/report/js/r_report/data/a2_data_day.json');
        dataArr.push('/html/report/js/r_report/data/a3_data_day.json');
        dataArr.push('/html/report/js/r_report/data/b1_data_day.json');
        dataArr.push('/html/report/js/r_report/data/b2_data.json');
        dataArr.push('/html/report/js/r_report/data/b3_data.json');
    }
    return dataArr;
}
const modeUrl = getjsonBox();
var evbox = $("#myEvalData");
evbox.data("modeurl",modeUrl);
if(truthCookie!=''&& typeof(truthCookie)!='undefined'){
    var shtml = (Core.loadUserdata('ereport') == 'y')? '<i class="is-real"></i>':'<i class="not-real"></i>';
    evbox.find(".modetype").html(shtml);
}else{
    if(Core.loadUserdata('ereport') == 'y'){
        Core.noRealWayTip('#');
    }
    evbox.find(".modetype").html('<i class="not-real"></i>');
    Core.saveUserdata('ereport','n');
}
// console.log(document.cookie);
</script>