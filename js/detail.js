$(function(){
	var detailObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		spid:null,
		flag:0,
		ms:null,
		state:0,
		buyNum:0,
		username:null,
		loadAENum:1,
		loadGENum:1,
		loadMENum:1,
		loadBENum:1,
		loadSPNum:1,
		init:function(){
			this.bindEvent();
			this.render();
			this.srcollLoad();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.head ul').on('click','li',function(){
				$(this).addClass('detailCurrent').siblings().removeClass('detailCurrent');
				$('.fView .fItem').eq($(this).index()).show().siblings().hide();
			});
			$('.elNav').on('click','dd',function(){
				console.log($('.sView').children());
				$(this).addClass('evalCurrent').siblings().removeClass('evalCurrent');
				that.state=$(this).attr('state');
				$('.sView').children().eq(that.state).show().siblings().hide();
				that.isEmpty(that.state);
			});
			$('.bNBT').find('div').find('span').on('click',function(){
				if(that.buyNum<=1){
					alert('亲!不能再减了')
				}else{
					that.buyNum--;
					$('.bNBT').find('div').find('.checkNum').html(that.buyNum);
				}
			});
			$('.bNBT').find('div').find('em').on('click',function(){
				if(that.buyNum>=parseInt($('.detailName').attr('kcsl'))){
					alert('亲!库存不够了')
				}else{
					that.buyNum++;
					$('.bNBT').find('div').find('.checkNum').html(that.buyNum);
				}
			});
			$('.bNTR').on('click',function(){
				$('.buyNow').hide();
				$('.numShow ').html(that.buyNum);
			});
			//---------------------------------点击+- -----------------------------------------------
			$('.subtract').on('click',function(){
				if(that.buyNum<=1){
					return false;
				}else{
					that.buyNum--;
					$('.numShow').html(that.buyNum);
				};
			});
			$('.add').on('click',function(){
				if(that.buyNum>=parseInt($('.detailName').attr('kcsl'))){
					alert('亲!库存不够了')
				}else{
					that.buyNum++;
					$('.numShow').html(that.buyNum);
				};
			});
			//-------------------点击好评度调到评价页.
			$('.goodRate').on('click',function(){
				$('.head').find('li').eq(2).addClass('detailCurrent').siblings().removeClass('detailCurrent')
				$('.fView .fItem').eq(2).show().siblings().hide();
				
			});
			$('.mui-poppicker').on('click','.mui-poppicker-btn-ok',function(){
				console.log(123);
				var countyid=$('#showCityPicker3').attr('addressid');
				that.hasGoods(countyid);
				console.log(countyid);
			});
//		------------------赠品促销---------------

			$('.zpcxhide').on('click',function(){
				$('.zpcx').addClass('detailHide');
			});
			$('.goBuy').on('click',function(){
				$('.buyNow').show();
				$('.bNTL').find('img').attr('src',that.imgPath+$('.detailName').attr('tplj'));
				$('.bNTC').find('h2').find('em').html($('.detailName').attr('bzj'));
				$('.bNTC').find('h3').find('i').html($('.detailName').attr('kcsl'));
				$('.checkNum').html(that.buyNum);
			});
			$('.bNBB').on('click',function(){
				that.goBuyNow();
			});
			$('.addCart').on('click',function(){
				that.addCart();
			});
		},
		isEmpty:function(param){
			if($('.sView').children().eq(param).children().length==0){
				$('.sView').children().eq(param).hide();
				$('.commentEmpty').show();
			}
		},
		addZero:function(num){
			if(num<10){
				num='0'+num;
			};
			return num;
		},
		hasGoods:function(param){
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/h_user/IsHaveStockByCountyID",
				async:true,
				data:{
					countyid:param,
					pro_ProductId:that.spid
				},
				dataType:"json",
				success:function(res){
					console.log(res.msg);
					$('.address .status').html(res.msg);
				}
			});
		},
		srcollLoad:function(param){
			var that=this;
			this.loadAllEvaluate();
			this.loadGoodEvaluate();
			this.loadMidEvaluate();
			this.loadBadEvaluate();
			this.loadShowPic();
			$('.sView').scroll(function(){
				var scrollTop = $(this).scrollTop();
		       if (scrollTop+$('body').height()>$('.allEvalution').height()&&that.state==0){
		        	if(that.flag==0){
		        		console.log(that.loadNumAll);
		        		that.flag=1;
						that.loadAllEvaluate();
		        	}
		       };
		       if (scrollTop+$('body').height()>$('.goodComment').height()&&that.state==1){
		        	if(that.flag==0){
		        		that.flag=1;
						that.loadGoodEvaluate();
		        	}
		       };
		       if (scrollTop+$('body').height()>$('.midComment').height()&&that.state==2){
		        	if(that.flag==0){
		        		that.flag=1;
						that.loadMidEvaluate();
		        	}
		       };
		       if (scrollTop+$('body').height()>$('.badComment').height()&&that.state==3){
		        	if(that.flag==0){
		        		that.flag=1;
						that.loadBadEvaluate();
		        	}
		       };
		       if (scrollTop+$('body').height()>$('.BuyerShow').height()&&that.state==4){
		        	if(that.flag==0){
		        		that.flag=1;
						that.loadShowPic();
		        	}
		       };
			})
		},
		loadAllEvaluate:function(){
			var that=this;
			$.ajax({
				type:'get',
				url:that.urlPath+"/SeR/GetGoodsCommentByorder",
				async:true,
				data:{
					spid:that.spid,
					current_page:that.loadAENum,
					page_size:10,
					type:-1
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					for(var i=0;i<str.length;i++){
						var star='';
						var photo='';
						for(var j=0;j<str[i].Star;j++){
							star+='<li class="l starWrapper"><img src="../img/star.png" alt="" /></li>';
						}
						if(str[i].pro_productuserCommentpic==[]){
							return;
						}else{
							for(var k=0;k<str[i].pro_productuserCommentpic.length;k++){
								photo+='<a class="fancybox" href="javascript:;" data-fancybox-group="gallery"><img src="'+that.imgPath+str[i].pro_productuserCommentpic[k].Pic+'" alt="" /></a>'
							}
						}
						
						con+='<li class="assessItem">'
								+'<div class="userInfo clearfix">'
									+'<h4 class="over l">'+str[i].UserName+'</h4>'
									+'<div class="level l">'+str[i].LevelName+'</div>'
									+'<div class="upLoadTime r">'+str[i].CreateTime.split("T")[0].split("T")[0]+'</div>'
								+'</div>'
								+'<ul class="starRating clearfix">'
									+star
								+'</ul>'
								+'<p class="wordWrapper">'
									+str[i].Content
								+'</p>'
								+'<div class="upLoadPic">'
									+photo
								+'</div>'
							+'</li>'
					}
					$('.allEvalution').append(con);
					if(that.loadAENum==1&&that.state==0){
						that.isEmpty(that.state);
					};
					that.loadAENum++;
					that.flag=0;
				}
			})
		},
		loadGoodEvaluate:function(){
			var that=this;
			$.ajax({
				type:'get',
				url:that.urlPath+"/SeR/GetGoodsCommentByorder",
				async:true,
				data:{
					spid:that.spid,
					current_page:that.loadGENum,
					page_size:10,
					type:1
				},
				success:function(res){
					var str=JSON.parse(res).data;
					
					var con='';
					
					for(var i=0;i<str.length;i++){
						var star='';
						var photo='';
						for(var j=0;j<str[i].Star;j++){
							star+='<li class="l starWrapper"><img src="../img/star.png" alt="" /></li>';
						}
						if(str[i].pro_productuserCommentpic==[]){
							return;
						}else{
							for(var k=0;k<str[i].pro_productuserCommentpic.length;k++){
								photo+='<a class="fancybox" href="javascript:;" data-fancybox-group="gallery"><img src="'+that.imgPath+str[i].pro_productuserCommentpic[k].Pic+'" alt="" /></a>'
							}
						}
						con+='<li class="assessItem">'
								+'<div class="userInfo clearfix">'
									+'<h4 class="over l">'+str[i].UserName+'</h4>'
									+'<div class="level l">'+str[i].LevelName+'</div>'
									+'<div class="upLoadTime r">'+str[i].CreateTime.split("T")[0].split("T")[0]+'</div>'
								+'</div>'
								+'<ul class="starRating clearfix">'
									+star
								+'</ul>'
								+'<p class="wordWrapper">'
									+str[i].Content
								+'</p>'
								+'<div class="upLoadPic">'
									+photo
								+'</div>'
							+'</li>'
					}
					$('.goodComment').append(con)
					that.loadGENum++;
					that.flag=0;
				}
			})
		},
		loadMidEvaluate:function(){
			var that=this;
			$.ajax({
				type:'get',
				url:that.urlPath+"/SeR/GetGoodsCommentByorder",
				async:true,
				data:{
					spid:that.spid,
					current_page:that.loadMENum,
					page_size:10,
					type:2
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					for(var i=0;i<str.length;i++){
						var star='';
						var photo='';
						for(var j=0;j<str[i].Star;j++){
							star+='<li class="l starWrapper"><img src="../img/star.png" alt="" /></li>';
						}
						if(str[i].pro_productuserCommentpic==[]){
							return;
						}else{
							for(var k=0;k<str[i].pro_productuserCommentpic.length;k++){
								photo+='<a class="fancybox" href="javascript:;" data-fancybox-group="gallery"><img src="'+that.imgPath+str[i].pro_productuserCommentpic[k].Pic+'" alt="" /></a>'
							}
						}
						
						con+='<li class="assessItem">'
								+'<div class="userInfo clearfix">'
									+'<h4 class="over l">'+str[i].UserName+'</h4>'
									+'<div class="level l">'+str[i].LevelName+'</div>'
									+'<div class="upLoadTime r">'+str[i].CreateTime.split("T")[0].split("T")[0]+'</div>'
								+'</div>'
								+'<ul class="starRating clearfix">'
									+star
								+'</ul>'
								+'<p class="wordWrapper">'
									+str[i].Content
								+'</p>'
								+'<div class="upLoadPic">'
									+photo
								+'</div>'
							+'</li>'
					}
					$('.midComment').append(con);
					that.loadMENum++;
					that.flag=0;
				}
			})
		},
		loadBadEvaluate:function(){
			var that=this;
			$.ajax({
				type:'get',
				url:that.urlPath+"/SeR/GetGoodsCommentByorder",
				async:true,
				data:{
					spid:that.spid,
					current_page:that.loadBENum,
					page_size:10,
					type:3
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					for(var i=0;i<str.length;i++){
						var star='';
						var photo='';
						for(var j=0;j<str[i].Star;j++){
							star+='<li class="l starWrapper"><img src="../img/star.png" alt="" /></li>';
						}
						if(str[i].pro_productuserCommentpic==[]){
							return;
						}else{
							for(var k=0;k<str[i].pro_productuserCommentpic.length;k++){
								photo+='<a class="fancybox" href="javascript:;" data-fancybox-group="gallery"><img src="'+that.imgPath+str[i].pro_productuserCommentpic[k].Pic+'" alt="" /></a>'
							}
						}
						
						con+='<li class="assessItem">'
								+'<div class="userInfo clearfix">'
									+'<h4 class="over l">'+str[i].UserName+'</h4>'
									+'<div class="level l">'+str[i].LevelName+'</div>'
									+'<div class="upLoadTime r">'+str[i].CreateTime.split("T")[0].split("T")[0]+'</div>'
								+'</div>'
								+'<ul class="starRating clearfix">'
									+star
								+'</ul>'
								+'<p class="wordWrapper">'
									+str[i].Content
								+'</p>'
								+'<div class="upLoadPic">'
									+photo
								+'</div>'
							+'</li>'
					}
					$('.badComment').append(con);
					that.loadBENum++;
					that.flag=0;
				}
			})
		},
		loadShowPic:function(){
			var that=this;
			$.ajax({
				type:'get',
				url:that.urlPath+"/SeR/GetGoodsCommentByorder",
				async:true,
				data:{
					spid:that.spid,
					current_page:that.loadSPNum,
					page_size:10,
					type:-2
				},
				success:function(res){
					var str=JSON.parse(res).data;
					
					var con='';
					
					for(var i=0;i<str.length;i++){
						var star='';
						var photo='';
						for(var j=0;j<str[i].Star;j++){
							star+='<li class="l starWrapper"><img src="../img/star.png" alt="" /></li>';
						}
						if(str[i].pro_productuserCommentpic==[]){
							return;
						}else{
							for(var k=0;k<str[i].pro_productuserCommentpic.length;k++){
								photo+='<a class="fancybox" href="javascript:;" data-fancybox-group="gallery"><img src="'+that.imgPath+str[i].pro_productuserCommentpic[k].Pic+'" alt="" /></a>'
							}
						}
						
						con+='<li class="assessItem">'
								+'<div class="userInfo clearfix">'
									+'<h4 class="over l">'+str[i].UserName+'</h4>'
									+'<div class="level l">'+str[i].LevelName+'</div>'
									+'<div class="upLoadTime r">'+str[i].CreateTime.split("T")[0].split("T")[0]+'</div>'
								+'</div>'
								+'<ul class="starRating clearfix">'
									+star
								+'</ul>'
								+'<p class="wordWrapper">'
									+str[i].Content
								+'</p>'
								+'<div class="upLoadPic">'
									+photo
								+'</div>'
							+'</li>'
					}
					$('.BuyerShow').append(con);
					that.loadSPNum++;
					that.flag=0;
				}
			})
		},
