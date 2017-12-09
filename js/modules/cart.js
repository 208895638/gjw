$(function(){
	var cartObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		user_id:null,
		flag:0,
		init:function(){
			this.bindEvent();
			this.allSelect();
			this.goodSelect();
			this.render();
			this.touchDel();
			$('#foot ul li a').eq(2).addClass('current').parent().siblings().find('a').removeClass('current');
			$('.index_bot').eq(0).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(1).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(3).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(2).find("img").eq(1).show().siblings().hide();
		},
		bindEvent:function(){
			var that=this;
			$('.editor i').on('click',function(){
				$(this).hide().siblings().show();
				$('.money').hide();
				$('.checkout').hide();
				$('.delete').show();
				$('.collection').show();
			});
			$('.editor b').on('click',function(){
				$(this).hide().siblings().show();
				$('.delete').hide();
				$('.collection').hide();
				$('.money').show();
				$('.checkout').show();
			});
			$('dl').on('click','.subtract',function(event){
				var numb=$(this).next().html();
				if(that.flag==0){
					if(numb>1){
						that.flag=1;
						numb--;
						$(this).next().html(numb);
						that.editCart(that.user_id,$(this).parents('dd').data('gid'),numb,0,0,$(this));
						event.preventDefault();
					}else{
						alert('亲，无法再减了！')
						event.preventDefault();
					}
				}
			});
			$('dl').on('click','.add',function(event){
				var numb=$(this).prev().html();
				var stock=$(this).attr('stock');
				if(that.flag==0){
					if(numb<stock){
						that.flag=1;
						numb++;
						$(this).prev().html(numb);
						that.editCart(that.user_id,$(this).parents('dd').data('gid'),numb,0,1,$(this));
					}else{
						alert('库存不足');
					}
					event.preventDefault();
				}
			});
			$('.cartList dl').on('click','.swiperDel',function(){
				var parent_gid=$(this).parents('.addPrice').data('id');
				var me=$(this).parents('li');
				var child_gid=$(this).parents('li').data('id');
				$.ajax({
					type:"get",
					url:that.urlPath+"/SeR/DelCartJiaJiaGou",
					data:{
						userid:that.user_id,
						parent_gid:parent_gid,
						child_gid:child_gid
					},
					success:function(res){
						console.log(res);
						me.remove();
						that.getPay();
					}
				});
			});
			$('.collection').on('click',function(){
				var hasSeleted=$('dl').find('input[type="checkbox"]:checked').parent().parent().parent();
				console.log(hasSeleted);
				var str='';
				for(var i=0;i<hasSeleted.length;i++){
					str	+=	$(hasSeleted[i]).data('cid')+','
				};
//				var cartid=str.substr(1);
				console.log(str,that.user_id);
				that.favorite(that.user_id,str);
				hasSeleted.remove();
				that.returnEmpty();
			});
			$('.delete').on('click',function(){
				var hasSeleted=$('dl').find('input[type="checkbox"]:checked').parent().parent().parent();
				console.log(hasSeleted);
				var str='';
				for(var i=0;i<hasSeleted.length;i++){
					str	+=	$(hasSeleted[i]).data('cid')+','
				};
//				var cartid=str.substr(1);
				console.log(str,that.user_id);
				that.delGoods(that.user_id,str,hasSeleted);
			});
			$('.checkout').on('click',function(){
				var selectedG=$('dl').find('input[type="checkbox"]:checked');
				if(selectedG[0]){
					var hasSeleted=selectedG.parent().parent().parent();
					var strc='';
					var strg='';
					var str='';
					for(var i=0;i<hasSeleted.length;i++){
						strc	+=	$(hasSeleted[i]).data('cid')+','
						strg	+=	$(hasSeleted[i]).data('gid')+','
						str 	+=	$(hasSeleted[i]).html()
					};
					localStorage.setItem('arryspid',strc);
					localStorage.setItem('cartid',strg);
					localStorage.setItem('fillOrder',str);
					window.location.href="pages/fillOrder.html?"+encodeURI(strc)+'?'+encodeURI(strg);
				}else{
					alert('请选择商品');
				};
			})
		},
		goodSelect:function(){
			var that=this;
			$('dl').on('change','input[type=checkbox]',function(){
				if($(this).prop('checked')){
					$(this).css('background-image','url(img/yes.png)');
					that.getPay();
				}else{
					$(this).css('background-image','url(img/no.png)');
					that.getPay();
				}
				var allcheckbox=$('dl').find('input[type="checkbox"]');
				var allchecked=$('dl').find('input[type="checkbox"]:checked');
				$('.checkout i').html(allchecked.length);
				if(allcheckbox.length==allchecked.length){
					$('.selectAll').prop('checked',true).css('background-image','url(img/yes.png)');
				}else{
					$('.selectAll').prop('checked',false).css('background-image','url(img/no.png)');
				}
			})
		},
		allSelect:function(){
			var that=this;
			$('.selectAll').on('change',function(){
				var statue=$(this).prop('checked');
				var allcheckbox=$('input[type="checkbox"]');
				if(statue){
					allcheckbox.css('background-image','url(img/yes.png)');
					allcheckbox.prop('checked',true);
					that.getPay();
				}else{
					allcheckbox.css('background-image','url(img/no.png)');
					allcheckbox.prop('checked',false);
					that.getPay();
				};
				var allchecked=$('dl').find('input[type="checkbox"]:checked');
/*				$('.checkout i').html(allchecked.length);*/
			});
		},
		render:function(){
			var that=this;
			if(!localStorage.getItem('id')){
				$('.cartList').hide();
                $('.cartEmpty').show();
                this.recommend(0);
                $('.editor').hide();
			}else{
				this.user_id=localStorage.getItem('id');
				$.ajax({
					url:that.urlPath+"/SER/CartList",
					type:'get',
					data: { 
						userid:that.user_id
	                },
	                dataType: "json",
	                success:function(res){
	                	console.log(res);
	                	if(res.info=='购物车空空如也'){
	                		$('.cartList').hide();
	                		$('.cartEmpty').show();
	                		$('.kongWrapper li p').html(res.info);
	                		that.recommend(that.user_id);
	                		$('.editor').hide();
	                	}else{
	                		var result=JSON.parse(res.info);
	                		console.log(result);
	                		var content='';
	                		for(var i=0;i<result.length;i++){
	                			var discount='';
	                			var gifts='';
	                			var addPrice='';
	                			var fullGifts='';
	                			var fullCut='';
	                			var ms='';
	                			var jjgBox='';
	                			if(result[i].赠品){
	            					discount+='<i>买赠</i>'
	            					var arrZP=JSON.parse(result[i].赠品);
	            					for(var j=0;j<arrZP.length;j++){
	            						gifts	+='<li data-id="'+arrZP[j]+'" class="clearfix">'
	            								+	'<img src="'+that.imgPath+arrZP[j].图片路径+'" class="l" alt="" />'
												+	'<div class="l moR">'
												+		'<p class="over2"><span>【买赠】</span><i>'+arrZP[j].品名+'</i></p>'
												+		'<div class="giftsNum">X <i>'+arrZP[j].数量+'</i></div>'
												+	'</div>'
												+'</li>'
	            					}
	            				};
	            				if(result[i].会员价==1){
	            					discount+='<i>会员价</i>'
	            				};
	            				if(result[i].满减){
	            					discount+='<i>满减</i>'
	            					fullCut=result[i].满减;
	            				};
	            				if(result[i].满赠){
	            					discount+='<i>满赠</i>'
	            					var arrMZ=JSON.parse(result[i].满赠);
	            					for(var j=0;j<arrMZ.length;j++){
	            						fullGifts	+=	'<li data-id="'+arrMZ[j]+'" class="clearfix">'
		            								+		'<img src="'+that.imgPath+arrMZ[j].图片路径+'" class="l" alt="" />'
													+		'<div class="l moR">'
													+			'<p class="over2"><span>【满赠】</span><i>'+arrMZ[j].品名+'</i></p>'
													+		'<div class="giftsNum">X <i>'+arrMZ[j].数量+'</i></div>'
													+		'</div>'
													+	'</li>'
	            					}
	            				};
	            				if(result[i].多买多优惠){
	            					discount+='<i>多买多优惠</i>'
	            				}
	            				if(result[i].加价购){
	            					discount+='<i>加价购</i>'
	            					jjgBox='<a class="r" href="pages/addPrice.html?'+result[i].商品id+'?'+encodeURI(result[i].加价购)+'">加价购</a>'
	            				}
	            				if(result[i].加价购购买的商品){
	            					var arrJJG=JSON.parse(result[i].加价购购买的商品);
	            					for(var j=0;j<arrJJG.length;j++){
	            						addPrice	+='<li data-id="'+arrJJG[j].id+'" class="clearfix">'
	            								+	'<img src="'+that.imgPath+arrJJG[j].图片路径+'" class="l" alt="" />'
												+	'<div class="l moR">'
												+		'<p class="over2"><span>【买赠】</span><i>'+arrJJG[j].品名+'</i></p>'
												+		'<div class="giftsNum clearfix"><p class="l">¥<i>'+arrJJG[j].price+'</i></p><div class="r">X 1</div></div>'
												+	'</div>'
												+	'<div class="swiperDel r">删除</div>'
												+'</li>'
	            					}
	            				}
	            				if(result[i].限时抢购==1){
	            					discount+='<i>限时抢购</i>'
	            				}
	            				if(result[i].秒杀==1){
	            					discount+='<i>秒杀</i>'
	            					ms='?000';
	            				}
	                			content	+=	'<dd data-cid="'+result[i].id+'" data-gid="'+result[i].商品id+'">'
										+		'<div class="goodsInfo clearfix">'
										+			'<div class="selectWrapper l">'
										+				'<input type="checkbox" class="selectItem"/>'
										+			'</div>'
										+			'<a href="pages/detail.html?'+result[i].商品id+ms+'" class="goodsContent l">'
										+				'<img src="'+that.imgPath+result[i].图片路径+'" alt="" class="l"/>'
										+				'<div class="gc-r l">'
										+					'<h4 class="over2">'+result[i].品名+'</h4>'
										+					'<div class="conBottom clearfix">'
										+						'<div class="con-l l">'
										+							'<div class="salesPromotion">'+discount+'</div>'
										+							'<strong>¥<i>'+result[i].单价+'</i></strong>'
										+						'</div>'
										+						'<div class="numController l clearfix">'
										+							'<div class="subtract l">-</div>'
										+							'<div class="numShow l">'+result[i].数量+'</div>'
										+							'<div class="add l" stock="'+result[i].库存数量+'">+</div>'
										+						'</div>'
										+					'</div>'
										+				'</div>'
										+			'</a>'
										+		'</div>'
										+		'<div class="discountDes clearfix">'
										+			'<p class="l">'+fullCut+'</p>'
										+			jjgBox
										+		'</div>'
										+		'<div class="incidental">'
										+			'<ul class="fullGifts">'+fullGifts+'</ul>'
										+			'<ul class="gifts">'+gifts+'</ul>'
										+			'<ul class="addPrice" data-id="'+result[i].商品id+'">'+addPrice+'</ul>'
										+		'</div>'
										+	'<div class="borD interval"></div>'
										+	'</dd>'
										
	                			}
	                		if(JSON.parse(res.zeng)[0]){
	                			var arrZeng=JSON.parse(res.zeng)
	                			var zeng='';
	                			for(var i=0;i<arrZeng;i++){
	                				zeng	+=	'<li data-id="'+arrZeng[i].id+'" class="clearfix">'
	        								+	'<img src="'+that.imgPath+arrZeng[i].图片路径+'" class="l" alt="" />'
											+	'<div class="l moR">'
											+		'<p class="over2">'+arrZeng[i].品名+'</i></p>'
											+		'<div class="giftsNum">X <i>'+arrZeng[i].数量+'</i></div>'
											+	'</div>'
											+'</li>'
								}
	                			content+='<ul class="zeng"></ul>'
	                		}
	                			$('.cartList dl').html(content);
	                			that.disBg();
	                		}
	                	}
	            });
	       }
		},
		disBg:function(){
			var arr=$('.salesPromotion i');
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
					arr.eq(i).css('background','#fa8322');
				}
			};
			$('.fullGifts').each(function(){
				if($(this).children().length==0){
					$(this).hide();
				}
			});
			$('.addPrice').each(function(){
				if($(this).children().length==0){
					$(this).hide();
				}
			});
			$('.gifts').each(function(){
				if($(this).children().length==0){
					$(this).hide();
				}
			});
		},
		touchDel:function(){
			var startX;
			var endX;
			$('.cartList dl').on('touchstart','.addPrice li',function(e){
				startX= e.changedTouches[0].clientX;
			})
			$('.cartList dl').on('touchmove','.addPrice li',function(e){
				endX= e.changedTouches[0].clientX;
			})
			$('.cartList dl').on('touchend','.addPrice li',function(e) {
				if(startX-endX>100) {
					console.info('手指左滑动');
					$(this).find('.moR').css('width','55%');
					$(this).find('.swiperDel').show();
				} 
			})
			$('.cartList dl').on('touchend','.addPrice li',function(e) {
				if(endX-startX>100) {
					console.info('手指右滑动');
					$(this).find('.moR').css('width','75%');
					$(this).find('.swiperDel').hide();
				} 
			})
		},
		getPay:function(){
			var that=this;
			var hasSeleted=$('dl').find('input[type="checkbox"]:checked').parent().parent().parent();
			console.log(hasSeleted);
			var str='';
			for(var i=0;i<hasSeleted.length;i++){
				str	+=	','+$(hasSeleted[i]).data('cid')
			};
			var arryspid=str.substr(1);
			console.log(arryspid,this.user_id);
			$.ajax({
				url:that.urlPath+"/SER/Get_CartTotalPrice",
				type:'get',
				data: { 
					userid:that.user_id,
					arryspid:arryspid
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	$('.disMoney i').html(res.youhui_price);
                	$('.pay i').html(res.total_price);
                	$('.checkout i').html(res.total_num);
                	$('.sum i').html(parseFloat(res.total_price)+parseFloat(res.youhui_price));
                }
        	});
		},
		editCart:function(uid,gid,num,isdel,isPlus,me){
         	var that=this;
         	$.ajax({
				url:that.urlPath+"/SER/EditCart",
				type:'get',
				data: { 
					userid:uid,
					gid:gid,
					num:num,
					isdel:isdel,
					isPlus:isPlus
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	var contentM='';
                	var contentZ='';
                	if(res.man_zeng!=''){
                		var maizeng=JSON.parse(res.man_zeng);
	                	for(var i=0;i<maizeng.length;i++){
	                		contentM	+=	'<li data-id="'+maizeng[i].id+'" class="clearfix">'
	    								+		'<img src="'+that.imgPath+maizeng[i].图片路径+'" class="l" alt="" />'
										+		'<div class="l moR">'
										+			'<p class="over2"><span>【满赠】</span><i>'+maizeng[i].品名+'</i></p>'
										+		'<div class="giftsNum">X <i>'+maizeng[i].数量+'</i></div>'
										+		'</div>'
										+	'</li>'
	                	};
	                	me.parents('dd').find('.fullGifts').html(contentM);
	                };
	                if(res.zeng_ping!=''){
	                	var zengping=JSON.parse(res.zeng_ping);
	                	for(var i=0;i<zengping.length;i++){
	                		contentZ	+=	'<li data-id="'+zengping[i].id+'" class="clearfix">'
	    								+		'<img src="'+that.imgPath+zengping[i].图片路径+'" class="l" alt="" />'
										+		'<div class="l moR">'
										+			'<p class="over2"><span>【满赠】</span><i>'+zengping[i].品名+'</i></p>'
										+		'<div class="giftsNum">X <i>'+zengping[i].数量+'</i></div>'
										+		'</div>'
										+	'</li>'
	                	}
	                	me.parents('dd').find('.gifts').html(contentZ);
	                };
                	that.getPay();
                	that.flag=0;
        		}
			});
		},
		favorite:function(uid,cid){
			var that=this;
         	$.ajax({
				url:that.urlPath+"/SER/AddCollectionByAndroid",
				type:'get',
				data: { 
					userid:uid,
					cartid:cid
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	alert(res.info);
        		}
			});
		},
		delGoods:function(uid,cid,hasSeleted){
			var that=this;
         	$.ajax({
				url:that.urlPath+"/SER/DelCartByAndroid",
				type:'get',
				data: { 
					userid:uid,
					cartid:cid
                },
                dataType: "json",
                success:function(res){
                	alert('删除成功');
                	hasSeleted.remove();
                	that.returnEmpty();
        		}
			});
		},
		recommend:function(uid){
			var that=this;
         	$.ajax({
				url:that.urlPath+"/SER/GetLikeGoods",
				type:'get',
				data: { 
					openid:uid,
                },
                dataType: "json",
                success:function(res){
      				console.log(res);
                	var result=JSON.parse(res.info);
               		var content='';
                	for(var i=0;i<result.length;i++){
	                	content	+= 	'<li>'
								+		'<a href="pages/detail.html?'+result[i].id+'">'
								+			'<div class="picWrapper">'
								+				'<img src="'+that.imgPath+result[i].图片路径+'" alt="" />'
								+			'</div>'
								+			'<p class="over2">'+result[i].品名+'</p>'
								+			'<div class="price">'
								+				'<strong>'
								+					'¥<i>'+ result[i].本站价+'</i>'
								+				'</strong>'
								+				'<del>¥<i>'+result[i].市场价+'</i></del>'
								+			'</div>'
								+		'</a>'
								+	'</li>'
            		}
                	$('.twoColumn').html(content);
	            }
			});
		},
		returnEmpty:function(){
			if(!$('dl dd')[0]){
				$('.cartList').hide();
                $('.cartEmpty').show();
                this.recommend(0);
                $('.editor').hide();
			}
		}
	};
	cartObj.init();
})