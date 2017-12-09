$(function(){	
	var homeObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		loadNum:1,
		init:function(){
			this.bindEvent();
			this.scroll();
			this.srcollLoad();
			this.loadData();
			this.countDown();
			this.render();
			$('#foot ul li a').eq(0).addClass('current').parent().siblings().find('a').removeClass('current');
		},
		bindEvent:function(){

		},
		disBg:function(){
			var arr=$('.discount i');
			for(var i=0;i<arr.length;i++){
				if(arr.eq(i).text()=='满减'||arr.eq(i).text()=='多买多优惠'){
					arr.eq(i).css('background','#fa8322');
				}else if(arr.eq(i).text()=='买赠'||arr.eq(i).text()=='秒杀价'){
					arr.eq(i).css('background','#fa22de');
				}else if(arr.eq(i).text()=='会员价'){
					arr.eq(i).css('background','#fa2c11');
				}else if(arr.eq(i).text()=='满赠'){
					arr.eq(i).css('background','#2274fa');
				}else if(arr.eq(i).text()=='限时抢购'){
					var hr=arr.eq(i).parent().parent().attr('href');
					arr.eq(i).css('background','#fa8322').parent().parent().attr('href',hr+'?000');
				}
			};
		},
		scroll:function(){
			$('#view').scroll(function(){
				if($(this).scrollTop()>100){
					$('header').css('background-color','rgba(190,0,16,0.3)')
				}else{
					$('header').css('background','rgba(255,255,255,0)')
				}
			});
		},
		srcollLoad:function(){
			var that=this;
			this.loadData();
			$('#view').scroll(function(){
				var scrollTop = $(this).scrollTop();
		        var scrollHeight = $('#home').height();
		       if (scrollTop+700>scrollHeight) {
		        	that.loadNum++;
					that.loadData();
		       };
			})
		},
		dealDiscount:function(str){
			var result=str.split(',');
			var content='';
			for(var i=0;i<result.length;i++){
				content+='<i>'+result[i]+'</i>'
			}
			return content;
		},
		dealDay:function(dayTime){
			var result=dayTime.replace(/-/g, "/");
			return result;
		},
		countDown:function(){
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetHuodong_time",
				data:{
					type:1
				},
				dataType: "json",
				success:function(res){
					var result=JSON.parse(res.info);
					setInterval(function(){
						var EndTime= new Date(that.dealDay(result[0].startDate)+' '+result[0].endTime+':00'); //截止时间 
						var NowTime = new Date(); 
						var t =EndTime.getTime() - NowTime.getTime(); 
						var h=Math.floor(t/1000/60/60%24); 
						var m=Math.floor(t/1000/60%60); 
						var s=Math.floor(t/1000%60);
						$('.countDown').html(h+':'+m+':'+s);
					},1000);
				}
			})
		},
		loadData:function(){
			//热门爆款
			var that=this;
			$.ajax({
				type:'get',
				url:that.urlPath+'/SER/GetHot',
				data: { 
                	_index:that.loadNum
                },
                dataType: "json",
                success:function(res){
                	var str=JSON.parse(res.info); 
                	var con='';
                	if(that.loadNum==1){
	                	var ban=res.banner;
	                	var banner='';
	                	banner='<h3><img src="'+that.imgPath+ban+'"/></h3>';
	                	$('.floor5').find('.f-title').html(banner);
                	}
                	for(var i=0;i<str.length;i++){
                		con+='<li regtime'+res.regtime+'>'
							+'<a href="pages/detail.html?'+str[i].id+'">'
								+'<div class="picWrapper">'
							    	+'<img src="'+that.imgPath+str[i].图片路径+'" alt="" />'
								+'</div>'
								+'<p class="over2">'+str[i].品名+'</p>'
								+'<div class="discount clearfix">'+that.dealDiscount(str[i].优惠条件)+'</div>'
								+'<div class="price">'
									+'<strong>'
										+'¥<i>'+ str[i].本站价+'</i>'
									+'</strong>'
									+'<del>¥<i>'+str[i].市场价+'</i></del>'
								+'</div>'
							+'</a>'
						+'</li>'
                	}
                	$('.twoColumn').append(con);
                	that.disBg();
                }
			})
		},
		render:function(){
				var that=this;
			//input框的placeholder
				$.ajax({
					url:that.urlPath+"/SeR/GetDefaultWords",
					type:'get',
					data: { 
                    	type:0,
                    	index:1
                    },
                    dataType: "json",
                    success:function(res){
                    	var result=res.info;
                      	$('.search input').attr('placeholder',result);
                    }
				})
			//获取banner图
				$.ajax({
                    url:that.urlPath+"/SER/GetBanner",
                    type:'get',
                    data: { 
                    	type:0,
                    	index:1
                    },
                    dataType: "json",
                    success: function(res) {
                       var result=JSON.parse(res.info);
                       console.log(result);
                       var content='';
                       	for(var i=0;i<result.length;i++){
                       		var urlHref=result[i].url.substring(0,1);
                       		console.log(urlHref);
	                       	if(!isNaN(urlHref)){
	                       		content+= '<li class="swiper-slide" ordernum="' + result[i].ordernum + '" typename="'+ result[i].typename + '" picguid= "'+ result[i].picguid+ '"titleimg="' +result[i].titleimg+ '" fontcolor="' +result[i].fontcolor +'"typeid="' +result[i].typeid+ '">'
										+	'<a href="pages/detail.html?'+result[i].url+'">'
										+	'<img src="'+that.imgPath+result[i].pic+'" alt="" />'
										+	'</a>'
										+'</li>'
	                       	}else{
	                       		content+= '<li class="swiper-slide" ordernum="' + result[i].ordernum + '" typename="'+ result[i].typename + '" picguid= "'+ result[i].picguid+ '"titleimg="' +result[i].titleimg+ '" fontcolor="' +result[i].fontcolor +'"typeid="' +result[i].typeid+ '">'
										+	'<a href="pages/connection.html?'+that.urlPath+result[i].url+'?'+encodeURI(result[i].typename)+'">'
										+	'<img src="'+that.imgPath+result[i].pic+'" alt="" />'
										+	'</a>'
										+'</li>'
	                       	}
                       	}
                       $('.banner ul').html(content);
                       var mySwiper = new Swiper ('.swiper-container', {
						    direction: 'horizontal',
						    loop: true,
						    autoplay:2000,
						    // 如果需要分页器
						    pagination: '.swiper-pagination',
						});
                    }
               });
               //临时活动背景
               $.ajax({
					type:"get",
					url:that.urlPath+"/SeR/GetBacKGruondBanner",
					success:function(result){
						console.log(result);
						if(result.info!=''){
							var res=JSON.parse(result.info)[0];
							$('.modules a').show();
							$('.temporary').attr({'href':res.url,"ordernum": res.ordernum,"typename":res.typename,"picguid":res.picguid,"titleimg":res.titleimg,"fontcolor":res.fontcolor,"typeid":res.typeid});
							$('.modules').css({'background':'url('+that.imgPath+res.pic+') no-repeat','background-size':'100% 100%'})
						}
					}
				})

			//八个活动
			$.ajax({
				url:that.urlPath+'/SER/GetZhuanTi',
				type:'get',
				data: { 
                	type:0,
                	index:1
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	var result=JSON.parse(res.info);
                	var content='';
                	for(var i=0;i<result.length;i++){
                		content+='<li><a href="#classify?1"><img src="'+that.imgPath+result[i].pic +'" alt="" /><p>'+result[i].typename+'</p></a></li>'
                	}
                	$('.modules ul').html(content)
                }
			})
			//秒杀抢购 
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetSeckill",
				async:true,
				data: { 
                	type:0,
                	index:1
                },
                dataType: "json",
                success:function(res){
                	var result=JSON.parse(res.info);
                	var content='';
                	for(var i=0;i<result.length;i++){
                		content+='<li>'
								+'<a href="pages/secKill.html?'+result[i].id+'">'
								+'<div class="picWrapper">'
								+'<img src="'+that.imgPath+result[i].图片路径+'" alt="" /></div>'							
								+'<p class="over2">'+result[i].品名+'</p>'
								+'<strong>'
								+'¥ <i>'+result[i].本站价+'</i>'
								+'</strong>'
								+'<del>¥<i>'+result[i].市场价+'</i></del>'
								+'</a>'
								+'</li>'
                	}
                	$('.slideArea').find('ul').html(content)
                }
			});
