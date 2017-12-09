$(function(){
	var bindNewPhoneObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var that=this;
			var yzm='';//验证码
			$('.goback').on('click',function(){
				window.history.back()
			});
			
			$('form').find('strong').on('click',function(){
				$(this).hide().siblings().show();
				
				var code=60;//控制时间
		//				$('.retry').html(code);
				var timer=setInterval(function(){					
					code--;					
					if(code==0){
						code=60;
						$('form').find('i').hide().siblings().show();
						clearInterval(timer);							
					}
					
					$('form').find('b').html(code);
				},1000);
				$.ajax({
					type:"get",
					url:that.urlPath+"/SER/GetMessage",
					async:true,
					data:{
						tel:$.trim($('form').find('p').eq(0).find('input').val()),
						type:3
					},
					success:function(res){
						console.log(res,typeof(res))
						yzm=JSON.parse(res.info).data.valid_code
						if(res.state==1){
							alert(JSON.parse(res.info).msg)
						}
					}
				});
			})
			$('form').find('em').on('click',function(){
				if($('form').find('h5').find('input').val()){
					if(yzm==$.trim($('form').find('h5').find('input').val())){
						$.ajax({
							type:"get",
							url:that.urlPath+"/SER/updatemob",
							async:true,
							data:{
								user_id:localStorage.getItem('id'),
								mobileNum:$('form').find('p').find('input').val(),
								valid_code:yzm
							},
							success:function(res){
								console.log(res)
								alert(JSON.parse(res).info);
								window.location.href='login.html';
							}
						});
					}
				}
			})
		},
		render:function(){
			
		}
	};
	bindNewPhoneObj.init();
})