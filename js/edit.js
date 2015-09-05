 $(document).ready(function() {

    var user_status = document.cookie;
    var id = user_status.substr(-2,10);
    $(".account-submit a").attr('href','user.php?user_id='+id);
    
    $('#editform').validate({
            rules: {
               username: {
                    required: true,
                    rangelength:[2,16]
                },
                userintr: {
                    required: true,
                    rangelength:[10,255]
                },
                password: {
                    
                    rangelength:[8,16]
                }

            }, 
            messages: {
                username: {
                    required: "要輸入名字!",
                    rangelength: '大大最少2 最多6個字喔~'
                },
                 userintr: {
                    required: '要輸入簡介喔!' ,
                    rangelength: '大大 最少10個字 最多255個字喔~'
                },
                password: {
                    required: '要輸入密碼喔!',
                    rangelength: '至少8~12位數喔~'
                }
            },
            submitHandler:function(){
                var newpassword = $('#password').val();
                var name = $('#username').val();
                var userintr =$('#userintr').val();
                if(newpassword == ""){
                  var formData = {
                            "status" : "edit_user",
                            "name":name,
                            "self_intro":userintr,
                            };
                }
                else{
                  var formData = {
                            "status" : "edit_user",
                            "name":name,
                            "password":newpassword,
                            "self_intro":userintr,
                            };
                }
                
              $.ajax({
                      type:'POST',
                      //url:'http://54.149.140.147/back/user',
                      url:'back/user',//weixiao add
                      data: formData,
                      success:function(data){
                    
                        if(data.status="success"){

                          alert("已成功修改資料囉!");
                          window.location.href = 'user.php';

                        }
                        
                      } // end sucess

                  }); //end .ajax

            }
        }); // end validate

 }); //end ready

