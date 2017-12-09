$(function(){
	var loginObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		phoneNum:null,
		passNum:null,
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.phone').find('input').on('input',function(){
				if($(this).val()!=''){
					$('.phone .imgWrapper img').show();
					if($('.password').find('input').val()!=''){
						$('.loginBtn').removeAttr('disabled').css('background','#d9374f');
					}else{
						$('.loginBtn').attr('disabled','disabled').css('background','#ccc');
					}
				}else{
					$('.phone .imgWrapper img').hide();
					$('.loginBtn').attr('disabled','disabled').css('background','#ccc');
				}
			});
			$('.password').find('input').on('input',function(){
				if($(this).val()!=''&$('.phone').find('input').val()!=''){
					$('.loginBtn').removeAttr('disabled').css('background','#d9374f');
				}else{
					$('.loginBtn').attr('disabled','disabled').css('background','#ccc');
				}
			});
			$('.loginBtn').on('click',function(){
				that.submitInfo();
			});
			$('.phone').find('.imgWrapper').on('click',function(){
				$(".phone").find('input').val('');
				$(".phone").find('input').focus();
			});
			//密码属性切换
			$('.imgWrapper').on('click','img',function(){
				$(this).removeClass('showPsw').siblings().addClass('showPsw');
				if($('.showPsw').attr('state')==1){
					$('.password').find('input').attr('type','password');
				}else{
					$('.password').find('input').attr('type','text');
				}
			});
		},
		submitInfo:function(){
			var that=this;
			console.log($('.phone').find('input').val(),$('.password').find('input').val());
			$.ajax({
				url:that.urlPath+"/SER/UserLogin",
				type:'get',
				data: { 
					username:$('.phone').find('input').val(),
					password:$('.password').find('input').val()
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	if(res.state==1){
                		var result=JSON.parse(res.info);
                		localStorage.setItem('id',result[0].id);
                		localStorage.setItem('username',$('.phone').find('input').val());
                		localStorage.setItem('WP_id',result[0].WP_id);
                		localStorage.setItem('signid',res.signid);
                		localStorage.setItem('pass',$.md5($('.password').find('input').val()));
                		window.location.href='../index.html#myself';
                	}else{
                		alert(res.info);
                	}
                }
			});
		}
	};
	loginObj.init();
})
