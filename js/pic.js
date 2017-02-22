window.onload=function(){
	var oWidth=$("li").width();
	var oHeight=$("li").height();
	// console.log($("li").height())
	// $(".pic").width(oWidth);
	// $(".pic").height(oHeight);
	var oUlwidth=0;
	var a=0;
	$("li").each(function(a,b){
		oUlwidth+=$("li").eq(a).width();
		$(".number").append("<span></span>");	
	})
	$(".number>span").addClass("aa");
	$(".number>span").eq(0).addClass("ab");
	$("ul").width(oUlwidth);
	$(".bottom").width(oWidth);
	 console.log($("ul").width());
	function move(){
		a++;
		if(a<$("li").length){
			$("ul").animate({marginLeft:-oWidth*a+"px"},1000);
			$(".number>span").removeClass("ab");
			$(".number>span").eq(a).addClass("ab");
		}else{
			$(".number>span").removeClass("ab");
			$("ul").animate({marginLeft:0});
			a=0;
			$(".number>span").eq(0).addClass("ab");
		}
	}
	var time=setInterval(move,3000);
	$(".left").click(function(){
		if(a==0){
			a=a;
		}else{
			a--;
			$("ul").animate({marginLeft:-oWidth*a+"px"},1000);
			$(".number>span").removeClass("ab");
			$(".number>span").eq(a).addClass("ab");
		}
	})
	$(".left").mouseover(function(){
		clearInterval(time);
	})
	$(".left").mouseout(function(){
		 time=setInterval(move,3000);
	})
	$(".right").click(function(){
		if(a==$("li").length-1){
			a=a;
		}else{
			a++;
			$("ul").animate({marginLeft:-oWidth*a+"px"},1000);
			$(".number>span").removeClass("ab");
			$(".number>span").eq(a).addClass("ab");
		}
	})
	$(".right").mouseover(function(){
		clearInterval(time);
	})
	$(".right").mouseout(function(){
		 time=setInterval(move,3000);
	})
	$(".bottom .number span").click(function(){
		var i=$(this).index();
		a=i;
		clearInterval(time);
		$("ul").animate({marginLeft:-oWidth*a+"px"},1000);
		$(".number>span").removeClass("ab");
		$(".number>span").eq(a).addClass("ab");
		time=setInterval(move,3000);
	})

}