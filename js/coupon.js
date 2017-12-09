$(function(){
	var couponObj={
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
			$('.couponTabTop').find('h3').on("click",function(){
				var i=$(this).index();
				$(this).addClass('couponBorderShow').siblings().removeClass('couponBorderShow');
				$('.couponTabBottom').children().eq(i).show().siblings().hide();
				that.isEmpty(i);
			})
		},
		isEmpty:function(index){
			console.log($('.couponTabBottom').children().eq(index).find('ul').children());
			if($('.couponTabBottom').children().eq(index).find('ul').children().length==0){
				$('.noResult').show().siblings().hide();
			};
		},
		render:function(){
			var that=this;
			//优惠券
			$.ajax({ //未使用优惠券
				type:"get",
				url:that.urlPath+"/SER/GetMyQuan",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:0
				},
				dataType:"json",
				success:function(res){
					console.log(res.data);
					if(res.data[0]){
					var str=res.data;
					var con='';
						for(var i=0;i<str.length;i++){
							con+='<li class="clearfix fontAll">'
									+'<div class="l couponTabBottomLeft">'
										+'<h2 class="fontAll"><span style="color:#CD0011;font-size:12px;">¥ <span>'+str[i].money+'</h2>'
										+'<h3 class="fontAll">'+str[i].description+'</h3>'
									+'</div>'
									+'<div class="l couponTabBottomCenter fontAll">'
										+'<h5>'
											+'<span class="fontAll">'
												+'生效期：'
											+'</span>'
											+'<em class="fontAll over">'
												+str[i].begin_time
											+'</em>'
										+'</h5>'
										+'<h6>'
											+'<span class="fontAll">'
												+'有效期至：'
											+'</span>'
											+'<em class="fontAll over">'
												+str[i].end_time
											+'</em>'
										+'</h6>'
									+'</div>'
									+'<div class="r couponTabBottomRight">'
										+'<img src="../img/ksy.png" alt="" />'
										
									+'</div>'
								+'</li>'
						}
						$('.couponTabBottom').children().eq(0).show().find('ul').html(con);
					}else{
						that.isEmpty(0);
					}
				}
			});
				$.ajax({ //已使用优惠券
				type:"get",
				url:that.urlPath+"/SER/GetMyQuan",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:3
				},
				dataType:"json",
				success:function(res){
					console.log(res.data);
					if(res.data[0]){
					var str=res.data;
					var con='';
						for(var i=0;i<str.length;i++){
							con+='<li class="clearfix fontAll">'
									+'<div class="l couponTabBottomLeft">'
										+'<h2 class="fontAll"><span style="color:#CD0011;font-size:12px;">¥ <span>'+str[i].money+'</h2>'
										+'<h3 class="fontAll">'+str[i].description+'</h3>'
									+'</div>'
									+'<div class="l couponTabBottomCenter fontAll">'
										+'<h5>'
											+'<span class="fontAll">'
												+'生效期：'
											+'</span>'
											+'<em class="fontAll over">'
												+str[i].begin_time
											+'</em>'
										+'</h5>'
										+'<h6>'
											+'<span class="fontAll">'
												+'有效期至：'
											+'</span>'
											+'<em class="fontAll over">'
												+str[i].end_time
											+'</em>'
										+'</h6>'
									+'</div>'
									+'<div class="r couponTabBottomRight">'
										+'<img src="../img/sy.png" alt="" />'
										
									+'</div>'
								+'</li>'
						}
						$('.couponTabBottom').children().eq(1).find('ul').html(con);
					}
				}
			});
				$.ajax({ //已过期
				type:"get",
				url:that.urlPath+"/SER/GetMyQuan",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:1
				},
				dataType:"json",
				success:function(res){
					console.log(res.data);
					if(res.data[0]){
					var str=res.data;
					var con='';
						for(var i=0;i<str.length;i++){
							con+='<li class="clearfix fontAll">'
									+'<div class="l couponTabBottomLeft">'
										+'<h2 class="fontAll"><span style="color:#CD0011;font-size:12px;">¥ <span>'+str[i].money+'</h2>'
										+'<h3 class="fontAll">'+str[i].description+'</h3>'
									+'</div>'
									+'<div class="l couponTabBottomCenter fontAll">'
										+'<h5>'
											+'<span class="fontAll">'
												+'生效期：'
											+'</span>'
											+'<em class="fontAll over">'
												+str[i].begin_time
											+'</em>'
										+'</h5>'
										+'<h6>'
											+'<span class="fontAll">'
												+'有效期至：'
											+'</span>'
											+'<em class="fontAll over">'
												+str[i].end_time
											+'</em>'
										+'</h6>'
									+'</div>'
									+'<div class="r couponTabBottomRight">'
										+'<img src="../img/gq.png" alt="" />'
										
									+'</div>'
								+'</li>'
						}
						$('.couponTabBottom').children().eq(2).find('ul').html(con)
					}
				}
			});
		}
	};
	couponObj.init();
})