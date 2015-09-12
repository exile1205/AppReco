<?php include("header.php"); ?>
<script src="js/login.js"></script>
<div id="normal-conten">
<div id="normal-conten-fix">
	<h1>Login</h1>
	<div class="content-left">
    <div class="account-pic2">
                <img src="image/login.png" alt="">
                </div>
    </div>
    <div class="content-right">
    <div class="register">
	<form id="loginform" name="loginform" method="post" action="" target="_top">
    <div class="account-inp">
        <label>Email Address</label>
        <input id="email" name="email" type="text" tabindex="1">
    </div>
    
    <div class="account-inp">
        <label>Password</label>
        <input id="password" name="password" type="password" tabindex="2">
    </div>

    <div class="account-submit">
    <label>&nbsp;</label>
    <input type="submit" value="登錄" class="btn-submit" tabindex="3">    >><a href="register.php?">沒有賬號，立即註冊</a>
    </div>
    </form>
</div>
</div>
    <div class="clear"></div> 
</div>
</div>

<?php include("footer.php"); ?>
