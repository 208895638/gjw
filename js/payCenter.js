$(function(){
	var payCenterObj={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			
			
		}
	};
	payCenterObj.init();
})