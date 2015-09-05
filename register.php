<?php include("header.php"); ?>
<script src="js/register.js"></script>

<div id="normal-conten">
<div id="normal-conten-fix">
	<h1>註冊AppSuck</h1>
	<div class="content-left">
    <div class="account-pic">
                <img src="image/register.png" alt="">
                </div>
    </div>
    <div class="content-right">
    <div class="register">
<form id="registerform" name="registerform" method="post" action="" target="_top">
    <div class="account-inp">
        <label for="email">郵箱</label>
        <input name="email" type="text" id="useremail" tabindex="1">
    </div>
    
    <div class="account-inp">
        <label for="password">密碼</label>
        <input name="password" type="password" id="password" tabindex="2">
    </div>

    <div class="account-inp">
        <label for="name">名稱</label>
        <input id="username" name="name" type="text" tabindex="3">
    </div>

    <div class="account-submit">
    <label>&nbsp;</label>
    <input type="submit" name="submit" id="submit" value="註冊" class="btn-submit" tabindex="4">    >><a href="login.php?">已有帳號，直接登錄</a>
    </div>
</form>
</div>
</div>
    <div class="clear"></div> 
</div>
</div>

<?php include("footer.php"); ?>
