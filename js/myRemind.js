$(function(){
	var myRemindObj={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			})
		}
	};
	myRemindObj.init();
})