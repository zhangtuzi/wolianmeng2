	  
(function($){
	$.fn.imgSlide2=function(settings){
		settings=$.extend({
			banner_type:4,
			speed:500,
			timeout:3000,
		},settings);
		//获取相关元素。
		var $li=$('li',this);  //在调用对象内部的li元素
		var objSpan=$('.spanScroll',this);
		var objBtn=$('.scrollBtn',this);
		var objBtnR=$('.scrollBtnR',this);
		var objDisturb=$('.disTurbBtn',this);
		
		var baseW=$li.first().width();
		//var baseH=$li.first().height();
		var i=1;   //下一个要显示的序列号。
		var t=0; 
		$li.eq(0).css({zIndex:2,opacity:1,filter:'alpha(opacity=100)'});
	
	function banner(obj,prev){
		if(settings.banner_type==4){  
		$li.css({opacity:0,filter:'alpha(opacity=0)',zIndex:0});	
		$li.eq(prev).animate({left:-baseW},settings.speed).css({zIndex:1,opacity:0,filter:'alpha(opacity=0)'});
		$li.eq(obj.index()).css({left:baseW}).animate({left:0},settings.speed).css({zIndex:2,opacity:1,filter:'alpha(opacity=100)'});
			}else if(settings.banner_type==5){  
		$li.css({opacity:0,filter:'alpha(opacity=0)',zIndex:1});	
		$li.eq(prev).animate({left:baseW},settings.speed).css({zIndex:1,opacity:0,filter:'alpha(opacity=0)'});
		$li.eq(obj.index()).css({left:-baseW}).animate({left:0},settings.speed).css({zIndex:2,opacity:1,filter:'alpha(opacity=100)'});
			}
		}
	
	
	function handThum(){
		$(document).ready(function(){
			$('.maskGuide1').height($('body,html').height());	
			var browser=navigator.userAgent.toLowerCase();
			if(!/ucbrowser/.test(browser)&&$('.maskGuide1').is(':visible')){
				$(document).bind('touchmove',fn1=function(e){
				 e.preventDefault(); 
				 e.stopPropagation();
				 $(window).scrollTop(0);
			   });
			}
		})
		objBtn.each(function(){
			$(this).click(function(){
					if($(this).is(objBtnR)){
						 settings.banner_type=4;
						banner(objSpan.eq(i),i==0?objSpan.length-1:i-1);
						i++;
						
						if(i>$li.length){
						$(document).unbind('touchmove',fn1);
						$('.maskGuide1,#newGuide').hide();
							}
					}else{ 
						settings.banner_type=5;	
						if(i>1){
							banner(objSpan.eq(i-2),i-1); 
							i--;
							//alert(i)
						}else{
							$li.css({opacity:0,filter:'alpha(opacity=0)',zIndex:0});
							//alert(i)
							$li.eq(0).css({left:0,zIndex:2,opacity:1,filter:'alpha(opacity=100)'});
						}
					 }
				})
			})
		};
		objDisturb.click(function(){
			$('.maskGuide1,#newGuide').hide();
			$(document).unbind('touchmove',fn1);
		});
		
		handThum();
	
	return this;
	}
})(jQuery);

















