$(document).ready(function() {      
    
  var user_status = document.cookie;
  var me_id_position = user_status.search("id=");
  me_id_position += 3;
  var me_id = user_status.substring(me_id_position);
   
   if(me_id == "")
   {
        $('#user').show();
        $('#user_have').hide();
          
   }

  else
  {
     if(isNaN(me_id))
     {

        $('#user').show();
        $('#user_have').hide();
     }

     else{

        $('#user').hide();
        $('#user_have').show();

        var user_get = 'back/user/' + me_id;//weixiao add
          $.ajax({
                  type:'GET',
                  url: user_get,
                  success:function(data){
                    
                     var user_img = data.img;
                     var user_name = data.name;
                     var intro = data.self_intro;
                     var sucks = data.suck_counts;
                     var suckscomment = data.comments_counts;

                     $('#user_have_name').html('<img src="">'+ user_name)
                     $('#user_have_name img').attr('src',user_img);
                     $('.user_edit .account-inp img').attr('src',user_img);
                     $('.user_edit .account-inp #username').attr('value',user_name);
                     $('.user_edit .account-inp #userintr').text(intro);
                     //$('#user_have_name').attr('href','user.php?user_id='+id);//weixiao add

                     
                  }

          }); //end .ajax

     }

  }
  
    

   
}); // end ready