//			主题馆上方的广告位
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetAdvertisement",
				async:true,
				data: { 
                	type:0,
                	index:1
                },
                dataType: "json",
                success:function(res){
                	
                	var str=JSON.parse(res.info);
                	var con='';
                	for(var i=0;i<str.length;i++){
//              		$('.adv').eq(i).find(img).css('src',that.imgPath+str[i].pic)
						$('#home').children('.adv').eq(i).find('img').css({'src':that.imgPath+str[i].pic,'url':str[i].url,'name':str[i].name,'ordernum':str[i].ordernum})
                	}
                }
			});
			//楼层广告条
			$.ajax({
				type:'get',
				url:that.urlPath+'/SER/GetAdvertisement',
				dataType: "json",
				success:function(res){
					var result=JSON.parse(res.info);
					var box=[];
					for(var i=0;i<result.length;i++){
						var content	=	'<a class="adv" href="pages/detail.html?'+result[i].url+'" name="'+result[i].name+'" ordernum="'+result[i].ordernum+'">'
								+	'<img src="'+that.imgPath+result[i].pic+'" alt="" />'
								+	'</a>'
						box.push(content);
					};
					//秒杀购下方广告
					$.ajax({
						type:'get',
						url:that.urlPath+'/SER/GetJingBin',
						data: { 
		                	type:0,
		                	index:1
		                },
		                dataType: "json",
		                success:function(res){
		                	var str=JSON.parse(res.info);
		                	var con='';
		                	for(var i=0;i<str.length;i++){
		                		var strs=JSON.parse(str[i].array);
		                		var item='';
								for(var j=0;j<strs.length;j++){
									item+='<a href="pages/detail.html?'+strs[j].url+'" class="l"><img src="'+that.imgPath+strs[j].pic+'" alt="" ordeum="'+strs[j].ordeum+'" typename="'+strs[j].typename+'" picguid="'+strs[j].picguid+'" titleimg="'+strs[j].titleimg+'" fontcolor="'+strs[j].fontcolor+'" typeid="'+strs[j].typeid+'"/></a>'
								}
								if(box[i]){
									con+= box[i]
									+'<div class="floor">'
			                		+'<div class="f-title borD">'
										+'<h3><img src='+that.imgPath+str[i].titleImg+'/></h3>'
									+'</div>'
									+'<div class="production clearfix">'
									+item
									+'</div></div>'
								}else{
									con+='<div class="floor">'
			                		+'<div class="f-title borD">'
										+'<h3><img src='+that.imgPath+str[i].titleImg+'/></h3>'
									+'</div>'
									+'<div class="production clearfix">'
									+item
									+'</div></div>'
								}
		                	}
		                	$('.floorArea').html(con);
		                	$('.floor .production').eq(0).find('a').eq(0).addClass('w50');
		                	$('.floor .production').eq(0).find('a').eq(1).addClass('w50');
		                	var floor=$('.floor .production');
		                	for(var i=1;i<floor.length;i++){
		                		$(floor[i]).children().eq(0).addClass('h160 w40');
			                	$(floor[i]).children().eq(1).addClass('w60');
			                	$(floor[i]).children().eq(2).addClass('w30');
			                	$(floor[i]).children().eq(3).addClass('w30');
			                }
		                }
					})
				}
			})
		}
	};
	homeObj.init();
})
