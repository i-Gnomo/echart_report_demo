(function () {
    var _body = $('body');
    var _win = $(window);
    $.extend({
        calcStyle: function () {
            _body.trigger('calcStyle');
        }
    });

    $.extend({
        higher: function () {//得到body和window中更高的一个
            var _winHeight = _win.height() * 1;
            var _bodyHeight = _body.height() * 1;
            var higher = _winHeight > _bodyHeight ? _win : _body;
            return higher;
        },
        wider: function () {//得到body和window中更宽的一个
            var _winWidth = _win.width() * 1;
            var _bodyWidth = _body.width() * 1;
            var wider = _winWidth > _bodyWidth ? _win : _body;
            return wider;
        }
    });


    function loadInclude() {
        $('.include').not('.loaded').addClass('loaded').each(function () {
            var _t = $(this);
            $.ajax({
                url: _t.attr('data-url'),
                async: false,
                success: function (html) {
                    _t.after(html);
                    _t.remove();
                    $.calcStyle();
                    if ($('.include').not('.loaded').length > 0) {
                        loadInclude();
                    }
                }
            });
        });
    }

    loadInclude();
})();

(function () {
    easyloader.locale = 'zh_CN';
    $.extend({
        tableOption: function (opt) {
            var initOpt = {
                idField: 'id',
                rownumbers: true, //是否显示行号
                method: 'get', //数据方式
                striped: true,//条纹行
                fitColumns: true, //宽度自适横向滚动条
                singleSelect: false, //选中单行
                collapsible: true,
                autoRowHeight: true, //自动行高
                pagination: true, //是否分页
                multiSort: true, //多个排序
                pageSize: 30, //初始化页内行数
                pageList: [30, 50, 100],
                loadMsg: '正拼命加载，请稍候...',
                checkOnSelect: true
            };
            for (var i in opt) {
                initOpt[i] = opt[i];
            }
            return initOpt;
        }
    });
})();

