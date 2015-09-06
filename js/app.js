 $(document).ready(function() {

  var behaviors_name_1 = [];
  var behaviors_score_1 = [];

  var behaviors_name_2 = [];
  var behaviors_score_2 = [];
  
  var radarChartData;
  //畫圖用 1,2類

  var user_status = document.cookie;
  var me_id_position = user_status.search("id=");
  me_id_position += 3;
  var me_id = user_status.substring(me_id_position);
  var comment_arr;
  var cluster_arr;
  var total=5;
  var app_id = getUrlParam('app_id');     
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
  } 

  appdetail(app_id);
  appcluster(app_id);
  appcomment(app_id);
  appdraw(app_id);

  $(".suck a:eq(0)").click(function() {
     if(me_id==""){
        alert("請先登入喔 才能按喔~");
        window.location.href = "login.php";
     }
     else{
        if($(".suck a:eq(0)").attr('class')=="unhave")
        {
          var suck_id = app_id;
          var formdata = {
                            "status":"user_favorite",
                            "app_id":app_id
                          };
          $.ajax({
              type:'POST',
              url:'back/app/',
              data:formdata,
              success:function(data){
                if(data.status=="success")
                {
                  $("#add-suck").fadeIn();
                  $(".suck a:eq(0)").attr('class','have');
                  appdetail(app_id);
                  $("#add-suck").fadeOut();
                }
              }
            })//end ajax;
        }
        else{
          var suck_id = app_id;
          var formdata = {
                            "status":"user_unfavorite",
                            "app_id":app_id
                          };
          $.ajax({
              type:'POST',
              url:'back/app/',
              data:formdata,
              success:function(data){
                if(data.status=="success")
                {
                  $("#del-suck").fadeIn();
                  $(".suck a:eq(0)").attr('class','unhave');
                  appdetail(app_id);
                  $("#del-suck").fadeOut();
                }
              }
            })//end ajax;
        }

     }
  }); //按favorite!

  $(".suck a:eq(1)").click(function() {
    if(me_id==""){
      alert("請先登入喔 才能新增吐槽喔~");
      window.location.href = "login.php";
    }
    else{
      var state = $(".add-comment").css("display");
      if(state == "block") {
        $(".add-comment").slideUp("normal");
      }        
      else {
        $(".add-comment p").html('目前剩下：<span id="txtCount">255</span> 字');
        $(".add-comment textarea").val('');
        $(".add-comment").slideDown("normal");
      }

    }
      
    }); //end show add-comment

  function appcluster(app_id){
    $('.more_loader_spinner').css('display','block');
    $.ajax({
      type:'GET',
      url:'back/app/' + app_id,
      dataType: "json",
      success:function(data){
        $('.more_loader_spinner').css('display','none');
        cluster_arr=data.group_app;
        var l=5;
        total=5;
        if (cluster_arr.length<5) l=cluster_arr.length;
        if (cluster_arr.length==null) l=-1;
        if (l>0) {
          for(var i=0;i<l;i++) {
            var cluster_item_str = "<div class=\"cluster-item\"><div class=\"pic\"><a href=\"app.php?app_id=" + cluster_arr[i].id + 
            "\"><img src=\"" + cluster_arr[i].img_url + "\" alt=\"" + cluster_arr[i].name + 
            "\"></a></div><div class=\"cluster-meta\"><a href=\"app.php?app_id=" + cluster_arr[i].id + "\">" + cluster_arr[i].name + 
            "</a>  「" + cluster_arr[i].created_at + "」</div><div class=\"cluster-content\" id=\"usercomment"+ cluster_arr[i].id +"\">" + cluster_arr[i].description + "</div>";
            // if (me_id==comment_arr[i].user_id) {
            //   comment_item_str=comment_item_str+"<div class=\"comment-edit\" id=\"comment-edit"+ comment_arr[i].id + "\"><span>"+ comment_arr[i].id + 
            //   "</span>><a href=\"javascript:;\" class=\"editcomment\" class=\"editcomment\">编辑</a> ><a href=\"javascript:;\" class=\"deletecomment\">删除</a></div><div class=\"add-comment-edit\" id=\"commentcontent"+ comment_arr[i].id +
            //   "\"><p>目前剩下<span id=\"txtCount\">255</span>字</p><textarea id=\"textarea"+ comment_arr[i].id +
            //   "\" name=\"comment\" rows=\"1\" onkeyup=\"changeText(this);\"></textarea><span>><a href=\"javascript:;\"class=\"submitedited\" id=\"editcomment"+
            //   comment_arr[i].id +"\">發佈</a> ><a href=\"javascript:;\"class=\"canceled\" id=\"canceled"+ comment_arr[i].id + "\">取消</a></span></div></div>"
            // }
            // else {
            //   comment_item_str=comment_item_str+"</div>";
            // }
            $(".item-cluster-list").append(cluster_item_str);
          }
        }
        if (cluster_arr.length<5) {
          $("#get_more_cluster").css('display','none');
          total=cluster_arr.length;
        }
        else
         if (cluster_arr.length==null) {
          $("#get_more_cluster").css('display','none');
          total=0;
        }
        else {
          $("#get_more_cluster").css('display','block');
          $("#nomore").css('display','none');
        }
      }
    });//end show appcomment
  }
  function appcomment(app_id){
    $('.more_loader_spinner').css('display','block');
    $.ajax({
      type:'GET',
      url:'back/app/' + app_id + '?status=comment',
      dataType: "json",
      success:function(data){
        $('.more_loader_spinner').css('display','none');
        comment_arr=data;
        var l=5;
        total=5;
        if (comment_arr.length<5) l=comment_arr.length;
        if (comment_arr.length==null) l=-1;
        if (l>0) {
          for(var i=0;i<l;i++) {
            var comment_item_str = "<div class=\"comment-item\"><div class=\"pic\"><a href=\"user.php?user_id=" + comment_arr[i].user_id + 
            "\"><img src=\"" + comment_arr[i].user_img + "\" alt=\"" + comment_arr[i].user_name + 
            "\"></a></div><div class=\"comment-meta\"><a href=\"user.php?user_id=" + comment_arr[i].user_id + "\">" + comment_arr[i].user_name + 
            "</a>  「" + comment_arr[i].created_at + "」</div><div class=\"comment-content\" id=\"usercomment"+ comment_arr[i].id +"\">" + comment_arr[i].comment + "</div>";
            if (me_id==comment_arr[i].user_id) {
              comment_item_str=comment_item_str+"<div class=\"comment-edit\" id=\"comment-edit"+ comment_arr[i].id + "\"><span>"+ comment_arr[i].id + 
              "</span>><a href=\"javascript:;\" class=\"editcomment\" class=\"editcomment\">編輯</a> ><a href=\"javascript:;\" class=\"deletecomment\">刪除</a></div><div class=\"add-comment-edit\" id=\"commentcontent"+ comment_arr[i].id +
              "\"><p>目前剩下<span id=\"txtCount\">255</span>字</p><textarea id=\"textarea"+ comment_arr[i].id +
              "\" name=\"comment\" rows=\"1\" onkeyup=\"changeText(this);\"></textarea><span>><a href=\"javascript:;\"class=\"submitedited\" id=\"editcomment"+
              comment_arr[i].id +"\">發佈</a> ><a href=\"javascript:;\"class=\"canceled\" id=\"canceled"+ comment_arr[i].id + "\">取消</a></span></div></div>"
            }
            else {
              comment_item_str=comment_item_str+"</div>";
            }
            $(".item-comment-list").append(comment_item_str);
          }
        }
        if (comment_arr.length<5) {
          $("#get_more").css('display','none');
          total=comment_arr.length;
        }
        else
         if (comment_arr.length==null) {
          $("#get_more").css('display','none');
          total=0;
        }
        else {
          $("#get_more").css('display','block');
          $("#nomore").css('display','none');
        }
        $(".editcomment").on('click',editcomment);
        $(".deletecomment").on('click',deletecomment);
        $(".submitedited").on('click',subeditcomment);
        $(".canceled").on('click',cancelecomment);
      }
    });//end show appcomment
  }
  $('.add-comment #submitcomment').click(function() {
        var comment_words = $(".add-comment textarea").val().length;
        if(comment_words >= 255)
        {
          alert("抱歉字數太多囉QQ...");
        }
        else
        {
            $(".add-comment p").text('發佈中..');
            var comment_id = app_id;
            var usercomment = $(".add-comment textarea").val();
            var formdata = {
              "status":"apps_comment",
              "app_id":comment_id,
              "comment":usercomment};
            $.ajax({
                type:'POST',
                url:'back/app/',
                data:formdata,
                success:function(data){
                  if(data.status=="success")
                  {
                    appdetail(app_id);
                    $(".add-comment").slideUp("normal");
                    $('.item-comment-list').html("").fadeIn(1000);
                    appcomment(app_id);
                    $("#clustApp").hide(); 
                    $("#commentApp").show(); 
                  }
                }
              })//end ajax;
        }
      });//end add-comment
$("#get_more_cluster").click(function(){
        if (cluster_arr.length>=5) {
          var l,m;        
          total=total+5;
          if (cluster_arr.length<total)
            l=cluster_arr.length;
          else
            l=total;     
          for(var i=total-5;i<l;i++) {
            $(".item-comment-list").append("<div class=\"comment-item\"><div class=\"pic\"><a href=\"app.php?app_id=" + cluster_arr[i].id + 
            "\"><img src=\"" + cluster_arr[i].img_url + "\" alt=\"" + cluster_arr[i].name + 
            "\"></a></div><div class=\"comment-meta\"><a href=\"app.php?app_id=" + cluster_arr[i].id + "\">" + cluster_arr[i].name + 
            "</a>  「" + cluster_arr[i].created_at + "」</div><div class=\"comment-content\" id=\"usercomment"+ cluster_arr[i].id +"\">" + cluster_arr[i].description + "</div>");
            // if (me_id==comment_arr[i].user_id) {
            //   $(".comment-content:eq(" + i + ")").after("<div class=\"comment-edit\" id=\"comment-edit"+ comment_arr[i].id + "\"><span>"+ comment_arr[i].id + 
            //   "</span>><a href=\"javascript:;\" class=\"editcomment\" class=\"editcomment\">编辑</a> ><a href=\"javascript:;\" class=\"deletecomment\">删除</a></div><div class=\"add-comment-edit\" id=\"commentcontent"+ comment_arr[i].id +
            //   "\"><p>目前剩下<span id=\"txtCount\">255</span>字</p><textarea id=\"textarea"+ comment_arr[i].id +
            //   "\" name=\"comment\" rows=\"1\" onkeyup=\"changeText(this);\"></textarea><span>><a href=\"javascript:;\"class=\"submitedited\" id=\"editcomment"+
            //   comment_arr[i].id +"\">發佈</a> ><a href=\"javascript:;\"class=\"canceled\" id=\"canceled"+ comment_arr[i].id + "\">取消</a></span></div>");
            // } 
          }
          if (cluster_arr.length<total) {
              $(".app-item-more").append("<p id=\"nomore\" style=\"text-align: center;\">沒有更多的同類App了……</p>");
              $(this).css('display','none');
          }
        }
        else
          alert("沒有更多的評論了~");
  }); //end more
  $("#get_more").click(function(){
        if (comment_arr.length>=5) {
          var l,m;        
          total=total+5;
          if (comment_arr.length<total)
            l=comment_arr.length;
          else
            l=total;     
          for(var i=total-5;i<l;i++) {
            $(".item-comment-list").append("<div class=\"comment-item\"><div class=\"pic\"><a href=\"app.php?app_id=" + comment_arr[i].id + 
            "\"><img src=\"" + comment_arr[i].img_url + "\" alt=\"" + comment_arr[i].name + 
            "\"></a></div><div class=\"comment-meta\"><a href=\"app.php?app_id=" + comment_arr[i].id + "\">" + comment_arr[i].name + 
            "</a>  「" + comment_arr[i].created_at + "」</div><div class=\"comment-content\" id=\"usercomment"+ comment_arr[i].id +"\">" + comment_arr[i].description + "</div>");
            if (me_id==comment_arr[i].user_id) {
              $(".comment-content:eq(" + i + ")").after("<div class=\"comment-edit\" id=\"comment-edit"+ comment_arr[i].id + "\"><span>"+ comment_arr[i].id + 
              "</span>><a href=\"javascript:;\" class=\"editcomment\" class=\"editcomment\">編輯</a> ><a href=\"javascript:;\" class=\"deletecomment\">刪除</a></div><div class=\"add-comment-edit\" id=\"commentcontent"+ comment_arr[i].id +
              "\"><p>目前剩下<span id=\"txtCount\">255</span>字</p><textarea id=\"textarea"+ comment_arr[i].id +
              "\" name=\"comment\" rows=\"1\" onkeyup=\"changeText(this);\"></textarea><span>><a href=\"javascript:;\"class=\"submitedited\" id=\"editcomment"+
              comment_arr[i].id +"\">發佈</a> ><a href=\"javascript:;\"class=\"canceled\" id=\"canceled"+ comment_arr[i].id + "\">取消</a></span></div>");
            } 
          }
          if (comment_arr.length<total) {
              $(".app-item-more").append("<p id=\"nomore\" style=\"text-align: center;\">沒有更多的同類App了……</p>");
              $(this).css('display','none');
          }
          $(".editcomment").off('click',editcomment);
          $(".deletecomment").off('click',deletecomment);
          $(".submitedited").off('click',subeditcomment);
          $(".canceled").off('click',cancelecomment);
          $(".editcomment").on('click',editcomment);
          $(".deletecomment").on('click',deletecomment);
          $(".submitedited").on('click',subeditcomment);
          $(".canceled").on('click',cancelecomment);
        }
        else
          alert("沒有更多的評論了~");
  }); //end more

  function editcomment(){
       var user_comment_id=$(this).siblings("span").text();
       var status = $(this).text();
       var user_comment_content_id = "commentcontent"+user_comment_id;
       var comment_origin = $('#usercomment'+user_comment_id).text();
       $('#usercomment'+user_comment_id).hide();
       $('#comment-edit'+user_comment_id).hide();
       $('#textarea'+user_comment_id).text(comment_origin);
       $('#'+user_comment_content_id).show();          
  }

  function deletecomment(){
      var user_comment_id=$(this).siblings("span").text();
      if(confirm("確定要刪除嗎?")){
        var formdata = {
          "status":"delete_comment",
          "comment_id":user_comment_id
        };
        $.ajax({
          type:'POST',
          url:'back/app/',
          data:formdata,
          success:function(data){
            if(data.status=="success")
              {
                appdetail(app_id);
                $('.item-comment-list').html("").fadeIn(1000);
                appcomment(app_id);
                $("#clustApp").hide(); 
                $("#commentApp").show(); 
              }
            }
          });
      }
  }

  function subeditcomment(){ 
                var edit_id = $(this).attr('id');
                var edit_id = edit_id.substr(11);
                var comment_words = $("#textarea"+edit_id).val();
                var formdata ={
                      "status":"edit_comment",
                      "comment_id":edit_id,
                      "comment":comment_words
                }
                $.ajax({
                        type:'POST',
                        url:'back/app/',
                        data:formdata,
                        success:function(data){
                          if(data.status=="success")
                          {
                            $('.item-comment-list').html("").fadeIn(1000);
                            appcomment(app_id);
                            $("#clustApp").hide(); 
                            $("#commentApp").show(); 
                          }
                        }
                      })//end ajax;
        }

   function cancelecomment(){  
              var user_comment_id = $(this).attr('id');
              user_comment_id = user_comment_id.substr(8);
              var user_comment_content_id = "commentcontent"+ user_comment_id;
              $('#usercomment'+user_comment_id).show();
              $('#comment-edit'+user_comment_id).show();
              $('#'+user_comment_content_id).hide();     
  }


  function substr_name(name,maxl) {
      var r = name;
      var rl = name.length;
      if (rl>maxl) return(r.substring(0,maxl)+"..."); return(r);
  }//截取

  function appdetail(app_id){
  $.ajax({
    type:'GET',
    url:'back/app/' + app_id,
    dataType: "json",
    success:function(data){
      var app_name = data.name;
      var app_img = data.img_url;
      var app_descr = data.description;
      var app_genre = data.genre;
      var app_rating = data.rating;
      var app_rating_users = data.rating_users;
      var app_favorite = data.favorite_count;
      var app_comments = data.comment_count;
      

      $("h1").text(substr_name(app_name,36));
      $("#app-item-left .pic img").attr('src',app_img);
      $("#app-item-left .pic img").attr('alt',app_name);
      $(".info-meta p:eq(0)").html(substr_name(app_descr,200));
      $(".info-meta a").attr('href','index.php?app_genre='+app_genre);
      $(".info-meta a").text(app_genre);
      $(".info-meta p:eq(1)").html('<span>' + app_rating + '</span>（' + app_rating_users + '人評分）');
      $(".info-suck").html('<a href="#">' + app_favorite + '</a> Favorite | <a href="#">' + app_comments + '</a> 吐槽');
      if (data.user_favorite!="Already") {
        $(".suck a:eq(0)").attr('class','unhave');
        $(".suck a:eq(0)").attr('title','加入最愛');
      }
      else {
        $(".suck a:eq(0)").attr('class','have');
        $(".suck a:eq(0)").attr('title','取消最愛');
      }
      $(".content-right-cluster h2").text('與'+ substr_name(app_name,12) + '同類型的 App· · ');
      $(".content-right h2").text('對'+ substr_name(app_name,12) + '的留言· · ');
      $("#commentApp").hide();   
    } //end success

  });//end ajax

  } //end app-detail
$("#get_comment").click(function(){
    $("#clustApp").hide(); 
    $("#commentApp").show(); 
});
$("#get_cluster").click(function(){
    $("#commentApp").hide(); 
    $("#clustApp").show(); 
});
  function appdraw(app_id){
    $.ajax({
      type:'GET',
      url:'back/app/' + app_id,
      dataType: "json",
      success:function(data){
        var app_behaviors = data.behaviors;
        for(i=0;i<data.behaviors.length;i++){
          if(data.behaviors[i].genre==1){
          behaviors_name_1.push(data.behaviors[i].name);
          behaviors_score_1.push(data.behaviors[i].score);
          }
          else{
          behaviors_name_2.push(data.behaviors[i].name);
          behaviors_score_2.push(data.behaviors[i].score);
          }
        }
 
        drawdata();
        $(".behavior a:eq(0)").on('click',show1);//绑定function
        $(".behavior a:eq(1)").on('click',show2);//绑定function
        $("#genre2").hide();//绑定后让第二张图消失
      }
    });//end ajax
  }//end draw behavior


function drawdata(){
radarChartData_genre1 = {
    labels: behaviors_name_1,
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(69,143,210,0.2)",
        strokeColor: "rgba(69,143,210,1)",
        pointColor: "rgba(69,143,210,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(69,143,210,1)",
        data: behaviors_score_1
      }
    
    ]
  };

  radarChartData_genre2 = {
    labels: behaviors_name_2,
    datasets: [
      {
        label: "My second dataset",
        fillColor: "rgba(225,149,161,0.2)",
        strokeColor: "rgba(225,149,161,1)",
        pointColor: "rgba(225,149,161,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(225,149,161,1)",
        data: behaviors_score_2
      }
    
    ]
  };
    putdata();
    putdata1();
}


  //window.onload = function() {
    function putdata(){
        window.myRadar = new Chart(document.getElementById("chart-area1").getContext("2d")).Radar(radarChartData_genre1, {
      responsive: true
    });
    }

    function putdata1(){
       window.myRadar = new Chart(document.getElementById("chart-area2").getContext("2d")).Radar(radarChartData_genre2, {
      responsive: true
    });
    }

  function show1(){
    if ($(this).attr("class")!="cur") {
      $("#drawtab a:eq(1)").removeClass("cur");
      $(this).addClass("cur");
      $("#genre2").slideUp();
      $("#genre1").slideDown();
    }
  }//第一个类别绑定的function

  function show2(){
    if ($(this).attr("class")!="cur") {
      $("#drawtab a:eq(0)").removeClass("cur");
      $(this).addClass("cur");
      $("#genre1").slideUp();
      $("#genre2").slideDown();
    }
  }//第二个类别绑定的function

   
}); //end ready