/*		getData:function(){
			var hr=window.location.href;
			this.spid=hr.split[1];
			this.ms=hr.split[2];
		},*/
		render:function(){
			/*this.getData();*/
			var that=this;
			//秒杀商品的优惠条件和秒杀的区别qid
			var hr=window.location.href;
			this.spid=hr.split('?')[1];
			this.ms=hr.split('?')[2];
			this.username=localStorage.getItem('username');
			//是否有优惠条件
			this.buyNum=Number($('.numShow').html());
			$.ajax({  //检查完好
					type:"get",
					url:that.urlPath+"/SER/GetSPYouHui",
					async:true,
					data:{
						spid:that.spid
					},
					success:function(res){
						console.log(res);
						$('.priceLabel').children().css('display','none')
							var str=JSON.parse(res.info);
							var con='';//获取属性值
							var num=[];//获取属性
							var content="";//生成优惠
							var contents='';//一个优惠有可能有多个商品
							var contentss='';//点击优惠弹出来的详情
							if(str.满减.length!=0){
								for(var i=0;i<str.满减.length;i++){
									contents+=str.满减[i].j_title;
								}
								content+='<div class="promotionalGifts  fontAll clearfix">'
										+	'<h2 class="fontAll l">促销'
										+		'<span class="fontAll"> 满减</span>'
										+    '</h2>'
										+	'<p  class="fontAll l over">'+contents+'</p>'
										+'</div>'
									contents='';
							}else{
								$('.promotionalGifts').eq(0).hide();
							};
							if(str.满赠.length!=0){
								for(var i=0;i<str.满赠.length;i++){
									contents+=str.满赠[i].品名;
								}
								content+='<div class="promotionalGifts  fontAll clearfix">'
										+	'<h2 class="fontAll l">促销'
										+		'<span class="fontAll"> 满赠</span>'
										+    '</h2>'
										+	'<p  class="fontAll l over">'+contents+'</p>'
										+'</div>'
									contents='';
							}else{
								$('.promotionalGifts').eq(1).hide();
							};
							if(str.加价购.length!=0){
								for(var i=0;i<str.加价购.length;i++){
									contents+=str.加价购[i].品名;
								}
								content+='<div class="promotionalGifts  fontAll clearfix">'
										+	'<h2 class="fontAll l">促销'
										+		'<span class="fontAll"> 加价购</span>'
										+    '</h2>'
										+	'<p  class="fontAll l over">'+contents+'</p>'
										+'</div>'
									contents='';
							}else{
								$('.promotionalGifts').eq(2).hide();
							};
							if(str.赠品.length!=0){
								for(var i=0;i<str.赠品.length;i++){
									contents+=str.赠品[i].品名;
								}
								content+='<div class="promotionalGifts  fontAll clearfix">'
										+	'<h2 class="fontAll l">促销'
										+		'<span class="fontAll"> 赠品</span>'
										+    '</h2>'
										+	'<p  class="fontAll l over">'+contents+'</p>'
										+'</div>'
									contents='';
							}else{
								$('.promotionalGifts').eq(3).hide();
							};
							$('.youhui').html(content);	
							$('.promotionalGifts').on('click',function(){
								
								if($.trim($(this).find('span').html())=='赠品'){
									$('.zpcx').removeClass('detailHide');
									for(var i=0;i<str.赠品.length;i++){
										contentss+='<dl class="clearfix">'
										+		'<dt class="l">'
										+			'<img src="'+that.imgPath+str.赠品[i].图片路径+'" alt="" />'
										+		'</dt>'
										+		'<dd class="l">'
										+			str.赠品[i].品名
										+		'</dd>'
										+	'</dl>'		
									}
									$('.zpcxB').find('div').html(contentss);
									contentss='';
								}
								if($.trim($(this).find('span').html())=='满赠'){
								$('.zpcx').removeClass('detailHide');
									for(var i=0;i<str.满赠.length;i++){
										contentss+='<dl class="clearfix">'
										+		'<dt class="l">'
										+			'<img src="'+that.imgPath+str.满赠[i].图片路径+'" alt="" />'
										+		'</dt>'
										+		'<dd class="l">'
										+			str.满赠[i].品名
										+		'</dd>'
										+	'</dl>'		
									}
									$('.zpcxB').find('div').html(contentss);
									contentss='';
								}
								if($.trim($(this).find('span').html())=='加价购'){
								
								}
								if($.trim($(this).find('span').html())=='满减'){
									
								}
								$('.zpcxhide').on('click',function(){
									$('.zpcx').addClass('detailHide');
								})
							})
					}
				})
			if(!isNaN(that.ms)){
				//秒杀商品详情
					$('.putong').show();
					/*console.log(url,ms,localStorage.getItem('id'));*/
					$.ajax({
					type:"get",
					url:that.urlPath+"/SeR/GetMSGoods",
					async:true,
					data:{
						spid:that.spid,
						pid:that.ms, //如果是从秒杀列表进去的,就传pid,如果不是就传0;
						user_id:localStorage.getItem('id')
					},
					success:function(res){
						if(res.state==0){
							alert(res.info)
						}else{
							var str=JSON.parse(res.info)[0];//商品详情
							var img=JSON.parse(res.imgs);
							//外联页面
							$('.detailsPic').load(that.urlPath+str.detail_url,null,function(){})
							for(var i=0;i<img.length;i++){
								var oLi=$('<li class="l swiper-slide"></li>')
								$('.detailBanner').find('ul').append(oLi)
							}
							
							for(var i=0;i<img.length;i++){//商品图片详情
								$('.detailBanner').find('li').eq(i).css({'background':'url('+that.imgPath+img[i].图片路径+') no-repeat',"background-size":'100%'})
							}
 							var mySwiper = new Swiper ('.swiper-container', {
							    direction: 'horizontal',
							    loop: true,
							    autoplay:2000,
							    // 如果需要分页器
							    pagination: '.swiper-pagination',
							});
							$('.detailName').html(str.品名);
							$('.detailName').attr({'kcsl':str.库存数量,'xgsl':str.限购数量,'fxl':str.分销率,'IsShow':str.IsShow,'sfsj':str.是否上架,'lx':str.类型,'critical_value':str.critical_value,'yunfei':str.是否卖家承担运费,'regtime':str.regtime,'tpbt':str.图片标题,'tplj':str.图片路径,'tpxh':str.图片序号,'ms':str.描述,'tedian':str.特点,'zysx':str.注意事项,'zzzm':str.资质证明,'ppjs':str.品牌介绍,'spxq':str.商品详情,'spbq':str.商品标签,'SEOkeywords':str.SEOkeywords,'SEODescription':str.SEODescription,'changzhi':str.厂址,'bzfs':str.包装方式,'changming':str.厂名,'ccff':str.储藏方法,'jhl':str.净含量,'dushu':str.度数,'xx':str.香型,'xxmc':str.系列名称,'ssch':str.适用场合,'bbcz':str.包装材质,'scnf':str.生产年份,'spcd':str.商品产地,'xgrd':str.选购热点,'tiaoma':str.条码,'sfkp':str.是否开票,'yyfw':str.运营范围,'dpzxs':str.多瓶装销售,'ProductId':str.ProductId,'sfby':str.是否包邮,'xjzq':str.小酒专区,'islimit':str.islimit,'limitprice':str.limitprice})
							$('.miaoshu').html(str.描述)	;
							$('.miaosha').find('div').eq(0).find('span').html(str.本站价)
							$('.miaosha').find('div').eq(1).find('del').html(str.市场价)
	//						$('.promotionalGifts').find('p').html() //促销赠品
							if(str.手提袋说明==''){
								$('.prompt').hide()
							}else{
								$('.promptContent').html(str.手提袋说明)
							}
							
							if(str.是否使用电子券==false){
								$('.noCon').html('不可使用优惠券').parent().hide();
							}else{
								$('.noCon').html(str.是否使用电子券);
							}
							if(str.仅限在线支付==false){
								$('.payment').hide();
							}else{
								$('.method').html(str.仅限在线支付);
							}
							$('.personNum').find('i').html(str.评论数);
							$('.goodRate').find('i').html(str.好评);
							$('.photoDetail').html(+that.urlPath+res.detail_url)
			
							if(res.shouchang==0){
								$('.sC').eq(res.shouchang).removeClass('fontHide').siblings().addClass('fontHide')
								
							}else if(res.shouchang==1){
								$('.sC').eq(res.shouchang).removeClass('fontHide').siblings().addClass('fontHide')
							}
							var remain_time=res.remain_time;
							setInterval(function(){
								remain_time--;
								var h=that.addZero(parseInt(Math.floor(remain_time/60/60%24))); 
								var m=that.addZero(parseInt(Math.floor(remain_time/60%60))); 
								var s=that.addZero(parseInt(Math.floor(remain_time%60)));
								$('.putong').find('em').html(h+':'+m+':'+s);
							},1000);
						}
						
					}
				});
			}else{
			
				$('.putong').hide();
				
				//普通商品详情
				$.ajax({
					type:"get",
					url:that.urlPath+"/SER/GetkillGoods",
					async:true,
					data:{
						user_id:function(){
							if(localStorage.getItem('id')){
								return localStorage.getItem('id');
							}else{
								return '';
							}
						},
						bh:that.spid
					},
					success:function(res){
						if(res.state==0){
							alert(res.info)
						}else{
							var str=JSON.parse(res.info)[0];//商品详情
							var img=JSON.parse(res.imgs);
							var con='';
							//外联页面
							$('.detailsPic').load(that.urlPath+str.detail_url,null,function(){
								
								})
							for(var i=0;i<img.length;i++){
								var oLi=$('<li class="l swiper-slide"></li>')
								$('.detailBanner').find('ul').append(oLi)
							}
							
							for(var i=0;i<img.length;i++){//商品图片详情
								$('.detailBanner').find('li').eq(i).css({'background':'url('+that.imgPath+img[i].图片路径+') no-repeat',"background-size":'100%'})
							}
 							var mySwiper = new Swiper ('.swiper-container', {
							    direction: 'horizontal',
							    loop: true,
							    autoplay:2000,
							    // 如果需要分页器
							    pagination: '.swiper-pagination',
							});
							
							$('.detailName').html(str.品名);
							$('.detailName').attr({'kcsl':str.库存数量,'bzj':str.本站价,'xgsl':str.限购数量,'fxl':str.分销率,'IsShow':str.IsShow,'sfsj':str.是否上架,'lx':str.类型,'critical_value':str.critical_value,'yunfei':str.是否卖家承担运费,'regtime':str.regtime,'tpbt':str.图片标题,'tplj':str.图片路径,'tpxh':str.图片序号,'ms':str.描述,'tedian':str.特点,'zysx':str.注意事项,'zzzm':str.资质证明,'ppjs':str.品牌介绍,'spxq':str.商品详情,'spbq':str.商品标签,'SEOkeywords':str.SEOkeywords,'SEODescription':str.SEODescription,'changzhi':str.厂址,'bzfs':str.包装方式,'changming':str.厂名,'ccff':str.储藏方法,'jhl':str.净含量,'dushu':str.度数,'xx':str.香型,'xxmc':str.系列名称,'ssch':str.适用场合,'bbcz':str.包装材质,'scnf':str.生产年份,'spcd':str.商品产地,'xgrd':str.选购热点,'tiaoma':str.条码,'sfkp':str.是否开票,'yyfw':str.运营范围,'dpzxs':str.多瓶装销售,'ProductId':str.ProductId,'sfby':str.是否包邮,'xjzq':str.小酒专区,'islimit':str.islimit,'limitprice':str.limitprice})
							$('.miaoshu').html(str.描述)	;
							$('.miaosha').find('div').eq(0).find('span').html(str.本站价)
							$('.miaosha').find('div').eq(1).find('em').html(str.市场价)
	//						$('.promotionalGifts').find('p').html() //促销赠品
							if(str.手提袋说明==''){
								$('.prompt').hide()
							}else{
								$('.promptContent').html(str.手提袋说明)
							}
							
							if(str.是否使用电子券==false){
								$('.noCon').html('不可使用优惠券').parent().hide();
							}else{
								$('.noCon').html(str.是否使用电子券);
							}
							if(str.仅限在线支付==false){
								$('.payment').hide();
							}else{
								$('.method').html(str.仅限在线支付);
							}
							
							if(res.shouchang==0){
								$('.sC').eq(res.shouchang).removeClass('fontHide').siblings().addClass('fontHide')
								
							}else if(res.shouchang==1){
								$('.sC').eq(res.shouchang).removeClass('fontHide').siblings().addClass('fontHide')
							}
							$('.personNum').find('i').html(str.评论数);
							$('.goodRate').find('i').html(str.好评);
							$('.photoDetail').html(+that.urlPath+res.detail_url);
							$('del').parent().hide();
						}
					}
				});
			}
			//商品评价左边
			$.ajax({
				type:'get',
				url:that.urlPath+"/SeR/GetGoodsCommentByorder",
				async:true,
				data:{
					spid:that.spid,
					current_page:1,
					page_size:10,
					type:-1
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					for(var i=0;i<str.length;i++){
						var star='';
						var photo='';
						for(var j=0;j<str[i].Star;j++){
							star+='<li class="l starWrapper"><img src="../img/star.png" alt="" /></li>';
						}
						if(str[i].pro_productuserCommentpic==[]){
							return;
						}else{
							for(var k=0;k<str[i].pro_productuserCommentpic.length;k++){
								photo+='<a class="fancybox" href="javascript:;" data-fancybox-group="gallery"><img src="'+that.imgPath+str[i].pro_productuserCommentpic[k].Pic+'" alt="" /></a>'
							}
						}
						
						con+='<li class="assessItem">'
								+'<div class="userInfo clearfix">'
									+'<h4 class="over l">'+str[i].UserName+'</h4>'
									+'<div class="level l">'+str[i].LevelName+'</div>'
									+'<div class="upLoadTime r">'+str[i].CreateTime.split("T")[0]+'</div>'
								+'</div>'
								+'<ul class="starRating clearfix">'
									+star
								+'</ul>'
								+'<p class="wordWrapper">'
									+str[i].Content
								+'</p>'
								+'<div class="upLoadPic">'
									+photo
								+'</div>'
							+'</li>'
					}
					$('.assess').find('ul').html(con)
				}
			})
				//商品评价右面
			//商品评论数量(好评,中评,差评)
			console.log(that.spid);
			$.ajax({
				type:"get",
				url:that.urlPath+"/h_user/good_comment_num",
				async:true,
				data:{
					spid:that.spid
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var zi=str[0].general_num+str[0].satisfied_num;
					var mu=str[0].unsatisfied_num+str[0].general_num+str[0].satisfied_num;
					var num=zi/mu;
					
					if(JSON.parse(res).status==0){
//						$('.assTitle').find('.personNum').find('i').html(str[0].unsatisfied_num+str[0].general_num+str[0].satisfied_num);
//						if(str[0].unsatisfied_num==0){
//							$('.goodRate').find('i').html('100%')
//						}else{
//							$('.goodRate').find('i').html(+num.toFixed(2)*100+'%')
//						}
						$('.elNav').find('dd').eq(0).find('p').html(str[0].unsatisfied_num+str[0].general_num+str[0].satisfied_num)
						$('.elNav').find('dd').eq(1).find('p').html(str[0].satisfied_num)
						$('.elNav').find('dd').eq(2).find('p').html(str[0].general_num)
						$('.elNav').find('dd').eq(3).find('p').html(str[0].unsatisfied_num)
						$('.elNav').find('dd').eq(4).find('p').html(str[0].sunnum)
					}else{
						alert(JSON.parse(res).msg)
					}
				}
			});
			//好评评
			//中评
			//差评
			//晒图
			//秒杀详情
			//点击查看更多
			$('.seeMoreComment').on('click',function(){
				$('.head').find('ul').find('li').eq(2).addClass('detailCurrent').siblings().removeClass('detailCurrent')
				$('.fView .fItem').eq(2).show().siblings().hide();
			})
		
			
			//添加商品到浏览足迹
			
				$.ajax({
					type:'get',
					url:that.urlPath+'/SER/AddFoot',
					data:{
						userid:function(){
							if(localStorage.getItem('id')){
								return localStorage.getItem('id');
							}else{
								return '';
							}
						},
						gid:that.spid
					},
					success:function(res){
						
					}
				})
			
			//购物车总数目
			
				$.ajax({
					type:'get',
					url:that.urlPath+'/SER/GetCarNum',
					data:{
						user_id:localStorage.getItem('WP_id')
					},
					success:function(res){
						
						$('.fnNav').find('li').eq(0).find('h2').html(res.num)
					}
				})
		
			//立即购买
			//添加或移除商品收藏
			$('.sC').on('click',function(){
				var index=$(this).index();
				var thisBtn=$(this);
				if(!localStorage.getItem('id')){
					alert('请先登录');
				}else{
					if(index==0){
						$.ajax({
							type:'get',
							url:that.urlPath+'/SER/AddCollection',
							data:{
								userid:localStorage.getItem('id'),
								gid:that.spid
							},
							success:function(ress1){
								
								thisBtn.addClass('fontHide').siblings().removeClass('fontHide')
								
							}
						})
					}else{
						$.ajax({
							type:'get',
							url:that.urlPath+'/SER/DelCollection',
							data:{
								userid:localStorage.getItem('id'),
								gid:that.spid
							},
							success:function(ress){
								thisBtn.addClass('fontHide').siblings().removeClass('fontHide')								
							}
						})				
					}
				}
			});
			//获取默认地址
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/addresslist",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id')
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var address="";
					for(var i=0;i<str.length;i++){
						if(str[i].is_default==1){
							address=str[i].province+' '+str[i].city+' '+str[i].area;
							$('#showCityPicker3').html(address).attr({'addressid':str[i].rgn_CountyID});
							break;
						}
					};
					/*if(address!=""){
						that.hasGoods(str[i].rgn_CountyID)
					};*/
				}
			});
		},
		goBuyNow:function(){
			var that=this;
		if(that.username){//登陆时立即购买
			if(that.ms){//秒杀时立即购买
					$.ajax({
						type:'get',
						url:that.urlPath+'/SeR/AddCartBuyNow',
						data:{
							userid:localStorage.getItem('id'),
							gid:that.spid,
							num:$('.numShow').html(),
							act:'限时抢购',
							protype:0,
							actid:that.ms,
							remark:'限时抢购'
						},
						success:function(res){
							if(res.state==1){
								var zeng_ping='';
								var xin_zeng='';
								var man_zeng='';
								if(res.zeng_ping!=''){
									var res_zp=JSON.parse(res.zeng_ping);
									for(var i=0;i<res.zeng_ping;i++){
										zeng_ping	+=	'<li data-id="'+res_zp[i].id+'" class="clearfix">'
													+		'<img src="'+that.imgPath+res_zp[i].图片路径+'" class="l" alt="" />'
													+   	'<div class="l moR">'
													+    		'<p class="over2"><span>【赠品】</span><i>'+res_zp[i].品名+'</i></p>'
													+    		'<div class="giftsNum">X <i>'+res_zp[i].数量+'</i></div>'
													+   	'</div>'
													+	'</li>'
									}
								};
								if(res.xin_zeng!=''){
									var res_xz=JSON.parse(res.xin_zeng);
									for(var i=0;i<res_xz;i++){
		                				xin_zeng	+=	'<li data-id="'+res_xz[i].id+'" class="clearfix">'
			        								+		'<img src="'+that.imgPath+res_xz[i].图片路径+'" class="l" alt="" />'
													+		'<div class="l moR">'
													+			'<p class="over2"><span>【新会员】</span>'+res_xz[i].品名+'</i></p>'
													+			'<div class="giftsNum">X <i>'+res_xz[i].数量+'</i></div>'
													+		'</div>'
													+	'</li>'
									}
								};
								if(res.man_zeng!=''){
									var res_mz=JSON.parse(res.man_zeng);
									for(var i=0;i<res_mz;i++){
		                				man_zeng	+=	'<li data-id="'+res_mz[i].id+'" class="clearfix">'
			        								+		'<img src="'+that.imgPath+res_mz[i].图片路径+'" class="l" alt="" />'
													+		'<div class="l moR">'
													+			'<p class="over2"><span>【新会员赠】</span>'+res_mz[i].品名+'</i></p>'
													+			'<div class="giftsNum">X <i>'+res_mz[i].数量+'</i></div>'
													+		'</div>'
													+	'</li>'
									}
								}
								var content	= '<div class="goodsInfo clearfix">'
											+   	'<a class="goodsContent l"><img src="'+$('.bNTL img').attr('src')+'" alt="" class="l" />'
											+    		'<div class="gc-r l">'
											+	    		'<h4 class="over2">'+$('.detailName').text()+'</h4>'
											+     			'<div class="conBottom clearfix">'
											+      				'<div class="con-l l">'
											+       				'<div class="salesPromotion"></div>'
											+       				'<strong>&yen;<i>'+$('.bzPrice').text()+'</i></strong>'
											+      				'</div>'
											+     				'<div class="numController l clearfix">'
											+       				'<div class="subtract l">-</div>'
											+       				'<div class="numShow l">'+res.total_num+'</div>'
											+       				'<div class="add l" stock="747">+</div>'
											+      				'</div>'
											+     			'</div>'
											+   		'</div>'
											+    	'</a>'
											+ '</div>'
											+ '<div class="discountDes clearfix">'
											+ 		'<p class="l"></p>'
											+ '</div>'
											+ '<div class="incidental">'
											+   	'<ul class="fullGifts">'+man_zeng+'</ul>'
											+   	'<ul class="gifts">'+zeng_ping+'</ul>'
											+   	'<ul class="addPrice">'+xin_zeng+'</ul>'
											+ '</div>'
											+'<ul class="zeng">'+xin_zeng+'</ul>'
								localStorage.setItem('arryspid',res.cartid);
								localStorage.setItem('cartid',that.spid);
								localStorage.setItem('fillOrder',content);
								window.location.href='fillOrder.html';
							}
						}
					})
			}else{
				$('.bNBB').on('click',function(){
					$.ajax({//普通商品立即购买
						type:'get',
						url:that.urlPath+'/SeR/AddCartBuyNow',
						data:{
							userid:localStorage.getItem('id'),
							gid:that.spid,
							num:$('.numShow').html(),
							act:'普通购买',
							protype:0,
							actid:0
						},
						success:function(res){
							var zeng_ping='';
								var xin_zeng='';
								var man_zeng='';
								if(res.zeng_ping!=''){
									var res_zp=JSON.parse(res.zeng_ping);
									for(var i=0;i<res.zeng_ping;i++){
										zeng_ping	+=	'<li data-id="'+res_zp[i].id+'" class="clearfix">'
													+		'<img src="'+that.imgPath+res_zp[i].图片路径+'" class="l" alt="" />'
													+   	'<div class="l moR">'
													+    		'<p class="over2"><span>【赠品】</span><i>'+res_zp[i].品名+'</i></p>'
													+    		'<div class="giftsNum">X <i>'+res_zp[i].数量+'</i></div>'
													+   	'</div>'
													+	'</li>'
									}
								};
								if(res.xin_zeng!=''){
									var res_xz=JSON.parse(res.xin_zeng);
									for(var i=0;i<res_xz;i++){
		                				xin_zeng	+=	'<li data-id="'+res_xz[i].id+'" class="clearfix">'
			        								+		'<img src="'+that.imgPath+res_xz[i].图片路径+'" class="l" alt="" />'
													+		'<div class="l moR">'
													+			'<p class="over2"><span>【新会员】</span>'+res_xz[i].品名+'</i></p>'
													+			'<div class="giftsNum">X <i>'+res_xz[i].数量+'</i></div>'
													+		'</div>'
													+	'</li>'
									}
								};
								if(res.man_zeng!=''){
									var res_mz=JSON.parse(res.man_zeng);
									for(var i=0;i<res_mz;i++){
		                				man_zeng	+=	'<li data-id="'+res_mz[i].id+'" class="clearfix">'
			        								+		'<img src="'+that.imgPath+res_mz[i].图片路径+'" class="l" alt="" />'
													+		'<div class="l moR">'
													+			'<p class="over2"><span>【新会员赠】</span>'+res_mz[i].品名+'</i></p>'
													+			'<div class="giftsNum">X <i>'+res_mz[i].数量+'</i></div>'
													+		'</div>'
													+	'</li>'
									}
								}
								var content	= '<div class="goodsInfo clearfix">'
											+   	'<a class="goodsContent l"><img src="'+$('.bNTL img').attr('src')+'" alt="" class="l" />'
											+    		'<div class="gc-r l">'
											+	    		'<h4 class="over2">'+$('.detailName').text()+'</h4>'
											+     			'<div class="conBottom clearfix">'
											+      				'<div class="con-l l">'
											+       				'<div class="salesPromotion"></div>'
											+       				'<strong>&yen;<i>'+$('.bzPrice').text()+'</i></strong>'
											+      				'</div>'
											+     				'<div class="numController l clearfix">'
											+       				'<div class="subtract l">-</div>'
											+       				'<div class="numShow l">'+res.total_num+'</div>'
											+       				'<div class="add l" stock="747">+</div>'
											+      				'</div>'
											+     			'</div>'
											+   		'</div>'
											+    	'</a>'
											+ '</div>'
											+ '<div class="discountDes clearfix">'
											+ 		'<p class="l"></p>'
											+ '</div>'
											+ '<div class="incidental">'
											+   	'<ul class="fullGifts">'+man_zeng+'</ul>'
											+   	'<ul class="gifts">'+zeng_ping+'</ul>'
											+   	'<ul class="addPrice">'+xin_zeng+'</ul>'
											+ '</div>'
											+'<ul class="zeng">'+xin_zeng+'</ul>'
								localStorage.setItem('arryspid',res.cartid);
								localStorage.setItem('cartid',that.spid);
								localStorage.setItem('fillOrder',content);
								window.location.href='fillOrder.html';
							}
						})
					})
				}
			}else{
				alert('亲!还未登陆,先登录吧')
				window.location.href="login.html";
			}
		},
		addCart:function(){
			var that=this;
			if(that.username){//登陆时添加购物车
				if(that.ms){//秒杀时添加购物车
					$.ajax({
						type:'get',
						url:that.urlPath+'/SeR/AddCart',
						data:{
							userid:localStorage.getItem('id'),
							gid:that.spid,
							num:$('.numShow').html(),
							act:'限时抢购',
							protype:0,
							actid:that.ms,
							remark:'限时抢购'
						},
						success:function(res){
							if(res.state==1){
								alert(res.info)
								//购物车总数目
								//点加入购物车获取一次总数目
								$.ajax({
									type:'get',
									url:that.urlPath+'/SER/GetCarNum',
									data:{
										user_id:localStorage.getItem('WP_id')
									},
									success:function(res){
										$('.fnNav').find('li').eq(0).find('h2').html(res.num)
									}
								})
							}else{
								alert(res.info)
							}
							
						}
					})
				}else{
					$.ajax({//普通时添加购物车
						type:'get',
						url:that.urlPath+'/SeR/AddCart',
						data:{
							userid:localStorage.getItem('id'),
							gid:that.spid,
							num:$('.numShow').html(),
							act:'普通购买',
							protype:0,
							actid:0
						},
						success:function(res){
							if(res.state==1){
								alert(res.info)
								//购物车总数目
									//点加入购物车获取一次总数目
									$.ajax({
										type:'get',
										url:that.urlPath+'/SER/GetCarNum',
										data:{
											user_id:localStorage.getItem('WP_id')
										},
										success:function(res){
											$('.fnNav').find('li').eq(0).find('h2').html(res.num)
										}
									})
							}else{
								alert(res.info)
							}
							
						}
					})
				}
			}else{//未登陆添加购物车调到登陆页面
				alert('亲!还未登陆,先登录吧')
				window.location.href="login.html"; 
			}
		},
	};
	detailObj.init();
})