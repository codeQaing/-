// 当页面的DOM结构加载完成之后 执行回调函数中的代码
$(function() {

    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 获取一级分类数据
    $.ajax({
            url: '/category/queryTopCategory',
            type: 'get',
            success: function(res) {
                console.log(res);
                //获取引擎模板
                var html = template("category-first", res);
                // console.log(html);
                $("#links").html(html);
                // 如果一级分类有数据的话
                $("#links").find("li").eq(0).addClass("active");
                var firstTopid = res.rows[0].id;
                // console.log(firstTopid);

            }
        })
        // 1.一级分类添加点击事件
    $("#links").on("click", "li", function() {
        // 2.获取当前点击的一级分类的ID
        var id = $(this).children().attr('data-id');
        // console.log(id);
        // 给当前点击的一级分类添加选中状态
        $(this).addClass('active').siblings().removeClass('active');
        // 3.调用接口 获取数据
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            success: function(response) {

                var html = template('category-second', response);

                $('.brand-list').html(html);
            }
        });
    })
});