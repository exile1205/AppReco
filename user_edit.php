<?php include("header.php"); ?>
<script src="js/edit.js"></script>

<div id="normal-conten">
<div id="normal-conten-fix">
	<h1>Edit user's data</h1>
	<div class="content-left">
        <div class="user_edit">
            <div class="account-inp">
                <label>Img</label>
                <img src="" alt="">
            </div>

            <form id="editform" name="editform" method="post" action="" target="_top">
            <div class="account-inp">
                <label for="username">Nickname</label>
                <input id="username" name="username" type="text" tabindex="1" value="">
            </div>

             <div class="account-inp">
                <label for="password">New password</label>
                <input name="password" type="password" id="password" tabindex="2">
             </div>
    
            <div class="account-inp">
                <p>
                 Intro character limit is：<span id="txtCount">255</span> characters</p>
                <label for="userintr">Intro</label>
                <textarea id="userintr" name="userintr" rows="1" tabindex="2" value="" onkeyup="changeText(this);"></textarea>
            </div>

            <div class="account-submit">
                <label>&nbsp;</label>
                <input type="submit" value="提交" class="btn-submit" tabindex="3">    >><a href="user.php" >取消編輯</a>
            </div>
            </form>

        </div>
    </div>
    <div class="content-right">
    </div>
    <div class="clear"></div> 
</div>
</div>

<?php include("footer.php"); ?>

<script type="text/javascript">
function changeText(objElement) {
    var oTextCount = $('.account-inp #txtCount');   
    iCount = objElement.value.length;
    iCount = 255 - iCount
    oTextCount.html(iCount);
  }//算字數
</script>