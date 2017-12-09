$(function(){
	var bindCouponObj={
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
			$('button').on('click',function(){
				 var contact=$("#bindText").val();
					 if(contact!=""){
					  var regular = /^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\！\?\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\。\，\、\[\]\,]+.*)$/;
					    if(regular.test(contact)){
					     alert("存在特殊字符！");
					           return false;
					    }
					   }else if(contact==""){
						   	alert('不能为空');
						   	return ;
						}else{
							$.ajax({
								type:"get",
								url:that.urlPath+"/SER/bind_coupon",
								async:true,
								data:{
									user_id:localStorage.getItem('id'),
									card_num:$('form').find('div').eq(0).find('input').val(),
									card_num:$('form').find('div').eq(1).find('input').val()
								},
								success:function(res){
									
								}
							});
						}
				
			})
		},
		render:function(){
			var that=this;
			
			
		}
	};
	bindCouponObj.init();
})