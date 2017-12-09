$(function(){
	var wLorderObj={
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
			
		},
		render:function(){
			var that=this;
			var url1=location.search.substring(1,999).split("?");console.log(url1[0])
			var url=url1[0];
			var orderNumber=url1[1];
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetodrTracking",
				async:true,
				data:{
					order_id:url
				},
				success:function(res){
//					console.log(res)
					var str=JSON.parse(res);
					var con='';
					var times='';
					var time='';
					
					$('.wLorderT').find('span').html(orderNumber)
					if(str.msg){
						var kuaidi=str.msg.split(',')
						$('.wLorderT').find('em').html(kuaidi[1])
						$('.wLorderT').find('i').html(kuaidi[0])
					}else{
						$('.wLorderT').find('em').html(' ')
						$('.wLorderT').find('i').html(' ')
					}
					
					if(str.status==0){
						if(str.data){
							
							var num=str.data.split('|').reverse();
	//						console.log(num,num.length,typeof(num));
							for(var i=0;i<=num.length-2;i++){
								times=num[i].split(';');console.log(times)
								if(i==0||i==num.length-1){
									
								}else{
									time=times[1];console.log(time)
								}
								
								
								con+='<ul>'
										+'<li>'+time+'<b></b></li>'								
										+'<li>'+times[0]+'</li>'								
									+'</ul>'	
							}
							$('.wlC').html(con)
						}else{
							$('.wlB').show();
							$('.wlC').hide();
						}
						
					}
				}
			});
		}
	};
	wLorderObj.init();
})