$(function(){
	var publicObj={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			
		}
	};
	publicObj.init();
})