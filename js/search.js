$(document).ready(function() { 
    var search_url = window.location.search;
    var search_url_position = search_url.search("=");
    search_url_position += 1;
    var search_name = search_url.substring(search_url_position);


    var t = 0;
    var backurl = 'back/app?name=';
   // var search_name = getUrlParam('search');
   
    /*function getUrlParam(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);  //匹配目标参数
      if (r!=null) return unescape(r[2]); return null; //返回参数值
    }*/
    //alert(encodeURIComponent(search_name));
    backurl = backurl + search_name;
    //search_name = search_name.replace(/\n/g,"");
    //var search_name = decodeURI(search_name);
    //alert(search_name);
    search_name = decodeURI(search_name);
    $("h1").text("搜尋關鍵字：" + search_name);
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

    $("#get_more").click(function(){
    backurl = "back/app?name=" + search_name + "&skip=";    
        $('.more_loader_spinner').css('display','block');
        $.ajax({
          type:'GET',
          url:backurl + t,
          dataType: "json",
          success:function(data){
            t=t+10;
            $('.more_loader_spinner').css('display','none');
            var app_arr=data;
            var l=app_arr.length;
            for(var i=0;i<l;i++) {
              if (i%2==0) $(".app-list").append("<div class=\"app-item\"></div>");
              $(".app-item:last").append("<div class=\"app-item-left\"><div class=\"pic\"><a href=\"app.php?app_id=" + app_arr[i].id + "\"><img src=\"" + app_arr[i].img_url + "\"></img></a></div>" + "<div class=\"info\"><h3><a href=\"app.php?app_id=" + app_arr[i].id + "\">" + substr_name(app_arr[i].name,10) + "</a></h3><div class=\"info-suck\"><a href=\"#\">" + app_arr[i].suck_count + "</a> Sucks | <a href=\"#\">" + app_arr[i].app_comment + "</a> 吐槽</div></div><div>");
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

   function substr_name(name,maxl) {
      var r = name;
      var rl = name.length;
      if (rl>maxl) return(r.substring(0,maxl)+"..."); return(r);
  }

}); //end ready
