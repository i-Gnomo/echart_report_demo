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
function switchModeData(){
    //改变数据模式
    if(Core.loadUserdata('ereport') == 'y'){
        console.log('切换到模拟数据');
        Core.saveUserdata('ereport','n');
    }else{
        console.log('切换到真实数据');
        Core.saveUserdata('ereport','y');
    }
    location.reload();
}
function getjsonBox(){
    var dataArr = new Array();
    if(Core.loadUserdata('ereport') == 'y'){//真实数据
        dataArr.push('/used_car/report_n/js/r_report/data/1.json');
        dataArr.push('/used_car/report_n/js/r_report/data/2.json');
        dataArr.push('/used_car/report_n/js/r_report/data/3.json');
        dataArr.push('/used_car/report_n/js/r_report/data/4.json');
        dataArr.push('/used_car/report_n/js/r_report/data/5.json');
        dataArr.push('/used_car/report_n/js/r_report/data/6.json');
    }else{
        dataArr = new Array();//模拟数据
        dataArr.push('/used_car/report_n/js/r_report/data/a1_data_day.json');
        dataArr.push('/used_car/report_n/js/r_report/data/a2_data_day.json');
        dataArr.push('/used_car/report_n/js/r_report/data/a3_data_day.json');
        dataArr.push('/used_car/report_n/js/r_report/data/b1_data_day.json');
        dataArr.push('/used_car/report_n/js/r_report/data/b2_data.json');
        dataArr.push('/used_car/report_n/js/r_report/data/b3_data.json');
    }
    return dataArr;
}
const modeUrl = getjsonBox();
var evbox = $("#myEvalData");
evbox.data("modeurl",modeUrl);
if(Core.loadUserdata('ereport') == 'y'){
    evbox.find(".modetype").html('<i class="is-real"></i>');
}else{
    evbox.find(".modetype").html('<i class="not-real"></i>');
}
</script>