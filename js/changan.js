/**
 * Created by Administrator on 2016/5/16.
 */
var timeOutEvent=0;
$(function(){
    changAn("#erweima");
   changAn("#ma_lll");


});
function changAn(ele){
    $(ele).on({
        touchstart: function(e){
            timeOutEvent = setTimeout("longPress()",500);
           // e.preventDefault();
        },
         touchmove: function(e){
        // e.preventDefault();
         clearTimeout(timeOutEvent);
         timeOutEvent = 0;
         },
        touchend: function(e){
           // e.preventDefault();
            clearTimeout(timeOutEvent);
            if(timeOutEvent!=0){
                console.log("你这是点击，不是长按");
            }
            return false;
        }
    })
}

function longPress(){
    timeOutEvent = 0;
    //长按事件触发
    $(".mengceng_lll").fadeIn(100,function(){
        $(".contaner_tanceng_lll").addClass("animate_tops");

        $(".save_lll").bind("click",function(){
            $(".mengceng_lll").hide();
            $(".tengceng_save_lll").fadeIn(100,function(){
                setTimeout(function(){
                    $(".tengceng_save_lll").fadeOut();
                },2000);

            });
        });
        $(".copy_lll").bind("click",function(){
            $(".mengceng_lll").hide();
            $(".tengceng_copy_lll").fadeIn(100,function(){
                setTimeout(function(){
                    $(".tengceng_copy_lll").fadeOut();
                },2000);
            });
        });
        $(".close_lll").bind("click",function(){
            $(".mengceng_lll").hide();
        })
    });


}
