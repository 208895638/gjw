$(function(){
	var verifyPasswordObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.nextStep').on('click',function(){
		        var value = $('#enterNewPass').val();
				
				var value1=$.md5(value) 
				console.log(value1,localStorage.getItem('pass'));       
		        if (value == '') {
		            alert("输入不能为空!");
		        }else if(value1==localStorage.getItem('pass')){					
						alert('验证成功!')
						window.location.href='bindNewPhone.html';					
				}else{
					alert("验证失败")
				}
			})
		}
	};
	verifyPasswordObj.init();
})