$(function(){
	var accountBalanceObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			
		},
		render:function(){
			var that=this;
			//账户余额
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/User_MyAcount",
				async:true,
				data:{
					user_id:localStorage.getItem('WP_id'),
					page_size:999,
					current_page:0 
				},
				success:function(res){
					
					var str=JSON.parse(res).data;
					var con='';
					var money=0;
					
					if(JSON.parse(res).status==0){
						if(str[0]){
							$('.aBeContentRecord').addClass('accountBalanceOff')
							$('.aBeContentBottom').removeClass('accountBalanceOff')
						}else{
							$('.aBeContentRecord').removeClass('accountBalanceOff')
							$('.aBeContentBottom').addClass('accountBalanceOff')
						}
						
						for(var i=0;i<str.length;i++){
							money+=parseFloat(str[i].money)
							con+='<li class="clearfix fontAll">'
									+'<span class="l">'
									+'<h1 class="over" style="font-size:12px;font-family:"微软雅黑">'+str[i].remark+'</h1>'
									+'<h4><b  style="font-size:12px;font-family:"微软雅黑">有效期</b><i style="font-size:12px;font-family:"微软雅黑">'+str[i].rang+'</i></h4>'
									+'</span>'
									+'<em class="l" style="color:#CD0011;font-size:12px;font-family:"微软雅黑">'+'¥  '+str[i].money+'</em>'
								+'</li>'
						}
						$('.aBeContent').find('h2').find('i').html(money)
						$('.aBeContentBottom').find('ul').html(con)
					}
				}
			});
		}
	};
	accountBalanceObj.init();
})