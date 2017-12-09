$(function(){
	var feedbackObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
				var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.head').find('h4').on('click',function(){
				$.ajax({
					type:"post",
					url:that.urlPath+"/SeR/SetFeedback",
					async:true,
					data:{
						typename:$('.feedbackType').find('select').val(),
						msgcontent:$('.feedbackType').find('textarea').val(),
						contact:$('.feedbackType').find('input').val()
					},
					success:function(res){
						console.log(res,typeof(res))
						alert(res.info)
					}
				});
			})
		},
		render:function(){
			var that=this;
		}
	};
	feedbackObj.init();
})