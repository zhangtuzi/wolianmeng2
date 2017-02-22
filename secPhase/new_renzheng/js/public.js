//蒙层
 function mengceng(){
				$('.mengceng').height($(window).height());
					$('.mengceng').show();					 
					$(".mengceng,html,body").height($(window).height()+100);
					$('.tips').show();
 
 }
 
 $(document).ready(function(){
 	$('span.save').click(function(){
 		mengceng();
 		$(".tips").not('.xieyi').hide();
 	})
 	
 })
 
function closed(){
					$('.mengceng').hide();					 
					$(".mengceng,html,body").height("auto");
					$('.tips').hide();
					$('.saveSuccess').hide()
}
function saveSuccess(){
	$('.tips').hide();
	$('.saveSuccess').show();
	setTimeout("window.location.href='../personal.html'",2000)
}
