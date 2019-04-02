$(function() {
    /*
    		实现用户点击搜索按钮跳转到搜索结果页
    			
    			1.给搜索按钮添加点击事件
    			2.获取用户输入的搜索关键字
    			3.判断用户是否输入了搜索关键字
    			4.如果用户没有输入 阻止跳转 并且给出提示
                5.如果用户输入了 跳转到搜索结果页面 并且要将用户输入的关键字带到这个页面去
    // 在跳转之前，把关键字要在本地存储一份  localStorage
        // JSON.parse()   字符串->数组
        // JSON.stringify()  数组->字符串
                */
    var keyArr = localStorage.getItem("keyArr") ? JSON.parse(localStorage.getItem("keyArr")) : [];
    // keyArr转换成了数组，模板必须要传递对象
    var html = template("moban", { list: keyArr })
    console.log(keyArr);
    $("#ul").html(html);
    $("#history-box").on("click", function() {
        //获取text的值
        var keyword = $(this).siblings('input').val();
        // console.log(keyword);
        if (keyword.trim() == '') {
            mui.alert("搜索不能为空");
            return;
        }
        keyArr.push(keyword);
        localStorage.setItem("keyArr", JSON.stringify(keyArr));
        location.href = "searchResult.html?kw=" + keyword;
    })
    $(".clear").on("click", function() {
        $("#ul").html("");
        localStorage.removeItem("keyArr");
        keyArr = [];
    })
})