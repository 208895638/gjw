$(function(){
	var browserRecordObj={
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
			$.ajax({
				type:"get",
				url:that.urlPath+"/SeR/FootList",
				async:true,
				data:{
					userid:localStorage.getItem('id'),
					pagesize:10,
					pageindex:1
				},
				success:function(res){
					console.log(res)
					var str=JSON.parse(res.info);
					var con='';
					for(var i=0;i<str.length;i++){
						con+='<li class="clearfix">'
							+   '<div class="bS l clearfix">'
								+'<a href="detail.html?'+str[i].id+'">'
									+'<div class="l">'
										+'<img src="'+that.imgPath+str[i].图片路径+'" alt="" />'
									+'</div>'
									+'<div class="l">'
										+'<h4>'+str[i].品名+'</h4>'
										+'<p>￥<i>'+str[i].本站价+'</i></p>'
									+'</div>'
								+'</a>'
								+'</div>'
								+	'<h5 class="l" addId="'+str[i].id+'" style="display:none">'
								+		'删除'
								+	'</h5>'
							+'</li>'
					}
					$('.browserRecord').find('ul').html(con);
					var startX;
					var EndX;
					$('.browserRecord').find('ul').find('li').on('touchstart',function(e){
						startX=e.touches[0].clientX;
					})
					$('.browserRecord').find('ul').find('li').on('touchmove',function(e){
						endX=e.touches[0].clientX;
					})
					$('.browserRecord').find('ul').find('li').on('touchend',function(e) {
						var oLi=$(this);
						console.log(oLi)
						if(startX-endX>70) {
							console.info('手指左滑动');
							oLi.find('.bS').css('width','85%');
							oLi.find('h5').show();
							oLi.find('h5').on('click',function(){
							
								$.ajax({
									type:"get",
									url:that.urlPath+"/SER/DelFoot",
									async:true,
									data:{
										gid:$(this).attr('addId'),
										userid:localStorage.getItem('id')
									},
									success:function(res){
										console.log(res);	
										if(JSON.parse(res).status==0){
											oLi.hide();
										}else{
											alert(JSON.parse(res).msg)
										}
										
									}
								});
							})
						}
					})
				}
			});
			//清空浏览足迹   有问题都输出移除成功但数据库里没删除
			$('.head').find('h4').on('click',function(){
				$.ajax({
					type:"get",
					url:that.urlPath+"/SeR/DelAllFoot",
					async:true,
					data:{
						userid:localStorage.getItem('id')					
					},
					success:function(res){
						console.log(res)
						var str=res.state;
						if(str==1){
							alert(res.info)
							$('.browserRecord').find('ul').find('li').remove();
						}else{
							alert(str.info)
						}
						
					}
						
				})
			})
		}
	};
	browserRecordObj.init();
})