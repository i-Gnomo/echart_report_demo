<!DOCTYPE html>
<!--[if IE 6]>
<html class="ie6 ie" lang="zh-cmn-Hans"><![endif]-->
<!--[if IE 7]>
<html class="ie7 ie" lang="zh-cmn-Hans"><![endif]-->
<!--[if IE 8]>
<html class="ie8 ie" lang="zh-cmn-Hans"><![endif]-->
<!--[if IE 9]>
<html class="ie9 ie" lang="zh-cmn-Hans"><![endif]-->
<!--[if !IE]><!-->
<html lang="zh-cmn-Hans">
<script>
    if (/*@cc_on!@*/false) {//ie10
        document.documentElement.className += ' ie10 ie';
    }
    if (document.documentMode) {
        if (/*@cc_on!@*/true) {//ie11
            document.documentElement.className += ' ie' + document.documentMode + ' ie';
        }
    }
</script>
<!--<![endif]-->
<head>
    <meta name="google" value="notranslate"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="renderer" content="webkit"/>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="format-detection" content="telephone=no"/>

    <?php
    $staticPath = '/used_car/report_n/';//静态文件目录
    $version = '1.0.0';
    //$version = floor(time() / 10);//版本号 本地调试时用时间戳 清除静态文件缓存
    ?>
    <script>
        var _staticPath = '<?php echo $staticPath;?>';
        var _version = '<?php echo $version;?>';
    </script>
    
    <link rel="stylesheet" type="text/css" href="<?php echo $staticPath ?>css/common.css?v=<?php echo $version; ?>"/>
    <link rel="stylesheet" type="text/css" href="<?php echo $staticPath ?>css/r-style.css?v=<?php echo $version; ?>"/>
    <script src="<?php echo $staticPath ?>js/jquery.min.js?v=<?php echo $version; ?>"></script>
    <script src="<?php echo $staticPath ?>plugin/plugins.min.js?v=<?php echo $version; ?>"></script>
</head>
<body>
