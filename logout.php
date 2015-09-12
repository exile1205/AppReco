<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script  src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js">
</script>
<script type="text/javascript">
    $(document).ready(function() {
        var formData = {"status" : "logout",};
//        var jsonText = JSON.stringify(formData);
        

       	$.ajax({
       			
                type:'POST',
                //url:'http://54.149.140.147/back/user',
                url:'back/user',//weixiao add
                data: formData,
                success:function(data){
                  if(data.message=="Logout success"){
                    alert("Logout success~");
                    window.location.href = "index.php";
                  }
  					     //alert(data.message);
                } // end sucess

        }); //end .ajax*/

        document.cookie = "myname=";
       	document.cookie = "myid=";  

        window.location.href = 'index.php';     
    });
</script>
</head>

<body>
</body>

</html>
