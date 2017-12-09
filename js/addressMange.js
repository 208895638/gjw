$(function(){
	var addressMangeObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var sign=window.location.href.split("?")[1];
			console.log(sign);
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('ul').on('click','.selectInfo',function(){
				if(sign){
					var address_id=$(this).parents('li').attr('address_id');
					console.log(address_id);
					localStorage.setItem('address_id',address_id);
					window.location.href="fillOrder.html";
				}
			});
			$('h6 a').on('click',function(){
				if(sign){
					window.location.href="receivingAddress.html?#";
				}else{
					window.location.href="receivingAddress.html"
				};
			})
		},
		render:function(){
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/addresslist",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id')
				},
				success:function(res){
					console.log(res);
					var str=JSON.parse(res).data;
					var con='';
					var hide='';
					var isSign='';
					if(JSON.parse(res).status==0){
						if(window.location.href.split("?")[1]){
							isSign='?#';
						};
						for(var i=0;i<str.length;i++){
							if(str[i].is_default==1){
								con+='<li class="clearfix" phone="'+str[i].phone+'" contact="'+str[i].contact+'" province="'+str[i].province+'" city="'+str[i].city+'" area="'+str[i].area+'" address="'+str[i].address+'" address_id="'+str[i].id+'">'
								+   '<div class="l clearfix ">'
								+	'<h2 class="clearfix ">'
								+		'<p class="l clearfix selectInfo">'
								+			'<span class="l">'+str[i].contact+' </span>'
								+			'<em class="l">'+str[i].phone+' </em>'
								+			'<i class="l defaultAddress" isdefault="'+str[i].is_default+'">默认</i>'
								+		'</p>'	
								+		'<a class="r" href="receivingAddress.html?'+encodeURI(str[i].province+str[i].city+str[i].area)+'?'+encodeURI(str[i].contact)+'?'+str[i].phone+'?'+encodeURI(str[i].address)+'?'+str[i].rgn_CountyID+'?'+str[i].is_default+'?'+str[i].id+isSign+'">'
								+			'<img src="../img/dzgl_bj@2x.png" alt="" />'
								+		'</a>'						
								+	'</h2>'
								+	'<h3 class="selectInfo">'
								+		str[i].province+str[i].city+str[i].area
								+	'</h3>'
								+	'<h4 class="selectInfo">'
								+		str[i].address
								+	'</h4>'
								+	'</div>'
								+	'<h5 class="l" addId="'+str[i].id+'" style="display:none">'
								+		'删除'
								+	'</h5>'
								+'</li>'
							}else{
								con+='<li class="clearfix" phone="'+str[i].phone+'" contact="'+str[i].contact+'" province="'+str[i].province+'" city="'+str[i].city+'" area="'+str[i].area+'" address="'+str[i].address+'" address_id="'+str[i].id+'">'
								+   '<div class="l clearfix">'
								+	'<h2 class="clearfix">'
								+		'<p class="l clearfix selectInfo">'
								+			'<span class="l">'+str[i].contact+' </span>'
								+			'<em class="l">'+str[i].phone+' </em>'
								+		'</p>'	
								+		'<a class="r" href="receivingAddress.html?'+encodeURI(str[i].province+str[i].city+str[i].area)+'?'+encodeURI(str[i].contact)+'?'+str[i].phone+'?'+encodeURI(str[i].address)+'?'+str[i].rgn_CountyID+'?'+str[i].is_default+'?'+str[i].id+isSign+'">'
								+			'<img src="../img/dzgl_bj@2x.png" alt="" />'
								+		'</a>'						
								+	'</h2>'
								+	'<h3 class="selectInfo">'
								+		str[i].province+str[i].city+str[i].area
								+	'</h3>'
								+	'<h4 class="selectInfo">'
								+		str[i].address
								+	'</h4>'
								+	'</div>'
								+	'<h5 class="l" addId="'+str[i].id+'" style="display:none">'
								+		'删除'
								+	'</h5>'
								+'</li>'
							}
							
						}
						$('.addressMange').find('ul').html(con);
						var content=$('.defaultAddress');
						console.log(content,typeof(content))						
						var startX;
						var endX;
						$('.addressMange').find('ul').find('li').on('touchstart',function(e){
							startX=e.touches[0].clientX;
						})
						$('.addressMange').find('ul').find('li').on('touchmove',function(e){
							endX=e.touches[0].clientX;
						})
						$('.addressMange').find('ul').find('li').on('touchend',function(e) {
							var oLi=$(this);
							console.log(oLi)
							if(startX-endX>100) {
								console.info('手指左滑动');
								oLi.find('div').css('width','85%');
								oLi.find('h5').show();
								oLi.find('h5').on('click',function(){
									$.ajax({
										type:"get",
										url:that.urlPath+"/SER/addressDel",
										async:true,
										data:{
											addrid:$(this).attr('addId'),
											userid:localStorage.getItem('id')
										},
										success:function(res){
											console.log(res);	
											if(JSON.parse(res).status==0){
												oLi.hide();
											}else{
												JSON.parse(res).msg
											}
											
										}
									});
								})
							}else{
								oLi.find('div').css('width','100%');
								oLi.find('h5').hide();
							}
						})
					}else{
						alert(JSON.parse(res).msg)
					}
				}
			});
		}
	};
	addressMangeObj.init();
})



