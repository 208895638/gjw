$(function(){
	var registerObj={
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
			
			//获取验证码
			
			$('.imgWrapper').on('click','.sendCode',function(){
				
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
					if($(".phone").find('input').val()==''){
						alert('手机号不能为空');
						return;
					}else if(!myreg.test($(".phone").find('input').val())) { 
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
							url:that.urlPath+"/SER/GetMessage",
							async:true,
							data:{
								tel:$('.phone').find('input').val(),
								type:1
							},
							success:function(res){
								
								yanzhengma=JSON.parse(res.info).data.valid_code;
								console.log(res,res.info,typeof(res.info),JSON.parse(res.info).data,JSON.parse(res.info).data.valid_code);
								var msg=JSON.parse(res.info).msg;
								alert(msg);
							}
						});
					}
								
							
				
			})
			//清空手机号码
			$('.phone').find('.imgWrapper').on('click',function(){
				$(".phone").find('input').val('');
				$(".phone").find('input').focus();
			})
			//显示密码
			var passI=0;
			var passI1=0;
			var yanzhengma=0;
			$('.imgWrapper').find('img').on('click',function(){
				passI++;
				$(this).addClass('showPsw').siblings().removeClass('showPsw');
				if((passI%2)==1){
					$(this).parent().parent().find('input').attr('type','text')
				}else{
					$(this).parent().parent().find('input').attr('type','password')
				}
				
			})
			$('.imgWrapper1').find('img').on('click',function(){
				passI1++;
				$(this).addClass('showPsw').siblings().removeClass('showPsw');
				if((passI1%2)==1){
					$(this).parent().parent().find('input').attr('type','text')
				}else{
					$(this).parent().parent().find('input').attr('type','password')
				}
				
			})
			$('.agreeBtn').on('click',function(){
				$(this).toggleClass('noSelected')
			})
			//点击注册
			$('.regBtn').find('h3').on('click',function(){
					//验证手机号
				var myreg = /^1[345678]\d{9}$/; 
					if($(".phone").find('input').val().trim()==''){
						alert('手机号不能为空');
						return;
					}else if(!myreg.test($(".phone").find('input').val())) { 
					    alert('请输入有效的手机号码！'); 
					 	return;
					}else{
						//验证验证码	
						if($('.regCode').find('input').val()!=yanzhengma){
							alert('验证码不正确');
							return;
						}else{
							//验证密码
							if($('.regPassword').find('input').val().trim().length<6){
								alert('密码长度不能小于6位');
								return;
							}else if($('.regPassword').find('input').val().trim()!==$('.regPassword2').find('input').val().trim()){
								alert('两次输入的密码不一致');
								return;
							}else if(!$('.agreeBtn').prop('checked')){
								alert('请同意<<购酒网用户协议及服务条款>>')
							}else{
								//注册
								$.ajax({
									type:"get",
									url:that.urlPath+"/SER/Register",
									async:true,
									data:{
										phone:$(".phone").find('input').val(),
										pwd:$('.regPassword').find('input').val(),
										name:$(".phone").find('input').val(),
										code:$('.regCode').find('input').val()
									},
									success:function(res){
										var ress=res.info;
										alert(ress);
										/*localStorage.setItem('username','$(".phone").find("input").val()');*/
										window.location.href='login.html';
									}
								});
							}
						}
						
					}
				
			})
		},
		render:function(){
			$('.phone').find('input').focus();
		}
	};
	registerObj.init();
})