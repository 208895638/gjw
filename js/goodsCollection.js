$(function(){
	var goodsCollectionObj={
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
			$('ul').on('click','h5',function(){
				var me=this;
				$.ajax({
					type:"get",
					url:that.urlPath+"/SER/DelCollection",
					async:true,
					data:{
						gid:$(me).parent().attr('orderId'),
						userid:localStorage.getItem('id')
					},
					success:function(res){
						console.log(res);	
						if(JSON.parse(res).status==0){
							$(me).parent().remove();
						}else{
							alert(JSON.parse(res).msg)
						}
						that.isEmpty();
					}
				});
			})
			
		},
		isEmpty:function(){
			if($('ul').children().length==0){
				$('ul').hide();
				$('.goodsCollectionPage').show();
			}
		},
		render:function(){
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/CollectionList",
				async:true,
				data:{
					userid:localStorage.getItem('id'),
					pagesize:999,
					pageindex:1
				},
				success:function(res){
					console.log(res)
					var con='';
					if(res.info!="暂无数据"){
						var str=JSON.parse(res.info);
						for(var i=0;i<str.length;i++){
							con+='<li class="clearfix" orderId="'+str[i].id+'">'
							+   '<div class="sC clearfix l">'
							+	'<div class="l">'
							+		'<img src="'+str[i].img_path+'" alt="" />'
							+	'</div>'
							+	'<div class="l">'
							+		'<a href="detail.html?'+str[i].id+'"><h2>'+str[i].name+'</h2></a>'
							+		'<h3>￥<i>'+str[i].price+'</i></h3>'
							+	'</div>'
							+	'<div class="l">'
							+		'<a href="javascript:;">'
							+			'<img src="../img/wdsc_gwc@2x.png" alt="" spid="'+str[i].id+'"  class="gobuy"/>'
							+		'</a>'
							+	'</div>'
							+   '</div>'
							+	'<h5 class="l" addId="'+str[i].id+'" style="display:none">'
							+		'删除'
							+	'</h5>'
							+'</li>'
						}
						$('.goodsCollection').find('ul').html(con);
						var startX;
						var endX;
						$('.goodsCollection').find('ul').find('li').on('touchstart',function(e){
							startX=e.touches[0].clientX;
						})
						$('.goodsCollection').find('ul').find('li').on('touchmove',function(e){
							endX=e.touches[0].clientX;
						})
						$('.goodsCollection').find('ul').find('li').on('touchend',function(e) {
							var oLi=$(this);
							console.log(oLi)
							if(startX-endX>100) {
								console.info('手指左滑动');
								oLi.find('.sC').css('width','85%');
								oLi.find('h5').show();
							}else{
								oLi.find('h5').hide();
								oLi.find('.sC').css('width','100%');
							}
						})
					}else{
						that.isEmpty();
					}
				}
				
			});
			$('.goodsCollection').find('ul').on('click','.gobuy',function(){
					var sp=$(this).attr('spid');console.log($(this))
					$.ajax({//普通时添加购物车
							type:'get',
							url:that.urlPath+'/SeR/AddCart',
							data:{
								userid:localStorage.getItem('id'),
								gid:sp,
								num:1,
								act:'普通购买',
								protype:0,
								actid:0
							},
							success:function(res){
								if(res.state==1){
									alert(res.info)
									//购物车总数目
										//点加入购物车获取一次总数目
										
								}else{
									alert(res.info)
								}
								
							}
						})
			})
			$('.head').on('click','h4',function(){
				$.ajax({
					type:"get",
					url:that.urlPath+"/SeR/DelCollection",
					async:true,
					data:{
						userid:localStorage.getItem('id'),
						gid:0
					},
					success:function(res){
						console.log(res,res.msg)
						var str=JSON.parse(res).status;
						if(str==0){
							alert(JSON.parse(res).msg)
							$('.goodsCollection').find('ul').find('li').remove();
							that.isEmpty();
						}else{
							alert(JSON.parse(res).msg)
						}
						
					}
						
				})
			})
		}
		
	};
	goodsCollectionObj.init();
})