
$(".mess_content").taphold(function(){
  var scr_height=window.screen.height;
  $(".mc_bg_lt").height(scr_height).removeClass("dn");
  $(".lt_xs").removeClass("dn");
  $(".ui-btn-text").addClass("dn");
  $("body").bind("touchmove",function(e){
    e.preventDefault();
  });

})
$(".lt_xs").click(function(){
  $("body").unbind("touchmove");
  $(".mc_bg_lt").addClass("dn");
  $(".lt_xs").addClass("dn");
})
