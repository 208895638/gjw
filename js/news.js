$(function(){
	var newsObj={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			})
		}
	};
	newsObj.init();
})