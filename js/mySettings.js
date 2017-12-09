$(function(){
	var mySettingsObj={
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.messNotify p img').on('click',function(){
				$(this).hide().siblings().show();
				console.log($(this).index());
			})
		},
		render:function(){
			var user=localStorage.getItem('username');
			if(user){
				$('.exitLogin').show();
				$('.exitLogin').on('click',function(){
					localStorage.removeItem('id');
					localStorage.removeItem('WP_id');
					localStorage.removeItem("username")
				})
			}else{
				$('.exitLogin').hide()
			}
		}
	};
	mySettingsObj.init();
})