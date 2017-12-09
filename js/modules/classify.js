$(function(){
	var classifyObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.borderColor();
			this.render();
			$('#foot ul li a').eq(1).addClass('current').parent().siblings().find('a').removeClass('current');
			$('.index_bot').eq(0).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(2).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(3).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(1).find("img").eq(1).show().siblings().hide();
		},
		bindEvent:function(){
			var url=Number(window.location.hash.substring(10,11));
//			console.log(url,window.location.hash)
			$('.menu li').eq(url).addClass('selected').siblings().removeClass('selected');
			$('.c-content dl').eq(url).show().siblings().hide();
			$('.menu li').on('click',function(){
				var tex=$(this).html();
				console.log(tex);
				$(this).siblings().removeClass('selected');
				$(this).addClass('selected');
				$('.c-content dl').eq($(this).index()).show().siblings().hide();
				
			})
			$('.c-more').on('click',function(){
				if($(this).attr('state')==0){
					$(this).parent().next().css({'height':'250px'});
					$(this).attr('state',1)
				}else{
					$(this).parent().next().css({'height':'auto'});
					$(this).attr('state',0)
				}
			})
		},
		borderColor:function(){
			var cn=$('.c-name');
			for(var i=0;i<cn.length;i++){
				$(cn[i]).css('border-left-color','#'+Math.floor(Math.random()*16777215).toString(16))
			}		
		},
		render:function(){
			
			var that=this;
	
			//二级分类品牌和属性
			//白酒Ajax
				$.ajax({
					url:that.urlPath+"/SER/GetAllTypeBandAndAttr",
					type:'get',
					data: { 
                    	c_no:'白酒'
                    },
                    dataType: "json",
                    success:function(res){
                    	var str=JSON.parse(res.info);
                    	
                      	var pp=str.品牌_1;
                      	var pp1='';
                      	var xiangxing=str.香型_2;
                      	var xiangxing1='';
                      	var spcd=str.商品产地_3;
                      	var spcd1='';
                      	var jiage=str.价格_4;
                      	var jiage1='';
                      	
                      	for(var i=0;i<pp.length;i++){
                      		pp1+='<li class="l">'
								+'<a href="pages/classifySort.html?'+pp[i].id+'?bj" orderNum"'+ pp[i].id+'"c_no="'+pp[i].c_no+'">'
									+'<div class="picWrapper">'
										+'<img src="'+that.imgPath+pp[i].info+'" alt="" />'
									+'</div>'
									+'<p class="over">'+pp[i].name+'</p>'
								+'</a>'
							+'</li>'	
                      	}
                      	$('.liquor').find('dd').eq(0).find('ul').html(pp1);
                      	for(var i=0;i<xiangxing.length;i++){
                      		xiangxing1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+xiangxing[i].id+'?bj" orderNum="'+xiangxing[i].id+'">'
											+'<p class="over">'+xiangxing[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.liquor').find('dd').eq(1).find('ul').html(xiangxing1);
                      	for(var i=0;i<spcd.length;i++){
                      		spcd1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+spcd[i].id+'?bj" orderNum="'+spcd[i].id+'">'
											+'<p class="over">'+spcd[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.liquor').find('dd').eq(2).find('ul').html(spcd1);
                      	for(var i=0;i<jiage.length;i++){
                      		jiage1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+jiage[i].id+'?bj" orderNum="'+jiage[i].id+'">'
											+'<p class="over">'+jiage[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.liquor').find('dd').eq(3).find('ul').html(jiage1);
                    }
				})
				//葡萄酒Ajax
				$.ajax({
					url:that.urlPath+"/SER/GetAllTypeBandAndAttr",
					type:'get',
					data: { 
                    	c_no:'葡萄酒'
                    },
                    dataType: "json",
                    success:function(res){
                    	var str=JSON.parse(res.info);
                    	var parentTitle='';
                      	var pp=str.品牌_1;
                      	var pp1='';
                      	var ysjpp=str.产国_2;
                      	var ysjpp1='';
                      	var pjpp=str.品种_3;
                      	var pjpp1='';
                      	var leixing=str.类型_4;
                      	var leixing1='';
                      	var jiage=str.价格_5;
                      	var jiage1='';
                      	
                      	for(var i=0;i<pp.length;i++){
                      		pp1+='<li class="l">'
								+'<a href="pages/classifySort.html?'+ pp[i].id+'?ptj" orderNum"'+ pp[i].id+'"c_no="'+pp[i].c_no+'">'
									+'<div class="picWrapper">'
										+'<img src="'+that.imgPath+pp[i].info+'" alt="" />'
									+'</div>'
									+'<p class="over">'+pp[i].name+'</p>'
								+'</a>'
							+'</li>'	
                      	}
                      
                      	$('.wine').find('dd').eq(0).find('ul').html(pp1);
                      	for(var i=0;i<ysjpp.length;i++){
                      		ysjpp1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+ysjpp[i].id+'?ptj" orderNum="'+ysjpp[i].id+'">'
											+'<p class="over">'+ysjpp[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.wine').find('dd').eq(1).find('ul').html(ysjpp1);
                      	for(var i=0;i<pjpp.length;i++){
                      		pjpp1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+pjpp[i].id+'?ptj" orderNum="'+pjpp[i].id+'">'
											+'<p class="over">'+pjpp[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.wine').find('dd').eq(2).find('ul').html(pjpp1);
                      	for(var i=0;i<leixing.length;i++){
                      		leixing1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+leixing[i].id+'?ptj" orderNum="'+leixing[i].id+'">'
											+'<p class="over">'+leixing[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.wine').find('dd').eq(3).find('ul').html(leixing1);
                      	for(var i=0;i<jiage.length;i++){
                      		jiage1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+jiage[i].id+'?ptj" orderNum="'+jiage[i].id+'">'
											+'<p class="over">'+jiage[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.wine').find('dd').eq(4).find('ul').html(jiage1);
                    }
				})
			//分类广告
			$.ajax({
				url:that.urlPath+"/SER/GetFenleiAdvert",
				type:'get',
                dataType: "json",
				success:function(res){
					var result=JSON.parse(res.advert);
					for(var i=0;i<result.length;i++){
						console.log(result);
						$('dl dt').eq(i).html('<a href="pages/detail.html?'+result[i].url+'" ordernum="'+result[i].ordernum+'" typename="'+result[i].typeName+'"><img src="'+that.imgPath+result[i].pic+'"></a>')
					}
				}
			})
			//洋酒
			$.ajax({
					url:that.urlPath+"/SER/GetAllTypeBandAndAttr",
					type:'get',
					data: { 
                    	c_no:'洋酒'
                    },
                    dataType: "json",
                    success:function(res){
                    	var str=JSON.parse(res.info);
                    	var parentTitle='';
                      	var pinpai=str.品牌_1;
                      	var pp1='';
                      	var ysjpp=str.商品类型_2;
                      	var ysjpp1='';
                      	var pjpp=str.价格区间_3;
                      	var pjpp1='';

                      	for(var i=0;i<pinpai.length;i++){
                      		pp1+='<li class="l">'
								+'<a href="pages/classifySort.html?'+ pinpai[i].id+'?yj" orderNum"'+ pinpai[i].id+'"c_no="'+pinpai[i].c_no+'">'
									+'<div class="picWrapper">'
										+'<img src="'+that.imgPath+pinpai[i].info+'" alt="" />'
									+'</div>'
									+'<p class="over">'+pinpai[i].name+'</p>'
								+'</a>'
							+'</li>'	
                      	}
                      
                      	$('.foreignWine').find('dd').eq(0).find('ul').html(pp1);
                      	for(var i=0;i<ysjpp.length;i++){
                      		ysjpp1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+ysjpp[i].id+'?yj" orderNum="'+ysjpp[i].id+'">'
											+'<p class="over">'+ysjpp[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.foreignWine').find('dd').eq(1).find('ul').html(ysjpp1);
                      	for(var i=0;i<pjpp.length;i++){
                      		pjpp1+='<li class="l">'
										+'<a href="pages/classifySort.html?'+pjpp[i].id+'?yj" orderNum="'+pjpp[i].id+'">'
											+'<p class="over">'+pjpp[i].name+'</p>'
										+'</a>'
									+'</li>'	
                      	}
                      	$('.foreignWine').find('dd').eq(2).find('ul').html(pjpp1);
                      	
                    }
				})
			//黄养啤
			$.ajax({
					url:that.urlPath+"/SER/GetAllTypeBandAndAttr",
					type:'get',
					data: { 
                    	c_no:'黄/养/啤'
                    },
                    dataType: "json",
                    success:function(res){
                    	var str=JSON.parse(res.info);
                    	var parentTitle='';
                      	var hjpp=str.黄酒品牌;
                      	var pp1='';
                      	var ysjpp=str.养生酒品牌;
                      	var ysjpp1='';
                      	var pjpp=str.啤酒品牌;
                      	var pjpp1='';

                      	for(var i=0;i<hjpp.length;i++){
                      		pp1+='<li class="l">'
								+'<a href="pages/classifySort.html?'+ hjpp[i].id+'?hj" orderNum"'+ hjpp[i].id+'"c_no="'+hjpp[i].c_no+'">'
									+'<div class="picWrapper">'
										+'<img src="'+that.imgPath+hjpp[i].info+'" alt="" />'
									+'</div>'
									+'<p class="over">'+hjpp[i].name+'</p>'
								+'</a>'
							+'</li>'	
                      	}
                      
                      	$('.hyp').find('dd').eq(0).find('ul').html(pp1);
                      	for(var i=0;i<ysjpp.length;i++){
                      		ysjpp1+='<li class="l">'
									+ '<a href="pages/classifySort.html?'+ysjpp[i].id+'?ysj" orderNum="'+ysjpp[i].id+'">'	
									+		'<h2><img src="'+that.imgPath+ysjpp[i].info+'" alt="" /></h2>'
									+		'<p class="over">'+ysjpp[i].name+'</p>'
									+	'</a>'
									+'</li>'
                      	}
                      	$('.hyp').find('dd').eq(1).find('ul').html(ysjpp1);
                      	for(var i=0;i<pjpp.length;i++){
                      		pjpp1+='<li class="l">'
									+	'<a href="pages/classifySort.html?'+pjpp[i].id+'?pj" orderNum="'+pjpp[i].id+'">'
									+		'<h2><img src="'+that.imgPath+pjpp[i].info+'" alt="" /></h2>'
									+		'<p class="over">'+pjpp[i].name+'</p>'
									+	'</a>'
									+'</li>'
                      	}
                      	$('.hyp').find('dd').eq(2).find('ul').html(pjpp1);
                      	
                    }
				})
			//酒具周边
			$.ajax({
					url:that.urlPath+"/SER/GetAllTypeBandAndAttr",
					type:'get',
					data: { 
                    	c_no:'酒具周边'
                    },
                    dataType: "json",
                    success:function(res){
                    	var str=JSON.parse(res.info);
                    	var parentTitle='';
                      	var pp=str.品牌_1;
                      	var pp1='';
                      	for(var i=0;i<pp.length;i++){
                      		pp1+='<li class="l">'
								+'<a href="pages/classifySort.html?'+ pp[i].id+'?jjzb" orderNum"'+ pp[i].id+'"c_no="'+pp[i].c_no+'">'
									+'<div class="picWrapper">'
										+'<img src="'+that.imgPath+pp[i].info+'" alt="" />'
									+'</div>'
									+'<p class="over">'+pp[i].name+'</p>'
								+'</a>'
							+'</li>'	
                      	}
                      
                      	$('.drinkingVessel').find('dd').find('ul').html(pp1);	
                    }
				})
		}
	};
	classifyObj.init();
})