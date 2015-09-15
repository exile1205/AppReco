 $(document).ready(function() {      
    $('#registerform').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    rangelength:[8,16]
                },
                name: {
                    required: true,
                    rangelength:[3,15]
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
                name: {
                    required: '吐槽的時候總需要知道名字吧XD',
                    rangelength: '至少3~15個字喔~'
                }
            },
            submitHandler:function(){
                var useremail = $('#useremail').val();
                var userpassword =$('#password').val();
                var username = $('#username').val();

                var formData = {
				            "status" : "register",
				            "email":useremail,
                            "password":userpassword,
                            "name": username
                            };

                var jsonText = JSON.stringify(formData)
                
                $.ajax({

                    type:'POST',
                    //url:'http://54.149.140.147/back/user',
                    url:'http://140.119.19.94:888/user',//weixiao add
                    data: formData,
                    success:function(data){
                       var response_status = data.status;
                       if(response_status == "success")
                       {
                            //alert("恭喜你註冊成功囉~");
                            $('#registerform').html("<label class=\"error\">恭喜你註冊成功囉~</label>");
                            setTimeout("location.href='login.php'",1000); 
                       }
                       else if (response_status == "error")
                        { 
                             $('.account-inp').fadeIn(1000).append("<p>sorry這個email有人用過囉囉~</p>");
                            window.location.reload();

                        }


                    }

                });
            }
        }); // end validate
}); // end ready
