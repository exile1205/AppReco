 $(document).ready(function() {

    $('#loginform').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    rangelength:[8,16]
                }
            }, 
            messages: {
                email: {
                    required: "要輸入email帳號!",
                    email: "這不是有效的email帳號喔~"
                },
                password: {
                    required: '要輸入密碼喔!',
                    rangelength: '至少8~12位數喔~'
                },
            },
            submitHandler:function(){
                var useremail = $('#email').val();
                var userpassword =$('#password').val();
                var formData = {
                            "status" : "login",
                            "email":useremail,
                            "password":userpassword,
                            };

            $.ajax({
                    type:'POST',                    
                    url:'back/user',//weixiao add
                    data: formData,
                    success:function(data){
                       //var datareturn = JSON.parse(data);
                       //alert(data);
                       var response_status = data.status;
                       var user_name = data.name;
                       var user_id = data.id;
                       if(response_status == "success")
                       {
                            document.cookie = "myname="+ user_name;
                            document.cookie =  "myid=" + user_id;
                            $('#loginform').html("<label class=\"error\">恭喜"+ user_name +"你登入成功囉~</label>");
                            setTimeout("location.href='user.php'",1000); 

                       }
                       else if (response_status == "error")
                       { 
                            alert("sorry 你打錯帳號或密碼囉!");
                            window.location.reload();

                       }

                    } // end sucess

                }); //end .ajax

            }
        }); // end validate


      

 }); //end ready

