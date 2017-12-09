$(function(){
	var modifyPasswordObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back();
				console.log("1")
			});
			$('.borderFrame').on('click',function(){
				console.log('2')
				 var password;
				 var password2;
				    function sub() {
				        password = $.trim($('#newPassword').val());
				        password2 = $.trim($('#confirmPassword').val());
				        if (!password || !password2) {
				            alert('密码为空');		
							return ;           
				        }else if (password !== password2) {
				            alert('两次密码输入不一样,请重新输入');
							return   ;         
				        }else{
							$.ajax({
								type:"get",
								url:that.urlPath+"/SER/EditPwd",
								async:true,
								data:{
									id:localStorage.getItem('id'),
									oldpwd:$('#originalPassword').val(),
									newpwd:$('#newPassword').val()
								},
								success:function(res){
									
									if(res.state==0){
										alert(res.info)
									}else{
										alert(res.info)
										window.location.href='login.html';
									}
								}
							});
						}			  
				        
				    }
				    sub();				
				})
		},
		render:function(){
			
						//修改密码
			
		}
	};
	modifyPasswordObj.init();
})