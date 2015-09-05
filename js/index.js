 $(document).ready(function() {
    var t = 0;
    var backurl = 'back/app';
    var app_genre = getUrlParam('app_genre');     
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r!=null) return unescape(r[2]); return null; //返回参数值
    } 

    if (app_genre!=null) backurl = backurl + "?genre=" + app_genre;

    getapplist();

    function getapplist(){
        $.ajax({
          type:'GET',
          url:backurl,
          dataType: "json",
          success:function(data){
            var app_arr=data;
            for(var i=0,l=app_arr.length;i<l;i++) {
              if (i%2==0) $(".app-list").append("<div class=\"app-item\"></div>");
              $(".app-item:last").append("<div class=\"app-item-left\"><div class=\"pic\"><a href=\"app.php?app_id=" + app_arr[i].id + "\"><img src=\"" + app_arr[i].img_url + "\"></img></a></div>" + "<div class=\"info\"><h3><a href=\"app.php?app_id=" + app_arr[i].id + "\">" + substr_name(app_arr[i].name,10) + "</a></h3><div class=\"info-suck\"><a href=\"#\">" + app_arr[i].favorite_count + "</a> Favorite | <a href=\"#\">" + app_arr[i].app_comment + "</a> 留言</div></div><div>");
            }
            if (l<10) {
              $(".app-item-more").append("<p style=\"text-align: center;\">沒有更多的資料了……</p>");
              $("#get_more").css('display','none');
            }
            if (l==null) {
              $(".app-item-more").append("<p style=\"text-align: center;\">沒有更多的資料了……</p>");
              $("#get_more").css('display','none');
            }
            t = t + 10;
          }
        }); //end .ajax
    } //getapplist

    $.ajax({
        type:'GET',
        url:'back/app?status=comment',
        dataType: "json",
        success:function(data){
          var comment_arr=data;
          for(var i=0,l=comment_arr.length;i<l;i++) {
            $(".comment-list").append("<div class=\"comment-item\"><div class=\"comment-meta\"><a href=\"user.php?user_id=" + comment_arr[i].user_id +
              "\">" + comment_arr[i].user_name + "</a> 留言了 「<a href=\"app.php?app_id=" + comment_arr[i].app_id + 
              "\">" + comment_arr[i].app_name + "</a>」</div><div class=\"pic\"><a href=\"app.php?app_id=" + comment_arr[i].app_id + 
              "\"><img src=\"" + comment_arr[i].app_img + "\" alt=\"" + comment_arr[i].app_name + "\"></a></div><div class=\"comment-content\">" + 
              comment_arr[i].comment + "</div></div>");
          }
        }
    });

    $("#get_more").click(function(){
        backurl = 'back/app';
        if (app_genre==null) backurl = backurl + "?skip="; backurl = backurl + "?genre=" + app_genre + "&skip=";
        $('.more_loader_spinner').css('display','block');
        $.ajax({
          type:'GET',
          url:backurl + t,
          dataType: "json",
          success:function(data){
            t=t+10;
            $('.more_loader_spinner').css('display','none');
            var app_arr=data;
            for(var i=0,l=app_arr.length;i<l;i++) {
              if (i%2==0) $(".app-list").append("<div class=\"app-item\"></div>");
              $(".app-item:last").append("<div class=\"app-item-left\"><div class=\"pic\"><a href=\"app.php?app_id=" + app_arr[i].id + "\"><img src=\"" + app_arr[i].img_url + "\"></img></a></div>" + "<div class=\"info\"><h3><a href=\"app.php?app_id=" + app_arr[i].id + "\">" + substr_name(app_arr[i].name,10) + "</a></h3><div class=\"info-suck\"><a href=\"#\">" + app_arr[i].favorite_count + "</a> Sucks | <a href=\"#\">" + app_arr[i].app_comment + "</a> 吐槽</div></div><div>");
            }
            if (l<10) {
              $(".app-item-more").append("<p style=\"text-align: center;\">沒有更多的資料了……</p>");
              $("#get_more").css('display','none');
            }
            if (l==null) {
              $(".app-item-more").append("<p style=\"text-align: center;\">沒有更多的資料了……</p>");
              $("#get_more").css('display','none');
            }
        }
        });
    }); //end more

    $("#cate-list li a").click(function(){
      if ($(this).attr("class")!="cur") {
        $("#cate-list li a").removeClass("cur");
        $(this).addClass("cur");
        backurl = 'back/app';
        app_genre = $(this).siblings("span").html();
        if (app_genre!=null) backurl = backurl + "?genre=" + app_genre;
        $(".app-list").slideUp("slow");
        $(".more_loader_spinner").before("<div class=\"app-list\"></div>");
        getapplist();
      }
    }); //end cate


   function substr_name(name,maxl) {
      var r = name;
      var rl = name.length;
      if (rl>maxl) return(r.substring(0,maxl)+"..."); return(r);
  }

}); //end ready
