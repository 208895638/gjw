$(function(){
	var accountSafetyObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			
		},
		render:function(){
			var that=this;
			/*获取手机号码*/
			$('.accountSafety').find('em').html(localStorage.getItem("phone"))
		}
	};
	accountSafetyObj.init();
})