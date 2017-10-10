# 图表Demo

目录说明：

1. chartReport文件夹为图表显示页面
2. css样式表
3. js/report/data为模拟数据，js/report/中对应的js为不同的图表引入脚本
4. js/report/combdate.js为基于easyui扩展的日期选择，可选择周和月份
5. layout中有公用的头部和搜索框

6. 图表数据可以选择切换真实数据或者模拟数据，默认显示模拟数据，根据document.cookie获取到的truthdata_cookie值来判断是否有显示真实数据的权限。
如果不能显示真实数据则弹出提示层。

这是一个使用echart图表的示例，数据是使用json模拟，根据日期切换搜索数据，日期使用了easyui的databox组件，加以扩展，可选每周日期，或者月份。
