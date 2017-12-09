$(function(){
	var phoneQuickLandingObj={
		imgPath:'http://img0.gjw.com',
        urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var yzm='';
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.phoneQuickLanding').find('h3').find('img').on('click',function(){
				var i=$(this).index();
				
				$(this).addClass('retrievePasswordHide').siblings().removeClass('retrievePasswordHide');
				if(i==0){
					$('.phoneQuickLanding').find('h3').find('input').attr('type','text')
				}else{
					$('.phoneQuickLanding').find('h3').find('input').attr('type','password')
				}
				
			})
			
				$('.yznT').on('click',function(){
				
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
					if($(".phone").val()==''){
						alert('手机号不能为空');
						return;
					}else if(!myreg.test($(".phone").val())) { 
					    alert('请输入有效的手机号码！'); 
					 	return;
					}else{
						$(this).hide().siblings().show();
						var code=60;
		//				$('.retry').html(code);
						var timer=setInterval(function(){					
							code--;					
							if(code==0){
								code=60;
								$('.retry').hide().siblings().show();
								clearInterval(timer);							
							}
							
							$('.retry').find('span').html(code);
						},1000);
						$.ajax({
							type:"get",
							url:that.urlPath+"/SER/GetMessage",//验证码
							async:true,
							data:{
								tel:$('.phone').val(),
								type:4
							},
							success:function(res){
								
								yzm=JSON.parse(res.info).data.valid_code;
								
								
								var msg=JSON.parse(res.info).msg;
								alert(msg);
							}
						});
					}
								
							
				
			})
				$('.retrievePasswordBtn').on('click',function(){ //点击确定
					//验证手机号
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
					if($(".phone").find('input').val()==''){
						alert('手机号不能为空');
						return;
					}else if(!myreg.test($(".phone").val())) { 
					    alert('请输入有效的手机号码！'); 
					 	return;
					}else{
						//验证验证码	
						if($('.phoneQuickLanding').find('h2').find('input').val()!=yzm){
							alert('验证码不正确');
							return;
						}else{
								
								//找回密码
								$.ajax({
									type:"get",
									url:that.urlPath+"/SeR/FPlogin",
									async:true,
									data:{
										phone:$('.phone').val(),
										code:$('.phoneQuickLanding').find('h2').find('input').val()
									},
									success:function(res){
										var str=JSON.parse(res.info)[0]
									
										localStorage.setItem('id',str.id);
										localStorage.setItem('username',str.userName);
										localStorage.setItem('WP_id',str.WP_id);
										
										window.location.href='../index.html#myself';
									}
								});
							}
						}
						
					})	
		},
		
	};
	phoneQuickLandingObj.init();
})