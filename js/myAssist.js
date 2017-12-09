$(function(){
	var myAssistObj={
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
					var con=0;
					if(JSON.parse(res).status==0){
						for(var i=0;i<str.length;i++){
							con+=parseFloat(str[i].money)
						}
						$('.myAssist').find('ul').find('li').eq(0).find('span').html(con)
					}
				}
			});
			//优惠券
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetMyQuan",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:0
				},
				success:function(res){
					
					var str=JSON.parse(res).data;
					var con=0;
					if(JSON.parse(res).status==0){
						for(var i=0;i<str.length;i++){
							con+=parseFloat(str[i].money)
						}
						$('.myAssist').find('ul').find('li').eq(1).find('span').html(con)
					}
				}
			});
			//积分
			$.ajax({
				type:"get",
				url:that.urlPath+"/SeR/GetUserScore",
				async:true,
				data:{
					user_id:localStorage.getItem('WP_id'),
					state:0,
					type:0,
					currentPage:0,
					pageSize:999
				},
				success:function(res){
					
					var str=JSON.parse(res).data;
					var con=0;
					con=str.CanUseScore;
					$('.myAssist').find('ul').find('li').eq(3).find('span').html(con)
				}
			});
		}
	};
	myAssistObj.init();
})