$(function () {
    $(document).on('click', 'a', function (e) {
        var _t = $(this);
        if ((_t.attr('href') || '').replace(/\#/g, '') === '') {
            e.preventDefault();
        }
    });
});
$(function () {//全选 反选
    $(document).on('change', ':checkbox', function () {
        var _t = $(this);
        if (_t.hasClass('check-all')) {
            var _name = _t.attr('data-name');
            $(':checkbox[name="' + _name + '"]').not(_t).prop('checked', _t.prop('checked'));
        } else {
            var _name = _t.attr('name');
            $(':checkbox[data-name="' + _name + '"]').filter('.check-all').prop('checked', $(':checkbox[name="' + _name + '"]').not('.check-all').not(':checked').length == 0);
        }
    });
});


$(function () {
    var timeout = null;
    var _body = $('body');
    $(window).on('scroll resize', function () {
        clearTimeout(timeout);
        timeout = setTimeout($.calcStyle, 100);
    });
    $.calcStyle();
});

$(function () {//动态设置左侧导航条的高度
    var leftsidebar = $('.leftsidebar');
    var main = $('.main');
    $('body').on('calcStyle', function () {
        leftsidebar.css('height', 'auto');
        var higher = $.higher().height();
        var mainHeight = main.height();
        var newHeight = higher - leftsidebar.offset().top;
        var autoHeight = leftsidebar.height();
        if (mainHeight > newHeight) {
            newHeight = mainHeight;
        }
        if (autoHeight > newHeight) {
            newHeight = autoHeight;
        }
        var oldHeight = leftsidebar.height() * 1;
        if (newHeight != oldHeight) {
            leftsidebar.height(newHeight);
        }
    });
    $.calcStyle();
});

$(function () {//动态设置页面主题内容的宽度
    var _main = $('.main');
    var leftsidebar = $('.leftsidebar');
    $('body').on('calcStyle', function () {
        var _leftsidebar = leftsidebar.not(':hidden');
        _main.width('auto');
        var wider = $.wider().width();
        var newWidth = wider - _leftsidebar.width();
        _main.width(newWidth);
    });
    $.calcStyle();
});

$(function () {//切换左侧导航显示隐藏
    var isAnimating = false;
    var _main = $('.main');
    var _leftsidebar = $('.leftsidebar');
    $('body').on('click', '.switch_left', function () {
        if (!isAnimating) {
            $('body').addClass('ovhd');
            isAnimating = true;
            if (_leftsidebar.is(':hidden')) {
                _leftsidebar.show().animate({left: 0}, 200, function () {
                    isAnimating = false;
                });
                _main.animate({left: '210px', width: ($.wider().width() - 210) + 'px'}, 200);
            } else {
                _leftsidebar.animate({left: '-210px'}, 200, function () {
                    _leftsidebar.hide();
                    isAnimating = false;
                });
                _main.animate({left: 0, width: $.wider().width() + 'px'}, 200);
            }
            setTimeout(function () {
                $.calcStyle();
                $('body').removeClass('ovhd');
                $.calcStyle();
            }, 300);
        }
    });
});

$(function () {//左侧导航 展开收缩
    var _lev1List = $('.leftsidebar .level_1');
    $('.level_1.active .level_2').show();
    $('.leftsidebar').on('click', '.title_link', function (e) {
        var lev1 = $(this).parent('.level_1');
        if (lev1.find('.level_2 a').length) {
            e.preventDefault();
            if (lev1.hasClass('active')) {
                lev1.removeClass('active');
                lev1.find('.level_2').slideUp(200);
            } else {
                lev1.addClass('active');
                lev1.find('.level_2').slideDown(200);
            }
            _lev1List.not(lev1).filter('.active').removeClass('active').find('.level_2').not(':hidden').slideUp(200);

            _lev1List.not('.active').find('.open_close').removeClass('close').addClass('open');
            _lev1List.filter('.active').find('.open_close').removeClass('open').addClass('close');
        }
        $.calcStyle();
        setTimeout($.calcStyle, 250);
    });
    _lev1List.filter('.active').find('.open_close').removeClass('open').addClass('close');
});
$(function () {
    var _leftsidebar = $('.leftsidebar');

    function tableBoxResize() {
        $('.main .table_box').each(function () {
            var _t = $(this);
            var _table = _t.find('.table_main');
            _table.datagrid('resize', {
                width: _t.width(),
                height: _leftsidebar.height() - (_t.offset().top - _leftsidebar.offset().top)
            });
        });
    }

    $.extend({
        tableBoxResize: tableBoxResize
    });
    var ix = null;
    $('body').on('calcStyle', tableBoxResize);
    $(window).on('resize', function () {
        clearTimeout(ix);
        ix = setTimeout($.calcStyle, 500);
    });
});

$(function () {//分页条
    $('.page_bar').on('click', 'span', function () {
        var _t = $(this);
        var _pb = _t.parents('.page_bar');
        if (!(_t.hasClass('disabled') || _t.hasClass('ellipsis') || _t.hasClass('current'))) {
            var pnum;
            var txt = $.trim(_t.text());
            if (isNaN(txt)) {
                var curr = $.trim(_pb.find('.current').text()) * 1;
                if (_t.hasClass('prev')) {
                    pnum = curr - 1;
                } else if (_t.hasClass('next')) {
                    pnum = curr + 1;
                }
            } else {
                pnum = txt * 1;
            }
            if (pnum < 1) {
                pnum = 1;
            }
            _pb.find('.page_num').val(pnum);
            _pb.submit();
        }
    }).on('submit', function (e) {
        var _t = $(this);
        var pn = _t.find('.page_num').val() * 1;
        if (!(pn > 0)) {
            e.preventDefault();
        }
    });
});
$(function () {// tab_links 标签切换

    $.extend({
        loadTbBox: function (box) {
            if (box.data('loaded_inner') !== 'yes') {
                box.data('loaded_inner', 'yes');
                var url = box.attr('data-url');
                if (url) {
                    $.get(url, function (html) {
                        box.html(html);
                        $.calcStyle();
                    });
                }
            }
        }
    });

    $(document).on('click', '.tab_links a', function (e) {
        var _t = $(this);
        var _tb = _t.parents('.tab_links');
        var _href = $.trim(_t.attr('href'));
        if (_href.indexOf('#') === 0 && $(_href).length) {
            e.preventDefault();
            _tb.find('a').removeClass('active');
            _t.addClass('active');
            _tb.find('a').each(function (k, v) {
                var href = $.trim($(v).attr('href'));
                if (href.indexOf('#') === 0 && $(href).length) {
                    $(href).hide();
                }
            });
            $(_href).show();
            if ($(_href).hasClass('tbox')) {
                $.loadTbBox($(_href));
            }
        }
    });


    $('.tab_links a.active').trigger('click');
});
$(function () {
    $(document).on('click', '.layui-layer-page a[href="#close"]', function (e) {
        e.preventDefault();
        $(this).parents('.layui-layer-page').find('.layui-layer-close')[0].click();
    });
});
$(function () {
    $('body').ajaxComplete(function () {
        $('body').trigger('calcStyle');
        setTimeout(function () {
            $('body').trigger('calcStyle');
        }, 150);
    });
    $('body').on('calcStyle', function () {
        $('.z-select').zSelect();
    });
});


$(function () {//自定义列表
    $('.cus_list').on('click', function (e) {
        e.preventDefault();
        var _t = $(this);
        var fieldList = $('.field_list');
        if (fieldList.length) {
            fieldList.slideUp(150, function () {
                fieldList.empty().remove();
            });
        } else {
            var _href = $.trim($(this).attr('href'));
            if (_href && _href.indexOf('#') === 0) {
                var _table = $(_href);
                var fields = _table.datagrid('getColumnFields', true).concat(_table.datagrid('getColumnFields'));
                $('body').append('<div class="field_list" data-table="' + _href + '"></div>');
                fieldList = $('.field_list');
                var fieldListHtml = '<ul>';
                var isCheckedAll = true;
                $.each(fields, function (index, field) {
                    var _opt = _table.datagrid('getColumnOption', field);
                    var _title = $.trim(_opt.title);
                    if (_title) {
                        if (_opt.hidden) {
                            isCheckedAll = false;
                            fieldListHtml += ('<li><label class="checkbox"><input type="checkbox" name="fields" value="' + field + '"/><span>' + _title + '</span></label></li>');
                        } else {
                            fieldListHtml += ('<li><label class="checkbox"><input type="checkbox" name="fields" checked="checked" value="' + field + '"/><span>' + _title + '</span></label></li>');
                        }
                    }
                });
                fieldListHtml += '</ul>';
                fieldListHtml += ('<div class="reset_fields"><label class="checkbox"><input ' + (isCheckedAll ? 'checked="checked"' : '') + ' type="checkbox" class="check-all" data-name="fields"/><span>全选</span></label><button class="btn btn-small">确定</button></div>');
                fieldList.html(fieldListHtml);
                fieldList.offset({left: _t.offset().left - 300, top: _t.offset().top + 35});
                fieldList.slideDown(150);
            }
        }
    });
    $(document).on('click', '.reset_fields .btn', function () {
        var _t = $(this);
        var fieldsBox = _t.parents('.field_list');
        var _table = $(fieldsBox.attr('data-table'));
        fieldsBox.find('li :checkbox[name="fields"]').each(function (index, field) {
            if (field.checked) {
                _table.datagrid('showColumn', field.value);
            } else {
                _table.datagrid('hideColumn', field.value);
            }
        });
        fieldsBox.slideUp(150, function () {
            fieldsBox.empty().remove();
        });
    });
});
$(function () {//综合查询
    $('.search_together').on('click', function (e) {
        e.preventDefault();
        $.get(_staticPath + 'layout/search.php', function (html) {
            layer.open({
                type: 1,
                scrollbar: false,
                title: '综合查询',
                content: html,
                area: ['1220px', '570px']
            });
        });
    });

    $(document).on('submit', '.layui-layer-content .search_form', function (e) {
        e.preventDefault();
        var parmAry = $(this).serializeArray();
        var parm = {};
        $.each(parmAry, function (index, item) {
            parm[item.name] = item.value;
        });
        var table = $('#search_datalist');
        table.datagrid('load', parm);
    });
});
$(function () {
    $('.main').on('submit', '.search_form', function (e) {
        var table = $('#datalist');
        if (table.length) {
            e.preventDefault();
            var parmAry = $(this).serializeArray();
            var parm = {};
            $.each(parmAry, function (index, item) {
                parm[item.name] = item.value;
            });
            table.datagrid('load', parm);
        }
    });
});

$(function () {//搜索条 添加筛选条件

});