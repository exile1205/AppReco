<?php include("header.php"); ?>

<script src="js/app.js"></script> 
<script src="js/Chart.js"></script> 
<div id="normal-conten">
<div id="normal-conten-fix">
<h1></h1>
	<div class="content-left">
    	<div class="app-single">
            <div id="app-item">
                <div id="app-item-left">
                    <div class="pic">
                    <img src="" alt="">
                    </div>
                    <div class="info">
                    <div class="info-meta">
                        <ul>
                            <li>
                            <h4>簡介：</h4><p></p>
                            </li>
                            <li>
                                <h4>類型：</h4><a href=""></a>
                            </li>
                            <li>
                                <h4>評分：</h4><p></p>
                            </li>
                        </ul>   
                    </div>
                        <div class="info-suck">
                        </div>
                  </div>
                </div>
                <div id="app-item-right">
                <div class="suck">
                <a href="#" class="" title="">Favorite</a>
                <a href="#" class="unhave" title="增加留言">留言</a>
                <span id="add-suck">+1</span><span id="del-suck">-1</span>
                </div>
                </div>
                <div class="clear"></div>
            </div>
        	<div class="behavior">
            <h3>行為</h3>

            <div id="drawtab">
                <span><a href="javascript:;" class="cur">存取使用者隱私資訊</a> / </span> 
                <span><a href="javascript:;">網路連線存取</a></span>
            </div>

              <!-------->
            <div id="genre1">
                <div id="canvas-holder">
                    <canvas id="chart-area1" width="300" height="300" />
                </div>



                <p>「存取使用者隱私資訊」雷達圖</p>
            </div>

            <div id="genre2">
                <div id="canvas-holder">
                    <canvas id="chart-area2" width="300" height="300" />
                </div>


                <p>「網路連線存取」雷達圖</p>
            </div>
            <!------>
            </div>
    	</div>
    </div>
    <div class="content-right" id="clustApp">
		<h2></h2>
        <button type="button" id="get_comment">顯示留言</button>
        <div class="add-comment">
            <p>目前剩下：<span id="txtCount">255</span> 字</p>
      		<textarea id="comment" name="comment" rows="1" onkeyup="changeText(this);"></textarea>
      		<a href="#" id="submitcomment">發佈</a>

    	</div>
    	<div class="item-comment-list">
        </div>
        <div class="more_loader_spinner"><img src="image/loader.gif"></img></div>
        <div class="app-item-more">
            <a id="get_more"  href="javascript:;" rel="顯示更多" >顯示更多</a>
        </div>
    </div>
    <div class="content-right-comment" id="commentApp">
		<h2></h2>
        <button type="button" id="get_cluster">顯示同一群的App</button>
        <div class="add-comment">
            <p>目前剩下：<span id="txtCount">255</span> 字</p>
      		<textarea id="comment" name="comment" rows="1" onkeyup="changeText(this);"></textarea>
      		<a href="#" id="submitcomment">發佈</a>

    	</div>
    	<div class="item-comment-list">
        </div>
        <div class="more_loader_spinner"><img src="image/loader.gif"></img></div>
        <div class="app-item-more">
            <a id="get_more"  href="javascript:;" rel="顯示更多" >顯示更多</a>
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
