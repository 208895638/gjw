$(function(){
	var payCenterNextObj={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			
			
		}
	};
	payCenterNextObj.init();
})