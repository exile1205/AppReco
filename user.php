<?php include("header.php"); ?>

<script src="js/user.js"></script>

<div id="normal-conten">
<div id="normal-conten-fix">
	<div class="content-left">
    	<div class="user-single">
            <div id="user-item">
                    <div class="pic">
                    <img src="" alt="">
                    </div>
                    <div class="info">
                        <h3></h3>
                        <p></p>
                        <div class="info-suck">
                            <a href="#" id="sucks"></a> Favorite | 
                            <a href="#" id="suckscomment"></a> 留言
                        </div>
                  </div>
            </div>
        	<div class="behavior">
            <h3>喜歡過的所有App</h3>
            <div class="user-suck">
            <ul>
            <!--li class="pic">
                <a href="/"><img src="http://a3.mzstatic.com/us/r30/Purple1/v4/86/ee/6c/86ee6c0d-bfa8-b8ef-daad-47305086525c/icon175x175.png" alt="刺客信條：海盜"></a>
            </li-->
             
            </ul>
            </div>
            </div>
    	</div>
    </div>
    <div class="content-right">
		<h2></h2>
    	<div class="user-comment-list">
        </div>
        <div class="more_loader_spinner"><img src="image/loader.gif"></img></div>
        <div class="app-item-more">
                <a href="javascript:;" rel="顯示更多">顯示更多</a>
        </div>

    
    </div>
    <div class="clear"></div> 
</div>
</div>

<?php include("footer.php"); ?>

<script type="text/javascript">
function changeText(objElement) {
    var oTextCount = $('.add-comment #txtCount');   
    iCount = objElement.value.length;
    iCount = 255 - iCount
    if(iCount<0)
    {
        alert("ㄟ 字太太多了拉~");
        location.reload();
    }
    else{
        oTextCount.html(iCount);
    }    
  }//算字數
</script>