<!--数据搜索表单-->
<form class="search-box cod-exist" style="height:30px">
    <input type="hidden" name="id" id="myid" value="1" />
    <span class="field" style="width:100px;text-align:right;padding-right:10px;">搜索条件：</span>
    <span class="field field-select">
        <select class="easyui-combobox" editable="false" name="shop_date_type" id="shop_date_type">
            <option value="day">天数据</option>
            <option value="week">周数据</option>
            <option value="month">月数据</option>
        </select>
    </span>
    <span class="field" attr-dateType="day">
        <!--按天查询-->
        <input class="easyui-datebox" id="daytime" name="day" editable="false" value=""/>
    </span>
    <span class="field disn" attr-dateType="week" id="weekField">
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