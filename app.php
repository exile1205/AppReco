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
                            <h4>Description：</h4><p></p>
                            </li>
                            <li>
                                <h4>Genre：</h4><a href=""></a>
                            </li>
                            <li>
                                <h4>User rating：</h4><p></p>
                            </li>
                             <li>
                                <h4>Advertising risk：</h4><p></p>
                            </li>
                             <li>
                                <h4>Privacy data risk：</h4><p></p>
                            </li>
                            <li>
                                <h4>Networking risk：</h4><p></p>
                            </li>
                             <li>
                                <h4>Risk rating：</h4><p></p>
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
                <a href="#" class="unhave" title="增加留言">Comment</a>
                <span id="add-suck">+1</span><span id="del-suck">-1</span>
                </div>
                </div>
                <div class="clear"></div>
            </div>
        	<div class="behavior">
            <h3>Behavior</h3>

            <div id="drawtab">
                <span><a href="javascript:;" class="cur">Access user's privacy data</a> / </span> 
                <span><a href="javascript:;">Access network</a></span>
            </div>

              <!-------->
            <div id="genre1">
                <div id="canvas-holder">
                    <canvas id="chart-area1" width="300" height="300" />
                </div>



                <p>  chart of accessing user's privacy data </p>
            </div>

            <div id="genre2">
                <div id="canvas-holder">
                    <canvas id="chart-area2" width="300" height="300" />
                </div>


                <p> Radar chart of accessing network</p>
            </div>
            <!------>
            </div>
    	</div>
    </div>
    <div class="content-right-cluster" id="clustApp">
		<h2></h2>
        <button type="button" id="get_comment">View comment</button>
    	<div class="item-cluster-list">
        </div>
        <div class="more_loader_spinner"><img src="image/loader.gif"></img></div>
    </div>
    <div class="content-right" id="commentApp">
		<h2></h2>
        <button type="button" id="get_cluster">Show same cluster apps</button>
        <div class="add-comment">
            <p> Comment character limit is：<span id="txtCount">255</span>characters</p>
      		<textarea id="comment" name="comment" rows="1" onkeyup="changeText(this);"></textarea>
      		<a href="#" id="submitcomment">Submit</a>

    	</div>
    	<div class="item-comment-list">
        </div>
        <div class="more_loader_spinner"><img src="image/loader.gif"></img></div>
        <div class="app-item-more">
            <a id="get_more"  href="javascript:;" rel="顯示更多" >More</a>
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
        alert("Sorry, too much characters");
        location.reload();
    }
    else{
        oTextCount.html(iCount);
    }    
  }//算字數
</script>
