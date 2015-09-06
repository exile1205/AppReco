<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>AppReco</title>
<link rel="shortcut icon" href="image/favicon.ico">
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link href="css/chart.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/jquery.validate.min.js"></script> <!--add by chaoyuan-->
<meta name="description" content="AppSuck、Application、Suck、IOS、Android">
<meta name="keywords" content="AppSuck,Application,Suck,IOS,Android">
<script src="js/status.js"></script> <!--add by chaoyuan-->
<script src="js/login.js"></script> <!--add by chaoyuan-->


</head>
<body>
<div id="top">
<div class="top-content">
<a href="index.php" id="logo"><img src="image/logo.png" alt="回到首頁" title="回到首頁"></a>
<form id="searchform" method="get" action="search_result.php" role="search" enctype="multipart/form-data">
	<div class="inp">
	<input type="text" name="search" value="搜索：您曾經用過的APP..." id="search" onfocus=	"if(this.value==this.defaultValue)this.value='';" onblur="if(this.value=='')this.value=this.defaultValue;">
        <div class="inp-btn"><input type="submit" value="搜索"></div>
    </div>
</form>
<div id="user">
<ul>
<li><a href="login.php">登錄</a></li>
<li><a href="register.php">註冊</a></li>
</ul>
</div>
<div id="user_have">
<ul>
	<li><a href="logout.php" id="user_edit">退出</a></li>
	<li><a href="user_edit.php" id="user_edit">設置</a></li>
	<li><a href="user.php" id="user_have_name"></a></li>

</ul>
</div>
</div>
</div>


