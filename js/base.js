/* javascript Document
/* 样式说明： 沃联盟
 * 开发时间： 2014-6-27
 * 开发者： 田绍敏、陈洁    
 * 维护者： 田绍敏、陈洁
 *
* 样式版本： v1.0
 * 版本时间： 2014-06-27
 * 注意事项： 所有功能js写在这里
 */

;jQuery(function( $ ){

	
	var $ = jQuery;
//alert(1);
/*	$.fn.popup1=function(settings){
		settings=$.extend({
			mask:'maskPop',  //遮罩层的样式类
			popMain:'popMain', //弹出层的样式类
			closePop:'closePop' ,//关闭按钮的样式类
		},settings);
		//alert('123');
		$('body,html').css({height:'100%',overflow:'hidden'});
		this.siblings(settings.maskObj).add(this).show();
		this.addClass(settings.popMiain);
		this.siblings(settings.maskObj).addClass(settings.mask);
		this.css({marginTop:-settings.marginTop+'px'});
		this.find(settings.closeObj).addClass(settings.closePop);
		this.find(settings.closeObj).click(function(){
		//$('body,html').height('auto');
			$(this).parent().css({display:'none'});
			$(this).parent().siblings(settings.maskObj).css({display:'none'});
			$('body,html').css({height:'auto',overflow:'auto'});
			return false;
		})
		this.find('.sec_btn').click(function(){
			//alert(1);
			$('body,html').css({height:'auto',overflow:'auto'});
		})
		return this;
	}	*/

	$.fn.popup1=function(settings){
		settings=$.extend({
			mask:'maskPop',  //遮罩层的样式类
			popMain:'popMain', //弹出层的样式类
			closePop:'closePop' ,//关闭按钮的样式类
		},settings);
		if($('body').height()>$(window).height()){
			this.siblings(settings.maskObj).height($('body').height());	
		}else{
			this.siblings(settings.maskObj).height('100%');
		}
		//$('body,html').css({height:'100%',overflow:'hidden'});
		$(document)[0].ontouchmove=function(e){
		//$(document).bind('touchmove.fn',function(e){
			 e.preventDefault(); 
			 e.stopPropagation();
			 $(window).scrollTop(0);
		//});
		}
		this.siblings(settings.maskObj).add(this).show();
		this.addClass(settings.popMain);
		this.siblings(settings.maskObj).addClass(settings.mask);
		this.css({marginTop:-settings.marginTop+'px'});
		this.find(settings.closeObj).addClass(settings.closePop);
		this.find(settings.closeObj).click(function(){
			$(this).parent().css({display:'none'});
			$(this).parent().siblings(settings.maskObj).css({display:'none'});
			//$('body,html').css({height:'auto',overflow:'auto'});
			toNormal();
			return false;
		})
		this.find('.sec_btn').click(function(){
			toNormal();
		}) 
		function toNormal(){
			$(document)[0].ontouchmove=null;  //用js的绑定方法和解绑方法比用bind/unbind靠谱。
			//$(document).unbind('touchmove.fn');
			 $(window).scrollTop(0);
			//alert($(document)[0].ontouchmove);  //还可以输出是否成功解除了绑定。
			//alert($(document).unbind('touchmove.fn'));
		}
		return this;
	}	

	$('.btn_next_bkCard').click(function(){
		var temp = $('.confirmMain').height()/2;

		$('.confirmMain').popup1({height:335,marginTop:temp,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});
	//use this quick url
	url = function(url){
		
		window.location.href = url;
		
	};
	
	//回退按钮
	if(window.history.length<2){
		$('.headtitle .return').css({backgroundImage:'url(../images/return_dis.png)'})
	}
	
	var backBtn=$('.return');
	
	var goBack=function(){
		//alert(window.history.length)
		window.history.back();
		
	};
	
	backBtn.bind('click',goBack);
	
	
	//输入框删除按钮操作
	!$('.input_box').length || (function(){
		
		$('.input_box').find('input').keyup(delFn = function(){
			
			if(!$(this).val() == ''){
				
				$(this).addClass('focused').parents('.input_box').next('.input_del').show();
				
			}else{
				
				$(this).removeClass('focused').parents('.input_box').next('.input_del').hide();
				
			};
			
		}).focus(function(){
			
			$(this).addClass('focused').parents('.sec_input').addClass('focused');
			
		}).blur(function(){
			
			$(this).parents('.sec_input').removeClass('focused');
			
		});
		
		$('.sec_input').find('.input_del').click(function(){
			
			$(this).prev('.input_box').find('input').val('').focus();
			
			$(this).hide();
			
		});
		
		$('.sec_verify').find('.input_box input').focus(function(){
			
			$(this).parents('.input_box').addClass('focused');
			
		}).blur(function(){
			
			$(this).parents('.input_box').removeClass('focused');
			
		});
		
		$('.sec_textarea textarea').focus(function(){
			
			$(this).parent('.sec_textarea').addClass('focused');
			
		}).blur(function(){
			
			$(this).parent('.sec_textarea').removeClass('focused');
			
		});
		
	})();
	
	
	//快速入口切换
	$('.icon_listDown').click(function(){
		
		//$('.slideDiv').slideToggle();
		//$('#header').toggleClass('addH_header');
		if($('.slideDiv').css('display')=='none'){
			$('.slideDiv').slideDown(400);
			$('#header').animate({height:'110'},400);
		}else{
			$('.slideDiv').slideUp(400);
			$('#header').animate({height:'48'},400);
		}
		//$('.downlist2').slideToggle();
	});
	//点击下拉列表停止事件冒泡
	$('.downlist2 li').bind("click",function(event){
		event.stopPropagation();
	});
	
	
	
	//按钮hover效果
	   function setBtnColor(className,addClass){
			$(className).bind('mousedown touchstart',function(){
				 $(this).addClass(addClass);
			}).bind('mouseup touchend',function(){
				 $(this).removeClass(addClass);
			}).bind('mouseover touchmove',function(){
				 $(this).removeClass(addClass);
			})
		}
		setBtnColor('.btn','active');
		setBtnColor('.yanzhen_btn','active');
	
	
	//结果页面提示语过长时自动折行居左
	!$('.result_tips').length || (function(){
		
		var resultTipsFn = function(){
			
			if( $('.result_tips').height() > 30 ){
				
				$('.result_tips').addClass('tl').removeClass('tc');
				
			}else{
				
				$('.result_tips').addClass('tc').removeClass('tl');
				
			};
			
		};
		



		$(window).resize(function(){
			
			resultTipsFn();
			
		});
		
		resultTipsFn();
		
	})();
		
	//复选框模拟
	$('.checkboxOut').live('click',function(){
		$(this).children('.checkbox').toggleClass('checked');
	});
	
	//链接点击变色
	$('a.blue').click(function(){
		$(this).addClass('active');
	});
	
	//footer定位
	function footerFixed(){
		if($('#wrapper').height() < $(window).height()){
			$('.footer').addClass('fixed');
		}else{
			$('.footer').removeClass('fixed');
		};
	}
	
	$(window).resize(function(){
		footerFixed();
	});
	
	footerFixed();
	
	
	//获取短信验证码点击倒数
	!$('#getCode').length > 0 ||(function(){
		var t;
		$('#getCode').click(function(){
			$(this).html('重新发送'+'(<span id="minute"></span><span id="second"></span>)').css({'font-size':'12px'}).attr('disabled','disabled');
			$(this).unbind('mousedown touchstart');
			/*$('.codeSending').show();
			setTimeout(function(){
				$('.codeSending').hide();
			},1000);*/
			var second = $(this).find( '#second' );
			var minute=$(this).find( '#minute' );
			second.html('');
				j = 300;
			countDown();
			function countDown(){
				var seconds=Math.floor(j%60);
				var minutes=Math.floor(j/60);
				//console.log(j);
				if(j<=0){
					clearTimeout(t);
					$('#getCode').text('再次获取').css('font-size','16px').attr('disabled',false);
					setBtnColor('.yanzhen_btn','active');
				}else{
				minute.html(minutes+'分');
				second.html(seconds+'秒');
				j--;
				t=setTimeout(countDown,1000);
				}
			}
		});

	})();


	// 成功页面5s定时器
	!$( '#jump' ).length > 0 || (function(){
		var second = $( '#jump' ).find( '.time' ),
			i = 10;
		var st = setInterval( function(){
			i--;	
			second.html( i );
			if( i == 0 ){
				clearInterval(st);
				//跳转的url从后面span的onclick属性中截取
				var jumpUrl = $('#jumpUrl').attr('onClick').slice(5,-2);
				window.location.href = jumpUrl;
			};
		},1000);
	})();
	
	/*我的沃联盟*/
	$('.my_list').bind('touchstart mousedown touched mouseup',function(){
		 if($(this).hasClass('last')){
			 $(this).parent('.my_menu').addClass('on');
		}
		 $('.my_list').removeClass('active');
		 $(this).addClass('active').prev().addClass('out').children().addClass('active');
		 $(this).children().addClass('active');
	}).bind('touchmove mouseover',function(){
		$('.my_menu').removeClass('on');
		$('.my_list').removeClass('active out');
		$('.cont').removeClass('active');
	});
	
	
	//提现弹出层
	$('.cashSure_btn').click(function(){
		$('.confirmMain').popup1({height:305,marginTop:152,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});
	
	$('.goCash_btn').click(function(){
		$('.confirmMain').popup1({height:305,marginTop:152,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});
	
	//预期收益列表
	$('.mon_list2').click(function(){
		$(this).toggleClass('curr');
		$(this).next('.mon_detail').slideToggle();
	});
	
	//选择银行卡
	$('.bank_table tr').click(function(){
		$('.bank_table').find('.choosed').hide();
		$(this).find('.choosed').show();
	});
	$('.bankadmin li').click(function(){
		//$('.bank_table').find('.choosed').hide();
		$(this).find('.choosed').show()
		$(this).siblings('li').find('.choosed').hide();

	});
	
	//邀请好友赚钱弹出层
	$('.inviteBtn').click(function(){
		$('.confirmMain').popup1({height:305,marginTop:152,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});
	
	$('.inviteBtn2').click(function(){
		$(this).parents('.confirmMain').hide();
		$('#maskConfirm').hide();
	});
	
	//我的海报页签切换	
	$('.posterList li').click(function(){
		$(this).addClass('curr').siblings().removeClass('curr');
	});
	
	$('.posterList').find('.large').click(function(){
		$('.seeBigImg').css('width','140');
		$('.posterMain1').show().siblings('.posterMain').hide();
		
	});
	
	$('.posterList').find('.middle').click(function(){
		$('.seeBigImg').css('width','120');
		$('.posterMain2').show().siblings('.posterMain').hide();
	});
	
	$('.posterList').find('.small').click(function(){
		$('.seeBigImg').css('width','120');
		$('.posterMain3').show().siblings('.posterMain').hide();
	});
	
	//我的海报看大图
	$('.seeBigImg').click(function(){
		$('.popBigImg').show();
	});
	$('.seePosterBtn').click(function(){
		$('.popBigImg').show();
		$(this).parents('.confirmMain').hide().prev('#maskConfirm').hide();
	});
		
	$('.popBigImg').click(function(){
		$(this).hide();
	});
	
	//海报确认弹出层
	$('.postermain').find('.seeBigImgbtn').click(function(){
		$('#makeSurePop').popup1({height:305,marginTop:152,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});
	$('.giveUp_btn').click(function(){
		$(this).parents('.confirmMain').hide().prev('#maskConfirm').hide();
	});
	
	//海报--提交申请弹出层
	$('.apply_poster').find('.applyBtn').click(function(){
		$('#applaySucced').popup1({height:255,marginTop:130,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});
	$('#applaySucced').find('.sec_btn').click(function(){
		$(this).parents('.confirmMain').hide();
		$('#maskConfirm').hide();
	});
	
	$('.posterTab li').click(function(){
		var pindex = $(this).index();
		$('.PosterCont').eq(pindex).show().siblings('.PosterCont').hide();
	});
	
	//我的店铺
	$('.shop_tab li').click(function(){
		$(this).addClass('curr').siblings().removeClass('curr');
	});
	
	//select设置
	$('.exp_select select').change(function(){
		var valueSelected = $(this).find('option:selected').val();
		$(this).parents('.selectDiv').prev('.text').text(valueSelected);
	});
	$('.selectOuter').find('select').change(function(){
		var value = $(this).find('option:selected').val();
		//alert(value);
		$(this).parents('.select').siblings('.text').text(value);
	});
	
	//回到顶部
	$('#backToTop').click(function(){
		$('body,html').animate({scrollTop:0},100);
	});
	$(window).scroll(function(){
		if($(window).scrollTop()>50){
			$('#backToTop').show();	
		}else{
			$('#backToTop').hide();	
		}
	});
	//加载中
	$(window).load(function(){
		$('#loading').show();
		setInterval(hide,1000);
	});
	
	var hide = function(){
		$('#loading').hide()
	};
	
$('.nobindbtn').click(function(){
		$('.confirmMain_fail1').popup1({height:305,marginTop:202,maskObj:'#maskConfirm',closeObj:'.close_confirm'});
		console.log('33');
	});

$('.nowodian').click(function(){
		$('.confirmMain_fail2').popup1({height:305,marginTop:202,maskObj:'#maskConfirm',closeObj:'.close_confirm'});
		console.log('44');
	});

	//首页底部点击效果
	$('.recommend li').bind('touchstart mouseover',function(){
		$(this).addClass('color-orange').siblings().removeClass('color-orange');
	}).bind('touchend mouseout',function(){
		$('.recommend li').removeClass('color-orange');
	})
	
	//体验计划提交失败
	$('.exp_succeed_btn').click(function(){
		var $exp_succeed2=$('.exp_succeed2');
		var tipText=$exp_succeed2.find('.tipText');
		tipText.text('提交失败');  // 错误提示语不是‘提交失败’时，直接替换‘提交失败’即可。
		$exp_succeed2.show();
		expHide($exp_succeed2,tipText);
	});

	//体验计划提交成功
	$('.exp_succeed_btn').click(function(){
		var $exp_succeed1=$('.exp_succeed1');
		var tipText=$exp_succeed1.find('.tipText');
		tipText.text('意见反馈成功');
		$exp_succeed1.show();
		expHide($exp_succeed1,tipText);
	});
	
	var expHide=function(obj1,obj2){
		if(obj2.height()>20){
			setTimeout(function(){obj1.hide()},5000);
		}else{
			setTimeout(function(){obj1.hide()},3000);
		}
	}
	//退出登录
	$('.logOff').click(function(){
		$('.logout').show();
	});
	
	$('.logout').find('.btn').click(function(){
		$('.logout').hide();
	});
	
	//首页点击登录
	$('.loginText').click(function(){
		$(this).addClass('active');
	});
	//我的财富
	$('.weaMenu li').click(function(){
		$(this).addClass('curr');
	});
	
	/*动态数字-我的财富*/
    (function () {
        var $animateNum = $(".animateNum");
        checkAnimateNum();
        $(window).bind("scroll", function () {
            checkAnimateNum();
			//alert(11);
        });
        function checkAnimateNum() {
            var winRange = {top: $(window).scrollTop(), bottom: $(window).scrollTop() + $(window).height()};
            $animateNum.each(function () {
                var targetNum = $(this).attr("data-animateTarget");
                if (winRange.top <= ($(this).offset().top + $(this).height()) && winRange.bottom >= $(this).offset().top && !$(this).data("start")) {
                    $(this).data("start", true);
                    new AnimateNum({
                        obj: $(this),
                        target: targetNum,
                        totalTime: 1000
                    })
                }
            })
        }
    })();
	
	//体验计划可输入字数
	var str = '';  
    var now = ''  
    filter_time = function(){  
        var time = setInterval(filter_staff_from_exist, 100); 
        $('#numLeftTextarea').bind('blur',function(){  
            clearInterval(time);  
        });  
		
    };  
  
    filter_staff_from_exist = function(){  
        now = $.trim($('#numLeftTextarea').val()); 
        str = now; 
		var totalNum = $('#numLeftTextarea').attr('maxlength');
		var writingNum = str.length;
		var leftNum = totalNum - writingNum;
		$('#numLeft').text(leftNum);
		//alert(str);
    }
	$('#numLeftTextarea').bind('focus',filter_time);
	/*$('#numLeftTextarea').focus(function(){
		$('.numLeftTips').css('visibility','visible');
	}).blur(function(){
		$('.numLeftTips').css('visibility','hidden');
	}); */
	
	/*--cj--*/

	//$('.guidePage1').popup1({height:320,marginTop:152,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	//$('.maskGuide1').height($('body,html').height());

	//首页引导页
	/*$(window).scroll(function(){
		$('.maskGuide').height($(window).height()+$('body,html').scrollTop());	
	})
	$(window).resize(function(){
		$(window).scroll();
	})*/
	/*$(window).scroll(function(){
		$('.maskGuide').height($(window).height()+$('body,html').scrollTop());	
	})*/
	$('.maskGuide').height($('body,html').height());
	//$('.guidePage,.maskGuide').hide();	
	$('.cardInfo').click(function(){
		$('.guidePage,.maskGuide').show();
	})
	$('.closeGuide,.btn_guideDetail').click(function(){
		$('.guidePage,.maskGuide').hide();	
		$('.guideBox').addClass('icon_guide');
		
		//引导层飞入效果
		var thisTop=$(window).height()/2;   
		var thisLeft=$(window).width()/2; 
		var thisSrc='../images/guidePage_s.jpg'; //飞入图片的路径
		animatenTop(thisTop,thisLeft);      //调用飞入方法
		function animatenTop(thisTop,thisLeft){
			var target='<img src="' + thisSrc + '" id="guide_s" style="width:52px; height:52px; position:absolute; z-index:11112; top:' + thisTop + 'px;left:' + thisLeft + 'px" />';
			var topLength=$('.guideBox').offset().top-10;
			var leftLength=$('.guideBox').offset().left-15;
			$("body").append(target);
			$("body").find("#guide_s").animate({width:"52px",height:"52px","top":topLength,"left": leftLength,"opacity": .5 }, 600,function(){
			$("body").find('#guide_s').remove();
		    });	
		}
		return false;
	})

	$('.guideBox').click(function(){
		$('.guidePage,.maskGuide').show();	
	})
	
	//首页提示弹出层
	$('.a2dClose').click(function(){
		$('.a2d').hide();
	})
	
	//头部地区选择
		$('.districPop li').click(function(){
			$('.districPop li').find('span').removeClass('active_dis');
			var $thisSpan=$(this).find('span');
			$thisSpan.addClass('active_dis');
			$('.districtList').text($thisSpan.text());
			if($thisSpan.text().length>2){
				$('.districtList').css({fontSize:'10px'});
			}else{
				$('.districtList').css({fontSize:'12px'});
			}
			$('.districPop').slideUp(function(){
				$('.maskDis').hide();
			});
		//	$('body,html').css({height:'auto',overflow:'auto'});
			toNormal1();
		})
	
	$('.districtList').click(function(){
			$(document).bind('touchmove',fn=function(e){
				 e.preventDefault(); 
				 e.stopPropagation();
				 $(window).scrollTop(0);
			});

		$('.maskDis').show();
		$('.districPop').delay(100).slideDown();
		//	$('body,html').css({height:'100%',overflow:'hidden'});
		
	})
	$('.closeDisWrp').click(function(){
		toNormal1();
			$('.districPop').slideUp(function(){
				$('.maskDis').hide();
			});
		
	});
		function toNormal1(){
			$(document).unbind('touchmove',fn);
			 $(window).scrollTop(0);
		}
	
		
			
	//填写银行卡信息下拉列表
	$('.procityH').click(function(){
		$(this).children('.bank_to').toggleClass('bank_to_transD');	
		$(this).parents('.listMain').next('.procityList').slideToggle();
	})
	
	
		//选择地市
		$('.cityWrp div').click(function(){
			$(this).find('span').addClass('active_procity').end().siblings().find('span').removeClass('active_procity');
			$('.cityBox').text($(this).find('span').text()).addClass('procityFocus');
			$('.cityH .bank_to').removeClass('bank_to_transD');
			$('.cityList').slideUp();
			
		})
		$('.proWrp div').click(function(){
			$('.proWrp div').find('span').removeClass('active_procity');
			$(this).find('span').addClass('active_procity');
			$('.proBox').text($(this).find('span').text()).addClass('procityFocus');
			$('.provinceList').slideUp();
			$('.provinceH .bank_to').removeClass('bank_to_transD');
		})
		/*$('.cityWrp span').each(function(){
			if($(this).text().length>7){
				$(this).css({fontSize:'9px'});
			}
		})*/
     
	 //	银行卡输入格式
	$('.bankCardText').keyup(function(e){
		//if(e.keyCode!=8&&e.keyCode!=46){
		/*this.value=this.value.replace(/\s+/,'');
		//this.value=this.value.replace(/([\d]{4})(?=\d)/g,'$1 '); 
		var attr=this.value.match(/\s+/g);
		console.log(attr);
		if(attr!=null&&attr.length<4){
		this.value=this.value.replace(/([\d]{4})(?=\d)/g,'$1 '); 
		}*/

		//}
		FillMobile1(this);
	})
	
	function FillMobile1(_this) {
		var mobile = _this;//页面上输入手机号码的文本框的Id.
		var mValue =mobile.value.replace(/\s/g,'');
		var mLength = mValue.length;
		if (mValue != "") {
			if (mLength <= 4) {
				mobile.value=mValue;
			} else if(mLength <=8) {
				mobile.value=mValue.substring(0,4)+' '+mValue.substring(4,mLength);
			}else if(mLength <=12) {
				mobile.value=mValue.substring(0,4)+' '+mValue.substring(4,8)+' '+mValue.substring(8,mLength);
			}else if(mLength <=16) {
				mobile.value=mValue.substring(0,4)+' '+mValue.substring(4,8)+' '+mValue.substring(8,12)+' '+mValue.substring(12,mLength);
			}else{
				mobile.value=mValue.substring(0,4)+' '+mValue.substring(4,8)+' '+mValue.substring(8,12)+' '+mValue.substring(12,16)+' '+mValue.substring(16,19);
			}
		}
	}
	
	

	
	//结果页结果语句超过一行则字体变成15px
	!$('.results').length || (function(){
		
		var resultTipsFn2 = function(){
			
			if( $('.results').height() > 30 ){
				
				$('.results').css({'font-size':'15px','text-align':'left'});
				
			}else{
				
				$('.results').css({'font-size':'20px','text-align':'center'});
				
			};
			
		};
		
		$(window).resize(function(){
			
			resultTipsFn2();
			
		});
		
		resultTipsFn2();
		
	})();

	//填写银行卡信息确认信息弹出层
	$('.btn_next_bkCard').click(function(){
		var temp = $('.confirmMain').height()/2;

		$('.confirmMain').popup1({height:335,marginTop:temp,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});


   //我要赚钱选择条件下拉列表
   
   $('.selectFactor .iconWrp').click(function(){
	   var parent=$(this).parents('.selectList');
	   var iconSpan=$(this).find('.iconSpan');
	  if(parent.height()==25){
		 iconSpan.removeClass('iconMore').addClass('iconLess'); 
		 parent.animate({height:55},400);
		 } else{
		 iconSpan.addClass('iconMore').removeClass('iconLess'); 
		 parent.animate({height:25},400);
		}
	  })
   

      var iconSpan1=$('.selectList1').find('.iconSpan');
      var iconSpan2=$('.selectList2').find('.iconSpan');
  if($('.selectList1 div').length>5){
	 iconSpan1.addClass('iconMore');
	}else{
		 iconSpan1.removeClass('iconLess').removeClass('iconMore');
		 iconSpan1.parent('.iconWrp').unbind('click');
	}
  if($('.selectList2 div').length>4){
	 iconSpan2.addClass('iconMore');
	}else{
		 iconSpan2.removeClass('iconLess').removeClass('iconMore');
		 iconSpan2.parent('.iconWrp').unbind('click');
	}

   
   $('.selectFactor div').not('.iconWrp').click(function(){
	   $(this).find('span').addClass('active_factor').end().siblings().find('span').removeClass('active_factor');
	   $(this).parent().siblings().find('span').removeClass('active_factor');
	   $(this).find('strong').addClass('stronged').end().siblings().find('strong').removeClass('stronged');
	 })
   
    $('.selectFactor h3').click(function(){
	   $(this).find('span').addClass('active_factor').end().siblings().find('span').removeClass('active_factor');
	 })
  
	
	//获取沃点提示层
	$('.btn_getWopoint').bind('click',myFun1=function(){
		location.href='/toWechat.html';
		})
		
	
	$('.btn_temp').unbind('click',myFun1).click(function(){
		location.href='/wocard/woCard6.html';
	})
	
	//产品名称滚动
	$('.proName').each(function(){
		var proNamewrp=$(this).parent('.proNameWrp');
		if($(this).width()>proNamewrp.width()){
			var difLen=$(this).width();
			scrollWord($(this),difLen,proNamewrp);
			
		}
	})
	
	
		
	function scrollWord(obj,difLen,proNamewrp){
		var left=parseInt(obj.css('left'));	
		left--;
		if(left<=-difLen){
			left=proNamewrp.width();
		}
		obj.css({left:left});
		setTimeout(function(){scrollWord(obj,difLen,proNamewrp)},30);
		
	}
	
	//首页滚动通知 优化
	var noticeLeft=0;
	function noticeScroll(){
		var noticeLeft=parseInt($('.notice_cont').css('left'));	
		noticeLeft--;
		if(noticeLeft<=-851){
			noticeLeft=$('.notice_contWrp').width();
		}
		$('.notice_cont').css({left:noticeLeft});
		setTimeout(noticeScroll,30);
	}
	noticeScroll();
	
	//点击获取按钮效果
	setBtnColor('.btn_getWopoint','btn_getWopointed');
	setBtnColor('.btn_getWp_agin','btn_getWp_agined');
	
	

	//沃点悬浮按钮
	var topOld;
	$(window).scroll(function(){
		topOld=$(window).scrollTop();	
	})
	//$(window).load(function(){	
	//	if($('body').height()>$(window).height()){
			$('.maskWo,.maskDis').height($('body').height());	
	//	}else{
	//		$('.maskWo,.maskDis').height('100%');
	//	}
	//})
	//alert($('body').height()+":"+$('.maskWo').height())
	var flagA=true;
	var browser=navigator.userAgent.toLowerCase();
	//alert(!/ucbrowser/.test(browser))
		$('.icon_wo').click(function(){
			var $woCircle=$('.woCircleWrp');
			if(flagA){
				$(this).removeClass('icon_wo_bg2').addClass('icon_wo_bg1');
				$('.maskWo').show();
				$woCircle.css({marginLeft:'auto'}).addClass('hide');
				setTimeout(function(){
					$woCircle.removeClass('hide').addClass('show');
				},300);
			//	$('body,html').css({height:'100%',overflow:'hidden'});
				var topNow=topOld;
				//$(document).bind('touchstart touchmove touchend touchleave touchcancel',fn=function(e){
				if(!/ucbrowser/.test(browser)){
					$(document).bind('touchmove',fn=function(e){
					 e.preventDefault(); 
					 e.stopPropagation();
					 $(window).scrollTop(topNow);
				   });
				  $(document).bind('scrollstop',fn1=function(){
					$(window).scrollTop(topNow);
				  })
			    }
				flagA=false;
			}else if(!flagA){
				$(this).addClass('icon_wo_bg2').removeClass('icon_wo_bg1');
				$woCircle.addClass('hide').removeClass('show');
				setTimeout(function(){$('.maskWo').hide();},300)
				if(!/ucbrowser/.test(browser)){
					toNormal();
				}
				flagA=true;
			}else{}
	})
		$('.maskWo').click(function(){
			$('.woCircleWrp').addClass('hide').removeClass('show');
			setTimeout(function(){$('.maskWo').hide();},300)
			$('.icon_wo').addClass('icon_wo_bg2').removeClass('icon_wo_bg1');
			if(!/ucbrowser/.test(browser)){
				toNormal();
			}
			flagA=true;
		})

/**/ function toNormal(){
			
			$(window).scrollTop(topOld);
			$(document).unbind('scrollstop',fn1);
			//$(document).unbind('touchstart touchmove touchend touchleave touchcancel',fn);
			$(document).unbind('touchmove',fn);
	}
	


	$('.woCircle .part').bind('mousedown touchstart',function(){
		var _this=$(this).find('.partIcon');
		var i=$('.partIcon').index(_this);
		$(this).find('.partIcon').addClass('partIcon_bg'+(i+1)).end().addClass('partBg');
	}).bind('mouseup touchend',function(){
		var _this=$(this).find('.partIcon');
		var i=$('.partIcon').index(_this);
		$(this).find('.partIcon').removeClass('partIcon_bg'+(i+1)).end().removeClass('partBg');
	}).bind('mouseover touchmove',function(){
		var _this=$(this).find('.partIcon');
		var i=$('.partIcon').index(_this);
		$(this).find('.partIcon').removeClass('partIcon_bg'+(i+1)).end().removeClass('partBg');
	});
	
	//收藏效果
	var flagB=true;
	$('.collectWrp').click(function(){
		if(flagB){
			$(this).find('.collect_star').removeClass('icon_collect').addClass('icon_collected');
			flagB=false;
		}else{
			$(this).find('.collect_star').addClass('icon_collect').removeClass('icon_collected');
			flagB=true;
		}
		
	})

	$('.collectWrp_sta').unbind('click');

	//到达页面底部加载新内容
	$(window).scroll(function () {
		//alert('window:'+$(window).height()+':document'+$(document).height());
		//alert('window:'+($(window).scrollTop() + $(window).height())+':document'+$(document).height());
    if ($(window).height()<$(document).height()&&$(window).scrollTop() + $(window).height() >= $(document).height()) {
				$('.dragMore').css({display:'block'});
				$('.loadingImg').addClass('loadingImg_going');
    }
    });
 
	/*我的盟友*/
	$('.fri_list').click(function(){
		window.location.href='mydetails.html';	
	//盟友按字母查找
	$('.fri_listH a').each(function(){
		this.name=$(this).text().toUpperCase();	
	})
	})

	
	$('.fri_tip_list a').click(function(){
		if(!$(this).hasClass('fri_tip_point')){
			var thisText=$(this).text().toUpperCase();
			var targetText=$('.fri_listH').find('a:contains('+thisText+')').text();
			location.href='#'+targetText;
		}else if($(this).hasClass('fri_tip_point')){
			var prevA=$(this).parent().prev().find('a').text().toUpperCase();
			var targetIndex=$('.fri_listH').index($('.fri_listH').find('a:contains('+prevA+')').parent())+1;
			location.href='#'+$('.fri_listH').eq(targetIndex).text();
		}
		return false;
	})
	
	//我的盟友点击效果
	$('.fri_list').bind('mousedown touchstart',function(){
		$(this).addClass('active');
	}).bind('mouseup touchend',function(e){
		$(this).addClass('active');
		setTimeout(function(){$(e.target).closest('.fri_list').removeClass('active');},500);
	}).bind('mouseover touchmove',function(){
		$(this).removeClass('active');
	});

	//公告列表点击效果
	$('.mon_list').bind('mousedown touchstart',function(){
		$(this).addClass('active');
	}).bind('mouseup touchend',function(e){
		$(this).addClass('active');
		setTimeout(function(){$(e.target).closest('.fri_list').removeClass('active');},500);
	}).bind('mouseover touchmove',function(){
		$(this).removeClass('active');
	});


	/*个人信息头像上传*/
	$('.portraitWrp').click(function(){
			$('.share_source').popup1({height:174,marginTop:87,maskObj:'.shareMask'});
			setTimeout(function(){$('.btn_file_repla').val('上传头像')},1000);
			setTimeout(function(){$('.btn_file_repla').val('上传中...').parent().addClass('btn_addCard')},2000);
			setTimeout(function(){$('.btn_file_repla').parent().removeClass('btn_addCard');$('.share_source,.shareMask').hide();},3000);
			
	})
	/*$('.share_source .btn').click(function(){
		$('.share_source,.shareMask').hide();
	})*/
	$('.share_source .btn_cancel').click(function(){
		$('.share_source,.shareMask').hide();
	})
	
	
//数字分隔
/*	function space(that){
		  var value=that.value.replace(/\s+/g,'');
		  var arr=[];
		  arr[0]=value.substr(0,3);
		  value.substr(3,4)?arr[1]=value.substr(3,4):0;
		  value.substr(7,4)?arr[2]=value.substr(7,4):0;
		  that.value=arr.join(' ');
	 }
    $('.phoneText').keyup(function(){
		space(this);
	})*/
	//手机号码格式
	/* $('.phoneText').keyup(function(e){
		 if(e.keyCode!=8&&e.keyCode!=46){
			 var value=this.value.replace(/\s+$/g,'');
			if(value.length<=4){
				this.value=value.replace(/^(\d{3})(?=\d)/g,'$1 ');
			}else{
				this.value=value.replace(/(\d{4})(?=\d)/g,'$1 ');
			}
			this.value=this.value.substring(0,13);
		}
	})*/
	//$('.phoneText').keyup(function(e){
		// if(e.keyCode!=8&&e.keyCode!=46){
		//	 var value=this.value.replace(/\s+$/g,'');
			/*if(value.length<=4){
				this.value=value.replace(/^(\d{3})(?=\d)/g,'$1 ');
			}else{
				this.value=value.replace(/(\d{4})(?=\d)/g,'$1 ');
			}*/
		//	preVal=this.value.substring(0,3);
		//	if(/\d/g.test(preVal)){
		//		this.value=preVal+' ';
		//	}
			//this.value=this.value.substring(0,13);
			//this.value=this.value+1;
			//$(this).val($(this).val()+1);
			
	//});
	$('.phoneText').keyup(function(e){
		if(e.keyCode!=8&&e.keyCode!=46)  //退格键/删除del键
		FillMobile(this);
		//getCursortPosition (this);
		//$(selector).insertAtCaret("value");
	})
	
	function cp(_this){
			var phone = $(_this).val();
			var expression_1  = /^([0-9]{3})$/;
			if(regCheck(phone,expression_1)){
				phone = phone + " ";
				$(".phoneText").val(phone);
				return;
			}
			var expression_2 = /^[0-9]{3}\s[0-9]{4}$/;
			if(regCheck(phone,expression_2)){
				phone = phone + " ";
				$(".phoneText").val(phone);
				return;
			}/**/
			/*if(phone.length==3){   //在号码的三位和八位处分别加空格。
				phone = phone + " ";
				$(".phoneText").val(phone);
				return;
			}
			if(phone.length==8){
				phone = phone + " ";
				$(".phoneText").val(phone);
				return;
			}*/
			
			/*if(/^([0-9]{3})(?=\d)/.test(phone)){
				alert(111)
				phone.replace(/^([0-9]{3})(?=\d)/g,'$1 ');
			}*/
			//$(".phoneText").val(phone.substring(0,13));  //将字数限制到13位
			//$('.phoneText').val(phone.replace(/^(.{13}).*/,'$1'));
			
	}
		
	function regCheck(info,exp){
			var objExp = new RegExp(exp);
			if(true === objExp.test(info)){
				return true;
			}else{
				return false;
			}
	}
	function FillMobile(_this) {
    var mobile = _this;//页面上输入手机号码的文本框的Id.
    var mValue =mobile.value.replace(/\s/g,'');
    if (mValue != "") {
        var mLength = mValue.length;
        if (mLength <= 3) {
            mobile.value=mValue;
        } else {
            if (mLength <= 7) {
                mobile.value=mValue.substring(0, 3) + " " + mValue.substring(3, mLength);
            } else {
                mobile.value=mValue.substring(0, 3) + " " + mValue.substring(3, 7) + " " + mValue.substring(7, 11);
            }
        }
    }
}
function getCursortPosition (ctrl) {//获取光标位置函数
	var CaretPos = 0;	// IE Support
	if (document.selection) {
	ctrl.focus ();
		var Sel = document.selection.createRange ();
		Sel.moveStart ('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	console.log (CaretPos);
}
(function($){
	$.fn.extend({
		insertAtCaret: function(myValue){
			var $t=$(this)[0];
			if (document.selection) {
				this.focus();
				sel = document.selection.createRange();
				sel.text = myValue;
				this.focus();
			}
			else 
				if ($t.selectionStart || $t.selectionStart == '0') {
					var startPos = $t.selectionStart;
					var endPos = $t.selectionEnd;
					var scrollTop = $t.scrollTop;
					$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
					this.focus();
					$t.selectionStart = startPos + myValue.length;
					$t.selectionEnd = startPos + myValue.length;
					$t.scrollTop = scrollTop;
				}
				else {
					this.value += myValue;
					this.focus();
				}
		}
	})	
})(jQuery);
	
//我的订单
	$('.selectListOrder div').click(function(){
		$(this).find('span').addClass('active_factor').end().siblings().find('span').removeClass('active_factor');
	   $(this).find('strong').addClass('stronged').end().siblings().find('strong').removeClass('stronged');
	})
//我的订单点击列表加载中
	$('.myorder_list').each(function(){
	   var flagNum=0;
   		$(this).click(function(){
			if(flagNum%2==0){
				$('.load_middle').show().css({top:this.offsetTop+140});
				setTimeout(function(){
					$('.load_middle').hide();
				},2000);
			}
			flagNum++;
		});
		
	})/**/

//添加银行卡点击跳转
	$('.bank_list li').not('.bankMore').click(function(){
		location.href='writeBankInfo.html';
	})
	
	$('.bank_list li').bind('mousedown touchstart',function(){
		$(this).addClass('active');
	}).bind('mouseup touchend',function(e){
		$(this).addClass('active');
		setTimeout(function(){$(e.target).closest('.bank_list li').removeClass('active');},500);
	}).bind('mouseover touchmove',function(){
		$(this).removeClass('active');
	});

	//银行卡列表图标居中显示
	$('.bank_list .icon_bank img').load(function(){
		iconCenter($('.bank_list li .icon_bank'),$('.bank_list li'));
		//iconCenter($('.BankH .icon_bank'),$('.BankH'));
	})
	$('.BankH .icon_bank img').load(function(){
	//	iconCenter($('.bank_list li .icon_bank'),$('.bank_list li'));
		iconCenter($('.BankH .icon_bank'),$('.BankH'));
	})
	
	/*function iconCenter(obj){
		obj.each(function(){
			var thisImg=$(this).find('img');
			thisImg.load(function(){
				$(this).height(thisImg.height()).width(thisImg.width()).css({marginTop:($(this).height()-thisImg.height())/2});
			})
		})
	}*/
	$('.bankH_confirm .icon_bank img').load(function(){
		var _this=$('.bankH_confirm .icon_bank');
		_this.height($('.BankH').find('img').height());
		_this.width($('.BankH').find('img').width());
		_this.css({marginTop:($('.bankH_confirm').height()-_this.height())/2});
	})
	
	function iconCenter(obj1,obj2){
		obj1.each(function(){
			$(this).height($(this).find('img').height());
			$(this).width($(this).find('img').width());
			//console.log(2)
			$(this).css({marginTop:(obj2.height()-$(this).height())/2});
		})
	}
  
  
	  //我的沃联盟个人信息百分比效果
	  function percent(num){
		  $('.percent').width(num);
	  }
	  // percent('80%');
	  
	  
	  //按钮由灰变橙效果
	  $('.btn_addCard .btn').mousedown(function(){
		  $(this).addClass('active');
		})
		
	
	//添加
			//个人信息
	$('.procityH1').click(function(){
		$(this).find('.bank_to').toggleClass('bank_to_transD');	
		$(this).next('.procityList').slideToggle();
		
	}).unbind('touchstart mousedown touched mouseup');
	
	
	//首页冒泡：
	function popnumLen(){
		var popNum=$('.popNum');
		popNum.each(function(){
			var NumLen=$(this).text().length;
			if(!NumLen){
				$(this).hide();
			}else{
				$(this).show().width(12+7*(NumLen-1));
			}
		})
	}
	popnumLen();
	
		//个人信息
	$('.proWrp div').click(function(){
		$('.cityList').slideDown();
		$('.cityH .bank_to').addClass('bank_to_transD');
	})
	
	//填写银行卡
	$('.ipt_backName').keyup(function(){
		if($(this).val().length>=2&&$('.preBanks').find('li').length!=0){
			$('.preBanks').slideDown();
		}else{
			$('.preBanks').slideUp();
		}
	})
	$('.preBanks li').click(function(){
		$('.ipt_backName').val($(this).text());
		$('.preBanks').slideUp();
	})
	
	$(document).not($('.preBanks li')).mouseup(function(){
		$('.preBanks').slideUp();
	})
	
	/*我的订单 选项卡样式*/
$('.tab').find('li').each(function(i){
	$(this).click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		$('.orderStyle').eq(i).show().siblings('.orderStyle').hide();
	})		
})

	//我的任务
	if($('.myTask_per').text()=='0个'){
		$('.myTask_per').css({color:'#a5a5a5'}).siblings('.new').hide();
	}else{
		$('.myTask_per').css({color:'#ff6600'}).siblings('.new').show();
	}
	
	$('.taskLi').bind('click',function(){
			$(this).find('.taskArrow').toggleClass('active').end().find('.taskDetail').slideToggle();
		})

	$('.taskLi').find('.btn_task').click(function(e){
		e.stopPropagation();
	})
	
	//二期 cj
	//我要赚钱
	$('.toStore>h3').click(function(){
		var storedIcon=$('.storedIcon',this);
		var em=$(this).find('em');
		storedIcon.toggleClass('active');
	})
	$('.toStore>h3.toStoreYes').bind('click.toStore',function(){  
		window.location.href='slctStore.html';
	})
	
	//直接进入我要赚钱页面：不跳转到添加店铺
	$('.toStoreNo').click(function(){
		$('.money_toStore_pop').popup1({height:205,marginTop:100,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});
	$('.money_toStore_pop .btn_return').click(function(){
		$('.money_toStore_pop,#maskConfirm').hide();
		
	})
	
	
	$('.tab_money>li').each(function(i){
		$(this).click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			$('.tab_wopost_main').eq(i).show().siblings('.tab_wopost_main').hide();
		})
	})
	
	//首页掌上秒领
	$('.btn_goBuy_index').unbind('click',myFun1);
	
	//实体海报页面跳转
	$('.btn_transport').click(function(){
		location.href='/secPhase/transInfo.html';	
	})
	$('.btn_reason').click(function(){
		location.href='/secPhase/posterReason.html';	
	})
	
	//我的店铺收藏效果
	$('.cllctS').click(function(e){
		e.stopPropagation();
		$(this).toggleClass('active');	
	})
	$('.cllctS.cllctSed').unbind('click');
	
	/*$('.shop_list p').click(function(e){
		e.stopPropagation();
	})*/

	
	//选择店铺
	$('.storeList dl').click(function(){
		var iconAll=$('.storeAll').find('.icon_slctStore');
		var iconThis=$(this).find('.icon_slctStore');
		iconThis.toggleClass('active');
		if($(this).is('.storeDl')){
			var flag=true;
			$('.storeDl').each(function(){
				if(!$(this).find('.icon_slctStore').hasClass('active')){
					flag=false;
				}
			})
			if(flag){
				iconAll.addClass('active');
			}else{
				iconAll.removeClass('active');
			}
		}else{
			if(iconThis.hasClass('active')){
				$('.storeDl').each(function(){
					$(this).find('.icon_slctStore').addClass('active');
				})
			}else{
				$('.storeDl').each(function(){
					$(this).find('.icon_slctStore').removeClass('active');
				})
			}
		}
	})
	
	$('.btn_save_store').click(function(){
		$('.exp_succeed1').show();
		setTimeout(function(){$('.exp_succeed1').hide();},3000);
	})
	
	//选择收货地址
	$('.addrList dl').click(function(){
		var iconThis=$(this).find('.icon_slctAddr');
		iconThis.toggleClass('active');
		$(this).siblings('dl').each(function(){
			$(this).find('.icon_slctAddr').removeClass('active');
		})
	})
	
	//编辑收货地址
	$('.defaultAddr').click(function(){
		$(this).find('.icon_radio').toggleClass('active');	
	})
	$('.addrInfo .listMain').click(function(){
		var input=$(this).find('input:text');
		var textarea=$(this).find('textarea');
		if(input.length){
			input.focus()
		}else if(textarea.length){
			textarea.focus();
		}else{}
			
	})
	
	//删除地址弹层
	$('.btn_del_addr').click(function(){
		$('.delPox').show();	
	})
	$('.delPox .btn').click(function(){
		$('.delPox').hide();	
	})
	
	//跳转到收货地址
	$('.addrList1 dl').click(function(){
		location.href='writeAddr.html';
	})
	
	
	/*//判断店铺简介字数是否大于一行
	//alert($('.store_tip1').height())
	$('.store_tip1').keyup(function(){
		var store_tip1=$(this);
		//alert(store_tip1.height())
		if(store_tip1.height()>30){
			store_tip1.addClass('on');
		}else{
			store_tip1.removeClass('on');
		}
	})*/
	
	
	
;(function(){
	//我的店铺首页左滑效果
	/*var thisIndex=0;  //当前元素的索引号
	 var lenAll=$('.cardType_wrp').length;  //列表总数
	$(document).click(function(){
		$('.cardType_wrp').eq(thisIndex).animate({left:0},1000).siblings('.store_btn_big_wrp').animate({right:'-110px'},1000)
	});	
	$(".cardType_wrp").each(function(i){
		var $this=$(this); 
		$this.touchwipe({
		  wipeLeft:function() {
			  thisIndex=$(".cardType_wrp").index($this);
			$('.cardType_wrp').not(':eq('+thisIndex+')').each(function(){
				$(this).animate({left:0},1000).siblings('.store_btn_big_wrp').animate({right:'-110px'},1000);
	
			})
			$this.animate({left:'-104px'},1000).siblings('.store_btn_big_wrp').animate({right:0},1000);
		  },
		  wipeRight:function() {
			$this.animate({left:'0'},1000).siblings('.store_btn_big_wrp').animate({right:'-110px'},1000);
		  },
		  min_move_x:10,
		  preventDefaultEvents:false
	   });
	});*/
	//var store_index_list= $('.promotionS_new').find('.store_index_list');
	var thisIndex=0;  //当前元素的索引号
	 var lenAll=$('.promotionS_new').find('.store_index_list').length;  //列表总数
	$('.modiProBtn').click(function(){
		$('.modiMain').popup1({height:305,marginTop:152,maskObj:'#maskConfirm'});
		thisIndex=$('.modiProBtn').index($(this));
	});
	$('.moreMain .sec_btn').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('#maskConfirm,.moreMain').hide();
	})
	
	//上移
	$('.btn_more_up').click(function(){
		if(thisIndex>1){
			var store_index_list1= $('.promotionS_new').find('.store_index_list');
			var upOne=store_index_list1.eq(thisIndex-2);
			$('.promotionS_new').find('.store_index_list').eq(thisIndex).insertBefore(upOne);
			thisIndex=thisIndex-2;
			store_index_list1.eq(thisIndex+1).insertAfter(store_index_list1.eq(thisIndex+2));
			padCheck();
		}
	});
	
	//下移
	$('.btn_more_down').click(function(){
		if(thisIndex<lenAll-2){
			var store_index_list2= $('.promotionS_new').find('.store_index_list');
			var dOne=store_index_list2.eq(thisIndex+2);
			$('.promotionS_new').find('.store_index_list').eq(thisIndex).insertAfter(dOne);
			thisIndex+=2;
			store_index_list2.eq(thisIndex-1).insertBefore(store_index_list2.eq(thisIndex-2));
			padCheck();
		}
	});
	
	//右移
	$('.btn_more_r').click(function(){
		if(thisIndex%2==0){
			var rOne=$('.promotionS_new').find('.store_index_list').eq(thisIndex+1);
			$('.promotionS_new').find('.store_index_list').eq(thisIndex).removeClass('padR').next().addClass('padR');
			$('.promotionS_new').find('.store_index_list').eq(thisIndex).insertAfter(rOne);
			thisIndex+=1;
		};
	});
	
	//左移
	$('.btn_more_l').click(function(){
		if(thisIndex%2==1){
			var lOne=$('.promotionS_new').find('.store_index_list').eq(thisIndex-1);
			$('.promotionS_new').find('.store_index_list').eq(thisIndex).addClass('padR').prev().removeClass('padR');
			$('.promotionS_new').find('.store_index_list').eq(thisIndex).insertBefore(lOne);
			thisIndex-=1;
		}
	});
	
	
	//置顶
	$('.btn_more_top').click(function(){
		if(thisIndex>1){
			var store_index_list=$('.promotionS_new').find('.store_index_list');
			var first;
			var firstIndex=thisIndex%2;
				first=store_index_list.eq(firstIndex);
				first.clone(true).insertAfter($('.promotionS_new').find('.store_index_list').eq(thisIndex-1));
				store_index_list.eq(firstIndex).replaceWith(store_index_list.eq(thisIndex));
			padCheck();
			thisIndex=thisIndex%2;
		}
	});

	//置底
	$('.btn_more_b').click(function(){
		if(thisIndex<lenAll-1){
			var last=$('.promotionS_new').find('.store_index_list').eq(lenAll-1);
			$('.promotionS_new').find('.store_index_list').eq(thisIndex).insertAfter(last);
			thisIndex=lenAll-1;
			padCheck();
			
		}
	});
	
	//删除
	$('.btn_more_del').click(function(){
		$('.promotionS_new').find('.store_index_list').eq(thisIndex).remove();	
		lenAll-=1;
		$('.promotionS_new').find('.store_index_list').length=lenAll;
		padCheck();
	});
	
})();
	
	//我的店铺首页更多弹框
	/*$('.store_btn_moreBig').click(function(e){
		e.stopPropagation();
		$('.moreMain').popup1({height:305,marginTop:152,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	})
	$('.moreMain .sec_btn').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('#maskConfirm,.moreMain').hide();
	})*/
	
	//我的店铺中店铺海报:申请海报显隐
	$('.btn_solidPoster').click(function(){
		$('.apply_poster').show();	
	})
	$('.btn_cancel_apply').click(function(){
		$('.apply_poster').hide();	
	})
	
	
	//掌上秒领
	$('.btn_wannaGet').unbind('click',myFun1);
	
	
		//个人信息优化
	$('.checkboxOut').click(function(){
		var check_develep=$(this).find('.check_develep');
		check_develep.toggleClass('checked');
		if(check_develep.hasClass('checked')){
			$('.developSec').show();
			$('.checkDeve_sec').css({borderWidth:'0px'});
		}else{
			$('.developSec').hide();
			$('.checkDeve_sec').css({borderWidth:'1px'});
		}
	})
	

	$('.text_maxLen20').keyup(function(){
		var len=$(this).val().length;
		var value=$(this).val();
		if(len>20){
			value=$.trim(value).substring(0,20);
			$(this).val(value);
		}
	})
	
	
	

	
	/**tsm**/
	//选择海报主题
	$('.sTitle_list li').click(function(){
		$('.sTitle_list li').find('.sTitle_icon').hide();
		$(this).find('.sTitle_icon').show();
	});
	
	
	//生成店铺海报
	$('.addToPoster').click(function(){
		$(this).find('.sTitle_icon2').toggleClass('on');
	});
	$('.srorePosterBtn1').click(function(){
		$('.sPosterPop').show();
	});

	//推广店铺小导航交互
	setBtnColor('.prom_select li','active');
	
	
	
	/*10.24 cj 订单优化*/
	
	function liWidth(){
	$('.order_dataList').width(	function(){
	var liWid=Math.floor($(window).width()/6);
		var li=$('.order_dataList').find('li');
		li.width(liWid);
		 return li.length*li.width();
	});
	};
	 liWidth();
	$(window).resize(function(){
		liWidth();
	});
	
	(function(){
		var wdWid=$(window).width();
		$(window).resize(function(){
			 wdWid=$(window).width();
		})
		var leftTouch;
		$('.order_dataList').touchwipe({
			wipeLeft:function() {
			//event.stopPropagation();
			var thisWid=$('.order_dataList').width();
			leftTouch=parseInt($('.order_dataList').css('left'));
			if(leftTouch-wdWid>-thisWid){
				$('.order_dataList').animate({left:leftTouch-wdWid},1000);
			};		
		  },
		  wipeRight:function() {
			//event.stopPropagation();
			var thisWid=$('.order_dataList').width();
			leftTouch=parseInt($('.order_dataList').css('left'));
				if(leftTouch<0){
				$('.order_dataList').animate({left:leftTouch+wdWid},1000);
				};	
		  },
		  min_move_x:2,
		  preventDefaultEvents:false
		});	
	})();

	
	$('.order_dataList li').click(function(){
		$(this).addClass('curr').siblings().removeClass('curr');
	});
	
	
	$('.order_detail_wrap').click(function(){
		var thisOther=$(this).find('.order_detail_other');
	    var thisIndex=$('.order_detail_wrap').index($(this));
		var thisP=$(this).find('.reasonBox');
		if(thisOther.is(':hidden')){
			thisOther.slideDown();
			thisP.slideDown();
			$(this).siblings('.order_detail_wrap').each(function(){
				$(this).find('.order_detail_other,.reasonBox').slideUp();
			})
		}
	});
	
	$('.styleItems div').each(function(i){
		$(this).click(function(){
			$('.woStyleList').eq(i).show().siblings('.woStyleList').hide();
		})
	})
	
	
	//11.5优化
	
	//逛店铺选择列表
	$('.selctUl_shop li').click(function(){
		$(this).addClass('curr').siblings().removeClass('curr');
	});
	
	$('.addStoreBox').bind('mousedown touchstart',function(){
		$(this).find('.addStore_icon').addClass('added');
	}).bind('mouseup touchend',function(){
		$(this).find('.addStore_icon').removeClass('added');
	});
	
	
	$('.colctNewed').unbind('click');
	$('.addStoreBox:has(".added")').unbind('mousedown touchstart mouseup touchend');
	
	//开店指引 11.15 cj
	$('.listH_guide').click(function(){
		var _this=$(this);
		var thisArrow=_this.find('.bank_to');
		$(window).scrollTop(0);
		thisArrow.toggleClass('bank_to_transD');
		_this.next().slideToggle();
		if(thisArrow.hasClass('bank_to_transD')){
			$(this).siblings('.listH_guide').each(function(){
				$(this).find('.bank_to').removeClass('bank_to_transD').end().next().slideUp();
			})
		}
	});
	
	
	/*$('.colctNew_icon').click(function(){
		$(this).toggleClass('collted');
	})*/
	
	//我要赚钱页优化 cj 11.19
	$('.clectBox').click(function(){
		var colctNew_icon= $(this).children('.colctNew_icon');
		colctNew_icon.toggleClass('collted');
		if(colctNew_icon.hasClass('collted')){
			$(this).removeClass('skews1').addClass('skews');	
			$(this).children('.colctTip').text('已收藏');
		}else{
			$(this).removeClass('skews').addClass('skews1');	
			$(this).children('.colctTip').text('收藏');
		}
	});
//	$('.clectBox:has(".collted"),.collted').unbind('click');
	$('.addStore_icon.added').unbind('click mousedown touchstart mouseup touchend');
	
	
	//收藏效果
	
	

	//体验计划 下拉列表下箭头 11.20

	/*$('.slectList_exp select').click(function(){
		var arrowSlect=$('.slectList_exp').siblings('.arrowSlect');
		if(arrowSlect.hasClass('arrowSlectUp')){
			arrowSlect.removeClass('arrowSlectUp');
		}else{
			arrowSlect.addClass('arrowSlectUp');
		}
	})*/
	/*$(document).mousedown(function(e){
		if(!$(e.target).is('.slectList_exp select'))
		$('.slectList_exp').siblings('.arrowSlect').removeClass('arrowSlectUp');
	});
	$('.slectList_exp select').change(function(){  //select的change事件会比click事件先发生。
		$('.slectList_exp').siblings('.arrowSlect').removeClass('arrowSlectUp');
	});*/
	
	//我的订单时间优化 12.2
	$('.calendar_order').click(function(){
		$(this).siblings('.allTime_list').find('span').removeClass('active_factor');
	});
	$('.allTime_list').click(function(){
		$(this).find('span').addClass('active_factor').end().siblings('.calendar_order').find('select').each(function(){
			this.options[0].selected=true;
			var value = $(this).find('option:selected').val();
			$(this).parents('.select').siblings('.text').text(value);
		});
	});
	
	$('.tab_order li').click(function(){
		$('.allTime_list').trigger('click');
	});
	
	//我要赚钱等页面样式优化 12.3
	$('.clectBoxed').unbind('click');
	
	//个人信息发展人信息字数限制 12.9
	$('.span_text_max7').each(function(){  //需放在获取名称、编号代码之后
		var thisTxt=$(this).text();
		var thisLen=thisTxt.length;
		if(thisLen>7){
			$(this).text(thisTxt.substring(0,7)+'...');
		}
	});
	
	//引导层大屏图片
	;(function(){
	var winW=$(window).width();
	$(window).resize(function(){
		//location.reload();
		winW=$(window).width();
		adjustW();
	});
	adjustW();
	function adjustW(){
		if(winW>=414){
			//$('#newGuide.mystoreGuide,#newGuide.openst_newGuide').addClass('big');
			$('.mystGuide1').attr({src:'/images/guide_myst_big1.png'}).css({width:'414px'});
			$('.mystGuide2').attr({src:'/images/guide_myst_big2.png'}).css({width:'414px'});
			$('.mystGuide3').attr({src:'/images/guide_myst_big3.png'}).css({width:'414px'});
			$('.openstGuide1').attr({src:'/images/guide_openst1.png'}).css({width:'414px'});
			$('.openstGuide2').attr({src:'/images/guide_openst2.png'}).css({width:'414px'});
			
		};
	};
	})();
	
	//12.15我要赚钱放弃提示框
	$('.cancel_sec_btn').click(function(){
		$('.giveup_money').show();
	});
	$('.giveup_money .btn2').click(function(){
		$('.giveup_money').hide();
	});
	$('.giveup_money .btn1').click(function(){
		$('.giveup_money').hide();
		location.href='/secPhase/addAds.html';
	});
	
	//12.24 我的店铺首页布局
	padCheck();
	function padCheck(){
		$('.promotionS .store_index_list').each(function(i){
			if(i%2==0){
				$(this).addClass('padR');	
			}else{
				$(this).removeClass('padR');
			}
		});
	};
	
	
	//2015.1.5 app帮助中心
	$('.listH_guide_cash').click(function(){
		var _this=$(this);
		var thisArrow=_this.find('.bank_to');
		$(window).scrollTop(460);
		thisArrow.toggleClass('bank_to_transD');
		_this.next().slideToggle();
		if(thisArrow.hasClass('bank_to_transD')){
			$(this).siblings('.listH_guide_cash').each(function(){
				$(this).find('.bank_to').removeClass('bank_to_transD').end().next().slideUp();
			})
		}
	});
	if($(window).width()<360){
		$('.bank_to_income').css({display:'none'});
	};
	$('.backApp_h').click(function(){
		goBack();	
	});
	
	//2015.1.21 cj app下载相关
	$('.close_appIndex').click(function(){ 
		$('.appIndex_s_wrp').hide();
	});
	
	//2015.1.27 优化 cj
	$('.fail_cash_btn1').click(function(){
		$('.confirmMain_fail1').popup1({height:305,marginTop:202,maskObj:'#maskConfirm',closeObj:'.close_confirm'})
	});



	$('.fail_cash_btn2').click(function(){
		$('.confirmMain_fail2').popup1({height:305,marginTop:202,maskObj:'#maskConfirm',closeObj:'.close_confirm'});
		//$('#maskConfirm').show();
	});
	
	$('.confirmMain1 .sec_btn .btn').click(function(){
		$(this).parents('.confirmMain1').hide();
		$('#maskConfirm').hide();
	});
	
	
	//2015.3.24 优化 cj
	//客户端更改手机弹框
	$('.chgPhone_list').click(function(){
		$('.chgPhone_pop,.maskDis').show();
	});
	$('.chgPhone_pop .btn2').click(function(){
		$(this).parents('.chgPhone_pop').add('.maskDis').hide();	
	});
	
});



/**动态数字插件**/
function AnimateNum(settings) {
    this.obj = settings.obj;
    this.target = settings.target.toString();
    this.totalTime = settings.totalTime || 1000;
    this.init();
}

AnimateNum.prototype = {
    init: function () {
        if (!this.target)return false;
        this.animation();
    },
    animation: function () {
        var self = this;
        var fixIndex = this.target.indexOf("."); //小数点索引
        var fixLength = 0;  //小数点后有几位
        if (fixIndex >= 0) {
            fixLength = this.target.length - fixIndex - 1;
        }
        var target = this.target.replace("\.", "");
        var totalStep = (this.totalTime / 30) | 0;
        var stepLength = target / totalStep | 0;
        var currentStep = 0;
        var currentNum = 0;
        self.timer = setInterval(function () {
            currentStep++;
            currentNum += stepLength
            self.obj.html(currentNum / Math.pow(10, fixLength));
            if (currentStep >= totalStep) {
                clearInterval(self.timer);
                self.obj.html(self.target);
            }
        }, 30)
    }
}















