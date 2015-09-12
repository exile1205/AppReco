var favoritetime=0;
var skipnumber=4;
var second_getmore=6;
var limitnumber;
$(document).ready(function() { 

  
  var user_status = document.cookie;
  var me_id_position = user_status.search("id=");
  me_id_position += 3;
  var me_id = user_status.substring(me_id_position);

  var user_id = getUrlParam('user_id');//weixiao add
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
  } //weixiao add
 
    //預設沒有登入下跟沒有送userid下 不顯示
    if(user_id == null) //沒送使用者id
    {
      getme(me_id); //使用者登入情況之下存在me_id 看自己
    }
    else
    {
      if (user_id == me_id) {
        getme(me_id); //使用者登入情況之下 從其他地方送userid等於自己時
      }
      else{
        getotheruser(user_id); //要看其他使用者資訊
      }
    }

   function getotheruser(user_id){
    var user_get = 'back/user/' + user_id;//weixiao add
          $.ajax({
                  type:'GET',
                  url: user_get,
                  success:function(data){            
                     var user_img = data.img;
                     var user_name = data.name;
                     var intro = data.self_intro;
                     var favorites = data.favorite_counts;
                     var favoritescomment = data.comments_counts;

                     $('#user-item .info h3').text(user_name);
                     $('#user-item .pic img').attr('src',user_img);
                     $('#user-item .info p').html(intro);
                     $('#user-item .info-suck #sucks').text(favorites);
                     $('#user-item .info-suck #suckscomment').text(favoritescomment);

                     $('.content-right h2').text(user_name + ' \'s comment· · · · · ·');

      for(var i in data.favorite_list){    
        $('.user-suck ul').append("<li class= \"pic\" ><a href=\"app.php?app_id=" +data.favorite_list[i].app_id +" \"> <img src=\""+data.favorite_list[i].app_img +" \"></img></a></li>");
       }

       var i=0;
       var l=5;

      for(i;i<l;i++){
        user_comment_id = data.comment_list[i].id;   
      $('.user-comment-list').append("<div class=\"comment-item\"><div class=\"pic\"><a href=\" app.php?app_id="+data.comment_list[i].app_id +" \"><img src=\" " + data.comment_list[i].app_img + "\"></img></a></div><div class=\"comment-meta\"><a href=\" app.php?app_id="+data.comment_list[i].app_id +" \">"+ data.comment_list[i].app_name +"</a> 「" + data.comment_list[i].created_at+ "」</div> <div class=\"comment-content\"> " +data.comment_list[i].comment+ "</div></div>");
        }
                     
                  }

          }); //end .ajax

   } //end getotheruser

   

  $(".app-item-more a").click(function(){

      var user_get = 'back/user/' + user_id;//weixiao add
          $.ajax({
                  type:'GET',
                  url: user_get,
                  success:function(data){
        var total = data.comment_list.length;
        limitnumber=second_getmore+skipnumber;
        if(limitnumber < total){
          for(second_getmore;second_getmore<limitnumber;second_getmore++){
        user_comment_id = data.comment_list[second_getmore].id;   
      $('.user-comment-list').append("<div class=\"comment-item\"><div class=\"pic\"><a href=\" app.php?app_id="+data.comment_list[second_getmore].app_id +" \"><img src=\" " + data.comment_list[second_getmore].app_img + "\"></img></a></div><div class=\"comment-meta\"><a href=\" app.php?app_id="+data.comment_list[second_getmore].app_id +" \">"+ data.comment_list[second_getmore].app_name +"</a> 「" + data.comment_list[second_getmore].created_at+ "」</div> <div class=\"comment-content\"> " +data.comment_list[second_getmore].comment+ "</div></div>");
        }
        }
        else{
          $(".app-item-more").append("<p id=\"nomore\" style=\"text-align: center;\">沒有更多的吐槽了……</p>");
          $(".app-item-more a").css('display','none');
          //$(".app-item-more a").html("<p id=\"nomore\" style=\"text-align: center;\">沒有更多的吐槽了……</p>");
        }           
      
                  }
          });//end ajax

    });

   function getme(me_id){
   
      var user_get = 'back/user/' + me_id;
      $('.more_loader_spinner').css('display','block');
            $.ajax({
                    type:'GET',
                    url: user_get,
                    success:function(data){
                       var user_img = data.img;
                       var user_name = data.name;
                       var intro = data.self_intro;
                       var favorites = data.favorite_counts;
                       var suckscomment = data.comments_counts;

                       $('#user-item .info h3').text(user_name);
                       $('#user-item .pic img').attr('src',user_img);
                       $('#user-item .info p').html(intro);
                       $('#user-item .info-suck #sucks').text(favorites);
                       $('#user-item .info-suck #suckscomment').text(suckscomment);

                       $('.content-right h2').text(user_name + '的吐槽· · · · · ·');
                        if(favoritetime == 0){
                            getsuck(data);
                        }
                        favoritetime ++;
                        $('.more_loader_spinner').css('display','none');
                        usercomment(data);
                        deletecomment();
                        editcomment(); //取得編輯的textarea
                        subeditcomment();// 提交編輯的內容 
                        cancelecomment();
                        $('.app-item-more').html("");
                        var getmemore = $('.appitemmoreme').text();
                        if(getmemore == ""){
                          $('.content-right').append("<div class=\"appitemmoreme\"><a href=\"javascript:;\" rel=\"顯示更多\">顯示更多</a></div>");
                        }
                        $(".appitemmoreme a").click(function(){
                        
                            getmore(me_id);

                        }); 
                        
                }//end success
            }); //end .ajax      
   }


    function getmore(me_id){

     
               var user_get = 'back/user/' + me_id;
      //$('.more_loader_spinner').css('display','block');
            $.ajax({
                    type:'GET',
                    url: user_get,
                    success:function(data){
                               var total = data.comment_list.length;
        limitnumber=second_getmore+skipnumber;
       
for(second_getmore;second_getmore<limitnumber;second_getmore++){
  var user_comment_id = data.comment_list[second_getmore].id;
      $('.user-comment-list').append("<div class=\"comment-item\"><div class=\"pic\"><a href=\"app.php?app_id=" + 
        data.comment_list[second_getmore].app_id +"\"><img src=\" " + data.comment_list[second_getmore].app_img + 
        "\"></img></a></div><div class=\"comment-meta\"><a href=\"app.php?app_id="+data.comment_list[second_getmore].app_id + 
        "\">"+ data.comment_list[second_getmore].app_name +"</a> 「" + data.comment_list[second_getmore].created_at+ 
        "」</div> <div class=\"comment-content\" id=\"usercomment"+ user_comment_id +"\"> " + 
        data.comment_list[second_getmore].comment + "</div><div class=\"comment-edit\" id=\"comment-edit"+ user_comment_id + 
        "\">><a href=\"javascript:;\" class=\"editcomment\" id=\""+ user_comment_id +
        "\">編輯</a>  ><a href=\"javascript:;\" class=\"deletecomment\" id=\""+ user_comment_id +
        "\">删除</a></div><div class=\"add-comment-edit\" id=\"commentcontent"+ user_comment_id +
        "\"><p>目前剩下<span id=\"txtCount\">255</span>字</p><textarea id=\"textarea"+ user_comment_id +
        "\" name=\"comment\" rows=\"1\" onkeyup=\"changeText(this);\"></textarea><span>><a href=\"javascript:;\"class=\"submitedited\" id=\"editcomment"+
        user_comment_id +"\">發佈</a> ><a href=\"javascript:;\"class=\"canceled\" id=\"canceled"+ user_comment_id + "\">取消</a></span></div></div>");
        }

                        deletecomment();
                        editcomment(); //取得編輯的textarea
                        subeditcomment();// 提交編輯的內容 
                        cancelecomment();
               
}//end success
            }); //end .ajax  
                     

    }

      function editcomment(){
          $('.editcomment').click(function(){
            var status = $(this).text();
            var user_comment_id = $(this).attr('id');
            var user_comment_content_id = "commentcontent"+$(this).attr('id');
            var comment_origin = $('#usercomment'+user_comment_id).text();
            $('#usercomment'+user_comment_id).hide();
            $('#comment-edit'+user_comment_id).hide();
            $('#textarea'+user_comment_id).text(comment_origin);
            $('#'+user_comment_content_id).show();          

          });
      }
   
      
    function deletecomment(){
       $('.deletecomment').click(function(){
                            if(confirm("確定要刪除嗎?")){
                            var user_comment_id = $(this).attr('id');
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
                                          $('.user-comment-list').html("").fadeIn(1000);
                                          getme(me_id);
                                        }
                                      }
                                    });
                            }
                          else{
                            
                          }
          });
    }


  function usercomment(data){
     for(var i=0;i<5;i++){
      user_comment_id = data.comment_list[i].id;
      $('.user-comment-list').append("<div class=\"comment-item\"><div class=\"pic\"><a href=\"app.php?app_id=" + 
        data.comment_list[i].app_id +"\"><img src=\" " + data.comment_list[i].app_img + 
        "\"></img></a></div><div class=\"comment-meta\"><a href=\"app.php?app_id="+data.comment_list[i].app_id + 
        "\">"+ data.comment_list[i].app_name +"</a> 「" + data.comment_list[i].created_at+ 
        "」</div> <div class=\"comment-content\" id=\"usercomment"+ user_comment_id +"\"> " + 
        data.comment_list[i].comment + "</div><div class=\"comment-edit\" id=\"comment-edit"+ user_comment_id + 
        "\">><a href=\"javascript:;\" class=\"editcomment\" id=\""+ user_comment_id +
        "\">編輯</a>  ><a href=\"javascript:;\" class=\"deletecomment\" id=\""+ user_comment_id +
        "\">删除</a></div><div class=\"add-comment-edit\" id=\"commentcontent"+ user_comment_id +
        "\"><p>目前剩下<span id=\"txtCount\">255</span>字</p><textarea id=\"textarea"+ user_comment_id +
        "\" name=\"comment\" rows=\"1\" onkeyup=\"changeText(this);\"></textarea><span>><a href=\"javascript:;\"class=\"submitedited\" id=\"editcomment"+
        user_comment_id +"\">發佈</a> ><a href=\"javascript:;\"class=\"canceled\" id=\"canceled"+ user_comment_id + "\">取消</a></span></div></div>");
           }
   }

    function getsuck(data){
        for(var i in data.favorite_list){
         
         $('.user-suck ul').append("<li class= \"pic\" ><a href=\"app.php?app_id=" +
          data.suck_list[i].app_id +" \"> <img src=\""+data.suck_list[i].app_img +" \"></img></a></li>");
        }

   }
   
   function subeditcomment(){  
        $('.submitedited').click(function() {
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
                          // $('.user-comment-list').html("").fadeIn(1000);
                           // getme(me_id);
                           location.reload();
                          }
                        }
                      })//end ajax;

                 });
        }

        function cancelecomment(){  
        $('.canceled').click(function() {
              var user_comment_id = $(this).attr('id');
              user_comment_id = user_comment_id.substr(8);
              var user_comment_content_id = "commentcontent"+ user_comment_id;
              $('#usercomment'+user_comment_id).show();
              $('#comment-edit'+user_comment_id).show();
              $('#'+user_comment_content_id).hide();     
            });
        }

         
 
   
}); // end ready